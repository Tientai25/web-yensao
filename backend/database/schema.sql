-- Database Schema for Yến Sào E-commerce (MySQL)

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS yen_sao_db;
USE yen_sao_db;

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(500),
  rating DECIMAL(3, 1) DEFAULT 0,
  reviews INT DEFAULT 0,
  description TEXT,
  benefits JSON,
  in_stock BOOLEAN DEFAULT true,
  article JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  items JSON NOT NULL,
  totals JSON NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  coupon VARCHAR(50),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Coupons Table
CREATE TABLE IF NOT EXISTS coupons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  type VARCHAR(20) NOT NULL COMMENT 'percent, fixed, shipping',
  value DECIMAL(10, 2) NOT NULL,
  description TEXT,
  active BOOLEAN DEFAULT true,
  usage_limit INT,
  usage_count INT DEFAULT 0,
  expires_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Users Table (nếu cần authentication)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user' COMMENT 'user, admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Indexes
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_in_stock ON products(in_stock);
CREATE INDEX idx_orders_email ON orders(email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_coupons_code ON coupons(code);

-- Insert sample data
INSERT INTO products (name, category, price, original_price, image, rating, reviews, description, benefits, in_stock, article) VALUES
('Yến Sào Huyết 100% Tự Nhiên', 'blood-nest', 2500000, 3000000, '/images/product-1.svg', 4.8, 124, 'Yến sào huyết cao cấp, được chọn lọc kỹ lưỡng từ những tổ yến tốt nhất', 
 JSON_ARRAY('Bổ máu', 'Tăng sức đề kháng', 'Làm đẹp da'), true, 
 JSON_OBJECT('title', 'Yến Sào Huyết - Món Quà Quý Giá Từ Thiên Nhiên', 'content', JSON_ARRAY('Yến sào huyết là loại yến sào quý hiếm...')))
ON DUPLICATE KEY UPDATE id=id;

-- Insert sample coupons
INSERT INTO coupons (code, type, value, description, active, usage_limit) VALUES
('YEN10', 'percent', 10, 'Giảm 10%', true, 100),
('FREESHIP', 'shipping', 100, 'Miễn phí vận chuyển', true, NULL),
('VIP50', 'percent', 50, 'Giảm 50% cho khách VIP', true, 10)
ON DUPLICATE KEY UPDATE code=code;
