# Hướng Dẫn Setup và Chạy Backend (MySQL)

## Yêu Cầu Hệ Thống

- **Node.js**: Version 18 trở lên
- **MySQL**: Version 8.0 trở lên (hoặc MariaDB 10.3+)
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

## Bước 2: Cài Đặt MySQL

### Windows:

**Option 1: Sử dụng Chocolatey**
```powershell
choco install mysql
```

**Option 2: Download từ website**
1. Truy cập: https://dev.mysql.com/downloads/installer/
2. Download MySQL Installer (Windows)
3. Chọn "Developer Default" hoặc "Server only"
4. Ghi nhớ root password

**Option 3: Sử dụng XAMPP/WAMP**
- XAMPP: https://www.apachefriends.org/
- WAMP: https://www.wampserver.com/
- Đã bao gồm MySQL

**Option 4: Sử dụng Docker**
```bash
docker run --name mysql-yen-sao -e MYSQL_ROOT_PASSWORD=your_password -e MYSQL_DATABASE=yen_sao_db -p 3306:3306 -d mysql:8.0
```

### MacOS:

```bash
# Sử dụng Homebrew
brew install mysql
brew services start mysql

# Hoặc dùng MySQL Workbench
brew install --cask mysql-workbench
```

### Linux (Ubuntu/Debian):

```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql
```

## Bước 3: Tạo Database

### Windows (Command Prompt hoặc PowerShell):

```bash
# Kết nối MySQL
mysql -u root -p

# Hoặc nếu MySQL trong PATH
mysql -u root -p -h localhost
```

### MacOS/Linux:

```bash
sudo mysql -u root -p
```

### Trong MySQL Shell:

```sql
-- Tạo database
CREATE DATABASE yen_sao_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tạo user (optional)
CREATE USER 'yen_sao_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON yen_sao_db.* TO 'yen_sao_user'@'localhost';
FLUSH PRIVILEGES;

-- Thoát
EXIT;
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
- mysql2 (MySQL client)
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
DB_PORT=3306
DB_NAME=yen_sao_db
DB_USER=root
DB_PASSWORD=your_mysql_password

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
- Thay `your_mysql_password` bằng root password MySQL của bạn
- Nếu dùng user khác, thay `root` bằng username của bạn
- Port mặc định của MySQL là `3306`

## Bước 5: Tạo Database Schema

### Cách 1: Sử dụng mysql command line

```bash
# Windows
mysql -u root -p yen_sao_db < database/schema.sql

# MacOS/Linux
mysql -u root -p yen_sao_db < database/schema.sql
```

### Cách 2: Sử dụng MySQL Workbench hoặc phpMyAdmin

1. Mở MySQL Workbench hoặc phpMyAdmin
2. Kết nối với MySQL server
3. Chọn database `yen_sao_db`
4. Mở file `backend/database/schema.sql`
5. Copy và paste toàn bộ nội dung vào SQL editor
6. Chạy script (Execute)

### Cách 3: Copy và paste vào mysql shell

```bash
mysql -u root -p yen_sao_db
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
✅ Connected to MySQL database
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

### Lỗi: "Connection refused" (MySQL)

1. Kiểm tra MySQL đang chạy:
   ```bash
   # Windows
   Get-Service MySQL*

   # MacOS
   brew services list | grep mysql

   # Linux
   sudo systemctl status mysql
   ```

2. Khởi động MySQL nếu chưa chạy:
   ```bash
   # Windows
   net start MySQL80
   # hoặc
   net start MySQL

   # MacOS
   brew services start mysql

   # Linux
   sudo systemctl start mysql
   ```

### Lỗi: "Access denied for user"

- Kiểm tra lại username và password trong file `.env`
- Đảm bảo user có quyền truy cập database
- Thử reset password MySQL:
  ```sql
  ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
  FLUSH PRIVILEGES;
  ```

### Lỗi: "Unknown database"

```sql
-- Tạo lại database
CREATE DATABASE yen_sao_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Lỗi: "Table doesn't exist"

- Chạy lại file `database/schema.sql` để tạo tables

### Lỗi: Port 3306 đã được sử dụng

Thay đổi PORT trong file `.env`:
```env
DB_PORT=3307
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
mysql -u root -p -e "SELECT VERSION();"

# Xem danh sách databases
mysql -u root -p -e "SHOW DATABASES;"

# Xem danh sách tables
mysql -u root -p yen_sao_db -e "SHOW TABLES;"

# Xem dữ liệu products
mysql -u root -p yen_sao_db -e "SELECT * FROM products;"

# Backup database
mysqldump -u root -p yen_sao_db > backup.sql

# Restore database
mysql -u root -p yen_sao_db < backup.sql
```

## Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra logs trong terminal
2. Verify database connection
3. Kiểm tra file `.env` có đúng không
4. Xem `Troubleshooting` section ở trên
