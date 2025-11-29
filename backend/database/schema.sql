-- Database Schema for Yến Sào E-commerce

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(500),
  rating DECIMAL(3, 1) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  description TEXT,
  benefits JSONB,
  in_stock BOOLEAN DEFAULT true,
  article JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  items JSONB NOT NULL,
  totals JSONB NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  coupon VARCHAR(50),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Coupons Table
CREATE TABLE IF NOT EXISTS coupons (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  type VARCHAR(20) NOT NULL, -- 'percent', 'fixed', 'shipping'
  value DECIMAL(10, 2) NOT NULL,
  description TEXT,
  active BOOLEAN DEFAULT true,
  usage_limit INTEGER,
  usage_count INTEGER DEFAULT 0,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Users Table (nếu cần authentication)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user', -- 'user', 'admin'
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);

-- Insert sample data
INSERT INTO products (name, category, price, original_price, image, rating, reviews, description, benefits, in_stock, article) VALUES
('Yến Sào Huyết 100% Tự Nhiên', 'blood-nest', 2500000, 3000000, '/images/product-1.svg', 4.8, 124, 'Yến sào huyết cao cấp, được chọn lọc kỹ lưỡng từ những tổ yến tốt nhất', 
 '["Bổ máu", "Tăng sức đề kháng", "Làm đẹp da"]'::jsonb, true, 
 '{"title": "Yến Sào Huyết - Món Quà Quý Giá Từ Thiên Nhiên", "content": ["Yến sào huyết là loại yến sào quý hiếm..."]}'::jsonb)
ON CONFLICT DO NOTHING;

-- Insert sample coupons
INSERT INTO coupons (code, type, value, description, active, usage_limit) VALUES
('YEN10', 'percent', 10, 'Giảm 10%', true, 100),
('FREESHIP', 'shipping', 100, 'Miễn phí vận chuyển', true, NULL),
('VIP50', 'percent', 50, 'Giảm 50% cho khách VIP', true, 10)
ON CONFLICT (code) DO NOTHING;

