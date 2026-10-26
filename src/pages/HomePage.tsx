import { useState } from 'react'
import ProtocolOverviewSection from '../designs/ProtocolOverviewSection'

type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product' | 'glossary' | 'education'

interface HomePageProps {
  onNavigate: (page: Page, productId?: string) => void
}

const TESTIMONIALS_CUSTOMER = [
  { name: 'Rachel M.', location: 'New York, NY', text: 'The Hyaluronic Acid Serum changed my morning routine completely. My skin has never felt this hydrated by midday.', rating: 5 },
  { name: 'Danielle K.', location: 'Brooklyn, NY', text: 'I was hesitant to try a 20% vitamin C but Brighten & Glow C Serum has been a game changer for my hyperpigmentation.', rating: 5 },
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

export default function HomePage({ onNavigate }: HomePageProps) {
  const [testimonialTab, setTestimonialTab] = useState<'customer' | 'pro'>('customer')
  const testimonials = testimonialTab === 'customer' ? TESTIMONIALS_CUSTOMER : TESTIMONIALS_PRO

  return (
    <div className="bg-ivory font-sans">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] grid grid-cols-1 lg:grid-cols-2 items-center">
        {/* Left: copy */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 pt-6 pb-24 lg:pt-4 lg:pb-16 order-2 lg:order-1">
          <p className="text-[11px] tracking-[0.3em] uppercase text-green font-medium mb-6">
            Skincare with intention
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-charcoal mb-7">
            Your Skin Doesn&apos;t Need More.<br />
            <em>It Needs What Works.</em>
          </h1>
          <p className="text-base text-charcoal/60 leading-relaxed max-w-xl mb-10">
            Each formula is constructed for performance — using only what the skin needs to function, repair, and improve. Formulated with proven actives chosen for performance, not trends. Thoughtfully selected ingredients and formulas, bringing professional skincare into your everyday routine. Every formulation is created with one goal: effective, evidence-driven skincare that supports long-term skin function. Just thoughtful formulas, professional insight, and a routine that feels right for you.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10 w-full">
            <button
              onClick={() => onNavigate('shop')}
              className="w-full sm:w-auto whitespace-nowrap bg-charcoal text-white px-7 py-3.5 text-sm tracking-wide font-medium hover:bg-charcoal/80 transition-colors"
            >
              Explore the collection
            </button>
            <button
              onClick={() => onNavigate('protocol')}
              className="w-full sm:w-auto whitespace-nowrap border border-charcoal text-charcoal px-7 py-3.5 text-sm tracking-wide font-medium hover:bg-charcoal hover:text-white transition-colors"
            >
              Build your protocol
            </button>
          </div>
          <p className="text-xs tracking-widest uppercase text-charcoal/40">
            Simple formulas · Professional performance · Healthier-looking skin
          </p>
        </div>

        {/* Right: image */}
        <div className="relative order-1 lg:order-2 flex items-center pb-24 lg:pb-16">
          <div className="relative w-full">
            <img
              src="/hero-sunlit-spa.jpg"
              alt="Skin Protocol RX bottles and jars arranged on sunlit stone"
              className="w-full h-auto object-cover object-center"
            />
            <div className="absolute bottom-0 left-0 z-10 translate-y-[78%] lg:-translate-x-8 bg-black text-white border border-rose/30 p-3 lg:p-5 max-w-[11rem] lg:max-w-xs">
              <p className="text-[0.625rem] lg:text-xs tracking-[0.14em] lg:tracking-widest uppercase text-rose font-medium leading-tight mb-1 lg:mb-2">Cruelty-Free</p>
              <p className="text-xs lg:text-sm font-sans leading-snug">Professional formulas. No animal testing. Ever.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INGREDIENT PHILOSOPHY ────────────────────────────────────── */}
      <section className="bg-stone py-24 px-5 md:px-8 border-y border-gray-soft">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-12 lg:gap-16 lg:items-center">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-5">Our Philosophy</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-7">
              Everything Your Skin Needs.<br />
              <em>Nothing It Doesn&apos;t.</em>
            </h2>
            <p className="text-base text-charcoal/70 leading-relaxed">
              We formulate with thoughtfully selected actives and botanical ingredients, each chosen for a reason—to support healthy, resilient skin. Every product has a clear role in a simplified, effective routine. Our focus is on high-quality formulas and useful product education, without chasing trends or adding unnecessary extras.
            </p>
            <div className="mt-7 grid grid-cols-1 border-t border-gray-soft min-[701px]:grid-cols-3">
              {(
                [
                  { label: 'Our Standards', body: 'How we decide what stays and what stays out.', page: 'story' as Page, id: 'our-standards' },
                  { label: 'Ingredient Glossary', body: 'See what is in the formulas and why.', page: 'glossary' as Page },
                  { label: 'Product Education', body: 'Learn what each product is good for.', page: 'education' as Page },
                ] as const
              ).map((l, i) => (
                <button
                  key={l.label}
                  type="button"
                  onClick={() => onNavigate(l.page, 'id' in l ? l.id : undefined)}
                  className={`group flex w-full items-center justify-between gap-2.5 border-b border-gray-soft py-[18px] text-left min-[701px]:border-b-0 min-[701px]:border-l min-[701px]:px-3 min-[701px]:py-5 min-[701px]:first:border-l-0 min-[701px]:first:pl-0 min-[701px]:last:pr-0 ${i === 2 ? 'border-b-0' : ''}`}
                >
                  <span>
                    <span className="relative inline-block whitespace-nowrap text-sm font-medium text-charcoal transition-colors group-hover:text-rose after:absolute after:left-0 after:bottom-[-4px] after:h-px after:w-0 after:bg-rose after:transition-[width] after:duration-300 group-hover:after:w-full">
                      {l.label}
                    </span>
                    <span className="mt-1.5 block text-xs leading-snug text-charcoal/60">{l.body}</span>
                  </span>
                  <span className="shrink-0 text-charcoal transition-all duration-200 group-hover:translate-x-1 group-hover:text-rose" aria-hidden="true">→</span>
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-7">
            {(
              [
                { symbol: '✳', title: 'Thoughtfully selected', body: 'Purposeful formulations. A protocol with purpose.' },
                { symbol: '◌', title: 'Tried and true', body: 'Supported by research and evidence-based information.' },
                { symbol: '✧', title: 'Results without hype', body: 'Backed by research. No unnecessary extras.' },
                { symbol: '+', title: 'Clinical intention', body: 'Where clinical intention meets natural intelligence.' },
                { symbol: '♡', title: 'Never tested on animals', body: 'A standard we hold, not a badge.' },
                { symbol: '◎', title: 'Expert founded', body: 'Chemist · Nurse Practitioner · Esthetician' },
              ] as const
            ).map((point, i, arr) => (
              <div
                key={point.title}
                className={`flex items-center gap-5 border-t border-gray-soft py-6 ${i >= arr.length - 2 ? 'border-b border-gray-soft' : ''}`}
              >
                <span className="shrink-0 font-serif text-[30px] leading-none text-rose" aria-hidden="true">{point.symbol}</span>
                <div>
                  <p className="font-serif text-[22px] text-charcoal leading-tight">{point.title}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-charcoal/60">{point.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProtocolOverviewSection
        tone="original"
        id="protocol-overview"
        onCta={() => onNavigate('protocol')}
      />

      {/* ── OUR STORY ────────────────────────────────────────────────── */}
      <section className="py-24 px-5 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative w-[85.5%]">
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
            <div className="absolute -bottom-6 -right-6 bg-black text-white border border-rose/30 p-3 lg:p-5 max-w-xs hidden md:block">
              <p className="text-[0.625rem] lg:text-xs tracking-[0.14em] lg:tracking-widest uppercase text-rose font-medium leading-tight mb-1 lg:mb-2">Family owned</p>
              <p className="text-xs lg:text-sm font-sans leading-snug">Created in New York by a family who believes healthy skin doesn&apos;t need more than what works.</p>
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
              className="text-link text-xs font-medium text-black hover:text-rose"
            >
              Our Story
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
          <div className="relative aspect-[1024/625] bg-stone overflow-hidden">
            <img
              src="/spa-professionals-display.jpg"
              alt="Skin Protocol RX products displayed on a spa counter beside rolled towels"
              className="w-full h-full object-cover object-center"
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
    </div>
  )
}
