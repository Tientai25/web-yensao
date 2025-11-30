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
import ContactPage from './pages/ContactPage'
import Login from './pages/Login'
import Register from './pages/Register'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <div className="app">
      <ErrorBoundary>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/product/:id" element={<ErrorBoundary><ProductDetail /></ErrorBoundary>} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ErrorBoundary><ProductDetail /></ErrorBoundary>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/bank-redirect" element={<BankRedirect />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/lien-he" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </ErrorBoundary>
    </div>
  )
}

export default App
