# Hướng Dẫn Tích Hợp Hoàn Chỉnh Frontend ↔ Backend ↔ MySQL

## ✅ Đã Hoàn Thành

### 1. **Backend API** ✅
- ✅ Express server với MySQL
- ✅ API endpoints cho Products, Orders, Contacts, Coupons
- ✅ File upload cho product images
- ✅ Parse JSON fields (benefits, article) từ MySQL

### 2. **Frontend Integration** ✅
- ✅ **ContactForm**: Gửi dữ liệu lên `/api/contact` → Lưu vào MySQL
- ✅ **Checkout**: Gửi đơn hàng lên `/api/orders` → Lưu vào MySQL
- ✅ **Products**: Fetch từ `/api/products` với filter category
- ✅ **ProductDetail**: Fetch từ `/api/products/:id` với related products
- ✅ **ProductCard**: Xử lý cả frontend và backend format

### 3. **Data Seeding** ✅
- ✅ Script `backend/scripts/seed-products.js` để import products vào MySQL

---

## 🚀 Cách Chạy Toàn Bộ Hệ Thống

### **Bước 1: Setup Database**

1. **Đảm bảo MySQL đang chạy:**
```bash
# Windows PowerShell (Admin)
Get-Service MySQL*
net start MySQL80
```

2. **Tạo database và tables:**
```sql
-- Mở MySQL Workbench và chạy:
SOURCE backend/database/schema.sql;
```

Hoặc chạy file `backend/database/schema.sql` trong MySQL Workbench.

### **Bước 2: Seed Products Data**

```bash
cd backend
node scripts/seed-products.js
```

Sẽ import 6 products vào MySQL.

### **Bước 3: Chạy Backend**

```bash
cd backend
npm run dev
```

Backend chạy tại: `http://localhost:5000`

### **Bước 4: Chạy Frontend**

```bash
# Từ thư mục gốc
npm run dev
```

Frontend chạy tại: `http://localhost:5173` (hoặc port khác)

---

## 📋 Kiểm Tra Tích Hợp

### **1. Test Products API**

**Frontend:**
- Mở `http://localhost:5173/products`
- Sẽ thấy danh sách products từ MySQL
- Click filter category → products sẽ được filter
- Click vào product → xem chi tiết từ MySQL

**Backend API:**
```bash
curl http://localhost:5000/api/products
curl http://localhost:5000/api/products?category=blood-nest
curl http://localhost:5000/api/products/1
```

### **2. Test Contact Form**

1. Mở `http://localhost:5173/contact`
2. Điền form và submit
3. Kiểm tra MySQL:
```sql
USE yen_sao_db;
SELECT * FROM contacts ORDER BY id DESC LIMIT 5;
```

### **3. Test Order/Checkout**

1. Thêm sản phẩm vào giỏ hàng
2. Vào checkout và đặt hàng
3. Kiểm tra MySQL:
```sql
USE yen_sao_db;
SELECT * FROM orders ORDER BY id DESC LIMIT 5;
```

---

## 🔄 Luồng Dữ Liệu

### **Products:**
```
MySQL Database
    ↓
Backend API (/api/products)
    ↓
Frontend (Products.jsx, ProductDetail.jsx)
    ↓
Hiển thị cho người dùng
```

### **Contact Form:**
```
Frontend Form (ContactForm.jsx)
    ↓
API Call (contactAPI.send)
    ↓
Backend API (/api/contact)
    ↓
MySQL Database (contacts table)
```

### **Orders:**
```
Frontend Checkout (Checkout.jsx)
    ↓
API Call (ordersAPI.create)
    ↓
Backend API (/api/orders)
    ↓
MySQL Database (orders table)
```

---

## 🛠️ Troubleshooting

### **Lỗi: "Cannot fetch products"**

**Nguyên nhân:** Backend không chạy hoặc không kết nối được

**Giải pháp:**
1. Kiểm tra backend: `http://localhost:5000/api/health`
2. Kiểm tra MySQL connection trong backend logs
3. Kiểm tra CORS settings trong `backend/src/server.js`

### **Lỗi: "Products array is empty"**

**Nguyên nhân:** Chưa seed data vào MySQL

**Giải pháp:**
```bash
cd backend
node scripts/seed-products.js
```

### **Lỗi: "Field names mismatch" (originalPrice vs original_price)**

**Đã xử lý:** 
- Backend parse và normalize field names
- Frontend components xử lý cả hai format

### **Lỗi: "JSON parsing error"**

**Đã xử lý:**
- Backend tự động parse JSON fields (benefits, article)
- Frontend nhận data đã được parse sẵn

---

## 📊 Database Schema

### **Products Table:**
- `id`, `name`, `category`, `price`, `original_price`
- `image`, `rating`, `reviews`, `description`
- `benefits` (JSON), `in_stock`, `article` (JSON)

### **Orders Table:**
- `id`, `order_number`, `name`, `email`, `phone`, `address`
- `items` (JSON), `totals` (JSON), `payment_method`
- `coupon`, `status`, `created_at`

### **Contacts Table:**
- `id`, `name`, `email`, `subject`, `message`
- `is_read`, `created_at`

---

## ✅ Checklist Hoàn Thành

- [x] Backend API với MySQL
- [x] Products fetch từ backend
- [x] Product detail fetch từ backend
- [x] Contact form gửi lên backend
- [x] Order/Checkout gửi lên backend
- [x] Seed data script
- [x] JSON field parsing
- [x] Field name normalization
- [x] Error handling
- [x] Loading states

---

## 🎯 Kết Quả

Bây giờ toàn bộ hệ thống đã được tích hợp:

1. ✅ **Frontend** ↔ **Backend** ↔ **MySQL** hoạt động hoàn chỉnh
2. ✅ Dữ liệu từ form được lưu vào MySQL
3. ✅ Products được fetch từ MySQL và hiển thị trên frontend
4. ✅ Tất cả các tính năng đã được kết nối

**Hệ thống sẵn sàng để sử dụng!** 🎉


