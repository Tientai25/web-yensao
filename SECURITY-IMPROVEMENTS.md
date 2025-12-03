# 🔒 Cải Thiện Bảo Mật: Chuyển từ localStorage sang httpOnly Cookies

## ⚠️ Vấn Đề với localStorage

### Trước đây (KHÔNG AN TOÀN):
```javascript
// ❌ Token lưu trong localStorage - AI CŨNG XEM ĐƯỢC!
localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...')
localStorage.setItem('last_order', JSON.stringify(orderData))

// Người dùng mở DevTools → Application → Local Storage → XEM HẾT!
// JavaScript có thể truy cập: document.cookie, localStorage.getItem()
```

### Rủi ro:
- ❌ **XSS Attack**: Hacker inject script có thể đánh cắp token
- ❌ **Dễ bị xem**: Bất kỳ ai mở DevTools đều thấy được
- ❌ **JavaScript truy cập được**: Mọi script trên trang đều đọc được
- ❌ **Không tự động expire**: Phải tự xử lý việc xóa token

---

## ✅ Giải Pháp: httpOnly Cookies

### Bây giờ (AN TOÀN):
```javascript
// ✅ Token lưu trong httpOnly cookie - JAVASCRIPT KHÔNG ĐỌC ĐƯỢC!
res.cookie('token', token, {
  httpOnly: true,      // JavaScript KHÔNG thể truy cập
  secure: true,        // Chỉ gửi qua HTTPS
  sameSite: 'strict',  // Chống CSRF attack
  maxAge: 7 * 24 * 60 * 60 * 1000  // Auto expire sau 7 ngày
})
```

### Ưu điểm:
- ✅ **httpOnly**: JavaScript KHÔNG thể đọc cookie này
- ✅ **secure**: Chỉ gửi qua HTTPS (production)
- ✅ **sameSite**: Chống Cross-Site Request Forgery
- ✅ **Auto expire**: Tự động hết hạn sau thời gian định
- ✅ **Browser tự động gửi**: Không cần code thêm

---

## 🔄 Những Thay Đổi Đã Thực Hiện

### 1. Backend Changes

#### ✅ Cài đặt cookie-parser
```bash
npm install cookie-parser
```

#### ✅ server.js - Thêm middleware
```javascript
import cookieParser from 'cookie-parser';

app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true  // ← Quan trọng: cho phép gửi cookies
}));
```

#### ✅ authController.js - Set cookie thay vì trả token
```javascript
// TRƯỚC:
res.json({
  success: true,
  data: { user, token }  // ❌ Token trong response
});

// SAU:
res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000
});

res.json({
  success: true,
  data: { user }  // ✅ Không có token trong response
});
```

#### ✅ auth.js middleware - Đọc từ cookie
```javascript
// TRƯỚC:
const authHeader = req.headers.authorization;
const token = authHeader.substring(7); // Remove 'Bearer '

// SAU:
const token = req.cookies.token;  // ✅ Đọc từ cookie
```

#### ✅ Logout - Clear cookie
```javascript
// TRƯỚC:
res.json({ success: true });  // Client tự xóa localStorage

// SAU:
res.clearCookie('token', {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict'
});
res.json({ success: true });
```

---

### 2. Frontend Changes

#### ✅ api.js - Gửi credentials
```javascript
// TRƯỚC:
const token = localStorage.getItem('token');
headers['Authorization'] = `Bearer ${token}`;

// SAU:
const response = await fetch(`${API_URL}${endpoint}`, {
  headers,
  credentials: 'include'  // ✅ Tự động gửi cookies
});
```

#### ✅ AuthContext.jsx - Không dùng localStorage
```javascript
// TRƯỚC:
const [token, setToken] = useState(localStorage.getItem('token'));
localStorage.setItem('token', newToken);
localStorage.removeItem('token');

// SAU:
// ✅ Không cần state token, cookie tự động gửi
const [user, setUser] = useState(null);
```

#### ✅ Checkout.jsx - Dùng location state
```javascript
// TRƯỚC:
localStorage.setItem('last_order', JSON.stringify(response.data));
navigate('/thank-you?orderId=' + response.data.id);

// SAU:
navigate('/thank-you', { 
  state: { order: response.data }  // ✅ Truyền qua state
});
```

#### ✅ ThankYou.jsx - Đọc từ location state
```javascript
// TRƯỚC:
const raw = localStorage.getItem('last_order');
const order = JSON.parse(raw);

// SAU:
const location = useLocation();
const order = location.state?.order;  // ✅ Đọc từ state
```

---

## 🧪 Testing

### Test Login
```bash
# 1. Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}' \
  -c cookies.txt  # Lưu cookies

# Response: Không có token trong body
{
  "success": true,
  "data": {
    "user": { "id": 1, "email": "test@example.com" }
  }
}

# 2. Get Me (cookie tự động gửi)
curl -X GET http://localhost:5000/api/auth/me \
  -b cookies.txt  # Gửi cookies

# 3. Logout
curl -X POST http://localhost:5000/api/auth/logout \
  -b cookies.txt
```

### Kiểm tra trong Browser
1. Mở DevTools → Application → Cookies
2. Thấy cookie `token` với:
   - ✅ HttpOnly: ✓ (JavaScript không đọc được)
   - ✅ Secure: ✓ (chỉ HTTPS - production)
   - ✅ SameSite: Strict
   - ✅ Expires: 7 ngày sau

3. Thử chạy trong Console:
```javascript
// ❌ KHÔNG THỂ đọc được token
document.cookie  // Không thấy token
localStorage.getItem('token')  // null
```

---

## 🔐 So Sánh Bảo Mật

| Feature | localStorage | httpOnly Cookie |
|---------|-------------|-----------------|
| JavaScript có thể đọc | ✅ CÓ (NGUY HIỂM) | ❌ KHÔNG |
| XSS Attack | ❌ Dễ bị tấn công | ✅ An toàn |
| CSRF Protection | ❌ Không có | ✅ SameSite |
| Auto expire | ❌ Phải tự code | ✅ Tự động |
| HTTPS only | ❌ Không | ✅ Secure flag |
| DevTools xem được | ✅ Dễ dàng | ⚠️ Thấy nhưng không copy được |

---

## 📝 Lưu Ý Quan Trọng

### 1. CORS Configuration
```javascript
// Backend phải enable credentials
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true  // ← BẮT BUỘC
}));
```

### 2. Frontend Fetch
```javascript
// Mọi request phải có credentials: 'include'
fetch(url, {
  credentials: 'include'  // ← BẮT BUỘC
});
```

### 3. Production Settings
```javascript
// .env production
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com

// Cookie sẽ có secure: true (chỉ HTTPS)
res.cookie('token', token, {
  httpOnly: true,
  secure: true,  // ← Chỉ gửi qua HTTPS
  sameSite: 'strict'
});
```

### 4. Subdomain Issues
Nếu frontend và backend khác subdomain:
```javascript
// Backend
res.cookie('token', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'none',  // ← Cho phép cross-site
  domain: '.yourdomain.com'  // ← Share giữa subdomains
});
```

---

## 🚀 Migration Checklist

- [x] Cài đặt cookie-parser
- [x] Thêm cookieParser() middleware
- [x] Update CORS với credentials: true
- [x] Sửa authController để set cookie
- [x] Sửa auth middleware đọc từ cookie
- [x] Sửa logout để clear cookie
- [x] Sửa frontend api.js thêm credentials: 'include'
- [x] Xóa localStorage.setItem('token') trong AuthContext
- [x] Xóa localStorage.getItem('token') trong AuthContext
- [x] Sửa Checkout không dùng localStorage cho order
- [x] Sửa ThankYou đọc từ location.state
- [x] Sửa BankRedirect đọc từ location.state
- [x] Test login/logout/getMe
- [x] Test checkout flow

---

## 🎯 Kết Quả

### Trước (localStorage):
```
User Login → Token trong response → Lưu localStorage → Ai cũng xem được
```

### Sau (httpOnly Cookie):
```
User Login → Token trong httpOnly cookie → JavaScript KHÔNG đọc được → AN TOÀN
```

---

## 🔍 Debug Tips

### Xem cookies trong request
```javascript
// Backend
console.log('Cookies:', req.cookies);
```

### Kiểm tra cookie đã set chưa
```javascript
// Backend response
res.on('finish', () => {
  console.log('Set-Cookie header:', res.getHeader('Set-Cookie'));
});
```

### Frontend check
```javascript
// Trong browser console
document.cookie  // Không thấy httpOnly cookies (ĐÚNG!)
```

---

## 📚 Tài Liệu Tham Khảo

- [OWASP: HttpOnly Cookie](https://owasp.org/www-community/HttpOnly)
- [MDN: Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
- [SameSite Cookies Explained](https://web.dev/samesite-cookies-explained/)

---

**✅ Bây giờ hệ thống đã AN TOÀN hơn rất nhiều!**

Token không còn lưu trong localStorage, JavaScript không thể đọc được, và người dùng không thể xem thông tin nhạy cảm trong DevTools nữa! 🎉
