import { useEffect, useRef, useState } from "react"
import { submitProtocolEmail, type ProtocolEmailPayload } from "../lib/emailProtocol"

interface EmailProtocolModalProps {
  isOpen: boolean
  onClose: () => void
  protocol: ProtocolEmailPayload["protocol"]
}

export default function EmailProtocolModal({ isOpen, onClose, protocol }: EmailProtocolModalProps) {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isOpen) return
    setEmail("")
    setFirstName("")
    setMarketingConsent(false)
    setStatus("idle")
    setErrorMessage("")
    requestAnimationFrame(() => emailRef.current?.focus())
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && status !== "submitting") onClose()
    }
    document.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose, status])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")
    setErrorMessage("")

    try {
      await submitProtocolEmail({
        email: email.trim(),
        firstName: firstName.trim() || undefined,
        marketingConsent,
        protocol,
      })
      setStatus("success")
    } catch (err) {
      setStatus("error")
      setErrorMessage(err instanceof Error ? err.message : "Could not send your protocol. Please try again.")
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-protocol-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-charcoal/60"
        aria-label="Close dialog"
        onClick={status === "submitting" ? undefined : onClose}
      />

      <div className="relative w-full max-w-md bg-white border border-gray-soft shadow-xl font-sans">
        {status === "success" ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 bg-rose flex items-center justify-center mx-auto mb-5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 id="email-protocol-title" className="font-serif text-2xl text-charcoal mb-3">
              Your Protocol Is on Its Way
            </h2>
            <p className="text-sm text-charcoal/60 leading-relaxed mb-6">
              Check your inbox in a few minutes for your personalized routine.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="bg-rose text-white px-8 py-3 text-sm font-medium hover:bg-rose-dark transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="p-6 md:p-8 border-b border-gray-soft">
              <h2 id="email-protocol-title" className="font-serif text-2xl text-charcoal mb-2">
                Email My Protocol
              </h2>
              <p className="text-sm text-charcoal/50 leading-relaxed">
                We&apos;ll send your recommended products and routine steps to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
              <div>
                <label htmlFor="protocol-email" className="block text-xs tracking-widest uppercase text-charcoal/50 mb-2">
                  Email Address
                </label>
                <input
                  ref={emailRef}
                  id="protocol-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === "submitting"}
                  placeholder="you@example.com"
                  className="w-full border border-gray-soft bg-white px-4 py-3 text-sm focus:outline-none focus:border-rose transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="protocol-first-name" className="block text-xs tracking-widest uppercase text-charcoal/50 mb-2">
                  First Name <span className="normal-case tracking-normal text-charcoal/30">(optional)</span>
                </label>
                <input
                  id="protocol-first-name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={status === "submitting"}
                  placeholder="Your first name"
                  className="w-full border border-gray-soft bg-white px-4 py-3 text-sm focus:outline-none focus:border-rose transition-colors disabled:opacity-50"
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer pt-1">
                <div
                  className="w-5 h-5 mt-0.5 border flex items-center justify-center shrink-0 transition-colors"
                  style={{
                    borderColor: marketingConsent ? "#B8878B" : "#E5E5E5",
                    backgroundColor: marketingConsent ? "#B8878B" : "transparent",
                  }}
                  onClick={() => status !== "submitting" && setMarketingConsent((v) => !v)}
                  role="checkbox"
                  aria-checked={marketingConsent}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault()
                      if (status !== "submitting") setMarketingConsent((v) => !v)
                    }
                  }}
                >
                  {marketingConsent && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-charcoal/60 leading-relaxed">
                  Send me skincare tips, new releases, and exclusive offers
                </span>
              </label>

              <p className="text-xs text-charcoal/35">We respect your privacy. Unsubscribe anytime.</p>

              {status === "error" && (
                <p className="text-sm text-red-600" role="alert">{errorMessage}</p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="flex-1 bg-rose text-white py-3.5 text-sm font-medium hover:bg-rose-dark transition-colors disabled:opacity-50"
                >
                  {status === "submitting" ? "Sending…" : "Send My Protocol"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  disabled={status === "submitting"}
                  className="flex-1 border border-gray-soft text-charcoal py-3.5 text-sm font-medium hover:border-charcoal/30 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
