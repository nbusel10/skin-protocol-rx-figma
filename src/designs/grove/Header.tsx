import type { DesignNavigate, DesignPage } from '../shared'

interface HeaderProps {
  page: DesignPage
  cartCount: number
  onNavigate: DesignNavigate
}

export default function Header({ page, cartCount, onNavigate }: HeaderProps) {
  function jump(id: string) {
    const node = document.getElementById(id)
    if (node) {
      node.scrollIntoView({ behavior: 'smooth' })
      return
    }
    onNavigate(id === 'grove-bench' ? 'shop' : 'home')
  }

  return (
    <header className="sticky top-0 z-30 px-4 py-4 md:px-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full border border-[#C9C2B0] bg-[#F7F3EA]/95 px-5 py-3 shadow-[0_10px_30px_rgba(36,48,38,0.08)] backdrop-blur md:px-7">
        <button type="button" onClick={() => onNavigate('home')} className="shrink-0 font-display text-2xl italic leading-none text-[#243026] md:text-3xl">
          Skin Protocol RX
        </button>
        <nav className="flex min-w-0 flex-1 items-center gap-4 overflow-x-auto text-[13px] md:gap-6" aria-label="Primary">
          <button type="button" onClick={() => jump('grove-philosophy')} className="shrink-0 py-2 text-[#3E4A38] hover:text-[#243026]">
            Ingredients
          </button>
          <button type="button" onClick={() => jump('grove-bench')} className="shrink-0 py-2 text-[#3E4A38] hover:text-[#243026]">
            The bench
          </button>
          <button type="button" onClick={() => jump('grove-match')} className="shrink-0 py-2 text-[#3E4A38] hover:text-[#243026]">
            A formula
          </button>
          <button
            type="button"
            onClick={() => onNavigate('shop')}
            className={`shrink-0 py-2 ${page === 'shop' || page === 'product' ? 'text-[#243026]' : 'text-[#3E4A38] hover:text-[#243026]'}`}
          >
            Shop all
          </button>
          <button type="button" onClick={() => onNavigate('shop')} className="shrink-0 rounded-full bg-[#3E5236] px-3 py-2 text-[#F6F3EA]">
            Bag {cartCount}
          </button>
        </nav>
      </div>
    </header>
  )
}
