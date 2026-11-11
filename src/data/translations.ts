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

export type Dict = {
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
    id: 'Desain dan eksperimen visual',
    en: 'Design and visual experiments',
  },
  showcaseLabel: { id: 'Sorotan', en: 'Featured' },
  stagePrev: { id: 'Karya sebelumnya', en: 'Previous work' },
  stageNext: { id: 'Karya berikutnya', en: 'Next work' },
  railHint: {
    id: 'Seret, gunakan ← →, atau klik untuk menjelajah',
    en: 'Drag, use ← →, or click to browse',
  },
  jumpLabel: { id: 'Lompat ke bagian', en: 'Jump to section' },
  processLabel: { id: 'Proses', en: 'Process' },
  resultLabel: { id: 'Hasil', en: 'Result' },
  contactLabel: { id: 'Kontak', en: 'Contact' },
  contactTitle: {
    id: 'Mulai percakapan',
    en: 'Start a conversation',
  },
  contactBody: {
    id: 'Untuk posisi, freelance, atau kolaborasi — pilih kanal yang paling pas.',
    en: 'For roles, freelance work, or collaboration — pick the channel that fits.',
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
  deckHint: {
    id: 'Geser kartu atau gunakan tombol',
    en: 'Swipe the card or use the buttons',
  },
  deckPrev: { id: 'Proyek sebelumnya', en: 'Previous project' },
  deckNext: { id: 'Proyek berikutnya', en: 'Next project' },
  deckPosition: { id: '{n} / {total}', en: '{n} / {total}' },
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

  /* ── v2: strings consolidated from inline ternaries (text unchanged) ── */
  aboutQuoteBefore: {
    id: '“Code menjadi pengalaman. Dari AI agent hingga interface pixel-perfect, saya ',
    en: '“Code becomes experience. From AI agents to pixel-perfect interfaces, I ',
  },
  aboutQuoteMark: {
    id: 'menghubungkan teknologi dengan hasil nyata',
    en: 'connect technology to human outcomes',
  },
  aboutQuoteAfter: { id: '.”', en: '.”' },
  aboutBody: {
    id: 'Saya kerja di bidang produk web interaktif, platform berbasis AI, dan pengalaman digital. Benang merahnya: menjembatani kedalaman teknis dengan visi kreatif.',
    en: 'I work across interactive web products, AI-driven platforms, and digital experiences. The common thread is bridging technical depth with creative vision.',
  },
  factFocusLabel: { id: 'Fokus', en: 'Focus' },
  factFocusValue: {
    id: 'Web, Platform AI, Teknologi Kreatif',
    en: 'Web, AI Platforms, Creative Tech',
  },
  factBasedLabel: { id: 'Basis', en: 'Based' },
  factCurrentlyLabel: { id: 'Saat ini', en: 'Currently' },
  factCurrentlyValue: {
    id: 'Creative Developer, Banjar Custom',
    en: 'Creative Developer, Banjar Custom',
  },
  factStackLabel: { id: 'Stack', en: 'Stack' },
  factStackValue: {
    id: 'React, Next.js, Laravel, CrewAI',
    en: 'React, Next.js, Laravel, CrewAI',
  },
  factOpenLabel: { id: 'Terbuka untuk', en: 'Open to' },
  factOpenValue: {
    id: 'Freelance, Kolaborasi, Talks',
    en: 'Freelance, Collaboration, Talks',
  },
  skillsIntro: {
    id: 'Daftar teknologi, framework, dan alur kerja utama yang digunakan dalam proyek pribadi dan klien.',
    en: 'A curated list of core technologies, frameworks, and workflows used across personal and client projects.',
  },
  competencies: {
    id: 'Kompetensi Terverifikasi',
    en: 'Verified Competencies',
  },
  visitWebsite: { id: 'Kunjungi website', en: 'Visit website' },
  avail: { id: 'Terbuka untuk freelance', en: 'Open for freelance' },
  viewStage: { id: 'Panggung', en: 'Stage' },
  viewIndex: { id: 'Indeks', en: 'Index' },
  loupe: { id: 'Lup', en: 'Loupe' },
  worksCount: { id: 'karya', en: 'works' },
  workCount: { id: 'karya', en: 'work' },
  enlarge: { id: 'Perbesar', en: 'Enlarge' },
  keysHint: {
    id: 'Tombol: ← → karya · [ ] kategori · I indeks · F layar penuh',
    en: 'Keys: ← → work · [ ] category · I index · F fullscreen',
  },
  cursorZoom: { id: 'Perbesar', en: 'Zoom' },
  cursorDrag: { id: 'Seret', en: 'Drag' },
  cursorOpen: { id: 'Buka', en: 'Open' },
  cursorGo: { id: 'Menuju', en: 'Go' },
  cursorPdf: { id: 'PDF', en: 'PDF' },
  cursorView: { id: 'Lihat', en: 'View' },
  cursorMail: { id: 'Surel', en: 'Mail' },
  fullscreen: { id: 'Layar Penuh', en: 'Fullscreen' },
  openCaseStudy: { id: 'Buka Studi Kasus', en: 'Open Case Study' },
  caseStudyKicker: {
    id: 'Studi Kasus Proyek Interaktif',
    en: 'Interactive Project Case Study',
  },
  closeCaseStudy: { id: 'Tutup studi kasus', en: 'Close case study' },
  csProblemH: {
    id: 'Tantangan Utama & Tujuan',
    en: 'Core Challenge & Objective',
  },
  csResearchH: {
    id: 'Riset Pengguna & Arsitektur',
    en: 'User & Architectural Research',
  },
  csWireframesH: {
    id: 'Arsitektur Tata Letak & Kerangka Garis',
    en: 'Layout Architecture & Wireframes',
  },
  csProcessH: { id: 'Sistem Desain & Iterasi', en: 'Iterative Design System' },
  csInterfaceH: { id: 'Keluaran Desain Final', en: 'Final Design Output' },
  csPrototypeH: {
    id: 'Simulasi Prototipe Interaktif',
    en: 'Interactive Prototype Simulation',
  },
  csResearchFallback: {
    id: 'Mengevaluasi KPI kuantitatif utama dan batas kepadatan data untuk meminimalkan beban kognitif.',
    en: 'Evaluated key quantitative KPIs and data-density thresholds to minimize cognitive load.',
  },
  csWireFallback: {
    id: 'Kisi tata letak responsif modular dengan zona KPI khusus dan grafik primer.',
    en: 'Modular responsive layout grid with dedicated KPI zones and primary charts.',
  },
  csPrototypeNote: {
    id: 'Jelajahi kode sumber lengkap dan repositori demonstrasi di GitHub.',
    en: 'Explore full source code and live demonstrational repository on GitHub.',
  },
  openPrototype: { id: 'Buka Prototipe', en: 'Open Prototype' },
  seoTitle: {
    id: 'Rifqi Aryo Mulyadi — Portofolio Creative Developer',
    en: 'Rifqi Aryo Mulyadi — Creative Developer Portfolio',
  },
  seoDesc: {
    id: 'Portofolio Rifqi Aryo Mulyadi — pengembangan perangkat lunak dan web, desain digital, dan produksi kreatif.',
    en: 'Portfolio of Rifqi Aryo Mulyadi — software and web development, digital design, and creative production.',
  },
}

export function t(key: keyof Dict, lang: Lang): string {
  const entry = ui[key]
  if (!entry) return key
  return entry[lang] ?? entry.en ?? key
}
