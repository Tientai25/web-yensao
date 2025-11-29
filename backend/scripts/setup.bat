@echo off
REM Setup script cho Windows
echo ====================================
echo   Yến Sào Backend Setup (Windows)
echo ====================================
echo.

REM Kiểm tra Node.js
echo [1/5] Kiểm tra Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js chưa được cài đặt!
    echo Vui lòng cài đặt Node.js từ https://nodejs.org/
    pause
    exit /b 1
)
echo [OK] Node.js đã được cài đặt
node --version

REM Kiểm tra .env
echo.
echo [2/5] Kiểm tra file .env...
if not exist .env (
    if exist .env.example (
        copy .env.example .env >nul
        echo [OK] Đã tạo file .env từ .env.example
        echo [WARNING] Vui lòng chỉnh sửa file .env với thông tin database!
    ) else (
        echo [WARNING] Không tìm thấy .env.example
    )
) else (
    echo [OK] File .env đã tồn tại
)

REM Cài đặt dependencies
echo.
echo [3/5] Cài đặt dependencies...
if not exist node_modules (
    call npm install
    if errorlevel 1 (
        echo [ERROR] Lỗi khi cài đặt dependencies!
        pause
        exit /b 1
    )
    echo [OK] Đã cài đặt dependencies
) else (
    echo [OK] Dependencies đã được cài đặt
)

REM Tạo thư mục uploads
echo.
echo [4/5] Tạo thư mục uploads...
if not exist uploads\products (
    mkdir uploads\products >nul 2>&1
    echo [OK] Đã tạo thư mục uploads\products
) else (
    echo [OK] Thư mục uploads\products đã tồn tại
)

REM Kiểm tra MySQL
echo.
echo [5/5] Kiểm tra MySQL...
mysql --version >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Không tìm thấy MySQL trong PATH
    echo Vui lòng cài đặt MySQL hoặc thêm vào PATH
) else (
    echo [OK] MySQL đã được cài đặt
    mysql --version
)

echo.
echo ====================================
echo   Setup hoàn tất!
echo ====================================
echo.
echo Các bước tiếp theo:
echo 1. Chỉnh sửa file .env với thông tin database
echo 2. Tạo database: mysql -u root -p (sau đó CREATE DATABASE yen_sao_db)
echo 3. Chạy schema: mysql -u root -p yen_sao_db ^< database\schema.sql
echo 4. Chạy server: npm run dev
echo.
pause

