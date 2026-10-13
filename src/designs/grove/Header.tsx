import type { DesignNavigate, DesignPage } from '../shared'

interface HeaderProps {
  page: DesignPage
  cartCount: number
  onNavigate: DesignNavigate
}

export default function Header({ page, cartCount, onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 px-4 py-3">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-full border border-[var(--d-line)] bg-[#F7F3EA]/95 px-4 py-2.5 shadow-[0_8px_30px_rgba(36,48,38,0.06)] backdrop-blur md:px-6">
        <button type="button" onClick={() => onNavigate('home')} className="font-display text-lg italic leading-none">
          Skin Protocol
        </button>
        <nav className="flex items-center gap-4 text-sm">
          <button
            type="button"
            onClick={() => onNavigate('shop')}
            className={page === 'shop' || page === 'product' ? 'text-[var(--d-accent)]' : 'text-[var(--d-muted)]'}
          >
            The bench
          </button>
          <button type="button" onClick={() => onNavigate('shop')} className="tabular-nums">
            Bag {cartCount}
          </button>
        </nav>
      </div>
    </header>
  )
}
