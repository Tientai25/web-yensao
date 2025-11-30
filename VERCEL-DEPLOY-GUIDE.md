# Hướng Dẫn Deploy Lên Vercel

## ✅ Có, Backend và Frontend Vẫn Giao Tiếp Qua API Bình Thường!

Khi deploy lên Vercel:
- ✅ **Frontend** chạy trên Vercel Edge Network
- ✅ **Backend** chạy như **Serverless Functions** (API Routes)
- ✅ Chúng vẫn giao tiếp qua API như bình thường
- ⚠️ **Database** phải là cloud database (không thể dùng localhost MySQL)

---

## 🏗️ Kiến Trúc Deployment

### **Local Development:**
```
Frontend (localhost:5173) → Backend (localhost:5000) → MySQL (localhost:3306)
```

### **Vercel Production:**
```
Frontend (vercel.app) → Backend (Serverless Functions) → Cloud MySQL (PlanetScale/Railway/etc.)
```

---

## 📋 Bước 1: Chuẩn Bị Backend cho Vercel

### **1.1. Cấu Trúc Thư Mục**

Vercel cần backend trong thư mục `api/` hoặc cấu hình trong `vercel.json`:

```
project-root/
├── api/              # Serverless Functions (optional)
├── backend/          # Backend code hiện tại
│   ├── src/
│   │   └── server.js
│   └── package.json
├── src/              # Frontend
├── vercel.json       # Vercel config
└── package.json
```

### **1.2. Tạo `vercel.json`**

Tạo file `vercel.json` ở root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/src/server.js",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/src/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### **1.3. Cập Nhật Backend cho Serverless**

Vercel chạy backend như serverless functions, cần export handler:

**Cách 1: Sử dụng Express (Khuyên dùng)**

File `backend/src/server.js` hoặc tạo `api/index.js`:

```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// ... other imports

const app = express();

// ... middleware và routes như bình thường

// Export handler cho Vercel
export default app;

// Hoặc nếu cần chạy local
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
}
```

**Cách 2: Tạo API Routes riêng (Tốt hơn cho Vercel)**

Tạo thư mục `api/` ở root và tạo các serverless functions:

```
api/
├── products.js
├── orders.js
├── contact.js
└── auth.js
```

Ví dụ `api/products.js`:

```javascript
import pool from '../backend/src/config/database.js';
import { getProducts, getProductById } from '../backend/src/controllers/productController.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      if (req.query.id) {
        return await getProductById(req, res);
      } else {
        return await getProducts(req, res);
      }
    }
    // Handle other methods...
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
```

---

## 🗄️ Bước 2: Setup Cloud Database

### **Option 1: PlanetScale (Khuyên dùng - Free tier tốt)**

1. Đăng ký: https://planetscale.com
2. Tạo database mới
3. Lấy connection string
4. Update `.env`:

```env
DB_HOST=your-host.planetscale.com
DB_PORT=3306
DB_NAME=your-database
DB_USER=your-username
DB_PASSWORD=your-password
```

### **💡 Lưu Ý: Vẫn Dùng Được MySQL Workbench!**

✅ **MySQL Workbench vẫn hoạt động bình thường với cloud database!**

- Chỉ cần thay đổi host từ `localhost` sang cloud database host
- Có thể quản lý database giống như localhost
- Xem chi tiết trong file `MYSQL-WORKBENCH-CLOUD.md`

### **Option 2: Railway**

1. Đăng ký: https://railway.app
2. Tạo MySQL service
3. Lấy connection string
4. Update `.env`

### **Option 3: AWS RDS / Google Cloud SQL**

- Cần setup phức tạp hơn
- Phù hợp cho production lớn

### **Option 4: Supabase (PostgreSQL)**

- Free tier tốt
- Cần migrate từ MySQL sang PostgreSQL

---

## 🔧 Bước 3: Cập Nhật Environment Variables

### **3.1. Frontend Environment Variables**

Trong Vercel Dashboard → Project Settings → Environment Variables:

```env
VITE_API_URL=https://your-app.vercel.app/api
```

### **3.2. Backend Environment Variables**

```env
# Database
DB_HOST=your-cloud-db-host
DB_PORT=3306
DB_NAME=your-database
DB_USER=your-username
DB_PASSWORD=your-password

# Server
NODE_ENV=production
PORT=3000

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRE=7d

# CORS
FRONTEND_URL=https://your-app.vercel.app
```

---

## 📦 Bước 4: Cập Nhật Package.json

### **Root `package.json`:**

```json
{
  "name": "yen-sao",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "vercel-build": "npm run build"
  },
  "dependencies": {
    // ... frontend dependencies
  }
}
```

### **Backend `package.json`:**

```json
{
  "name": "yen-sao-backend",
  "type": "module",
  "scripts": {
    "start": "node src/server.js"
  },
  "dependencies": {
    // ... backend dependencies
  }
}
```

---

## 🚀 Bước 5: Deploy Lên Vercel

### **Cách 1: Deploy qua Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy production
vercel --prod
```

### **Cách 2: Deploy qua GitHub**

1. **Push code lên GitHub:**
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

2. **Kết nối với Vercel:**
   - Vào https://vercel.com
   - Click "New Project"
   - Import từ GitHub
   - Chọn repository

3. **Cấu hình:**
   - **Framework Preset:** Vite
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

4. **Thêm Environment Variables:**
   - Vào Project Settings → Environment Variables
   - Thêm tất cả biến môi trường

5. **Deploy:**
   - Click "Deploy"
   - Chờ build và deploy

---

## 🔍 Bước 6: Kiểm Tra Sau Khi Deploy

### **1. Kiểm Tra API Endpoints:**

```bash
# Test health check
curl https://your-app.vercel.app/api/health

# Test products
curl https://your-app.vercel.app/api/products
```

### **2. Kiểm Tra Frontend:**

- Mở: `https://your-app.vercel.app`
- Test các chức năng:
  - Xem sản phẩm
  - Thêm vào giỏ hàng
  - Đặt hàng
  - Đăng nhập/đăng ký

---

## ⚠️ Lưu Ý Quan Trọng

### **1. Database Connection**

- ❌ **KHÔNG THỂ** dùng `localhost` MySQL
- ✅ **PHẢI** dùng cloud database
- ✅ Connection string phải accessible từ internet

### **2. File Uploads**

- Vercel serverless functions có giới hạn thời gian
- File uploads nên dùng:
  - **Vercel Blob Storage**
  - **AWS S3**
  - **Cloudinary**
  - **Supabase Storage**

### **3. Environment Variables**

- ✅ Thêm tất cả biến môi trường trong Vercel Dashboard
- ✅ Không commit `.env` vào Git
- ✅ Sử dụng Vercel Environment Variables

### **4. CORS**

- ✅ Cấu hình CORS đúng với domain Vercel
- ✅ Thêm domain frontend vào allowed origins

### **5. Cold Start**

- Serverless functions có "cold start" lần đầu
- Có thể mất 1-2 giây lần đầu tiên
- Sau đó sẽ nhanh hơn

---

## 🎯 Cấu Hình Tối Ưu

### **`vercel.json` Tối Ưu:**

```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/src/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "functions": {
    "backend/src/server.js": {
      "maxDuration": 30
    }
  },
  "env": {
    "NODE_ENV": "production"
  }
}
```

---

## 📝 Checklist Trước Khi Deploy

- [ ] Database đã migrate lên cloud
- [ ] Environment variables đã cấu hình
- [ ] CORS đã cấu hình đúng
- [ ] API endpoints đã test
- [ ] File uploads đã setup (nếu có)
- [ ] Build command đã đúng
- [ ] `.env` không commit vào Git
- [ ] Error handling đã đầy đủ

---

## 🐛 Troubleshooting

### **Lỗi: Database connection failed**

**Giải pháp:**
- Kiểm tra connection string
- Đảm bảo database accessible từ internet
- Kiểm tra firewall/security groups

### **Lỗi: CORS error**

**Giải pháp:**
- Thêm domain Vercel vào CORS allowed origins
- Kiểm tra CORS middleware

### **Lỗi: Function timeout**

**Giải pháp:**
- Tăng `maxDuration` trong `vercel.json`
- Tối ưu database queries
- Sử dụng connection pooling

### **Lỗi: Module not found**

**Giải pháp:**
- Kiểm tra `package.json` dependencies
- Đảm bảo tất cả dependencies được install
- Kiểm tra import paths

---

## 🎉 Kết Luận

**Có, backend và frontend vẫn giao tiếp qua API bình thường trên Vercel!**

- ✅ Frontend deploy trên Vercel Edge
- ✅ Backend chạy như Serverless Functions
- ✅ API endpoints hoạt động như bình thường
- ✅ Chỉ cần đảm bảo database là cloud database

**Lưu ý:** Vercel serverless functions có một số giới hạn, nhưng phù hợp cho hầu hết các ứng dụng e-commerce nhỏ và vừa.

---

## 📚 Tài Liệu Tham Khảo

- Vercel Documentation: https://vercel.com/docs
- Vercel Serverless Functions: https://vercel.com/docs/functions
- PlanetScale: https://planetscale.com/docs
- Railway: https://docs.railway.app


