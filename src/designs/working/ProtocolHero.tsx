import { useEffect, useRef, useState } from 'react'

const HEADING =
  'font-serif text-[clamp(40px,8vw,56px)] font-normal leading-[1.08] tracking-[-0.044em] min-[681px]:text-[clamp(44px,4vw,60px)]'

const TIMELINE_STEPS = [
  { step: 1, name: 'Cleanse' },
  { step: 2, name: 'Tone' },
  { step: 3, name: 'Target' },
  { step: 4, name: 'Eye Care' },
  { step: 5, name: 'Moisturize' },
  { step: 6, name: 'Oil' },
] as const

function useTimelinePlaying() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setPlaying(entry.isIntersecting),
      { threshold: 0.45 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return { rootRef, playing }
}

export default function ProtocolHero() {
  const { rootRef, playing } = useTimelinePlaying()

  return (
    <section className="bg-[#2B2727] px-6 py-14 text-[#F7F4EF] md:py-16">
      <div className="mx-auto flex flex-col items-center">
        <h1 className={`text-center text-[#F7F4EF] ${HEADING}`}>Build your protocol</h1>
        <p className="mt-4 text-center text-[15px] leading-relaxed text-[#F7F4EF]/80">
          A few questions. Six thoughtful steps.
        </p>
        <div ref={rootRef} className={`protocol-timeline protocol-timeline-numbers protocol-refine-timeline mt-12 w-full md:mt-14 md:max-w-5xl ${playing ? 'is-playing' : ''}`}>
          <div className="protocol-timeline-line" aria-hidden="true">
            <span className="protocol-timeline-line-draw" />
          </div>
          <ol className="protocol-timeline-steps" aria-label="Protocol steps">
            {TIMELINE_STEPS.map(step => (
              <li key={step.step} className="protocol-timeline-step" aria-label={`${step.step}. ${step.name}`}>
                <span className="protocol-timeline-mark" aria-hidden="true">
                  <span className="protocol-refine-step-word">step</span>
                  <span>{String(step.step).padStart(2, '0')}</span>
                </span>
                <span className="protocol-timeline-name" aria-hidden="true">
                  {step.name}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
