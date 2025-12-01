# Hướng Dẫn Sử Dụng FAQ API

## ✅ Đã Tích Hợp API Cho FAQ!

Bây giờ bạn có thể quản lý FAQs thông qua API thay vì hardcode trong frontend.

---

## 📋 API Endpoints

### **1. Lấy Tất Cả FAQs (Public)**

```http
GET /api/faqs
```

**Query Parameters:**
- `category` (optional): Lọc theo category
- `search` (optional): Tìm kiếm trong question/answer
- `active` (optional): `true` hoặc `false` (default: `true` cho public)

**Ví dụ:**
```bash
# Lấy tất cả FAQs
GET /api/faqs

# Lọc theo category
GET /api/faqs?category=Sản Phẩm

# Tìm kiếm
GET /api/faqs?search=yến sào

# Lấy cả active và inactive (admin only)
GET /api/faqs?active=false
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "category": "Sản Phẩm",
      "question": "Yến sào là gì?",
      "answer": "Yến sào là tổ được chim Yến...",
      "display_order": 1,
      "is_active": true,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 15
}
```

---

### **2. Lấy FAQ Theo ID (Public)**

```http
GET /api/faqs/:id
```

**Ví dụ:**
```bash
GET /api/faqs/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "category": "Sản Phẩm",
    "question": "Yến sào là gì?",
    "answer": "Yến sào là tổ được chim Yến...",
    "display_order": 1,
    "is_active": true,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### **3. Lấy Danh Sách Categories (Public)**

```http
GET /api/faqs/categories
```

**Response:**
```json
{
  "success": true,
  "data": [
    "Sản Phẩm",
    "Lợi Ích",
    "Cách Dùng",
    "Bảo Quản",
    "Giao Hàng",
    "Thanh Toán",
    "Khác"
  ]
}
```

---

### **4. Tạo FAQ Mới (Admin Only)**

```http
POST /api/faqs
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "category": "Sản Phẩm",
  "question": "Câu hỏi mới?",
  "answer": "Câu trả lời...",
  "display_order": 0,
  "is_active": true
}
```

**Required Fields:**
- `category`: String (required)
- `question`: String (required)
- `answer`: String (required)

**Optional Fields:**
- `display_order`: Number (default: 0)
- `is_active`: Boolean (default: true)

**Response:**
```json
{
  "success": true,
  "message": "FAQ created successfully",
  "data": {
    "id": 16,
    "category": "Sản Phẩm",
    "question": "Câu hỏi mới?",
    "answer": "Câu trả lời...",
    "display_order": 0,
    "is_active": true,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### **5. Cập Nhật FAQ (Admin Only)**

```http
PUT /api/faqs/:id
Authorization: Bearer <token>
```

**Request Body (tất cả fields đều optional):**
```json
{
  "category": "Lợi Ích",
  "question": "Câu hỏi đã cập nhật?",
  "answer": "Câu trả lời đã cập nhật...",
  "display_order": 5,
  "is_active": false
}
```

**Response:**
```json
{
  "success": true,
  "message": "FAQ updated successfully",
  "data": {
    "id": 1,
    "category": "Lợi Ích",
    "question": "Câu hỏi đã cập nhật?",
    "answer": "Câu trả lời đã cập nhật...",
    "display_order": 5,
    "is_active": false,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### **6. Xóa FAQ (Admin Only)**

```http
DELETE /api/faqs/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "FAQ deleted successfully"
}
```

---

## 💻 Sử Dụng Trong Frontend

### **Import API:**

```javascript
import { faqsAPI } from '../utils/api.js'
```

### **Lấy Tất Cả FAQs:**

```javascript
const fetchFAQs = async () => {
  try {
    const response = await faqsAPI.getAll({ active: 'true' })
    if (response.success) {
      setFaqs(response.data)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
```

### **Lấy Categories:**

```javascript
const fetchCategories = async () => {
  try {
    const response = await faqsAPI.getCategories()
    if (response.success) {
      setCategories(['Tất Cả', ...response.data])
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
```

### **Tạo FAQ Mới (Admin):**

```javascript
const createFAQ = async () => {
  try {
    const response = await faqsAPI.create({
      category: 'Sản Phẩm',
      question: 'Câu hỏi mới?',
      answer: 'Câu trả lời...',
      display_order: 0,
      is_active: true
    })
    if (response.success) {
      console.log('FAQ created:', response.data)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
```

### **Cập Nhật FAQ (Admin):**

```javascript
const updateFAQ = async (id) => {
  try {
    const response = await faqsAPI.update(id, {
      question: 'Câu hỏi đã cập nhật?',
      answer: 'Câu trả lời đã cập nhật...'
    })
    if (response.success) {
      console.log('FAQ updated:', response.data)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
```

### **Xóa FAQ (Admin):**

```javascript
const deleteFAQ = async (id) => {
  try {
    const response = await faqsAPI.delete(id)
    if (response.success) {
      console.log('FAQ deleted')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
```

---

## 🗄️ Database Schema

**Table: `faqs`**

```sql
CREATE TABLE IF NOT EXISTS faqs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Indexes:**
- `idx_faqs_category` on `category`
- `idx_faqs_is_active` on `is_active`
- `idx_faqs_display_order` on `display_order`

---

## 🔐 Authentication

**Public Endpoints (Không cần authentication):**
- `GET /api/faqs`
- `GET /api/faqs/:id`
- `GET /api/faqs/categories`

**Admin Endpoints (Cần authentication + admin role):**
- `POST /api/faqs`
- `PUT /api/faqs/:id`
- `DELETE /api/faqs/:id`

**Cách sử dụng:**
1. Login để lấy token
2. Thêm token vào header: `Authorization: Bearer <token>`
3. User phải có role `admin`

---

## 📝 Ví Dụ Sử Dụng với Postman

### **1. Lấy Tất Cả FAQs:**

```
GET http://localhost:5000/api/faqs
```

### **2. Tạo FAQ Mới (Admin):**

```
POST http://localhost:5000/api/faqs
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "category": "Sản Phẩm",
  "question": "Yến sào có tốt không?",
  "answer": "Yến sào rất tốt cho sức khỏe...",
  "display_order": 1,
  "is_active": true
}
```

### **3. Cập Nhật FAQ:**

```
PUT http://localhost:5000/api/faqs/1
Authorization: Bearer <your-token>
Content-Type: application/json

{
  "question": "Câu hỏi đã cập nhật?",
  "answer": "Câu trả lời đã cập nhật..."
}
```

### **4. Xóa FAQ:**

```
DELETE http://localhost:5000/api/faqs/1
Authorization: Bearer <your-token>
```

---

## ✅ Đã Hoàn Thành

- ✅ Database schema đã được thêm vào `backend/database/schema.sql`
- ✅ FAQ Controller đã được tạo (`backend/src/controllers/faqController.js`)
- ✅ FAQ Routes đã được tạo (`backend/src/routes/faqRoutes.js`)
- ✅ Routes đã được thêm vào server (`backend/src/server.js`)
- ✅ Frontend API client đã được cập nhật (`src/utils/api.js`)
- ✅ FAQ Page đã được cập nhật để fetch từ API (`src/pages/FAQ.jsx`)

---

## 🎯 Next Steps

Bây giờ bạn có thể:
1. ✅ Xem FAQs từ database
2. ✅ Tạo FAQs mới qua API (admin)
3. ✅ Cập nhật FAQs qua API (admin)
4. ✅ Xóa FAQs qua API (admin)
5. ✅ Frontend tự động load FAQs từ API

**Lưu ý:** Để sử dụng admin endpoints, bạn cần:
- Đăng nhập với tài khoản admin
- Lấy token từ response
- Thêm token vào header khi gọi API

---

## 🐛 Troubleshooting

### **Lỗi: FAQ not found**

- Kiểm tra ID có đúng không
- Kiểm tra FAQ có tồn tại trong database không

### **Lỗi: Unauthorized**

- Kiểm tra token có hợp lệ không
- Kiểm tra user có role `admin` không

### **Lỗi: Category, question, and answer are required**

- Đảm bảo gửi đầy đủ các fields bắt buộc khi tạo FAQ

---

## 📚 Tài Liệu Tham Khảo

- Xem `backend/src/controllers/faqController.js` để biết logic chi tiết
- Xem `backend/src/routes/faqRoutes.js` để biết routes
- Xem `src/pages/FAQ.jsx` để biết cách sử dụng trong frontend


