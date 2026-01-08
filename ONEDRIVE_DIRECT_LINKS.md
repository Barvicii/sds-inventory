# 🔗 Cómo obtener links directos de OneDrive para cada PDF

## ✅ Implementación Actual

Tu aplicación ahora muestra:
1. **HazardClasses** (clasificación) en cada tarjeta química - visible para servicios de emergencia
2. **Botones SDS** que apuntan a OneDrive (por ahora a la carpeta general)

---

## 🎯 Objetivo: Links directos a PDFs individuales

Para que cada botón SDS abra directamente su PDF específico, necesitas:

### Método 1: Manual (Recomendado para empezar)

**Paso a paso:**

1. **Sube el PDF a OneDrive**
   - Ve a: https://1drv.ms/f/c/bfa2baf0e0a170a8/IgB4LugRqqW2SqzRGtHCeX8wAVWtVRpsVk87kWgb6Mtiwac?e=N288AP
   - Haz clic en "Cargar" → Selecciona el PDF
   - Asegúrate que el nombre sea correcto (ej: `altacor.pdf`)

2. **Obtener el link de compartir**
   - Haz clic derecho en el archivo PDF
   - Selecciona "Compartir"
   - En el diálogo, haz clic en "Configuración del vínculo"
   - Selecciona: "Cualquier persona con el vínculo puede **ver**"
   - Haz clic en "Copiar vínculo"
   - El link se verá así: `https://1drv.ms/b/s!ApBxoPDwr7L_AGje6BGqpbZKrNE`

3. **Agregar el link al código**
   - Abre el archivo: `lib/onedrive-links.ts`
   - Busca el nombre del químico normalizado
   - Reemplaza `'https://1drv.ms/...'` con tu link real

**Ejemplo:**
```typescript
export const ONEDRIVE_SDS_LINKS: Record<string, string> = {
  // Antes:
  'altacor': 'https://1drv.ms/...',
  
  // Después:
  'altacor': 'https://1drv.ms/b/s!ApBxoPDwr7L_AGje6BGqpbZKrNE',
};
```

4. **Guardar y probar**
   - Guarda el archivo
   - Next.js recargará automáticamente
   - Haz clic en el botón SDS del químico
   - Debería abrir el PDF directamente

---

### Método 2: PowerShell Script (Para múltiples archivos)

Si tienes muchos PDFs, puedes automatizar con PowerShell:

```powershell
# 1. Instalar módulo de Microsoft Graph (solo una vez)
Install-Module Microsoft.Graph -Scope CurrentUser

# 2. Conectar a tu cuenta de OneDrive
Connect-MgGraph -Scopes "Files.Read.All","Files.ReadWrite.All"

# 3. Obtener ID de tu carpeta SDS
$folder = Get-MgDriveItemChild -DriveId "me" | Where-Object {$_.Name -eq "SDS"}

# 4. Listar todos los PDFs en la carpeta
$pdfs = Get-MgDriveItemChild -DriveId "me" -DriveItemId $folder.Id

# 5. Para cada PDF, crear link de compartir
foreach ($pdf in $pdfs) {
    $link = New-MgDriveItemPermission -DriveId "me" -DriveItemId $pdf.Id -Body @{
        Type = "view"
        Scope = "anonymous"
    }
    Write-Host "$($pdf.Name): $($link.Link.WebUrl)"
}
```

---

### Método 3: Usar Excel con columna MSDSLink

**Alternativa más simple:**

1. **Edita tu Excel** `Chemicals_20260108193431.xlsx`
2. **Agrega una columna** llamada `MSDSLink`
3. **Pega los links directos** de OneDrive en cada fila
4. **Sube el Excel actualizado** a OneDrive
5. **Actualiza la ruta** en `lib/excel.ts` para leer desde OneDrive

La aplicación ya está configurada para usar `MSDSLink` si existe en el Excel:
```typescript
LinkSDS: chemInfo?.MSDSLink || group.firstEntry.MSDSUrl || buildOneDriveSdsUrl(chemicalName)
```

---

## 🚀 Estrategia Recomendada

**Fase 1: Químicos prioritarios** (Hoy)
- Obtén links directos solo para los 10-15 químicos más importantes
- Generalmente los de **Alto Riesgo** (Class 6, Class 8)
- Agrégalos a `lib/onedrive-links.ts`

**Fase 2: Resto de químicos** (Cuando tengas tiempo)
- Usa el script de PowerShell para automatizar
- O agrega la columna MSDSLink al Excel

**Mientras tanto:**
- Los químicos sin link directo seguirán abriendo la carpeta general
- Los servicios de emergencia pueden buscar el archivo manualmente

---

## 📋 Químicos de Alto Riesgo (Prioridad)

Basado en tu inventario, estos son los más críticos:

```
1. Erger        -> Class 5, 6, 8 (Oxidante, Tóxico, Corrosivo)
2. Dodine       -> Class 6, 9
3. Waiken       -> Class 6, 9
4. Exault       -> Class 6, 9
5. Polyram DF   -> Class 6, 9
6. Calcinit     -> Class 6
7. Neptune      -> Class 6, 9
8. Mortar       -> Class 6, 9
```

**Empieza con estos 8** → obtén sus links directos → prueba que funcionen.

---

## 🔍 Verificación

Para verificar que un link funciona:
1. Copia el link de OneDrive
2. Pégalo en una ventana de incógnito
3. Debería abrir/descargar el PDF sin pedir login
4. Si pide login → el link no es público → revisa la configuración de compartir

---

## 💡 Tips

- **Nombres exactos**: Los PDFs deben llamarse exactamente como indica `onedrive-sds-files.txt`
- **Links públicos**: Asegúrate que sean "Cualquier persona con el vínculo"
- **Sin vencimiento**: No pongas fecha de vencimiento al link
- **Testing**: Prueba cada link en modo incógnito antes de agregarlo

---

## ❓ Preguntas Frecuentes

**P: ¿El link caduca?**
R: No, a menos que configures una fecha de vencimiento

**P: ¿Necesito cuenta de OneDrive?**
R: Solo para subir archivos. Los usuarios pueden ver PDFs sin cuenta.

**P: ¿Puedo cambiar un PDF después?**
R: Sí, solo reemplaza el archivo en OneDrive. El link sigue funcionando.

**P: ¿Qué pasa si no tengo link directo?**
R: Se abre la carpeta general, el usuario busca manualmente.

---

Desarrollado por **BarviciiCorp**
