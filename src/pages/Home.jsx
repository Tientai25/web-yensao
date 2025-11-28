import Header from '../components/Header'
import Hero from '../components/Hero'
import Products from '../components/Products'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const location = useLocation()

  useEffect(() => {
    // support ?scroll=section and hash
    const params = new URLSearchParams(location.search)
    const target = params.get('scroll') || window.location.hash.replace('#', '')
    if (target) {
      const el = document.getElementById(target)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      // remove query from URL for cleanliness
      if (location.search) window.history.replaceState({}, '', window.location.pathname)
    }
  }, [location])
  return (
    <>
      <Header />
      <Hero />
      <Products />
      <Features />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </>
  )
}

export default Home
