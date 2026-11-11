import { useEffect, useRef } from 'react'
import { Mail, Github, Linkedin, Instagram, MessageCircle, ArrowUpRight } from 'lucide-react'
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
  const phraseRef = useRef<HTMLAnchorElement>(null)

  /* Magnetic effect on the big contact link (fine pointers only) */
  useEffect(() => {
    const el = phraseRef.current
    if (!el) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.06
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.12
      el.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`
    }
    const onLeave = () => {
      el.style.transform = ''
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  const channels: Channel[] = [
    ...(profile.links.email
      ? [
          {
            id: 'email',
            label: t('email', lang),
            meta: profile.links.email,
            href: `mailto:${profile.links.email}`,
            icon: Mail,
          },
        ]
      : []),
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
                    ref={phraseRef}
                    href={`mailto:${profile.links.email}`}
                    className="big-link mt-8 text-white"
                    data-cur="Mail"
                  >
                    <span>{t('buildPhrase1', lang)}</span>
                    <br />
                    <em className="bf-serif">{t('buildPhrase2', lang)}</em>
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
                      data-cur={channel.href.startsWith('mailto:') ? 'Mail' : 'Open'}
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
