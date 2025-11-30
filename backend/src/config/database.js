import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'yen_sao_db',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Test connection
pool.getConnection()
  .then((connection) => {
    console.log('✅ Connected to MySQL database');
    console.log(`   Database: ${process.env.DB_NAME || 'yen_sao_db'}`);
    console.log(`   Host: ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 3306}`);
    connection.release();
  })
  .catch((err) => {
    console.error('❌ Database connection error:');
    console.error(`   Code: ${err.code || 'UNKNOWN'}`);
    console.error(`   Message: ${err.message}`);
    console.error(`   Host: ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 3306}`);
    console.error(`   Database: ${process.env.DB_NAME || 'yen_sao_db'}`);
    console.error(`   User: ${process.env.DB_USER || 'root'}`);
    
    // Hướng dẫn khắc phục
    if (err.code === 'ECONNREFUSED') {
      console.error('\n💡 Giải pháp:');
      console.error('   1. Kiểm tra MySQL server đã chạy chưa');
      console.error('   2. Windows: Mở Services (services.msc) → Start MySQL80');
      console.error('   3. Hoặc dùng: net start MySQL80 (cần quyền Admin)');
    } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n💡 Giải pháp:');
      console.error('   1. Kiểm tra password trong backend/.env');
      console.error('   2. Đảm bảo DB_PASSWORD đúng với password MySQL');
    } else if (err.code === 'ER_BAD_DB_ERROR') {
      console.error('\n💡 Giải pháp:');
      console.error('   1. Tạo database trong MySQL Workbench:');
      console.error('      CREATE DATABASE yen_sao_db;');
      console.error('   2. Chạy schema: backend/database/schema.sql');
    }
  });

export default pool;

