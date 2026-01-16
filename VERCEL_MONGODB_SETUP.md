# 🚨 CONFIGURACIÓN URGENTE: Variable de Entorno en Vercel

## ⚠️ Tu aplicación NO funcionará sin este paso

El error **"404 en /api/inventory"** se debe a que **falta configurar MONGODB_URI en Vercel**.

---

## 📋 Pasos EXACTOS (5 minutos)

### Paso 1: Ir a Vercel Dashboard
1. Abre tu navegador
2. Ve a: **https://vercel.com/dashboard**
3. Inicia sesión si es necesario

### Paso 2: Seleccionar tu Proyecto
1. En la lista de proyectos, busca **"sds-inventory"** (o el nombre de tu proyecto)
2. Click en el proyecto

### Paso 3: Ir a Configuración
1. En la parte superior, verás tabs: **Overview**, **Deployments**, **Analytics**, **Settings**
2. Click en **"Settings"**

### Paso 4: Agregar Variable de Entorno
1. En el menú izquierdo de Settings, busca **"Environment Variables"**
2. Click en **"Environment Variables"**
3. Verás un botón **"Add New"** o **"Add"**
4. Click en ese botón

### Paso 5: Completar el Formulario
```
┌─────────────────────────────────────────────────┐
│ Name (Nombre):                                  │
│ MONGODB_URI                                     │
├─────────────────────────────────────────────────┤
│ Value (Valor):                                  │
│ mongodb+srv://barviciigame_db_user:OvvdFQ7zS... │
│ (copia EXACTAMENTE lo de abajo)                 │
└─────────────────────────────────────────────────┘
```

**Valor completo para copiar:**
```
mongodb+srv://barviciigame_db_user:OvvdFQ7zSh8tM4Fi@cluster0.jqlee94.mongodb.net/?appName=Cluster0
```

**⚠️ IMPORTANTE:** Copia TODO, desde `mongodb://` hasta `Cluster0`

### Paso 6: Seleccionar Environments
Debes marcar las **3 opciones**:
```
☑️ Production
☑️ Preview
☑️ Development
```

### Paso 7: Guardar
1. Click en **"Save"**
2. Verás un mensaje de confirmación

### Paso 8: Redeploy
**CRÍTICO:** Los cambios solo se aplican después de redeploy

1. Click en **"Deployments"** (arriba)
2. Verás tu último deployment
3. Click en los **3 puntos (...)** a la derecha del deployment
4. Click en **"Redeploy"**
5. Espera 1-2 minutos a que termine

---

## 🧪 Verificar que Funcionó

Después del redeploy:

1. Ve a tu sitio: `https://tu-proyecto.vercel.app`
2. Ve a `/admin`
3. Sube el archivo Excel de nuevo
4. Esta vez debería mostrar el número correcto de químicos
5. Ve a `/chemical` - deberías ver los datos

---

## 🔍 Si Aún No Funciona

### Verifica en Vercel:
1. Settings → Environment Variables
2. Debes ver: `MONGODB_URI` con valor `mongodb+srv://barviciigame...`
3. Debe estar en las 3 environments (Production, Preview, Development)

### Verifica en MongoDB Atlas:
1. Ve a https://cloud.mongodb.com/
2. Network Access (menú izquierdo)
3. Debe aparecer: `0.0.0.0/0` en la lista de IPs permitidas
4. Si no está, agrégala:
   - Click **"Add IP Address"**
   - Click **"Allow Access From Anywhere"**
   - Click **"Confirm"**

### Ver Logs en Vercel:
1. Deployments → Click en el último
2. Click en **"View Function Logs"**
3. Busca mensajes como:
   - ✅ "Headers found at row X"
   - ✅ "Parsed X rows from Excel"
   - ✅ "Inserted X documents to MongoDB"
   - ❌ "MongoDB connection error"

---

## 📞 ¿Necesitas Ayuda?

Si sigues viendo error 404:
1. Revisa que la variable se llame **exactamente** `MONGODB_URI` (sin espacios, mayúsculas)
2. Revisa que el valor no tenga espacios al inicio/final
3. Asegúrate de haber hecho **Redeploy** después de agregar la variable
4. Espera 2-3 minutos después del redeploy antes de probar

---

## ✅ Checklist Rápido

- [ ] Fui a vercel.com/dashboard
- [ ] Seleccioné mi proyecto "sds-inventory"
- [ ] Fui a Settings → Environment Variables
- [ ] Agregué `MONGODB_URI` con el valor completo
- [ ] Marqué Production, Preview y Development
- [ ] Guardé la variable
- [ ] Hice Redeploy del proyecto
- [ ] Esperé 2 minutos
- [ ] Probé subir el archivo Excel de nuevo
- [ ] Configuré 0.0.0.0/0 en MongoDB Atlas Network Access
