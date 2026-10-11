type ProductImageVariant = "card" | "thumb" | "inline" | "detail"

interface ProductImageProps {
  src: string
  alt: string
  variant?: ProductImageVariant
  className?: string
  hover?: boolean
}

const variantClasses: Record<ProductImageVariant, string> = {
  card: "aspect-[2/3]",
  thumb: "aspect-[2/3]",
  inline: "w-full h-full",
  detail: "aspect-[2/3]",
}

export default function ProductImage({
  src,
  alt,
  variant = "card",
  className = "",
  hover = false,
}: ProductImageProps) {
  return (
    <div className={`bg-white overflow-hidden ${variantClasses[variant]} ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover object-center scale-[1.04] ${
          hover ? "transition-transform duration-500 group-hover:scale-110" : ""
        }`}
      />
    </div>
  )
}
