import { useState } from 'react';
import { faqs } from '../data/products';
import styles from '../styles/FAQ.module.css';

const FAQ = () => {
  const [openId, setOpenId] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  // Filter FAQs based on search term and category
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ['all', ...new Set(faqs.map(faq => faq.category))];
  const categoryLabels = {
    'all': 'Tất cả',
    'general': 'Chung',
    'product': 'Sản phẩm',
    'shipping': 'Giao hàng',
    'payment': 'Thanh toán',
    'warranty': 'Bảo hành'
  };

  // Highlight search term in text
  const highlightText = (text) => {
    if (!searchTerm) return text;
    
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === searchTerm.toLowerCase() ? 
      <mark key={i} className={styles.highlight}>{part}</mark> : 
      part
    );
  };

  return (
    <section id="faq" className={styles.faq}>
      <div className={styles.container}>
        {/* Decorative elements */}
        <div className={`${styles.decorativeElement} ${styles.one}`}></div>
        <div className={`${styles.decorativeElement} ${styles.two}`}></div>
        
        <div className={styles.header}>
          <h2>Câu Hỏi Thường Gặp11111111</h2>
          <p>
            Tìm câu trả lời cho những thắc mắc phổ biến về sản phẩm yến sào của chúng tôi
          </p>
        </div>

        {/* Category filter */}
        <div className={styles.categoryFilter}>
          {categories.map(category => (
            <button
              key={category}
              className={`${styles.categoryButton} ${activeCategory === category ? styles.active : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {categoryLabels[category] || category}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Tìm kiếm câu hỏi..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Tìm kiếm câu hỏi"
          />
          <svg 
            className={styles.searchIcon} 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          {searchTerm && (
            <button 
              className={styles.clearButton}
              onClick={() => setSearchTerm('')}
              aria-label="Xóa tìm kiếm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>

        {/* FAQ List */}
        <div className={styles.faqList}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div 
                key={faq.id} 
                className={`${styles.faqItem} ${openId === faq.id ? 'open' : ''}`}
                style={{ '--index': index }}
              >
                <button 
                  className={styles.question} 
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={openId === faq.id}
                  aria-controls={`faq-${faq.id}`}
                  id={`faq-question-${faq.id}`}
                >
                  <span className={styles.questionText}>
                    {searchTerm ? highlightText(faq.question) : faq.question}
                  </span>
                  <span className={styles.icon} aria-hidden="true">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className={openId === faq.id ? styles.rotateIcon : ''}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </button>
                <div 
                  id={`faq-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${faq.id}`}
                  className={styles.answer}
                >
                  <div className={styles.answerContent}>
                    {faq.answer.split('\n').map((paragraph, i) => (
                      <p key={i}>{searchTerm ? highlightText(paragraph) : paragraph}</p>
                    ))}
                    {faq.additionalInfo && (
                      <div className={styles.additionalInfo}>
                        <p>{faq.additionalInfo}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <h3>Không tìm thấy câu hỏi phù hợp</h3>
              <p>Không có câu hỏi nào khớp với từ khóa "{searchTerm}" trong danh mục đã chọn.</p>
              <button 
                className={styles.clearSearch}
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
              >
                Xóa bộ lọc tìm kiếm
              </button>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h3>Vẫn còn thắc mắc?</h3>
            <p>Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng hỗ trợ bạn</p>
            <div className={styles.ctaButtons}>
              <a href="tel:+84912345678" className={styles.ctaButton}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Gọi ngay: 0912 345 678
              </a>
              <a href="mailto:info@yensaopremium.com" className={`${styles.ctaButton} ${styles.secondary}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Gửi email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
