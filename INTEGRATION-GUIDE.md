# Hướng Dẫn Tích Hợp Backend với Frontend

## Bước 1: Setup Backend

1. **Cài đặt MySQL:**
```bash
# Windows (với Chocolatey)
choco install mysql

# Hoặc download từ https://dev.mysql.com/downloads/installer/
# Hoặc dùng XAMPP/WAMP (đã bao gồm MySQL)
```

2. **Tạo database:**
```sql
CREATE DATABASE yen_sao_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

3. **Chạy schema:**
```bash
cd backend
mysql -u root -p yen_sao_db < database/schema.sql
```

4. **Cài đặt dependencies và chạy backend:**
```bash
cd backend
npm install
cp .env.example .env
# Chỉnh sửa .env với thông tin database của bạn
npm run dev
```

Backend sẽ chạy tại `http://localhost:5000`

## Bước 2: Tích Hợp Frontend

### 2.1. Thêm biến môi trường

Tạo file `.env` trong thư mục gốc (cùng cấp với `package.json`):

```env
VITE_API_URL=http://localhost:5000/api
```

### 2.2. Cập nhật ProductsPage để dùng API

Thay vì import từ `products.js`, fetch từ API:

```javascript
// src/pages/ProductsPage.jsx
import { useState, useEffect } from 'react';
import { productsAPI } from '../utils/api';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsAPI.getAll();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ... rest of component
};
```

### 2.3. Cập nhật ProductDetail

```javascript
// src/components/ProductDetail.jsx
import { useState, useEffect } from 'react';
import { productsAPI } from '../utils/api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productsAPI.getById(id);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ... rest of component
};
```

### 2.4. Cập nhật Checkout để gửi đơn hàng

```javascript
// src/pages/Checkout.jsx
import { ordersAPI } from '../utils/api';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const orderData = {
      name,
      email,
      phone,
      address,
      items,
      totals,
      paymentMethod,
      coupon
    };

    const response = await ordersAPI.create(orderData);
    
    if (response.success) {
      clear();
      navigate(`/thank-you?orderId=${response.data.id}`);
    }
  } catch (error) {
    console.error('Error creating order:', error);
    alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.');
  }
};
```

### 2.5. Cập nhật ContactForm

```javascript
// src/components/ContactForm.jsx
import { contactAPI } from '../utils/api';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await contactAPI.send({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message
    });

    if (response.success) {
      setSubmitStatus({ 
        success: true, 
        message: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.' 
      });
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  } catch (error) {
    setSubmitStatus({ 
      success: false, 
      message: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.' 
    });
  }
};
```

### 2.6. Cập nhật CartContext để validate coupon từ API

```javascript
// src/contexts/CartContext.jsx
import { couponsAPI } from '../utils/api';

const applyCoupon = async (code) => {
  try {
    const response = await couponsAPI.validate(code);
    if (response.valid) {
      setCoupon(response.data.code);
      return { ok: true, message: response.data.message };
    }
    return { ok: false, message: response.message };
  } catch (error) {
    return { ok: false, message: 'Mã không hợp lệ' };
  }
};
```

## Bước 3: Migration Dữ Liệu

Nếu bạn đã có dữ liệu trong `products.js`, có thể import vào database:

```javascript
// backend/scripts/importProducts.js
import pool from '../src/config/database.js';
import { products } from '../../src/data/products.js';

async function importProducts() {
  for (const product of products) {
    await pool.query(
      `INSERT INTO products (name, category, price, original_price, image, rating, reviews, description, benefits, in_stock, article)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        product.name,
        product.category,
        product.price,
        product.originalPrice,
        product.image,
        product.rating,
        product.reviews,
        product.description,
        JSON.stringify(product.benefits),
        product.inStock,
        JSON.stringify(product.article)
      ]
    );
  }
  console.log('Products imported successfully');
  process.exit(0);
}

importProducts();
```

## Bước 4: Testing

1. **Test API endpoints:**
```bash
# Health check
curl http://localhost:5000/api/health

# Get products
curl http://localhost:5000/api/products

# Get product by ID
curl http://localhost:5000/api/products/1
```

2. **Test từ frontend:**
- Mở browser console
- Kiểm tra network requests khi load trang
- Đảm bảo không có CORS errors

## Bước 5: Deploy

### Backend (Railway/Render)
1. Push code lên GitHub
2. Connect repository với Railway/Render
3. Setup PostgreSQL database
4. Add environment variables
5. Deploy

### Frontend (Vercel/Netlify)
1. Add `VITE_API_URL` environment variable
2. Deploy

## Troubleshooting

### CORS Error
- Đảm bảo `FRONTEND_URL` trong `.env` backend đúng
- Kiểm tra CORS middleware trong `server.js`

### Database Connection Error
- Kiểm tra MySQL đang chạy
- Verify credentials trong `.env`
- Test connection: `mysql -u root -p yen_sao_db`

### API Not Found
- Kiểm tra backend đang chạy
- Verify `VITE_API_URL` trong frontend `.env`
- Check network tab trong browser DevTools

