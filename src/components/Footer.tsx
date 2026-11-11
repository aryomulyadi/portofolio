import { useLanguage } from '../hooks/useLanguage'
import { t } from '../data/translations'
import { profile } from '../data/profile'

export function Footer() {
  const { lang } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-paper">
      <div className="shell flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-sm font-black uppercase tracking-tight text-paper">
            <span className="mr-1.5 inline-block h-2.5 w-2.5 bg-signal align-middle" aria-hidden />
            {profile.name}
          </p>
          <p className="mono mt-2.5 text-grey">{t('footerNote', lang)}</p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mono link-underline text-grey hover:text-paper"
            data-cur="Open"
          >
            GitHub
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mono link-underline text-grey hover:text-paper"
            data-cur="Open"
          >
            LinkedIn
          </a>
          <p className="mono text-grey tabular-nums">© {year}</p>
        </div>
      </div>
    </footer>
  )
}
