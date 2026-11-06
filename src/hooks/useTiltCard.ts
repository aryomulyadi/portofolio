import { useCallback, useEffect, useRef } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'

/**
 * Mouse-tracked 3D tilt shared across cards: writes `--rx`/`--ry` (max ±maxDeg),
 * `--mx`/`--my` (%) for glare and spotlight position on `event.currentTarget`.
 * Disabled for coarse pointers / reduced motion.
 */
export function useTiltCard(maxDeg = 8) {
  const frameRef = useRef(0)
  const enabledRef = useRef(false)

  useEffect(() => {
    enabledRef.current =
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (!enabledRef.current) return
      const el = event.currentTarget
      const rect = el.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width
      const py = (event.clientY - rect.top) / rect.height
      cancelAnimationFrame(frameRef.current)
      frameRef.current = requestAnimationFrame(() => {
        el.style.setProperty('--ry', `${(px - 0.5) * 2 * maxDeg}deg`)
        el.style.setProperty('--rx', `${(0.5 - py) * 2 * maxDeg}deg`)
        el.style.setProperty('--mx', `${px * 100}%`)
        el.style.setProperty('--my', `${py * 100}%`)
      })
    },
    [maxDeg],
  )

  const onPointerLeave = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    cancelAnimationFrame(frameRef.current)
    const el = event.currentTarget
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--mx', '50%')
    el.style.setProperty('--my', '50%')
  }, [])

  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])

  return { onPointerMove, onPointerLeave }
}
