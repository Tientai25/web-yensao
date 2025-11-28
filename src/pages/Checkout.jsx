import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useCart } from '../contexts/CartContext'
import cartStyles from '../styles/Cart.module.css'
import styles from '../styles/Checkout.module.css'

const Checkout = () => {
  const { items, getTotal, clear } = useCart()
  const totals = getTotal()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('bank')
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    if (paymentMethod === 'bank') {
      handleBankPayment()
    } else {
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
        <section className={styles.checkoutWrap}>
          <div className="container">
            <h2 style={{marginBottom:'20px'}}>Thanh Toán</h2>
            <div className={styles.checkoutGrid}>
              <div className={styles.card}>
                <form onSubmit={handleSubmit}>
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label className={styles.label}>Họ và tên</label>
                      <input className={styles.input} required value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Số điện thoại</label>
                      <input className={styles.input} required value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Email (tuỳ chọn)</label>
                    <input className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Địa chỉ giao hàng</label>
                    <textarea className={styles.textarea} required value={address} onChange={(e) => setAddress(e.target.value)} />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Phương thức thanh toán</label>
                    <div className={styles.paymentMethods}>
                      <label className={styles.paymentItem}><input type="radio" name="pay" checked={paymentMethod==='bank'} onChange={() => setPaymentMethod('bank')} /> Thanh toán qua Ngân hàng</label>
                      <label className={styles.paymentItem}><input type="radio" name="pay" checked={paymentMethod==='cod'} onChange={() => setPaymentMethod('cod')} /> Thanh toán khi nhận hàng (COD)</label>
                    </div>
                  </div>

                  <div style={{marginTop:12}}>
                    <button type="submit" className={styles.checkoutBtn}>Thanh toán</button>
                  </div>
                </form>
              </div>

              <div className={styles.summaryBox}>
                <div className={cartStyles.summary}>
                  <div className={styles.summaryHeader}>Đơn hàng</div>
                  <div style={{maxHeight:300, overflow:'auto'}}>
                    {items.map(it => (
                      <div key={it.id} style={{display:'flex', justifyContent:'space-between', padding:'8px 0'}}>
                        <span>{it.name} x{it.qty}</span>
                        <strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(it.price * it.qty)}</strong>
                      </div>
                    ))}
                  </div>
                  <div className={cartStyles.breakdown} style={{marginTop:12}}>
                    <div className={cartStyles.row}><span>Tạm tính</span><span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(totals.subtotal)}</span></div>
                    <div className={cartStyles.row}><span>Giảm giá</span><span>-{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(totals.discount)}</span></div>
                    <div className={cartStyles.row}><span>Phí vận chuyển</span><span>{totals.shipping === 0 ? 'Miễn phí' : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(totals.shipping)}</span></div>
                    <div className={cartStyles.row}><span>Thuế</span><span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(totals.tax)}</span></div>
                    <div className={cartStyles.rowTotal}><strong>Tổng</strong><strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(totals.total)}</strong></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Checkout
