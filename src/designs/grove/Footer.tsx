import { useState } from 'react'
import type { DesignNavigate } from '../shared'

interface FooterProps {
  onNavigate: DesignNavigate
  onPicker: () => void
}

const LINKS = [
  { id: 'grove-founders', label: 'The family' },
  { id: 'grove-protocol', label: 'A day, drawn simply' },
  { id: 'grove-match', label: 'Find a formula' },
  { id: 'grove-bench', label: 'From the bench' },
  { id: 'grove-spas', label: 'For spas' },
]

export default function Footer({ onNavigate, onPicker }: FooterProps) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function jump(id: string) {
    const node = document.getElementById(id)
    if (node) {
      node.scrollIntoView({ behavior: 'smooth' })
      return
    }
    onNavigate(id === 'grove-bench' ? 'shop' : 'home')
  }

  return (
    <footer className="px-4 pb-6 md:px-8">
      <div className="rounded-[2.2rem] bg-[#243026] px-6 py-12 text-[#F3EEE4] md:px-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="font-display text-4xl italic leading-none md:text-5xl">Skin Protocol RX</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
              Family-owned in New York. A chemist, a nurse practitioner, and a licensed medical esthetician. Never tested on animals.
            </p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#C9D3BE]">In the grove</p>
            <ul className="mt-4 space-y-2.5">
              {LINKS.map(item => (
                <li key={item.id}>
                  <button type="button" onClick={() => jump(item.id)} className="text-left hover:text-[#C9D3BE]">
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <button type="button" onClick={() => onNavigate('shop')} className="hover:text-[#C9D3BE]">
                  The whole collection
                </button>
              </li>
              <li>
                <button type="button" onClick={onPicker} className="hover:text-[#C9D3BE]">
                  All designs
                </button>
              </li>
            </ul>
          </div>
          <form
            onSubmit={event => {
              event.preventDefault()
              if (email) setSent(true)
            }}
          >
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#C9D3BE]">A note from the bench</p>
            <p className="mt-4 font-display text-2xl italic leading-snug">When a formula is ready, we will write.</p>
            {sent ? (
              <p className="mt-5 text-sm">You are on the list.</p>
            ) : (
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="Email address"
                  aria-label="Email address"
                  className="w-full rounded-full bg-[#F6F3EA] px-4 py-3 text-sm text-[#243026]"
                />
                <button type="submit" className="rounded-full bg-[#E7EFE0] px-5 py-3 text-sm text-[#243026]">
                  Send
                </button>
              </div>
            )}
          </form>
        </div>
        <p className="mt-10 border-t border-white/15 pt-5 text-[11px] tracking-[0.14em] uppercase text-white/55">
          © {new Date().getFullYear()} Skin Protocol RX · Cruelty-free · New York
        </p>
      </div>
    </footer>
  )
}
