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
    title: { id: 'Thread', en: 'Thread' },
    category: 'apparel',
    categoryLabel: { id: 'Apparel', en: 'Apparel' },
    image: './images/creative/apparel-thread.png',
    aspect: '16/9',
    caption: {
      id: 'Grafik sablon untuk koleksi pakaian eksperimental.',
      en: 'Screen-print graphic for an experimental apparel drop.',
    },
    year: '2025',
    software: ['Illustrator', 'Photoshop'],
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
    title: { id: 'Overprint', en: 'Overprint' },
    category: 'apparel',
    categoryLabel: { id: 'Apparel', en: 'Apparel' },
    image: './images/creative/apparel-overprint.png',
    aspect: '4/5',
    caption: {
      id: 'Eksperimen cetak ulang dengan lapisan warna yang sengaja meleset.',
      en: 'Overprint experiment with deliberately misregistered color plates.',
    },
    year: '2026',
    software: ['Illustrator', 'Print Simulation'],
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
    id: 'backline-graphic',
    title: { id: 'Backline', en: 'Backline' },
    category: 'apparel',
    categoryLabel: { id: 'Apparel', en: 'Apparel' },
    image: './images/creative/apparel-backline.png',
    aspect: '4/5',
    caption: {
      id: 'Grafik punggung untuk koleksi dua warna.',
      en: 'Back-print graphic for a two-color collection.',
    },
    year: '2026',
    software: ['Illustrator'],
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
    title: { id: 'Horizon', en: 'Horizon' },
    category: 'digital-poster',
    categoryLabel: { id: 'Poster digital', en: 'Digital poster' },
    image: './images/creative/poster-horizon.png',
    aspect: '16/9',
    caption: {
      id: 'Studi gradien lanskap untuk seri poster editorial.',
      en: 'Landscape gradient study for an editorial poster series.',
    },
    year: '2026',
    software: ['Illustrator', 'Photoshop'],
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
    title: { id: 'Orbit', en: 'Orbit' },
    category: 'digital-poster',
    categoryLabel: { id: 'Poster digital', en: 'Digital poster' },
    image: './images/creative/poster-orbit.png',
    aspect: '16/9',
    caption: {
      id: 'Komposisi geometris dengan fokus ritme dan kontras.',
      en: 'Geometric composition focused on rhythm and contrast.',
    },
    year: '2026',
    software: ['Illustrator'],
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
    title: { id: 'Palette Grid', en: 'Palette Grid' },
    category: 'digital-poster',
    categoryLabel: { id: 'Poster digital', en: 'Digital poster' },
    image: './images/creative/poster-grid.png',
    aspect: '5/4',
    caption: {
      id: 'Sistem grid dan palet warna untuk identitas visual.',
      en: 'Grid and color-palette system for a visual identity.',
    },
    year: '2025',
    software: ['Figma', 'Illustrator'],
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
    title: { id: 'Pulse Campaign', en: 'Pulse Campaign' },
    category: 'social',
    categoryLabel: { id: 'Media sosial', en: 'Social media' },
    image: './images/creative/social-pulse.png',
    aspect: '4/5',
    caption: {
      id: 'Materi kampanye vertikal untuk kanal sosial resmi.',
      en: 'Vertical campaign assets for official social channels.',
    },
    year: '2026',
    platform: 'Instagram, TikTok, LinkedIn',
    software: ['After Effects', 'Figma', 'Photoshop'],
    objective: {
      id: 'Meningkatkan kesadaran merek melalui visual bergerak pendek berdurasi 3-5 detik dengan tingkat retensi tinggi.',
      en: 'Boost brand awareness through high-retention short 3-5 second motion visuals.',
    },
    creativeDirection: {
      id: 'Sistem warna neon-mint dan biru elektrik di atas latar gelap, dipadukan tipografi bertumpuk yang berani.',
      en: 'Neon-mint and electric blue accents on dark background paired with bold stacked typography.',
    },
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
    title: { id: 'Mark 03 Exhibition Banner', en: 'Mark 03 Exhibition Banner' },
    category: 'banner',
    categoryLabel: { id: 'Banner', en: 'Banner' },
    image: './images/creative/banner-mark.png',
    aspect: '4/5',
    caption: {
      id: 'Eksplorasi lambang merek berbasis bentuk segitiga untuk spanduk pameran.',
      en: 'Triangle-based brand mark exploration for an exhibition banner.',
    },
    year: '2025',
    software: ['Illustrator', 'Dimension'],
    process: {
      id: 'Dua puluh varian segitiga disaring lewat tiga kriteria: keterbacaan ukuran kecil, simetri, dan kemudahan reproduksi satu warna.',
      en: 'Twenty triangle variants filtered by three criteria: small-size legibility, symmetry, and single-color reproducibility.',
    },
    result: {
      id: 'Lambang final yang stabil di 16px dan tetap tegas saat diperbesar pada signage pameran.',
      en: 'A final mark that holds up at 16px and stays bold when scaled up on exhibition signage.',
    },
  },

  // PAGE 05 — UI/UX
  {
    id: 'ui-concept',
    title: { id: 'Fintech Analytics Dashboard', en: 'Fintech Analytics Dashboard' },
    category: 'ui',
    categoryLabel: { id: 'UI/UX', en: 'UI/UX' },
    image: './images/creative/ui-concept.png',
    aspect: '16/9',
    caption: {
      id: 'Konsep antarmuka dashboard dengan data visual real-time.',
      en: 'Dashboard interface concept with real-time data visualization.',
    },
    year: '2026',
    software: ['Figma', 'React', 'Tailwind CSS'],
    prototypeUrl: 'https://github.com/aryomulyadi/portofolio',
    problem: {
      id: 'Pengguna merasa kewalahan dengan tampilan grafik keuangan konvensional yang padat dan lambat dipahami.',
      en: 'Users were overwhelmed by dense, slow-to-digest conventional financial charts.',
    },
    research: {
      id: 'Wawancara dengan 8 pengambil keputusan finansial menunjukkan kebutuhan akan angka kunci dalam 3 detik pertama.',
      en: 'Interviews with 8 financial decision-makers revealed a need for key figures within the first 3 seconds.',
    },
    wireframes: {
      id: 'Arsitektur informasi modular 3 kolom dengan kartu KPI di bagian atas dan grafik tren utama di tengah.',
      en: '3-column modular information architecture with top KPI cards and central primary trend charts.',
    },
    process: {
      id: 'Pemetaan hierarki data dulu — metrik utama selalu di atas, grafik sekunder menyusul. Mode gelap sebagai baseline agar aksen data menonjol.',
      en: 'Mapped data hierarchy first — key metrics always on top, secondary charts below. Dark mode as baseline so data accents pop.',
    },
    result: {
      id: 'Konsep dashboard yang bisa dipindai dalam lima detik: angka dulu, cerita kemudian.',
      en: 'A dashboard concept scannable in five seconds: numbers first, story second.',
    },
  },
  {
    id: 'analytics-concept',
    title: { id: 'Data Studio Control Center', en: 'Data Studio Control Center' },
    category: 'ui',
    categoryLabel: { id: 'UI/UX', en: 'UI/UX' },
    image: './images/creative/ui-analytics.png',
    aspect: '16/9',
    caption: {
      id: 'Konsep dasbor analitik dengan fokus pada hierarki metrik tim.',
      en: 'Analytics dashboard concept focused on team metric hierarchy.',
    },
    year: '2026',
    software: ['Figma', 'TypeScript', 'Recharts'],
    prototypeUrl: 'https://github.com/aryomulyadi/portofolio',
    problem: {
      id: 'Penyajian data lintas kanal tidak terpusat sehingga pemantauan kampanye menjadi tidak efisien.',
      en: 'Decentralized cross-channel data made campaign monitoring inefficient.',
    },
    research: {
      id: 'Audit UX pada 5 alat analitik populer menemukan kurangnya kontras visual pada mode pemantauan layar TV.',
      en: 'UX audit across 5 popular analytics tools identified poor visual contrast in TV-screen monitoring modes.',
    },
    wireframes: {
      id: 'Grid adaptif dengan kontras tinggi, widget donut chart khusus, dan bar chart yang konsisten.',
      en: 'Adaptive high-contrast grid featuring custom donut chart widgets and consistent bar charts.',
    },
    process: {
      id: 'Empat KPI dipetakan ke satu layar: angka besar dulu, grafik 30 hari menyusul, komposisi trafik di panel kanan.',
      en: 'Four KPIs mapped to one screen: big numbers first, 30-day chart second, traffic mix in the right panel.',
    },
    result: {
      id: 'Layar yang bisa dipindai dari jarak satu meter — penting untuk mode TV pameran tim.',
      en: 'A screen scannable from a meter away — built for team exhibition TV mode.',
    },
  },
]
