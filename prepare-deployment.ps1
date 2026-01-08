# Script para preparar el proyecto para deployment en Vercel

Write-Host "PREPARANDO PROYECTO PARA VERCEL" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si Git esta instalado
$gitInstalled = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitInstalled) {
    Write-Host "Git no esta instalado." -ForegroundColor Red
    Write-Host "Descargalo desde: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

Write-Host "Git detectado" -ForegroundColor Green

# Inicializar Git si no existe
if (-not (Test-Path ".git")) {
    Write-Host "Inicializando repositorio Git..." -ForegroundColor Yellow
    git init
    Write-Host "Git inicializado" -ForegroundColor Green
} else {
    Write-Host "Git ya estaba inicializado" -ForegroundColor Green
}

# Agregar todos los archivos
Write-Host "Agregando archivos al staging..." -ForegroundColor Yellow
git add .

# Hacer commit
$commitMessage = "Initial commit - SDS Chemical Inventory System"
Write-Host "Creando commit: $commitMessage" -ForegroundColor Yellow
git commit -m $commitMessage

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "PROYECTO LISTO PARA VERCEL" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "PROXIMOS PASOS:" -ForegroundColor Cyan
Write-Host ""
Write-Host "OPCION 1: Desplegar con Vercel CLI (Mas rapido)" -ForegroundColor Yellow
Write-Host "  1. Instalar Vercel CLI:" -ForegroundColor White
Write-Host "     npm install -g vercel" -ForegroundColor Gray
Write-Host ""
Write-Host "  2. Login en Vercel:" -ForegroundColor White
Write-Host "     vercel login" -ForegroundColor Gray
Write-Host ""
Write-Host "  3. Desplegar:" -ForegroundColor White
Write-Host "     vercel" -ForegroundColor Gray
Write-Host ""
Write-Host "  4. Desplegar a produccion:" -ForegroundColor White
Write-Host "     vercel --prod" -ForegroundColor Gray
Write-Host ""

Write-Host "OPCION 2: Desplegar desde GitHub (Recomendado)" -ForegroundColor Yellow
Write-Host "  1. Crear repositorio en GitHub.com" -ForegroundColor White
Write-Host ""
Write-Host "  2. Conectar con tu repositorio:" -ForegroundColor White
Write-Host "     git remote add origin https://github.com/TU_USUARIO/sds-inventory.git" -ForegroundColor Gray
Write-Host "     git branch -M main" -ForegroundColor Gray
Write-Host "     git push -u origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "  3. Ir a vercel.com -> Import Project -> Seleccionar tu repo" -ForegroundColor White
Write-Host ""

Write-Host "Guia completa en: DEPLOYMENT_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
