import { useState, useEffect } from 'react'

type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product'

interface HeaderProps {
  currentPage: Page
  onNavigate: (page: Page) => void
  cartCount: number
}

const NAV = [
  { label: 'Shop', page: 'shop' as Page },
  { label: 'Skin Concerns', page: 'shop' as Page },
  { label: 'Build Your Protocol', page: 'protocol' as Page },
  { label: 'Our Story', page: 'story' as Page },
  { label: 'Spa Partners', page: 'spa' as Page },
]

export default function Header({ currentPage, onNavigate, cartCount }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className="sticky top-0 z-50 transition-all duration-300 font-sans bg-white"
        style={{
          backgroundColor: scrolled ? 'rgba(255,255,255,0.98)' : '#ffffff',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid #E5E5E5' : '1px solid transparent',
          boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.04)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-[5.5rem] sm:h-28 md:h-[7.5rem] lg:h-[8rem]">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center cursor-pointer shrink-0"
            aria-label="Skin Protocol RX Home"
          >
            <img
              src="/logo-brand.png"
              alt="Skin Protocol RX"
              className="h-[4.5rem] sm:h-[5.5rem] md:h-[6rem] lg:h-[6.5rem] w-auto"
            />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map(n => (
              <button
                key={n.label}
                onClick={() => onNavigate(n.page)}
                className={`text-sm font-sans transition-colors duration-200 ${
                  currentPage === n.page
                    ? 'text-rose font-medium'
                    : 'text-charcoal/60 hover:text-black'
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button className="hidden md:flex text-charcoal/60 hover:text-charcoal transition-colors" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
            </button>

            {/* Account */}
            <button className="hidden md:flex text-charcoal/60 hover:text-charcoal transition-colors" aria-label="Account">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" strokeLinecap="round" />
              </svg>
            </button>

            {/* Cart */}
            <button className="relative text-charcoal/60 hover:text-charcoal transition-colors" aria-label="Cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu */}
            <button
              className="lg:hidden text-charcoal"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-out */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-72 bg-ivory flex flex-col pt-20 px-8 shadow-2xl">
            <nav className="flex flex-col gap-6">
              {NAV.map(n => (
                <button
                  key={n.label}
                  onClick={() => { onNavigate(n.page); setMobileOpen(false) }}
                  className="text-left text-base font-sans text-charcoal hover:text-rose transition-colors"
                >
                  {n.label}
                </button>
              ))}
            </nav>
            <div className="mt-10 pt-8 border-t border-gray-soft flex flex-col gap-4">
              <button className="text-sm text-charcoal/60 text-left hover:text-charcoal">Customer Login</button>
              <button className="text-sm text-rose text-left hover:text-rose-dark font-medium">Spa Partner Login</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
