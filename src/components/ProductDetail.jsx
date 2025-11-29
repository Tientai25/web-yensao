import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { products } from '../data/products'
import { useCart } from '../contexts/CartContext'
import styles from '../styles/ProductDetail.module.css'
import ProductCard from './ProductCard'
import Header from './Header'
import Footer from './Footer'

const ProductDetail = () => {
  const { id } = useParams()
  const prodId = Number(id)
  const product = products.find((p) => p.id === prodId)
  const { addItem } = useCart()

  if (!product) return (
    <div className="container">
      <h2>Sản phẩm không tồn tại</h2>
      <p>Quay lại <Link to="/">trang chủ</Link></p>
    </div>
  )

  const formatPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(price)

  useEffect(() => {
    document.title = `${product.name} | Yến Sào`
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', product.description)
    else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = product.description
      document.head.appendChild(meta)
    }
    return () => {
      document.title = 'Yến Sào - Yến Sào Chất Lượng Cao 100% Tự Nhiên'
    }
  }, [product])

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className={styles.star}>⭐</span>)
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className={styles.star}>⭐</span>)
    }
    return stars
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.detail}>
          <div className="container">
            <div className={styles.grid}>
              <div className={styles.imageCol}>
                <div className={styles.imageWrapper}>
                  <img src={product.image} alt={product.name} />
                  {!product.inStock && (
                    <div className={styles.outOfStock}>Hết hàng</div>
                  )}
                </div>
              </div>
              <div className={styles.infoCol}>
                <div className={styles.breadcrumb}>
                  <Link to="/products">Sản phẩm</Link> / <span>{product.name}</span>
                </div>
                <h1>{product.name}</h1>
                
                <div className={styles.ratingSection}>
                  <div className={styles.rating}>
                    {renderStars(product.rating)}
                    <span className={styles.ratingValue}>{product.rating}</span>
                  </div>
                  <span className={styles.reviews}>({product.reviews} đánh giá)</span>
                </div>

                <p className={styles.category}>{product.category}</p>
                
                <div className={styles.pricing}>
                  <div className={styles.price}>{formatPrice(product.price)}</div>
                  <div className={styles.original}>{formatPrice(product.originalPrice)}</div>
                  <div className={styles.discount}>
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </div>
                </div>

                <p className={styles.description}>{product.description}</p>

                <div className={styles.benefitsSection}>
                  <h3>Lợi ích sản phẩm</h3>
                  <ul className={styles.benefits}>
                    {product.benefits.map((b, i) => (
                      <li key={i}>
                        <span className={styles.checkIcon}>✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.actions}>
                  <button 
                    className={styles.buy} 
                    onClick={() => addItem(product)} 
                    disabled={!product.inStock}
                  >
                    {product.inStock ? '🛒 Thêm vào giỏ hàng' : 'Hết hàng'}
                  </button>
                  <Link to="/products" className={styles.back}>← Quay về danh sách</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {product.article && (
          <section className={styles.articleSection}>
            <div className="container">
              <div className={styles.articleContent}>
                <h2 className={styles.articleTitle}>{product.article.title}</h2>
                <div className={styles.articleBody}>
                  {product.article.content.map((paragraph, index) => (
                    <p key={index} className={styles.articleParagraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      
        <section className={styles.related}>
          <div className="container">
            <h2 className={styles.relatedTitle}>Sản phẩm liên quan</h2>
            <div className={styles.relatedGrid}>
              {products
                .filter((p) => p.category === product.category && p.id !== product.id)
                .slice(0, 4)
                .map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default ProductDetail
