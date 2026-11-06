import { useEffect, useState } from 'react'
import { loadQuizSession } from '../../lib/quizSession'
import { useSiteRoot } from './siteRoot'
import SocialLinks from './SocialLinks'

const NAV = [
  { label: 'Shop', id: 'shop' },
  { label: 'About', id: 'about' },
  { label: 'Build Your Protocol', id: 'protocol' },
  { label: 'Spa Partners', id: 'spa' },
  { label: 'Contact', id: 'contact' },
]

export default function Header({ lighter = false }: { lighter?: boolean }) {
  const site = useSiteRoot()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartCount, setCartCount] = useState(() => loadQuizSession()?.addedIds.length ?? 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const syncCart = () => setCartCount(loadQuizSession()?.addedIds.length ?? 0)
    window.addEventListener('sprx-cart-updated', syncCart)
    return () => window.removeEventListener('sprx-cart-updated', syncCart)
  }, [])

  function jump(id: string) {
    setMobileOpen(false)
    if (!lighter && id === 'shop') {
      window.location.assign(site.shop)
      return
    }
    if (!lighter && id === 'protocol') {
      const here = window.location.pathname.replace(/\/$/, '')
      if (here !== site.protocol) {
        window.location.assign(site.protocol)
      } else {
        window.dispatchEvent(new Event('sprx-open-protocol-page'))
      }
      return
    }
    if (!lighter && id === 'about') {
      const here = window.location.pathname.replace(/\/$/, '')
      if (here !== site.about) {
        window.location.assign(site.about)
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }
    const node = document.getElementById(id === 'about' ? 'founders' : id)
    if (node) {
      node.scrollIntoView({ behavior: 'smooth' })
      return
    }
    if (!lighter) window.location.assign(`${site.root}#${id}`)
  }

  return (
    <>
      <header
        className="relative z-50 font-sans transition-all duration-300"
        style={{
          backgroundColor: lighter
            ? scrolled ? 'rgba(255,255,255,0.96)' : 'var(--palette-header, #ffffff)'
            : scrolled ? 'var(--palette-header-scrolled, rgba(255,255,255,0.98))' : 'var(--palette-header, #ffffff)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: lighter ? '1px solid var(--palette-line, #E7E2DC)' : '1px solid var(--palette-line, #E5E5E5)',
          boxShadow: lighter ? 'none' : scrolled ? '0 1px 0 rgba(0,0,0,0.04)' : 'none',
        }}
      >
        <div
          className={
            lighter
              ? 'mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:h-[6.5rem] md:h-28 md:px-8 lg:h-[7.5rem]'
              : 'mx-auto flex h-[5.5rem] max-w-7xl items-center justify-between px-5 sm:h-28 md:h-[7.5rem] md:px-8 lg:h-[8rem]'
          }
        >
          <a
            href={lighter ? '/designs/lighter' : site.root}
            className="flex shrink-0 cursor-pointer items-center"
            aria-label="Skin Protocol RX Home"
          >
            <img
              src="/logo-brand.png"
              alt="Skin Protocol RX"
              className={
                lighter
                  ? 'h-16 w-auto sm:h-20 md:h-[5.5rem] lg:h-24'
                  : 'h-[4.5rem] w-auto sm:h-[5.5rem] md:h-[6rem] lg:h-[6.5rem]'
              }
            />
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            {NAV.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => jump(item.id)}
                className="text-link text-xs font-medium text-charcoal/70 hover:text-rose"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <SocialLinks
              className="hidden items-center gap-3 md:flex"
              iconClassName="text-charcoal/60 transition-colors hover:text-rose"
              strokeWidth={lighter ? 1.25 : 1.8}
            />
            <button type="button" className="hidden text-charcoal/60 transition-colors hover:text-charcoal md:flex" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={lighter ? 1.25 : 1.8}>
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
            </button>

            <button type="button" className="hidden text-charcoal/60 transition-colors hover:text-charcoal md:flex" aria-label="Account">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={lighter ? 1.25 : 1.8}>
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" strokeLinecap="round" />
              </svg>
            </button>

            <button type="button" className="relative text-charcoal/60 transition-colors hover:text-charcoal" aria-label={cartCount > 0 ? `Cart, ${cartCount} items` : 'Cart'}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={lighter ? 1.25 : 1.8}>
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ab8584] px-1 text-[10px] leading-none text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              className="text-charcoal lg:hidden"
              onClick={() => setMobileOpen(value => !value)}
              aria-label="Menu"
              aria-expanded={mobileOpen}
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
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <div className={`absolute top-0 right-0 flex h-full w-72 flex-col px-8 pt-20 shadow-2xl ${lighter ? 'bg-white' : 'bg-ivory'}`}>
            <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
              {NAV.map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => jump(item.id)}
                  className="text-link text-left text-sm font-medium text-charcoal hover:text-rose"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <SocialLinks
              className="mt-10 flex items-center gap-4 border-t border-gray-soft pt-8"
              iconClassName="text-charcoal/70 transition-colors hover:text-rose"
              strokeWidth={lighter ? 1.25 : 1.8}
            />
            <div className="mt-6 flex flex-col gap-4">
              <button type="button" className="text-left text-sm text-charcoal/60 hover:text-charcoal">Customer Login</button>
              <button type="button" className="text-left text-sm font-medium text-rose hover:text-rose-dark">Spa Partner Login</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
