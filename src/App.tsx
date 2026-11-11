import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { LanguageProvider } from './hooks/useLanguage'
import { useReveal } from './hooks/useInteractions'
import { Navbar } from './components/Navbar'
import { ContextualCursor } from './components/ContextualCursor'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { About } from './components/About'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { t } from './data/translations'
import { useLanguage } from './hooks/useLanguage'
import { getSections } from './data/sections'

/* NFR-01: Creative (Lightbox, CaseStudyModal, exhibitions) is its own chunk */
const CreativeWorks = lazy(async () => ({ default: (await import('./components/CreativeWorks')).CreativeWorks }))

function Portfolio() {
  useReveal()
  const { lang } = useLanguage()
  const sections = getSections()
  const has = (id: string) => sections.find((s) => s.id === id)?.visible
  const hasCreative = Boolean(has('creative'))

  /* NFR-01: mount Creative when it approaches the viewport (600px early) */
  const creativeSentinelRef = useRef<HTMLDivElement>(null)
  const [creativeNear, setCreativeNear] = useState(false)

  useEffect(() => {
    if (!hasCreative || creativeNear) return
    const el = creativeSentinelRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setCreativeNear(true)
          io.disconnect()
        }
      },
      { rootMargin: '600px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [hasCreative, creativeNear])

  /* SEO: title + meta description follow the active language (JS-rendered) */
  useEffect(() => {
    document.title = t('seoTitle', lang)
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', t('seoDesc', lang))
  }, [lang])

  return (
    <>
      <a
                        href="#main"
                        className="mono sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:bg-signal focus:px-4 focus:py-3 focus:text-white"
                      >
                        {t('skipToContent', lang)}
                      </a>
      <Navbar />
      <ContextualCursor />
      <main id="main">
        <Hero />
        {has('about') && (
          <>
            <About />
            <Marquee />
          </>
        )}
        {has('experience') && <Experience />}
        {has('skills') && <Skills />}
        {has('projects') && <Projects />}
        {hasCreative &&
          (creativeNear ? (
            <Suspense fallback={<div id="creative" className="min-h-[30vh]" aria-hidden />}>
              <CreativeWorks />
            </Suspense>
          ) : (
            <div ref={creativeSentinelRef} id="creative" aria-hidden />
          ))}
        {has('contact') && <Contact />}
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <Portfolio />
    </LanguageProvider>
  )
}
