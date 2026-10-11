import { useState, useEffect } from 'react'

const MESSAGES = [
  'The Natural Prescription',
  'Never Tested on Animals',
  'Spa and Esthetician Partnerships',
  'Free Shipping on Orders Over $75',
  'A simple routine, built for real skin',
]

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setIndex(i => (i + 1) % MESSAGES.length)
        setFading(false)
      }, 400)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-stone text-charcoal text-center py-2.5 px-4 border-b border-gray-soft">
      <p
        className="text-[11px] tracking-[0.18em] uppercase font-sans font-medium transition-opacity duration-400"
        style={{ opacity: fading ? 0 : 1 }}
      >
        {MESSAGES[index]}
      </p>
    </div>
  )
}
