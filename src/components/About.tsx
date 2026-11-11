import { useLanguage } from '../hooks/useLanguage'
import { t } from '../data/translations'
import { profile } from '../data/profile'

export function About() {
  const { lang } = useLanguage()

  const facts = [
    { k: t('factFocusLabel', lang), v: t('factFocusValue', lang) },
    {
      k: t('factBasedLabel', lang),
      v: profile.location ? profile.location[lang] : 'Indonesia',
    },
    { k: t('factCurrentlyLabel', lang), v: t('factCurrentlyValue', lang) },
    { k: t('factStackLabel', lang), v: t('factStackValue', lang) },
    { k: t('factOpenLabel', lang), v: t('factOpenValue', lang) },
  ]

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="sec-pad border-b border-ink bg-paper text-ink"
    >
      <div className="shell">
        <div className="g">
          <div className="lab mono text-mute">
            <b className="lab-num">01</b> / <span>{t('aboutLabel', lang)}</span>
          </div>

          <div className="bd">
            <h2 id="about-title" className="disp-h2 reveal">
              {t('aboutTitle', lang)}
            </h2>

            <div className="reveal">
              <p className="stmt">
                {t('aboutQuoteBefore', lang)}
                <span className="mark-sig">{t('aboutQuoteMark', lang)}</span>
                {t('aboutQuoteAfter', lang)}
              </p>
            </div>

            <div className="grid gap-10 md:grid-cols-2 md:gap-14">
              <div className="reveal" style={{ transitionDelay: '60ms' }}>
                <p className="max-w-[54ch] text-[1.02rem] leading-relaxed text-mute">
                  {t('aboutBody', lang)}
                </p>
                <p className="mono mt-6 text-mute">{profile.name}</p>
              </div>

              <dl className="fx reveal" style={{ transitionDelay: '120ms' }}>
                {facts.map((row) => (
                  <div key={row.k}>
                    <dt className="mono">{row.k}</dt>
                    <dd>{row.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
