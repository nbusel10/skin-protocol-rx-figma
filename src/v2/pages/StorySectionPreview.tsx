import type { ReactNode } from 'react'

type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product' | 'glossary' | 'education'

interface StorySectionPreviewProps {
  onNavigate: (page: Page, productId?: string) => void
}

const FAMILY =
  'A family built this line because healthy skin should not need a crowded shelf. A chemist, a nurse practitioner, and an esthetician share the bench, and the formulas follow that care.'

const INGREDIENTS =
  "Ingredients stay because of how they behave on skin. The routine stays short: the products your skin needs, and nothing it doesn't."

const PEOPLE = [
  {
    name: 'Linda D. Amend, MS',
    role: 'Chemist',
    image: '/linda-amend-chemist-co-founder-skin-protocol-rx.png',
    alt: 'Linda D. Amend, MS, chemist and co-founder of Skin Protocol RX',
  },
  {
    name: 'Susanna Amend, NP',
    role: 'Nurse practitioner',
    image: '/susanna-amend-np-co-founder-skin-protocol-rx.png',
    alt: 'Susanna Amend, NP, nurse practitioner and co-founder of Skin Protocol RX',
  },
  {
    name: 'Christina Corbin, LME',
    role: 'Esthetician',
    image: '/christina-corbin-lme-co-founder-skin-protocol-rx.png',
    alt: 'Christina Corbin, LME, licensed medical esthetician and co-founder of Skin Protocol RX',
  },
]

const SHELF = [
  { src: '/chamomile-cream-cleanser.png', alt: 'Chamomile Cream Cleanser' },
  { src: '/niacinamide-rosewater-toner.png', alt: 'Niacinamide Rosewater Toner' },
  { src: '/hyaluronic-acid-serum.png', alt: 'Hyaluronic Acid Serum' },
  { src: '/rich-barrier-cream.png', alt: 'Rich Barrier Cream' },
]

const LAYOUTS = [
  { id: 'evening', num: '01', name: 'Evening', note: 'The picture is someone at the sink, not a beauty frame. The story sits underneath, in a quiet column.' },
  { id: 'page', num: '02', name: 'The Page', note: 'Set like a chapter. A drop cap, a narrow measure, and a small photograph in the margin.' },
  { id: 'people', num: '03', name: 'The People', note: 'The family is the section. Three portraits, then the story in one breath.' },
  { id: 'shelf', num: '04', name: 'A Short Shelf', note: 'The routine stays short, so the picture is a few bottles with room between them.' },
  { id: 'still', num: '05', name: 'Still', note: 'No photograph. The line about the formulas is the largest thing on the page.' },
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
      <div className="bg-[#241F1E] text-white px-5 md:px-8 py-6 border-t border-white/10">
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

function ReadStory({ onNavigate, light = false }: StorySectionPreviewProps & { light?: boolean }) {
  return (
    <button
      type="button"
      onClick={() => onNavigate('story')}
      className={`link-arrow self-start text-sm ${light ? 'text-white hover:text-rose' : 'text-charcoal hover:text-rose'}`}
    >
      Read our story
    </button>
  )
}

function Evening({ onNavigate }: StorySectionPreviewProps) {
  return (
    <div className="bg-ivory">
      <div className="relative h-[460px] md:h-[640px]">
        <img
          src="/our-story-ritual.jpg"
          alt="A woman in a robe applying cream at a sunlit sink, with Skin Protocol RX bottles on the counter"
          className="absolute inset-0 w-full h-full object-cover object-[center_18%]"
        />
      </div>
      <div className="max-w-xl mx-auto px-6 py-14 md:py-20">
        <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-4">Our Story</p>
        <h3 className="font-serif text-4xl md:text-5xl text-charcoal leading-[1.05] mb-8">
          Professional standards, personal care
        </h3>
        <p className="text-base text-charcoal/85 leading-relaxed mb-4">{FAMILY}</p>
        <p className="text-base text-charcoal/85 leading-relaxed mb-8">{INGREDIENTS}</p>
        <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-3">Why these formulas</p>
        <p className="font-serif italic text-xl md:text-2xl text-charcoal leading-snug mb-8">
          Clinical enough to trust. Natural enough to live with.
        </p>
        <ReadStory onNavigate={onNavigate} />
      </div>
    </div>
  )
}

function ThePage({ onNavigate }: StorySectionPreviewProps) {
  return (
    <div className="bg-ivory px-6 md:px-8 py-16 md:py-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,24rem)] gap-10 lg:gap-16 lg:items-center">
        <div>
          <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-5">Our Story</p>
          <h3 className="font-serif text-4xl md:text-5xl text-charcoal leading-[1.05] mb-10">
            Professional standards, personal care
          </h3>
          <p className="text-base text-charcoal/85 leading-[1.75] mb-6">
            <span className="float-left font-serif text-7xl leading-[0.75] pr-3 pt-1 text-charcoal">A</span>
            family built this line because healthy skin should not need a crowded shelf. A chemist, a nurse practitioner, and an esthetician share the bench, and the formulas follow that care.
          </p>
          <p className="text-base text-charcoal/85 leading-[1.75] mb-10">{INGREDIENTS}</p>
          <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-3">Why these formulas</p>
          <p className="font-serif italic text-2xl text-charcoal leading-snug mb-8">
            Clinical enough to trust. Natural enough to live with.
          </p>
          <ReadStory onNavigate={onNavigate} />
        </div>
        <div className="aspect-[4/5] overflow-hidden bg-stone w-full max-w-md lg:max-w-none">
          <img
            src="/our-story-water-kissed.jpg"
            alt="A woman with glowing skin, her hand at her jaw as water splashes across her shoulder"
            className="w-full h-full object-cover object-[68%_16%]"
          />
        </div>
      </div>
    </div>
  )
}

function ThePeople({ onNavigate }: StorySectionPreviewProps) {
  return (
    <div className="bg-stone px-6 md:px-8 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-4">Our Story</p>
        <h3 className="font-serif text-4xl md:text-5xl text-charcoal leading-[1.05] max-w-xl mb-12">
          Professional standards, personal care
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-6">
          {PEOPLE.map(person => (
            <figure key={person.name}>
              <div className="aspect-[3/4] overflow-hidden bg-ivory mb-4">
                <img
                  src={person.image}
                  alt={person.alt}
                  className="w-full h-full object-cover object-[center_15%]"
                />
              </div>
              <figcaption>
                <p className="text-sm font-medium text-charcoal">{person.name}</p>
                <p className="text-[11px] tracking-[0.16em] uppercase text-rose mt-1">{person.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="max-w-2xl mt-12 md:mt-16">
          <p className="text-base text-charcoal/85 leading-relaxed mb-4">{FAMILY}</p>
          <p className="text-base text-charcoal/85 leading-relaxed mb-8">{INGREDIENTS}</p>
          <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-3">Why these formulas</p>
          <p className="font-serif italic text-xl text-charcoal leading-snug mb-8">
            Clinical enough to trust. Natural enough to live with.
          </p>
          <ReadStory onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  )
}

function ShortShelf({ onNavigate }: StorySectionPreviewProps) {
  return (
    <div className="bg-ivory">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center px-6 md:px-8 py-16 md:py-20">
        <div>
          <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-4">Our Story</p>
          <h3 className="font-serif text-4xl md:text-5xl text-charcoal leading-[1.05] mb-6">
            Professional standards, personal care
          </h3>
          <p className="text-base text-charcoal/85 leading-relaxed mb-4">{FAMILY}</p>
          <p className="text-base text-charcoal/85 leading-relaxed mb-8">{INGREDIENTS}</p>
          <ReadStory onNavigate={onNavigate} />
        </div>
        <div>
          <div className="grid grid-cols-4 gap-3 md:gap-5 items-end">
            {SHELF.map(item => (
              <div key={item.src} className="flex items-end justify-center h-40 md:h-56">
                <img src={item.src} alt={item.alt} className="max-h-full w-auto object-contain" />
              </div>
            ))}
          </div>
          <p className="text-[11px] tracking-[0.22em] uppercase text-rose mt-8 mb-3">Why these formulas</p>
          <p className="font-serif italic text-xl md:text-2xl text-charcoal leading-snug">
            Clinical enough to trust. Natural enough to live with.
          </p>
        </div>
      </div>
    </div>
  )
}

function Still({ onNavigate }: StorySectionPreviewProps) {
  return (
    <div className="bg-stone px-6 md:px-8 py-20 md:py-32">
      <div className="max-w-3xl mx-auto">
        <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-6">Our Story</p>
        <h3 className="font-serif text-3xl md:text-5xl text-charcoal leading-[1.05] mb-12">
          Professional standards, personal care
        </h3>
        <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-4">Why these formulas</p>
        <p className="font-serif italic text-4xl md:text-6xl text-charcoal leading-[1.05] max-w-2xl mb-12">
          Clinical enough to trust.<br />
          Natural enough to live with.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-charcoal/15 pt-8">
          <p className="text-base text-charcoal/85 leading-relaxed">{FAMILY}</p>
          <p className="text-base text-charcoal/85 leading-relaxed">{INGREDIENTS}</p>
        </div>
        <div className="mt-10">
          <ReadStory onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  )
}

export default function StorySectionPreview({ onNavigate }: StorySectionPreviewProps) {
  return (
    <div className="bg-ivory font-sans">
      <section className="bg-ivory px-5 md:px-8 py-16 md:py-20 border-b border-gray-soft">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-5">Layout review</p>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-5 max-w-3xl">
            Our Story, five new ways
          </h1>
          <p className="text-charcoal/85 leading-relaxed max-w-2xl mb-10">
            Same words as the live section. Five different moods.
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

      <LayoutFrame id="evening" num="01" name="Evening" note={LAYOUTS[0].note}>
        <Evening onNavigate={onNavigate} />
      </LayoutFrame>
      <LayoutFrame id="page" num="02" name="The Page" note={LAYOUTS[1].note}>
        <ThePage onNavigate={onNavigate} />
      </LayoutFrame>
      <LayoutFrame id="people" num="03" name="The People" note={LAYOUTS[2].note}>
        <ThePeople onNavigate={onNavigate} />
      </LayoutFrame>
      <LayoutFrame id="shelf" num="04" name="A Short Shelf" note={LAYOUTS[3].note}>
        <ShortShelf onNavigate={onNavigate} />
      </LayoutFrame>
      <LayoutFrame id="still" num="05" name="Still" note={LAYOUTS[4].note}>
        <Still onNavigate={onNavigate} />
      </LayoutFrame>
    </div>
  )
}
