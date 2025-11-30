# Hướng Dẫn Test API - Kiểm Tra Backend Nhận Dữ Liệu Từ MySQL

Backend đã kết nối MySQL thành công! Bây giờ hãy test xem API có lấy được dữ liệu không.

## ✅ Bước 1: Kiểm Tra Database Có Dữ Liệu Chưa

### Cách 1: Dùng MySQL Workbench

1. Mở **MySQL Workbench**
2. Kết nối với MySQL server
3. Chọn database `yen_sao_db`
4. Chạy query:
   ```sql
   SELECT COUNT(*) FROM products;
   ```

**Nếu kết quả = 0** → Database chưa có dữ liệu, cần chạy schema

**Nếu kết quả > 0** → Database đã có dữ liệu ✅

### Cách 2: Dùng Git Bash

```bash
# Kết nối MySQL
mysql -u root -p yen_sao_db

# Trong MySQL shell
SELECT COUNT(*) FROM products;
EXIT;
```

---

## 🗄️ Bước 2: Chạy Schema (Nếu Chưa Có Dữ Liệu)

Nếu database chưa có tables hoặc chưa có dữ liệu:

### Cách 1: Dùng MySQL Workbench

1. Mở file `backend/database/schema.sql`
2. Copy toàn bộ nội dung
3. Paste vào MySQL Workbench SQL Editor
4. Click **Execute** (⚡)

### Cách 2: Dùng Command Line

```bash
# Trong Git Bash
cd backend
mysql -u root -p yen_sao_db < database/schema.sql
```

---

## 🧪 Bước 3: Test API Endpoints

### Test 1: Health Check

Mở browser và truy cập:
```
http://localhost:5000/api/health
```

**Kết quả mong đợi:**
```json
{
  "status": "OK",
  "message": "Yến Sào API is running"
}
```

✅ **Nếu thấy kết quả này → Backend đang chạy!**

---

### Test 2: Lấy Danh Sách Sản Phẩm

**Cách 1: Dùng Browser**
```
http://localhost:5000/api/products
```

**Cách 2: Dùng Git Bash (curl)**
```bash
curl http://localhost:5000/api/products
```

**Kết quả mong đợi:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Yến sào thô nguyên chất",
      "price": 2500000,
      ...
    },
    ...
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 10
  }
}
```

✅ **Nếu thấy mảng `data` có sản phẩm → Backend đã nhận dữ liệu từ MySQL!**

⚠️ **Nếu `data` là mảng rỗng `[]`** → Database chưa có dữ liệu, cần chạy schema

---

### Test 3: Lấy Chi Tiết Sản Phẩm

```
http://localhost:5000/api/products/1
```

Hoặc:
```bash
curl http://localhost:5000/api/products/1
```

**Kết quả mong đợi:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Yến sào thô nguyên chất",
    "price": 2500000,
    "description": "...",
    ...
  }
}
```

---

### Test 4: Test Các Endpoint Khác

#### Orders:
```bash
curl http://localhost:5000/api/orders
```

#### Coupons:
```bash
curl http://localhost:5000/api/coupons
```

#### Contact:
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Hello"}'
```

---

## 🔍 Bước 4: Kiểm Tra Log Backend

Khi test API, xem terminal backend có log gì không:

**Nếu thành công:**
- Không có error message
- Request được xử lý bình thường

**Nếu có lỗi:**
- Sẽ hiển thị error message trong terminal
- Kiểm tra error để biết nguyên nhân

---

## 📊 Bước 5: Test Từ Frontend

Sau khi backend đã nhận dữ liệu, test từ frontend:

1. Chạy frontend:
   ```bash
   npm run dev
   ```

2. Mở browser: `http://localhost:5173`

3. Mở DevTools (F12) → Network tab

4. Refresh trang → Xem có request đến `http://localhost:5000/api/products` không

5. Kiểm tra response có dữ liệu không

---

## 🛠️ Script Test Tự Động

Tạo file `test-api.sh` để test tự động:

```bash
#!/bin/bash

echo "🧪 Testing API Endpoints..."
echo ""

BASE_URL="http://localhost:5000/api"

# Test Health
echo "1️⃣  Testing Health Check..."
curl -s "$BASE_URL/health" | head -5
echo ""
echo ""

# Test Products
echo "2️⃣  Testing Products API..."
PRODUCTS=$(curl -s "$BASE_URL/products")
echo "$PRODUCTS" | head -20
echo ""

# Check if products exist
PRODUCT_COUNT=$(echo "$PRODUCTS" | grep -o '"id"' | wc -l)
if [ "$PRODUCT_COUNT" -gt 0 ]; then
    echo "✅ Found $PRODUCT_COUNT products!"
else
    echo "⚠️  No products found. Run schema.sql first!"
fi
```

Chạy:
```bash
bash test-api.sh
```

---

## ❌ Troubleshooting

### Lỗi: `data` là mảng rỗng `[]`

**Nguyên nhân:** Database chưa có dữ liệu

**Giải pháp:**
1. Chạy schema: `mysql -u root -p yen_sao_db < database/schema.sql`
2. Hoặc dùng MySQL Workbench để chạy `schema.sql`

---

### Lỗi: `Table 'products' doesn't exist`

**Nguyên nhân:** Chưa chạy schema

**Giải pháp:**
1. Chạy file `database/schema.sql` trong MySQL Workbench
2. Đảm bảo đã chọn database `yen_sao_db` trước khi chạy

---

### Lỗi: `Cannot GET /api/products`

**Nguyên nhân:** Backend chưa chạy hoặc route sai

**Giải pháp:**
1. Kiểm tra backend đang chạy: `http://localhost:5000/api/health`
2. Kiểm tra route trong `src/server.js`

---

## ✅ Checklist

- [ ] Backend đang chạy (http://localhost:5000/api/health)
- [ ] Database `yen_sao_db` đã được tạo
- [ ] Schema đã được chạy (có tables và dữ liệu)
- [ ] API `/api/products` trả về dữ liệu
- [ ] Frontend có thể kết nối backend

---

## 🎉 Kết Quả Mong Đợi

Sau khi test thành công:

1. ✅ Backend kết nối MySQL
2. ✅ API trả về dữ liệu từ database
3. ✅ Frontend có thể fetch dữ liệu từ backend
4. ✅ Website hiển thị sản phẩm từ database

**Chúc bạn thành công!** 🚀


