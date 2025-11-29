# Migration từ PostgreSQL sang MySQL

Backend đã được chuyển đổi từ PostgreSQL sang MySQL. Tài liệu này giải thích các thay đổi chính.

## Thay Đổi Chính

### 1. Package Dependencies

**Trước (PostgreSQL):**
```json
"pg": "^8.11.3"
```

**Sau (MySQL):**
```json
"mysql2": "^3.6.5"
```

### 2. Database Connection

**Trước:**
```javascript
import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({ ... });
```

**Sau:**
```javascript
import mysql from 'mysql2/promise';
const pool = mysql.createPool({ ... });
```

### 3. Query Syntax

**PostgreSQL:**
- Placeholders: `$1, $2, $3`
- Result: `result.rows`
- Row count: `result.rowCount`
- RETURNING clause

**MySQL:**
- Placeholders: `?`
- Result: `[rows]` (array destructuring)
- Row count: `result.affectedRows`
- SELECT sau INSERT/UPDATE

### 4. SQL Syntax Differences

| Feature | PostgreSQL | MySQL |
|---------|-----------|-------|
| Auto increment | SERIAL | AUTO_INCREMENT |
| JSON type | JSONB | JSON |
| Case-insensitive search | ILIKE | LIKE với LOWER() |
| Boolean | BOOLEAN | BOOLEAN (TINYINT(1)) |
| Timestamp | NOW() | NOW() hoặc CURRENT_TIMESTAMP |

### 5. Schema Changes

**PostgreSQL:**
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  benefits JSONB,
  ...
);
```

**MySQL:**
```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  benefits JSON,
  ...
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## Code Examples

### SELECT Query

**PostgreSQL:**
```javascript
const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
const product = result.rows[0];
```

**MySQL:**
```javascript
const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [id]);
const product = rows[0];
```

### INSERT Query

**PostgreSQL:**
```javascript
const result = await pool.query(
  'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
  [name, price]
);
const newProduct = result.rows[0];
```

**MySQL:**
```javascript
const [result] = await pool.execute(
  'INSERT INTO products (name, price) VALUES (?, ?)',
  [name, price]
);
const [newProduct] = await pool.execute('SELECT * FROM products WHERE id = ?', [result.insertId]);
```

### UPDATE Query

**PostgreSQL:**
```javascript
const result = await pool.query(
  'UPDATE products SET name = $1 WHERE id = $2 RETURNING *',
  [name, id]
);
```

**MySQL:**
```javascript
const [result] = await pool.execute(
  'UPDATE products SET name = ? WHERE id = ?',
  [name, id]
);
if (result.affectedRows > 0) {
  const [updated] = await pool.execute('SELECT * FROM products WHERE id = ?', [id]);
}
```

## Migration Checklist

- [x] Thay đổi package.json (pg → mysql2)
- [x] Cập nhật database.js connection
- [x] Chuyển đổi schema.sql sang MySQL syntax
- [x] Cập nhật tất cả controllers (queries)
- [x] Cập nhật .env.example
- [x] Cập nhật documentation
- [x] Cập nhật setup scripts

## Lưu Ý

1. **Character Set**: MySQL schema sử dụng `utf8mb4` để hỗ trợ emoji và ký tự đặc biệt
2. **JSON**: MySQL 5.7+ hỗ trợ JSON type, tự động validate
3. **Connection Pool**: MySQL2 sử dụng connection pool tương tự PostgreSQL
4. **Transactions**: Syntax tương tự, chỉ khác cách execute

## Nếu Muốn Quay Lại PostgreSQL

1. Thay `mysql2` bằng `pg` trong package.json
2. Restore database.js từ git history
3. Restore schema.sql từ git history
4. Restore tất cả controllers
5. Cập nhật .env.example

