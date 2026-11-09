import { useEffect, useMemo, useState } from 'react'
import { PRODUCTS, PRODUCT_PROTOCOL_STEPS, getProtocolStepLabel, getProtocolStepFromParam, type Product, type SkinType, type SkinConcern, type ProductCategory } from '../../data'
import ProductImage from '../../v2/components/ProductImage'

const ROSE = '#ab8584'
const INK = '#2B2727'
const LINE = '#D6C3C2'
const PAPER = '#fffdfa'

type SortOption = 'featured' | 'protocol-step' | 'protocol-step-desc' | 'best-selling' | 'newest' | 'price-asc' | 'price-desc'

const SKIN_TYPES: SkinType[] = ['Combination', 'Dry', 'Normal', 'Oily', 'Sensitive']
const SKIN_CONCERNS: SkinConcern[] = ['Acne', 'Aging', 'Brightening', 'Dry Skin', 'Eye Area', 'Hyperpigmentation', 'Large Pores', 'Preventative', 'Redness', 'Sun Damage']
const CATEGORIES: ProductCategory[] = ['Cleansers', 'Toners', 'Moisturizers', 'Eye Care', 'Serums', 'Facial Oils']
const PROTOCOL_STEP_OPTIONS = PRODUCT_PROTOCOL_STEPS.map(s => `Step ${s.step} · ${s.name}`)
const BADGES = ['Best Sellers', 'Sensitive Skin Friendly', 'Professional Favorites']

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i <= rating ? ROSE : 'none'} stroke={ROSE} strokeWidth="1.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  )
}

function ProductCard({ product, onViewProduct }: { product: Product; onViewProduct: (id: string) => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="group flex cursor-pointer flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onViewProduct(product.id)}
    >
      <div className="relative mb-4">
        <ProductImage src={product.image} alt={product.name} hover className="!bg-[#fffdfa]" />
        {product.badges.slice(0, 1).map(b => (
          <span key={b} className="absolute top-3 left-3 border border-[#ab8584]/40 bg-[#f3eceb]/90 px-2 py-1 text-[10px] font-medium tracking-widest uppercase text-[#ab8584]">
            {b}
          </span>
        ))}
        <button
          type="button"
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center bg-[#fffdfa]/90 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={e => e.stopPropagation()}
          aria-label="Wishlist"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        <div className={`absolute right-0 bottom-0 left-0 transition-all duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <button
            type="button"
            className="w-full bg-[#ab8584] py-3 text-[11px] font-medium tracking-widest uppercase text-[#fffdfa] transition-colors hover:bg-[#2B2727]"
            onClick={e => e.stopPropagation()}
          >
            Quick Add
          </button>
        </div>
      </div>
      <p className="mb-1 text-[11px] tracking-[0.16em] uppercase text-[#ab8584]">{getProtocolStepLabel(product.protocolStep)}</p>
      <div className="mb-1 flex items-start justify-between gap-2">
        <h3 className="text-base leading-snug font-medium text-[#2B2727]">{product.name}</h3>
        <span className="text-base font-semibold whitespace-nowrap text-[#2B2727]">${product.price}</span>
      </div>
      <p className="mb-2 text-sm leading-relaxed text-[#2B2727]/75">{product.tagline}</p>
      <div className="flex items-center gap-2">
        <StarRating rating={Math.round(product.rating)} />
        <span className="text-[11px] text-[#2B2727]/40">({product.reviews})</span>
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
    <div className="mb-5 border-b border-[#D6C3C2] pb-5">
      <button type="button" onClick={() => setOpen(v => !v)} className="mb-4 flex w-full items-center justify-between">
        <span className="text-xs font-medium tracking-widest uppercase text-[#2B2727]">{title}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="flex flex-col gap-2.5">
          {options.map(o => (
            <label key={o} className="group flex cursor-pointer items-center gap-3">
              <div
                className="flex h-4 w-4 items-center justify-center border transition-colors"
                style={{ borderColor: selected.includes(o) ? ROSE : LINE, backgroundColor: selected.includes(o) ? ROSE : 'transparent' }}
                onClick={() => onToggle(o)}
              >
                {selected.includes(o) && (
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={PAPER} strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-[#2B2727]/70 transition-colors group-hover:text-[#2B2727]" onClick={() => onToggle(o)}>{o}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

function stepFilterFromParam(param?: string) {
  const step = getProtocolStepFromParam(param || '')
  return step ? [getProtocolStepLabel(step)] : []
}

export default function ShopPage({
  initialStep,
  onViewProduct,
}: {
  initialStep?: string
  onViewProduct: (id: string) => void
}) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSteps, setSelectedSteps] = useState<string[]>(() => stepFilterFromParam(initialStep))
  const [selectedBadges, setSelectedBadges] = useState<string[]>([])
  const [sort, setSort] = useState<SortOption>('protocol-step')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  useEffect(() => {
    setSelectedSteps(stepFilterFromParam(initialStep))
  }, [initialStep])

  const toggle = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val])
  }

  const clearAll = () => {
    setSelectedTypes([])
    setSelectedConcerns([])
    setSelectedCategories([])
    setSelectedSteps([])
    setSelectedBadges([])
  }

  const activeFilterCount = selectedTypes.length + selectedConcerns.length + selectedCategories.length + selectedSteps.length + selectedBadges.length

  const filtered = useMemo(() => {
    let list = [...PRODUCTS]
    if (selectedTypes.length) list = list.filter(p => selectedTypes.some(t => p.skinTypes.includes(t as SkinType)))
    if (selectedConcerns.length) list = list.filter(p => selectedConcerns.some(c => p.concerns.includes(c as SkinConcern)))
    if (selectedCategories.length) list = list.filter(p => selectedCategories.some(c => p.categories.includes(c as ProductCategory)))
    if (selectedSteps.length) {
      list = list.filter(p => selectedSteps.includes(getProtocolStepLabel(p.protocolStep)))
    }
    if (selectedBadges.includes('Best Sellers')) list = list.filter(p => p.badges.includes('Best Seller'))
    if (selectedBadges.includes('Sensitive Skin Friendly')) list = list.filter(p => p.skinTypes.includes('Sensitive'))
    if (selectedBadges.includes('Professional Favorites')) list = list.filter(p => p.badges.includes('Professional Favorite'))

    switch (sort) {
      case 'protocol-step':
        list.sort((a, b) => a.protocolStep - b.protocolStep || a.name.localeCompare(b.name))
        break
      case 'protocol-step-desc':
        list.sort((a, b) => b.protocolStep - a.protocolStep || a.name.localeCompare(b.name))
        break
      case 'price-asc': list.sort((a, b) => a.price - b.price); break
      case 'price-desc': list.sort((a, b) => b.price - a.price); break
      case 'best-selling': list.sort((a, b) => b.reviews - a.reviews); break
      case 'newest': list.sort((a, b) => b.reviews - a.reviews); break
      default: break
    }
    return list
  }, [selectedTypes, selectedConcerns, selectedCategories, selectedSteps, selectedBadges, sort])

  const allActiveFilters = [
    ...selectedTypes, ...selectedConcerns, ...selectedCategories, ...selectedSteps, ...selectedBadges,
  ]

  const FiltersPanel = () => (
    <div className="font-sans">
      <FilterSection title="Protocol Step" options={PROTOCOL_STEP_OPTIONS} selected={selectedSteps} onToggle={v => toggle(selectedSteps, setSelectedSteps, v)} />
      <FilterSection title="Skin Type" options={SKIN_TYPES} selected={selectedTypes} onToggle={v => toggle(selectedTypes, setSelectedTypes, v)} />
      <FilterSection title="Skin Concern" options={SKIN_CONCERNS} selected={selectedConcerns} onToggle={v => toggle(selectedConcerns, setSelectedConcerns, v)} />
      <FilterSection title="Product Category" options={CATEGORIES} selected={selectedCategories} onToggle={v => toggle(selectedCategories, setSelectedCategories, v)} />
      <FilterSection title="Special Filters" options={BADGES} selected={selectedBadges} onToggle={v => toggle(selectedBadges, setSelectedBadges, v)} />
    </div>
  )

  return (
    <div className="shop-ground min-h-screen bg-[#FFFDFA] font-sans text-[#2B2727]">
      <div className="shop-ground border-b border-[#D6C3C2] bg-[#FFFDFA] px-5 pt-14 pb-8 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-[11px] tracking-[0.22em] uppercase text-[#ab8584]">The Natural Prescription</p>
          <h1 className="mb-4 font-serif text-4xl text-[#2B2727] md:text-5xl">Explore the Collection</h1>
          <p className="max-w-xl text-base text-[#2B2727]/85">Find the formulas that fit your skin. Each one has a clear job in a simple routine.</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-[#2B2727]/50">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</span>
            {allActiveFilters.map(f => (
              <button
                key={f}
                type="button"
                onClick={() => {
                  toggle(selectedTypes, setSelectedTypes, f)
                  toggle(selectedConcerns, setSelectedConcerns, f)
                  toggle(selectedCategories, setSelectedCategories, f)
                  toggle(selectedSteps, setSelectedSteps, f)
                  toggle(selectedBadges, setSelectedBadges, f)
                }}
                className="flex items-center gap-1.5 border border-[#D6C3C2] bg-[#fffdfa] px-3 py-1 text-xs text-[#2B2727] transition-colors hover:border-[#2B2727]"
              >
                {f}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            ))}
            {activeFilterCount > 0 && (
              <button type="button" onClick={clearAll} className="text-xs text-[#2B2727]/40 underline underline-offset-2 transition-colors hover:text-[#2B2727]">
                Clear all
              </button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex items-center gap-2 border border-[#D6C3C2] bg-[#fffdfa] px-4 py-2 text-sm text-[#2B2727] lg:hidden"
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
              className="border border-[#D6C3C2] bg-[#fffdfa] px-4 py-2 text-sm text-[#2B2727] focus:border-[#ab8584] focus:outline-none"
            >
              <option value="protocol-step">Protocol Step: 1–6</option>
              <option value="protocol-step-desc">Protocol Step: 6–1</option>
              <option value="featured">Sort: Featured</option>
              <option value="best-selling">Best Selling</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex gap-10">
          <aside className="hidden w-60 shrink-0 lg:block">
            <FiltersPanel />
          </aside>

          <div className="min-w-0 flex-1">
            {filtered.length === 0 ? (
              <div className="py-24 text-center">
                <p className="mb-4 font-serif text-2xl text-[#2B2727]/40">No products match your filters</p>
                <button type="button" onClick={clearAll} className="text-xs text-[#ab8584] underline underline-offset-2">Clear all filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-7">
                {filtered.map(p => (
                  <ProductCard key={p.id} product={p} onViewProduct={onViewProduct} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 bottom-0 left-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-[#fffdfa] p-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-widest uppercase text-[#2B2727]">Filters</h3>
              <button type="button" onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <FiltersPanel />
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-4 w-full bg-[#ab8584] px-7 py-3.5 text-sm font-medium text-[#fffdfa] transition-colors hover:bg-[#2B2727]"
            >
              Show {filtered.length} Products
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
