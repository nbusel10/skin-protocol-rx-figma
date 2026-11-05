import type { OutcomeDecorationVariant } from './OutcomeDecorations'
import OutcomesSection from './OutcomesSection'

const OPTIONS: { id: string; variant: OutcomeDecorationVariant; name: string; description: string }[] = [
  {
    id: 'editorial',
    variant: 'editorial',
    name: 'Option 1 — Oversized Editorial Typography',
    description: 'A thin editorial “08” set beside the headline, with Weeks beneath it.',
  },
  {
    id: 'architecture',
    variant: 'architecture',
    name: 'Option 2 — Abstract Architectural Linework',
    description: 'Overlapping architectural arches occupying the right side of the header.',
  },
  {
    id: 'texture',
    variant: 'texture',
    name: 'Option 3 — Skincare Texture',
    description: 'A pale ivory cream texture, masked so it dissolves into the section.',
  },
  {
    id: 'progression',
    variant: 'progression',
    name: 'Option 4 — Minimal Progression Lines',
    description: 'A larger field of thin rising strokes, balanced with the headline.',
  },
  {
    id: 'statement',
    variant: 'statement',
    name: 'Option 5 — Editorial Statement',
    description: 'Observe. Understand. Refine. Set in italic serif beside the headline.',
  },
  {
    id: 'steps',
    variant: 'steps',
    name: 'Option 6 — Rising Line',
    description: 'One faded rose-gold stroke sweeping upward, ending in a small arrow.',
  },
  {
    id: 'ascent',
    variant: 'ascent',
    name: 'Option 7 — Ascending Lines',
    description: 'Thin vertical strokes that grow evenly taller from left to right, beside the headline.',
  },
]

export default function OutcomesDecorationPreview() {
  return (
    <div className="theme-clear min-h-screen bg-[#f5f0eb] text-[#252520]">
      <header className="px-6 pt-14 pb-2 md:px-[max(36px,8vw)] md:pt-16">
        <h1 className="max-w-[740px] font-serif text-[clamp(36px,4vw,52px)] leading-[1.08] font-normal tracking-[-0.03em]">
          Outcomes Section — Design Explorations
        </h1>
        <p className="mt-4 max-w-[640px] text-[17px] leading-relaxed text-[#595750]">
          Seven header compositions. Each one changes only the artwork beside the headline.
        </p>
      </header>

      {OPTIONS.map((option, index) => (
        <div key={option.id}>
          <div className={`mx-6 border-t border-[#E4D6D2] pt-5 md:mx-[max(36px,8vw)] ${index === 0 ? 'mt-8' : 'mt-4'}`}>
            <p className="text-[13px] font-semibold tracking-[0.21em] text-[#ab8584] uppercase">{option.name}</p>
            <p className="mt-2 max-w-[640px] text-[15px] leading-relaxed text-[#595750]">{option.description}</p>
          </div>
          <OutcomesSection decoration={option.variant} instanceId={option.id} animateTimeline composedHeader />
        </div>
      ))}
    </div>
  )
}
