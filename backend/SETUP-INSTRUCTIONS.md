# Hướng Dẫn Setup và Chạy Backend

## Yêu Cầu Hệ Thống

- **Node.js**: Version 18 trở lên
- **PostgreSQL**: Version 14 trở lên
- **npm** hoặc **yarn**

## Bước 1: Kiểm Tra Node.js

Mở terminal và kiểm tra:

```bash
node --version
# Kết quả nên là v18.x.x hoặc cao hơn

npm --version
# Kết quả nên là 9.x.x hoặc cao hơn
```

Nếu chưa có Node.js, download tại: https://nodejs.org/

## Bước 2: Cài Đặt PostgreSQL

### Windows:

**Option 1: Sử dụng Chocolatey**
```powershell
choco install postgresql
```

**Option 2: Download từ website**
1. Truy cập: https://www.postgresql.org/download/windows/
2. Download và cài đặt PostgreSQL
3. Ghi nhớ password cho user `postgres`

**Option 3: Sử dụng Docker**
```bash
docker run --name postgres-yen-sao -e POSTGRES_PASSWORD=your_password -e POSTGRES_DB=yen_sao_db -p 5432:5432 -d postgres:14
```

### MacOS:

```bash
# Sử dụng Homebrew
brew install postgresql@14
brew services start postgresql@14
```

### Linux (Ubuntu/Debian):

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

## Bước 3: Tạo Database

### Windows (Command Prompt hoặc PowerShell):

```bash
# Kết nối PostgreSQL
psql -U postgres

# Hoặc nếu có password
psql -U postgres -h localhost
```

### MacOS/Linux:

```bash
sudo -u postgres psql
```

### Trong PostgreSQL Shell:

```sql
-- Tạo database
CREATE DATABASE yen_sao_db;

-- Tạo user (optional)
CREATE USER yen_sao_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE yen_sao_db TO yen_sao_user;

-- Thoát
\q
```

## Bước 4: Setup Backend Project

### 4.1. Di chuyển vào thư mục backend

```bash
cd backend
```

### 4.2. Cài đặt dependencies

```bash
npm install
```

Lệnh này sẽ cài đặt tất cả packages cần thiết:
- express
- cors
- dotenv
- pg (PostgreSQL client)
- multer (file upload)
- và các packages khác

### 4.3. Tạo file .env

```bash
# Windows (PowerShell)
Copy-Item .env.example .env

# MacOS/Linux
cp .env.example .env
```

### 4.4. Chỉnh sửa file .env

Mở file `.env` và cập nhật thông tin:

```env
# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database - CẬP NHẬT THÔNG TIN CỦA BẠN
DB_HOST=localhost
DB_PORT=5432
DB_NAME=yen_sao_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# Email (Optional - có thể để trống nếu chưa cần)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
ADMIN_EMAIL=admin@yensaopremium.com

# JWT (Optional - cho authentication sau này)
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d
```

**Lưu ý quan trọng:**
- Thay `your_postgres_password` bằng password PostgreSQL của bạn
- Nếu dùng user khác, thay `postgres` bằng username của bạn

## Bước 5: Tạo Database Schema

### Cách 1: Sử dụng psql command line

```bash
# Windows
psql -U postgres -d yen_sao_db -f database/schema.sql

# MacOS/Linux
sudo -u postgres psql -d yen_sao_db -f database/schema.sql
```

### Cách 2: Sử dụng pgAdmin hoặc DBeaver

1. Mở pgAdmin hoặc DBeaver
2. Kết nối với database `yen_sao_db`
3. Mở file `backend/database/schema.sql`
4. Chạy toàn bộ script SQL

### Cách 3: Copy và paste vào psql

```bash
psql -U postgres -d yen_sao_db
```

Sau đó copy nội dung file `database/schema.sql` và paste vào terminal.

## Bước 6: Tạo Thư Mục Uploads

```bash
# Windows (PowerShell)
New-Item -ItemType Directory -Path "uploads\products" -Force

# MacOS/Linux
mkdir -p uploads/products
```

Hoặc backend sẽ tự động tạo khi chạy lần đầu.

## Bước 7: Chạy Backend

### Development Mode (với auto-reload):

```bash
npm run dev
```

### Production Mode:

```bash
npm start
```

Nếu thành công, bạn sẽ thấy:

```
🚀 Server is running on http://localhost:5000
📦 Environment: development
✅ Connected to PostgreSQL database
```

## Bước 8: Kiểm Tra Backend

### 8.1. Health Check

Mở browser hoặc dùng curl:

```bash
# Browser
http://localhost:5000/api/health

# hoặc curl
curl http://localhost:5000/api/health
```

Kết quả mong đợi:
```json
{
  "status": "OK",
  "message": "Yến Sào API is running"
}
```

### 8.2. Test API Endpoints

```bash
# Lấy danh sách sản phẩm
curl http://localhost:5000/api/products

# Lấy sản phẩm theo ID
curl http://localhost:5000/api/products/1
```

## Troubleshooting

### Lỗi: "Cannot find module"

```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install
```

### Lỗi: "Connection refused" (PostgreSQL)

1. Kiểm tra PostgreSQL đang chạy:
   ```bash
   # Windows
   Get-Service postgresql*

   # MacOS/Linux
   sudo systemctl status postgresql
   ```

2. Khởi động PostgreSQL nếu chưa chạy:
   ```bash
   # Windows
   net start postgresql-x64-14

   # MacOS
   brew services start postgresql@14

   # Linux
   sudo systemctl start postgresql
   ```

### Lỗi: "password authentication failed"

- Kiểm tra lại password trong file `.env`
- Đảm bảo user có quyền truy cập database

### Lỗi: "database does not exist"

```sql
-- Tạo lại database
CREATE DATABASE yen_sao_db;
```

### Lỗi: "relation does not exist"

- Chạy lại file `database/schema.sql` để tạo tables

### Lỗi: Port 5000 đã được sử dụng

Thay đổi PORT trong file `.env`:
```env
PORT=5001
```

## Cấu Trúc Thư Mục Sau Khi Setup

```
backend/
├── node_modules/          # Dependencies (tự động tạo)
├── uploads/               # Thư mục chứa ảnh (tự động tạo)
│   └── products/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
├── database/
│   └── schema.sql
├── .env                   # File cấu hình (bạn tạo)
├── .gitignore
├── package.json
└── README.md
```

## Next Steps

Sau khi backend chạy thành công:

1. **Tích hợp với Frontend**: Xem `INTEGRATION-GUIDE.md`
2. **Test API**: Sử dụng Postman hoặc curl
3. **Import dữ liệu**: Chạy script import products từ `products.js`
4. **Deploy**: Xem hướng dẫn deploy trong `README.md`

## Các Lệnh Hữu Ích

```bash
# Xem logs
npm run dev

# Stop server
Ctrl + C

# Kiểm tra database connection
psql -U postgres -d yen_sao_db -c "SELECT version();"

# Xem danh sách tables
psql -U postgres -d yen_sao_db -c "\dt"

# Xem dữ liệu products
psql -U postgres -d yen_sao_db -c "SELECT * FROM products;"
```

## Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra logs trong terminal
2. Verify database connection
3. Kiểm tra file `.env` có đúng không
4. Xem `Troubleshooting` section ở trên

