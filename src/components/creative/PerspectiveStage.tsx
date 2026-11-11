import { useEffect, useRef } from 'react'
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'
import { BookOpen, Maximize2 } from 'lucide-react'
import type { CreativeWork, Lang } from '../../types'
import { t } from '../../data/translations'

interface PerspectiveStageProps {
  works: CreativeWork[]
  lang: Lang
  categoryTitle: string
  categoryIntro: { id: string; en: string }
  activeIndex: number
  onActiveIndexChange: (index: number) => void
  onOpenLightbox: (globalWorkId: string) => void
  onOpenCaseStudy?: (work: CreativeWork) => void
}

const RATIO: Record<string, number> = { '16/9': 16 / 9, '5/4': 5 / 4, '4/5': 4 / 5 }

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const fine = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

export function PerspectiveStage({
  works,
  lang,
  categoryTitle,
  categoryIntro,
  activeIndex,
  onActiveIndexChange,
  onOpenLightbox,
  onOpenCaseStudy,
}: PerspectiveStageProps) {
  const isMulti = works.length > 1
  const activeWork = works[activeIndex] ?? works[0]
  const canvasRef = useRef<HTMLButtonElement>(null)

  /* NFR-06: throttle pointermove to one frame (rAF) */
  const rafRef = useRef(0)
  const pendingRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  if (!activeWork) return null

  /* FR-CRE-G3 Magnetic Stage: tilt ≤6deg, shift ≤10px, sheen follows pointer */
  const applyStageTilt = (clientX: number, clientY: number) => {
    const el = canvasRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (clientX - rect.left) / rect.width - 0.5
    const y = (clientY - rect.top) / rect.height - 0.5
    el.style.transform = `translate(${(x * 20).toFixed(1)}px, ${(y * 20).toFixed(
      1,
    )}px) rotateY(${(x * 12).toFixed(2)}deg) rotateX(${(-y * 12).toFixed(2)}deg)`
    el.style.setProperty('--lx', `${((x + 0.5) * 100).toFixed(1)}%`)
    el.style.setProperty('--ly', `${((y + 0.5) * 100).toFixed(1)}%`)
  }

  const onStageMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== 'mouse' || !fine() || reduced()) return
    pendingRef.current = { x: event.clientX, y: event.clientY }
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0
      const pending = pendingRef.current
      pendingRef.current = null
      if (pending) applyStageTilt(pending.x, pending.y)
    })
  }

  const onStageLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
    pendingRef.current = null
    const el = canvasRef.current
    if (el) el.style.transform = ''
  }

  return (
    <div className="grid border border-grey shadow-[8px_8px_0_var(--color-grey)] lg:grid-cols-12">
      {/* FR-CRE-03: image first on mobile, right column on desktop */}
      <div className="order-1 flex items-center justify-center border-b border-grey bg-ink p-4 sm:p-6 lg:order-2 lg:col-span-7 lg:border-b-0 lg:border-l">
        <div className="cv w-full">
          <button
            ref={canvasRef}
            type="button"
            onClick={() => onOpenLightbox(activeWork.id)}
            onPointerMove={onStageMove}
            onPointerLeave={onStageLeave}
            data-cur="Zoom"
            aria-label={`${t('cursorZoom', lang)}: ${activeWork.title[lang]}`}
            className="cvb group w-full"
          >
            <span
              className="pa"
              style={{ ['--r' as string]: RATIO[activeWork.aspect] ?? 16 / 9 } as CSSProperties}
            >
              <img
                src={activeWork.image}
                alt={activeWork.title[lang]}
                loading="lazy"
                decoding="async"
              />
            </span>
            <span className="sheen" aria-hidden />
            <span className="mono absolute right-3 top-3 z-[2] bg-signal px-2.5 py-1 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {t('cursorZoom', lang)}
            </span>
          </button>
        </div>
      </div>

      {/* Left: info panel */}
      <div className="order-2 flex flex-col justify-between gap-6 p-5 sm:p-7 lg:order-1 lg:col-span-5">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="mono border border-paper px-2.5 py-1 text-paper">
              {categoryTitle}
            </span>
            <span className="index-num text-xs text-grey">
              {categoryIntro[lang]}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-[clamp(1.5rem,3vw,2.4rem)] font-black uppercase leading-none tracking-tight text-paper text-balance">
              {activeWork.title[lang]}
            </h3>
            {activeWork.caption && (
              <p className="max-w-[46ch] text-sm leading-relaxed text-grey">
                {activeWork.caption[lang]}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {activeWork.year && (
              <span className="mono border border-grey px-2.5 py-1 text-grey">
                {activeWork.year}
              </span>
            )}
            {activeWork.platform && (
              <span className="mono border border-grey px-2.5 py-1 text-paper">
                {activeWork.platform}
              </span>
            )}
            {activeWork.software?.map((sw) => (
              <span key={sw} className="mono border border-grey px-2.5 py-1 text-grey">
                {sw}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4 border-t border-grey pt-5">
          {isMulti && (
            <div className="flex items-center gap-2" role="group" aria-label={categoryTitle}>
              {works.map((w, idx) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => onActiveIndexChange(idx)}
                  aria-pressed={idx === activeIndex}
                  aria-label={`${String(idx + 1).padStart(2, '0')} — ${w.title[lang]}`}
                  className={`mono min-h-11 border px-3 py-2 transition-colors ${
                    idx === activeIndex
                      ? 'border-signal bg-signal text-white'
                      : 'border-grey text-grey hover:border-paper hover:text-paper'
                  }`}
                >
                  {String(idx + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenLightbox(activeWork.id)}
              className="btn btn-inv"
            >
              <Maximize2 size={14} aria-hidden />
              {t('fullscreen', lang)}
            </button>

            {onOpenCaseStudy && (
              <button
                type="button"
                onClick={() => onOpenCaseStudy(activeWork)}
                className="btn btn-red"
                data-cur="Open"
              >
                <BookOpen size={14} aria-hidden />
                {t('openCaseStudy', lang)}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
