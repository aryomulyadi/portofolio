import { useEffect, useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { ProjectDeck } from './ProjectDeck'
import { useCardDeck } from '../hooks/useCardDeck'
import { t } from '../data/translations'
import { projects } from '../data/projects'

export function Projects() {
  const { lang } = useLanguage()
  const [filter, setFilter] = useState<string>('all')
  const sectionRef = useRef<HTMLElement>(null)

  const categories = useMemo(() => {
    const keys = new Set(projects.map((p) => p.categoryKey))
    return Array.from(keys)
  }, [])

  const catalogIndex = useMemo(() => {
    const map: Record<string, number> = {}
    projects.forEach((p, i) => {
      map[p.id] = i
    })
    return map
  }, [])

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

  const showFilters = categories.length > 1
  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.categoryKey === filter)),
    [filter],
  )

  /* FR-PRJ-01: filter change via View Transitions API, instant fallback (R5) */
  const applyFilter = (key: string) => {
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (typeof doc.startViewTransition === 'function' && !reduced) {
      doc.startViewTransition(() => {
        flushSync(() => setFilter(key))
      })
    } else {
      setFilter(key)
    }
  }

  const deck = useCardDeck(visible)
  const active = deck.activeProject ?? null

  if (projects.length === 0) return null

  return (
    <section
      id="projects"
      ref={sectionRef}
      aria-labelledby="projects-title"
      className="sec-pad border-b border-ink bg-ink text-paper"
    >
      <div className="shell">
        <div className="g">
          <div className="lab mono text-grey">
            <b className="lab-num">04</b> / <span>{t('projectsLabel', lang)}</span>
          </div>

          <div className="bd">
            <h2 id="projects-title" className="disp-h2 reveal text-paper">
              {t('projectsTitle', lang)}
            </h2>

            {showFilters && (
              <div
                className="-mt-[clamp(4px,1vw,12px)] mb-[clamp(16px,2.8vw,32px)] flex flex-wrap gap-2"
                role="group"
                aria-label={lang === 'en' ? 'Filter projects' : 'Filter proyek'}
              >
                <button
                  type="button"
                  onClick={() => applyFilter('all')}
                  aria-pressed={filter === 'all'}
                  className={`mono min-h-10 border px-3.5 py-2 transition-colors ${
                    filter === 'all'
                      ? 'border-paper bg-paper text-ink'
                      : 'border-grey text-paper hover:border-signal hover:text-signal'
                  }`}
                >
                  {t('filterAll', lang)}
                </button>
                {categories.map((key) => {
                  const label =
                    projects.find((p) => p.categoryKey === key)?.category[lang] ?? key
                  const activeFilter = filter === key
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => applyFilter(key)}
                      aria-pressed={activeFilter}
                      className={`mono min-h-10 border px-3.5 py-2 transition-colors ${
                        activeFilter
                          ? 'border-paper bg-paper text-ink'
                          : 'border-grey text-paper hover:border-signal hover:text-signal'
                      }`}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            )}

            {visible.length === 0 || !active ? (
              <p className="reveal text-sm text-grey">{t('emptyProjects', lang)}</p>
            ) : (
              <div className="grid items-center gap-[clamp(24px,5vw,72px)] lg:grid-cols-2" onKeyDown={deck.onKeyDown}>
                {/* Info panel — outline number, title, description, controls */}
                <div className="order-2 lg:order-1">
                  <div key={active.id} className="desc-swap" aria-live="polite">
                    <p className="no-outline" aria-hidden="true">
                      {String((catalogIndex[active.id] ?? 0) + 1).padStart(3, '0')}
                    </p>
                    <p className="mono mt-5 text-grey">{t('descriptionLabel', lang)}</p>
                    <h3 className="mt-3 font-display text-[clamp(1.8rem,4.2vw,3.4rem)] font-black uppercase leading-none tracking-tight text-paper text-balance" style={{ fontStretch: '108%' }}>
                      {active.title}
                    </h3>
                    <p className="mt-4 max-w-[46ch] text-[0.98rem] leading-relaxed text-grey text-balance">
                      {active.summary[lang]}
                    </p>
                    {active.description && (
                      <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-grey/85 text-balance">
                        {active.description[lang]}
                      </p>
                    )}

                    <div className="mt-7 flex flex-wrap items-center gap-2.5">
                      <button
                        type="button"
                        onClick={deck.goPrev}
                        disabled={deck.total < 2 || deck.isAnimating}
                        aria-label={t('deckPrev', lang)}
                        className="deck-btn"
                      >
                        <ArrowLeft size={15} aria-hidden />
                        {lang === 'en' ? 'Prev' : 'Sebelumnya'}
                      </button>
                      <button
                        type="button"
                        onClick={deck.goNext}
                        disabled={deck.total < 2 || deck.isAnimating}
                        aria-label={t('deckNext', lang)}
                        className="deck-btn is-red"
                      >
                        {lang === 'en' ? 'Next' : 'Berikutnya'}
                        <ArrowRight size={15} aria-hidden />
                      </button>
                      <span
                        className="mono ml-1 text-grey"
                        aria-live="polite"
                      >
                        {t('deckPosition', lang)
                          .replace('{n}', String(deck.activeIndex + 1).padStart(2, '0'))
                          .replace('{total}', String(deck.total).padStart(2, '0'))}
                      </span>
                    </div>

                    {deck.total > 1 && !deck.hintDismissed && (
                      <p className="deck-hint mono mt-4 text-grey">{t('deckHint', lang)}</p>
                    )}
                  </div>
                </div>

                {/* Card deck */}
                <div className="order-1 lg:order-2">
                  <ProjectDeck
                    deck={deck}
                    projects={visible}
                    lang={lang}
                    catalogIndex={catalogIndex}
                    catalogTotal={projects.length}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
