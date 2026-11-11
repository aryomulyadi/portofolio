import { useEffect, useRef, useState } from 'react'
import {
  ExternalLink,
  FileText,
  Layers,
  Layout,
  Search,
  Sparkles,
  X,
} from 'lucide-react'
import { useEscape, useFocusTrap, useLockBodyScroll } from '../../../hooks/useInteractions'
import { t } from '../../../data/translations'
import type { CreativeWork, Lang } from '../../../types'

interface CaseStudyModalProps {
  work: CreativeWork | null
  lang: Lang
  onClose: () => void
}

type TabKey = 'problem' | 'research' | 'wireframes' | 'process' | 'interface' | 'prototype'

export function CaseStudyModal({ work, lang, onClose }: CaseStudyModalProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('problem')
  const dialogRef = useRef<HTMLDivElement>(null)
  const open = work !== null

  /* FR-CRE-05: focus-trap + Escape + scroll lock (closes v1 backlog) */
  useLockBodyScroll(open)
  useEscape(onClose, open)
  useFocusTrap(dialogRef, open)

  useEffect(() => {
    if (open) setActiveTab('problem')
  }, [open, work?.id])

  if (!work) return null

  const tabs: { key: TabKey; labelKey: 'csProblemH' | 'csResearchH' | 'csWireframesH' | 'csProcessH' | 'csInterfaceH' | 'csPrototypeH'; icon: typeof FileText }[] = [
    { key: 'problem', labelKey: 'csProblemH', icon: FileText },
    { key: 'research', labelKey: 'csResearchH', icon: Search },
    { key: 'wireframes', labelKey: 'csWireframesH', icon: Layout },
    { key: 'process', labelKey: 'csProcessH', icon: Layers },
    { key: 'interface', labelKey: 'csInterfaceH', icon: Sparkles },
    { key: 'prototype', labelKey: 'csPrototypeH', icon: ExternalLink },
  ]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-[65] flex items-center justify-center bg-ink/92 p-4"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden border border-grey bg-ink shadow-[8px_8px_0_var(--color-grey)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-grey px-5 py-4 md:px-6">
          <div className="min-w-0">
            <p className="mono text-grey">{t('caseStudyKicker', lang)}</p>
            <h3
              id="case-study-title"
              className="mt-1 truncate font-display text-xl font-black uppercase tracking-tight text-paper"
            >
              {work.title[lang]}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('closeCaseStudy', lang)}
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-grey text-paper transition-colors hover:border-signal hover:bg-signal hover:text-white"
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="scrollbar-none flex overflow-x-auto border-b border-grey bg-ink px-5 py-2 md:px-6">
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.key
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  aria-pressed={isActive}
                  className={`mono flex min-h-10 shrink-0 items-center gap-2 border px-3 py-2 transition-colors ${
                    isActive
                      ? 'border-signal bg-signal text-white'
                      : 'border-grey text-grey hover:border-paper hover:text-paper'
                  }`}
                >
                  <Icon size={14} aria-hidden />
                  {t(tab.labelKey, lang)}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 space-y-6 overflow-y-auto p-5 md:p-8">
          {activeTab === 'problem' && (
            <div className="space-y-4">
              <h4 className="font-display text-lg font-black uppercase tracking-tight text-paper">
                {t('csProblemH', lang)}
              </h4>
              <p className="max-w-[68ch] text-base leading-relaxed text-grey">
                {work.problem?.[lang] ?? work.caption?.[lang]}
              </p>
            </div>
          )}

          {activeTab === 'research' && (
            <div className="space-y-4">
              <h4 className="font-display text-lg font-black uppercase tracking-tight text-paper">
                {t('csResearchH', lang)}
              </h4>
              <p className="max-w-[68ch] text-base leading-relaxed text-grey">
                {work.research?.[lang] ?? t('csResearchFallback', lang)}
              </p>
            </div>
          )}

          {activeTab === 'wireframes' && (
            <div className="space-y-4">
              <h4 className="font-display text-lg font-black uppercase tracking-tight text-paper">
                {t('csWireframesH', lang)}
              </h4>
              <p className="max-w-[68ch] text-base leading-relaxed text-grey">
                {work.wireframes?.[lang] ?? t('csWireFallback', lang)}
              </p>
            </div>
          )}

          {activeTab === 'process' && (
            <div className="space-y-4">
              <h4 className="font-display text-lg font-black uppercase tracking-tight text-paper">
                {t('csProcessH', lang)}
              </h4>
              <p className="max-w-[68ch] text-base leading-relaxed text-grey">
                {work.process?.[lang] ?? work.caption?.[lang]}
              </p>
            </div>
          )}

          {activeTab === 'interface' && (
            <div className="space-y-4">
              <h4 className="font-display text-lg font-black uppercase tracking-tight text-paper">
                {t('csInterfaceH', lang)}
              </h4>
              <div className="aspect-[16/9] w-full overflow-hidden border border-grey bg-ink">
                <img
                  src={work.image}
                  alt={work.title[lang]}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="max-w-[68ch] text-sm leading-relaxed text-grey">
                {work.result?.[lang]}
              </p>
            </div>
          )}

          {activeTab === 'prototype' && (
            <div className="space-y-6">
              <h4 className="font-display text-lg font-black uppercase tracking-tight text-paper">
                {t('csPrototypeH', lang)}
              </h4>
              <div className="aspect-[16/9] w-full overflow-hidden border border-grey bg-ink">
                <img
                  src={work.image}
                  alt={work.title[lang]}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 border border-grey p-4">
                <span className="max-w-[52ch] text-xs leading-relaxed text-grey">
                  {t('csPrototypeNote', lang)}
                </span>
                {work.prototypeUrl && (
                  <a
                    href={work.prototypeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-red"
                    data-cur="Open"
                  >
                    <ExternalLink size={14} aria-hidden />
                    {t('openPrototype', lang)}
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
