import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const location = useLocation()

  useEffect(() => {
    // If there's a search param like ?scroll=products and we're on home, scroll to element smoothly
    try {
      const params = new URLSearchParams(location.search)
      const target = params.get('scroll')
      if (location.pathname === '/' && target) {
        const el = document.getElementById(target)
        if (el) {
          // Use smooth scroll for in-page targets
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
      }
    } catch (e) {
      // ignore
    }

    // Default: scroll to top of page instantly to avoid perceived 'jumping'
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname, location.search])

  return null
}

export default ScrollToTop
