import { features } from '../data/products';
import styles from '../styles/Features.module.css';

const Features = () => {
  return (
    <section id="benefits" className={styles.features}>
      <div className="container">
        <div className={styles.header}>
          <h2>Tại Sao Chọn Chúng Tôi?</h2>
          <p>
            Những ưu điểm vượt trội giúp bạn yên tâm khi mua hàng từ Yến Sào
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature) => (
            <div key={feature.id} className={styles.card}>
              <div className={styles.icon}>{feature.icon}</div>
              <h3 className={styles.title}>{feature.title}</h3>
              <p className={styles.description}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
