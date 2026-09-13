import type { ReactNode } from 'react'

type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product' | 'glossary' | 'education'

interface StandardsSectionPreviewProps {
  onNavigate: (page: Page, productId?: string) => void
}

const WHAT_YOU_FIND = [
  'Clinically relevant active ingredients',
  'Intentional concentrations',
  'Balanced, skin-supportive formulas',
  'Multi-functional ingredients selected with purpose',
  'Formulation decisions grounded in long-term skin health',
]

const WHAT_YOU_WONT_FIND = [
  'Overloaded ingredient lists',
  'Redundant actives',
  'Trend-driven formulation',
  'Unnecessary fillers',
  'Fragrance added without purpose',
]

const STANDARDS = [
  {
    title: 'Expert-Led',
    body: 'Every formula is shaped by a chemist, nurse practitioner, and licensed medical esthetician.',
  },
  {
    title: 'Purposeful Formulation',
    body: 'We prioritize ingredients that support function, tolerance, and consistency over time.',
  },
  {
    title: 'Less, Done Properly',
    body: 'We do not believe more products, more steps, or more actives automatically lead to better skin.',
  },
]

const CLINICAL_PHILOSOPHY = [
  'Skin is a biological system, not a trend.',
  'Precision outperforms excess.',
  'Long-term skin health matters more than short-term stimulation.',
  'Every ingredient must earn its place.',
]

const LAYOUTS = [
  { id: 'current', num: '00', name: 'Current', note: 'Four stacked systems of equal weight.' },
  { id: 'ledger', num: '01', name: 'Contrast Ledger', note: 'One comparison frame, then quieter principles.' },
  { id: 'doctrine', num: '02', name: 'Doctrine First', note: 'The three standards lead. Lists support.' },
  { id: 'editorial', num: '03', name: 'Editorial Column', note: 'One narrow reading path.' },
  { id: 'spec', num: '04', name: 'Specification', note: 'Paired include / exclude rows.' },
  { id: 'manifesto', num: '05', name: 'Quiet Manifesto', note: 'One hairline system. No accent bars.' },
]

function LayoutFrame({
  id,
  num,
  name,
  note,
  children,
}: {
  id: string
  num: string
  name: string
  note: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-[10rem] md:scroll-mt-[12rem]">
      <div className="bg-black text-white px-5 md:px-8 py-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-2">Layout {num}</p>
            <h2 className="font-serif text-2xl md:text-3xl">{name}</h2>
          </div>
          <p className="text-sm text-white/50 max-w-md leading-relaxed">{note}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

function CurrentLayout() {
  return (
    <div className="bg-stone py-20 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-5">Our Standards</p>
          <h3 className="font-serif text-3xl md:text-4xl text-black mb-5">
            What matters. What doesn&apos;t.
          </h3>
          <p className="text-black/55 leading-relaxed">
            Skin Protocol RX is built on disciplined formulation, clinical perspective, and intentional restraint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-20">
          <div>
            <h4 className="font-serif text-xl text-black mb-6">What You&apos;ll Find</h4>
            <ul className="space-y-3">
              {WHAT_YOU_FIND.map(item => (
                <li key={item} className="text-sm text-black/55 leading-relaxed pl-4 border-l-2 border-rose">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-xl text-black mb-6">What You Won&apos;t Find</h4>
            <ul className="space-y-3">
              {WHAT_YOU_WONT_FIND.map(item => (
                <li key={item} className="text-sm text-black/55 leading-relaxed pl-4 border-l-2 border-gray-soft">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {STANDARDS.map(s => (
            <div key={s.title} className="border-l-2 border-rose pl-6">
              <h4 className="font-serif text-xl text-black mb-3">{s.title}</h4>
              <p className="text-black/55 leading-relaxed text-sm">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-8">Clinical Philosophy</p>
          <ul className="space-y-4">
            {CLINICAL_PHILOSOPHY.map(line => (
              <li key={line} className="font-serif text-lg md:text-xl text-black leading-relaxed">
                {line}
              </li>
            ))}
          </ul>
          <p className="font-serif text-xl md:text-2xl text-black mt-12">
            Minimal formulas. Maximum performance.
          </p>
        </div>
      </div>
    </div>
  )
}

function ContrastLedger() {
  return (
    <div className="bg-stone py-20 px-5 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-5">Our Standards</p>
          <h3 className="font-serif text-3xl md:text-4xl text-black mb-5">
            What matters. What doesn&apos;t.
          </h3>
          <p className="text-black/55 leading-relaxed">
            Skin Protocol RX is built on disciplined formulation, clinical perspective, and intentional restraint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-soft bg-white mb-16">
          <div className="p-8 md:p-10 md:border-r border-gray-soft">
            <p className="text-[11px] tracking-[0.25em] uppercase text-rose mb-6">What you&apos;ll find</p>
            <ul className="space-y-4">
              {WHAT_YOU_FIND.map(item => (
                <li key={item} className="text-sm text-black leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 md:p-10 bg-stone/80">
            <p className="text-[11px] tracking-[0.25em] uppercase text-black/35 mb-6">What you won&apos;t find</p>
            <ul className="space-y-4">
              {WHAT_YOU_WONT_FIND.map(item => (
                <li key={item} className="text-sm text-black/50 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-16">
          {STANDARDS.map((s, i) => (
            <div key={s.title}>
              <p className="text-[11px] tracking-[0.25em] uppercase text-rose mb-3">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h4 className="font-serif text-xl text-black mb-3">{s.title}</h4>
              <p className="text-black/55 leading-relaxed text-sm">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-soft pt-10">
          <p className="font-serif text-xl md:text-2xl text-black mb-6">
            Minimal formulas. Maximum performance.
          </p>
          <p className="text-sm text-black/45 leading-relaxed max-w-2xl">
            {CLINICAL_PHILOSOPHY.join(' ')}
          </p>
        </div>
      </div>
    </div>
  )
}

function DoctrineFirst() {
  return (
    <div className="bg-white py-20 px-5 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-5">Our Standards</p>
          <h3 className="font-serif text-3xl md:text-5xl text-black mb-6">
            Three rules we formulate by.
          </h3>
          <p className="text-black/55 leading-relaxed max-w-xl">
            Skin Protocol RX is built on disciplined formulation, clinical perspective, and intentional restraint.
          </p>
        </div>

        <ol className="mb-20">
          {STANDARDS.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[4rem_1fr] gap-6 md:gap-10 py-8 border-t border-gray-soft">
              <span className="font-serif text-2xl text-rose pt-1">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h4 className="font-serif text-2xl text-black mb-3">{s.title}</h4>
                <p className="text-black/55 leading-relaxed">{s.body}</p>
              </div>
            </li>
          ))}
          <li className="border-t border-gray-soft" aria-hidden />
        </ol>

        <p className="text-[11px] tracking-[0.3em] uppercase text-black/35 mb-8">In practice</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h4 className="text-sm font-medium text-black mb-5">What you&apos;ll find</h4>
            <ul className="space-y-2.5">
              {WHAT_YOU_FIND.map(item => (
                <li key={item} className="text-sm text-black/55 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-black/40 mb-5">What you won&apos;t find</h4>
            <ul className="space-y-2.5">
              {WHAT_YOU_WONT_FIND.map(item => (
                <li key={item} className="text-sm text-black/40 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="font-serif text-2xl text-black">Minimal formulas. Maximum performance.</p>
      </div>
    </div>
  )
}

function EditorialColumn() {
  return (
    <div className="bg-stone py-20 px-5 md:px-8">
      <div className="max-w-xl mx-auto">
        <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-5">Our Standards</p>
        <h3 className="font-serif text-3xl md:text-4xl text-black mb-6">
          What matters. What doesn&apos;t.
        </h3>
        <p className="text-black/55 leading-relaxed mb-14">
          Skin Protocol RX is built on disciplined formulation, clinical perspective, and intentional restraint.
        </p>

        {STANDARDS.map((s, i) => (
          <div key={s.title} className={i < STANDARDS.length - 1 ? 'mb-10' : 'mb-16'}>
            <h4 className="font-serif text-xl text-black mb-3">{s.title}</h4>
            <p className="text-black/55 leading-relaxed text-sm">{s.body}</p>
          </div>
        ))}

        <div className="border-t border-gray-soft pt-12 mb-10">
          <h4 className="text-[11px] tracking-[0.25em] uppercase text-rose mb-5">What you&apos;ll find</h4>
          <ul className="space-y-3 mb-10">
            {WHAT_YOU_FIND.map(item => (
              <li key={item} className="text-sm text-black/70 leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
          <h4 className="text-[11px] tracking-[0.25em] uppercase text-black/35 mb-5">What you won&apos;t find</h4>
          <ul className="space-y-3">
            {WHAT_YOU_WONT_FIND.map(item => (
              <li key={item} className="text-sm text-black/45 leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <blockquote className="border-t border-gray-soft pt-10">
          <p className="font-serif text-xl text-black leading-relaxed mb-6">
            {CLINICAL_PHILOSOPHY[0]} {CLINICAL_PHILOSOPHY[1]}
          </p>
          <p className="font-serif text-lg text-black/70 leading-relaxed">
            {CLINICAL_PHILOSOPHY[2]} {CLINICAL_PHILOSOPHY[3]}
          </p>
          <p className="text-[11px] tracking-[0.25em] uppercase text-rose mt-8">
            Minimal formulas. Maximum performance.
          </p>
        </blockquote>
      </div>
    </div>
  )
}

function Specification() {
  return (
    <div className="bg-white py-20 px-5 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-5">Our Standards</p>
          <h3 className="font-serif text-3xl md:text-4xl text-black mb-5">
            What matters. What doesn&apos;t.
          </h3>
          <p className="text-black/55 leading-relaxed">
            Skin Protocol RX is built on disciplined formulation, clinical perspective, and intentional restraint.
          </p>
        </div>

        <div className="mb-16">
          <div className="hidden md:grid grid-cols-2 gap-12 pb-4 border-b border-black">
            <p className="text-[11px] tracking-[0.25em] uppercase text-rose">Included</p>
            <p className="text-[11px] tracking-[0.25em] uppercase text-black/35">Left out</p>
          </div>
          {WHAT_YOU_FIND.map((item, i) => (
            <div
              key={item}
              className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-12 py-5 border-b border-gray-soft"
            >
              <p className="text-sm text-black leading-relaxed">
                <span className="md:hidden text-[10px] tracking-[0.2em] uppercase text-rose block mb-1">Included</span>
                {item}
              </p>
              <p className="text-sm text-black/45 leading-relaxed">
                <span className="md:hidden text-[10px] tracking-[0.2em] uppercase text-black/30 block mb-1">Left out</span>
                {WHAT_YOU_WONT_FIND[i]}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x md:divide-gray-soft mb-16">
          {STANDARDS.map(s => (
            <div key={s.title} className="py-6 md:py-0 md:px-8 first:md:pl-0 last:md:pr-0">
              <h4 className="font-serif text-xl text-black mb-3">{s.title}</h4>
              <p className="text-black/55 leading-relaxed text-sm">{s.body}</p>
            </div>
          ))}
        </div>

        <p className="font-serif text-xl text-black">Minimal formulas. Maximum performance.</p>
      </div>
    </div>
  )
}

function QuietManifesto() {
  return (
    <div className="bg-stone py-20 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 mb-16 pb-16 border-b border-gray-soft">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-5">Our Standards</p>
            <h3 className="font-serif text-3xl md:text-4xl text-black mb-5">
              What matters. What doesn&apos;t.
            </h3>
            <p className="text-black/55 leading-relaxed">
              Skin Protocol RX is built on disciplined formulation, clinical perspective, and intentional restraint.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-black mb-5">Find</p>
              <ul className="space-y-3">
                {WHAT_YOU_FIND.map(item => (
                  <li key={item} className="text-sm text-black/70 leading-relaxed flex gap-3">
                    <span className="text-rose shrink-0">+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-black/35 mb-5">Leave out</p>
              <ul className="space-y-3">
                {WHAT_YOU_WONT_FIND.map(item => (
                  <li key={item} className="text-sm text-black/40 leading-relaxed flex gap-3">
                    <span className="shrink-0">−</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {STANDARDS.map(s => (
            <div key={s.title}>
              <h4 className="font-serif text-xl text-black mb-3">{s.title}</h4>
              <p className="text-black/55 leading-relaxed text-sm">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-soft pt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <p className="text-sm text-black/45 leading-relaxed max-w-xl">
            {CLINICAL_PHILOSOPHY.join(' · ')}
          </p>
          <p className="font-serif text-xl text-black shrink-0">
            Minimal formulas. Maximum performance.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function StandardsSectionPreview({ onNavigate }: StandardsSectionPreviewProps) {
  return (
    <div className="bg-white font-sans">
      <section className="bg-black px-5 md:px-8 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-5">Layout review</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-5 max-w-3xl">
            Our Standards, five other ways
          </h1>
          <p className="text-white/55 leading-relaxed max-w-2xl mb-10">
            The live section stacks four different layouts — two lists, three cards, a quote list, and a tagline — all at the same volume. These alternatives keep the same copy and give it one organizing idea.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {LAYOUTS.map(layout => (
              <a
                key={layout.id}
                href={`#${layout.id}`}
                className="border border-white/20 text-white/80 hover:border-rose hover:text-rose px-4 py-2 text-[11px] tracking-[0.2em] uppercase transition-colors"
              >
                {layout.num} {layout.name}
              </a>
            ))}
          </div>
          <button
            onClick={() => onNavigate('story', 'our-standards')}
            className="text-sm text-white/50 hover:text-rose transition-colors"
          >
            ← Back to Our Story
          </button>
        </div>
      </section>

      <LayoutFrame id="current" num="00" name="Current" note="Two bordered lists, then three bordered cards, then a centered philosophy stack. Four systems, no hierarchy.">
        <CurrentLayout />
      </LayoutFrame>

      <LayoutFrame id="ledger" num="01" name="Contrast Ledger" note="The headline is a comparison, so the comparison is the architecture. Principles and philosophy sit quieter underneath.">
        <ContrastLedger />
      </LayoutFrame>

      <LayoutFrame id="doctrine" num="02" name="Doctrine First" note="Treat the three standards as the section. Find / won't becomes supporting evidence, not a second hero.">
        <DoctrineFirst />
      </LayoutFrame>

      <LayoutFrame id="editorial" num="03" name="Editorial Column" note="One column, one pace. Read it like a short essay instead of scanning a dashboard.">
        <EditorialColumn />
      </LayoutFrame>

      <LayoutFrame id="spec" num="04" name="Specification" note="Pair each include with its opposite. The eye reads a table, not two competing lists.">
        <Specification />
      </LayoutFrame>

      <LayoutFrame id="manifesto" num="05" name="Quiet Manifesto" note="Header on the left, lists on the right, principles in a row. Hairlines only — no rose bars.">
        <QuietManifesto />
      </LayoutFrame>
    </div>
  )
}
