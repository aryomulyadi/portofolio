import type { Lang, Localized, NavLink } from '../types'

export const navLinks: NavLink[] = [
  { href: '#home', label: { id: 'Profil', en: 'Profile' } },
  { href: '#about', label: { id: 'Tentang', en: 'About' } },
  { href: '#experience', label: { id: 'Pengalaman', en: 'Experience' } },
  { href: '#skills', label: { id: 'Keahlian', en: 'Skills' } },
  { href: '#projects', label: { id: 'Proyek', en: 'Projects' } },
  { href: '#creative', label: { id: 'Kreatif', en: 'Creative' } },
  { href: '#contact', label: { id: 'Kontak', en: 'Contact' } },
]

type Dict = {
  [K in keyof Record<string, unknown>]: Localized
}

export const ui: Dict = {
  skipToContent: {
    id: 'Lewati ke konten',
    en: 'Skip to content',
  },
  menuOpen: { id: 'Buka menu', en: 'Open menu' },
  menuClose: { id: 'Tutup menu', en: 'Close menu' },
  languageLabel: { id: 'Bahasa', en: 'Language' },
  switchToEn: { id: 'Ganti ke English', en: 'Switch to English' },
  switchToId: { id: 'Ganti ke Bahasa Indonesia', en: 'Switch to Bahasa Indonesia' },
  viewWork: { id: 'Lihat karya terpilih', en: 'View selected work' },
  viewCv: { id: 'Lihat CV', en: 'View CV' },
  github: { id: 'GitHub', en: 'GitHub' },
  linkedin: { id: 'LinkedIn', en: 'LinkedIn' },
  instagram: { id: 'Instagram', en: 'Instagram' },
  email: { id: 'Email', en: 'Email' },
  whatsapp: { id: 'WhatsApp', en: 'WhatsApp' },
  aboutLabel: { id: 'Tentang', en: 'About' },
  aboutTitle: {
    id: 'Teknologi dan desain sebagai satu praktik',
    en: 'Technology and design, treated as one practice',
  },
  experienceLabel: { id: 'Pengalaman', en: 'Experience' },
  experienceTitle: {
    id: 'Tempat karya tercipta',
    en: 'Where the work happened',
  },
  skillsLabel: { id: 'Keahlian & alat', en: 'Skills & tools' },
  skillsTitle: {
    id: 'Alat dan teknologi yang saya pakai',
    en: 'What I work with',
  },
  projectsLabel: { id: 'Proyek terpilih', en: 'Selected projects' },
  projectsTitle: {
    id: 'Proyek',
    en: 'Projects',
  },
  creativeLabel: { id: 'Karya kreatif', en: 'Creative work' },
  creativeTitle: {
    id: 'Desain di luar layar',
    en: 'Design beyond the screen',
  },
  contactLabel: { id: 'Kontak', en: 'Contact' },
  contactTitle: {
    id: 'Mulai percakapan',
    en: 'Start a conversation',
  },
  contactBody: {
    id: 'Untuk posisi, freelance, atau kolaborasi — pilih kanal yang paling pas. Hanya tautan langsung; tanpa formulir kontak.',
    en: 'For roles, freelance work, or collaboration — pick the channel that fits. Direct links only; no contact form.',
  },
  emptyProjects: {
    id: 'Proyek baru akan muncul di sini setelah diterbitkan.',
    en: 'New projects will appear here once published.',
  },
  emptyCreative: {
    id: 'Karya baru akan muncul di sini setelah diterbitkan.',
    en: 'New artwork will appear here once published.',
  },
  filterAll: { id: 'Semua', en: 'All' },
  closeLightbox: { id: 'Tutup preview', en: 'Close preview' },
  nextImage: { id: 'Gambar berikutnya', en: 'Next image' },
  prevImage: { id: 'Gambar sebelumnya', en: 'Previous image' },
  externalLink: { id: 'Buka di tab baru', en: 'Opens in a new tab' },
  githubLink: { id: 'Lihat di GitHub', en: 'View on GitHub' },
  liveLink: { id: 'Live demo', en: 'Live demo' },
  roleLabel: { id: 'Peran', en: 'Role' },
  stackLabel: { id: 'Teknologi', en: 'Stack' },
  categoryLabel: { id: 'Kategori', en: 'Category' },
  statusLabel: { id: 'Status', en: 'Status' },
  contributionLabel: { id: 'Kontribusi', en: 'Contribution' },
  descriptionLabel: { id: 'Tentang proyek', en: 'About the project' },
  footerNote: {
    id: 'Dirancang dan dibangun oleh Rifqi Aryo Mulyadi.',
    en: 'Designed and built by Rifqi Aryo Mulyadi.',
  },
  openDetails: { id: 'Buka detail', en: 'Open details' },
  portraitAlt: {
    id: 'Potret Rifqi Aryo Mulyadi',
    en: 'Portrait of Rifqi Aryo Mulyadi',
  },
  portraitPending: {
    id: 'Slot potret — tambahkan public/images/profile/portrait.png',
    en: 'Portrait slot — add public/images/profile/portrait.png',
  },
}

export function t(key: keyof Dict, lang: Lang): string {
  return ui[key][lang]
}
