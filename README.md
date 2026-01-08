# Sistema de Inventario de Riesgo Químico - Craigmore Farming

Sistema profesional con Next.js para gestión de inventario químico con enfoque en respuesta a emergencias. Separado en Chemical Sheds y Fertilizer Sheds.

## 🚀 Características Principales

- ✅ **Página de Selección**: Landing page con QR que pregunta Chemical o Fertilizer
- ✅ **Dos Secciones Separadas**: Chemical Shed y Fertilizer Shed en ubicaciones diferentes
- ✅ **Lectura de 2 Excel**: Stores (cantidades) + Chemicals (HazardClasses)
- ✅ **Agrupación Inteligente**: Suma automática de químicos del mismo nombre
- ✅ **Clasificación por HazardClasses**: Usa clasificación oficial del Excel
- ✅ **Cantidad Destacada**: Campo muy visible para servicios de emergencia
- ✅ **Diseño Responsivo**: Optimizado para escanear QR en móviles

## 📱 Flujo de Uso

1. **Escanear QR** → Página de inicio
2. **Seleccionar tipo**: 
   - 🔴 **Chemical Shed** (Judco & Patutahi)
   - 🟢 **Fertilizer Shed** (Judco & Patutahi)
3. **Ver inventario** filtrado por tipo
4. **Buscar/Filtrar** por nivel de peligro
5. **Llamar 111** si es emergencia

## 📊 Estructura de Datos

### Chemical Sheds
- Productos químicos peligrosos
- Filtrado: Solo "Chem Shed"
- Ejemplos: Dodine, Altacor, Aptivis

### Fertilizer Sheds  
- Fertilizantes y nutrición
- Filtrado: Solo "Fert Shed"
- Ejemplos: Calcinit, Hi Cane

**Agrupación por nombre**:
- Si "Dodine" tiene 30L en Judco + 50L en Patutahi
- Se muestra: **Dodine - 80.00 L** (Total)
- Ubicación: "Judco Chem Shed, Patutahi Chem Shed"

## 🎨 Páginas

### `/` - Página de Inicio
- Dos botones grandes: Chemical y Fertilizer
- Diseño oscuro con iconos distintivos
- Info de emergencia con botón 111
- Ideal para escanear QR

### `/chemical` - Chemical Shed
- Solo químicos de Chem Sheds
- 🔴 Tema rojo (peligro)
- Botón volver a inicio

### `/fertilizer` - Fertilizer Shed
- Solo fertilizantes de Fert Sheds
- 🟢 Tema verde (nutrición)
- Botón volver a inicio

## 🏗️ Estructura del Excel

El sistema lee automáticamente de la hoja "Data" con estas columnas:

| Columna | Descripción | Uso en la App |
|---------|-------------|---------------|
| Chemical | Nombre del químico | **Título principal** |
| ActiveIngredient | Ingrediente activo | Subtítulo con icono |
| Quantity | Cantidad numérica | **Muy destacado** (ej: 85.72) |
| StockUnit | Unidad (L, kg) | Se concatena con Quantity |
| Store | Almacén/Shed | Ubicación + filtro |
| MSDSUrl | URL del SDS | Botón PDF |
| ChemicalType | Tipo de químico | Badge de tipo |

## 🚦 Instalación y Uso

### 1. Instalar Dependencias

```powershell
npm install
```

### 2. Ejecutar en Desarrollo

```powershell
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### 3. Ver la Aplicación

Abre tu navegador en: http://localhost:3002 (o el puerto que indique la terminal)

## 📁 Estructura del Proyecto

```
SDS/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx             # Página con configuración de Excel
│   └── globals.css          # Estilos globales
├── components/
│   ├── ChemicalCard.tsx     # 🎯 Tarjeta (CANTIDAD DESTACADA)
│   ├── InventoryList.tsx    # 📊 Carga Excel y filtros
│   ├── Header.tsx           # Encabezado de emergencia
│   └── Footer.tsx           # Pie con firma BarviciiCorp
├── lib/
│   ├── excel.ts             # 📁 Lógica de lectura de Excel
│   └── utils.ts             # Clasificación de peligro
├── types/
│   └── chemical.ts          # Tipos TypeScript
├── public/
│   └── ChemicalStores_...xlsx  # Excel de datos
└── package.json
```

## 🔧 Configuración

### Archivo Local

El sistema ya está configurado para usar el Excel en `public/`:

```typescript
// app/page.tsx
const EXCEL_PATH = '/ChemicalStores_20260108193555.xlsx';
```

### OneDrive (Futuro)

Para usar Excel desde OneDrive:

1. Sube el Excel a OneDrive
2. Obtén el enlace compartido público
3. En `app/page.tsx`:

```typescript
const ONEDRIVE_URL = "https://tu-sharepoint.com/...xlsx";
<InventoryList excelUrl={ONEDRIVE_URL} />
```

## �️ Clasificación de Peligro (HazardClasses)

El sistema usa la columna `HazardClasses` del Excel de químicos:

- 🔴 **Alto Riesgo**: Class 6 (Tóxico), Class 8 (Corrosivo)
- 🟠 **Riesgo Medio**: Class 9 (Eco-tóxico), Class 3 (Inflamable)
- 🟢 **Bajo Riesgo**: Sin clasificaciones de alto/medio riesgo

## 🚦 Uso

### 1. Instalar dependencias
```powershell
npm install
```

### 2. Ejecutar en desarrollo
```powershell
npm run dev
```

Abre http://localhost:3000 en tu navegador

### 3. Ver datos reales

Los archivos Excel ya están en `public/`:
- ChemicalStores_20260108193555.xlsx
- Chemicals_20260108193431.xlsx

La app los carga automáticamente y muestra los químicos agrupados y sumados.

## 🔄 Actualizar Datos

1. **Localmente**: Reemplaza los archivos en `public/`
2. **OneDrive**: Configura las URLs en [app/page.tsx](app/page.tsx)

## ✨ Características Implementadas

### Agrupación de Químicos
Si un químico aparece en múltiples sheds, se suma la cantidad total:
```
Dodine: 
  - Judco Chem Shed: 50 L
  - Patutahi Chem Shed: 30 L
  → Se muestra: Dodine - 80.00 L
```

### Ubicación Múltiple
La tarjeta muestra todos los sheds donde está el químico:
```
Ubicación: Judco Chem Shed, Patutahi Chem Shed
```

---

**Desarrollado by BarviciiCorp** para Craigmore Farming
