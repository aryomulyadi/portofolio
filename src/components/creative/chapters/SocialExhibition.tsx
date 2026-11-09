import { Layers, Monitor, Target, Wrench } from 'lucide-react'
import type { CreativeWork, Lang } from '../../../types'

interface SocialExhibitionProps {
  works: CreativeWork[]
  lang: Lang
  onOpenLightbox: (index: number) => void
}

export function SocialExhibition({ works, lang, onOpenLightbox }: SocialExhibitionProps) {
  const work = works[0]
  if (!work) return null

  return (
    <div className="overflow-hidden rounded-2xl border border-line-dark bg-midnight">
      <div className="grid lg:grid-cols-12 lg:items-center">
        {/* Left: One large 4:5 artwork */}
        <div className="p-6 md:p-10 lg:col-span-6 lg:border-r lg:border-line-dark">
          <button
            type="button"
            onClick={() => onOpenLightbox(0)}
            className="group relative block w-full overflow-hidden rounded-xl border border-line-dark/60 bg-midnight-deep text-left transition-all duration-500 hover:border-electric"
          >
            <div className="aspect-[4/5] w-full overflow-hidden">
              <img
                src={work.image}
                alt={work.title[lang]}
                className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="absolute bottom-3 right-3 rounded-md bg-midnight/80 px-2.5 py-1 backdrop-blur-sm">
              <span className="font-body text-[0.65rem] font-bold uppercase tracking-wider text-paper/70">
                {lang === 'en' ? 'Click to Enlarge' : 'Klik untuk Memperbesar'}
              </span>
            </div>
          </button>
        </div>

        {/* Right: Project information panel */}
        <div className="space-y-6 p-6 md:p-10 lg:col-span-6">
          <div>
            <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-mint">
              {lang === 'en' ? 'Campaign Showcase' : 'Sorotan Kampanye'} · {work.year}
            </span>
            <h3 className="mt-2 font-display-bold text-3xl font-bold tracking-tight text-paper md:text-4xl">
              {work.title[lang]}
            </h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-paper/70">
              {work.caption?.[lang]}
            </p>
          </div>

          <div className="divide-y divide-line-dark/60 border-y border-line-dark/60">
            {/* Platform */}
            <div className="flex items-start gap-4 py-3.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-electric/10 text-electric">
                <Monitor size={16} />
              </div>
              <div>
                <span className="block font-body text-[0.7rem] font-bold uppercase tracking-wider text-paper/40">
                  {lang === 'en' ? 'Platform' : 'Platform'}
                </span>
                <span className="font-body text-sm font-medium text-paper">
                  {work.platform ?? 'Instagram, TikTok, Mobile Feed'}
                </span>
              </div>
            </div>

            {/* Objective */}
            <div className="flex items-start gap-4 py-3.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-mint/10 text-mint">
                <Target size={16} />
              </div>
              <div>
                <span className="block font-body text-[0.7rem] font-bold uppercase tracking-wider text-paper/40">
                  {lang === 'en' ? 'Objective' : 'Tujuan Kampanye'}
                </span>
                <span className="font-body text-sm leading-relaxed text-paper/80">
                  {work.objective?.[lang] ??
                    (lang === 'en'
                      ? 'High-retention visual identity for short vertical feed storytelling.'
                      : 'Identitas visual berdaya ingat tinggi untuk format vertikal media sosial.')}
                </span>
              </div>
            </div>

            {/* Creative Direction */}
            <div className="flex items-start gap-4 py-3.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-paper/10 text-paper">
                <Layers size={16} />
              </div>
              <div>
                <span className="block font-body text-[0.7rem] font-bold uppercase tracking-wider text-paper/40">
                  {lang === 'en' ? 'Creative Direction' : 'Arahan Kreatif'}
                </span>
                <span className="font-body text-sm leading-relaxed text-paper/80">
                  {work.creativeDirection?.[lang] ??
                    (lang === 'en'
                      ? 'Kinetic typography and concentric pulse geometry on deep void backgrounds.'
                      : 'Tipografi kinetik dan geometri konsentris pada latar belakang gelap.')}
                </span>
              </div>
            </div>

            {/* Software */}
            {work.software && (
              <div className="flex items-start gap-4 py-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-electric/10 text-electric">
                  <Wrench size={16} />
                </div>
                <div>
                  <span className="block font-body text-[0.7rem] font-bold uppercase tracking-wider text-paper/40">
                    {lang === 'en' ? 'Software & Tools' : 'Perangkat Lunak'}
                  </span>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {work.software.map((sw: string) => (
                      <span
                        key={sw}
                        className="rounded border border-paper/15 bg-midnight-deep px-2.5 py-1 font-body text-xs font-semibold text-paper/80"
                      >
                        {sw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
