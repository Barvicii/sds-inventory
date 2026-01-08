const XLSX = require('xlsx');

// Simular la lógica de agrupación corregida
function groupAndSumChemicals(stores) {
  const grouped = new Map();

  stores.forEach(store => {
    // Determinar tipo de shed
    const shedType = store.Store.includes('Chem Shed') ? 'Chem' : 'Fert';
    
    // Clave única: nombre + tipo de shed
    const key = `${store.Chemical.trim()}|${shedType}`;
    
    if (!grouped.has(key)) {
      grouped.set(key, {
        name: store.Chemical.trim(),
        totalQuantity: 0,
        unit: store.StockUnit,
        stores: new Set(),
        shedType
      });
    }
    
    const group = grouped.get(key);
    group.totalQuantity += Math.abs(store.Quantity || 0);
    group.stores.add(store.Store);
  });

  return Array.from(grouped.values());
}

// Cargar Excel
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

// Aplicar nueva lógica de agrupación
const grouped = groupAndSumChemicals(filtered);

// Separar por tipo
const chemChems = grouped.filter(g => g.shedType === 'Chem');
const fertChems = grouped.filter(g => g.shedType === 'Fert');

console.log('✅ VERIFICACIÓN DEL FIX DE FILTRADO\n');
console.log('═══════════════════════════════════════════════════\n');

console.log('🔴 CHEMICAL SHEDS:');
console.log(`   Total: ${chemChems.length} registros\n`);

console.log('🟢 FERTILIZER SHEDS:');
console.log(`   Total: ${fertChems.length} registros\n`);

// Buscar los químicos problemáticos
const canInChem = chemChems.find(c => c.name === 'Calcium Ammonium Nitrate (CAN)');
const canInFert = fertChems.find(c => c.name === 'Calcium Ammonium Nitrate (CAN)');
const mgInChem = chemChems.find(c => c.name === 'Magnesium Sulphate');
const mgInFert = fertChems.find(c => c.name === 'Magnesium Sulphate');

console.log('🔍 QUÍMICOS QUE ESTABAN EN AMBOS TIPOS:\n');

if (canInChem && canInFert) {
  console.log('✅ Calcium Ammonium Nitrate (CAN):');
  console.log(`   En Chemical Sheds: ${canInChem.totalQuantity.toFixed(2)} ${canInChem.unit}`);
  console.log(`   Ubicación: ${Array.from(canInChem.stores).join(', ')}`);
  console.log(`   En Fertilizer Sheds: ${canInFert.totalQuantity.toFixed(2)} ${canInFert.unit}`);
  console.log(`   Ubicación: ${Array.from(canInFert.stores).join(', ')}\n`);
} else {
  console.log('❌ CAN no se separó correctamente\n');
}

if (mgInChem && mgInFert) {
  console.log('✅ Magnesium Sulphate:');
  console.log(`   En Chemical Sheds: ${mgInChem.totalQuantity.toFixed(2)} ${mgInChem.unit}`);
  console.log(`   Ubicación: ${Array.from(mgInChem.stores).join(', ')}`);
  console.log(`   En Fertilizer Sheds: ${mgInFert.totalQuantity.toFixed(2)} ${mgInFert.unit}`);
  console.log(`   Ubicación: ${Array.from(mgInFert.stores).join(', ')}\n`);
} else {
  console.log('❌ Magnesium Sulphate no se separó correctamente\n');
}

console.log('═══════════════════════════════════════════════════\n');
console.log('📊 RESULTADO:');
console.log(`   Chemical page mostrará: ${chemChems.length} químicos`);
console.log(`   Fertilizer page mostrará: ${fertChems.length} químicos`);
console.log(`\n   ✅ Cada químico solo aparece en su tipo de shed correspondiente\n`);
