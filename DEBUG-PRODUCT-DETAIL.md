# Hướng Dẫn Debug Lỗi Trang Trắng ProductDetail

## 🔍 Các Bước Kiểm Tra

### **1. Kiểm Tra Console (F12)**

Mở Developer Tools (F12) và kiểm tra tab **Console**:
- Có lỗi JavaScript nào không?
- Có lỗi network không?
- Có lỗi API không?

### **2. Kiểm Tra Network Tab**

Trong Developer Tools, vào tab **Network**:
- Tìm request đến `/api/products/:id`
- Kiểm tra:
  - Status code (200 = OK, 404 = Not Found, 500 = Server Error)
  - Response body có đúng format không?

### **3. Kiểm Tra Backend**

Đảm bảo backend đang chạy:
```bash
cd backend
npm run dev
```

Test API trực tiếp:
```bash
# Test với curl hoặc Postman
curl http://localhost:5000/api/products/1
```

### **4. Kiểm Tra Database**

Đảm bảo có sản phẩm trong database:
```sql
USE yen_sao_db;
SELECT * FROM products LIMIT 5;
```

### **5. Kiểm Tra Routes**

Đảm bảo route đúng:
- `/products/:id` hoặc `/product/:id`
- ID phải là số hợp lệ

---

## 🛠️ Các Lỗi Thường Gặp

### **Lỗi 1: API không trả về data**

**Triệu chứng:** Console hiển thị `Error fetching product`

**Giải pháp:**
1. Kiểm tra backend có chạy không
2. Kiểm tra API endpoint: `http://localhost:5000/api/products/:id`
3. Kiểm tra database có sản phẩm không

### **Lỗi 2: JSON parse error**

**Triệu chứng:** Console hiển thị `Error parsing benefits` hoặc `Error parsing article`

**Giải pháp:**
- Backend đã được cập nhật để parse JSON đúng cách
- Nếu vẫn lỗi, kiểm tra data trong database

### **Lỗi 3: Component crash**

**Triệu chứng:** Trang trắng hoàn toàn

**Giải pháp:**
- Đã thêm ErrorBoundary để catch lỗi
- Kiểm tra console để xem lỗi cụ thể

### **Lỗi 4: Image không load**

**Triệu chứng:** Ảnh sản phẩm không hiển thị

**Giải pháp:**
- Đã thêm fallback image: `/images/placeholder.svg`
- Kiểm tra path image trong database

---

## ✅ Đã Sửa

1. ✅ **Error Handling:** Thêm try-catch cho JSON parsing
2. ✅ **Error Boundary:** Thêm ErrorBoundary component
3. ✅ **Null Checks:** Kiểm tra null/undefined trước khi render
4. ✅ **Image Fallback:** Thêm placeholder image
5. ✅ **Safe Parsing:** Parse JSON an toàn với error handling

---

## 🧪 Test Nhanh

1. **Mở Console (F12)**
2. **Vào trang sản phẩm:** `http://localhost:5173/products/1`
3. **Kiểm tra:**
   - Có lỗi trong Console không?
   - Network request có thành công không?
   - Response data có đúng format không?

---

## 📝 Nếu Vẫn Lỗi

1. **Copy lỗi từ Console**
2. **Kiểm tra Network tab** - xem response từ API
3. **Kiểm tra backend logs** - xem có lỗi gì không
4. **Kiểm tra database** - xem có data không

---

## 🔧 Quick Fix

Nếu vẫn bị trang trắng, thử:

1. **Clear cache và reload:**
   - Ctrl + Shift + R (Windows)
   - Cmd + Shift + R (Mac)

2. **Restart dev server:**
   ```bash
   # Frontend
   npm run dev
   
   # Backend
   cd backend
   npm run dev
   ```

3. **Kiểm tra .env:**
   - `VITE_API_URL=http://localhost:5000/api`

---

## 📞 Thông Tin Debug

Khi báo lỗi, cung cấp:
- Screenshot Console errors
- Network request/response
- Backend logs
- ID sản phẩm đang test

