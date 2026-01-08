const XLSX = require('xlsx');

const wb = XLSX.readFile('Chemicals_20260108193431.xlsx');
const ws = wb.Sheets['Data'];

// Leer como array primero
const rawData = XLSX.utils.sheet_to_json(ws, { header: 1 });

console.log('Total de filas:', rawData.length);
console.log('\nPrimeras 5 filas:');
rawData.slice(0, 5).forEach((row, i) => {
  console.log(`Fila ${i}:`, row.slice(0, 5));
});

// Encontrar el índice de la fila de headers
let headerRow = -1;
for (let i = 0; i < 10; i++) {
  if (rawData[i] && rawData[i].includes('Description')) {
    headerRow = i;
    break;
  }
}

console.log(`\nFila de headers encontrada en índice: ${headerRow}`);

if (headerRow >= 0) {
  // Leer desde esa fila
  const range = XLSX.utils.decode_range(ws['!ref']);
  range.s.r = headerRow;
  ws['!ref'] = XLSX.utils.encode_range(range);
  
  const data = XLSX.utils.sheet_to_json(ws);
  
  console.log(`\nTotal de registros: ${data.length}`);
  console.log('\nPrimeros 3 químicos:');
  data.slice(0, 3).forEach((r, i) => {
    console.log(`\n${i+1}. ${r.Description}`);
    console.log(`   Activo: ${r.ActiveIngredient}`);
    console.log(`   Hazard: ${(r.HazardClasses || '').substring(0, 60)}`);
  });
}
