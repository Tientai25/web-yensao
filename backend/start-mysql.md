# Hướng Dẫn Khởi Động MySQL Server

## Lỗi: `ECONNREFUSED 127.0.0.1:3306`

Lỗi này nghĩa là **MySQL server chưa được khởi động**.

---

## Cách 1: Khởi Động MySQL Service (Windows)

### Bước 1: Mở Services

1. Nhấn `Windows + R`
2. Gõ: `services.msc` → Enter
3. Tìm service có tên:
   - `MySQL80` (MySQL 8.0)
   - `MySQL` (MySQL 5.x)
   - `MySQL57` (MySQL 5.7)

### Bước 2: Start Service

1. Click chuột phải vào service MySQL
2. Chọn **Start**
3. Đợi vài giây để service khởi động

✅ **MySQL đã chạy!**

---

## Cách 2: Dùng Command Line (PowerShell - Run as Administrator)

```powershell
# Kiểm tra service
Get-Service MySQL*

# Start service
Start-Service MySQL80
# hoặc
Start-Service MySQL
```

---

## Cách 3: Dùng Command Prompt (Run as Administrator)

```cmd
# Start MySQL
net start MySQL80
# hoặc
net start MySQL
```

---

## Cách 4: Dùng MySQL Workbench

1. Mở **MySQL Workbench**
2. Nếu không kết nối được, MySQL server chưa chạy
3. MySQL Workbench sẽ tự động start service khi bạn connect

---

## Kiểm Tra MySQL Đã Chạy

### Cách 1: Kiểm tra trong Services

- Mở `services.msc`
- Tìm MySQL service → Status phải là **Running**

### Cách 2: Test Connection

```bash
# Trong Git Bash hoặc Command Prompt
mysql -u root -p
```

Nếu kết nối được → MySQL đã chạy ✅

---

## Sau Khi Start MySQL

Quay lại terminal backend và chạy lại:

```bash
npm run dev
```

Bạn sẽ thấy:
```
🚀 Server is running on http://localhost:5000
✅ Connected to MySQL database
```

---

## Lưu Ý

- MySQL service phải **Running** trước khi chạy backend
- Nếu MySQL không tự động start khi khởi động máy, bạn có thể set **Startup type** thành **Automatic** trong Services

