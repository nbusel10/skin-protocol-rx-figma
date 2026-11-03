import Header from './Header'
import HomePage from './HomePage'

/**
 * Preview only — Working homepage with a lighter header, buttons, and captions.
 * Does not replace the live Working homepage until approved.
 */
export default function LighterPreview() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E7E2DC] bg-white px-6 py-3 md:px-[max(36px,8vw)]">
        <div>
          <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#6D6A63]">Lighter preview</p>
          <p className="mt-0.5 text-sm text-[#6D6A63]">Same words and type. Quieter header, buttons, and captions. Not on the working page yet.</p>
        </div>
        <a
          href="/designs/working"
          className="text-[12px] font-semibold tracking-[0.08em] uppercase text-[#2B2727] underline-offset-4 hover:text-[#ab8584] hover:underline"
        >
          ← Working
        </a>
      </div>
      <Header lighter />
      <HomePage lighter />
    </div>
  )
}
