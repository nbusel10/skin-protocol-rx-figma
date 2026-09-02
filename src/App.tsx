import { useState, useEffect, useCallback } from 'react'
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
import ComingSoonPage from './pages/ComingSoonPage'
import IngredientGlossary from './pages/IngredientGlossary'
import { PRODUCTS } from './data'

type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product' | 'glossary' | 'education'

type RouteState = {
  page: Page
  productId: string
}

const PAGE_TITLES: Record<Page, string> = {
  home: 'Skin Protocol RX',
  shop: 'Shop | Skin Protocol RX',
  product: 'Product | Skin Protocol RX',
  protocol: 'Build Your Protocol | Skin Protocol RX',
  story: 'Our Story | Skin Protocol RX',
  spa: 'Spa Partners | Skin Protocol RX',
  glossary: 'Ingredient Glossary | Skin Protocol RX',
  education: 'Product Education | Skin Protocol RX',
}

function normalizeBase(): string {
  const base = import.meta.env.BASE_URL || '/'
  return base.endsWith('/') && base !== '/' ? base.slice(0, -1) : base === '/' ? '' : base
}

function toUrl(page: Page, productId = ''): string {
  const base = normalizeBase()
  const path =
    page === 'home' ? '/' :
    page === 'shop' ? '/shop' :
    page === 'product' ? `/product/${encodeURIComponent(productId || 'unknown')}` :
    page === 'protocol' ? '/protocol' :
    page === 'story' ? '/our-story' :
    page === 'spa' ? '/spa-partners' :
    page === 'glossary' ? '/ingredient-glossary' :
    '/product-education'
  if (path === '/') return base || '/'
  return `${base}${path}`
}

function parseLocation(pathname: string): RouteState {
  const base = normalizeBase()
  let path = pathname
  if (base && path.startsWith(base)) path = path.slice(base.length) || '/'
  if (!path.startsWith('/')) path = `/${path}`

  if (path === '/' || path === '') return { page: 'home', productId: '' }
  if (path === '/shop') return { page: 'shop', productId: '' }
  if (path === '/protocol') return { page: 'protocol', productId: '' }
  if (path === '/our-story') return { page: 'story', productId: '' }
  if (path === '/spa-partners') return { page: 'spa', productId: '' }
  if (path === '/ingredient-glossary') return { page: 'glossary', productId: '' }
  if (path === '/product-education') return { page: 'education', productId: '' }

  const productMatch = path.match(/^\/product\/([^/]+)\/?$/)
  if (productMatch) {
    return { page: 'product', productId: decodeURIComponent(productMatch[1]) }
  }

  return { page: 'home', productId: '' }
}

function applyDocumentTitle(page: Page, productId: string) {
  if (page === 'product' && productId) {
    const product = PRODUCTS.find(p => p.id === productId)
    document.title = `${product?.name || 'Product'} | Skin Protocol RX`
    return
  }
  document.title = PAGE_TITLES[page]
}

function getInitialRoute(): RouteState {
  if (typeof window === 'undefined') return { page: 'home', productId: '' }
  return parseLocation(window.location.pathname)
}

export default function App() {
  const initial = getInitialRoute()
  const [page, setPage] = useState<Page>(initial.page)
  const [productId, setProductId] = useState<string>(initial.productId)
  const [cartCount, setCartCount] = useState(0)

  const applyRoute = useCallback((next: RouteState, mode: 'push' | 'replace' | 'none') => {
    setPage(next.page)
    setProductId(next.page === 'product' ? next.productId : '')
    applyDocumentTitle(next.page, next.productId)
    if (mode === 'none') return
    const url = toUrl(next.page, next.productId)
    const state: RouteState = { page: next.page, productId: next.productId }
    if (mode === 'replace') window.history.replaceState(state, '', url)
    else window.history.pushState(state, '', url)
  }, [])

  const navigate = useCallback((p: Page, id?: string) => {
    const next: RouteState = {
      page: p,
      productId: p === 'product' ? (id || '') : '',
    }
    applyRoute(next, 'push')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [applyRoute])

  // Sync initial URL + browser back/forward
  useEffect(() => {
    const current = parseLocation(window.location.pathname)
    applyRoute(current, 'replace')

    const onPopState = (event: PopStateEvent) => {
      const state = event.state as RouteState | null
      if (state?.page) {
        setPage(state.page)
        setProductId(state.page === 'product' ? (state.productId || '') : '')
        applyDocumentTitle(state.page, state.productId || '')
      } else {
        const parsed = parseLocation(window.location.pathname)
        setPage(parsed.page)
        setProductId(parsed.page === 'product' ? parsed.productId : '')
        applyDocumentTitle(parsed.page, parsed.productId)
      }
      window.scrollTo(0, 0)
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [applyRoute])

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
        {page === 'glossary' && <IngredientGlossary onNavigate={navigate} />}
        {page === 'education' && (
          <ComingSoonPage
            eyebrow="Learn"
            title="Product Education"
            body="Guides to help you understand each step of your protocol — how to use products, what to expect, and how professional formulas support healthier-looking skin."
            onNavigate={navigate}
          />
        )}
      </main>

      <Footer onNavigate={navigate} />
      <ScrollIndicator />
    </div>
  )
}
