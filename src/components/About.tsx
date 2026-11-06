import { useLanguage } from '../hooks/useLanguage'
import { t } from '../data/translations'
import { profile } from '../data/profile'

export function About() {
  const { lang } = useLanguage()

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-b border-line bg-paper py-20 text-ink md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <header className="reveal mb-12 md:mb-16">
          <div className="mb-4 flex items-baseline gap-4">
            <span className="index-num font-display-bold text-sm text-mint">02</span>
            <p className="font-body text-[0.7rem] font-bold uppercase tracking-[0.22em] text-ink-faint">
              {t('aboutLabel', lang)}
            </p>
          </div>
          <h2
            id="about-title"
            className="max-w-3xl font-display-bold text-[clamp(1.9rem,4.5vw,3.1rem)] font-medium leading-[1.08] tracking-tight text-ink text-balance"
          >
            {t('aboutTitle', lang)}
          </h2>
          <div className="rule mt-8" />
        </header>

        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <blockquote
            className="reveal md:col-span-7 lg:col-span-6"
            style={{ transitionDelay: '60ms' }}
          >
            <p className="italic-serif text-[clamp(1.25rem,2.4vw,1.65rem)] leading-[1.35] font-normal tracking-tight text-ink text-balance">
              {lang === 'en'
                ? '“Code becomes experience. From AI agents to pixel-perfect interfaces, I connect technology to human outcomes.”'
                : '“Code menjadi pengalaman. Dari AI agent hingga interface pixel-perfect, saya menghubungkan teknologi dengan hasil nyata.”'}
            </p>
            <footer className="mt-6 font-body text-[0.7rem] uppercase tracking-[0.18em] text-ink-faint">
              {profile.name}
            </footer>

            <div className="mt-10 space-y-5 text-[1.02rem] leading-relaxed text-ink-soft">
              <p className="text-balance">
                {lang === 'en'
                  ? 'I work across interactive web products, AI-driven platforms, and digital experiences. The common thread is bridging technical depth with creative vision.'
                  : 'Saya kerja di bidang produk web interaktif, platform berbasis AI, dan pengalaman digital. Benang merahnya: menjembatani kedalaman teknis dengan visi kreatif.'}
              </p>
            </div>
          </blockquote>

          <aside
            className="reveal md:col-span-5 lg:col-span-5 lg:col-start-8"
            style={{ transitionDelay: '120ms' }}
          >
            <dl className="border-t border-line">
              {[
                {
                  k: lang === 'en' ? 'Focus' : 'Fokus',
                  v: lang === 'en' ? 'Web, AI Platforms, Creative Tech' : 'Web, Platform AI, Teknologi Kreatif',
                },
                {
                  k: lang === 'en' ? 'Based' : 'Basis',
                  v: profile.location ? profile.location[lang] : 'Indonesia',
                },
                {
                  k: lang === 'en' ? 'Currently' : 'Saat ini',
                  v: lang === 'en' ? 'Creative Developer, Banjar Custom' : 'Creative Developer, Banjar Custom',
                },
                {
                  k: lang === 'en' ? 'Stack' : 'Stack',
                  v: lang === 'en' ? 'React, Next.js, Laravel, CrewAI' : 'React, Next.js, Laravel, CrewAI',
                },
                {
                   k: lang === 'en' ? 'Open to' : 'Terbuka untuk',
                   v: lang === 'en' ? 'Freelance, Collaboration, Talks' : 'Freelance, Kolaborasi, Talks',
                 },
              ].map((row) => (
                <div
                  key={row.k}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-4"
                >
                  <dt className="font-body text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ink-faint">
                    {row.k}
                  </dt>
                  <dd className="text-right text-sm font-bold text-ink text-balance">{row.v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  )
}
