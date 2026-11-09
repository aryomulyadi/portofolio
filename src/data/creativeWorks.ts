import type { CreativeWork } from '../types'

/**
 * Creative work — owner adds real artwork here.
 * Use actual artwork files under /public/images/creative/.
 * Keep array empty to hide the section.
 * Current entries use placeholder SVGs — swap image paths when real artwork lands.
 */
export const creativeWorks: CreativeWork[] = [
  {
    id: 'horizon-poster',
    title: { id: 'Horizon', en: 'Horizon' },
    category: 'poster',
    categoryLabel: { id: 'Poster', en: 'Poster' },
    image: './images/creative/poster-horizon.svg',
    caption: {
      id: 'Studi gradien lanskap untuk seri poster editorial.',
      en: 'Landscape gradient study for an editorial poster series.',
    },
    year: '2026',
  },
  {
    id: 'orbit-poster',
    title: { id: 'Orbit', en: 'Orbit' },
    category: 'poster',
    categoryLabel: { id: 'Poster', en: 'Poster' },
    image: './images/creative/poster-orbit.svg',
    caption: {
      id: 'Komposisi geometris dengan fokus ritme dan kontras.',
      en: 'Geometric composition focused on rhythm and contrast.',
    },
    year: '2026',
  },
  {
    id: 'mark-system',
    title: { id: 'Mark 03', en: 'Mark 03' },
    category: 'branding',
    categoryLabel: { id: 'Branding', en: 'Branding' },
    image: './images/creative/brand-mark.svg',
    caption: {
      id: 'Eksplorasi lambang merek berbasis bentuk segitiga.',
      en: 'Triangle-based brand mark exploration.',
    },
    year: '2025',
  },
  {
    id: 'palette-grid',
    title: { id: 'Palette Grid', en: 'Palette Grid' },
    category: 'branding',
    categoryLabel: { id: 'Branding', en: 'Branding' },
    image: './images/creative/brand-grid.svg',
    caption: {
      id: 'Sistem grid dan palet warna untuk identitas visual.',
      en: 'Grid and color-palette system for a visual identity.',
    },
    year: '2025',
  },
  {
    id: 'pulse-campaign',
    title: { id: 'Pulse', en: 'Pulse' },
    category: 'social',
    categoryLabel: { id: 'Media sosial', en: 'Social media' },
    image: './images/creative/social-pulse.svg',
    caption: {
      id: 'Materi kampanye vertikal untuk kanal sosial.',
      en: 'Vertical campaign assets for social channels.',
    },
    year: '2026',
  },
  {
    id: 'countdown-post',
    title: { id: 'Countdown 45', en: 'Countdown 45' },
    category: 'social',
    categoryLabel: { id: 'Media sosial', en: 'Social media' },
    image: './images/creative/social-countdown.svg',
    caption: {
      id: 'Template hitung mundur dengan tipografi berani.',
      en: 'Countdown template with bold typography.',
    },
    year: '2026',
  },
  {
    id: 'thread-graphic',
    title: { id: 'Thread', en: 'Thread' },
    category: 'apparel',
    categoryLabel: { id: 'Apparel', en: 'Apparel' },
    image: './images/creative/apparel-thread.svg',
    caption: {
      id: 'Grafik sablon untuk koleksi pakaian experimental.',
      en: 'Screen-print graphic for an experimental apparel drop.',
    },
    year: '2025',
  },
  {
    id: 'ui-concept',
    title: { id: 'UI Concept', en: 'UI Concept' },
    category: 'ui',
    categoryLabel: { id: 'UI', en: 'UI' },
    image: './images/creative/ui-concept.svg',
    caption: {
      id: 'Konsep antarmuka dashboard dengan data visual.',
      en: 'Dashboard interface concept with data visualization.',
    },
    year: '2026',
  },
]
