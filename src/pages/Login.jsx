import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Auth.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
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
    if (!formData.email || !formData.password) {
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

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Đăng nhập thất bại. Vui lòng thử lại.');
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
            <h1 className={styles.authTitle}>Đăng Nhập</h1>
            <p className={styles.authSubtitle}>Chào mừng bạn quay trở lại!</p>

            {error && (
              <div className={`${styles.alert} ${styles.error}`}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.authForm}>
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
                  placeholder="Nhập mật khẩu"
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
                  {isSubmitting ? 'Đang đăng nhập...' : 'Đăng Nhập'}
                </button>
              </div>
            </form>

            <div className={styles.authFooter}>
              <p>
                Chưa có tài khoản?{' '}
                <Link to="/register" className={styles.authLink}>
                  Đăng ký ngay
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

export default Login;


