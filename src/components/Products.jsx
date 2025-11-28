import ProductCard from './ProductCard';
import { products } from '../data/products';
import styles from '../styles/Products.module.css';

const Products = () => {
  const categories = ['all', 'blood-nest', 'white-nest', 'gold-nest', 'whole-nest', 'leaf-nest', 'vip-nest'];
  const categoryLabels = {
    all: 'Tất Cả',
    'blood-nest': 'Yến Huyết',
    'white-nest': 'Yến Trắng',
    'gold-nest': 'Yến Vàng',
    'whole-nest': 'Tổ Yến',
    'leaf-nest': 'Yến Lá Sơn',
    'vip-nest': 'VIP',
  };

  const filteredProducts = (category) => {
    if (category === 'all') return products;
    return products.filter((p) => p.category === category);
  };

  return (
    <section id="products" className={styles.products}>
      <div className="container">
        <div className={styles.header}>
          <h2>Sản Phẩm Yến Sào</h2>
          <p>
            Khám phá bộ sưu tập đầy đủ các loại yến sào chất lượng cao, được chọn lọc kỹ lưỡng từ những tổ yến tốt nhất.
          </p>
        </div>

        <div className={styles.filterContainer}>
          <div className={styles.filterButtons}>
            {categories.map((category) => (
              <button
                key={category}
                className={styles.filterButton}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
