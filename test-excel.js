const XLSX = require('xlsx');

const workbook = XLSX.readFile('ChemicalStores_20260108193555.xlsx');

console.log('Hojas disponibles:', workbook.SheetNames);
console.log('\n=== ANÁLISIS DE CADA HOJA ===\n');

workbook.SheetNames.forEach(sheetName => {
  console.log(`\n📄 HOJA: ${sheetName}`);
  console.log('='.repeat(50));
  
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
  
  console.log(`Total de filas: ${data.length}`);
  
  // Buscar la fila de headers (que tenga "Chemical", "Store", etc.)
  let headerRowIndex = -1;
  for (let i = 0; i < Math.min(10, data.length); i++) {
    if (data[i].includes('Chemical') || data[i].includes('Store')) {
      headerRowIndex = i;
      break;
    }
  }
  
  if (headerRowIndex >= 0) {
    console.log(`\nHeaders encontrados en fila ${headerRowIndex}:`);
    console.log(data[headerRowIndex]);
    
    console.log('\nPrimeras 10 filas de datos:');
    for (let i = headerRowIndex; i < Math.min(headerRowIndex + 11, data.length); i++) {
      console.log(`Fila ${i}:`, data[i]);
    }
  } else {
    console.log('\nPrimeras 15 filas:');
    data.slice(0, 15).forEach((row, i) => {
      console.log(`Fila ${i}:`, row);
    });
  }
});
