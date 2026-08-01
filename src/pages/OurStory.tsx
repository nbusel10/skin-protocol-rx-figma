type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product'

interface OurStoryProps {
  onNavigate: (page: Page, productId?: string) => void
}

const PHILOSOPHY_SECTIONS = [
  {
    title: 'Why Skin Protocol RX Was Created',
    body: 'The brand was born from a simple frustration: too many skincare products, too little clarity. A family that had spent years in the professional skincare world decided to build something different — a line where every product has a purpose, every formula has a reason, and every step makes sense.',
  },
  {
    title: 'Professional Skincare Without the Noise',
    body: 'Skin Protocol RX was designed to bring professional-grade formulas to everyday routines. The same quality used in spas and treatment rooms, built into a clear, step-by-step protocol anyone can follow at home.',
  },
  {
    title: 'Our Ingredient Philosophy',
    body: 'We start with the goal — what the skin needs — and work backward. We do not add ingredients for marketing appeal or trend cycles. If an ingredient is in our formula, it has a documented role in supporting skin health.',
  },
  {
    title: 'Our Commitment to Cruelty-Free Skincare',
    body: 'Skin Protocol RX products are never tested on animals. We believe effective skincare does not require that compromise. Our commitment to cruelty-free practices is not a marketing claim — it is a standard we hold without exception.',
  },
  {
    title: 'What "Protocol" Means',
    body: '"Protocol" is not just a name. It reflects a philosophy: skincare works best as a system, not a collection of random products. A protocol is intentional, sequential, and purposeful. That is how every Skin Protocol RX product is designed to be used.',
  },
  {
    title: 'Supporting Healthy Skin at Home and in the Treatment Room',
    body: 'When a client leaves a spa after a professional treatment, the results do not have to stop there. Skin Protocol RX gives spa professionals a coordinated home-care line that supports their work and keeps clients connected to their skincare goals between visits.',
  },
]

export default function OurStory({ onNavigate }: OurStoryProps) {
  return (
    <div className="bg-ivory font-sans">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1581182800629-7d90925ad072?w=1600&h=900&fit=crop&auto=format"
            alt="Our story"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase text-green mb-4">Family-Owned · New York</p>
          <h1 className="font-serif text-4xl md:text-6xl text-white max-w-2xl">
            Skincare With a Purpose Behind Every Product
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-3xl mx-auto px-5 md:px-8 py-20 text-center">
        <p className="font-serif text-xl md:text-2xl text-charcoal leading-relaxed mb-6">
          Skin Protocol RX was created by a family that believes healthy skin should not require complicated routines or overloaded formulas.
        </p>
        <p className="text-charcoal/60 leading-relaxed">
          Every product reflects a commitment to purposeful ingredients, professional performance, and honest skincare — built in New York, shared with the world.
        </p>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-soft" />

      {/* Split editorial */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-green mb-5">The Foundation</p>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6">Family-Owned and Created in New York</h2>
          <p className="text-charcoal/60 leading-relaxed mb-5">
            Skin Protocol RX is not a faceless brand. It was built by a family that started with personal standards and professional knowledge — and refused to compromise either.
          </p>
          <p className="text-charcoal/60 leading-relaxed mb-8">
            Created in New York, our formulas are shaped by years of professional skincare experience and a commitment to what actually works. No unnecessary steps. No trend-driven ingredients. Just purposeful skincare at professional quality.
          </p>
          <button
            onClick={() => onNavigate('shop')}
            className="flex items-center gap-3 text-sm font-medium text-charcoal group"
          >
            <span className="border-b border-charcoal pb-0.5 group-hover:text-green group-hover:border-green transition-colors">Explore the Collection</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="aspect-[4/5] bg-ivory-dark overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1551184451-76b762941ad6?w=900&h=1100&fit=crop&auto=format"
            alt="Natural portrait"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Philosophy sections */}
      <section className="bg-white border-t border-gray-soft py-20 px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] tracking-[0.3em] uppercase text-green mb-12 text-center">Our Values</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {PHILOSOPHY_SECTIONS.map(s => (
              <div key={s.title} className="border-l-2 border-green pl-8">
                <h3 className="font-serif text-xl text-charcoal mb-4">{s.title}</h3>
                <p className="text-charcoal/60 leading-relaxed text-sm">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="relative py-28 px-5 md:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1748543668709-793b38a2810d?w=1600&h=700&fit=crop&auto=format"
            alt="Skincare texture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/75" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="font-serif text-3xl md:text-4xl text-white italic mb-6">
            &ldquo;Purposeful skincare. Professional results. No unnecessary extras.&rdquo;
          </p>
          <p className="text-white/50 text-sm tracking-widest uppercase">Skin Protocol RX</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-5 md:px-8 text-center bg-green-light">
        <p className="text-[11px] tracking-[0.3em] uppercase text-green mb-4">Start Your Protocol</p>
        <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6">Ready to Build a Better Routine?</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => onNavigate('protocol')}
            className="bg-charcoal text-white px-8 py-3.5 text-sm font-medium hover:bg-charcoal/80 transition-colors"
          >
            Build My Protocol
          </button>
          <button
            onClick={() => onNavigate('shop')}
            className="border border-charcoal text-charcoal px-8 py-3.5 text-sm font-medium hover:bg-charcoal hover:text-white transition-colors"
          >
            Shop All Products
          </button>
        </div>
      </section>
    </div>
  )
}
