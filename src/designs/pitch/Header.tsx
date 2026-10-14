import type { DesignNavigate, DesignPage } from '../shared'
import { scrollTo } from './sections'

interface HeaderProps {
  page: DesignPage
  cartCount: number
  onNavigate: DesignNavigate
  tone: 'boutique' | 'luxe' | 'ritual'
}

export default function Header({ page, cartCount, onNavigate }: HeaderProps) {
  function go(id: 'collection' | 'quiz' | 'story' | 'spa') {
    if (page !== 'home') {
      onNavigate('home')
      return
    }
    scrollTo(id)
  }

  return (
    <nav className="site-nav">
      <button type="button" className="wordmark" onClick={() => onNavigate('home')} style={{ background: 'none', border: 0, textAlign: 'left' }}>
        SKIN PROTOCOL RX<span>THE NATURAL PRESCRIPTION</span>
      </button>
      <div className="navlinks">
        <button type="button" onClick={() => go('collection')} style={{ background: 'none', border: 0 }}>Explore the Collection</button>
        <button type="button" onClick={() => go('quiz')} style={{ background: 'none', border: 0 }}>Build Your Protocol</button>
        <button type="button" onClick={() => go('story')} style={{ background: 'none', border: 0 }}>Our Story</button>
        <button type="button" onClick={() => go('spa')} style={{ background: 'none', border: 0 }}>Spa Partners</button>
      </div>
      <div className="navtools">
        <button type="button" onClick={() => go('collection')} style={{ background: 'none', border: 0 }}>⌕ Search</button>
        <button type="button" onClick={() => go('spa')} style={{ background: 'none', border: 0 }}>Account</button>
        <button type="button" onClick={() => onNavigate('shop')} style={{ background: 'none', border: 0 }}>Bag ({cartCount})</button>
      </div>
    </nav>
  )
}
