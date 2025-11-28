import { testimonials } from '../data/products';
import styles from '../styles/Testimonials.module.css';

const Testimonials = () => {
  return (
    <section id="testimonials" className={styles.testimonials}>
      <div className="container">
        <div className={styles.header}>
          <h2>Khách Hàng Nói Gì Về Chúng Tôi?</h2>
          <p>
            Hơn 1000+ khách hàng hài lòng và tin tưởng sản phẩm của Yến Sào
          </p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.card}>
              <div className={styles.rating}>
                {'⭐'.repeat(testimonial.rating)}
              </div>
              <p className={styles.content}>&quot;{testimonial.content}&quot;</p>
              <div className={styles.author}>
                <div className={styles.avatar}>
                  {testimonial.name.charAt(0)}
                </div>
                <div className={styles.authorInfo}>
                  <div className={styles.name}>{testimonial.name}</div>
                  <div className={styles.date}>{testimonial.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
