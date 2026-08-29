import { useState, useEffect } from 'react'
import AnnouncementBar from './components/AnnouncementBar'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollIndicator from './components/ScrollIndicator'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductDetail from './pages/ProductDetail'
import ProtocolBuilder from './pages/ProtocolBuilder'
import OurStory from './pages/OurStory'
import SpaPartners from './pages/SpaPartners'

type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product'

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [productId, setProductId] = useState<string>('')
  const [cartCount, setCartCount] = useState(0)

  const navigate = (p: Page, id?: string) => {
    setPage(p)
    if (id) setProductId(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header currentPage={page} onNavigate={navigate} cartCount={cartCount} />

      <main>
        {page === 'home' && <HomePage onNavigate={navigate} />}
        {page === 'shop' && <ShopPage onNavigate={navigate} />}
        {page === 'product' && <ProductDetail productId={productId} onNavigate={navigate} />}
        {page === 'protocol' && <ProtocolBuilder onNavigate={navigate} />}
        {page === 'story' && <OurStory onNavigate={navigate} />}
        {page === 'spa' && <SpaPartners onNavigate={navigate} />}
      </main>

      <Footer onNavigate={navigate} />
      <ScrollIndicator />
    </div>
  )
}
