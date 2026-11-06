import { useLanguage } from '../hooks/useLanguage'
import { t } from '../data/translations'
import { skillGroups } from '../data/skills'

export function Skills() {
  const { lang } = useLanguage()
  const visible = skillGroups.filter((group) => group.items.length > 0)

  if (visible.length === 0) return null

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="border-b border-line bg-paper py-20 text-ink md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <header className="reveal mb-12 md:mb-16">
          <div className="mb-4 flex items-baseline gap-4">
            <span className="index-num font-display-bold text-sm text-mint">04</span>
            <p className="font-body text-[0.7rem] font-bold uppercase tracking-[0.22em] text-ink-faint">
              {t('skillsLabel', lang)}
            </p>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2
              id="skills-title"
              className="max-w-2xl font-display-bold text-[clamp(1.9rem,4.5vw,3.1rem)] font-medium leading-[1.08] tracking-tight text-ink text-balance"
            >
              {t('skillsTitle', lang)}
            </h2>
          </div>
          <div className="rule mt-8" />
        </header>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="reveal lg:col-span-4">
            <p className="text-sm leading-relaxed text-ink-soft text-balance">
              {lang === 'en'
                ? 'A curated list of core technologies, frameworks, and workflows used across personal and client projects.'
                : 'Daftar teknologi, framework, dan alur kerja utama yang digunakan dalam proyek pribadi dan klien.'}
            </p>
            <div className="mt-6 hidden lg:block border-t border-line pt-6">
              <span className="font-body text-[0.68rem] uppercase tracking-[0.18em] text-ink-faint">
                {visible.reduce((acc, g) => acc + g.items.length, 0)} {lang === 'en' ? 'Verified Competencies' : 'Kompetensi Terverifikasi'}
              </span>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-10">
            {visible.map((group, index) => (
              <div
                key={group.id}
                className="reveal border-t border-line pt-6"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="mb-4 flex items-baseline justify-between">
                  <h3 className="font-display text-base font-bold text-ink">
                    {group.label[lang]}
                  </h3>
                  <span className="index-num font-body text-xs text-mint">
                    0{index + 1}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {group.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-lg border border-ink/10 bg-ink/5 px-3.5 py-2.5 text-xs font-bold text-ink transition-colors hover:border-mint hover:bg-mint/10"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
