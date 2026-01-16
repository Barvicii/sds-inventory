const XLSX = require('xlsx');

// Leer AMBOS archivos Excel
const storesWB = XLSX.readFile('./public/ChemicalStores_20260108193555.xlsx');
const chemicalsWB = XLSX.readFile('./public/Chemicals_20260108193431.xlsx');

// Procesar archivo de Stores
const storesSheet = storesWB.Sheets[storesWB.SheetNames[0]];
const storesData = XLSX.utils.sheet_to_json(storesSheet);

// Procesar archivo de Chemicals (tiene la info de HazardClasses y MSDSLink)
const chemicalsSheet = chemicalsWB.Sheets[chemicalsWB.SheetNames[0]];
const chemicalsRaw = XLSX.utils.sheet_to_json(chemicalsSheet, { header: 1 });
const chemicalsHeaderIndex = chemicalsRaw.findIndex(row => 
  row && Array.isArray(row) && row.includes('Description')
);

if (chemicalsHeaderIndex >= 0) {
  const range = XLSX.utils.decode_range(chemicalsSheet['!ref'] || 'A1');
  range.s.r = chemicalsHeaderIndex;
  chemicalsSheet['!ref'] = XLSX.utils.encode_range(range);
}

const chemicalsData = XLSX.utils.sheet_to_json(chemicalsSheet);

// Crear mapa de químicos con su información
const chemicalsMap = new Map();

// Primero agregar info de Chemicals (tiene HazardClasses y MSDSLink)
chemicalsData.forEach(chem => {
  if (chem.Description) {
    chemicalsMap.set(chem.Description.trim(), {
      name: chem.Description.trim(),
      msdLink: chem.MSDSLink || null,
      hazardClasses: chem.HazardClasses || null
    });
  }
});

// Luego agregar químicos de Stores (algunos pueden tener MSDSUrl)
storesData.forEach(store => {
  const name = store.Chemical || store.ChemicalName;
  if (!name || name === '(blank)' || String(name).includes('Total')) {
    return;
  }
  
  const trimmedName = name.trim();
  if (!chemicalsMap.has(trimmedName)) {
    chemicalsMap.set(trimmedName, {
      name: trimmedName,
      msdLink: store.MSDSUrl || null,
      hazardClasses: null
    });
  } else {
    // Actualizar con MSDSUrl si existe
    const existing = chemicalsMap.get(trimmedName);
    if (!existing.msdLink && store.MSDSUrl) {
      existing.msdLink = store.MSDSUrl;
    }
  }
});

const chemicals = Array.from(chemicalsMap.values()).sort((a, b) => 
  a.name.localeCompare(b.name)
);

console.error(`\n📋 Total de químicos únicos: ${chemicals.length}`);

// Función para normalizar nombres
function normalizeChemicalName(name) {
  return name
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

// Generar el código TypeScript
console.log('/**');
console.log(' * Mapa de químicos a sus URLs de SDS en OneDrive');
console.log(' * Generado automáticamente desde los archivos Excel');
console.log(' */');
console.log('export const ONEDRIVE_SDS_LINKS: Record<string, string> = {');

let withUrl = 0;
let withoutUrl = 0;

chemicals.forEach(chemical => {
  const normalizedName = normalizeChemicalName(chemical.name);
  
  if (chemical.msdLink && String(chemical.msdLink).trim() !== '') {
    console.log(`  // ${chemical.name} (from Excel)`);
    console.log(`  '${normalizedName}': '${chemical.msdLink}',`);
    withUrl++;
  } else {
    console.log(`  // ${chemical.name}`);
    console.log(`  '${normalizedName}': 'https://onedrive.live.com/?id=BFA2BAF0E0A170A8%21s11e82e78a5aa4ab6acd11ad1c2797f30&cid=BFA2BAF0E0A170A8',`);
    withoutUrl++;
  }
});

console.log(`  \n  // Link por defecto a la carpeta de SDS`);
console.log(`  '__DEFAULT__': 'https://onedrive.live.com/?id=BFA2BAF0E0A170A8%21s11e82e78a5aa4ab6acd11ad1c2797f30&cid=BFA2BAF0E0A170A8'`);
console.log('};\n');

console.error(`\n📊 Estadísticas:`);
console.error(`   ✅ Con enlace directo: ${withUrl}`);
console.error(`   📁 Con enlace a carpeta: ${withoutUrl}`);
console.error(`   📋 Total: ${chemicals.length}\n`);
