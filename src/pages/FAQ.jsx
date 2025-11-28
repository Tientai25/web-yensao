import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/FAQ.module.css'

const FAQPage = () => {
  const [expandedId, setExpandedId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredFaqs, setFilteredFaqs] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('Tất Cả')

  const faqs = [
    {
      id: 1,
      category: 'Sản Phẩm',
      question: 'Yến sào là gì?',
      answer: 'Yến sào là tổ được chim Yến xây dựng từ nước bọt của chúng. Nó được coi là một thực phẩm bổ dưỡng quý giá trong y học cổ truyền Á Đông, đặc biệt ở Việt Nam và Trung Quốc.'
    },
    {
      id: 2,
      category: 'Sản Phẩm',
      question: 'Yến sào có những loại nào?',
      answer: 'Chúng tôi cung cấp 6 loại yến sào chính: Yến Huyết (yến đỏ), Yến Trắng, Yến Vàng, Tổ Yến nguyên, Yến Lá Sơn, và các sản phẩm VIP đặc biệt. Mỗi loại có lợi ích và giá trị dinh dưỡng khác nhau.'
    },
    {
      id: 3,
      category: 'Sản Phẩm',
      question: 'Yến sào có an toàn không?',
      answer: 'Có. Tất cả sản phẩm của chúng tôi đều được kiểm định chất lượng nghiêm ngặt, không chứa tạp chất hay hóa chất độc hại. Chúng tôi cam kết 100% tự nhiên và an toàn cho sức khỏe.'
    },
    {
      id: 4,
      category: 'Lợi Ích',
      question: 'Yến sào có lợi ích gì?',
      answer: 'Yến sào có nhiều lợi ích: tăng cường miễn dịch, cải thiện da, giúp phổi khỏe mạnh, tăng năng lượng, hỗ trợ tiêu hóa, và cân bằng cơ thể. Nó đặc biệt tốt cho trẻ em, phụ nữ và người già.'
    },
    {
      id: 5,
      category: 'Lợi Ích',
      question: 'Bao lâu thì thấy hiệu quả?',
      answer: 'Thông thường, bạn sẽ bắt đầu cảm thấy các lợi ích sau 2-4 tuần sử dụng thường xuyên. Để đạt kết quả tốt nhất, nên dùng liên tục trong 2-3 tháng.'
    },
    {
      id: 6,
      category: 'Cách Dùng',
      question: 'Cách ăn yến sào như thế nào?',
      answer: 'Cách truyền thống: Ngâm yến sào trong nước ấm 30 phút, sau đó hầm cùng nước lạnh trong 30-45 phút. Có thể thêm Rock Sugar, hạt Goji hay các gia vị khác để tăng hương vị. Uống nước hoặc ăn yến khi còn ấm.'
    },
    {
      id: 7,
      category: 'Cách Dùng',
      question: 'Nên ăn bao nhiêu yến sào mỗi ngày?',
      answer: 'Liều lượng khuyến nghị: người lớn 3-5g/ngày, trẻ em 1-3g/ngày. Tùy vào tình trạng sức khỏe và mục đích, bạn có thể tăng giảm liều lượng. Tốt nhất nên tư vấn với thầy thuốc.'
    },
    {
      id: 8,
      category: 'Cách Dùng',
      question: 'Thời gian tốt nhất để ăn yến sào là khi nào?',
      answer: 'Thời gian tốt nhất là sáng sớm (6-8 giờ) hoặc tối (trước khi ngủ). Không nên ăn sau bữa ăn thứ ba vì có thể gây khó tiêu. Nên uống khi dạ dày còn trống.'
    },
    {
      id: 9,
      category: 'Bảo Quản',
      question: 'Cách bảo quản yến sào?',
      answer: 'Bảo quản trong nơi khô ráo, thoáng mát, nhiệt độ 20-25°C. Tránh ánh sáng trực tiếp và độ ẩm cao. Sau khi ngâm nước, yến sào phải được dùng trong vòng 4-6 giờ. Có thể bảo quản trong tủ lạnh tối đa 3 ngày.'
    },
    {
      id: 10,
      category: 'Bảo Quản',
      question: 'Yến sào có bảo hành bao lâu?',
      answer: 'Chúng tôi bảo hành 2 năm từ ngày mua hàng. Nếu phát hiện chất lượng kém hoặc hỏng hóc, vui lòng liên hệ chúng tôi ngay để được thay thế hoặc hoàn tiền.'
    },
    {
      id: 11,
      category: 'Giao Hàng',
      question: 'Giao hàng mất bao lâu?',
      answer: 'Chúng tôi giao hàng miễn phí toàn quốc trong 2-3 ngày làm việc. Với các tỉnh xa, có thể mất 3-5 ngày. Bạn sẽ nhận được mã vận chuyển để theo dõi.'
    },
    {
      id: 12,
      category: 'Giao Hàng',
      question: 'Có hỗ trợ đổi trả không?',
      answer: 'Có. Nếu sản phẩm bị hỏng hoặc không đạt chất lượng, bạn có thể đổi trả miễn phí trong vòng 7 ngày kể từ khi nhận hàng. Chúng tôi cũng hỗ trợ hoàn tiền 100% nếu không hài lòng.'
    },
    {
      id: 13,
      category: 'Thanh Toán',
      question: 'Có những cách thanh toán nào?',
      answer: 'Chúng tôi hỗ trợ 2 cách thanh toán: (1) Thanh toán qua Ngân hàng (chuyển khoản trực tiếp), (2) Thanh toán khi nhận hàng (COD). Không có phí giao dịch thêm.'
    },
    {
      id: 14,
      category: 'Thanh Toán',
      question: 'Thanh toán qua ngân hàng có an toàn không?',
      answer: 'Hoàn toàn an toàn. Chúng tôi sử dụng hệ thống thanh toán được mã hóa SSL 256-bit. Thông tin tài khoản và dữ liệu cá nhân của bạn được bảo vệ tuyệt đối.'
    },
    {
      id: 15,
      category: 'Khác',
      question: 'Làm sao để liên hệ với chúng tôi?',
      answer: 'Bạn có thể liên hệ qua: Hotline 1900-XXXX-XXXX, Email: contact@yensao.vn, hoặc Chat trực tiếp trên website. Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp bạn 24/7.'
    }
  ]

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
    // Initialize with all faqs
    setFilteredFaqs(faqs)
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredFaqs(faqs)
    } else {
      const query = searchQuery.toLowerCase()
      setFilteredFaqs(
        faqs.filter(faq =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query) ||
          faq.category.toLowerCase().includes(query)
        )
      )
    }
  }, [searchQuery])

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category)
    if (category === 'Tất Cả') {
      setFilteredFaqs(faqs)
    } else {
      setFilteredFaqs(faqs.filter(faq => faq.category === category))
    }
  }

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const categories = ['Tất Cả', ...new Set(faqs.map(f => f.category))]

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
                {filteredFaqs.length > 0 ? (
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
                            {faq.additionalInfo && (
                              <div className={styles.additionalInfo}>
                                <p>{faq.additionalInfo}</p>
                              </div>
                            )}
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
                        setSearchQuery('');
                        setSelectedCategory('Tất Cả');
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
