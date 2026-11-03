import { useState } from 'react'
import {
  QUIZ_CONCERNS,
  REACTIVITY_OPTIONS,
  type QuizConcern,
  type Reactivity,
} from '../../lib/buildProtocol'
import OffsetPhoto from './OffsetPhoto'
import { QuietGeometryFrame } from './quiet-geometry/QuietGeometryMotif'
import SunbeamMatGlow from './SunbeamMatGlow'

/** Layout matches the section mockup (col1 / col2); types align with ProtocolBuilder + Sensitive preview. */
const SKIN_OPTIONS = ['Dry', 'Oily', 'Combination', 'Normal', 'Sensitive', 'Not sure yet'] as const

type SkinChoice = (typeof SKIN_OPTIONS)[number]

const TOTAL_STEPS = 3

const optionBtn = (selected: boolean, lighter = false) =>
  lighter
    ? [
        'border px-3 py-3.5 text-center text-[13px] transition-colors',
        selected
          ? 'border-[#ab8584] bg-[#ab8584]/20 text-[#F7F4EF]'
          : 'border-white/25 bg-transparent text-[#F7F4EF] hover:border-[#ab8584]/70',
      ].join(' ')
    : [
        'border px-3 py-3.5 text-center text-[13px] transition-colors',
        selected
          ? 'border-[#ab8584] bg-[#ab8584]/10 text-[#252520]'
          : 'border-[#D6CEC3] bg-transparent text-[#252520] hover:border-[#ab8584]/60',
      ].join(' ')

const EYEBROW_QUIET = 'text-[11px] font-medium tracking-[0.16em] uppercase text-[#6D6A63]'
const EYEBROW_ROSE = 'text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]'

export default function ProtocolQuizSection({
  quietGeometry = false,
  lighter = false,
}: {
  quietGeometry?: boolean
  lighter?: boolean
}) {
  const [step, setStep] = useState(0)
  const [skinType, setSkinType] = useState<SkinChoice | ''>('')
  const [reactivity, setReactivity] = useState<Reactivity | ''>('')
  const [concerns, setConcerns] = useState<QuizConcern[]>([])
  const [noConcerns, setNoConcerns] = useState(false)

  const progress = (step + 1) / TOTAL_STEPS

  const canContinue =
    step === 0
      ? Boolean(skinType)
      : step === 1
        ? Boolean(reactivity)
        : concerns.length > 0 || noConcerns

  function toggleConcern(c: QuizConcern) {
    setNoConcerns(false)
    setConcerns(prev => (prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]))
  }

  function handleContinue() {
    if (!canContinue) return
    if (step < TOTAL_STEPS - 1) {
      setStep(s => s + 1)
      return
    }
    const params = new URLSearchParams()
    if (skinType && skinType !== 'Not sure yet' && skinType !== 'Sensitive') {
      params.set('skin', skinType)
    } else if (skinType === 'Sensitive') {
      params.set('skin', 'Combination')
      params.set('reactivity', 'often')
    }
    if (reactivity) params.set('reactivity', reactivity)
    if (noConcerns) params.set('concerns', 'none')
    else if (concerns.length) params.set('concerns', concerns.join('|'))
    window.location.href = `/protocol?${params.toString()}`
  }

  return (
    <section id="protocol" className={`scroll-mt-28 py-16 text-[#252520] md:py-[75px] ${lighter ? 'overflow-visible' : 'overflow-hidden bg-[#f5f0eb]'}`}>
      <div className="grid grid-cols-1 items-stretch gap-12 min-[681px]:grid-cols-[48%_52%] min-[681px]:gap-0">
        {/* Left — copy + product image (same inset / title scale as philosophy) */}
        <div className="flex flex-col px-6 min-[681px]:pl-[max(36px,8vw)] min-[681px]:pr-[8%]">
          <p className={lighter ? EYEBROW_QUIET : EYEBROW_ROSE}>
            What&apos;s Your Protocol?
          </p>
          <h2 className="my-3 max-w-[650px] font-serif text-[clamp(40px,8vw,56px)] font-normal leading-[1.08] tracking-[-0.044em] min-[681px]:text-[clamp(44px,4vw,60px)]">
            Your skin has a story.
            <br />
            <em className="italic text-[#ab8584]">Let&apos;s get to know it.</em>
          </h2>
          <p className="mb-10 max-w-[540px] text-[17px] leading-relaxed text-[#595750]">
            A few thoughtful questions help you begin with the essentials and find the right place for
            extra care. Think of it as a conversation about your skin — not another complicated beauty
            routine.
          </p>

          <div className="relative w-full max-w-[463px] overflow-visible">
            {lighter ? (
              <>
                <OffsetPhoto
                  src="/designs/working/lighter/find-your-routine.jpg"
                  alt="A woman resting her chin in her hand in warm sunlight"
                  className="relative z-[1]"
                  imgClassName="aspect-[4/3] object-[center_22%]"
                />
                <div aria-hidden="true" className="pointer-events-none absolute top-full left-0 z-0 h-[250px] w-[250px] -translate-x-[48%] -translate-y-10 md:h-[280px] md:w-[280px]">
                  <div className="absolute inset-0 rounded-full border border-[#C4A8A6]" />
                  <div className="absolute inset-[9%] origin-center animate-[spin_18s_linear_infinite] rounded-full border border-dashed border-[#C4A8A6] motion-reduce:animate-none" />
                </div>
              </>
            ) : quietGeometry ? (
              <QuietGeometryFrame variant="quiz" className="w-full">
                <img
                  src="/find-your-routine.jpg"
                  alt="A woman resting her chin in her hand in warm sunlight"
                  className="aspect-[4/3] h-auto w-full object-cover object-[center_22%]"
                />
              </QuietGeometryFrame>
            ) : (
              <>
                <SunbeamMatGlow intensity="soft" />
                <div className="relative z-[1] aspect-[4/3] overflow-hidden">
                  <img
                    src="/find-your-routine.jpg"
                    alt="A woman resting her chin in her hand in warm sunlight"
                    className="h-full w-full object-cover object-[center_22%]"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right — same column geometry as ProtocolOverview image (90% centered), slightly wider */}
        <div className="flex items-center justify-center px-6 min-[681px]:px-0">
          <div className="relative w-[94%]">
            {lighter ? (
              <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 z-0 h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 md:h-[168px] md:w-[168px]">
                <div className="absolute inset-0 rounded-full border border-[#C4A8A6]" />
                <div className="absolute inset-[9%] origin-center animate-[spin_18s_linear_infinite] rounded-full border border-dashed border-[#C4A8A6] motion-reduce:animate-none" />
              </div>
            ) : null}
            <div className={`relative z-[1] p-7 md:p-10 ${lighter ? 'bg-[#2B2727] text-[#F7F4EF]' : 'border border-[#D6CEC3] bg-[#FFFDFA]'}`}>
            {lighter ? (
              <h3 className="mb-6 font-serif text-[1.35rem] font-normal leading-snug tracking-[-0.01em]">
                Discover your protocol
              </h3>
            ) : null}
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${lighter ? 'text-[#F7F4EF]/70' : 'text-[#6D6A63]'}`}>
                Question {String(step + 1).padStart(2, '0')} of {String(TOTAL_STEPS).padStart(2, '0')}
              </p>
              <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${lighter ? 'text-[#F7F4EF]/70' : 'text-[#6D6A63]'}`}>
                About 1 minute
              </p>
            </div>

            <div className={`mb-8 h-[2px] w-full overflow-hidden ${lighter ? 'bg-white/15' : 'bg-[#E8E0D6]'}`}>
              <div
                className="h-full bg-[#ab8584] transition-all duration-500 ease-out"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            {step === 0 && (
              <>
                <h3 className="mb-7 font-serif text-[clamp(1.45rem,2.6vw,1.85rem)] font-normal leading-snug tracking-[-0.01em]">
                  How would you describe your skin?
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {SKIN_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSkinType(opt)}
                      className={optionBtn(skinType === opt, lighter)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h3 className="mb-3 font-serif text-[clamp(1.45rem,2.6vw,1.85rem)] font-normal leading-snug tracking-[-0.01em]">
                  How reactive is your skin?
                </h3>
                <p className={`mb-7 text-[13px] leading-relaxed ${lighter ? 'text-[#F7F4EF]/70' : 'text-[#6D6A63]'}`}>
                  How often does it sting, burn, or turn red from new products or weather?
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {REACTIVITY_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setReactivity(opt.value)}
                      className={optionBtn(reactivity === opt.value, lighter)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="mb-3 font-serif text-[clamp(1.45rem,2.6vw,1.85rem)] font-normal leading-snug tracking-[-0.01em]">
                  What are your top skin concerns?
                </h3>
                <p className={`mb-7 text-[13px] leading-relaxed ${lighter ? 'text-[#F7F4EF]/70' : 'text-[#6D6A63]'}`}>Select all that apply.</p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {QUIZ_CONCERNS.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleConcern(c)}
                      className={`${optionBtn(concerns.includes(c), lighter)} text-left`}
                    >
                      {c}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setNoConcerns(true)
                      setConcerns([])
                    }}
                    className={`${optionBtn(noConcerns, lighter)} text-left sm:col-span-2`}
                  >
                    None of these — just the basics
                  </button>
                </div>
              </>
            )}

            <div className="mt-9 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep(s => Math.max(0, s - 1))}
                disabled={step === 0}
                className={`text-[13px] transition-opacity disabled:opacity-30 ${lighter ? 'text-[#F7F4EF]/70 hover:text-[#F7F4EF]' : 'text-[#6D6A63] hover:text-[#252520]'}`}
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleContinue}
                disabled={!canContinue}
                className={`px-6 py-3 text-[13px] tracking-wide transition-colors disabled:opacity-40 ${lighter ? 'bg-[#F7F4EF] text-[#252520] hover:bg-white' : 'bg-[#252520] text-[#F7F4EF] hover:bg-[#141412]'}`}
              >
                {step < TOTAL_STEPS - 1 ? 'Continue ↗' : 'See my protocol ↗'}
              </button>
            </div>

            {lighter ? null : (
              <p className="mt-6 text-[11px] leading-relaxed text-[#6D6A63]">
                A preview of the guided experience. Recommendations will be finalized with approved product
                suitability rules.
              </p>
            )}
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
