import { useState } from 'react'
import { PRODUCTS, getProtocolStepLabel, PROTECT_GUIDANCE, type SkinType, type SkinConcern } from '../data'
import {
  buildProtocol,
  optionalTreat,
  isEveningOnlySerum,
  routineEntries,
  routinePeriodLabel,
  type SkinState,
  type StepsPreference,
  type RoutinePeriod,
} from '../lib/buildProtocol'
import EmailProtocolModal from '../components/EmailProtocolModal'
import ProductImage from '../components/ProductImage'

type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product' | 'glossary' | 'education'

interface ProtocolBuilderProps {
  onNavigate: (page: Page, productId?: string) => void
  /** Called with the number of newly added items so the header badge can update. */
  onAddToCart?: (count: number) => void
}

const SKIN_TYPES: SkinType[] = ['Combination', 'Dry', 'Normal', 'Oily', 'Sensitive']
const SKIN_CONCERNS: SkinConcern[] = ['Acne', 'Aging', 'Brightening', 'Dry Skin', 'Eye Area', 'Hyperpigmentation', 'Large Pores', 'Preventative', 'Redness', 'Sun Damage']

const STEPS_PREFERENCE: { value: StepsPreference; label: string; desc: string }[] = [
  { value: 'minimal', label: 'Essentials · 3 products', desc: 'Cleanser, toner, moisturizer + morning SPF' },
  { value: 'moderate', label: 'Essentials + serum · 4 products', desc: 'Add one personalized treatment' },
  { value: 'complete', label: 'Full personalized · up to 6 products', desc: 'Serum plus optional eye care and oil' },
]

const SKIN_STATES: { value: SkinState; label: string; desc: string }[] = [
  { value: 'calm', label: 'Calm and comfortable', desc: "Nothing's really bothering me" },
  { value: 'dehydrated', label: 'Dull and dehydrated', desc: 'Looks flat, drinks up moisturizer' },
  { value: 'breakout', label: 'Breaking out', desc: 'Active blemishes or congestion' },
  { value: 'irritated', label: 'Irritated', desc: 'Red, stinging, or peeling' },
]

function OptionButton({ selected, onClick, label, desc }: { selected: boolean; onClick: () => void; label: string; desc?: string }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-start gap-1 border p-4 transition-all text-left"
      style={{
        borderColor: selected ? '#B8878B' : '#E5E5E5',
        backgroundColor: selected ? '#FAF4F2' : '#fff',
      }}
    >
      <span className="text-sm font-medium" style={{ color: selected ? '#B8878B' : '#0A0A0A' }}>{label}</span>
      {desc && <span className="text-xs text-charcoal/40">{desc}</span>}
    </button>
  )
}

function PeriodBadge({ label }: { label: string }) {
  return (
    <span className="text-[10px] tracking-widest uppercase text-charcoal/50 border border-gray-soft px-2 py-1 whitespace-nowrap">
      {label}
    </span>
  )
}

function AddToCartButton({ added, onAdd }: { added: boolean; onAdd: () => void }) {
  return (
    <button
      type="button"
      onClick={onAdd}
      aria-live="polite"
      className="text-[11px] tracking-wide px-3 py-2 border transition-colors whitespace-nowrap"
      style={
        added
          ? { borderColor: '#B8878B', backgroundColor: '#FAF4F2', color: '#B8878B' }
          : { borderColor: '#0A0A0A', backgroundColor: '#0A0A0A', color: '#fff' }
      }
    >
      {added ? 'Added ✓' : 'Add to Cart'}
    </button>
  )
}

function RoutineProductRow({
  product,
  period,
  added,
  onAdd,
  onNavigate,
}: {
  product: (typeof PRODUCTS)[number]
  period: RoutinePeriod
  added: boolean
  onAdd: () => void
  onNavigate: (page: Page, productId?: string) => void
}) {
  return (
    <div className="bg-white flex gap-5 p-5 border border-gray-soft">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-rose flex items-center justify-center text-white text-xs font-semibold">{product.protocolStep}</div>
      </div>
      <div className="w-20 h-20 shrink-0 overflow-hidden">
        <ProductImage src={product.image} alt={product.name} variant="inline" />
      </div>
      <div className="flex-1">
        <p className="text-[10px] tracking-widest uppercase text-rose mb-1">{getProtocolStepLabel(product.protocolStep)}</p>
        <p className="text-[10px] tracking-widest uppercase text-charcoal/40 mb-1">{product.categories[0]}</p>
        <h3 className="font-medium text-charcoal mb-1">{product.name}</h3>
        <p className="text-xs text-charcoal/50 mb-2">{product.tagline}</p>
        <p className="text-sm font-semibold text-charcoal">${product.price}</p>
      </div>
      <div className="flex flex-col items-end justify-center gap-2 shrink-0">
        <PeriodBadge label={routinePeriodLabel(period)} />
        <AddToCartButton added={added} onAdd={onAdd} />
        <button
          onClick={() => onNavigate('product', product.id)}
          className="hidden md:flex items-center text-xs text-rose underline underline-offset-2 whitespace-nowrap"
        >
          View →
        </button>
      </div>
    </div>
  )
}

function ProtectRow() {
  return (
    <div className="bg-stone flex gap-5 p-5 border border-gray-soft">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-black flex items-center justify-center text-white text-xs font-semibold">{PROTECT_GUIDANCE.step}</div>
      </div>
      <div className="flex-1">
        <p className="text-[10px] tracking-widest uppercase text-rose mb-1">{PROTECT_GUIDANCE.label}</p>
        <h3 className="font-medium text-charcoal mb-1">Broad-spectrum SPF 30+</h3>
        <p className="text-xs text-charcoal/50 mb-1">{PROTECT_GUIDANCE.description}</p>
        <p className="text-xs text-charcoal/40">{PROTECT_GUIDANCE.note}</p>
      </div>
      <div className="flex flex-col items-end justify-center shrink-0">
        <PeriodBadge label="AM only" />
      </div>
    </div>
  )
}

function OptionalTreatSliver({
  product,
  open,
  onToggle,
  onAddToProtocol,
  onNavigate,
}: {
  product: (typeof PRODUCTS)[number]
  open: boolean
  onToggle: () => void
  onAddToProtocol: () => void
  onNavigate: (page: Page, productId?: string) => void
}) {
  const period: RoutinePeriod = isEveningOnlySerum(product) ? 'pm' : 'both'
  if (!open) {
    return (
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={false}
        className="w-full bg-white flex items-center gap-5 px-5 py-3 border border-dashed border-gray-soft text-left hover:border-rose/40 transition-colors"
      >
        <div className="w-10 h-10 border border-dashed border-charcoal/25 flex items-center justify-center text-charcoal/40 text-xs font-semibold shrink-0">
          {product.protocolStep}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] tracking-widest uppercase text-rose mb-0.5">{getProtocolStepLabel(product.protocolStep)}</p>
          <p className="text-sm text-charcoal/50">Add a personalized serum</p>
        </div>
        <span className="text-xl leading-none text-charcoal/40 shrink-0" aria-hidden="true">+</span>
        <span className="sr-only">Show optional serum</span>
      </button>
    )
  }
  return (
    <div className="bg-white border border-dashed border-rose/40">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={true}
        className="w-full flex items-center gap-5 px-5 py-3 text-left hover:bg-rose-light/40 transition-colors"
      >
        <div className="w-10 h-10 border border-dashed border-rose/50 flex items-center justify-center text-rose text-xs font-semibold shrink-0">
          {product.protocolStep}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] tracking-widest uppercase text-rose mb-0.5">{getProtocolStepLabel(product.protocolStep)}</p>
          <p className="text-sm text-charcoal/50">Add a personalized serum</p>
        </div>
        <span className="text-xl leading-none text-charcoal/40 shrink-0" aria-hidden="true">−</span>
        <span className="sr-only">Hide optional serum</span>
      </button>
      <div className="flex gap-5 p-5 pt-0">
        <div className="w-10 shrink-0" />
        <div className="w-20 h-20 shrink-0 overflow-hidden">
          <ProductImage src={product.image} alt={product.name} variant="inline" />
        </div>
        <div className="flex-1">
          <p className="text-[10px] tracking-widest uppercase text-charcoal/40 mb-1">{product.categories[0]}</p>
          <h3 className="font-medium text-charcoal mb-1">{product.name}</h3>
          <p className="text-xs text-charcoal/50 mb-2">{product.tagline}</p>
          <p className="text-sm font-semibold text-charcoal">${product.price}</p>
        </div>
        <div className="flex flex-col items-end justify-center gap-2 shrink-0">
          <PeriodBadge label={routinePeriodLabel(period)} />
          <button
            type="button"
            onClick={onAddToProtocol}
            className="text-[11px] tracking-wide px-3 py-2 border border-rose bg-rose text-white hover:bg-rose-dark transition-colors whitespace-nowrap"
          >
            Add to my protocol
          </button>
          <button
            type="button"
            onClick={() => onNavigate('product', product.id)}
            className="hidden md:flex items-center text-xs text-rose underline underline-offset-2 whitespace-nowrap"
          >
            View →
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ProtocolBuilder({ onNavigate, onAddToCart }: ProtocolBuilderProps) {
  const [step, setStep] = useState(0)
  const [skinType, setSkinType] = useState<SkinType | ''>('')
  const [concerns, setConcerns] = useState<SkinConcern[]>([])
  const [stepsPreference, setStepsPreference] = useState<StepsPreference>('moderate')
  const [sensitive, setSensitive] = useState<boolean | null>(null)
  const [skinRightNow, setSkinRightNow] = useState<SkinState | ''>('')

  const toggleConcern = (c: SkinConcern) =>
    setConcerns(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])

  const canAdvance = [
    skinType !== '',
    concerns.length > 0,
    true,
    sensitive !== null,
    skinRightNow !== '',
  ]

  const [recommendations, setRecommendations] = useState<typeof PRODUCTS>([])
  const [weekly, setWeekly] = useState<(typeof PRODUCTS)[number] | null>(null)
  const [done, setDone] = useState(false)
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [addedIds, setAddedIds] = useState<string[]>([])
  const [treatOffer, setTreatOffer] = useState<(typeof PRODUCTS)[number] | null>(null)
  const [treatOpen, setTreatOpen] = useState(false)

  const addToCart = (ids: string[]) => {
    const fresh = ids.filter(id => !addedIds.includes(id))
    if (!fresh.length) return
    setAddedIds(prev => [...prev, ...fresh])
    onAddToCart?.(fresh.length)
  }

  const finish = () => {
    if (!skinType || !concerns.length || sensitive === null || !skinRightNow) return
    const answers = {
      skinType,
      concerns,
      stepsPreference,
      sensitive,
      skinRightNow,
    }
    const result = buildProtocol(answers)
    setRecommendations(result.products)
    setWeekly(result.weekly)
    setTreatOffer(optionalTreat(answers))
    setTreatOpen(false)
    setDone(true)
  }

  const emailedProducts = weekly ? [...recommendations, weekly] : recommendations
  const totalPrice = emailedProducts.reduce((s, p) => s + p.price, 0)
  const entries = routineEntries(recommendations)

  const QUESTIONS = [
    {
      title: 'What is your skin type?',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SKIN_TYPES.map(t => (
            <OptionButton key={t} selected={skinType === t} onClick={() => setSkinType(t)} label={t} />
          ))}
        </div>
      ),
    },
    {
      title: 'What are your top skin concerns?',
      content: (
        <>
          <p className="text-sm text-charcoal/40 mb-4">Select all that apply</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {SKIN_CONCERNS.map(c => (
              <OptionButton key={c} selected={concerns.includes(c)} onClick={() => toggleConcern(c)} label={c} />
            ))}
          </div>
        </>
      ),
    },
    {
      title: 'How personalized should your routine be?',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {STEPS_PREFERENCE.map(s => (
            <OptionButton key={s.value} selected={stepsPreference === s.value} onClick={() => setStepsPreference(s.value)} label={s.label} desc={s.desc} />
          ))}
        </div>
      ),
    },
    {
      title: 'Is your skin sensitive or reactive?',
      content: (
        <div className="grid grid-cols-2 gap-4 max-w-xs">
          <OptionButton selected={sensitive === true} onClick={() => setSensitive(true)} label="Yes" />
          <OptionButton selected={sensitive === false} onClick={() => setSensitive(false)} label="No" />
        </div>
      ),
    },
    {
      title: 'How is your skin feeling right now?',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SKIN_STATES.map(s => (
            <OptionButton key={s.value} selected={skinRightNow === s.value} onClick={() => setSkinRightNow(s.value)} label={s.label} desc={s.desc} />
          ))}
        </div>
      ),
    },
  ]

  if (done) {
    return (
      <div className="bg-white min-h-screen font-sans">
        <div className="max-w-4xl mx-auto px-5 md:px-8 py-16">
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-3">Your Custom Protocol</p>
            <h1 className="font-serif text-4xl text-black mb-4">Your Recommended Protocol</h1>
            <p className="text-charcoal/50 max-w-xl mx-auto">
              Based on your {skinType?.toLowerCase()} skin type and {concerns.slice(0, 2).join(', ').toLowerCase()} concerns.
              Daily essentials are cleanser, moisturizer, and morning sunscreen — personalized additions only where they help.
            </p>
          </div>

          {skinRightNow === 'irritated' && (
            <div className="border border-rose/40 bg-rose-light p-6 mb-10">
              <p className="text-[11px] tracking-widest uppercase text-rose mb-2">Let&apos;s Calm Things First</p>
              <p className="text-sm text-charcoal/60 leading-relaxed">
                You told us your skin is irritated right now, so we&apos;ve left the active ingredients out. This is a
                short recovery routine built to settle things down. Once your skin feels comfortable again — usually two
                to three weeks — come back and we&apos;ll add your treatment serum.
              </p>
            </div>
          )}

          {recommendations.length === 0 && (
            <p className="text-center text-charcoal/50 mb-10">We could not build a protocol from those answers. Please start over.</p>
          )}

          {recommendations.length > 0 && (
            <div className="mb-10">
              <div className="flex items-baseline justify-between mb-4">
                <p className="text-[11px] tracking-[0.3em] uppercase text-rose">Your Daily Routine</p>
                <p className="text-[10px] tracking-widest uppercase text-charcoal/40">When to apply</p>
              </div>
              <div className="space-y-4">
                {entries.map(({ product, period }) => (
                  <div key={product.id} className="space-y-4">
                    <RoutineProductRow
                      product={product}
                      period={period}
                      added={addedIds.includes(product.id)}
                      onAdd={() => addToCart([product.id])}
                      onNavigate={onNavigate}
                    />
                    {treatOffer && product.protocolStep === 2 && (
                      <OptionalTreatSliver
                        product={treatOffer}
                        open={treatOpen}
                        onToggle={() => setTreatOpen(open => !open)}
                        onAddToProtocol={() => {
                          setRecommendations(prev =>
                            [...prev, treatOffer].sort(
                              (a, b) => a.protocolStep - b.protocolStep || a.name.localeCompare(b.name),
                            ),
                          )
                          setTreatOffer(null)
                          setTreatOpen(false)
                        }}
                        onNavigate={onNavigate}
                      />
                    )}
                  </div>
                ))}
                <ProtectRow />
              </div>
            </div>
          )}

          {weekly && (
            <div className="mb-10">
              <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-4">Weekly · Polish</p>
              <div className="bg-white flex gap-5 p-5 border border-gray-soft">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-black flex items-center justify-center text-white text-[10px] tracking-widest uppercase font-semibold">W</div>
                </div>
                <div className="w-20 h-20 shrink-0 overflow-hidden">
                  <ProductImage src={weekly.image} alt={weekly.name} variant="inline" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] tracking-widest uppercase text-rose mb-1">Occasional alternative cleanser</p>
                  <p className="text-[10px] tracking-widest uppercase text-charcoal/40 mb-1">{weekly.categories[0]}</p>
                  <h3 className="font-medium text-charcoal mb-1">{weekly.name}</h3>
                  <p className="text-xs text-charcoal/50 mb-2">Use 1 to 3 times per week in place of your daily cleanser, as tolerated.</p>
                  <p className="text-sm font-semibold text-charcoal">${weekly.price}</p>
                </div>
                <div className="flex flex-col items-end justify-center gap-2 shrink-0">
                  <PeriodBadge label="1–3× weekly" />
                  <AddToCartButton added={addedIds.includes(weekly.id)} onAdd={() => addToCart([weekly.id])} />
                  <button
                    onClick={() => onNavigate('product', weekly.id)}
                    className="hidden md:flex items-center text-xs text-rose underline underline-offset-2 whitespace-nowrap"
                  >
                    View →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Total + CTA */}
          <div className="bg-black p-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs tracking-widest uppercase text-rose mb-1">Protocol Total</p>
                <p className="font-serif text-3xl">${totalPrice}</p>
              </div>
              <div className="text-right text-sm text-white/50">
                <p>{emailedProducts.length} products</p>
                <p>AM &amp; PM + morning SPF</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => addToCart(emailedProducts.map(p => p.id))}
                className="flex-1 bg-rose text-white py-3.5 text-sm font-medium hover:bg-rose-dark transition-colors"
              >
                Add Entire Protocol to Cart
              </button>
              <button
                type="button"
                onClick={() => setEmailModalOpen(true)}
                className="flex-1 border border-white/25 text-white py-3.5 text-sm font-medium hover:border-rose hover:text-rose transition-colors"
              >
                Email My Protocol
              </button>
            </div>
          </div>

          <EmailProtocolModal
            isOpen={emailModalOpen}
            onClose={() => setEmailModalOpen(false)}
            protocol={{
              skinType: skinType || '',
              concerns,
              skinRightNow: SKIN_STATES.find(s => s.value === skinRightNow)?.label,
              note: skinRightNow === 'irritated'
                ? "Your skin is irritated right now, so this is a short recovery routine without active ingredients. Come back in two to three weeks and we'll add your treatment serum."
                : undefined,
              products: [
                ...entries.map(({ product, period }) => ({
                  name: product.name,
                  price: `$${product.price}`,
                  step: product.protocolStep,
                  period,
                })),
                {
                  name: 'Broad-spectrum SPF 30+',
                  price: 'Purchased separately',
                  step: PROTECT_GUIDANCE.step,
                  period: 'am' as const,
                },
                ...(weekly
                  ? [{ name: weekly.name, price: `$${weekly.price}`, step: 'W', period: 'weekly' as const }]
                  : []),
              ],
              totalPrice: `$${totalPrice}`,
            }}
          />

          <div className="text-center mt-8">
            <button
              onClick={() => {
                setDone(false)
                setStep(0)
                setWeekly(null)
                setRecommendations([])
                setSkinType('')
                setConcerns([])
                setStepsPreference('moderate')
                setSensitive(null)
                setSkinRightNow('')
                setTreatOffer(null)
                setTreatOpen(false)
              }}
              className="text-sm text-charcoal/40 underline underline-offset-2 hover:text-charcoal transition-colors"
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/protocol-hero.jpg"
            alt="Amber serum bottle with eucalyptus on wood"
            className="w-full h-full object-cover object-[70%_center]"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-24 w-full">
          <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-5">Personalize Your Protocol</p>
          <h1 className="font-serif text-4xl md:text-6xl text-white max-w-2xl mb-6 leading-[1.1]">
            Build your daily routine.<br />
            <em>You do not need every product.</em>
          </h1>
          <p className="text-white/60 max-w-xl mb-10 leading-relaxed">
            Choose products that fit your skin — cleanser and moisturizer as daily essentials, then add a serum or optional care based on your needs. Finish mornings with SPF.
          </p>
          <button
            onClick={() => document.getElementById('protocol-quiz')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-rose text-white px-8 py-4 text-sm font-medium hover:bg-rose-dark transition-colors"
          >
            Begin
          </button>
          <p className="text-xs tracking-widest uppercase text-white/35 mt-8">
            5 questions · About 2 minutes · Tailored to your skin
          </p>
        </div>
      </section>

      <div id="protocol-quiz" className="max-w-3xl mx-auto px-5 md:px-8 py-16 scroll-mt-44 bg-stone">
        {/* Progress */}
        <div className="flex gap-1.5 mb-12">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 transition-all duration-300"
              style={{ backgroundColor: i <= step ? '#B8878B' : '#E5E5E5' }}
            />
          ))}
        </div>

        {/* Question */}
        <div className="bg-white p-8 md:p-10 border border-gray-soft">
          <p className="text-[11px] tracking-widest uppercase text-rose mb-3">Question {step + 1} of {QUESTIONS.length}</p>
          <h2 className="font-serif text-2xl md:text-3xl text-black mb-8">{QUESTIONS[step].title}</h2>
          {QUESTIONS[step].content}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className="text-sm text-black/40 hover:text-black disabled:opacity-30 transition-colors"
          >
            ← Back
          </button>
          {step < QUESTIONS.length - 1 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canAdvance[step]}
              className="bg-black text-white px-8 py-3 text-sm font-medium hover:bg-rose disabled:opacity-40 transition-colors"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={finish}
              disabled={!canAdvance[step]}
              className="bg-rose text-white px-8 py-3 text-sm font-medium hover:bg-rose-dark disabled:opacity-40 transition-colors"
            >
              Build My Protocol
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
