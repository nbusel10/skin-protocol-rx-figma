import { useMemo, useState } from 'react'
import {
  PRODUCTS,
  PRODUCT_PROTOCOL_STEPS,
  PROTECT_GUIDANCE,
  getProtocolStepLabel,
  type Product,
  type ProductProtocolStep,
} from '../../data'
import { useSiteRoot } from './siteRoot'

const HEADING =
  'font-serif text-[clamp(40px,8vw,56px)] font-normal leading-[1.08] tracking-[-0.044em] min-[681px]:text-[clamp(44px,4vw,60px)]'
const EYEBROW = 'text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]'
const SECTION = 'px-6 text-[#252520] min-[681px]:px-[max(36px,8vw)]'

const STEP_NOTES: Partial<Record<ProductProtocolStep, string>> = {
  1: 'Pick one daily cleanser by texture and how your skin feels. Cream is more comfort for dry or sensitive skin. Gel is a lighter refresh for oily or combination skin. TripleGlow is a weekly polish, not a daily replacement.',
  3: 'Start with one serum for your main concern. Vitamin C for dullness and tone, hyaluronic acid for dehydration, peptides for firmness, bakuchiol for evening renewal. Add a second serum only as your skin tolerates it.',
  4: 'Optional. Include it if the eye area is one of your concerns.',
  5: 'Pick one moisturizer by how much moisture you need. Cloud Cream is lightweight. Rich Barrier is the fuller option for dry or depleted skin.',
  6: 'Optional. A finishing layer for skin that wants extra comfort.',
}

const HOW_TO_CHOOSE = [
  {
    index: '01',
    title: 'Start with the essentials',
    body: 'A cleanser, a moisturizer, and daily SPF cover the foundation. Everything else is added for a specific need.',
  },
  {
    index: '02',
    title: 'Match the texture to your skin',
    body: 'Cream or gel cleanser, lightweight or rich moisturizer. Choose based on how your skin feels day to day.',
  },
  {
    index: '03',
    title: 'Introduce actives one at a time',
    body: 'Add a single new vitamin C, exfoliant, or bakuchiol product at a time so you can tell how your skin responds.',
  },
]

const ALL_SKIN_TYPES = ['Combination', 'Dry', 'Normal', 'Oily', 'Sensitive'] as const

function skinTypeLabel(skinTypes: Product['skinTypes']): string {
  if (skinTypes.length >= ALL_SKIN_TYPES.length) return 'All skin types'
  return skinTypes.join(' · ')
}

function StepFilter({
  label,
  mark,
  caption,
  selected,
  onClick,
}: {
  label: string
  mark: string
  caption?: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={label}
      className="group flex w-16 flex-col items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ab8584]"
    >
      <span className="relative h-12 w-12">
        <svg viewBox="0 0 44 44" className="h-full w-full" aria-hidden="true">
          <circle cx="22" cy="22" r="19" fill="none" stroke="#D6C3C2" strokeWidth="1.15" />
          <circle
            cx="22"
            cy="22"
            r="19"
            fill="none"
            stroke="#ab8584"
            strokeWidth="1.35"
            strokeLinecap="round"
            pathLength={1}
            transform="rotate(-90 22 22)"
            className={[
              'transition-[stroke-dashoffset,opacity] duration-700 ease-out [stroke-dasharray:1] motion-reduce:transition-none',
              selected
                ? 'opacity-100 [stroke-dashoffset:0]'
                : 'opacity-0 [stroke-dashoffset:1.02] group-hover:opacity-100 group-hover:[stroke-dashoffset:0] group-focus-visible:opacity-100 group-focus-visible:[stroke-dashoffset:0]',
            ].join(' ')}
          />
        </svg>
        <span
          className={`absolute inset-0 flex items-center justify-center font-serif text-sm italic transition-colors duration-500 ${
            selected ? 'text-[#ab8584]' : 'text-[#2B2727]/60 group-hover:text-[#ab8584] group-focus-visible:text-[#ab8584]'
          }`}
        >
          {mark}
        </span>
      </span>
      {caption ? (
        <span className={`text-[10px] tracking-[0.12em] uppercase ${selected ? 'text-[#ab8584]' : 'text-[#6D6A63] group-hover:text-[#ab8584]'}`}>
          {caption}
        </span>
      ) : null}
    </button>
  )
}

function BenefitCard({ product }: { product: Product }) {
  const site = useSiteRoot()
  return (
    <article className="flex flex-col gap-4 border border-[#D6C3C2] bg-[#fffdfa] p-5 sm:flex-row sm:gap-5 sm:p-6">
      <a
        href={site.product(product.id)}
        className="flex h-28 w-28 shrink-0 items-center justify-center bg-[#F7F4EF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ab8584]"
        aria-label={`View ${product.name}`}
      >
        <img src={product.image} alt="" className="h-full w-full object-contain" />
      </a>
      <div className="min-w-0 flex flex-col gap-2.5">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.16em] text-[#6D6A63] uppercase">{product.categories[0]}</p>
          <h3 className="mt-1 font-serif text-[clamp(22px,2vw,28px)] leading-[1.15] font-normal tracking-[-0.03em]">
            <a
              href={site.product(product.id)}
              className="transition-colors duration-200 hover:text-[#ab8584] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ab8584]"
            >
              {product.name}
            </a>
          </h3>
        </div>
        <p className="text-[15px] leading-relaxed text-[#252520]">
          <span className={`mb-1 block ${EYEBROW}`}>Choose this if</span>
          {product.chooseIf}
        </p>
        <p className="text-[15px] leading-relaxed text-[#595750]">{product.goodFor}</p>
        <p className="text-[13px] leading-relaxed text-[#6D6A63]">
          <span className="font-semibold tracking-[0.12em] uppercase">Best for </span>
          {skinTypeLabel(product.skinTypes)}
        </p>
        {product.usageNote ? (
          <p className="text-[13px] leading-relaxed text-[#ab8584]">{product.usageNote}</p>
        ) : null}
      </div>
    </article>
  )
}

export default function ProductEducationPage() {
  const site = useSiteRoot()
  const [activeStep, setActiveStep] = useState<ProductProtocolStep | null>(null)

  const groups = useMemo(
    () =>
      PRODUCT_PROTOCOL_STEPS
        .filter(step => activeStep === null || step.step === activeStep)
        .map(step => ({
          ...step,
          step: step.step as ProductProtocolStep,
          products: PRODUCTS.filter(product => product.protocolStep === step.step),
        })),
    [activeStep],
  )

  const shownCount = groups.reduce((total, group) => total + group.products.length, 0)

  return (
    <article className="bg-[#F7F4EF] font-sans text-[#252520]">
      <section className="bg-[#2B2727] px-4 py-14 text-[#F7F4EF] sm:px-6 md:py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h1 className={`text-[#F7F4EF] ${HEADING}`}>Product Education</h1>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#F7F4EF]/80">
            What each product is good for. Every formula has one clear job.
          </p>
        </div>
      </section>

      <section className={`${SECTION} border-b border-[#E4DCD3] bg-[#FFFDFA] py-14 md:py-16`}>
        <div className="mx-auto max-w-6xl">
          <p className={EYEBROW}>Start here</p>
          <h2 className={`mt-4 max-w-3xl ${HEADING}`}>
            You don&apos;t need all {PRODUCTS.length} products
          </h2>
          <p className="mt-6 max-w-[640px] text-[17px] leading-relaxed text-[#595750]">
            A protocol is built from the steps your skin needs, not the full collection. Most routines use one product per step, with serums chosen for your primary concern.
          </p>
          <ol className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
            {HOW_TO_CHOOSE.map(item => (
              <li key={item.title} className="border-t border-[#E4DCD3] pt-5">
                <p className="font-serif text-[22px] leading-none tracking-[0.14em] text-[#ab8584] italic">{item.index}</p>
                <h3 className="mt-3 font-serif text-[clamp(26px,2vw,32px)] leading-[1.12] font-normal tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-[#595750]">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="product-guide" className={`${SECTION} scroll-mt-28 border-b border-[#E4DCD3] bg-[#FFFDFA] py-8`}>
        <div className="mx-auto flex max-w-6xl flex-col gap-4">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-[#6D6A63] uppercase">Browse by protocol step</p>
          <div className="flex flex-wrap gap-x-3 gap-y-5" role="group" aria-label="Filter by protocol step">
            <StepFilter
              label="All products"
              mark="All"
              selected={activeStep === null}
              onClick={() => setActiveStep(null)}
            />
            {PRODUCT_PROTOCOL_STEPS.map(step => {
              const value = step.step as ProductProtocolStep
              return (
                <StepFilter
                  key={step.step}
                  label={`Step ${step.step}, ${step.name}`}
                  caption={step.name}
                  mark={String(step.step).padStart(2, '0')}
                  selected={activeStep === value}
                  onClick={() => setActiveStep(current => (current === value ? null : value))}
                />
              )
            })}
          </div>
        </div>
      </section>

      <section className={`${SECTION} bg-[#F7F4EF] py-14 md:py-16`}>
        <div className="mx-auto max-w-6xl">
          <p className={EYEBROW} aria-live="polite">
            {shownCount} product{shownCount === 1 ? '' : 's'}
          </p>

          <div className="mt-10 flex flex-col gap-14 md:gap-16">
            {groups.map(group => (
              <div key={group.step}>
                <div className="mb-6 border-b border-[#E4DCD3] pb-5">
                  <p className={EYEBROW}>{getProtocolStepLabel(group.step)}</p>
                  <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-[#595750]">{group.description}</p>
                  {STEP_NOTES[group.step] ? (
                    <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#6D6A63]">{STEP_NOTES[group.step]}</p>
                  ) : null}
                </div>
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {group.products.map(product => (
                    <BenefitCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {activeStep === null ? (
            <div className="mt-14 border border-[#D6C3C2] bg-[#fffdfa] px-6 py-7 md:px-8">
              <p className={EYEBROW}>{PROTECT_GUIDANCE.label}</p>
              <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-[#595750]">{PROTECT_GUIDANCE.description}</p>
            </div>
          ) : null}

          <div className="mt-16 flex flex-wrap gap-3 border-t border-[#E4DCD3] pt-10">
            <a
              href={site.protocol}
              className="inline-flex min-h-12 items-center justify-center bg-[#252520] px-5 text-[11px] font-semibold tracking-[0.1em] text-white uppercase transition-colors duration-200 hover:bg-[#141412] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ab8584]"
            >
              Build Your Protocol
            </a>
            <a
              href={site.shop}
              className="inline-flex min-h-12 items-center justify-center border border-[#252520]/70 bg-transparent px-5 text-[11px] font-semibold tracking-[0.1em] text-[#252520] uppercase transition-colors duration-200 hover:border-[#ab8584] hover:text-[#ab8584] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ab8584]"
            >
              Explore the Collection
            </a>
            <a
              href={site.glossary}
              className="inline-flex min-h-12 items-center justify-center border border-[#252520]/70 bg-transparent px-5 text-[11px] font-semibold tracking-[0.1em] text-[#252520] uppercase transition-colors duration-200 hover:border-[#ab8584] hover:text-[#ab8584] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ab8584]"
            >
              Ingredient Glossary
            </a>
          </div>

          <p className="mt-6 max-w-2xl text-[11px] leading-relaxed text-[#6D6A63]">
            Product descriptions are provided for educational purposes and describe general cosmetic use. They do not imply treatment of any medical condition and do not replace professional medical advice. Consult a dermatologist or licensed esthetician for personalized skincare guidance.
          </p>
        </div>
      </section>
    </article>
  )
}
