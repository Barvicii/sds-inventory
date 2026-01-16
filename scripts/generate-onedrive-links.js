const XLSX = require('xlsx');

// Leer el Excel de inventario  
const workbook = XLSX.readFile('./public/ChemicalStores_20260108193555.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Leer como array para encontrar la fila de headers
const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
const headerRowIndex = rawData.findIndex(row => 
  row && Array.isArray(row) && row.some(cell => cell === 'Chemical' || cell === 'ChemicalName')
);

console.error(`📍 Headers encontrados en fila ${headerRowIndex}`);

if (headerRowIndex >= 0) {
  const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
  range.s.r = headerRowIndex;
  worksheet['!ref'] = XLSX.utils.encode_range(range);
}

const data = XLSX.utils.sheet_to_json(worksheet);

console.error(`📄 Total de filas: ${data.length}`);

// Obtener químicos únicos con sus MSDSUrl si existen
const chemicalsMap = new Map();

data.forEach(row => {
  const chemicalKey = row.Chemical || row.ChemicalName;
  if (!chemicalKey || 
      chemicalKey === 'Chemical' || 
      chemicalKey === '(blank)' ||
      String(chemicalKey).includes('Total')) {
    return;
  }
  
  if (!chemicalsMap.has(chemicalKey)) {
    chemicalsMap.set(chemicalKey, {
      name: chemicalKey,
      msdUrl: row.MSDSUrl || null
    });
  }
});

const chemicals = Array.from(chemicalsMap.values()).sort((a, b) => 
  a.name.localeCompare(b.name)
);

console.error(`\n📋 Generando enlaces de OneDrive para ${chemicals.length} químicos...\n`);

// Función para normalizar nombres de químicos
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
console.log(' * ');
console.log(' * IMPORTANTE: Estos enlaces apuntan a la carpeta compartida de OneDrive.');
console.log(' * Para enlaces directos a PDFs individuales, debes:');
console.log(' * 1. Ir a OneDrive y compartir cada PDF individualmente');
console.log(' * 2. Reemplazar el link generado aquí con el link compartido real');
console.log(' */');
console.log('export const ONEDRIVE_SDS_LINKS: Record<string, string> = {');

let withUrl = 0;
let withoutUrl = 0;

chemicals.forEach(chemical => {
  const normalizedName = normalizeChemicalName(chemical.name);
  
  // Si tiene MSDSUrl en el Excel, usar ese
  if (chemical.msdUrl && String(chemical.msdUrl).trim() !== '') {
    console.log(`  // ${chemical.name} (from Excel)`);
    console.log(`  '${normalizedName}': '${chemical.msdUrl}',`);
    withUrl++;
  } else {
    // Si no tiene, usar el link de la carpeta de OneDrive
    console.log(`  // ${chemical.name}`);
    console.log(`  '${normalizedName}': 'https://onedrive.live.com/?id=BFA2BAF0E0A170A8%21s11e82e78a5aa4ab6acd11ad1c2797f30&cid=BFA2BAF0E0A170A8',`);
    withoutUrl++;
  }
});

console.log(`  \n  // Link por defecto a la carpeta de SDS`);
console.log(`  '__DEFAULT__': 'https://onedrive.live.com/?id=BFA2BAF0E0A170A8%21s11e82e78a5aa4ab6acd11ad1c2797f30&cid=BFA2BAF0E0A170A8'`);
console.log('};\n');

console.error(`\n📊 Estadísticas:`);
console.error(`   ✅ Con enlace del Excel: ${withUrl}`);
console.error(`   📁 Con enlace a carpeta: ${withoutUrl}`);
console.error(`   📋 Total: ${chemicals.length}\n`);
