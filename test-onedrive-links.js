const XLSX = require('xlsx');

// Simular la función buildOneDriveSdsUrl
const ONEDRIVE_SDS_FOLDER = 'https://1drv.ms/f/c/bfa2baf0e0a170a8/IgB4LugRqqW2SqzRGtHCeX8wAVWtVRpsVk87kWgb6Mtiwac?e=N288AP';

function buildOneDriveSdsUrl(chemicalName) {
  const fileName = chemicalName
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
  
  return ONEDRIVE_SDS_FOLDER;
}

// Cargar Excel
const wb = XLSX.readFile('ChemicalStores_20260108193555.xlsx');
const ws = wb.Sheets['Data'];
const data = XLSX.utils.sheet_to_json(ws);

// Filtrar sheds objetivo
const TARGET_STORES = [
  'Judco Chem Shed',
  'Judco Fert Shed',
  'Patutahi Chem Shed',
  'Patutahi Fert Shed'
];

const filtered = data.filter(row => 
  TARGET_STORES.includes(row.Store) && 
  row.Quantity && 
  Math.abs(row.Quantity) > 0
);

// Obtener químicos únicos
const uniqueChemicals = [...new Set(filtered.map(r => r.Chemical.trim()))];

console.log('📦 TEST DE LINKS DE ONEDRIVE\n');
console.log(`Total de químicos únicos: ${uniqueChemicals.length}\n`);
console.log('Primeros 10 químicos con sus links SDS:\n');

uniqueChemicals.slice(0, 10).forEach((name, index) => {
  const link = buildOneDriveSdsUrl(name);
  const fileName = name
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
  
  console.log(`${index + 1}. ${name}`);
  console.log(`   Archivo esperado: ${fileName}.pdf`);
  console.log(`   Link: ${link}\n`);
});

console.log('\n📝 NOTA IMPORTANTE:');
console.log('Por ahora todos apuntan a la carpeta de OneDrive.');
console.log('Para links directos a PDFs individuales, necesitarás:');
console.log('1. Subir los PDFs con nombres específicos (ej: altacor.pdf)');
console.log('2. Obtener links directos de OneDrive para cada archivo');
console.log('3. O usar la API de OneDrive para obtener URLs dinámicas\n');
