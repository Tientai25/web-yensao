#!/bin/bash
# Script khởi động MySQL (dùng trong Git Bash)

echo "🚀 Khởi động MySQL Service..."
echo ""

# Kiểm tra quyền admin (Windows)
if [ "$EUID" -ne 0 ] && [ -z "$(net session 2>&1)" ]; then
    echo "⚠️  Cần quyền Administrator để start MySQL service"
    echo ""
    echo "💡 Cách 1: Chạy Git Bash với quyền Admin"
    echo "   1. Click chuột phải Git Bash"
    echo "   2. Chọn 'Run as administrator'"
    echo "   3. Chạy lại script này"
    echo ""
    echo "💡 Cách 2: Dùng Services"
    echo "   1. Nhấn Windows + R"
    echo "   2. Gõ: services.msc → Enter"
    echo "   3. Tìm MySQL80 → Click chuột phải → Start"
    echo ""
    echo "💡 Cách 3: Dùng Command Prompt (Admin)"
    echo "   net start MySQL80"
    exit 1
fi

# Thử start MySQL service
echo "Đang khởi động MySQL80..."
if net start MySQL80 2>&1 | grep -q "successfully"; then
    echo "✅ MySQL đã được khởi động!"
    echo ""
    echo "Kiểm tra status..."
    timeout /t 3 /nobreak >nul 2>&1
    Get-Service MySQL80 | Select-Object Status
else
    echo "❌ Không thể khởi động MySQL"
    echo ""
    echo "Thử các cách sau:"
    echo "1. Mở Services (services.msc) → Start MySQL80"
    echo "2. Kiểm tra MySQL đã được cài đặt đúng chưa"
    echo "3. Kiểm tra log MySQL để xem lỗi"
fi


