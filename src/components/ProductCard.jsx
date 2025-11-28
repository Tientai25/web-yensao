import { Link } from 'react-router-dom'
import styles from '../styles/ProductCard.module.css';

const ProductCard = ({ product }) => {
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Link to={`/product/${product.id}`} aria-label={`Xem chi tiết ${product.name}`}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
          />
        </Link>
        {!product.inStock && <div className={styles.outOfStock}>Hết Hàng</div>}
        {discountPercent > 0 && (
          <div className={styles.discount}>-{discountPercent}%</div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.category}>{product.category}</div>
        <h3 className={styles.title}>
          <Link to={`/product/${product.id}`} className={styles.titleLink}>{product.name}</Link>
        </h3>
        
        <p className={styles.description}>{product.description}</p>

        <div className={styles.benefits}>
          {product.benefits.map((benefit, index) => (
            <span key={index} className={styles.benefit}>
              ✓ {benefit}
            </span>
          ))}
        </div>

        <div className={styles.rating}>
          <span className={styles.stars}>⭐ {product.rating}</span>
          <span className={styles.reviews}>({product.reviews} đánh giá)</span>
        </div>

        <div className={styles.footer}>
          <div className={styles.pricing}>
            <div className={styles.price}>{formatPrice(product.price)}</div>
            <div className={styles.originalPrice}>
              {formatPrice(product.originalPrice)}
            </div>
          </div>
          <button
            className={`${styles.addButton} ${!product.inStock ? styles.disabled : ''}`}
            disabled={!product.inStock}
          >
            {product.inStock ? '🛒 Mua Ngay' : 'Hết Hàng'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
