import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from '../styles/Header.module.css';
import { useCart } from '../contexts/CartContext'

const Header = () => {
  const { items } = useCart()
  const cartCount = items.reduce((s, it) => s + (it.qty || 0), 0)
  const navigate = useNavigate()
  const location = useLocation()

  const handleScroll = (id) => {
    // If already on home page, scroll to element
    if (location.pathname === '/') {
      const element = document.getElementById(id)
      if (element) element.scrollIntoView({ behavior: 'smooth' })
      return
    }
    // Otherwise navigate to home with a scroll query param
    navigate(`/?scroll=${id}`)
  }

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <Link to="/" className={styles.logoLink} aria-label="Trang chủ">
              <h1>🦆 Yến Sào</h1>
            </Link>
          </div>

          <nav className={styles.nav}>
            <Link to="/products" className={styles.navLink}>Sản Phẩm</Link>
            <Link to="/about" className={styles.navLink}>Về Chúng Tôi</Link>
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
            <Link to="/faq" className={styles.navLink}>FAQ</Link>
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
