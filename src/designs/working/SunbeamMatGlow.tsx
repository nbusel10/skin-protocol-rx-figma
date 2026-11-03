import { useEffect, useRef, useState } from 'react'

/**
 * Soft Rose/Lily wash: stretches top-right → bottom-left once on enter and stays there.
 * Must sit behind the photo inside a relative overflow-hidden frame.
 */
export default function SunbeamMatGlow() {
  const rootRef = useRef<HTMLDivElement>(null)
  const inViewRef = useRef(false)
  const [playKey, setPlayKey] = useState(0)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (inViewRef.current) return
          inViewRef.current = true
          // Remount beam so the animation always restarts cleanly (no opacity pop).
          setPlayKey(k => k + 1)
        } else {
          inViewRef.current = false
          setPlayKey(0)
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -6% 0px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={rootRef}
      className="sp-sunbeam pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {playKey > 0 ? <div key={playKey} className="sp-sunbeam-beam sp-sunbeam-beam--run" /> : null}
    </div>
  )
}
