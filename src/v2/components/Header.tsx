import { useState, useEffect } from 'react'

type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product' | 'glossary' | 'education'

interface HeaderProps {
  currentPage: Page
  onNavigate: (page: Page) => void
  cartCount: number
}

const NAV = [
  { label: 'Explore the Collection', page: 'shop' as Page },
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
        className="sticky top-0 z-50 transition-all duration-300 font-sans bg-ivory"
        style={{
          backgroundColor: scrolled ? 'rgba(247,244,239,0.96)' : '#F7F4EF',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: '1px solid #E4DDD4',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-24 lg:h-28">
          <button
            onClick={() => onNavigate('home')}
            className="flex flex-col items-center cursor-pointer shrink-0 text-center"
            aria-label="Skin Protocol RX Home"
          >
            <img
              src="/logo-brand.png"
              alt="Skin Protocol RX"
              className="h-14 sm:h-16 lg:h-[4.5rem] w-auto"
            />
            <span className="font-serif text-[0.8rem] sm:text-sm text-rose tracking-wide pt-1.5">
              The Natural Prescription
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map(n => {
              const active = currentPage === n.page
              return (
                <button
                  key={n.label}
                  onClick={() => onNavigate(n.page)}
                  className={`text-sm font-sans pb-1 border-b-2 transition-colors duration-200 ${
                    active
                      ? 'text-charcoal font-medium border-rose'
                      : 'text-charcoal/80 border-transparent hover:text-charcoal hover:border-rose'
                  }`}
                >
                  {n.label}
                </button>
              )
            })}
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden md:flex text-charcoal/70 hover:text-rose transition-colors" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
            </button>
            <button className="hidden md:flex text-charcoal/70 hover:text-rose transition-colors" aria-label="Account">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" strokeLinecap="round" />
              </svg>
            </button>
            <button className="relative text-charcoal/70 hover:text-rose transition-colors" aria-label="Cart">
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

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-charcoal/30"
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
              <button className="text-sm text-charcoal/70 text-left hover:text-charcoal">Customer Login</button>
              <button className="text-sm text-rose text-left hover:text-rose-dark font-medium">Spa Partner Login</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
