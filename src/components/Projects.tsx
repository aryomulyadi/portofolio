import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { ProjectDeck } from './ProjectDeck'
import { t } from '../data/translations'
import { projects } from '../data/projects'
import type { Project } from '../types'

export function Projects() {
  const { lang } = useLanguage()
  const [filter, setFilter] = useState<string>('all')
  const [activeId, setActiveId] = useState<string>(projects[0]?.id ?? '')
  const sectionRef = useRef<HTMLElement>(null)

  const handleActiveChange = useCallback((project: Project) => {
    setActiveId(project.id)
  }, [])

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
  const visibleKey = visible.map((p) => p.id).join('|')

  const active = projects.find((p) => p.id === activeId) ?? visible[0] ?? null

  // When the filtered set changes, reset the description to the first visible card
  useEffect(() => {
    if (visible.length > 0 && !visible.some((p) => p.id === activeId)) {
      setActiveId(visible[0].id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleKey])

  if (projects.length === 0) return null

  return (
    <section
      id="projects"
      ref={sectionRef}
      aria-labelledby="projects-title"
      className="border-b border-line-dark bg-midnight py-20 text-paper md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <header className="reveal mb-10 md:mb-14">
          <div className="mb-4 flex items-baseline gap-4">
            <span className="index-num font-display-bold text-sm text-mint">05</span>
            <p className="font-body text-[0.7rem] font-bold uppercase tracking-[0.22em] text-paper/45">
              {t('projectsLabel', lang)}
            </p>
          </div>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h2
              id="projects-title"
              className="max-w-2xl font-display-bold text-[clamp(1.9rem,4.5vw,3.1rem)] font-medium leading-[1.08] tracking-tight text-paper text-balance"
            >
              {t('projectsTitle', lang)}
            </h2>
            {showFilters && (
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label={lang === 'en' ? 'Filter projects' : 'Filter proyek'}
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
                {categories.map((key) => {
                  const label =
                    projects.find((p) => p.categoryKey === key)?.category[lang] ?? key
                  const activeFilter = filter === key
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFilter(key)}
                      aria-pressed={activeFilter}
                      className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                        activeFilter
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

        {visible.length === 0 || !active ? (
          <p className="reveal text-sm text-paper/50">{t('emptyProjects', lang)}</p>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-14">
            <div className="order-2 lg:order-1">
              <div
                key={active.id}
                className="desc-swap"
                aria-live="polite"
              >
                <p className="font-body text-[0.7rem] font-bold uppercase tracking-[0.22em] text-mint">
                  {t('descriptionLabel', lang)}
                </p>
                <h3 className="mt-3 font-display-bold text-[clamp(1.4rem,2.5vw,1.9rem)] font-bold tracking-tight text-paper text-balance">
                  {active.title}
                </h3>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-paper/80 text-balance">
                  {active.summary[lang]}
                </p>
                {active.description && (
                  <p className="mt-4 text-sm leading-relaxed text-paper/60 text-balance">
                    {active.description[lang]}
                  </p>
                )}
                <div className="mt-6 h-px w-16 bg-electric/50" aria-hidden />
              </div>
            </div>

            <div className="order-1 reveal lg:order-2">
              <ProjectDeck
                projects={visible}
                lang={lang}
                catalogIndex={catalogIndex}
                catalogTotal={projects.length}
                onActiveChange={handleActiveChange}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
