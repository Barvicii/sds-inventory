# ✅ Checklist de Deployment a Vercel

## ⚠️ IMPORTANTE: El sitio NO funcionará hasta completar estos pasos

### 1️⃣ Configurar Variable de Entorno en Vercel (CRÍTICO)

**Sin esto, verás error 404 en `/api/inventory`**

1. Ve a https://vercel.com/dashboard
2. Selecciona tu proyecto `sds-inventory`
3. Click en **Settings** (configuración)
4. En el menú izquierdo, click en **Environment Variables**
5. Click en **Add New** (agregar nueva)
6. Agrega:
   ```
   Name:  MONGODB_URI
   Value: mongodb+srv://barviciigame_db_user:OvvdFQ7zSh8tM4Fi@cluster0.jqlee94.mongodb.net/?appName=Cluster0
   ```
7. Marca las 3 opciones:
   - ✅ Production
   - ✅ Preview  
   - ✅ Development
8. Click **Save**

### 2️⃣ Configurar MongoDB Atlas Network Access (CRÍTICO)

**Sin esto, verás error SSL al subir archivos**

1. Ve a https://cloud.mongodb.com/
2. Selecciona tu proyecto/cluster
3. En el menú izquierdo: **Network Access**
4. Click **Add IP Address**
5. Selecciona **ALLOW ACCESS FROM ANYWHERE**
   - IP: `0.0.0.0/0`
6. Click **Confirm**
7. Espera 1-2 minutos para que se apliquen los cambios

### 3️⃣ Redeploy del Proyecto

**Después de agregar la variable de entorno**

#### Opción A: Desde Dashboard
1. Ve a **Deployments** en tu proyecto
2. Click en los 3 puntos (...) del último deployment
3. Click **Redeploy**
4. Espera a que termine (1-2 minutos)

#### Opción B: Nuevo Push
```bash
git add -A
git commit -m "Trigger redeploy"
git push
```

### 4️⃣ Verificar que Funciona

1. Ve a tu sitio: `https://tu-proyecto.vercel.app`
2. Ve a `/admin`
3. Sube el archivo `ChemicalStores.xlsx`
4. Deberías ver mensaje de éxito
5. Ve a `/chemical` o `/fertilizer`
6. Deberías ver los datos

---

## 🔍 Solución de Problemas

### Error: "GET /api/inventory 404 (Not Found)"

**Causa**: `MONGODB_URI` no está configurado en Vercel

**Solución**:
- Completa el Paso 1️⃣ arriba
- Haz Redeploy (Paso 3️⃣)
- Espera 1-2 minutos
- Recarga la página

### Error: "SSL routines:ssl3_read_bytes:tlsv1 alert internal error"

**Causa**: MongoDB Atlas bloquea IPs de Vercel

**Solución**:
- Completa el Paso 2️⃣ arriba
- Espera 1-2 minutos para que se apliquen cambios en Atlas
- Intenta subir el archivo de nuevo

### Error: "No se pudo cargar el inventario desde la base de datos"

**Posibles causas**:
1. `MONGODB_URI` no configurado → Ver Paso 1️⃣
2. No has subido ningún archivo Excel → Ve a `/admin` y sube el archivo
3. Network Access no configurado → Ver Paso 2️⃣

---

## 📊 Verificar que MongoDB tiene datos

Puedes verificar en MongoDB Atlas directamente:

1. Ve a https://cloud.mongodb.com/
2. Click en **Browse Collections** en tu cluster
3. Deberías ver:
   - Database: `sds-inventory`
   - Collections: `chemicals`, `uploadHistory`
4. Click en `chemicals` para ver los datos

---

## 🎯 Estado Actual del Proyecto

- ✅ Build exitoso localmente
- ✅ Código pusheado a GitHub
- ✅ Vercel detectará el push automáticamente
- ⏳ **PENDIENTE**: Configurar `MONGODB_URI` en Vercel
- ⏳ **PENDIENTE**: Configurar Network Access en MongoDB Atlas

**Una vez completes los pasos 1️⃣ y 2️⃣, el sitio funcionará perfectamente.**
