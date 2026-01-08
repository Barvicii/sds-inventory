/**
 * Mapa de químicos a sus URLs directas de SDS en OneDrive
 * 
 * INSTRUCCIONES PARA OBTENER LINKS DIRECTOS:
 * 1. Ve a OneDrive y abre la carpeta de SDS
 * 2. Haz clic derecho en un PDF → "Compartir" → "Obtener vínculo"
 * 3. Asegúrate de seleccionar "Cualquier persona con el vínculo puede ver"
 * 4. Copia el link y agrégalo aquí
 * 
 * IMPORTANTE: Los links de OneDrive tienen el formato:
 * https://onedrive.live.com/embed?resid=RESOURCE_ID&authkey=AUTH_KEY
 * 
 * Para DESCARGAR directamente (en lugar de ver):
 * Cambia "embed" por "download" en la URL
 */

export const ONEDRIVE_SDS_LINKS: Record<string, string> = {
  // Ejemplos de prueba (reemplaza con tus links reales)
  // 'altacor': 'https://onedrive.live.com/embed?resid=...',
  // 'bapsol-100': 'https://onedrive.live.com/embed?resid=...',
  
  // Fallback: carpeta general de SDS
  '__DEFAULT__': 'https://1drv.ms/f/c/bfa2baf0e0a170a8/IgB4LugRqqW2SqzRGtHCeX8wAVWtVRpsVk87kWgb6Mtiwac?e=N288AP'
};

/**
 * Obtiene el link de SDS para un químico específico
 * Si no hay link específico, devuelve el link de la carpeta general
 */
export function getOneDriveSdsLink(chemicalName: string): string {
  // Normalizar nombre para buscar en el mapa
  const normalizedName = chemicalName
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
  
  // Buscar link específico o usar fallback
  return ONEDRIVE_SDS_LINKS[normalizedName] || ONEDRIVE_SDS_LINKS['__DEFAULT__'];
}

/**
 * ALTERNATIVA: Si prefieres usar Microsoft Graph API
 * 
 * Puedes crear una función que haga fetch a la API de Microsoft Graph
 * para obtener links directos dinámicamente:
 * 
 * async function getOneDriveSdsLinkFromAPI(chemicalName: string) {
 *   const fileName = `${normalizedName}.pdf`;
 *   const graphUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/SDS/${fileName}`;
 *   // ... hacer fetch y obtener download URL
 * }
 * 
 * Esto requiere autenticación con Microsoft pero es más dinámico.
 */

// Script helper para generar este archivo automáticamente
// Ejecuta: node scripts/generate-onedrive-links.js
// (Necesitarás la Microsoft Graph API configurada)
