import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { CreativeWork, Lang } from '../../types'

interface ShowcaseStageProps {
  work: CreativeWork
  index: number
  total: number
  lang: Lang
  /** Remounts the artwork on filter change or work change to replay fade. */
  fadeKey: string
  onOpen: () => void
  onPrev: () => void
  onNext: () => void
  labels: {
    eyebrow: string
    prev: string
    next: string
    open: string
  }
}

export function ShowcaseStage({ work, index, total, lang, fadeKey, onOpen, onPrev, onNext, labels }: ShowcaseStageProps) {
  const single = total < 2
  const position = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`

  return (
    <div className="showcase-stage relative w-full overflow-hidden bg-midnight">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${work.title[lang]} — ${labels.open}`}
        className="group relative block w-full text-left md:h-[86vh] lg:h-[90vh]"
      >
        <img
          key={fadeKey}
          src={work.image}
          alt={work.caption?.[lang] ?? work.title[lang]}
          loading="eager"
          decoding="async"
          className="showcase-fade block aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] md:absolute md:inset-0 md:h-full md:aspect-auto"
        />
        <div className="px-5 pt-5 pb-4 md:absolute md:bottom-0 md:w-full md:bg-gradient-to-t md:from-midnight-deep/95 md:via-midnight-deep/45 md:to-transparent md:px-8 md:pt-20 md:pb-9">
          <p className="font-body text-[0.7rem] font-bold uppercase tracking-[0.22em] text-mint">
            {labels.eyebrow}
          </p>
          <h3 className="mt-2 font-display-bold text-[clamp(1.5rem,4vw,2.6rem)] font-bold tracking-tight text-paper text-balance">
            {work.title[lang]}
          </h3>
          <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-body text-xs font-bold uppercase tracking-[0.16em] text-electric">
              {work.categoryLabel[lang]}
            </span>
            {work.year && (
              <span className="font-body text-xs tabular-nums tracking-widest text-paper/50">{work.year}</span>
            )}
          </div>
          {work.caption && (
            <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-paper/70 text-balance">
              {work.caption[lang]}
            </p>
          )}
        </div>
      </button>

      <div className="flex items-center justify-between gap-4 px-5 pt-4 md:absolute md:right-6 md:top-6 md:z-10 md:px-0 md:pt-0">
        <span
          className="font-body text-xs font-bold tabular-nums tracking-[0.16em] text-paper/70"
          aria-live="polite"
        >
          {position}
        </span>
        {!single && (
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onPrev}
              aria-label={labels.prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/35 bg-midnight-deep/55 text-paper backdrop-blur-sm transition-colors hover:border-mint hover:text-mint focus-visible:border-mint"
            >
              <ArrowLeft size={17} aria-hidden />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label={labels.next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/35 bg-midnight-deep/55 text-paper backdrop-blur-sm transition-colors hover:border-mint hover:text-mint focus-visible:border-mint"
            >
              <ArrowRight size={17} aria-hidden />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
