const XLSX = require('xlsx');

// Cargar Excel de stores
const wb = XLSX.readFile('ChemicalStores_20260108193555.xlsx');
const ws = wb.Sheets['Data'];
const data = XLSX.utils.sheet_to_json(ws);

// Filtrar por sheds objetivo
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

// Agrupar por tipo (Chem vs Fert)
const chemSheds = filtered.filter(r => r.Store.includes('Chem Shed'));
const fertSheds = filtered.filter(r => r.Store.includes('Fert Shed'));

// Contar únicos
const uniqueChem = new Set(chemSheds.map(r => r.Chemical.trim())).size;
const uniqueFert = new Set(fertSheds.map(r => r.Chemical.trim())).size;

console.log('📊 RESUMEN POR TIPO DE SHED\n');

console.log('🔴 CHEMICAL SHEDS:');
console.log(`   Registros: ${chemSheds.length}`);
console.log(`   Químicos únicos: ${uniqueChem}`);
console.log(`   Sheds: Judco Chem Shed, Patutahi Chem Shed\n`);

console.log('🟢 FERTILIZER SHEDS:');
console.log(`   Registros: ${fertSheds.length}`);
console.log(`   Químicos únicos: ${uniqueFert}`);
console.log(`   Sheds: Judco Fert Shed, Patutahi Fert Shed\n`);

console.log('📦 EJEMPLOS:\n');
console.log('Chemical Shed - Primeros 5:');
const chemUnique = [...new Set(chemSheds.map(r => r.Chemical.trim()))];
chemUnique.slice(0, 5).forEach(name => {
  const records = chemSheds.filter(r => r.Chemical.trim() === name);
  const total = records.reduce((sum, r) => sum + Math.abs(r.Quantity), 0);
  const unit = records[0].StockUnit;
  const stores = [...new Set(records.map(r => r.Store))].join(', ');
  console.log(`  - ${name}: ${total.toFixed(2)} ${unit}`);
  console.log(`    ${stores}`);
});

console.log('\nFertilizer Shed - Primeros 5:');
const fertUnique = [...new Set(fertSheds.map(r => r.Chemical.trim()))];
fertUnique.slice(0, 5).forEach(name => {
  const records = fertSheds.filter(r => r.Chemical.trim() === name);
  const total = records.reduce((sum, r) => sum + Math.abs(r.Quantity), 0);
  const unit = records[0].StockUnit;
  const stores = [...new Set(records.map(r => r.Store))].join(', ');
  console.log(`  - ${name}: ${total.toFixed(2)} ${unit}`);
  console.log(`    ${stores}`);
});
