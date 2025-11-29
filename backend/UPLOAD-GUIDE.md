# Hướng Dẫn Upload Ảnh Sản Phẩm

## Backend Setup

### 1. Tạo thư mục uploads

Backend sẽ tự động tạo thư mục `uploads/products/` khi khởi động. Nếu không, tạo thủ công:

```bash
mkdir -p backend/uploads/products
```

### 2. Cấu hình

File upload được cấu hình trong `backend/src/middleware/upload.js`:

- **Max file size**: 5MB (có thể thay đổi)
- **Allowed types**: JPEG, JPG, PNG, GIF, WEBP, SVG
- **Storage**: Local disk (có thể chuyển sang S3, Cloudinary sau)

### 3. Serve static files

Backend đã được cấu hình để serve files từ `/uploads` tại `http://localhost:5000/uploads/`

## API Endpoints

### Upload Single Image
```bash
POST /api/upload/single
Content-Type: multipart/form-data

Body:
  image: [file]
```

Response:
```json
{
  "success": true,
  "data": {
    "filename": "product-1234567890-123456789.jpg",
    "originalName": "product.jpg",
    "size": 123456,
    "mimetype": "image/jpeg",
    "url": "/uploads/products/product-1234567890-123456789.jpg"
  }
}
```

### Upload Multiple Images
```bash
POST /api/upload/multiple
Content-Type: multipart/form-data

Body:
  images: [file1, file2, ...]
```

### Delete Image
```bash
DELETE /api/upload/:filename
```

## Frontend Usage

### Sử dụng ImageUpload Component

```jsx
import ImageUpload from '../components/ImageUpload';

const ProductForm = () => {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <form>
      <ImageUpload
        onImageSelect={(url) => setImageUrl(url)}
        currentImage={imageUrl}
        label="Ảnh Sản Phẩm"
      />
      
      <input type="hidden" name="image" value={imageUrl} />
    </form>
  );
};
```

### Sử dụng API trực tiếp

```jsx
import { uploadAPI } from '../utils/api';

const handleUpload = async (file) => {
  try {
    const response = await uploadAPI.single(file);
    console.log('Image URL:', response.data.url);
    // response.data.url = "/uploads/products/filename.jpg"
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

## Tích hợp với Product Form

### Tạo/Cập nhật sản phẩm với ảnh

**Option 1: Upload riêng, sau đó gửi URL**
```jsx
// 1. Upload ảnh trước
const uploadResponse = await uploadAPI.single(imageFile);
const imageUrl = uploadResponse.data.url;

// 2. Tạo sản phẩm với URL
await productsAPI.create({
  name: 'Yến Sào',
  image: imageUrl, // URL từ upload
  // ... other fields
});
```

**Option 2: Upload cùng với form data (multipart)**
```jsx
const formData = new FormData();
formData.append('name', 'Yến Sào');
formData.append('price', 2500000);
formData.append('image', imageFile); // File object

const response = await fetch(`${API_URL}/products`, {
  method: 'POST',
  body: formData, // Không cần Content-Type header
});
```

## Production Deployment

### Option 1: Local Storage (hiện tại)
- Ảnh lưu trên server
- Cần backup thư mục `uploads/`
- Không scale tốt

### Option 2: Cloud Storage (khuyến nghị)
Sử dụng AWS S3, Cloudinary, hoặc Firebase Storage:

```javascript
// backend/src/utils/cloudStorage.js
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

export const uploadToS3 = async (file) => {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: `products/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const result = await s3.upload(params).promise();
  return result.Location; // Public URL
};
```

### Option 3: CDN
Sau khi upload, serve qua CDN để tăng tốc độ load.

## Security

1. **Validate file type**: Chỉ cho phép image types
2. **Validate file size**: Giới hạn 5MB
3. **Sanitize filename**: Tránh path traversal
4. **Rate limiting**: Giới hạn số lần upload
5. **Authentication**: Yêu cầu đăng nhập để upload (cho admin)

## Troubleshooting

### CORS Error
Đảm bảo backend cho phép CORS từ frontend URL.

### File too large
Tăng `limits.fileSize` trong `upload.js` hoặc compress ảnh trước khi upload.

### Permission denied
Kiểm tra quyền ghi vào thư mục `uploads/`:
```bash
chmod 755 backend/uploads/products
```

### 404 khi load ảnh
- Kiểm tra static file serving trong `server.js`
- Verify file path trong database
- Check file có tồn tại trong `uploads/products/`

