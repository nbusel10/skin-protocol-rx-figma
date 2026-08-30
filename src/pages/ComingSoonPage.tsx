type Page = 'home' | 'shop' | 'protocol' | 'story' | 'spa' | 'product' | 'glossary' | 'education'

interface ComingSoonPageProps {
  eyebrow: string
  title: string
  body: string
  onNavigate: (page: Page) => void
}

export default function ComingSoonPage({ eyebrow, title, body, onNavigate }: ComingSoonPageProps) {
  return (
    <div className="bg-white font-sans min-h-[70vh]">
      <section className="bg-black py-24 md:py-32 px-5 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-rose mb-5">{eyebrow}</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">{title}</h1>
          <p className="text-white/55 leading-relaxed max-w-xl mx-auto mb-4">{body}</p>
          <p className="text-[11px] tracking-[0.25em] uppercase text-white/35 mb-10">Coming soon</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('shop')}
              className="bg-rose text-white px-7 py-3.5 text-sm tracking-wide font-medium hover:bg-rose-dark transition-colors"
            >
              Shop the Collection
            </button>
            <button
              onClick={() => onNavigate('protocol')}
              className="border border-white/30 text-white px-7 py-3.5 text-sm tracking-wide font-medium hover:border-rose hover:text-rose transition-colors"
            >
              Build Your Protocol
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
