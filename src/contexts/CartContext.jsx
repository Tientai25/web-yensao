import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('cart_items')
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })
  const [coupon, setCoupon] = useState(() => {
    try {
      return localStorage.getItem('cart_coupon') || null
    } catch (e) {
      return null
    }
  })
  const [shippingCost, setShippingCost] = useState(30000) // default shipping

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const exists = prev.find((p) => p.id === product.id)
      if (exists) {
        return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + qty } : p))
      }
      return [...prev, { ...product, qty }]
    })
  }

  const removeItem = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id))
  }

  const updateQty = (id, qty) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)))
  }

  const clear = () => setItems([])

  // Persist items and coupon to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cart_items', JSON.stringify(items))
    } catch (e) {
      // ignore
    }
  }, [items])

  useEffect(() => {
    try {
      if (coupon) localStorage.setItem('cart_coupon', coupon)
      else localStorage.removeItem('cart_coupon')
    } catch (e) {}
  }, [coupon])

  // Coupon logic (simple map)
  const coupons = {
    YEN10: { type: 'percent', value: 10 }, // 10% off
    FREESHIP: { type: 'shipping', value: 100 }, // free shipping flag
    VIP50: { type: 'percent', value: 50 },
  }

  const applyCoupon = (code) => {
    if (!code) return { ok: false, message: 'Nhập mã giảm giá' }
    const key = code.trim().toUpperCase()
    const c = coupons[key]
    if (!c) return { ok: false, message: 'Mã không hợp lệ' }
    setCoupon(key)
    return { ok: true, message: 'Áp dụng mã thành công' }
  }

  const removeCoupon = () => setCoupon(null)

  // Totals
  const getSubtotal = () => items.reduce((s, i) => s + i.price * i.qty, 0)

  const getDiscountAmount = () => {
    if (!coupon) return 0
    const c = coupons[coupon]
    if (!c) return 0
    if (c.type === 'percent') return Math.round((getSubtotal() * c.value) / 100)
    return 0
  }

  const getShipping = () => {
    if (!coupon) return shippingCost
    const c = coupons[coupon]
    if (!c) return shippingCost
    if (c.type === 'shipping') return 0
    return shippingCost
  }

  const TAX_PERCENT = 0.05 // 5% tax
  const getTax = (amount) => Math.round(amount * TAX_PERCENT)

  const getTotal = () => {
    const subtotal = getSubtotal()
    const discount = getDiscountAmount()
    const shipping = getShipping()
    const taxed = subtotal - discount + shipping
    const tax = getTax(taxed)
    return { subtotal, discount, shipping, tax, total: taxed + tax }
  }

  const value = {
    items,
    addItem,
    removeItem,
    updateQty,
    clear,
    coupon,
    applyCoupon,
    removeCoupon,
    setShippingCost,
    getSubtotal,
    getDiscountAmount,
    getShipping,
    getTax,
    getTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export default CartContext
