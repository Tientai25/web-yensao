import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const BankRedirect = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Simulate user at bank and bank redirecting back with success after 1.5s
    const t = setTimeout(() => {
      try {
        const pending = localStorage.getItem('pending_order')
        if (pending) {
          const order = JSON.parse(pending)
          // simulate bank mark success and move to last_order
          localStorage.setItem('last_order', JSON.stringify({ ...order, paid: true }))
          localStorage.removeItem('pending_order')
        }
      } catch (e) {}
      // After 'bank' redirects back, clear cart will be handled in Checkout's flow prior or here we simply navigate
      navigate('/thank-you')
    }, 1500)

    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div style={{minHeight:'60vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{textAlign:'center'}}>
        <h3>Chuyển đến cổng thanh toán Ngân hàng...</h3>
        <p>Nếu trình duyệt không tự chuyển, vui lòng đợi hoặc quay lại sau.</p>
      </div>
    </div>
  )
}

export default BankRedirect
