import { useEffect, useRef, useState } from 'react'
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import { t } from '../../data/translations'
import { profile } from '../../data/profile'

const FINE = '(hover: hover) and (pointer: fine)'
const REDUCED = '(prefers-reduced-motion: reduce)'

/**
 * v3 author flip card: front = mini trading card with portrait,
 * back = Signal Red links panel. Magnetic tilt on fine pointers.
 */
export function FlipCard() {
  const { lang } = useLanguage()
  const [flipped, setFlipped] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef({ x: 0, y: 0 })

  const hasCv = profile.links.cv !== null

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    if (!window.matchMedia(FINE).matches) return
    if (window.matchMedia(REDUCED).matches) return

    const card = cardRef.current
    if (!card) return

    const apply = (rx: number, ry: number) => {
      const base = flipped ? 180 : 0
      card.style.transform = `rotateX(${rx}deg) rotateY(${base + ry}deg)`
    }

    const onMove = (event: ReactPointerEvent<HTMLDivElement> | PointerEvent) => {
      const rect = wrap.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      tiltRef.current = { x, y }
      apply(-y * 16, x * 16)
    }

    const onLeave = () => {
      tiltRef.current = { x: 0, y: 0 }
      apply(0, 0)
    }

    wrap.addEventListener('pointermove', onMove, { passive: true })
    wrap.addEventListener('pointerleave', onLeave)
    return () => {
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
    }
  }, [flipped])

  /* Keep the flip transform in sync when tilt handlers are absent */
  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    if (window.matchMedia(REDUCED).matches) {
      card.style.transform = flipped ? 'rotateY(180deg)' : ''
      return
    }
    const { x, y } = tiltRef.current
    const base = flipped ? 180 : 0
    card.style.transform = `rotateX(${(-y * 16).toFixed(2)}deg) rotateY(${(base + x * 16).toFixed(2)}deg)`
  }, [flipped])

  const onCardClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('a')) return
    setFlipped((v) => !v)
  }

  const links = [
    { label: 'GitHub', href: profile.links.github },
    { label: 'LinkedIn', href: profile.links.linkedin },
    ...(profile.links.instagram
      ? [{ label: 'Instagram', href: profile.links.instagram }]
      : []),
    ...(hasCv ? [{ label: t('viewCv', lang), href: profile.links.cv ?? '#' }] : []),
  ]

  return (
    <div ref={wrapRef} className="pcw">
      <div
        ref={cardRef}
        className="pc"
        data-cur="Flip"
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={t('flip', lang)}
        onClick={onCardClick}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setFlipped((v) => !v)
          }
        }}
      >
        {/* Front — author card */}
        <div className="pcf pcfront" aria-hidden={flipped}>
          <div className="pci">
            <header className="pci-head">
              <span className="pcn">Rifqi Aryo Mulyadi</span>
              <span className="mono pcno">NO.000</span>
            </header>
            <span className="pcc mono">
              <i aria-hidden />
              {profile.role[lang]}
            </span>
            <div className="pcart">
              <img
                src={profile.portrait ?? './images/profile/portrait.png'}
                alt=""
                loading="lazy"
                decoding="async"
                onError={(event) => {
                  const img = event.currentTarget
                  if (!img.src.includes('portrait.png')) {
                    img.src = './images/profile/portrait.png'
                  }
                }}
              />
            </div>
            <dl className="pcm">
              <dt>build()</dt>
              <dd>interactive web</dd>
              <dt>ship()</dt>
              <dd>AI platforms</dd>
              <dt>based</dt>
              <dd>{profile.location ? profile.location[lang] : 'Indonesia'}</dd>
            </dl>
            <div className="pcfoot mono">
              <span>Author card</span>
              <span>RAM &copy;26</span>
            </div>
          </div>
        </div>

        {/* Back — red links panel */}
        <div className="pcf pcback" aria-hidden={!flipped} inert={!flipped}>
          <div className="pbi">
            <div className="mono">RAM &copy;26</div>
            <div className="pbm">RAM.</div>
            <div>
              <ul>
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label} <span aria-hidden>&nearr;</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mono pbavail">{t('avail', lang)}</p>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="pcb mono"
        aria-pressed={flipped}
        data-cur="Flip"
        onClick={() => setFlipped((v) => !v)}
      >
        {t('flip', lang)}
      </button>
    </div>
  )
}
