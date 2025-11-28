import styles from '../styles/Contact.module.css';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.info}>
            <h2>Liên Hệ Với Chúng Tôi</h2>
            <p>
              Hãy để lại thông tin của bạn hoặc liên hệ trực tiếp, đội ngũ tư vấn viên sẽ sẵn sàng giúp đỡ.
            </p>

            <div className={styles.contactMethods}>
              <div className={styles.method}>
                <div className={styles.methodIcon}>📞</div>
                <div>
                  <h4>Điện Thoại</h4>
                  <p>+84 (0) 123 456 789</p>
                </div>
              </div>

              <div className={styles.method}>
                <div className={styles.methodIcon}>📧</div>
                <div>
                  <h4>Email</h4>
                  <p>info@yensaopremium.com</p>
                </div>
              </div>

              <div className={styles.method}>
                <div className={styles.methodIcon}>📍</div>
                <div>
                  <h4>Địa Chỉ</h4>
                  <p>Nha Trang, Khánh Hòa, Việt Nam</p>
                </div>
              </div>

              <div className={styles.method}>
                <div className={styles.methodIcon}>🕐</div>
                <div>
                  <h4>Giờ Làm Việc</h4>
                  <p>8:00 - 21:00 (Hàng ngày)</p>
                </div>
              </div>
            </div>

            <div className={styles.social}>
              <a href="#" className={styles.socialLink}>Facebook</a>
              <a href="#" className={styles.socialLink}>Instagram</a>
              <a href="#" className={styles.socialLink}>Zalo</a>
            </div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Tên Của Bạn</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nhập tên của bạn"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Nhập email của bạn"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Số Điện Thoại</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Nhập số điện thoại"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Tin Nhắn</label>
              <textarea
                id="message"
                name="message"
                placeholder="Nhập tin nhắn của bạn"
                rows="6"
                required
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Gửi Tin Nhắn
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
