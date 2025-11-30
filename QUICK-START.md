# 🚀 Quick Start - Chạy Backend & Frontend

Hướng dẫn nhanh để chạy project trong 5 phút!

## ⚡ Cách 1: Dùng Script Tự Động (Khuyên Dùng)

```powershell
.\start-dev.ps1
```

Script sẽ mở 2 terminal windows cho bạn. Chỉ cần chạy lệnh trong mỗi terminal.

---

## 📝 Cách 2: Chạy Thủ Công

### Bước 1: Setup Database (MySQL Workbench)

1. Mở **MySQL Workbench**
2. Tạo database:
   ```sql
   CREATE DATABASE IF NOT EXISTS yen_sao_db;
   USE yen_sao_db;
   ```
3. Mở file `backend/database/schema.sql`
4. Copy toàn bộ → Paste vào MySQL Workbench → Execute (⚡)

### Bước 2: Cấu Hình Backend

1. Mở `backend/.env`
2. Điền password MySQL:
   ```env
   DB_PASSWORD=your_mysql_password
   ```

### Bước 3: Chạy Backend

**Terminal 1:**
```bash
cd backend
npm install
npm run dev
```

✅ Backend chạy tại: http://localhost:5000

### Bước 4: Chạy Frontend

**Terminal 2 (mở terminal mới):**
```bash
npm install
npm run dev
```

✅ Frontend chạy tại: http://localhost:5173

---

## ✅ Kiểm Tra

1. Mở browser: http://localhost:5173
2. Mở DevTools (F12) → Network tab
3. Refresh trang → Xem có request đến API không

---

## 🆘 Lỗi Thường Gặp

### Backend không kết nối MySQL
→ Kiểm tra `DB_PASSWORD` trong `backend/.env`

### Port đã được dùng
→ Đổi PORT trong `backend/.env` (ví dụ: 5001)

### Frontend không load
→ Đảm bảo backend đang chạy trước

---

## 📚 Hướng Dẫn Chi Tiết

Xem file `RUN-PROJECT-GUIDE.md` để biết thêm chi tiết.

