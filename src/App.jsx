import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart'
import Checkout from './pages/Checkout'
import './styles/variables.css'
import './styles/global.css'
import './App.css'
import ThankYou from './pages/ThankYou'
import BankRedirect from './pages/BankRedirect'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/bank-redirect" element={<BankRedirect />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </div>
  )
}

export default App
