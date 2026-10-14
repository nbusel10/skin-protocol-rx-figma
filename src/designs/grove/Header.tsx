import { useState } from 'react'
import type { DesignNavigate, DesignPage } from '../shared'

interface HeaderProps {
  page: DesignPage
  cartCount: number
  onNavigate: DesignNavigate
}

const LINKS = [
  { id: 'story', label: 'Our philosophy' },
  { id: 'shop', label: 'Shop' },
  { id: 'routine', label: 'The routine' },
  { id: 'founders', label: 'Our story' },
  { id: 'professionals', label: 'For professionals' },
]

const wrap = 'mx-auto w-[min(1160px,calc(100%-38px))] lg:w-[min(1160px,calc(100%-76px))]'

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
    <header className="sticky top-0 z-30 border-b border-[#CBD2C4] bg-[#F6F3E9]/97 backdrop-blur-sm">
      <div className={`${wrap} flex min-h-[76px] items-center justify-between gap-6`}>
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="shrink-0 font-display text-[21px] font-medium tracking-[-0.05em] text-[#23332A] lg:text-[25px]"
        >
          Skin Protocol RX
        </button>
        <nav
          className={`${open ? 'flex' : 'hidden'} absolute inset-x-0 top-full flex-col gap-4 border-b border-[#CBD2C4] bg-[#F6F3E9] px-5 py-4 text-[13px] font-semibold lg:static lg:flex lg:flex-row lg:items-center lg:gap-7 lg:border-0 lg:bg-transparent lg:p-0`}
          aria-label="Primary"
        >
          {LINKS.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => jump(item.id)}
              className={`shrink-0 text-left hover:text-[#61755B] ${item.id === 'shop' && (page === 'shop' || page === 'product') ? 'text-[#61755B]' : 'text-[#23332A]'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => jump('shop')}
            className="rounded-full border border-[#CBD2C4] px-[13px] py-[7px] text-xs font-semibold text-[#23332A]"
          >
            Bag ({cartCount})
          </button>
          <button
            type="button"
            className="rounded-full border border-[#CBD2C4] px-3 py-2 text-[13px] font-semibold lg:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen(value => !value)}
          >
            Menu
          </button>
        </div>
      </div>
    </header>
  )
}
