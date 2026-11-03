import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

/** Palette-locked only: Linen, Alabaster Rose, Soft Muted Lily, Rose Gold, Espresso Charcoal */
const LINEN = '#f5f0eb'
const ALABASTER = '#f3eceb'
const LILY = '#D6C3C2'
const ROSE = '#ab8584'
const CHARCOAL = '#2B2727'

type MotifId = 1 | 2 | 3 | 4 | 5 | 6
type RoseId = '6' | '6a' | '6b' | '6c' | '6d' | '6e' | '6f' | '6g'
type LogoId = 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'L6'
type PlayId = 'P1' | 'P2' | 'P3' | 'P4' | 'P5'

const MOTIFS: { id: MotifId; title: string; note: string }[] = [
  { id: 1, title: 'Motif 1 — Dual Arch', note: 'Alabaster filled arch + Lily outline.' },
  { id: 2, title: 'Motif 2 — Rose Niche', note: 'Recessed Alabaster well with Lily depth and Rose hairline.' },
  { id: 3, title: 'Motif 3 — Tone Blocks', note: 'Overlapping Linen / Alabaster / Lily rectangles.' },
  { id: 4, title: 'Motif 4 — Charcoal Plinth', note: 'Espresso base under the photo on an Alabaster field.' },
  { id: 5, title: 'Motif 5 — Lily Frame Mat', note: 'Soft Muted Lily mat with a Linen photo window.' },
  { id: 6, title: 'Motif 6 — Rose Accent Arc', note: 'Quiet field with thin Rose Gold arc and Lily echo.' },
]

const ROSE_FAMILY: { id: RoseId; title: string; note: string }[] = [
  { id: '6', title: '6 — Rose + Lily echo (baseline)', note: 'Rose Gold outer arc, Soft Muted Lily inner echo.' },
  { id: '6a', title: '6a — Single Rose arc', note: 'One Rose Gold outline only — quietest option.' },
  { id: '6b', title: '6b — Rose outline + Alabaster fill', note: 'Soft Alabaster mass inside a Rose Gold outline.' },
  { id: '6c', title: '6c — Left-facing arcs', note: 'Mirrored for when the photo sits on the right.' },
  { id: '6d', title: '6d — Triple concentric', note: 'Rose → Lily → Rose hairline.' },
  { id: '6e', title: '6e — Wide crown arc', note: 'Broad shallow Rose arc as a canopy above the photo.' },
  { id: '6f', title: '6f — Offset double Rose', note: 'Two Rose Gold arcs only, slightly offset.' },
  { id: '6g', title: '6g — Nested fill + outline', note: 'Alabaster fill, Rose outside, Lily whisper inside.' },
]

const LOGO_FAMILY: { id: LogoId; title: string; note: string }[] = [
  {
    id: 'L1',
    title: 'L1 — Emblem Circle',
    note: 'Large thin Rose Gold circle echoing the SP seal — photo floats inside the brand geometry.',
  },
  {
    id: 'L2',
    title: 'L2 — Protocol Rules',
    note: 'Hairline rules flanking “RX” energy under the image — wordmark structure as atmosphere.',
  },
  {
    id: 'L3',
    title: 'L3 — Monogram Sweep',
    note: 'Abstract S-curve stroke inspired by the SP monogram — elegant motion without the letterforms.',
  },
  {
    id: 'L4',
    title: 'L4 — Concentric Seal',
    note: 'Nested Rose / Lily / Alabaster rings like a soft watermark of the logo circle.',
  },
  {
    id: 'L5',
    title: 'L5 — Espresso Seal Corner',
    note: 'Espresso field with a Rose Gold seal circle — high-contrast, logo-forward, evening editorial.',
  },
  {
    id: 'L6',
    title: 'L6 — Rose Gold Watermark',
    note: 'Actual logo mark as a quiet watermark on Linen — brand present but never competing with the photo.',
  },
]

const PLAY_FAMILY: { id: PlayId; title: string; note: string }[] = [
  {
    id: 'P1',
    title: 'P1 — Champagne Rise',
    note: 'Tiny Rose and Lily bubbles lift through the mat — spa toast energy.',
  },
  {
    id: 'P2',
    title: 'P2 — Ribbon Current',
    note: 'A Rose/Lily wave ribbon undulates behind the photo — soft current, not chaos.',
  },
  {
    id: 'P3',
    title: 'P3 — Soft Shutters',
    note: 'Alabaster panels ease open and closed like linen shutters around the image.',
  },
  {
    id: 'P4',
    title: 'P4 — Emblem Circle',
    note: 'One thin Rose Gold seal circle draws behind the photo when it enters view.',
  },
  {
    id: 'P5',
    title: 'P5 — Sunbeam Sweep',
    note: 'On enter, a soft Rose/Lily glow drifts from top-right and lands bottom-left.',
  },
]

function Photo({ className = 'absolute inset-[8%]' }: { className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src="/original/founders-lab.jpg"
        alt="Skin Protocol RX founders formulating skincare in a New York lab"
        className="h-full w-full object-cover object-center"
      />
    </div>
  )
}

function Overlay() {
  return (
    <p
      className="absolute bottom-8 left-8 z-10 max-w-[250px] px-5 py-4 font-serif text-xl leading-snug backdrop-blur-sm"
      style={{ color: CHARCOAL, backgroundColor: `${ALABASTER}99` }}
    >
      What stays in the beaker
    </p>
  )
}

function StageShell({ children, bg = LINEN }: { children: ReactNode; bg?: string }) {
  return (
    <div className="relative aspect-square w-[90%] overflow-hidden" style={{ backgroundColor: bg }}>
      {children}
      <Photo />
      <Overlay />
    </div>
  )
}

function Wash() {
  return <div className="pointer-events-none absolute inset-0" style={{ backgroundColor: ALABASTER, opacity: 0.45 }} />
}

/* ── Motifs 1–5 ─────────────────────────────────────────────── */

function MotifDualArch() {
  return (
    <StageShell>
      <div className="pointer-events-none absolute -bottom-[20%] right-[10%] h-[130%] w-[58%] rounded-t-[240px]" style={{ backgroundColor: ALABASTER }} />
      <div className="pointer-events-none absolute -bottom-[14%] right-[18%] h-[122%] w-[52%] rounded-t-[220px] border bg-transparent" style={{ borderColor: LILY }} />
    </StageShell>
  )
}

function MotifRoseNiche() {
  return (
    <div className="relative aspect-square w-[90%] overflow-hidden" style={{ backgroundColor: LINEN }}>
      <div
        className="pointer-events-none absolute inset-[6%]"
        style={{
          backgroundColor: ALABASTER,
          boxShadow: `inset 0 0 0 1px ${ROSE}55, inset 16px 0 28px ${LILY}40, inset -16px 0 28px ${LILY}35, inset 0 20px 36px ${LILY}50`,
        }}
      />
      <div className="pointer-events-none absolute inset-[11%]" style={{ backgroundColor: LINEN, boxShadow: `inset 0 0 0 1px ${LILY}` }} />
      <Photo className="absolute inset-[14%]" />
      <Overlay />
    </div>
  )
}

function MotifToneBlocks() {
  return (
    <StageShell>
      <div className="pointer-events-none absolute top-[8%] left-[6%] h-[58%] w-[46%]" style={{ backgroundColor: ALABASTER }} />
      <div className="pointer-events-none absolute top-[18%] left-[20%] h-[52%] w-[40%]" style={{ backgroundColor: LINEN, outline: `1px solid ${LILY}` }} />
      <div className="pointer-events-none absolute right-[5%] bottom-[8%] h-[64%] w-[42%]" style={{ backgroundColor: LILY }} />
      <div className="pointer-events-none absolute right-[14%] top-[12%] h-[40%] w-[34%]" style={{ backgroundColor: ALABASTER }} />
    </StageShell>
  )
}

function MotifCharcoalPlinth() {
  return (
    <div className="relative aspect-square w-[90%] overflow-hidden" style={{ backgroundColor: ALABASTER }}>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%]" style={{ backgroundColor: CHARCOAL }} />
      <div className="pointer-events-none absolute left-[8%] right-[8%] bottom-[22%] h-px" style={{ backgroundColor: LILY }} />
      <Photo className="absolute bottom-[30%] left-[8%] right-[8%] top-[8%]" />
      <Overlay />
    </div>
  )
}

function MotifLilyFrameMat() {
  return (
    <div className="relative aspect-square w-[90%] overflow-hidden" style={{ backgroundColor: LILY }}>
      <div className="pointer-events-none absolute inset-[7%]" style={{ backgroundColor: LINEN }} />
      <div className="pointer-events-none absolute inset-[7%] border" style={{ borderColor: `${ROSE}33` }} />
      <Photo className="absolute inset-[11%]" />
      <Overlay />
    </div>
  )
}

/* ── Motif 6 family ─────────────────────────────────────────── */

function RoseFamilyStage({ id }: { id: RoseId }) {
  if (id === '6') {
    return (
      <StageShell>
        <Wash />
        <div className="pointer-events-none absolute -bottom-[18%] right-[12%] h-[125%] w-[54%] rounded-t-[240px] border-[1.5px] bg-transparent" style={{ borderColor: ROSE }} />
        <div className="pointer-events-none absolute -bottom-[12%] right-[20%] h-[118%] w-[48%] rounded-t-[220px] border bg-transparent" style={{ borderColor: LILY }} />
      </StageShell>
    )
  }
  if (id === '6a') {
    return (
      <StageShell>
        <Wash />
        <div className="pointer-events-none absolute -bottom-[16%] right-[14%] h-[122%] w-[52%] rounded-t-[240px] border-[1.5px] bg-transparent" style={{ borderColor: ROSE }} />
      </StageShell>
    )
  }
  if (id === '6b') {
    return (
      <StageShell>
        <div className="pointer-events-none absolute -bottom-[20%] right-[10%] h-[130%] w-[58%] rounded-t-[240px]" style={{ backgroundColor: ALABASTER }} />
        <div className="pointer-events-none absolute -bottom-[16%] right-[14%] h-[124%] w-[54%] rounded-t-[230px] border-[1.5px] bg-transparent" style={{ borderColor: ROSE }} />
      </StageShell>
    )
  }
  if (id === '6c') {
    return (
      <StageShell>
        <Wash />
        <div className="pointer-events-none absolute -bottom-[18%] left-[12%] h-[125%] w-[54%] rounded-t-[240px] border-[1.5px] bg-transparent" style={{ borderColor: ROSE }} />
        <div className="pointer-events-none absolute -bottom-[12%] left-[20%] h-[118%] w-[48%] rounded-t-[220px] border bg-transparent" style={{ borderColor: LILY }} />
      </StageShell>
    )
  }
  if (id === '6d') {
    return (
      <StageShell>
        <Wash />
        <div className="pointer-events-none absolute -bottom-[22%] right-[8%] h-[132%] w-[60%] rounded-t-[250px] border-[1.5px] bg-transparent" style={{ borderColor: ROSE }} />
        <div className="pointer-events-none absolute -bottom-[16%] right-[14%] h-[124%] w-[54%] rounded-t-[230px] border bg-transparent" style={{ borderColor: LILY }} />
        <div className="pointer-events-none absolute -bottom-[10%] right-[20%] h-[116%] w-[48%] rounded-t-[210px] border bg-transparent" style={{ borderColor: ROSE }} />
      </StageShell>
    )
  }
  if (id === '6e') {
    return (
      <StageShell>
        <Wash />
        <div className="pointer-events-none absolute -top-[35%] left-[8%] right-[8%] h-[90%] rounded-b-[50%] border-[1.5px] bg-transparent" style={{ borderColor: ROSE }} />
        <div className="pointer-events-none absolute -top-[28%] left-[14%] right-[14%] h-[80%] rounded-b-[48%] border bg-transparent" style={{ borderColor: LILY }} />
      </StageShell>
    )
  }
  if (id === '6f') {
    return (
      <StageShell>
        <Wash />
        <div className="pointer-events-none absolute -bottom-[20%] right-[8%] h-[128%] w-[56%] rounded-t-[240px] border-[1.5px] bg-transparent" style={{ borderColor: ROSE }} />
        <div className="pointer-events-none absolute -bottom-[14%] right-[18%] h-[120%] w-[50%] rounded-t-[220px] border-[1.5px] bg-transparent" style={{ borderColor: ROSE, opacity: 0.55 }} />
      </StageShell>
    )
  }
  return (
    <StageShell>
      <div className="pointer-events-none absolute -bottom-[20%] right-[10%] h-[130%] w-[58%] rounded-t-[240px]" style={{ backgroundColor: ALABASTER }} />
      <div className="pointer-events-none absolute -bottom-[22%] right-[8%] h-[132%] w-[60%] rounded-t-[250px] border-[1.5px] bg-transparent" style={{ borderColor: ROSE }} />
      <div className="pointer-events-none absolute -bottom-[12%] right-[18%] h-[118%] w-[50%] rounded-t-[220px] border bg-transparent" style={{ borderColor: LILY }} />
    </StageShell>
  )
}

/* ── Logo-inspired family (new) ─────────────────────────────── */

function LogoFamilyStage({ id }: { id: LogoId }) {
  if (id === 'L1') {
    return (
      <StageShell>
        <Wash />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border bg-transparent"
          style={{ borderColor: ROSE, borderWidth: 1.25 }}
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border bg-transparent"
          style={{ borderColor: LILY }}
        />
      </StageShell>
    )
  }

  if (id === 'L2') {
    // Rules live in a clear mat band below the photo (not under the image).
    return (
      <div className="relative aspect-square w-[90%] overflow-hidden" style={{ backgroundColor: LINEN }}>
        <div className="pointer-events-none absolute inset-0" style={{ backgroundColor: ALABASTER, opacity: 0.55 }} />
        <Photo className="absolute bottom-[22%] left-[8%] right-[8%] top-[8%]" />
        <div className="pointer-events-none absolute right-[8%] bottom-[8%] left-[8%] flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="h-[1.5px] flex-1" style={{ backgroundColor: ROSE }} />
            <span className="shrink-0 font-sans text-[11px] font-semibold tracking-[0.42em]" style={{ color: ROSE }}>
              RX
            </span>
            <span className="h-[1.5px] flex-1" style={{ backgroundColor: ROSE }} />
          </div>
          <div className="h-px w-full" style={{ backgroundColor: LILY }} />
        </div>
        <Overlay />
      </div>
    )
  }

  if (id === 'L3') {
    // Monogram sweep sits in the visible margin around the photo, not behind it.
    return (
      <div className="relative aspect-square w-[90%] overflow-hidden" style={{ backgroundColor: LINEN }}>
        <div className="pointer-events-none absolute inset-0" style={{ backgroundColor: ALABASTER, opacity: 0.5 }} />
        <svg className="pointer-events-none absolute inset-0 z-[1] h-full w-full" viewBox="0 0 100 100" fill="none" aria-hidden="true">
          <path
            d="M8 78 C 8 48, 28 22, 52 22 C 78 22, 92 42, 92 62 C 92 82, 74 92, 56 88 C 40 84, 34 70, 42 58 C 52 42, 78 44, 86 30"
            stroke={ROSE}
            strokeWidth="1.15"
            strokeLinecap="round"
          />
          <path d="M50 10 L50 90" stroke={LILY} strokeWidth="0.9" strokeLinecap="round" />
          <path
            d="M14 30 C 22 18, 38 12, 50 12"
            stroke={LILY}
            strokeWidth="0.75"
            strokeLinecap="round"
          />
        </svg>
        <Photo className="absolute inset-[16%] z-[2]" />
        <Overlay />
      </div>
    )
  }

  if (id === 'L4') {
    return (
      <StageShell>
        <div className="pointer-events-none absolute left-1/2 top-[46%] h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ backgroundColor: ALABASTER }} />
        <div className="pointer-events-none absolute left-1/2 top-[46%] h-[100%] w-[100%] -translate-x-1/2 -translate-y-1/2 rounded-full border bg-transparent" style={{ borderColor: LILY }} />
        <div className="pointer-events-none absolute left-1/2 top-[46%] h-[84%] w-[84%] -translate-x-1/2 -translate-y-1/2 rounded-full border bg-transparent" style={{ borderColor: ROSE, borderWidth: 1.25 }} />
        <div className="pointer-events-none absolute left-1/2 top-[46%] h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full border bg-transparent" style={{ borderColor: LILY }} />
      </StageShell>
    )
  }

  if (id === 'L5') {
    return (
      <div className="relative aspect-square w-[90%] overflow-hidden" style={{ backgroundColor: CHARCOAL }}>
        <div
          className="pointer-events-none absolute -right-[18%] -top-[18%] h-[70%] w-[70%] rounded-full border bg-transparent"
          style={{ borderColor: ROSE, borderWidth: 1.25 }}
        />
        <div
          className="pointer-events-none absolute -right-[8%] -top-[8%] h-[52%] w-[52%] rounded-full border bg-transparent"
          style={{ borderColor: `${LILY}99` }}
        />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[12%]" style={{ backgroundColor: ROSE, opacity: 0.35 }} />
        <Photo className="absolute inset-[10%] bottom-[14%]" />
        <p
          className="absolute bottom-8 left-8 z-10 max-w-[250px] px-5 py-4 font-serif text-xl leading-snug backdrop-blur-sm"
          style={{ color: LINEN, backgroundColor: `${CHARCOAL}a6` }}
        >
          What stays in the beaker
        </p>
      </div>
    )
  }

  // L6 — watermark logo
  return (
    <StageShell>
      <Wash />
      <img
        src="/designs/working/sp-logo-rosegold.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[-4%] top-[-2%] w-[58%] max-w-none opacity-[0.14] mix-blend-multiply"
      />
      <div className="pointer-events-none absolute bottom-[10%] left-[8%] right-[8%] h-px" style={{ backgroundColor: LILY }} />
    </StageShell>
  )
}

function PlayFamilyStage({ id }: { id: PlayId }) {
  if (id === 'P1') {
    return (
      <div className="motif-play relative aspect-square w-[90%] overflow-hidden" style={{ backgroundColor: LINEN }}>
        <Wash />
        <Photo className="absolute inset-[14%] z-[1]" />
        {[
          { left: '4%', delay: '0s', size: 14, color: ROSE },
          { left: '9%', delay: '1.1s', size: 9, color: LILY },
          { left: '18%', delay: '2.4s', size: 11, color: ROSE },
          { left: '82%', delay: '0.5s', size: 12, color: LILY },
          { left: '88%', delay: '1.8s', size: 8, color: ROSE },
          { left: '93%', delay: '3s', size: 13, color: LILY },
          { left: '6%', delay: '3.6s', size: 7, color: ROSE },
          { left: '91%', delay: '4.2s', size: 10, color: ROSE },
        ].map((b, i) => (
          <span
            key={i}
            className="motif-bubble pointer-events-none absolute z-[2] rounded-full"
            style={{
              left: b.left,
              width: b.size,
              height: b.size,
              backgroundColor: b.color,
              boxShadow: `0 0 0 1px ${b.color === ROSE ? LILY : ROSE}55`,
              animationDelay: b.delay,
            }}
          />
        ))}
        <Overlay />
      </div>
    )
  }

  if (id === 'P2') {
    return (
      <div className="motif-play relative aspect-square w-[90%] overflow-hidden" style={{ backgroundColor: LINEN }}>
        <div className="pointer-events-none absolute inset-0" style={{ backgroundColor: ALABASTER, opacity: 0.4 }} />
        <svg className="pointer-events-none absolute inset-x-[-10%] top-[8%] h-[36%] w-[120%]" viewBox="0 0 400 120" aria-hidden="true">
          <path
            className="motif-wave"
            d="M0 70 Q 50 20 100 70 T 200 70 T 300 70 T 400 70"
            fill="none"
            stroke={ROSE}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            className="motif-wave-slow"
            d="M0 88 Q 50 48 100 88 T 200 88 T 300 88 T 400 88"
            fill="none"
            stroke={LILY}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <svg className="pointer-events-none absolute inset-x-[-10%] bottom-[6%] h-[30%] w-[120%]" viewBox="0 0 400 100" aria-hidden="true">
          <path
            className="motif-wave"
            d="M0 40 Q 50 80 100 40 T 200 40 T 300 40 T 400 40"
            fill="none"
            stroke={LILY}
            strokeWidth="1.5"
          />
        </svg>
        <Photo className="absolute inset-[14%]" />
        <Overlay />
      </div>
    )
  }

  if (id === 'P3') {
    return (
      <div className="motif-play relative aspect-square w-[90%] overflow-hidden" style={{ backgroundColor: LINEN }}>
        <Photo className="absolute inset-[8%]" />
        <div
          className="motif-shutter-l pointer-events-none absolute inset-y-[6%] left-[4%] z-[2] w-[44%]"
          style={{
            backgroundColor: ALABASTER,
            borderRight: `1.5px solid ${LILY}`,
            boxShadow: `inset -10px 0 24px ${LILY}55, 2px 0 0 ${ROSE}33`,
          }}
        />
        <div
          className="motif-shutter-r pointer-events-none absolute inset-y-[6%] right-[4%] z-[2] w-[44%]"
          style={{
            backgroundColor: ALABASTER,
            borderLeft: `1.5px solid ${LILY}`,
            boxShadow: `inset 10px 0 24px ${LILY}55, -2px 0 0 ${ROSE}33`,
          }}
        />
        <Overlay />
      </div>
    )
  }

  if (id === 'P4') {
    return <EmblemCircleStage />
  }

  return <SunbeamSweepStage />
}

function EmblemCircleStage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [drawn, setDrawn] = useState(false)
  const [sealed, setSealed] = useState(false)
  const reduceMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (reduceMotion.current) {
            setDrawn(true)
            setSealed(true)
            return
          }
          setSealed(false)
          setDrawn(false)
          requestAnimationFrame(() => setDrawn(true))
        } else {
          setDrawn(false)
          setSealed(false)
        }
      },
      { threshold: 0.45 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  const ringStyle: CSSProperties = sealed
    ? { opacity: 1 }
    : {
        strokeDasharray: 1,
        strokeDashoffset: drawn ? 0 : 1,
        transition:
          drawn && !reduceMotion.current
            ? 'stroke-dashoffset 2.1s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease'
            : 'none',
        opacity: drawn ? 1 : 0,
      }

  return (
    <div
      ref={rootRef}
      className="motif-play relative aspect-square w-[90%] overflow-hidden"
      style={{ backgroundColor: LINEN }}
    >
      <svg
        className="pointer-events-none absolute inset-[1px] z-0"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r="37.5"
          stroke={LILY}
          strokeWidth="0.18"
        />
        <circle
          cx="50"
          cy="50"
          r="45.5"
          stroke={ROSE}
          strokeWidth="0.18"
          strokeLinecap="butt"
          pathLength={1}
          transform="rotate(-90 50 50)"
          style={ringStyle}
          onTransitionEnd={event => {
            if (event.propertyName === 'stroke-dashoffset' && drawn) setSealed(true)
          }}
        />
      </svg>
      <Photo className="absolute inset-[16%] z-[1]" />
      <Overlay />
    </div>
  )
}

function SunbeamSweepStage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const inViewRef = useRef(false)
  const [lit, setLit] = useState(false)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // One sweep per enter — ignore threshold jitter while still in view.
          if (inViewRef.current) return
          inViewRef.current = true
          setLit(false)
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setLit(true))
          })
        } else {
          inViewRef.current = false
          setLit(false)
        }
      },
      { threshold: 0.5 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={rootRef}
      className={`motif-play motif-sunbeam relative aspect-square w-[90%] overflow-hidden${lit ? ' is-lit' : ''}`}
      style={{ backgroundColor: LINEN }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ backgroundColor: ALABASTER, opacity: 0.35 }} />
      <div className="motif-sunbeam-beam pointer-events-none absolute z-0 h-[78%] w-[78%]" aria-hidden="true" />
      <Photo className="absolute inset-[11%] z-[1]" />
      <Overlay />
    </div>
  )
}

function MotifStage({ id }: { id: MotifId }) {
  switch (id) {
    case 1:
      return <MotifDualArch />
    case 2:
      return <MotifRoseNiche />
    case 3:
      return <MotifToneBlocks />
    case 4:
      return <MotifCharcoalPlinth />
    case 5:
      return <MotifLilyFrameMat />
    case 6:
      return <RoseFamilyStage id="6" />
  }
}

function MotifCopy() {
  return (
    <div className="flex flex-col px-6 min-[681px]:pr-[max(36px,8vw)] min-[681px]:pl-0">
      <p className="text-[13px] font-semibold tracking-[0.21em] uppercase" style={{ color: ROSE }}>
        Our Philosophy
      </p>
      <h2
        className="my-3 max-w-[650px] font-serif text-[clamp(40px,8vw,56px)] font-normal leading-[1.08] tracking-[-0.044em] min-[681px]:text-[clamp(44px,4vw,60px)]"
        style={{ color: CHARCOAL }}
      >
        Only what <em className="italic" style={{ color: ROSE }}>earns its place.</em>
      </h2>
      <p className="mb-6 max-w-[540px] text-[17px] leading-relaxed" style={{ color: `${CHARCOAL}b3` }}>
        Motif preview — copy stays constant so you can compare the image background treatments.
      </p>
    </div>
  )
}

function VariationBlock({ title, note, children }: { title: string; note: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-4 px-6 md:px-[max(36px,8vw)]">
        <h2 className="font-serif text-[22px] leading-tight md:text-[26px]">{title}</h2>
        <p className="mt-1 max-w-[560px] text-[13px] leading-relaxed" style={{ color: `${CHARCOAL}99` }}>
          {note}
        </p>
      </div>
      <div className="border-y" style={{ borderColor: LILY, backgroundColor: LINEN }}>
        <section className="py-16 md:py-[75px]">
          <div className="grid grid-cols-1 items-center gap-12 min-[681px]:grid-cols-[48%_52%]">
            <div className="px-6 min-[681px]:pl-[max(36px,8vw)] min-[681px]:pr-[8%]">{children}</div>
            <MotifCopy />
          </div>
        </section>
      </div>
    </div>
  )
}

function SectionIntro({
  id,
  eyebrow,
  title,
  body,
}: {
  id: string
  eyebrow: string
  title: string
  body: string
}) {
  return (
    <div id={id} className="scroll-mt-28 border-t px-6 py-10 md:px-[max(36px,8vw)] md:py-12" style={{ backgroundColor: ALABASTER, borderColor: LILY }}>
      <p className="text-[13px] font-semibold tracking-[0.21em] uppercase" style={{ color: ROSE }}>
        {eyebrow}
      </p>
      <h2 className="mt-3 max-w-[720px] font-serif text-[clamp(28px,4vw,40px)] font-normal leading-[1.12] tracking-[-0.03em]">
        {title}
      </h2>
      <p className="mt-3 max-w-[540px] text-[15px] leading-relaxed" style={{ color: `${CHARCOAL}b3` }}>
        {body}
      </p>
    </div>
  )
}

export default function PhilosophyFramePreview() {
  return (
    <article className="font-sans" style={{ backgroundColor: LINEN, color: CHARCOAL }}>
      <header className="border-b px-6 py-10 md:px-[max(36px,8vw)] md:py-12" style={{ backgroundColor: ALABASTER, borderColor: LILY }}>
        <p className="text-[13px] font-semibold tracking-[0.21em] uppercase" style={{ color: ROSE }}>
          Working · Preview
        </p>
        <h1 className="mt-3 max-w-[760px] font-serif text-[clamp(32px,5vw,48px)] font-normal leading-[1.1] tracking-[-0.04em]">
          Image Background Motifs
        </h1>
        <p className="mt-3 max-w-[580px] text-[15px] leading-relaxed" style={{ color: `${CHARCOAL}b3` }}>
          Motif 6 family, logo-inspired treatments, plus a playful motion set — still palette-locked.
        </p>
        <div className="mt-5 flex flex-wrap gap-3 text-[11px] font-semibold tracking-[0.1em] uppercase">
          {[
            ['Linen White', LINEN],
            ['Alabaster Rose', ALABASTER],
            ['Soft Muted Lily', LILY],
            ['Rose Gold', ROSE],
            ['Espresso Charcoal', CHARCOAL],
          ].map(([name, hex]) => (
            <span key={name} className="inline-flex items-center gap-2 border px-2.5 py-1.5" style={{ borderColor: LILY }}>
              <span
                className="h-3 w-3 shrink-0"
                style={{ backgroundColor: hex, outline: hex === LINEN || hex === ALABASTER ? `1px solid ${LILY}` : undefined }}
              />
              {name}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <a href="#motif-6-family" className="text-[12px] font-semibold tracking-[0.08em] uppercase underline-offset-4 hover:underline" style={{ color: ROSE }}>
            Motif 6 family ↓
          </a>
          <a href="#logo-family" className="text-[12px] font-semibold tracking-[0.08em] uppercase underline-offset-4 hover:underline" style={{ color: ROSE }}>
            Logo-inspired ↓
          </a>
          <a href="#play-family" className="text-[12px] font-semibold tracking-[0.08em] uppercase underline-offset-4 hover:underline" style={{ color: ROSE }}>
            Playful motion ↓
          </a>
          <a href="/designs/working" className="text-[12px] font-semibold tracking-[0.08em] uppercase underline-offset-4 hover:underline" style={{ color: CHARCOAL }}>
            ← Back to Working
          </a>
        </div>
      </header>

      <style>{`
        @keyframes motif-bubble {
          0% { top: 108%; opacity: 0; transform: scale(0.55); }
          12% { opacity: 0.95; transform: scale(1); }
          100% { top: -12%; opacity: 0; transform: scale(1.05); }
        }
        @keyframes motif-wave {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-28px); }
        }
        @keyframes motif-wave-slow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(22px); }
        }
        @keyframes motif-shutter-l {
          0%, 18% { transform: translateX(0); }
          42%, 58% { transform: translateX(-96%); }
          82%, 100% { transform: translateX(0); }
        }
        @keyframes motif-shutter-r {
          0%, 18% { transform: translateX(0); }
          42%, 58% { transform: translateX(96%); }
          82%, 100% { transform: translateX(0); }
        }
        .motif-bubble { animation: motif-bubble 5.2s ease-in infinite; }
        .motif-wave { animation: motif-wave 6s ease-in-out infinite; }
        .motif-wave-slow { animation: motif-wave-slow 8.5s ease-in-out infinite; }
        .motif-shutter-l { animation: motif-shutter-l 5.5s ease-in-out infinite; }
        .motif-shutter-r { animation: motif-shutter-r 5.5s ease-in-out infinite; }

        .motif-sunbeam-beam {
          opacity: 0;
          top: 0;
          left: 0;
          background: radial-gradient(circle at center, ${ROSE}60 0%, ${LILY}44 36%, transparent 70%);
          transform: translate(48%, -28%);
        }
        .motif-sunbeam.is-lit .motif-sunbeam-beam {
          animation: sunbeam-pass 2.8s ease-out forwards;
        }
        @keyframes sunbeam-pass {
          0% { opacity: 0; transform: translate(48%, -28%); }
          12% { opacity: 1; transform: translate(48%, -28%); }
          100% { opacity: 1; transform: translate(-28%, 48%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .motif-play .motif-bubble,
          .motif-play .motif-wave,
          .motif-play .motif-wave-slow,
          .motif-play .motif-shutter-l,
          .motif-play .motif-shutter-r { animation: none !important; }
          .motif-sunbeam.is-lit .motif-sunbeam-beam {
            animation: none !important;
            opacity: 1 !important;
            transform: translate(-28%, 48%) !important;
          }
        }
      `}</style>

      <div className="flex flex-col gap-10 py-10 md:gap-14 md:py-14">
        {MOTIFS.map(motif => (
          <VariationBlock key={motif.id} title={motif.title} note={motif.note}>
            <MotifStage id={motif.id} />
          </VariationBlock>
        ))}
      </div>

      <SectionIntro
        id="motif-6-family"
        eyebrow="Motif 6 family"
        title="Rose Accent Arc directions"
        body="Kept from your shortlist — quiet field, Rose Gold arc language."
      />
      <div className="flex flex-col gap-10 py-10 md:gap-14 md:py-14">
        {ROSE_FAMILY.map(item => (
          <VariationBlock key={item.id} title={item.title} note={item.note}>
            <RoseFamilyStage id={item.id} />
          </VariationBlock>
        ))}
      </div>

      <SectionIntro
        id="logo-family"
        eyebrow="Logo-inspired"
        title="Six unique treatments from the SP seal"
        body="Circle, monogram sweep, RX rules, concentric seal, espresso stage, and watermark — elegant, not decorative noise."
      />
      <div className="flex flex-col gap-10 py-10 md:gap-14 md:py-14">
        {LOGO_FAMILY.map(item => (
          <VariationBlock key={item.id} title={item.title} note={item.note}>
            <LogoFamilyStage id={item.id} />
          </VariationBlock>
        ))}
      </div>

      <SectionIntro
        id="play-family"
        eyebrow="Playful motion"
        title="Five approachable moves"
        body="Champagne rise, ribbon current, soft shutters, emblem circle draw, sunbeam sweep — fresh motion, still on-palette."
      />
      <div className="flex flex-col gap-10 py-10 md:gap-14 md:py-14">
        {PLAY_FAMILY.map(item => (
          <VariationBlock key={item.id} title={item.title} note={item.note}>
            <PlayFamilyStage id={item.id} />
          </VariationBlock>
        ))}
      </div>
    </article>
  )
}
