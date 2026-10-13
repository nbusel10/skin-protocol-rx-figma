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
    <footer className="border-t-2 border-[#1A1916] bg-[#F7F4EF] text-[#1A1916]">
      <div className="grid gap-8 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:px-10">
        <div>
          <p className="font-serif text-3xl">Colophon</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#3C3832]">
            Family-owned and created in New York. Never tested on animals. The issue is the line.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 text-sm">
          <button type="button" onClick={() => onNavigate('home')}>The feature</button>
          <button type="button" onClick={() => onNavigate('shop')}>The collection</button>
          <button type="button" onClick={onPicker}>All designs</button>
        </div>
        <form
          onSubmit={event => {
            event.preventDefault()
            if (email) setSent(true)
          }}
        >
          <p className="text-[11px] tracking-[0.18em] uppercase">The list</p>
          {sent ? (
            <p className="mt-3 text-sm">You are on the list.</p>
          ) : (
            <div className="mt-3 flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder="Email address"
                className="w-full border border-[#1A1916] bg-transparent px-3 py-2 text-sm"
              />
              <button type="submit" className="bg-[#1A1916] px-3 text-[11px] tracking-[0.14em] uppercase text-[#F7F4EF]">
                Join
              </button>
            </div>
          )}
        </form>
      </div>
    </footer>
  )
}
