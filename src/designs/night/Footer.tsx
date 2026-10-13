import { useState } from 'react'
import type { DesignNavigate } from '../shared'

interface FooterProps {
  onNavigate: DesignNavigate
  onPicker: () => void
}

const VISIT = [
  { id: 'room-family', label: 'Our Story' },
  { id: 'room-protocol', label: 'Seven marks' },
  { id: 'room-match', label: 'Build your protocol' },
  { id: 'room-line', label: 'Four to begin' },
  { id: 'room-studio', label: 'For spas' },
  { id: 'room-voices', label: 'Notes' },
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
    onNavigate('home')
  }

  return (
    <footer className="bg-[#0C0C0B] text-[#E8E2D6]">
      <div className="border-t border-[#C4B49A] px-5 py-14 md:px-12 md:py-20">
        <p className="text-[11px] tracking-[0.38em] uppercase text-[#C4B49A]">Final chapter</p>
        <div className="mt-6 grid gap-12 lg:grid-cols-[1.4fr_0.8fr_1fr]">
          <div>
            <p className="font-display text-5xl leading-none md:text-6xl">Skin Protocol RX</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#C8C2B6]">
              Family-owned in New York. A chemist, a nurse practitioner, and a licensed medical esthetician. Never tested on animals.
            </p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#C4B49A]">In the atelier</p>
            <ul className="mt-4 space-y-3 text-sm">
              {VISIT.map(item => (
                <li key={item.id}>
                  <button type="button" onClick={() => jump(item.id)} className="hover:text-[#C4B49A]">
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <button type="button" onClick={() => onNavigate('shop')} className="hover:text-[#C4B49A]">
                  The whole line
                </button>
              </li>
              <li>
                <button type="button" onClick={onPicker} className="hover:text-[#C4B49A]">
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
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#C4B49A]">The list</p>
            <p className="mt-3 text-sm leading-relaxed text-[#C8C2B6]">A note from the laboratory, only when there is something to say.</p>
            {sent ? (
              <p className="mt-6 font-display text-2xl">You are on the list.</p>
            ) : (
              <div className="mt-6 flex border-b border-[#C4B49A]">
                <label className="sr-only" htmlFor="night-email">Email address</label>
                <input
                  id="night-email"
                  type="email"
                  required
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="Email address"
                  className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-[#8E8A82]"
                />
                <button type="submit" className="text-[11px] tracking-[0.18em] uppercase text-[#C4B49A]">
                  Send
                </button>
              </div>
            )}
          </form>
        </div>
        <p className="mt-14 border-t border-white/10 pt-6 text-[11px] tracking-[0.16em] uppercase text-[#8E8A82]">
          © 2026 Skin Protocol RX · Cruelty-free · New York
        </p>
      </div>
    </footer>
  )
}
