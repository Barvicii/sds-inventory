/**
 * Script para generar el mapeo de químicos a enlaces de OneDrive
 * 
 * INSTRUCCIONES:
 * 
 * 1. Crea un archivo Excel o CSV con dos columnas:
 *    - ChemicalName
 *    - OneDriveLink
 * 
 * 2. Exporta ese archivo como CSV
 * 
 * 3. Ejecuta este script: node scripts/generate-sds-links.js
 * 
 * 4. El script generará el código para copiar en lib/onedrive-links.ts
 */

const fs = require('fs');
const XLSX = require('xlsx');

// Función para normalizar nombres de químicos
function normalizeChemicalName(name) {
  return name
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

// Ruta al archivo Excel con los mapeos
const MAPPING_FILE = './public/SDS_LINKS_MAPPING.xlsx';

try {
  // Leer el archivo Excel
  const workbook = XLSX.readFile(MAPPING_FILE);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  
  // Convertir a JSON
  const data = XLSX.utils.sheet_to_json(sheet);
  
  console.log('📋 Generando mapeo de enlaces de OneDrive...\n');
  
  // Generar el código TypeScript
  let output = 'export const ONEDRIVE_SDS_LINKS: Record<string, string> = {\n';
  
  data.forEach((row) => {
    const chemicalName = row.ChemicalName || row['Chemical Name'] || row.Nombre;
    const link = row.OneDriveLink || row.Link || row.URL;
    
    if (chemicalName && link) {
      const normalizedName = normalizeChemicalName(chemicalName);
      output += `  '${normalizedName}': '${link}',\n`;
    }
  });
  
  output += `  \n  // Link por defecto a la carpeta de SDS\n`;
  output += `  '__DEFAULT__': 'https://1drv.ms/f/c/bfa2baf0e0a170a8/IgB4LugRqqW2SqzRGtHCeX8wAVWtVRpsVk87kWgb6Mtiwac?e=N288AP'\n`;
  output += '};\n';
  
  console.log(output);
  console.log(`\n✅ Procesados ${data.length} químicos`);
  console.log('\n📋 Copia este código en lib/onedrive-links.ts');
  
} catch (error) {
  if (error.code === 'ENOENT') {
    console.log('❌ No se encontró el archivo de mapeo.');
    console.log('\n📝 Crea un Excel con estas columnas:');
    console.log('   - ChemicalName');
    console.log('   - OneDriveLink');
    console.log('\nY guárdalo como: ./public/SDS_LINKS_MAPPING.xlsx');
  } else {
    console.error('❌ Error:', error.message);
  }
}
