import { useEffect, useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { t } from '../data/translations'
import { profile } from '../data/profile'

const REDUCED = '(prefers-reduced-motion: reduce)'
const FINE = '(hover: hover) and (pointer: fine)'

export function Hero() {
  const { lang } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  const hasCv = profile.links.cv !== null
  const portraitSrc = profile.portrait ?? './images/profile/portrait.png'
  const lines = profile.name.split(' ')

  /* Kinetic typography (FR-HERO-03): width axis reacts to pointer proximity.
     Fine pointers only; disabled for reduced motion. Static on touch. */
  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    if (!window.matchMedia(FINE).matches) return
    if (window.matchMedia(REDUCED).matches) return

    const chars = Array.from(root.querySelectorAll<HTMLElement>('.kin-ch'))
    if (chars.length === 0) return

    // After the load animation settles, hand control to the pointer
    let active = false
    const timer = window.setTimeout(() => {
      active = true
    }, 1400)

    let frame = 0
    const onMove = (event: PointerEvent) => {
      if (!active || frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        for (const ch of chars) {
          const r = ch.getBoundingClientRect()
          const d = Math.hypot(event.clientX - (r.left + r.width / 2), event.clientY - (r.top + r.height / 2))
          const wdth = (125 - Math.min(d / 6, 40)).toFixed(0)
          ch.style.fontVariationSettings = `"wdth" ${wdth}`
        }
      })
    }

    const onLeave = () => {
      for (const ch of chars) ch.style.fontVariationSettings = '"wdth" 100'
    }

    root.addEventListener('pointermove', onMove)
    root.addEventListener('pointerleave', onLeave)
    return () => {
      window.clearTimeout(timer)
      cancelAnimationFrame(frame)
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  const charSpans = (line: string, lineIndex: number) => {
    const chars = [...line]
    return chars.map((c, i) => (
      <span key={`${lineIndex}-${i}`} className="kin-ch">
        {c}
      </span>
    ))
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-labelledby="home-title"
      className="border-b border-ink bg-paper text-ink"
      style={{ paddingTop: 'clamp(28px,5vw,64px)', paddingBottom: 0 }}
    >
      <div className="shell">
        <div className="g">
          {/* Meta bar */}
          <div className="mono col-span-full flex flex-wrap items-center justify-between gap-3 border-b border-ink pb-3.5">
            <span className="flex items-center">
              <span className="mr-2 inline-block h-[9px] w-[9px] bg-signal" aria-hidden />
              {profile.location ? profile.location[lang] : 'Indonesia'}
            </span>
            <span className="text-mute">Design &times; Code / 2026</span>
          </div>

          {/* Giant kinetic name */}
          <h1 id="home-title" aria-label={profile.name} className="kin-h1 col-span-full">
            {lines.map((line, i) => (
              <span key={i} className="kin-ln" aria-hidden="true">
                {charSpans(line, i)}
                {i === lines.length - 1 && (
                  <span className="kin-ch text-signal" style={{ fontVariationSettings: '"wdth" 100' }}>
                    .
                  </span>
                )}
              </span>
            ))}
          </h1>

          {/* Lead column */}
          <div className="col-span-full max-[820px]:col-span-full min-[821px]:col-start-1 min-[821px]:col-end-8" style={{ padding: 'clamp(22px,4vw,56px) 0' }}>
            <p className="role-line">{profile.role[lang]}</p>
            <p className="mb-[26px] max-w-[48ch] text-[1.06rem] leading-relaxed">{profile.intro[lang]}</p>

            <div className="flex flex-wrap gap-2.5">
              <a href="#projects" className="btn btn-fill" data-cur="Go">
                {t('viewWork', lang)}
                <ArrowDown size={15} aria-hidden />
              </a>
              {hasCv && (
                <a
                  href={profile.links.cv ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  data-cur="PDF"
                >
                  {t('viewCv', lang)}
                </a>
              )}
            </div>

            <div className="mono mt-4 flex flex-wrap gap-[18px]">
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="link-underline" data-cur="Open">
                {t('github', lang)}
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline" data-cur="Open">
                {t('linkedin', lang)}
              </a>
              <a
                href={profile.links.instagram ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
                data-cur="Open"
                aria-disabled={profile.links.instagram === null}
              >
                {t('instagram', lang)}
              </a>
            </div>
          </div>

          {/* Portrait — 3:4, hairline border, Signal Red corner */}
          <div className="col-span-full pt-[clamp(22px,4vw,56px)] max-[820px]:pt-0 min-[821px]:col-start-9 min-[821px]:col-end-13">
            <figure className="group relative aspect-[3/4] max-[820px]:aspect-[4/3] border border-ink transition-transform duration-500 ease-out hover:rotate-[1.2deg]">
              <img
                src={portraitSrc}
                alt={t('portraitAlt', lang)}
                width={700}
                height={933}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover object-center grayscale contrast-[1.04]"
                onError={(event) => {
                  const img = event.currentTarget
                  if (!img.src.includes('portrait.png')) {
                    img.src = './images/profile/portrait.png'
                  }
                }}
              />
              <span
                aria-hidden
                className="absolute -bottom-px -right-px block aspect-square w-[28%] bg-signal"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
