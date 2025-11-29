import { useState, useRef } from 'react';
import styles from '../styles/ImageUpload.module.css';

const ImageUpload = ({ 
  onImageSelect, 
  currentImage, 
  label = 'Upload Ảnh Sản Phẩm',
  multiple = false,
  maxSize = 5 * 1024 * 1024 // 5MB
}) => {
  const [preview, setPreview] = useState(currentImage || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      setError('Chỉ chấp nhận file ảnh (JPEG, PNG, GIF, WEBP, SVG)');
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      setError(`File quá lớn. Kích thước tối đa: ${(maxSize / 1024 / 1024).toFixed(0)}MB`);
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload to server
      const formData = new FormData();
      formData.append('image', file);

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/upload/single`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        // Callback với URL của ảnh đã upload
        if (onImageSelect) {
          onImageSelect(data.data.url);
        }
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Có lỗi xảy ra khi upload ảnh');
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onImageSelect) {
      onImageSelect('');
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <label className={styles.label}>{label}</label>
      
      <div className={styles.uploadArea}>
        {preview ? (
          <div className={styles.previewContainer}>
            <img src={preview} alt="Preview" className={styles.previewImage} />
            <div className={styles.previewActions}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={styles.changeButton}
                disabled={uploading}
              >
                {uploading ? 'Đang upload...' : 'Đổi ảnh'}
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className={styles.removeButton}
                disabled={uploading}
              >
                Xóa
              </button>
            </div>
          </div>
        ) : (
          <div
            className={styles.uploadPlaceholder}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className={styles.uploadIcon}>📷</div>
            <p className={styles.uploadText}>
              {uploading ? 'Đang upload...' : 'Click để chọn ảnh hoặc kéo thả vào đây'}
            </p>
            <p className={styles.uploadHint}>
              PNG, JPG, GIF, WEBP tối đa {(maxSize / 1024 / 1024).toFixed(0)}MB
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.fileInput}
          disabled={uploading}
        />
      </div>

      {error && (
        <div className={styles.errorMessage}>{error}</div>
      )}
    </div>
  );
};

export default ImageUpload;

