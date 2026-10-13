import type { DesignNavigate, DesignPage } from '../shared'

interface HeaderProps {
  page: DesignPage
  cartCount: number
  onNavigate: DesignNavigate
}

const LINKS = [
  { id: 'room-family', label: 'Our Story' },
  { id: 'room-match', label: 'Protocol' },
  { id: 'room-studio', label: 'Studios' },
]

export default function Header({ page, cartCount, onNavigate }: HeaderProps) {
  function jump(id: string) {
    const node = document.getElementById(id)
    if (node) {
      node.scrollIntoView({ behavior: 'smooth' })
      return
    }
    onNavigate('home')
  }

  const linkClass = 'shrink-0 py-2 text-[12px] tracking-[0.16em] uppercase text-[#3C3832] hover:text-[#161513]'

  return (
    <header className="sticky top-0 z-40 border-b border-[#161513]/15 bg-[#EDE6D8] text-[#161513]">
      <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-4">
        <button type="button" onClick={() => onNavigate('home')} className="font-display text-[1.55rem] leading-none tracking-tight md:text-[2rem]">
          Skin Protocol RX
        </button>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {LINKS.map(link => (
            <button key={link.id} type="button" onClick={() => jump(link.id)} className={linkClass}>
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => onNavigate('shop')}
            className={`${linkClass} ${page === 'shop' || page === 'product' ? 'text-[#161513] underline decoration-[#C4B49A] underline-offset-8' : ''}`}
          >
            Shop
          </button>
        </nav>
        <button type="button" onClick={() => onNavigate('shop')} className="border border-[#161513] px-3 py-2 text-[10px] tracking-[0.2em] uppercase">
          Bag {cartCount}
        </button>
      </div>
      <nav className="flex gap-5 overflow-x-auto border-t border-[#161513]/10 px-4 py-2.5 md:hidden" aria-label="Primary">
        {LINKS.map(link => (
          <button key={link.id} type="button" onClick={() => jump(link.id)} className={linkClass}>
            {link.label}
          </button>
        ))}
        <button type="button" onClick={() => onNavigate('shop')} className={linkClass}>
          Shop
        </button>
      </nav>
    </header>
  )
}
