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

  return (
    <>
      <Header />
      <main>
        <section className={styles.detail}>
          <div className="container">
            <div className={styles.grid}>
              <div className={styles.imageCol}>
                <img src={product.image} alt={product.name} />
              </div>
              <div className={styles.infoCol}>
                <h1>{product.name}</h1>
                <p className={styles.category}>{product.category}</p>
                <div className={styles.pricing}>
                  <div className={styles.price}>{formatPrice(product.price)}</div>
                  <div className={styles.original}>{formatPrice(product.originalPrice)}</div>
                </div>

                <p className={styles.description}>{product.description}</p>

                <ul className={styles.benefits}>
                  {product.benefits.map((b, i) => <li key={i}>✓ {b}</li>)}
                </ul>

                <div className={styles.actions}>
                  <button className={styles.buy} onClick={() => addItem(product)} disabled={!product.inStock}>
                    {product.inStock ? '🛒 Thêm vào giỏ' : 'Hết hàng'}
                  </button>
                  <Link to="/products" className={styles.back}>← Quay về</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      
        <section className={styles.related}>
          <div className="container">
            <h3>Sản phẩm liên quan</h3>
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
