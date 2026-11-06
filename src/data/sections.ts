import type { SectionId } from '../types'
import { projects } from '../data/projects'
import { creativeWorks } from '../data/creativeWorks'
import { skillGroups } from '../data/skills'
import { experience } from '../data/experience'

export interface SectionMeta {
  id: SectionId
  visible: boolean
}

/** Sections render only when they have real content — keeps nav free of dead links. */
export function getSections(): SectionMeta[] {
  return [
    { id: 'home', visible: true },
    { id: 'about', visible: true },
    { id: 'experience', visible: experience.length > 0 },
    { id: 'skills', visible: skillGroups.some((g) => g.items.length > 0) },
    { id: 'projects', visible: projects.length > 0 },
    { id: 'creative', visible: creativeWorks.length > 0 },
    { id: 'contact', visible: true },
  ]
}

export function getVisibleSectionIds(): SectionId[] {
  return getSections()
    .filter((s) => s.visible)
    .map((s) => s.id)
}
