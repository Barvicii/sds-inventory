const XLSX = require('xlsx');

// Función para normalizar nombres
function buildFileName(chemicalName) {
  return chemicalName
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase() + '.pdf';
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

// Separar por tipo
const chemSheds = filtered.filter(r => r.Store.includes('Chem Shed'));
const fertSheds = filtered.filter(r => r.Store.includes('Fert Shed'));

// Obtener únicos
const uniqueChem = [...new Set(chemSheds.map(r => r.Chemical.trim()))].sort();
const uniqueFert = [...new Set(fertSheds.map(r => r.Chemical.trim()))].sort();

console.log('📦 LISTA DE ARCHIVOS PDF NECESARIOS PARA ONEDRIVE\n');
console.log('═══════════════════════════════════════════════════\n');

console.log('🔴 CHEMICAL SHEDS (64 archivos):\n');
uniqueChem.forEach((name, index) => {
  const fileName = buildFileName(name);
  console.log(`${String(index + 1).padStart(2, '0')}. ${fileName.padEnd(40)} <- ${name}`);
});

console.log('\n\n🟢 FERTILIZER SHEDS (3 archivos):\n');
uniqueFert.forEach((name, index) => {
  const fileName = buildFileName(name);
  console.log(`${String(index + 1).padStart(2, '0')}. ${fileName.padEnd(40)} <- ${name}`);
});

console.log('\n\n═══════════════════════════════════════════════════');
console.log(`\n📊 TOTAL: ${uniqueChem.length + uniqueFert.length} archivos PDF necesarios`);
console.log('\n💡 INSTRUCCIONES:');
console.log('   1. Crea/renombra cada PDF con el nombre de archivo mostrado');
console.log('   2. Sube todos los PDFs a OneDrive:');
console.log('      https://1drv.ms/f/c/bfa2baf0e0a170a8/IgB4LugRqqW2SqzRGtHCeX8wAVWtVRpsVk87kWgb6Mtiwac?e=N288AP');
console.log('   3. Los botones SDS abrirán la carpeta donde están todos los archivos');

// Guardar lista en archivo de texto
const fs = require('fs');
let output = 'LISTA DE ARCHIVOS SDS PARA ONEDRIVE\n';
output += '====================================\n\n';
output += 'CHEMICAL SHEDS:\n';
uniqueChem.forEach(name => {
  output += `${buildFileName(name)}\n`;
});
output += '\nFERTILIZER SHEDS:\n';
uniqueFert.forEach(name => {
  output += `${buildFileName(name)}\n`;
});

fs.writeFileSync('onedrive-sds-files.txt', output);
console.log('\n✅ Lista guardada en: onedrive-sds-files.txt');
