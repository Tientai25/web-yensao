# Quick Start - Chạy Backend Nhanh

## TL;DR (Tóm Tắt Nhanh)

```bash
# 1. Cài dependencies
cd backend
npm install

# 2. Setup .env
cp .env.example .env
# Chỉnh sửa .env với thông tin database của bạn

# 3. Tạo database
createdb yen_sao_db
# hoặc
psql -U postgres -c "CREATE DATABASE yen_sao_db;"

# 4. Chạy schema
psql -U postgres -d yen_sao_db -f database/schema.sql

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
DB_PORT=5432
DB_NAME=yen_sao_db
DB_USER=postgres
DB_PASSWORD=your_password_here
```

### 3. Tạo Database

```bash
# Windows (nếu PostgreSQL đã được thêm vào PATH)
createdb -U postgres yen_sao_db

# Hoặc dùng psql
psql -U postgres
CREATE DATABASE yen_sao_db;
\q
```

### 4. Chạy Schema

```bash
psql -U postgres -d yen_sao_db -f database/schema.sql
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

**Lỗi: PostgreSQL không chạy**
- Windows: Services → Start PostgreSQL
- Mac: `brew services start postgresql@14`
- Linux: `sudo systemctl start postgresql`

**Lỗi: Database không tồn tại**
```sql
CREATE DATABASE yen_sao_db;
```

**Lỗi: Permission denied**
- Kiểm tra password trong .env
- Đảm bảo user có quyền tạo database

Xem chi tiết tại: `SETUP-INSTRUCTIONS.md`

