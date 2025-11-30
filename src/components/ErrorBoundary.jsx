import { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <Header />
          <main style={{ 
            minHeight: '60vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '40px 20px'
          }}>
            <div className="container" style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#ef4444', marginBottom: '20px' }}>
                ⚠️ Đã xảy ra lỗi
              </h2>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                {this.state.error?.message || 'Có lỗi xảy ra khi tải trang. Vui lòng thử lại sau.'}
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link 
                  to="/" 
                  style={{
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold'
                  }}
                >
                  Về trang chủ
                </Link>
                <button
                  onClick={() => {
                    this.setState({ hasError: false, error: null })
                    window.location.reload()
                  }}
                  style={{
                    padding: '10px 20px',
                    background: '#f3f4f6',
                    color: '#333',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Tải lại trang
                </button>
              </div>
              {process.env.NODE_ENV === 'development' && (
                <details style={{ marginTop: '20px', textAlign: 'left', maxWidth: '600px', margin: '20px auto' }}>
                  <summary style={{ cursor: 'pointer', color: '#666' }}>Chi tiết lỗi (Development)</summary>
                  <pre style={{ 
                    background: '#f3f4f6', 
                    padding: '15px', 
                    borderRadius: '8px', 
                    overflow: 'auto',
                    fontSize: '12px',
                    marginTop: '10px'
                  }}>
                    {this.state.error?.stack || JSON.stringify(this.state.error, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          </main>
          <Footer />
        </>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary


