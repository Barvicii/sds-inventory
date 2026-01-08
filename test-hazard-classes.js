const XLSX = require('xlsx');

const wb = XLSX.readFile('Chemicals_20260108193431.xlsx');
const ws = wb.Sheets['Data'];
const data = XLSX.utils.sheet_to_json(ws, {header: 1});
const headerRow = data.findIndex(r => r && r.includes('Description'));
const chemicals = XLSX.utils.sheet_to_json(ws, {range: headerRow});

console.log('Ejemplos de HazardClasses:\n');
chemicals.slice(0, 15).forEach(c => {
  if (c.HazardClasses) {
    console.log(`${c.Description.padEnd(30)} -> ${c.HazardClasses}`);
  }
});
