import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import FAQPage from './pages/FAQ'
import ProductDetail from './components/ProductDetail'
import ProductsPage from './pages/ProductsPage'
import Cart from './components/Cart'
import Checkout from './pages/Checkout'
import './styles/variables.css'
import './styles/global.css'
import './App.css'
import ThankYou from './pages/ThankYou'
import BankRedirect from './pages/BankRedirect'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/bank-redirect" element={<BankRedirect />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </div>
  )
}

export default App
