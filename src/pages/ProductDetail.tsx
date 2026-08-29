import { useState } from 'react'
import { PRODUCTS } from '../data'
import ProductImage from '../components/ProductImage'

type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product'

interface ProductDetailProps {
  productId: string
  onNavigate: (page: Page, productId?: string) => void
}

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i <= rating ? '#B8878B' : 'none'} stroke="#B8878B" strokeWidth="1.5">
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

  const images = [product.image, ...related.slice(0, 2).map(p => p.image)]

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Breadcrumb */}
      <div className="px-5 md:px-8 py-4 border-b border-gray-soft bg-white">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-charcoal/40">
          <button onClick={() => onNavigate('home')} className="hover:text-charcoal transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => onNavigate('shop')} className="hover:text-charcoal transition-colors">Shop</button>
          <span>/</span>
          <span className="text-charcoal">{product.name}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Images */}
          <div className="flex gap-4">
            {/* Thumbs */}
            <div className="hidden md:flex flex-col gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className="w-16 overflow-hidden border transition-colors"
                  style={{ borderColor: activeImage === i ? '#B8878B' : '#E5E5E5' }}
                >
                  <ProductImage src={img} alt="" variant="thumb" />
                </button>
              ))}
            </div>
            {/* Main image */}
            <div className="flex-1">
              <ProductImage src={images[activeImage]} alt={product.name} variant="detail" />
            </div>
          </div>

          {/* Details */}
          <div>
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              {product.badges.map(b => (
                <span key={b} className="text-[10px] tracking-widest uppercase px-3 py-1 font-medium"
                  style={{ backgroundColor: b === 'Best Seller' ? '#B8878B' : '#0A0A0A', color: '#fff' }}>
                  {b}
                </span>
              ))}
            </div>

            <p className="text-[11px] tracking-[0.3em] uppercase text-charcoal/40 mb-2">{product.categories[0]}</p>
            <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-3">{product.name}</h1>
            <p className="text-charcoal/60 mb-4">{product.tagline}</p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <StarRating rating={Math.round(product.rating)} />
              <span className="text-sm text-charcoal/60">{product.rating} · {product.reviews} reviews</span>
            </div>

            <p className="font-serif text-3xl text-charcoal mb-2">${product.price}</p>
            <p className="text-xs text-charcoal/40 mb-8">{product.size}</p>

            {/* Skin type tags */}
            <div className="mb-6">
              <p className="text-xs tracking-widest uppercase text-charcoal/40 mb-2">Skin Types</p>
              <div className="flex flex-wrap gap-2">
                {product.skinTypes.map(t => (
                  <span key={t} className="text-xs border border-gray-soft px-3 py-1 text-charcoal/60">{t}</span>
                ))}
              </div>
            </div>

            {/* Concern tags */}
            <div className="mb-8">
              <p className="text-xs tracking-widest uppercase text-charcoal/40 mb-2">Skin Concerns</p>
              <div className="flex flex-wrap gap-2">
                {product.concerns.map(c => (
                  <span key={c} className="text-xs bg-rose-light border border-rose/20 px-3 py-1 text-rose font-medium">{c}</span>
                ))}
              </div>
            </div>

            {/* Qty + Add to Cart */}
            <div className="flex gap-4 mb-5">
              <div className="flex border border-gray-soft bg-white">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-3 text-charcoal hover:bg-gray-soft transition-colors">−</button>
                <span className="w-12 flex items-center justify-center text-sm text-charcoal">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="px-4 py-3 text-charcoal hover:bg-gray-soft transition-colors">+</button>
              </div>
              <button className="flex-1 bg-black text-white py-3 text-sm font-medium tracking-wide hover:bg-rose transition-colors">
                Add to Cart — ${product.price * qty}
              </button>
            </div>
            <button className="w-full bg-rose text-white py-3 text-sm font-medium tracking-wide hover:bg-rose-dark transition-colors mb-5">
              Buy Now
            </button>

            {/* Subscription */}
            <div className="bg-rose-light border border-rose/20 p-4 mb-6 flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B8878B" strokeWidth="1.8">
                <path d="M23 4v6h-6M1 20v-6h6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <p className="text-xs font-medium text-rose">Subscribe & Save 10%</p>
                <p className="text-xs text-charcoal/50">Delivered every 30, 60, or 90 days. Cancel anytime.</p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { icon: '✦', label: 'Cruelty-Free' },
                { icon: '◈', label: 'No Unnecessary Additives' },
                { icon: '◉', label: 'Professional Formula' },
                { icon: '◇', label: 'Family-Owned, New York' },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-2 text-xs text-charcoal/50">
                  <span className="text-rose text-sm">{b.icon}</span>
                  {b.label}
                </div>
              ))}
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
              <Accordion title="How It Fits Into Your Protocol">
                <p>This product works as part of the Skin Protocol RX system. Use it in the correct step order for best results. <button onClick={() => onNavigate('protocol')} className="text-rose underline underline-offset-2">Build your full protocol →</button></p>
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
        <div className="mt-24 pt-12 border-t border-gray-soft">
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-2">Complete Your Protocol</h2>
          <p className="text-charcoal/50 mb-10">Products that work with {product.name}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map(p => (
              <div key={p.id} className="group cursor-pointer" onClick={() => onNavigate('product', p.id)}>
                <ProductImage src={p.image} alt={p.name} hover className="mb-3" />
                <p className="text-[10px] tracking-widest uppercase text-charcoal/40 mb-0.5">{p.categories[0]}</p>
                <p className="text-sm font-medium text-charcoal mb-1">{p.name}</p>
                <p className="text-sm text-charcoal/60">${p.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
