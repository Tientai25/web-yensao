# 🎯 BẮT ĐẦU TẠI ĐÂY - Hướng Dẫn Chạy Project

## 📋 Checklist Trước Khi Bắt Đầu

- [ ] MySQL đã cài và đang chạy
- [ ] MySQL Workbench đã mở được
- [ ] Node.js đã cài (kiểm tra: `node --version`)

---

## 🗄️ BƯỚC 1: Setup Database (5 phút)

### 1.1. Mở MySQL Workbench

1. Mở **MySQL Workbench**
2. Click vào connection (hoặc tạo mới)
3. Nhập password → Enter

### 1.2. Tạo Database

Trong SQL Editor, gõ và nhấn **⚡ Execute**:

```sql
CREATE DATABASE IF NOT EXISTS yen_sao_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE yen_sao_db;
```

### 1.3. Chạy Schema

1. Mở file: `backend/database/schema.sql`
2. **Copy toàn bộ** nội dung
3. **Paste** vào MySQL Workbench
4. Nhấn **⚡ Execute** (hoặc `Ctrl + Enter`)

✅ **Database đã sẵn sàng!**

---

## ⚙️ BƯỚC 2: Cấu Hình Backend (2 phút)

### 2.1. Mở File .env

Mở file: `backend/.env`

### 2.2. Điền Password MySQL

Tìm dòng này:
```env
DB_PASSWORD=
```

Thay bằng password MySQL của bạn:
```env
DB_PASSWORD=mypassword123
```

**Lưu ý:** Đây là password bạn dùng để login vào MySQL Workbench.

---

## 🚀 BƯỚC 3: Chạy Backend (3 phút)

### 3.1. Mở Terminal/PowerShell

### 3.2. Chạy Lệnh

```bash
cd backend
npm install
npm run dev
```

### 3.3. Kiểm Tra

Bạn sẽ thấy:
```
🚀 Server is running on http://localhost:5000
✅ Connected to MySQL database
```

✅ **Backend đang chạy!**

**Giữ terminal này mở.**

---

## 🎨 BƯỚC 4: Chạy Frontend (2 phút)

### 4.1. Mở Terminal Mới

Mở một terminal/PowerShell **mới** (giữ terminal backend đang chạy).

### 4.2. Chạy Lệnh

```bash
cd D:\yến-sào-web\yến-sào
npm install
npm run dev
```

### 4.3. Kiểm Tra

Bạn sẽ thấy:
```
  ➜  Local:   http://localhost:5173/
```

✅ **Frontend đang chạy!**

---

## 🌐 BƯỚC 5: Mở Browser

Mở browser và truy cập:

**http://localhost:5173**

🎉 **Xong! Website đã chạy!**

---

## 📊 Tóm Tắt

Bạn cần **2 terminal windows**:

| Terminal | Lệnh | URL |
|----------|------|-----|
| **Backend** | `cd backend` → `npm run dev` | http://localhost:5000 |
| **Frontend** | `npm run dev` | http://localhost:5173 |

---

## 🆘 Gặp Lỗi?

### ❌ Backend: "Access denied for user"
→ Kiểm tra `DB_PASSWORD` trong `backend/.env`

### ❌ Backend: "Table doesn't exist"
→ Chạy lại `schema.sql` trong MySQL Workbench

### ❌ Frontend: Không load được
→ Đảm bảo backend đang chạy trước

### ❌ Port đã được dùng
→ Đổi PORT trong `backend/.env` (ví dụ: 5001)

---

## 📚 Tài Liệu Tham Khảo

- **Hướng dẫn chi tiết**: `RUN-PROJECT-GUIDE.md`
- **Hướng dẫn nhanh**: `QUICK-START.md`
- **MySQL Workbench**: `backend/MYSQL-WORKBENCH-GUIDE.md`

---

## ✅ Checklist Hoàn Thành

- [ ] Database đã tạo và chạy schema
- [ ] Backend `.env` đã cấu hình
- [ ] Backend đang chạy (http://localhost:5000)
- [ ] Frontend đang chạy (http://localhost:5173)
- [ ] Website mở được trong browser

**Chúc bạn thành công! 🎉**

