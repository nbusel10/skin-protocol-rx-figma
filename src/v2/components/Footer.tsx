import { useState } from 'react'

type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product' | 'glossary' | 'education'

interface FooterProps {
  onNavigate: (page: Page) => void
  compareLabel?: string
  onCompare?: () => void
}

export default function Footer({ onNavigate, compareLabel, onCompare }: FooterProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <footer className="bg-charcoal text-white font-sans">
      <div className="border-b border-white/10 py-14 px-5 md:px-8">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-4">Stay in touch</p>
          <h3 className="font-serif text-2xl md:text-3xl mb-3 text-white">A calmer way to care for your skin</h3>
          <p className="text-white/70 text-base leading-relaxed mb-8">
            Notes on routines, new formulas, and offers from Skin Protocol RX.
          </p>
          {submitted ? (
            <p className="text-rose font-medium">You&apos;re on the list. Welcome.</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-sm mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 bg-white/10 border border-white/20 px-4 py-2.5 text-sm text-white placeholder:text-white/45 focus:outline-none focus:border-rose transition-colors"
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap"
              >
                Join
              </button>
            </form>
          )}
          <p className="text-white/40 text-xs mt-4">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="mb-5">
            <img
              src="/logo.png"
              alt="Skin Protocol RX"
              className="h-20 sm:h-24 w-auto"
            />
            <p className="font-serif text-sm text-white/80 mt-3">The Natural Prescription</p>
          </div>
          <p className="text-white/65 text-sm leading-relaxed mb-5">
            Family-owned formulas.<br />
            Never tested on animals.
          </p>
          <div className="flex gap-4">
            {['instagram', 'tiktok', 'facebook'].map(s => (
              <button key={s} className="text-white/55 hover:text-rose transition-colors text-xs uppercase tracking-widest">{s.slice(0, 2).toUpperCase()}</button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs tracking-widest uppercase text-rose mb-5">Collection</h4>
          <ul className="space-y-3">
            {['All Products', 'Serums', 'Moisturizers', 'Cleansers', 'Eye Care', 'Facial Oils'].map(l => (
              <li key={l}>
                <button
                  onClick={() => onNavigate('shop')}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  {l}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs tracking-widest uppercase text-rose mb-5">Company</h4>
          <ul className="space-y-3">
            {[
              { label: 'Our Story', page: 'story' as Page },
              { label: 'Spa Partners', page: 'spa' as Page },
              { label: 'Build Your Protocol', page: 'protocol' as Page },
              { label: 'Ingredient Glossary', page: 'glossary' as Page },
              { label: 'Product Education', page: 'education' as Page },
            ].map(l => (
              <li key={l.label}>
                <button onClick={() => onNavigate(l.page)} className="text-sm text-white/70 hover:text-white transition-colors">{l.label}</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs tracking-widest uppercase text-rose mb-5">Support</h4>
          <ul className="space-y-3">
            {['Shipping & Returns', 'Privacy Policy', 'Terms of Service', 'Accessibility'].map(l => (
              <li key={l}><button className="text-sm text-white/70 hover:text-white transition-colors">{l}</button></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 md:px-8 py-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-white/50 text-xs">
        <p>&copy; {new Date().getFullYear()} Skin Protocol RX. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-rose" />
          Cruelty-free · Never tested on animals
        </p>
        {onCompare && compareLabel && (
          <button type="button" onClick={onCompare} className="underline underline-offset-2 hover:text-white transition-colors">
            {compareLabel}
          </button>
        )}
      </div>
    </footer>
  )
}
