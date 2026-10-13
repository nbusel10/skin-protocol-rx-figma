import type { GalleryTarget } from '../shared'

const ITEMS: {
  id: GalleryTarget
  name: string
  line: string
  href: string
  image: string
  bar: string
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
    id: 'clear',
    name: 'Editorial',
    line: 'A beauty magazine turned into a shop. Oversized type, uneven grids, the family in the feature.',
    href: '/designs/clear',
    image: '/designs/clear/hero.jpg',
    bar: '#6E3B32',
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
    id: 'night',
    name: 'Treatment Room',
    line: 'A walk through the protocol, one chapter at a time. Dark stone, quiet type, the line at the end.',
    href: '/designs/night',
    image: '/designs/night/hero.jpg',
    bar: '#1A1C1A',
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
            <h1 className="max-w-xl text-4xl font-medium tracking-tight md:text-5xl">Five ways to see the line.</h1>
          <p className="max-w-sm text-sm leading-relaxed text-[#4E4E4A]">
            Original and Rose stay as they are. Editorial, Botanical Laboratory, and Treatment Room are three separate homepage pitches for the same brand.
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
                {item.id === 'original' || item.id === 'rose' ? 'Existing site' : 'New prototype'}
              </span>
              <span className="mt-2 text-lg font-medium tracking-tight">{item.name}</span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-[#4E4E4A]">{item.line}</span>
              <span className="mt-5 text-sm font-medium underline decoration-[#161616] underline-offset-4 group-hover:decoration-[#2A5E74]">
                View prototype
              </span>
            </span>
          </a>
        ))}
      </main>
    </div>
  )
}
