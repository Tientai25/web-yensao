# Yến Sào - Demo Store

Trang demo bán yến sào được xây dựng bằng React + Vite. Mục tiêu: giao diện đẹp, component hóa, chuẩn SEO căn bản.

Chạy dự án (PowerShell):

```powershell
npm install
npm run dev
```

Build production:

```powershell
npm run build
npm run preview
```

Những thay đổi chính đã thực hiện:
- Thêm `react-router-dom` và cấu hình routing (/ và /product/:id).
- Tạo `CartContext` để quản lý giỏ hàng (thêm/xóa/cập nhật số lượng).
- Thêm trang chi tiết sản phẩm (`src/components/ProductDetail.jsx`).
- Cấu trúc components tách biệt và CSS Modules cho mỗi component.
- Thêm `public/robots.txt` và `public/sitemap.xml` cho SEO cơ bản.
- Thêm ảnh placeholder trong `public/images` (thay bằng ảnh thật khi có).

Gợi ý tiếp theo (muốn tôi làm):
- Thêm trang giỏ hàng và checkout
- Tích hợp thanh toán (VNPay, Momo, Stripe...)
- Tạo sitemap động và meta tags động cho từng sản phẩm
- Seo nâng cao: hreflang, structured data chi tiết sản phẩm

Nếu OK, tôi sẽ tiếp tục với: thêm trang giỏ hàng + checkout hoặc tối ưu SEO động — bạn chọn nhé.
