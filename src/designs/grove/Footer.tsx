import { useState } from 'react'
import type { DesignNavigate } from '../shared'

interface FooterProps {
  onNavigate: DesignNavigate
  onPicker: () => void
}

const wrap = 'mx-auto w-[min(1160px,calc(100%-38px))] min-[851px]:w-[min(1160px,calc(100%-76px))]'

const LINKS = [
  { id: 'shop', label: 'Products' },
  { id: 'routine', label: 'The routine' },
  { id: 'founders', label: 'Our story' },
  { id: 'professionals', label: 'For professionals' },
]

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
    <footer id="footer" className="scroll-mt-24 bg-[#284235] px-0 pb-[25px] pt-[65px] text-[#F6F3E9]">
      <div className={wrap}>
        <div className="grid grid-cols-1 gap-5 min-[561px]:grid-cols-2 min-[561px]:gap-[50px] min-[851px]:grid-cols-[1.3fr_1fr_1fr]">
          <div className="min-[561px]:col-span-2 min-[851px]:col-span-1">
            <h2 className="font-display text-[30px] leading-none tracking-[-0.035em]">Skin Protocol RX</h2>
            <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-[#D5DFD2]">
              Family-founded in New York. Purposeful skincare shaped by professional knowledge.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-[0.19em] uppercase text-[#BFCCB9]">Explore</p>
            <ul className="mt-2">
              {LINKS.map(item => (
                <li key={item.id}>
                  <button type="button" onClick={() => jump(item.id)} className="py-[7px] text-left text-[13px] hover:text-[#BFCCB9]">
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <button type="button" onClick={onPicker} className="py-[7px] text-left text-[13px] hover:text-[#BFCCB9]">
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
            <p className="text-[11px] font-bold tracking-[0.19em] uppercase text-[#BFCCB9]">A note from the bench</p>
            <p className="mt-3 text-[13px] leading-relaxed text-[#D5DFD2]">
              Notes on products, routines and a simpler way to care for skin.
            </p>
            {sent ? (
              <p className="mt-4 text-[13px]">You are on the list.</p>
            ) : (
              <div className="mt-3.5 flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  placeholder="Email address"
                  aria-label="Email address"
                  className="min-w-0 flex-1 rounded-[20px] border-0 bg-white px-3 py-3 text-[13px] text-[#23332A]"
                />
                <button type="submit" className="rounded-[30px] border border-white bg-transparent px-4 py-2.5 text-[13px] text-white">
                  Join
                </button>
              </div>
            )}
          </form>
        </div>
        <p className="mt-[50px] border-t border-[#637464] pt-[19px] text-[11px] text-[#C2CDBF]">
          © {new Date().getFullYear()} Skin Protocol RX · Cruelty-free · Never tested on animals · New York
        </p>
      </div>
    </footer>
  )
}
