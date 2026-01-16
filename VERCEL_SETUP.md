# Configuración de Variables de Entorno en Vercel

Para que la aplicación funcione correctamente en producción, necesitas configurar la variable de entorno de MongoDB en Vercel.

## Pasos:

1. **Ir a tu proyecto en Vercel**
   - Visita: https://vercel.com/dashboard
   - Selecciona tu proyecto: `sds-inventory`

2. **Ir a Settings → Environment Variables**
   - Click en "Settings" en el menú superior
   - Click en "Environment Variables" en el menú lateral

3. **Agregar la variable MONGODB_URI**
   - Name: `MONGODB_URI`
   - Value: `mongodb+srv://barviciigame_db_user:OvvdFQ7zSh8tM4Fi@cluster0.jqlee94.mongodb.net/?appName=Cluster0`
   - Environments: Seleccionar **Production**, **Preview**, y **Development**
   - Click "Save"

4. **Redesplegar**
   - Una vez guardada la variable, Vercel redesplegará automáticamente
   - O puedes hacer un nuevo push a GitHub para forzar el despliegue

## Verificación:

Después del despliegue, verifica que:
- La página `/admin` cargue correctamente
- Puedas subir archivos Excel
- Los datos se guarden en MongoDB
- Las páginas `/chemical` y `/fertilizer` muestren los datos desde MongoDB

## Notas:

- El archivo `.env.local` es solo para desarrollo local y **NO** se sube a Git
- Las variables de Vercel son **SEGURAS** y no se exponen en el código del cliente
- Si cambias las credenciales de MongoDB, actualiza la variable en Vercel

## Conexión a MongoDB:

- **Cluster**: cluster0.jqlee94.mongodb.net
- **Database**: sds-inventory
- **Collections**:
  - `chemicals`: Datos de inventario actual
  - `uploadHistory`: Historial de subidas de archivos
