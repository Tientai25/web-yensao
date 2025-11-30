# Hướng Dẫn Sử Dụng Postman để Test API

## 🤔 Postman Là Gì?

**Postman** là một công cụ phổ biến để:
- ✅ **Test API** - Gửi requests (GET, POST, PUT, DELETE) đến backend
- ✅ **Debug** - Xem response, status code, errors
- ✅ **Document API** - Tạo documentation cho team
- ✅ **Automation** - Chạy test tự động
- ✅ **Development** - Test API trước khi tích hợp vào frontend

---

## 🎯 Tại Sao Dùng Postman?

### **1. Test API Nhanh Chóng**
Thay vì phải code frontend để test, bạn có thể:
- Gửi request ngay lập tức
- Xem kết quả ngay
- Không cần viết code

### **2. Debug Dễ Dàng**
- Xem request headers, body
- Xem response chi tiết
- Xem error messages rõ ràng

### **3. Test Trước Khi Tích Hợp**
- Test backend API trước khi frontend sẵn sàng
- Đảm bảo API hoạt động đúng
- Phát hiện lỗi sớm

---

## 📥 Cài Đặt Postman

### **Option 1: Desktop App (Khuyên dùng)**
1. Download: https://www.postman.com/downloads/
2. Cài đặt và mở Postman
3. Tạo account (miễn phí) hoặc dùng không cần account

### **Option 2: Web Version**
1. Truy cập: https://web.postman.com/
2. Đăng nhập và sử dụng trực tiếp trên browser

---

## 🚀 Sử Dụng Postman với Project Này

### **Bước 1: Đảm Bảo Backend Đang Chạy**

```bash
cd backend
npm run dev
```

Backend phải chạy tại: `http://localhost:5000`

---

### **Bước 2: Test API Endpoints**

## 📋 Các API Endpoints Có Thể Test

### **1. Health Check**

**GET** `http://localhost:5000/api/health`

**Cách test:**
1. Mở Postman
2. Chọn method: **GET**
3. Nhập URL: `http://localhost:5000/api/health`
4. Click **Send**
5. Xem response:

```json
{
  "success": true,
  "message": "API is running"
}
```

---

### **2. Get All Products**

**GET** `http://localhost:5000/api/products`

**Cách test:**
1. Method: **GET**
2. URL: `http://localhost:5000/api/products`
3. Click **Send**

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Yến Sào Huyết 100% Tự Nhiên",
      "category": "blood-nest",
      "price": 2500000,
      "originalPrice": 3000000,
      ...
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 6
  }
}
```

**Test với Filter:**
- URL: `http://localhost:5000/api/products?category=blood-nest`
- URL: `http://localhost:5000/api/products?search=yến`
- URL: `http://localhost:5000/api/products?page=1&limit=5`

---

### **3. Get Product By ID**

**GET** `http://localhost:5000/api/products/1`

**Cách test:**
1. Method: **GET**
2. URL: `http://localhost:5000/api/products/1`
3. Click **Send**

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Yến Sào Huyết 100% Tự Nhiên",
    "category": "blood-nest",
    "price": 2500000,
    "originalPrice": 3000000,
    "image": "/images/product-1.svg",
    "rating": 4.8,
    "reviews": 124,
    "description": "...",
    "benefits": ["Bổ máu", "Tăng sức đề kháng", "Làm đẹp da"],
    "inStock": true,
    "article": {
      "title": "...",
      "content": ["...", "..."]
    }
  }
}
```

---

### **4. Create Product (POST)**

**POST** `http://localhost:5000/api/products`

**Cách test:**
1. Method: **POST**
2. URL: `http://localhost:5000/api/products`
3. Tab **Headers**: 
   - Key: `Content-Type`
   - Value: `application/json`
4. Tab **Body** → Chọn **raw** → Chọn **JSON**
5. Nhập JSON:

```json
{
  "name": "Yến Sào Test",
  "category": "white-nest",
  "price": 1500000,
  "originalPrice": 2000000,
  "image": "/images/test.svg",
  "rating": 4.5,
  "reviews": 10,
  "description": "Sản phẩm test",
  "benefits": ["Test benefit 1", "Test benefit 2"],
  "inStock": true,
  "article": {
    "title": "Test Article",
    "content": ["Paragraph 1", "Paragraph 2"]
  }
}
```

6. Click **Send**

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 7,
    "name": "Yến Sào Test",
    ...
  }
}
```

---

### **5. Update Product (PUT)**

**PUT** `http://localhost:5000/api/products/1`

**Cách test:**
1. Method: **PUT**
2. URL: `http://localhost:5000/api/products/1`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):

```json
{
  "name": "Yến Sào Huyết Updated",
  "category": "blood-nest",
  "price": 2600000,
  "originalPrice": 3000000,
  "image": "/images/product-1.svg",
  "rating": 4.9,
  "reviews": 150,
  "description": "Updated description",
  "benefits": ["Bổ máu", "Tăng sức đề kháng", "Làm đẹp da", "New benefit"],
  "inStock": true,
  "article": {
    "title": "Updated Title",
    "content": ["Updated content"]
  }
}
```

5. Click **Send**

---

### **6. Delete Product (DELETE)**

**DELETE** `http://localhost:5000/api/products/7`

**Cách test:**
1. Method: **DELETE**
2. URL: `http://localhost:5000/api/products/7`
3. Click **Send**

**Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

### **7. Create Contact (POST)**

**POST** `http://localhost:5000/api/contact`

**Cách test:**
1. Method: **POST**
2. URL: `http://localhost:5000/api/contact`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):

```json
{
  "name": "Nguyễn Văn A",
  "email": "test@example.com",
  "subject": "Test Contact",
  "message": "Đây là tin nhắn test từ Postman"
}
```

5. Click **Send**

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Nguyễn Văn A",
    "email": "test@example.com",
    ...
  },
  "message": "Contact message sent successfully"
}
```

**Kiểm tra trong MySQL:**
```sql
USE yen_sao_db;
SELECT * FROM contacts ORDER BY id DESC LIMIT 5;
```

---

### **8. Create Order (POST)**

**POST** `http://localhost:5000/api/orders`

**Cách test:**
1. Method: **POST**
2. URL: `http://localhost:5000/api/orders`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):

```json
{
  "name": "Trần Thị B",
  "email": "customer@example.com",
  "phone": "0123456789",
  "address": "123 Đường ABC, Quận 1, TP.HCM",
  "items": [
    {
      "id": 1,
      "name": "Yến Sào Huyết 100% Tự Nhiên",
      "price": 2500000,
      "quantity": 2,
      "image": "/images/product-1.svg"
    }
  ],
  "totals": {
    "subtotal": 5000000,
    "discount": 0,
    "shipping": 0,
    "tax": 500000,
    "total": 5500000
  },
  "paymentMethod": "COD",
  "coupon": null
}
```

5. Click **Send**

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "order_number": "ORD-1234567890",
    "name": "Trần Thị B",
    ...
  },
  "message": "Order created successfully"
}
```

**Kiểm tra trong MySQL:**
```sql
USE yen_sao_db;
SELECT * FROM orders ORDER BY id DESC LIMIT 5;
```

---

### **9. Validate Coupon (GET)**

**GET** `http://localhost:5000/api/coupons/YEN10`

**Cách test:**
1. Method: **GET**
2. URL: `http://localhost:5000/api/coupons/YEN10`
3. Click **Send**

**Response:**
```json
{
  "success": true,
  "data": {
    "code": "YEN10",
    "type": "percent",
    "value": 10,
    "description": "Giảm 10%",
    "active": true
  }
}
```

---

## 🎨 Tips Sử Dụng Postman

### **1. Lưu Requests vào Collection**
- Tạo Collection: Click **New** → **Collection**
- Đặt tên: "Yến Sào API"
- Lưu các requests vào collection để dùng lại

### **2. Sử Dụng Variables**
- Tạo environment variable:
  - `base_url`: `http://localhost:5000/api`
- Dùng trong URL: `{{base_url}}/products`

### **3. Test Response Status**
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Server Error

### **4. Xem Response Time**
- Postman hiển thị thời gian response
- Giúp kiểm tra performance

### **5. Export/Import Collection**
- Export collection để chia sẻ với team
- Import collection từ người khác

---

## 🔍 So Sánh: Postman vs Browser vs curl

| Công cụ | Ưu điểm | Nhược điểm |
|---------|---------|------------|
| **Postman** | UI đẹp, dễ dùng, có nhiều tính năng | Cần cài đặt |
| **Browser** | Nhanh cho GET requests | Khó test POST/PUT/DELETE |
| **curl** | Nhanh, không cần UI | Phải nhớ syntax |

---

## ✅ Kết Luận

**Postman rất hữu ích để:**
1. ✅ Test API nhanh chóng
2. ✅ Debug khi có lỗi
3. ✅ Test trước khi tích hợp frontend
4. ✅ Document API cho team
5. ✅ Kiểm tra response và data structure

**Trong project này, bạn có thể dùng Postman để:**
- Test tất cả API endpoints
- Kiểm tra data trả về từ MySQL
- Test create/update/delete products
- Test contact form và orders
- Debug khi có lỗi

---

## 📚 Tài Liệu Tham Khảo

- Postman Documentation: https://learning.postman.com/
- Postman Download: https://www.postman.com/downloads/


