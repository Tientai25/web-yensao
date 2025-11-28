import styles from '../styles/Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.column}>
            <h4>Yến Sào</h4>
            <p>
              Bán yến sào 100% tự nhiên, chất lượng cao cấp, bảo hành chính hãng, giao hàng toàn quốc.
            </p>
          </div>

          <div className={styles.column}>
            <h4>Sản Phẩm</h4>
            <ul>
              <li><a href="#products">Yến Huyết</a></li>
              <li><a href="#products">Yến Trắng</a></li>
              <li><a href="#products">Yến Vàng</a></li>
              <li><a href="#products">Tổ Yến</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Thông Tin</h4>
            <ul>
              <li><a href="#benefits">Lợi Ích</a></li>
              <li><a href="#testimonials">Đánh Giá</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact">Liên Hệ</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Liên Hệ</h4>
            <p>
              <strong>Điện thoại:</strong> +84 (0) 123 456 789<br />
              <strong>Email:</strong> info@yensaopremium.com<br />
              <strong>Giờ làm:</strong> 8:00 - 21:00
            </p>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Yến Sào. Bảo lưu mọi quyền.
          </p>
          <div className={styles.links}>
            <a href="#" className={styles.link}>Chính Sách Bảo Mật</a>
            <a href="#" className={styles.link}>Điều Khoản Dịch Vụ</a>
            <a href="#" className={styles.link}>Chính Sách Hoàn Trả</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
