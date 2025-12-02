import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import styles from '../styles/Header.module.css';
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'

const Header = () => {
  const { items } = useCart()
  const { user, logout, isAuthenticated } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const userMenuRef = useRef(null)
  const cartCount = items.reduce((s, it) => s + (it.qty || 0), 0)
  const navigate = useNavigate()
  const location = useLocation()

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
    }

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserMenu])

  const handleLogout = async () => {
    await logout()
    setShowUserMenu(false)
    navigate('/')
  }

  const handleScroll = (id) => {
    setMobileMenuOpen(false)
    if (location.pathname === '/') {
      const element = document.getElementById(id)
      if (element) element.scrollIntoView({ behavior: 'smooth' })
      return
    }
    navigate(`/?scroll=${id}`)
  }

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.wrapper}>
          <button 
            className={styles.hamburger}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <span className={mobileMenuOpen ? styles.hamburgerOpen : ''}></span>
            <span className={mobileMenuOpen ? styles.hamburgerOpen : ''}></span>
            <span className={mobileMenuOpen ? styles.hamburgerOpen : ''}></span>
          </button>

          <div className={styles.logo}>
            <Link to="/" className={styles.logoLink} aria-label="Trang chủ">
              <h1>🦆 Yến Sào</h1>
            </Link>
          </div>

          <nav className={`${styles.nav} ${mobileMenuOpen ? styles.navOpen : ''}`}>
            <Link to="/products" className={styles.navLink} onClick={closeMobileMenu}>Sản Phẩm</Link>
            <Link to="/about" className={styles.navLink} onClick={closeMobileMenu}>Về Chúng Tôi</Link>
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
            <Link to="/faq" className={styles.navLink} onClick={closeMobileMenu}>FAQ</Link>
            <Link to="/lien-he" className={`${styles.navLink} ${styles.ctaButton}`} onClick={closeMobileMenu}>Liên hệ</Link>
            
            <Link to="/cart" className={styles.cartLink} aria-label="Xem giỏ hàng">
              🛒
              {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
            </Link>
            
            {isAuthenticated ? (
              <div className={styles.userMenu} ref={userMenuRef}>
                <button
                  className={styles.userButton}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  aria-label="User menu"
                >
                  <span className={styles.userIcon}>👤</span>
                  <span className={styles.userName}>{user?.name || user?.email}</span>
                  <span className={styles.dropdownArrow}>▼</span>
                </button>
                {showUserMenu && (
                  <div className={styles.userDropdown}>
                    <div className={styles.userInfo}>
                      <p className={styles.userEmail}>{user?.email}</p>
                      {user?.role === 'admin' && (
                        <span className={styles.adminBadge}>Admin</span>
                      )}
                    </div>
                    <button
                      className={styles.logoutButton}
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className={styles.loginButton}>
                Đăng nhập
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
