import { useState } from 'react'
import type { DesignNavigate } from '../shared'

interface FooterProps {
  onNavigate: DesignNavigate
  onPicker: () => void
}

const READ = [
  { id: 'feature', label: 'The feature' },
  { id: 'protocol', label: 'Build your protocol' },
  { id: 'collection', label: 'The edit' },
  { id: 'concerns', label: 'Shop by concern' },
  { id: 'studios', label: 'For studios' },
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
    onNavigate(id === 'collection' || id === 'concerns' ? 'shop' : 'home')
  }

  return (
    <footer className="border-t-2 border-[#1A1916] bg-[#F7F4EF] text-[#1A1916]">
      <div className="grid gap-12 px-5 py-14 md:px-10 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:py-16">
        <div>
          <p className="font-serif text-4xl leading-none tracking-tight md:text-5xl">Skin Protocol RX</p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#3C3832]">
            Family-owned and created in New York. A chemist, a nurse practitioner, and a licensed medical esthetician. Never tested on animals.
          </p>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#6E3B32]">Skin Protocol RX</p>
          <ul className="mt-4 space-y-3">
            {READ.map(item => (
              <li key={item.id}>
                <button type="button" onClick={() => jump(item.id)} className="font-serif text-xl leading-tight hover:text-[#6E3B32]">
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#6E3B32]">The line</p>
          <ul className="mt-4 space-y-3">
            <li>
              <button type="button" onClick={() => onNavigate('shop')} className="font-serif text-xl hover:text-[#6E3B32]">
                Shop the collection
              </button>
            </li>
            <li>
              <button type="button" onClick={() => onNavigate('home')} className="font-serif text-xl hover:text-[#6E3B32]">
                Home
              </button>
            </li>
            <li>
              <button type="button" onClick={onPicker} className="font-serif text-xl hover:text-[#6E3B32]">
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
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#6E3B32]">The list</p>
          <p className="mt-4 font-serif text-2xl leading-snug">Notes on the formulas, when there is something worth sending.</p>
          {sent ? (
            <p className="mt-5 text-sm">You are on the list.</p>
          ) : (
            <div className="mt-5 flex border-b border-[#1A1916]">
              <input
                type="email"
                required
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder="Email address"
                aria-label="Email address"
                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-[#8A847A]"
              />
              <button type="submit" className="text-[12px] tracking-[0.16em] uppercase hover:text-[#6E3B32]">
                Join
              </button>
            </div>
          )}
        </form>
      </div>
      <div className="flex flex-col gap-2 border-t border-[#1A1916] px-5 py-5 text-[11px] tracking-[0.14em] uppercase text-[#5C574E] md:flex-row md:items-center md:justify-between md:px-10">
        <p>© {new Date().getFullYear()} Skin Protocol RX</p>
        <p>Cruelty-free · Never tested on animals · New York</p>
      </div>
    </footer>
  )
}
