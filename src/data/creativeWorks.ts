import type { CreativeWork } from '../types'

/**
 * Creative work exhibition database.
 * Organized strictly into 5 Pages / Chapters:
 * PAGE 01 — APPAREL (3 works: 16:9, 4:5, 4:5)
 * PAGE 02 — DIGITAL POSTER (3 works: 16:9, 16:9, 5:4)
 * PAGE 03 — SOCIAL MEDIA (1 work: 4:5)
 * PAGE 04 — BANNER (1 work: 4:5)
 * PAGE 05 — UI/UX (2 works: 16:9, 16:9)
 */
export const creativeWorks: CreativeWork[] = [
  // PAGE 01 — APPAREL
  {
    id: 'thread-graphic',
    title: { id: 'Jersey', en: 'Jersey' },
    category: 'apparel',
    categoryLabel: { id: 'Apparel', en: 'Apparel' },
    image: './images/creative/apparel-thread.png',
    aspect: '16/9',
    caption: {
      id: 'Merancang desain apparel jersey dengan detail fully vector',
      en: 'Designing jersey apparel design with fully vector details.',
    },
    year: '2026',
    software: ['CorelDRAW', 'Photoshop'],
    process: {
      id: 'Desain dibuat terbatas dua warna tinta agar cocok untuk sablon manual, dengan garis tebal agar tidak hilang di kain knit.',
      en: 'Limited to two ink colors for manual screen printing, with thick lines so nothing disappears on knit fabric.',
    },
    result: {
      id: 'Grafik yang terbaca dari jauh dan stabil saat dicetak ulang batch kecil.',
      en: 'A graphic that reads from a distance and stays stable across small reprint batches.',
    },
  },
  {
    id: 'overprint-graphic',
    title: { id: 'Simulated Model', en: 'Simulated Model' },
    category: 'apparel',
    categoryLabel: { id: 'Apparel', en: 'Apparel' },
    image: './images/creative/apparel-overprint.png',
    aspect: '4/5',
    caption: {
      id: 'Simulasi untuk mockup realistis model raglan.',
      en: 'Simulated model for realistic raglan mockup.',
    },
    year: '2026',

    process: {
      id: 'Dua plat warna dicetak terpisah lalu digeser beberapa milimeter — kesalahan registrasi justru menjadi bahasa visual utama.',
      en: 'Two color plates printed separately and shifted a few millimeters — the registration error itself became the main visual language.',
    },
    result: {
      id: 'Grafik yang terasa hand-made dan tidak bisa direplikasi persis oleh mesin digital.',
      en: 'A graphic that feels hand-made and cannot be exactly replicated by a digital press.',
    },
  },
  {
    id: 'Regular-fit-graphic',
    title: { id: 'Simulated Model', en: 'Simulated Model' },
    category: 'apparel',
    categoryLabel: { id: 'Apparel', en: 'Apparel' },
    image: './images/creative/apparel-backline.png',
    aspect: '4/5',
    caption: {
      id: 'Simulasi untuk mockup realistis model reguler.',
      en: 'Simulated model for realistic regular fit mockup.',
    },
    year: '2026',

    process: {
      id: 'Komposisi vertikal disusun agar tetap seimbang saat dipotong untuk sablon punggung, dengan jarak aman di bagian leher.',
      en: 'A vertical composition balanced for a back-print cut, with safe spacing near the collar.',
    },
    result: {
      id: 'Satu grafik yang bekerja baik di kaos gelap maupun terang tanpa harus ganti tinta.',
      en: 'One graphic that works on dark and light tees without an ink swap.',
    },
  },

  // PAGE 02 — DIGITAL POSTER
  {
    id: 'horizon-poster',
    title: { id: 'Digital Poster Printing', en: 'Digital Poster Printing' },
    category: 'digital-poster',
    categoryLabel: { id: 'Poster digital', en: 'Digital poster' },
    image: './images/creative/poster-horizon.png',
    aspect: '16/9',
    caption: {
      id: 'Poster digital untuk iklan dengan sentuhan menarik.',
      en: 'Digital poster for advertising with an appealing touch.',
    },
    year: '2025',
    software: ['Affinity Design', 'Illustrator', 'Photoshop', 'canva'],
    process: {
      id: 'Riset warna matahari terbit, lalu penyusunan bentuk lanskap dari tiga lapis gradien. Tipografi diuji pada tiga skala berbeda.',
      en: 'Sunrise color research, then landscape shapes built from three gradient layers. Typography was tested at three scales.',
    },
    result: {
      id: 'Seri poster yang tenang tapi tetap kontras, siap untuk cetak A2 maupun unggahan vertikal.',
      en: 'A calm yet high-contrast poster series, ready for A2 print and vertical posts.',
    },
  },
  {
    id: 'orbit-poster',
    title: { id: 'Digital Poster Printing #2', en: 'Digital Poster Printing #2' },
    category: 'digital-poster',
    categoryLabel: { id: 'Poster digital', en: 'Digital poster' },
    image: './images/creative/poster-orbit.png',
    aspect: '16/9',
    caption: {
      id: 'Poster digital untuk iklan dengan sentuhan menarik.',
      en: 'Digital poster for advertising with an appealing touch.',
    },
    year: '2026',
    software: ['Affinity Design', 'Illustrator', 'Photoshop', 'canva'],
    process: {
      id: 'Eksplorasi grid bundar dan rotasi bertahap. Setiap bentuk diuji pada posisi berbeda untuk menemukan ritme visual.',
      en: 'Circular grid and stepped-rotation exploration. Each shape was tested in different positions to find visual rhythm.',
    },
    result: {
      id: 'Komposisi yang bergerak tanpa acak — ritme bentuk mengarahkan mata dari pusat ke tepi.',
      en: 'A composition that feels in motion without being random — shape rhythm guides the eye from center to edge.',
    },
  },
  {
    id: 'palette-grid',
    title: { id: 'Digital Magazine Design', en: 'Digital Magazine Design' },
    category: 'digital-poster',
    categoryLabel: { id: 'Poster digital', en: 'Digital poster' },
    image: './images/creative/poster-grid.png',
    aspect: '5/4',
    caption: {
      id: 'portofolio pribadi untuk desain majalah digital.',
      en: 'Personal portfolio for digital magazine design.',
    },
    year: '2025',
    software: ['Affinity Design', 'Illustrator', 'Photoshop', 'canva'],
    process: {
      id: 'Menyusun modul grid 8 kolom lalu menguji pasangan warna pada kontras teks dan latar sesuai WCAG AA.',
      en: 'Built an 8-column grid module, then tested color pairs for text/background contrast against WCAG AA.',
    },
    result: {
      id: 'Sistem identitas yang konsisten: satu grid, satu palet, banyak format.',
      en: 'A consistent identity system: one grid, one palette, many formats.',
    },
  },

  // PAGE 03 — SOCIAL MEDIA
  {
    id: 'pulse-campaign',
    title: { id: 'Feed Designs', en: 'Feed Designs' },
    category: 'social',
    categoryLabel: { id: 'Media sosial', en: 'Social media' },
    image: './images/creative/social-pulse.png',
    aspect: '4/5',
    caption: {
      id: 'Materi desain feed untuk kanal sosial resmi @nanang.bag.',
      en: 'Feed design assets for official social channels of @nanang.bag.',
    },
    year: '2026',
    platform: 'Instagram',
    software: ['Canva', 'CorelDRAW', 'Photoshop'],
    process: {
      id: 'Template 4:5 dengan safe area untuk UI platform. Elemen animasi ringan diuji agar tetap terbaca dalam potongan tiga detik.',
      en: 'A 4:5 template with platform-UI safe areas. Light motion elements were tested to stay readable in three-second cuts.',
    },
    result: {
      id: 'Paket materi kampanye yang bisa diperluas tim tanpa mengubah sistem visual dasar.',
      en: 'A campaign asset package the team can extend without changing the foundational visual system.',
    },
  },

  // PAGE 04 — BANNER
  {
    id: 'mark-system',
    title: { id: 'Exhibition Banner', en: 'Exhibition Banner' },
    category: 'banner',
    categoryLabel: { id: 'Banner', en: 'Banner' },
    image: './images/creative/banner-mark.png',
    aspect: '4/5',
    caption: {
      id: 'Banner professional untuk acara instansi dan komunitas.',
      en: 'Professional banner   for institutional and community events.',
    },
    year: '2025',
    software: ['CorelDRAW', 'Canva', 'Photoshop'],
    result: {
      id: 'Lambang final yang stabil di 16px dan tetap tegas saat diperbesar pada signage pameran.',
      en: 'A final mark that holds up at 16px and stays bold when scaled up on exhibition signage.',
    },
  },
]
