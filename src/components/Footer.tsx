import { useState } from 'react'

type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product' | 'glossary' | 'education'

interface FooterProps {
  onNavigate: (page: Page) => void
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <footer className="bg-black text-white font-sans">
      {/* Email signup */}
      <div className="border-b border-white/10 py-16 px-5 md:px-8">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-4">Join the Protocol</p>
          <h3 className="font-serif text-2xl md:text-3xl mb-3 text-white">Healthy Skin Starts With the Right Protocol</h3>
          <p className="text-white/50 text-sm leading-relaxed mb-8">
            Join the Skin Protocol RX community for skincare education, product guidance, new releases, and exclusive offers.
          </p>
          {submitted ? (
            <p className="text-rose font-medium">You&apos;re on the list. Welcome to the protocol.</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-sm mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 bg-white/5 border border-white/15 px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-rose transition-colors"
              />
              <button
                type="submit"
                className="bg-rose hover:bg-rose-dark text-white px-5 py-2.5 text-sm font-medium transition-colors whitespace-nowrap"
              >
                Join the Protocol
              </button>
            </form>
          )}
          <p className="text-white/25 text-xs mt-4">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="mb-5">
            <img
              src="/logo.png"
              alt="Skin Protocol RX"
              className="h-[4.5rem] sm:h-[5.5rem] md:h-[6.5rem] w-auto"
            />
          </div>
          <p className="text-white/45 text-xs leading-relaxed mb-5">
            Family-owned and created in New York.<br />
            Never tested on animals.
          </p>
          <div className="flex gap-4">
            {['instagram', 'tiktok', 'facebook'].map(s => (
              <button key={s} className="text-white/35 hover:text-rose transition-colors text-xs uppercase tracking-widest">{s.slice(0,2).toUpperCase()}</button>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-xs tracking-widest uppercase text-rose/70 mb-5">Shop</h4>
          <ul className="space-y-3">
            {['All Products', 'Serums', 'Moisturizers', 'Cleansers', 'Eye Care', 'Facial Oils', 'Sets & Bundles'].map(l => (
              <li key={l}>
                <button
                  onClick={() => onNavigate('shop')}
                  className="text-sm text-white/55 hover:text-white transition-colors"
                >
                  {l}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-xs tracking-widest uppercase text-rose/70 mb-5">Company</h4>
          <ul className="space-y-3">
            {[
              { label: 'Our Story', page: 'story' as Page },
              { label: 'Spa Partners', page: 'spa' as Page },
              { label: 'Build Your Protocol', page: 'protocol' as Page },
            ].map(l => (
              <li key={l.label}>
                <button onClick={() => onNavigate(l.page)} className="text-sm text-white/55 hover:text-white transition-colors">{l.label}</button>
              </li>
            ))}
            {['Customer Login', 'Spa Partner Login', 'FAQ', 'Contact'].map(l => (
              <li key={l}><button className="text-sm text-white/55 hover:text-white transition-colors">{l}</button></li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-xs tracking-widest uppercase text-rose/70 mb-5">Support</h4>
          <ul className="space-y-3">
            {['Shipping & Returns', 'Privacy Policy', 'Terms of Service', 'Accessibility'].map(l => (
              <li key={l}><button className="text-sm text-white/55 hover:text-white transition-colors">{l}</button></li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-5 md:px-8 py-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-white/30 text-xs">
        <p>&copy; {new Date().getFullYear()} Skin Protocol RX. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-rose" />
          Cruelty-Free · Never Tested on Animals · Family-Owned in New York
        </p>
      </div>
    </footer>
  )
}
