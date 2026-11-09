import { useState } from 'react'
import type { CreativeWork, Lang } from '../../../types'

interface ApparelExhibitionProps {
  works: CreativeWork[]
  lang: Lang
  onOpenLightbox: (index: number) => void
}

export function ApparelExhibition({ works, lang, onOpenLightbox }: ApparelExhibitionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeWork = works[activeIndex] ?? works[0]

  return (
    <div className="space-y-12">
      {/* Featured Spotlight: 16:9 center or active work */}
      <div className="relative overflow-hidden rounded-2xl border border-line-dark bg-midnight p-6 md:p-12">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <button
              type="button"
              onClick={() => onOpenLightbox(activeIndex)}
              className="group relative block w-full overflow-hidden rounded-xl bg-midnight-deep text-left"
            >
              <div className="aspect-[16/9] w-full overflow-hidden">
                <img
                  src={activeWork.image}
                  alt={activeWork.title[lang]}
                  className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </button>
          </div>
          <div className="lg:col-span-4 space-y-4">
            <span className="inline-block rounded-full bg-mint/10 px-3 py-1 font-body text-xs font-semibold text-mint">
              {activeWork.categoryLabel[lang]} · {activeWork.year}
            </span>
            <h3 className="font-display-bold text-2xl font-bold tracking-tight text-paper md:text-3xl">
              {activeWork.title[lang]}
            </h3>
            <p className="font-body text-sm leading-relaxed text-paper/70">
              {activeWork.caption?.[lang]}
            </p>
            {activeWork.software && (
              <div className="flex flex-wrap gap-2 pt-2">
                {activeWork.software.map((sw: string) => (
                  <span key={sw} className="rounded border border-paper/15 px-2.5 py-1 font-body text-[0.7rem] text-paper/60">
                    {sw}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Horizontal Draggable / Clickable Track with partial previews */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-body text-xs font-bold uppercase tracking-[0.16em] text-paper/50">
            {lang === 'en' ? 'Collection Gallery (Swipe / Click)' : 'Galeri Koleksi'}
          </span>
          <span className="font-body text-xs tabular-nums text-electric">
            {String(activeIndex + 1).padStart(2, '0')} / {String(works.length).padStart(2, '0')}
          </span>
        </div>
        
        <div className="flex gap-5 overflow-x-auto pb-4 pt-2 scrollbar-none snap-x snap-mandatory">
          {works.map((work, idx) => {
            const isSelected = idx === activeIndex
            return (
              <button
                key={work.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`group relative shrink-0 snap-start text-left transition-all duration-300 ${
                  work.aspect === '16/9' ? 'w-[75vw] sm:w-[50vw] lg:w-[40vw]' : 'w-[60vw] sm:w-[36vw] lg:w-[28vw]'
                } ${isSelected ? 'ring-2 ring-electric' : 'opacity-75 hover:opacity-100'}`}
              >
                <div className={`overflow-hidden rounded-xl border bg-midnight ${isSelected ? 'border-electric' : 'border-line-dark'}`}>
                  <div className={`w-full overflow-hidden ${work.aspect === '16/9' ? 'aspect-[16/9]' : 'aspect-[4/5]'}`}>
                    <img
                      src={work.image}
                      alt={work.title[lang]}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="mt-3 flex items-baseline justify-between px-1">
                  <span className="font-display-bold text-sm font-medium text-paper">
                    {work.title[lang]}
                  </span>
                  <span className="font-body text-xs uppercase tracking-wider text-paper/40">
                    {work.aspect}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
