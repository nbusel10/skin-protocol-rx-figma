import type { ReactNode } from 'react'

type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product' | 'glossary' | 'education'

interface PhilosophySectionPreviewProps {
  onNavigate: (page: Page, productId?: string) => void
}

const LINKS: { label: string; body: string; page: Page; id?: string }[] = [
  { label: 'Ingredient Glossary', body: 'See what is in the formulas and why.', page: 'glossary' },
  { label: 'Product Education', body: 'Learn what each product is good for.', page: 'education' },
  { label: 'Our Standards', body: 'How we decide what stays and what stays out.', page: 'story', id: 'our-standards' },
]

const RULES = [
  {
    title: 'A job for every ingredient',
    body: 'If an ingredient is in the bottle, it has a job.',
  },
  {
    title: 'A short routine',
    body: 'We keep formulas focused. That is the idea behind The Natural Prescription.',
  },
  {
    title: 'Never tested on animals',
    body: 'Cruelty-free is a standard we hold, not a badge on the homepage.',
  },
]

const IN_THE_BOTTLE = [
  'Focused formulas',
  'Ingredients that earn their place',
  'Never tested on animals',
]

const LEFT_OUT = [
  'Trend ingredients',
  'Fillers',
  'Extra steps',
]

const PRESCRIPTION = [
  'If an ingredient is in the bottle, it has a job.',
  'We keep formulas focused.',
  'Our formulas are never tested on animals.',
]

const DOCTRINE = [
  'Skin is a biological system, not a trend.',
  'Precision outperforms excess.',
  'Every ingredient must earn its place.',
  'Never tested on animals.',
]

const LAYOUTS = [
  { id: 'current', num: '00', name: 'Current', note: 'Headline, a cruelty-free box, and three link cards, all at the same volume.' },
  { id: 'the-line', num: '01', name: 'The Line', note: 'The sentence is the section. Rules and links sit quieter underneath.' },
  { id: 'in-and-out', num: '02', name: 'In and Out', note: 'The headline is a comparison, so the comparison is the architecture.' },
  { id: 'prescription', num: '03', name: 'The Prescription', note: 'The Natural Prescription becomes a single script, signed by the people who write the formulas.' },
  { id: 'doctrine', num: '04', name: 'Numbered Doctrine', note: 'Four lines, no boxes. The philosophy reads as a list of beliefs.' },
  { id: 'still-life', num: '05', name: 'Still Life', note: 'A photograph carries half the section. The sentence and the links do the rest.' },
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

function ConcernIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="shrink-0">
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CurrentLayout({ onNavigate }: PhilosophySectionPreviewProps) {
  return (
    <div className="bg-stone px-6 md:px-8 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-3">Our philosophy</p>
          <h3 className="font-serif text-3xl md:text-4xl text-charcoal mb-5">
            Everything your skin needs. Nothing it doesn&apos;t.
          </h3>
          <p className="text-base text-charcoal/85 leading-relaxed mb-6">
            We keep formulas focused. If an ingredient is in the bottle, it has a job. That is the idea behind The Natural Prescription.
          </p>
          <div className="bg-ivory border border-gray-soft p-5">
            <p className="text-[11px] tracking-[0.18em] uppercase text-rose mb-2">Never tested on animals</p>
            <p className="text-base text-charcoal leading-relaxed">
              Cruelty-free is a standard we hold, not a badge on the homepage. Our formulas are never tested on animals.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {LINKS.map(item => (
            <button
              key={item.label}
              type="button"
              onClick={() => onNavigate(item.page, item.id)}
              className="flex items-center gap-4 bg-ivory border border-gray-soft px-5 py-4 text-left hover:border-rose transition-colors"
            >
              <span className="text-rose shrink-0">
                <ConcernIcon />
              </span>
              <span>
                <span className="block font-medium text-charcoal">{item.label}</span>
                <span className="block text-sm text-charcoal/75 mt-0.5">{item.body}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function TheLine({ onNavigate }: PhilosophySectionPreviewProps) {
  return (
    <div className="bg-charcoal text-white px-6 md:px-8 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-6">Our philosophy</p>
        <h3 className="font-serif text-4xl md:text-6xl leading-[1.05] max-w-4xl">
          Everything your skin needs. <em className="text-white/90">Nothing it doesn&apos;t.</em>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 mt-14 border-t border-white/15">
          {RULES.map(rule => (
            <div key={rule.title} className="pt-8 md:px-8 md:first:pl-0 md:last:pr-0 md:border-l md:first:border-l-0 border-white/15">
              <p className="font-serif text-xl md:text-2xl mb-3">{rule.title}</p>
              <p className="text-sm text-white/70 leading-relaxed">{rule.body}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-10 gap-y-5 mt-14 pt-8 border-t border-white/15">
          {LINKS.map(item => (
            <button
              key={item.label}
              type="button"
              onClick={() => onNavigate(item.page, item.id)}
              className="text-left group"
            >
              <span className="block text-sm text-white group-hover:text-rose transition-colors">{item.label}</span>
              <span className="block text-sm text-white/55 mt-1">{item.body}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function InAndOut({ onNavigate }: PhilosophySectionPreviewProps) {
  return (
    <div className="bg-ivory px-6 md:px-8 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-3">Our philosophy</p>
        <h3 className="font-serif text-3xl md:text-5xl text-charcoal max-w-3xl mb-5">
          Everything your skin needs. Nothing it doesn&apos;t.
        </h3>
        <p className="text-base text-charcoal/85 leading-relaxed max-w-xl mb-12">
          We keep formulas focused. If an ingredient is in the bottle, it has a job. That is the idea behind The Natural Prescription.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-soft">
          <div className="p-8 md:p-12 md:border-r border-gray-soft bg-ivory">
            <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-8">In the bottle</p>
            <ul className="space-y-5">
              {IN_THE_BOTTLE.map(item => (
                <li key={item} className="font-serif text-2xl md:text-3xl text-charcoal leading-snug">
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-base text-charcoal/85 leading-relaxed mt-10 max-w-sm">
              Cruelty-free is a standard we hold, not a badge on the homepage. Our formulas are never tested on animals.
            </p>
          </div>
          <div className="p-8 md:p-12 bg-stone">
            <p className="text-[11px] tracking-[0.22em] uppercase text-gray-muted mb-8">Left out</p>
            <ul className="space-y-5">
              {LEFT_OUT.map(item => (
                <li key={item} className="font-serif text-2xl md:text-3xl text-gray-muted leading-snug">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 border border-gray-soft border-t-0">
          {LINKS.map(item => (
            <button
              key={item.label}
              type="button"
              onClick={() => onNavigate(item.page, item.id)}
              className="text-left px-6 py-5 border-t border-gray-soft first:border-t-0 sm:border-t-0 sm:border-l sm:first:border-l-0 hover:bg-stone transition-colors"
            >
              <span className="block text-sm font-medium text-charcoal">{item.label}</span>
              <span className="block text-sm text-charcoal/70 mt-1">{item.body}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function ThePrescription({ onNavigate }: PhilosophySectionPreviewProps) {
  return (
    <div className="bg-stone px-6 md:px-8 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
        <div className="bg-ivory border border-gray-soft px-8 md:px-12 py-12 md:py-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
            <div>
              <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-3">The Natural Prescription</p>
              <p className="font-serif text-6xl md:text-7xl text-charcoal leading-none">Rx</p>
            </div>
            <p className="font-serif text-xl text-charcoal leading-snug sm:text-right">
              Everything your skin needs.
              <br />
              Nothing it doesn&apos;t.
            </p>
          </div>
          <ol className="border-t border-gray-soft">
            {PRESCRIPTION.map((line, index) => (
              <li key={line} className="grid grid-cols-[2.75rem_1fr] gap-3 py-5 border-b border-gray-soft">
                <span className="font-serif text-lg text-rose">{String(index + 1).padStart(2, '0')}</span>
                <span className="font-serif text-xl md:text-2xl text-charcoal leading-snug">{line}</span>
              </li>
            ))}
          </ol>
          <p className="text-sm text-charcoal/75 leading-relaxed mt-8">
            Cruelty-free is a standard we hold, not a badge on the homepage.
          </p>
          <p className="mt-10 pt-6 border-t border-gray-soft text-[11px] tracking-[0.18em] uppercase text-charcoal/55">
            Chemist · Nurse Practitioner · Esthetician
          </p>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-x-8 gap-y-3">
          {LINKS.map(item => (
            <button
              key={item.label}
              type="button"
              onClick={() => onNavigate(item.page, item.id)}
              className="inline-flex items-center gap-2 text-sm text-charcoal hover:text-rose transition-colors"
            >
              {item.label}
              <Arrow />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function NumberedDoctrine({ onNavigate }: PhilosophySectionPreviewProps) {
  return (
    <div className="bg-ivory px-6 md:px-8 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-4">Our philosophy</p>
        <p className="text-base text-charcoal/85 leading-relaxed max-w-xl mb-12">
          We keep formulas focused. If an ingredient is in the bottle, it has a job. That is the idea behind The Natural Prescription.
        </p>
        <ol>
          {DOCTRINE.map((line, index) => (
            <li key={line} className="grid grid-cols-[2.5rem_1fr] md:grid-cols-[4rem_1fr] gap-2 md:gap-4 items-baseline border-t border-gray-soft py-7 md:py-9">
              <span className="text-[11px] tracking-[0.22em] text-rose">{String(index + 1).padStart(2, '0')}</span>
              <span className="font-serif text-2xl md:text-4xl text-charcoal leading-tight">{line}</span>
            </li>
          ))}
        </ol>
        <p className="text-base text-charcoal/85 leading-relaxed max-w-xl mt-2 mb-12">
          Cruelty-free is a standard we hold, not a badge on the homepage. Our formulas are never tested on animals.
        </p>
        <div className="border-t border-gray-soft">
          {LINKS.map(item => (
            <button
              key={item.label}
              type="button"
              onClick={() => onNavigate(item.page, item.id)}
              className="w-full flex items-center justify-between gap-6 py-5 border-b border-gray-soft text-left group"
            >
              <span>
                <span className="block text-sm font-medium text-charcoal group-hover:text-rose transition-colors">{item.label}</span>
                <span className="block text-sm text-charcoal/70 mt-1">{item.body}</span>
              </span>
              <span className="text-charcoal group-hover:text-rose group-hover:translate-x-1 transition-all">
                <Arrow />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function StillLife({ onNavigate }: PhilosophySectionPreviewProps) {
  return (
    <div className="bg-ivory">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[320px] lg:min-h-[560px]">
          <img
            src="/our-story-ritual.jpg"
            alt="A woman in a robe applying cream, with Skin Protocol RX bottles on the counter"
            className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
          />
        </div>
        <div className="px-6 md:px-12 py-14 lg:py-20 flex flex-col justify-center">
          <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-4">Our philosophy</p>
          <h3 className="font-serif text-3xl md:text-5xl text-charcoal leading-tight mb-6">
            Everything your skin needs. Nothing it doesn&apos;t.
          </h3>
          <p className="text-base text-charcoal/85 leading-relaxed max-w-md">
            We keep formulas focused. If an ingredient is in the bottle, it has a job. That is the idea behind The Natural Prescription.
          </p>
          <p className="text-[11px] tracking-[0.18em] uppercase text-rose mt-8">Never tested on animals</p>
        </div>
      </div>
      <div className="border-t border-gray-soft">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3">
          {LINKS.map(item => (
            <button
              key={item.label}
              type="button"
              onClick={() => onNavigate(item.page, item.id)}
              className="flex items-center justify-between gap-4 px-6 py-5 text-left border-b border-gray-soft last:border-b-0 sm:border-b-0 sm:border-l sm:first:border-l-0 hover:bg-stone transition-colors"
            >
              <span>
                <span className="block text-sm font-medium text-charcoal">{item.label}</span>
                <span className="block text-sm text-charcoal/70 mt-1">{item.body}</span>
              </span>
              <Arrow />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PhilosophySectionPreview({ onNavigate }: PhilosophySectionPreviewProps) {
  return (
    <div className="bg-ivory font-sans">
      <section className="bg-ivory px-5 md:px-8 py-16 md:py-20 border-b border-gray-soft">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-5">Layout review</p>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-5 max-w-3xl">
            Our philosophy, five other ways
          </h1>
          <p className="text-charcoal/85 leading-relaxed max-w-2xl mb-10">
            The live block pairs a headline with a cruelty-free box and three link cards. These alternatives keep that copy and give the philosophy one organizing idea.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {LAYOUTS.map(layout => (
              <a
                key={layout.id}
                href={`#${layout.id}`}
                className="border border-gray-soft text-charcoal hover:border-rose hover:text-rose px-4 py-2 text-[11px] tracking-[0.16em] uppercase transition-colors"
              >
                {layout.num} {layout.name}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="text-sm text-charcoal/70 hover:text-rose transition-colors"
          >
            ← Back to home
          </button>
        </div>
      </section>

      <LayoutFrame id="current" num="00" name="Current" note={LAYOUTS[0].note}>
        <CurrentLayout onNavigate={onNavigate} />
      </LayoutFrame>
      <LayoutFrame id="the-line" num="01" name="The Line" note={LAYOUTS[1].note}>
        <TheLine onNavigate={onNavigate} />
      </LayoutFrame>
      <LayoutFrame id="in-and-out" num="02" name="In and Out" note={LAYOUTS[2].note}>
        <InAndOut onNavigate={onNavigate} />
      </LayoutFrame>
      <LayoutFrame id="prescription" num="03" name="The Prescription" note={LAYOUTS[3].note}>
        <ThePrescription onNavigate={onNavigate} />
      </LayoutFrame>
      <LayoutFrame id="doctrine" num="04" name="Numbered Doctrine" note={LAYOUTS[4].note}>
        <NumberedDoctrine onNavigate={onNavigate} />
      </LayoutFrame>
      <LayoutFrame id="still-life" num="05" name="Still Life" note={LAYOUTS[5].note}>
        <StillLife onNavigate={onNavigate} />
      </LayoutFrame>
    </div>
  )
}
