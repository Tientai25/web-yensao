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
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [selectedImage, setSelectedImage] = useState(0)
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

      // Fix image URL
      const imageUrl = productData.image?.startsWith('/uploads')
        ? `http://localhost:5000${productData.image}`
        : productData.image || '/images/placeholder.svg';

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
        image: imageUrl
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
                <div className={styles.imageGallery}>
                  <div className={styles.mainImage}>
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
                    <div className={styles.trustBadges}>
                      <span className={styles.badge}>✓ 100% Tự nhiên</span>
                      <span className={styles.badge}>✓ Chứng nhận ATTP</span>
                    </div>
                  </div>
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

                <div className={styles.quantitySection}>
                  <label>Số lượng:</label>
                  <div className={styles.quantityControls}>
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <span className={styles.quantity}>{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={quantity >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className={styles.actions}>
                  <button 
                    className={styles.buyNow} 
                    onClick={() => {
                      for(let i = 0; i < quantity; i++) {
                        addItem(normalizedProduct)
                      }
                    }} 
                    disabled={!normalizedProduct.inStock}
                  >
                    {normalizedProduct.inStock ? '🛒 Thêm vào giỏ hàng' : 'Hết hàng'}
                  </button>
                  <Link 
                    to="/cart" 
                    className={styles.buyInstant}
                    onClick={() => {
                      for(let i = 0; i < quantity; i++) {
                        addItem(normalizedProduct)
                      }
                    }}
                    style={!normalizedProduct.inStock ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                  >
                    ⚡ Mua ngay
                  </Link>
                </div>

                <div className={styles.guarantees}>
                  <div className={styles.guarantee}>
                    <span className={styles.icon}>🚚</span>
                    <span>Miễn phí vận chuyển đơn từ 500k</span>
                  </div>
                  <div className={styles.guarantee}>
                    <span className={styles.icon}>↩️</span>
                    <span>Đổi trả trong 7 ngày</span>
                  </div>
                  <div className={styles.guarantee}>
                    <span className={styles.icon}>🏆</span>
                    <span>Bảo hành chất lượng</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.detailTabs}>
          <div className="container">
            <div className={styles.tabNavigation}>
              <button 
                className={`${styles.tabButton} ${activeTab === 'description' ? styles.active : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Mô tả sản phẩm
              </button>
              <button 
                className={`${styles.tabButton} ${activeTab === 'benefits' ? styles.active : ''}`}
                onClick={() => setActiveTab('benefits')}
              >
                Công dụng
              </button>
              <button 
                className={`${styles.tabButton} ${activeTab === 'usage' ? styles.active : ''}`}
                onClick={() => setActiveTab('usage')}
              >
                Cách sử dụng
              </button>
              <button 
                className={`${styles.tabButton} ${activeTab === 'reviews' ? styles.active : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Đánh giá ({normalizedProduct.reviews || 0})
              </button>
            </div>

            <div className={styles.tabContent}>
              {activeTab === 'description' && (
                <div className={styles.tabPane}>
                  <p>{normalizedProduct.description}</p>
                  {normalizedProduct.article && normalizedProduct.article.content && Array.isArray(normalizedProduct.article.content) && normalizedProduct.article.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              )}
              
              {activeTab === 'benefits' && (
                <div className={styles.tabPane}>
                  {normalizedProduct.benefits && normalizedProduct.benefits.length > 0 ? (
                    <ul className={styles.benefitsList}>
                      {normalizedProduct.benefits.map((benefit, index) => (
                        <li key={index}>
                          <span className={styles.checkIcon}>✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Thông tin công dụng đang được cập nhật...</p>
                  )}
                </div>
              )}
              
              {activeTab === 'usage' && (
                <div className={styles.tabPane}>
                  <div className={styles.usageGuide}>
                    <h4>Cách chế biến yến sào:</h4>
                    <ol>
                      <li>Ngâm yến sào trong nước ấm khoảng 2-3 giờ</li>
                      <li>Nhặt sạch lông và tạp chất</li>
                      <li>Hầm cách thủy trong 30-45 phút</li>
                      <li>Thêm đường phèn hoặc mật ong theo khẩu vị</li>
                    </ol>
                    <h4>Liều lượng khuyến nghị:</h4>
                    <p>Người lớn: 3-5g/lần, 2-3 lần/tuần<br/>Trẻ em: 1-2g/lần, 2 lần/tuần</p>
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className={styles.tabPane}>
                  <div className={styles.reviewsSection}>
                    <div className={styles.reviewSummary}>
                      <div className={styles.averageRating}>
                        <span className={styles.ratingNumber}>{normalizedProduct.rating || 5}</span>
                        <div className={styles.stars}>
                          {renderStars(normalizedProduct.rating || 5)}
                        </div>
                        <span className={styles.totalReviews}>({normalizedProduct.reviews || 0} đánh giá)</span>
                      </div>
                    </div>
                    <div className={styles.reviewsList}>
                      <div className={styles.review}>
                        <div className={styles.reviewHeader}>
                          <span className={styles.reviewer}>Nguyễn Thị A</span>
                          <div className={styles.reviewStars}>{renderStars(5)}</div>
                        </div>
                        <p>Sản phẩm chất lượng tốt, đóng gói cẩn thận. Sẽ mua lại!</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      
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
