# Hướng Dẫn Sử Dụng MySQL Workbench

Hướng dẫn chi tiết cách sử dụng MySQL Workbench để setup database cho backend.

## Bước 1: Mở MySQL Workbench

1. Mở MySQL Workbench từ Start Menu hoặc Desktop
2. Bạn sẽ thấy màn hình chính với danh sách connections

## Bước 2: Kết Nối Với MySQL Server

### Nếu chưa có connection:

1. Click vào dấu **+** bên cạnh "MySQL Connections"
2. Điền thông tin:
   - **Connection Name**: `Local MySQL` (hoặc tên bạn muốn)
   - **Hostname**: `localhost` hoặc `127.0.0.1`
   - **Port**: `3306` (mặc định)
   - **Username**: `root` (hoặc username MySQL của bạn)
   - **Password**: Click "Store in Keychain" và nhập password
3. Click **Test Connection** để kiểm tra
4. Nếu thành công, click **OK**

### Nếu đã có connection:

1. Double-click vào connection đã có
2. Nhập password nếu được yêu cầu
3. Bạn sẽ vào màn hình SQL Editor

## Bước 3: Tạo Database

### Cách 1: Dùng SQL Query

1. Trong SQL Editor, gõ lệnh sau:
```sql
CREATE DATABASE IF NOT EXISTS yen_sao_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;
```

2. Click nút **Execute** (⚡) hoặc nhấn `Ctrl + Enter`
3. Bạn sẽ thấy message "Success" ở phần Results

### Cách 2: Dùng GUI

1. Click vào icon **Schema** (bên trái) hoặc `View` → `Show Schema`
2. Right-click vào vùng trống trong Schema panel
3. Chọn **Create Schema...**
4. Điền:
   - **Name**: `yen_sao_db`
   - **Charset**: `utf8mb4`
   - **Collation**: `utf8mb4_unicode_ci`
5. Click **Apply**
6. Click **Finish**

## Bước 4: Chọn Database

1. Trong SQL Editor, gõ:
```sql
USE yen_sao_db;
```

2. Hoặc click vào database `yen_sao_db` trong Schema panel (bên trái)

## Bước 5: Chạy Schema SQL

### Cách 1: Copy và Paste (Khuyến nghị)

1. Mở file `backend/database/schema.sql` bằng Notepad hoặc VS Code
2. Copy toàn bộ nội dung
3. Paste vào SQL Editor trong MySQL Workbench
4. Click **Execute** (⚡) hoặc nhấn `Ctrl + Enter`
5. Kiểm tra Results panel - nên thấy các message "Success"

### Cách 2: Import File

1. Trong MySQL Workbench, click menu **File** → **Run SQL Script...**
2. Chọn file `backend/database/schema.sql`
3. Click **Open**
4. Script sẽ tự động chạy

### Cách 3: Từng Table Một

Nếu muốn chạy từng lệnh một để kiểm tra:

1. Copy từng phần CREATE TABLE
2. Paste và Execute
3. Lặp lại cho các table khác

## Bước 6: Kiểm Tra Database

### Xem danh sách Tables:

1. Trong Schema panel (bên trái), expand database `yen_sao_db`
2. Click vào **Tables**
3. Bạn sẽ thấy các tables:
   - `products`
   - `orders`
   - `contacts`
   - `coupons`
   - `users`

### Xem cấu trúc Table:

1. Right-click vào table (ví dụ `products`)
2. Chọn **Table Inspector** hoặc **Alter Table**
3. Xem các columns, data types, indexes

### Xem dữ liệu:

1. Right-click vào table
2. Chọn **Select Rows - Limit 1000**
3. Hoặc gõ query:
```sql
SELECT * FROM products;
```
4. Click **Execute**

## Bước 7: Test Queries

Bạn có thể test các queries trong MySQL Workbench:

```sql
-- Xem tất cả sản phẩm
SELECT * FROM products;

-- Xem sản phẩm theo category
SELECT * FROM products WHERE category = 'blood-nest';

-- Xem đơn hàng
SELECT * FROM orders;

-- Xem coupons
SELECT * FROM coupons;
```

## Bước 8: Cấu Hình Backend .env

Sau khi database đã được tạo, cập nhật file `backend/.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=yen_sao_db
DB_USER=root
DB_PASSWORD=your_mysql_password_here
```

**Lưu ý**: `DB_PASSWORD` là password bạn dùng để login vào MySQL Workbench.

## Troubleshooting

### Lỗi: "Access denied for user"

- Kiểm tra username và password trong `.env`
- Đảm bảo user có quyền truy cập database
- Thử reset password trong MySQL Workbench:
  ```sql
  ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
  FLUSH PRIVILEGES;
  ```

### Lỗi: "Unknown database"

- Đảm bảo đã tạo database `yen_sao_db`
- Kiểm tra tên database trong `.env` có đúng không

### Lỗi: "Table doesn't exist"

- Chạy lại file `schema.sql` trong MySQL Workbench
- Kiểm tra xem có lỗi syntax nào không

### Không kết nối được MySQL Server

1. Kiểm tra MySQL service đang chạy:
   - Windows: Services → MySQL
   - Mac: `brew services list | grep mysql`
   - Linux: `sudo systemctl status mysql`

2. Khởi động MySQL nếu chưa chạy:
   - Windows: Services → Start MySQL
   - Mac: `brew services start mysql`
   - Linux: `sudo systemctl start mysql`

## Các Tính Năng Hữu Ích

### 1. Query History
- Xem lại các queries đã chạy: `View` → `Show Query History`

### 2. Export Data
- Right-click table → `Table Data Export Wizard`
- Export ra CSV, JSON, SQL

### 3. Import Data
- Right-click table → `Table Data Import Wizard`
- Import từ CSV, JSON

### 4. ER Diagram
- `Database` → `Reverse Engineer...`
- Tạo ER diagram từ database hiện tại

### 5. Backup Database
- `Server` → `Data Export`
- Chọn database `yen_sao_db`
- Export ra file `.sql`

## Tips

1. **Lưu connection**: Click "Store in Keychain" để không phải nhập password mỗi lần
2. **Auto-complete**: MySQL Workbench có auto-complete, nhấn `Ctrl + Space`
3. **Format SQL**: Chọn code và nhấn `Ctrl + B` để format
4. **Multiple tabs**: Có thể mở nhiều query tabs cùng lúc
5. **Results to Grid**: Kết quả hiển thị dạng bảng, dễ xem

## Next Steps

Sau khi setup database xong:

1. Chạy backend: `npm run dev`
2. Test API: `http://localhost:5000/api/health`
3. Kiểm tra connection trong terminal backend

