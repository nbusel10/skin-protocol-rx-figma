import { useState, type ReactNode } from 'react'
import { PRODUCTS, getProtocolStepLabel, PROTECT_GUIDANCE } from '../../data'
import {
  buildProtocol,
  optionalTreat,
  isEveningOnlySerum,
  isVitaminC,
  otherVitaminC,
  vitaminCPair,
  vitaminCReason,
  recommendedVitaminCId,
  routineEntries,
  routinePeriodLabel,
  funOption,
  funQuestionById,
  FUN_QUESTIONS,
  DEFAULT_FUN_QUESTION,
  QUIZ_CONCERNS,
  QUIZ_SKIN_TYPES,
  REACTIVITY_OPTIONS,
  type FunQuestion,
  type QuizConcern,
  type QuizSkinType,
  type Reactivity,
  type StepsPreference,
  type RoutinePeriod,
} from '../../lib/buildProtocol'
import EmailProtocolModal from '../../components/EmailProtocolModal'
import ProductImage from '../components/ProductImage'

type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product' | 'glossary' | 'education'

interface ProtocolBuilderProps {
  onNavigate: (page: Page, productId?: string) => void
  /** Called with the number of newly added items so the header badge can update. */
  onAddToCart?: (count: number) => void
}

type Product = (typeof PRODUCTS)[number]

const STEPS_PREFERENCE: { value: StepsPreference; label: string; desc: string }[] = [
  { value: 'minimal', label: 'Essentials · 3 products', desc: 'Cleanser, toner, moisturizer' },
  { value: 'moderate', label: 'Essentials + serum · 4 products', desc: 'Add one personalized treatment' },
  { value: 'complete', label: 'Full personalized · up to 6 products', desc: 'Serum, eye cream, and finishing oil' },
]

const NO_CONCERNS_LABEL = 'No specific concerns'

/** `?fun=1..4` previews each candidate fun question. */
function activeFunQuestion(): FunQuestion {
  const n = Number(new URLSearchParams(window.location.search).get('fun'))
  return FUN_QUESTIONS[n - 1] ?? funQuestionById(DEFAULT_FUN_QUESTION)
}

function reactivityLabel(value: Reactivity | ''): string | undefined {
  const option = REACTIVITY_OPTIONS.find(o => o.value === value)
  return option ? `Stings, burns, or turns red: ${option.label.toLowerCase()}` : undefined
}

function tonerNote(tonerOmitted: boolean, tonerSwap: Product | null): string | undefined {
  if (!tonerOmitted) return undefined
  return tonerSwap
    ? `Because your skin often stings or turns red, we swapped the toner for ${tonerSwap.name}, a calming serum, and left out exfoliating products.`
    : 'Because your skin often stings or turns red, we left out the toner and exfoliating products to keep your routine gentle.'
}

function OptionButton({ selected, onClick, label, desc }: { selected: boolean; onClick: () => void; label: string; desc?: string }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-start gap-1 border p-4 transition-all text-left"
      style={{
        borderColor: selected ? '#B88E91' : '#E4DDD4',
        backgroundColor: selected ? '#F6F0F0' : '#fff',
      }}
    >
      <span className="text-sm font-medium" style={{ color: selected ? '#8E6367' : '#45403F' }}>{label}</span>
      {desc && <span className="text-xs text-charcoal/40">{desc}</span>}
    </button>
  )
}

function PeriodBadge({ label }: { label: string }) {
  return (
    <span className="border border-gray-soft px-2.5 py-1 text-[11px] tracking-wide text-charcoal/50 whitespace-nowrap transition-colors duration-500 group-hover:border-rose/30 group-hover:bg-rose-light group-hover:text-charcoal group-focus-within:border-rose/30 group-focus-within:bg-rose-light group-focus-within:text-charcoal">
      {label}
    </span>
  )
}

function StepMark({ mark }: { mark: string }) {
  return (
    <div className="relative h-12 w-12 shrink-0 text-gray-soft">
      <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
        <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle
          cx="32"
          cy="32"
          r="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform="rotate(-90 32 32)"
          className="text-rose transition-[stroke-dashoffset] duration-700 ease-out [stroke-dasharray:188.5] [stroke-dashoffset:188.5] group-hover:[stroke-dashoffset:0] group-focus-within:[stroke-dashoffset:0] motion-reduce:transition-none motion-reduce:[stroke-dashoffset:0]"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-serif text-sm text-charcoal/55 transition-colors duration-500 group-hover:text-rose group-focus-within:text-rose">
        {mark}
      </span>
    </div>
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
          ? { borderColor: '#B88E91', backgroundColor: '#F6F0F0', color: '#8E6367' }
          : { borderColor: '#B88E91', backgroundColor: '#B88E91', color: '#fff' }
      }
    >
      {added ? 'Added ✓' : 'Add to Cart'}
    </button>
  )
}

function VitaminCChoice({
  selectedId,
  recommendedId,
  reason,
  onSelect,
}: {
  selectedId: string
  recommendedId: string
  reason: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="mt-3">
      <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Vitamin C strength">
        {vitaminCPair().map(c => {
          const selected = c.id === selectedId
          return (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onSelect(c.id)}
              className="flex flex-col items-start gap-0.5 border px-3 py-2 text-left transition-colors"
              style={{
                borderColor: selected ? '#B88E91' : '#E4DDD4',
                backgroundColor: selected ? '#F6F0F0' : '#fff',
              }}
            >
              <span className="text-xs font-medium" style={{ color: selected ? '#8E6367' : '#45403F' }}>
                {c.name.replace('Brighten & Glow C Serum ', '')} · ${c.price}
              </span>
              {c.id === recommendedId && (
                <span className="text-[10px] tracking-widest uppercase text-rose">Recommended for you</span>
              )}
            </button>
          )
        })}
      </div>
      <p className="mt-2 text-xs text-charcoal/50">{reason} You can choose the other strength if you prefer.</p>
    </div>
  )
}

function SuggestionRow({
  eyebrow,
  note,
  product,
  added,
  onAdd,
  onNavigate,
  extra,
}: {
  eyebrow: string
  note: string
  product: Product
  added: boolean
  onAdd: () => void
  onNavigate: (page: Page, productId?: string) => void
  extra?: ReactNode
}) {
  return (
    <div className="group bg-white flex gap-5 p-5 border border-gray-soft">
      <div className="w-20 h-20 shrink-0 overflow-hidden">
        <ProductImage src={product.image} alt={product.name} variant="inline" />
      </div>
      <div className="flex-1">
        <p className="text-[10px] tracking-widest uppercase text-rose mb-1">{eyebrow}</p>
        <h3 className="font-medium text-charcoal mb-1">{product.name}</h3>
        <p className="text-xs text-charcoal/50 mb-2">{note}</p>
        <p className="text-sm font-semibold text-charcoal">${product.price}</p>
        {extra}
      </div>
      <div className="flex flex-col items-end justify-center gap-2 shrink-0">
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

function RoutineProductRow({
  product,
  period,
  added,
  onAdd,
  onNavigate,
  extra,
}: {
  product: Product
  period: RoutinePeriod
  added: boolean
  onAdd: () => void
  onNavigate: (page: Page, productId?: string) => void
  extra?: ReactNode
}) {
  return (
    <div className="group bg-white flex gap-5 p-5 border border-gray-soft">
      <StepMark mark={String(product.protocolStep).padStart(2, '0')} />
      <div className="w-20 h-20 shrink-0 overflow-hidden">
        <ProductImage src={product.image} alt={product.name} variant="inline" />
      </div>
      <div className="flex-1">
        <p className="text-[10px] tracking-widest uppercase text-rose mb-1">{getProtocolStepLabel(product.protocolStep)}</p>
        <p className="text-[10px] tracking-widest uppercase text-charcoal/40 mb-1">{product.categories[0]}</p>
        <h3 className="font-medium text-charcoal mb-1">{product.name}</h3>
        <p className="text-xs text-charcoal/50 mb-2">{product.tagline}</p>
        <p className="text-sm font-semibold text-charcoal">${product.price}</p>
        {extra}
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
    <div className="group bg-stone flex gap-5 p-5 border border-gray-soft">
      <StepMark mark={String(PROTECT_GUIDANCE.step).padStart(2, '0')} />
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
  extra,
}: {
  product: Product
  open: boolean
  onToggle: () => void
  onAddToProtocol: () => void
  onNavigate: (page: Page, productId?: string) => void
  extra?: ReactNode
}) {
  const period: RoutinePeriod = isEveningOnlySerum(product) ? 'pm' : 'both'
  if (!open) {
    return (
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={false}
        className="group w-full bg-white flex items-center gap-5 px-5 py-3 border border-dashed border-gray-soft text-left hover:border-rose/40 transition-colors"
      >
        <StepMark mark={String(product.protocolStep).padStart(2, '0')} />
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
    <div className="group bg-white border border-dashed border-rose/40">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={true}
        className="group w-full flex items-center gap-5 px-5 py-3 text-left hover:bg-rose-light/40 transition-colors"
      >
        <StepMark mark={String(product.protocolStep).padStart(2, '0')} />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] tracking-widest uppercase text-rose mb-0.5">{getProtocolStepLabel(product.protocolStep)}</p>
          <p className="text-sm text-charcoal/50">Add a personalized serum</p>
        </div>
        <span className="text-xl leading-none text-charcoal/40 shrink-0" aria-hidden="true">−</span>
        <span className="sr-only">Hide optional serum</span>
      </button>
      <div className="flex gap-5 p-5 pt-0">
        <div className="w-12 shrink-0" />
        <div className="w-20 h-20 shrink-0 overflow-hidden">
          <ProductImage src={product.image} alt={product.name} variant="inline" />
        </div>
        <div className="flex-1">
          <p className="text-[10px] tracking-widest uppercase text-charcoal/40 mb-1">{product.categories[0]}</p>
          <h3 className="font-medium text-charcoal mb-1">{product.name}</h3>
          <p className="text-xs text-charcoal/50 mb-2">{product.tagline}</p>
          <p className="text-sm font-semibold text-charcoal">${product.price}</p>
          {extra}
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
  const [funQuestion] = useState(activeFunQuestion)
  const [skinType, setSkinType] = useState<QuizSkinType | ''>('')
  const [reactivity, setReactivity] = useState<Reactivity | ''>('')
  const [concerns, setConcerns] = useState<QuizConcern[]>([])
  const [noConcerns, setNoConcerns] = useState(false)
  const [stepsPreference, setStepsPreference] = useState<StepsPreference>('moderate')
  const [funAnswer, setFunAnswer] = useState('')

  const toggleConcern = (c: QuizConcern) => {
    setNoConcerns(false)
    setConcerns(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])
  }
  const chooseNoConcerns = () => {
    setConcerns([])
    setNoConcerns(prev => !prev)
  }

  const canAdvance = [
    skinType !== '',
    reactivity !== '',
    concerns.length > 0 || noConcerns,
    true,
    funAnswer !== '',
  ]

  const [recommendations, setRecommendations] = useState<Product[]>([])
  const [weekly, setWeekly] = useState<Product | null>(null)
  const [alternative, setAlternative] = useState<Product | null>(null)
  const [bonus, setBonus] = useState<Product | null>(null)
  const [tonerSwap, setTonerSwap] = useState<Product | null>(null)
  const [tonerOmitted, setTonerOmitted] = useState(false)
  const [cRecommendedId, setCRecommendedId] = useState('')
  const [cReason, setCReason] = useState('')
  const [cChoiceId, setCChoiceId] = useState('')
  const [done, setDone] = useState(false)
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [addedIds, setAddedIds] = useState<string[]>([])
  const [treatOffer, setTreatOffer] = useState<Product | null>(null)
  const [treatOpen, setTreatOpen] = useState(false)

  const withCChoice = (p: Product): Product => (isVitaminC(p) && cChoiceId && p.id !== cChoiceId ? otherVitaminC(p) : p)
  const cPicker = (p: Product) =>
    isVitaminC(p) ? (
      <VitaminCChoice selectedId={p.id} recommendedId={cRecommendedId} reason={cReason} onSelect={setCChoiceId} />
    ) : undefined

  const addToCart = (ids: string[]) => {
    const fresh = ids.filter(id => !addedIds.includes(id))
    if (!fresh.length) return
    setAddedIds(prev => [...prev, ...fresh])
    onAddToCart?.(fresh.length)
  }

  const finish = () => {
    if (!skinType || !reactivity || (!concerns.length && !noConcerns) || !funAnswer) return
    const answers = {
      skinType,
      concerns,
      reactivity,
      stepsPreference,
      funAnswer,
    }
    const result = buildProtocol(answers)
    const cId = recommendedVitaminCId(answers)
    setRecommendations(result.products)
    setWeekly(result.weekly)
    setAlternative(result.alternative)
    setBonus(result.bonus)
    setTonerSwap(result.tonerSwap)
    setTonerOmitted(result.tonerOmitted)
    setCRecommendedId(cId)
    setCReason(vitaminCReason(answers))
    setCChoiceId(cId)
    setTreatOffer(optionalTreat(answers))
    setTreatOpen(false)
    setDone(true)
  }

  const routine = recommendations.map(withCChoice)
  const emailedProducts = weekly ? [...routine, weekly] : routine
  const totalPrice = emailedProducts.reduce((s, p) => s + p.price, 0)
  const entries = routineEntries(routine)
  const shownAlternative = alternative && withCChoice(alternative)
  const shownTreatOffer = treatOffer && withCChoice(treatOffer)
  const note = tonerNote(tonerOmitted, tonerSwap)

  const QUESTIONS = [
    {
      title: 'What is your skin type?',
      content: (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {QUIZ_SKIN_TYPES.map(t => (
            <OptionButton key={t} selected={skinType === t} onClick={() => setSkinType(t)} label={t} />
          ))}
        </div>
      ),
    },
    {
      title: 'How often does your skin sting, burn, or turn red from new products or weather?',
      content: (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {REACTIVITY_OPTIONS.map(r => (
            <OptionButton key={r.value} selected={reactivity === r.value} onClick={() => setReactivity(r.value)} label={r.label} />
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
            {QUIZ_CONCERNS.map(c => (
              <OptionButton key={c} selected={concerns.includes(c)} onClick={() => toggleConcern(c)} label={c} />
            ))}
            <OptionButton selected={noConcerns} onClick={chooseNoConcerns} label={NO_CONCERNS_LABEL} />
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
      title: funQuestion.title,
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {funQuestion.options.map(o => (
            <OptionButton key={o.value} selected={funAnswer === o.value} onClick={() => setFunAnswer(o.value)} label={o.label} />
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
              Based on your {skinType?.toLowerCase()} skin type
              {concerns.length ? ` and ${concerns.slice(0, 2).join(', ').toLowerCase()} concerns` : ''}.
              Daily essentials are cleanser, moisturizer, and morning sunscreen — personalized additions only where they help.
            </p>
          </div>

          {note && (
            <div className="border border-rose/40 bg-rose-light p-6 mb-10">
              <p className="text-[11px] tracking-widest uppercase text-rose mb-2">Kept Gentle for You</p>
              <p className="text-sm text-charcoal/60 leading-relaxed">{note}</p>
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
                      extra={cPicker(product)}
                    />
                    {treatOffer && shownTreatOffer && product.protocolStep === 2 && (
                      <OptionalTreatSliver
                        product={shownTreatOffer}
                        extra={cPicker(shownTreatOffer)}
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
              <div className="group bg-white flex gap-5 p-5 border border-gray-soft">
                <StepMark mark="W" />
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

          {shownAlternative && (
            <div className="mb-10">
              <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-4">Also Consider</p>
              <SuggestionRow
                eyebrow="Alternative serum"
                note="Ranked next for your answers. Use it in place of your serum, not alongside it."
                product={shownAlternative}
                added={addedIds.includes(shownAlternative.id)}
                onAdd={() => addToCart([shownAlternative.id])}
                onNavigate={onNavigate}
                extra={cPicker(shownAlternative)}
              />
            </div>
          )}

          {bonus && (
            <div className="mb-10">
              <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-4">A Little Extra</p>
              <SuggestionRow
                eyebrow="Bonus pick"
                note={`Because you chose “${funOption(funAnswer)?.label ?? ''}”.`}
                product={bonus}
                added={addedIds.includes(bonus.id)}
                onAdd={() => addToCart([bonus.id])}
                onNavigate={onNavigate}
              />
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
              concerns: concerns.length ? concerns : [NO_CONCERNS_LABEL],
              skinRightNow: reactivityLabel(reactivity),
              note,
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
                setAlternative(null)
                setBonus(null)
                setTonerSwap(null)
                setTonerOmitted(false)
                setCRecommendedId('')
                setCReason('')
                setCChoiceId('')
                setSkinType('')
                setReactivity('')
                setConcerns([])
                setNoConcerns(false)
                setStepsPreference('moderate')
                setFunAnswer('')
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
    <div className="bg-ivory min-h-screen font-sans">
      <section className="border-b border-gray-soft bg-ivory">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 px-5 py-12 md:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14 lg:py-16">
          <div className="flex flex-col justify-center">
          <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-4">Find your routine</p>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal max-w-xl mb-5 leading-[1.12]">
            Build your daily routine.<br />
            <em>You do not need every product.</em>
          </h1>
          <p className="text-base text-charcoal/85 max-w-xl mb-8 leading-relaxed">
            Five short questions. We&apos;ll suggest a cleanser, a moisturizer, and only the extras your skin asks for.
          </p>
          <button
            onClick={() => document.getElementById('protocol-quiz')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary self-start"
          >
            Begin
          </button>
          </div>
          <img
            src="/find-your-routine.jpg"
            alt="A woman resting her chin in her hand in warm sunlight"
            className="mx-auto aspect-[4/5] h-72 w-auto object-cover object-[center_22%] sm:h-80 lg:h-[22rem]"
          />
        </div>
      </section>

      <div id="protocol-quiz" className="max-w-3xl mx-auto px-5 md:px-8 py-16 scroll-mt-44 bg-stone">
        {/* Progress */}
        <div className="flex gap-1.5 mb-12">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 transition-all duration-300"
              style={{ backgroundColor: i <= step ? '#B88E91' : '#E4DDD4' }}
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
              className="btn-primary disabled:opacity-40"
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
