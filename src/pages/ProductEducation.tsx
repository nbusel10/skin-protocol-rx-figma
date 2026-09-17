import { useMemo, useState } from 'react'
import {
  PRODUCTS,
  PRODUCT_PROTOCOL_STEPS,
  PROTECT_GUIDANCE,
  getProtocolStepLabel,
  type Product,
  type ProductProtocolStep,
} from '../data'
import ProductImage from '../components/ProductImage'

type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product' | 'glossary' | 'education'

interface ProductEducationProps {
  onNavigate: (page: Page, productId?: string) => void
}

const STEP_NOTES: Partial<Record<ProductProtocolStep, string>> = {
  1: 'Pick one daily cleanser by texture and how your skin feels. Cream = more comfort for dry or sensitive skin. Gel = lighter refresh for oily or combination skin. TripleGlow is a weekly polish — not a daily replacement.',
  3: 'Start with one serum for your main concern. Vitamin C for dullness/tone (pick a strength), hyaluronic for dehydration, peptides for firmness, bakuchiol for evening renewal. Add a second serum only as your skin tolerates it.',
  4: 'Optional — include it if the eye area is one of your concerns.',
  5: 'Pick one moisturizer by how much moisture you need. Cloud Cream is lightweight; Rich Barrier is the fuller option for dry or depleted skin.',
  6: 'Optional — a finishing layer for skin that wants extra comfort.',
}

const HOW_TO_CHOOSE = [
  {
    title: 'Start with the essentials',
    body: 'A cleanser, a moisturizer, and daily SPF cover the foundation. Everything else is added for a specific need.',
  },
  {
    title: 'Match the texture to your skin',
    body: 'Cream or gel cleanser, lightweight or rich moisturizer — choose based on how your skin actually feels day to day.',
  },
  {
    title: 'Introduce actives one at a time',
    body: 'Add a single new vitamin C, exfoliant, or bakuchiol product at a time so you can tell how your skin responds.',
  },
]

const ALL_SKIN_TYPES = ['Combination', 'Dry', 'Normal', 'Oily', 'Sensitive'] as const

function skinTypeLabel(skinTypes: Product['skinTypes']): string {
  if (skinTypes.length >= ALL_SKIN_TYPES.length) return 'All skin types'
  return skinTypes.join(' · ')
}

function BenefitCard({ product, onNavigate }: { product: Product; onNavigate: (page: Page, id?: string) => void }) {
  return (
    <article className="border border-gray-soft bg-white p-5 md:p-6 flex gap-4 md:gap-5 hover:border-rose transition-colors">
      <button
        onClick={() => onNavigate('product', product.id)}
        className="w-20 h-20 md:w-24 md:h-24 shrink-0 bg-stone"
        aria-label={`View ${product.name}`}
      >
        <ProductImage src={product.image} alt={product.name} variant="inline" />
      </button>
      <div className="min-w-0 flex flex-col gap-2.5">
        <div>
          <p className="text-[10px] tracking-widest uppercase text-charcoal/40 mb-1">{product.categories[0]}</p>
          <h3 className="font-serif text-lg text-charcoal leading-snug">{product.name}</h3>
        </div>
        <p className="text-sm text-charcoal leading-relaxed">
          <span className="text-[11px] tracking-widest uppercase text-rose font-medium block mb-1">Choose this if</span>
          {product.chooseIf}
        </p>
        <p className="text-sm text-charcoal/55 leading-relaxed">{product.goodFor}</p>
        <p className="text-[11px] tracking-wide text-charcoal/45">
          <span className="uppercase tracking-widest text-charcoal/35">Best for </span>
          {skinTypeLabel(product.skinTypes)}
        </p>
        {product.usageNote && (
          <p className="text-xs text-rose flex items-start gap-1.5">
            <span aria-hidden="true">✦</span>
            {product.usageNote}
          </p>
        )}
        <button
          onClick={() => onNavigate('product', product.id)}
          className="self-start text-xs text-charcoal/45 hover:text-rose underline underline-offset-2 transition-colors"
        >
          View full details
        </button>
      </div>
    </article>
  )
}

export default function ProductEducation({ onNavigate }: ProductEducationProps) {
  const [activeStep, setActiveStep] = useState<ProductProtocolStep | null>(null)

  const groups = useMemo(
    () =>
      PRODUCT_PROTOCOL_STEPS
        .filter(s => activeStep === null || s.step === activeStep)
        .map(s => ({
          ...s,
          step: s.step as ProductProtocolStep,
          products: PRODUCTS.filter(p => p.protocolStep === s.step),
        })),
    [activeStep],
  )

  const shownCount = groups.reduce((total, group) => total + group.products.length, 0)

  return (
    <div className="bg-white font-sans min-h-[70vh]">
      <section className="bg-black py-20 md:py-28 px-5 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-5">Learn</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">Product Education</h1>
          <p className="text-white/55 leading-relaxed max-w-xl mx-auto">
            What each product is good for. Every formula has one clear job — use this guide to choose the products that fit your skin and your routine.
          </p>
        </div>
      </section>

      <section className="bg-rose-light border-b border-rose/15 px-5 md:px-8 py-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] tracking-[0.25em] uppercase text-rose mb-3">Start Here</p>
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-3">
            You don&apos;t need all {PRODUCTS.length} products
          </h2>
          <p className="text-sm text-charcoal/60 leading-relaxed">
            A protocol is built from the steps your skin needs, not the full collection. Most routines use one product per step, with serums chosen for your primary concern.
          </p>
        </div>
      </section>

      <section className="px-5 md:px-8 py-14 md:py-20 border-b border-gray-soft">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-10">How to Choose</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {HOW_TO_CHOOSE.map((item, i) => (
              <div key={item.title} className="border-t border-charcoal/10 pt-5">
                <p className="text-[11px] tracking-widest uppercase text-rose mb-3">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-serif text-lg text-charcoal mb-2">{item.title}</h3>
                <p className="text-sm text-charcoal/55 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory-dark border-b border-gray-soft px-5 md:px-8 py-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-4">
          <p className="text-xs tracking-widest uppercase text-charcoal/40">Browse by protocol step</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveStep(null)}
              className="px-4 py-2 text-xs font-medium transition-colors"
              style={{
                backgroundColor: activeStep === null ? '#B8878B' : 'transparent',
                color: activeStep === null ? '#fff' : '#252525',
                border: activeStep === null ? 'none' : '1px solid #E5E5E5',
              }}
            >
              All Products
            </button>
            {PRODUCT_PROTOCOL_STEPS.map(s => {
              const step = s.step as ProductProtocolStep
              const selected = activeStep === step
              return (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(prev => (prev === step ? null : step))}
                  className="px-4 py-2 text-xs font-medium transition-colors"
                  style={{
                    backgroundColor: selected ? '#B8878B' : 'transparent',
                    color: selected ? '#fff' : '#252525',
                    border: selected ? 'none' : '1px solid #E5E5E5',
                  }}
                >
                  {getProtocolStepLabel(step)}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-14 md:py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-charcoal/40 mb-10">
            {shownCount} product{shownCount === 1 ? '' : 's'}
          </p>

          <div className="flex flex-col gap-14 md:gap-20">
            {groups.map(group => (
              <div key={group.step}>
                <div className="mb-7 pb-5 border-b border-gray-soft">
                  <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-2">
                    {getProtocolStepLabel(group.step)}
                  </p>
                  <p className="text-sm text-charcoal/55 leading-relaxed max-w-2xl">{group.description}</p>
                  {STEP_NOTES[group.step] && (
                    <p className="text-sm text-charcoal/45 leading-relaxed max-w-2xl mt-2">
                      {STEP_NOTES[group.step]}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
                  {group.products.map(p => (
                    <BenefitCard key={p.id} product={p} onNavigate={onNavigate} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {activeStep === null && (
            <div className="mt-14 md:mt-20 border border-gray-soft bg-ivory-dark p-6 md:p-8">
              <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-2">{PROTECT_GUIDANCE.label}</p>
              <p className="text-sm text-charcoal/60 leading-relaxed mb-1">{PROTECT_GUIDANCE.description}</p>
              <p className="text-sm text-charcoal/45 leading-relaxed">{PROTECT_GUIDANCE.note}</p>
            </div>
          )}

          <div className="mt-16 pt-10 border-t border-gray-soft flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('protocol')}
              className="bg-black text-white px-7 py-3.5 text-sm tracking-wide font-medium hover:bg-rose transition-colors"
            >
              Build Your Protocol
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className="border border-charcoal/20 text-charcoal px-7 py-3.5 text-sm tracking-wide font-medium hover:border-rose hover:text-rose transition-colors"
            >
              Shop the Collection
            </button>
            <button
              onClick={() => onNavigate('glossary')}
              className="border border-charcoal/20 text-charcoal px-7 py-3.5 text-sm tracking-wide font-medium hover:border-rose hover:text-rose transition-colors"
            >
              Ingredient Glossary
            </button>
          </div>

          <p className="text-[11px] text-charcoal/30 mt-6 leading-relaxed max-w-2xl">
            Product descriptions are provided for educational purposes and describe general cosmetic use. They do not imply treatment of any medical condition and do not replace professional medical advice. Consult a dermatologist or licensed esthetician for personalized skincare guidance.
          </p>
        </div>
      </section>
    </div>
  )
}
