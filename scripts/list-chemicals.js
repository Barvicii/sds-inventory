const XLSX = require('xlsx');

// Leer el Excel de inventario
const workbook = XLSX.readFile('./public/ChemicalStores_20260108193555.xlsx');
const sheetName = workbook.SheetNames.includes('Data') ? 'Data' : workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Leer como array para encontrar la fila de headers
const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
const headerRowIndex = rawData.findIndex(row => 
  row && (row.includes('Chemical') || row.includes('ChemicalName'))
);

console.log(`📍 Headers encontrados en fila ${headerRowIndex}`);

// Ajustar el rango si encontramos headers
if (headerRowIndex >= 0) {
  const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
  range.s.r = headerRowIndex;
  worksheet['!ref'] = XLSX.utils.encode_range(range);
}

const data = XLSX.utils.sheet_to_json(worksheet);

console.log(`\n📄 Total de filas: ${data.length}`);
if (data.length > 0) {
  console.log('📋 Columnas:', Object.keys(data[0]));
  console.log('\n🔍 Primeras 2 filas:');
  console.log(JSON.stringify(data.slice(0, 2), null, 2));
}

// Obtener lista única de químicos usando la columna correcta
const chemicalKey = data.length > 0 ? 
  (data[0].Chemical ? 'Chemical' : data[0].ChemicalName ? 'ChemicalName' : null) : null;

if (!chemicalKey) {
  console.error('\n❌ No se encontró columna de químicos');
  process.exit(1);
}

const chemicals = [...new Set(data
  .map(row => row[chemicalKey])
  .filter(name => 
    name && 
    name !== chemicalKey && 
    name !== '(blank)' &&
    !name.includes('Total')
  )
)].sort();

console.log(`\n📋 Total de químicos únicos: ${chemicals.length}\n`);
console.log('Lista de químicos:\n');
chemicals.forEach((chemical, index) => {
  console.log(`${(index + 1).toString().padStart(2, '0')}. ${chemical}`);
});

console.log('\n\n🔗 Generando template para OneDrive links...\n');
console.log('// Copia este código en lib/onedrive-links.ts\n');

// Generar el código TypeScript para copiar
console.log('export const ONEDRIVE_SDS_LINKS: Record<string, string> = {');

chemicals.forEach(chemical => {
  // Normalizar nombre
  const normalizedName = chemical
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
  
  // Template de comentario con el nombre original
  console.log(`  // ${chemical}`);
  console.log(`  '${normalizedName}': 'PASTE_ONEDRIVE_LINK_HERE',`);
});

console.log(`  \n  // Link por defecto a la carpeta de SDS`);
console.log(`  '__DEFAULT__': 'https://onedrive.live.com/?id=BFA2BAF0E0A170A8%21s11e82e78a5aa4ab6acd11ad1c2797f30&cid=BFA2BAF0E0A170A8'`);
console.log('};\n');

