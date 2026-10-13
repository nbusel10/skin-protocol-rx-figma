import type { ReactNode } from 'react'

interface SplitHeroProps {
  eyebrow: string
  title: ReactNode
  body: string
  image: string
  imageAlt: string
  badgeLabel: string
  badgeText: string
  footnote?: string
  children?: ReactNode
}

/** Same split as the original home hero: copy on the left, sunlit photograph on the right, black note overlapping the photo. */
export default function SplitHero({
  eyebrow,
  title,
  body,
  image,
  imageAlt,
  badgeLabel,
  badgeText,
  footnote,
  children,
}: SplitHeroProps) {
  return (
    <section className="relative min-h-[90vh] grid grid-cols-1 lg:grid-cols-2 items-center bg-ivory">
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-24 lg:py-16 order-2 lg:order-1">
        <p className="text-[11px] tracking-[0.3em] uppercase text-green font-medium mb-6">
          {eyebrow}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-charcoal mb-7">
          {title}
        </h1>
        <p className="text-base text-charcoal/60 leading-relaxed max-w-md mb-10">
          {body}
        </p>
        {children && (
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10 w-full">
            {children}
          </div>
        )}
        {footnote && (
          <p className="text-xs tracking-widest uppercase text-charcoal/40">
            {footnote}
          </p>
        )}
      </div>

      <div className="relative order-1 lg:order-2 flex items-center pb-24 lg:pb-16">
        <div className="relative w-full">
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-auto object-cover object-center"
          />
          <div className="absolute bottom-0 left-0 z-10 translate-y-[78%] lg:-translate-x-8 bg-black text-white border border-rose/30 p-3 lg:p-5 max-w-[11rem] lg:max-w-xs">
            <p className="text-[0.625rem] lg:text-xs tracking-[0.14em] lg:tracking-widest uppercase text-rose font-medium leading-tight mb-1 lg:mb-2">
              {badgeLabel}
            </p>
            <p className="text-xs lg:text-sm font-sans leading-snug">{badgeText}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
