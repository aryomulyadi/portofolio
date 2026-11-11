import { useMemo, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { Lightbox } from './Lightbox'
import { PerspectiveStage } from './creative/PerspectiveStage'
import { BannerHallway } from './creative/BannerHallway'
import { CaseStudyModal } from './creative/chapters/CaseStudyModal'
import { t } from '../data/translations'
import { creativeWorks } from '../data/creativeWorks'
import type { CreativeWork } from '../types'

export function CreativeWorks() {
  const { lang } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<string>('apparel')
  const [view, setView] = useState<'stage' | 'index'>('stage')
  const [stageIndex, setStageIndex] = useState(0)
  const [lightboxWorkId, setLightboxWorkId] = useState<string | null>(null)
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CreativeWork | null>(null)
  const [showHelp, setShowHelp] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const categories = useMemo(
    () => [
      {
        id: 'apparel',
        label: { en: 'Apparel', id: 'Apparel' },
        title: 'Apparel',
        intro: {
          id: 'Koleksi 3 Desain Sablon & Pakaian',
          en: 'Digital & Apparel Designs',
        },
        works: creativeWorks.filter((w) => w.category === 'apparel'),
      },
      {
        id: 'digital-poster',
        label: { en: 'Digital Poster', id: 'Poster Digital' },
        title: 'Digital Poster',
        intro: {
          id: 'Koleksi 3 Poster Editorial & Gradien',
          en: '3 Editorial & Gradient Posters',
        },
        works: creativeWorks.filter((w) => w.category === 'digital-poster'),
      },
      {
        id: 'social',
        label: { en: 'Social Media', id: 'Media Sosial' },
        title: 'Social Media',
        intro: {
          id: 'Kompilasi 9 Desain Feed Instagram',
          en: '9-Post Instagram Feed Composite',
        },
        works: creativeWorks.filter((w) => w.category === 'social'),
      },
      {
        id: 'banner',
        label: { en: 'Banner', id: 'Banner' },
        title: 'Banner',
        intro: {
          id: 'Kompilasi 3 Seri Banner Pameran',
          en: '3-Series Exhibition Banner Composite',
        },
        works: creativeWorks.filter((w) => w.category === 'banner'),
      },
      {
        id: 'ui',
        label: { en: 'UI/UX', id: 'UI/UX' },
        title: 'UI/UX Systems',
        intro: {
          id: 'Koleksi 2 Dashboard Finansial & Analitik',
          en: '2 Financial & Analytics Dashboards',
        },
        works: creativeWorks.filter((w) => w.category === 'ui'),
      },
    ],
    [],
  )

  const activeCat = categories.find((c) => c.id === activeCategory) ?? categories[0]
  const activeWorks = activeCat.works
  const stageWork = activeWorks[stageIndex] ?? activeWorks[0]

  const changeCategory = (id: string) => {
    if (id === activeCategory) return
    setActiveCategory(id)
    setStageIndex(0)
  }

  const cycleCategory = (dir: number) => {
    const idx = categories.findIndex((c) => c.id === activeCategory)
    const next = categories[(idx + dir + categories.length) % categories.length]
    if (next) changeCategory(next.id)
  }

  /* FR-CRE-G5 Keyboard-first: ← → work · [ ] category · I index · F fullscreen · ? help */
  const onSectionKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (lightboxWorkId || selectedCaseStudy) return
    if ((event.target as HTMLElement | null)?.closest?.('[role="dialog"]')) return

    const key = event.key
    if (key === 'Escape' && showHelp) {
      setShowHelp(false)
      return
    }
    if (key === 'ArrowRight' && activeWorks.length > 1) {
      event.preventDefault()
      setStageIndex((i) => (i + 1) % activeWorks.length)
    } else if (key === 'ArrowLeft' && activeWorks.length > 1) {
      event.preventDefault()
      setStageIndex((i) => (i - 1 + activeWorks.length) % activeWorks.length)
    } else if (key === '[') {
      event.preventDefault()
      cycleCategory(-1)
    } else if (key === ']') {
      event.preventDefault()
      cycleCategory(1)
    } else if (key === 'i' || key === 'I') {
      event.preventDefault()
      setView((v) => (v === 'stage' ? 'index' : 'stage'))
    } else if ((key === 'f' || key === 'F') && view === 'stage' && stageWork) {
      event.preventDefault()
      setLightboxWorkId(stageWork.id)
    } else if (key === '?') {
      event.preventDefault()
      setShowHelp((s) => !s)
    }
  }

  /* Lightbox index — cycles within the active category (v3 pattern) */
  const lightboxIndex = useMemo(() => {
    if (!lightboxWorkId) return -1
    return activeWorks.findIndex((w) => w.id === lightboxWorkId)
  }, [lightboxWorkId, activeWorks])

  return (
    <section
      id="creative"
      ref={sectionRef}
      aria-labelledby="creative-title"
      onKeyDown={onSectionKeyDown}
      className="sec-pad grain relative border-b border-ink bg-ink text-paper"
    >
      <div className="shell relative z-[1]">
        <div className="g">
          <div className="lab mono text-grey">
            <b className="lab-num">05</b> / <span>{t('creativeLabel', lang)}</span>
          </div>

          <div className="bd">
            <h2 id="creative-title" className="disp-h2 reveal text-paper">
              {t('creativeTitle', lang)}
            </h2>

            {/* FR-CRE-01 category navbar + FR-CRE-G2 Stage|Index toggle */}
            <div className="mb-[clamp(16px,2.8vw,32px)] flex flex-wrap items-center justify-between gap-3">
              <nav
                className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
                aria-label={lang === 'en' ? 'Creative categories' : 'Kategori karya'}
              >
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => changeCategory(cat.id)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`mono min-h-10 shrink-0 border px-3.5 py-2 transition-colors ${
                        isActive
                          ? 'border-signal bg-signal text-white'
                          : 'border-grey text-grey hover:border-paper hover:text-paper'
                      }`}
                    >
                      {cat.label[lang]}
                    </button>
                  )
                })}
              </nav>

              <div
                className="flex shrink-0"
                role="group"
                aria-label={lang === 'en' ? 'View mode' : 'Mode tampilan'}
              >
                <button
                  type="button"
                  onClick={() => setView('stage')}
                  aria-pressed={view === 'stage'}
                  className={`mono min-h-10 border px-3.5 py-2 transition-colors ${
                    view === 'stage'
                      ? 'border-paper bg-paper text-ink'
                      : 'border-grey text-grey hover:border-paper hover:text-paper'
                  }`}
                >
                  {t('viewStage', lang)}
                </button>
                <button
                  type="button"
                  onClick={() => setView('index')}
                  aria-pressed={view === 'index'}
                  className={`mono -ml-px min-h-10 border px-3.5 py-2 transition-colors ${
                    view === 'index'
                      ? 'border-paper bg-paper text-ink'
                      : 'border-grey text-grey hover:border-paper hover:text-paper'
                  }`}
                >
                  {t('viewIndex', lang)}
                </button>
              </div>
            </div>

            {showHelp && (
              <p className="mono mb-6 border border-grey px-4 py-3 text-grey" role="status">
                {t('keysHint', lang)}
              </p>
            )}

            {/* FR-CRE-G1 Chapter Wipe: red sweep on category change */}
            <div key={activeCat.id} className="wipe relative">
              {view === 'stage' ? (
                activeCat.id === 'banner' && activeWorks[0] ? (
                  <BannerHallway
                    work={activeWorks[0]}
                    lang={lang}
                    onOpenLightbox={(id) => setLightboxWorkId(id)}
                  />
                ) : (
                  <PerspectiveStage
                    works={activeWorks}
                    lang={lang}
                    categoryTitle={activeCat.title}
                    categoryIntro={activeCat.intro}
                    activeIndex={stageIndex}
                    onActiveIndexChange={setStageIndex}
                    onOpenLightbox={(workId) => setLightboxWorkId(workId)}
                    onOpenCaseStudy={
                      activeCat.id === 'ui' ? (work) => setSelectedCaseStudy(work) : undefined
                    }
                  />
                )
              ) : (
                /* FR-CRE-G2 Index contact sheet */
                <div className="idx">
                  {activeWorks.map((w) => {
                    const globalIdx = creativeWorks.findIndex((x) => x.id === w.id)
                    const localIdx = activeWorks.findIndex((x) => x.id === w.id)
                    return (
                      <button
                        key={w.id}
                        type="button"
                        className="ix"
                        data-cur="View"
                        onClick={() => {
                          setStageIndex(localIdx)
                          setView('stage')
                        }}
                      >
                        <span className="ixa block">
                          <img
                            src={w.thumb ?? w.image}
                            alt=""
                            loading="lazy"
                            decoding="async"
                          />
                        </span>
                        <span className="flex w-full items-baseline justify-between gap-2">
                          <b className="min-w-0 truncate">{w.title[lang]}</b>
                          <span className="index-num shrink-0 text-xs">
                            {String(globalIdx + 1).padStart(2, '0')}
                          </span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Artwork Viewer (Lightbox + Loupe) */}
      <Lightbox
        items={activeWorks}
        index={lightboxIndex}
        lang={lang}
        labels={{
          close: t('closeLightbox', lang),
          next: t('nextImage', lang),
          prev: t('prevImage', lang),
          process: t('processLabel', lang),
          result: t('resultLabel', lang),
          loupe: t('loupe', lang),
        }}
        onClose={() => setLightboxWorkId(null)}
        onNavigate={(newIdx) => setLightboxWorkId(activeWorks[newIdx]?.id ?? null)}
      />

      {/* Interactive Case Study Modal for UI/UX */}
      <CaseStudyModal
        work={selectedCaseStudy}
        lang={lang}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </section>
  )
}
