import { useLanguage } from '../hooks/useLanguage'
import { t } from '../data/translations'
import { profile } from '../data/profile'

export function Footer() {
  const { lang } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-midnight-deep py-12 text-paper border-t border-line-dark/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-display text-sm font-bold text-paper">
            <span className="text-mint" aria-hidden>
              ✦
            </span>{' '}
            {profile.name}
          </p>
          <p className="mt-1.5 font-body text-xs text-paper/45">{t('footerNote', lang)}</p>
        </div>
        <div className="flex items-center gap-6">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-body text-xs text-paper/60 hover:text-mint"
          >
            GitHub
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-body text-xs text-paper/60 hover:text-mint"
          >
            LinkedIn
          </a>
          <p className="font-body text-xs text-paper/35 tabular-nums">© {year}</p>
        </div>
      </div>
    </footer>
  )
}
