import { useState } from 'react';
import { contactAPI } from '../utils/api';
import styles from '../styles/ContactForm.module.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus({ success: false, message: 'Vui lòng điền đầy đủ thông tin' });
      return;
    }

    if (!validateEmail(formData.email)) {
      setSubmitStatus({ success: false, message: 'Email không hợp lệ' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: 'Đang gửi tin nhắn...' });

    try {
      // Gửi dữ liệu lên backend API để lưu vào MySQL
      const response = await contactAPI.send({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });

      if (response.success) {
        setSubmitStatus({ 
          success: true, 
          message: 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.' 
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(response.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending contact form:', error);
      setSubmitStatus({ 
        success: false, 
        message: error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại sau.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactFormContainer}>
      {submitStatus.message && (
        <div className={`${styles.alert} ${submitStatus.success ? styles.success : styles.error}`}>
          {submitStatus.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Họ và tên <span className={styles.required}>*</span></label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nhập họ và tên của bạn"
            disabled={isSubmitting}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="email">Email <span className={styles.required}>*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Nhập địa chỉ email của bạn"
            disabled={isSubmitting}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="subject">Tiêu đề <span className={styles.required}>*</span></label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Nhập tiêu đề tin nhắn"
            disabled={isSubmitting}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="message">Nội dung <span className={styles.required}>*</span></label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Nhập nội dung tin nhắn của bạn"
            disabled={isSubmitting}
          />
        </div>
        
        <div className={styles.submitButtonWrapper}>
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
