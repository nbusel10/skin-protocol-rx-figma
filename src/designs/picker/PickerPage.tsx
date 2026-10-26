import type { GalleryTarget } from '../shared'

const ITEMS: {
  id: GalleryTarget
  name: string
  line: string
  href: string
  image: string
  bar: string
  separate?: boolean
}[] = [
  {
    id: 'original',
    name: 'Original',
    line: 'Black, white, and rose. The first clinical luxury site.',
    href: '/original',
    image: '/hero-sunlit-spa.jpg',
    bar: '#0A0A0A',
  },
  {
    id: 'rose',
    name: 'Rose',
    line: 'Warm ivory and rose. The current revision.',
    href: '/',
    image: '/v2-collection-lineup.jpg',
    bar: '#B88E91',
  },
  {
    id: 'protocol',
    name: 'The Protocol',
    line: 'Modern Editorial · Playfair Display',
    href: '/designs/the-protocol.html',
    image: '/designs/the-protocol-card.jpg',
    bar: '#413b38',
    separate: true,
  },
  {
    id: 'clear',
    name: 'Editorial',
    line: 'A beauty magazine turned into a shop. Oversized type, uneven grids, the family in the feature.',
    href: '/designs/clear',
    image: '/designs/clear/hero.jpg',
    bar: '#6E3B32',
  },
  {
    id: 'ritual',
    name: 'Personalized Skin Ritual',
    line: 'A soft ritual with a rectangular portrait, concern discovery, and the quiz up front.',
    href: '/designs/ritual',
    image: '/original/shop-hero.jpg',
    bar: '#C4B09A',
  },
  {
    id: 'grove',
    name: 'Botanical Laboratory',
    line: 'Nature and formulation in one room. Cream, olive, and the reason the routine stays short.',
    href: '/designs/grove',
    image: '/designs/grove/hero.jpg',
    bar: '#3E5236',
  },
  {
    id: 'boutique',
    name: '01 — Modern Skincare Boutique',
    line: 'Warm ivory, champagne rose, and a product-led shop with the quiz on the page.',
    href: '/designs/boutique',
    image: '/v2-collection-lineup.jpg',
    bar: '#B88E91',
    separate: true,
  },
  {
    id: 'luxe',
    name: '02 — Luxury Editorial',
    line: 'Larger type and split frames. Warm drama, with the formulas kept in view.',
    href: '/designs/luxe',
    image: '/original/spa-hero.jpg',
    bar: '#8E6A64',
    separate: true,
  },
]

interface PickerPageProps {
  onOpen: (target: GalleryTarget) => void
}

export default function PickerPage({ onOpen }: PickerPageProps) {
  return (
    <div className="design-picker">
      <header className="border-b border-[#D9D9D6] px-6 py-6 md:px-10">
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#5E5E5A]">Skin Protocol RX</p>
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h1 className="max-w-xl text-4xl font-medium tracking-tight md:text-5xl">Eight ways to see the line.</h1>
          <p className="max-w-sm text-sm leading-relaxed text-[#4E4E4A]">
            Original and Rose stay as they are. The Protocol is the third homepage direction, followed by Editorial, Personalized Skin Ritual, Botanical Laboratory, and the later prototypes.
          </p>
        </div>
      </header>
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-10 md:grid-cols-2 md:px-10 xl:grid-cols-3">
        {ITEMS.map(item => (
          <a
            key={item.id}
            href={item.href}
            onClick={event => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
              event.preventDefault()
              onOpen(item.id)
            }}
            className="group flex flex-col border border-[#D9D9D6] bg-white"
          >
            <span className="block h-1.5" style={{ backgroundColor: item.bar }} />
            <span className="block aspect-[16/10] overflow-hidden bg-[#E7E7E4]">
              <img
                src={item.image}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </span>
            <span className="flex flex-1 flex-col px-5 py-5">
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#6A6A66]">
                {item.id === 'original' || item.id === 'rose' ? 'Existing site' : item.separate ? 'Separate prototype' : 'New prototype'}
              </span>
              <span className="mt-2 text-lg font-medium tracking-tight">{item.name}</span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-[#4E4E4A]">{item.line}</span>
              <span className="mt-5 text-sm font-medium underline decoration-[#161616] underline-offset-4 group-hover:decoration-[#2A5E74]">
                {item.separate ? 'View Full Design' : 'View prototype'}
              </span>
            </span>
          </a>
        ))}
      </main>
    </div>
  )
}
