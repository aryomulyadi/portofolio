import type { CreativeWork } from '../types'

/**
 * Creative work — owner adds real artwork here.
 * Use actual artwork files under /public/images/creative/.
 * Keep array empty to hide the section.
 * Current entries use placeholder SVGs — swap image paths when real artwork lands.
 * `process` / `result` feed the fullscreen case-study view (optional).
 */
export const creativeWorks: CreativeWork[] = [
  {
    id: 'horizon-poster',
    title: { id: 'Horizon', en: 'Horizon' },
    category: 'poster',
    categoryLabel: { id: 'Poster', en: 'Poster' },
    image: './images/creative/poster-horizon.png',
    caption: {
      id: 'Studi gradien lanskap untuk seri poster editorial.',
      en: 'Landscape gradient study for an editorial poster series.',
    },
    year: '2026',
    process: {
      id: 'Riset warna matahari terbit, lalu penyusunan bentuk lanskap dari tiga lapis gradien. Tipografi diuji pada tiga skala berbeda sebelum dipilih satu ukuran display.',
      en: 'Sunrise color research, then landscape shapes built from three gradient layers. Typography was tested at three scales before settling on one display size.',
    },
    result: {
      id: 'Seri poster yang tenang tapi tetap kontras, siap untuk cetak A2 maupun unggahan vertikal.',
      en: 'A calm yet high-contrast poster series, ready for A2 print and vertical posts.',
    },
  },
  {
    id: 'orbit-poster',
    title: { id: 'Orbit', en: 'Orbit' },
    category: 'poster',
    categoryLabel: { id: 'Poster', en: 'Poster' },
    image: './images/creative/poster-orbit.png',
    caption: {
      id: 'Komposisi geometris dengan fokus ritme dan kontras.',
      en: 'Geometric composition focused on rhythm and contrast.',
    },
    year: '2026',
    process: {
      id: 'Eksplorasi grid bundar dan rotasi bertahap. Setiap bentuk diuji pada posisi berbeda untuk menemukan ritme visual tanpa kehilangan titik fokus.',
      en: 'Circular grid and stepped-rotation exploration. Each shape was tested in different positions to find visual rhythm without losing the focal point.',
    },
    result: {
      id: 'Komposisi yang bergerak tanpa acak — ritme bentuk mengarahkan mata dari pusat ke tepi.',
      en: 'A composition that feels in motion without being random — shape rhythm guides the eye from center to edge.',
    },
  },
  {
    id: 'mark-system',
    title: { id: 'Mark 03', en: 'Mark 03' },
    category: 'branding',
    categoryLabel: { id: 'Branding', en: 'Branding' },
    image: './images/creative/brand-mark.png',
    caption: {
      id: 'Eksplorasi lambang merek berbasis bentuk segitiga.',
      en: 'Triangle-based brand mark exploration.',
    },
    year: '2025',
    process: {
      id: 'Dua puluh varian segitiga disaring lewat tiga kriteria: keterbacaan ukuran kecil, simetri, dan kemudahan reproduksi satu warna.',
      en: 'Twenty triangle variants filtered by three criteria: small-size legibility, symmetry, and single-color reproducibility.',
    },
    result: {
      id: 'Lambang final yang stabil di 16px dan tetap tegas saat diperbesar pada signage.',
      en: 'A final mark that holds up at 16px and stays bold when scaled up on signage.',
    },
  },
  {
    id: 'palette-grid',
    title: { id: 'Palette Grid', en: 'Palette Grid' },
    category: 'branding',
    categoryLabel: { id: 'Branding', en: 'Branding' },
    image: './images/creative/brand-grid.png',
    caption: {
      id: 'Sistem grid dan palet warna untuk identitas visual.',
      en: 'Grid and color-palette system for a visual identity.',
    },
    year: '2025',
    process: {
      id: 'Menyusun modul grid 8 kolom lalu menguji pasangan warna pada kontras teks dan latar sesuai WCAG AA.',
      en: 'Built an 8-column grid module, then tested color pairs for text/background contrast against WCAG AA.',
    },
    result: {
      id: 'Sistem identitas yang konsisten: satu grid, satu palet, banyak format.',
      en: 'A consistent identity system: one grid, one palette, many formats.',
    },
  },
  {
    id: 'pulse-campaign',
    title: { id: 'Pulse', en: 'Pulse' },
    category: 'social',
    categoryLabel: { id: 'Media sosial', en: 'Social media' },
    image: './images/creative/social-pulse.png',
    caption: {
      id: 'Materi kampanye vertikal untuk kanal sosial.',
      en: 'Vertical campaign assets for social channels.',
    },
    year: '2026',
    process: {
      id: 'Template 9:16 dengan safe area untuk UI platform. Elemen animasi ringan diuji agar tetap terbaca dalam potongan tiga detik.',
      en: 'A 9:16 template with platform-UI safe areas. Light motion elements were tested to stay readable in three-second cuts.',
    },
    result: {
      id: 'Paket materi kampanye yang bisa diperluas tim tanpa mengubah sistem visual.',
      en: 'A campaign asset package the team can extend without changing the visual system.',
    },
  },
  {
    id: 'countdown-post',
    title: { id: 'Countdown 45', en: 'Countdown 45' },
    category: 'social',
    categoryLabel: { id: 'Media sosial', en: 'Social media' },
    image: './images/creative/social-countdown.png',
    caption: {
      id: 'Template hitung mundur dengan tipografi berani.',
      en: 'Countdown template with bold typography.',
    },
    year: '2026',
    process: {
      id: 'Variasi angka besar dengan hierarki jam, menit, detik. Latar gelap dipilih agar komposisi tetap terbaca di feed terang maupun gelap.',
      en: 'Large-numeral variations with hour/minute/second hierarchy. A dark background keeps the composition readable in both light and dark feeds.',
    },
    result: {
      id: 'Template siap pakai yang hanya perlu ganti angka untuk setiap rilis.',
      en: 'A ready-to-use template that only needs a number swap for every release.',
    },
  },
  {
    id: 'thread-graphic',
    title: { id: 'Thread', en: 'Thread' },
    category: 'apparel',
    categoryLabel: { id: 'Apparel', en: 'Apparel' },
    image: './images/creative/apparel-thread.png',
    caption: {
      id: 'Grafik sablon untuk koleksi pakaian experimental.',
      en: 'Screen-print graphic for an experimental apparel drop.',
    },
    year: '2025',
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
    id: 'ui-concept',
    title: { id: 'UI Concept', en: 'UI Concept' },
    category: 'ui',
    categoryLabel: { id: 'UI', en: 'UI' },
    image: './images/creative/ui-concept.png',
    caption: {
      id: 'Konsep antarmuka dashboard dengan data visual.',
      en: 'Dashboard interface concept with data visualization.',
    },
    year: '2026',
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
