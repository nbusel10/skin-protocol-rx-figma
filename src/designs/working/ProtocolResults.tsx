import { Fragment, useState, type ReactNode } from 'react'
import EmailProtocolModal from '../../components/EmailProtocolModal'
import { getProtocolStepLabel, PROTECT_GUIDANCE, type Product } from '../../data'
import {
  funOption,
  isEveningOnlySerum,
  isVitaminC,
  otherVitaminC,
  REACTIVITY_OPTIONS,
  routineEntries,
  routinePeriodLabel,
  type RoutinePeriod,
  vitaminCChoiceNote,
  vitaminCPair,
} from '../../lib/buildProtocol'
import {
  loadQuizSession,
  protocolFromSession,
  saveQuizSession,
  type QuizSession,
} from '../../lib/quizSession'

function QuietLink({
  children,
  onClick,
  className = '',
}: {
  children: ReactNode
  onClick: () => void
  className?: string
}) {
  return (
    <button
      type="button"
    onClick={event => {
      event.stopPropagation()
      onClick()
    }}
    className={`inline-flex items-center gap-2 text-[13px] text-[#6D6A63] transition-colors duration-200 hover:text-[#ab8584] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ab8584] ${className}`}
  >
      {children}
      <span aria-hidden="true">↗</span>
    </button>
  )
}

function StepMark({ mark }: { mark: string }) {
  return (
    <div className="relative h-12 w-12 shrink-0 self-start" aria-hidden="true">
      <svg viewBox="0 0 44 44" className="h-full w-full">
        <circle cx="22" cy="22" r="19" fill="none" stroke="#D6CEC3" strokeWidth="1.15" />
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
          className="opacity-0 transition-[stroke-dashoffset,opacity] duration-700 ease-out [stroke-dasharray:1] [stroke-dashoffset:1.02] group-hover:opacity-100 group-hover:[stroke-dashoffset:0] group-focus-within:opacity-100 group-focus-within:[stroke-dashoffset:0] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:[stroke-dashoffset:0]"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-serif text-sm text-[#6D6A63] transition-colors duration-500 group-hover:text-[#ab8584] group-focus-within:text-[#ab8584]">
        {mark}
      </span>
    </div>
  )
}

function AddCartButton({ added, onAdd }: { added: boolean; onAdd: () => void }) {
  return (
    <button
      type="button"
      onClick={event => {
        event.stopPropagation()
        onAdd()
      }}
      aria-live="polite"
      className={`whitespace-nowrap px-3 py-2 text-[11px] tracking-wide ${added ? 'border border-[#ab8584] bg-[#ab8584]/10 text-[#ab8584]' : 'bg-[#252520] text-[#F7F4EF]'}`}
    >
      {added ? 'Added ✓' : 'Add to Cart'}
    </button>
  )
}

function reactivityLine(value: QuizSession['reactivity']): string | undefined {
  const option = REACTIVITY_OPTIONS.find(item => item.value === value)
  return option ? `Stings, burns, or turns red: ${option.label.toLowerCase()}` : undefined
}

function summary(session: QuizSession): string {
  const concernText = session.noConcerns || session.concerns.length === 0
    ? ''
    : ` and ${session.concerns.slice(0, 2).join(', ').toLowerCase()} concerns`
  const tail = ' Daily essentials are cleanser, moisturizer, and morning sunscreen — personalized additions only where they help.'
  if (session.skinUnsure) return `Based on your answers${concernText}.${tail}`
  return `Based on your ${session.skinType.toLowerCase()} skin type${concernText}.${tail}`
}

function shownProduct(product: Product, choiceId: string): Product {
  return isVitaminC(product) && choiceId && product.id !== choiceId ? otherVitaminC(product) : product
}

function serumPeriod(product: Product): RoutinePeriod {
  return isEveningOnlySerum(product) ? 'pm' : 'both'
}

function StrengthPills({
  selectedId,
  recommendedId,
  active,
  onSelect,
}: {
  selectedId: string
  recommendedId: string
  active: boolean
  onSelect: (id: string) => void
}) {
  const pair = vitaminCPair()
  const ordered = pair[0].id === recommendedId ? pair : [pair[1], pair[0]]
  return (
    <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Vitamin C strength">
      {ordered.map(option => {
        const selected = active && option.id === selectedId
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={event => {
              event.stopPropagation()
              onSelect(option.id)
            }}
            className={`rounded-full border px-3 py-1 text-[12px] leading-none ${selected ? 'border-[#252520] bg-[#252520] text-[#F7F4EF]' : 'border-[#D6CEC3] text-[#252520] hover:border-[#ab8584]'}`}
          >
            {option.name.replace('Brighten & Glow C Serum ', '')}
          </button>
        )
      })}
    </div>
  )
}

function VitaminCTitle({
  strengthId,
  recommendedId,
  active,
  compact = false,
  onSelect,
}: {
  strengthId: string
  recommendedId: string
  active: boolean
  compact?: boolean
  onSelect: (id: string) => void
}) {
  const showStamp = !compact && active && strengthId === recommendedId
  return (
    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-2">
      <h2 className={`font-serif leading-snug ${compact ? 'text-[1.15rem]' : 'text-[1.35rem]'}`}>Brighten & Glow C Serum</h2>
      <StrengthPills selectedId={strengthId} recommendedId={recommendedId} active={active} onSelect={onSelect} />
      {showStamp ? (
        <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#ab8584]">Recommended for you</span>
      ) : null}
    </div>
  )
}

function ChoiceCard({
  stamp,
  selected,
  product,
  onSelect,
  onView,
  onAdd,
  added,
  title,
  note,
}: {
  stamp: string
  selected: boolean
  product: Product
  onSelect: () => void
  onView: (id: string) => void
  onAdd: () => void
  added: boolean
  title: ReactNode
  note?: string
}) {
  return (
    <div
      onClick={onSelect}
      className={`flex cursor-pointer gap-5 border p-5 text-left ${selected ? 'border-[#ab8584] bg-[#ab8584]/10' : 'border-[#D6CEC3] bg-transparent'}`}
    >
      <img src={product.image} alt="" className="h-24 w-20 shrink-0 object-contain" />
      <div className="min-w-0 flex-1">
        <span className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-[#ab8584]">{stamp}</span>
        {title}
        <p className="mt-1 text-sm text-[#595750]">{product.tagline}</p>
        <p className="mt-2 text-sm font-semibold">${product.price}</p>
        {note ? <p className="mt-3 text-xs italic leading-relaxed text-[#6D6A63]">{note}</p> : null}
      </div>
      <div className="flex shrink-0 flex-col items-end gap-3">
        <span className="border border-[#D6CEC3] px-2.5 py-1 text-[11px] tracking-wide text-[#6D6A63]">
          {routinePeriodLabel(serumPeriod(product))}
        </span>
        <AddCartButton added={added} onAdd={onAdd} />
        <QuietLink onClick={() => onView(product.id)}>View</QuietLink>
      </div>
    </div>
  )
}

function VitaminCStep({
  recommended,
  alternative,
  strengthId,
  recommendedStrengthId,
  usingAlternative,
  reason,
  onStrength,
  onSelectAlternative,
  onSelectRecommended,
  onView,
  onAdd,
  addedIds,
}: {
  recommended: Product
  alternative: Product
  strengthId: string
  recommendedStrengthId: string
  usingAlternative: boolean
  reason: string
  onStrength: (id: string) => void
  onSelectAlternative: () => void
  onSelectRecommended: () => void
  onView: (id: string) => void
  onAdd: (id: string) => void
  addedIds: string[]
}) {
  const recommendedIsC = isVitaminC(recommended)
  const vitaminC = shownProduct(recommendedIsC ? recommended : alternative, strengthId)
  const vitaminCSelected = recommendedIsC ? !usingAlternative : usingAlternative
  const other = recommendedIsC ? alternative : recommended
  const title = (
    <VitaminCTitle
      strengthId={strengthId}
      recommendedId={recommendedStrengthId}
      active={vitaminCSelected}
      compact
      onSelect={onStrength}
    />
  )
  const recommendedStamp = recommendedIsC && vitaminCSelected && strengthId !== recommendedStrengthId
    ? '\u00a0'
    : 'Recommended for you'
  const vitaminCard = (
    <ChoiceCard
      stamp={recommendedIsC ? recommendedStamp : 'Also consider'}
      selected={vitaminCSelected}
      product={vitaminC}
      onSelect={recommendedIsC ? onSelectRecommended : onSelectAlternative}
      onView={onView}
      onAdd={() => onAdd(vitaminC.id)}
      added={addedIds.includes(vitaminC.id)}
      title={title}
      note={vitaminCChoiceNote(reason)}
    />
  )
  const otherCard = (
    <ChoiceCard
      stamp={recommendedIsC ? 'Also consider' : 'Recommended for you'}
      selected={!vitaminCSelected}
      product={other}
      onSelect={recommendedIsC ? onSelectAlternative : onSelectRecommended}
      onView={onView}
      onAdd={() => onAdd(other.id)}
      added={addedIds.includes(other.id)}
      title={<h2 className="mt-1 font-serif text-[1.15rem] leading-snug">{other.name}</h2>}
    />
  )

  const choices = (
    <>
      <div className="grid grid-cols-1 gap-3">
        {recommendedIsC ? vitaminCard : otherCard}
        {recommendedIsC ? otherCard : vitaminCard}
      </div>
      {vitaminCSelected ? null : (
        <p className="mt-3 text-xs leading-relaxed text-[#6D6A63]">
          These two treatments ranked 1st based on your answers. Choose either one for this step.
        </p>
      )}
    </>
  )
  return (
    <div className="flex gap-5">
      <StepMark mark={String(recommended.protocolStep).padStart(2, '0')} />
      <div className="min-w-0 flex-1">
        <p className="mb-3 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ab8584]">
          {getProtocolStepLabel(recommended.protocolStep)}
        </p>
        {choices}
      </div>
    </div>
  )
}

function SerumOptions({
  options,
  selectedId,
  onSelect,
}: {
  options: { id: string; product: Product; stamp: string }[]
  selectedId: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Serum options">
        {options.map(option => {
          const selected = option.id === selectedId
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onSelect(option.id)}
              className={`border px-3 py-3 text-left ${selected ? 'border-[#ab8584] bg-[#ab8584]/10' : 'border-[#D6CEC3] bg-transparent'}`}
            >
              <span className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-[#ab8584]">{option.stamp}</span>
              <span className="mt-1 block text-[13px] leading-snug text-[#252520]">{option.product.name}</span>
              <span className="mt-1 block text-[12px] font-semibold">${option.product.price}</span>
            </button>
          )
        })}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-[#6D6A63]">
        These two treatments ranked 1st based on your answers. Choose either one for this step.
      </p>
    </div>
  )
}

export default function ProtocolResults({
  onViewProduct,
  onStartOver,
}: {
  onViewProduct: (productId: string) => void
  onStartOver: () => void
}) {
  const [session, setSession] = useState(loadQuizSession)
  const [emailOpen, setEmailOpen] = useState(false)
  const built = session?.done ? protocolFromSession(session) : null
  if (!session || !built) return null

  const current = session
  const choiceId = current.cChoiceId
  const step3 = built.products.find(product => product.protocolStep === 3) ?? null
  const runnerUp = built.alternative
  const routinePair = step3 && runnerUp && step3.id !== runnerUp.id ? { recommended: step3, alternative: runnerUp } : null
  const treatPair = !step3 && built.treatOffer && runnerUp && built.treatOffer.id !== runnerUp.id
    ? { recommended: built.treatOffer, alternative: runnerUp }
    : null
  const activePair = routinePair ?? treatPair
  const pairIncludesC = Boolean(activePair && (isVitaminC(activePair.recommended) || isVitaminC(activePair.alternative)))
  const usingAlternative = Boolean(activePair && current.serumChoiceId === activePair.alternative.id)
  const chosenSerum = activePair ? (usingAlternative ? activePair.alternative : activePair.recommended) : null
  const products = chosenSerum
    ? built.products.map(product => (product.protocolStep === 3 ? chosenSerum : product))
    : built.products
  const entries = routineEntries(products).map(entry => ({
    ...entry,
    product: shownProduct(entry.product, choiceId),
  }))
  const weekly = built.weekly ? shownProduct(built.weekly, choiceId) : null
  const alternative = !activePair && runnerUp ? shownProduct(runnerUp, choiceId) : null
  const treatOffer = built.treatOffer
    ? shownProduct(treatPair && usingAlternative ? treatPair.alternative : built.treatOffer, choiceId)
    : null
  const serumOptions = activePair
    ? [
        { id: activePair.recommended.id, product: shownProduct(activePair.recommended, choiceId), stamp: 'Recommended for you' },
        { id: activePair.alternative.id, product: shownProduct(activePair.alternative, choiceId), stamp: 'Also consider' },
      ]
    : null
  const selectedSerumId = activePair ? (usingAlternative ? activePair.alternative.id : activePair.recommended.id) : ''
  const bonus = built.bonus
  const total = [...entries.map(entry => entry.product), ...(weekly ? [weekly] : [])].reduce(
    (sum, product) => sum + product.price,
    0,
  )

  function chooseVitaminC(id: string) {
    const vitaminSerumId = activePair && isVitaminC(activePair.recommended)
      ? activePair.recommended.id
      : activePair && isVitaminC(activePair.alternative)
        ? activePair.alternative.id
        : ''
    const next = { ...current, cChoiceId: id, ...(vitaminSerumId ? { serumChoiceId: vitaminSerumId } : {}) }
    saveQuizSession(next)
    setSession(next)
  }

  function chooseSerum(id: string) {
    const next = { ...current, serumChoiceId: id }
    saveQuizSession(next)
    setSession(next)
  }

  function toggleTreat() {
    const next = { ...current, treatOpen: !current.treatOpen }
    saveQuizSession(next)
    setSession(next)
  }

  function addTreat() {
    const next = { ...current, treatAdded: true, treatOpen: false }
    saveQuizSession(next)
    setSession(next)
  }

  function removeTreat() {
    const drop = new Set<string>()
    for (const product of [step3, runnerUp]) {
      if (!product) continue
      drop.add(product.id)
      if (isVitaminC(product)) drop.add(otherVitaminC(product).id)
    }
    const addedIds = current.addedIds.filter(id => !drop.has(id))
    const next = { ...current, treatAdded: false, treatOpen: true, addedIds }
    saveQuizSession(next)
    setSession(next)
    if (addedIds.length !== current.addedIds.length) window.dispatchEvent(new Event('sprx-cart-updated'))
  }

  function addToCart(ids: string[]) {
    const fresh = ids.filter(id => !current.addedIds.includes(id))
    if (!fresh.length) return
    const next = { ...current, addedIds: [...current.addedIds, ...fresh] }
    saveQuizSession(next)
    setSession(next)
    window.dispatchEvent(new Event('sprx-cart-updated'))
  }

  const protocolProducts = [...entries.map(entry => entry.product), ...(weekly ? [weekly] : [])]
  const protocolInCart = protocolProducts.every(product => current.addedIds.includes(product.id))

  return (
    <article className="bg-[#F7F4EF] px-6 py-16 text-[#252520] md:px-[max(36px,8vw)] md:py-[75px]">
      <div className="mx-auto max-w-3xl">
        <p className="text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]">Your protocol</p>
        <h1 className="mt-3 font-serif text-[clamp(40px,6vw,56px)] font-normal leading-[1.08] tracking-[-0.044em]">
          Your recommended protocol
        </h1>
        <p className="mt-5 max-w-[40rem] text-[17px] leading-relaxed text-[#595750]">{summary(current)}</p>

        {built.tonerOmitted && (
          <p className="mt-8 border border-[#ab8584]/40 bg-[#FFFDFA] px-6 py-5 text-[15px] leading-relaxed text-[#595750]">
            {built.tonerSwap
              ? `Because your skin often stings or turns red, we swapped the toner for ${built.tonerSwap.name}, a calming serum, and left out exfoliating products.`
              : 'Because your skin often stings or turns red, we left out the toner and exfoliating products to keep your routine gentle.'}
          </p>
        )}

        <div className="mt-10 flex justify-center">
          <QuietLink onClick={onStartOver}>Start over</QuietLink>
        </div>
        <ul className="mt-4 space-y-4">
          {entries.map(({ product, period }) => (
            <Fragment key={product.id}>
            <li className="group border border-[#D6CEC3] bg-[#FFFDFA] p-5">
              {product.protocolStep === 3 && activePair && pairIncludesC && !current.treatAdded ? (
                <VitaminCStep
                  recommended={activePair.recommended}
                  alternative={shownProduct(activePair.alternative, choiceId)}
                  strengthId={choiceId || built.cRecommendedId}
                  recommendedStrengthId={built.cRecommendedId}
                  usingAlternative={usingAlternative}
                  reason={built.cReason}
                  onStrength={chooseVitaminC}
                  onSelectAlternative={() => chooseSerum(activePair.alternative.id)}
                  onSelectRecommended={() => chooseSerum(activePair.recommended.id)}
                  onView={onViewProduct}
                  onAdd={id => addToCart([id])}
                  addedIds={current.addedIds}
                />
              ) : (
                <>
                  <div className="flex gap-5">
                    <StepMark mark={String(product.protocolStep).padStart(2, '0')} />
                    <img src={product.image} alt="" className="h-24 w-20 shrink-0 object-contain" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ab8584]">
                        {getProtocolStepLabel(product.protocolStep)}
                      </p>
                      {isVitaminC(product) ? (
                        <VitaminCTitle
                          strengthId={product.id}
                          recommendedId={built.cRecommendedId}
                          active
                          compact={Boolean(serumOptions)}
                          onSelect={chooseVitaminC}
                        />
                      ) : (
                        <h2 className="mt-1 font-serif text-[1.35rem] leading-snug">{product.name}</h2>
                      )}
                      <p className="mt-1 text-sm text-[#595750]">{product.tagline}</p>
                      <p className="mt-2 text-sm font-semibold">${product.price}</p>
                      {isVitaminC(product) && (
                        <p className="mt-3 text-xs italic leading-relaxed text-[#6D6A63]">
                          {vitaminCChoiceNote(built.cReason)}
                        </p>
                      )}
                    </div>
                    <div className={`flex shrink-0 flex-col items-end gap-3 ${isVitaminC(product) ? '' : 'justify-between'}`}>
                      <span className="border border-[#D6CEC3] px-2.5 py-1 text-[11px] tracking-wide text-[#6D6A63]">
                        {routinePeriodLabel(period)}
                      </span>
                      <AddCartButton added={current.addedIds.includes(product.id)} onAdd={() => addToCart([product.id])} />
                      <QuietLink onClick={() => onViewProduct(product.id)}>View</QuietLink>
                    </div>
                  </div>
                  {serumOptions && product.protocolStep === 3 && (
                    <SerumOptions options={serumOptions} selectedId={selectedSerumId} onSelect={chooseSerum} />
                  )}
                </>
              )}
              {product.protocolStep === 3 && current.treatAdded && (
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={removeTreat}
                    className="text-[13px] text-[#6D6A63] transition-colors duration-200 hover:text-[#ab8584]"
                  >
                    Remove from my protocol
                  </button>
                </div>
              )}
            </li>
            {treatOffer && product.protocolStep === 2 && (
              <li className="group border border-dashed border-[#D6CEC3] bg-[#FFFDFA] transition-colors hover:border-[#ab8584]">
                <button
                  type="button"
                  onClick={toggleTreat}
                  aria-expanded={current.treatOpen}
                  className="flex w-full items-center gap-5 px-5 py-3 text-left"
                >
                  <StepMark mark={String(treatOffer.protocolStep).padStart(2, '0')} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ab8584]">
                      {getProtocolStepLabel(treatOffer.protocolStep)}
                    </span>
                    <span className="mt-0.5 block text-sm text-[#6D6A63]">Add a personalized serum</span>
                  </span>
                  <span className="shrink-0 text-xl leading-none text-[#6D6A63]" aria-hidden="true">{current.treatOpen ? '−' : '+'}</span>
                  <span className="sr-only">{current.treatOpen ? 'Hide optional serum' : 'Show optional serum'}</span>
                </button>
                {current.treatOpen && (
                  <div className="px-5 pb-5">
                    <div className="flex gap-5">
                      <div className="w-12 shrink-0" aria-hidden="true" />
                      <img src={treatOffer.image} alt="" className="h-24 w-20 shrink-0 object-contain" />
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[#6D6A63]">
                          {treatOffer.categories[0]}
                        </p>
                        {isVitaminC(treatOffer) ? (
                          <VitaminCTitle
                            strengthId={treatOffer.id}
                            recommendedId={built.cRecommendedId}
                            active={!usingAlternative}
                            compact
                            onSelect={chooseVitaminC}
                          />
                        ) : (
                          <h2 className="mt-1 font-serif text-[1.35rem] leading-snug">{treatOffer.name}</h2>
                        )}
                        <p className="mt-1 text-sm text-[#595750]">{treatOffer.tagline}</p>
                        <p className="mt-2 text-sm font-semibold">${treatOffer.price}</p>
                        {isVitaminC(treatOffer) && (
                          <p className="mt-3 text-xs italic leading-relaxed text-[#6D6A63]">
                            {vitaminCChoiceNote(built.cReason)}
                          </p>
                        )}
                      </div>
                      <div className="flex shrink-0 flex-col items-end justify-center gap-2">
                        <span className="border border-[#D6CEC3] px-2.5 py-1 text-[11px] tracking-wide text-[#6D6A63]">
                          {routinePeriodLabel(serumPeriod(treatOffer))}
                        </span>
                        <button
                          type="button"
                          onClick={addTreat}
                          className="whitespace-nowrap bg-[#ab8584] px-3 py-2 text-[11px] tracking-wide text-[#F7F4EF] transition-colors hover:bg-[#9a7675]"
                        >
                          Add to my protocol
                        </button>
                        <QuietLink onClick={() => onViewProduct(treatOffer.id)}>View</QuietLink>
                      </div>
                    </div>
                    {serumOptions && (
                      <div className="ml-[4.25rem]">
                        <SerumOptions options={serumOptions} selectedId={selectedSerumId} onSelect={chooseSerum} />
                      </div>
                    )}
                  </div>
                )}
              </li>
            )}
            </Fragment>
          ))}
          <li className="flex gap-5 border border-[#D6CEC3] bg-[#EFE8DE] p-5">
            <StepMark mark={String(PROTECT_GUIDANCE.step).padStart(2, '0')} />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ab8584]">{PROTECT_GUIDANCE.label}</p>
              <h2 className="mt-1 font-serif text-[1.35rem] leading-snug">Broad-spectrum SPF 30+</h2>
              <p className="mt-1 text-sm text-[#595750]">{PROTECT_GUIDANCE.description}</p>
              <p className="mt-1 text-sm text-[#6D6A63]">{PROTECT_GUIDANCE.note}</p>
            </div>
          </li>
        </ul>

        {weekly && (
          <div className="mt-10">
            <p className="text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]">Weekly · Polish</p>
            <div className="group mt-4 flex gap-5 border border-[#D6CEC3] bg-[#FFFDFA] p-5">
              <StepMark mark="W" />
              <img src={weekly.image} alt="" className="h-24 w-20 shrink-0 object-contain" />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ab8584]">Occasional alternative cleanser</p>
                <h2 className="mt-1 font-serif text-[1.35rem] leading-snug">{weekly.name}</h2>
                <p className="mt-1 text-sm text-[#595750]">Use 1 to 3 times per week in place of your daily cleanser, as tolerated.</p>
                <p className="mt-2 text-sm font-semibold">${weekly.price}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end justify-center gap-2">
                <AddCartButton added={current.addedIds.includes(weekly.id)} onAdd={() => addToCart([weekly.id])} />
                <QuietLink onClick={() => onViewProduct(weekly.id)}>View</QuietLink>
              </div>
            </div>
          </div>
        )}

        {bonus && (
          <div className="mt-10">
            <p className="text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]">A little extra</p>
            <div className="mt-4 flex gap-5 border border-[#D6CEC3] bg-[#FFFDFA] p-5">
              <img src={bonus.image} alt="" className="h-24 w-20 shrink-0 object-contain" />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ab8584]">Bonus pick</p>
                <h2 className="mt-1 font-serif text-[1.35rem] leading-snug">{bonus.name}</h2>
                <p className="mt-1 text-sm text-[#595750]">
                  Because you chose “{funOption(current.funAnswer)?.label ?? ''}”.
                </p>
                <p className="mt-2 text-sm font-semibold">${bonus.price}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end justify-center gap-2">
                <AddCartButton added={current.addedIds.includes(bonus.id)} onAdd={() => addToCart([bonus.id])} />
                <QuietLink onClick={() => onViewProduct(bonus.id)}>View</QuietLink>
              </div>
            </div>
          </div>
        )}

        {alternative && (
          <div className="mt-10">
            <p className="text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]">Also consider</p>
            <div className="mt-4 flex gap-5 border border-[#D6CEC3] bg-[#FFFDFA] p-5">
              <img src={alternative.image} alt="" className="h-24 w-20 shrink-0 object-contain" />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ab8584]">Alternative serum</p>
                <h2 className="mt-1 font-serif text-[1.35rem] leading-snug">{alternative.name}</h2>
                <p className="mt-1 text-sm text-[#595750]">Ranked next for your answers. Use it in place of your serum, not alongside it.</p>
                <p className="mt-2 text-sm font-semibold">${alternative.price}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end justify-center gap-2">
                <AddCartButton added={current.addedIds.includes(alternative.id)} onAdd={() => addToCart([alternative.id])} />
                <QuietLink onClick={() => onViewProduct(alternative.id)}>View</QuietLink>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 bg-[#252520] px-6 py-7 text-[#F7F4EF] md:px-8 md:py-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ab8584]">Protocol total</p>
              <p className="mt-1 font-serif text-4xl">${total}</p>
            </div>
            <div className="text-right text-sm text-[#F7F4EF]/50">
              <p>{protocolProducts.length} products</p>
              <p>AM &amp; PM + morning SPF</p>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => addToCart(protocolProducts.map(product => product.id))}
              className="flex-1 bg-[#ab8584] py-3.5 text-sm text-[#F7F4EF] transition-colors hover:bg-[#9a7675]"
            >
              {protocolInCart ? 'Added ✓' : 'Add Entire Protocol to Cart'}
            </button>
            <button
              type="button"
              onClick={() => setEmailOpen(true)}
              className="flex-1 border border-[#F7F4EF]/25 py-3.5 text-sm text-[#F7F4EF] transition-colors hover:border-[#ab8584] hover:text-[#ab8584]"
            >
              Email My Protocol
            </button>
          </div>
        </div>
        <EmailProtocolModal
          isOpen={emailOpen}
          onClose={() => setEmailOpen(false)}
          protocol={{
            skinType: current.skinType,
            concerns: current.concerns.length ? current.concerns : ['No specific concerns'],
            skinRightNow: reactivityLine(current.reactivity),
            note: built.tonerOmitted
              ? built.tonerSwap
                ? `Because your skin often stings or turns red, we swapped the toner for ${built.tonerSwap.name}, a calming serum, and left out exfoliating products.`
                : 'Because your skin often stings or turns red, we left out the toner and exfoliating products to keep your routine gentle.'
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
            totalPrice: `$${total}`,
          }}
        />

        <div className="mt-8 text-center">
          <QuietLink onClick={onStartOver}>Start over</QuietLink>
        </div>
      </div>
    </article>
  )
}
