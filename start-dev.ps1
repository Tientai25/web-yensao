# Script để chạy Backend và Frontend
# Chạy: .\start-dev.ps1

Write-Host "🚀 Starting Yến Sào Development Environment..." -ForegroundColor Cyan
Write-Host ""

# Kiểm tra Node.js
Write-Host "📦 Checking Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js not found! Please install Node.js first." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
Write-Host ""

# Kiểm tra MySQL connection (backend/.env)
Write-Host "🔍 Checking backend configuration..." -ForegroundColor Yellow
if (-not (Test-Path "backend\.env")) {
    Write-Host "❌ backend\.env not found!" -ForegroundColor Red
    Write-Host "💡 Please create backend\.env file first." -ForegroundColor Yellow
    exit 1
}

$backendEnv = Get-Content "backend\.env" -Raw
if ($backendEnv -notmatch "DB_PASSWORD=\S+") {
    Write-Host "⚠️  Warning: DB_PASSWORD might be empty in backend\.env" -ForegroundColor Yellow
    Write-Host "💡 Please update backend\.env with your MySQL password" -ForegroundColor Yellow
    Write-Host ""
}

# Kiểm tra frontend .env
if (-not (Test-Path ".env")) {
    Write-Host "📝 Creating frontend .env file..." -ForegroundColor Yellow
    "VITE_API_URL=http://localhost:5000/api" | Out-File -FilePath ".env" -Encoding utf8
    Write-Host "✅ Created frontend .env" -ForegroundColor Green
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  📋 INSTRUCTIONS" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "You need to open 2 terminal windows:" -ForegroundColor White
Write-Host ""
Write-Host "TERMINAL 1 - Backend:" -ForegroundColor Yellow
Write-Host "  cd backend" -ForegroundColor Gray
Write-Host "  npm install  (if not done)" -ForegroundColor Gray
Write-Host "  npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "TERMINAL 2 - Frontend:" -ForegroundColor Yellow
Write-Host "  npm install  (if not done)" -ForegroundColor Gray
Write-Host "  npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to open backend terminal..." -ForegroundColor White
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Mở terminal mới cho backend
Write-Host ""
Write-Host "🌐 Opening backend terminal..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host '🔧 Backend Terminal' -ForegroundColor Cyan; Write-Host 'Run: npm run dev' -ForegroundColor Yellow; Write-Host ''"

Write-Host ""
Write-Host "⏳ Waiting 2 seconds..." -ForegroundColor Yellow
Start-Sleep -Seconds 2

# Mở terminal mới cho frontend
Write-Host "🌐 Opening frontend terminal..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; Write-Host '🎨 Frontend Terminal' -ForegroundColor Cyan; Write-Host 'Run: npm run dev' -ForegroundColor Yellow; Write-Host ''"

Write-Host ""
Write-Host "✅ Two terminal windows opened!" -ForegroundColor Green
Write-Host ""
Write-Host "📖 See RUN-PROJECT-GUIDE.md for detailed instructions" -ForegroundColor Cyan
Write-Host ""

