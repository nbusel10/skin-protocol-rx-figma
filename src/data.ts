export type SkinType = 'Combination' | 'Dry' | 'Normal' | 'Oily' | 'Sensitive'
export type SkinConcern =
  | 'Acne'
  | 'Aging'
  | 'Brightening'
  | 'Dry Skin'
  | 'Eye Area'
  | 'Hyperpigmentation'
  | 'Large Pores'
  | 'Preventative'
  | 'Redness'
  | 'Sun Damage'

export type ProductCategory =
  | 'Cleansers'
  | 'Toners'
  | 'Moisturizers'
  | 'Eye Care'
  | 'Serums'
  | 'Facial Oils'
  | 'Starter Sets'
  | 'Travel Sets'

export interface Product {
  id: string
  name: string
  tagline: string
  price: number
  size: string
  categories: ProductCategory[]
  skinTypes: SkinType[]
  concerns: SkinConcern[]
  badges: string[]
  rating: number
  reviews: number
  image: string
  description: string
  benefits: string[]
  howToUse: string
  keyIngredients: { name: string; benefit: string }[]
}

export const PRODUCTS: Product[] = [
  {
    id: 'advanced-c-serum-20',
    name: 'Advanced C Serum 20%',
    tagline: 'Potent vitamin C for visible brightening',
    price: 89,
    size: '1 oz / 30 ml',
    categories: ['Serums'],
    skinTypes: ['Combination', 'Dry', 'Normal', 'Oily'],
    concerns: ['Aging', 'Brightening', 'Hyperpigmentation', 'Large Pores', 'Preventative', 'Sun Damage'],
    badges: ['Best Seller', 'Professional Favorite'],
    rating: 4.9,
    reviews: 284,
    image: 'https://images.unsplash.com/photo-1665763630810-e6251bdd392d?w=800&h=800&fit=crop&auto=format',
    description: 'A potent 20% vitamin C formula for experienced users seeking advanced brightening and antioxidant support.',
    benefits: ['Visibly brightens and evens skin tone', 'Supports collagen synthesis', 'Protects against environmental stressors', 'Reduces appearance of dark spots'],
    howToUse: 'Apply 3–5 drops to clean, dry skin in the morning before moisturizer and SPF. Introduce gradually if new to vitamin C.',
    keyIngredients: [
      { name: 'L-Ascorbic Acid 20%', benefit: 'Potent antioxidant that brightens and protects' },
      { name: 'Ferulic Acid', benefit: 'Stabilizes vitamin C and boosts efficacy' },
      { name: 'Vitamin E', benefit: 'Nourishes and supports skin barrier' },
    ],
  },
  {
    id: 'vitamin-c-serum-5',
    name: 'Vitamin C Serum 5%',
    tagline: 'Gentle daily antioxidant for sensitive skin',
    price: 72,
    size: '1 oz / 30 ml',
    categories: ['Serums'],
    skinTypes: ['Combination', 'Dry', 'Normal', 'Oily', 'Sensitive'],
    concerns: ['Acne', 'Aging', 'Brightening', 'Hyperpigmentation', 'Large Pores', 'Preventative', 'Redness', 'Sun Damage'],
    badges: ['Sensitive Skin'],
    rating: 4.8,
    reviews: 197,
    image: 'https://images.unsplash.com/photo-1748543668709-793b38a2810d?w=800&h=800&fit=crop&auto=format',
    description: 'A gentler vitamin C entry point for daily antioxidant protection and gradual brightening.',
    benefits: ['Gentle introduction to vitamin C', 'Daily antioxidant defense', 'Supports brighter, more even tone', 'Suitable for sensitive skin types'],
    howToUse: 'Apply 3–5 drops to clean skin morning and evening before moisturizer.',
    keyIngredients: [
      { name: 'L-Ascorbic Acid 5%', benefit: 'Brightening antioxidant at a gentle concentration' },
      { name: 'Hyaluronic Acid', benefit: 'Draws moisture into skin' },
      { name: 'Niacinamide', benefit: 'Supports barrier and minimizes pores' },
    ],
  },
  {
    id: 'clarifying-cleanser',
    name: 'Clarifying Cleanser',
    tagline: 'A thorough daily cleanse that never strips',
    price: 48,
    size: '8 oz / 240 ml',
    categories: ['Cleansers'],
    skinTypes: ['Combination', 'Dry', 'Normal', 'Oily', 'Sensitive'],
    concerns: ['Acne', 'Aging', 'Brightening', 'Dry Skin', 'Eye Area', 'Hyperpigmentation', 'Large Pores', 'Preventative', 'Redness', 'Sun Damage'],
    badges: ['Best Seller'],
    rating: 4.7,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1782687633966-1ceb2a3fdf0f?w=800&h=800&fit=crop&auto=format',
    description: 'A daily cleanser that removes impurities, excess oil, and traces of SPF while preparing skin for the rest of the protocol.',
    benefits: ['Removes impurities without stripping', 'Prepares skin for serums and treatment steps', 'Suitable for morning and evening use', 'Gentle enough for all skin types'],
    howToUse: 'Massage onto damp skin for 30–60 seconds. Rinse thoroughly with warm water.',
    keyIngredients: [
      { name: 'Glycerin', benefit: 'Humectant that maintains moisture during cleansing' },
      { name: 'Salicylic Acid', benefit: 'Gently exfoliates and clears pores' },
      { name: 'Aloe Vera', benefit: 'Soothes and calms after cleansing' },
    ],
  },
  {
    id: 'toner',
    name: 'Toner',
    tagline: 'The balancing step between cleanse and treat',
    price: 52,
    size: '4 oz / 120 ml',
    categories: ['Toners'],
    skinTypes: ['Combination', 'Dry', 'Normal', 'Oily', 'Sensitive'],
    concerns: ['Acne', 'Aging', 'Brightening', 'Dry Skin', 'Eye Area', 'Hyperpigmentation', 'Large Pores', 'Preventative', 'Redness', 'Sun Damage'],
    badges: [],
    rating: 4.6,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1679394270597-e90694d70350?w=800&h=800&fit=crop&auto=format',
    description: 'Balances pH and primes skin to absorb serums and treatments more effectively.',
    benefits: ['Restores skin pH after cleansing', 'Primes for better serum absorption', 'Hydrates and refreshes', 'Suitable for all skin types'],
    howToUse: 'Apply to a cotton pad or pour into palms and press into clean skin after cleansing.',
    keyIngredients: [
      { name: 'Witch Hazel', benefit: 'Tones and minimizes pore appearance' },
      { name: 'Rose Water', benefit: 'Soothes and softens' },
      { name: 'Panthenol', benefit: 'Conditions and supports hydration' },
    ],
  },
  {
    id: 'firming-moisturizer',
    name: 'Firming Moisturizer',
    tagline: 'Daily hydration with a firming focus',
    price: 68,
    size: '2 oz / 60 ml',
    categories: ['Moisturizers'],
    skinTypes: ['Combination', 'Dry', 'Normal', 'Oily', 'Sensitive'],
    concerns: ['Aging', 'Brightening', 'Dry Skin', 'Eye Area', 'Hyperpigmentation', 'Large Pores', 'Preventative', 'Redness', 'Sun Damage'],
    badges: ['Best Seller', 'Professional Favorite'],
    rating: 4.8,
    reviews: 241,
    image: 'https://images.unsplash.com/photo-1772191530787-b9546da02fbc?w=800&h=800&fit=crop&auto=format',
    description: 'A daily moisturizer that supports hydration, softness, and firmer-looking skin over time.',
    benefits: ['Deeply hydrates and nourishes', 'Supports firmer, more resilient skin', 'Absorbs quickly without greasiness', 'Works morning and evening'],
    howToUse: 'Apply a pea-sized amount to face and neck after serum steps, morning and evening.',
    keyIngredients: [
      { name: 'Peptide Complex', benefit: 'Supports skin structure and elasticity' },
      { name: 'Ceramides', benefit: 'Reinforces the skin barrier' },
      { name: 'Squalane', benefit: 'Lightweight moisture that mimics skin lipids' },
    ],
  },
  {
    id: 'hyaluronic-acid-serum',
    name: 'Hyaluronic Acid Serum',
    tagline: 'Universal hydration for every skin type',
    price: 64,
    size: '1 oz / 30 ml',
    categories: ['Serums'],
    skinTypes: ['Combination', 'Dry', 'Normal', 'Oily', 'Sensitive'],
    concerns: ['Acne', 'Aging', 'Brightening', 'Dry Skin', 'Eye Area', 'Hyperpigmentation', 'Large Pores', 'Preventative', 'Redness', 'Sun Damage'],
    badges: ['Best Seller', 'Sensitive Skin'],
    rating: 4.9,
    reviews: 398,
    image: 'https://images.unsplash.com/photo-1748543668687-624e058c367c?w=800&h=800&fit=crop&auto=format',
    description: 'A lightweight, universal hydration serum that helps skin look smoother, softer, and more refreshed.',
    benefits: ['Delivers deep, multi-layer hydration', 'Plumps and smooths appearance', 'Lightweight and layerable', 'Works for every skin type'],
    howToUse: 'Apply 3–5 drops to damp skin morning and evening before moisturizer.',
    keyIngredients: [
      { name: 'Multi-Molecular Hyaluronic Acid', benefit: 'Hydrates at multiple depths within skin' },
      { name: 'Glycerin', benefit: 'Draws moisture and locks it in' },
      { name: 'Panthenol', benefit: 'Conditions and soothes' },
    ],
  },
  {
    id: 'eye-cream',
    name: 'Eye Cream',
    tagline: 'Focused care for the delicate eye area',
    price: 78,
    size: '0.5 oz / 15 ml',
    categories: ['Eye Care', 'Moisturizers'],
    skinTypes: ['Combination', 'Dry', 'Normal', 'Oily', 'Sensitive'],
    concerns: ['Aging', 'Brightening', 'Dry Skin', 'Eye Area', 'Hyperpigmentation', 'Preventative', 'Sun Damage'],
    badges: ['Professional Favorite'],
    rating: 4.7,
    reviews: 143,
    image: 'https://images.unsplash.com/photo-1770048792338-aaf6a575305f?w=800&h=800&fit=crop&auto=format',
    description: 'Formulated for the delicate skin around the eye area to support hydration, firmness, and a refreshed appearance.',
    benefits: ['Hydrates the delicate eye area', 'Supports firmer-looking skin around eyes', 'Gentle formula for sensitive skin', 'Reduces appearance of fine lines'],
    howToUse: 'Apply a small amount around the orbital bone using your ring finger morning and evening.',
    keyIngredients: [
      { name: 'Peptides', benefit: 'Target fine lines and support firmness' },
      { name: 'Caffeine', benefit: 'Temporarily de-puffs and refreshes' },
      { name: 'Hyaluronic Acid', benefit: 'Hydrates the thin skin around eyes' },
    ],
  },
  {
    id: 'amino-acid-serum',
    name: 'Amino Acid Serum',
    tagline: 'Barrier support for healthy-looking texture',
    price: 74,
    size: '1 oz / 30 ml',
    categories: ['Serums'],
    skinTypes: ['Combination', 'Dry', 'Normal', 'Oily', 'Sensitive'],
    concerns: ['Acne', 'Aging', 'Brightening', 'Dry Skin', 'Eye Area', 'Hyperpigmentation', 'Large Pores', 'Preventative', 'Redness', 'Sun Damage'],
    badges: ['Sensitive Skin'],
    rating: 4.6,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1748543668646-e81cda0890f3?w=800&h=800&fit=crop&auto=format',
    description: 'A supportive serum for healthy-looking texture, hydration, and overall skin resilience.',
    benefits: ['Strengthens the skin barrier', 'Supports healthy skin texture', 'Calms and soothes reactive skin', 'Lightweight and non-occlusive'],
    howToUse: 'Apply to clean skin before heavier serums or moisturizer. Morning and evening.',
    keyIngredients: [
      { name: 'Amino Acid Complex', benefit: 'Building blocks that support skin structure' },
      { name: 'Niacinamide', benefit: 'Brightens and minimizes pores' },
      { name: 'Allantoin', benefit: 'Soothes and softens' },
    ],
  },
  {
    id: 'squalane-oil',
    name: 'The Holy Grail — Squalane Oil',
    tagline: 'Lightweight finishing oil for every skin type',
    price: 82,
    size: '1 oz / 30 ml',
    categories: ['Facial Oils'],
    skinTypes: ['Combination', 'Dry', 'Normal', 'Oily', 'Sensitive'],
    concerns: ['Acne', 'Aging', 'Brightening', 'Dry Skin', 'Eye Area', 'Hyperpigmentation', 'Large Pores', 'Preventative', 'Redness', 'Sun Damage'],
    badges: ['Best Seller', 'Professional Favorite'],
    rating: 4.9,
    reviews: 329,
    image: 'https://images.unsplash.com/photo-1782687493430-228efc6a7d37?w=800&h=800&fit=crop&auto=format',
    description: 'A lightweight, non-comedogenic finishing oil that seals in hydration and leaves skin looking soft, smooth, and healthy.',
    benefits: ['Seals in moisture without clogging pores', 'Leaves skin soft and smooth', 'Non-comedogenic for all skin types', 'Suitable as AM or PM finishing step'],
    howToUse: 'Warm 2–3 drops in palms and press into skin as a final step, morning or evening.',
    keyIngredients: [
      { name: 'Plant-Derived Squalane', benefit: 'Mimics skin lipids for seamless hydration' },
      { name: 'Jojoba Ester', benefit: 'Balances and conditions' },
      { name: 'Vitamin E', benefit: 'Antioxidant that protects and nourishes' },
    ],
  },
  {
    id: 'the-trio',
    name: 'The Trio',
    tagline: 'A focused three-product starter protocol',
    price: 189,
    size: 'Set of 3',
    categories: ['Starter Sets'],
    skinTypes: ['Combination', 'Dry', 'Normal', 'Oily'],
    concerns: ['Aging', 'Brightening', 'Hyperpigmentation', 'Large Pores', 'Preventative', 'Sun Damage'],
    badges: ['Best Seller'],
    rating: 4.9,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1782687529451-502c24091a0c?w=800&h=800&fit=crop&auto=format',
    description: 'A curated three-product introduction to Skin Protocol RX — designed for customers beginning a targeted brightening and aging protocol.',
    benefits: ['Includes Clarifying Cleanser, Advanced C Serum, and Firming Moisturizer', 'Covers cleanse, treat, and hydrate steps', 'Ideal for aging and brightening concerns', 'Save compared to individual purchases'],
    howToUse: 'Use products in the order listed: Cleanse, Serum, Moisturize.',
    keyIngredients: [
      { name: 'Vitamin C 20%', benefit: 'Brightening and antioxidant protection' },
      { name: 'Peptide Complex', benefit: 'Supports firmness and elasticity' },
      { name: 'Salicylic Acid', benefit: 'Clarifies and refines' },
    ],
  },
  {
    id: 'essential-protocol',
    name: 'The Essential Protocol',
    tagline: 'Your complete foundational skincare routine',
    price: 279,
    size: 'Set of 5',
    categories: ['Starter Sets'],
    skinTypes: ['Combination', 'Dry', 'Normal', 'Oily', 'Sensitive'],
    concerns: ['Aging', 'Brightening', 'Dry Skin', 'Eye Area', 'Hyperpigmentation', 'Large Pores', 'Preventative', 'Redness', 'Sun Damage'],
    badges: ['Best Seller', 'Professional Favorite'],
    rating: 5.0,
    reviews: 94,
    image: 'https://images.unsplash.com/photo-1626897844971-aef92643f056?w=800&h=800&fit=crop&auto=format',
    description: 'A complete foundational routine that simplifies daily skincare into five purposeful steps.',
    benefits: ['Complete morning and evening protocol', 'Covers all five protocol steps', 'Significant savings vs. individual products', 'Suitable for most skin types and concerns'],
    howToUse: 'Follow the included protocol card for morning and evening routine guidance.',
    keyIngredients: [
      { name: 'Multi-Molecular Hyaluronic Acid', benefit: 'Deep hydration at every layer' },
      { name: 'Peptide Complex', benefit: 'Supports structure and firmness' },
      { name: 'Vitamin C', benefit: 'Brightening antioxidant protection' },
    ],
  },
]

export const SKIN_CONCERNS = [
  { id: 'aging', label: 'Aging', icon: '✦', description: 'Target fine lines, loss of firmness, and skin texture' },
  { id: 'brightening', label: 'Brightening', icon: '◈', description: 'Even tone and restore a luminous, healthy glow' },
  { id: 'hyperpigmentation', label: 'Hyperpigmentation', icon: '▣', description: 'Reduce dark spots and uneven skin discoloration' },
  { id: 'large-pores', label: 'Large Pores', icon: '◉', description: 'Minimize pore appearance for smoother-looking skin' },
  { id: 'preventative', label: 'Preventative Care', icon: '◇', description: 'Protect skin health before concerns develop' },
  { id: 'sun-damage', label: 'Sun Damage', icon: '◎', description: 'Address the visible effects of UV exposure' },
  { id: 'acne', label: 'Acne', icon: '○', description: 'Clarify and support clearer-looking skin' },
  { id: 'dry-skin', label: 'Dry Skin', icon: '◐', description: 'Restore softness, comfort, and lasting hydration' },
  { id: 'redness', label: 'Redness', icon: '◑', description: 'Calm and soothe reactive, sensitized skin' },
  { id: 'eye-area', label: 'Eye Area', icon: '◔', description: 'Targeted care for the delicate skin around eyes' },
]

export const PROTOCOL_STEPS = [
  { step: 1, name: 'Cleanse', products: ['clarifying-cleanser'], description: 'Remove impurities and prepare skin' },
  { step: 2, name: 'Tone', products: ['toner'], description: 'Balance pH and prime for treatment' },
  { step: 3, name: 'Repair', products: ['amino-acid-serum', 'vitamin-c-serum-5', 'advanced-c-serum-20'], description: 'Target specific skin concerns' },
  { step: 4, name: 'Restore', products: ['hyaluronic-acid-serum'], description: 'Replenish hydration' },
  { step: 5, name: 'Moisturize', products: ['firming-moisturizer', 'eye-cream'], description: 'Seal in moisture and support skin barrier' },
  { step: 6, name: 'Nourish', products: ['squalane-oil'], description: 'Finish and lock in the protocol' },
]
