import { useMemo, useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { Lightbox } from './Lightbox'
import { t } from '../data/translations'
import { creativeWorks } from '../data/creativeWorks'

const sizeClasses = [
  'sm:col-span-2 sm:row-span-2',
  '',
  '',
  'sm:col-span-2',
  '',
  '',
]

export function CreativeWorks() {
  const { lang } = useLanguage()
  const [filter, setFilter] = useState<string>('all')
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const categories = useMemo(() => {
    const map = new Map<string, string>()
    creativeWorks.forEach((work) => map.set(work.category, work.categoryLabel[lang]))
    return Array.from(map.entries())
  }, [lang])

  const visible = useMemo(
    () => (filter === 'all' ? creativeWorks : creativeWorks.filter((w) => w.category === filter)),
    [filter],
  )

  if (creativeWorks.length === 0) return null

  const showFilters = categories.length > 1

  return (
    <section
      id="creative"
      aria-labelledby="creative-title"
      className="border-b border-line bg-paper py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <header className="reveal mb-10 md:mb-14">
          <div className="mb-4 flex items-baseline gap-4">
            <span className="index-num font-display text-sm font-medium text-electric">06</span>
            <p className="font-body text-[0.7rem] font-medium uppercase tracking-[0.22em] text-ink-faint">
              {t('creativeLabel', lang)}
            </p>
          </div>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h2
              id="creative-title"
              className="max-w-2xl font-display text-[clamp(1.9rem,4.5vw,3.1rem)] font-medium leading-[1.08] tracking-tight text-ink text-balance"
            >
              {t('creativeTitle', lang)}
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
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    filter === 'all'
                      ? 'bg-ink text-paper'
                      : 'border border-line text-ink-soft hover:border-ink hover:text-ink'
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
                      className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                        active
                          ? 'bg-ink text-paper'
                          : 'border border-line text-ink-soft hover:border-ink hover:text-ink'
                      }`}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
          <div className="rule-strong mt-8" />
        </header>

        {visible.length === 0 ? (
          <p className="reveal text-sm text-ink-faint">{t('emptyCreative', lang)}</p>
        ) : (
          <ul className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-3">
            {visible.map((work, index) => (
              <li
                key={work.id}
                className={`reveal ${sizeClasses[index % sizeClasses.length]}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className="group block w-full text-left"
                  aria-label={`${work.title[lang]} — ${t('openDetails', lang)}`}
                >
                  <span className="block overflow-hidden bg-ink/5">
                    <img
                      src={work.image}
                      alt={work.caption?.[lang] ?? work.title[lang]}
                      loading="lazy"
                      width={600}
                      height={750}
                      className="aspect-[4/5] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </span>
                  <span className="mt-3 flex items-baseline justify-between gap-3">
                    <span className="font-display text-sm font-medium text-ink transition-colors group-hover:text-electric">
                      {work.title[lang]}
                    </span>
                    <span className="font-body text-[0.68rem] uppercase tracking-wider text-ink-faint">
                      {work.categoryLabel[lang]}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
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
        }}
        onClose={() => setLightboxIndex(-1)}
        onNavigate={setLightboxIndex}
      />
    </section>
  )
}
