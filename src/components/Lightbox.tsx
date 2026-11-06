import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEscape, useFocusTrap, useLockBodyScroll } from '../hooks/useInteractions'
import type { CreativeWork, Lang } from '../types'

interface LightboxProps {
  items: CreativeWork[]
  index: number
  lang: Lang
  labels: {
    close: string
    next: string
    prev: string
  }
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({ items, index, lang, labels, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const open = index >= 0 && index < items.length
  const item = open ? items[index] : null

  useLockBodyScroll(open)
  useEscape(onClose, open)
  useFocusTrap(dialogRef, open)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') onNavigate((index + 1) % items.length)
      if (event.key === 'ArrowLeft') onNavigate((index - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, index, items.length, onNavigate])

  if (!open || !item) return null

  const hasNav = items.length > 1

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/92 p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={labels.close}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="relative flex max-h-full w-full max-w-5xl flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <div>
            <p className="font-display text-base font-medium text-paper">{item.title[lang]}</p>
            <p className="font-body text-xs text-paper/50">
              {item.categoryLabel[lang]}
              {item.year ? ` · ${item.year}` : ''}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={labels.close}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/25 text-paper transition-colors hover:border-paper hover:bg-paper/10"
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        <div className="relative min-h-0 flex-1">
          <img
            src={item.image}
            alt={item.caption?.[lang] ?? item.title[lang]}
            className="mx-auto max-h-[70vh] w-auto max-w-full object-contain"
          />
        </div>

        {item.caption && (
          <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-paper/70">
            {item.caption[lang]}
          </p>
        )}

        {hasNav && (
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate((index - 1 + items.length) % items.length)}
              aria-label={labels.prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/25 text-paper transition-colors hover:border-paper hover:bg-paper/10"
            >
              <ChevronLeft size={18} aria-hidden />
            </button>
            <span className="font-body text-xs tabular-nums text-paper/50" aria-live="polite">
              {index + 1} / {items.length}
            </span>
            <button
              type="button"
              onClick={() => onNavigate((index + 1) % items.length)}
              aria-label={labels.next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/25 text-paper transition-colors hover:border-paper hover:bg-paper/10"
            >
              <ChevronRight size={18} aria-hidden />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
