#!/bin/bash
# Script chẩn đoán vấn đề MySQL (dùng trong Git Bash)

echo "🔍 CHẨN ĐOÁN VẤN ĐỀ MYSQL"
echo "═══════════════════════════════════════════════════════"
echo ""

# Màu sắc
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 1. Kiểm tra MySQL Service
echo "1️⃣  KIỂM TRA MYSQL SERVICE"
echo "───────────────────────────────────────────────────────"
if command -v netstat &> /dev/null; then
    if netstat -ano | grep -q ":3306.*LISTENING"; then
        echo -e "${GREEN}✅ MySQL đang chạy trên port 3306${NC}"
        echo ""
        echo "Chi tiết:"
        netstat -ano | grep ":3306.*LISTENING" | head -1
    else
        echo -e "${RED}❌ MySQL KHÔNG chạy trên port 3306${NC}"
        echo ""
        echo -e "${YELLOW}💡 Đây là nguyên nhân chính!${NC}"
        echo ""
        echo "Cách khắc phục:"
        echo "  1. Mở Services (Windows + R → services.msc)"
        echo "  2. Tìm MySQL80 → Click chuột phải → Start"
        echo "  3. Hoặc chạy (cần quyền Admin):"
        echo "     net start MySQL80"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠️  Không tìm thấy netstat${NC}"
fi

echo ""
echo ""

# 2. Kiểm tra MySQL Client
echo "2️⃣  KIỂM TRA MYSQL CLIENT"
echo "───────────────────────────────────────────────────────"
if command -v mysql &> /dev/null; then
    MYSQL_VERSION=$(mysql --version 2>/dev/null | head -1)
    echo -e "${GREEN}✅ MySQL client đã cài đặt${NC}"
    echo "   $MYSQL_VERSION"
else
    echo -e "${YELLOW}⚠️  MySQL client chưa được cài đặt${NC}"
    echo "   (Không ảnh hưởng đến MySQL Workbench)"
fi

echo ""
echo ""

# 3. Test Connection
echo "3️⃣  TEST KẾT NỐI MYSQL"
echo "───────────────────────────────────────────────────────"
if command -v mysql &> /dev/null; then
    echo "Nhập password MySQL (hoặc Enter nếu không có password):"
    read -s MYSQL_PASSWORD
    
    if [ -z "$MYSQL_PASSWORD" ]; then
        MYSQL_CMD="mysql -u root -h localhost -P 3306"
    else
        MYSQL_CMD="mysql -u root -p$MYSQL_PASSWORD -h localhost -P 3306"
    fi
    
    if $MYSQL_CMD -e "SELECT 1;" &> /dev/null; then
        echo -e "${GREEN}✅ Kết nối MySQL thành công!${NC}"
        
        # Kiểm tra database
        echo ""
        echo "Kiểm tra database 'yen_sao_db'..."
        if $MYSQL_CMD -e "USE yen_sao_db;" &> /dev/null; then
            echo -e "${GREEN}✅ Database 'yen_sao_db' tồn tại${NC}"
            
            # Đếm tables
            TABLE_COUNT=$($MYSQL_CMD -D yen_sao_db -e "SHOW TABLES;" 2>/dev/null | wc -l)
            if [ "$TABLE_COUNT" -gt 1 ]; then
                echo -e "${GREEN}✅ Có $((TABLE_COUNT-1)) tables trong database${NC}"
            else
                echo -e "${YELLOW}⚠️  Database chưa có tables${NC}"
                echo "   Chạy schema: mysql -u root -p yen_sao_db < database/schema.sql"
            fi
        else
            echo -e "${RED}❌ Database 'yen_sao_db' KHÔNG tồn tại${NC}"
            echo ""
            echo "Tạo database:"
            echo "  mysql -u root -p -e \"CREATE DATABASE yen_sao_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\""
        fi
    else
        echo -e "${RED}❌ Không thể kết nối MySQL${NC}"
        echo ""
        echo "Nguyên nhân có thể:"
        echo "  1. MySQL service chưa chạy"
        echo "  2. Password sai"
        echo "  3. User không có quyền"
    fi
else
    echo -e "${YELLOW}⚠️  Không thể test (MySQL client chưa cài)${NC}"
    echo "   Nhưng bạn vẫn có thể dùng MySQL Workbench để kiểm tra"
fi

echo ""
echo ""

# 4. Kiểm tra .env file
echo "4️⃣  KIỂM TRA FILE .env"
echo "───────────────────────────────────────────────────────"
if [ -f .env ]; then
    echo -e "${GREEN}✅ File .env tồn tại${NC}"
    echo ""
    
    # Đọc các giá trị
    if grep -q "DB_HOST=" .env; then
        DB_HOST=$(grep "DB_HOST=" .env | cut -d '=' -f2 | tr -d ' ')
        echo "   DB_HOST: $DB_HOST"
    else
        echo -e "${YELLOW}⚠️  DB_HOST không có trong .env (sẽ dùng localhost)${NC}"
    fi
    
    if grep -q "DB_PORT=" .env; then
        DB_PORT=$(grep "DB_PORT=" .env | cut -d '=' -f2 | tr -d ' ')
        echo "   DB_PORT: $DB_PORT"
    else
        echo -e "${YELLOW}⚠️  DB_PORT không có trong .env (sẽ dùng 3306)${NC}"
    fi
    
    if grep -q "DB_USER=" .env; then
        DB_USER=$(grep "DB_USER=" .env | cut -d '=' -f2 | tr -d ' ')
        echo "   DB_USER: $DB_USER"
    else
        echo -e "${YELLOW}⚠️  DB_USER không có trong .env (sẽ dùng root)${NC}"
    fi
    
    if grep -q "DB_NAME=" .env; then
        DB_NAME=$(grep "DB_NAME=" .env | cut -d '=' -f2 | tr -d ' ')
        echo "   DB_NAME: $DB_NAME"
    else
        echo -e "${YELLOW}⚠️  DB_NAME không có trong .env (sẽ dùng yen_sao_db)${NC}"
    fi
    
    if grep -q "DB_PASSWORD=" .env; then
        DB_PASSWORD=$(grep "DB_PASSWORD=" .env | cut -d '=' -f2 | tr -d ' ')
        if [ -z "$DB_PASSWORD" ]; then
            echo -e "${RED}❌ DB_PASSWORD trống!${NC}"
            echo "   Cần điền password MySQL vào .env"
        else
            echo -e "${GREEN}✅ DB_PASSWORD đã được điền${NC}"
        fi
    else
        echo -e "${RED}❌ DB_PASSWORD không có trong .env${NC}"
    fi
else
    echo -e "${RED}❌ File .env KHÔNG tồn tại${NC}"
    echo ""
    echo "Tạo file .env với nội dung:"
    echo "  DB_HOST=localhost"
    echo "  DB_PORT=3306"
    echo "  DB_NAME=yen_sao_db"
    echo "  DB_USER=root"
    echo "  DB_PASSWORD=your_password"
fi

echo ""
echo ""

# 5. Kết luận
echo "═══════════════════════════════════════════════════════"
echo -e "${BLUE}📋 KẾT LUẬN${NC}"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "✅ Source code KHÔNG ảnh hưởng đến MySQL Workbench"
echo "   - Backend chỉ ĐỌC từ .env để kết nối"
echo "   - Backend KHÔNG thay đổi MySQL server settings"
echo "   - MySQL Workbench và Backend là 2 client riêng biệt"
echo ""
echo "🔍 Nếu MySQL Workbench không kết nối được:"
echo "   1. Kiểm tra MySQL service đã chạy chưa (bước 1)"
echo "   2. Kiểm tra connection settings trong MySQL Workbench"
echo "   3. Kiểm tra firewall có chặn port 3306 không"
echo ""
echo "💡 Cách khắc phục nhanh:"
echo "   1. Mở Services (Windows + R → services.msc)"
echo "   2. Tìm MySQL80 → Start"
echo "   3. Mở lại MySQL Workbench → Kết nối"
echo ""


