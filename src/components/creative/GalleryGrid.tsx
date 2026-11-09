import { ArrowUpRight } from 'lucide-react'
import type { CreativeWork, Lang } from '../../types'

interface GalleryGridProps {
  items: CreativeWork[]
  lang: Lang
  onOpen: (index: number) => void
  openLabel: string
}

/* Editorial asymmetric pattern — 8-cycle, rows total 12 at lg */
const spanClasses = [
  'sm:col-span-2 lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-5',
  'sm:col-span-2 lg:col-span-7',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-4',
  'sm:col-span-2 lg:col-span-12',
]

const aspectClasses = [
  'aspect-[16/10]',
  'aspect-[4/5]',
  'aspect-[4/5]',
  'aspect-[16/10]',
  'aspect-square',
  'aspect-[3/4]',
  'aspect-[16/10]',
  'aspect-[21/9]',
]

export function GalleryGrid({ items, lang, onOpen, openLabel }: GalleryGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12">
      {items.map((work, index) => (
        <li
          key={work.id}
          className={`reveal ${spanClasses[index % spanClasses.length]}`}
          style={{ transitionDelay: `${index * 50}ms` }}
        >
          <button
            type="button"
            onClick={() => onOpen(index)}
            data-cursor="view"
            className="gallery-tile group block w-full text-left"
            aria-label={`${work.title[lang]} — ${openLabel}`}
          >
            <span
              className={`relative block overflow-hidden border border-line-dark/60 bg-midnight ${aspectClasses[index % aspectClasses.length]}`}
            >
              <img
                src={work.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-midnight-deep/85 via-midnight-deep/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
              />
              <span
                aria-hidden
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-paper/40 bg-midnight-deep/60 text-paper opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <ArrowUpRight size={16} />
              </span>
            </span>
            <span className="mt-3 flex items-baseline justify-between gap-3">
              <span className="flex min-w-0 items-baseline gap-3">
                <span className="font-body text-xs font-bold tabular-nums text-electric/70">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="truncate font-display-bold text-sm font-medium text-paper transition-colors group-hover:text-electric">
                  {work.title[lang]}
                </span>
              </span>
              <span className="shrink-0 font-body text-[0.68rem] uppercase tracking-wider text-paper/45">
                {work.categoryLabel[lang]}
                {work.year ? ` · ${work.year}` : ''}
              </span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}
