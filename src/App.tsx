import { useState, useEffect, useLayoutEffect, useCallback } from 'react'
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
import IngredientGlossary from './pages/IngredientGlossary'
import ProductEducation from './pages/ProductEducation'
import AnnouncementBarV2 from './v2/components/AnnouncementBar'
import HeaderV2 from './v2/components/Header'
import FooterV2 from './v2/components/Footer'
import HomePageV2 from './v2/pages/HomePage'
import ShopPageV2 from './v2/pages/ShopPage'
import ProductDetailV2 from './v2/pages/ProductDetail'
import ProtocolBuilderV2 from './v2/pages/ProtocolBuilder'
import OurStoryV2 from './v2/pages/OurStory'
import StandardsSectionPreviewV2 from './v2/pages/StandardsSectionPreview'
import PhilosophySectionPreviewV2 from './v2/pages/PhilosophySectionPreview'
import SkinConcernSectionPreviewV2 from './v2/pages/SkinConcernSectionPreview'
import StorySectionPreviewV2 from './v2/pages/StorySectionPreview'
import SpaPartnersV2 from './v2/pages/SpaPartners'
import IngredientGlossaryV2 from './v2/pages/IngredientGlossary'
import ProductEducationV2 from './v2/pages/ProductEducation'
import PickerPage from './designs/picker/PickerPage'
import DesignSite from './designs/DesignSite'
import DesignTabs from './designs/DesignTabs'
import WorkingHomePage from './designs/working/HomePage'
import WorkingHeader from './designs/working/Header'
import { isDesignId, type DesignId, type DesignPage, type GalleryTarget } from './designs/shared'
import { PRODUCTS } from './data'

type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product' | 'glossary' | 'education'
type Version = 'v1' | 'v2'
type Design = '' | 'picker' | 'working' | DesignId

type RouteState = {
  page: Page
  productId: string
  shopStep: string
  hash: string
  preview: string
  version: Version
  design: Design
  designPage: DesignPage
}

const ORIGINAL_PREFIX = '/original'

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
  return { page, productId: '', shopStep: '', hash: '', preview: '', version: 'v2', design: '', designPage: 'home', ...extras }
}

function splitVersion(pathname: string): { version: Version; path: string } {
  const base = normalizeBase()
  let path = pathname
  if (base && path.startsWith(base)) path = path.slice(base.length) || '/'
  if (!path.startsWith('/')) path = `/${path}`
  if (path === ORIGINAL_PREFIX || path.startsWith(`${ORIGINAL_PREFIX}/`)) {
    const rest = path.slice(ORIGINAL_PREFIX.length) || '/'
    return { version: 'v1', path: rest.startsWith('/') ? rest : `/${rest}` }
  }
  return { version: 'v2', path }
}

function pagePath(page: Page, productId = '', shopStep = '', hash = '', preview = ''): string {
  if (preview === 'standards') return '/our-standards-preview'
  if (preview === 'philosophy') return '/philosophy-preview'
  if (preview === 'concerns') return '/skin-concern-preview'
  if (preview === 'story-section') return '/our-story-section-preview'
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
  if (path === '/') return `/${query}${fragment}`
  return `${path}${query}${fragment}`
}

function toUrl(
  page: Page,
  productId = '',
  shopStep = '',
  hash = '',
  preview = '',
  version: Version = 'v2',
  design: Design = '',
  designPage: DesignPage = 'home',
): string {
  const base = normalizeBase()
  if (design === 'picker') return `${base}/designs`
  if (design === 'working') return `${base}/designs/working`
  if (isDesignId(design)) {
    const root = `${base}/designs/${design}`
    if (designPage === 'shop') return `${root}/shop`
    if (designPage === 'product') return `${root}/product/${encodeURIComponent(productId || 'unknown')}`
    return root
  }
  let path = pagePath(page, productId, shopStep, hash, preview)
  if (version === 'v1') {
    path = path === '/' ? ORIGINAL_PREFIX : `${ORIGINAL_PREFIX}${path}`
  }
  if (path === '/') return `${base || '/'}`
  return `${base}${path}`
}

function parseLocation(pathname: string, search = '', hash = ''): RouteState {
  const { version, path } = splitVersion(pathname)
  const shopStep = new URLSearchParams(search).get('step') || ''
  const storyHash = hash.replace(/^#/, '')

  if (path === '/designs' || path === '/designs/') return route('home', { design: 'picker', version: 'v2' })
  if (path === '/designs/working' || path === '/designs/working/') {
    return route('home', { design: 'working', designPage: 'home', version: 'v2' })
  }
  const designMatch = path.match(/^\/designs\/([a-z]+)(\/.*)?$/)
  if (designMatch && isDesignId(designMatch[1])) {
    const id = designMatch[1]
    const rest = designMatch[2] || ''
    if (rest === '' || rest === '/') return route('home', { design: id, designPage: 'home', version: 'v2' })
    if (rest === '/shop' || rest === '/shop/') return route('shop', { design: id, designPage: 'shop', version: 'v2' })
    const designProduct = rest.match(/^\/product\/([^/]+)\/?$/)
    if (designProduct) {
      return route('product', {
        design: id,
        designPage: 'product',
        productId: decodeURIComponent(designProduct[1]),
        version: 'v2',
      })
    }
    return route('home', { design: id, designPage: 'home', version: 'v2' })
  }

  if (path === '/' || path === '') return route('home', { version })
  if (path === '/shop') return route('shop', { shopStep, version })
  if (path === '/protocol') return route('protocol', { version })
  if (path === '/our-story') return route('story', { hash: storyHash, version })
  if (path === '/our-standards-preview') return route('story', { preview: 'standards', version })
  if (path === '/philosophy-preview') return route('home', { preview: 'philosophy', version: 'v2' })
  if (path === '/skin-concern-preview') return route('home', { preview: 'concerns', version: 'v2' })
  if (path === '/our-story-section-preview') return route('home', { preview: 'story-section', version: 'v2' })
  if (path === '/spa-partners') return route('spa', { version })
  if (path === '/ingredient-glossary') return route('glossary', { version })
  if (path === '/product-education') return route('education', { version })

  const productMatch = path.match(/^\/product\/([^/]+)\/?$/)
  if (productMatch) {
    return route('product', { productId: decodeURIComponent(productMatch[1]), version })
  }

  return route('home', { version })
}

function applyDocumentTitle(
  page: Page,
  productId: string,
  preview = '',
  version: Version = 'v2',
  design: Design = '',
  designPage: DesignPage = 'home',
) {
  if (design === 'picker') {
    document.title = 'Designs | Skin Protocol RX'
    return
  }
  if (design === 'working') {
    document.title = 'Working | Skin Protocol RX'
    return
  }
  if (isDesignId(design)) {
    const label = design === 'clear' ? 'Clear' : design === 'grove' ? 'Grove' : design === 'boutique' ? 'Boutique' : design === 'luxe' ? 'Luxury Editorial' : 'Skin Ritual'
    if (designPage === 'product' && productId) {
      const product = PRODUCTS.find(item => item.id === productId)
      document.title = `${product?.name || 'Product'} | ${label}`
      return
    }
    if (designPage === 'shop') {
      document.title = `Collection | ${label}`
      return
    }
    document.title = `${label} | Skin Protocol RX`
    return
  }
  if (preview === 'standards') {
    document.title = 'Our Standards Layouts | Skin Protocol RX'
    return
  }
  if (preview === 'philosophy') {
    document.title = 'Our Philosophy Layouts | Skin Protocol RX'
    return
  }
  if (preview === 'concerns') {
    document.title = 'Shop by Skin Concern Layouts | Skin Protocol RX'
    return
  }
  if (preview === 'story-section') {
    document.title = 'Our Story Layouts | Skin Protocol RX'
    return
  }
  if (page === 'product' && productId) {
    const product = PRODUCTS.find(p => p.id === productId)
    document.title = `${product?.name || 'Product'} | Skin Protocol RX`
    return
  }
  if (version === 'v2' && page === 'shop') {
    document.title = 'Explore the Collection | Skin Protocol RX'
    return
  }
  document.title = PAGE_TITLES[page]
}

function getInitialRoute(): RouteState {
  if (typeof window === 'undefined') return route('home')
  return parseLocation(window.location.pathname, window.location.search, window.location.hash)
}

/** Instant jump to top. Smooth scroll fights layout swaps and focused footer buttons. */
function scrollToTop() {
  const active = document.activeElement
  if (active instanceof HTMLElement && active !== document.body) active.blur()
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

export default function App() {
  const initial = getInitialRoute()
  const [page, setPage] = useState<Page>(initial.page)
  const [productId, setProductId] = useState<string>(initial.productId)
  const [shopStep, setShopStep] = useState(initial.shopStep)
  const [storyHash, setStoryHash] = useState(initial.hash)
  const [preview, setPreview] = useState(initial.preview)
  const [version, setVersion] = useState<Version>(initial.version)
  const [design, setDesign] = useState<Design>(initial.design)
  const [designPage, setDesignPage] = useState<DesignPage>(initial.designPage)
  const [cartCount, setCartCount] = useState(0)

  const applyRoute = useCallback((next: RouteState, mode: 'push' | 'replace' | 'none') => {
    setPage(next.page)
    setProductId(next.page === 'product' ? next.productId : '')
    setShopStep(next.page === 'shop' ? (next.shopStep || '') : '')
    setStoryHash(next.page === 'story' && next.preview !== 'standards' ? (next.hash || '') : '')
    setPreview(next.preview || '')
    setVersion(next.version || 'v2')
    setDesign(next.design || '')
    setDesignPage(next.designPage || 'home')
    applyDocumentTitle(next.page, next.productId, next.preview, next.version, next.design, next.designPage)
    if (mode === 'none') return
    const url = toUrl(next.page, next.productId, next.shopStep, next.hash, next.preview, next.version, next.design, next.designPage)
    const state = route(next.page, {
      productId: next.productId,
      shopStep: next.shopStep || '',
      hash: next.hash || '',
      preview: next.preview || '',
      version: next.version || 'v2',
      design: next.design || '',
      designPage: next.designPage || 'home',
    })
    if (mode === 'replace') window.history.replaceState(state, '', url)
    else window.history.pushState(state, '', url)
  }, [])

  const navigate = useCallback((p: Page, id?: string) => {
    const currentVersion = (window.history.state as RouteState | null)?.version
      || (window.location.pathname.includes('/original') ? 'v1' : 'v2')
    if (p === 'story' && id === 'standards-preview') {
      scrollToTop()
      applyRoute(route('story', { preview: 'standards', version: currentVersion }), 'push')
      return
    }
    const next = route(p, {
      productId: p === 'product' ? (id || '') : '',
      shopStep: p === 'shop' ? (id || '') : '',
      hash: p === 'story' ? (id || '') : '',
      version: currentVersion,
    })
    if (!next.hash) scrollToTop()
    applyRoute(next, 'push')
  }, [applyRoute])

  const switchVersion = useCallback(() => {
    const nextVersion: Version = version === 'v1' ? 'v2' : 'v1'
    const leavingRevisionPreview = (preview === 'philosophy' || preview === 'concerns' || preview === 'story-section') && nextVersion === 'v1'
    scrollToTop()
    applyRoute(route(leavingRevisionPreview ? 'home' : page, {
      productId: leavingRevisionPreview ? '' : productId,
      shopStep: leavingRevisionPreview ? '' : shopStep,
      hash: leavingRevisionPreview ? '' : storyHash,
      preview: leavingRevisionPreview ? '' : preview,
      version: nextVersion,
    }), 'push')
  }, [applyRoute, page, productId, shopStep, storyHash, preview, version])

  const openPicker = useCallback(() => {
    scrollToTop()
    applyRoute(route('home', { design: 'picker', designPage: 'home', version: 'v2' }), 'push')
  }, [applyRoute])

  const openGalleryTarget = useCallback((target: GalleryTarget) => {
    scrollToTop()
    if (target === 'working') {
      applyRoute(route('home', { design: 'working', designPage: 'home', version: 'v2' }), 'push')
      return
    }
    if (target === 'original') {
      applyRoute(route('home', { version: 'v1', design: '', designPage: 'home' }), 'push')
      return
    }
    if (target === 'rose') {
      applyRoute(route('home', { version: 'v2', design: '', designPage: 'home' }), 'push')
      return
    }
    if (target === 'protocol') {
      window.location.assign(`${normalizeBase()}/designs/the-protocol.html`)
      return
    }
    applyRoute(route('home', { design: target, designPage: 'home', version: 'v2' }), 'push')
  }, [applyRoute])

  const navigateDesign = useCallback((nextPage: DesignPage, id?: string) => {
    if (!isDesignId(design)) return
    scrollToTop()
    applyRoute(route(nextPage === 'product' ? 'product' : nextPage === 'shop' ? 'shop' : 'home', {
      design,
      designPage: nextPage,
      productId: nextPage === 'product' ? (id || '') : '',
      version: 'v2',
    }), 'push')
  }, [applyRoute, design])

  // After the new page commits, pin scroll at the top before paint (skip in-page story hashes).
  useLayoutEffect(() => {
    if (storyHash && !design) return
    scrollToTop()
    const frame = requestAnimationFrame(() => scrollToTop())
    return () => cancelAnimationFrame(frame)
  }, [page, productId, shopStep, preview, storyHash, version, design, designPage])

  // Sync initial URL + browser back/forward
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

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
            version: state.version || 'v2',
            design: state.design || '',
            designPage: state.designPage || 'home',
          })
        : parseLocation(window.location.pathname, window.location.search, window.location.hash)
      setPage(next.page)
      setProductId(next.page === 'product' ? next.productId : '')
      setShopStep(next.page === 'shop' ? next.shopStep : '')
      setStoryHash(next.page === 'story' && next.preview !== 'standards' ? next.hash : '')
      setPreview(next.preview || '')
      setVersion(next.version || 'v2')
      setDesign(next.design || '')
      setDesignPage(next.designPage || 'home')
      applyDocumentTitle(next.page, next.productId, next.preview, next.version, next.design, next.designPage)
      if (!next.hash || next.design) scrollToTop()
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [applyRoute])

  const isV2 = version === 'v2'
  const Bar = isV2 ? AnnouncementBarV2 : AnnouncementBar
  const Top = isV2 ? HeaderV2 : Header
  const Bottom = isV2 ? FooterV2 : Footer
  const Home = isV2 ? HomePageV2 : HomePage
  const Detail = isV2 ? ProductDetailV2 : ProductDetail
  const Protocol = isV2 ? ProtocolBuilderV2 : ProtocolBuilder
  const Story = isV2 ? OurStoryV2 : OurStory
  const Standards = isV2 ? StandardsSectionPreviewV2 : StandardsSectionPreview
  const Spa = isV2 ? SpaPartnersV2 : SpaPartners
  const Glossary = isV2 ? IngredientGlossaryV2 : IngredientGlossary
  const Education = isV2 ? ProductEducationV2 : ProductEducation

  if (design === 'picker') {
    return <PickerPage onOpen={openGalleryTarget} />
  }

  if (design === 'working') {
    return (
      <div className="theme-clear min-h-screen bg-[#F7F4EF]">
        <DesignTabs current="working" onOpen={openGalleryTarget} />
        <WorkingHeader />
        <main className="overflow-x-hidden">
          <WorkingHomePage />
        </main>
      </div>
    )
  }

  if (isDesignId(design)) {
    return (
      <DesignSite
        key={design}
        id={design}
        page={designPage}
        productId={productId}
        onNavigate={navigateDesign}
        onPicker={openPicker}
        onOpen={openGalleryTarget}
      />
    )
  }

  return (
    <div className={isV2 ? 'theme-v2 min-h-screen bg-ivory' : 'min-h-screen bg-white'}>
      <div className="sticky top-0 z-50">
        <DesignTabs pinned={false} current={isV2 ? 'rose' : 'original'} onOpen={openGalleryTarget} />
        <Bar />
        <Top currentPage={page} onNavigate={navigate} cartCount={cartCount} />
      </div>

      <main>
        {page === 'home' && preview !== 'philosophy' && preview !== 'concerns' && preview !== 'story-section' && <Home onNavigate={navigate} />}
        {preview === 'philosophy' && <PhilosophySectionPreviewV2 onNavigate={navigate} />}
        {preview === 'concerns' && <SkinConcernSectionPreviewV2 onNavigate={navigate} />}
        {preview === 'story-section' && <StorySectionPreviewV2 onNavigate={navigate} />}
        {page === 'shop' && isV2 && <ShopPageV2 onNavigate={navigate} initialStep={shopStep} />}
        {page === 'shop' && !isV2 && <ShopPage onNavigate={navigate} />}
        {page === 'product' && <Detail productId={productId} onNavigate={navigate} />}
        {page === 'protocol' && <Protocol onNavigate={navigate} onAddToCart={(count) => setCartCount(c => c + count)} />}
        {preview === 'standards' && <Standards onNavigate={navigate} />}
        {page === 'story' && preview !== 'standards' && <Story onNavigate={navigate} scrollToId={storyHash || undefined} />}
        {page === 'spa' && <Spa onNavigate={navigate} />}
        {page === 'glossary' && <Glossary onNavigate={navigate} />}
        {page === 'education' && <Education onNavigate={navigate} />}
      </main>

      <Bottom
        onNavigate={navigate}
        compareLabel={isV2 ? 'View original design' : 'View revision'}
        onCompare={switchVersion}
        onDesigns={openPicker}
      />
      <ScrollIndicator />
    </div>
  )
}
