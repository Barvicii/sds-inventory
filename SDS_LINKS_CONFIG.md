# 🔧 Configuración de Enlaces SDS

## Método Rápido: Plantilla Excel

He creado un sistema que te permite configurar todos los enlaces de una vez:

### Paso 1: Crear archivo de mapeo

Crea un Excel llamado `SDS_LINKS_MAPPING.xlsx` en la carpeta `public/` con estas columnas:

| ChemicalName | OneDriveLink |
|--------------|--------------|
| ALTACOR | https://1drv.ms/b/s!AqihFwDwuvqi... |
| BAPSOL 100 | https://1drv.ms/b/s!AqihFwDwuvqi... |
| CAN | https://1drv.ms/b/s!AqihFwDwuvqi... |

### Paso 2: Ejecutar el script

```powershell
node scripts/generate-sds-links.js
```

Este script leerá tu Excel y generará el código listo para copiar en `lib/onedrive-links.ts`.

---

## Cómo Obtener Enlaces de OneDrive

### Opción A: Compartir Individual (Recomendado)

Para cada PDF en OneDrive:

1. **Click derecho** en el archivo PDF
2. **Compartir** → **Obtener vínculo**
3. **Configurar** (engranaje ⚙️):
   - ✅ Cualquier persona con el vínculo puede ver
   - ❌ Permitir edición (dejar desactivado)
4. **Copiar** el enlace

El enlace se verá así: `https://1drv.ms/b/s!AqihFwDwuvqijQE_abc123?e=xyz789`

### Opción B: Embed Directo

Si quieres que el PDF se muestre en el navegador:

1. Obtén el enlace normal de OneDrive
2. Abre el enlace en tu navegador
3. En la barra de dirección verás algo como:
   ```
   https://onedrive.live.com/view.aspx?resid=ABC123&authkey=XYZ789
   ```
4. Cambia `view.aspx` por `embed`:
   ```
   https://onedrive.live.com/embed?resid=ABC123&authkey=XYZ789
   ```

### Opción C: Download Directo

Para que se descargue automáticamente:

Cambia `1drv.ms/b/` por `1drv.ms/download/`:
```
https://1drv.ms/download/s!AqihFwDwuvqijQE_abc123
```

---

## Estado Actual del Sistema

✅ **ChemicalCard.tsx** ya está configurado para:
1. Buscar primero en `chemical.LinkSDS` (desde el Excel)
2. Si no existe, buscar en el mapeo de `lib/onedrive-links.ts`
3. Si no existe, usar el link por defecto (carpeta de SDS)

---

## Ejemplo Completo

```typescript
// lib/onedrive-links.ts
export const ONEDRIVE_SDS_LINKS: Record<string, string> = {
  'altacor': 'https://1drv.ms/b/s!Aqih...',
  'bapsol-100': 'https://1drv.ms/b/s!Aqih...',
  'can': 'https://1drv.ms/b/s!Aqih...',
  
  '__DEFAULT__': 'https://1drv.ms/f/c/bfa2baf0e0a170a8/...'
};
```

---

## Testing

Después de configurar, para verificar:

```powershell
# Compilar
npm run build

# Probar localmente
npm run dev
```

Abre la página, haz click en "SDS" de cualquier químico y verifica que abra el PDF correcto.

---

## 📌 Nota Importante

Los PDFs en OneDrive DEBEN estar compartidos como **"Cualquier persona con el vínculo"** para que funcionen sin necesidad de login.
