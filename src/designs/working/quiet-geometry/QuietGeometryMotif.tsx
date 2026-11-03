import { useEffect, useRef, type ReactNode } from 'react'
import './quiet-geometry.css'

export type QuietGeometryVariant =
  | 'hero'
  | 'philosophy'
  | 'protocol'
  | 'education'
  | 'quiz'
  | 'founders'
  | 'spa'

/** Exact SVG paths from Quiet Geometry Inverted Double Arches reference. */
function MotifSvg({ variant }: { variant: QuietGeometryVariant }) {
  switch (variant) {
    case 'hero':
      return (
        <>
          <path d="M75 340V181a133 133 0 0 1 266 0v159" />
          <path className="accent" d="M117 340V183a91 91 0 0 1 182 0v157" />
        </>
      )
    case 'philosophy':
      return (
        <>
          <circle cx="173" cy="180" r="105" />
          <circle className="accent" cx="249" cy="180" r="105" />
        </>
      )
    case 'protocol':
      return (
        <>
          <path d="M50 117H370" />
          <path className="accent" d="M100 182H370" />
          <path d="M50 247H320" />
        </>
      )
    case 'education':
      return (
        <>
          <circle cx="210" cy="180" r="123" />
          <circle className="accent" cx="210" cy="180" r="74" />
          <path className="hairline" d="M210 57V303" />
          <path className="hairline" d="M87 180H333" />
          <path className="accent" d="M210 106V254" />
          <path className="accent" d="M136 180H284" />
        </>
      )
    case 'quiz':
      return (
        <>
          <path d="M4 40 V175 C4 281 96 322 205 322 C311 322 414 282 414 175 V40" />
          <path className="accent" d="M28 18 V178 C28 271 103 293 202 293 C306 293 384 263 384 178 V18" />
        </>
      )
    case 'founders':
      return (
        <>
          <circle cx="210" cy="112" r="104" />
          <circle className="accent" cx="133" cy="236" r="104" />
          <circle cx="287" cy="236" r="104" />
        </>
      )
    case 'spa':
      return (
        <>
          <path d="M25 323a185 185 0 0 1 370 0" />
          <path className="accent" d="M71 323a139 139 0 0 1 278 0" />
          <path className="hairline" d="M25 324H395" />
        </>
      )
  }
}

function useQuietGeometryDraw(svgRef: React.RefObject<SVGSVGElement | null>) {
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const shapes = svg.querySelectorAll<SVGGeometryElement>('path, circle, ellipse')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    shapes.forEach(shape => {
      try {
        const length = shape.getTotalLength()
        shape.style.setProperty('--dash-length', String(length + 2))
      } catch {
        /* ignore non-measurable nodes */
      }
    })

    if (reduced) {
      svg.classList.add('qg-in-view')
      return
    }

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          svg.classList.add('qg-in-view')
          io.unobserve(svg)
        })
      },
      { threshold: 0.13 },
    )

    io.observe(svg)
    return () => io.disconnect()
  }, [svgRef])
}

/** Decorative Quiet Geometry layer — place inside `.qg-frame` behind the photo. */
export default function QuietGeometryMotif({ variant }: { variant: QuietGeometryVariant }) {
  const svgRef = useRef<SVGSVGElement>(null)
  useQuietGeometryDraw(svgRef)

  return (
    <div className={`qg-stage qg-motif-${variant}`} aria-hidden="true">
      <svg
        ref={svgRef}
        className="qg-sketch qg-draw"
        viewBox="0 0 420 360"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <MotifSvg variant={variant} />
      </svg>
    </div>
  )
}

/**
 * Layout matches reference: geometry sized to the full stage,
 * photo inset/centered on top so arch/circle legs fall outside the image.
 */
export function QuietGeometryFrame({
  variant,
  children,
  className = '',
  photoClassName = '',
}: {
  variant: QuietGeometryVariant
  children: ReactNode
  className?: string
  photoClassName?: string
}) {
  return (
    <div className={`qg-frame qg-layout qg-layout-${variant} ${className}`.trim()}>
      <QuietGeometryMotif variant={variant} />
      <div className={`qg-photo qg-photo-frame ${photoClassName}`.trim()}>{children}</div>
    </div>
  )
}
