import { useLanguage } from '../hooks/useLanguage'
import { t } from '../data/translations'
import { skillGroups } from '../data/skills'

export function Skills() {
  const { lang } = useLanguage()
  const visible = skillGroups.filter((group) => group.items.length > 0)

  if (visible.length === 0) return null

  const total = visible.reduce((acc, g) => acc + g.items.length, 0)

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="sec-pad border-b border-ink bg-paper text-ink"
    >
      <div className="shell">
        <div className="g">
          <div className="lab mono text-mute">
            <b className="lab-num">03</b> / <span>{t('skillsLabel', lang)}</span>
          </div>

          <div className="bd">
            <h2 id="skills-title" className="disp-h2 reveal">
              {t('skillsTitle', lang)}
            </h2>

            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="reveal lg:col-span-4">
                <p className="max-w-[48ch] text-[1.02rem] leading-relaxed text-mute">
                  {t('skillsIntro', lang)}
                </p>
                <p className="mono mt-6 border-t border-ink pt-6 text-mute">
                  {total} {t('competencies', lang)}
                </p>
              </div>

              <div className="space-y-8 lg:col-span-8">
                {visible.map((group, index) => (
                  <div
                    key={group.id}
                    className="reveal border-t border-ink pt-5"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="mb-4 flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-base font-extrabold uppercase tracking-tight text-ink">
                        {group.label[lang]}
                      </h3>
                      <span className="index-num text-xs text-mute">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                      {group.items.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2.5 border border-ink/25 px-3.5 py-2.5 text-xs font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                        >
                          <span className="h-2 w-2 shrink-0 bg-signal" aria-hidden />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
