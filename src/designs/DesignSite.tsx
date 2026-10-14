import { useState } from 'react'
import './pitch/concept.css'
import type { DesignId, DesignNavigate, DesignPage, GalleryTarget } from './shared'
import DesignTabs from './DesignTabs'
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
import HomeBoutique from './boutique/HomePage'
import HomeLuxe from './luxe/HomePage'
import HomeRitual from './ritual/HomePage'
import PitchHeader from './pitch/Header'
import PitchFooter from './pitch/Footer'
import PitchShop from './pitch/ShopPage'
import PitchProduct from './pitch/ProductPage'

const THEME: Record<DesignId, string> = {
  clear: 'theme-clear',
  grove: 'theme-grove',
  boutique: 'theme-boutique',
  luxe: 'theme-luxe',
  ritual: 'theme-ritual',
}

interface DesignSiteProps {
  id: DesignId
  page: DesignPage
  productId: string
  onNavigate: DesignNavigate
  onPicker: () => void
  onOpen: (target: GalleryTarget) => void
}

export default function DesignSite({ id, page, productId, onNavigate, onPicker, onOpen }: DesignSiteProps) {
  const [cartCount, setCartCount] = useState(0)
  const pitched = id === 'boutique' || id === 'luxe' || id === 'ritual'
  const Home = id === 'clear' ? HomeClear : id === 'grove' ? HomeGrove : id === 'boutique' ? HomeBoutique : id === 'luxe' ? HomeLuxe : HomeRitual
  const Shop = id === 'clear' ? ShopClear : id === 'grove' ? ShopGrove : PitchShop
  const Product = id === 'clear' ? ProductClear : id === 'grove' ? ProductGrove : PitchProduct

  return (
    <div className={`${THEME[id]} min-h-screen`}>
      <DesignTabs current={id} onOpen={onOpen} />
      <div className={pitched ? 'pitch' : undefined}>
        {pitched ? (
          <PitchHeader page={page} cartCount={cartCount} onNavigate={onNavigate} tone={id} />
        ) : id === 'clear' ? (
          <HeaderClear page={page} cartCount={cartCount} onNavigate={onNavigate} />
        ) : (
          <HeaderGrove page={page} cartCount={cartCount} onNavigate={onNavigate} />
        )}
        <main className={page === 'home' ? 'overflow-x-hidden' : 'd-frame py-12'}>
          {page === 'home' && <Home onNavigate={onNavigate} />}
          {page === 'shop' && <Shop onNavigate={onNavigate} />}
          {page === 'product' && (
            <Product productId={productId} onNavigate={onNavigate} onAdd={() => setCartCount(count => count + 1)} />
          )}
        </main>
        {pitched ? (
          <PitchFooter onNavigate={onNavigate} onPicker={onPicker} />
        ) : id === 'clear' ? (
          <FooterClear onNavigate={onNavigate} onPicker={onPicker} />
        ) : (
          <FooterGrove onNavigate={onNavigate} onPicker={onPicker} />
        )}
      </div>
    </div>
  )
}
