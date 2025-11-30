# Hướng Dẫn Tạo File .env

File `.env` đã được tạo tự động. Bạn chỉ cần chỉnh sửa với thông tin MySQL của mình.

## Cách Chỉnh Sửa File .env

### 1. Mở file .env

Mở file `backend/.env` bằng:
- Notepad
- VS Code
- Bất kỳ text editor nào

### 2. Cập Nhật Thông Tin Database

Tìm dòng này và điền password MySQL của bạn:

```env
DB_PASSWORD=your_mysql_password_here
```

**Ví dụ:**
```env
DB_PASSWORD=MyPassword123
```

### 3. Các Thông Tin Khác (Tùy Chọn)

Nếu bạn đã setup MySQL với user khác hoặc port khác, có thể thay đổi:

```env
DB_HOST=localhost          # Thường là localhost
DB_PORT=3306              # Port mặc định của MySQL
DB_NAME=yen_sao_db        # Tên database
DB_USER=root              # Username MySQL (thường là root)
DB_PASSWORD=your_password # Password MySQL của bạn
```

## Nếu File .env Không Tồn Tại

Tạo file mới `backend/.env` với nội dung:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database Configuration (MySQL)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=yen_sao_db
DB_USER=root
DB_PASSWORD=your_mysql_password_here

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
ADMIN_EMAIL=admin@yensaopremium.com

# JWT Configuration (Optional)
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
JWT_EXPIRE=7d
```

## Lưu Ý

1. **Không commit file .env vào git** - File này chứa thông tin nhạy cảm
2. **DB_PASSWORD** - Đây là password bạn dùng để login vào MySQL Workbench
3. **JWT_SECRET** - Nên thay đổi thành một chuỗi ngẫu nhiên mạnh trong production

## Kiểm Tra File .env

Sau khi chỉnh sửa, đảm bảo:
- ✅ File `.env` tồn tại trong thư mục `backend/`
- ✅ `DB_PASSWORD` đã được điền
- ✅ `DB_NAME` đúng với database bạn đã tạo trong MySQL Workbench

## Next Steps

Sau khi cấu hình xong `.env`:
1. Tạo database trong MySQL Workbench (nếu chưa có)
2. Chạy schema: `mysql -u root -p yen_sao_db < database/schema.sql`
3. Chạy backend: `npm run dev`

