const XLSX = require('xlsx');
const fs = require('fs');

// Leer archivos Excel para obtener lista de químicos
const storesWB = XLSX.readFile('./public/ChemicalStores_20260108193555.xlsx');
const chemicalsWB = XLSX.readFile('./public/Chemicals_20260108193431.xlsx');

const storesSheet = storesWB.Sheets[storesWB.SheetNames[0]];
const chemicalsSheet = chemicalsWB.Sheets[chemicalsWB.SheetNames[0]];

// Ajustar el rango para saltar las primeras filas de Chemicals
const chemicalsRaw = XLSX.utils.sheet_to_json(chemicalsSheet, { header: 1 });
const chemicalsHeaderIndex = chemicalsRaw.findIndex(row => 
  row && Array.isArray(row) && row.includes('Description')
);

if (chemicalsHeaderIndex >= 0) {
  const range = XLSX.utils.decode_range(chemicalsSheet['!ref'] || 'A1');
  range.s.r = chemicalsHeaderIndex;
  chemicalsSheet['!ref'] = XLSX.utils.encode_range(range);
}

const storesData = XLSX.utils.sheet_to_json(storesSheet);
const chemicalsData = XLSX.utils.sheet_to_json(chemicalsSheet);

// Crear set de todos los químicos únicos
const allChemicals = new Set();

chemicalsData.forEach(chem => {
  if (chem.Description) {
    allChemicals.add(chem.Description.trim());
  }
});

storesData.forEach(store => {
  const name = store.Chemical || store.ChemicalName;
  if (name && name !== '(blank)' && !String(name).includes('Total')) {
    allChemicals.add(name.trim());
  }
});

// PDFs disponibles en Horticentre (extraídos de la página web)
const horticentrePDFs = [
  'Actiwett (UPL) SDS.pdf',
  'AG Copp 75 (Arxada) SDS.pdf',
  'Alion (Bayer) SDS.pdf',
  'Altacor (FMC) SDS.pdf',
  'Apollo (Adama) SDS.pdf',
  'Applaud (Orion) SDS.pdf',
  'Aptivis (Syng) SDS.pdf',
  'Arrow 360 (Adama) SDS.pdf',
  'Avaunt 30WG (FMC) SDS.pdf',
  'Avid (Syng) SDS.pdf',
  'Bacstar 2.5Kg (UPL) SDS.pdf',
  'Baga_sds.pdf',
  'Bammer (UPL) SDS.pdf',
  'Bapsol (Grochem) SDS.pdf',
  'Bapsol100_sds.pdf',
  'Bash (Orion) SDS.pdf',
  'BeeScent_sds.pdf',
  'Belanty (Basf) SDS.pdf',
  'Bestseller 100EC (Adria) SDS.pdf',
  'BlossomBless_sds.pdf',
  'Bond Xtra SDS.pdf',
  'Brevis (Adma) SDS.pdf',
  'Browndown Zap (UPL) SDS.pdf',
  'Budcyt_sds.pdf',
  'Buster (BASF) SDS.pdf',
  'Calcinit (Yara) SDS.pdf',
  'Calcium 175 (Grochem) SDS.pdf',
  'Calcium Ammonium Nitrate (Ravensdown) SDS.pdf',
  'Calcium Ammonium Nitrate (van Iperen).pdf',
  'Calcium Nitrate Tetrahydrate (van Iperen) SDS.pdf',
  'CalMag (Van Iperen) SDS.pdf',
  'CalPhos (Grochem) SDS.pdf',
  'Captan_600_Flo_SDS.pdf',
  'Chateau (Nufarm) SDS.pdf',
  'Chorus (Syng) SDS.pdf',
  'Copper Oxychloride (FRUI) SDS .pdf',
  'YaraVita Croplift K SDS.pdf',
  'Cyan (Groc) SDS.pdf',
  'Delan (Basf) SDS.pdf',
  'Dew 600 (Nufarm) SDS.pdf',
  'Digester (Biostart) SDS.pdf',
  'Dithane Rainshield SDS.pdf',
  'Dodine 400 (Arxada) SDS.pdf',
  'Grochem Dodine SDS.pdf',
  'Dragon 700WG (Nufarm) SDS.pdf',
  'Du-Wett Organic (UPL) SDS.pdf',
  'Encal (Grochem) SDS.pdf',
  'EnSpray 99 SDS.pdf',
  'Erger (Agritrade) SDS.pdf',
  'Escape (Grochem) SDS.pdf',
  'Esteem SDS.pdf',
  'Ethin_sds.pdf',
  'Exault (Grochem) SDS.pdf',
  'Excel Organic (Grochem) SDS.pdf',
  'ExcelPlus (Grochem) SDS.pdf',
  'Fenamite (Corteva) SDS.pdf',
  'Fertigate W (Grochem) SDS .pdf',
  'Fertigate Y (Grochem) SDS.pdf',
  'Fiestar (Kenso) SDS.pdf',
  'Flint SDS.pdf',
  'Foam Fighter SDS.pdf',
  'Foliacin (Biostart) SDS .pdf',
  'Foschek SDS.pdf',
  'Freeway (Nufarm) SDS.pdf',
  'Gib47_sds.pdf',
  'Gro-Mag Super (Grochem) SDS.pdf',
  'GroWet (Grochem) SDS.pdf',
  'Growth SDS.pdf',
  'Gypsum (Fertco) SDS.pdf',
  'Key Strepto SDS.pdf',
  'Kocide Opti Organic (Corteva) SDS.pdf',
  'Kontrol (Grochem) SDS.pdf',
  'Latron B1956 (Agritrade) SDS Oct 2025 Final.pdf',
  'Li-700 (UPS) SDS.pdf',
  'Lime Sulphur (Grochem) SDS.pdf',
  'Lokit (Grochem) SDS.pdf',
  'Magnesium Sulphate (Redox) SDS .pdf',
  'Magnesium Sulphate HG (van Iperen).pdf',
  'YaraVita Mantrac Pro SDS.pdf',
  'Manzate (UPL) Evolution SD S.pdf',
  'Megafol (Agritrade) SDS.pdf',
  'MegaStar SDS.pdf',
  'Merpan Max (Adama) SDS.pdf',
  'Meteor (Groc) SDS .pdf',
  'MIT E MEC SDS.pdf',
  'Mizar Granuflo SDS.pdf',
  'Monoammonium Phosphate (MAP) (Redox) SDS.pdf',
  'Mortar SDS.pdf',
  'Movento SC (Bayer) SDS.pdf',
  'Mycorrcin (Biostart) SDS .pdf',
  'NAA100 SDS.pdf',
  'Neptune (Arxada) SDS.pdf',
  'Nordox (Groc) SDS.pdf',
  'Norshield 45WG (Grochem) SDS.pdf',
  'Oasis (Arxada) SDS.pdf',
  'Payback (Nufa) SDS.pdf',
  'Penatra (DKSH) SDS.pdf',
  'Phosgard (Groc) SDS.pdf',
  'Pirimor ( Syng) SDS.pdf',
  'Polyram (Frui) SDS.pdf',
  'Potassium Sulphate (Ravensdown) SDS.pdf',
  'Potassium Sulphate (Redox) SDS.pdf',
  'Sercadis (Basf) SDS.pdf',
  'Serenade Optimum (Bayer) SDS.pdf',
  'Sinergon 2000 (CIFO) SDS.pdf',
  'Spray Aid (Groc) SDS.pdf',
  'Sulphur (Redox) SDS.pdf',
  'Superzyme Powder (Roots) SDS.pdf',
  'Talendo (FRUI) SDS.pdf',
  'Thin It (Groc) SDS.pdf',
  'Thiram 80 WDG (UPL) SDS.pdf',
  'Torus (Adria) SDS.pdf',
  'Trace-it Copper (Grochem) SDS.pdf',
  'Trace-it Magnesium (Grochem) SDS.pdf',
  'Trace-It Manganese (Grochem) SDS.pdf',
  'Trace-it Molybdenum (Grochem) SDS.pdf',
  'Trace-it Total (Grochem) SDS.pdf',
  'Trace-it Zinc Chelate (Grochem) SDS.pdf',
  'Urea (Ravensdown) SDS.pdf',
  'VaporGard (KEYI) SDS.pdf',
  'Vayego (Bayer) SDS.pdf',
  'Virex (Groc) SDS.pdf',
  'Voliam Targo (Syng) SDS.pdf',
  'Waiken (Sst) SDS.pdf',
  'Wuxal Boron Plus (Aglukon) SDS.pdf',
  'Wuxal Manganese (Aglukon) SDS.pdf',
  'Wuxal Zinc Plus (Aglukon) SDS.pdf',
  'Zinc Sulphate Monohydrate (Redox) SDS.pdf'
];

// Función para normalizar nombres
function normalizeName(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Función para buscar match fuzzy
function findBestMatch(chemicalName, pdfList) {
  const normalized = normalizeName(chemicalName);
  
  // Buscar match exacto
  for (const pdf of pdfList) {
    const pdfName = normalizeName(pdf.replace(/ SDS\.pdf$/i, '').replace(/\.pdf$/i, ''));
    if (pdfName === normalized) {
      return pdf;
    }
  }
  
  // Buscar si el químico está contenido en el PDF
  for (const pdf of pdfList) {
    const pdfName = normalizeName(pdf);
    if (pdfName.includes(normalized)) {
      return pdf;
    }
  }
  
  // Buscar si el PDF está contenido en el químico (ej: "Wuxal Boron Plus" matchea con "Wuxal Boron")
  for (const pdf of pdfList) {
    const pdfName = normalizeName(pdf.replace(/ SDS\.pdf$/i, '').replace(/\.pdf$/i, ''));
    if (normalized.includes(pdfName)) {
      return pdf;
    }
  }
  
  // Buscar palabras clave comunes
  const chemWords = normalized.split(' ').filter(w => w.length > 2);
  for (const pdf of pdfList) {
    const pdfWords = normalizeName(pdf).split(' ').filter(w => w.length > 2);
    const matches = chemWords.filter(cw => pdfWords.some(pw => pw.includes(cw) || cw.includes(pw)));
    if (matches.length >= 2 || (matches.length >= 1 && chemWords.length <= 2)) {
      return pdf;
    }
  }
  
  return null;
}

// Mapear químicos a PDFs
const mappedChemicals = [];
const unmappedChemicals = [];

Array.from(allChemicals).sort().forEach(chemical => {
  const match = findBestMatch(chemical, horticentrePDFs);
  
  if (match) {
    const url = `https://horticentre.co.nz/wp-content/uploads/Safety%20Datasheets/${encodeURIComponent(match)}`;
    mappedChemicals.push({ chemical, pdf: match, url });
  } else {
    unmappedChemicals.push(chemical);
  }
});

// Mostrar resultados
console.error(`\n✅ Mapeados: ${mappedChemicals.length}`);
console.error(`❌ Sin mapear: ${unmappedChemicals.length}\n`);

if (unmappedChemicals.length > 0) {
  console.error('Químicos sin PDF directo encontrado:');
  unmappedChemicals.forEach(chem => console.error(`  - ${chem}`));
  console.error('');
}

// Generar archivo TypeScript
console.log('/**');
console.log(' * Mapa de químicos a sus URLs de SDS directas en Horticentre');
console.log(` * Generado: ${new Date().toISOString()}`);
console.log(` * Químicos con PDF directo: ${mappedChemicals.length}`);
console.log(` * Químicos con fallback genérico: ${unmappedChemicals.length}`);
console.log(' */');
console.log('export const ONEDRIVE_SDS_LINKS: Record<string, string> = {');

// Agregar químicos mapeados
mappedChemicals.forEach(({ chemical, pdf, url }) => {
  const slug = chemical
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
  
  console.log(`  // ${chemical} → ${pdf}`);
  console.log(`  '${slug}': '${url}',`);
});

// Agregar químicos sin mapear con fallback genérico
unmappedChemicals.forEach(chemical => {
  const slug = chemical
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
  
  console.log(`  // ${chemical} (no PDF encontrado, búsqueda manual)`);
  console.log(`  '${slug}': 'https://horticentre.co.nz/index.php/safety-datasheets/',`);
});

console.log(`  `);
console.log(`  // Link por defecto a Horticentre SDS page`);
console.log(`  '__DEFAULT__': 'https://horticentre.co.nz/index.php/safety-datasheets/'`);
console.log(`};`);
console.log('');
console.log('/**');
console.log(' * Obtiene el link de SDS para un químico específico');
console.log(' */');
console.log('export function getOneDriveSdsLink(chemicalName: string): string {');
console.log('  const normalizedName = chemicalName');
console.log('    .trim()');
console.log("    .replace(/[^\\w\\s-]/g, '')");
console.log("    .replace(/\\s+/g, '-')");
console.log('    .toLowerCase();');
console.log('  ');
console.log("  return ONEDRIVE_SDS_LINKS[normalizedName] || ONEDRIVE_SDS_LINKS['__DEFAULT__'];");
console.log('}');
