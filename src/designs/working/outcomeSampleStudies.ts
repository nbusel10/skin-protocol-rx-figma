/**
 * Fictional demonstration studies for the Outcomes design preview.
 * This is not Skin Protocol RX study evidence. Replace these records with
 * approved findings in outcomeStudies.ts before publishing real results.
 */
import type { OutcomeStudy } from './outcomeStudies'

export const SAMPLE_OUTCOME_STUDIES: OutcomeStudy[] = [
  {
    id: 'sample-uneven-tone',
    status: 'sample',
    concern: 'Uneven Tone',
    title: 'Illustrative uneven tone preview',
    duration: '8 weeks — sample timeline',
    focus: 'Observing the appearance of uneven skin tone and overall radiance.',
    products: [
      { name: 'Chamomile Cream Cleanser' },
      { name: 'Brighten & Glow Vitamin C Serum' },
      { name: 'Hydration Cloud Cream' },
    ],
    assessments: [
      {
        id: 'tone-day-1',
        timePoint: 'Day 1',
        heading: 'The Starting Point',
        findings: 'Initial observations documented visible variations in skin tone and areas of dullness.',
      },
      {
        id: 'tone-week-4',
        timePoint: 'Week 4',
        heading: 'Early Observations',
        findings: 'Sample participants described skin as appearing brighter, with a more refreshed overall appearance.',
      },
      {
        id: 'tone-week-8',
        timePoint: 'Week 8',
        heading: 'Final Assessment',
        findings: 'Illustrative observations noted a more even-looking complexion and improved visible radiance.',
      },
    ],
  },
  {
    id: 'sample-dryness',
    status: 'sample',
    concern: 'Dryness & Dehydration',
    title: 'Illustrative dryness preview',
    duration: '6 weeks — sample timeline',
    focus: 'Observing skin comfort, hydration, and the appearance of dryness.',
    products: [
      { name: 'Chamomile Cream Cleanser' },
      { name: 'Hyaluronic Serum' },
      { name: 'Rich Barrier Cream' },
    ],
    assessments: [
      {
        id: 'dry-day-1',
        timePoint: 'Day 1',
        heading: 'The Starting Point',
        findings: 'Initial observations documented visible dryness and areas of rough-looking skin.',
      },
      {
        id: 'dry-week-3',
        timePoint: 'Week 3',
        heading: 'Early Observations',
        findings: 'Sample participants reported skin feeling more comfortable and appearing less dry.',
      },
      {
        id: 'dry-week-6',
        timePoint: 'Week 6',
        heading: 'Final Assessment',
        findings: 'Illustrative observations described softer-looking, smoother skin with improved perceived hydration.',
      },
    ],
  },
  {
    id: 'sample-texture',
    status: 'sample',
    concern: 'Fine Lines & Texture',
    title: 'Illustrative texture preview',
    duration: '8 weeks — sample timeline',
    focus: 'Observing the appearance of skin texture and fine lines.',
    products: [
      { name: 'Chamomile Cream Cleanser' },
      { name: 'Bakuchiol Renewal Serum' },
      { name: 'Eye Recovery Complex' },
      { name: 'Rich Barrier Cream' },
    ],
    assessments: [
      {
        id: 'lines-day-1',
        timePoint: 'Day 1',
        heading: 'The Starting Point',
        findings: 'Initial observations documented visible fine lines and areas of uneven texture.',
      },
      {
        id: 'lines-week-4',
        timePoint: 'Week 4',
        heading: 'Early Observations',
        findings: 'Illustrative observations described skin as appearing smoother and more supple.',
      },
      {
        id: 'lines-week-8',
        timePoint: 'Week 8',
        heading: 'Final Assessment',
        findings: 'Sample results noted the appearance of more refined texture and softer-looking fine lines.',
      },
    ],
  },
]
