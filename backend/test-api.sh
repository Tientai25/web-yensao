#!/bin/bash
# Script test API tự động

echo "🧪 Testing Yến Sào API Endpoints"
echo "═══════════════════════════════════════════════════════"
echo ""

BASE_URL="http://localhost:5000/api"

# Màu sắc
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test 1: Health Check
echo -e "${BLUE}1️⃣  Testing Health Check...${NC}"
HEALTH_RESPONSE=$(curl -s "$BASE_URL/health")
if echo "$HEALTH_RESPONSE" | grep -q "OK"; then
    echo -e "${GREEN}✅ Health Check: OK${NC}"
    echo "   Response: $HEALTH_RESPONSE"
else
    echo -e "${RED}❌ Health Check: FAILED${NC}"
    echo "   Response: $HEALTH_RESPONSE"
    echo ""
    echo "💡 Đảm bảo backend đang chạy: npm run dev"
    exit 1
fi
echo ""
echo ""

# Test 2: Products API
echo -e "${BLUE}2️⃣  Testing Products API...${NC}"
PRODUCTS_RESPONSE=$(curl -s "$BASE_URL/products")
echo "   Response:"
echo "$PRODUCTS_RESPONSE" | head -30
echo ""

# Check if products exist
PRODUCT_COUNT=$(echo "$PRODUCTS_RESPONSE" | grep -o '"id"' | wc -l)
if [ "$PRODUCT_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✅ Found $PRODUCT_COUNT products!${NC}"
    echo -e "${GREEN}✅ Backend đã nhận dữ liệu từ MySQL!${NC}"
else
    echo -e "${YELLOW}⚠️  No products found${NC}"
    echo ""
    echo "💡 Database chưa có dữ liệu. Chạy schema:"
    echo "   mysql -u root -p yen_sao_db < database/schema.sql"
    echo "   Hoặc dùng MySQL Workbench để chạy schema.sql"
fi
echo ""
echo ""

# Test 3: Get Product by ID
echo -e "${BLUE}3️⃣  Testing Get Product by ID...${NC}"
PRODUCT_1=$(curl -s "$BASE_URL/products/1")
if echo "$PRODUCT_1" | grep -q '"id"'; then
    echo -e "${GREEN}✅ Product ID 1: Found${NC}"
    echo "   Response:"
    echo "$PRODUCT_1" | head -10
else
    echo -e "${YELLOW}⚠️  Product ID 1: Not found${NC}"
    echo "   (Có thể database chưa có sản phẩm với ID=1)"
fi
echo ""
echo ""

# Test 4: Orders API
echo -e "${BLUE}4️⃣  Testing Orders API...${NC}"
ORDERS_RESPONSE=$(curl -s "$BASE_URL/orders")
if echo "$ORDERS_RESPONSE" | grep -q "success\|data"; then
    echo -e "${GREEN}✅ Orders API: Working${NC}"
else
    echo -e "${YELLOW}⚠️  Orders API: Check response${NC}"
fi
echo ""
echo ""

# Test 5: Coupons API
echo -e "${BLUE}5️⃣  Testing Coupons API...${NC}"
COUPONS_RESPONSE=$(curl -s "$BASE_URL/coupons")
if echo "$COUPONS_RESPONSE" | grep -q "success\|data"; then
    echo -e "${GREEN}✅ Coupons API: Working${NC}"
else
    echo -e "${YELLOW}⚠️  Coupons API: Check response${NC}"
fi
echo ""
echo ""

# Summary
echo "═══════════════════════════════════════════════════════"
echo -e "${BLUE}📊 SUMMARY${NC}"
echo "═══════════════════════════════════════════════════════"
echo ""
if [ "$PRODUCT_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✅ Backend đang hoạt động tốt!${NC}"
    echo -e "${GREEN}✅ Đã nhận $PRODUCT_COUNT sản phẩm từ MySQL${NC}"
    echo ""
    echo "🎉 Bạn có thể:"
    echo "   1. Test từ browser: http://localhost:5000/api/products"
    echo "   2. Chạy frontend và xem sản phẩm"
    echo "   3. Tiếp tục phát triển tính năng"
else
    echo -e "${YELLOW}⚠️  Backend hoạt động nhưng chưa có dữ liệu${NC}"
    echo ""
    echo "💡 Cần làm:"
    echo "   1. Chạy schema: mysql -u root -p yen_sao_db < database/schema.sql"
    echo "   2. Hoặc dùng MySQL Workbench để chạy schema.sql"
    echo "   3. Chạy lại script này để test"
fi
echo ""


