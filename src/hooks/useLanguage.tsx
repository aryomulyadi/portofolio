/* eslint-disable react-refresh/only-export-components -- provider + hook belong together */
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { flushSync } from 'react-dom'
import type { Lang } from '../types'

const STORAGE_KEY = 'portfolio-lang'

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readStoredLang(): Lang {
  if (typeof window === 'undefined') return 'en'
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'id') return stored
  } catch {
    // localStorage unavailable — fall through to default
  }
  return 'en'
}

/** QA: language switch uses View Transition 300ms crossfade when available. */
function withViewTransition(update: () => void) {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown }
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (typeof doc.startViewTransition === 'function' && !reduced) {
    doc.startViewTransition(() => flushSync(update))
  } else {
    update()
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    withViewTransition(() => {
      setLangState(next)
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // ignore storage failures
      }
    })
  }, [])

  const toggle = useCallback(() => {
    const next: Lang = lang === 'en' ? 'id' : 'en'
    withViewTransition(() => {
      setLangState(next)
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // ignore storage failures
      }
    })
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
