import { useMemo, useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { Lightbox } from './Lightbox'
import { ShowcaseStage } from './creative/ShowcaseStage'
import { InfiniteRail } from './creative/InfiniteRail'
import type { RailChapter } from './creative/InfiniteRail'
import { t } from '../data/translations'
import { creativeWorks } from '../data/creativeWorks'

export function CreativeWorks() {
  const { lang } = useLanguage()
  const [stageIndex, setStageIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const chapters = useMemo(() => {
    const list: RailChapter[] = []
    creativeWorks.forEach((work, i) => {
      const existing = list.find((c) => c.key === work.category)
      if (existing) existing.count++
      else list.push({ key: work.category, label: work.categoryLabel[lang], startIndex: i, count: 1 })
    })
    return list
  }, [lang])

  if (creativeWorks.length === 0) return null

  const total = creativeWorks.length
  const stageIndexSafe = stageIndex < total ? stageIndex : 0
  const stageWork = creativeWorks[stageIndexSafe]
  const activeChapter = chapters.find(
    (c) => stageIndexSafe >= c.startIndex && stageIndexSafe < c.startIndex + c.count,
  ) ?? chapters[0]
  const posInChapter = stageIndexSafe - activeChapter.startIndex + 1

  const selectWork = (index: number) => {
    setStageIndex(index)
    setLightboxIndex(index)
  }

  return (
    <section
      id="creative"
      aria-labelledby="creative-title"
      className="relative border-b border-line-dark bg-midnight-deep py-20 text-paper md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <header className="reveal mb-10 md:mb-14">
          <div className="mb-4 flex items-baseline gap-4">
            <span className="index-num font-display-bold text-sm text-mint">06</span>
            <p className="font-body text-[0.7rem] font-bold uppercase tracking-[0.22em] text-paper/45">
              {t('creativeLabel', lang)}
            </p>
          </div>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h2
              id="creative-title"
              className="max-w-3xl font-display-bold text-[clamp(1.9rem,4.5vw,3.1rem)] font-medium leading-[1.08] tracking-tight text-paper text-balance"
            >
              {t('creativeTitle', lang)}
            </h2>
            {chapters.length > 1 && (
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label={t('jumpLabel', lang)}
              >
                {chapters.map((ch) => {
                  const active = activeChapter.key === ch.key
                  return (
                    <button
                      key={ch.key}
                      type="button"
                      onClick={() => setStageIndex(ch.startIndex)}
                      aria-current={active ? 'true' : undefined}
                      className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                        active
                          ? 'bg-mint text-midnight'
                          : 'border border-paper/25 text-paper/70 hover:border-paper hover:text-paper'
                      }`}
                    >
                      {ch.label}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
          <div className="rule-electric mt-8" />
        </header>

        {!stageWork ? (
          <p className="reveal text-sm text-paper/50">{t('emptyCreative', lang)}</p>
        ) : (
          <>
            <div className="reveal">
              <ShowcaseStage
                work={stageWork}
                index={stageIndexSafe}
                total={total}
                lang={lang}
                fadeKey={stageWork.id}
                onOpen={() => setLightboxIndex(stageIndexSafe)}
                onPrev={() => setStageIndex((i) => (i - 1 + total) % total)}
                onNext={() => setStageIndex((i) => (i + 1) % total)}
                labels={{
                  eyebrow: t('showcaseLabel', lang),
                  prev: t('stagePrev', lang),
                  next: t('stageNext', lang),
                  open: t('openDetails', lang),
                }}
              />
            </div>

            <div className="mt-12 md:mt-16">
              <InfiniteRail
                items={creativeWorks}
                chapters={chapters}
                lang={lang}
                activeIndex={stageIndexSafe}
                onSelect={selectWork}
                onActiveChange={setStageIndex}
                selectLabel={t('openDetails', lang)}
              />
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                <span className="font-body text-xs font-bold uppercase tracking-[0.14em] text-electric">
                  {activeChapter.label}
                  <span className="text-paper/35"> · </span>
                  <span className="tabular-nums">
                    {String(posInChapter).padStart(2, '0')}
                    <span className="text-paper/35">/</span>
                    {String(activeChapter.count).padStart(2, '0')}
                  </span>
                </span>
                <div className="h-[2px] min-w-[120px] flex-1 bg-paper/15">
                  <div
                    className="h-full bg-electric transition-[width] duration-500 ease-out"
                    style={{ width: `${((stageIndexSafe + 1) / total) * 100}%` }}
                  />
                </div>
                <span className="font-body text-[0.7rem] uppercase tracking-[0.18em] text-paper/40">
                  {t('railHint', lang)}
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      <Lightbox
        items={creativeWorks}
        index={lightboxIndex}
        lang={lang}
        labels={{
          close: t('closeLightbox', lang),
          next: t('nextImage', lang),
          prev: t('prevImage', lang),
          process: t('processLabel', lang),
          result: t('resultLabel', lang),
        }}
        onClose={() => setLightboxIndex(-1)}
        onNavigate={selectWork}
      />
    </section>
  )
}
