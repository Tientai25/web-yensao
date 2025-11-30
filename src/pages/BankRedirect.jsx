import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaCreditCard, FaMobileAlt, FaWallet, FaBuilding, FaSpinner } from 'react-icons/fa'
import styles from '../styles/BankRedirect.module.css'

const BankRedirect = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [countdown, setCountdown] = useState(3)
  const paymentMethod = location.state?.paymentMethod || 'bank'

  const paymentMethods = {
    bank: { name: 'Ngân hàng', icon: FaBuilding, color: '#f59e0b' },
    momo: { name: 'MoMo', icon: FaMobileAlt, color: '#a855f7' },
    zalopay: { name: 'ZaloPay', icon: FaWallet, color: '#3b82f6' },
    vnpay: { name: 'VNPay', icon: FaCreditCard, color: '#ef4444' }
  }

  const currentMethod = paymentMethods[paymentMethod] || paymentMethods.bank
  const Icon = currentMethod.icon

  useEffect(() => {
    // Countdown
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Simulate payment processing
    const t = setTimeout(() => {
      try {
        const pending = localStorage.getItem('pending_order')
        if (pending) {
          const order = JSON.parse(pending)
          localStorage.setItem('last_order', JSON.stringify({ ...order, paid: true }))
          localStorage.removeItem('pending_order')
        }
      } catch (e) {}
      navigate('/thank-you')
    }, 3000)

    return () => {
      clearTimeout(t)
      clearInterval(countdownInterval)
    }
  }, [navigate])

  return (
    <>
      <Header />
      <main className={styles.bankRedirect}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.iconWrapper} style={{ color: currentMethod.color }}>
              <Icon size={64} />
              <div className={styles.spinner}>
                <FaSpinner />
              </div>
            </div>
            
            <h1 className={styles.title}>
              Đang chuyển đến cổng thanh toán {currentMethod.name}...
            </h1>
            
            <p className={styles.description}>
              Vui lòng đợi trong giây lát. Bạn sẽ được chuyển hướng tự động.
            </p>

            <div className={styles.countdown}>
              <div className={styles.countdownNumber}>{countdown}</div>
              <p>giây</p>
            </div>

            <div className={styles.progressBar}>
              <div className={styles.progressFill}></div>
            </div>

            <div className={styles.infoBox}>
              <p className={styles.infoText}>
                <strong>Lưu ý:</strong> Nếu trình duyệt không tự chuyển, vui lòng đợi hoặc quay lại sau.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default BankRedirect
