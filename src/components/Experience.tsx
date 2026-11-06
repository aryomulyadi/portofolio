import { useLanguage } from '../hooks/useLanguage'
import { t } from '../data/translations'
import { experience } from '../data/experience'

export function Experience() {
  const { lang } = useLanguage()

  if (experience.length === 0) return null

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="border-b border-line-dark bg-midnight py-20 text-paper md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <header className="reveal mb-12 md:mb-16">
          <div className="mb-4 flex items-baseline gap-4">
            <span className="index-num font-display-bold text-sm text-mint">03</span>
            <p className="font-body text-[0.7rem] font-bold uppercase tracking-[0.22em] text-paper/45">
              {t('experienceLabel', lang)}
            </p>
          </div>
          <h2
            id="experience-title"
            className="max-w-3xl font-display-bold text-[clamp(1.9rem,4.5vw,3.1rem)] font-medium leading-[1.08] tracking-tight text-paper text-balance"
          >
            {t('experienceTitle', lang)}
          </h2>
          <div className="rule-electric mt-8" />
        </header>

        <ol className="flex flex-col">
          {experience.map((entry, index) => (
            <li
              key={entry.id}
              className="reveal border-b border-line-dark py-10 first:border-t first:border-line-dark md:py-14"
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <div className="grid gap-6 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-3">
                   <p className="index-num font-display text-xs tracking-[0.14em] text-paper/40 uppercase">
                     {String(index + 1).padStart(2, '0')} / {entry.organization}
                   </p>
                   {entry.period && (
                     <p className="mt-2 font-body text-xs font-semibold text-mint">
                       {typeof entry.period === 'string' ? entry.period : entry.period[lang]}
                     </p>
                   )}
                   {entry.status && (
                     <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-mint/40 px-3.5 py-1 font-body text-[0.68rem] font-bold uppercase tracking-wider text-mint">
                       <span className="h-1.5 w-1.5 rounded-full bg-mint" aria-hidden />
                       {entry.status[lang]}
                     </p>
                   )}
                   {entry.location && (
                     <p className="mt-4 max-w-xs font-body text-xs leading-relaxed text-paper/45">
                       {entry.location[lang]}
                     </p>
                   )}
                 </div>

                <div className="md:col-span-9">
                  <p className="font-body text-sm font-bold text-mint">{entry.role[lang]}</p>
                  <h3 className="mt-2 font-display-bold text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-tight tracking-tight text-paper text-balance">
                    {entry.organization}
                  </h3>

                  {entry.bullets && entry.bullets.length > 0 && (
                    <ol className="mt-7 max-w-3xl space-y-0">
                      {entry.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-line-dark py-5 last:border-b"
                        >
                          <span
                            className="index-num pt-0.5 font-display text-xs text-mint/70 font-bold"
                            aria-hidden
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-[0.95rem] leading-relaxed text-paper/75 text-balance">
                            {bullet[lang]}
                          </span>
                        </li>
                      ))}
                    </ol>
                  )}

                  {entry.url && (
                    <a
                      href={entry.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline mt-5 inline-block text-sm font-bold text-mint hover:text-paper"
                    >
                      {lang === 'en' ? 'Visit website' : 'Kunjungi website'}
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
