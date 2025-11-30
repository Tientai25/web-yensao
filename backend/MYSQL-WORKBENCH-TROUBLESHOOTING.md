# Khắc Phục Lỗi MySQL Workbench Không Kết Nối Được

## ⚠️ Quan Trọng: Source Code KHÔNG Ảnh Hưởng Đến MySQL Workbench

**Kết luận sau khi kiểm tra kỹ source code:**
- ✅ **KHÔNG có file config MySQL** (.ini, .conf) trong source
- ✅ **KHÔNG có script** thay đổi MySQL server settings
- ✅ **KHÔNG có code** thay đổi port hoặc connection parameters
- ✅ Backend chỉ **ĐỌC** từ `.env` để kết nối, không thay đổi MySQL server

**MySQL Workbench và Backend là 2 client riêng biệt:**
- MySQL Workbench → Kết nối trực tiếp đến MySQL server
- Backend → Kết nối trực tiếp đến MySQL server
- Chúng **KHÔNG ảnh hưởng lẫn nhau**

---

## 🔍 Nguyên Nhân Thường Gặp

### 1. MySQL Service Chưa Chạy (Phổ Biến Nhất)

**Triệu chứng:**
- MySQL Workbench không kết nối được
- Backend báo lỗi `ECONNREFUSED`

**Cách kiểm tra:**
```bash
# Trong Git Bash
netstat -ano | grep :3306
```

Nếu không thấy `LISTENING` → MySQL chưa chạy

**Cách khắc phục:**
1. Nhấn `Windows + R`
2. Gõ: `services.msc` → Enter
3. Tìm **MySQL80** (hoặc MySQL)
4. Click chuột phải → **Start**
5. Đợi vài giây
6. Mở lại MySQL Workbench

---

### 2. Connection Settings Sai

**Kiểm tra trong MySQL Workbench:**
1. Mở MySQL Workbench
2. Click vào connection
3. Kiểm tra:
   - **Hostname**: `127.0.0.1` hoặc `localhost`
   - **Port**: `3306`
   - **Username**: `root` (hoặc username của bạn)
   - **Password**: Password MySQL của bạn

**Nếu quên password:**
- Thử password bạn đã dùng khi cài MySQL
- Hoặc reset password (xem phần dưới)

---

### 3. Firewall Chặn Port 3306

**Kiểm tra:**
1. Mở **Windows Defender Firewall**
2. Kiểm tra có rule nào chặn port 3306 không

**Khắc phục:**
1. Mở **Windows Defender Firewall with Advanced Security**
2. Inbound Rules → New Rule
3. Port → TCP → 3306 → Allow

---

### 4. MySQL Server Bị Lỗi

**Triệu chứng:**
- Service đang chạy nhưng không kết nối được
- Error log có lỗi

**Cách kiểm tra log:**
1. Mở **Event Viewer** (Windows + R → `eventvwr.msc`)
2. Windows Logs → Application
3. Tìm lỗi liên quan đến MySQL

**Khắc phục:**
1. Stop MySQL service
2. Start lại MySQL service
3. Nếu vẫn lỗi, có thể cần reinstall MySQL

---

## 🛠️ Các Bước Chẩn Đoán

### Bước 1: Chạy Script Chẩn Đoán

```bash
# Trong Git Bash (trong thư mục backend)
bash diagnose-mysql.sh
```

Script sẽ kiểm tra:
- ✅ MySQL service có chạy không
- ✅ Port 3306 có mở không
- ✅ Kết nối MySQL có được không
- ✅ Database có tồn tại không
- ✅ File .env có đúng không

---

### Bước 2: Kiểm Tra Thủ Công

#### Kiểm tra MySQL Service:
```bash
# PowerShell (Admin)
Get-Service MySQL80
```

Status phải là **Running**

#### Test kết nối MySQL:
```bash
# Git Bash
mysql -u root -p
```

Nhập password → Nếu kết nối được → MySQL OK

---

### Bước 3: Kiểm Tra MySQL Workbench Connection

1. Mở MySQL Workbench
2. Click vào connection
3. Xem **Test Connection**
4. Nếu lỗi, xem error message

**Lỗi thường gặp:**
- `Can't connect to MySQL server` → MySQL chưa chạy
- `Access denied` → Password sai
- `Unknown database` → Database chưa tạo

---

## 🔧 Cách Khắc Phục Cụ Thể

### Nếu MySQL Service Chưa Chạy:

**Cách 1: Dùng Services (Khuyên dùng)**
1. `Windows + R` → `services.msc`
2. Tìm MySQL80 → Start

**Cách 2: Dùng Command Line (Admin)**
```cmd
net start MySQL80
```

**Cách 3: Set Auto Start**
1. Services → MySQL80 → Properties
2. Startup type: **Automatic**
3. → MySQL sẽ tự động chạy khi khởi động máy

---

### Nếu Quên Password MySQL:

**Cách 1: Reset Password (Windows)**
1. Stop MySQL service
2. Tạo file `reset-password.txt`:
   ```sql
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
   FLUSH PRIVILEGES;
   ```
3. Start MySQL với skip-grant-tables (cần config MySQL)
4. Chạy file reset-password.txt
5. Restart MySQL service

**Cách 2: Dùng MySQL Installer**
1. Mở MySQL Installer
2. Reconfigure MySQL Server
3. Change password

---

### Nếu Port 3306 Bị Dùng:

**Kiểm tra:**
```bash
netstat -ano | findstr :3306
```

**Nếu có process khác dùng port:**
1. Tìm PID của process
2. Kill process: `taskkill /F /PID <PID>`
3. Hoặc đổi port MySQL (không khuyên)

---

## ✅ Checklist Khắc Phục

- [ ] MySQL service đang chạy (Running)
- [ ] Port 3306 không bị chặn
- [ ] Connection settings trong MySQL Workbench đúng
- [ ] Password MySQL đúng
- [ ] Firewall không chặn port 3306
- [ ] Database `yen_sao_db` đã được tạo
- [ ] File `.env` có `DB_PASSWORD` đúng

---

## 📞 Nếu Vẫn Không Được

1. **Kiểm tra MySQL đã cài đúng chưa:**
   - Mở MySQL Installer
   - Xem MySQL Server có trong danh sách không

2. **Kiểm tra MySQL log:**
   - Thường ở: `C:\ProgramData\MySQL\MySQL Server 8.0\Data\*.err`

3. **Thử reinstall MySQL:**
   - Uninstall MySQL
   - Cài lại MySQL
   - Ghi nhớ password khi cài

---

## 💡 Lưu Ý

- **Source code backend KHÔNG ảnh hưởng đến MySQL Workbench**
- **MySQL Workbench và Backend là 2 client riêng biệt**
- **Vấn đề thường là MySQL service chưa chạy hoặc connection settings sai**

---

## 🚀 Sau Khi Khắc Phục

1. Mở MySQL Workbench → Kết nối thành công ✅
2. Tạo database (nếu chưa có)
3. Chạy schema
4. Cấu hình `.env` với password đúng
5. Chạy backend: `npm run dev`


