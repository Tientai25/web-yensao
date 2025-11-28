import { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import styles from '../styles/Cart.module.css'
import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Cart = () => {
  const { items, removeItem, updateQty, clear, coupon, applyCoupon, removeCoupon, getTotal } = useCart()

  const formatPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(price)

  const totals = getTotal()

  const [code, setCode] = useState('')
  const [couponMsg, setCouponMsg] = useState(null)

  const handleApply = () => {
    const res = applyCoupon(code)
    setCouponMsg(res.message)
  }

  const handleRemoveCoupon = () => {
    removeCoupon()
    setCouponMsg('Đã xóa mã giảm giá')
    setCode('')
  }

  return (
    <>
      <Header />
      <main>
        <section className={styles.cart}>
          <div className="container">
            <h2 className={styles.title}>Giỏ Hàng</h2>

            {items.length === 0 ? (
              <div className={styles.empty}>
                <img src="/images/og-image.jpg" alt="Giỏ hàng trống" />
                <h3>Giỏ hàng của bạn đang trống</h3>
                <p>Thêm sản phẩm yêu thích vào giỏ để xem ở đây.</p>
                <Link to="/" className={styles.cta}>Tiếp tục mua sắm</Link>
              </div>
            ) : (
              <div className={styles.grid}>
                <div className={styles.items}>
                  {items.map((it) => (
                    <div key={it.id} className={styles.item}>
                      <img src={it.image} alt={it.name} />
                      <div className={styles.info}>
                        <h4>{it.name}</h4>
                        <div className={styles.controls}>
                          <button onClick={() => updateQty(it.id, Math.max(1, it.qty - 1))}>-</button>
                          <span className={styles.qty}>{it.qty}</span>
                          <button onClick={() => updateQty(it.id, it.qty + 1)}>+</button>
                        </div>
                        <div className={styles.price}>{formatPrice(it.price * it.qty)}</div>
                        <button className={styles.remove} onClick={() => removeItem(it.id)}>Xóa</button>
                      </div>
                    </div>
                  ))}
                </div>

                <aside className={styles.summary}>
                  <h3>Tổng đơn</h3>

                  <div className={styles.couponBlock}>
                    {!coupon ? (
                      <>
                        <input className={styles.couponInput} value={code} onChange={(e) => setCode(e.target.value)} placeholder="Mã giảm giá" />
                        <button className={styles.apply} onClick={handleApply}>Áp dụng</button>
                      </>
                    ) : (
                      <div className={styles.couponApplied}>
                        <strong>Mã: {coupon}</strong>
                        <button className={styles.removeCoupon} onClick={handleRemoveCoupon}>Xóa</button>
                      </div>
                    )}
                    {couponMsg && <div className={styles.couponMsg}>{couponMsg}</div>}
                  </div>

                  <div className={styles.breakdown}>
                    <div className={styles.row}><span>Tạm tính</span><span>{formatPrice(totals.subtotal)}</span></div>
                    <div className={styles.row}><span>Giảm giá</span><span>-{formatPrice(totals.discount)}</span></div>
                    <div className={styles.row}><span>Phí vận chuyển</span><span>{totals.shipping === 0 ? 'Miễn phí' : formatPrice(totals.shipping)}</span></div>
                    <div className={styles.row}><span>Thuế</span><span>{formatPrice(totals.tax)}</span></div>
                    <div className={styles.rowTotal}><strong>Tổng cộng</strong><strong>{formatPrice(totals.total)}</strong></div>
                  </div>

                  <Link to="/checkout" className={styles.checkout}>Tiến hành thanh toán</Link>
                  <button className={styles.clear} onClick={clear}>Xóa giỏ hàng</button>
                </aside>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Cart
