import { useState, useEffect } from 'react'

const MESSAGES = [
  'Family-Owned and Created in New York',
  'Professional Skincare Without Unnecessary Additives',
  'Cruelty-Free Formulas — Never Tested on Animals',
  'Spa and Esthetician Partnerships Available',
  'Free Shipping on Orders Over $75',
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
    <div className="bg-black text-white text-center py-2.5 px-4 border-b border-white/10">
      <p
        className="text-[11px] tracking-[0.25em] uppercase font-sans font-medium transition-opacity duration-400"
        style={{ opacity: fading ? 0 : 1 }}
      >
        <span className="text-rose">{MESSAGES[index]}</span>
      </p>
    </div>
  )
}
