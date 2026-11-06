import { useEffect, useRef, useState } from 'react'

export type OutcomeDecorationVariant =
  | 'bullseye'
  | 'editorial'
  | 'architecture'
  | 'texture'
  | 'progression'
  | 'statement'
  | 'steps'
  | 'ascent'

function BullseyeDecoration() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 320"
      className="pointer-events-none absolute -top-28 -right-24 h-[320px] w-[320px]"
    >
      <g fill="none">
        <circle cx="160" cy="160" r="158" stroke="#C4A8A6" strokeOpacity="0.55" strokeWidth="1" />
        <circle cx="160" cy="160" r="118" stroke="#ab8584" strokeOpacity="0.38" strokeWidth="1" />
        <circle cx="160" cy="160" r="78" stroke="#C4A8A6" strokeOpacity="0.8" strokeWidth="1" />
        <circle cx="160" cy="160" r="38" stroke="#ab8584" strokeOpacity="0.9" strokeWidth="1.25" />
      </g>
      <circle cx="160" cy="160" r="5" fill="#ab8584" />
    </svg>
  )
}

function EditorialDecoration() {
  return (
    <div aria-hidden="true" className="pointer-events-none flex flex-col items-center justify-center text-center min-[900px]:items-start min-[900px]:pl-[6%] min-[900px]:text-left">
      <p className="font-['Cormorant_Garamond',Georgia,serif] text-[clamp(104px,22vw,148px)] leading-[0.7] font-light tracking-[-0.045em] text-[#ab8584] opacity-[0.16] min-[900px]:text-[clamp(168px,13vw,204px)]">
        08
      </p>
      <p className="mt-3 text-[12px] font-medium tracking-[0.36em] text-[#ab8584]/75 uppercase min-[900px]:mt-4 min-[900px]:text-[13px] min-[900px]:tracking-[0.42em]">
        Weeks
      </p>
    </div>
  )
}

function ArchitectureDecoration() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 16 500 184"
      className="pointer-events-none h-auto w-full"
    >
      <g fill="none" strokeLinecap="round">
        <path d="M12 184 A150 150 0 0 1 312 184" stroke="#C4B4AE" strokeOpacity="0.78" strokeWidth="1.2" />
        <path d="M148 184 A136 136 0 0 1 420 184" stroke="#ab8584" strokeOpacity="0.42" strokeWidth="1.2" />
        <path d="M228 132 A92 92 0 0 1 396 132" stroke="#ab8584" strokeOpacity="0.7" strokeWidth="1.2" />
      </g>
    </svg>
  )
}

function TextureDecoration() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none h-[168px] w-full min-[900px]:h-[220px]"
      style={{
        backgroundImage: 'url(/designs/working/outcomes-cream-pale.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: '46% 42%',
        WebkitMaskImage: 'radial-gradient(82% 96% at 48% 50%, #000 6%, transparent 72%)',
        maskImage: 'radial-gradient(82% 96% at 48% 50%, #000 6%, transparent 72%)',
      }}
    />
  )
}

const PROGRESSION = [
  { left: '2%', top: '34%', height: '42%', opacity: 0.3, mark: null },
  { left: '15%', top: '10%', height: '68%', opacity: 0.4, mark: '16%' },
  { left: '28%', top: '38%', height: '36%', opacity: 0.28, mark: null },
  { left: '41%', top: '4%', height: '78%', opacity: 0.48, mark: '46%' },
  { left: '54%', top: '22%', height: '52%', opacity: 0.34, mark: null },
  { left: '67%', top: '8%', height: '80%', opacity: 0.52, mark: '14%' },
  { left: '80%', top: '30%', height: '44%', opacity: 0.3, mark: null },
  { left: '93%', top: '14%', height: '64%', opacity: 0.42, mark: '58%' },
]

function ProgressionDecoration() {
  return (
    <div aria-hidden="true" className="pointer-events-none relative h-[148px] w-full min-[900px]:h-[210px]">
      {PROGRESSION.map(stroke => (
        <span
          key={stroke.left}
          className="absolute w-px bg-[#ab8584]"
          style={{ left: stroke.left, top: stroke.top, height: stroke.height, opacity: stroke.opacity }}
        >
          {stroke.mark ? (
            <span
              className="absolute left-1/2 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[#ab8584]"
              style={{ top: stroke.mark }}
            />
          ) : null}
        </span>
      ))}
    </div>
  )
}

const ASCENT = [
  { height: 22, opacity: 0.28 },
  { height: 28, opacity: 0.3 },
  { height: 36, opacity: 0.33 },
  { height: 45, opacity: 0.36 },
  { height: 54, opacity: 0.39 },
  { height: 63, opacity: 0.42 },
  { height: 72, opacity: 0.45 },
  { height: 80, opacity: 0.48 },
  { height: 88, opacity: 0.5 },
  { height: 94, opacity: 0.53 },
  { height: 100, opacity: 0.56 },
]

const ASCENT_DRAW_MS = 700
const ASCENT_STAGGER_MS = 180

function AscentDecoration() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const node = rootRef.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPlaying(true)
      return
    }

    let waiting = true
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && waiting) {
          waiting = false
          setPlaying(true)
          return
        }
        if (!entry.isIntersecting && entry.intersectionRatio === 0) {
          waiting = true
          setPlaying(false)
        }
      },
      { threshold: [0, 0.45] },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none flex h-[128px] w-full items-end justify-between px-[2%] min-[900px]:h-[200px]"
    >
      {ASCENT.map((stroke, index) => (
        <span
          key={stroke.height}
          className="w-px bg-[#ab8584]"
          style={{
            height: playing ? `${stroke.height}%` : '0%',
            opacity: stroke.opacity,
            transition: playing
              ? `height ${ASCENT_DRAW_MS}ms linear ${index * ASCENT_STAGGER_MS}ms`
              : 'none',
          }}
        />
      ))}
    </div>
  )
}

function StepsDecoration() {
  const rootRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<SVGPathElement>(null)
  const [length, setLength] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const line = lineRef.current
    if (line) setLength(line.getTotalLength())
  }, [])

  useEffect(() => {
    const node = rootRef.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPlaying(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setPlaying(entry.isIntersecting),
      { threshold: 0.45 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const ready = length > 0

  return (
    <div ref={rootRef} aria-hidden="true" className="pointer-events-none w-full">
      <svg viewBox="0 0 560 220" className="mx-auto h-auto w-full max-w-[320px] min-[900px]:mx-0 min-[900px]:max-w-none">
        <defs>
          <marker id="outcome-rise-arrow" viewBox="0 0 12 12" refX="1.6" refY="6" markerWidth="18" markerHeight="18" orient="auto" markerUnits="userSpaceOnUse">
            <path
              d="M1.6 2.4 L10.4 6 L1.6 9.6"
              fill="none"
              stroke="#ab8584"
              strokeWidth="1.05"
              strokeLinecap="round"
              opacity={playing ? 0.55 : 0}
              style={{ transition: 'opacity 0.35s ease', transitionDelay: playing ? '1.35s' : '0ms' }}
            />
          </marker>
        </defs>
        <path
          ref={lineRef}
          d="M42 176 C150 148 280 88 400 50 C450 32 490 24 508 18"
          fill="none"
          stroke="#ab8584"
          strokeOpacity="0.55"
          strokeWidth="1.05"
          strokeLinecap="round"
          markerEnd="url(#outcome-rise-arrow)"
          strokeDasharray={ready ? length : 0}
          strokeDashoffset={ready && !playing ? length : 0}
          style={{ transition: ready ? 'stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'none' }}
        />
      </svg>
    </div>
  )
}

function StatementDecoration() {
  return (
    <div aria-hidden="true" className="pointer-events-none flex items-center justify-center gap-5 min-[900px]:justify-start min-[900px]:gap-6 min-[900px]:pl-[4%]">
      <span className="h-20 w-px bg-[#ab8584]/45 min-[900px]:h-36" />
      <div className="text-left font-serif text-[clamp(32px,7vw,40px)] leading-[1.22] font-normal text-[#ab8584]/75 italic min-[900px]:text-[clamp(38px,3.5vw,52px)]">
        <p>Observe.</p>
        <p className="mt-2">Understand.</p>
        <p className="mt-2">Refine.</p>
      </div>
    </div>
  )
}

export default function OutcomeDecoration({ variant }: { variant: OutcomeDecorationVariant }) {
  if (variant === 'editorial') return <EditorialDecoration />
  if (variant === 'architecture') return <ArchitectureDecoration />
  if (variant === 'texture') return <TextureDecoration />
  if (variant === 'progression') return <ProgressionDecoration />
  if (variant === 'statement') return <StatementDecoration />
  if (variant === 'steps') return <StepsDecoration />
  if (variant === 'ascent') return <AscentDecoration />
  return <BullseyeDecoration />
}
