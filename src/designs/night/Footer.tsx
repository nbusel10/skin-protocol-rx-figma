import { useState } from 'react'
import type { DesignNavigate } from '../shared'

interface FooterProps {
  onNavigate: DesignNavigate
  onPicker: () => void
}

export default function Footer({ onNavigate, onPicker }: FooterProps) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <footer className="border-t border-white/10 bg-[#0C0C0B] px-5 py-8 text-[#E8E2D6] md:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-3xl">SPRX</p>
          <p className="mt-2 text-sm text-[#A7A79F]">New York. Never tested on animals.</p>
          <div className="mt-4 flex gap-5 text-[11px] tracking-[0.18em] uppercase text-[#C4B49A]">
            <button type="button" onClick={() => onNavigate('home')}>Rooms</button>
            <button type="button" onClick={() => onNavigate('shop')}>Line</button>
            <button type="button" onClick={onPicker}>All designs</button>
          </div>
        </div>
        <form
          onSubmit={event => {
            event.preventDefault()
            if (email) setSent(true)
          }}
          className="w-full max-w-sm"
        >
          {sent ? (
            <p className="text-sm">You are on the list.</p>
          ) : (
            <div className="flex border-b border-[#C4B49A]">
              <input
                type="email"
                required
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder="Email"
                className="w-full bg-transparent py-2 text-sm outline-none"
              />
              <button type="submit" className="text-[11px] tracking-[0.16em] uppercase text-[#C4B49A]">
                Join
              </button>
            </div>
          )}
        </form>
      </div>
    </footer>
  )
}
