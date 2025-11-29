# Quick Start - Chạy Backend Nhanh (MySQL)

## 🎯 Nếu Bạn Có MySQL Workbench

Xem hướng dẫn chi tiết: **[MYSQL-WORKBENCH-GUIDE.md](./MYSQL-WORKBENCH-GUIDE.md)**

**Tóm tắt nhanh:**
1. Mở MySQL Workbench → Kết nối với MySQL server
2. Tạo database: `CREATE DATABASE yen_sao_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
3. Chọn database: `USE yen_sao_db;`
4. Mở file `database/schema.sql` → Copy toàn bộ → Paste vào SQL Editor → Execute
5. Cấu hình `.env` với thông tin MySQL của bạn
6. Chạy `npm run dev`

## TL;DR (Tóm Tắt Nhanh)

### Option 1: Sử dụng Setup Script (Khuyến nghị)

**Windows:**
```bash
cd backend
scripts\setup.bat
```

**MacOS/Linux:**
```bash
cd backend
chmod +x scripts/setup.sh
./scripts/setup.sh
```

**Hoặc dùng npm:**
```bash
cd backend
npm run setup
```

### Option 2: Manual Setup

```bash
# 1. Cài dependencies
cd backend
npm install

# 2. Setup .env
cp .env.example .env
# Chỉnh sửa .env với thông tin database

# 3. Tạo database
mysql -u root -p
CREATE DATABASE yen_sao_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;

# 4. Chạy schema
mysql -u root -p yen_sao_db < database/schema.sql

# 5. Chạy server
npm run dev
```

## Chi Tiết Từng Bước

### 1. Cài Đặt Dependencies

```bash
cd backend
npm install
```

### 2. Cấu Hình Database

**Tạo file .env:**
```bash
cp .env.example .env
```

**Chỉnh sửa .env:**
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=yen_sao_db
DB_USER=root
DB_PASSWORD=your_password_here
```

### 3. Tạo Database

```bash
# Kết nối MySQL
mysql -u root -p

# Trong MySQL shell
CREATE DATABASE yen_sao_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### 4. Chạy Schema

```bash
mysql -u root -p yen_sao_db < database/schema.sql
```

### 5. Chạy Server

```bash
npm run dev
```

Server sẽ chạy tại: `http://localhost:5000`

### 6. Test

Mở browser: `http://localhost:5000/api/health`

Hoặc dùng curl:
```bash
curl http://localhost:5000/api/health
```

## Nếu Gặp Lỗi

**Lỗi: MySQL không chạy**
- Windows: Services → Start MySQL
- Mac: `brew services start mysql`
- Linux: `sudo systemctl start mysql`

**Lỗi: Database không tồn tại**
```sql
CREATE DATABASE yen_sao_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**Lỗi: Access denied**
- Kiểm tra password trong .env
- Đảm bảo user có quyền truy cập database

**Lỗi: Table doesn't exist**
- Chạy lại: `mysql -u root -p yen_sao_db < database/schema.sql`

Xem chi tiết tại: `SETUP-INSTRUCTIONS.md`
