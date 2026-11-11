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
      className="sec-pad on-signal border-b border-ink bg-signal text-white"
    >
      <div className="shell">
        <div className="g">
          <div className="lab mono">
            <b className="lab-num">06</b> / <span>{t('contactLabel', lang)}</span>
          </div>

          <div className="bd">
            <div className="grid items-end gap-10 lg:grid-cols-[7fr_5fr] lg:gap-8">
              <div className="reveal">
                <h2 id="contact-title" className="disp-h2 text-white">
                  {t('contactTitle', lang)}
                </h2>
                <p className="max-w-[46ch] text-[1.02rem] leading-relaxed text-white text-balance">
                  {t('contactBody', lang)}
                </p>

                {profile.links.email && (
                  <a
                    href={`mailto:${profile.links.email}`}
                    className="big-link mt-8 text-white"
                    data-cur="Mail"
                  >
                    {profile.links.email}
                  </a>
                )}
              </div>

              <ul className="chl reveal" style={{ transitionDelay: '80ms' }}>
                {channels.map((channel) => (
                  <li key={channel.id}>
                    <a
                      href={channel.href}
                      target={channel.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel={channel.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                      data-cur="Open"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <channel.icon size={16} aria-hidden className="shrink-0" />
                        <span className="truncate">{channel.label}</span>
                      </span>
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="hidden truncate normal-case tracking-normal opacity-80 sm:inline">
                          {channel.meta}
                        </span>
                        <ArrowUpRight size={16} aria-hidden className="shrink-0" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
