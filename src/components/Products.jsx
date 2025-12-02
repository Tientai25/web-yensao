import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { productsAPI } from '../utils/api';
import { products as localProducts } from '../data/products';
import styles from '../styles/Products.module.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  useEffect(() => {
    const fetchProducts = async () => {
      const useLocalData = import.meta.env.VITE_USE_LOCAL_DATA === 'true';
      
      if (useLocalData) {
        // Use local data with assets images
        setLoading(true);
        setTimeout(() => {
          const filtered = selectedCategory !== 'all'
            ? localProducts.filter(p => p.category === selectedCategory)
            : localProducts;
          setProducts(filtered);
          setLoading(false);
        }, 300);
        return;
      }
      
      // Use API
      try {
        setLoading(true);
        setError(null);
        
        const params = selectedCategory !== 'all' 
          ? { category: selectedCategory } 
          : {};
        
        const response = await productsAPI.getAll(params);
        
        if (response.success) {
          setProducts(response.data || []);
        } else {
          throw new Error(response.message || 'Failed to fetch products');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        // Fallback to local data
        const filtered = selectedCategory !== 'all'
          ? localProducts.filter(p => p.category === selectedCategory)
          : localProducts;
        setProducts(filtered);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
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
                className={`${styles.filterButton} ${selectedCategory === category ? styles.active : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Đang tải sản phẩm...</p>
          </div>
        )}

        {error && !loading && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-error)' }}>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Không có sản phẩm nào.</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
