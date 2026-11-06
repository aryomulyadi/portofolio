import { Github, Linkedin, Instagram, MessageCircle, ArrowUpRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { t } from '../data/translations'
import { profile } from '../data/profile'

interface Channel {
  id: string
  label: string
  meta: string
  href: string
  icon: LucideIcon
}

export function Contact() {
  const { lang } = useLanguage()

  const channels: Channel[] = [
    {
      id: 'whatsapp',
      label: t('whatsapp', lang),
      meta: '+62 877-2267-9685',
      href: profile.links.whatsapp ?? '#',
      icon: MessageCircle,
    },
    {
      id: 'instagram',
      label: t('instagram', lang),
      meta: '@aryomulyd',
      href: profile.links.instagram ?? '#',
      icon: Instagram,
    },
    {
      id: 'linkedin',
      label: t('linkedin', lang),
      meta: 'rifqiaryomulyadii',
      href: profile.links.linkedin,
      icon: Linkedin,
    },
    {
      id: 'github',
      label: t('github', lang),
      meta: 'aryomulyadi',
      href: profile.links.github,
      icon: Github,
    },
  ].filter((c) => c.href && c.href !== '#')

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-b border-line-dark bg-midnight py-20 text-paper md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <header className="reveal mb-12 md:mb-16">
          <div className="mb-4 flex items-baseline gap-4">
            <span className="index-num font-display-bold text-sm text-mint">07</span>
            <p className="font-body text-[0.7rem] font-bold uppercase tracking-[0.22em] text-paper/45">
              {t('contactLabel', lang)}
            </p>
          </div>
          <h2
            id="contact-title"
            className="max-w-3xl font-display-bold text-[clamp(1.9rem,4.5vw,3.1rem)] font-medium leading-[1.08] tracking-tight text-paper text-balance"
          >
            {t('contactTitle', lang)}
          </h2>
          <div className="rule-electric mt-8" />
        </header>

        <div className="grid gap-12 md:grid-cols-12">
          <div className="reveal md:col-span-5">
            <p className="max-w-md text-[1.02rem] leading-relaxed text-paper/70 text-balance">
              {t('contactBody', lang)}
            </p>

            {profile.links.email && (
              <a
                href={`mailto:${profile.links.email}`}
                className="link-underline mt-8 inline-block font-display text-[clamp(1.1rem,2.2vw,1.5rem)] font-bold tracking-tight text-mint hover:text-paper"
              >
                {profile.links.email}
              </a>
            )}
          </div>

          <ul className="reveal md:col-span-7" style={{ transitionDelay: '80ms' }}>
            {channels.map((channel) => (
              <li key={channel.id} className="border-t border-line-dark last:border-b">
                <a
                  href={channel.href}
                  target={channel.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={channel.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="group flex items-center justify-between gap-4 py-5"
                >
                  <span className="flex items-center gap-4 min-w-0">
                    <channel.icon
                      size={18}
                      aria-hidden
                      className="shrink-0 text-mint transition-colors group-hover:text-electric"
                    />
                    <span className="min-w-0">
                      <span className="block font-display text-lg font-bold tracking-tight text-paper transition-colors group-hover:text-mint">
                        {channel.label}
                      </span>
                      <span className="mt-0.5 block truncate font-body text-xs text-paper/45">
                        {channel.meta}
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    aria-hidden
                    className="shrink-0 text-paper/45 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mint"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
