import { useEffect, useMemo, useRef, useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { Lightbox } from './Lightbox'
import { ShowcaseStage } from './creative/ShowcaseStage'
import { InfiniteRail } from './creative/InfiniteRail'
import { t } from '../data/translations'
import { creativeWorks } from '../data/creativeWorks'

export function CreativeWorks() {
  const { lang } = useLanguage()
  const [filter, setFilter] = useState<string>('all')
  const [stageIndex, setStageIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState(-1)
  const sectionRef = useRef<HTMLElement>(null)

  const categories = useMemo(() => {
    const map = new Map<string, string>()
    creativeWorks.forEach((work) => map.set(work.category, work.categoryLabel[lang]))
    return Array.from(map.entries())
  }, [lang])

  const visible = useMemo(
    () => (filter === 'all' ? creativeWorks : creativeWorks.filter((w) => w.category === filter)),
    [filter],
  )
  const visibleKey = visible.map((w) => w.id).join('|')

  // Reset stage + lightbox when the filtered set changes
  useEffect(() => {
    setStageIndex(0)
    setLightboxIndex(-1)
  }, [visibleKey])

  // Re-observe reveal nodes when filter changes (global useReveal runs once)
  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    const nodes = Array.from(root.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)'))
    if (nodes.length === 0) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [filter])

  if (creativeWorks.length === 0) return null

  const showFilters = categories.length > 1
  const stageWork = visible[stageIndex] ?? visible[0]

  // Selecting a work (rail click / stage open / case-study arrows) keeps stage in sync
  const selectWork = (index: number) => {
    setStageIndex(index)
    setLightboxIndex(index)
  }

  return (
    <section
      id="creative"
      ref={sectionRef}
      aria-labelledby="creative-title"
      className="border-b border-line-dark bg-midnight-deep py-20 text-paper md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <header className="reveal mb-10 md:mb-14">
          <div className="mb-4 flex items-baseline gap-4">
            <span className="font-display-bold text-sm text-electric">06</span>
            <p className="font-body text-[0.7rem] font-bold uppercase tracking-[0.22em] text-paper/45">
              {t('creativeLabel', lang)}
            </p>
          </div>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h2
              id="creative-title"
              className="max-w-3xl font-display-bold text-[clamp(1.9rem,5vw,3.4rem)] font-medium leading-[1.05] tracking-tight text-balance"
            >
              <span className="text-paper/35">DESIGN</span>{' '}
              <span className="text-electric">/</span>{' '}
              <span className="text-paper">VISUAL EXPERIMENTS</span>
            </h2>
            {showFilters && (
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label={lang === 'en' ? 'Filter creative work' : 'Filter karya kreatif'}
              >
                <button
                  type="button"
                  onClick={() => setFilter('all')}
                  aria-pressed={filter === 'all'}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                    filter === 'all'
                      ? 'bg-mint text-midnight'
                      : 'border border-paper/25 text-paper/70 hover:border-paper hover:text-paper'
                  }`}
                >
                  {t('filterAll', lang)}
                </button>
                {categories.map(([key, label]) => {
                  const active = filter === key
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFilter(key)}
                      aria-pressed={active}
                      className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                        active
                          ? 'bg-mint text-midnight'
                          : 'border border-paper/25 text-paper/70 hover:border-paper hover:text-paper'
                      }`}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
          <div className="rule-electric mt-8" />
        </header>

        {visible.length === 0 || !stageWork ? (
          <p className="reveal text-sm text-paper/50">{t('emptyCreative', lang)}</p>
        ) : (
          <>
            <div className="reveal">
              <ShowcaseStage
                work={stageWork}
                index={stageIndex < visible.length ? stageIndex : 0}
                total={visible.length}
                lang={lang}
                fadeKey={`${filter}:${stageWork.id}`}
                onOpen={() => setLightboxIndex(stageIndex < visible.length ? stageIndex : 0)}
                onPrev={() => setStageIndex((i) => (i - 1 + visible.length) % visible.length)}
                onNext={() => setStageIndex((i) => (i + 1) % visible.length)}
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
                items={visible}
                filterKey={filter}
                lang={lang}
                onSelect={selectWork}
                selectLabel={t('openDetails', lang)}
              />
              <p className="mt-5 px-5 font-body text-[0.7rem] uppercase tracking-[0.18em] text-paper/40 md:px-8">
                {t('railHint', lang)}
              </p>
            </div>
          </>
        )}
      </div>

      <Lightbox
        items={visible}
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
