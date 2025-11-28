import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart'
import './styles/variables.css'
import './styles/global.css'
import './App.css'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App
