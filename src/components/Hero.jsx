import styles from '../styles/Hero.module.css';

const Hero = () => {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              Yến Sào <span>Tự Nhiên</span> <br />
              Chất Lượng <span>Cao Cấp</span>
            </h1>
            <p className={styles.subtitle}>
              Bán yến sào 100% tự nhiên, không pha trộn hóa chất, nhập khẩu từ Nha Trang. Tăng cường sức khỏe, làm đẹp da, giảm tuổi tác một cách tự nhiên và an toàn.
            </p>
            <div className={styles.buttonGroup}>
              <button 
                className={styles.primaryButton}
                onClick={() => handleScroll('products')}
              >
                Xem Sản Phẩm
              </button>
              <button 
                className={styles.secondaryButton}
                onClick={() => handleScroll('contact')}
              >
                Tư Vấn Miễn Phí
              </button>
            </div>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <strong>1000+</strong>
                <span>Khách Hài Lòng</span>
              </div>
              <div className={styles.stat}>
                <strong>15+</strong>
                <span>Năm Kinh Nghiệm</span>
              </div>
              <div className={styles.stat}>
                <strong>4.8⭐</strong>
                <span>Đánh Giá</span>
              </div>
            </div>
          </div>

          <div className={styles.imageContent}>
            <div className={styles.imageWrapper}>
              <div className={styles.imagePlaceholder}>
                <img 
                  src="https://via.placeholder.com/500x600/d4af37/2c1810?text=Yến+Sào+Premium" 
                  alt="Yến Sào - Sản phẩm chất lượng cao" 
                />
              </div>
              <div className={styles.badge}>
                <span>⚡ Giảm 20%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
