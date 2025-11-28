import { Link } from 'react-router-dom'
import styles from '../styles/Header.module.css';
import { useCart } from '../contexts/CartContext'

const Header = () => {
  const { items } = useCart()
  const cartCount = items.reduce((s, it) => s + (it.qty || 0), 0)
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <h1>🦆 Yến Sào</h1>
          </div>

          <nav className={styles.nav}>
            <button 
              onClick={() => handleScroll('products')}
              className={styles.navLink}
            >
              Sản Phẩm
            </button>
            <button 
              onClick={() => handleScroll('benefits')}
              className={styles.navLink}
            >
              Lợi Ích
            </button>
            <button 
              onClick={() => handleScroll('testimonials')}
              className={styles.navLink}
            >
              Đánh Giá
            </button>
            <button 
              onClick={() => handleScroll('faq')}
              className={styles.navLink}
            >
              FAQ
            </button>
            <button 
              onClick={() => handleScroll('contact')}
              className={styles.ctaButton}
            >
              Liên Hệ
            </button>

            <Link to="/cart" className={styles.cartLink} aria-label="Xem giỏ hàng">
              🛒
              {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
