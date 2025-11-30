# Quick Start: Deploy Lên Vercel

## ✅ Câu Trả Lời Ngắn Gọn

**Có, backend và frontend vẫn giao tiếp qua API bình thường trên Vercel!**

- Frontend: Chạy trên Vercel Edge Network
- Backend: Chạy như Serverless Functions
- API: Hoạt động bình thường, chỉ cần đảm bảo database là cloud database

---

## 🚀 Deploy Nhanh (5 Bước)

### **Bước 1: Setup Cloud Database**

Chọn một trong các options:

**Option A: PlanetScale (Khuyên dùng - Free)**
1. Đăng ký: https://planetscale.com
2. Tạo database
3. Copy connection string

**Option B: Railway (Free tier)**
1. Đăng ký: https://railway.app
2. Tạo MySQL service
3. Copy connection string

### **Bước 2: Import Database Schema**

Chạy file `backend/database/schema.sql` trên cloud database của bạn.

### **Bước 3: Push Code Lên GitHub**

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### **Bước 4: Deploy Trên Vercel**

1. Vào https://vercel.com
2. Click "New Project"
3. Import từ GitHub
4. Cấu hình:
   - **Framework Preset:** Vite
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### **Bước 5: Thêm Environment Variables**

Trong Vercel Dashboard → Settings → Environment Variables:

**Frontend:**
```
VITE_API_URL=https://your-app.vercel.app/api
```

**Backend:**
```
DB_HOST=your-cloud-db-host
DB_PORT=3306
DB_NAME=your-database
DB_USER=your-username
DB_PASSWORD=your-password
NODE_ENV=production
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
FRONTEND_URL=https://your-app.vercel.app
```

---

## ✅ Đã Sẵn Sàng!

Files đã được tạo:
- ✅ `vercel.json` - Cấu hình Vercel
- ✅ `.vercelignore` - Ignore files không cần deploy
- ✅ `backend/src/server.js` - Đã cập nhật để hỗ trợ Vercel

---

## 🔍 Test Sau Khi Deploy

1. **Test API:**
   ```
   https://your-app.vercel.app/api/health
   ```

2. **Test Frontend:**
   ```
   https://your-app.vercel.app
   ```

---

## ⚠️ Lưu Ý Quan Trọng

1. **Database:** Phải là cloud database, không thể dùng localhost
2. **File Uploads:** Cần setup cloud storage (Vercel Blob, S3, etc.)
3. **Environment Variables:** Thêm tất cả trong Vercel Dashboard
4. **CORS:** Đã cấu hình tự động với `FRONTEND_URL`

---

## 📚 Xem Chi Tiết

Xem file `VERCEL-DEPLOY-GUIDE.md` để biết hướng dẫn chi tiết.


