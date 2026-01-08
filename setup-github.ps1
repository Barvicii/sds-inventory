# Script para conectar con GitHub y preparar para Vercel
# Usuario GitHub: Barvicii

Write-Host "CONFIGURANDO GITHUB REMOTE" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

$githubUser = "Barvicii"
$repoName = "sds-inventory"
$repoUrl = "https://github.com/$githubUser/$repoName.git"

Write-Host "Usuario GitHub: $githubUser" -ForegroundColor Green
Write-Host "Repositorio: $repoName" -ForegroundColor Green
Write-Host ""

# Verificar si ya existe un remote
$existingRemote = git remote -v 2>$null | Select-String "origin"

if ($existingRemote) {
    Write-Host "Ya existe un remote configurado. Removiendo..." -ForegroundColor Yellow
    git remote remove origin
}

# Agregar remote
Write-Host "Agregando remote de GitHub..." -ForegroundColor Yellow
git remote add origin $repoUrl

# Renombrar branch a main
Write-Host "Renombrando branch a 'main'..." -ForegroundColor Yellow
git branch -M main

Write-Host ""
Write-Host "=========================" -ForegroundColor Cyan
Write-Host "GITHUB REMOTE CONFIGURADO" -ForegroundColor Green
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

Write-Host "PROXIMOS PASOS:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. CREAR REPOSITORIO EN GITHUB:" -ForegroundColor Yellow
Write-Host "   Ve a: https://github.com/new" -ForegroundColor White
Write-Host "   - Repository name: sds-inventory" -ForegroundColor Gray
Write-Host "   - Description: SDS Chemical Inventory System for Emergency Services" -ForegroundColor Gray
Write-Host "   - Visibility: Public (o Private si prefieres)" -ForegroundColor Gray
Write-Host "   - NO selecciones 'Initialize with README'" -ForegroundColor Red
Write-Host "   - Click 'Create repository'" -ForegroundColor Gray
Write-Host ""

Write-Host "2. HACER PUSH A GITHUB:" -ForegroundColor Yellow
Write-Host "   Ejecuta este comando:" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor Green
Write-Host ""
Write-Host "   (Te pedira tus credenciales de GitHub)" -ForegroundColor Gray
Write-Host ""

Write-Host "3. DESPLEGAR EN VERCEL:" -ForegroundColor Yellow
Write-Host "   a) Ve a: https://vercel.com/new" -ForegroundColor White
Write-Host "   b) Conecta tu cuenta de GitHub" -ForegroundColor White
Write-Host "   c) Busca '$repoName' en la lista" -ForegroundColor White
Write-Host "   d) Click en 'Import'" -ForegroundColor White
Write-Host "   e) Click en 'Deploy' (Vercel detectara Next.js automaticamente)" -ForegroundColor White
Write-Host ""

Write-Host "URL del repositorio: $repoUrl" -ForegroundColor Cyan
Write-Host ""

Write-Host "NOTA: Si no tienes token de GitHub configurado:" -ForegroundColor Yellow
Write-Host "1. Ve a: https://github.com/settings/tokens" -ForegroundColor White
Write-Host "2. Generate new token (classic)" -ForegroundColor White
Write-Host "3. Selecciona 'repo' scope" -ForegroundColor White
Write-Host "4. Usa el token como password cuando hagas push" -ForegroundColor White
Write-Host ""
