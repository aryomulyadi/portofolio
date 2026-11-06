import { useMemo, useState } from 'react'
import { Github, ExternalLink } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { t } from '../data/translations'
import { projects } from '../data/projects'

export function Projects() {
  const { lang } = useLanguage()
  const [filter, setFilter] = useState<string>('all')

  const categories = useMemo(() => {
    const keys = new Set(projects.map((p) => p.categoryKey))
    return Array.from(keys)
  }, [])

  const showFilters = categories.length > 1
  const visible =
    filter === 'all' ? projects : projects.filter((p) => p.categoryKey === filter)

  if (projects.length === 0) return null

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="border-b border-line-dark bg-midnight py-20 text-paper md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <header className="reveal mb-12 md:mb-16">
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

        {visible.length === 0 ? (
          <p className="reveal text-sm text-paper/50">{t('emptyProjects', lang)}</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2">
            {visible.map((project, index) => (
              <article
                key={project.id}
                className="reveal project-card group flex flex-col border border-line-dark bg-midnight-deep p-6 transition-all hover:border-electric/60 hover:shadow-[0_20px_40px_rgba(2,151,222,0.15)]"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                {project.image && (
                  <div className="mb-5 overflow-hidden bg-midnight">
                    <img
                      src={project.image}
                      alt={project.summary[lang]}
                      loading="lazy"
                      width={800}
                      height={500}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col">
                  <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-body text-[0.68rem] font-bold uppercase tracking-[0.18em] text-mint">
                      {project.category[lang]}
                    </span>
                    {project.status && (
                      <span className="font-body text-[0.68rem] text-paper/40">
                        {project.status[lang]}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display-bold text-2xl font-bold tracking-tight text-paper text-balance">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-paper/70 text-balance">
                    {project.summary[lang]}
                  </p>

                  {project.role && (
                    <p className="mt-4 text-xs text-paper/60">
                      <span className="font-bold text-paper">{t('roleLabel', lang)}: </span>
                      {project.role[lang]}
                    </p>
                  )}

                  {project.stack.length > 0 && (
                    <p className="mt-4 font-body text-xs text-paper/50">
                      <span className="font-bold uppercase tracking-wider text-paper/80">
                        {t('stackLabel', lang)}:
                      </span>{' '}
                      <span className="text-electric font-semibold">{project.stack.join(' · ')}</span>
                    </p>
                  )}

                  <div className="mt-6 flex flex-wrap gap-4 pt-2 border-t border-line-dark/60">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-mint hover:text-paper"
                      >
                        <ExternalLink size={14} aria-hidden />
                        {t('liveLink', lang)}
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-paper/80 hover:text-paper"
                      >
                        <Github size={14} aria-hidden />
                        {t('githubLink', lang)}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
