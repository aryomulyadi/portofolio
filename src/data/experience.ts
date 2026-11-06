import type { ExperienceEntry } from '../types'

/** Verified experience — chronological order (career progression). */
export const experience: ExperienceEntry[] = [
  {
    id: 'banjar-custom',
    organization: 'Banjar Custom',
    role: {
      id: 'Lead Graphic Designer',
      en: 'Lead Graphic Designer',
    },
    period: {
      id: '2023 – Sekarang',
      en: '2023 – Present',
    },
    location: {
      id: 'Banjarmasin, Kalimantan Selatan, Indonesia · Jarak jauh',
      en: 'Banjarmasin, South Kalimantan, Indonesia · Remote',
    },
    status: {
      id: 'Saat ini',
      en: 'Currently',
    },
    bullets: [
      {
        id: 'Mengembangkan desain apparel pre-production menyeluruh (kaos, jersey, kemeja), mengelola proses dari konsep pelanggan hingga aset visual siap cetak untuk screen printing.',
        en: 'Developed comprehensive pre-production apparel designs (t-shirts, jerseys, shirts), managing end-to-end from customer concepts to print-ready visual assets for screen printing.',
      },
      {
        id: 'Mengelola akun Instagram perusahaan (@banjarcustom.konveksi.id), mengubah file desain mentah menjadi aset visual siap unggah untuk menata feed portofolio digital yang profesional.',
        en: 'Managed the company Instagram account (@banjarcustom.konveksi.id), transforming raw design files into polished visual assets to curate a professional digital portfolio feed.',
      },
      {
        id: 'Mengembangkan situs resmi Banjar Custom sebagai katalog digital dan pusat informasi bisnis, dengan sistem pelacakan dan manajemen pesanan operasional yang digunakan administrator.',
        en: 'Developed the official Banjar Custom website as a professional digital catalog and business hub, integrating an operational order-tracking and management system used by administrators.',
      },
    ],
    evidence: null,
    url: 'https://banjarcustom.com',
  },
  {
    id: 'mongky-clothing',
    organization: 'Mongky Clothing',
    role: {
      id: 'Desainer Grafis (Magang)',
      en: 'Graphic Designer (Intern)',
    },
    period: {
      id: '2021 – 2022',
      en: '2021 – 2022',
    },
    location: {
      id: 'Banjarmasin, Kalimantan Selatan, Indonesia',
      en: 'Banjarmasin, South Kalimantan, Indonesia',
    },
    status: null,
    bullets: [
      {
        id: 'Merancang desain grafis dan apparel sesuai brief serta permintaan klien.',
        en: 'Designed graphics and apparel according to client briefs and requests.',
      },
      {
        id: 'Mengelola tata letak visual pada platform toko daring perusahaan.',
        en: 'Managed visual layouts on the company online store platform.',
      },
      {
        id: 'Memproduksi materi promosi komersial, termasuk poster produk dan materi kampanye iklan.',
        en: 'Produced commercial promotional materials, including product posters and advertising campaign assets.',
      },
    ],
    evidence: null,
    url: null,
  },
]
