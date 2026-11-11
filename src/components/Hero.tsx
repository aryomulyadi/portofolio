import { useEffect, useRef, useState } from 'react'
import { ArrowDown } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { t } from '../data/translations'
import { profile } from '../data/profile'
import { HeroHalftone } from './hero/HeroHalftone'
import { FlipCard } from './hero/FlipCard'

const REDUCED = '(prefers-reduced-motion: reduce)'
const FINE = '(hover: hover) and (pointer: fine)'

const clockFormat = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZone: 'Asia/Jakarta',
  hour12: false,
})

export function Hero() {
  const { lang } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [clock, setClock] = useState(() => `${clockFormat.format(new Date())} WIB`)

  useEffect(() => {
    const id = window.setInterval(() => {
      setClock(`${clockFormat.format(new Date())} WIB`)
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  const hasCv = profile.links.cv !== null
  const lines = profile.name.split(' ')

  /* Kinetic typography (FR-HERO-03): width axis reacts to pointer proximity,
     serif line reacts on weight axis. Fine pointers only. */
  useEffect(() => {
    const root = sectionRef.current
    if (!root) return
    if (!window.matchMedia(FINE).matches) return
    if (window.matchMedia(REDUCED).matches) return

    const chars = Array.from(root.querySelectorAll<HTMLElement>('.kin-ch'))
    if (chars.length === 0) return

    const isSerif = (ch: HTMLElement) =>
      ch.parentElement?.classList.contains('sf') ?? false

    // After the load animation settles, hand control to the pointer
    let active = false
    const timer = window.setTimeout(() => {
      for (const ch of chars) ch.style.animation = 'none'
      active = true
    }, 1400)

    let frame = 0
    const onMove = (event: PointerEvent) => {
      if (!active || frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        for (const ch of chars) {
          const r = ch.getBoundingClientRect()
          const d = Math.hypot(
            event.clientX - (r.left + r.width / 2),
            event.clientY - (r.top + r.height / 2),
          )
          if (isSerif(ch)) {
            const wght = (700 + Math.max(0, 1 - d / 240) * 200).toFixed(0)
            ch.style.fontVariationSettings = `"wght" ${wght}`
          } else {
            const wdth = (125 - Math.min(d / 6, 40)).toFixed(0)
            ch.style.fontVariationSettings = `"wdth" ${wdth}`
          }
        }
      })
    }

    const onLeave = () => {
      for (const ch of chars) {
        ch.style.fontVariationSettings = isSerif(ch)
          ? '"wght" 800'
          : '"wdth" 100'
      }
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
      className="relative overflow-hidden border-b border-ink bg-paper text-ink"
      style={{ paddingTop: 'clamp(28px,5vw,64px)', paddingBottom: 0 }}
    >
      <HeroHalftone />

      <div className="shell relative z-[1]">
        <div className="g">
          {/* Meta bar — left cluster, right side reserved for the flip card */}
          <div className="mono col-span-full flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-ink pb-3.5">
            <span className="flex items-center">
              <span className="mr-2 inline-block h-[9px] w-[9px] bg-signal" aria-hidden />
              {t('avail', lang)}
            </span>
            <span>{profile.location ? profile.location[lang] : 'Indonesia'}</span>
            <span className="text-mute">Design &times; Code / 2026</span>
          </div>

          {/* Giant kinetic name — line 2 is the serif accent */}
          <h1 id="home-title" aria-label={profile.name} className="kin-h1 col-span-full">
            {lines.map((line, i) => (
              <span
                key={i}
                className={`kin-ln${i === 1 ? ' sf' : ''}`}
                aria-hidden="true"
              >
                {charSpans(line, i)}
                {i === lines.length - 1 && (
                  <span
                    className="kin-ch text-signal"
                    style={{ fontVariationSettings: '"wdth" 100' }}
                  >
                    .
                  </span>
                )}
              </span>
            ))}
          </h1>

          {/* Author flip card — absolute top-right on desktop, in-flow on mobile */}
          <FlipCard />

          {/* Lead column */}
          <div className="hero-lead">
            <p className="role-line">{profile.role[lang]}</p>
            <p className="lead hero-intro">{profile.intro[lang]}</p>

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

          {/* Now panel — live clock, status, base, focus */}
          <aside className="now" aria-label="Now">
            <dl>
              <div>
                <dt className="mono">{t('nowL', lang)}</dt>
                <dd className="now-clock">{clock}</dd>
              </div>
              <div>
                <dt className="mono">{t('statusLabel', lang)}</dt>
                <dd>
                  <span className="mr-2 inline-block h-[9px] w-[9px] bg-signal align-middle" aria-hidden />
                  {t('avail', lang)}
                </dd>
              </div>
              <div>
                <dt className="mono">{t('factBasedLabel', lang)}</dt>
                <dd>
                  {profile.location ? profile.location[lang] : 'Indonesia'} &middot; UTC+7
                </dd>
              </div>
              <div>
                <dt className="mono">{t('factFocusLabel', lang)}</dt>
                <dd>{t('factFocusValue', lang)}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  )
}
