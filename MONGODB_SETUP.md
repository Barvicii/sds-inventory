# Configuración de MongoDB Atlas

## ⚠️ Error SSL: "tlsv1 alert internal error"

Este error ocurre cuando MongoDB Atlas bloquea la conexión. Sigue estos pasos para resolverlo:

---

## 📋 Pasos de Configuración

### 1. Configurar MongoDB Atlas (Permitir todas las IPs)

1. Ve a https://cloud.mongodb.com/
2. Inicia sesión con tu cuenta
3. Selecciona tu cluster `Cluster0`
4. En el menú izquierdo, click en **"Network Access"**
5. Click en **"Add IP Address"**
6. Selecciona **"Allow Access from Anywhere"** (0.0.0.0/0)
7. Click **"Confirm"**

> ⚠️ **IMPORTANTE**: Vercel usa IPs dinámicas, por eso necesitas permitir todas las IPs (0.0.0.0/0)

### 2. Verificar Usuario de Base de Datos

1. En MongoDB Atlas, menú izquierdo → **"Database Access"**
2. Verifica que el usuario `barviciigame_db_user` existe
3. Asegúrate que tenga rol **"Read and write to any database"** o **"Atlas admin"**
4. Si no existe, créalo con estos datos:
   - Username: `barviciigame_db_user`
   - Password: `OvvdFQ7zSh8tM4Fi`
   - Role: `Atlas admin`

### 3. Configurar Variable de Entorno en Vercel

#### Opción A: Dashboard de Vercel (Recomendado)
1. Ve a https://vercel.com/dashboard
2. Selecciona tu proyecto `sds-inventory`
3. Click en **"Settings"** → **"Environment Variables"**
4. Click **"Add New"**
5. Agrega:
   ```
   Name: MONGODB_URI
   Value: mongodb+srv://barviciigame_db_user:OvvdFQ7zSh8tM4Fi@cluster0.jqlee94.mongodb.net/?appName=Cluster0
   ```
6. Selecciona: **Production**, **Preview**, y **Development**
7. Click **"Save"**
8. **Redeploy** el proyecto (Deployments → ... → Redeploy)

#### Opción B: Vercel CLI
```bash
vercel env add MONGODB_URI
# Pega: mongodb+srv://barviciigame_db_user:OvvdFQ7zSh8tM4Fi@cluster0.jqlee94.mongodb.net/?appName=Cluster0
# Selecciona: Production, Preview, Development

vercel --prod
```

### 4. Verificar Configuración Local

Tu archivo `.env.local` debe tener:
```env
MONGODB_URI=mongodb+srv://barviciigame_db_user:OvvdFQ7zSh8tM4Fi@cluster0.jqlee94.mongodb.net/?appName=Cluster0
```

---

## 🧪 Probar la Conexión

### Desarrollo Local
```bash
npm run dev
# Ve a http://localhost:3000/admin
# Sube un archivo Excel
```

### Producción (Vercel)
1. Haz push de cualquier cambio: `git push`
2. Espera el deployment
3. Ve a tu sitio: https://tu-proyecto.vercel.app/admin
4. Sube un archivo Excel

---

## 🔍 Diagnóstico de Errores

### Error: "MongoDB URI not found"
- ✅ Verifica que `.env.local` existe
- ✅ Verifica que la variable esté en Vercel (Settings → Environment Variables)
- ✅ Haz redeploy después de agregar la variable

### Error: "SSL routines:ssl3_read_bytes:tlsv1 alert internal error"
- ✅ Ve a MongoDB Atlas → Network Access
- ✅ Agrega 0.0.0.0/0 a la lista de IPs permitidas
- ✅ Espera 1-2 minutos para que se apliquen los cambios
- ✅ Intenta de nuevo

### Error: "Authentication failed"
- ✅ Verifica el usuario en MongoDB Atlas → Database Access
- ✅ Verifica que la contraseña sea correcta
- ✅ El formato debe ser: `mongodb+srv://USER:PASSWORD@cluster0.jqlee94.mongodb.net/`

### Error: "Server selection timeout"
- ✅ Verifica tu conexión a internet
- ✅ Verifica que el cluster esté activo en MongoDB Atlas
- ✅ Verifica Network Access (0.0.0.0/0)

---

## 📊 Estructura de Datos

### Colección: `chemicals`
```json
{
  "_id": ObjectId("..."),
  "name": "Meteor",
  "store": "Judco Chem Shed",
  "stockUnit": "L",
  "total": 25.5,
  "updatedAt": ISODate("2026-01-17T...")
}
```

### Colección: `uploadHistory`
```json
{
  "_id": ObjectId("..."),
  "fileName": "ChemicalStores.xlsx",
  "fileSize": 45678,
  "uploadDate": ISODate("2026-01-17T..."),
  "totalChemicals": 204,
  "newChemicals": 5,
  "newChemicalsList": ["Chemical1", "Chemical2"]
}
```

---

## 🆘 Soporte

Si el problema persiste:
1. Verifica que MongoDB Atlas esté activo (no pausado)
2. Revisa los logs en Vercel: Deployments → ... → View Function Logs
3. Verifica que la cadena de conexión esté exactamente como se muestra aquí
4. Asegúrate que no haya espacios al inicio/final de la variable de entorno
