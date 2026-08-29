type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product'

interface OurStoryProps {
  onNavigate: (page: Page, productId?: string) => void
}

const FOUNDERS = [
  {
    name: 'Linda D. Amend, MS',
    role: 'Co-Founder | Chemist',
    blurb: 'Formulation-driven. Decades of ingredient development. Focused on stability, delivery, and performance.',
    image: '/linda-amend-chemist-co-founder-skin-protocol-rx.png',
    alt: 'Linda D. Amend, MS — chemist and co-founder of Skin Protocol RX, in a branded white lab coat',
  },
  {
    name: 'Susanna Amend, NP',
    role: 'Co-Founder | Nurse Practitioner',
    blurb: 'Patient-facing insight. Translates clinical needs into product design. Focus on real-world skin response.',
    image: 'https://skinprotocolrx.com/cdn/shop/files/5B62A1EE-DCE3-41D1-83BA-B0966D3051AF_4_5005_c.jpg?v=1776599704&width=800',
    alt: 'Susanna Amend, NP — nurse practitioner and co-founder of Skin Protocol RX',
  },
  {
    name: 'Christina Corbin, LME',
    role: 'Co-Founder | Licensed Medical Esthetician',
    blurb: 'Hands-on skin expertise. Refines formulations through treatment experience. Focus on texture, tolerance, and results.',
    image: 'https://skinprotocolrx.com/cdn/shop/files/6103798B-BA6F-4093-A676-897E515244CC_1_201_a.jpg?v=1776598050&width=800',
    alt: 'Christina Corbin, LME — licensed medical esthetician and co-founder of Skin Protocol RX',
  },
]

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
    <div className="bg-white font-sans">
      {/* Hero */}
      <section className="bg-black">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[60vh] py-16 lg:py-0">
          <div className="order-2 lg:order-1">
            <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-4">Family-Owned · New York</p>
            <h1 className="font-serif text-4xl md:text-6xl text-white">
              Skincare With a Purpose Behind Every Product
            </h1>
          </div>
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            {/* Wrapper hugs the image so the blend gradient tracks its actual edge */}
            <div className="relative w-fit">
              <img
                src="/our-story-serum.png"
                alt="Skin Protocol RX Hyaluronic Acid Serum being dispensed in the lab"
                className="block w-auto max-h-[60vh] object-contain"
              />
              {/* The shot's own backdrop is navy, not black, so its edges would otherwise read as seams */}
              <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-black via-black/70 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-black to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-3xl mx-auto px-5 md:px-8 py-20 text-center bg-stone">
        <p className="font-serif text-xl md:text-2xl text-black leading-relaxed mb-6">
          Skin Protocol RX was created by a family that believes healthy skin should not require complicated routines or overloaded formulas.
        </p>
        <p className="text-black/55 leading-relaxed">
          Every product reflects a commitment to purposeful ingredients, professional performance, and honest skincare — built in New York, shared with the world.
        </p>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-soft" />

      {/* Split editorial */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-5">The Foundation</p>
          <h2 className="font-serif text-3xl md:text-4xl text-black mb-6">Family-Owned and Created in New York</h2>
          <p className="text-black/55 leading-relaxed mb-5">
            Skin Protocol RX is not a faceless brand. It was built by a family that started with personal standards and professional knowledge — and refused to compromise either.
          </p>
          <p className="text-black/55 leading-relaxed mb-8">
            Created in New York, our formulas are shaped by years of professional skincare experience and a commitment to what actually works. No unnecessary steps. No trend-driven ingredients. Just purposeful skincare at professional quality.
          </p>
          <button
            onClick={() => onNavigate('shop')}
            className="flex items-center gap-3 text-sm font-medium text-charcoal group"
          >
            <span className="border-b border-black pb-0.5 group-hover:text-rose group-hover:border-rose transition-colors">Explore the Collection</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform group-hover:text-rose">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="aspect-[3/2] bg-stone overflow-hidden">
          <img
            src="/family-owned-skin-protocol-rx-founders-skincare-lab-new-york.png"
            alt="Skin Protocol RX founders Linda D. Amend, Susanna Amend, and Christina Corbin formulating skincare in a New York lab"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </section>

      {/* Meet the Founders */}
      <section className="bg-black py-20 px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-5">The Founders</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-5">
              Built by people who treat skin. Not people who market it.
            </h2>
            <p className="font-serif text-xl text-white/80 mb-3">Three disciplines. One system.</p>
            <p className="text-[11px] tracking-[0.25em] uppercase text-white/40">
              Chemist · Nurse Practitioner · Esthetician
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {FOUNDERS.map(founder => (
              <article key={founder.name}>
                <div className="aspect-[4/5] bg-white/5 overflow-hidden mb-6">
                  <img
                    src={founder.image}
                    alt={founder.alt}
                    title={`${founder.name} — ${founder.role.replace('|', '·')}, Skin Protocol RX`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover grayscale-[20%]"
                  />
                </div>
                <h3 className="font-serif text-xl text-white mb-2">{founder.name}</h3>
                <p className="text-[11px] tracking-[0.2em] uppercase text-rose mb-3">{founder.role}</p>
                <p className="text-white/55 leading-relaxed text-sm">{founder.blurb}</p>
              </article>
            ))}
          </div>

          <div className="max-w-2xl mx-auto text-center mt-16 pt-12 border-t border-white/10">
            <p className="text-white/55 leading-relaxed text-sm">
              Most skincare is built by marketing teams. This system is built from clinical disciplines — where formulation, treatment, and skin physiology intersect. The result is not more products. It is better ones.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy sections */}
      <section className="bg-white border-t border-gray-soft py-20 px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-12 text-center">Our Values</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {PHILOSOPHY_SECTIONS.map(s => (
              <div key={s.title} className="border-l-2 border-rose pl-8">
                <h3 className="font-serif text-xl text-black mb-4">{s.title}</h3>
                <p className="text-black/55 leading-relaxed text-sm">{s.body}</p>
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
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="font-serif text-3xl md:text-4xl text-white italic mb-6">
            &ldquo;Purposeful skincare. Professional results. No unnecessary extras.&rdquo;
          </p>
          <p className="text-rose text-sm tracking-widest uppercase">Skin Protocol RX</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-5 md:px-8 text-center bg-stone border-t border-gray-soft">
        <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-4">Start Your Protocol</p>
        <h2 className="font-serif text-3xl md:text-4xl text-black mb-6">Ready to Build a Better Routine?</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => onNavigate('protocol')}
            className="bg-black text-white px-8 py-3.5 text-sm font-medium hover:bg-rose transition-colors"
          >
            Build My Protocol
          </button>
          <button
            onClick={() => onNavigate('shop')}
            className="border border-black text-black px-8 py-3.5 text-sm font-medium hover:bg-black hover:text-white transition-colors"
          >
            Shop All Products
          </button>
        </div>
      </section>
    </div>
  )
}
