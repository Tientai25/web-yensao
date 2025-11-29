# Hướng Dẫn Setup Backend cho Yến Sào Web

## Tổng Quan

Dự án hiện tại đang là frontend React với dữ liệu tĩnh. Để chuyển sang backend, bạn cần:

1. **Backend API Server** - Xử lý logic, database, authentication
2. **Database** - Lưu trữ dữ liệu (sản phẩm, đơn hàng, người dùng)
3. **Tích hợp Frontend** - Kết nối React với API

## Công Nghệ Đề Xuất

### Option 1: Node.js + Express (Khuyến nghị)
- ✅ Cùng ngôn ngữ với React (JavaScript/TypeScript)
- ✅ Dễ tích hợp
- ✅ Ecosystem phong phú
- ✅ Performance tốt

### Option 2: Python + Flask/FastAPI
- ✅ Dễ học
- ✅ Phù hợp cho AI/ML sau này
- ❌ Khác ngôn ngữ với frontend

### Option 3: PHP + Laravel
- ✅ Phổ biến ở Việt Nam
- ✅ Nhiều hosting hỗ trợ
- ❌ Khác ngôn ngữ

## Database Options

1. **MySQL** - Đang sử dụng (phổ biến, dễ setup, tốt cho production)
2. **PostgreSQL** - Mạnh mẽ, miễn phí (có thể chuyển đổi sau)
3. **MongoDB** - NoSQL, linh hoạt (nếu cần)

## Các API Endpoints Cần Thiết

### Products
- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/products/:id` - Lấy chi tiết sản phẩm
- `POST /api/products` - Tạo sản phẩm (admin)
- `PUT /api/products/:id` - Cập nhật sản phẩm (admin)
- `DELETE /api/products/:id` - Xóa sản phẩm (admin)

### Orders
- `POST /api/orders` - Tạo đơn hàng
- `GET /api/orders/:id` - Lấy chi tiết đơn hàng
- `GET /api/orders` - Lấy danh sách đơn hàng (user/admin)
- `PUT /api/orders/:id/status` - Cập nhật trạng thái đơn hàng

### Cart
- `GET /api/cart` - Lấy giỏ hàng (nếu lưu trên server)
- `POST /api/cart` - Thêm vào giỏ hàng
- `DELETE /api/cart/:id` - Xóa khỏi giỏ hàng

### Coupons
- `GET /api/coupons/:code` - Kiểm tra mã giảm giá
- `GET /api/coupons` - Lấy danh sách mã (admin)

### Contact
- `POST /api/contact` - Gửi liên hệ

### Authentication (nếu cần)
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/logout` - Đăng xuất
- `GET /api/auth/me` - Lấy thông tin user

## Cấu Trúc Thư Mục Backend

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── env.js
│   ├── controllers/
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   ├── cartController.js
│   │   └── contactController.js
│   ├── models/
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── User.js
│   │   └── Coupon.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── cartRoutes.js
│   │   └── contactRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validate.js
│   ├── utils/
│   │   ├── email.js
│   │   └── payment.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Bước Tiếp Theo

1. Chọn công nghệ backend (khuyến nghị: Node.js + Express)
2. Setup database
3. Tạo cấu trúc thư mục
4. Implement các API endpoints
5. Tích hợp với frontend React
6. Deploy backend và frontend

Xem các file mẫu trong thư mục `backend/` để bắt đầu.

