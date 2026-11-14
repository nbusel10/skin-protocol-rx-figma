import { useState } from 'react'
import { PRODUCTS, getProtocolStepLabel } from '../../data'
import ProductImage from '../../v2/components/ProductImage'
import { useSiteRoot } from './siteRoot'

const ROSE = '#ab8584'
const LILY = '#D6C3C2'

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i <= rating ? ROSE : 'none'} stroke={ROSE} strokeWidth="1.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  )
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#D6C3C2]">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-sm font-medium text-[#2B2727] transition-colors hover:text-[#ab8584]"
      >
        {title}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && <div className="pb-5 text-sm leading-relaxed text-[#2B2727]/70">{children}</div>}
    </div>
  )
}

export default function ProductPage({
  productId,
  onHome,
  onCollection,
  onViewProduct,
}: {
  productId: string
  onHome: () => void
  onCollection: () => void
  onViewProduct: (id: string) => void
}) {
  const site = useSiteRoot()
  const product = PRODUCTS.find(item => item.id === productId)
  const [qty, setQty] = useState(1)
  const [activeImage, setActiveImage] = useState(0)

  if (!product) {
    return (
      <article className="bg-[#f5f0eb] px-6 py-16 font-sans text-[#2B2727]">
        <button type="button" onClick={onCollection} className="text-sm text-[#2B2727]/70 hover:text-[#2B2727]">
          ← Back
        </button>
        <p className="mt-8 text-[17px]">That product is not in the collection.</p>
      </article>
    )
  }

  const related = PRODUCTS.filter(item => item.id !== product.id).slice(0, 4)
  const images = [
    { src: product.image, alt: product.name },
    { src: '/v2-collection-lineup.jpg', alt: 'Skin Protocol RX collection in warm spa light' },
  ]

  return (
    <div className="min-h-screen bg-[#f5f0eb] font-sans text-[#2B2727]">
      <div className="border-b border-[#D6C3C2] bg-[#f5f0eb] px-5 py-4 md:px-8">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-xs text-[#2B2727]/70">
          <button type="button" onClick={onHome} className="transition-colors hover:text-[#2B2727]">Home</button>
          <span>/</span>
          <button type="button" onClick={onCollection} className="transition-colors hover:text-[#2B2727]">Explore the Collection</button>
          <span>/</span>
          <span className="text-[#2B2727]">{product.name}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex gap-4">
            <div className="hidden flex-col gap-3 md:flex">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className="w-16 overflow-hidden border transition-colors"
                  style={{ borderColor: activeImage === i ? ROSE : LILY }}
                >
                  <ProductImage src={img.src} alt={img.alt} variant="thumb" className="!bg-[#fffdfa]" />
                </button>
              ))}
            </div>
            <div className="flex-1">
              {images[activeImage].src.includes('v2-collection-lineup') ? (
                <div className="aspect-[1.85/1] overflow-hidden bg-[#f3eceb]">
                  <img
                    src={images[activeImage].src}
                    alt={images[activeImage].alt}
                    className="h-full w-full object-cover object-[center_42%]"
                  />
                </div>
              ) : (
                <ProductImage src={images[activeImage].src} alt={images[activeImage].alt} variant="detail" className="!bg-[#fffdfa]" />
              )}
            </div>
          </div>

          <div>
            {product.badges[0] && (
              <span className="mb-4 inline-block border border-[#ab8584]/40 bg-[#f3eceb] px-3 py-1 text-[10px] font-medium tracking-widest uppercase text-[#ab8584]">
                {product.badges[0]}
              </span>
            )}

            <p className="mb-2 text-[11px] tracking-[0.22em] uppercase text-[#ab8584]">
              {getProtocolStepLabel(product.protocolStep)}
            </p>
            <h1 className="mb-3 font-serif text-3xl text-[#2B2727] md:text-4xl">{product.name}</h1>
            <p className="mb-4 text-lg text-[#2B2727]/85">{product.tagline}</p>
            <p className="mb-1 font-serif text-3xl text-[#2B2727]">${product.price}</p>
            <p className="mb-8 text-sm text-[#2B2727]/70">{product.size}</p>

            <div className="mb-4 flex gap-4">
              <div className="flex border border-[#D6C3C2] bg-[#fffdfa]">
                <button type="button" onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-3 text-[#2B2727] transition-colors hover:bg-[#f3eceb]">−</button>
                <span className="flex w-12 items-center justify-center text-sm text-[#2B2727]">{qty}</span>
                <button type="button" onClick={() => setQty(q => q + 1)} className="px-4 py-3 text-[#2B2727] transition-colors hover:bg-[#f3eceb]">+</button>
              </div>
              <button type="button" className="flex-1 bg-[#ab8584] px-7 py-3.5 text-sm font-medium text-[#fffdfa] transition-colors hover:bg-[#2B2727]">
                Add to Cart — ${product.price * qty}
              </button>
            </div>
            <p className="mb-8 text-sm text-[#2B2727]/75">Subscribe and save 10%. Delivered every 30, 60, or 90 days.</p>

            <div className="mb-8 bg-[#f3eceb] p-5">
              <div className="mb-4 flex items-center gap-3">
                <StarRating rating={Math.round(product.rating)} />
                <span className="text-sm text-[#2B2727]/80">{product.rating} · {product.reviews} reviews</span>
              </div>
              <p className="mb-2 text-[11px] tracking-[0.16em] uppercase text-[#2B2727]/70">Skin types</p>
              <div className="mb-4 flex flex-wrap gap-2">
                {product.skinTypes.map(t => (
                  <span key={t} className="border border-[#D6C3C2] bg-[#fffdfa] px-3 py-1 text-xs text-[#2B2727]">{t}</span>
                ))}
              </div>
              <p className="mb-2 text-[11px] tracking-[0.16em] uppercase text-[#2B2727]/70">Skin concerns</p>
              <div className="flex flex-wrap gap-2">
                {product.concerns.map(c => (
                  <span key={c} className="border border-[#ab8584]/35 bg-[#fffdfa] px-3 py-1 text-xs text-[#2B2727]">{c}</span>
                ))}
              </div>
            </div>

            <div className="border-t border-[#D6C3C2]">
              <Accordion title="Product Benefits">
                <ul className="space-y-2">
                  {product.benefits.map(b => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-0.5 text-[#ab8584]">✦</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </Accordion>
              <Accordion title="How to Use">
                <p>{product.howToUse}</p>
              </Accordion>
              <Accordion title="Key Ingredients">
                <div className="space-y-4">
                  {product.keyIngredients.map(i => (
                    <div key={i.name}>
                      <p className="mb-1 font-medium text-[#2B2727]">{i.name}</p>
                      <p className="text-[#2B2727]/60">{i.benefit}</p>
                    </div>
                  ))}
                </div>
              </Accordion>
              <Accordion title="Full Ingredient List">
                <p className="leading-relaxed text-[#2B2727]/70">
                  {product.fullIngredients.join(' · ')}
                </p>
                <a
                  href={site.glossary}
                  className="mt-4 inline-block text-sm text-[#ab8584] underline underline-offset-2"
                >
                  Browse the Ingredient Glossary →
                </a>
              </Accordion>
              <Accordion title="Shipping & Returns">
                <p>Free standard shipping on orders over $75. Returns accepted within 30 days of delivery for unopened products. Contact our team for support with opened products.</p>
              </Accordion>
            </div>

            <p className="mt-6 text-[11px] leading-relaxed text-[#2B2727]/45">
              Product information is provided for educational purposes only and does not replace professional medical advice. Consult a dermatologist or licensed esthetician for personalized skincare guidance.
            </p>
          </div>
        </div>

        <div className="mt-20 border-t border-[#D6C3C2] pt-12">
          <h2 className="mb-2 font-serif text-2xl text-[#2B2727] md:text-3xl">Complete your routine</h2>
          <p className="mb-8 text-base text-[#2B2727]/80">Formulas that sit well beside {product.name}</p>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {related.map(p => (
              <button key={p.id} type="button" className="group text-left" onClick={() => onViewProduct(p.id)}>
                <ProductImage src={p.image} alt={p.name} hover className="mb-3 !bg-[#fffdfa]" />
                <p className="mb-1 text-[11px] tracking-[0.16em] uppercase text-[#ab8584]">{getProtocolStepLabel(p.protocolStep)}</p>
                <p className="mb-1 text-base font-medium text-[#2B2727]">{p.name}</p>
                <p className="text-base font-semibold text-[#2B2727]">${p.price}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
