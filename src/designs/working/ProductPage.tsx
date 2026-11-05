import { PRODUCTS, getProtocolStepLabel } from '../../data'

export default function ProductPage({
  productId,
  onBack,
}: {
  productId: string
  onBack: () => void
}) {
  const product = PRODUCTS.find(item => item.id === productId)

  function goBack() {
    if (window.history.length > 1) {
      window.history.back()
      return
    }
    onBack()
  }

  if (!product) {
    return (
      <article className="bg-[#F7F4EF] px-6 py-16 text-[#252520]">
        <button type="button" onClick={goBack} className="text-[13px] text-[#6D6A63] hover:text-[#252520]">
          ← Back
        </button>
        <p className="mt-8 text-[17px]">That product is not in the collection.</p>
      </article>
    )
  }

  return (
    <article className="bg-[#F7F4EF] px-6 py-10 text-[#252520] md:px-[max(36px,8vw)] md:py-16">
      <button type="button" onClick={goBack} className="text-[13px] text-[#6D6A63] hover:text-[#252520]">
        ← Back
      </button>
      <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-16">
        <img src={product.image} alt={product.name} className="w-full bg-[#FFFDFA] object-contain" />
        <div>
          <p className="text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]">
            {getProtocolStepLabel(product.protocolStep)}
          </p>
          <h1 className="mt-3 font-serif text-[clamp(36px,5vw,52px)] font-normal leading-[1.08] tracking-[-0.044em]">
            {product.name}
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-[#595750]">{product.tagline}</p>
          <p className="mt-6 font-serif text-3xl">${product.price}</p>
          <p className="mt-1 text-sm text-[#6D6A63]">{product.size}</p>
          <p className="mt-8 text-[17px] leading-relaxed text-[#252520]">{product.description}</p>
          <p className="mt-6 text-[15px] leading-relaxed text-[#595750]">{product.goodFor}</p>
          <div className="mt-8 border border-[#D6CEC3] bg-[#FFFDFA] p-5">
            <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#ab8584]">How to use</p>
            <p className="mt-2 text-sm leading-relaxed text-[#595750]">{product.howToUse}</p>
          </div>
        </div>
      </div>
    </article>
  )
}
