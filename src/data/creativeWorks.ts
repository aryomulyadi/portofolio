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
    image: './images/creative/apparel-thread.webp',
    thumb: './images/creative/thumbs/apparel-thread.webp',
    aspect: '16/9',
    caption: {
      id: 'Merancang desain apparel jersey dengan detail fully vector',
      en: 'Designing jersey apparel design with fully vector details.',
    },
    year: '2026',
    software: ['CorelDRAW', 'Photoshop'],
    process: {
      id: 'Setiap jersey dirancang dengan ilustrasi berbasis vektor penuh, menampilkan pola yang presisi, garis bersih, dan kombinasi warna yang seimbang. Setiap elemen, dari grafis hingga tipografi, dirancang untuk memastikan detail tajam, skalabilitas, dan kualitas siap produksi.',
      en: 'Each jersey is carefully crafted using fully vector-based illustrations, featuring precise patterns, clean linework, and well-balanced color combinations. Every element, from graphics to typography, is designed to ensure sharp details, scalability, and production-ready quality.',
    },
    result: {
      id: 'Koleksi desain jersey yang khas dan berkualitas tinggi dengan detail vektor yang tajam, warna yang hidup, dan komposisi visual yang konsisten. Setiap desain memberikan identitas unik sambil mempertahankan kejelasan dan kualitas di berbagai ukuran dan kebutuhan produksi.',
      en: 'A collection of distinctive, high-quality jersey designs with crisp vector details, vibrant colors, and consistent visual composition. Each design delivers a unique identity while maintaining clarity and quality across different sizes and production needs.',
    },
  },
  {
    id: 'overprint-graphic',
    title: { id: 'Simulated Model', en: 'Simulated Model' },
    category: 'apparel',
    categoryLabel: { id: 'Apparel', en: 'Apparel' },
    image: './images/creative/apparel-overprint.webp',
    thumb: './images/creative/thumbs/apparel-overprint.webp',
    aspect: '4/5',
    caption: {
      id: 'Simulasi 3D untuk mockup jersey raglan yang realistis.',
      en: '3D Simulation for a Realistic Raglan Jersey Mockup.',
    },
    year: '2026',

    process: {
      id: 'Simulasi 3D untuk mockup jersey raglan yang realistis.',
      en: 'A 3D-rendered model was used to visualize the jersey design, carefully applying its patterns, colors, and graphic elements to the garment surface. Fabric textures, natural folds, stitching, and lighting were incorporated to create a realistic appearance.',
    },
    result: {
      id: 'Simulasi 3D untuk mockup jersey raglan yang realistis.',
      en: 'A realistic, high-quality 3D jersey mockup that showcases the design as it would appear when worn, highlighting its details, colors, fit, and overall garment construction.',
    },
  },
  {
    id: 'Regular-fit-graphic',
    title: { id: 'Simulated Model', en: 'Simulated Model' },
    category: 'apparel',
    categoryLabel: { id: 'Apparel', en: 'Apparel' },
    image: './images/creative/apparel-backline.webp',
    thumb: './images/creative/thumbs/apparel-backline.webp',
    aspect: '4/5',
    caption: {
      id: 'Simulasi 3D untuk mockup jersey model reguler yang realistis.',
      en: '3D Simulation for a Realistic Regular-Fit Jersey Mockup.',
    },
    year: '2026',

    process: {
      id: 'Simulasi 3D untuk mockup jersey model reguler yang realistis.',
      en: 'A 3D-rendered model was used to showcase the jersey in a regular-fit silhouette, incorporating realistic fabric textures, natural folds, stitching details, and carefully positioned graphic elements. The design was refined to highlight the color contrast, collar shape, sleeve details, and overall garment proportions.',
    },
    result: {
      id: 'Simulasi 3D untuk mockup jersey model reguler yang realistis.',
      en: 'A realistic, high-quality 3D jersey mockup that showcases the design as it would appear when worn, highlighting its details, colors, fit, and overall garment construction.',
    },
  },

  // PAGE 02 — DIGITAL POSTER
  {
    id: 'horizon-poster',
    title: { id: 'Digital Poster Printing', en: 'Digital Poster Printing' },
    category: 'digital-poster',
    categoryLabel: { id: 'Poster digital', en: 'Digital poster' },
    image: './images/creative/poster-horizon.webp',
    thumb: './images/creative/thumbs/poster-horizon.webp',
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
    image: './images/creative/poster-orbit.webp',
    thumb: './images/creative/thumbs/poster-orbit.webp',
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
    image: './images/creative/poster-grid.webp',
    thumb: './images/creative/thumbs/poster-grid.webp',
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
    image: './images/creative/social-pulse.webp',
    thumb: './images/creative/thumbs/social-pulse.webp',
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
    image: './images/creative/banner-mark.webp',
    thumb: './images/creative/thumbs/banner-mark.webp',
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

  // PAGE 05 — UI/UX
  {
    id: 'ui-concept',
    title: { id: 'Fintech Analytics Dashboard', en: 'Fintech Analytics Dashboard' },
    category: 'ui',
    categoryLabel: { id: 'UI/UX', en: 'UI/UX' },
    image: './images/creative/ui-concept.webp',
    thumb: './images/creative/thumbs/ui-concept.webp',
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
    image: './images/creative/ui-analytics.webp',
    thumb: './images/creative/thumbs/ui-analytics.webp',
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
