#!/usr/bin/env node

/**
 * Setup script để tự động hóa một số bước setup backend
 * Chạy: node scripts/setup.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log('🚀 Yến Sào Backend Setup Script\n');

// Kiểm tra Node.js version
console.log('📦 Kiểm tra Node.js version...');
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
if (majorVersion < 18) {
  console.error('❌ Cần Node.js version 18 trở lên. Hiện tại:', nodeVersion);
  process.exit(1);
}
console.log('✅ Node.js version:', nodeVersion);

// Kiểm tra .env file
console.log('\n📝 Kiểm tra file .env...');
const envPath = path.join(rootDir, '.env');
const envExamplePath = path.join(rootDir, '.env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    console.log('📋 Tạo file .env từ .env.example...');
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Đã tạo file .env');
    console.log('⚠️  Vui lòng chỉnh sửa file .env với thông tin database của bạn!');
  } else {
    console.log('⚠️  Không tìm thấy .env.example');
  }
} else {
  console.log('✅ File .env đã tồn tại');
}

// Kiểm tra node_modules
console.log('\n📦 Kiểm tra dependencies...');
const nodeModulesPath = path.join(rootDir, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('📥 Cài đặt dependencies...');
  try {
    execSync('npm install', { cwd: rootDir, stdio: 'inherit' });
    console.log('✅ Đã cài đặt dependencies');
  } catch (error) {
    console.error('❌ Lỗi khi cài đặt dependencies:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ Dependencies đã được cài đặt');
}

// Tạo thư mục uploads
console.log('\n📁 Tạo thư mục uploads...');
const uploadsDir = path.join(rootDir, 'uploads', 'products');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Đã tạo thư mục uploads/products');
} else {
  console.log('✅ Thư mục uploads/products đã tồn tại');
}

// Kiểm tra PostgreSQL
console.log('\n🐘 Kiểm tra PostgreSQL...');
try {
  execSync('psql --version', { stdio: 'pipe' });
  console.log('✅ PostgreSQL đã được cài đặt');
  console.log('⚠️  Đảm bảo PostgreSQL đang chạy và database đã được tạo!');
} catch (error) {
  console.log('⚠️  Không tìm thấy PostgreSQL trong PATH');
  console.log('   Vui lòng cài đặt PostgreSQL hoặc thêm vào PATH');
}

console.log('\n✨ Setup hoàn tất!');
console.log('\n📋 Các bước tiếp theo:');
console.log('1. Chỉnh sửa file .env với thông tin database');
console.log('2. Tạo database: createdb yen_sao_db');
console.log('3. Chạy schema: psql -U postgres -d yen_sao_db -f database/schema.sql');
console.log('4. Chạy server: npm run dev');
console.log('\n📚 Xem thêm: SETUP-INSTRUCTIONS.md\n');

