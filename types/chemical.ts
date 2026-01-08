// Tipos para el inventario de químicos
export type DangerLevel = 'high' | 'medium' | 'low';

// Estructura del nuevo Excel (Chemicals_20260108193431.xlsx)
export interface ExcelChemical {
  SprayChemicalID: number;
  Description: string;
  Type: string;
  StockUnit: string;
  ActiveIngredient: string;
  HazardClasses: string;
  MSDSLink: string;
  MSDSExpiryDate: number;
  // Otras columnas existen pero no las necesitamos
}

// Estructura del Excel de stores (ChemicalStores_...)
export interface ExcelStore {
  ActiveIngredient: string;
  Chemical: string;
  ChemicalType: string;
  Quantity: number;
  StockUnit: string;
  Store: string;
  MSDSUrl: string;
}

// Estructura procesada para la UI
export interface Chemical {
  Nombre: string;
  Activo: string;
  Cantidad: string; // Ej: "85.72 L" (suma de todos los sheds)
  Peligro: DangerLevel;
  LinkSDS: string;
  Ubicacion: string; // Lista de stores donde está
  Tipo: string;
  HazardClasses?: string; // Para mostrar clasificación oficial
}

export interface DangerStyles {
  border: string;
  badge: string;
  icon: string;
  text: string;
  quantityBg?: string; // Para el fondo de alerta de cantidad en alto riesgo
}
