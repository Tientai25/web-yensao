import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/About.module.css'

const About = () => {
  useEffect(() => {
    document.title = 'Về Chúng Tôi | Yến Sào'
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', 'Tìm hiểu về Yến Sào - Cung cấp yến sào chất lượng cao 100% tự nhiên từ những tổ yến tốt nhất.')
    else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = 'Tìm hiểu về Yến Sào - Cung cấp yến sào chất lượng cao 100% tự nhiên từ những tổ yến tốt nhất.'
      document.head.appendChild(meta)
    }
  }, [])

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1>Về Chúng Tôi</h1>
              <p>Cung cấp yến sào chất lượng cao 100% tự nhiên cho sức khỏe của bạn</p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className={styles.story}>
          <div className="container">
            <div className={styles.storyGrid}>
              <div className={styles.storyContent}>
                <h2>Câu Chuyện Của Chúng Tôi</h2>
                <p>
                  Yến Sào được thành lập với sứ mệnh mang những sản phẩm yến sào tự nhiên, chất lượng cao nhất đến với mọi gia đình Việt Nam. Chúng tôi tin rằng sức khỏe là tài sản quý báu nhất, và yến sào là một trong những thực phẩm bổ dưỡng tuyệt vời của thiên nhiên.
                </p>
                <p>
                  Với hơn 15 năm kinh nghiệm trong ngành yến sào, chúng tôi đã xây dựng mối quan hệ chặt chẽ với những trang trại yến sào hàng đầu tại các vùng núi cao, nơi chim yến sinh sản tự nhiên. Mỗi sản phẩm đều trải qua quy trình kiểm định chất lượng nghiêm ngặt trước khi gửi đến tay khách hàng.
                </p>
                <p>
                  Chúng tôi không chỉ bán sản phẩm, mà còn chia sẻ kiến thức về lợi ích của yến sào và cách sử dụng hiệu quả để đạt được kết quả tốt nhất cho sức khỏe của bạn.
                </p>
              </div>
              <div className={styles.storyImage}>
                <img src="/images/og-image.jpg" alt="Yến sào tự nhiên" />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className={styles.missionVision}>
          <div className="container">
            <div className={styles.mvGrid}>
              <div className={styles.mvCard}>
                <div className={styles.mvIcon}>🎯</div>
                <h3>Sứ Mệnh</h3>
                <p>
                  Cung cấp yến sào chất lượng cao, tự nhiên 100% để nâng cao sức khỏe và chất lượng sống của mọi người, đặc biệt là các gia đình Việt.
                </p>
              </div>
              <div className={styles.mvCard}>
                <div className={styles.mvIcon}>✨</div>
                <h3>Tầm Nhìn</h3>
                <p>
                  Trở thành thương hiệu yến sào hàng đầu được tin tưởng bởi hàng triệu gia đình, nổi tiếng không chỉ trong nước mà còn trên thế giới.
                </p>
              </div>
              <div className={styles.mvCard}>
                <div className={styles.mvIcon}>💎</div>
                <h3>Giá Trị Cốt Lõi</h3>
                <p>
                  Chất lượng, tự nhiên, tin tưởng, và chăm sóc khách hàng. Mỗi quyết định của chúng tôi đều xoay quanh những giá trị này.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className={styles.whyChoose}>
          <div className="container">
            <h2>Tại Sao Chọn Chúng Tôi?</h2>
            <div className={styles.reasonsGrid}>
              <div className={styles.reasonCard}>
                <div className={styles.reasonIcon}>🏆</div>
                <h4>Chất Lượng Tốt Nhất</h4>
                <p>Toàn bộ yến sào đều được kiểm định chặt chẽ, không trộn tạp chất, 100% tự nhiên.</p>
              </div>
              <div className={styles.reasonCard}>
                <div className={styles.reasonIcon}>🤝</div>
                <h4>Nguồn Gốc Rõ Ràng</h4>
                <p>Truy xuất được nguồn gốc từng sản phẩm, hợp tác trực tiếp với các trang trại uy tín.</p>
              </div>
              <div className={styles.reasonCard}>
                <div className={styles.reasonIcon}>🚚</div>
                <h4>Giao Hàng Nhanh</h4>
                <p>Vận chuyển an toàn, nhanh chóng tới tay khách hàng trong toàn nước.</p>
              </div>
              <div className={styles.reasonCard}>
                <div className={styles.reasonIcon}>💬</div>
                <h4>Hỗ Trợ 24/7</h4>
                <p>Đội ngũ nhân viên tư vấn sẵn sàng giúp bạn chọn lựa sản phẩm phù hợp.</p>
              </div>
              <div className={styles.reasonCard}>
                <div className={styles.reasonIcon}>✅</div>
                <h4>Bảo Hành Chất Lượng</h4>
                <p>Nếu không hài lòng, chúng tôi hoàn tiền 100% hoặc đổi sản phẩm khác.</p>
              </div>
              <div className={styles.reasonCard}>
                <div className={styles.reasonIcon}>🌿</div>
                <h4>Thân Thiện Môi Trường</h4>
                <p>Cam kết bảo vệ thiên nhiên và phát triển bền vững trong kinh doanh.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className={styles.team}>
          <div className="container">
            <h2>Đội Ngũ Chúng Tôi</h2>
            <p className={styles.teamIntro}>Được lãnh đạo bởi những chuyên gia có kinh nghiệm hơn 15 năm trong ngành yến sào.</p>
            <div className={styles.teamGrid}>
              <div className={styles.teamMember}>
                <img src="/images/product-1.svg" alt="Founder" />
                <h4>Nguyễn Văn A</h4>
                <p>Sáng Lập Viên & Giám Đốc</p>
                <span className={styles.bio}>Chuyên gia yến sào với 15+ năm kinh nghiệm, đam mê mang sản phẩm tự nhiên tốt cho sức khỏe của mọi người.</span>
              </div>
              <div className={styles.teamMember}>
                <img src="/images/product-2.svg" alt="Manager" />
                <h4>Trần Thị B</h4>
                <p>Trưởng Phòng Chất Lượng</p>
                <span className={styles.bio}>Đảm bảo mỗi sản phẩm đều đạt chuẩn cao nhất trước khi được gửi đến khách hàng.</span>
              </div>
              <div className={styles.teamMember}>
                <img src="/images/product-3.svg" alt="Specialist" />
                <h4>Lê Văn C</h4>
                <p>Chuyên Gia Tư Vấn</p>
                <span className={styles.bio}>Cung cấp tư vấn chuyên sâu về lợi ích yến sào và cách sử dụng tối ưu.</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.cta}>
          <div className="container">
            <h2>Hãy Tham Gia Với Chúng Tôi</h2>
            <p>Khám phá bộ sưu tập yến sào chất lượng cao và trải nghiệm sự khác biệt.</p>
            <a href="/products" className={styles.ctaButton}>Xem Sản Phẩm Ngay</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default About
