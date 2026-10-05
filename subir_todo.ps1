Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   SUBIENDO TODO EL PROYECTO A GITHUB     " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. Asegurar URL remota del repositorio
$repoUrl = "https://github.com/saulalvarado1/Bearer_Articulo.git"
$remotes = git remote
if ($remotes -contains "origin") {
    git remote set-url origin $repoUrl
} else {
    git remote add origin $repoUrl
}

# 2. Agregar todos los archivos (README.md, código, configuración)
Write-Host "`n[1/4] Agregando todos los archivos..." -ForegroundColor Yellow
git add -A

# 3. Confirmar cambios
$status = git status --porcelain
if ($status) {
    Write-Host "[2/4] Creando commit..." -ForegroundColor Yellow
    git commit -m "feat: complete project files and documentation"
} else {
    Write-Host "[2/4] Sin cambios nuevos pendientes para commit." -ForegroundColor Green
}

# 4. Asegurar que estamos en la rama main
Write-Host "[3/4] Verificando rama main..." -ForegroundColor Yellow
git branch -M main

# 5. Subir todo a GitHub
Write-Host "[4/4] Subiendo cambios a GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n==========================================" -ForegroundColor Green
    Write-Host "  ¡LISTO! TODO SE SUBIO EXITOSAMENTE      " -ForegroundColor Green
    Write-Host "==========================================" -ForegroundColor Green
} else {
    Write-Host "`n==========================================" -ForegroundColor Red
    Write-Host "  Hubo un problema al subir a GitHub       " -ForegroundColor Red
    Write-Host "  Verifica tus credenciales o permisos.   " -ForegroundColor Red
    Write-Host "==========================================" -ForegroundColor Red
}

Read-Host "`nPresiona Enter para cerrar esta ventana..."
