import { Link } from 'react-router-dom'
import styles from '../styles/ProductCard.module.css';
import { useCart } from '../contexts/CartContext'

const ProductCard = ({ product }) => {
  // Handle both frontend format (originalPrice) and backend format (original_price)
  const originalPrice = product.originalPrice || product.original_price || product.price;
  const price = product.price || 0;
  const discountPercent = originalPrice > price 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;
  const inStock = product.inStock !== undefined ? product.inStock : product.in_stock !== undefined ? product.in_stock : true;
  
  // Fix image URL - if starts with /uploads, prepend backend URL
  const imageUrl = product.image?.startsWith('/uploads') 
    ? `http://localhost:5000${product.image}`
    : product.image;

  const { addItem } = useCart()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link to={`/products/${product.id}`} className={styles.card} aria-label={`Xem chi tiết ${product.name}`}>
      <div className={styles.imageWrapper}>
        <img
          src={imageUrl}
          alt={product.name}
          className={styles.image}
          onError={(e) => e.target.src = '/images/placeholder.svg'}
        />
        {!inStock && <div className={styles.outOfStock}>Hết Hàng</div>}
        {discountPercent > 0 && (
          <div className={styles.discount}>-{discountPercent}%</div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.category}>{product.category}</div>
        <h3 className={styles.title}>{product.name}</h3>
        
        <p className={styles.description}>{product.description}</p>

        {product.benefits && product.benefits.length > 0 && (
          <div className={styles.benefits}>
            {product.benefits.map((benefit, index) => (
              <span key={index} className={styles.benefit}>
                ✓ {benefit}
              </span>
            ))}
          </div>
        )}

        {product.rating && (
          <div className={styles.rating}>
            <span className={styles.stars}>⭐ {product.rating}</span>
            <span className={styles.reviews}>({product.reviews || 0} đánh giá)</span>
          </div>
        )}

        <div className={styles.footer}>
          <div className={styles.pricing}>
            <div className={styles.price}>{formatPrice(price)}</div>
            {originalPrice > price && (
              <div className={styles.originalPrice}>
                {formatPrice(originalPrice)}
              </div>
            )}
          </div>
          <button
            className={`${styles.addButton} ${!inStock ? styles.disabled : ''}`}
            disabled={!inStock}
            onClick={(e) => {
              e.preventDefault();
              // Normalize product data before adding to cart
              const normalizedProduct = {
                ...product,
                originalPrice: originalPrice,
                inStock: inStock
              };
              try { addItem(normalizedProduct) } catch (err) { /* ignore if context missing */ }
            }}
          >
            {inStock ? '🛒 Mua Ngay' : 'Hết Hàng'}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
