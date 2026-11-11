import { useEffect, useRef } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { t } from '../data/translations'
import type { Dict } from '../data/translations'

const LABEL_KEYS: Record<string, keyof Dict> = {
  Zoom: 'cursorZoom',
  Drag: 'cursorDrag',
  Open: 'cursorOpen',
  Go: 'cursorGo',
  PDF: 'cursorPdf',
  View: 'cursorView',
  Mail: 'cursorMail',
}

/**
 * OD-01 contextual cursor: 12px signal dot → 76px labelled circle.
 * Fine pointers only (CSS gates display); disabled under reduced motion.
 */
export function ContextualCursor() {
  const { lang } = useLanguage()
  const dotRef = useRef<HTMLDivElement>(null)
  const xRef = useRef(0)
  const yRef = useRef(0)
  const frameRef = useRef(0)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const el = dotRef.current
    if (!el) return

    const move = (event: PointerEvent) => {
      xRef.current = event.clientX
      yRef.current = event.clientY
      if (frameRef.current) return
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = 0
        el.style.transform = `translate(${xRef.current}px, ${yRef.current}px)`
      })
    }

    const over = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest?.('[data-cur]') as
        | HTMLElement
        | null
      if (!target) {
        el.classList.remove('x')
        const label = el.querySelector('i')
        if (label) label.textContent = ''
        return
      }
      const raw = target.dataset.cur ?? 'Open'
      const key = LABEL_KEYS[raw]
      const label = el.querySelector('i')
      if (label) label.textContent = key ? t(key, lang) : raw
      el.classList.add('x')
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      cancelAnimationFrame(frameRef.current)
    }
  }, [lang])

  return (
    <div ref={dotRef} className="cur" aria-hidden="true">
      <i />
    </div>
  )
}
