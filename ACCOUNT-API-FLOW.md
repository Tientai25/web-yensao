# 🔐 Tài Liệu Chi Tiết: Xử Lý API Tài Khoản

## 📋 Tổng Quan Kiến Trúc

Hệ thống authentication sử dụng **JWT (JSON Web Token)** với kiến trúc:
- **Backend**: Node.js + Express + MySQL
- **Frontend**: React + Context API
- **Bảo mật**: bcryptjs (hash password) + JWT (token authentication)

---

## 🗄️ Database Schema

### Bảng `users`
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,        -- Hashed với bcrypt
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',       -- 'user' hoặc 'admin'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔧 Backend API Implementation

### 1️⃣ **Controller** (`backend/src/controllers/authController.js`)

#### 📝 **Register** - Đăng ký tài khoản mới
```javascript
POST /api/auth/register

// Request Body:
{
  "email": "user@example.com",
  "password": "123456",
  "name": "Nguyễn Văn A"
}

// Xử lý:
1. Validate email & password (password >= 6 ký tự)
2. Kiểm tra email đã tồn tại chưa
3. Hash password với bcrypt (saltRounds = 10)
4. Insert vào database
5. Tạo JWT token (expires: 7 ngày)
6. Trả về user info + token

// Response Success (201):
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

// Response Error (400):
{
  "success": false,
  "error": "Email already registered. Please login instead."
}
```

#### 🔑 **Login** - Đăng nhập
```javascript
POST /api/auth/login

// Request Body:
{
  "email": "user@example.com",
  "password": "123456"
}

// Xử lý:
1. Validate email & password
2. Tìm user trong database theo email
3. So sánh password với bcrypt.compare()
4. Tạo JWT token mới
5. Trả về user info + token

// Response Success (200):
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

// Response Error (401):
{
  "success": false,
  "error": "Invalid email or password."
}
```

#### 👤 **Get Me** - Lấy thông tin user hiện tại
```javascript
GET /api/auth/me
Headers: Authorization: Bearer <token>

// Xử lý:
1. Middleware authenticate() verify token
2. Lấy user từ database theo userId trong token
3. Trả về user info (không có password)

// Response Success (200):
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

#### 🚪 **Logout** - Đăng xuất
```javascript
POST /api/auth/logout
Headers: Authorization: Bearer <token>

// Xử lý:
- JWT logout được xử lý ở client-side (xóa token)
- Backend chỉ trả về success message

// Response (200):
{
  "success": true,
  "message": "Logout successful."
}
```

---

### 2️⃣ **Middleware** (`backend/src/middleware/auth.js`)

#### 🛡️ **authenticate** - Xác thực JWT token
```javascript
// Cách hoạt động:
1. Lấy token từ header: Authorization: Bearer <token>
2. Verify token với jwt.verify() và JWT_SECRET
3. Decode token để lấy userId
4. Query database để lấy user info
5. Gắn user vào req.user để dùng trong các route tiếp theo

// Errors:
- 401: No token provided
- 401: Invalid token (JsonWebTokenError)
- 401: Token expired (TokenExpiredError)
- 401: User not found
```

#### 👑 **isAdmin** - Kiểm tra quyền admin
```javascript
// Cách hoạt động:
1. Kiểm tra req.user có tồn tại không
2. Kiểm tra req.user.role === 'admin'
3. Cho phép tiếp tục nếu là admin

// Errors:
- 401: Authentication required
- 403: Admin access required
```

---

### 3️⃣ **Routes** (`backend/src/routes/authRoutes.js`)

```javascript
// Public routes (không cần token):
POST /api/auth/register    → register()
POST /api/auth/login       → login()

// Protected routes (cần token):
GET  /api/auth/me          → authenticate → getMe()
POST /api/auth/logout      → authenticate → logout()
```

---

## 🎨 Frontend Implementation

### 1️⃣ **API Client** (`src/utils/api.js`)

#### 🔌 Helper Function
```javascript
const apiCall = async (endpoint, options = {}) => {
  // 1. Lấy token từ localStorage
  const token = localStorage.getItem('token');
  
  // 2. Thêm token vào headers
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
  
  // 3. Gọi API
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers,
    ...options
  });
  
  // 4. Parse JSON và handle errors
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  
  return data;
};
```

#### 📡 Auth API Methods
```javascript
export const authAPI = {
  // Đăng ký
  register: async (email, password, name) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name })
    });
  },

  // Đăng nhập
  login: async (email, password) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  // Lấy thông tin user
  getMe: async () => {
    return apiCall('/auth/me');
  },

  // Đăng xuất
  logout: async () => {
    return apiCall('/auth/logout', { method: 'POST' });
  }
};
```

---

### 2️⃣ **Auth Context** (`src/contexts/AuthContext.jsx`)

#### 🎯 State Management
```javascript
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Auto-load user khi có token
  useEffect(() => {
    if (token) {
      authAPI.getMe()
        .then(response => setUser(response.data))
        .catch(() => {
          localStorage.removeItem('token');
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  // Methods
  const login = async (email, password) => {
    const response = await authAPI.login(email, password);
    if (response.success) {
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setUser(response.data.user);
      return { success: true };
    }
    return { success: false, error: response.error };
  };

  const register = async (email, password, name) => {
    const response = await authAPI.register(email, password, name);
    if (response.success) {
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setUser(response.data.user);
      return { success: true };
    }
    return { success: false, error: response.error };
  };

  const logout = async () => {
    await authAPI.logout();
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated: !!user,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để sử dụng
export const useAuth = () => useContext(AuthContext);
```

---

### 3️⃣ **Login Page** (`src/pages/Login.jsx`)

```javascript
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!formData.email || !formData.password) {
      setError('Vui lòng điền đầy đủ thông tin');
      setIsSubmitting(false);
      return;
    }

    // Call API
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/');  // Redirect về trang chủ
    } else {
      setError(result.error);
    }
    
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        placeholder="Mật khẩu"
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Đang đăng nhập...' : 'Đăng Nhập'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
```

---

### 4️⃣ **Register Page** (`src/pages/Register.jsx`)

```javascript
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    // Call API
    const result = await register(
      formData.email,
      formData.password,
      formData.name
    );

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields tương tự Login */}
    </form>
  );
};
```

---

## 🔄 Flow Diagram

### 📝 Registration Flow
```
User → Frontend (Register.jsx)
  ↓ [POST /api/auth/register]
Backend (authController.register)
  ↓ Validate input
  ↓ Check email exists
  ↓ Hash password (bcrypt)
  ↓ Insert to database
  ↓ Generate JWT token
  ↓ Return user + token
Frontend (AuthContext)
  ↓ Save token to localStorage
  ↓ Set user state
  ↓ Redirect to home
```

### 🔑 Login Flow
```
User → Frontend (Login.jsx)
  ↓ [POST /api/auth/login]
Backend (authController.login)
  ↓ Validate input
  ↓ Find user by email
  ↓ Compare password (bcrypt)
  ↓ Generate JWT token
  ↓ Return user + token
Frontend (AuthContext)
  ↓ Save token to localStorage
  ↓ Set user state
  ↓ Redirect to home
```

### 🔒 Protected Route Flow
```
User → Frontend (Request protected resource)
  ↓ [GET /api/auth/me]
  ↓ Headers: Authorization: Bearer <token>
Backend (authenticate middleware)
  ↓ Extract token from header
  ↓ Verify token with JWT_SECRET
  ↓ Decode userId from token
  ↓ Query user from database
  ↓ Attach user to req.user
  ↓ Continue to controller
Backend (authController.getMe)
  ↓ Return user info
Frontend
  ↓ Update user state
```

---

## 🔐 Security Features

### 1. Password Hashing
```javascript
// Backend sử dụng bcryptjs
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);

// Verify password
const isValid = await bcrypt.compare(plainPassword, hashedPassword);
```

### 2. JWT Token
```javascript
// Generate token
const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// Verify token
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

### 3. Token Storage
- **Frontend**: Lưu trong `localStorage`
- **Gửi token**: Qua header `Authorization: Bearer <token>`
- **Auto-load**: Khi app khởi động, tự động load user nếu có token

---

## 🧪 Testing API với cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456",
    "name": "Test User"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456"
  }'
```

### Get Me (với token)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Logout
```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📦 Dependencies

### Backend
```json
{
  "bcryptjs": "^2.4.3",      // Hash password
  "jsonwebtoken": "^9.0.2",  // JWT token
  "mysql2": "^3.6.5",        // MySQL driver
  "express": "^4.18.2"       // Web framework
}
```

### Frontend
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.20.0"  // Routing
}
```

---

## ⚙️ Environment Variables

### Backend (`.env`)
```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=yen_sao_db

# JWT
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
JWT_EXPIRE=7d

# Server
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🎯 Sử Dụng trong Components

### Kiểm tra authentication
```javascript
import { useAuth } from '../contexts/AuthContext';

const MyComponent = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <div>Vui lòng đăng nhập</div>;
  }

  return <div>Xin chào, {user.name}!</div>;
};
```

### Hiển thị thông tin user trong Header
```javascript
const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header>
      {isAuthenticated ? (
        <>
          <span>Xin chào, {user.name}</span>
          <button onClick={logout}>Đăng xuất</button>
        </>
      ) : (
        <>
          <Link to="/login">Đăng nhập</Link>
          <Link to="/register">Đăng ký</Link>
        </>
      )}
    </header>
  );
};
```

---

## 🚀 Tính Năng Mở Rộng (Future)

1. **Forgot Password**: Reset mật khẩu qua email
2. **Email Verification**: Xác thực email khi đăng ký
3. **Refresh Token**: Tự động refresh token khi hết hạn
4. **OAuth**: Đăng nhập bằng Google/Facebook
5. **2FA**: Two-factor authentication
6. **Token Blacklist**: Blacklist token khi logout
7. **Rate Limiting**: Giới hạn số lần login sai
8. **Session Management**: Quản lý nhiều session

---

## 📝 Notes

- Token được lưu trong `localStorage` (có thể chuyển sang `httpOnly cookie` để bảo mật hơn)
- Password được hash với bcrypt (không thể decrypt)
- JWT token expires sau 7 ngày (có thể config)
- Middleware `authenticate` tự động verify token cho protected routes
- Frontend tự động load user khi app khởi động nếu có token

---

**Tài liệu này mô tả đầy đủ flow xử lý API tài khoản trong dự án Yến Sào!** 🎉
