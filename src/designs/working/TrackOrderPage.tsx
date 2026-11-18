import { useState, type FormEvent } from 'react'
import { useSiteRoot } from './siteRoot'

const HEADING =
  'font-serif text-[clamp(40px,8vw,56px)] font-normal leading-[1.08] tracking-[-0.044em] min-[681px]:text-[clamp(44px,4vw,60px)]'
const FIELD =
  'w-full border border-[#D6C3C2] bg-white px-3 py-2.5 text-sm text-[#2B2727] outline-none placeholder:text-[#A39E96] focus:border-[#ab8584]'

export default function TrackOrderPage() {
  const site = useSiteRoot()
  const [orderNumber, setOrderNumber] = useState('')
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const ready = Boolean(orderNumber.trim() && email.includes('@'))

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!ready) return
    setSent(true)
  }

  return (
    <article className="bg-[#F7F4EF] font-sans text-[#252520]">
      <section className="bg-[#2B2727] px-4 py-14 text-[#F7F4EF] sm:px-6 md:py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h1 className={`text-[#F7F4EF] ${HEADING}`}>Track your order</h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#F7F4EF]/80">
            Use the order number from your confirmation email.
          </p>
        </div>
      </section>

      <section className="bg-[#FFFDFA] px-6 py-14 min-[681px]:px-[max(36px,8vw)] md:py-16">
        <div className="mx-auto max-w-lg border border-[#D6C3C2] bg-[#fffdfa] px-6 py-8 md:px-9 md:py-10">
          {sent ? (
            <div aria-live="polite">
              <p className="text-[10px] font-semibold tracking-[0.2em] text-[#2B2727]/60 uppercase">Order {orderNumber.trim()}</p>
              <h2 className="mt-4 font-serif text-[clamp(1.7rem,2.8vw,2.15rem)] leading-snug font-normal tracking-[-0.02em]">
                We have that number.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#2B2727]/70">
                Shipping updates are not connected yet. If you need help with this order, write to us and include {orderNumber.trim()}.
              </p>
              <a
                href={site.contact}
                className="group mt-6 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-[#ab8584] uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ab8584]"
              >
                <span className="underline-offset-4 group-hover:underline">Contact</span>
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          ) : (
            <form onSubmit={submit}>
              <h2 className="font-serif text-[clamp(1.7rem,2.8vw,2.15rem)] leading-snug font-normal tracking-[-0.02em]">
                Look up an order
              </h2>
              <p className="mt-3 text-[13px] leading-relaxed text-[#2B2727]/60">
                Order number and email are required.
              </p>
              <div className="mt-6 grid gap-3">
                <label className="grid gap-1.5 text-[11px] font-semibold tracking-[0.12em] text-[#6D6A63] uppercase">
                  <span className="flex items-baseline justify-between gap-3">
                    Order number
                    <span className="text-[10px] tracking-[0.14em] text-[#ab8584]">Required</span>
                  </span>
                  <input
                    value={orderNumber}
                    onChange={event => setOrderNumber(event.target.value)}
                    autoComplete="off"
                    required
                    aria-required="true"
                    className={FIELD}
                  />
                </label>
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
              </div>
              <button
                type="submit"
                disabled={!ready}
                className="mt-6 inline-flex min-h-12 items-center justify-center gap-3 bg-[#252520] px-5 text-[11px] font-semibold tracking-[0.1em] text-white uppercase transition-colors duration-200 hover:bg-[#141412] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ab8584] disabled:opacity-40"
              >
                Look up
                <span aria-hidden="true">↗</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </article>
  )
}
