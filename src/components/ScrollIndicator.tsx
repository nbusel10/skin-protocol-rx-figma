import { useScrollProgress, useScrolled } from '../lib/hooks'

/**
 * Scroll progress as a ring around the SP monogram. Doubles as back-to-top.
 * Hidden until past the first screen so it never competes with the hero.
 */

const spMaskStyle = {
  aspectRatio: '1 / 1',
  WebkitMaskImage: 'url(/sp-mark.png)',
  maskImage: 'url(/sp-mark.png)',
  WebkitMaskSize: '100%',
  maskSize: '100%',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
} as const

export default function ScrollIndicator() {
  const progress = useScrollProgress()
  const shown = useScrolled(600)

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      title="Back to top"
      className={`fixed bottom-6 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white/95 text-black backdrop-blur-sm transition-all duration-300 hover:border-rose hover:text-rose sm:bottom-8 sm:right-8 ${
        shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <svg
        className="absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <circle
          cx="24"
          cy="24"
          r="21"
          fill="none"
          pathLength={1}
          className="stroke-black/10"
          strokeWidth="2"
        />
        <circle
          cx="24"
          cy="24"
          r="21"
          fill="none"
          pathLength={1}
          className="stroke-rose transition-[stroke-dashoffset] duration-150"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={1 - progress}
        />
      </svg>
      <span
        className="relative block h-8 w-8 bg-current"
        style={spMaskStyle}
        aria-hidden="true"
      />
      <span className="sr-only">{Math.round(progress * 100)}% of page read</span>
    </button>
  )
}
