import { useMemo, useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { Lightbox } from './Lightbox'
import { PerspectiveStage } from './creative/PerspectiveStage'
import { CaseStudyModal } from './creative/chapters/CaseStudyModal'
import { t } from '../data/translations'
import { creativeWorks } from '../data/creativeWorks'
import type { CreativeWork } from '../types'

export function CreativeWorks() {
  const { lang } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<string>('apparel')
  const [lightboxWorkId, setLightboxWorkId] = useState<string | null>(null)
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CreativeWork | null>(null)

  const categories = useMemo(
    () => [
      {
        id: 'apparel',
        label: { en: 'Apparel', id: 'Apparel' },
        title: 'Apparel',
        intro: {
          id: 'Koleksi 3 Desain Sablon & Pakaian',
          en: '3 Screen-Print & Apparel Designs',
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

  // Global lightbox index
  const lightboxIndex = useMemo(() => {
    if (!lightboxWorkId) return -1
    return creativeWorks.findIndex((w) => w.id === lightboxWorkId)
  }, [lightboxWorkId])

  return (
    <section
      id="creative"
      aria-labelledby="creative-title"
      className="relative border-b border-line-dark bg-midnight-deep py-14 text-paper md:py-20"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* Compact Section Header */}
        <header className="reveal mb-6 md:mb-8">
          <div className="mb-3 flex items-baseline gap-4">
            <span className="index-num font-display-bold text-sm text-mint">06</span>
            <p className="font-body text-[0.7rem] font-bold uppercase tracking-[0.22em] text-paper/45">
              {t('creativeLabel', lang)}
            </p>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2
              id="creative-title"
              className="max-w-3xl font-display-bold text-[clamp(1.8rem,4vw,2.8rem)] font-medium leading-[1.08] tracking-tight text-paper text-balance"
            >
              {t('creativeTitle', lang)}
            </h2>
          </div>

          {/* Clean Category Navbar */}
          <div className="mt-6 flex overflow-x-auto border-b border-line-dark pb-3 scrollbar-none">
            <div className="flex gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`shrink-0 rounded-full px-4 py-1.5 font-body text-xs font-bold transition-all duration-300 ${
                      isActive
                        ? 'bg-mint text-midnight shadow-md shadow-mint/10'
                        : 'border border-paper/15 text-paper/60 hover:border-paper/40 hover:text-paper'
                    }`}
                  >
                    {cat.label[lang]}
                  </button>
                )
              })}
            </div>
          </div>
        </header>

        {/* Compact & Crystal-Clear Exhibition Container */}
        <div key={activeCat.id} className="transition-opacity duration-300 ease-out">
          <PerspectiveStage
            works={activeCat.works}
            lang={lang}
            categoryTitle={activeCat.title}
            categoryIntro={activeCat.intro}
            onOpenLightbox={(workId) => setLightboxWorkId(workId)}
            onOpenCaseStudy={activeCat.id === 'ui' ? (work) => setSelectedCaseStudy(work) : undefined}
          />
        </div>
      </div>

      {/* Fullscreen Artwork Viewer (Lightbox) */}
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
        onClose={() => setLightboxWorkId(null)}
        onNavigate={(newIdx) => setLightboxWorkId(creativeWorks[newIdx]?.id ?? null)}
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
