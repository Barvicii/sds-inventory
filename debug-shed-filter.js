const XLSX = require('xlsx');

const wb = XLSX.readFile('ChemicalStores_20260108193555.xlsx');
const ws = wb.Sheets['Data'];
const data = XLSX.utils.sheet_to_json(ws);

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

// Agrupar por nombre de químico
const grouped = new Map();

filtered.forEach(row => {
  const key = row.Chemical.trim();
  
  if (!grouped.has(key)) {
    grouped.set(key, {
      name: key,
      stores: new Set(),
      totalQty: 0,
      unit: row.StockUnit
    });
  }
  
  const group = grouped.get(key);
  group.totalQty += Math.abs(row.Quantity);
  group.stores.add(row.Store);
});

// Separar en Chemical y Fertilizer
const chemChemicals = [];
const fertChemicals = [];
const mixedChemicals = [];

grouped.forEach((group, name) => {
  const storesArray = Array.from(group.stores);
  const hasChem = storesArray.some(s => s.includes('Chem Shed'));
  const hasFert = storesArray.some(s => s.includes('Fert Shed'));
  
  if (hasChem && hasFert) {
    mixedChemicals.push({ name, stores: storesArray });
  } else if (hasChem) {
    chemChemicals.push({ name, stores: storesArray });
  } else if (hasFert) {
    fertChemicals.push({ name, stores: storesArray });
  }
});

console.log('🔍 ANÁLISIS DE QUÍMICOS POR TIPO DE SHED\n');
console.log('═══════════════════════════════════════════════════\n');

console.log('🔴 SOLO EN CHEMICAL SHEDS:');
console.log(`   Total: ${chemChemicals.length} químicos\n`);

console.log('🟢 SOLO EN FERTILIZER SHEDS:');
console.log(`   Total: ${fertChemicals.length} químicos\n`);

console.log('⚠️  EN AMBOS TIPOS (Chemical Y Fertilizer):');
console.log(`   Total: ${mixedChemicals.length} químicos\n`);

if (mixedChemicals.length > 0) {
  console.log('   LISTA DE QUÍMICOS MIXTOS:');
  mixedChemicals.forEach(({ name, stores }) => {
    console.log(`   - ${name}`);
    stores.forEach(s => console.log(`     * ${s}`));
  });
  
  console.log('\n⚠️  PROBLEMA DETECTADO:');
  console.log('   Estos químicos aparecen en AMBOS tipos de shed.');
  console.log('   Cuando un químico está tanto en Chem como en Fert,');
  console.log('   el filtro actual mostrará el químico en AMBAS páginas');
  console.log('   porque la ubicación incluye ambos tipos de shed.\n');
  
  console.log('💡 SOLUCIÓN:');
  console.log('   Necesitamos cambiar la lógica de agrupación para');
  console.log('   separar el mismo químico en dos registros diferentes');
  console.log('   cuando esté en diferentes tipos de shed.\n');
}

console.log('═══════════════════════════════════════════════════\n');
console.log('📊 RESUMEN:');
console.log(`   Chemical only: ${chemChemicals.length}`);
console.log(`   Fertilizer only: ${fertChemicals.length}`);
console.log(`   Mixed (ambos): ${mixedChemicals.length}`);
console.log(`   TOTAL: ${chemChemicals.length + fertChemicals.length + mixedChemicals.length}\n`);
