import type { CreativeWork, Lang } from '../../../types'

interface PosterExhibitionProps {
  works: CreativeWork[]
  lang: Lang
  onOpenLightbox: (index: number) => void
}

export function PosterExhibition({ works, lang, onOpenLightbox }: PosterExhibitionProps) {
  // Horizon (16:9), Orbit (16:9), Palette Grid (5:4)
  const pairPosters = works.filter((w) => w.aspect === '16/9')
  const secondaryPoster = works.find((w) => w.aspect === '5/4') ?? works[2]

  return (
    <div className="space-y-12">
      {/* Editorial Header / Intro */}
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between border-b border-line-dark/60 pb-6">
        <div>
          <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-electric">
            {lang === 'en' ? 'Visual Pair & Secondary Composition' : 'Pasangan Visual & Komposisi Sekunder'}
          </span>
          <h3 className="mt-1 font-display-bold text-2xl font-bold text-paper md:text-3xl">
            {lang === 'en' ? 'Experimental Editorial Poster Wall' : 'Dinding Poster Editorial Eksperimental'}
          </h3>
        </div>
        <span className="font-body text-xs tabular-nums text-paper/40">
          03 {lang === 'en' ? 'Artworks' : 'Karya'} · 16:9 & 5:4
        </span>
      </div>

      {/* Asymmetric Composition Wall */}
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        {/* Visual Pair: Two 16:9 posters side by side */}
        <div className="space-y-8 lg:col-span-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {pairPosters.map((poster, idx) => {
              const globalIdx = works.findIndex((w) => w.id === poster.id)
              return (
                <button
                  key={poster.id}
                  type="button"
                  onClick={() => onOpenLightbox(globalIdx >= 0 ? globalIdx : idx)}
                  className="group relative block w-full overflow-hidden rounded-xl border border-line-dark bg-midnight text-left transition-all duration-500 hover:border-electric hover:shadow-2xl hover:shadow-electric/10"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden bg-midnight-deep">
                    <img
                      src={poster.image}
                      alt={poster.title[lang]}
                      className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <span className="font-display-bold text-lg font-bold text-paper group-hover:text-electric transition-colors">
                        {poster.title[lang]}
                      </span>
                      <span className="font-body text-[0.7rem] uppercase tracking-wider text-mint font-semibold">
                        16:9
                      </span>
                    </div>
                    <p className="mt-2 font-body text-xs leading-relaxed text-paper/60 line-clamp-2">
                      {poster.caption?.[lang]}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="rounded-xl border border-line-dark/50 bg-midnight/50 p-5">
            <p className="font-body text-xs leading-relaxed text-paper/60">
              {lang === 'en'
                ? 'Complementary dual landscape series engineered for widescreen and architectural installations.'
                : 'Seri lanskap ganda pelengkap yang dirancang untuk layar lebar dan instalasi arsitektural.'}
            </p>
          </div>
        </div>

        {/* Secondary Asymmetrical Composition: 5:4 Poster */}
        {secondaryPoster && (
          <div className="lg:col-span-4 lg:mt-6">
            <button
              type="button"
              onClick={() => {
                const globalIdx = works.findIndex((w) => w.id === secondaryPoster.id)
                onOpenLightbox(globalIdx >= 0 ? globalIdx : 2)
              }}
              className="group relative block w-full overflow-hidden rounded-xl border border-line-dark bg-midnight text-left transition-all duration-500 hover:border-mint hover:shadow-2xl hover:shadow-mint/10"
            >
              <div className="aspect-[5/4] w-full overflow-hidden bg-midnight-deep">
                <img
                  src={secondaryPoster.image}
                  alt={secondaryPoster.title[lang]}
                  className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="font-display-bold text-lg font-bold text-paper group-hover:text-mint transition-colors">
                    {secondaryPoster.title[lang]}
                  </span>
                  <span className="font-body text-[0.7rem] uppercase tracking-wider text-mint font-semibold">
                    5:4
                  </span>
                </div>
                <p className="mt-2 font-body text-xs leading-relaxed text-paper/60">
                  {secondaryPoster.caption?.[lang]}
                </p>
                {secondaryPoster.software && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {secondaryPoster.software.map((sw: string) => (
                      <span key={sw} className="rounded border border-paper/10 px-2 py-0.5 font-body text-[0.65rem] text-paper/50">
                        {sw}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
