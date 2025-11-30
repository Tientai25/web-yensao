import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { productsAPI } from '../utils/api'
import { useCart } from '../contexts/CartContext'
import styles from '../styles/ProductDetail.module.css'
import ProductCard from './ProductCard'
import Header from './Header'
import Footer from './Footer'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addItem } = useCart()

  // Normalize product data helper function
  const normalizeProduct = (productData) => {
    if (!productData) return null
    
    try {
      let benefits = []
      if (Array.isArray(productData.benefits)) {
        benefits = productData.benefits
      } else if (typeof productData.benefits === 'string' && productData.benefits) {
        try {
          benefits = JSON.parse(productData.benefits)
          if (!Array.isArray(benefits)) benefits = []
        } catch (e) {
          console.warn('Error parsing benefits:', e)
          benefits = []
        }
      }

      let article = null
      if (productData.article) {
        if (typeof productData.article === 'object') {
          article = productData.article
        } else if (typeof productData.article === 'string' && productData.article) {
          try {
            article = JSON.parse(productData.article)
            if (typeof article !== 'object') article = null
          } catch (e) {
            console.warn('Error parsing article:', e)
            article = null
          }
        }
      }

      return {
        ...productData,
        originalPrice: productData.originalPrice || productData.original_price || productData.price || 0,
        price: productData.price || 0,
        inStock: productData.inStock !== undefined ? productData.inStock : (productData.in_stock !== undefined ? productData.in_stock : true),
        benefits: benefits,
        article: article,
        rating: productData.rating || 0,
        reviews: productData.reviews || 0,
        category: productData.category || '',
        description: productData.description || '',
        name: productData.name || 'Sản phẩm',
        image: productData.image || '/images/placeholder.svg'
      }
    } catch (e) {
      console.error('Error normalizing product:', e)
      return null
    }
  }

  // Normalize product data
  const normalizedProduct = normalizeProduct(product)

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await productsAPI.getById(id)
        
        if (response && response.success && response.data) {
          setProduct(response.data)
          
          // Fetch related products
          if (response.data.category) {
            try {
              const relatedResponse = await productsAPI.getAll({ 
                category: response.data.category,
                limit: 5 
              })
              if (relatedResponse.success && relatedResponse.data) {
                // Filter out current product
                const filtered = relatedResponse.data
                  .filter((p) => p.id !== response.data.id)
                  .slice(0, 4)
                setRelatedProducts(filtered)
              }
            } catch (err) {
              console.error('Error fetching related products:', err)
            }
          }
        } else {
          throw new Error('Product not found')
        }
      } catch (err) {
        console.error('Error fetching product:', err)
        console.error('Error details:', {
          message: err.message,
          stack: err.stack,
          id: id
        })
        setError(err.message || 'Không thể tải sản phẩm. Vui lòng thử lại sau.')
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  // Update document title
  useEffect(() => {
    if (normalizedProduct && normalizedProduct.name) {
      document.title = `${normalizedProduct.name} | Yến Sào`
      const desc = document.querySelector('meta[name="description"]')
      if (desc) {
        desc.setAttribute('content', normalizedProduct.description || '')
      } else {
        const meta = document.createElement('meta')
        meta.name = 'description'
        meta.content = normalizedProduct.description || ''
        document.head.appendChild(meta)
      }
    }
    return () => {
      document.title = 'Yến Sào - Yến Sào Chất Lượng Cao 100% Tự Nhiên'
    }
  }, [normalizedProduct?.name, normalizedProduct?.description])

  const formatPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(price)

  if (loading) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className="container" style={{ textAlign: 'center', padding: '40px' }}>
            <p>Đang tải sản phẩm...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (error || !product || !normalizedProduct) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className="container" style={{ textAlign: 'center', padding: '40px' }}>
            <h2>Sản phẩm không tồn tại</h2>
            <p>{error || 'Không tìm thấy sản phẩm'}</p>
            <p>Quay lại <Link to="/products">danh sách sản phẩm</Link> hoặc <Link to="/">trang chủ</Link></p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const renderStars = (rating) => {
    if (!rating || rating === 0) return null
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

  // Safety check - if normalizedProduct is null, show error
  if (!normalizedProduct) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className="container" style={{ textAlign: 'center', padding: '40px' }}>
            <h2>Sản phẩm không tồn tại</h2>
            <p>Không thể tải thông tin sản phẩm</p>
            <p>Quay lại <Link to="/products">danh sách sản phẩm</Link> hoặc <Link to="/">trang chủ</Link></p>
          </div>
        </main>
        <Footer />
      </>
    )
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
                  <img 
                    src={normalizedProduct.image || '/images/placeholder.svg'} 
                    alt={normalizedProduct.name || 'Sản phẩm'}
                    onError={(e) => {
                      e.target.src = '/images/placeholder.svg'
                    }}
                  />
                  {!normalizedProduct.inStock && (
                    <div className={styles.outOfStock}>Hết hàng</div>
                  )}
                </div>
              </div>
              <div className={styles.infoCol}>
                <div className={styles.breadcrumb}>
                  <Link to="/products">Sản phẩm</Link> / <span>{normalizedProduct.name || 'Sản phẩm'}</span>
                </div>
                <h1>{normalizedProduct.name || 'Sản phẩm'}</h1>
                
                {normalizedProduct.rating && (
                  <div className={styles.ratingSection}>
                    <div className={styles.rating}>
                      {renderStars(normalizedProduct.rating)}
                      <span className={styles.ratingValue}>{normalizedProduct.rating}</span>
                    </div>
                    <span className={styles.reviews}>({normalizedProduct.reviews || 0} đánh giá)</span>
                  </div>
                )}

                <p className={styles.category}>{normalizedProduct.category}</p>
                
                <div className={styles.pricing}>
                  <div className={styles.price}>{formatPrice(normalizedProduct.price || 0)}</div>
                  {normalizedProduct.originalPrice && normalizedProduct.originalPrice > normalizedProduct.price && (
                    <>
                      <div className={styles.original}>{formatPrice(normalizedProduct.originalPrice)}</div>
                      <div className={styles.discount}>
                        -{Math.round((1 - normalizedProduct.price / normalizedProduct.originalPrice) * 100)}%
                      </div>
                    </>
                  )}
                </div>

                <p className={styles.description}>{normalizedProduct.description}</p>

                {normalizedProduct.benefits && normalizedProduct.benefits.length > 0 && (
                  <div className={styles.benefitsSection}>
                    <h3>Lợi ích sản phẩm</h3>
                    <ul className={styles.benefits}>
                      {normalizedProduct.benefits.map((b, i) => (
                        <li key={i}>
                          <span className={styles.checkIcon}>✓</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className={styles.actions}>
                  <button 
                    className={styles.buy} 
                    onClick={() => addItem(normalizedProduct)} 
                    disabled={!normalizedProduct.inStock}
                  >
                    {normalizedProduct.inStock ? '🛒 Thêm vào giỏ hàng' : 'Hết hàng'}
                  </button>
                  <Link to="/products" className={styles.back}>← Quay về danh sách</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

                {normalizedProduct.article && normalizedProduct.article.title && (
          <section className={styles.articleSection}>
            <div className="container">
              <div className={styles.articleContent}>
                <h2 className={styles.articleTitle}>{normalizedProduct.article.title}</h2>
                <div className={styles.articleBody}>
                  {normalizedProduct.article.content && Array.isArray(normalizedProduct.article.content) && normalizedProduct.article.content.map((paragraph, index) => (
                    <p key={index} className={styles.articleParagraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      
        {relatedProducts.length > 0 && (
          <section className={styles.related}>
            <div className="container">
              <h2 className={styles.relatedTitle}>Sản phẩm liên quan</h2>
              <div className={styles.relatedGrid}>
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}

export default ProductDetail
