import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useCart } from '../contexts/CartContext'
import { ordersAPI } from '../utils/api'
import cartStyles from '../styles/Cart.module.css'
import styles from '../styles/Checkout.module.css'
import { 
  FaCreditCard, 
  FaMoneyBillWave, 
  FaMobileAlt, 
  FaWallet, 
  FaBuilding,
  FaCheckCircle,
  FaLock,
  FaShippingFast
} from 'react-icons/fa'

const Checkout = () => {
  const { items, getTotal, clear } = useCart()
  const totals = getTotal()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const navigate = useNavigate()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const paymentMethods = [
    {
      id: 'cod',
      name: 'Thanh toán khi nhận hàng',
      description: 'Thanh toán bằng tiền mặt khi nhận hàng',
      icon: FaMoneyBillWave,
      color: '#10b981'
    },
    {
      id: 'momo',
      name: 'Ví MoMo',
      description: 'Thanh toán qua ứng dụng MoMo',
      icon: FaMobileAlt,
      color: '#a855f7'
    },
    {
      id: 'zalopay',
      name: 'ZaloPay',
      description: 'Thanh toán qua ZaloPay',
      icon: FaWallet,
      color: '#3b82f6'
    },
    {
      id: 'vnpay',
      name: 'VNPay',
      description: 'Thanh toán qua VNPay',
      icon: FaCreditCard,
      color: '#ef4444'
    },
    {
      id: 'bank',
      name: 'Chuyển khoản ngân hàng',
      description: 'Chuyển khoản qua ngân hàng',
      icon: FaBuilding,
      color: '#f59e0b'
    }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    // Validation
    if (!name.trim()) {
      setError('Vui lòng nhập họ và tên')
      setIsSubmitting(false)
      return
    }
    if (!phone.trim()) {
      setError('Vui lòng nhập số điện thoại')
      setIsSubmitting(false)
      return
    }
    if (!address.trim()) {
      setError('Vui lòng nhập địa chỉ giao hàng')
      setIsSubmitting(false)
      return
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Email không hợp lệ')
      setIsSubmitting(false)
      return
    }

    try {
      // Tạo order data để gửi lên backend
      const orderData = {
        name,
        email: email || null,
        phone,
        address,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.qty,
          image: item.image
        })),
        totals,
        paymentMethod: paymentMethod.toUpperCase(),
        coupon: null
      }

      // Gửi lên backend API để lưu vào MySQL
      const response = await ordersAPI.create(orderData)

      if (response.success) {
        // Lưu vào localStorage để hiển thị ở thank-you page
        try {
          localStorage.setItem('last_order', JSON.stringify(response.data))
        } catch (e) {}

        // Xóa giỏ hàng
        clear()

        // Chuyển đến trang thank-you hoặc payment gateway
        if (paymentMethod === 'bank' || paymentMethod === 'momo' || paymentMethod === 'zalopay' || paymentMethod === 'vnpay') {
          navigate('/bank-redirect', { state: { paymentMethod } })
        } else {
          navigate(`/thank-you?orderId=${response.data.id}`)
        }
      } else {
        throw new Error(response.message || 'Failed to create order')
      }
    } catch (error) {
      console.error('Error creating order:', error)
      setError(error.message || 'Đã có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className={styles.emptyCart}>
          <div className="container">
            <div className={styles.emptyMessage}>
              <FaShippingFast size={64} />
              <h2>Giỏ hàng trống</h2>
              <p>Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className={styles.checkoutWrap}>
        <div className="container">
          <div className={styles.checkoutHeader}>
            <h1>Thanh Toán</h1>
            <p className={styles.subtitle}>Hoàn tất đơn hàng của bạn</p>
          </div>

          <div className={styles.checkoutGrid}>
            <div className={styles.checkoutForm}>
              <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>
                  <FaShippingFast className={styles.sectionIcon} />
                  Thông tin giao hàng
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label className={styles.label}>
                        Họ và tên <span className={styles.required}>*</span>
                      </label>
                      <input 
                        className={styles.input} 
                        required 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập họ và tên"
                      />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>
                        Số điện thoại <span className={styles.required}>*</span>
                      </label>
                      <input 
                        className={styles.input} 
                        required 
                        type="tel"
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Nhập số điện thoại"
                      />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>
                      Email <span className={styles.optional}>(tùy chọn)</span>
                    </label>
                    <input 
                      className={styles.input} 
                      type="email"
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Nhập email để nhận thông báo"
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>
                      Địa chỉ giao hàng <span className={styles.required}>*</span>
                    </label>
                    <textarea 
                      className={styles.textarea} 
                      required 
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Nhập địa chỉ chi tiết (số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố)"
                      rows={4}
                    />
                  </div>

                  <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>
                      <FaCreditCard className={styles.sectionIcon} />
                      Phương thức thanh toán
                    </h2>
                    <div className={styles.paymentMethods}>
                      {paymentMethods.map((method) => {
                        const Icon = method.icon
                        return (
                          <label 
                            key={method.id}
                            className={`${styles.paymentItem} ${paymentMethod === method.id ? styles.paymentItemActive : ''}`}
                            style={paymentMethod === method.id ? { borderColor: method.color } : {}}
                          >
                            <input 
                              type="radio" 
                              name="payment" 
                              value={method.id}
                              checked={paymentMethod === method.id} 
                              onChange={() => setPaymentMethod(method.id)}
                              className={styles.radioInput}
                            />
                            <div className={styles.paymentIcon} style={{ color: method.color }}>
                              <Icon size={24} />
                            </div>
                            <div className={styles.paymentInfo}>
                              <div className={styles.paymentName}>{method.name}</div>
                              <div className={styles.paymentDescription}>{method.description}</div>
                            </div>
                            {paymentMethod === method.id && (
                              <FaCheckCircle className={styles.checkIcon} style={{ color: method.color }} />
                            )}
                          </label>
                        )
                      })}
                    </div>
                  </div>

                  {error && (
                    <div className={styles.errorMessage}>
                      <span className={styles.errorIcon}>⚠️</span>
                      {error}
                    </div>
                  )}

                  <div className={styles.submitWrapper}>
                    <button 
                      type="submit" 
                      className={styles.checkoutBtn}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className={styles.spinner}></span>
                          Đang xử lý...
                        </>
                      ) : (
                        <>
                          <FaLock />
                          Hoàn tất đơn hàng
                        </>
                      )}
                    </button>
                    <p className={styles.securityNote}>
                      <FaLock size={14} />
                      Thông tin của bạn được bảo mật và mã hóa
                    </p>
                  </div>
                </form>
              </div>
            </div>

            <div className={styles.summaryBox}>
              <div className={styles.summaryCard}>
                <h3 className={styles.summaryHeader}>Đơn hàng của bạn</h3>
                <div className={styles.summaryItems}>
                  {items.map(it => (
                    <div key={it.id} className={styles.summaryItem}>
                      <div className={styles.itemImage}>
                        <img src={it.image} alt={it.name} />
                        <span className={styles.itemQuantity}>{it.qty}</span>
                      </div>
                      <div className={styles.itemInfo}>
                        <div className={styles.itemName}>{it.name}</div>
                        <div className={styles.itemPrice}>
                          {new Intl.NumberFormat('vi-VN', { 
                            style: 'currency', 
                            currency: 'VND', 
                            minimumFractionDigits: 0 
                          }).format(it.price * it.qty)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.summaryBreakdown}>
                  <div className={styles.breakdownRow}>
                    <span>Tạm tính</span>
                    <span>{new Intl.NumberFormat('vi-VN', { 
                      style: 'currency', 
                      currency: 'VND', 
                      minimumFractionDigits: 0 
                    }).format(totals.subtotal)}</span>
                  </div>
                  <div className={styles.breakdownRow}>
                    <span>Giảm giá</span>
                    <span className={styles.discount}>-{new Intl.NumberFormat('vi-VN', { 
                      style: 'currency', 
                      currency: 'VND', 
                      minimumFractionDigits: 0 
                    }).format(totals.discount)}</span>
                  </div>
                  <div className={styles.breakdownRow}>
                    <span>Phí vận chuyển</span>
                    <span>{totals.shipping === 0 ? (
                      <span className={styles.free}>Miễn phí</span>
                    ) : new Intl.NumberFormat('vi-VN', { 
                      style: 'currency', 
                      currency: 'VND', 
                      minimumFractionDigits: 0 
                    }).format(totals.shipping)}</span>
                  </div>
                  <div className={styles.breakdownRow}>
                    <span>Thuế VAT</span>
                    <span>{new Intl.NumberFormat('vi-VN', { 
                      style: 'currency', 
                      currency: 'VND', 
                      minimumFractionDigits: 0 
                    }).format(totals.tax)}</span>
                  </div>
                  <div className={styles.breakdownTotal}>
                    <span>Tổng cộng</span>
                    <span className={styles.totalAmount}>
                      {new Intl.NumberFormat('vi-VN', { 
                        style: 'currency', 
                        currency: 'VND', 
                        minimumFractionDigits: 0 
                      }).format(totals.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Checkout
