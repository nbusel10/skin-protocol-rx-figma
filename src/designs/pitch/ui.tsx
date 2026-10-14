import { SKIN_CONCERNS } from '../../data'
import { focusProduct, stepLabel, type DesignNavigate } from '../shared'
import type { Product } from '../../data'

export const wrap = 'mx-auto w-[min(1240px,calc(100%-2.5rem))] md:w-[min(1240px,calc(100%-4.25rem))]'

let pendingSection: string | null = null

export function queueSection(id: string) {
  pendingSection = id
}

export function consumeSection() {
  const id = pendingSection
  pendingSection = null
  return id
}

export const FOUNDERS = [
  {
    name: 'Linda D. Amend, MS',
    role: 'Co-Founder, Chemist',
    image: '/original/founder-linda.jpg',
    text: 'Formulation-driven. Decades of ingredient development. Focused on stability, delivery, and performance.',
  },
  {
    name: 'Susanna Amend, NP',
    role: 'Co-Founder, Nurse Practitioner',
    image: '/original/founder-susanna.jpg',
    text: 'Patient-facing insight. Translates clinical needs into product design. Focus on real-world skin response.',
  },
  {
    name: 'Christina Corbin, LME',
    role: 'Co-Founder, Licensed Medical Esthetician',
    image: '/original/founder-christina.jpg',
    text: 'Hands-on skin expertise. Refines formulations through treatment experience. Focus on texture, tolerance, and results.',
  },
]

export function ProductTile({ product, onNavigate }: { product: Product; onNavigate: DesignNavigate }) {
  return (
    <button type="button" onClick={() => onNavigate('product', product.id)} className="group text-left">
      <span className="flex aspect-[4/5] items-center justify-center bg-[#F3EEE7] p-5">
        <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
      </span>
      <span className="mt-3 block text-[11px] font-semibold tracking-[0.16em] text-[#B88E91] uppercase">{stepLabel(product.protocolStep)}</span>
      <span className="mt-1 block font-serif text-[1.35rem] leading-snug tracking-[-0.02em]">{product.name}</span>
      <span className="mt-1 block text-sm tabular-nums text-[#6E6763]">${product.price}</span>
    </button>
  )
}

export function ConcernGrid({ onNavigate }: { onNavigate: DesignNavigate }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {SKIN_CONCERNS.map(concern => {
        const product = focusProduct(concern.id)
        return (
          <button
            key={concern.id}
            type="button"
            onClick={() => onNavigate('product', product.id)}
            className="min-h-16 border border-[#DED7CE] bg-white/70 px-3 py-3 text-left text-sm leading-snug transition-colors hover:border-[#B88E91]"
          >
            {concern.label}
          </button>
        )
      })}
    </div>
  )
}

export function FounderCards() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {FOUNDERS.map(person => (
        <figure key={person.name}>
          <div className="aspect-[3/4] overflow-hidden bg-[#E7E0D6]">
            <img src={person.image} alt={person.name} className="h-full w-full object-cover object-[center_18%]" />
          </div>
          <figcaption className="mt-4">
            <p className="font-serif text-2xl leading-tight">{person.name}</p>
            <p className="mt-1 text-[11px] font-semibold tracking-[0.14em] text-[#B88E91] uppercase">{person.role}</p>
            <p className="mt-3 text-sm leading-relaxed text-[#6E6763]">{person.text}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export function SpaBand({ onNavigate, warm = false }: { onNavigate: DesignNavigate; warm?: boolean }) {
  return (
    <section id="spa" className={warm ? 'bg-[#EFE6DC]' : 'bg-[#F7F4EF]'}>
      <div className={`${wrap} grid items-center gap-8 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-20`}>
        <div className="overflow-hidden rounded-2xl bg-[#E7E0D6]">
          <img src="/spa-partnership-shelf.jpg" alt="Skin Protocol RX products arranged on a treatment shelf" className="aspect-[16/10] w-full object-cover object-center" />
        </div>
        <div>
          <p className="text-[11px] font-semibold tracking-[0.2em] text-[#B88E91] uppercase">Spa partnerships</p>
          <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3.4rem)] leading-[1.05] tracking-[-0.03em]">The same formulas, ready for the treatment room.</h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#6E6763]">
            Professionals already use the line between appointments. This prototype opens the catalog, where the professional sizes live.
          </p>
          <button type="button" onClick={() => onNavigate('shop')} className="mt-6 inline-flex min-h-12 items-center bg-[#45403F] px-6 text-[12px] font-semibold tracking-[0.14em] text-white uppercase">
            See the professional line
          </button>
        </div>
      </div>
    </section>
  )
}
