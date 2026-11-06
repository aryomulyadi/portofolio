import { useRef } from 'react'
import { Github, Linkedin, Instagram } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { useMagnetic } from '../hooks/useInteractions'
import { t } from '../data/translations'
import { profile } from '../data/profile'

export function Hero() {
  const { lang } = useLanguage()
  const workBtn = useMagnetic<HTMLAnchorElement>(0.2)
  const portraitRef = useRef<HTMLImageElement>(null)

  const hasCv = profile.links.cv !== null
  const portraitSrc = profile.portrait ?? './images/profile/portrait.png'

  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="relative min-h-[100svh] overflow-hidden border-b border-line-dark/40 bg-midnight pt-24 pb-16 text-paper md:pt-32"
    >
      {/* Electric blue glowing background effect */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-electric/25 blur-[140px] md:h-[700px] md:w-[700px]"
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-8rem)] max-w-6xl flex-col justify-center px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column / Headline & Bio */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <p className="mb-4 inline-flex items-center gap-2 font-body text-xs font-bold uppercase tracking-[0.3em] text-mint">
              <span className="h-2 w-2 rounded-full bg-mint" aria-hidden />
              {profile.location ? profile.location[lang] : 'Creative Developer'}
            </p>

            <div className="flex items-center gap-4 lg:block">
              <img
                src={portraitSrc}
                alt={t('portraitAlt', lang)}
                width={128}
                height={128}
                className="h-16 w-16 shrink-0 rounded-2xl border border-electric/30 bg-midnight-deep/60 object-cover object-center lg:hidden"
                onError={(event) => {
                  const img = event.currentTarget
                  if (!img.src.includes('portrait.png')) {
                    img.src = './images/profile/portrait.png'
                  }
                }}
              />
              <h1
                id="home-title"
                className="font-display-bold text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.98] tracking-tight text-paper text-balance"
              >
                <span className="block">Rifqi Aryo</span>
                <span className="block mt-1 font-serif italic text-mint font-normal text-[clamp(2rem,4.5vw,3.8rem)]">
                  Mulyadi
                </span>
              </h1>
            </div>

            <p className="mt-6 font-display text-lg font-bold tracking-tight text-electric md:text-xl">
              {profile.role[lang]}
            </p>

            <p className="mt-4 text-[0.98rem] leading-relaxed text-paper/75 text-balance">
              {profile.intro[lang]}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                ref={workBtn}
                href="#projects"
                className="magnetic inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3.5 text-sm font-bold text-midnight transition-colors hover:bg-white"
              >
                {t('viewWork', lang)}
                <span className="text-lg leading-none">→</span>
              </a>
              {hasCv && (
                <a
                  href={profile.links.cv ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-mint/30 px-6 py-3.5 text-sm font-bold text-mint transition-colors hover:border-mint hover:bg-mint/10"
                >
                  {t('viewCv', lang)}
                </a>
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-mint hover:text-paper"
              >
                <Github size={16} aria-hidden />
                {t('github', lang)}
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-mint hover:text-paper"
              >
                <Linkedin size={16} aria-hidden />
                {t('linkedin', lang)}
              </a>
              <a
                href={profile.links.instagram ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-mint hover:text-paper"
                aria-disabled={profile.links.instagram === null}
              >
                <Instagram size={16} aria-hidden />
                Instagram
              </a>
            </div>
          </div>

          {/* Center Column / Large Transparent Background Subject Photo */}
          <div className="hidden lg:col-span-7 lg:flex lg:justify-center lg:items-center">
            <figure className="relative w-full max-w-lg group">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-electric/30 bg-midnight-deep/60 backdrop-blur-md shadow-[0_20px_60px_rgba(2,151,222,0.2)]">
                <img
                  ref={portraitRef}
                  src={portraitSrc}
                  alt={t('portraitAlt', lang)}
                  width={700}
                  height={875}
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(event) => {
                    const img = event.currentTarget
                    if (!img.src.includes('portrait.png')) {
                      img.src = './images/profile/portrait.png'
                    }
                  }}
                />
              </div>
            </figure>
          </div>

        </div>
      </div>
    </section>
  )
}
