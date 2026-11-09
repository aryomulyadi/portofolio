export type Lang = 'en' | 'id'

export type Localized = Record<Lang, string>

export interface NavLink {
  href: string
  label: Localized
}

export interface Profile {
  name: string
  role: Localized
  intro: Localized
  location: Localized | null
  portrait: string | null
  links: {
    github: string
    linkedin: string
    instagram: string | null
    email: string | null
    whatsapp: string | null
    cv: string | null
  }
}

export interface ExperienceEntry {
  id: string
  organization: string
  role: Localized
  period: Localized | null
  location?: Localized | null
  status?: Localized | null
  summary?: Localized | null
  bullets?: Localized[]
  evidence: Localized | null
  url: string | null
}

export interface SkillGroup {
  id: string
  label: Localized
  items: string[]
}

export interface Project {
  id: string
  title: string
  summary: Localized
  category: Localized
  categoryKey: string
  role: Localized | null
  stack: string[]
  description: Localized | null
  contribution: Localized | null
  image: string | null
  githubUrl: string | null
  liveUrl: string | null
  status: Localized | null
}

export interface CreativeWork {
  id: string
  title: Localized
  category: string
  categoryLabel: Localized
  image: string
  /** Native presentation ratio — tiles and stage honor it (no crop). */
  aspect: '16/9' | '4/5' | '5/4'
  caption: Localized | null
  year: string | null
  /** Case study — design process notes (optional). */
  process?: Localized | null
  /** Case study — outcome / result (optional). */
  result?: Localized | null
}

export type SectionId =
  | 'home'
  | 'about'
  | 'experience'
  | 'skills'
  | 'projects'
  | 'creative'
  | 'contact'
