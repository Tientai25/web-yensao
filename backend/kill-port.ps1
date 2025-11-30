# Script để kill process đang dùng port 5000
$port = 5000
$process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue

if ($process) {
    $pid = $process.OwningProcess
    $processName = (Get-Process -Id $pid).ProcessName
    Write-Host "Found process using port $port:" -ForegroundColor Yellow
    Write-Host "  PID: $pid" -ForegroundColor Yellow
    Write-Host "  Name: $processName" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Killing process..." -ForegroundColor Red
    Stop-Process -Id $pid -Force
    Write-Host "✅ Process killed!" -ForegroundColor Green
} else {
    Write-Host "No process found using port $port" -ForegroundColor Green
}

