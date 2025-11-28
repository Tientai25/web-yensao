import { useCart } from '../contexts/CartContext'
import styles from '../styles/Cart.module.css'
import { Link } from 'react-router-dom'

const Cart = () => {
  const { items, removeItem, updateQty, clear } = useCart()

  const formatPrice = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0 }).format(price)

  const total = items.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <section className={styles.cart}>
      <div className="container">
        <h2>Giỏ Hàng</h2>
        {items.length === 0 ? (
          <div>
            <p>Giỏ hàng trống.</p>
            <Link to="/">Tiếp tục mua sắm</Link>
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
                      <span>{it.qty}</span>
                      <button onClick={() => updateQty(it.id, it.qty + 1)}>+</button>
                    </div>
                    <div className={styles.price}>{formatPrice(it.price * it.qty)}</div>
                    <button className={styles.remove} onClick={() => removeItem(it.id)}>Xóa</button>
                  </div>
                </div>
              ))}
            </div>

            <aside className={styles.summary}>
              <h3>Tổng cộng</h3>
              <div className={styles.total}>{formatPrice(total)}</div>
              <button className={styles.checkout}>Tiến hành thanh toán</button>
              <button className={styles.clear} onClick={clear}>Xóa giỏ hàng</button>
            </aside>
          </div>
        )}
      </div>
    </section>
  )
}

export default Cart
