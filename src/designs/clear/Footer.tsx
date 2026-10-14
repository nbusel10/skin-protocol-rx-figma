import { useState } from 'react'
import type { DesignNavigate } from '../shared'

interface FooterProps {
  onNavigate: DesignNavigate
  onPicker: () => void
}

const EXPLORE = [
  { id: 'shop', label: 'Shop all' },
  { id: 'protocol', label: 'Build your protocol' },
  { id: 'concerns', label: 'Shop by concern' },
]

const DISCOVER = [
  { id: 'story', label: 'Our story' },
  { id: 'studios', label: 'For professionals' },
  { id: 'footer', label: 'Contact' },
]

const wrap = 'mx-auto w-[min(1120px,calc(100%-2.75rem))] md:w-[min(1120px,calc(100%-5.5rem))]'

export default function Footer({ onNavigate, onPicker }: FooterProps) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function jump(id: string) {
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
    <footer id="footer" className="scroll-mt-28 border-t border-[#D6CEC3] bg-[#E8E2D9] text-[#252520]">
      <div className={`${wrap} pt-[60px] pb-6`}>
        <div className="grid grid-cols-2 gap-9 md:grid-cols-[2fr_1fr_1fr_1.7fr]">
          <div className="col-span-2 md:col-span-1">
            <p className="font-serif text-2xl font-medium tracking-[-0.06em]">Skin Protocol RX</p>
            <p className="mt-4 text-xs leading-relaxed text-[#6D6A63]">
              Professional skincare, made personal.
              <br />
              Family-owned · New York
            </p>
          </div>
          <div>
            <h2 className="mb-4 text-[10px] font-semibold tracking-[0.17em] uppercase">Explore</h2>
            {EXPLORE.map(item => (
              <button key={item.id} type="button" onClick={() => jump(item.id)} className="my-2 block text-left text-xs hover:text-[#9E8060]">
                {item.label}
              </button>
            ))}
          </div>
          <div>
            <h2 className="mb-4 text-[10px] font-semibold tracking-[0.17em] uppercase">Discover</h2>
            {DISCOVER.map(item => (
              <button key={item.id} type="button" onClick={() => jump(item.id)} className="my-2 block text-left text-xs hover:text-[#9E8060]">
                {item.label}
              </button>
            ))}
            <button type="button" onClick={onPicker} className="my-2 block text-left text-xs hover:text-[#9E8060]">
              All designs
            </button>
          </div>
          <form
            className="col-span-2 md:col-span-1"
            onSubmit={event => {
              event.preventDefault()
              if (email) setSent(true)
            }}
          >
            <h2 className="mb-4 text-[10px] font-semibold tracking-[0.17em] uppercase">A note from the bench</h2>
            <p className="text-xs leading-relaxed text-[#6D6A63]">Skincare thoughts and product news, when there is something worth sharing.</p>
            {sent ? (
              <p className="mt-4 text-xs">You are on the list.</p>
            ) : (
              <div className="mt-4 flex border-b border-[#252520]">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="Email address"
                  aria-label="Email address"
                  className="min-w-0 flex-1 bg-transparent py-3 text-xs outline-none placeholder:text-[#6D6A63]"
                />
                <button type="submit" className="text-[11px] font-bold hover:text-[#9E8060]">
                  Join ↗
                </button>
              </div>
            )}
          </form>
        </div>
        <div className="mt-11 flex flex-col gap-4 border-t border-[#D6CEC3] pt-9 text-[10px] text-[#6E695F] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Skin Protocol RX</p>
          <p>Cruelty-free · Never tested on animals · New York</p>
        </div>
      </div>
    </footer>
  )
}
