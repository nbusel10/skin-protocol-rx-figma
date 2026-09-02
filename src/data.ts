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
  fullIngredients: string[]
}

/** Reference product shot for client visualization — Rosewater Niacinamide Toner */
export const PRODUCT_REFERENCE_IMAGE =
  "https://skinprotocolrx.com/cdn/shop/files/9798CD8F-0DBE-486B-91EF-F17E2B4A245D.png?v=1774149955&width=800"

const ALL_SKIN: SkinType[] = ['Combination', 'Dry', 'Normal', 'Oily', 'Sensitive']
const ALL_CONCERNS: SkinConcern[] = [
  'Acne', 'Aging', 'Brightening', 'Dry Skin', 'Eye Area',
  'Hyperpigmentation', 'Large Pores', 'Preventative', 'Redness', 'Sun Damage',
]

export const PRODUCTS: Product[] = [
  {
    id: 'clarifying-cleanser',
    name: 'Chamomile Cream Cleanser',
    tagline: 'Gentle. Soothe. Balance.',
    price: 68,
    size: '6.7 oz / 200 ml',
    categories: ['Cleansers'],
    skinTypes: ALL_SKIN,
    concerns: ALL_CONCERNS,
    badges: ['Best Seller', 'Sensitive Skin'],
    rating: 4.8,
    reviews: 214,
    image: PRODUCT_REFERENCE_IMAGE,
    description: 'A gentle, restorative cleanser that purifies without stripping. Chamomile and rose water calm visible irritation while nourishing botanicals leave the skin soft, balanced, and refreshed.',
    benefits: [
      'Removes impurities without stripping',
      'Calms visible irritation with chamomile and rose water',
      'Leaves skin soft, balanced, and refreshed',
      'Gentle enough for sensitive skin, morning and evening',
    ],
    howToUse: 'Massage 1–2 pumps onto damp skin. Rinse with lukewarm water. Use morning and evening.',
    keyIngredients: [
      { name: 'Chamomile Flower Extract', benefit: 'Calms visible irritation and soothes skin' },
      { name: 'Rosa Damascena Flower Water', benefit: 'Hydrates and softens while cleansing' },
      { name: 'Panthenol', benefit: 'Supports comfort and barrier recovery' },
    ],
    fullIngredients: [
      'Rosa Damascena Flower Water', 'Glycerin', 'Coco-Glucoside', 'Decyl Glucoside',
      'Cetearyl Olivate', 'Sorbitan Olivate', 'Simmondsia Chinensis (Jojoba) Seed Oil',
      'Coco-Caprylate', 'Isoamyl Laurate', 'Chamomilla Recutita (Matricaria) Flower Extract',
      'Panthenol', 'Gluconolactone', 'Sodium Benzoate', 'Xanthan Gum',
      'Cyamopsis Tetragonoloba (Guar) Gum', 'Citric Acid',
    ],
  },
  {
    id: 'clarifying-gel-cleanser',
    name: 'Clarifying Gel Cleanser',
    tagline: 'Clarify. Purify. Balance.',
    price: 68,
    size: '6.7 oz / 200 ml',
    categories: ['Cleansers'],
    skinTypes: ['Combination', 'Normal', 'Oily', 'Sensitive'],
    concerns: ['Acne', 'Brightening', 'Large Pores', 'Preventative', 'Redness', 'Sun Damage'],
    badges: [],
    rating: 4.7,
    reviews: 98,
    image: PRODUCT_REFERENCE_IMAGE,
    description: 'A luxurious gel cleanser that gently lifts impurities while preserving the skin’s essential moisture. Skin is left soft, balanced, and refreshed—beautifully clarified and perfectly primed for the treatments that follow.',
    benefits: [
      'Gently lifts impurities without over-drying',
      'Preserves essential moisture during cleansing',
      'Leaves skin soft, balanced, and primed for treatment',
      'Ideal daily gel cleanse for combination and oily skin',
    ],
    howToUse: 'Massage 1–2 pumps onto damp skin. Rinse with lukewarm water. Use morning and evening.',
    keyIngredients: [
      { name: 'Aloe Vera Leaf Juice', benefit: 'Soothes and helps preserve moisture' },
      { name: 'Rosa Damascena Flower Water', benefit: 'Refreshes and softens as it cleanses' },
      { name: 'Panthenol', benefit: 'Conditions skin after cleansing' },
    ],
    fullIngredients: [
      'Rosa Damascena Flower Water', 'Aloe Barbadensis Leaf Juice', 'Glycerin', 'Panthenol',
      'Coco-Glucoside', 'Coco-Caprylate', 'Isoamyl Laurate', 'Xanthan Gum',
      'Gluconolactone', 'Sodium Benzoate',
    ],
  },
  {
    id: 'tripleglow-exfoliating-cleanser',
    name: 'TripleGlow Exfoliating Cleanser',
    tagline: 'Polish. Renew. Illuminate.',
    price: 72,
    size: '6.7 oz / 200 ml',
    categories: ['Cleansers'],
    skinTypes: ['Combination', 'Dry', 'Normal', 'Oily'],
    concerns: ['Acne', 'Aging', 'Brightening', 'Hyperpigmentation', 'Large Pores', 'Preventative', 'Sun Damage'],
    badges: ['Professional Favorite'],
    rating: 4.8,
    reviews: 76,
    image: PRODUCT_REFERENCE_IMAGE,
    description: 'A silky, multi-action cleanser designed to refine texture, brighten dullness, and gently resurface the skin. TripleGlow combines botanical waters, fruit enzymes, and fine plant exfoliants to sweep away impurities while maintaining essential moisture.',
    benefits: [
      'Refines texture and brightens dullness',
      'Fruit enzymes and plant powders gently resurface',
      'Maintains essential moisture while polishing',
      'Weekly ritual for elevated skin clarity',
    ],
    howToUse: 'Massage 1–2 pumps onto damp skin. Rinse with lukewarm water. Use 1 to 3 times per week, as tolerated. Apply SPF during the day.',
    keyIngredients: [
      { name: 'Glycolic Acid', benefit: 'Gently resurfaces for smoother-looking skin' },
      { name: 'Bromelain', benefit: 'Fruit enzyme that supports polish and renewal' },
      { name: 'Ferulic Acid', benefit: 'Antioxidant support during exfoliation' },
    ],
    fullIngredients: [
      'Rosa Damascena (Rose) Flower Water', 'Glycerin', 'Cocamidopropyl Betaine', 'Coco Glucoside',
      'Propanediol', 'Isoamyl Laurate', 'Coco-Caprylate', 'Xanthan Gum', 'Sclerotium Gum',
      'Ferulic Acid', 'Glycolic Acid', 'Cucurbita Pepo (Pumpkin) Fruit Powder', 'Bromelain',
      'Ficus Carica (Fig) Seed Powder', 'Maranta Arundinacea (Arrowroot) Root Powder',
      'Gluconolactone', 'Sodium Benzoate', 'Arginine',
    ],
  },
  {
    id: 'rosewater-niacinamide-toner',
    name: 'Niacinamide Rosewater Restorative Toner',
    tagline: 'Balance. Glow. Refine.',
    price: 52,
    size: '4 oz / 120 ml',
    categories: ['Toners'],
    skinTypes: ALL_SKIN,
    concerns: ALL_CONCERNS,
    badges: ['Best Seller', 'Sensitive Skin'],
    rating: 4.8,
    reviews: 256,
    image: PRODUCT_REFERENCE_IMAGE,
    description: 'A restorative, skin-balancing toner infused with niacinamide and rosewater. Supports barrier function while enhancing clarity and natural radiance.',
    benefits: [
      'Balances and refreshes after cleansing',
      'Niacinamide supports even-looking tone and refined pores',
      'Rosewater soothes and hydrates',
      'Primes skin for serums and moisturizer',
    ],
    howToUse: 'After cleansing, apply to face and neck using hands or a cotton pad. Allow to absorb before applying serums or moisturizer. Use morning and evening.',
    keyIngredients: [
      { name: 'Niacinamide', benefit: 'Supports clarity, tone, and barrier function' },
      { name: 'Rosa Damascena Flower Water', benefit: 'Soothes and hydrates' },
      { name: 'Arginine', benefit: 'Supports skin comfort and resilience' },
    ],
    fullIngredients: [
      'Rosa Damascena Flower Water', 'Glycerin', 'Niacinamide',
      'Gluconolactone', 'Sodium Benzoate', 'Arginine',
    ],
  },
  {
    id: 'brighten-glow-c-5',
    name: 'Brighten & Glow C Serum 5%',
    tagline: 'Brighten. Firm. Repair.',
    price: 88,
    size: '1 oz / 30 ml',
    categories: ['Serums'],
    skinTypes: ALL_SKIN,
    concerns: ['Acne', 'Aging', 'Brightening', 'Hyperpigmentation', 'Large Pores', 'Preventative', 'Redness', 'Sun Damage'],
    badges: ['Sensitive Skin'],
    rating: 4.8,
    reviews: 197,
    image: PRODUCT_REFERENCE_IMAGE,
    description: 'A gentle-strength formula with 5% L-Ascorbic Acid designed to visibly brighten the complexion, refine skin texture, and support a more radiant, even-toned appearance. This antioxidant-rich formula helps defend against environmental stressors while promoting a smoother, more luminous look.',
    benefits: [
      'Gentle daily introduction to vitamin C',
      'Visibly brightens and supports even tone',
      'Antioxidant defense against environmental stressors',
      'Suitable for sensitive skin types',
    ],
    howToUse: 'Apply 2–3 drops to clean skin in the morning and evening. Gently massage into the face, neck, and décolleté using upward motions. Follow with moisturizer. Use SPF during the day. Store in a cool, dry place away from direct sunlight.',
    keyIngredients: [
      { name: 'L-Ascorbic Acid 5%', benefit: 'Brightening antioxidant at a gentle concentration' },
      { name: 'Ferulic Acid', benefit: 'Stabilizes vitamin C and boosts efficacy' },
      { name: 'Propanediol', benefit: 'Supports absorption and skin comfort' },
    ],
    fullIngredients: [
      'Aqua (Water)', 'L-Ascorbic Acid', 'Glycerin', 'Propanediol',
      'Ferulic Acid', 'Sodium Phytate', 'Gluconolactone', 'Sodium Benzoate',
    ],
  },
  {
    id: 'brighten-glow-c-20',
    name: 'Brighten & Glow C Serum 20%',
    tagline: 'Brighten. Firm. Repair.',
    price: 98,
    size: '1 oz / 30 ml',
    categories: ['Serums'],
    skinTypes: ['Combination', 'Dry', 'Normal', 'Oily'],
    concerns: ['Aging', 'Brightening', 'Hyperpigmentation', 'Large Pores', 'Preventative', 'Sun Damage'],
    badges: ['Best Seller', 'Professional Favorite'],
    rating: 4.9,
    reviews: 284,
    image: PRODUCT_REFERENCE_IMAGE,
    description: 'A concentrated 20% L-Ascorbic Acid serum designed to visibly brighten the complexion, refine skin texture, and support a more radiant, even-toned appearance. Crafted with precision for maximum potency and stability, it absorbs instantly to deliver a refined, revitalized glow.',
    benefits: [
      'Potent 20% L-Ascorbic Acid brightening',
      'Refines texture and supports even tone',
      'Antioxidant defense against environmental stressors',
      'For experienced vitamin C users seeking advanced results',
    ],
    howToUse: 'Apply 2–3 drops to clean skin in the morning and evening. Gently massage into the face, neck, and décolleté using upward motions. Follow with moisturizer. Use SPF during the day. Store in a cool, dry place away from direct sunlight. Introduce gradually if new to high-strength vitamin C.',
    keyIngredients: [
      { name: 'L-Ascorbic Acid 20%', benefit: 'Potent antioxidant that brightens and protects' },
      { name: 'Ferulic Acid', benefit: 'Stabilizes vitamin C and boosts efficacy' },
      { name: 'Sodium Phytate', benefit: 'Supports formula stability' },
    ],
    fullIngredients: [
      'Aqua (Water)', 'L-Ascorbic Acid', 'Glycerin', 'Propanediol',
      'Ferulic Acid', 'Sodium Phytate', 'Gluconolactone', 'Sodium Benzoate',
    ],
  },
  {
    id: 'hyaluronic-acid-serum',
    name: 'Hyaluronic Acid Serum',
    tagline: 'Hydrate. Plump. Preserve.',
    price: 92,
    size: '1 oz / 30 ml',
    categories: ['Serums'],
    skinTypes: ALL_SKIN,
    concerns: ALL_CONCERNS,
    badges: ['Best Seller', 'Sensitive Skin'],
    rating: 4.9,
    reviews: 398,
    image: PRODUCT_REFERENCE_IMAGE,
    description: 'A lightweight, concentrated hydrating serum designed to instantly replenish moisture, plump the skin, and restore a healthy radiant glow. Formulated with multi-weight hyaluronic acid to help soften the appearance of fine lines while leaving the skin smooth, dewy, and refreshed without feeling heavy.',
    benefits: [
      'Instant multi-level hydration',
      'Plumps and softens the look of fine lines',
      'Lightweight and layerable',
      'Works for every skin type',
    ],
    howToUse: 'Apply 2–3 drops to clean skin in the morning and evening. Smooth over the face and neck until absorbed. Follow with moisturizer. Use SPF during the day.',
    keyIngredients: [
      { name: 'Sodium Hyaluronate', benefit: 'Multi-weight hydration that plumps and softens' },
      { name: 'Rosa Damascena Flower Water', benefit: 'Soothes while delivering moisture' },
      { name: 'Citrus Aurantium Flower Oil', benefit: 'Light botanical finish' },
    ],
    fullIngredients: [
      'Rosa Damascena Flower Water', 'Sodium Hyaluronate', 'Citrus Aurantium Flower Oil',
    ],
  },
  {
    id: 'matrix-serum',
    name: 'Matrix Serum',
    tagline: 'Strengthen. Renew. Brighten.',
    price: 88,
    size: '1 oz / 30 ml',
    categories: ['Serums'],
    skinTypes: ALL_SKIN,
    concerns: ALL_CONCERNS,
    badges: ['Sensitive Skin'],
    rating: 4.7,
    reviews: 64,
    image: PRODUCT_REFERENCE_IMAGE,
    description: 'A concentrated amino acid serum featuring glycine, lysine, and proline to support a smoother, more resilient appearance. Powered by niacinamide and hyaluronic acid, it refines texture, replenishes hydration, and leaves skin looking supple, balanced, and visibly renewed.',
    benefits: [
      'Amino acids support a smoother, more resilient look',
      'Niacinamide refines texture and tone',
      'Hyaluronic acid replenishes hydration',
      'Lightweight daily barrier-support serum',
    ],
    howToUse: 'Apply 2–3 drops to clean skin morning and evening. Gently massage into the face, neck, and décolleté using upward motions. Follow with moisturizer and SPF during the daytime.',
    keyIngredients: [
      { name: 'Glycine, Lysine & Proline', benefit: 'Amino acids that support resilient-looking skin' },
      { name: 'Niacinamide', benefit: 'Refines texture and supports barrier function' },
      { name: 'Sodium Hyaluronate', benefit: 'Replenishes hydration' },
    ],
    fullIngredients: [
      'Rosa Damascena Flower Water', 'Aloe Barbadensis Leaf Juice', 'Niacinamide',
      'Glycine', 'Lysine', 'Proline', 'Sodium Hyaluronate', 'Glycerin',
      'Gluconolactone', 'Sodium Benzoate',
    ],
  },
  {
    id: 'amino-acid-serum',
    name: 'Tri-peptide Complex Serum',
    tagline: 'Rebuild. Firm. Revitalize.',
    price: 88,
    size: '1 oz / 30 ml',
    categories: ['Serums'],
    skinTypes: ALL_SKIN,
    concerns: ALL_CONCERNS,
    badges: ['Professional Favorite'],
    rating: 4.8,
    reviews: 112,
    image: PRODUCT_REFERENCE_IMAGE,
    description: 'A powerful amino+peptide serum formulated to help firm, hydrate, and visibly smooth the skin while supporting collagen production and improving overall skin texture. This lightweight formula helps soften the appearance of fine lines and leaves the complexion looking refreshed, plump, and radiant.',
    benefits: [
      'Peptides and amino acids support firmer-looking skin',
      'Softens the appearance of fine lines',
      'Hydrates while improving texture',
      'Lightweight daily firming serum',
    ],
    howToUse: 'Apply 2–3 drops to clean skin in the morning and evening. Smooth over the face and neck until absorbed. Follow with moisturizer. Use SPF during the day.',
    keyIngredients: [
      { name: 'Pisum Sativum (Pea) Peptide', benefit: 'Supports firmness and collagen-looking resilience' },
      { name: 'Proline, Glycine & Lysine', benefit: 'Amino acids that rebuild and revitalize' },
      { name: 'Sodium Hyaluronate', benefit: 'Hydrates and plumps' },
    ],
    fullIngredients: [
      'Rosa Damascena Flower Water', 'Sodium Hyaluronate', 'Proline', 'Glycine', 'Lysine',
      'Gluconolactone', 'Sodium Benzoate', 'Pisum Sativum (Pea) Peptide', 'Glycerin', 'Propanediol',
    ],
  },
  {
    id: 'beauty-elixir-serum',
    name: 'Beauty Elixir Serum',
    tagline: 'Plump. Hydrate. Nourish.',
    price: 94,
    size: '1 oz / 30 ml',
    categories: ['Serums'],
    skinTypes: ALL_SKIN,
    concerns: ['Aging', 'Brightening', 'Dry Skin', 'Preventative', 'Redness', 'Sun Damage'],
    badges: [],
    rating: 4.7,
    reviews: 48,
    image: PRODUCT_REFERENCE_IMAGE,
    description: 'A botanical serum crafted to help your skin bloom with soft radiance. This silky potion wraps the complexion in lightweight hydration and luminous comfort—a sensorial ritual designed to feel like a drop of magic.',
    benefits: [
      'Lightweight botanical hydration',
      'Frankincense and neroli for luminous comfort',
      'Plumps and softens the look of skin',
      'Morning or night whenever skin needs a boost',
    ],
    howToUse: 'Apply 2–3 drops to clean skin in the morning and evening. Gently massage into the face, neck, and décolleté using upward motions. Follow with moisturizer. Use SPF during the day.',
    keyIngredients: [
      { name: 'Squalane', benefit: 'Lightweight lipid support for soft, nourished skin' },
      { name: 'Frankincense Oil', benefit: 'Restorative botanical aroma and comfort' },
      { name: 'Sodium Hyaluronate', benefit: 'Plumps with lightweight hydration' },
    ],
    fullIngredients: [
      'Aloe Barbadensis Leaf Juice', 'Rosa Damascena Flower Water', 'Glycerin', 'Squalane',
      'Sodium Hyaluronate', 'Boswellia Carterii (Frankincense) Oil',
      'Citrus Aurantium Amara (Neroli) Flower Oil', 'Gluconolactone', 'Sodium Benzoate',
    ],
  },
  {
    id: 'bakuchiol-renewal-serum',
    name: 'Bakuchiol Renewal Serum',
    tagline: 'Refine. Even. Brighten.',
    price: 98,
    size: '1 oz / 30 ml',
    categories: ['Serums'],
    skinTypes: ALL_SKIN,
    concerns: ['Aging', 'Brightening', 'Hyperpigmentation', 'Large Pores', 'Preventative', 'Sun Damage'],
    badges: ['Professional Favorite'],
    rating: 4.8,
    reviews: 55,
    image: PRODUCT_REFERENCE_IMAGE,
    description: 'A refined phyto-retinol serum powered by bakuchiol to visibly smooth, brighten, and refine the complexion. Balanced with niacinamide, beta glucan, hyaluronic acid, and soothing botanical extracts, it supports a more even, supple, and renewed appearance without the irritation often associated with traditional retinoids.',
    benefits: [
      'Phyto-retinol alternative for smoother-looking skin',
      'Brightens and refines without classic retinoid irritation',
      'Niacinamide and beta-glucan support an even, calm look',
      'Evening renewal step for aging and tone concerns',
    ],
    howToUse: 'Apply 2–3 drops to clean skin in the evening. Smooth over the face and neck until absorbed. Follow with moisturizer. Use SPF during the day.',
    keyIngredients: [
      { name: 'Bakuchiol', benefit: 'Phyto-retinol that smooths and brightens' },
      { name: 'Niacinamide', benefit: 'Supports even tone and barrier comfort' },
      { name: 'Beta-Glucan', benefit: 'Soothes while supporting renewal' },
    ],
    fullIngredients: [
      'Rosa Damascena Flower Water', 'Propanediol', 'Glycerin', 'Niacinamide', 'Sclerotium Gum',
      'Xanthan Gum', 'Beta-Glucan', 'Avena Sativa (Oat) Kernel Extract', 'Sodium Hyaluronate',
      'Coco-Caprylate', 'Isoamyl Laurate', 'Bakuchiol', 'Cetearyl Olivate', 'Sorbitan Olivate',
      'Tocopherol', 'Glycyrrhiza Glabra (Licorice) Root Extract', 'Camellia Sinensis Leaf Extract',
      'Panthenol', 'Gluconolactone', 'Sodium Benzoate', 'Citric Acid',
    ],
  },
  {
    id: 'hydration-cloud-cream',
    name: 'Hydration Cloud Cream',
    tagline: 'Nourish. Smooth. Restore.',
    price: 88,
    size: '1.7 oz / 50 ml',
    categories: ['Moisturizers'],
    skinTypes: ['Combination', 'Normal', 'Oily', 'Sensitive'],
    concerns: ['Aging', 'Brightening', 'Dry Skin', 'Eye Area', 'Hyperpigmentation', 'Large Pores', 'Preventative', 'Redness', 'Sun Damage'],
    badges: ['Best Seller'],
    rating: 4.8,
    reviews: 142,
    image: PRODUCT_REFERENCE_IMAGE,
    description: 'A weightless moisturizing cream that delivers deep hydration, softens the look of fine lines, and leaves skin balanced, smooth, and radiant. Powered by rose water, aloe, hyaluronic acid, and nourishing botanicals, it absorbs effortlessly to replenish moisture and support a healthy, supple complexion.',
    benefits: [
      'Weightless daily hydration',
      'Softens the look of fine lines',
      'Absorbs effortlessly without heaviness',
      'Ideal lightweight moisturizer for most skin types',
    ],
    howToUse: 'Apply 1–2 pumps to clean skin morning and night after serums. Gently massage into the face, neck, and décolleté using upward motions. Follow with SPF during the daytime.',
    keyIngredients: [
      { name: 'Sodium Hyaluronate', benefit: 'Deep hydration that plumps and softens' },
      { name: 'Aloe Vera Leaf Juice', benefit: 'Soothes while moisturizing' },
      { name: 'Squalane', benefit: 'Lightweight lipid support' },
    ],
    fullIngredients: [
      'Rosa Damascena Flower Water', 'Aloe Barbadensis Leaf Juice', 'Propanediol', 'Betaine',
      'Sodium Hyaluronate', 'Cetearyl Olivate', 'Sorbitan Olivate', 'Cetearyl Alcohol', 'Squalane',
      'Butyrospermum Parkii (Shea) Butter', 'Simmondsia Chinensis (Jojoba) Seed Oil',
      'Gluconolactone', 'Sodium Benzoate',
    ],
  },
  {
    id: 'rich-barrier-cream',
    name: 'Rich Barrier Cream',
    tagline: 'Nourish. Restore. Replenish.',
    price: 92,
    size: '1.7 oz / 50 ml',
    categories: ['Moisturizers'],
    skinTypes: ALL_SKIN,
    concerns: ['Aging', 'Brightening', 'Dry Skin', 'Eye Area', 'Hyperpigmentation', 'Large Pores', 'Preventative', 'Redness', 'Sun Damage'],
    badges: ['Best Seller', 'Professional Favorite'],
    rating: 4.9,
    reviews: 241,
    image: PRODUCT_REFERENCE_IMAGE,
    description: 'A rich, indulgent cream that envelops the skin in deep, comforting moisture while reinforcing the barrier for lasting suppleness. Powered by shea butter, rosewater, squalane, and hyaluronic acid, it smooths, nourishes, and restores the complexion to a state of velvety, resilient radiance.',
    benefits: [
      'Deep, comforting moisture for dry and depleted skin',
      'Reinforces barrier for lasting suppleness',
      'Shea, squalane, and HA restore resilience',
      'Rich finish without greasy heaviness',
    ],
    howToUse: 'Apply 1–2 pumps to clean skin morning and night after serums. Gently massage into the face, neck, and décolleté using upward motions. Follow with SPF during the daytime.',
    keyIngredients: [
      { name: 'Shea Butter', benefit: 'Deep nourishment and barrier comfort' },
      { name: 'Squalane', benefit: 'Lightweight lipids that reinforce barrier' },
      { name: 'Sodium Hyaluronate', benefit: 'Hydrates within a richer cream base' },
    ],
    fullIngredients: [
      'Rosa Damascena Flower Water', 'Aloe Barbadensis Leaf Juice',
      'Butyrospermum Parkii (Shea) Butter', 'Cetearyl Olivate', 'Sorbitan Olivate',
      'Rosa Canina Fruit Oil', 'Glycerin', 'Sodium Hyaluronate', 'Cetyl Alcohol',
      'Gluconolactone', 'Sodium Benzoate', 'Squalane', 'Arginine',
    ],
  },
  {
    id: 'eye-cream',
    name: 'Eye Recovery Complex',
    tagline: 'Brighten. Depuff. Hydrate.',
    price: 108,
    size: '0.5 oz / 15 ml',
    categories: ['Eye Care', 'Moisturizers'],
    skinTypes: ALL_SKIN,
    concerns: ['Aging', 'Brightening', 'Dry Skin', 'Eye Area', 'Hyperpigmentation', 'Preventative', 'Sun Damage'],
    badges: ['Professional Favorite'],
    rating: 4.7,
    reviews: 143,
    image: PRODUCT_REFERENCE_IMAGE,
    description: 'A refined eye cream that delivers a refreshing veil of hydration while awakening the delicate eye area with caffeine and antioxidant-rich green tea. Infused with niacinamide, hyaluronic acid, and nourishing botanicals, it smooths the look of tired eyes and leaves the skin feeling cushioned, refreshed, and softly illuminated.',
    benefits: [
      'Hydrates the delicate eye area',
      'Caffeine and green tea help refresh tired-looking eyes',
      'Niacinamide and HA smooth and cushion',
      'Gentle enough for morning and evening use',
    ],
    howToUse: 'Apply a small amount to the under-eye area morning and evening using gentle tapping motions until fully absorbed. Avoid direct contact with eyes.',
    keyIngredients: [
      { name: 'Caffeine', benefit: 'Temporarily refreshes and de-puffs' },
      { name: 'Green Tea Extract', benefit: 'Antioxidant support for the eye area' },
      { name: 'Niacinamide', benefit: 'Supports a brighter, smoother look' },
    ],
    fullIngredients: [
      'Rosa Damascena Flower Water', 'Aloe Barbadensis Leaf Juice', 'Glycerin',
      'Butyrospermum Parkii (Shea) Butter', 'Simmondsia Chinensis (Jojoba) Seed Oil', 'Squalane',
      'Cetearyl Olivate', 'Sorbitan Olivate', 'Cetyl Alcohol', 'Niacinamide', 'Sodium Hyaluronate',
      'Arginine', 'Camellia Sinensis Leaf Extract', 'Caffeine', 'Gluconolactone',
      'Punica Granatum Extract', 'Sodium Benzoate',
    ],
  },
  {
    id: 'the-holy-grail',
    name: 'The Holy Grail Oil',
    tagline: 'Restore. Illuminate. Revitalize.',
    price: 148,
    size: '1 oz / 30 ml',
    categories: ['Facial Oils'],
    skinTypes: ALL_SKIN,
    concerns: ALL_CONCERNS,
    badges: ['Best Seller', 'Professional Favorite'],
    rating: 4.9,
    reviews: 329,
    image: PRODUCT_REFERENCE_IMAGE,
    description: 'A luxurious skin oil that harnesses the ancient wisdom of botanicals and the cutting-edge science of antioxidant-rich squalane to deliver radiant, resilient skin. Infused with Amaranthus-derived squalane, Frankincense, and Myrrh, this skin oil is a ritual of renewal.',
    benefits: [
      'Seals in moisture with plant-derived squalane',
      'Frankincense and myrrh support tone and vitality',
      'Lightweight finishing oil for AM or PM',
      'Non-heavy ritual of renewal for all skin types',
    ],
    howToUse: 'Massage 2–3 drops to skin. Use morning or night.',
    keyIngredients: [
      { name: 'Squalane', benefit: 'Mimics skin lipids for seamless hydration' },
      { name: 'Myrrh Oil', benefit: 'Restorative resin for resilient-looking skin' },
      { name: 'Frankincense Oil', benefit: 'Illuminating botanical antioxidant support' },
    ],
    fullIngredients: [
      'Squalane', 'Commiphora Myrrha Oil', 'Boswellia Carterii Oil', 'Tocopherol',
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
  { step: 1, name: 'Cleanse', products: ['clarifying-cleanser', 'clarifying-gel-cleanser', 'tripleglow-exfoliating-cleanser'], description: 'Remove impurities and prepare skin' },
  { step: 2, name: 'Tone', products: ['rosewater-niacinamide-toner'], description: 'Balance pH and prime for treatment' },
  { step: 3, name: 'Repair', products: ['brighten-glow-c-5', 'brighten-glow-c-20', 'matrix-serum', 'amino-acid-serum', 'bakuchiol-renewal-serum', 'beauty-elixir-serum'], description: 'Target specific skin concerns' },
  { step: 4, name: 'Restore', products: ['hyaluronic-acid-serum'], description: 'Replenish hydration' },
  { step: 5, name: 'Moisturize', products: ['hydration-cloud-cream', 'rich-barrier-cream', 'eye-cream'], description: 'Seal in moisture and support skin barrier' },
  { step: 6, name: 'Nourish', products: ['the-holy-grail'], description: 'Finish and lock in the protocol' },
]
