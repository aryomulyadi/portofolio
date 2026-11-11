import { Fragment, useEffect, useRef } from 'react'
import { marqueeItems } from '../data/marquee'

const REDUCED = '(prefers-reduced-motion: reduce)'

/**
 * v3 velocity marquee: scroll speed boosts the CSS animation's
 * playbackRate, easing back to 1× shortly after scrolling stops.
 */
export function Marquee() {
  const sequence = [...marqueeItems, ...marqueeItems]
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    if (window.matchMedia(REDUCED).matches) return

    let idle = 0
    let lastY = window.scrollY
    let lastT = performance.now()

    const apply = (rate: number) => {
      for (const anim of track.getAnimations()) {
        anim.playbackRate = rate
      }
    }

    const onScroll = () => {
      const now = performance.now()
      const dy = Math.abs(window.scrollY - lastY)
      const dt = Math.max(1, now - lastT)
      lastY = window.scrollY
      lastT = now
      apply(Math.min(1 + (dy / dt) * 4, 5))
      window.clearTimeout(idle)
      idle = window.setTimeout(() => apply(1), 160)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(idle)
    }
  }, [])

  return (
    <div className="overflow-hidden border-b border-ink bg-ink text-paper" aria-hidden>
      <div ref={trackRef} className="marquee-track">
        {sequence.map((item, index) => (
          <Fragment key={`${item}-${index}`}>
            <span>{item}</span>
            <span className="text-signal">/</span>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
