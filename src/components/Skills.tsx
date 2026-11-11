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
                <p className="lead text-mute">{t('skillsIntro', lang)}</p>
                <p className="mono mt-6 border-t border-ink pt-6 text-mute">
                  {total} {t('competencies', lang)}
                </p>
              </div>

              <div className="reveal lg:col-span-8" style={{ transitionDelay: '60ms' }}>
                <ul className="rowl rowl-sk">
                  {visible.map((group, index) => (
                    <li key={group.id}>
                      <span className="t">{group.label[lang]}</span>
                      <span className="text-[0.95rem] leading-relaxed text-mute">
                        {group.items.join(' · ')}
                      </span>
                      <span className="mono index-num text-mute">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
