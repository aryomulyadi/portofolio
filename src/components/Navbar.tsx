import { useEffect, useRef, useState } from 'react'
import { Menu, X, Languages, Sun, Moon } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { useActiveSection } from '../hooks/useInteractions'
import { usePrefs } from '../hooks/usePrefs'
import { navLinks, t } from '../data/translations'
import { getVisibleSectionIds } from '../data/sections'
import type { SectionId } from '../types'

export function Navbar() {
  const { lang, toggle } = useLanguage()
  const { isDark, toggleTheme } = usePrefs()
  const visibleIds = getVisibleSectionIds()
  const active = useActiveSection(visibleIds)
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  /* v3: scroll progress bar under the header */
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const visibleSet = new Set(visibleIds)
  const links = navLinks.filter((link) => visibleSet.has(link.href.slice(1) as SectionId))

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const otherLang = lang === 'en' ? 'id' : 'en'

  return (
    <>
      <header className="sticky top-0 z-[60] h-[60px] border-b border-ink bg-paper text-ink">
        <i className="nav-sp" style={{ width: `${progress}%` }} aria-hidden />
        <nav
          aria-label="Primary"
          className="shell flex h-full items-center justify-between gap-4"
        >
          <a
            href="#home"
            aria-label="Rifqi Aryo Mulyadi, home"
            className="font-display text-[1.2rem] font-black tracking-tight text-ink no-underline"
            style={{ fontStretch: '125%' }}
            onClick={() => setOpen(false)}
          >
            RAM<i className="not-italic text-signal">.</i>
          </a>

          <div className="hidden items-center gap-[clamp(14px,2.4vw,34px)] min-[821px]:flex">
            {links.map((link) => {
              const id = link.href.slice(1)
              const isActive = active === id
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className="mono relative py-1.5 text-ink no-underline after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-signal after:transition-transform after:duration-300 hover:after:scale-x-100 aria-current:after:scale-x-100"
                >
                  {link.label[lang]}
                </a>
              )
            })}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleTheme}
              className="mono inline-flex min-h-9 items-center border border-ink px-2.5 py-1.5 text-ink transition-colors hover:bg-ink hover:text-paper"
              aria-label={t('themeToggle', lang)}
              aria-pressed={isDark}
            >
              {isDark ? <Sun size={14} aria-hidden /> : <Moon size={14} aria-hidden />}
            </button>

            <button
              type="button"
              onClick={toggle}
              className="mono inline-flex min-h-9 items-center gap-1.5 border border-ink px-3 py-1.5 text-ink transition-colors hover:bg-ink hover:text-paper"
              aria-label={lang === 'en' ? t('switchToId', lang) : t('switchToEn', lang)}
            >
              <Languages aria-hidden size={14} />
              <span className="tracking-wide">{lang.toUpperCase()}</span>
              <span aria-hidden className="opacity-40">
                /
              </span>
              <span className="opacity-40">{otherLang.toUpperCase()}</span>
            </button>

            <button
              ref={menuButtonRef}
              type="button"
              className="mono inline-flex min-h-9 items-center border border-ink px-3 py-1.5 text-ink transition-colors hover:bg-ink hover:text-paper min-[821px]:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t('menuClose', lang) : t('menuOpen', lang)}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={16} aria-hidden /> : <Menu size={16} aria-hidden />}
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          tabIndex={-1}
          className="fixed inset-x-0 bottom-0 top-[60px] z-50 overflow-y-auto overscroll-contain bg-paper px-[clamp(16px,3.2vw,44px)] pt-6 pb-10 text-ink outline-none min-[821px]:hidden"
        >
          <ul className="flex flex-col">
            {links.map((link) => {
              const id = link.href.slice(1)
              const isActive = active === id
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => setOpen(false)}
                    className="block border-b border-ink py-2.5 font-display text-[clamp(1.8rem,9vw,2.4rem)] font-black uppercase leading-[1.3] tracking-tight text-ink no-underline transition-colors hover:text-signal"
                    style={{ fontStretch: '112%' }}
                  >
                    {link.label[lang]}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  )
}
