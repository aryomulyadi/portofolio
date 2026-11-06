import { useEffect, useMemo } from 'react'
import type { CSSProperties } from 'react'
import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react'
import type { Lang, Project } from '../types'
import { t } from '../data/translations'
import { useCardDeck } from '../hooks/useCardDeck'

function cardNumber(index: number, total: number) {
  const n = String(index + 1).padStart(3, '0')
  const d = String(total).padStart(3, '0')
  return `${n}/${d}`
}

interface ProjectDeckProps {
  projects: Project[]
  lang: Lang
  /** Stable index in the unfiltered catalog, for card numbers like 001/004 */
  catalogIndex: Record<string, number>
  catalogTotal: number
  /** Fires when the front card changes (filter reset, swipe, buttons) */
  onActiveChange?: (project: Project) => void
}

export function ProjectDeck({ projects, lang, catalogIndex, catalogTotal, onActiveChange }: ProjectDeckProps) {
  const deck = useCardDeck(projects)
  const { order, drag, exitDir, activeProject, activeIndex, total } = deck

  const byId = useMemo(() => {
    const map = new Map<string, Project>()
    projects.forEach((p) => map.set(p.id, p))
    return map
  }, [projects])

  // Keep parent description panel in sync with the front card
  useEffect(() => {
    if (activeProject) onActiveChange?.(activeProject)
  }, [activeProject, onActiveChange])

  if (projects.length === 0 || !activeProject) return null

  const single = total < 2

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        role="region"
        aria-roledescription="card deck"
        aria-label={t('projectsTitle', lang)}
        tabIndex={0}
        onKeyDown={deck.onKeyDown}
        className="deck relative w-full max-w-[400px] aspect-[5/7]"
      >
        {order.map((id, rank) => {
          const project = byId.get(id)
          if (!project) return null
          const isFront = rank === 0
          const exiting = isFront && exitDir !== null

          const stackStyle = {
            '--rank': rank,
            zIndex: 40 - rank,
          } as CSSProperties

          let transform = `translateY(${rank * 14}px) scale(${1 - rank * 0.04}) translateZ(${-rank * 48}px)`
          let opacity = Math.max(0, 1 - rank * 0.28)

          if (isFront) {
            transform = `translate(${drag.x}px, ${drag.y}px) rotate(${drag.rotate}deg)`
            opacity = 1
          }
          if (exiting) {
            const dirSign = exitDir === 'next' ? 1 : -1
            transform = `translateX(${dirSign * 140}%) rotate(${dirSign * 18}deg)`
            opacity = 0
          }

          return (
            <article
              key={project.id}
              className={`deck-card${isFront ? ' is-front' : ''}${exiting ? (exitDir === 'next' ? ' is-exit-next' : ' is-exit-prev') : ''}`}
              style={{
                ...stackStyle,
                transform,
                opacity,
                ...(isFront && !exiting && drag.active ? { transition: 'none' } : null),
              }}
              aria-hidden={!isFront}
              inert={!isFront}
              {...(isFront && !single ? deck.dragHandlers : {})}
            >
              <div className="card-frame flex h-full flex-col">
                <header className="card-name">{project.title}</header>

                <div className="card-artwork">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt=""
                      loading={rank <= 1 ? 'eager' : 'lazy'}
                      width={800}
                      height={500}
                      draggable={false}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-midnight text-xs text-paper/40">
                      {project.title}
                    </div>
                  )}
                  <div className="card-holo" aria-hidden />
                </div>

                <div className="card-meta-row">
                  <span className="card-badge">{project.category[lang]}</span>
                  <span className="card-number">
                    {cardNumber(catalogIndex[project.id] ?? 0, catalogTotal)}
                  </span>
                </div>

                <div className="card-info">
                  {project.role && (
                    <p className="card-info-line">
                      <span className="card-info-label">{t('roleLabel', lang)}</span>
                      <span>{project.role[lang]}</span>
                    </p>
                  )}
                  {project.stack.length > 0 && (
                    <p className="card-info-line">
                      <span className="card-info-label">{t('stackLabel', lang)}</span>
                      <span className="truncate">{project.stack.join(' · ')}</span>
                    </p>
                  )}
                </div>

                <footer className="card-links">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-link"
                    >
                      <ExternalLink size={13} aria-hidden />
                      {t('liveLink', lang)}
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-link card-link-muted"
                    >
                      <Github size={13} aria-hidden />
                      {t('githubLink', lang)}
                    </a>
                  )}
                </footer>
              </div>
            </article>
          )
        })}
      </div>

      <div className="deck-controls flex w-full max-w-[400px] items-center justify-between gap-4">
        <button
          type="button"
          onClick={deck.goPrev}
          disabled={single || deck.isAnimating}
          aria-label={t('deckPrev', lang)}
          className="deck-btn"
        >
          <ArrowLeft size={16} aria-hidden />
          <span className="hidden sm:inline">{t('deckPrev', lang)}</span>
        </button>

        <p className="deck-indicator font-body text-xs font-bold tracking-[0.16em] text-paper/55" aria-live="polite">
          {t('deckPosition', lang)
            .replace('{n}', String(activeIndex + 1).padStart(2, '0'))
            .replace('{total}', String(total).padStart(2, '0'))}
        </p>

        <button
          type="button"
          onClick={deck.goNext}
          disabled={single || deck.isAnimating}
          aria-label={t('deckNext', lang)}
          className="deck-btn"
        >
          <span className="hidden sm:inline">{t('deckNext', lang)}</span>
          <ArrowRight size={16} aria-hidden />
        </button>
      </div>

      {!single && !deck.hintDismissed && (
        <p className="deck-hint font-body text-[0.7rem] uppercase tracking-[0.18em] text-paper/40">
          {t('deckHint', lang)}
        </p>
      )}
    </div>
  )
}
