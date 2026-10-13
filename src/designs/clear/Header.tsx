import type { DesignNavigate, DesignPage } from '../shared'

interface HeaderProps {
  page: DesignPage
  cartCount: number
  onNavigate: DesignNavigate
}

const SECTIONS = [
  { id: 'feature', label: 'Feature' },
  { id: 'protocol', label: 'Protocol' },
  { id: 'collection', label: 'Collection' },
  { id: 'studios', label: 'Studios' },
]

export default function Header({ page, cartCount, onNavigate }: HeaderProps) {
  function jump(id: string) {
    if (id === 'collection' && page !== 'home') {
      onNavigate('shop')
      return
    }
    const node = document.getElementById(id)
    if (node) {
      node.scrollIntoView({ behavior: 'smooth' })
      return
    }
    onNavigate(id === 'collection' ? 'shop' : 'home')
  }

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--d-ink)] bg-[var(--d-bg)]">
      <div className="flex items-end justify-between gap-4 px-5 pt-4 md:px-10">
        <p className="pb-2 text-[10px] tracking-[0.28em] uppercase text-[var(--d-muted)]">New York</p>
        <button type="button" onClick={() => onNavigate('home')} className="font-serif text-2xl leading-none tracking-tight md:text-3xl">
          Skin Protocol RX
        </button>
        <button type="button" onClick={() => onNavigate('shop')} className="pb-2 text-[10px] tracking-[0.22em] uppercase">
          Bag {cartCount}
        </button>
      </div>
      <div className="mx-5 my-2 border-t border-[var(--d-ink)] md:mx-10" />
      <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 pb-3 text-[11px] tracking-[0.22em] uppercase md:px-10">
        {SECTIONS.map(item => (
          <button key={item.id} type="button" onClick={() => jump(item.id)} className="hover:text-[var(--d-accent)]">
            {item.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onNavigate('shop')}
          className={page === 'shop' || page === 'product' ? 'text-[var(--d-accent)]' : ''}
        >
          Shop
        </button>
      </nav>
    </header>
  )
}
