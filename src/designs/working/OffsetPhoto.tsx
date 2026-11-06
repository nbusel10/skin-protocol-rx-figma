/**
 * Thin rose line set up and to the right of a photo.
 * The parent should be the photo's box, and must not clip the offset.
 */
export function OffsetFrame({ borderClassName = 'border-[#C4A8A6]' }: { borderClassName?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -top-5 -right-5 bottom-0 left-8 z-0 border sm:left-10 ${borderClassName}`}
    />
  )
}

/**
 * Photo with a thin rose line set up and to the right, and an optional white corner label.
 * Used by the lighter preview.
 */
export default function OffsetPhoto({
  src,
  alt,
  caption,
  className = '',
  imgClassName = '',
  captionClassName = 'right-6 bottom-6',
  frameClassName = '',
}: {
  src: string
  alt: string
  caption?: string
  className?: string
  imgClassName?: string
  captionClassName?: string
  frameClassName?: string
}) {
  return (
    <div className={`relative pt-5 pr-5 pb-2 ${className}`}>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute top-0 right-0 bottom-2 left-8 border border-[#C4A8A6] sm:left-10 ${frameClassName}`}
      />
      <img
        src={src}
        alt={alt}
        className={`relative z-[1] w-full object-cover ${imgClassName}`}
      />
      {caption ? (
        <p className={`absolute z-[2] w-[min(15.5rem,68%)] bg-white/35 px-5 py-5 text-left text-[10px] font-medium italic tracking-[0.16em] text-[#252520] uppercase leading-[1.7] backdrop-blur-sm sm:text-[11px] ${captionClassName}`}>
          {caption}
        </p>
      ) : null}
    </div>
  )
}
