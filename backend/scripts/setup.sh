#!/bin/bash

# Setup script cho MacOS/Linux
echo "===================================="
echo "  Yến Sào Backend Setup"
echo "===================================="
echo ""

# Kiểm tra Node.js
echo "[1/5] Kiểm tra Node.js..."
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js chưa được cài đặt!"
    echo "Vui lòng cài đặt Node.js từ https://nodejs.org/"
    exit 1
fi
echo "[OK] Node.js version: $(node --version)"

# Kiểm tra .env
echo ""
echo "[2/5] Kiểm tra file .env..."
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "[OK] Đã tạo file .env từ .env.example"
        echo "[WARNING] Vui lòng chỉnh sửa file .env với thông tin database!"
    else
        echo "[WARNING] Không tìm thấy .env.example"
    fi
else
    echo "[OK] File .env đã tồn tại"
fi

# Cài đặt dependencies
echo ""
echo "[3/5] Cài đặt dependencies..."
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo "[ERROR] Lỗi khi cài đặt dependencies!"
        exit 1
    fi
    echo "[OK] Đã cài đặt dependencies"
else
    echo "[OK] Dependencies đã được cài đặt"
fi

# Tạo thư mục uploads
echo ""
echo "[4/5] Tạo thư mục uploads..."
mkdir -p uploads/products
echo "[OK] Đã tạo thư mục uploads/products"

# Kiểm tra PostgreSQL
echo ""
echo "[5/5] Kiểm tra PostgreSQL..."
if ! command -v psql &> /dev/null; then
    echo "[WARNING] Không tìm thấy PostgreSQL trong PATH"
    echo "Vui lòng cài đặt PostgreSQL hoặc thêm vào PATH"
else
    echo "[OK] PostgreSQL version: $(psql --version)"
fi

echo ""
echo "===================================="
echo "  Setup hoàn tất!"
echo "===================================="
echo ""
echo "Các bước tiếp theo:"
echo "1. Chỉnh sửa file .env với thông tin database"
echo "2. Tạo database: createdb yen_sao_db"
echo "3. Chạy schema: psql -U postgres -d yen_sao_db -f database/schema.sql"
echo "4. Chạy server: npm run dev"
echo ""

