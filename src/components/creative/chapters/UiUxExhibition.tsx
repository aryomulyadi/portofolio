import { useState } from 'react'
import { ArrowUpRight, BookOpen } from 'lucide-react'
import type { CreativeWork, Lang } from '../../../types'
import { CaseStudyModal } from './CaseStudyModal'

interface UiUxExhibitionProps {
  works: CreativeWork[]
  lang: Lang
}

export function UiUxExhibition({ works, lang }: UiUxExhibitionProps) {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CreativeWork | null>(null)

  return (
    <div className="space-y-10">
      {/* Intro Bar */}
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between border-b border-line-dark/60 pb-6">
        <div>
          <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-electric">
            {lang === 'en' ? 'Product Exhibition' : 'Pameran Produk Digital'}
          </span>
          <h3 className="mt-1 font-display-bold text-2xl font-bold text-paper md:text-3xl">
            {lang === 'en' ? 'Digital Interface Systems & Case Studies' : 'Sistem Antarmuka Digital & Studi Kasus'}
          </h3>
        </div>
        <span className="font-body text-xs tabular-nums text-paper/40">
          02 {lang === 'en' ? 'Projects · 16:9 Aspect' : 'Proyek · Rasio 16:9'}
        </span>
      </div>

      {/* Two 16:9 Project Previews Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {works.map((project) => (
          <div
            key={project.id}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line-dark bg-midnight transition-all duration-500 hover:border-electric hover:shadow-2xl hover:shadow-electric/10"
          >
            <div>
              <div className="aspect-[16/9] w-full overflow-hidden bg-midnight-deep border-b border-line-dark">
                <img
                  src={project.image}
                  alt={project.title[lang]}
                  className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs font-bold uppercase tracking-wider text-mint">
                    {project.categoryLabel[lang]} · {project.year}
                  </span>
                  <span className="font-body text-[0.7rem] uppercase tracking-wider text-paper/40 font-semibold">
                    16:9
                  </span>
                </div>
                <h4 className="font-display-bold text-xl font-bold text-paper transition-colors group-hover:text-electric">
                  {project.title[lang]}
                </h4>
                <p className="font-body text-sm leading-relaxed text-paper/70 line-clamp-3">
                  {project.caption?.[lang]}
                </p>

                {project.software && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.software.map((sw: string) => (
                      <span
                        key={sw}
                        className="rounded border border-paper/15 bg-midnight-deep px-2.5 py-1 font-body text-[0.68rem] text-paper/70"
                      >
                        {sw}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                type="button"
                onClick={() => setSelectedCaseStudy(project)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-electric/40 bg-electric/10 py-3 font-body text-xs font-bold text-electric transition-colors hover:bg-electric hover:text-midnight"
              >
                <BookOpen size={15} />
                <span>{lang === 'en' ? 'Open Case Study' : 'Buka Studi Kasus'}</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Case Study Modal */}
      <CaseStudyModal
        work={selectedCaseStudy}
        lang={lang}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </div>
  )
}
