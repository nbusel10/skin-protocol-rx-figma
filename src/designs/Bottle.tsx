interface BottleProps {
  src: string
  alt: string
  className?: string
}

export default function Bottle({ src, alt, className = '' }: BottleProps) {
  return (
    <div className={`d-bottle ${className}`}>
      <img src={src} alt={alt} />
    </div>
  )
}
