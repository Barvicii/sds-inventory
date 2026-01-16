const XLSX = require('xlsx');

const workbook = XLSX.readFile('./public/ChemicalStores_20260108193555.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

console.log('📊 Primeras 20 filas en formato array:\n');
const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
rawData.slice(0, 20).forEach((row, i) => {
  console.log(`Fila ${i}:`, JSON.stringify(row));
});
