import type { GalleryTarget } from './shared'

const CHOICES: { id: GalleryTarget; label: string; href: string }[] = [
  { id: 'working', label: 'Working', href: '/designs/working' },
  { id: 'protocol-refine', label: 'Protocol refine', href: '/designs/working/protocol-refine' },
  { id: 'lighter', label: 'Lighter', href: '/designs/lighter' },
  { id: 'quiz-coverage', label: 'Quiz coverage', href: '/designs/working/quiz-coverage' },
  { id: 'original', label: 'Original', href: '/original' },
  { id: 'rose', label: 'Rose', href: '/' },
  { id: 'protocol', label: 'The Protocol', href: '/designs/the-protocol.html' },
  { id: 'clear', label: 'Editorial', href: '/designs/clear' },
  { id: 'ritual', label: 'Personalized Skin Ritual', href: '/designs/ritual' },
  { id: 'grove', label: 'Botanical Laboratory', href: '/designs/grove' },
  { id: 'boutique', label: 'Modern Skincare Boutique', href: '/designs/boutique' },
  { id: 'luxe', label: 'Luxury Editorial', href: '/designs/luxe' },
]

interface DesignTabsProps {
  current: GalleryTarget
  onOpen: (target: GalleryTarget) => void
  /** Keeps the link pointed at the same page the click will open. */
  hrefFor?: (target: GalleryTarget) => string
  pinned?: boolean
}

export default function DesignTabs({ current, onOpen, hrefFor, pinned = true }: DesignTabsProps) {
  return (
    <div className={`${pinned ? 'sticky top-0 z-[60]' : ''} h-11 border-b border-white/10 bg-[#1A1916] font-sans text-white`}>
      <div role="tablist" aria-label="Designs" className="flex h-full items-center gap-1 overflow-x-auto px-3 md:px-5">
        {CHOICES.map(choice => {
          const selected = choice.id === current
          return (
            <a
              key={choice.id}
              role="tab"
              aria-selected={selected}
              href={hrefFor ? hrefFor(choice.id) : choice.href}
              onClick={event => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
                event.preventDefault()
                onOpen(choice.id)
              }}
              className={`shrink-0 px-3 py-1.5 text-[12px] font-medium whitespace-nowrap ${
                selected ? 'bg-white text-[#1A1916]' : 'text-[#E8E4DE] hover:bg-white/10'
              }`}
            >
              {choice.label}
            </a>
          )
        })}
      </div>
    </div>
  )
}
