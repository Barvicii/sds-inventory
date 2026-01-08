const XLSX = require('xlsx');
const fs = require('fs');

// Leer el Excel
const workbook = XLSX.readFile('ChemicalStores_20260108193555.xlsx');
const worksheet = workbook.Sheets['Data'];
const data = XLSX.utils.sheet_to_json(worksheet);

// Filtrar por los sheds objetivo
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

console.log(`Total de productos: ${filtered.length}`);
console.log('\nPrimeros 5 productos:');
filtered.slice(0, 5).forEach(item => {
  console.log(`- ${item.Chemical} (${item.ActiveIngredient}): ${Math.abs(item.Quantity).toFixed(2)} ${item.StockUnit} en ${item.Store}`);
});

console.log('\nDistribución por Shed:');
TARGET_STORES.forEach(store => {
  const count = filtered.filter(r => r.Store === store).length;
  console.log(`  ${store}: ${count} productos`);
});

// Generar el archivo de datos para la app
const mappedData = filtered.map(row => ({
  Nombre: row.Chemical,
  Activo: row.ActiveIngredient,
  Cantidad: `${Math.abs(row.Quantity).toFixed(2)} ${row.StockUnit}`,
  Peligro: 'low', // Clasificación por defecto
  LinkSDS: row.MSDSUrl || '',
  Ubicacion: row.Store,
  Tipo: row.ChemicalType
}));

fs.writeFileSync('data-preview.json', JSON.stringify(mappedData, null, 2));
console.log('\n✅ Datos exportados a data-preview.json');
