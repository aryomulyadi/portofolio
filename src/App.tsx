import { LanguageProvider } from './hooks/useLanguage'
import { useReveal } from './hooks/useInteractions'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { About } from './components/About'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { CreativeWorks } from './components/CreativeWorks'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { t } from './data/translations'
import { useLanguage } from './hooks/useLanguage'
import { getSections } from './data/sections'

function Portfolio() {
  useReveal()
  const { lang } = useLanguage()
  const sections = getSections()
  const has = (id: string) => sections.find((s) => s.id === id)?.visible

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-mint focus:px-4 focus:py-2 focus:text-sm focus:text-midnight font-bold"
      >
        {t('skipToContent', lang)}
      </a>
      <Navbar />
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
        {has('creative') && <CreativeWorks />}
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
