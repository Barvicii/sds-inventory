/**
 * Script para ayudar a generar el archivo onedrive-links.ts
 * 
 * INSTRUCCIONES:
 * 
 * OPCIÓN 1: Manual (más simple)
 * =============================
 * 1. Sube todos los PDFs a OneDrive con los nombres correctos (ver onedrive-sds-files.txt)
 * 2. Para cada PDF importante, haz clic derecho → "Compartir" → "Obtener vínculo"
 * 3. Copia el link y pégalo en lib/onedrive-links.ts
 * 
 * OPCIÓN 2: Usando PowerShell (Windows)
 * ======================================
 * Si tienes muchos archivos, puedes usar la API de OneDrive con PowerShell:
 * 
 * # Instalar módulo de Microsoft Graph
 * Install-Module Microsoft.Graph -Scope CurrentUser
 * 
 * # Conectar a tu cuenta
 * Connect-MgGraph -Scopes "Files.Read.All"
 * 
 * # Listar archivos en la carpeta SDS
 * Get-MgDriveItemChild -DriveId "YOUR_DRIVE_ID" -DriveItemId "YOUR_FOLDER_ID"
 * 
 * OPCIÓN 3: Usando este script con Graph API
 * ===========================================
 * Este script puede automatizar la obtención de links si configuras la autenticación.
 */

const XLSX = require('xlsx');
const fs = require('fs');

// Cargar lista de químicos del Excel
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

// Obtener químicos únicos
const uniqueChemicals = [...new Set(filtered.map(r => r.Chemical.trim()))].sort();

// Función para normalizar nombres
function normalizeChemicalName(name) {
  return name
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

// Generar template de TypeScript
console.log('📝 GENERANDO TEMPLATE PARA onedrive-links.ts\n');
console.log('Copia esto y reemplaza los URLs con tus links reales de OneDrive:\n');
console.log('=' .repeat(70));
console.log();

let tsContent = `/**
 * Mapa de químicos a sus URLs directas de SDS en OneDrive
 * Generado automáticamente - Actualiza los URLs con links reales
 */

export const ONEDRIVE_SDS_LINKS: Record<string, string> = {`;

// Agrupar en secciones
const chemSheds = filtered.filter(r => r.Store.includes('Chem Shed'));
const fertSheds = filtered.filter(r => r.Store.includes('Fert Shed'));

const chemNames = [...new Set(chemSheds.map(r => r.Chemical.trim()))].sort();
const fertNames = [...new Set(fertSheds.map(r => r.Chemical.trim()))].sort();

tsContent += '\n  // ========================================\n';
tsContent += '  // CHEMICAL SHEDS\n';
tsContent += '  // ========================================\n';

chemNames.forEach(name => {
  const normalized = normalizeChemicalName(name);
  const fileName = `${normalized}.pdf`;
  tsContent += `  '${normalized}': 'https://1drv.ms/...', // ${name} -> ${fileName}\n`;
});

tsContent += '\n  // ========================================\n';
tsContent += '  // FERTILIZER SHEDS\n';
tsContent += '  // ========================================\n';

fertNames.forEach(name => {
  const normalized = normalizeChemicalName(name);
  const fileName = `${normalized}.pdf`;
  tsContent += `  '${normalized}': 'https://1drv.ms/...', // ${name} -> ${fileName}\n`;
});

tsContent += `\n  // Fallback: carpeta general de SDS\n`;
tsContent += `  '__DEFAULT__': 'https://1drv.ms/f/c/bfa2baf0e0a170a8/IgB4LugRqqW2SqzRGtHCeX8wAVWtVRpsVk87kWgb6Mtiwac?e=N288AP'\n`;
tsContent += `};\n\n`;

tsContent += `export function getOneDriveSdsLink(chemicalName: string): string {
  const normalizedName = chemicalName
    .trim()
    .replace(/[^\\w\\s-]/g, '')
    .replace(/\\s+/g, '-')
    .toLowerCase();
  
  return ONEDRIVE_SDS_LINKS[normalizedName] || ONEDRIVE_SDS_LINKS['__DEFAULT__'];
}\n`;

// Guardar archivo
fs.writeFileSync('lib/onedrive-links-template.ts', tsContent);

console.log(tsContent);
console.log('=' .repeat(70));
console.log('\n✅ Template guardado en: lib/onedrive-links-template.ts');
console.log('\n📋 PRÓXIMOS PASOS:');
console.log('1. Sube todos los PDFs a OneDrive (ver onedrive-sds-files.txt)');
console.log('2. Para cada PDF, obtén el link de compartir desde OneDrive');
console.log('3. Reemplaza los URLs en lib/onedrive-links-template.ts');
console.log('4. Renombra el archivo a lib/onedrive-links.ts');
console.log('\n💡 TIP: Empieza con los químicos de alto riesgo más importantes');
console.log('    Los demás seguirán usando el link de la carpeta general\n');
