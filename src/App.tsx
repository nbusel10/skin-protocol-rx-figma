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
import StandardsSectionPreview from './pages/StandardsSectionPreview'
import SpaPartners from './pages/SpaPartners'
import ComingSoonPage from './pages/ComingSoonPage'
import IngredientGlossary from './pages/IngredientGlossary'
import { PRODUCTS } from './data'

type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product' | 'glossary' | 'education'

type RouteState = {
  page: Page
  productId: string
  shopStep: string
  hash: string
  preview: string
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

function route(page: Page, extras: Partial<Omit<RouteState, 'page'>> = {}): RouteState {
  return { page, productId: '', shopStep: '', hash: '', preview: '', ...extras }
}

function toUrl(page: Page, productId = '', shopStep = '', hash = '', preview = ''): string {
  const base = normalizeBase()
  if (preview === 'standards') return `${base}/our-standards-preview`
  const path =
    page === 'home' ? '/' :
    page === 'shop' ? '/shop' :
    page === 'product' ? `/product/${encodeURIComponent(productId || 'unknown')}` :
    page === 'protocol' ? '/protocol' :
    page === 'story' ? '/our-story' :
    page === 'spa' ? '/spa-partners' :
    page === 'glossary' ? '/ingredient-glossary' :
    '/product-education'
  const query = page === 'shop' && shopStep ? `?step=${encodeURIComponent(shopStep)}` : ''
  const fragment = page === 'story' && hash ? `#${hash.replace(/^#/, '')}` : ''
  if (path === '/') return `${base || '/'}${query}`
  return `${base}${path}${query}${fragment}`
}

function parseLocation(pathname: string, search = '', hash = ''): RouteState {
  const base = normalizeBase()
  let path = pathname
  if (base && path.startsWith(base)) path = path.slice(base.length) || '/'
  if (!path.startsWith('/')) path = `/${path}`
  const shopStep = new URLSearchParams(search).get('step') || ''
  const storyHash = hash.replace(/^#/, '')

  if (path === '/' || path === '') return route('home')
  if (path === '/shop') return route('shop', { shopStep })
  if (path === '/protocol') return route('protocol')
  if (path === '/our-story') return route('story', { hash: storyHash })
  if (path === '/our-standards-preview') return route('story', { preview: 'standards' })
  if (path === '/spa-partners') return route('spa')
  if (path === '/ingredient-glossary') return route('glossary')
  if (path === '/product-education') return route('education')

  const productMatch = path.match(/^\/product\/([^/]+)\/?$/)
  if (productMatch) {
    return route('product', { productId: decodeURIComponent(productMatch[1]) })
  }

  return route('home')
}

function applyDocumentTitle(page: Page, productId: string, preview = '') {
  if (preview === 'standards') {
    document.title = 'Our Standards Layouts | Skin Protocol RX'
    return
  }
  if (page === 'product' && productId) {
    const product = PRODUCTS.find(p => p.id === productId)
    document.title = `${product?.name || 'Product'} | Skin Protocol RX`
    return
  }
  document.title = PAGE_TITLES[page]
}

function getInitialRoute(): RouteState {
  if (typeof window === 'undefined') return route('home')
  return parseLocation(window.location.pathname, window.location.search, window.location.hash)
}

export default function App() {
  const initial = getInitialRoute()
  const [page, setPage] = useState<Page>(initial.page)
  const [productId, setProductId] = useState<string>(initial.productId)
  const [shopStep, setShopStep] = useState(initial.shopStep)
  const [storyHash, setStoryHash] = useState(initial.hash)
  const [preview, setPreview] = useState(initial.preview)
  const [cartCount, setCartCount] = useState(0)

  const applyRoute = useCallback((next: RouteState, mode: 'push' | 'replace' | 'none') => {
    setPage(next.page)
    setProductId(next.page === 'product' ? next.productId : '')
    setShopStep(next.page === 'shop' ? (next.shopStep || '') : '')
    setStoryHash(next.page === 'story' && next.preview !== 'standards' ? (next.hash || '') : '')
    setPreview(next.preview || '')
    applyDocumentTitle(next.page, next.productId, next.preview)
    if (mode === 'none') return
    const url = toUrl(next.page, next.productId, next.shopStep, next.hash, next.preview)
    const state = route(next.page, {
      productId: next.productId,
      shopStep: next.shopStep || '',
      hash: next.hash || '',
      preview: next.preview || '',
    })
    if (mode === 'replace') window.history.replaceState(state, '', url)
    else window.history.pushState(state, '', url)
  }, [])

  const navigate = useCallback((p: Page, id?: string) => {
    if (p === 'story' && id === 'standards-preview') {
      applyRoute(route('story', { preview: 'standards' }), 'push')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const next = route(p, {
      productId: p === 'product' ? (id || '') : '',
      shopStep: p === 'shop' ? (id || '') : '',
      hash: p === 'story' ? (id || '') : '',
    })
    applyRoute(next, 'push')
    if (!next.hash) window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [applyRoute])

  // Sync initial URL + browser back/forward
  useEffect(() => {
    const current = parseLocation(window.location.pathname, window.location.search, window.location.hash)
    applyRoute(current, 'replace')

    const onPopState = (event: PopStateEvent) => {
      const state = event.state as RouteState | null
      const next = state?.page
        ? route(state.page, {
            productId: state.productId || '',
            shopStep: state.shopStep || '',
            hash: state.hash || '',
            preview: state.preview || '',
          })
        : parseLocation(window.location.pathname, window.location.search, window.location.hash)
      setPage(next.page)
      setProductId(next.page === 'product' ? next.productId : '')
      setShopStep(next.page === 'shop' ? next.shopStep : '')
      setStoryHash(next.page === 'story' && next.preview !== 'standards' ? next.hash : '')
      setPreview(next.preview || '')
      applyDocumentTitle(next.page, next.productId, next.preview)
      if (!next.hash) window.scrollTo(0, 0)
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
        {preview === 'standards' && <StandardsSectionPreview onNavigate={navigate} />}
        {page === 'story' && preview !== 'standards' && <OurStory onNavigate={navigate} scrollToId={storyHash || undefined} />}
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
