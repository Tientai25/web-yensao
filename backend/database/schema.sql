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

-- FAQs Table
CREATE TABLE IF NOT EXISTS faqs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Indexes
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_in_stock ON products(in_stock);
CREATE INDEX idx_orders_email ON orders(email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_coupons_code ON coupons(code);
CREATE INDEX idx_faqs_category ON faqs(category);
CREATE INDEX idx_faqs_is_active ON faqs(is_active);
CREATE INDEX idx_faqs_display_order ON faqs(display_order);

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

-- Insert sample FAQs
INSERT INTO faqs (category, question, answer, display_order, is_active) VALUES
('Sản Phẩm', 'Yến sào là gì?', 'Yến sào là tổ được chim Yến xây dựng từ nước bọt của chúng. Nó được coi là một thực phẩm bổ dưỡng quý giá trong y học cổ truyền Á Đông, đặc biệt ở Việt Nam và Trung Quốc.', 1, true),
('Sản Phẩm', 'Yến sào có những loại nào?', 'Chúng tôi cung cấp 6 loại yến sào chính: Yến Huyết (yến đỏ), Yến Trắng, Yến Vàng, Tổ Yến nguyên, Yến Lá Sơn, và các sản phẩm VIP đặc biệt. Mỗi loại có lợi ích và giá trị dinh dưỡng khác nhau.', 2, true),
('Sản Phẩm', 'Yến sào có an toàn không?', 'Có. Tất cả sản phẩm của chúng tôi đều được kiểm định chất lượng nghiêm ngặt, không chứa tạp chất hay hóa chất độc hại. Chúng tôi cam kết 100% tự nhiên và an toàn cho sức khỏe.', 3, true),
('Lợi Ích', 'Yến sào có lợi ích gì?', 'Yến sào có nhiều lợi ích: tăng cường miễn dịch, cải thiện da, giúp phổi khỏe mạnh, tăng năng lượng, hỗ trợ tiêu hóa, và cân bằng cơ thể. Nó đặc biệt tốt cho trẻ em, phụ nữ và người già.', 4, true),
('Lợi Ích', 'Bao lâu thì thấy hiệu quả?', 'Thông thường, bạn sẽ bắt đầu cảm thấy các lợi ích sau 2-4 tuần sử dụng thường xuyên. Để đạt kết quả tốt nhất, nên dùng liên tục trong 2-3 tháng.', 5, true),
('Cách Dùng', 'Cách ăn yến sào như thế nào?', 'Cách truyền thống: Ngâm yến sào trong nước ấm 30 phút, sau đó hầm cùng nước lạnh trong 30-45 phút. Có thể thêm Rock Sugar, hạt Goji hay các gia vị khác để tăng hương vị. Uống nước hoặc ăn yến khi còn ấm.', 6, true),
('Cách Dùng', 'Nên ăn bao nhiêu yến sào mỗi ngày?', 'Liều lượng khuyến nghị: người lớn 3-5g/ngày, trẻ em 1-3g/ngày. Tùy vào tình trạng sức khỏe và mục đích, bạn có thể tăng giảm liều lượng. Tốt nhất nên tư vấn với thầy thuốc.', 7, true),
('Cách Dùng', 'Thời gian tốt nhất để ăn yến sào là khi nào?', 'Thời gian tốt nhất là sáng sớm (6-8 giờ) hoặc tối (trước khi ngủ). Không nên ăn sau bữa ăn thứ ba vì có thể gây khó tiêu. Nên uống khi dạ dày còn trống.', 8, true),
('Bảo Quản', 'Cách bảo quản yến sào?', 'Bảo quản trong nơi khô ráo, thoáng mát, nhiệt độ 20-25°C. Tránh ánh sáng trực tiếp và độ ẩm cao. Sau khi ngâm nước, yến sào phải được dùng trong vòng 4-6 giờ. Có thể bảo quản trong tủ lạnh tối đa 3 ngày.', 9, true),
('Bảo Quản', 'Yến sào có bảo hành bao lâu?', 'Chúng tôi bảo hành 2 năm từ ngày mua hàng. Nếu phát hiện chất lượng kém hoặc hỏng hóc, vui lòng liên hệ chúng tôi ngay để được thay thế hoặc hoàn tiền.', 10, true),
('Giao Hàng', 'Giao hàng mất bao lâu?', 'Chúng tôi giao hàng miễn phí toàn quốc trong 2-3 ngày làm việc. Với các tỉnh xa, có thể mất 3-5 ngày. Bạn sẽ nhận được mã vận chuyển để theo dõi.', 11, true),
('Giao Hàng', 'Có hỗ trợ đổi trả không?', 'Có. Nếu sản phẩm bị hỏng hoặc không đạt chất lượng, bạn có thể đổi trả miễn phí trong vòng 7 ngày kể từ khi nhận hàng. Chúng tôi cũng hỗ trợ hoàn tiền 100% nếu không hài lòng.', 12, true),
('Thanh Toán', 'Có những cách thanh toán nào?', 'Chúng tôi hỗ trợ 2 cách thanh toán: (1) Thanh toán qua Ngân hàng (chuyển khoản trực tiếp), (2) Thanh toán khi nhận hàng (COD). Không có phí giao dịch thêm.', 13, true),
('Thanh Toán', 'Thanh toán qua ngân hàng có an toàn không?', 'Hoàn toàn an toàn. Chúng tôi sử dụng hệ thống thanh toán được mã hóa SSL 256-bit. Thông tin tài khoản và dữ liệu cá nhân của bạn được bảo vệ tuyệt đối.', 14, true),
('Khác', 'Làm sao để liên hệ với chúng tôi?', 'Bạn có thể liên hệ qua: Hotline 1900-XXXX-XXXX, Email: contact@yensao.vn, hoặc Chat trực tiếp trên website. Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp bạn 24/7.', 15, true)
ON DUPLICATE KEY UPDATE id=id;
