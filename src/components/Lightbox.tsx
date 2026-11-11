import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEscape, useFocusTrap, useLockBodyScroll } from '../hooks/useInteractions'
import type { CreativeWork, Lang } from '../types'

interface LightboxProps {
  items: CreativeWork[]
  index: number
  lang: Lang
  labels: {
    close: string
    next: string
    prev: string
    process: string
    result: string
    loupe: string
  }
  onClose: () => void
  onNavigate: (index: number) => void
}

const ZOOM = 2.5
const LENS = 150
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

interface LensStyle {
  left: string
  top: string
  bgSize: string
  bgPos: string
}

export function Lightbox({ items, index, lang, labels, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const lensPosRef = useRef({ x: 50, y: 50 })
  const touchHoldRef = useRef(false)
  /* NFR-06: throttle lens updates to one frame (rAF) */
  const lensRafRef = useRef(0)
  const pendingLensRef = useRef<{ x: number; y: number } | null>(null)
  const [loupeOn, setLoupeOn] = useState(false)
  const [lens, setLens] = useState<LensStyle | null>(null)
  const open = index >= 0 && index < items.length
  const item = open ? items[index] : null

  useLockBodyScroll(open)
  useEscape(onClose, open)
  useFocusTrap(dialogRef, open)

  useEffect(() => () => cancelAnimationFrame(lensRafRef.current), [])

  useEffect(() => {
    if (!open) {
      setLoupeOn(false)
      setLens(null)
      touchHoldRef.current = false
      if (lensRafRef.current) {
        cancelAnimationFrame(lensRafRef.current)
        lensRafRef.current = 0
      }
      pendingLensRef.current = null
    }
  }, [open])

  const computeLens = (clientX: number, clientY: number): LensStyle | null => {
    const box = boxRef.current
    if (!box || !item) return null
    const rect = box.getBoundingClientRect()
    const px = clamp(clientX - rect.left, 0, rect.width)
    const py = clamp(clientY - rect.top, 0, rect.height)
    const xPct = (px / rect.width) * 100
    const yPct = (py / rect.height) * 100
    lensPosRef.current = { x: xPct, y: yPct }
    return {
      left: `${px - LENS / 2}px`,
      top: `${py - LENS / 2}px`,
      bgSize: `${rect.width * ZOOM}px ${rect.height * ZOOM}px`,
      bgPos: `${-(px * ZOOM - LENS / 2)}px ${-(py * ZOOM - LENS / 2)}px`,
    }
  }

  const moveLensBy = (dxPct: number, dyPct: number): boolean => {
    const box = boxRef.current
    if (!box || !item) return false
    const rect = box.getBoundingClientRect()
    const next = {
      x: clamp(lensPosRef.current.x + dxPct, 0, 100),
      y: clamp(lensPosRef.current.y + dyPct, 0, 100),
    }
    lensPosRef.current = next
    const clientX = rect.left + (next.x / 100) * rect.width
    const clientY = rect.top + (next.y / 100) * rect.height
    const style = computeLens(clientX, clientY)
    if (style) setLens(style)
    return true
  }

  /* ← → navigate; when Loupe is on, arrows move the lens (FR-CRE-LP) */
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        if (loupeOn && moveLensBy(4, 0)) {
          event.preventDefault()
          return
        }
        onNavigate((index + 1) % items.length)
      } else if (event.key === 'ArrowLeft') {
        if (loupeOn && moveLensBy(-4, 0)) {
          event.preventDefault()
          return
        }
        onNavigate((index - 1 + items.length) % items.length)
      } else if (event.key === 'ArrowDown' && loupeOn) {
        event.preventDefault()
        moveLensBy(0, 4)
      } else if (event.key === 'ArrowUp' && loupeOn) {
        event.preventDefault()
        moveLensBy(0, -4)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index, items.length, onNavigate, loupeOn])

  if (!open || !item) return null

  const hasNav = items.length > 1

  const scheduleLens = (clientX: number, clientY: number) => {
    pendingLensRef.current = { x: clientX, y: clientY }
    if (lensRafRef.current) return
    lensRafRef.current = requestAnimationFrame(() => {
      lensRafRef.current = 0
      const pending = pendingLensRef.current
      pendingLensRef.current = null
      if (!pending) return
      const style = computeLens(pending.x, pending.y)
      if (style) setLens(style)
    })
  }

  const onBoxPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'touch') return
    touchHoldRef.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
    scheduleLens(event.clientX, event.clientY)
  }

  const onBoxPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const touch = event.pointerType === 'touch'
    if (touch && !touchHoldRef.current) return
    if (!touch && !loupeOn) return
    scheduleLens(event.clientX, event.clientY)
  }

  const releaseTouch = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'touch') return
    touchHoldRef.current = false
    if (!loupeOn) setLens(null)
  }

  return (
    <div
      className="lb fixed inset-0 z-[60] flex items-center justify-center bg-ink/92 p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={item.title[lang]}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="relative flex max-h-full w-full max-w-6xl flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-display text-base font-black uppercase tracking-tight text-paper">
              {item.title[lang]}
            </p>
            <p className="mono mt-1 text-grey">
              {item.categoryLabel[lang]}
              {item.year ? ` · ${item.year}` : ''}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setLoupeOn((v) => {
                  const next = !v
                  if (!next) setLens(null)
                  else {
                    const box = boxRef.current
                    if (box) {
                      const rect = box.getBoundingClientRect()
                      const style = computeLens(
                        rect.left + rect.width / 2,
                        rect.top + rect.height / 2,
                      )
                      if (style) setLens(style)
                    }
                  }
                  return next
                })
              }}
              aria-pressed={loupeOn}
              className={`mono min-h-11 border px-3.5 py-2 transition-colors ${
                loupeOn
                  ? 'border-signal bg-signal text-white'
                  : 'border-grey text-grey hover:border-paper hover:text-paper'
              }`}
            >
              {labels.loupe}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label={labels.close}
              className="flex h-11 w-11 shrink-0 items-center justify-center border border-grey text-paper transition-colors hover:border-signal hover:bg-signal hover:text-white"
            >
              <X size={18} aria-hidden />
            </button>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 gap-6 overflow-y-auto lg:grid-cols-[1.5fr_1fr] lg:overflow-hidden">
          <div
            ref={boxRef}
            className="relative flex min-h-0 items-start justify-center"
            onPointerDown={onBoxPointerDown}
            onPointerMove={onBoxPointerMove}
            onPointerUp={releaseTouch}
            onPointerCancel={releaseTouch}
            onPointerLeave={() => {
              if (!touchHoldRef.current) setLens(null)
            }}
            data-cur="Zoom"
            style={{ cursor: loupeOn ? 'crosshair' : undefined }}
          >
            <img
              src={item.image}
              alt={item.caption?.[lang] ?? item.title[lang]}
              className="max-h-[50vh] w-auto max-w-full object-contain lg:max-h-[62vh]"
              draggable={false}
            />
            {lens && (
              <span
                className="lp"
                aria-hidden
                style={
                  {
                    left: lens.left,
                    top: lens.top,
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: lens.bgSize,
                    backgroundPosition: lens.bgPos,
                  } as CSSProperties
                }
              />
            )}
          </div>

          <div className="flex min-h-0 flex-col gap-5 lg:overflow-y-auto lg:pr-1">
            {item.caption && (
              <p className="max-w-2xl text-sm leading-relaxed text-grey">{item.caption[lang]}</p>
            )}
            {item.process && (
              <section>
                <h4 className="mono text-paper">
                  <span className="mr-2 inline-block h-2 w-2 bg-signal align-middle" aria-hidden />
                  {labels.process}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-grey">{item.process[lang]}</p>
              </section>
            )}
            {item.result && (
              <section>
                <h4 className="mono text-paper">
                  <span className="mr-2 inline-block h-2 w-2 border border-paper align-middle" aria-hidden />
                  {labels.result}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-grey">{item.result[lang]}</p>
              </section>
            )}
          </div>
        </div>

        {hasNav && (
          <div className="mt-4 flex shrink-0 items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate((index - 1 + items.length) % items.length)}
              aria-label={labels.prev}
              className="flex h-10 w-10 items-center justify-center border border-grey text-paper transition-colors hover:border-signal hover:bg-signal hover:text-white"
            >
              <ChevronLeft size={18} aria-hidden />
            </button>
            <span className="index-num text-xs text-grey" aria-live="polite">
              {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => onNavigate((index + 1) % items.length)}
              aria-label={labels.next}
              className="flex h-10 w-10 items-center justify-center border border-grey text-paper transition-colors hover:border-signal hover:bg-signal hover:text-white"
            >
              <ChevronRight size={18} aria-hidden />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
