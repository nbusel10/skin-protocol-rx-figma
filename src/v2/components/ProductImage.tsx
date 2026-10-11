type ProductImageVariant = "card" | "thumb" | "inline" | "detail"

interface ProductImageProps {
  src: string
  alt: string
  variant?: ProductImageVariant
  className?: string
  hover?: boolean
}

const variantClasses: Record<ProductImageVariant, string> = {
  card: "aspect-[4/5] p-6 md:p-8",
  thumb: "aspect-square p-1.5",
  inline: "w-full h-full p-3",
  detail: "aspect-square p-8 md:p-12",
}

export default function ProductImage({
  src,
  alt,
  variant = "card",
  className = "",
  hover = false,
}: ProductImageProps) {
  return (
    <div className={`bg-stone overflow-hidden ${variantClasses[variant]} ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-contain object-center ${
          hover ? "transition-transform duration-500 group-hover:scale-105" : ""
        }`}
      />
    </div>
  )
}
