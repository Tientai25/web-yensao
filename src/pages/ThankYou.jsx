import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const ThankYou = () => {
  const [order, setOrder] = useState(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('last_order')
      if (raw) setOrder(JSON.parse(raw))
    } catch (e) {}
  }, [])

  if (!order) {
    return (
      <>
        <Header />
        <main style={{minHeight:'60vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div className="container">Không tìm thấy đơn hàng.</div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main style={{padding:'48px 0'}}>
        <div className="container">
          <h2>Cảm ơn bạn đã đặt hàng!</h2>
          <p>Mã đơn hàng: <strong>{order.id}</strong></p>
          <p>Trạng thái thanh toán: <strong>{order.paid ? 'Đã thanh toán' : 'Chưa thanh toán'}</strong></p>

          <h3>Chi tiết đơn</h3>
          <div style={{border:'1px solid var(--border)', padding:16, borderRadius:8}}>
            {order.items.map(it => (
              <div key={it.id} style={{display:'flex', justifyContent:'space-between', padding:'8px 0'}}>
                <span>{it.name} x{it.qty}</span>
                <strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(it.price * it.qty)}</strong>
              </div>
            ))}
            <div style={{marginTop:12}}>
              <div style={{display:'flex',justifyContent:'space-between'}}><span>Tạm tính</span><strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(order.totals.subtotal)}</strong></div>
              <div style={{display:'flex',justifyContent:'space-between'}}><span>Giảm giá</span><strong>-{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(order.totals.discount)}</strong></div>
              <div style={{display:'flex',justifyContent:'space-between'}}><span>Phí vận chuyển</span><strong>{order.totals.shipping === 0 ? 'Miễn phí' : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(order.totals.shipping)}</strong></div>
              <div style={{display:'flex',justifyContent:'space-between', marginTop:8}}><strong>Tổng</strong><strong>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(order.totals.total)}</strong></div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}

export default ThankYou
