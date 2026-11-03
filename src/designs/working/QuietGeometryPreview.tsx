import HomePage from './HomePage'
import './quiet-geometry/quiet-geometry.css'

/**
 * Preview only — exact Working homepage sections with Quiet Geometry on images.
 * Does not replace the live Working homepage until approved.
 */
export default function QuietGeometryPreview() {
  return (
    <div className="qg-preview line-quiet">
      <div className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 border-b border-[#D6CEC3] bg-[#FFFDFA]/95 px-6 py-3 backdrop-blur-md md:px-[max(36px,8vw)]">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#ab8584]">Quiet Geometry preview</p>
          <p className="mt-0.5 text-sm text-[#6D6A63]">Exact Working sections · whisper lines · draw-on-scroll · not live yet</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <a
            href="/designs/working"
            className="text-[12px] font-semibold tracking-[0.08em] uppercase text-[#2B2727] underline-offset-4 hover:text-[#ab8584] hover:underline"
          >
            ← Working (no geometry)
          </a>
          <a
            href="/designs/working/quiet-geometry-reference.html"
            className="text-[12px] font-semibold tracking-[0.08em] uppercase text-[#ab8584] underline-offset-4 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Reference HTML ↗
          </a>
        </div>
      </div>

      <HomePage quietGeometry />
    </div>
  )
}
