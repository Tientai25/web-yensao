# Quick Guide - MySQL Workbench (5 Phút)

## Bước 1: Mở và Kết Nối

1. Mở **MySQL Workbench**
2. Double-click vào connection (hoặc tạo mới nếu chưa có)
3. Nhập password → Enter

## Bước 2: Tạo Database

Trong SQL Editor, gõ và Execute (⚡):

```sql
CREATE DATABASE IF NOT EXISTS yen_sao_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE yen_sao_db;
```

## Bước 3: Chạy Schema

1. Mở file `backend/database/schema.sql` (bằng Notepad/VS Code)
2. **Copy toàn bộ** nội dung
3. **Paste** vào SQL Editor trong MySQL Workbench
4. Click **Execute** (⚡) hoặc `Ctrl + Enter`
5. Kiểm tra Results → Nên thấy "Success"

## Bước 4: Kiểm Tra

```sql
-- Xem tables
SHOW TABLES;

-- Xem sản phẩm
SELECT * FROM products;
```

## Bước 5: Cấu Hình Backend

Mở `backend/.env` và điền:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=yen_sao_db
DB_USER=root
DB_PASSWORD=your_mysql_password
```

## Bước 6: Chạy Backend

```bash
cd backend
npm install
npm run dev
```

✅ Xong! Backend sẽ chạy tại `http://localhost:5000`

---

**Xem chi tiết**: [MYSQL-WORKBENCH-GUIDE.md](./MYSQL-WORKBENCH-GUIDE.md)

