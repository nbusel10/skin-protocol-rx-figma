import { useState } from 'react'
import { PRODUCTS, SKIN_CONCERNS, PROTOCOL_STEPS } from '../data'
import ProductImage from '../components/ProductImage'

type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product' | 'glossary' | 'education'

interface HomePageProps {
  onNavigate: (page: Page, productId?: string) => void
}

const BRAND_PROMISES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
        <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Purposeful Formulas',
    body: 'Every ingredient has a reason for being there.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
      </svg>
    ),
    title: 'No Unnecessary Additives',
    body: 'Nothing extra. Just targeted skincare support.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: 'Never Tested on Animals',
    body: 'Professional skincare created with care and integrity.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
    title: 'Family-Owned in New York',
    body: 'Personal standards, professional formulas, and a commitment to healthy skin.',
  },
]

const TESTIMONIALS_CUSTOMER = [
  { name: 'Rachel M.', location: 'New York, NY', text: 'The Hyaluronic Acid Serum changed my morning routine completely. My skin has never felt this hydrated by midday.', rating: 5 },
  { name: 'Danielle K.', location: 'Brooklyn, NY', text: 'I was hesitant to try a 20% vitamin C but the Advanced C Serum has been a game changer for my hyperpigmentation.', rating: 5 },
  { name: 'Sophia T.', location: 'Los Angeles, CA', text: 'Simple, effective products that do exactly what they say. I love that there are no unnecessary extras.', rating: 5 },
]

const TESTIMONIALS_PRO = [
  { name: 'Maria L., LE', location: 'NYC Skin Studio', text: 'My clients love being able to continue their protocol at home. The results speak for themselves between appointments.', rating: 5 },
  { name: 'Dr. Jennifer S.', location: 'Park Avenue Dermatology', text: 'Skin Protocol RX has made product recommendations simpler. Clients actually follow through because the routine is clear.', rating: 5 },
  { name: 'Aisha C., LE', location: 'Tribeca Wellness Spa', text: 'The ingredient quality is on par with clinical lines, but at a price point my clients are genuinely comfortable with.', rating: 5 },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={i <= rating ? '#B8878B' : 'none'}
          stroke="#B8878B"
          strokeWidth="1.5"
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  )
}

function ProductCard({ product, onNavigate, dark = false }: { product: typeof PRODUCTS[0]; onNavigate: (page: Page, id?: string) => void; dark?: boolean }) {
  const [hovered, setHovered] = useState(false)
  const textPrimary = dark ? 'text-white' : 'text-charcoal'
  const textMuted = dark ? 'text-white/45' : 'text-charcoal/40'
  const textSoft = dark ? 'text-white/55' : 'text-charcoal/50'

  return (
    <div
      className="group flex flex-col cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onNavigate('product', product.id)}
    >
      {/* Image */}
      <div className="relative mb-4">
        <ProductImage src={product.image} alt={product.name} hover />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badges.slice(0, 1).map(b => (
            <span
              key={b}
              className="text-[10px] tracking-widest uppercase px-2 py-1 font-medium"
              style={{ backgroundColor: b === 'Best Seller' ? '#B8878B' : '#0A0A0A', color: '#fff' }}
            >
              {b}
            </span>
          ))}
        </div>
        {/* Wishlist */}
        <button
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={e => e.stopPropagation()}
          aria-label="Add to wishlist"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        {/* Quick add */}
        <div className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${hovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
          <button
            className="w-full bg-black text-white text-xs tracking-widest uppercase py-3 hover:bg-rose transition-colors duration-200 font-medium"
            onClick={e => { e.stopPropagation() }}
          >
            Quick Add
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className={`text-[11px] tracking-widest uppercase ${textMuted} mb-0.5 font-sans`}>
              {product.categories[0]}
            </p>
            <h3 className={`font-sans text-sm font-medium ${textPrimary} leading-snug`}>{product.name}</h3>
          </div>
          <p className={`font-sans text-sm font-semibold ${textPrimary} whitespace-nowrap`}>${product.price}</p>
        </div>
        <p className={`text-xs ${textSoft} leading-relaxed`}>{product.tagline}</p>
        <div className="flex items-center gap-2 mt-1">
          <StarRating rating={Math.round(product.rating)} />
          <span className={`text-[11px] ${textMuted}`}>({product.reviews})</span>
        </div>
      </div>
    </div>
  )
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [testimonialTab, setTestimonialTab] = useState<'customer' | 'pro'>('customer')
  const testimonials = testimonialTab === 'customer' ? TESTIMONIALS_CUSTOMER : TESTIMONIALS_PRO
  const featuredProducts = PRODUCTS.filter(p =>
    ['advanced-c-serum-20', 'hyaluronic-acid-serum', 'firming-moisturizer', 'squalane-oil'].includes(p.id)
  )

  return (
    <div className="bg-ivory font-sans">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] grid grid-cols-1 lg:grid-cols-2">
        {/* Left: copy */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-24 lg:py-0 order-2 lg:order-1">
          <p className="text-[11px] tracking-[0.3em] uppercase text-green font-medium mb-6">
            New York · Since 2019
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-charcoal mb-7">
            Your Skin Doesn&apos;t Need More.<br />
            <em>It Needs What Works.</em>
          </h1>
          <p className="text-base text-charcoal/60 leading-relaxed max-w-md mb-10">
            Purposeful, professional skincare made without unnecessary additives. Family-owned, created in New York, and never tested on animals.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10 w-full max-w-xs sm:max-w-none">
            <button
              onClick={() => onNavigate('shop')}
              className="w-full sm:w-auto bg-charcoal text-white px-7 py-3.5 text-sm tracking-wide font-medium hover:bg-charcoal/80 transition-colors"
            >
              Shop Skin Protocol RX
            </button>
            <button
              onClick={() => onNavigate('protocol')}
              className="w-full sm:w-auto border border-charcoal text-charcoal px-7 py-3.5 text-sm tracking-wide font-medium hover:bg-charcoal hover:text-white transition-colors"
            >
              Find Your Protocol
            </button>
          </div>
          <p className="text-xs tracking-widest uppercase text-charcoal/40">
            Simple formulas · Professional performance · Healthier-looking skin
          </p>
        </div>

        {/* Right: image */}
        <div className="relative order-1 lg:order-2 h-72 lg:h-auto bg-white overflow-hidden">
          <img
            src="/hero.jpg"
            alt="Dewy, healthy skin with Skin Protocol RX"
            className="w-full h-full object-cover object-right"
          />
          {/* Floating trust card — compact on mobile so her face stays visible */}
          <div className="absolute bottom-4 left-4 lg:bottom-8 lg:left-8 bg-white/95 backdrop-blur-sm p-3 lg:p-5 shadow-lg max-w-[11.5rem] lg:max-w-xs">
            <div className="flex items-center gap-1.5 lg:gap-3 mb-1 lg:mb-2">
              <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-green shrink-0" />
              <p className="text-[0.625rem] lg:text-xs tracking-[0.14em] lg:tracking-widest uppercase text-charcoal/50 font-medium leading-tight">Cruelty-Free Certified</p>
            </div>
            <p className="text-xs lg:text-sm font-sans text-charcoal leading-snug">Professional formulas. No animal testing. Ever.</p>
          </div>
        </div>
      </section>

      {/* ── BRAND PROMISE ────────────────────────────────────────────── */}
      <section className="bg-black py-16 px-5 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10">
          {BRAND_PROMISES.map(p => (
            <div key={p.title} className="flex flex-col items-center text-center gap-4">
              <div className="text-green">{p.icon}</div>
              <h3 className="font-sans text-sm font-semibold text-white tracking-wide">{p.title}</h3>
              <p className="text-xs text-white/60 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SHOP BY SKIN CONCERN ─────────────────────────────────────── */}
      <section className="py-20 px-5 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-3">Find Your Focus</p>
              <h2 className="font-serif text-3xl md:text-4xl text-black">Shop by Skin Concern</h2>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="text-sm text-black underline underline-offset-4 hover:text-rose transition-colors"
            >
              View All Products →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {SKIN_CONCERNS.map(c => (
              <button
                key={c.id}
                onClick={() => onNavigate('shop')}
                className="group relative bg-white border border-gray-soft hover:border-rose p-6 text-left transition-all duration-200 hover:shadow-[0_4px_24px_rgba(184,135,139,0.12)]"
              >
                <div className="text-2xl text-black/15 group-hover:text-rose transition-colors mb-3 font-serif">{c.icon}</div>
                <h3 className="text-sm font-medium text-black mb-1">{c.label}</h3>
                <p className="text-xs text-black/40 leading-relaxed hidden lg:block">{c.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────── */}
      <section className="bg-white py-20 px-5 md:px-8 border-y border-gray-soft">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-3">Professional Favorites</p>
              <h2 className="font-serif text-3xl md:text-4xl text-black">Featured Products</h2>
            </div>
            <button onClick={() => onNavigate('shop')} className="text-sm text-black underline underline-offset-4 hover:text-rose transition-colors">
              Shop All →
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map(p => (
              <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BUILD YOUR PROTOCOL ──────────────────────────────────────── */}
      <section className="py-24 px-5 md:px-8 bg-stone border-y border-gray-soft">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-4">Personalized Routine</p>
            <h2 className="font-serif text-3xl md:text-4xl text-black mb-6">
              A Better Routine Starts With a Better Protocol
            </h2>
            <p className="text-base text-black/55 leading-relaxed mb-10 max-w-lg">
              Find products designed for your skin type, concerns, and daily routine. Build a straightforward regimen without unnecessary steps or ingredients.
            </p>
            <button
              onClick={() => onNavigate('protocol')}
              className="bg-black text-white px-8 py-4 text-sm tracking-wide font-medium hover:bg-rose transition-colors"
            >
              Build My Protocol
            </button>
          </div>

          {/* Protocol steps */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {PROTOCOL_STEPS.map(s => (
              <div key={s.step} className="bg-white p-5 flex flex-col gap-2 border border-gray-soft">
                <span className="text-[10px] tracking-[0.25em] uppercase text-rose font-medium">Step {s.step}</span>
                <h3 className="font-serif text-xl text-black">{s.name}</h3>
                <p className="text-xs text-black/45 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INGREDIENT PHILOSOPHY ────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1748543668687-624e058c367c?w=1600&h=700&fit=crop&auto=format"
            alt="Serum texture"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-black/75" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-5">Our Philosophy</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6">
              Everything Your Skin Needs.<br />
              <em>Nothing It Doesn&apos;t.</em>
            </h2>
            <p className="text-white/60 leading-relaxed mb-8">
              Skin Protocol RX focuses on purposeful, high-quality formulas rather than trend-driven ingredients or unnecessary fillers. Every product in our line has a clear role in your protocol.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {(
              [
                { label: 'Our Standards', page: 'story' as Page },
                { label: 'Ingredient Glossary', page: 'glossary' as Page },
                { label: 'Product Education', page: 'education' as Page },
              ] as const
            ).map(l => (
              <button
                key={l.label}
                onClick={() => onNavigate(l.page)}
                className="flex items-center justify-between text-white/70 hover:text-rose border-b border-white/15 pb-4 text-sm font-medium group transition-colors"
              >
                {l.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR STORY ────────────────────────────────────────────────── */}
      <section className="py-24 px-5 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] bg-stone overflow-hidden">
              <img
                src="/hydrated-glowing-skin-water-splash-skin-protocol-rx.png"
                alt="Woman with hydrated, glowing skin surrounded by splashing water"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-[58%_center]"
              />
            </div>
            {/* Decorative inset card */}
            <div className="absolute -bottom-6 -right-6 bg-black text-white p-6 max-w-xs hidden md:block border border-rose/30">
              <p className="text-[10px] tracking-[0.3em] uppercase text-rose mb-2">Est. 2019</p>
              <p className="font-serif text-lg leading-snug">Created in New York by a family who believes healthy skin doesn&apos;t need more than what works.</p>
            </div>
          </div>
          <div className="lg:pl-8">
            <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-5">Our Story</p>
            <h2 className="font-serif text-3xl md:text-4xl text-black mb-6">
              Created With Professional Standards and Personal Care
            </h2>
            <p className="text-black/55 leading-relaxed mb-6">
              Skin Protocol RX was created by a family that believes healthy skin should not require complicated routines or overloaded formulas. Every product reflects a commitment to purposeful ingredients, professional performance, and honest skincare.
            </p>
            <p className="text-black/55 leading-relaxed mb-10">
              Born in New York with one clear mission: give people the exact products their skin needs — and nothing it doesn&apos;t.
            </p>
            <button
              onClick={() => onNavigate('story')}
              className="flex items-center gap-3 text-sm font-medium text-black group"
            >
              <span className="border-b border-black pb-0.5 group-hover:border-rose group-hover:text-rose transition-colors">Our Story</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform text-black group-hover:text-rose">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── SPA PARTNERSHIP ──────────────────────────────────────────── */}
      <section className="bg-stone py-24 px-5 md:px-8 border-y border-gray-soft">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-5">For Professionals</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-black mb-6">
              Professional Skincare for Professionals Who Expect More
            </h2>
            <p className="text-black/55 leading-relaxed mb-10">
              Give your clients targeted, easy-to-understand skincare they can continue using at home. Skin Protocol RX helps spa professionals strengthen treatment results, simplify product recommendations, and build lasting client relationships.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('spa')}
                className="bg-black text-white px-7 py-3.5 text-sm font-medium hover:bg-rose transition-colors"
              >
                Explore Spa Partnerships
              </button>
              <button className="border border-black text-black px-7 py-3.5 text-sm font-medium hover:bg-black hover:text-white transition-colors">
                Spa Partner Login
              </button>
            </div>
          </div>
          <div className="relative aspect-video lg:aspect-[4/5] bg-black overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1761470575018-135c213340eb?w=900&h=1100&fit=crop&auto=format"
              alt="Spa treatment environment"
              className="w-full h-full object-cover opacity-90 grayscale-[30%]"
            />
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
      <section className="py-24 px-5 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-4">Real Results</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-8">What People Are Saying</h2>
            {/* Tabs */}
            <div className="inline-flex border border-white/15 bg-white/5">
              <button
                onClick={() => setTestimonialTab('customer')}
                className={`px-6 py-2.5 text-sm font-medium transition-colors ${testimonialTab === 'customer' ? 'bg-rose text-white' : 'text-white/50 hover:text-white'}`}
              >
                Customer Results
              </button>
              <button
                onClick={() => setTestimonialTab('pro')}
                className={`px-6 py-2.5 text-sm font-medium transition-colors ${testimonialTab === 'pro' ? 'bg-rose text-white' : 'text-white/50 hover:text-white'}`}
              >
                Spa Professional Reviews
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 flex flex-col gap-5">
                <StarRating rating={t.rating} />
                <p className="font-serif text-base leading-relaxed text-black italic">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-auto pt-4 border-t border-gray-soft">
                  <p className="text-sm font-medium text-black">{t.name}</p>
                  <p className="text-xs text-black/40">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL PRODUCT PREVIEW ─────────────────────────────────────── */}
      <section className="py-20 px-5 md:px-8 bg-white border-t border-gray-soft">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-3">The Collection</p>
              <h2 className="font-serif text-3xl md:text-4xl text-black">The Complete Collection</h2>
            </div>
            <button onClick={() => onNavigate('shop')} className="text-sm text-black underline underline-offset-4 hover:text-rose transition-colors">
              Shop All Products →
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-7">
            {PRODUCTS.slice(0, 8).map(p => (
              <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
