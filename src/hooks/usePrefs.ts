import { useSyncExternalStore } from 'react'

const EVENT = 'portfolio-prefs'
const FINE_DARK = '(prefers-color-scheme: dark)'

function emit() {
  window.dispatchEvent(new Event(EVENT))
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback)
  const media = window.matchMedia(FINE_DARK)
  media.addEventListener('change', callback)
  return () => {
    window.removeEventListener(EVENT, callback)
    media.removeEventListener('change', callback)
  }
}

function getSnapshot(): string {
  return document.documentElement.getAttribute('data-theme') ?? ''
}

export type ThemeChoice = 'light' | 'dark'

export function usePrefs() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  const systemDark = window.matchMedia(FINE_DARK).matches
  const isDark = theme === 'dark' || (!theme && systemDark)

  return {
    isDark,
    setTheme(next: ThemeChoice) {
      document.documentElement.setAttribute('data-theme', next)
      try {
        localStorage.setItem('portfolio-theme', next)
      } catch {
        /* private mode */
      }
      emit()
    },
    toggleTheme() {
      const next: ThemeChoice = isDark ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next)
      try {
        localStorage.setItem('portfolio-theme', next)
      } catch {
        /* private mode */
      }
      emit()
    },
  }
}
