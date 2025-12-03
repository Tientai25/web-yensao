import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { 
  FaCheckCircle, 
  FaBox, 
  FaShippingFast, 
  FaHome,
  FaShoppingBag,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa'
import styles from '../styles/ThankYou.module.css'

const ThankYou = () => {
  const location = useLocation()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get order from location state (passed from Checkout)
    if (location.state?.order) {
      setOrder(location.state.order)
    }
    setLoading(false)
  }, [location])

  if (loading) {
    return (
      <>
        <Header />
        <main className={styles.loading}>
          <div className="container">
            <div className={styles.loadingContent}>
              <div className={styles.spinner}></div>
              <p>Đang tải thông tin đơn hàng...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!order) {
    return (
      <>
        <Header />
        <main className={styles.notFound}>
          <div className="container">
            <div className={styles.notFoundContent}>
              <FaBox size={64} />
              <h2>Không tìm thấy đơn hàng</h2>
              <p>Đơn hàng không tồn tại hoặc đã hết hạn.</p>
              <Link to="/" className={styles.homeButton}>
                <FaHome />
                Về trang chủ
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const orderNumber = order.order_number || `ORD-${order.id}`
  const isPaid = order.paid || order.payment_method === 'COD'

  return (
    <>
      <Header />
      <main className={styles.thankYou}>
        <div className="container">
          <div className={styles.content}>
            {/* Success Icon */}
            <div className={styles.successIcon}>
              <FaCheckCircle />
            </div>

            {/* Header */}
            <h1 className={styles.title}>Cảm ơn bạn đã đặt hàng!</h1>
            <p className={styles.subtitle}>
              Đơn hàng của bạn đã được tiếp nhận và đang được xử lý
            </p>

            {/* Order Info Card */}
            <div className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <FaShoppingBag className={styles.orderIcon} />
                <div>
                  <h2 className={styles.orderTitle}>Thông tin đơn hàng</h2>
                  <p className={styles.orderNumber}>Mã đơn: <strong>{orderNumber}</strong></p>
                </div>
              </div>

              {/* Payment Status */}
              <div className={styles.statusSection}>
                <div className={`${styles.statusBadge} ${isPaid ? styles.statusPaid : styles.statusPending}`}>
                  {isPaid ? (
                    <>
                      <FaCheckCircle />
                      <span>Đã thanh toán</span>
                    </>
                  ) : (
                    <>
                      <FaBox />
                      <span>Chờ thanh toán</span>
                    </>
                  )}
                </div>
                <p className={styles.statusText}>
                  {isPaid 
                    ? 'Đơn hàng của bạn đã được thanh toán thành công. Chúng tôi sẽ giao hàng trong thời gian sớm nhất.'
                    : 'Vui lòng thanh toán đơn hàng để chúng tôi có thể xử lý và giao hàng cho bạn.'}
                </p>
              </div>

              {/* Order Items */}
              <div className={styles.itemsSection}>
                <h3 className={styles.sectionTitle}>
                  <FaBox className={styles.sectionIcon} />
                  Sản phẩm đã đặt
                </h3>
                <div className={styles.itemsList}>
                  {order.items && order.items.map((it, index) => (
                    <div key={index} className={styles.orderItem}>
                      <div className={styles.itemImage}>
                        <img src={it.image || '/images/placeholder.svg'} alt={it.name} />
                        <span className={styles.itemQuantity}>{it.quantity || it.qty}</span>
                      </div>
                      <div className={styles.itemInfo}>
                        <div className={styles.itemName}>{it.name}</div>
                        <div className={styles.itemPrice}>
                          {new Intl.NumberFormat('vi-VN', { 
                            style: 'currency', 
                            currency: 'VND', 
                            minimumFractionDigits: 0 
                          }).format((it.price || 0) * (it.quantity || it.qty || 1))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              {order.totals && (
                <div className={styles.summarySection}>
                  <h3 className={styles.sectionTitle}>
                    <FaShippingFast className={styles.sectionIcon} />
                    Tóm tắt đơn hàng
                  </h3>
                  <div className={styles.summaryList}>
                    <div className={styles.summaryRow}>
                      <span>Tạm tính</span>
                      <span>{new Intl.NumberFormat('vi-VN', { 
                        style: 'currency', 
                        currency: 'VND', 
                        minimumFractionDigits: 0 
                      }).format(order.totals.subtotal || 0)}</span>
                    </div>
                    {order.totals.discount > 0 && (
                      <div className={styles.summaryRow}>
                        <span>Giảm giá</span>
                        <span className={styles.discount}>-{new Intl.NumberFormat('vi-VN', { 
                          style: 'currency', 
                          currency: 'VND', 
                          minimumFractionDigits: 0 
                        }).format(order.totals.discount || 0)}</span>
                      </div>
                    )}
                    <div className={styles.summaryRow}>
                      <span>Phí vận chuyển</span>
                      <span>{order.totals.shipping === 0 ? (
                        <span className={styles.free}>Miễn phí</span>
                      ) : new Intl.NumberFormat('vi-VN', { 
                        style: 'currency', 
                        currency: 'VND', 
                        minimumFractionDigits: 0 
                      }).format(order.totals.shipping || 0)}</span>
                    </div>
                    {order.totals.tax > 0 && (
                      <div className={styles.summaryRow}>
                        <span>Thuế VAT</span>
                        <span>{new Intl.NumberFormat('vi-VN', { 
                          style: 'currency', 
                          currency: 'VND', 
                          minimumFractionDigits: 0 
                        }).format(order.totals.tax || 0)}</span>
                      </div>
                    )}
                    <div className={styles.summaryTotal}>
                      <span>Tổng cộng</span>
                      <span className={styles.totalAmount}>
                        {new Intl.NumberFormat('vi-VN', { 
                          style: 'currency', 
                          currency: 'VND', 
                          minimumFractionDigits: 0 
                        }).format(order.totals.total || 0)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Delivery Info */}
              <div className={styles.deliverySection}>
                <h3 className={styles.sectionTitle}>
                  <FaShippingFast className={styles.sectionIcon} />
                  Thông tin giao hàng
                </h3>
                <div className={styles.deliveryInfo}>
                  <div className={styles.infoRow}>
                    <strong>Người nhận:</strong>
                    <span>{order.name}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <strong>Số điện thoại:</strong>
                    <span>
                      <FaPhone size={14} />
                      {order.phone}
                    </span>
                  </div>
                  {order.email && (
                    <div className={styles.infoRow}>
                      <strong>Email:</strong>
                      <span>
                        <FaEnvelope size={14} />
                        {order.email}
                      </span>
                    </div>
                  )}
                  <div className={styles.infoRow}>
                    <strong>Địa chỉ:</strong>
                    <span>{order.address}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <strong>Phương thức thanh toán:</strong>
                    <span className={styles.paymentMethod}>
                      {order.payment_method === 'COD' ? 'Thanh toán khi nhận hàng' :
                       order.payment_method === 'BANK' ? 'Chuyển khoản ngân hàng' :
                       order.payment_method === 'MOMO' ? 'Ví MoMo' :
                       order.payment_method === 'ZALOPAY' ? 'ZaloPay' :
                       order.payment_method === 'VNPAY' ? 'VNPay' :
                       order.payment_method}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              <Link to="/products" className={styles.continueButton}>
                <FaShoppingBag />
                Tiếp tục mua sắm
              </Link>
              <Link to="/" className={styles.homeButton}>
                <FaHome />
                Về trang chủ
              </Link>
            </div>

            {/* Support */}
            <div className={styles.supportBox}>
              <p className={styles.supportText}>
                <strong>Cần hỗ trợ?</strong> Liên hệ với chúng tôi qua email hoặc hotline để được hỗ trợ nhanh chóng.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ThankYou
