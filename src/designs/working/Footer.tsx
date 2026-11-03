import { useState } from 'react'

const EXPLORE = [
  { href: '/shop', label: 'Shop' },
  { href: '#protocol', label: 'Build your protocol' },
  { href: '/our-story#our-story', label: 'Our story' },
  { href: '/spa-partners', label: 'Spa partners' },
]

const LEARN = [
  { href: '/our-story#our-standards', label: 'Our standards' },
  { href: '/ingredient-glossary', label: 'Ingredient glossary' },
  { href: '/product-education', label: 'Product education' },
]

export default function Footer({ lighter = false }: { lighter?: boolean }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const eyebrow = lighter
    ? 'text-[11px] font-medium tracking-[0.16em] uppercase text-[#6D6A63]'
    : 'text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]'

  return (
    <footer
      id="contact"
      className={`scroll-mt-28 border-t font-sans text-[#252520] ${lighter ? 'border-[#E7E2DC] bg-white' : 'border-[#D6CEC3] bg-[#FFFDFA]'}`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.3fr_1fr_1fr_1.25fr] lg:py-20">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="w-[16rem] max-w-full">
            <img src="/logo-brand.png" alt="Skin Protocol RX" className="mx-auto h-24 w-auto" />
            <p className="mt-5 text-[15px] leading-relaxed text-[#595750]">
              Family-owned in New York. Formulas with a purpose, from the lab to the treatment room.
            </p>
          </div>
        </div>

        <div>
          <p className={eyebrow}>Explore</p>
          <span aria-hidden="true" className="mt-3 block w-8 border-t border-[#ab8584]" />
          <ul className="mt-4 space-y-3">
            {EXPLORE.map(item => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-[#252520] transition-colors duration-200 hover:text-[#ab8584]">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={eyebrow}>Learn</p>
          <span aria-hidden="true" className="mt-3 block w-8 border-t border-[#ab8584]" />
          <ul className="mt-4 space-y-3">
            {LEARN.map(item => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-[#252520] transition-colors duration-200 hover:text-[#ab8584]">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={event => {
            event.preventDefault()
            if (email) setSent(true)
          }}
        >
          <p className={eyebrow}>Stay in touch</p>
          <span aria-hidden="true" className="mt-3 block w-8 border-t border-[#ab8584]" />
          <p className="mt-4 text-sm leading-relaxed text-[#595750]">
            Skincare thoughts and product news, when there is something worth sharing.
          </p>
          {sent ? (
            <p className="mt-5 text-sm text-[#252520]">You are on the list.</p>
          ) : (
            <div className={`mt-5 flex items-center border-b ${lighter ? 'border-[#252520]/70' : 'border-[#252520]'}`}>
              <input
                type="email"
                required
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder="Email address"
                aria-label="Email address"
                className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-[#6D6A63]"
              />
              <button
                type="submit"
                className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#252520] transition-colors duration-200 hover:text-[#ab8584]"
              >
                Join
              </button>
            </div>
          )}
        </form>
      </div>

      <div className={`border-t ${lighter ? 'border-[#E7E2DC]' : 'border-[#D6CEC3]'}`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-[11px] tracking-[0.04em] text-[#6D6A63] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Skin Protocol RX</p>
          <p>Cruelty-free · Never tested on animals · New York</p>
        </div>
      </div>
    </footer>
  )
}
