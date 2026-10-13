import { useState } from 'react'
import type { DesignId, DesignNavigate, DesignPage } from './shared'
import HeaderClear from './clear/Header'
import FooterClear from './clear/Footer'
import HomeClear from './clear/HomePage'
import ShopClear from './clear/ShopPage'
import ProductClear from './clear/ProductPage'
import HeaderGrove from './grove/Header'
import FooterGrove from './grove/Footer'
import HomeGrove from './grove/HomePage'
import ShopGrove from './grove/ShopPage'
import ProductGrove from './grove/ProductPage'
import HeaderNight from './night/Header'
import FooterNight from './night/Footer'
import HomeNight from './night/HomePage'
import ShopNight from './night/ShopPage'
import ProductNight from './night/ProductPage'

const THEME: Record<DesignId, string> = {
  clear: 'theme-clear',
  grove: 'theme-grove',
  night: 'theme-night',
}

interface DesignSiteProps {
  id: DesignId
  page: DesignPage
  productId: string
  onNavigate: DesignNavigate
  onPicker: () => void
}

export default function DesignSite({ id, page, productId, onNavigate, onPicker }: DesignSiteProps) {
  const [cartCount, setCartCount] = useState(0)
  const Header = id === 'clear' ? HeaderClear : id === 'grove' ? HeaderGrove : HeaderNight
  const Footer = id === 'clear' ? FooterClear : id === 'grove' ? FooterGrove : FooterNight
  const Home = id === 'clear' ? HomeClear : id === 'grove' ? HomeGrove : HomeNight
  const Shop = id === 'clear' ? ShopClear : id === 'grove' ? ShopGrove : ShopNight
  const Product = id === 'clear' ? ProductClear : id === 'grove' ? ProductGrove : ProductNight

  return (
    <div className={`${THEME[id]} min-h-screen`}>
      <Header page={page} cartCount={cartCount} onNavigate={onNavigate} />
      <main className={page === 'home' ? 'overflow-x-hidden' : 'd-frame py-12'}>
        {page === 'home' && <Home onNavigate={onNavigate} />}
        {page === 'shop' && <Shop onNavigate={onNavigate} />}
        {page === 'product' && (
          <Product productId={productId} onNavigate={onNavigate} onAdd={() => setCartCount(count => count + 1)} />
        )}
      </main>
      <Footer onNavigate={onNavigate} onPicker={onPicker} />
    </div>
  )
}
