import { useState } from 'react';
import { faqs } from '../data/products';
import styles from '../styles/FAQ.module.css';

const FAQ = () => {
  const [openId, setOpenId] = useState(1);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className={styles.faq}>
      <div className="container">
        <div className={styles.header}>
          <h2>Câu Hỏi Thường Gặp</h2>
          <p>
            Tìm câu trả lời cho những câu hỏi phổ biến từ khách hàng của chúng tôi
          </p>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`${styles.faqItem} ${openId === faq.id ? styles.open : ''}`}
            >
              <button
                className={styles.question}
                onClick={() => toggleFAQ(faq.id)}
                aria-expanded={openId === faq.id}
              >
                <span>{faq.question}</span>
                <span className={styles.icon}>+</span>
              </button>
              {openId === faq.id && (
                <div className={styles.answer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
