import { useEffect, useRef, useState } from 'react'

interface GalleryCursorProps {
  label: string
}

type CursorMode = 'hidden' | 'dot' | 'view'

/**
 * Desktop-only enhancement: a lerped cursor dot that grows into a "view" badge
 * over gallery media. Never mounted on coarse pointers or reduced motion —
 * all interactions work without it.
 */
export function GalleryCursor({ label }: GalleryCursorProps) {
  const dotRef = useRef<HTMLDivElement>(null)
  const modeRef = useRef<CursorMode>('hidden')
  const [enabled, setEnabled] = useState(false)
  const [mode, setMode] = useState<CursorMode>('hidden')

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    setEnabled(true)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const el = dotRef.current
    if (!el) return

    let targetX = -200
    let targetY = -200
    let x = -200
    let y = -200
    let raf = 0

    const render = () => {
      x += (targetX - x) * 0.22
      y += (targetY - y) * 0.22
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    const applyMode = (next: CursorMode) => {
      if (next === modeRef.current) return
      modeRef.current = next
      setMode(next)
    }

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      const target = event.target instanceof Element ? event.target : null
      if (target?.closest('[data-cursor="view"]')) {
        applyMode('view')
      } else if (target?.closest('[data-cursor-zone]')) {
        applyMode('dot')
      } else {
        applyMode('hidden')
      }
    }

    const onLeave = () => applyMode('hidden')

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={dotRef}
      aria-hidden
      className={`gallery-cursor${mode === 'dot' ? ' is-dot' : mode === 'view' ? ' is-view' : ''}`}
    >
      <span className="gallery-cursor-label">{label}</span>
    </div>
  )
}
