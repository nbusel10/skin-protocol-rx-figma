import { useState } from 'react'

type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product'

interface SpaPartnersProps {
  onNavigate: (page: Page) => void
}

const BENEFITS = [
  { icon: '◈', title: 'Professional Product Line', body: 'Offer purposeful products designed to work together as a coordinated system.' },
  { icon: '◉', title: 'Easier Client Recommendations', body: 'Recommend by skin type, concern, and protocol step — no guesswork.' },
  { icon: '◇', title: 'Better Home-Care Consistency', body: 'Help clients maintain treatment results between professional appointments.' },
  { icon: '✦', title: 'Partner Pricing', body: 'Approved spa partners receive professional or wholesale pricing on all products.' },
  { icon: '◐', title: 'Education & Product Support', body: 'Access product information, routine guidance, and professional resources.' },
  { icon: '◑', title: 'Revenue Beyond the Treatment Room', body: 'Create ongoing retail opportunities through thoughtful client recommendations.' },
  { icon: '◔', title: 'Client Trust', body: 'A simple, coordinated line without overwhelming clients with unnecessary choices.' },
  { icon: '○', title: 'Family-Owned Support', body: 'A responsive, relationship-focused company that values its professional partners.' },
]

const PROCESS = [
  { step: '01', title: 'Apply', body: 'Complete our short partnership application with your business and professional details.' },
  { step: '02', title: 'Get Approved', body: 'Our team reviews your application and follows up within 3–5 business days.' },
  { step: '03', title: 'Access Partner Resources', body: 'Log in to your dedicated spa partner portal for products, pricing, and education.' },
  { step: '04', title: 'Recommend With Confidence', body: 'Start recommending Skin Protocol RX to clients with a clear, coordinated system behind you.' },
]

const SPA_TESTIMONIALS = [
  { name: 'Maria L., LE', business: 'NYC Skin Studio', text: 'My clients love being able to continue their protocol at home. The results speak for themselves between appointments.' },
  { name: 'Dr. Jennifer S.', business: 'Park Avenue Dermatology', text: 'Skin Protocol RX has made product recommendations simpler. Clients actually follow through because the routine is clear.' },
  { name: 'Aisha C., LE', business: 'Tribeca Wellness Spa', text: 'The ingredient quality is on par with clinical lines at a price point my clients are comfortable with.' },
]

const BUSINESS_TYPES = ['Day Spa', 'Med Spa', 'Esthetician Solo Practice', 'Dermatology Office', 'Wellness Center', 'Plastic Surgery Office', 'Other']

export default function SpaPartners({ onNavigate }: SpaPartnersProps) {
  const [showForm, setShowForm] = useState(false)
  const [formStep, setFormStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState({
    fullName: '', businessName: '', businessWebsite: '', email: '',
    phone: '', businessAddress: '', businessType: '', license: '',
    yearsInBusiness: '', treatmentRooms: '', currentLines: '',
    monthlyVolume: '', howToUse: '', socialMedia: '',
    agreed: false, password: '',
  })

  const updateForm = (k: keyof typeof form, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  const FORM_STEPS = [
    {
      title: 'Business Information',
      fields: (
        <div className="space-y-4">
          {[
            { key: 'fullName', label: 'Full Name', type: 'text' },
            { key: 'businessName', label: 'Business Name', type: 'text' },
            { key: 'businessWebsite', label: 'Business Website', type: 'url' },
            { key: 'email', label: 'Email Address', type: 'email' },
            { key: 'phone', label: 'Phone Number', type: 'tel' },
            { key: 'businessAddress', label: 'Business Address', type: 'text' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-xs tracking-widest uppercase text-charcoal/50 mb-2">{f.label}</label>
              <input
                type={f.type}
                value={form[f.key as keyof typeof form] as string}
                onChange={e => updateForm(f.key as keyof typeof form, e.target.value)}
                className="w-full border border-gray-soft bg-white px-4 py-3 text-sm focus:outline-none focus:border-rose transition-colors"
              />
            </div>
          ))}
          <div>
            <label className="block text-xs tracking-widest uppercase text-charcoal/50 mb-2">Business Type</label>
            <select
              value={form.businessType}
              onChange={e => updateForm('businessType', e.target.value)}
              className="w-full border border-gray-soft bg-white px-4 py-3 text-sm focus:outline-none focus:border-rose transition-colors"
            >
              <option value="">Select type…</option>
              {BUSINESS_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
      ),
    },
    {
      title: 'Professional Details',
      fields: (
        <div className="space-y-4">
          {[
            { key: 'license', label: 'Professional License or Certification', type: 'text' },
            { key: 'yearsInBusiness', label: 'Years in Business', type: 'number' },
            { key: 'treatmentRooms', label: 'Number of Treatment Rooms', type: 'number' },
            { key: 'currentLines', label: 'Current Retail Product Lines', type: 'text' },
            { key: 'monthlyVolume', label: 'Estimated Monthly Product Volume ($)', type: 'text' },
            { key: 'howToUse', label: 'How You Plan to Use Skin Protocol RX', type: 'text' },
            { key: 'socialMedia', label: 'Social Media Accounts', type: 'text' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-xs tracking-widest uppercase text-charcoal/50 mb-2">{f.label}</label>
              <input
                type={f.type}
                value={form[f.key as keyof typeof form] as string}
                onChange={e => updateForm(f.key as keyof typeof form, e.target.value)}
                className="w-full border border-gray-soft bg-white px-4 py-3 text-sm focus:outline-none focus:border-rose transition-colors"
              />
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Account Setup',
      fields: (
        <div className="space-y-4">
          <div>
            <label className="block text-xs tracking-widest uppercase text-charcoal/50 mb-2">Create Password</label>
            <input type="password" value={form.password} onChange={e => updateForm('password', e.target.value)}
              className="w-full border border-gray-soft bg-white px-4 py-3 text-sm focus:outline-none focus:border-rose transition-colors" />
          </div>
          <label className="flex items-start gap-3 cursor-pointer mt-4">
            <div
              className="w-5 h-5 mt-0.5 border flex items-center justify-center shrink-0 transition-colors"
              style={{ borderColor: form.agreed ? '#B8878B' : '#E5E5E5', backgroundColor: form.agreed ? '#B8878B' : 'transparent' }}
              onClick={() => updateForm('agreed', !form.agreed)}
            >
              {form.agreed && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5" strokeLinecap="round" /></svg>}
            </div>
            <span className="text-sm text-charcoal/60 leading-relaxed">I agree to the Skin Protocol RX Spa Partner Terms and understand that my application will be reviewed before access is granted.</span>
          </label>
        </div>
      ),
    },
  ]

  if (submitted) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center font-sans px-5">
        <div className="text-center max-w-md">
          <div className="w-12 h-12 bg-rose flex items-center justify-center mx-auto mb-6">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="font-serif text-3xl text-charcoal mb-4">Application Received</h2>
          <p className="text-charcoal/60 leading-relaxed mb-8">
            Thank you for applying to become a Skin Protocol RX spa partner. Our team will review your application and follow up within 3–5 business days.
          </p>
          <button onClick={() => onNavigate('home')} className="text-sm text-rose underline underline-offset-2">Return to Home</button>
        </div>
      </div>
    )
  }

  if (showForm) {
    return (
      <div className="bg-stone min-h-screen font-sans">
        <div className="max-w-2xl mx-auto px-5 md:px-8 py-16">
          <button onClick={() => setShowForm(false)} className="flex items-center gap-2 text-sm text-black/40 hover:text-black mb-10 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
          <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-2">Partnership Application</p>
          <h1 className="font-serif text-3xl md:text-4xl text-black mb-10">Spa Partner Application</h1>

          {/* Progress */}
          <div className="flex gap-1.5 mb-10">
            {FORM_STEPS.map((_, i) => (
              <div key={i} className="h-1 flex-1 transition-all duration-300"
                style={{ backgroundColor: i <= formStep ? '#B8878B' : '#E5E5E5' }} />
            ))}
          </div>

          <div className="bg-white p-8 border border-gray-soft">
            <h2 className="font-serif text-xl text-black mb-6">{FORM_STEPS[formStep].title}</h2>
            {FORM_STEPS[formStep].fields}
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => setFormStep(s => Math.max(0, s - 1))}
              disabled={formStep === 0}
              className="text-sm text-charcoal/40 disabled:opacity-30 hover:text-charcoal transition-colors"
            >← Back</button>
            {formStep < FORM_STEPS.length - 1 ? (
              <button
                onClick={() => setFormStep(s => s + 1)}
                className="bg-black text-white px-8 py-3 text-sm font-medium hover:bg-rose transition-colors"
              >Continue →</button>
            ) : (
              <button
                onClick={() => setSubmitted(true)}
                disabled={!form.agreed}
                className="bg-rose text-white px-8 py-3 text-sm font-medium hover:bg-rose-dark disabled:opacity-40 transition-colors"
              >Submit Application</button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white font-sans">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1761470575018-135c213340eb?w=1600&h=900&fit=crop&auto=format"
            alt="Spa environment"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-24">
          <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-5">For Spas & Estheticians</p>
          <h1 className="font-serif text-4xl md:text-6xl text-white max-w-2xl mb-6">
            Bring a Better Protocol to Your Treatment Room
          </h1>
          <p className="text-white/60 max-w-xl mb-10 leading-relaxed">
            Partner with Skin Protocol RX to give your clients a coordinated, professional skincare routine they can continue at home.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setShowForm(true)}
              className="bg-rose text-white px-8 py-4 text-sm font-medium hover:bg-rose-dark transition-colors"
            >
              Apply to Become a Spa Partner
            </button>
            <button className="border border-white/35 text-white px-8 py-4 text-sm font-medium hover:border-rose hover:text-rose transition-colors">
              Spa Partner Login
            </button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-black py-20 px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-3">Why Partner With Us</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white">Spa Partnership Benefits</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map(b => (
              <div key={b.title} className="border border-white/10 p-6 hover:border-rose transition-colors group">
                <div className="text-2xl text-rose mb-4 font-serif">{b.icon}</div>
                <h3 className="font-medium text-white mb-2 group-hover:text-rose transition-colors text-sm">{b.title}</h3>
                <p className="text-xs text-white/45 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-20 px-5 md:px-8 bg-stone">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-5">The Bigger Picture</p>
          <h2 className="font-serif text-3xl md:text-4xl text-black mb-6">Why It Matters to Your Practice</h2>
          <p className="text-black/55 leading-relaxed mb-5">
            Great treatments do not end when the client leaves the spa. A consistent home-care protocol helps clients protect their investment, remain engaged with their skincare goals, and return for continued professional guidance.
          </p>
          <p className="text-black/55 leading-relaxed">
            When you recommend a coordinated system rather than disconnected products, clients are more likely to follow through, see results, and come back for more.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-20 px-5 md:px-8 border-y border-gray-soft">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-3">The Process</p>
            <h2 className="font-serif text-3xl md:text-4xl text-black">How the Partnership Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS.map(p => (
              <div key={p.step} className="flex flex-col gap-4">
                <div className="font-serif text-4xl text-rose/50">{p.step}</div>
                <h3 className="text-lg font-medium text-black">{p.title}</h3>
                <p className="text-black/50 text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-5 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-12 text-center">Professional Reviews</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SPA_TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white p-8 flex flex-col gap-4">
                <p className="font-serif text-base italic text-black leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-auto pt-4 border-t border-gray-soft">
                  <p className="text-sm font-medium text-black">{t.name}</p>
                  <p className="text-xs text-black/40">{t.business}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-5 md:px-8 text-center bg-stone border-t border-gray-soft">
        <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-4">Ready to Partner?</p>
        <h2 className="font-serif text-3xl md:text-4xl text-black mb-4">Give Your Clients a Protocol They Can Continue at Home</h2>
        <p className="text-black/55 mb-10 max-w-xl mx-auto">Join Skin Protocol RX&apos;s professional partner network and add a coordinated home-care line to your practice.</p>
        <button
          onClick={() => setShowForm(true)}
          className="bg-black text-white px-10 py-4 text-sm font-medium hover:bg-rose transition-colors"
        >
          Start Your Partnership Application
        </button>
      </section>
    </div>
  )
}
