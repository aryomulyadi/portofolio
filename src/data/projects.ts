import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'banjarcustom',
    title: 'Banjar Custom',
    summary: {
      en: 'Official business website for Banjar Custom — custom apparel and printing services. Features digital product catalog, order management, and operational tracking system for administrators.',
      id: 'Situs resmi bisnis Banjar Custom — layanan apparel dan printing kustom. Fitur katalog produk digital, manajemen pesanan, dan sistem pelacakan operasional untuk administrator.',
    },
    category: { en: 'Business Website', id: 'Website Bisnis' },
    categoryKey: 'web',
    role: {
      en: 'Lead Developer & Designer',
      id: 'Lead Developer & Desainer',
    },
    stack: ['Laravel', 'Alpine.js', 'Tailwind CSS'],
    description: {
      en: 'Custom apparel production workflow platform with inventory management and client order tracking.',
      id: 'Platform alur kerja produksi apparel kustom dengan manajemen inventaris dan pelacakan pesanan klien.',
    },
    contribution: {
      en: 'Full-stack development, UI/UX design, and operational system architecture.',
      id: 'Pengembangan full-stack, desain UI/UX, dan arsitektur sistem operasional.',
    },
    image: './images/projects/banjar-custom.webp',
    githubUrl: 'https://github.com/aryomulyadi/banjarcustome',
    liveUrl: 'https://banjarcustom.com',
    status: {
      en: 'Live',
      id: 'Online',
    },
  },
  {
    id: 'solusi-gim',
    title: 'SOLUSI GIM',
    summary: {
      en: 'Modern landing page for a digital game asset marketplace. Features interactive sections, product catalog, bundle system, and asset request functionality.',
      id: 'Halaman landing modern untuk marketplace aset game digital. Fitur interaktif, katalog produk, sistem bundle, dan fungsi permintaan aset.',
    },
    category: { en: 'Landing Page', id: 'Landing Page' },
    categoryKey: 'web',
    role: {
      en: 'Lead Developer',
      id: 'Lead Developer',
    },
    stack: ['React 19', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    description: {
      en: '14 interactive sections designed to empower indie game developers in Indonesia with ready-to-use assets.',
      id: '14 bagian interaktif dirancang untuk memberdayakan pengembang game indie di Indonesia dengan aset siap pakai.',
    },
    contribution: {
      en: 'Full-stack development from concept to deployment on Vercel.',
      id: 'Pengembangan full-stack dari konsep hingga deployment di Vercel.',
    },
    image: './images/projects/solusi-gim.webp',
    githubUrl: 'https://github.com/aryomulyadi/solusi-gim-landing-page',
    liveUrl: 'https://solusigimx.vercel.app/',
    status: {
      en: 'Live',
      id: 'Online',
    },
  },
  {
    id: 'agendaku',
    title: 'AgendaKu',
    summary: {
      en: 'Personal daily agenda management app with task management, calendar view, categories, and dark mode. Built with modern stack and authentication.',
      id: 'Aplikasi manajemen agenda harian pribadi dengan manajemen tugas, tampilan kalender, kategori, dan mode gelap. Dibangun dengan stack modern dan autentikasi.',
    },
    category: { en: 'SaaS App', id: 'Aplikasi SaaS' },
    categoryKey: 'web',
    role: {
      en: 'Full-stack Developer',
      id: 'Full-stack Developer',
    },
    stack: ['Next.js 16', 'Prisma', 'Neon PostgreSQL', 'Tailwind CSS', 'Auth.js'],
    description: {
      en: 'Helps users organize, track, and complete daily tasks while staying prepared for tomorrow.',
      id: 'Membantu pengguna mengelola, melacak, dan menyelesaikan tugas harian sambil bersiap untuk hari besok.',
    },
    contribution: {
      en: 'End-to-end development including database design, authentication, and UI.',
      id: 'Pengembangan ujung-ke-ujung termasuk desain database, autentikasi, dan UI.',
    },
    image: './images/projects/agendaku.webp',
    githubUrl: 'https://github.com/aryomulyadi/AgendaKu',
    liveUrl: 'https://agendaku.vercel.app',
    status: {
      en: 'Live',
      id: 'Online',
    },
  },
  {
    id: 'business-compete',
    title: 'BizComp AI',
    summary: {
      en: 'Multi-agent AI system for automated business competitor analysis. Uses CrewAI with sequential agents: Researcher → Analyst → Writer.',
      id: 'Sistem AI multi-agent untuk analisis kompetitor bisnis otomatis. Menggunakan CrewAI dengan agen sekuensial: Researcher → Analyst → Writer.',
    },
    category: { en: 'AI Platform', id: 'Platform AI' },
    categoryKey: 'ai',
    role: {
      en: 'AI Developer',
      id: 'AI Developer',
    },
    stack: ['Python', 'CrewAI', 'FastAPI', 'Next.js', 'PostgreSQL'],
    description: {
      en: 'Provides SWOT, Five Forces, PESTEL analysis and brand strategy reports with export to Markdown, HTML, and PDF.',
      id: 'Menyediakan analisis SWOT, Five Forces, PESTEL dan laporan strategi merek dengan ekspor ke Markdown, HTML, dan PDF.',
    },
    contribution: {
      en: 'Architecture design, agent pipeline, LLM integration, and full-stack implementation.',
      id: 'Desain arsitektur, pipeline agen, integrasi LLM, dan implementasi full-stack.',
    },
    image: './images/projects/business-compete.webp',
    githubUrl: 'https://github.com/aryomulyadi/business_compete',
    liveUrl: null,
    status: {
      en: 'Open Source',
      id: 'Open Source',
    },
  },
]
