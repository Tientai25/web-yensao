import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import styles from '../styles/ContactPage.module.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaYoutube, FaTiktok } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.contactPage}>
        <div className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1>Liên hệ với chúng tôi</h1>
            <p>Mọi thắc mắc xin vui lòng điền vào form bên dưới</p>
          </div>
        </div>

        <div className={styles.contactSection}>
          <div className={styles.container}>
            <div className={styles.contactGrid}>
              <div className={styles.contactInfo}>
                <h2 className={styles.sectionTitle}>Thông tin liên hệ</h2>
                <p className={styles.sectionSubtitle}>Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn</p>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <FaMapMarkerAlt />
                  </div>
                  <div className={styles.infoContent}>
                    <h3>Địa chỉ</h3>
                    <p>Số 123, Đường ABC, Quận 1, TP.HCM</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <FaPhone />
                  </div>
                  <div className={styles.infoContent}>
                    <h3>Điện thoại</h3>
                    <p>0909 123 456</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <FaEnvelope />
                  </div>
                  <div className={styles.infoContent}>
                    <h3>Email</h3>
                    <p>info@yensaopremium.com</p>
                  </div>
                </div>

                <div className={styles.socialLinks}>
                  <h3>Kết nối với chúng tôi</h3>
                  <div className={styles.socialIcons}>
                    <a href="#" className={styles.socialIcon}><FaFacebook /></a>
                    <a href="#" className={styles.socialIcon}><FaYoutube /></a>
                    <a href="#" className={styles.socialIcon}><FaTiktok /></a>
                  </div>
                </div>
              </div>

              <div className={styles.contactFormWrapper}>
                <h2 className={styles.formTitle}>Gửi tin nhắn cho chúng tôi</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
