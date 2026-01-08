const XLSX = require('xlsx');

// Leer el nuevo Excel
const workbook = XLSX.readFile('Chemicals_20260108193431.xlsx');
console.log('Hojas disponibles:', workbook.SheetNames);

const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

console.log('\nHeaders:');
console.log(data[0]);

console.log('\nPrimeras 10 filas:');
for (let i = 0; i < Math.min(10, data.length); i++) {
  console.log(`Fila ${i}:`, data[i]);
}

// Convertir a JSON y ver la estructura
const jsonData = XLSX.utils.sheet_to_json(worksheet);
console.log('\nEstructura de datos (primeros 3):');
jsonData.slice(0, 3).forEach((row, i) => {
  console.log(`\nRegistro ${i}:`);
  console.log(JSON.stringify(row, null, 2));
});

// Verificar columna HazardClasses
if (jsonData.length > 0 && jsonData[0].HazardClasses) {
  console.log('\n✅ Columna HazardClasses encontrada!');
  const hazardClasses = [...new Set(jsonData.map(r => r.HazardClasses).filter(Boolean))];
  console.log('Tipos de HazardClasses:', hazardClasses);
}
