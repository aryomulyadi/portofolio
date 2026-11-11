import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { CreativeWork, Lang } from '../../types'
import { t } from '../../data/translations'

interface BannerHallwayProps {
  work: CreativeWork
  lang: Lang
  onOpenLightbox: (globalWorkId: string) => void
}

const STRIP_POS = ['50% 0%', '50% 50%', '50% 100%']
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * FR-CRE-D "Exhibition Hallway": three strips cropped from the composite,
 * drag/swipe with snap (scroll-snap), thin red progress bar, prev/next,
 * no wheel hijack. Reduced motion → jump without smooth scroll.
 */
export function BannerHallway({ work, lang, onOpenLightbox }: BannerHallwayProps) {
  const hallRef = useRef<HTMLDivElement>(null)
  const stripRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [active, setActive] = useState(0)
  const [dragging, setDragging] = useState(false)
  const dragState = useRef({ startX: 0, scrollLeft: 0, moved: false })

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(2, index))
    const el = stripRefs.current[clamped]
    if (!el) return
    el.scrollIntoView({
      behavior: reduced() ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    })
    setActive(clamped)
  }, [])

  const onScroll = useCallback(() => {
    const hall = hallRef.current
    if (!hall) return
    const center = hall.scrollLeft + hall.clientWidth / 2
    let best = 0
    let bestDist = Infinity
    stripRefs.current.forEach((el, i) => {
      if (!el) return
      const elCenter = el.offsetLeft + el.offsetWidth / 2
      const dist = Math.abs(elCenter - center)
      if (dist < bestDist) {
        bestDist = dist
        best = i
      }
    })
    setActive(best)
  }, [])

  useEffect(() => {
    const hall = hallRef.current
    if (!hall) return
    hall.addEventListener('scroll', onScroll, { passive: true })
    return () => hall.removeEventListener('scroll', onScroll)
  }, [onScroll])

  /* desktop drag-to-scroll (touch uses native momentum + snap) */
  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return
    const hall = hallRef.current
    if (!hall) return
    dragState.current = {
      startX: event.clientX,
      scrollLeft: hall.scrollLeft,
      moved: false,
    }
    setDragging(true)
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return
    const hall = hallRef.current
    if (!hall) return
    const dx = event.clientX - dragState.current.startX
    if (Math.abs(dx) > 6) dragState.current.moved = true
    hall.scrollLeft = dragState.current.scrollLeft - dx
  }

  const endDrag = () => {
    if (!dragging) return
    setDragging(false)
    if (dragState.current.moved) {
      // snap to nearest after manual drag
      const hall = hallRef.current
      if (hall) {
        const center = hall.scrollLeft + hall.clientWidth / 2
        let best = 0
        let bestDist = Infinity
        stripRefs.current.forEach((el, i) => {
          if (!el) return
          const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center)
          if (dist < bestDist) {
            bestDist = dist
            best = i
          }
        })
        goTo(best)
      }
    }
  }

  return (
    <div className="border border-grey shadow-[8px_8px_0_var(--color-grey)]">
      <div
        ref={hallRef}
        className={`hall${dragging ? ' is-dragging' : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        data-cur="Drag"
      >
        {STRIP_POS.map((pos, i) => (
          <div className="hp" key={pos}>
            <button
              ref={(el) => {
                stripRefs.current[i] = el
              }}
              type="button"
              onClick={() => {
                if (!dragState.current.moved) onOpenLightbox(work.id)
              }}
              data-cur="Zoom"
              aria-label={`${work.title[lang]} — ${i + 1}/3`}
              className="strip"
              style={
                {
                  ['--src' as string]: `url(${work.image})`,
                  backgroundPosition: pos,
                } as CSSProperties
              }
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 border-t border-grey px-4 py-3">
        <div className="hbar m-0 flex-1" aria-hidden>
          <i style={{ width: `${((active + 1) / 3) * 100}%` }} />
        </div>

        <span className="index-num shrink-0 text-xs text-grey" aria-live="polite">
          {String(active + 1).padStart(2, '0')} / 03
        </span>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label={t('prevImage', lang)}
            className="deck-btn"
          >
            <ChevronLeft size={15} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === 2}
            aria-label={t('nextImage', lang)}
            className="deck-btn"
          >
            <ChevronRight size={15} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  )
}
