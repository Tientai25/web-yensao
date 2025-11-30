# Hướng dẫn kiểm tra dữ liệu từ Frontend → Backend → MySQL

## ✅ Đã cập nhật

### 1. **ContactForm** (`src/components/ContactForm.jsx`)
- ✅ Đã tích hợp với backend API
- ✅ Gửi dữ liệu lên `/api/contact` khi submit form
- ✅ Dữ liệu được lưu vào bảng `contacts` trong MySQL

### 2. **Checkout** (`src/pages/Checkout.jsx`)
- ✅ Đã tích hợp với backend API
- ✅ Gửi dữ liệu lên `/api/orders` khi đặt hàng
- ✅ Dữ liệu được lưu vào bảng `orders` trong MySQL

---

## 🧪 Cách kiểm tra

### **Bước 1: Đảm bảo Backend đang chạy**

```bash
cd backend
npm run dev
```

Backend phải hiển thị:
```
🚀 Server is running on http://localhost:5000
✅ Connected to MySQL database
```

---

### **Bước 2: Đảm bảo Frontend đang chạy**

```bash
npm run dev
```

Frontend chạy ở: `http://localhost:5173` (hoặc port khác)

---

### **Bước 3: Test Contact Form**

1. Mở trình duyệt: `http://localhost:5173/contact`
2. Điền form liên hệ:
   - Họ và tên: `Nguyễn Văn A`
   - Email: `test@example.com`
   - Tiêu đề: `Test liên hệ`
   - Nội dung: `Đây là tin nhắn test`
3. Click **"Gửi tin nhắn"**
4. Kiểm tra trong MySQL Workbench:

```sql
USE yen_sao_db;
SELECT * FROM contacts ORDER BY id DESC LIMIT 5;
```

Bạn sẽ thấy dữ liệu vừa submit!

---

### **Bước 4: Test Order Form**

1. Thêm sản phẩm vào giỏ hàng
2. Vào trang checkout: `http://localhost:5173/checkout`
3. Điền thông tin:
   - Họ và tên: `Trần Thị B`
   - Số điện thoại: `0123456789`
   - Email: `customer@example.com`
   - Địa chỉ: `123 Đường ABC, Quận 1, TP.HCM`
   - Chọn phương thức thanh toán
4. Click **"Thanh toán"**
5. Kiểm tra trong MySQL Workbench:

```sql
USE yen_sao_db;
SELECT * FROM orders ORDER BY id DESC LIMIT 5;
SELECT 
  id, 
  order_number, 
  name, 
  email, 
  phone, 
  status,
  created_at
FROM orders 
ORDER BY id DESC 
LIMIT 5;
```

Bạn sẽ thấy đơn hàng vừa tạo!

---

## 🔍 Kiểm tra chi tiết dữ liệu

### **Xem tất cả contacts:**

```sql
SELECT 
  id,
  name,
  email,
  subject,
  message,
  created_at
FROM contacts
ORDER BY created_at DESC;
```

### **Xem tất cả orders:**

```sql
SELECT 
  id,
  order_number,
  name,
  email,
  phone,
  address,
  payment_method,
  status,
  totals,
  created_at
FROM orders
ORDER BY created_at DESC;
```

### **Xem items trong một order:**

```sql
SELECT 
  id,
  order_number,
  JSON_EXTRACT(items, '$') as items,
  JSON_EXTRACT(totals, '$') as totals
FROM orders
WHERE id = 1;  -- Thay 1 bằng ID order bạn muốn xem
```

---

## 🐛 Troubleshooting

### **Lỗi: "Failed to fetch" hoặc "Network error"**

**Nguyên nhân:** Frontend không kết nối được với backend

**Giải pháp:**
1. Kiểm tra backend có đang chạy không: `http://localhost:5000/api/health`
2. Kiểm tra CORS trong `backend/src/server.js` có cho phép frontend không
3. Kiểm tra biến môi trường `VITE_API_URL` trong frontend (nếu có)

### **Lỗi: "Database connection error"**

**Nguyên nhân:** MySQL không chạy hoặc cấu hình sai

**Giải pháp:**
1. Kiểm tra MySQL service: `Get-Service MySQL*` (PowerShell)
2. Khởi động MySQL: `net start MySQL80` (cần quyền Admin)
3. Kiểm tra file `.env` trong `backend/` có đúng thông tin không

### **Dữ liệu không hiển thị trong MySQL**

**Nguyên nhân:** Có thể query chưa commit hoặc table chưa tồn tại

**Giải pháp:**
1. Kiểm tra table có tồn tại:
```sql
SHOW TABLES;
```

2. Nếu chưa có, chạy lại schema:
```sql
SOURCE backend/database/schema.sql;
```

Hoặc copy nội dung `backend/database/schema.sql` và chạy trong MySQL Workbench.

---

## 📊 Kiểm tra qua Backend API

### **Test Contact API:**

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "Test message"
  }'
```

### **Test Orders API:**

```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Customer",
    "email": "customer@example.com",
    "phone": "0123456789",
    "address": "123 Test Street",
    "items": [{"id": 1, "name": "Product 1", "price": 100000, "quantity": 2}],
    "totals": {"subtotal": 200000, "total": 200000},
    "paymentMethod": "COD"
  }'
```

---

## ✅ Kết luận

Sau khi test, bạn sẽ thấy:
- ✅ Dữ liệu từ form frontend được gửi lên backend
- ✅ Backend lưu dữ liệu vào MySQL
- ✅ Có thể query và xem dữ liệu trong MySQL Workbench

**Luồng dữ liệu hoàn chỉnh:**
```
Frontend Form → API Call → Backend Server → MySQL Database
```

