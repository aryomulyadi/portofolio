import { useState } from 'react'
import { BookOpen, Maximize2, Sparkles } from 'lucide-react'
import type { CreativeWork, Lang } from '../../types'

interface PerspectiveStageProps {
  works: CreativeWork[]
  lang: Lang
  categoryTitle: string
  categoryIntro: { id: string; en: string }
  onOpenLightbox: (globalWorkId: string) => void
  onOpenCaseStudy?: (work: CreativeWork) => void
}

export function PerspectiveStage({
  works,
  lang,
  categoryTitle,
  categoryIntro,
  onOpenLightbox,
  onOpenCaseStudy,
}: PerspectiveStageProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const isMulti = works.length > 1
  const activeWork = works[activeIndex] ?? works[0]

  if (!activeWork) return null

  return (
    <div className="overflow-hidden rounded-2xl border border-line-dark bg-midnight shadow-xl">
      <div className="grid lg:grid-cols-12 lg:items-stretch divide-y lg:divide-y-0 lg:divide-x divide-line-dark">
        
        {/* Left Column: Text Info, Selectors & Actions (42% width) */}
        <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-electric/10 px-3 py-1 font-body text-xs font-semibold uppercase tracking-wider text-electric">
                {categoryTitle}
              </span>
              <span className="font-body text-xs font-bold tabular-nums text-paper/45">
                {categoryIntro[lang]}
              </span>
            </div>

            <div className="space-y-2 pt-2">
              <h3 className="font-display-bold text-2xl font-bold tracking-tight text-paper md:text-3xl">
                {activeWork.title[lang]}
              </h3>
              <p className="font-body text-sm leading-relaxed text-paper/70">
                {activeWork.caption?.[lang]}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {activeWork.year && (
                <span className="rounded border border-paper/15 px-2.5 py-1 font-body text-xs font-semibold text-paper/60">
                  {activeWork.year}
                </span>
              )}
              {activeWork.platform && (
                <span className="rounded border border-mint/20 bg-mint/5 px-2.5 py-1 font-body text-xs font-semibold text-mint">
                  {activeWork.platform}
                </span>
              )}
              {activeWork.software?.map((sw: string) => (
                <span
                  key={sw}
                  className="rounded border border-paper/15 bg-midnight-deep px-2.5 py-1 font-body text-xs text-paper/70"
                >
                  {sw}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Bar: Mini Selectors (if multi) + Action Buttons */}
          <div className="space-y-4 pt-4 border-t border-line-dark/60">
            {isMulti && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {works.map((w, idx) => {
                  const isSelected = idx === activeIndex
                  return (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 font-body text-xs font-semibold transition-all ${
                        isSelected
                          ? 'border-electric bg-electric/15 text-electric'
                          : 'border-line-dark bg-midnight-deep text-paper/60 hover:border-paper/40 hover:text-paper'
                      }`}
                    >
                      <span className="tabular-nums">0{idx + 1}</span>
                      <span className="truncate max-w-[100px]">{w.title[lang]}</span>
                    </button>
                  )
                })}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenLightbox(activeWork.id)}
                className="inline-flex items-center gap-2 rounded-xl border border-paper/25 bg-midnight-deep px-4 py-2.5 font-body text-xs font-bold text-paper transition-colors hover:border-paper hover:text-white"
              >
                <Maximize2 size={14} />
                <span>{lang === 'en' ? 'Fullscreen' : 'Layar Penuh'}</span>
              </button>

              {onOpenCaseStudy && (
                <button
                  type="button"
                  onClick={() => onOpenCaseStudy(activeWork)}
                  className="inline-flex items-center gap-2 rounded-xl border border-electric/40 bg-electric/10 px-4 py-2.5 font-body text-xs font-bold text-electric transition-colors hover:bg-electric hover:text-midnight"
                >
                  <BookOpen size={14} />
                  <span>{lang === 'en' ? 'Open Case Study' : 'Buka Studi Kasus'}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Clean Artwork Canvas (58% width) */}
        <div className="flex items-center justify-center bg-midnight-deep p-6 sm:p-8 lg:col-span-7">
          <div className="relative w-full">
            <button
              type="button"
              onClick={() => onOpenLightbox(activeWork.id)}
              className="group relative block w-full overflow-hidden rounded-xl border border-line-dark/80 bg-midnight text-left transition-all duration-300 hover:border-electric"
            >
              <div
                className={`w-full overflow-hidden flex items-center justify-center p-2 ${
                  activeWork.aspect === '16/9'
                    ? 'aspect-[16/9]'
                    : activeWork.aspect === '5/4'
                    ? 'aspect-[5/4]'
                    : 'aspect-[4/5] max-h-[460px]'
                }`}
              >
                <img
                  src={activeWork.image}
                  alt={activeWork.title[lang]}
                  className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-102"
                />
              </div>
              <div className="absolute top-3 right-3 rounded-full bg-midnight/80 px-3 py-1 backdrop-blur-sm border border-paper/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex items-center gap-1.5 font-body text-[0.7rem] font-bold text-mint">
                  <Sparkles size={12} />
                  {lang === 'en' ? 'Click to Enlarge' : 'Klik untuk Memperbesar'}
                </span>
              </div>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
