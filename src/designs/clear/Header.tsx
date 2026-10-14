import { useState } from 'react'
import type { DesignNavigate, DesignPage } from '../shared'

interface HeaderProps {
  page: DesignPage
  cartCount: number
  onNavigate: DesignNavigate
}

const LINKS = [
  { id: 'shop', label: 'Shop' },
  { id: 'story', label: 'Our Story' },
  { id: 'protocol', label: 'Build Your Protocol' },
  { id: 'studios', label: 'For Professionals' },
  { id: 'footer', label: 'Contact' },
]

const wrap = 'mx-auto w-[min(1120px,calc(100%-2.75rem))] md:w-[min(1120px,calc(100%-5.5rem))]'

export default function Header({ page, cartCount, onNavigate }: HeaderProps) {
  const [open, setOpen] = useState(false)

  function jump(id: string) {
    setOpen(false)
    if (id === 'shop') {
      onNavigate('shop')
      return
    }
    const node = document.getElementById(id)
    if (node) {
      node.scrollIntoView({ behavior: 'smooth' })
      return
    }
    onNavigate('home')
  }

  return (
    <header className="sticky top-11 z-30 border-b border-[#D6CEC3] bg-[#F7F4EF]/95 font-sans backdrop-blur-sm">
      <div className={`${wrap} flex h-[66px] items-center justify-between gap-6 md:h-[78px]`}>
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="font-serif text-[21px] font-medium tracking-[-0.06em] text-[#252520] md:text-2xl"
        >
          Skin Protocol RX
        </button>
        <button
          type="button"
          className="text-[13px] font-bold md:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen(value => !value)}
        >
          Menu
        </button>
        <nav
          className={`${open ? 'flex' : 'hidden'} absolute inset-x-0 top-full flex-col gap-4 border-b border-[#D6CEC3] bg-[#F7F4EF] px-6 py-4 text-xs font-semibold md:static md:flex md:flex-row md:items-center md:gap-[27px] md:border-0 md:bg-transparent md:p-0`}
          aria-label="Main navigation"
        >
          {LINKS.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => jump(item.id)}
              className={`text-left hover:text-[#9E8060] ${item.id === 'shop' && (page === 'shop' || page === 'product') ? 'text-[#9E8060]' : ''}`}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => jump('shop')}
            className="w-fit border border-[#D6CEC3] px-[13px] py-[9px] text-[11px] hover:text-[#9E8060]"
          >
            Bag ({cartCount})
          </button>
        </nav>
      </div>
    </header>
  )
}
