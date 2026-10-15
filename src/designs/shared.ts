import { PRODUCTS, PROTOCOL_STEP_META, getProtocolStepLabel, type Product } from '../data'

export type DesignId = 'clear' | 'grove' | 'boutique' | 'luxe' | 'ritual'
export const DESIGN_IDS: DesignId[] = ['clear', 'grove', 'boutique', 'luxe', 'ritual']

export function isDesignId(value: string): value is DesignId {
  return (DESIGN_IDS as string[]).includes(value)
}
export type GalleryTarget = 'original' | 'rose' | 'protocol' | DesignId
export type DesignPage = 'home' | 'shop' | 'product'
export type DesignNavigate = (page: DesignPage, id?: string) => void

export const SHOP_STEPS = PROTOCOL_STEP_META.filter(step => step.productBacked !== false)

export function pickProducts(ids: string[]): Product[] {
  return ids.map(id => PRODUCTS.find(product => product.id === id)).filter((product): product is Product => Boolean(product))
}

export function stepLabel(step: Product['protocolStep']) {
  return getProtocolStepLabel(step)
}

export function relatedProducts(product: Product, count = 3): Product[] {
  const others = PRODUCTS.filter(item => item.id !== product.id)
  const same = others.filter(item => item.protocolStep === product.protocolStep)
  const rest = others.filter(item => item.protocolStep !== product.protocolStep)
  return [...same, ...rest].slice(0, count)
}

export const QUOTES = [
  {
    name: 'Rachel M.',
    role: 'Client',
    text: 'The Hyaluronic Acid Serum changed my morning. My skin still feels comfortable at midday.',
  },
  {
    name: 'Maria L., LE',
    role: 'Skin studio',
    text: 'Clients keep the routine between appointments because each bottle has a clear job.',
  },
  {
    name: 'Danielle K.',
    role: 'Client',
    text: 'Brighten and Glow C Serum is the first vitamin C I have stayed with.',
  },
]

export const CLEAR_ROWS = [
  'clarifying-cleanser',
  'rosewater-niacinamide-toner',
  'hyaluronic-acid-serum',
  'brighten-glow-c-20',
  'rich-barrier-cream',
  'the-holy-grail',
]

export const GROVE_FEATURES = ['hyaluronic-acid-serum', 'rich-barrier-cream']
export const GROVE_MORE = ['clarifying-cleanser', 'brighten-glow-c-20', 'the-holy-grail']
export const FOUNDERS = [
  {
    name: 'Linda D. Amend, MS',
    role: 'Chemist',
    blurb: 'Decades of ingredient development. She watches stability, delivery, and whether a formula will still perform on the last day of the bottle.',
    image: '/original/founder-linda.jpg',
    alt: 'Linda D. Amend, MS, chemist and co-founder of Skin Protocol RX',
  },
  {
    name: 'Susanna Amend, NP',
    role: 'Nurse Practitioner',
    blurb: 'She sees how skin actually responds, then brings that back to the formula. The product has to work on a real face, not only on a label.',
    image: '/original/founder-susanna.jpg',
    alt: 'Susanna Amend, NP, nurse practitioner and co-founder of Skin Protocol RX',
  },
  {
    name: 'Christina Corbin, LME',
    role: 'Licensed Medical Esthetician',
    blurb: 'She refines texture, tolerance, and the feel of a treatment. If a client will not keep using it at home, it does not belong in the line.',
    image: '/original/founder-christina.jpg',
    alt: 'Christina Corbin, LME, licensed medical esthetician and co-founder of Skin Protocol RX',
  },
]

export const KEPT = [
  'Clinically relevant actives',
  'Intentional concentrations',
  'Formulas balanced for daily use',
  'Ingredients that do more than one quiet job',
  'Decisions made for skin over years, not a season',
]

export const LEFT_OUT = [
  'Overloaded ingredient lists',
  'Redundant actives',
  'Trend-driven formulas',
  'Fillers with nothing to do',
  'Fragrance added only to smell expensive',
]

export const BELIEFS = [
  'Skin is a biological system, not a trend.',
  'Precision outperforms excess.',
  'Long-term skin health matters more than a quick thrill.',
  'Every ingredient has to earn its place.',
]

export const CONCERN_PRODUCT: Record<string, string> = {
  aging: 'amino-acid-serum',
  brightening: 'brighten-glow-c-20',
  hyperpigmentation: 'brighten-glow-c-20',
  'large-pores': 'tripleglow-exfoliating-cleanser',
  preventative: 'hyaluronic-acid-serum',
  'sun-damage': 'brighten-glow-c-20',
  acne: 'clarifying-gel-cleanser',
  'dry-skin': 'rich-barrier-cream',
  redness: 'clarifying-cleanser',
  'eye-area': 'eye-cream',
}

export function focusProduct(concernId: string): Product {
  const id = CONCERN_PRODUCT[concernId] || 'hyaluronic-acid-serum'
  return PRODUCTS.find(product => product.id === id) || PRODUCTS[0]
}

export const CLIENT_NOTES = [
  { name: 'Rachel M.', place: 'New York, NY', text: 'The Hyaluronic Acid Serum changed my morning routine completely. My skin has never felt this hydrated by midday.' },
  { name: 'Danielle K.', place: 'Brooklyn, NY', text: 'I was hesitant to try a 20% vitamin C, but Brighten & Glow C Serum has been a game changer for my hyperpigmentation.' },
  { name: 'Sophia T.', place: 'Los Angeles, CA', text: 'Simple, effective products that do exactly what they say. I love that there are no unnecessary extras.' },
]

export const STUDIO_NOTES = [
  { name: 'Maria L., LE', place: 'NYC Skin Studio', text: 'My clients love being able to continue their protocol at home. The results speak for themselves between appointments.' },
  { name: 'Dr. Jennifer S.', place: 'Park Avenue Dermatology', text: 'Skin Protocol RX has made product recommendations simpler. Clients actually follow through because the routine is clear.' },
  { name: 'Aisha C., LE', place: 'Tribeca Wellness Spa', text: 'The ingredient quality is on par with clinical lines, but at a price point my clients are genuinely comfortable with.' },
]
