const XLSX = require('xlsx');

// Leer el Excel de inventario
const workbook = XLSX.readFile('./public/ChemicalStores_20260108193555.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(sheet);

console.log('📊 Primeras 2 filas del Excel:\n');
console.log(JSON.stringify(data.slice(0, 2), null, 2));

console.log('\n📋 Columnas disponibles:\n');
if (data.length > 0) {
  Object.keys(data[0]).forEach((key, index) => {
    console.log(`${index + 1}. "${key}"`);
  });
}
