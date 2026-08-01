import { useState, useMemo } from 'react'
import { PRODUCTS, type Product, type SkinType, type SkinConcern, type ProductCategory } from '../data'

type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product'

interface ShopPageProps {
  onNavigate: (page: Page, productId?: string) => void
}

type SortOption = 'featured' | 'best-selling' | 'newest' | 'price-asc' | 'price-desc'

const SKIN_TYPES: SkinType[] = ['Combination', 'Dry', 'Normal', 'Oily', 'Sensitive']
const SKIN_CONCERNS: SkinConcern[] = ['Acne', 'Aging', 'Brightening', 'Dry Skin', 'Eye Area', 'Hyperpigmentation', 'Large Pores', 'Preventative', 'Redness', 'Sun Damage']
const CATEGORIES: ProductCategory[] = ['Cleansers', 'Toners', 'Moisturizers', 'Eye Care', 'Serums', 'Facial Oils', 'Starter Sets', 'Travel Sets']
const BADGES = ['Best Sellers', 'Sensitive Skin Friendly', 'Professional Favorites']

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i <= rating ? '#4D954C' : 'none'} stroke="#4D954C" strokeWidth="1.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  )
}

function ProductCard({ product, onNavigate }: { product: Product; onNavigate: (page: Page, id?: string) => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="group flex flex-col cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onNavigate('product', product.id)}
    >
      <div className="relative aspect-square bg-ivory overflow-hidden mb-4">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {product.badges.slice(0, 1).map(b => (
          <span key={b} className="absolute top-3 left-3 text-[10px] tracking-widest uppercase px-2 py-1 font-medium"
            style={{ backgroundColor: b === 'Best Seller' ? '#4D954C' : '#252525', color: '#fff' }}>
            {b}
          </span>
        ))}
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={e => e.stopPropagation()} aria-label="Wishlist">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#252525" strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        <div className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <button className="w-full bg-charcoal text-white text-[11px] tracking-widest uppercase py-3 hover:bg-green transition-colors font-medium"
            onClick={e => e.stopPropagation()}>
            Quick Add
          </button>
        </div>
      </div>
      <p className="text-[10px] tracking-widest uppercase text-charcoal/40 mb-0.5">{product.categories[0]}</p>
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="text-sm font-medium text-charcoal leading-snug">{product.name}</h3>
        <span className="text-sm font-semibold text-charcoal whitespace-nowrap">${product.price}</span>
      </div>
      <p className="text-xs text-charcoal/40 mb-2 leading-relaxed">{product.tagline}</p>
      <div className="flex items-center gap-2">
        <StarRating rating={Math.round(product.rating)} />
        <span className="text-[11px] text-charcoal/40">({product.reviews})</span>
      </div>
    </div>
  )
}

function FilterSection({ title, options, selected, onToggle }: {
  title: string
  options: string[]
  selected: string[]
  onToggle: (v: string) => void
}) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b border-gray-soft pb-5 mb-5">
      <button onClick={() => setOpen(v => !v)} className="flex items-center justify-between w-full mb-4">
        <span className="text-xs tracking-widest uppercase text-charcoal font-medium">{title}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="flex flex-col gap-2.5">
          {options.map(o => (
            <label key={o} className="flex items-center gap-3 cursor-pointer group">
              <div
                className="w-4 h-4 border flex items-center justify-center transition-colors"
                style={{ borderColor: selected.includes(o) ? '#4D954C' : '#E8E8E8', backgroundColor: selected.includes(o) ? '#4D954C' : 'transparent' }}
                onClick={() => onToggle(o)}
              >
                {selected.includes(o) && (
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-charcoal/70 group-hover:text-charcoal transition-colors" onClick={() => onToggle(o)}>{o}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ShopPage({ onNavigate }: ShopPageProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBadges, setSelectedBadges] = useState<string[]>([])
  const [sort, setSort] = useState<SortOption>('featured')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const toggle = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val])
  }

  const clearAll = () => {
    setSelectedTypes([])
    setSelectedConcerns([])
    setSelectedCategories([])
    setSelectedBadges([])
  }

  const activeFilterCount = selectedTypes.length + selectedConcerns.length + selectedCategories.length + selectedBadges.length

  const filtered = useMemo(() => {
    let list = [...PRODUCTS]
    if (selectedTypes.length) list = list.filter(p => selectedTypes.some(t => p.skinTypes.includes(t as SkinType)))
    if (selectedConcerns.length) list = list.filter(p => selectedConcerns.some(c => p.concerns.includes(c as SkinConcern)))
    if (selectedCategories.length) list = list.filter(p => selectedCategories.some(c => p.categories.includes(c as ProductCategory)))
    if (selectedBadges.includes('Best Sellers')) list = list.filter(p => p.badges.includes('Best Seller'))
    if (selectedBadges.includes('Sensitive Skin Friendly')) list = list.filter(p => p.skinTypes.includes('Sensitive'))
    if (selectedBadges.includes('Professional Favorites')) list = list.filter(p => p.badges.includes('Professional Favorite'))

    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break
      case 'price-desc': list.sort((a, b) => b.price - a.price); break
      case 'best-selling': list.sort((a, b) => b.reviews - a.reviews); break
      default: break
    }
    return list
  }, [selectedTypes, selectedConcerns, selectedCategories, selectedBadges, sort])

  const allActiveFilters = [
    ...selectedTypes, ...selectedConcerns, ...selectedCategories, ...selectedBadges,
  ]

  const FiltersPanel = () => (
    <div className="font-sans">
      <FilterSection title="Skin Type" options={SKIN_TYPES} selected={selectedTypes} onToggle={v => toggle(selectedTypes, setSelectedTypes, v)} />
      <FilterSection title="Skin Concern" options={SKIN_CONCERNS} selected={selectedConcerns} onToggle={v => toggle(selectedConcerns, setSelectedConcerns, v)} />
      <FilterSection title="Product Category" options={CATEGORIES} selected={selectedCategories} onToggle={v => toggle(selectedCategories, setSelectedCategories, v)} />
      <FilterSection title="Special Filters" options={BADGES} selected={selectedBadges} onToggle={v => toggle(selectedBadges, setSelectedBadges, v)} />
    </div>
  )

  return (
    <div className="bg-ivory min-h-screen font-sans">
      {/* Header */}
      <div className="bg-white border-b border-gray-soft px-5 md:px-8 py-14">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] tracking-[0.3em] uppercase text-green mb-3">The Collection</p>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">Shop Skin Protocol RX</h1>
          <p className="text-charcoal/50 max-w-xl">Find purposeful skincare based on your skin type, primary concern, or preferred product category.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">
        {/* Active filters + controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm text-charcoal/50">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</span>
            {allActiveFilters.map(f => (
              <button
                key={f}
                onClick={() => {
                  toggle(selectedTypes, setSelectedTypes, f)
                  toggle(selectedConcerns, setSelectedConcerns, f)
                  toggle(selectedCategories, setSelectedCategories, f)
                  toggle(selectedBadges, setSelectedBadges, f)
                }}
                className="flex items-center gap-1.5 bg-white border border-gray-soft px-3 py-1 text-xs text-charcoal hover:border-charcoal transition-colors"
              >
                {f}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            ))}
            {activeFilterCount > 0 && (
              <button onClick={clearAll} className="text-xs text-charcoal/40 underline underline-offset-2 hover:text-charcoal transition-colors">
                Clear all
              </button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden flex items-center gap-2 border border-gray-soft bg-white px-4 py-2 text-sm text-charcoal"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
            </button>
            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortOption)}
              className="border border-gray-soft bg-white px-4 py-2 text-sm text-charcoal focus:outline-none focus:border-green"
            >
              <option value="featured">Sort: Featured</option>
              <option value="best-selling">Best Selling</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex gap-10">
          {/* Sidebar filters — desktop */}
          <aside className="hidden lg:block w-60 shrink-0">
            <FiltersPanel />
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-serif text-2xl text-charcoal/40 mb-4">No products match your filters</p>
                <button onClick={clearAll} className="text-sm text-green underline underline-offset-2">Clear all filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
                {filtered.map(p => (
                  <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white max-h-[85vh] overflow-y-auto rounded-t-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold tracking-widest uppercase text-charcoal">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <FiltersPanel />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full bg-charcoal text-white py-3.5 text-sm font-medium mt-4"
            >
              Show {filtered.length} Products
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
