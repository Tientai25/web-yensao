import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useCart } from '../contexts/CartContext'
import styles from '../styles/Cart.module.css'

const Checkout = () => {
  const { items, getTotal, clear } = useCart()
  const totals = getTotal()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const navigate = useNavigate()

  const [paymentMethod, setPaymentMethod] = useState('bank')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (paymentMethod === 'bank') {
      handleBankPayment()
    } else {
      // cash on delivery or other
      const order = createOrder('COD')
      saveAndFinish(order)
    }
  }

  const createOrder = (method) => {
    const id = 'ORD-' + Date.now()
    const order = {
      id,
      name,
      address,
      phone,
      items,
      totals,
      paymentMethod: method,
      createdAt: new Date().toISOString(),
    }
    return order
  }

  const saveAndFinish = (order) => {
    try {
      localStorage.setItem('last_order', JSON.stringify(order))
    } catch (e) {}
    clear()
    navigate('/thank-you')
  }

  const handleBankPayment = () => {
    // Simulate redirect to bank payment gateway
    const order = createOrder('BANK')
    // Normally, you would POST to your server to create a signed request and redirect user to bank.
    // Here we simulate a short redirect and then a return to the site.
    try {
      localStorage.setItem('pending_order', JSON.stringify(order))
    } catch (e) {}
    // Show brief redirect screen then simulate bank callback
    navigate('/bank-redirect')
    // Simulated bank will 'callback' after a short delay — handled by /bank-redirect page
  }

  return (
    <>
      <Header />
      <main>
        <section className={styles.cart}>
          <div className="container">
            <h2 className={styles.title}>Thanh Toán</h2>
            <div className={styles.grid}>
              <form onSubmit={handleSubmit} style={{display:'grid', gap:'16px'}}>
                <label>
                  Họ và tên
                  <input required value={name} onChange={(e) => setName(e.target.value)} className={styles.couponInput} />
                </label>
                <label>
                  Số điện thoại
                  <input required value={phone} onChange={(e) => setPhone(e.target.value)} className={styles.couponInput} />
                </label>
                <label>
                  Địa chỉ giao hàng
                  <textarea required value={address} onChange={(e) => setAddress(e.target.value)} className={styles.couponInput} />
                </label>
                <button className={styles.checkout} type="submit">Xác nhận đơn hàng</button>
              </form>

              <aside className={styles.summary}>
                <h3>Đơn hàng</h3>
                <div style={{maxHeight:300, overflow:'auto'}}>
                  {items.map(it => (
                    <div key={it.id} style={{display:'flex', justifyContent:'space-between', padding:'8px 0'}}>
                      <span>{it.name} x{it.qty}</span>
                      <strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(it.price * it.qty)}</strong>
                    </div>
                  ))}
                </div>
                <div className={styles.breakdown} style={{marginTop:12}}>
                  <div className={styles.row}><span>Tạm tính</span><span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(totals.subtotal)}</span></div>
                  <div className={styles.row}><span>Giảm giá</span><span>-{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(totals.discount)}</span></div>
                  <div className={styles.row}><span>Phí vận chuyển</span><span>{totals.shipping === 0 ? 'Miễn phí' : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(totals.shipping)}</span></div>
                  <div className={styles.row}><span>Thuế</span><span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(totals.tax)}</span></div>
                  <div className={styles.rowTotal}><strong>Tổng</strong><strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(totals.total)}</strong></div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Checkout
