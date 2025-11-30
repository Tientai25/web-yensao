# Hướng Dẫn Chạy Backend và Frontend

Hướng dẫn đầy đủ từ A-Z để chạy cả backend và frontend với MySQL Workbench.

## 📋 Checklist Trước Khi Bắt Đầu

- [x] Đã cài Node.js (v18+)
- [x] Đã cài MySQL và MySQL Workbench
- [x] MySQL server đang chạy
- [x] Đã có project code

## Phần 1: Setup Database (MySQL Workbench)

### Bước 1.1: Mở MySQL Workbench

1. Mở **MySQL Workbench**
2. Double-click vào connection (hoặc tạo mới nếu chưa có)
3. Nhập password MySQL → Enter

### Bước 1.2: Tạo Database

Trong SQL Editor, gõ và nhấn **Execute** (⚡):

```sql
CREATE DATABASE IF NOT EXISTS yen_sao_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE yen_sao_db;
```

### Bước 1.3: Chạy Schema SQL

1. Mở file `backend/database/schema.sql` (bằng Notepad hoặc VS Code)
2. **Copy toàn bộ** nội dung
3. **Paste** vào SQL Editor trong MySQL Workbench
4. Click **Execute** (⚡) hoặc nhấn `Ctrl + Enter`
5. Kiểm tra Results → Nên thấy các message "Success"

### Bước 1.4: Kiểm Tra Database

```sql
-- Xem danh sách tables
SHOW TABLES;

-- Xem dữ liệu sản phẩm (nếu có)
SELECT * FROM products;
```

✅ **Database đã sẵn sàng!**

---

## Phần 2: Setup Backend

### Bước 2.1: Cấu Hình File .env

1. Mở file `backend/.env` (đã được tạo sẵn)
2. Tìm dòng `DB_PASSWORD=` và điền password MySQL của bạn:

```env
DB_PASSWORD=your_mysql_password_here
```

**Ví dụ:**

```env
DB_PASSWORD=mypass123
```

### Bước 2.2: Cài Đặt Dependencies

Mở terminal/PowerShell và chạy:

```bash
cd backend
npm install
```

Chờ cho đến khi cài đặt xong (có thể mất vài phút).

### Bước 2.3: Chạy Backend

```bash
npm run dev
```

Nếu thành công, bạn sẽ thấy:

```
🚀 Server is running on http://localhost:5000
📦 Environment: development
✅ Connected to MySQL database
```

✅ **Backend đang chạy tại `http://localhost:5000`**

### Bước 2.4: Test Backend

Mở browser và truy cập:

```
http://localhost:5000/api/health
```

Hoặc dùng PowerShell:

```powershell
curl http://localhost:5000/api/health
```

Kết quả mong đợi:

```json
{
  "status": "OK",
  "message": "Yến Sào API is running"
}
```

**Lưu ý:** Giữ terminal này mở để backend tiếp tục chạy.

---

## Phần 3: Setup Frontend

### Bước 3.1: Mở Terminal Mới

Mở một terminal/PowerShell **mới** (giữ terminal backend đang chạy).

### Bước 3.2: Cấu Hình Environment

Tạo file `.env` trong thư mục gốc (cùng cấp với `package.json`):

```bash
# Trong thư mục gốc (D:\yến-sào-web\yến-sào)
# Tạo file .env
```

Nội dung file `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

**Hoặc dùng PowerShell:**

```powershell
cd D:\yến-sào-web\yến-sào
"VITE_API_URL=http://localhost:5000/api" | Out-File -FilePath .env -Encoding utf8
```

### Bước 3.3: Cài Đặt Dependencies (Nếu Chưa Có)

```bash
npm install
```

### Bước 3.4: Chạy Frontend

```bash
npm run dev
```

Nếu thành công, bạn sẽ thấy:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

✅ **Frontend đang chạy tại `http://localhost:5173`**

### Bước 3.5: Mở Browser

Mở browser và truy cập:

```
http://localhost:5173
```

Bạn sẽ thấy trang web Yến Sào!

---

## Phần 4: Kiểm Tra Tích Hợp

### Test API từ Frontend

1. Mở browser DevTools (F12)
2. Vào tab **Network**
3. Refresh trang
4. Kiểm tra xem có request đến `http://localhost:5000/api` không

### Test Thủ Công

Mở browser console (F12) và chạy:

```javascript
fetch("http://localhost:5000/api/products")
  .then((res) => res.json())
  .then((data) => console.log(data));
```

Nếu thấy dữ liệu sản phẩm, tích hợp thành công! ✅

---

## Tóm Tắt Các Terminal Cần Mở

Bạn cần **2 terminal windows**:

### Terminal 1: Backend

```bash
cd backend
npm run dev
# Giữ terminal này mở
```

### Terminal 2: Frontend

```bash
cd D:\yến-sào-web\yến-sào
npm run dev
# Giữ terminal này mở
```

---

## Troubleshooting

### Backend không kết nối được MySQL

**Lỗi:** `Access denied for user 'root'@'localhost'`

**Giải pháp:**

1. Kiểm tra password trong `backend/.env` có đúng không
2. Thử reset password trong MySQL Workbench:
   ```sql
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
   FLUSH PRIVILEGES;
   ```
3. Cập nhật lại `DB_PASSWORD` trong `.env`

### Backend báo "Table doesn't exist"

**Giải pháp:**

- Chạy lại file `schema.sql` trong MySQL Workbench
- Đảm bảo đã chọn database `yen_sao_db` trước khi chạy

### Frontend không kết nối được Backend

**Lỗi:** CORS error hoặc Network error

**Giải pháp:**

1. Kiểm tra backend đang chạy: `http://localhost:5000/api/health`
2. Kiểm tra `VITE_API_URL` trong `.env` frontend
3. Đảm bảo cả 2 đang chạy cùng lúc

### Port đã được sử dụng

**Lỗi:** `Port 5000 is already in use`

**Giải pháp:**

- Thay đổi PORT trong `backend/.env`:
  ```env
  PORT=5001
  ```
- Cập nhật `VITE_API_URL` trong frontend `.env`:
  ```env
  VITE_API_URL=http://localhost:5001/api
  ```

---

## Các URL Quan Trọng

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api
- **Backend Health**: http://localhost:5000/api/health
- **Backend Products**: http://localhost:5000/api/products

---

## Next Steps

Sau khi cả 2 đã chạy:

1. ✅ Test các chức năng: Xem sản phẩm, thêm vào giỏ, checkout
2. ✅ Upload ảnh sản phẩm (nếu có admin panel)
3. ✅ Test contact form
4. ✅ Kiểm tra dark/light mode

Chúc bạn thành công! 🎉
