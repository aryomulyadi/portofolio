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
      id: 'Setiap poster dikembangkan berdasarkan tujuan komunikasi spesifiknya, menggabungkan visual yang menarik, palet warna yang dipilih dengan cermat, dan tipografi yang terstruktur dengan baik. Tata letak dan elemen visual disusun secara strategis untuk membangun hierarki informasi yang jelas, memastikan pesan utama menarik, mudah dibaca, dan mudah dipahami.',
      en: 'Each poster is developed around its specific communication objectives, combining eye-catching visuals, carefully selected color palettes, and well-structured typography. Layouts and visual elements are strategically arranged to establish a clear information hierarchy, ensuring that key messages are engaging, readable, and easy to understand.',
    },
    result: {
      id: 'Koleksi poster digital yang menarik secara visual, dirancang untuk berbagai tujuan, mulai dari iklan komersial dan kampanye edukasi hingga konten promosi. Setiap desain memberikan dampak visual yang kuat, menyampaikan pesannya secara efektif, dan dapat disesuaikan untuk platform digital maupun media cetak.',
      en: 'A collection of visually compelling digital posters designed for different purposes, from commercial advertising and educational campaigns to promotional content. Each design delivers a strong visual impact, communicates its message effectively, and is adaptable for both digital platforms and print media.',
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
      id: 'Mengembangkan tata letak editorial yang terstruktur menggunakan sistem grid yang konsisten untuk mengatur judul, teks isi, dan fotografi otomotif. Tipografi, palet warna, penempatan gambar, dan spasi disempurnakan dengan cermat untuk membangun hierarki visual yang jelas sambil mempertahankan keterbacaan dan gaya editorial yang kohesif di berbagai halaman majalah.',
      en: 'Developed a structured editorial layout using a consistent grid system to organize headlines, body text, and automotive photography. Typography, color palettes, image placement, and spacing were carefully refined to establish a clear visual hierarchy while maintaining readability and a cohesive editorial style across multiple magazine spreads.',
    },
    result: {
      id: 'Majalah digital otomotif yang menarik secara visual menampilkan tata letak editorial profesional, komposisi seimbang, dan identitas visual yang konsisten. Setiap halaman menggabungkan citra otomotif yang berdampak dengan konten yang terorganisir dengan baik, menciptakan pengalaman membaca yang imersif dengan estetika yang halus dan modern.',
      en: 'A visually engaging automotive digital magazine featuring professional editorial layouts, balanced compositions, and consistent visual identity. Each spread combines impactful automotive imagery with well-organized content, creating an immersive reading experience with a polished and modern aesthetic.',
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
      id: 'Desain feed media sosial untuk @nanang.bag.',
      en: 'Social Media Feed Designs for @nanang.bag.',
    },
    year: '2026',
    platform: 'Instagram',
    software: ['Canva', 'CorelDRAW', 'Photoshop'],
    process: {
      id: 'Mengembangkan sistem desain media sosial yang konsisten menggunakan palet warna, tipografi, dan struktur tata letak yang kohesif. Fotografi produk, pesan promosi, dan elemen merek disusun dengan cermat untuk menciptakan visual yang menarik, membangun hierarki informasi yang jelas, dan mempertahankan konsistensi di setiap postingan.',
      en: 'Developed a consistent social media design system using a cohesive color palette, typography, and layout structure. Product photography, promotional messages, and brand elements were carefully arranged to create engaging visuals, establish clear information hierarchy, and maintain consistency across every post.',
    },
    result: {
      id: 'Koleksi desain feed media sosial yang kohesif dan menarik secara visual yang memperkuat identitas merek, menyoroti penawaran produk, dan menyampaikan pesan promosi secara efektif. Setiap postingan dirancang untuk menarik perhatian audiens sambil mempertahankan identitas visual yang dapat dikenali dan konsisten di seluruh platform digital @nanang.bag.',
      en: 'A cohesive collection of eye-catching social media feed designs that strengthens brand identity, highlights product offerings, and communicates promotional messages effectively. Each post is designed to capture audience attention while maintaining a recognizable and consistent visual identity across @nanang.bag’s digital platforms.',
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
    title: { id: 'Wara Wiri — Travel App UI/UX Design', en: 'Wara Wiri — Travel App UI/UX Design' },
    category: 'ui',
    categoryLabel: { id: 'UI/UX', en: 'UI/UX' },
    image: './images/creative/ui-concept.webp',
    thumb: './images/creative/thumbs/ui-concept.webp',
    aspect: '16/9',
    caption: {
      id: 'Konsep aplikasi perjalanan seluler yang dirancang untuk membantu pengguna menemukan destinasi, menjelajahi rekomendasi perjalanan, dan merencanakan petualangan berikutnya melalui antarmuka yang intuitif dan ramah pengguna.',
      en: 'A mobile travel application concept designed to help users discover destinations, explore travel recommendations, and plan their next adventures through an intuitive and user-friendly interface.',
    },
    year: '2026',
    software: ['Figma'],
    prototypeUrl: 'https://github.com/aryomulyadi/portofolio',
    problem: {
      id: 'Tantangannya adalah menciptakan aplikasi perjalanan yang intuitif yang menyederhanakan penemuan destinasi dan perencanaan perjalanan. Wara Wiri bertujuan untuk menghadirkan eksplorasi destinasi, rekomendasi perjalanan, informasi destinasi yang rinci, favorit yang disimpan, fungsi pencarian, dan profil pengguna ke dalam satu pengalaman seluler yang kohesif.',
      en: 'The challenge was to create an intuitive travel application that simplifies destination discovery and travel planning. Wara Wiri aims to bring destination exploration, travel recommendations, detailed destination information, saved favorites, search functionality, and user profiles into one cohesive mobile experience.',
    },
    research: {
      id: 'Penelitian menunjukkan bahwa pengguna menginginkan aplikasi perjalanan yang lebih sederhana dan intuitif.',
      en: 'Identified key application features and organized content into intuitive categories to support destination discovery. Established a clear information hierarchy to ensure users can access essential features and travel information efficiently.',
    },
    wireframes: {
      id: 'Arsitektur informasi modular 3 kolom dengan kartu KPI di bagian atas dan grafik tren utama di tengah.',
      en: 'Modular 3-column information architecture with KPI cards at the top and key trend charts in the middle.',
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
]
