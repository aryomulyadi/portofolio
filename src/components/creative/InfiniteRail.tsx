import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from 'react'
import type { CreativeWork, Lang } from '../../types'

export interface RailChapter {
  key: string
  label: string
  startIndex: number
  count: number
}

interface InfiniteRailProps {
  items: CreativeWork[]
  /** Ordered chapter groups — renders an editorial header block before each group. */
  chapters: RailChapter[]
  lang: Lang
  /** Current showcase work — marks the active tile and drives center-scroll from parent. */
  activeIndex: number
  onSelect: (index: number) => void
  /** Emitted on hover / focus / settle — parent updates stage only. */
  onActiveChange: (index: number) => void
  selectLabel: string
}

/* Width follows the ratio — landscape reads wide, portrait reads tall (bottom-aligned strip). */
const aspectStyles: Record<CreativeWork['aspect'], { cls: string; width: string }> = {
  '16/9': { cls: 'aspect-16-9', width: 'w-[74vw] sm:w-[44vw] lg:w-[32vw]' },
  '5/4': { cls: 'aspect-5-4', width: 'w-[66vw] sm:w-[38vw] lg:w-[26vw]' },
  '4/5': { cls: 'aspect-4-5', width: 'w-[54vw] sm:w-[31vw] lg:w-[21vw]' },
}

const EASE_MS = 650
const SETTLE_MS = 160
const DRAG_START_PX = 6
const CENTER_EPSILON = 3
const BLOCKS = [0, 1, 2] as const

export function InfiniteRail({
  items,
  chapters,
  lang,
  activeIndex,
  onSelect,
  onActiveChange,
  selectLabel,
}: InfiniteRailProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const firstBlockRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({ active: false, pointerId: -1, startX: 0, startScroll: 0, lastX: 0, moved: false, vel: 0 })
  const momentumRef = useRef(0)
  const easeRafRef = useRef(0)
  const settleTimerRef = useRef(0)
  const suppressClickRef = useRef(false)
  const reducedRef = useRef(false)
  const easeRef = useRef<{ from: number; to: number; start: number } | null>(null)
  const periodRef = useRef(0)
  const emittedRef = useRef<number | null>(null)
  const activeChangeRef = useRef(onActiveChange)
  activeChangeRef.current = onActiveChange
  const activeIndexRef = useRef(activeIndex)
  activeIndexRef.current = activeIndex
  const settleRef = useRef<() => void>(() => {})
  const [isDragging, setIsDragging] = useState(false)

  /* Every scroll ends in a deliberate settle: nearest tile centers → becomes active →
     stage follows. Armed by scroll (native/trackpad), drag end, ease end, momentum end. */
  const scheduleSettle = useCallback(() => {
    if (settleTimerRef.current) window.clearTimeout(settleTimerRef.current)
    settleTimerRef.current = window.setTimeout(() => {
      settleTimerRef.current = 0
      settleRef.current()
    }, SETTLE_MS)
  }, [])

  const cancelMomentum = useCallback(() => {
    if (momentumRef.current) {
      cancelAnimationFrame(momentumRef.current)
      momentumRef.current = 0
    }
  }, [])

  const stopEase = useCallback(() => {
    if (easeRafRef.current) {
      cancelAnimationFrame(easeRafRef.current)
      easeRafRef.current = 0
    }
    easeRef.current = null
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

  // Initial position + wrap on scroll / resize
  useEffect(() => {
    const vp = viewportRef.current
    if (!vp) return
    normalize()
    const onScroll = () => {
      normalize()
      scheduleSettle()
    }
    vp.addEventListener('scroll', onScroll, { passive: true })
    const observer = new ResizeObserver(() => normalize())
    if (firstBlockRef.current) observer.observe(firstBlockRef.current)
    return () => {
      vp.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [normalize, scheduleSettle])

  // Reduced-motion flag for eased center-scrolls and momentum
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      reducedRef.current = mq.matches
    }
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  /* One-shot eased scroll. scheduleSettle is ref-based → no callback cycle. */
  const startEase = useCallback(
    (to: number) => {
      const vp = viewportRef.current
      if (!vp) return
      stopEase()
      if (reducedRef.current) {
        vp.scrollLeft = to
        return
      }
      easeRef.current = { from: vp.scrollLeft, to, start: performance.now() }
      const step = (time: number) => {
        const el = viewportRef.current
        const ease = easeRef.current
        if (!el || !ease) {
          easeRafRef.current = 0
          return
        }
        const p = Math.min(1, (time - ease.start) / EASE_MS)
        const eased = 1 - Math.pow(1 - p, 3)
        el.scrollLeft = ease.from + (ease.to - ease.from) * eased
        if (p >= 1) {
          easeRef.current = null
          easeRafRef.current = 0
          scheduleSettle()
          return
        }
        easeRafRef.current = requestAnimationFrame(step)
      }
      easeRafRef.current = requestAnimationFrame(step)
    },
    [scheduleSettle, stopEase],
  )

  /* Center a tile — parent-driven (stage arrows / pills) or settle-driven. Nearest
     equivalent to current scroll keeps the easing path inside one period (no normalize fight). */
  const centerOn = useCallback(
    (index: number, animate: boolean) => {
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
        startEase(to)
      } else {
        stopEase()
        vp.scrollLeft = to
      }
    },
    [startEase, stopEase],
  )

  const emitActive = useCallback((index: number) => {
    emittedRef.current = index
    activeChangeRef.current(index)
  }, [])

  /* Magnetic settle: nearest tile to center becomes active; nudge it to center
     when meaningfully off. No-op while dragging / easing / coasting → loop-safe. */
  const settleCore = useCallback(() => {
    const vp = viewportRef.current
    if (!vp || dragRef.current.active || easeRef.current || momentumRef.current) return
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
    if (!best) return
    const index = Number((best as HTMLElement).dataset.index)
    emitActive(index)
    if (bestD > CENTER_EPSILON) centerOn(index, true)
  }, [centerOn, emitActive])
  settleRef.current = settleCore

  // Stage → rail sync (skip when the change originated from the rail itself)
  useEffect(() => {
    const fromRail = emittedRef.current === activeIndex
    emittedRef.current = null
    if (fromRail) return
    centerOn(activeIndex, true)
  }, [activeIndex, centerOn])

  const runMomentum = useCallback(() => {
    const vp = viewportRef.current
    if (!vp) return
    const step = () => {
      const drag = dragRef.current
      if (drag.active) return
      drag.vel *= 0.94
      if (Math.abs(drag.vel) < 0.4) {
        momentumRef.current = 0
        scheduleSettle()
        return
      }
      vp.scrollLeft -= drag.vel
      momentumRef.current = requestAnimationFrame(step)
    }
    momentumRef.current = requestAnimationFrame(step)
  }, [scheduleSettle])

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return // native touch scroll (momentum included)
    if (event.button !== 0) return
    cancelMomentum()
    stopEase()
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
      if (!reducedRef.current && Math.abs(drag.vel) > 0.4) runMomentum()
      else scheduleSettle()
    }
  }

  const onClickCapture = (event: ReactMouseEvent<HTMLButtonElement>) => {
    if (suppressClickRef.current) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const n = items.length
    if (n === 0) return
    let next: number | null = null
    if (event.key === 'ArrowRight') next = (activeIndexRef.current + 1) % n
    else if (event.key === 'ArrowLeft') next = (activeIndexRef.current - 1 + n) % n
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = n - 1
    if (next === null) return
    event.preventDefault()
    emitActive(next)
    centerOn(next, true)
  }

  const handleTileClick = (index: number) => {
    emitActive(index)
    centerOn(index, true)
    onSelect(index)
  }

  useEffect(
    () => () => {
      cancelMomentum()
      stopEase()
      if (settleTimerRef.current) window.clearTimeout(settleTimerRef.current)
    },
    [cancelMomentum, stopEase],
  )

  return (
    <div
      ref={viewportRef}
      className={`rail-viewport w-full${isDragging ? ' is-dragging' : ''}`}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div className="rail-track flex items-end gap-4 md:gap-5">
        {BLOCKS.map((block) => (
          <div
            key={block}
            ref={block === 0 ? firstBlockRef : undefined}
            aria-hidden={block !== 0 ? true : undefined}
            className="flex shrink-0 items-end gap-4 md:gap-5"
          >
            {chapters.map((chapter, chapterIndex) => (
              <Fragment key={`${block}-${chapter.key}`}>
                <div
                  className={`rail-chapter rail-tile-in flex shrink-0 items-end pl-2 md:pl-4${
                    chapterIndex > 0 ? ' ml-3 md:ml-7' : ''
                  }`}
                  style={{ animationDelay: `${chapter.startIndex * 45}ms` }}
                >
                  <div className="flex flex-col gap-1.5 border-l-2 border-electric pb-1 pl-3 md:pl-4">
                    <span className="font-body text-xs font-bold tabular-nums tracking-[0.18em] text-mint">
                      {String(chapter.count).padStart(2, '0')}
                    </span>
                    <span className="font-display-bold text-sm font-medium uppercase tracking-[0.14em] text-electric md:text-base">
                      {chapter.label}
                    </span>
                  </div>
                </div>
                {items.slice(chapter.startIndex, chapter.startIndex + chapter.count).map((work, offset) => {
                  const index = chapter.startIndex + offset
                  const isActive = index === activeIndex
                  const look = aspectStyles[work.aspect]
                  return (
                    <button
                      key={`${block}-${work.id}`}
                      type="button"
                      data-index={index}
                      tabIndex={block === 0 ? undefined : -1}
                      onClick={() => handleTileClick(index)}
                      onClickCapture={onClickCapture}
                      onMouseEnter={() => emitActive(index)}
                      onFocus={() => emitActive(index)}
                      aria-label={block === 0 ? `${work.title[lang]} — ${selectLabel}` : undefined}
                      aria-current={isActive ? 'true' : undefined}
                      className={`rail-tile rail-tile-in group block shrink-0 text-left ${
                        isActive ? 'is-active ' : ''
                      }${look.width}`}
                      style={{ animationDelay: `${index * 45}ms` }}
                    >
                      <span
                        className={`relative block overflow-hidden border bg-midnight ${
                          isActive ? 'border-electric' : 'border-line-dark/60'
                        } ${look.cls}`}
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
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
