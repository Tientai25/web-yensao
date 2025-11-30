# Hướng Dẫn Tính Năng Đăng Nhập / Đăng Xuất

## ✅ Tính Năng Đã Hoàn Thành

### **Backend:**
- ✅ API đăng ký tài khoản (`POST /api/auth/register`)
- ✅ API đăng nhập (`POST /api/auth/login`)
- ✅ API đăng xuất (`POST /api/auth/logout`)
- ✅ API lấy thông tin user (`GET /api/auth/me`)
- ✅ JWT Authentication middleware
- ✅ Password hashing với bcryptjs
- ✅ Bảng `users` trong MySQL database

### **Frontend:**
- ✅ Trang đăng nhập (`/login`)
- ✅ Trang đăng ký (`/register`)
- ✅ AuthContext để quản lý authentication state
- ✅ User menu trong Header
- ✅ Tự động load user khi có token
- ✅ Protected routes (có thể thêm sau)

---

## 🚀 Cách Sử Dụng

### **1. Đăng Ký Tài Khoản Mới**

1. Truy cập: `http://localhost:5173/register`
2. Điền thông tin:
   - **Họ và tên** (tùy chọn)
   - **Email** (bắt buộc)
   - **Mật khẩu** (tối thiểu 6 ký tự)
   - **Xác nhận mật khẩu**
3. Click **"Đăng Ký"**
4. Sau khi đăng ký thành công, bạn sẽ tự động đăng nhập và chuyển về trang chủ

### **2. Đăng Nhập**

1. Truy cập: `http://localhost:5173/login`
2. Điền thông tin:
   - **Email**
   - **Mật khẩu**
3. Click **"Đăng Nhập"**
4. Sau khi đăng nhập thành công, bạn sẽ thấy tên/email của mình trong Header

### **3. Đăng Xuất**

1. Click vào **user menu** (icon 👤 + tên) ở Header
2. Click **"Đăng xuất"**
3. Bạn sẽ được đăng xuất và chuyển về trang chủ

---

## 🔐 API Endpoints

### **POST /api/auth/register**

Đăng ký tài khoản mới.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "Nguyễn Văn A" // optional
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "Nguyễn Văn A",
      "role": "user",
      "created_at": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User registered successfully."
}
```

---

### **POST /api/auth/login**

Đăng nhập.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "Nguyễn Văn A",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful."
}
```

---

### **GET /api/auth/me**

Lấy thông tin user hiện tại (yêu cầu authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "name": "Nguyễn Văn A",
    "role": "user",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### **POST /api/auth/logout**

Đăng xuất (yêu cầu authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful."
}
```

---

## 🗄️ Database Schema

Bảng `users` đã được tạo trong `backend/database/schema.sql`:

```sql
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user' COMMENT 'user, admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## 🔑 JWT Token

- **Token được lưu trong localStorage** với key `token`
- **Token tự động được gửi** trong header `Authorization: Bearer <token>` cho mọi API request
- **Token expire:** 7 ngày (có thể cấu hình trong `.env` với `JWT_EXPIRE`)
- **JWT Secret:** Cấu hình trong `.env` với `JWT_SECRET`

---

## 🎨 UI Components

### **Header User Menu**

Khi đã đăng nhập, Header sẽ hiển thị:
- Icon 👤 + Tên user (hoặc email nếu không có tên)
- Dropdown menu khi click:
  - Email của user
  - Badge "Admin" nếu user là admin
  - Nút "Đăng xuất"

### **Login/Register Pages**

- Form validation
- Error messages
- Loading states
- Responsive design
- Dark mode support

---

## 🛡️ Security Features

1. **Password Hashing:** Sử dụng bcryptjs với 10 salt rounds
2. **JWT Tokens:** Secure token-based authentication
3. **Email Validation:** Kiểm tra format email
4. **Password Requirements:** Tối thiểu 6 ký tự
5. **Token Expiration:** Token tự động hết hạn sau 7 ngày
6. **Protected Routes:** API endpoints yêu cầu authentication

---

## 📝 Test với Postman

### **1. Đăng Ký:**

```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123",
  "name": "Test User"
}
```

### **2. Đăng Nhập:**

```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### **3. Lấy Thông Tin User:**

```
GET http://localhost:5000/api/auth/me
Authorization: Bearer <token_from_login>
```

---

## 🔧 Cấu Hình

### **Backend `.env`:**

```env
# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
JWT_EXPIRE=7d
```

### **Frontend `.env`:**

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🐛 Troubleshooting

### **Lỗi: "Email already registered"**
- Email đã được sử dụng. Hãy dùng email khác hoặc đăng nhập.

### **Lỗi: "Invalid email or password"**
- Kiểm tra lại email và password.
- Đảm bảo đã đăng ký tài khoản trước.

### **Lỗi: "Token expired"**
- Token đã hết hạn. Hãy đăng nhập lại.

### **Lỗi: "No token provided"**
- Bạn chưa đăng nhập. Hãy đăng nhập trước.

---

## 📚 Files Đã Tạo/Cập Nhật

### **Backend:**
- `backend/src/controllers/authController.js`
- `backend/src/routes/authRoutes.js`
- `backend/src/middleware/auth.js`
- `backend/src/server.js` (thêm auth routes)

### **Frontend:**
- `src/contexts/AuthContext.jsx`
- `src/pages/Login.jsx`
- `src/pages/Register.jsx`
- `src/styles/Auth.module.css`
- `src/components/Header.jsx` (thêm user menu)
- `src/styles/Header.module.css` (thêm user menu styles)
- `src/utils/api.js` (thêm authAPI)
- `src/App.jsx` (thêm login/register routes)
- `src/main.jsx` (thêm AuthProvider)

---

## ✅ Next Steps (Tùy Chọn)

1. **Protected Routes:** Tạo component `ProtectedRoute` để bảo vệ các trang cần đăng nhập
2. **Password Reset:** Thêm tính năng reset password qua email
3. **Email Verification:** Xác thực email khi đăng ký
4. **Remember Me:** Lưu token lâu hơn nếu user chọn "Remember me"
5. **Social Login:** Đăng nhập bằng Google/Facebook
6. **User Profile:** Trang quản lý thông tin cá nhân
7. **Order History:** Xem lịch sử đơn hàng của user

---

## 🎉 Hoàn Thành!

Tính năng đăng nhập/đăng xuất đã sẵn sàng sử dụng! 🚀


