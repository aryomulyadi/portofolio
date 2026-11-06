import type { SkillGroup } from '../types'

/**
 * Verified skills — only techs Rifqi can confidently discuss.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    label: { en: 'Frontend', id: 'Frontend' },
    items: ['React 19', 'Next.js 16', 'Vite', 'Tailwind CSS', 'Alpine.js'],
  },
  {
    id: 'backend',
    label: { en: 'Backend', id: 'Backend' },
    items: ['Laravel 12', 'PHP 8.2', 'FastAPI', 'Python'],
  },
  {
    id: 'ai-ml',
    label: { en: 'AI & Agents', id: 'AI & Agents' },
    items: ['CrewAI', 'Multi-agent Systems', 'LLM Integration'],
  },
  {
    id: 'design-tools',
    label: { en: 'Design Tools', id: 'Alat Desain' },
    items: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'CorelDRAW', 'Canva'],
  },
  {
    id: 'database',
    label: { en: 'Database', id: 'Database' },
    items: ['PostgreSQL', 'Neon', 'Prisma', 'SQLite', 'MySQL'],
  },
  {
    id: 'tools',
    label: { en: 'Tools', id: 'Alat' },
    items: ['Git', 'GitHub', 'Vercel', 'Docker', 'cPanel'],
  },
]
