import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload single image
export const uploadImage = (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Không có file được upload'
      });
    }

    // Tạo URL để truy cập file
    const fileUrl = `/uploads/products/${req.file.filename}`;

    res.json({
      success: true,
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        url: fileUrl,
        path: req.file.path
      },
      message: 'Upload ảnh thành công'
    });
  } catch (error) {
    next(error);
  }
};

// Upload multiple images
export const uploadMultipleImages = (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Không có file được upload'
      });
    }

    const files = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      url: `/uploads/products/${file.filename}`,
      path: file.path
    }));

    res.json({
      success: true,
      data: files,
      message: `Upload ${files.length} ảnh thành công`
    });
  } catch (error) {
    next(error);
  }
};

// Delete image
export const deleteImage = (req, res, next) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../../uploads/products', filename);

    // Kiểm tra file có tồn tại không
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File không tồn tại'
      });
    }

    // Xóa file
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      message: 'Xóa ảnh thành công'
    });
  } catch (error) {
    next(error);
  }
};

