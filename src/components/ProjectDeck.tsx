import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import { t } from '../data/translations'
import type { DeckState } from '../hooks/useCardDeck'
import type { Project } from '../types'

interface ProjectDeckProps {
  deck: DeckState
  projects: Project[]
  lang: 'id' | 'en'
  catalogIndex: Record<string, number>
  catalogTotal: number
}

const OPACITY = [1, 0.95, 0.8, 0.65] as const

function clearTilt(el: HTMLElement) {
  el.style.setProperty('--tx', '0px')
  el.style.setProperty('--ty', '0px')
  el.style.setProperty('--rx', '0deg')
  el.style.setProperty('--ry', '0deg')
}

export function ProjectDeck({ deck, projects, lang, catalogIndex, catalogTotal }: ProjectDeckProps) {
  const { order, activeIndex, drag, exitDir, isAnimating, total } = deck

  if (total === 0) return null

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>, isFront: boolean) => {
    deck.dragHandlers.onPointerMove(event)
    if (!isFront || drag.active || exitDir !== null) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const el = event.currentTarget
    const rect = el.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5

    el.style.setProperty('--rx', `${(-y * 8).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${(x * 8).toFixed(2)}deg`)
    el.style.setProperty('--tx', `${(x * 4).toFixed(1)}px`)
    el.style.setProperty('--ty', `${(y * 4).toFixed(1)}px`)
    el.style.setProperty('--mx', `${((x + 0.5) * 100).toFixed(1)}%`)
    el.style.setProperty('--my', `${((y + 0.5) * 100).toFixed(1)}%`)
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    clearTilt(event.currentTarget)
    deck.dragHandlers.onPointerDown(event)
  }

  const handlePointerLeave = (event: ReactPointerEvent<HTMLElement>) => {
    if (!drag.active) clearTilt(event.currentTarget)
  }

  return (
    <div
      className="deck w-full"
      role="group"
      aria-label={t('projectsLabel', lang)}
      tabIndex={0}
      onKeyDown={deck.onKeyDown}
    >
      {order.map((projectId, rank) => {
        const project = projects.find((p) => p.id === projectId)
        if (!project) return null

        const isFront = rank === 0
        const isExiting = isFront && exitDir !== null
        const catNum = String((catalogIndex[projectId] ?? 0) + 1).padStart(3, '0')
        const round = project.categoryKey === 'ai'

        const classes = [
          'deck-card',
          isExiting ? `is-exit-${exitDir}` : isFront ? 'is-front' : 'is-behind',
          isFront && !isExiting && drag.active ? 'is-dragging' : '',
          isFront && !isExiting ? 'tilt' : '',
        ]
          .filter(Boolean)
          .join('')

        let cardStyle: CSSProperties = { zIndex: 40 - rank }
        if (isExiting) {
          const sign = exitDir === 'prev' ? -1 : 1
          cardStyle = {
            ...cardStyle,
            zIndex: 1,
            opacity: 0,
            transform: `translate(${sign * 520}px, -40px) rotate(${sign * 24}deg)`,
          }
        } else if (isFront) {
          cardStyle = {
            ...cardStyle,
            zIndex: 40,
            opacity: 1,
            ['--drag-x' as string]: `${drag.x}px`,
            ['--drag-y' as string]: `${drag.y}px`,
            ['--drag-rot' as string]: `${drag.rotate}deg`,
          } as CSSProperties
        } else {
          cardStyle = {
            ...cardStyle,
            opacity: OPACITY[Math.min(rank, 3)],
            ['--rank' as string]: rank,
          } as CSSProperties
        }

        const handlers =
          isFront && !isExiting && total > 1 && !isAnimating
            ? {
                onPointerDown: handlePointerDown,
                onPointerMove: (e: ReactPointerEvent<HTMLElement>) => handlePointerMove(e, true),
                onPointerLeave: handlePointerLeave,
                onPointerUp: deck.dragHandlers.onPointerUp,
                onPointerCancel: deck.dragHandlers.onPointerCancel,
                onClickCapture: deck.dragHandlers.onClickCapture,
              }
            : undefined

        return (
          <article
            key={projectId}
            className={classes}
            style={cardStyle}
            {...handlers}
            data-cur={isFront && !isExiting ? 'Drag' : undefined}
            aria-hidden={!isFront}
          >
            <div className="cin">
              <div className="cin-header">
                <span className="cnm">{project.title}</span>
                <span className="cno">
                  NO.<b>{catNum}</b>
                </span>
              </div>

              <span className="ctp">
                <i className={round ? 'round' : undefined} aria-hidden />
                {project.category[lang]}
              </span>

              <div className="cart">
                {project.image ? (
                  <img src={project.image} alt="" />
                ) : (
                  <span className="font-display text-3xl font-black uppercase tracking-tight text-ink/70">
                    {project.title}
                  </span>
                )}
              </div>

              <dl className="cmv">
                <dt>{t('roleLabel', lang)}</dt>
                <dd>{project.role ? project.role[lang] : project.category[lang]}</dd>
                <dt>{t('stackLabel', lang)}</dt>
                <dd>{project.stack.length > 0 ? project.stack.join(', ') : '—'}</dd>
              </dl>

              <div className="cft">
                <span>
                  commit {catNum}/{String(catalogTotal).padStart(3, '0')}
                </span>
                <span className="flex items-center gap-2.5">
                  <span className="text-ink/45">RAM ©26</span>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      data-cur="Open"
                    >
                      <ExternalLink size={12} aria-hidden />
                      Live
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      data-cur="Open"
                    >
                      <Github size={12} aria-hidden />
                      GitHub
                    </a>
                  )}
                </span>
              </div>
            </div>
            <div className="holo" aria-hidden />
          </article>
        )
      })}

      <p className="sr-only" aria-live="polite">
        {lang === 'en'
          ? `Project ${activeIndex + 1} of ${total}: ${deck.activeProject?.title ?? ''}`
          : `Proyek ${activeIndex + 1} dari ${total}: ${deck.activeProject?.title ?? ''}`}
      </p>
    </div>
  )
}
