const XLSX = require('xlsx');
const fs = require('fs');

// Cargar Excel de químicos (con HazardClasses)
const chemicalsWB = XLSX.readFile('Chemicals_20260108193431.xlsx');
const chemicalsWS = chemicalsWB.Sheets['Data'];

// Ajustar rango para saltar las primeras filas de metadata
const rawData = XLSX.utils.sheet_to_json(chemicalsWS, { header: 1 });
let headerRow = rawData.findIndex(row => row && row.includes('Description'));

if (headerRow >= 0) {
  const range = XLSX.utils.decode_range(chemicalsWS['!ref']);
  range.s.r = headerRow;
  chemicalsWS['!ref'] = XLSX.utils.encode_range(range);
}

const chemicalsData = XLSX.utils.sheet_to_json(chemicalsWS);

// Crear mapa de químicos por nombre
const chemicalsMap = new Map();
chemicalsData.forEach(chem => {
  if (chem.Description) {
    chemicalsMap.set(chem.Description.trim(), chem);
  }
});

console.log(`✅ Cargados ${chemicalsMap.size} químicos con información de peligro`);

// Cargar Excel de stores (con cantidades)
const storesWB = XLSX.readFile('ChemicalStores_20260108193555.xlsx');
const storesWS = storesWB.Sheets['Data'];
const storesData = XLSX.utils.sheet_to_json(storesWS);

// Filtrar por sheds objetivo
const TARGET_STORES = [
  'Judco Chem Shed',
  'Judco Fert Shed',
  'Patutahi Chem Shed',
  'Patutahi Fert Shed'
];

const filtered = storesData.filter(row => 
  TARGET_STORES.includes(row.Store) && 
  row.Quantity && 
  Math.abs(row.Quantity) > 0
);

console.log(`✅ ${filtered.length} registros en sheds objetivo con stock`);

// Agrupar por nombre de químico y sumar cantidades
const grouped = new Map();

filtered.forEach(store => {
  const key = store.Chemical.trim();
  
  if (!grouped.has(key)) {
    grouped.set(key, {
      totalQuantity: 0,
      unit: store.StockUnit,
      stores: new Set(),
      activeIngredient: store.ActiveIngredient,
      type: store.ChemicalType,
      msdsList: new Set()
    });
  }
  
  const group = grouped.get(key);
  group.totalQuantity += Math.abs(store.Quantity || 0);
  group.stores.add(store.Store);
  if (store.MSDSUrl) group.msdsList.add(store.MSDSUrl);
});

console.log(`✅ ${grouped.size} químicos únicos (después de agrupar)`);

// Clasificar peligro según HazardClasses
function classifyDanger(hazardClasses) {
  if (!hazardClasses) return 'low';
  
  const hazard = hazardClasses.toLowerCase();
  
  if (hazard.includes('class 6') || hazard.includes('class 8') || 
      hazard.includes('toxic to people') || hazard.includes('corrosive')) {
    return 'high';
  }
  
  if (hazard.includes('class 9') || hazard.includes('toxic to the environment') ||
      hazard.includes('flammable')) {
    return 'medium';
  }
  
  return 'low';
}

// Generar datos combinados
const combined = [];
grouped.forEach((group, chemicalName) => {
  const chemInfo = chemicalsMap.get(chemicalName);
  const msdsArray = Array.from(group.msdsList);
  
  combined.push({
    Nombre: chemicalName,
    Activo: group.activeIngredient,
    Cantidad: `${group.totalQuantity.toFixed(2)} ${group.unit}`,
    Peligro: chemInfo ? classifyDanger(chemInfo.HazardClasses) : 'low',
    LinkSDS: chemInfo?.MSDSLink || msdsArray[0] || '',
    Ubicacion: Array.from(group.stores).join(', '),
    Tipo: group.type,
    HazardClasses: chemInfo?.HazardClasses || ''
  });
});

// Ordenar por nombre
combined.sort((a, b) => a.Nombre.localeCompare(b.Nombre));

// Guardar resultado
fs.writeFileSync('combined-data.json', JSON.stringify(combined, null, 2));

console.log('\n📊 RESUMEN:');
console.log(`Total de químicos: ${combined.length}`);

const byDanger = {
  high: combined.filter(c => c.Peligro === 'high').length,
  medium: combined.filter(c => c.Peligro === 'medium').length,
  low: combined.filter(c => c.Peligro === 'low').length
};

console.log(`\nPor nivel de peligro:`);
console.log(`  🔴 Alto: ${byDanger.high}`);
console.log(`  🟠 Medio: ${byDanger.medium}`);
console.log(`  🟢 Bajo: ${byDanger.low}`);

console.log('\n✅ Datos exportados a combined-data.json');

// Mostrar ejemplos
console.log('\n📝 Primeros 5 químicos:');
combined.slice(0, 5).forEach(c => {
  console.log(`\n${c.Nombre}`);
  console.log(`  Cantidad: ${c.Cantidad}`);
  console.log(`  Peligro: ${c.Peligro}`);
  console.log(`  Ubicación: ${c.Ubicacion}`);
  if (c.HazardClasses) console.log(`  Hazard: ${c.HazardClasses.substring(0, 60)}...`);
});
