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
    <footer className="px-4 pb-6 md:px-8">
      <div className="rounded-[2rem] bg-[#2A3328] px-6 py-10 text-[#F3EEE4] md:px-10">
        <div className="grid gap-8 md:grid-cols-[1.3fr_auto]">
          <div>
            <p className="font-display text-3xl italic">A note from the bench.</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">
              Family-owned in New York. Never tested on animals.
            </p>
            <div className="mt-4 flex gap-4 text-sm">
              <button type="button" onClick={() => onNavigate('home')}>Home</button>
              <button type="button" onClick={() => onNavigate('shop')}>The bench</button>
              <button type="button" onClick={onPicker}>All designs</button>
            </div>
          </div>
          <form
            onSubmit={event => {
              event.preventDefault()
              if (email) setSent(true)
            }}
            className="md:w-72"
          >
            {sent ? (
              <p className="text-sm">You are on the list.</p>
            ) : (
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="Email address"
                  className="rounded-full bg-[#F6F3EA] px-4 py-2 text-sm text-[#243026]"
                />
                <button type="submit" className="rounded-full bg-[#E7EFE0] px-4 py-2 text-sm text-[#243026]">
                  Send a note
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </footer>
  )
}
