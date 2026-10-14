import { useMemo, useState } from 'react'
import { PRODUCTS } from '../../data'
import { SHOP_STEPS, stepLabel, type DesignNavigate } from '../shared'

interface ShopPageProps {
  onNavigate: DesignNavigate
}

export default function ShopPage({ onNavigate }: ShopPageProps) {
  const [step, setStep] = useState<number | 'all'>('all')
  const items = useMemo(
    () => (step === 'all' ? PRODUCTS : PRODUCTS.filter(product => product.protocolStep === step)),
    [step],
  )

  return (
    <div>
      <p className="text-[11px] font-semibold tracking-[0.18em] text-[#B88E91] uppercase">Collection</p>
      <h1 className="mt-2 font-serif text-4xl tracking-[-0.03em]">The formulas</h1>
      <div className="mt-6 flex flex-wrap gap-2">
        <button type="button" onClick={() => setStep('all')} className={`min-h-11 px-4 text-sm ${step === 'all' ? 'bg-[#45403F] text-white' : 'bg-[#F3EEE7]'}`}>All</button>
        {SHOP_STEPS.map(item => (
          <button key={item.step} type="button" onClick={() => setStep(item.step)} className={`min-h-11 px-4 text-sm ${step === item.step ? 'bg-[#45403F] text-white' : 'bg-[#F3EEE7]'}`}>
            {item.name}
          </button>
        ))}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        {items.map(product => (
          <button key={product.id} type="button" onClick={() => onNavigate('product', product.id)} className="text-left">
            <span className="flex aspect-[4/5] items-center justify-center bg-[#F3EEE7] p-4">
              <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
            </span>
            <span className="mt-3 block text-[11px] font-semibold tracking-[0.14em] text-[#B88E91] uppercase">{stepLabel(product.protocolStep)}</span>
            <span className="mt-1 block font-medium leading-snug">{product.name}</span>
            <span className="mt-1 block text-sm tabular-nums">${product.price}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
