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
      className="sec-pad border-b border-ink bg-paper text-ink"
    >
      <div className="shell">
        <div className="g">
          <div className="lab mono text-mute">
            <b className="lab-num">02</b> / <span>{t('experienceLabel', lang)}</span>
          </div>

          <div className="bd">
            <h2 id="experience-title" className="disp-h2 reveal">
              {t('experienceTitle', lang)}
            </h2>

            <ol className="xl">
              {experience.map((entry, index) => (
                <li
                  key={entry.id}
                  className="reveal"
                  style={{ transitionDelay: `${index * 70}ms` }}
                >
                  <div className="xm flex flex-col items-start gap-1">
                    {entry.status && <span className="st-sig mono">{entry.status[lang]}</span>}
                    {entry.period && (
                      <span className="mono text-mute">
                        {typeof entry.period === 'string' ? entry.period : entry.period[lang]}
                      </span>
                    )}
                    {entry.location && (
                      <span className="mono text-mute">{entry.location[lang]}</span>
                    )}
                  </div>

                  <div>
                    <p className="mono text-mute">{entry.role[lang]}</p>
                    <h3>{entry.organization}</h3>

                    {entry.bullets && entry.bullets.length > 0 && (
                      <ol className="max-w-3xl">
                        {entry.bullets.map((bullet, i) => (
                          <li key={i} className="text-[0.95rem] leading-relaxed text-ink/85">
                            {bullet[lang]}
                          </li>
                        ))}
                      </ol>
                    )}

                    {entry.url && (
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline mono mt-4 inline-block text-ink hover:text-signal"
                        data-cur="Open"
                      >
                        {t('visitWebsite', lang)}
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
