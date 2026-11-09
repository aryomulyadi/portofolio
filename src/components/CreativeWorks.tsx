import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { Lightbox } from './Lightbox'
import { ApparelExhibition } from './creative/chapters/ApparelExhibition'
import { PosterExhibition } from './creative/chapters/PosterExhibition'
import { SocialExhibition } from './creative/chapters/SocialExhibition'
import { BannerExhibition } from './creative/chapters/BannerExhibition'
import { UiUxExhibition } from './creative/chapters/UiUxExhibition'
import { t } from '../data/translations'
import { creativeWorks } from '../data/creativeWorks'

export function CreativeWorks() {
  const { lang } = useLanguage()
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [lightboxWorkIndex, setLightboxWorkIndex] = useState<number>(-1)

  const pages = useMemo(
    () => [
      {
        id: 'apparel',
        label: { en: 'PAGE 01 — APPAREL', id: 'HALAMAN 01 — APPAREL' },
        works: creativeWorks.filter((w) => w.category === 'apparel'),
      },
      {
        id: 'digital-poster',
        label: { en: 'PAGE 02 — DIGITAL POSTER', id: 'HALAMAN 02 — POSTER DIGITAL' },
        works: creativeWorks.filter((w) => w.category === 'digital-poster'),
      },
      {
        id: 'social',
        label: { en: 'PAGE 03 — SOCIAL MEDIA', id: 'HALAMAN 03 — MEDIA SOSIAL' },
        works: creativeWorks.filter((w) => w.category === 'social'),
      },
      {
        id: 'banner',
        label: { en: 'PAGE 04 — BANNER', id: 'HALAMAN 04 — BANNER' },
        works: creativeWorks.filter((w) => w.category === 'banner'),
      },
      {
        id: 'ui',
        label: { en: 'PAGE 05 — UI/UX', id: 'HALAMAN 05 — UI/UX' },
        works: creativeWorks.filter((w) => w.category === 'ui'),
      },
    ],
    [],
  )

  const activePage = pages[currentPage] ?? pages[0]

  // Keyboard navigation across chapters (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid hijacking if user is inside an input or modal
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return
      if (lightboxWorkIndex >= 0) return

      if (e.key === 'ArrowRight') {
        setCurrentPage((prev) => (prev + 1) % pages.length)
      } else if (e.key === 'ArrowLeft') {
        setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [pages.length, lightboxWorkIndex])

  // Open lightbox with global index mapping
  const handleOpenLightbox = (indexInChapter: number) => {
    const targetWork = activePage.works[indexInChapter]
    if (!targetWork) return
    const globalIdx = creativeWorks.findIndex((w) => w.id === targetWork.id)
    setLightboxWorkIndex(globalIdx >= 0 ? globalIdx : 0)
  }

  return (
    <section
      id="creative"
      aria-labelledby="creative-title"
      className="relative border-b border-line-dark bg-midnight-deep py-20 text-paper md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* Section Header */}
        <header className="reveal mb-10 md:mb-14">
          <div className="mb-4 flex items-baseline gap-4">
            <span className="index-num font-display-bold text-sm text-mint">06</span>
            <p className="font-body text-[0.7rem] font-bold uppercase tracking-[0.22em] text-paper/45">
              {t('creativeLabel', lang)}
            </p>
          </div>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2
              id="creative-title"
              className="max-w-3xl font-display-bold text-[clamp(1.9rem,4.5vw,3.1rem)] font-medium leading-[1.08] tracking-tight text-paper text-balance"
            >
              {t('creativeTitle', lang)}
            </h2>

            {/* Pagination Controls */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length)}
                aria-label={lang === 'en' ? 'Previous exhibition page' : 'Halaman pameran sebelumnya'}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 text-paper transition-colors hover:border-mint hover:text-mint"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="font-body text-xs font-bold tabular-nums text-paper/70">
                0{currentPage + 1} / 0{pages.length}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => (prev + 1) % pages.length)}
                aria-label={lang === 'en' ? 'Next exhibition page' : 'Halaman pameran berikutnya'}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 text-paper transition-colors hover:border-mint hover:text-mint"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Persistent Chapter Navigation Bar */}
          <div className="mt-8 flex overflow-x-auto border-b border-line-dark pb-3 scrollbar-none">
            <div className="flex gap-2">
              {pages.map((p, idx) => {
                const isActive = currentPage === idx
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setCurrentPage(idx)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`shrink-0 rounded-full px-4 py-2 font-body text-xs font-bold transition-all duration-300 ${
                      isActive
                        ? 'bg-mint text-midnight shadow-lg shadow-mint/10'
                        : 'border border-paper/15 text-paper/60 hover:border-paper/40 hover:text-paper'
                    }`}
                  >
                    {p.label[lang]}
                  </button>
                )
              })}
            </div>
          </div>
        </header>

        {/* Dynamic Chapter Exhibition with Smooth Transition */}
        <div key={activePage.id} className="transition-opacity duration-500 ease-out">
          {activePage.id === 'apparel' && (
            <ApparelExhibition
              works={activePage.works}
              lang={lang}
              onOpenLightbox={handleOpenLightbox}
            />
          )}

          {activePage.id === 'digital-poster' && (
            <PosterExhibition
              works={activePage.works}
              lang={lang}
              onOpenLightbox={handleOpenLightbox}
            />
          )}

          {activePage.id === 'social' && (
            <SocialExhibition
              works={activePage.works}
              lang={lang}
              onOpenLightbox={handleOpenLightbox}
            />
          )}

          {activePage.id === 'banner' && (
            <BannerExhibition
              works={activePage.works}
              lang={lang}
              onOpenLightbox={handleOpenLightbox}
            />
          )}

          {activePage.id === 'ui' && (
            <UiUxExhibition
              works={activePage.works}
              lang={lang}
            />
          )}
        </div>

        {/* Global Progress Indicator */}
        <div className="mt-14 flex items-center justify-between border-t border-line-dark/60 pt-6">
          <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-paper/40">
            {activePage.label[lang]}
          </span>
          <div className="h-1 w-32 overflow-hidden rounded-full bg-paper/10">
            <div
              className="h-full bg-electric transition-all duration-500 ease-out"
              style={{ width: `${((currentPage + 1) / pages.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Global Artwork Fullscreen Viewer */}
      <Lightbox
        items={creativeWorks}
        index={lightboxWorkIndex}
        lang={lang}
        labels={{
          close: t('closeLightbox', lang),
          next: t('nextImage', lang),
          prev: t('prevImage', lang),
          process: t('processLabel', lang),
          result: t('resultLabel', lang),
        }}
        onClose={() => setLightboxWorkIndex(-1)}
        onNavigate={(newIdx) => setLightboxWorkIndex(newIdx)}
      />
    </section>
  )
}
