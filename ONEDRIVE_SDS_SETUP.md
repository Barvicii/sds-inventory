# 📦 Configuración de SDS en OneDrive

## 🔗 Link de la carpeta OneDrive
**Carpeta principal:** https://1drv.ms/f/c/bfa2baf0e0a170a8/IgB4LugRqqW2SqzRGtHCeX8wAVWtVRpsVk87kWgb6Mtiwac?e=N288AP

---

## 📋 Convención de nombres para los archivos SDS

Para que la aplicación pueda enlazar automáticamente cada químico con su SDS, los archivos PDF deben seguir esta convención de nombres:

### ✅ Formato correcto:
```
nombre-del-quimico.pdf
```

### 🔄 Reglas de conversión:
1. **Todo en minúsculas**
2. **Espacios → guiones (`-`)**
3. **Remover caracteres especiales** (ñ, ®, ™, etc.)
4. **Extensión `.pdf`**

---

## 📝 Ejemplos de nombres de archivos

| Nombre del químico en Excel | Nombre del archivo PDF |
|------------------------------|------------------------|
| Altacor                      | `altacor.pdf`          |
| Bapsol 100                   | `bapsol-100.pdf`       |
| Polyram DF                   | `polyram-df.pdf`       |
| Seguris Flexi                | `seguris-flexi.pdf`    |
| Calcium Ammonium Nitrate (CAN) | `calcium-ammonium-nitrate-can.pdf` |

---

## 🎯 Lista completa de archivos necesarios

Basado en el inventario actual, necesitas crear estos archivos SDS:

### Chemical Sheds (64 químicos):
```
altacor.pdf
bapsol-100.pdf
belanty.pdf
calcinit.pdf
delan.pdf
erger.pdf
exault.pdf
lokit.pdf
polyram-df.pdf
seguris-flexi.pdf
waiken.pdf
... (y 53 más)
```

### Fertilizer Sheds (3 productos):
```
calcium-ammonium-nitrate-can.pdf
magnesium-sulphate.pdf
yara-mila-complex.pdf
```

---

## 🚀 Pasos para configurar:

### 1️⃣ Preparar los PDFs
- Renombra todos tus archivos SDS según la convención
- Asegúrate que todos estén en formato PDF
- Verifica que los nombres coincidan exactamente (sin espacios, minúsculas)

### 2️⃣ Subir a OneDrive
- Ve a la carpeta: https://1drv.ms/f/c/bfa2baf0e0a170a8/IgB4LugRqqW2SqzRGtHCeX8wAVWtVRpsVk87kWgb6Mtiwac?e=N288AP
- Sube todos los archivos PDF
- Verifica que se vean correctamente

### 3️⃣ Actualizar links individuales (OPCIONAL - Para links directos)
Si quieres que cada botón SDS apunte directamente al PDF individual:

1. **Para cada químico:**
   - Haz clic derecho en el PDF en OneDrive
   - Selecciona "Compartir" → "Obtener vínculo"
   - Copia el link de descarga directa
   
2. **Actualizar el Excel `Chemicals_*.xlsx`:**
   - Agrega una columna `MSDSLink` si no existe
   - Pega el link directo de cada químico

---

## ⚠️ Estado actual

**Por ahora:** Todos los botones SDS apuntan a la carpeta general de OneDrive.

**Próximo paso:** 
- Opción A: Usar la API de OneDrive para obtener links dinámicos automáticamente
- Opción B: Agregar columna `MSDSLink` en el Excel con links directos individuales
- Opción C: Implementar búsqueda dinámica por nombre de archivo

---

## 🔧 Configuración técnica

El link de OneDrive está configurado en:
```typescript
// lib/excel.ts
const ONEDRIVE_SDS_FOLDER = 'https://1drv.ms/f/c/bfa2baf0e0a170a8/IgB4LugRqqW2SqzRGtHCeX8wAVWtVRpsVk87kWgb6Mtiwac?e=N288AP';
```

La función que construye los links:
```typescript
function buildOneDriveSdsUrl(chemicalName: string): string {
  const fileName = chemicalName
    .trim()
    .replace(/[^\w\s-]/g, '') // Remover caracteres especiales
    .replace(/\s+/g, '-')     // Espacios a guiones
    .toLowerCase();
  
  return ONEDRIVE_SDS_FOLDER; // Por ahora apunta a la carpeta
}
```

---

## 📞 Soporte

Desarrollado por **BarviciiCorp**  
Para emergencias: **111**
