import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/FAQ.module.css'
import { faqsAPI } from '../utils/api.js'

const FAQPage = () => {
  const [expandedId, setExpandedId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredFaqs, setFilteredFaqs] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('Tất Cả')
  const [faqs, setFaqs] = useState([])
  const [categories, setCategories] = useState(['Tất Cả'])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch FAQs from API
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch FAQs and categories in parallel
        const [faqsResponse, categoriesResponse] = await Promise.all([
          faqsAPI.getAll({ active: 'true' }),
          faqsAPI.getCategories()
        ])

        if (faqsResponse.success && faqsResponse.data) {
          setFaqs(faqsResponse.data)
          setFilteredFaqs(faqsResponse.data)
        }

        if (categoriesResponse.success && categoriesResponse.data) {
          setCategories(['Tất Cả', ...categoriesResponse.data])
        }
      } catch (err) {
        console.error('Error fetching FAQs:', err)
        setError('Không thể tải câu hỏi thường gặp. Vui lòng thử lại sau.')
        // Set empty arrays on error
        setFaqs([])
        setFilteredFaqs([])
      } finally {
        setLoading(false)
      }
    }

    fetchFAQs()
  }, [])

  // Set document title and meta
  useEffect(() => {
    document.title = 'Câu Hỏi Thường Gặp | Yến Sào'
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', 'Tìm câu trả lời cho các câu hỏi thường gặp về yến sào, cách dùng, bảo quản, giao hàng và thanh toán.')
    else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = 'Tìm câu trả lời cho các câu hỏi thường gặp về yến sào, cách dùng, bảo quản, giao hàng và thanh toán.'
      document.head.appendChild(meta)
    }
  }, [])

  // Filter FAQs by search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      // If no search query, apply category filter only
      if (selectedCategory === 'Tất Cả') {
        setFilteredFaqs(faqs)
      } else {
        setFilteredFaqs(faqs.filter(faq => faq.category === selectedCategory))
      }
    } else {
      const query = searchQuery.toLowerCase()
      let filtered = faqs.filter(faq =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query)
      )
      
      // Apply category filter if not "Tất Cả"
      if (selectedCategory !== 'Tất Cả') {
        filtered = filtered.filter(faq => faq.category === selectedCategory)
      }
      
      setFilteredFaqs(filtered)
    }
  }, [searchQuery, selectedCategory, faqs])

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category)
  }

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <>
      <Header />
      <main className={styles.faqPage}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1>Câu Hỏi Thường Gặp</h1>
              <p>Tìm câu trả lời cho những thắc mắc của bạn về sản phẩm yến sào</p>
              
              {/* Search Bar */}
              <div className={styles.searchContainer}>
                <div className={styles.searchWrapper}>
                  <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Nhập từ khóa tìm kiếm..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  {searchQuery && (
                    <button 
                      className={styles.clearButton}
                      onClick={() => setSearchQuery('')}
                      aria-label="Xóa tìm kiếm"
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className={styles.mainContent}>
          <div className="container">
            <div className={styles.contentWrapper}>
              {/* Categories Sidebar */}
              <aside className={styles.sidebar}>
                <div className={styles.sidebarCard}>
                  <h3>Danh Mục</h3>
                  <nav className={styles.categoryNav}>
                    <ul>
                      {categories.map((category) => (
                        <li key={category}>
                          <button
                            className={`${styles.categoryButton} ${
                              selectedCategory === category ? styles.active : ''
                            }`}
                            onClick={() => handleCategoryFilter(category)}
                          >
                            {category}
                            {selectedCategory === category && (
                              <span className={styles.activeIndicator}></span>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
                
                <div className={styles.helpCard}>
                  <div className={styles.helpIcon}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <h4>Cần hỗ trợ?</h4>
                  <p>Đội ngũ của chúng tôi luôn sẵn sàng giúp đỡ bạn</p>
                  <a href="/lien-he" className={styles.helpButton}>
                    Liên hệ ngay
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </aside>

              {/* FAQ Items */}
              <div className={styles.faqContent}>
                {loading ? (
                  <div className={styles.loading}>
                    <div className={styles.loadingSpinner}></div>
                    <p>Đang tải câu hỏi...</p>
                  </div>
                ) : error ? (
                  <div className={styles.error}>
                    <div className={styles.errorIcon}>
                      <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                    </div>
                    <h3>Lỗi tải dữ liệu</h3>
                    <p>{error}</p>
                    <button 
                      className={styles.retryButton}
                      onClick={() => window.location.reload()}
                    >
                      Thử lại
                    </button>
                  </div>
                ) : filteredFaqs.length > 0 ? (
                  <div className={styles.faqList}>
                    {filteredFaqs.map((faq, index) => (
                      <div 
                        key={faq.id} 
                        className={`${styles.faqItem} ${expandedId === faq.id ? styles.active : ''}`}
                        style={{
                          '--delay': `${index * 0.05}s`,
                          '--index': index
                        }}
                      >
                        <div 
                          className={styles.faqHeader}
                          onClick={() => toggleExpanded(faq.id)}
                          role="button"
                          tabIndex="0"
                          onKeyDown={(e) => e.key === 'Enter' && toggleExpanded(faq.id)}
                        >
                          <div className={styles.faqIcon}>
                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="12" y1="8" x2="12" y2="16"></line>
                              <line x1="8" y1="12" x2="16" y2="12"></line>
                            </svg>
                          </div>
                          <h4 className={styles.question}>{faq.question}</h4>
                          <div className={styles.arrowIcon}>
                            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </div>
                        </div>
                        <div 
                          className={styles.faqBody}
                          style={{
                            maxHeight: expandedId === faq.id ? '500px' : '0',
                            padding: expandedId === faq.id ? '0 1.5rem 1.5rem 4rem' : '0 1.5rem 0 4rem'
                          }}
                        >
                          <div className={styles.answer}>
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noResults}>
                    <div className={styles.noResultsIcon}>
                      <svg viewBox="0 0 24 24" width="48" height="48" stroke="#d4af37" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                    </div>
                    <h3>Không tìm thấy câu hỏi phù hợp</h3>
                    <p>Không có câu hỏi nào khớp với từ khóa "{searchQuery}" trong danh mục đã chọn.</p>
                    <button 
                      className={styles.clearButton}
                      onClick={() => {
                        setSearchQuery('')
                        setSelectedCategory('Tất Cả')
                      }}
                    >
                      Xóa bộ lọc tìm kiếm
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default FAQPage
