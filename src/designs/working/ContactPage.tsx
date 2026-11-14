import { useState, type FormEvent } from 'react'
import SocialLinks from './SocialLinks'
import { useSiteRoot } from './siteRoot'

const HEADING =
  'font-serif text-[clamp(40px,8vw,56px)] font-normal leading-[1.08] tracking-[-0.044em] min-[681px]:text-[clamp(44px,4vw,60px)]'
const EYEBROW = 'text-[13px] font-semibold tracking-[0.21em] uppercase text-[#ab8584]'
const SECTION = 'px-6 text-[#252520] min-[681px]:px-[max(36px,8vw)]'

const TOPICS = ['An order', 'A product or routine', 'Spa partnership', 'Something else'] as const

type Topic = (typeof TOPICS)[number]

const NOTES = [
  {
    index: '01',
    title: 'Orders',
    body: 'Free standard shipping on orders over $75. Unopened products can be returned within 30 days of delivery.',
  },
  {
    index: '02',
    title: 'Formulas',
    body: 'Ask about a product, a protocol step, or how a routine fits together.',
  },
  {
    index: '03',
    title: 'Partnership',
    body: 'Practices can apply for partner pricing. We follow up within 3–5 business days.',
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
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState<Topic | ''>('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const ready = Boolean(name.trim() && email.includes('@') && topic && message.trim())

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
            <p className={EYEBROW}>Write</p>
            <h2 className={`mt-4 ${HEADING}`}>A note is enough.</h2>
            <p className="mt-6 max-w-[540px] text-[17px] leading-relaxed text-[#595750]">
              Orders, formulas, and partnerships. Write here, and a reply comes back to the email you leave.
            </p>
            <ol className="mt-8 max-w-[540px] border-t border-[#E4DCD3]">
              {NOTES.map(item => (
                <li key={item.title} className="border-b border-[#E4DCD3] py-5">
                  <p className="font-serif text-[22px] leading-none tracking-[0.14em] text-[#ab8584] italic">{item.index}</p>
                  <h3 className="mt-3 font-serif text-[clamp(26px,2vw,32px)] leading-[1.12] font-normal tracking-[-0.03em]">{item.title}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-[#595750]">{item.body}</p>
                  {item.title === 'Partnership' ? (
                    <a
                      href={site.spa}
                      className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold tracking-[0.08em] text-[#ab8584] uppercase underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ab8584]"
                    >
                      Spa partners
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <p className={EYEBROW}>Find us</p>
              <SocialLinks
                className="mt-4 flex items-center gap-4"
                iconClassName="text-[#252520] transition-colors hover:text-[#ab8584]"
                strokeWidth={1.5}
              />
            </div>
          </div>

          <div className="border border-[#D6C3C2] bg-[#fffdfa] px-6 py-8 md:px-9 md:py-10">
            {sent ? (
              <div aria-live="polite">
                <p className="text-[10px] font-semibold tracking-[0.2em] text-[#2B2727]/60 uppercase">Note received</p>
                <h3 className="mt-4 font-serif text-[clamp(1.7rem,2.8vw,2.15rem)] leading-snug font-normal tracking-[-0.02em]">
                  Thank you, {name.trim()}.
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
                  Add your name, an email, and what the note is about.
                </p>
                <div className="mt-6 grid gap-3">
                  <label className="grid gap-1.5 text-[11px] font-semibold tracking-[0.12em] text-[#6D6A63] uppercase">
                    Name
                    <input
                      value={name}
                      onChange={event => setName(event.target.value)}
                      autoComplete="name"
                      required
                      className={FIELD}
                    />
                  </label>
                  <label className="grid gap-1.5 text-[11px] font-semibold tracking-[0.12em] text-[#6D6A63] uppercase">
                    Email
                    <input
                      type="email"
                      value={email}
                      onChange={event => setEmail(event.target.value)}
                      autoComplete="email"
                      required
                      className={FIELD}
                    />
                  </label>
                  <fieldset>
                    <legend className="text-[11px] font-semibold tracking-[0.12em] text-[#6D6A63] uppercase">
                      This note is about
                    </legend>
                    <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
                      {TOPICS.map(item => (
                        <button
                          key={item}
                          type="button"
                          aria-pressed={topic === item}
                          onClick={() => setTopic(item)}
                          className={topicClass(topic === item)}
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
