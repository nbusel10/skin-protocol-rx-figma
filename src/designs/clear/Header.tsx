import type { DesignNavigate, DesignPage } from '../shared'

interface HeaderProps {
  page: DesignPage
  cartCount: number
  onNavigate: DesignNavigate
}

const SECTIONS = [
  { id: 'feature', label: 'Feature' },
  { id: 'protocol', label: 'Protocol' },
  { id: 'collection', label: 'The Edit' },
  { id: 'concerns', label: 'Concerns' },
  { id: 'studios', label: 'Studios' },
]

export default function Header({ page, cartCount, onNavigate }: HeaderProps) {
  function jump(id: string) {
    if ((id === 'collection' || id === 'shop') && page !== 'home') {
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
    <header className="sticky top-0 z-30 border-b border-[#1A1916] bg-[#F7F4EF]/95 backdrop-blur-sm">
      <div className="flex items-end justify-between gap-4 px-5 pt-4 md:grid md:grid-cols-[1fr_auto_1fr] md:px-10 md:pt-5">
        <p className="hidden pb-1 text-[11px] tracking-[0.28em] uppercase text-[#5C574E] md:block">New York</p>
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="font-serif text-[1.65rem] leading-none tracking-tight text-[#1A1916] sm:text-4xl md:text-5xl"
        >
          Skin Protocol RX
        </button>
        <button
          type="button"
          onClick={() => onNavigate('shop')}
          className="pb-1 text-[12px] tracking-[0.18em] uppercase hover:text-[#6E3B32] md:justify-self-end"
        >
          Bag {cartCount}
        </button>
      </div>
      <div className="mx-5 mt-3 border-t border-[#1A1916] md:mx-10" />
      <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 px-5 py-3 text-[13px] tracking-[0.16em] uppercase md:gap-x-10 md:px-10 md:py-3.5">
        {SECTIONS.map(item => (
          <button key={item.id} type="button" onClick={() => jump(item.id)} className="text-[#1A1916] hover:text-[#6E3B32]">
            {item.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onNavigate('shop')}
          className={page === 'shop' || page === 'product' ? 'text-[#6E3B32]' : 'text-[#1A1916] hover:text-[#6E3B32]'}
        >
          Shop
        </button>
      </nav>
    </header>
  )
}
