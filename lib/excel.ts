import * as XLSX from 'xlsx';
import { Chemical, ExcelChemical, ExcelStore } from '@/types/chemical';
import { normalizeDangerLevel, classifyChemicalDanger } from './utils';
import { getOneDriveSdsLink } from './onedrive-links';

/**
 * Carga datos desde MongoDB vía API
 */
export async function loadDataFromMongoDB(): Promise<Chemical[]> {
  try {
    const response = await fetch('/api/inventory', { cache: 'no-store' });
    
    if (!response.ok) {
      console.error('API de inventario no disponible (404). Verifica que MONGODB_URI esté configurado en Vercel.');
      throw new Error('No se pudo conectar con la base de datos. Por favor contacta al administrador.');
    }

    const data = await response.json();
    
    if (!data.chemicals || data.chemicals.length === 0) {
      console.warn('No hay datos en MongoDB. Sube un archivo Excel desde /admin');
      return [];
    }

    // Agrupar datos por químico y tipo de shed
    const grouped = new Map<string, {
      totalQuantity: number;
      unit: string;
      stores: Set<string>;
      firstEntry: any;
      shedType: 'Chem' | 'Fert';
    }>();

    data.chemicals.forEach((item: any) => {
      // Determinar tipo de shed
      const shedType: 'Chem' | 'Fert' = item.store?.includes('Chem Shed') ? 'Chem' : 'Fert';
      
      // Clave única: nombre + tipo de shed
      const key = `${item.name.trim()}|${shedType}`;
      
      if (!grouped.has(key)) {
        grouped.set(key, {
          totalQuantity: 0,
          unit: item.stockUnit || '',
          stores: new Set(),
          firstEntry: item,
          shedType
        });
      }
      
      const group = grouped.get(key)!;
      group.totalQuantity += Math.abs(item.total || 0);
      group.stores.add(item.store);
    });

    // Convertir a Chemical[]
    const chemicals: Chemical[] = [];
    
    grouped.forEach((group, key) => {
      const chemicalName = key.split('|')[0];
      const cantidadFormateada = `${group.totalQuantity.toFixed(2)} ${group.unit}`.trim();
      const storesList = Array.from(group.stores).join(', ');
      const linkSDS = buildOneDriveSdsUrl(chemicalName);

      chemicals.push({
        Nombre: chemicalName,
        Activo: group.firstEntry.activeIngredient || '',
        Cantidad: cantidadFormateada,
        Peligro: classifyChemicalDanger(group.firstEntry.hazardClasses, chemicalName, group.firstEntry.activeIngredient || ''),
        LinkSDS: linkSDS,
        Ubicacion: storesList,
        Tipo: group.firstEntry.type || 'Chemical',
        HazardClasses: group.firstEntry.hazardClasses,
      });
    });

    console.log(`✅ ${chemicals.length} químicos cargados desde MongoDB`);
    return chemicals;
  } catch (error) {
    console.error('Error al cargar desde MongoDB:', error);
    throw error;
  }
}


// Sheds objetivo a mostrar
const TARGET_STORES = [
  'Judco Chem Shed',
  'Judco Fert Shed',
  'Patutahi Chem Shed',
  'Patutahi Fert Shed'
];

// Link base de OneDrive donde se guardan los SDS
// Formato: https://onedrive.live.com/embed?resid=RESOURCE_ID&authkey=AUTH_KEY
const ONEDRIVE_FOLDER_ID = 'BFA2BAF0E0A170A8!108'; // ID de la carpeta en OneDrive
const ONEDRIVE_AUTH_KEY = 'AeBguWqFtrapSIrRwtl8fzA'; // Auth key de la carpeta

/**
 * Construye la URL de OneDrive para el archivo SDS de un químico
 * Usa el mapa de links configurado en onedrive-links.ts
 * 
 * NOTA: Para obtener links directos a PDFs individuales, necesitas:
 * 1. Subir cada PDF a OneDrive con el nombre correcto (ej: altacor.pdf)
 * 2. Obtener el link de compartir de cada archivo
 * 3. Agregarlos al archivo lib/onedrive-links.ts
 * 
 * Mientras tanto, todos los links apuntan a la carpeta general
 */
function buildOneDriveSdsUrl(chemicalName: string): string {
  return getOneDriveSdsLink(chemicalName);
}

/**
 * Agrupa químicos por nombre Y tipo de shed (Chem vs Fert)
 * Si un químico está en ambos tipos de shed, se crea un registro separado para cada uno
 */
function groupAndSumChemicals(stores: ExcelStore[], chemicalsInfo: Map<string, ExcelChemical>): Chemical[] {
  // Agrupar por: nombre_químico + tipo_shed (Chem o Fert)
  const grouped = new Map<string, {
    totalQuantity: number;
    unit: string;
    stores: Set<string>;
    firstEntry: ExcelStore;
    shedType: 'Chem' | 'Fert';
  }>();

  stores.forEach(store => {
    // Determinar tipo de shed
    const shedType: 'Chem' | 'Fert' = store.Store.includes('Chem Shed') ? 'Chem' : 'Fert';
    
    // Clave única: nombre + tipo de shed
    const key = `${store.Chemical.trim()}|${shedType}`;
    
    if (!grouped.has(key)) {
      grouped.set(key, {
        totalQuantity: 0,
        unit: store.StockUnit,
        stores: new Set(),
        firstEntry: store,
        shedType
      });
    }
    
    const group = grouped.get(key)!;
    group.totalQuantity += Math.abs(store.Quantity || 0);
    group.stores.add(store.Store);
  });

  // Convertir a Chemical[]
  const chemicals: Chemical[] = [];
  
  grouped.forEach((group, key) => {
    const chemicalName = key.split('|')[0]; // Extraer nombre sin el tipo
    const chemInfo = chemicalsInfo.get(chemicalName);
    const cantidadFormateada = `${group.totalQuantity.toFixed(2)} ${group.unit}`.trim();
    const storesList = Array.from(group.stores).join(', ');

    // Prioridad de link SDS: 1) Excel Chemicals, 2) Excel Stores, 3) OneDrive
    const linkSDS = chemInfo?.MSDSLink || group.firstEntry.MSDSUrl || buildOneDriveSdsUrl(chemicalName);

    chemicals.push({
      Nombre: chemicalName,
      Activo: group.firstEntry.ActiveIngredient || chemInfo?.ActiveIngredient || '',
      Cantidad: cantidadFormateada,
      Peligro: chemInfo 
        ? classifyChemicalDanger(chemInfo.HazardClasses, chemicalName, chemInfo.ActiveIngredient)
        : classifyChemicalDanger(undefined, chemicalName, group.firstEntry.ActiveIngredient),
      LinkSDS: linkSDS,
      Ubicacion: storesList,
      Tipo: group.firstEntry.ChemicalType || chemInfo?.Type || 'Chemical',
      HazardClasses: chemInfo?.HazardClasses,
    });
  });

  return chemicals;
}

/**
 * Lee el archivo de información de químicos (Chemicals_*.xlsx)
 */
function loadChemicalsInfo(workbook: XLSX.WorkBook): Map<string, ExcelChemical> {
  const chemicalsMap = new Map<string, ExcelChemical>();
  
  try {
    const sheetName = workbook.SheetNames.includes('Data') ? 'Data' : workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Leer como array para encontrar la fila de headers
    const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
    const headerRowIndex = rawData.findIndex(row => row && row.includes('Description'));
    
    // Ajustar el rango si encontramos headers
    if (headerRowIndex >= 0) {
      const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
      range.s.r = headerRowIndex;
      worksheet['!ref'] = XLSX.utils.encode_range(range);
    }
    
    const data = XLSX.utils.sheet_to_json(worksheet) as ExcelChemical[];
    
    data.forEach(chem => {
      if (chem.Description) {
        chemicalsMap.set(chem.Description.trim(), chem);
      }
    });
    
    console.log(`✅ Cargados ${chemicalsMap.size} químicos con información de HazardClasses`);
  } catch (error) {
    console.warn('No se pudo cargar información de químicos:', error);
  }
  
  return chemicalsMap;
}

/**
 * Lee el archivo de stores (ChemicalStores_*.xlsx)
 */
function loadStoresData(workbook: XLSX.WorkBook): ExcelStore[] {
  const sheetName = workbook.SheetNames.includes('Data') ? 'Data' : workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet) as ExcelStore[];
  
  // Filtrar solo los sheds objetivo con stock
  return data.filter(row => 
    TARGET_STORES.includes(row.Store) && 
    row.Quantity && 
    Math.abs(row.Quantity) > 0
  );
}

/**
 * Procesa los datos del Excel
 */
function processExcelData(data: ArrayBuffer | string): Chemical[] {
  // Leer el archivo con XLSX
  const workbook = XLSX.read(data, { type: data instanceof ArrayBuffer ? 'array' : 'binary' });
  
  // Cargar datos de stores
  const stores = loadStoresData(workbook);
  
  // Intentar cargar información adicional de químicos
  // (esto funcionará si el Excel tiene la estructura correcta)
  const chemicalsInfo = loadChemicalsInfo(workbook);
  
  // Agrupar y sumar
  const chemicals = groupAndSumChemicals(stores, chemicalsInfo);
  
  return chemicals;
}

/**
 * Carga datos de ambos archivos Excel y los combina
 */
export async function loadCombinedData(
  storesUrl: string,
  chemicalsUrl: string
): Promise<Chemical[]> {
  try {
    // Cargar ambos archivos en paralelo
    const [storesResponse, chemicalsResponse] = await Promise.all([
      fetch(storesUrl),
      fetch(chemicalsUrl)
    ]);

    if (!storesResponse.ok) {
      throw new Error(`Error al descargar stores: ${storesResponse.statusText}`);
    }
    if (!chemicalsResponse.ok) {
      throw new Error(`Error al descargar chemicals: ${chemicalsResponse.statusText}`);
    }

    const [storesBuffer, chemicalsBuffer] = await Promise.all([
      storesResponse.arrayBuffer(),
      chemicalsResponse.arrayBuffer()
    ]);

    // Procesar stores
    const storesWB = XLSX.read(storesBuffer, { type: 'array' });
    const stores = loadStoresData(storesWB);

    // Procesar chemicals
    const chemicalsWB = XLSX.read(chemicalsBuffer, { type: 'array' });
    const chemicalsInfo = loadChemicalsInfo(chemicalsWB);

    // Agrupar y combinar
    const chemicals = groupAndSumChemicals(stores, chemicalsInfo);

    console.log(`✅ ${chemicals.length} químicos únicos después de agrupar`);

    return chemicals;
  } catch (error) {
    console.error('Error al cargar datos:', error);
    throw error;
  }
}

/**
 * Lee un archivo Excel desde una URL (OneDrive, Google Drive, etc.)
 * y lo convierte a un array de objetos Chemical
 */
export async function fetchExcelFromUrl(url: string): Promise<Chemical[]> {
  try {
    // Fetch del archivo Excel
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error al descargar el archivo: ${response.statusText}`);
    }

    // Convertir a ArrayBuffer
    const arrayBuffer = await response.arrayBuffer();
    
    return processExcelData(arrayBuffer);
  } catch (error) {
    console.error('Error al procesar el archivo Excel:', error);
    throw error;
  }
}

/**
 * Lee un archivo Excel local (subido por el usuario)
 */
export async function readExcelFile(file: File): Promise<Chemical[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result as string;
        const chemicals = processExcelData(data);
        resolve(chemicals);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
}
