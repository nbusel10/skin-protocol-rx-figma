import { useState, type FormEvent, type ReactNode } from 'react'
import { useSiteRoot } from './siteRoot'

const HEADING =
  'font-serif text-[clamp(40px,8vw,56px)] font-normal leading-[1.08] tracking-[-0.044em] min-[681px]:text-[clamp(44px,4vw,60px)]'
const EYEBROW = 'text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]'
const SECTION = 'px-6 text-[#252520] min-[681px]:px-[max(36px,8vw)]'

const TOPICS = ['An order', 'A product or routine', 'Spa partnership', 'Something else'] as const

type Topic = (typeof TOPICS)[number]

function TruckIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M3 10h14v11H3z" strokeLinejoin="round" />
      <path d="M17 14h6.2L27 18.2V21h-10" strokeLinejoin="round" />
      <circle cx="8.5" cy="23.5" r="1.7" />
      <circle cx="22.5" cy="23.5" r="1.7" />
    </svg>
  )
}

function RoutineIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M8 13V8.5A1.5 1.5 0 0 1 9.5 7h2A1.5 1.5 0 0 1 13 8.5V13" strokeLinecap="round" />
      <rect x="6.5" y="13" width="8" height="12" rx="1.5" />
      <rect x="17.5" y="15" width="8" height="10" rx="1.5" />
      <path d="M19.5 15v-2h4v2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LotusIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M16 24c0-5 2.2-8.5 4.5-10.5C18.2 16.5 16 20 16 24z" strokeLinejoin="round" />
      <path d="M16 24c0-5-2.2-8.5-4.5-10.5C13.8 16.5 16 20 16 24z" strokeLinejoin="round" />
      <path d="M16 24c-4.2-.6-7.5-3-9-6 3.2.8 6.4 2.8 9 6z" strokeLinejoin="round" />
      <path d="M16 24c4.2-.6 7.5-3 9-6-3.2.8-6.4 2.8-9 6z" strokeLinejoin="round" />
      <path d="M16 24V14" strokeLinecap="round" />
    </svg>
  )
}

const NOTES: { title: string; body: string; link?: string; href?: 'protocol' | 'spa' | 'track'; icon: ReactNode }[] = [
  {
    title: 'Your Order',
    body: "Questions about shipping, returns, or an existing order? We're happy to help.",
    link: 'Track your order',
    href: 'track',
    icon: <TruckIcon />,
  },
  {
    title: 'Skincare Guidance',
    body: "Not sure which products are right for you? We're here to help you find your fit.",
    link: 'Discover your protocol',
    href: 'protocol',
    icon: <RoutineIcon />,
  },
  {
    title: 'Professional Partnerships',
    body: 'Bring Skin Protocol RX into your practice. Explore exclusive opportunities for skincare professionals.',
    link: 'Learn about partnerships',
    href: 'spa',
    icon: <LotusIcon />,
  },
]

const FIELD =
  'w-full border border-[#D6C3C2] bg-white px-3 py-2.5 text-sm text-[#2B2727] outline-none placeholder:text-[#A39E96] focus:border-[#ab8584]'

function topicClass(selected: boolean) {
  return [
    'border px-4 py-3 text-left text-[14px] leading-snug transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ab8584]',
    selected
      ? 'border-[#ab8584] bg-[#f3eceb] text-[#2B2727]'
      : 'border-[#D6C3C2] bg-transparent text-[#2B2727] hover:border-[#ab8584]',
  ].join(' ')
}

export default function ContactPage() {
  const site = useSiteRoot()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [topics, setTopics] = useState<Topic[]>([])
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const ready = Boolean(firstName.trim() && lastName.trim() && email.includes('@') && topics.length > 0 && message.trim())

  function toggleTopic(item: Topic) {
    setTopics(current => (current.includes(item) ? current.filter(value => value !== item) : [...current, item]))
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!ready) return
    setSent(true)
  }

  return (
    <article className="bg-[#F7F4EF] font-sans text-[#252520]">
      <section className="bg-[#2B2727] px-4 py-14 text-[#F7F4EF] sm:px-6 md:py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h1 className={`text-[#F7F4EF] ${HEADING}`}>Contact</h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#F7F4EF]/80">
            A note to the family.
          </p>
        </div>
      </section>

      <section className={`${SECTION} bg-[#FFFDFA] py-14 md:py-16`}>
        <div className="grid items-start gap-12 min-[900px]:grid-cols-[minmax(0,0.9fr)_minmax(320px,1fr)] min-[900px]:gap-16">
          <div>
            <p className={EYEBROW}>Contact</p>
            <h2 className={`mt-4 ${HEADING}`}>We&apos;re here to help.</h2>
            <p className="mt-5 max-w-[34rem] text-[17px] leading-relaxed text-[#252520]">
              Whether you have a question about your order, need guidance with your skincare routine, or want to explore a partnership, we&apos;d love to hear from you.
            </p>
            <ul className="mt-8 max-w-[34rem] border-t border-[#E4DCD3]">
              {NOTES.map(item => (
                <li key={item.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-b border-[#E4DCD3] py-6">
                  <span className="text-[#ab8584]">{item.icon}</span>
                  <div>
                    <h3 className="font-serif text-[1.65rem] leading-none font-normal tracking-[-0.03em]">{item.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-[#595750]">{item.body}</p>
                    {item.link && item.href ? (
                      <a
                        href={item.href === 'protocol' ? site.protocol : item.href === 'spa' ? site.spa : site.track}
                        className="group mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-[#ab8584] uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ab8584]"
                      >
                        <span className="underline-offset-4 group-hover:underline">{item.link}</span>
                        <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
                          ↗
                        </span>
                      </a>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div id="contact-note" className="scroll-mt-28 border border-[#D6C3C2] bg-[#fffdfa] px-6 py-8 md:px-9 md:py-10">
            {sent ? (
              <div aria-live="polite">
                <p className="text-[10px] font-semibold tracking-[0.2em] text-[#2B2727]/60 uppercase">Note received</p>
                <h3 className="mt-4 font-serif text-[clamp(1.7rem,2.8vw,2.15rem)] leading-snug font-normal tracking-[-0.02em]">
                  Thank you, {firstName.trim()}.
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-[#2B2727]/70">
                  We will write back to {email.trim()}.
                </p>
              </div>
            ) : (
              <form onSubmit={submit}>
                <h3 className="font-serif text-[clamp(1.7rem,2.8vw,2.15rem)] leading-snug font-normal tracking-[-0.02em]">
                  Send a note
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-[#2B2727]/60">
                  First name, last name, and email are required.
                </p>
                <div className="mt-6 grid gap-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="grid gap-1.5 text-[11px] font-semibold tracking-[0.12em] text-[#6D6A63] uppercase">
                      <span className="flex items-baseline justify-between gap-3">
                        First name
                        <span className="text-[10px] tracking-[0.14em] text-[#ab8584]">Required</span>
                      </span>
                      <input
                        value={firstName}
                        onChange={event => setFirstName(event.target.value)}
                        autoComplete="given-name"
                        required
                        aria-required="true"
                        className={FIELD}
                      />
                    </label>
                    <label className="grid gap-1.5 text-[11px] font-semibold tracking-[0.12em] text-[#6D6A63] uppercase">
                      <span className="flex items-baseline justify-between gap-3">
                        Last name
                        <span className="text-[10px] tracking-[0.14em] text-[#ab8584]">Required</span>
                      </span>
                      <input
                        value={lastName}
                        onChange={event => setLastName(event.target.value)}
                        autoComplete="family-name"
                        required
                        aria-required="true"
                        className={FIELD}
                      />
                    </label>
                  </div>
                  <label className="grid gap-1.5 text-[11px] font-semibold tracking-[0.12em] text-[#6D6A63] uppercase">
                    <span className="flex items-baseline justify-between gap-3">
                      Email
                      <span className="text-[10px] tracking-[0.14em] text-[#ab8584]">Required</span>
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={event => setEmail(event.target.value)}
                      autoComplete="email"
                      required
                      aria-required="true"
                      className={FIELD}
                    />
                  </label>
                  <label className="grid gap-1.5 text-[11px] font-semibold tracking-[0.12em] text-[#6D6A63] uppercase">
                    <span className="flex items-baseline justify-between gap-3">
                      Phone
                      <span className="text-[10px] tracking-[0.14em] text-[#6D6A63]">Optional</span>
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={event => setPhone(event.target.value)}
                      autoComplete="tel"
                      className={FIELD}
                    />
                  </label>
                  <fieldset>
                    <legend className="text-[11px] font-semibold tracking-[0.12em] text-[#6D6A63] uppercase">
                      This note is about
                    </legend>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-[#2B2727]/60">Select all that apply.</p>
                    <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
                      {TOPICS.map(item => (
                        <button
                          key={item}
                          type="button"
                          aria-pressed={topics.includes(item)}
                          onClick={() => toggleTopic(item)}
                          className={topicClass(topics.includes(item))}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <label className="grid gap-1.5 text-[11px] font-semibold tracking-[0.12em] text-[#6D6A63] uppercase">
                    Message
                    <textarea
                      value={message}
                      onChange={event => setMessage(event.target.value)}
                      required
                      rows={5}
                      className={`${FIELD} resize-y`}
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={!ready}
                  className="mt-6 inline-flex min-h-12 items-center justify-center gap-3 bg-[#252520] px-5 text-[11px] font-semibold tracking-[0.1em] text-white uppercase transition-colors duration-200 hover:bg-[#141412] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ab8584] disabled:opacity-40"
                >
                  Send
                  <span aria-hidden="true">↗</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </article>
  )
}
