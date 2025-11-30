import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Auth.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Vui lòng điền đầy đủ thông tin');
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Email không hợp lệ');
      setIsSubmitting(false);
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      setIsSubmitting(false);
      return;
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await register(formData.email, formData.password, formData.name);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Đăng ký thất bại. Vui lòng thử lại.');
      }
    } catch (err) {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.authPage}>
        <div className={styles.authContainer}>
          <div className={styles.authCard}>
            <h1 className={styles.authTitle}>Đăng Ký</h1>
            <p className={styles.authSubtitle}>Tạo tài khoản mới để bắt đầu mua sắm</p>

            {error && (
              <div className={`${styles.alert} ${styles.error}`}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.authForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name">
                  Họ và tên <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nhập họ và tên"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">
                  Email <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Nhập email của bạn"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">
                  Mật khẩu <span className={styles.required}>*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">
                  Xác nhận mật khẩu <span className={styles.required}>*</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Nhập lại mật khẩu"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.submitButtonWrapper}>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Đang đăng ký...' : 'Đăng Ký'}
                </button>
              </div>
            </form>

            <div className={styles.authFooter}>
              <p>
                Đã có tài khoản?{' '}
                <Link to="/login" className={styles.authLink}>
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;


