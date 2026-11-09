import { Maximize2 } from 'lucide-react'
import type { CreativeWork, Lang } from '../../../types'

interface BannerExhibitionProps {
  works: CreativeWork[]
  lang: Lang
  onOpenLightbox: (index: number) => void
}

export function BannerExhibition({ works, lang, onOpenLightbox }: BannerExhibitionProps) {
  const work = works[0]
  if (!work) return null

  return (
    <div className="space-y-8">
      {/* Spacious Presentation Stage with atmospheric architectural lighting */}
      <div className="relative overflow-hidden rounded-2xl border border-line-dark bg-gradient-to-b from-midnight via-midnight-deep to-midnight p-6 sm:p-10 md:p-16">
        {/* Subtle geometric stage aura without blurry noise */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-electric/10 via-transparent to-transparent opacity-60" />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center justify-center">
          <button
            type="button"
            onClick={() => onOpenLightbox(0)}
            className="group relative block w-full max-w-md overflow-hidden rounded-2xl border border-line-dark bg-midnight-deep shadow-[0_30px_90px_rgba(0,0,0,0.8)] transition-all duration-700 hover:border-electric hover:shadow-electric/20"
          >
            <div className="aspect-[4/5] w-full overflow-hidden bg-midnight">
              <img
                src={work.image}
                alt={work.title[lang]}
                className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-midnight/30 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
              <span className="flex items-center gap-2 rounded-full border border-paper/30 bg-midnight-deep/80 px-4 py-2 font-body text-xs font-bold text-paper">
                <Maximize2 size={14} />
                {lang === 'en' ? 'View Fullscreen' : 'Lihat Layar Penuh'}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Separate Editorial Metadata Panel */}
      <div className="grid gap-6 rounded-2xl border border-line-dark/70 bg-midnight p-6 md:grid-cols-12 md:p-8">
        <div className="md:col-span-5 space-y-2 border-b border-line-dark/60 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-6">
          <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-mint">
            {lang === 'en' ? 'Large-Format Exhibition' : 'Pameran Format Besar'}
          </span>
          <h4 className="font-display-bold text-2xl font-bold text-paper">
            {work.title[lang]}
          </h4>
          <span className="font-body text-xs font-medium text-paper/40">
            {work.year} · Ratio 4:5 Large Banner
          </span>
        </div>

        <div className="md:col-span-7 space-y-4">
          <p className="font-body text-sm leading-relaxed text-paper/80">
            {work.caption?.[lang]}
          </p>
          {work.process && (
            <div className="border-t border-line-dark/40 pt-3">
              <span className="font-body text-[0.7rem] font-bold uppercase tracking-wider text-electric">
                {lang === 'en' ? 'Curatorial Note' : 'Catatan Kuratorial'}
              </span>
              <p className="mt-1 font-body text-xs leading-relaxed text-paper/60">
                {work.process[lang]}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
