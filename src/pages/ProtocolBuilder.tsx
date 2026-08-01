import { useState } from 'react'
import { PRODUCTS, type SkinType, type SkinConcern } from '../data'

type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product'

interface ProtocolBuilderProps {
  onNavigate: (page: Page, productId?: string) => void
}

const SKIN_TYPES: SkinType[] = ['Combination', 'Dry', 'Normal', 'Oily', 'Sensitive']
const SKIN_CONCERNS: SkinConcern[] = ['Acne', 'Aging', 'Brightening', 'Dry Skin', 'Eye Area', 'Hyperpigmentation', 'Large Pores', 'Preventative', 'Redness', 'Sun Damage']

const STEPS_PREFERENCE = [
  { value: 'minimal', label: 'Minimal (2–3 steps)', desc: 'Quick and simple' },
  { value: 'moderate', label: 'Moderate (4–5 steps)', desc: 'Balanced routine' },
  { value: 'complete', label: 'Complete (6 steps)', desc: 'Full protocol' },
]

function OptionButton({ selected, onClick, label, desc }: { selected: boolean; onClick: () => void; label: string; desc?: string }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-start gap-1 border p-4 transition-all text-left"
      style={{
        borderColor: selected ? '#4D954C' : '#E8E8E8',
        backgroundColor: selected ? '#E8F0E6' : '#fff',
      }}
    >
      <span className="text-sm font-medium" style={{ color: selected ? '#4D954C' : '#252525' }}>{label}</span>
      {desc && <span className="text-xs text-charcoal/40">{desc}</span>}
    </button>
  )
}

export default function ProtocolBuilder({ onNavigate }: ProtocolBuilderProps) {
  const [step, setStep] = useState(0)
  const [skinType, setSkinType] = useState<SkinType | ''>('')
  const [concerns, setConcerns] = useState<SkinConcern[]>([])
  const [stepsPreference, setStepsPreference] = useState('moderate')
  const [sensitive, setSensitive] = useState<boolean | null>(null)
  const [routine, setRoutine] = useState<'starter' | 'complete'>('starter')

  const toggleConcern = (c: SkinConcern) =>
    setConcerns(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])

  const canAdvance = [
    skinType !== '',
    concerns.length > 0,
    true,
    sensitive !== null,
    true,
  ]

  const buildProtocol = () => {
    let pool = PRODUCTS.filter(p => !p.categories.includes('Starter Sets') && !p.categories.includes('Travel Sets'))
    if (skinType) pool = pool.filter(p => p.skinTypes.includes(skinType as SkinType))
    if (concerns.length) pool = pool.filter(p => concerns.some(c => p.concerns.includes(c)))
    if (sensitive) pool = pool.filter(p => p.skinTypes.includes('Sensitive'))

    const ordered = [
      pool.find(p => p.categories.includes('Cleansers')),
      pool.find(p => p.categories.includes('Toners')),
      pool.find(p => p.categories.includes('Serums') && p.name.toLowerCase().includes('vitamin') && p.id !== 'advanced-c-serum-20'),
      pool.find(p => p.categories.includes('Serums') && p.name.toLowerCase().includes('hyaluronic')),
      pool.find(p => p.categories.includes('Moisturizers') && !p.categories.includes('Eye Care')),
      pool.find(p => p.categories.includes('Eye Care')),
      pool.find(p => p.categories.includes('Facial Oils')),
    ].filter(Boolean)

    const limit = stepsPreference === 'minimal' ? 3 : stepsPreference === 'moderate' ? 5 : 7
    return ordered.slice(0, limit) as typeof PRODUCTS
  }

  const [recommendations, setRecommendations] = useState<typeof PRODUCTS>([])
  const [done, setDone] = useState(false)

  const finish = () => {
    setRecommendations(buildProtocol())
    setDone(true)
  }

  const totalPrice = recommendations.reduce((s, p) => s + p.price, 0)

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
      title: 'How many steps do you want in your routine?',
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
      title: 'Which best describes what you want?',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
          <OptionButton
            selected={routine === 'starter'}
            onClick={() => setRoutine('starter')}
            label="Starter Routine"
            desc="A simple foundation to begin with"
          />
          <OptionButton
            selected={routine === 'complete'}
            onClick={() => setRoutine('complete')}
            label="Complete Protocol"
            desc="A full, optimized daily routine"
          />
        </div>
      ),
    },
  ]

  if (done && recommendations.length > 0) {
    return (
      <div className="bg-ivory min-h-screen font-sans">
        <div className="max-w-4xl mx-auto px-5 md:px-8 py-16">
          <div className="text-center mb-12">
            <p className="text-[11px] tracking-[0.3em] uppercase text-green mb-3">Your Custom Protocol</p>
            <h1 className="font-serif text-4xl text-charcoal mb-4">Your Recommended Protocol</h1>
            <p className="text-charcoal/50">
              Based on your {skinType?.toLowerCase()} skin type and {concerns.slice(0, 2).join(', ').toLowerCase()} concerns.
            </p>
          </div>

          {/* Protocol steps */}
          <div className="space-y-4 mb-10">
            {recommendations.map((p, i) => (
              <div key={p.id} className="bg-white flex gap-5 p-5 border border-gray-soft">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green flex items-center justify-center text-white text-xs font-semibold">{i + 1}</div>
                </div>
                <div className="w-20 h-20 shrink-0 bg-ivory overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] tracking-widest uppercase text-charcoal/40 mb-1">{p.categories[0]}</p>
                  <h3 className="font-medium text-charcoal mb-1">{p.name}</h3>
                  <p className="text-xs text-charcoal/50 mb-2">{p.tagline}</p>
                  <p className="text-sm font-semibold text-charcoal">${p.price}</p>
                </div>
                <button
                  onClick={() => onNavigate('product', p.id)}
                  className="hidden md:flex items-center text-xs text-green underline underline-offset-2 self-center whitespace-nowrap"
                >
                  View →
                </button>
              </div>
            ))}
          </div>

          {/* Total + CTA */}
          <div className="bg-charcoal p-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs tracking-widest uppercase text-white/50 mb-1">Protocol Total</p>
                <p className="font-serif text-3xl">${totalPrice}</p>
              </div>
              <div className="text-right text-sm text-white/50">
                <p>{recommendations.length} products</p>
                <p>Morning & Evening</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-green text-white py-3.5 text-sm font-medium hover:bg-green-dark transition-colors">
                Add Entire Protocol to Cart
              </button>
              <button className="flex-1 border border-white/30 text-white py-3.5 text-sm font-medium hover:border-white transition-colors">
                Email My Protocol
              </button>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => { setDone(false); setStep(0) }}
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
      <div className="max-w-3xl mx-auto px-5 md:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[11px] tracking-[0.3em] uppercase text-green mb-3">Personalized Skincare</p>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">Build Your Protocol</h1>
          <p className="text-charcoal/50 max-w-md mx-auto">
            Answer a few simple questions to find the right products for your skin.
          </p>
        </div>

        {/* Progress */}
        <div className="flex gap-1.5 mb-12">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 transition-all duration-300"
              style={{ backgroundColor: i <= step ? '#4D954C' : '#E8E8E8' }}
            />
          ))}
        </div>

        {/* Question */}
        <div className="bg-white p-8 md:p-10 border border-gray-soft">
          <p className="text-[11px] tracking-widest uppercase text-green mb-3">Question {step + 1} of {QUESTIONS.length}</p>
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-8">{QUESTIONS[step].title}</h2>
          {QUESTIONS[step].content}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className="text-sm text-charcoal/40 hover:text-charcoal disabled:opacity-30 transition-colors"
          >
            ← Back
          </button>
          {step < QUESTIONS.length - 1 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!canAdvance[step]}
              className="bg-charcoal text-white px-8 py-3 text-sm font-medium hover:bg-charcoal/80 disabled:opacity-40 transition-colors"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={finish}
              className="bg-green text-white px-8 py-3 text-sm font-medium hover:bg-green-dark transition-colors"
            >
              Build My Protocol
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
