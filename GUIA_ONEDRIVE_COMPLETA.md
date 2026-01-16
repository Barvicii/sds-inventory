# 🎯 Guía PASO A PASO para Conectar SDS con OneDrive

## ✅ MÉTODO RECOMENDADO: Usando el Archivo Excel con MSDSUrl

He visto que tu Excel **ya tiene** una columna `MSDSUrl` con algunos enlaces! Por ejemplo:
- **Polyram DF**: https://crop-solutions.basf.co.nz/sites/basf.co.nz/files/2024-01/SDS_POLYRAM%20DF_NZ_25092023.pdf

**VENTAJA**: No necesitas hacer nada más! El sistema ya está configurado para usar esos enlaces.

**PROBLEMA**: Algunos químicos tienen la columna vacía.

---

## 📝 OPCIÓN 1: Actualizar el Excel (MÁS SIMPLE)

### Paso 1: Abrir tu Excel de OneDrive

Abre tu carpeta de OneDrive: https://onedrive.live.com/?id=BFA2BAF0E0A170A8%21s11e82e78a5aa4ab6acd11ad1c2797f30

### Paso 2: Para cada PDF

1. **Click derecho** en el PDF (ej: `ALTACOR.pdf`)
2. **Compartir**
3. **Configuración** (⚙️):
   - ✅ Cualquier persona con el vínculo puede ver
   - ❌ Permitir edición (dejar apagado)
4. **Copiar enlace**

### Paso 3: Pegar en el Excel

Abre tu Excel `ChemicalStores_*.xlsx` y:
1. Busca el químico en la columna `Chemical`
2. Pega el enlace en la columna `MSDSUrl`
3. Guarda

### Paso 4: Subir Excel actualizado

Sube el Excel actualizado a la carpeta `public/` del proyecto y **listo!**

---

## 📝 OPCIÓN 2: Mapeo en Código (Para los que faltan)

Si prefieres hacerlo en código, he generado un template con los **184 químicos**.

### Paso 1: Guardar el template

```powershell
node scripts/list-chemicals.js > chemical-links-template.txt
```

### Paso 2: Abrir el template

Abre `chemical-links-template.txt` y verás algo como:

```typescript
export const ONEDRIVE_SDS_LINKS: Record<string, string> = {
  // Altacor
  'altacor': 'PASTE_ONEDRIVE_LINK_HERE',
  // Bapsol 100
  'bapsol-100': 'PASTE_ONEDRIVE_LINK_HERE',
  // ... etc
};
```

### Paso 3: Reemplazar los enlaces

Para cada químico que NO tenga `MSDSUrl` en el Excel:

1. Ve a tu carpeta de OneDrive
2. Busca el PDF correspondiente
3. Haz click derecho → Compartir → Copiar enlace
4. Reemplaza `'PASTE_ONEDRIVE_LINK_HERE'` con el enlace real

### Paso 4: Copiar a lib/onedrive-links.ts

Abre [lib/onedrive-links.ts](lib/onedrive-links.ts) y reemplaza el contenido con tu template editado.

---

## 🔄 OPCIÓN 3: Híbrida (RECOMENDADO)

**Combina ambas opciones:**

1. **Excel**: Usa `MSDSUrl` para los químicos que ya tienen enlace
2. **Código**: Agrega en `lib/onedrive-links.ts` solo los que faltan

El sistema verifica **en este orden**:
1. ¿Existe `chemical.MSDSUrl` en el Excel? → Úsalo
2. ¿Existe en `ONEDRIVE_SDS_LINKS`? → Úsalo
3. Si no → Abre la carpeta general de SDS

---

## 📋 Lista de los 184 Químicos

He generado el template completo. Ejecuta este comando para verlo:

```powershell
node scripts/list-chemicals.js
```

Esto mostrará:
- ✅ Lista numerada de los 184 químicos
- ✅ Código listo para copiar en `lib/onedrive-links.ts`
- ✅ Nombres normalizados automáticamente

---

## 🚀 Automatización con Microsoft Graph API (AVANZADO)

Si quieres **automatizar todo**, puedo crear un script que:

1. Se conecte a tu OneDrive con Microsoft Graph API
2. Liste todos los PDFs en la carpeta SDS
3. Genere automáticamente los enlaces
4. Actualice el archivo `onedrive-links.ts`

**REQUISITOS:**
- Token de acceso de Microsoft Graph
- ID de la carpeta de OneDrive

¿Te interesa esta opción?

---

## 💡 Recomendación Final

**Para empezar rápido:**

1. Deja `__DEFAULT__` apuntando a tu carpeta de SDS
2. Los usuarios pueden navegar y buscar el PDF manualmente
3. Agrega enlaces individuales **solo para los químicos más críticos** (High Risk)

**Químicos prioritarios (HIGH RISK) para configurar primero:**

Los de Clase 6 y 8 (tóxicos/corrosivos) son los más importantes para emergencias.

Puedo ayudarte a filtrar solo los de alto riesgo si quieres configurar esos primero.

---

¿Qué método prefieres usar?
