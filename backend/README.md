# Yến Sào Backend API

Backend API server cho ứng dụng Yến Sào E-commerce.

## 📚 Tài Liệu

- **[QUICK-START.md](./QUICK-START.md)** - Hướng dẫn chạy nhanh (5 phút)
- **[SETUP-INSTRUCTIONS.md](./SETUP-INSTRUCTIONS.md)** - Hướng dẫn chi tiết đầy đủ
- **[UPLOAD-GUIDE.md](./UPLOAD-GUIDE.md)** - Hướng dẫn upload ảnh

## ⚡ Quick Start

```bash
# 1. Cài dependencies
cd backend
npm install

# 2. Setup .env
cp .env.example .env
# Chỉnh sửa .env với thông tin database

# 3. Tạo database và chạy schema
createdb yen_sao_db
psql -U postgres -d yen_sao_db -f database/schema.sql

# 4. Chạy server
npm run dev
```

Server sẽ chạy tại `http://localhost:5000`

## 📋 Yêu Cầu

- **Node.js**: 18+ 
- **PostgreSQL**: 14+
- **npm** hoặc **yarn**

## 🚀 Cài Đặt Chi Tiết

Xem file **[SETUP-INSTRUCTIONS.md](./SETUP-INSTRUCTIONS.md)** để có hướng dẫn đầy đủ từng bước.

### Tóm Tắt:

1. **Cài đặt Node.js và PostgreSQL**
2. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

3. **Setup Database:**
   ```bash
   # Tạo database
   createdb yen_sao_db
   
   # Chạy schema
   psql -U postgres -d yen_sao_db -f database/schema.sql
   ```

4. **Cấu hình môi trường:**
   ```bash
   cp .env.example .env
   # Chỉnh sửa .env với thông tin database của bạn
   ```

5. **Chạy server:**
   ```bash
   # Development (với auto-reload)
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Products
- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/products/:id` - Lấy chi tiết sản phẩm
- `POST /api/products` - Tạo sản phẩm (admin)
- `PUT /api/products/:id` - Cập nhật sản phẩm (admin)
- `DELETE /api/products/:id` - Xóa sản phẩm (admin)

### Orders
- `POST /api/orders` - Tạo đơn hàng
- `GET /api/orders/:id` - Lấy chi tiết đơn hàng
- `GET /api/orders` - Lấy danh sách đơn hàng
- `PUT /api/orders/:id/status` - Cập nhật trạng thái

### Contact
- `POST /api/contact` - Gửi liên hệ

### Coupons
- `GET /api/coupons/:code` - Kiểm tra mã giảm giá
- `GET /api/coupons` - Lấy danh sách mã

## Tích Hợp Với Frontend

Trong frontend React, tạo file `src/utils/api.js`:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
};

export const createOrder = async (orderData) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  return response.json();
};
```

## Deploy

### Vercel / Netlify Functions
Có thể deploy backend như serverless functions.

### Railway / Render
Deploy như Node.js application với PostgreSQL database.

### VPS
Sử dụng PM2 để quản lý process:
```bash
npm install -g pm2
pm2 start src/server.js --name yen-sao-api
```

## License

ISC

