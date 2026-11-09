import { useState } from 'react'
import {
  ExternalLink,
  FileText,
  Layers,
  Layout,
  Search,
  Sparkles,
  X,
} from 'lucide-react'
import type { CreativeWork, Lang } from '../../../types'

interface CaseStudyModalProps {
  work: CreativeWork | null
  lang: Lang
  onClose: () => void
}

type TabKey = 'problem' | 'research' | 'wireframes' | 'process' | 'interface' | 'prototype'

export function CaseStudyModal({ work, lang, onClose }: CaseStudyModalProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('problem')

  if (!work) return null

  const tabs: { key: TabKey; label: { id: string; en: string }; icon: typeof FileText }[] = [
    { key: 'problem', label: { id: 'Definisi Masalah', en: 'Problem Definition' }, icon: FileText },
    { key: 'research', label: { id: 'Riset', en: 'Research' }, icon: Search },
    { key: 'wireframes', label: { id: 'Kerangka Garis', en: 'Wireframes' }, icon: Layout },
    { key: 'process', label: { id: 'Proses Desain', en: 'Design Process' }, icon: Layers },
    { key: 'interface', label: { id: 'Antarmuka Akhir', en: 'Final Interface' }, icon: Sparkles },
    { key: 'prototype', label: { id: 'Pratinjau Prototipe', en: 'Prototype Preview' }, icon: ExternalLink },
  ]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-midnight-deep/90 p-4 backdrop-blur-md"
    >
      <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-line-dark bg-midnight shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line-dark px-6 py-4">
          <div>
            <span className="font-body text-[0.7rem] font-bold uppercase tracking-[0.2em] text-mint">
              {lang === 'en' ? 'Interactive Project Case Study' : 'Studi Kasus Proyek Interaktif'}
            </span>
            <h3 id="case-study-title" className="font-display-bold text-xl font-bold text-paper">
              {work.title[lang]}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={lang === 'en' ? 'Close case study' : 'Tutup studi kasus'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 text-paper/70 transition-colors hover:border-paper hover:text-paper"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex overflow-x-auto border-b border-line-dark bg-midnight-deep px-6 py-2 scrollbar-none">
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.key
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 font-body text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-electric text-midnight shadow-md'
                      : 'text-paper/60 hover:bg-paper/5 hover:text-paper'
                  }`}
                >
                  <Icon size={14} />
                  {tab.label[lang]}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {activeTab === 'problem' && (
            <div className="space-y-4">
              <h4 className="font-display-bold text-lg font-bold text-paper">
                {lang === 'en' ? 'Core Challenge & Objective' : 'Tantangan Utama & Tujuan'}
              </h4>
              <p className="font-body text-base leading-relaxed text-paper/80">
                {work.problem?.[lang] ?? work.caption?.[lang]}
              </p>
            </div>
          )}

          {activeTab === 'research' && (
            <div className="space-y-4">
              <h4 className="font-display-bold text-lg font-bold text-paper">
                {lang === 'en' ? 'User & Architectural Research' : 'Riset Pengguna & Arsitektur'}
              </h4>
              <p className="font-body text-base leading-relaxed text-paper/80">
                {work.research?.[lang] ??
                  (lang === 'en'
                    ? 'Evaluated key quantitative KPIs and data-density thresholds to minimize cognitive load.'
                    : 'Mengevaluasi KPI kuantitatif utama dan batas kepadatan data untuk meminimalkan beban kognitif.')}
              </p>
            </div>
          )}

          {activeTab === 'wireframes' && (
            <div className="space-y-4">
              <h4 className="font-display-bold text-lg font-bold text-paper">
                {lang === 'en' ? 'Layout Architecture & Wireframes' : 'Arsitektur Tata Letak & Kerangka Garis'}
              </h4>
              <p className="font-body text-base leading-relaxed text-paper/80">
                {work.wireframes?.[lang] ??
                  (lang === 'en'
                    ? 'Modular responsive layout grid with dedicated KPI zones and primary charts.'
                    : 'Kisi tata letak responsif modular dengan zona KPI khusus dan grafik primer.')}
              </p>
            </div>
          )}

          {activeTab === 'process' && (
            <div className="space-y-4">
              <h4 className="font-display-bold text-lg font-bold text-paper">
                {lang === 'en' ? 'Iterative Design System' : 'Sistem Desain & Iterasi'}
              </h4>
              <p className="font-body text-base leading-relaxed text-paper/80">
                {work.process?.[lang] ?? work.caption?.[lang]}
              </p>
            </div>
          )}

          {activeTab === 'interface' && (
            <div className="space-y-4">
              <h4 className="font-display-bold text-lg font-bold text-paper">
                {lang === 'en' ? 'Final Design Output' : 'Keluaran Desain Final'}
              </h4>
              <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border border-line-dark bg-midnight-deep">
                <img
                  src={work.image}
                  alt={work.title[lang]}
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="font-body text-sm leading-relaxed text-paper/70">
                {work.result?.[lang]}
              </p>
            </div>
          )}

          {activeTab === 'prototype' && (
            <div className="space-y-6">
              <h4 className="font-display-bold text-lg font-bold text-paper">
                {lang === 'en' ? 'Interactive Prototype Simulation' : 'Simulasi Prototipe Interaktif'}
              </h4>
              <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border border-line-dark bg-midnight-deep">
                <img
                  src={work.image}
                  alt={work.title[lang]}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line-dark bg-midnight-deep p-4">
                <span className="font-body text-xs text-paper/70">
                  {lang === 'en'
                    ? 'Explore full source code and live demonstrational repository on GitHub.'
                    : 'Jelajahi kode sumber lengkap dan repositori demonstrasi di GitHub.'}
                </span>
                {work.prototypeUrl && (
                  <a
                    href={work.prototypeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-mint px-4 py-2 font-body text-xs font-bold text-midnight transition-opacity hover:opacity-90"
                  >
                    <ExternalLink size={14} />
                    {lang === 'en' ? 'Open Prototype' : 'Buka Prototipe'}
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
