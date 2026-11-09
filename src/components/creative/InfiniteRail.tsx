import { useCallback, useEffect, useRef, useState } from 'react'
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from 'react'
import type { CreativeWork, Lang } from '../../types'

interface InfiniteRailProps {
  items: CreativeWork[]
  /** Remounts the track on category change to replay entrance animation. */
  filterKey: string
  lang: Lang
  /** Current showcase work — marks the active tile and drives center-scroll from parent. */
  activeIndex: number
  onSelect: (index: number) => void
  /** Emitted on hover / focus / drag-settle — parent updates stage only. */
  onActiveChange: (index: number) => void
  /** True while the case-study dialog is open — suspends the auto-drift. */
  paused: boolean
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

const DRIFT_SPEED = 0.06 // px per ms (~60px/s ambient drift)
const DRIFT_HOLD_MS = 2600 // pause after an explicit center-scroll
const EASE_MS = 650
const DRAG_START_PX = 6
const BLOCKS = [0, 1, 2] as const

export function InfiniteRail({
  items,
  filterKey,
  lang,
  activeIndex,
  onSelect,
  onActiveChange,
  paused,
  selectLabel,
}: InfiniteRailProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const firstBlockRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({ active: false, pointerId: -1, startX: 0, startScroll: 0, lastX: 0, moved: false, vel: 0 })
  const momentumRef = useRef(0)
  const suppressClickRef = useRef(false)
  const motionRef = useRef({ hover: false, touch: false, inView: true, holdUntil: 0 })
  const pausedRef = useRef(false)
  const reducedRef = useRef(false)
  const easeRef = useRef<{ from: number; to: number; start: number } | null>(null)
  const periodRef = useRef(0)
  const emittedRef = useRef<number | null>(null)
  const rafRef = useRef(0)
  const lastTickRef = useRef(0)
  const activeChangeRef = useRef(onActiveChange)
  activeChangeRef.current = onActiveChange
  const [isDragging, setIsDragging] = useState(false)

  const cancelMomentum = useCallback(() => {
    if (momentumRef.current) {
      cancelAnimationFrame(momentumRef.current)
      momentumRef.current = 0
    }
  }, [])

  /* Seamless wrap: keep scrollLeft inside [P, 2P) — P = block width + seam gap */
  const normalize = useCallback(() => {
    const vp = viewportRef.current
    const block = firstBlockRef.current
    if (!vp || !block) return
    const sibling = block.nextElementSibling as HTMLElement | null
    const period = sibling ? sibling.offsetLeft - block.offsetLeft : block.offsetWidth
    if (period <= 0) return
    periodRef.current = period
    const wrapped = (((vp.scrollLeft % period) + period) % period) + period
    if (wrapped !== vp.scrollLeft) vp.scrollLeft = wrapped
  }, [])

  // Initial position + wrap on scroll / resize / filter remount
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

  // Reduced-motion + off-screen pause for the ambient drift
  useEffect(() => {
    const vp = viewportRef.current
    if (!vp) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncReduced = () => {
      reducedRef.current = mq.matches
    }
    syncReduced()
    mq.addEventListener('change', syncReduced)
    const io = new IntersectionObserver(
      ([entry]) => {
        motionRef.current.inView = entry.isIntersecting
      },
      { threshold: 0 },
    )
    io.observe(vp)
    return () => {
      mq.removeEventListener('change', syncReduced)
      io.disconnect()
    }
  }, [])

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  // Living-reel loop: ambient drift + eased center-scroll
  useEffect(() => {
    const tick = (t: number) => {
      const vp = viewportRef.current
      if (vp) {
        const dt = lastTickRef.current ? Math.min(t - lastTickRef.current, 64) : 16
        lastTickRef.current = t
        const ease = easeRef.current
        if (ease) {
          const p = Math.min(1, (t - ease.start) / EASE_MS)
          const eased = 1 - Math.pow(1 - p, 3)
          vp.scrollLeft = ease.from + (ease.to - ease.from) * eased
          if (p >= 1) easeRef.current = null
        } else {
          const m = motionRef.current
          const shouldDrift =
            !reducedRef.current &&
            !pausedRef.current &&
            !m.hover &&
            !m.touch &&
            !dragRef.current.active &&
            !momentumRef.current &&
            m.inView &&
            t >= m.holdUntil
          if (shouldDrift) vp.scrollLeft += dt * DRIFT_SPEED
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  /* Center a tile — parent-driven (stage arrows / filter). Nearest equivalent
     to current scroll keeps the easing path inside one period (no normalize fight). */
  const centerOn = useCallback((index: number, animate: boolean) => {
    const vp = viewportRef.current
    if (!vp) return
    const tiles = Array.from(vp.querySelectorAll<HTMLElement>(`.rail-tile[data-index="${index}"]`))
    if (tiles.length === 0) return
    const vpRect = vp.getBoundingClientRect()
    const cx = vpRect.left + vpRect.width / 2
    let target = tiles[0]
    let best = Infinity
    for (const tile of tiles) {
      const r = tile.getBoundingClientRect()
      const d = Math.abs(r.left + r.width / 2 - cx)
      if (d < best) {
        best = d
        target = tile
      }
    }
    const desired = vp.scrollLeft + (target.getBoundingClientRect().left + target.offsetWidth / 2) - cx
    const period = periodRef.current
    let to = desired
    if (period > 0) {
      const canonical = (((desired % period) + period) % period) + period
      const k = Math.round((vp.scrollLeft - canonical) / period)
      to = canonical + k * period
    }
    if (animate && !reducedRef.current) {
      easeRef.current = { from: vp.scrollLeft, to, start: performance.now() }
      motionRef.current.holdUntil = performance.now() + EASE_MS + DRIFT_HOLD_MS
    } else {
      vp.scrollLeft = to
      motionRef.current.holdUntil = performance.now() + 400
    }
  }, [])

  // Stage → rail sync (skip when the change originated from the rail itself)
  useEffect(() => {
    const fromRail = emittedRef.current === activeIndex
    emittedRef.current = null
    if (fromRail) return
    centerOn(activeIndex, true)
  }, [activeIndex, filterKey, centerOn])

  const emitActive = useCallback((index: number) => {
    emittedRef.current = index
    activeChangeRef.current(index)
  }, [])

  const emitCentered = useCallback(() => {
    const vp = viewportRef.current
    if (!vp) return
    const vpRect = vp.getBoundingClientRect()
    const cx = vpRect.left + vpRect.width / 2
    let best: HTMLElement | null = null
    let bestD = Infinity
    vp.querySelectorAll<HTMLElement>('.rail-tile[data-index]').forEach((tile) => {
      const r = tile.getBoundingClientRect()
      const d = Math.abs(r.left + r.width / 2 - cx)
      if (d < bestD) {
        bestD = d
        best = tile
      }
    })
    if (best) emitActive(Number((best as HTMLElement).dataset.index))
  }, [emitActive])

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

  const onPointerEnter = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') motionRef.current.hover = true
  }

  const onPointerLeave = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') motionRef.current.hover = false
  }

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') {
      // Native touch momentum scroll — suspend the drift until release
      motionRef.current.touch = true
      const clear = () => {
        motionRef.current.touch = false
        motionRef.current.holdUntil = performance.now() + 1000
        window.removeEventListener('pointerup', clear)
        window.removeEventListener('pointercancel', clear)
      }
      window.addEventListener('pointerup', clear)
      window.addEventListener('pointercancel', clear)
      return
    }
    if (event.button !== 0) return
    cancelMomentum()
    easeRef.current = null
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
    if (drag.moved) {
      emitCentered() // settle: nearest tile to center becomes the showcase
      if (!reducedRef.current && Math.abs(drag.vel) > 0.4) runMomentum()
    }
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
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    },
    [cancelMomentum],
  )

  return (
    <div
      ref={viewportRef}
      className={`rail-viewport w-full${isDragging ? ' is-dragging' : ''}`}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
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
            {items.map((work, index) => {
              const isActive = index === activeIndex
              return (
                <button
                  key={`${block}-${work.id}`}
                  type="button"
                  data-index={index}
                  tabIndex={block === 0 ? undefined : -1}
                  onClick={() => onSelect(index)}
                  onClickCapture={onClickCapture}
                  onMouseEnter={() => emitActive(index)}
                  onFocus={() => emitActive(index)}
                  aria-label={block === 0 ? `${work.title[lang]} — ${selectLabel}` : undefined}
                  aria-current={isActive ? 'true' : undefined}
                  className={`rail-tile rail-tile-in group block shrink-0 text-left ${isActive ? 'is-active ' : ''}${tileWidths[index % tileWidths.length]}`}
                  style={{ animationDelay: `${index * 45}ms` }}
                >
                  <span
                    className={`relative block overflow-hidden border bg-midnight ${isActive ? 'border-electric' : 'border-line-dark/60'} ${tileAspects[index % tileAspects.length]}`}
                  >
                    <img
                      src={work.image}
                      alt=""
                      loading={block === 0 && index < 2 ? 'eager' : 'lazy'}
                      decoding="async"
                      draggable={false}
                      className="h-full w-full object-cover group-hover:scale-[1.03]"
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
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
