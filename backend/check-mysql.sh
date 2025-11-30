#!/bin/bash
# Script kiểm tra MySQL connection (dùng trong Git Bash)

echo "🔍 Kiểm tra MySQL Connection..."
echo ""

# Màu sắc
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Đọc thông tin từ .env
if [ -f .env ]; then
    echo "📄 Đọc thông tin từ .env..."
    source .env
    
    DB_HOST=${DB_HOST:-localhost}
    DB_PORT=${DB_PORT:-3306}
    DB_USER=${DB_USER:-root}
    DB_NAME=${DB_NAME:-yen_sao_db}
    
    echo "   Host: $DB_HOST:$DB_PORT"
    echo "   User: $DB_USER"
    echo "   Database: $DB_NAME"
    echo ""
else
    echo -e "${YELLOW}⚠️  File .env không tồn tại${NC}"
    DB_HOST="localhost"
    DB_PORT="3306"
    DB_USER="root"
    DB_NAME="yen_sao_db"
fi

# Kiểm tra MySQL có đang chạy không
echo "1️⃣  Kiểm tra MySQL service..."
if command -v netstat &> /dev/null; then
    if netstat -ano | grep -q ":$DB_PORT.*LISTENING"; then
        echo -e "${GREEN}✅ MySQL đang chạy trên port $DB_PORT${NC}"
    else
        echo -e "${RED}❌ MySQL KHÔNG chạy trên port $DB_PORT${NC}"
        echo ""
        echo "💡 Cách khởi động MySQL:"
        echo "   Windows: Mở Services (services.msc) → Start MySQL80"
        echo "   Hoặc chạy (cần quyền Admin):"
        echo "   net start MySQL80"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠️  Không tìm thấy netstat, bỏ qua bước này${NC}"
fi

echo ""

# Kiểm tra kết nối MySQL
echo "2️⃣  Kiểm tra kết nối MySQL..."
if command -v mysql &> /dev/null; then
    echo "Nhập password MySQL (hoặc Enter nếu không có password):"
    read -s MYSQL_PASSWORD
    
    if [ -z "$MYSQL_PASSWORD" ]; then
        MYSQL_CMD="mysql -u $DB_USER -h $DB_HOST -P $DB_PORT"
    else
        MYSQL_CMD="mysql -u $DB_USER -p$MYSQL_PASSWORD -h $DB_HOST -P $DB_PORT"
    fi
    
    # Test connection
    if $MYSQL_CMD -e "SELECT 1;" &> /dev/null; then
        echo -e "${GREEN}✅ Kết nối MySQL thành công!${NC}"
        
        # Kiểm tra database
        echo ""
        echo "3️⃣  Kiểm tra database '$DB_NAME'..."
        if $MYSQL_CMD -e "USE $DB_NAME;" &> /dev/null; then
            echo -e "${GREEN}✅ Database '$DB_NAME' tồn tại${NC}"
            
            # Kiểm tra tables
            echo ""
            echo "4️⃣  Kiểm tra tables..."
            TABLE_COUNT=$($MYSQL_CMD -D $DB_NAME -e "SHOW TABLES;" 2>/dev/null | wc -l)
            if [ "$TABLE_COUNT" -gt 1 ]; then
                echo -e "${GREEN}✅ Có $((TABLE_COUNT-1)) tables trong database${NC}"
            else
                echo -e "${YELLOW}⚠️  Database chưa có tables${NC}"
                echo "💡 Chạy schema: mysql -u $DB_USER -p $DB_NAME < database/schema.sql"
            fi
        else
            echo -e "${RED}❌ Database '$DB_NAME' KHÔNG tồn tại${NC}"
            echo ""
            echo "💡 Tạo database:"
            echo "   mysql -u $DB_USER -p -e \"CREATE DATABASE $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\""
        fi
    else
        echo -e "${RED}❌ Không thể kết nối MySQL${NC}"
        echo ""
        echo "💡 Kiểm tra:"
        echo "   1. MySQL server đã chạy chưa?"
        echo "   2. Password có đúng không?"
        echo "   3. User '$DB_USER' có quyền truy cập không?"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠️  MySQL client chưa được cài đặt${NC}"
    echo "   Không thể test connection từ command line"
    echo "   Nhưng bạn vẫn có thể dùng MySQL Workbench để kiểm tra"
fi

echo ""
echo "═══════════════════════════════════════════════════════"
echo -e "${GREEN}✅ Kiểm tra hoàn tất!${NC}"
echo "═══════════════════════════════════════════════════════"


