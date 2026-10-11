import { useState } from 'react'
import { PRODUCTS, getProtocolStepLabel } from '../../data'
import ProductImage from '../components/ProductImage'

type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product' | 'glossary' | 'education'

interface ProductDetailProps {
  productId: string
  onNavigate: (page: Page, productId?: string) => void
}

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i <= rating ? '#B88E91' : 'none'} stroke="#B88E91" strokeWidth="1.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  )
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-soft">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center justify-between w-full py-4 text-sm font-medium text-black hover:text-rose transition-colors"
      >
        {title}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && <div className="pb-5 text-sm text-charcoal/60 leading-relaxed">{children}</div>}
    </div>
  )
}

export default function ProductDetail({ productId, onNavigate }: ProductDetailProps) {
  const product = PRODUCTS.find(p => p.id === productId) ?? PRODUCTS[0]
  const [qty, setQty] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const related = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4)

  const images = [
    { src: product.image, alt: product.name },
    { src: '/v2-collection-lineup.jpg', alt: 'Skin Protocol RX collection in warm spa light' },
  ]

  return (
    <div className="bg-ivory min-h-screen font-sans">
      <div className="px-5 md:px-8 py-4 border-b border-gray-soft bg-ivory">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-charcoal/70">
          <button onClick={() => onNavigate('home')} className="hover:text-charcoal transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => onNavigate('shop')} className="hover:text-charcoal transition-colors">Explore the Collection</button>
          <span>/</span>
          <span className="text-charcoal">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="flex gap-4">
            <div className="hidden md:flex flex-col gap-3">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  onClick={() => setActiveImage(i)}
                  className="w-16 overflow-hidden border transition-colors"
                  style={{ borderColor: activeImage === i ? '#B88E91' : '#E4DDD4' }}
                >
                  <ProductImage src={img.src} alt={img.alt} variant="thumb" />
                </button>
              ))}
            </div>
            <div className="flex-1">
              {images[activeImage].src.includes('v2-collection-lineup') ? (
                <div className="lineup-frame">
                  <img src={images[activeImage].src} alt={images[activeImage].alt} />
                </div>
              ) : (
                <ProductImage src={images[activeImage].src} alt={images[activeImage].alt} variant="detail" />
              )}
            </div>
          </div>

          <div>
            {product.badges[0] && (
              <span className="inline-block text-[10px] tracking-widest uppercase px-3 py-1 font-medium mb-4 bg-rose/10 text-rose border border-rose/30">
                {product.badges[0]}
              </span>
            )}

            <p className="text-[11px] tracking-[0.22em] uppercase text-rose mb-2">
              {getProtocolStepLabel(product.protocolStep)}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-3">{product.name}</h1>
            <p className="text-lg text-charcoal/85 mb-4">{product.tagline}</p>
            <p className="font-serif text-3xl text-charcoal mb-1">${product.price}</p>
            <p className="text-sm text-charcoal/70 mb-8">{product.size}</p>

            <div className="flex gap-4 mb-4">
              <div className="flex border border-gray-soft bg-white">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-3 text-charcoal hover:bg-stone transition-colors">−</button>
                <span className="w-12 flex items-center justify-center text-sm text-charcoal">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="px-4 py-3 text-charcoal hover:bg-stone transition-colors">+</button>
              </div>
              <button className="flex-1 btn-primary">
                Add to Cart — ${product.price * qty}
              </button>
            </div>
            <p className="text-sm text-charcoal/75 mb-8">Subscribe and save 10%. Delivered every 30, 60, or 90 days.</p>

            <div className="bg-stone p-5 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <StarRating rating={Math.round(product.rating)} />
                <span className="text-sm text-charcoal/80">{product.rating} · {product.reviews} reviews</span>
              </div>
              <p className="text-[11px] tracking-[0.16em] uppercase text-charcoal/70 mb-2">Skin types</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.skinTypes.map(t => (
                  <span key={t} className="text-xs border border-gray-soft bg-ivory px-3 py-1 text-charcoal">{t}</span>
                ))}
              </div>
              <p className="text-[11px] tracking-[0.16em] uppercase text-charcoal/70 mb-2">Skin concerns</p>
              <div className="flex flex-wrap gap-2">
                {product.concerns.map(c => (
                  <span key={c} className="text-xs bg-ivory border border-rose/25 px-3 py-1 text-charcoal">{c}</span>
                ))}
              </div>
            </div>

            {/* Accordion sections */}
            <div className="border-t border-gray-soft">
              <Accordion title="Product Benefits">
                <ul className="space-y-2">
                  {product.benefits.map(b => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="text-rose mt-0.5">✦</span>
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
                      <p className="font-medium text-charcoal mb-1">{i.name}</p>
                      <p className="text-charcoal/50">{i.benefit}</p>
                    </div>
                  ))}
                </div>
              </Accordion>
              <Accordion title="Full Ingredient List">
                <p className="text-charcoal/60 leading-relaxed">
                  {product.fullIngredients.join(' · ')}
                </p>
                <button
                  onClick={() => onNavigate('glossary')}
                  className="mt-4 text-rose text-sm underline underline-offset-2"
                >
                  Browse the Ingredient Glossary →
                </button>
              </Accordion>
              <Accordion title="How it fits your routine">
                <p className="mb-3">
                  <span className="font-medium text-charcoal">{getProtocolStepLabel(product.protocolStep)}</span>
                  {' — '}use it in step order with the rest of your routine.
                </p>
                <p>This product is part of the Skin Protocol RX line. <button onClick={() => onNavigate('protocol')} className="text-rose underline underline-offset-2">Find your routine →</button></p>
              </Accordion>
              <Accordion title="Shipping & Returns">
                <p>Free standard shipping on orders over $75. Returns accepted within 30 days of delivery for unopened products. Contact our team for support with opened products.</p>
              </Accordion>
            </div>

            <p className="text-[11px] text-charcoal/30 mt-6 leading-relaxed">
              Product information is provided for educational purposes only and does not replace professional medical advice. Consult a dermatologist or licensed esthetician for personalized skincare guidance.
            </p>
          </div>
        </div>

        {/* Complete Your Protocol */}
        <div className="mt-20 pt-12 border-t border-gray-soft">
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-2">Complete your routine</h2>
          <p className="text-base text-charcoal/80 mb-8">Formulas that sit well beside {product.name}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map(p => (
              <button key={p.id} type="button" className="group text-left" onClick={() => onNavigate('product', p.id)}>
                <ProductImage src={p.image} alt={p.name} hover className="mb-3" />
                <p className="text-[11px] tracking-[0.16em] uppercase text-rose mb-1">{getProtocolStepLabel(p.protocolStep)}</p>
                <p className="text-base font-medium text-charcoal mb-1">{p.name}</p>
                <p className="text-base font-semibold text-charcoal">${p.price}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
