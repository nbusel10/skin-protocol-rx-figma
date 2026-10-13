import type { DesignNavigate, DesignPage } from '../shared'

interface HeaderProps {
  page: DesignPage
  cartCount: number
  onNavigate: DesignNavigate
}

export default function Header({ page, cartCount, onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0C0C0B]/90 backdrop-blur">
      <div className="flex h-14 items-center justify-between px-5 md:px-8">
        <button type="button" onClick={() => onNavigate('home')} className="text-[11px] tracking-[0.42em] uppercase">
          SPRX
        </button>
        <p className="hidden text-[10px] tracking-[0.32em] uppercase text-[var(--d-muted)] sm:block">
          {page === 'home' ? 'Treatment room' : page === 'shop' ? 'The line' : 'Formula'}
        </p>
        <button type="button" onClick={() => onNavigate('shop')} className="text-[11px] tracking-[0.28em] uppercase text-[var(--d-accent)]">
          Bag {cartCount}
        </button>
      </div>
    </header>
  )
}
