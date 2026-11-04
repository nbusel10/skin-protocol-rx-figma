function InstagramIcon({ strokeWidth }: { strokeWidth: number }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon({ strokeWidth }: { strokeWidth: number }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} aria-hidden="true">
      <path d="M15 8h2V5h-2c-2.2 0-4 1.8-4 4v2H9v3h2v7h3v-7h2.2l.8-3H14V9c0-.6.4-1 1-1z" strokeLinejoin="round" />
    </svg>
  )
}

const LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/skinprotocolrx/', Icon: InstagramIcon },
  { label: 'Facebook', href: 'https://www.facebook.com/skinprotocolrx/', Icon: FacebookIcon },
]

export default function SocialLinks({
  className = '',
  iconClassName = '',
  strokeWidth = 1.5,
}: {
  className?: string
  iconClassName?: string
  strokeWidth?: number
}) {
  return (
    <div className={className}>
      {LINKS.map(link => {
        const Icon = link.Icon
        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
            className={iconClassName}
          >
            <Icon strokeWidth={strokeWidth} />
          </a>
        )
      })}
    </div>
  )
}
