# 🔗 Guía para Conectar los SDS con OneDrive

## Opción 1: Enlaces Directos desde OneDrive (RECOMENDADO)

### Paso 1: Obtener el enlace directo de cada PDF

1. Ve a tu OneDrive y navega a la carpeta donde están los SDS
2. Haz clic derecho en un archivo PDF → **Compartir**
3. En la ventana que aparece:
   - Click en el engranaje ⚙️ de configuración
   - Selecciona **"Cualquier persona con el vínculo puede ver"**
   - **DESACTIVA** "Permitir edición" (solo lectura)
4. Copia el enlace generado

### Paso 2: Convertir a enlace de descarga directa

El enlace que OneDrive te da se ve así:
```
https://1drv.ms/b/s!AqihFwDwuvqijQE_abc123?e=xyz789
```

Para que abra el PDF directamente (en lugar de la página de OneDrive), puedes:

**Opción A: Usar el embed de OneDrive**
- Reemplaza `https://1drv.ms/b/` por `https://onedrive.live.com/embed?`
- Ejemplo: `https://onedrive.live.com/embed?resid=ABC123&authkey=XYZ789`

**Opción B: Usar download directo**
- Reemplaza `1drv.ms` por `1drv.ms/download`
- Ejemplo: `https://1drv.ms/download/s!AqihFwDwuvqijQE_abc123`

### Paso 3: Agregar los enlaces al archivo Excel

Actualiza tu Excel `ChemicalStores_*.xlsx` agregando la columna `LinkSDS` con los enlaces directos:

| ChemicalName | Quantity | Unit | LinkSDS |
|--------------|----------|------|---------|
| ALTACOR      | 5        | L    | https://1drv.ms/b/s!AqihFwDwuvqi... |
| BAPSOL 100   | 10       | L    | https://1drv.ms/b/s!AqihFwDwuvqi... |

---

## Opción 2: Mapeo Dinámico en Código (Alternativa)

Si prefieres mapear los químicos a sus PDFs directamente en código:

### Paso 1: Editar `lib/onedrive-links.ts`

```typescript
export const ONEDRIVE_SDS_LINKS: Record<string, string> = {
  // Formato: 'nombre-del-quimico': 'URL_DE_ONEDRIVE'
  
  'altacor': 'https://1drv.ms/b/s!AqihFwDwuvqijQE...',
  'bapsol-100': 'https://1drv.ms/b/s!AqihFwDwuvqijQF...',
  'can': 'https://1drv.ms/b/s!AqihFwDwuvqijQG...',
  'copper-hydroxide': 'https://1drv.ms/b/s!AqihFwDwuvqijQH...',
  
  // Agrega todos tus químicos aquí...
  
  // Link por defecto si no encuentra el químico específico
  '__DEFAULT__': 'https://1drv.ms/f/c/bfa2baf0e0a170a8/IgB4LugRqqW2SqzRGtHCeX8wAVWtVRpsVk87kWgb6Mtiwac?e=N288AP'
};
```

### Paso 2: Modificar ChemicalCard para usar el mapeo

El componente buscará primero en el Excel, si no hay link, usará el mapeo:

```typescript
import { getOneDriveSdsLink } from '@/lib/onedrive-links';

// En el componente:
const sdsLink = chemical.LinkSDS || getOneDriveSdsLink(chemical.Nombre);
```

---

## 🎯 Recomendación

**Usa Opción 1** si tienes los PDFs organizados en OneDrive y puedes actualizar el Excel fácilmente.

**Usa Opción 2** si prefieres tener todo el control en código y no quieres editar el Excel.

---

## 📱 Verificación

Después de configurar:

1. Abre la página en el navegador
2. Haz click en el botón "SDS" de un químico
3. Debería abrir el PDF directamente desde OneDrive

**Nota:** Asegúrate de que los PDFs estén compartidos como "Cualquier persona con el vínculo" para que funcionen sin login.
