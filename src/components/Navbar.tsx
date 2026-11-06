import { useEffect, useRef, useState } from 'react'
import { Menu, X, Languages } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { useActiveSection } from '../hooks/useInteractions'
import { navLinks, t } from '../data/translations'
import { profile } from '../data/profile'
import { getVisibleSectionIds } from '../data/sections'
import type { SectionId } from '../types'

export function Navbar() {
  const { lang, toggle } = useLanguage()
  const visibleIds = getVisibleSectionIds()
  const active = useActiveSection(visibleIds)
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const visibleSet = new Set(visibleIds)
  const links = navLinks.filter((link) => visibleSet.has(link.href.slice(1) as SectionId))

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line-dark/60 bg-midnight/92 text-paper backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8"
      >
        <a
          href="#home"
          className="font-display text-sm font-bold tracking-tight text-paper transition-colors hover:text-electric"
          onClick={() => setOpen(false)}
        >
           <span className="text-mint" aria-hidden>
             ✦
           </span>{' '}
          {profile.name}
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const id = link.href.slice(1)
            const isActive = active === id
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'true' : undefined}
                className={`rounded-full px-3.5 py-1.5 text-[0.8rem] font-medium transition-colors ${
                  isActive
                    ? 'bg-electric text-midnight font-bold'
                    : 'text-paper/70 hover:bg-paper/10 hover:text-paper'
                }`}
              >
                {link.label[lang]}
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-electric/30 px-3 text-xs font-semibold text-electric transition-colors hover:border-electric hover:bg-electric/10"
            aria-label={lang === 'en' ? t('switchToId', lang) : t('switchToEn', lang)}
          >
            <Languages aria-hidden size={14} />
            <span className="tracking-wide">{lang.toUpperCase()}</span>
            <span aria-hidden className="text-paper/40">
              /
            </span>
            <span className="text-paper/40">{otherLang.toUpperCase()}</span>
          </button>

          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-paper/25 text-paper transition-colors hover:border-paper lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('menuClose', lang) : t('menuOpen', lang)}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line-dark bg-midnight px-5 pt-6 pb-10 text-paper lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => {
              const id = link.href.slice(1)
              const isActive = active === id
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between border-b border-line-dark py-4 font-display text-lg font-medium transition-colors ${
                      isActive ? 'text-electric font-bold' : 'text-paper hover:text-electric'
                    }`}
                  >
                    {link.label[lang]}
                    <span
                      className="font-body text-xs font-normal text-paper/35"
                      aria-hidden
                    >
                      {link.href}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </header>
  )
}
