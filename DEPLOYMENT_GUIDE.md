# 🚀 Guía de Deployment en Vercel

## ✅ Pre-requisitos Completados

Tu proyecto ya está listo para Vercel:
- ✅ Next.js 14 configurado
- ✅ Archivos Excel en carpeta `public/`
- ✅ TypeScript configurado
- ✅ `.gitignore` correcto
- ✅ `vercel.json` creado

---

## 📋 Pasos para Desplegar

### Opción 1: Deployment desde GitHub (Recomendado)

**1. Sube tu código a GitHub**

```bash
# En tu directorio del proyecto
cd "D:\Usuarios\BARVICII\Desktop\Web Alfajores\SDS"

# Inicializar Git (si no lo has hecho)
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit - SDS Chemical Inventory System"

# Crear repositorio en GitHub.com y luego:
git remote add origin https://github.com/TU_USUARIO/sds-inventory.git
git branch -M main
git push -u origin main
```

**2. Conectar con Vercel**

1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con GitHub
3. Haz clic en "Add New Project"
4. Importa tu repositorio `sds-inventory`
5. Vercel detectará automáticamente que es Next.js
6. Haz clic en "Deploy"

¡Listo! En 1-2 minutos tendrás tu URL: `https://sds-inventory.vercel.app`

---

### Opción 2: Deployment con Vercel CLI

**1. Instalar Vercel CLI**

```bash
npm install -g vercel
```

**2. Login en Vercel**

```bash
vercel login
```

**3. Desplegar**

```bash
# Desde el directorio del proyecto
cd "D:\Usuarios\BARVICII\Desktop\Web Alfajores\SDS"

# Primera vez (te hará algunas preguntas)
vercel

# Después de responder las preguntas, tu app se desplegará
```

**4. Desplegar a Producción**

```bash
vercel --prod
```

---

## ⚙️ Configuración en Vercel (Opcional)

### Variables de Entorno

Si en el futuro necesitas variables de entorno:

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega las variables necesarias

Por ahora no necesitas ninguna variable de entorno.

---

## 📱 Después del Deployment

### 1. Generar QR Code

Una vez desplegado, obtendrás una URL como: `https://tu-app.vercel.app`

**Generar QR:**
- Opción A: [qr-code-generator.com](https://www.qr-code-generator.com/)
- Opción B: Usar script de PowerShell:

```powershell
# Instalar módulo QR
Install-Module -Name QRCodeGenerator

# Generar QR
New-QRCode -Uri "https://tu-app.vercel.app" -OutPath "sds-qr-code.png"
```

### 2. Actualizar Excel Files

Para actualizar los archivos Excel en producción:

**Método 1: Reemplazar en GitHub**
1. Reemplaza los Excel en la carpeta `public/`
2. Commit y push
3. Vercel desplegará automáticamente

**Método 2: Usar OneDrive (Futuro)**
- Modifica `lib/excel.ts` para leer desde URLs de OneDrive
- Actualiza archivos directamente en OneDrive sin redesplegar

---

## 🔄 Actualizaciones Futuras

Cada vez que hagas cambios:

```bash
# Guardar cambios
git add .
git commit -m "Descripción del cambio"
git push

# Vercel desplegará automáticamente
```

---

## 🌐 URLs Importantes

Después del deployment tendrás:

- **Landing Page**: `https://tu-app.vercel.app/`
- **Chemical Shed**: `https://tu-app.vercel.app/chemical`
- **Fertilizer Shed**: `https://tu-app.vercel.app/fertilizer`

El QR code debe apuntar a la landing page: `https://tu-app.vercel.app/`

---

## ✅ Checklist de Deployment

Antes de desplegar, verifica:

- [ ] Archivos Excel están en `public/`
- [ ] No hay errores de compilación (`npm run build`)
- [ ] `.gitignore` excluye `node_modules/` y `.next/`
- [ ] README.md actualizado
- [ ] OneDrive links configurados (opcional, puede ser después)

Para verificar el build localmente:

```bash
npm run build
npm start
# Prueba en http://localhost:3000
```

---

## 🆘 Troubleshooting

### Error: "Build failed"
```bash
# Limpiar y reconstruir
rm -rf .next node_modules
npm install
npm run build
```

### Archivos Excel no se encuentran
- Verifica que estén en `public/`
- Asegúrate que los nombres coincidan en el código

### TypeScript errors
```bash
npm run build
# Verifica los errores en terminal
```

---

## 📞 Soporte

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Next.js Deployment: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)

---

Desarrollado por **BarviciiCorp**
