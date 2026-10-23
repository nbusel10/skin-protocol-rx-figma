/** Shared copy for the homepage “What is the protocol?” section (display-only; catalog still uses Nourish). */
export const PROTOCOL_SECTION = {
  eyebrow: 'What is the protocol?',
  title: 'Less Guesswork. More intention.',
  titleLead: 'Less Guesswork.',
  titleEm: 'More intention.',
  paragraph:
    "The best routine isn't the longest one. It's a few well-chosen steps that work together, starting with the essentials and adding targeted care when your skin needs it.",
  cta: 'Build your protocol',
  ctaNote: 'Take a quick 1-minute quiz',
  spf: 'Seal it all in with your favorite SPF.',
  steps: [
    { step: 1, name: 'Cleanse', tag: 'Purify' },
    { step: 2, name: 'Tone', tag: 'Rebalance & Refresh' },
    { step: 3, name: 'Treat', tag: 'Correct Conditions' },
    { step: 4, name: 'Eye Care', tag: 'Revive eyes' },
    { step: 5, name: 'Moisturize', tag: 'Hydrate & Restore' },
    { step: 6, name: 'Oil', tag: 'Seal in moisture' },
  ],
} as const

export type ProtocolSectionStep = (typeof PROTOCOL_SECTION.steps)[number]
