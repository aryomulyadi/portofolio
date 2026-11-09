import { useCallback, useEffect, useRef, useState } from 'react'
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from 'react'
import type { CreativeWork, Lang } from '../../types'

interface InfiniteRailProps {
  items: CreativeWork[]
  /** Remounts the track on category change to replay entrance animation. */
  filterKey: string
  lang: Lang
  onSelect: (index: number) => void
  selectLabel: string
}

/* Editorial asymmetric tile sizes — 8-cycle */
const tileWidths = [
  'w-[74vw] sm:w-[44vw] lg:w-[32vw]',
  'w-[58vw] sm:w-[32vw] lg:w-[23vw]',
  'w-[66vw] sm:w-[38vw] lg:w-[27vw]',
  'w-[54vw] sm:w-[28vw] lg:w-[20vw]',
  'w-[74vw] sm:w-[44vw] lg:w-[32vw]',
  'w-[58vw] sm:w-[32vw] lg:w-[23vw]',
  'w-[66vw] sm:w-[38vw] lg:w-[27vw]',
  'w-[82vw] sm:w-[52vw] lg:w-[38vw]',
]

const tileAspects = [
  'aspect-[16/10]',
  'aspect-[4/5]',
  'aspect-[3/4]',
  'aspect-square',
  'aspect-[16/10]',
  'aspect-[4/5]',
  'aspect-[3/4]',
  'aspect-[21/9]',
]

const DRAG_START_PX = 6
const BLOCKS = [0, 1, 2] as const

export function InfiniteRail({ items, filterKey, lang, onSelect, selectLabel }: InfiniteRailProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const firstBlockRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({ active: false, pointerId: -1, startX: 0, startScroll: 0, lastX: 0, moved: false, vel: 0 })
  const momentumRef = useRef(0)
  const suppressClickRef = useRef(false)
  const [isDragging, setIsDragging] = useState(false)

  const cancelMomentum = useCallback(() => {
    if (momentumRef.current) {
      cancelAnimationFrame(momentumRef.current)
      momentumRef.current = 0
    }
  }, [])

  /* Seamless wrap: keep scrollLeft inside [P, 2P) — P = full period (block width + seam gap) */
  const normalize = useCallback(() => {
    const vp = viewportRef.current
    const block = firstBlockRef.current
    if (!vp || !block) return
    const sibling = block.nextElementSibling as HTMLElement | null
    const period = sibling ? sibling.offsetLeft - block.offsetLeft : block.offsetWidth
    if (period <= 0) return
    const wrapped = (((vp.scrollLeft % period) + period) % period) + period
    if (wrapped !== vp.scrollLeft) vp.scrollLeft = wrapped
  }, [])

  // Initial position + wrap on resize / scroll
  useEffect(() => {
    const vp = viewportRef.current
    if (!vp) return
    normalize()
    const onScroll = () => normalize()
    vp.addEventListener('scroll', onScroll, { passive: true })
    const observer = new ResizeObserver(() => normalize())
    if (firstBlockRef.current) observer.observe(firstBlockRef.current)
    return () => {
      vp.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [normalize, filterKey])

  // Mouse wheel → horizontal (trackpad horizontal deltas stay native)
  useEffect(() => {
    const vp = viewportRef.current
    if (!vp) return
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
      event.preventDefault()
      cancelMomentum()
      vp.scrollLeft += event.deltaY
    }
    vp.addEventListener('wheel', onWheel, { passive: false })
    return () => vp.removeEventListener('wheel', onWheel)
  }, [cancelMomentum, filterKey])

  const runMomentum = useCallback(() => {
    const vp = viewportRef.current
    if (!vp) return
    const step = () => {
      const drag = dragRef.current
      if (drag.active) return
      drag.vel *= 0.94
      if (Math.abs(drag.vel) < 0.4) {
        momentumRef.current = 0
        return
      }
      vp.scrollLeft -= drag.vel
      momentumRef.current = requestAnimationFrame(step)
    }
    momentumRef.current = requestAnimationFrame(step)
  }, [])

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return // native touch momentum scroll
    if (event.button !== 0) return
    cancelMomentum()
    const vp = viewportRef.current
    if (!vp) return
    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScroll: vp.scrollLeft,
      lastX: event.clientX,
      moved: false,
      vel: 0,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    setIsDragging(true)
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag.active || event.pointerId !== drag.pointerId) return
    const vp = viewportRef.current
    if (!vp) return
    const dx = event.clientX - drag.startX
    if (!drag.moved && Math.abs(dx) > DRAG_START_PX) {
      drag.moved = true
      suppressClickRef.current = true
      window.setTimeout(() => {
        suppressClickRef.current = false
      }, 350)
    }
    if (drag.moved) {
      drag.vel = event.clientX - drag.lastX
      drag.lastX = event.clientX
      vp.scrollLeft = drag.startScroll - dx
    }
  }

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (event.pointerId !== drag.pointerId) return
    try {
      event.currentTarget.releasePointerCapture(event.pointerId)
    } catch {
      /* already released */
    }
    drag.active = false
    drag.pointerId = -1
    setIsDragging(false)
    if (drag.moved && Math.abs(drag.vel) > 0.4) runMomentum()
  }

  const onClickCapture = (event: ReactMouseEvent<HTMLButtonElement>) => {
    if (suppressClickRef.current) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  useEffect(
    () => () => {
      cancelMomentum()
      if (momentumRef.current) cancelAnimationFrame(momentumRef.current)
    },
    [cancelMomentum],
  )

  return (
    <div
      ref={viewportRef}
      className={`rail-viewport w-full${isDragging ? ' is-dragging' : ''}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div key={filterKey} className="rail-track flex items-end gap-4 md:gap-5">
        {BLOCKS.map((block) => (
          <div
            key={block}
            ref={block === 0 ? firstBlockRef : undefined}
            aria-hidden={block !== 0 ? true : undefined}
            className="flex shrink-0 items-end gap-4 md:gap-5"
          >
            {items.map((work, index) => (
              <button
                key={`${block}-${work.id}`}
                type="button"
                tabIndex={block === 0 ? undefined : -1}
                onClick={() => onSelect(index)}
                onClickCapture={onClickCapture}
                aria-label={block === 0 ? `${work.title[lang]} — ${selectLabel}` : undefined}
                className={`rail-tile rail-tile-in group block shrink-0 text-left ${tileWidths[index % tileWidths.length]}`}
                style={{ animationDelay: `${index * 45}ms` }}
              >
                <span
                  className={`relative block overflow-hidden border border-line-dark/60 bg-midnight ${tileAspects[index % tileAspects.length]}`}
                >
                  <img
                    src={work.image}
                    alt=""
                    loading={block === 0 && index < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-midnight-deep/85 via-midnight-deep/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </span>
                <span className="mt-3 flex items-baseline justify-between gap-3">
                  <span className="flex min-w-0 items-baseline gap-3">
                    <span className="font-body text-xs font-bold tabular-nums text-electric/70">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="truncate font-display-bold text-sm font-medium text-paper transition-colors group-hover:text-electric">
                      {work.title[lang]}
                    </span>
                  </span>
                  <span className="shrink-0 font-body text-[0.68rem] uppercase tracking-wider text-paper/45">
                    {work.categoryLabel[lang]}
                    {work.year ? ` · ${work.year}` : ''}
                  </span>
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
