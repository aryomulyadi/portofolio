import type { CreativeWork } from '../types'

/**
 * Creative work — owner adds real artwork here.
 * Use actual artwork files under /public/images/creative/.
 * Keep array empty to hide the section.
 * Sources live in /scripts/artwork-src/ (render via scripts/render-creative-png.ps1).
 * Array order = strip order, grouped by chapter: apparel → digital poster → social → banner → ui.
 * `aspect` must match the artwork file's native ratio (tiles/stage show it uncropped).
 * `process` / `result` feed the fullscreen case-study view (optional).
 */
export const creativeWorks: CreativeWork[] = [
  {
    id: 'thread-graphic',
    title: { id: 'Thread', en: 'Thread' },
    category: 'apparel',
    categoryLabel: { id: 'Apparel', en: 'Apparel' },
    image: './images/creative/apparel-thread.png',
    aspect: '16/9',
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
    process: {
      id: 'Komposisi vertikal disusun agar tetap seimbang saat dipotong untuk sablon punggung, dengan jarak aman di bagian leher.',
      en: 'A vertical composition balanced for a back-print cut, with safe spacing near the collar.',
    },
    result: {
      id: 'Satu grafik yang bekerja baik di kaos gelap maupun terang tanpa harus ganti tinta.',
      en: 'One graphic that works on dark and light tees without an ink swap.',
    },
  },
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
    category: 'digital-poster',
    categoryLabel: { id: 'Poster digital', en: 'Digital poster' },
    image: './images/creative/poster-orbit.png',
    aspect: '16/9',
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
    aspect: '4/5',
    caption: {
      id: 'Materi kampanye vertikal untuk kanal sosial.',
      en: 'Vertical campaign assets for social channels.',
    },
    year: '2026',
    process: {
      id: 'Template 4:5 dengan safe area untuk UI platform. Elemen animasi ringan diuji agar tetap terbaca dalam potongan tiga detik.',
      en: 'A 4:5 template with platform-UI safe areas. Light motion elements were tested to stay readable in three-second cuts.',
    },
    result: {
      id: 'Paket materi kampanye yang bisa diperluas tim tanpa mengubah sistem visual.',
      en: 'A campaign asset package the team can extend without changing the visual system.',
    },
  },
  {
    id: 'mark-system',
    title: { id: 'Mark 03', en: 'Mark 03' },
    category: 'banner',
    categoryLabel: { id: 'Banner', en: 'Banner' },
    image: './images/creative/banner-mark.png',
    aspect: '4/5',
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
    id: 'ui-concept',
    title: { id: 'UI Concept', en: 'UI Concept' },
    category: 'ui',
    categoryLabel: { id: 'UI/UX', en: 'UI/UX' },
    image: './images/creative/ui-concept.png',
    aspect: '16/9',
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
  {
    id: 'analytics-concept',
    title: { id: 'Analytics', en: 'Analytics' },
    category: 'ui',
    categoryLabel: { id: 'UI/UX', en: 'UI/UX' },
    image: './images/creative/ui-analytics.png',
    aspect: '16/9',
    caption: {
      id: 'Konsep dasbor analitik dengan fokus pada hierarki metrik.',
      en: 'Analytics dashboard concept focused on metric hierarchy.',
    },
    year: '2026',
    process: {
      id: 'Empat KPI dipetakan ke satu layar: angka besar dulu, grafik 30 hari menyusul, komposisi trafik di panel kanan.',
      en: 'Four KPIs mapped to one screen: big numbers first, 30-day chart second, traffic mix in the right panel.',
    },
    result: {
      id: 'Layar yang bisa dipindai dari jarak satu meter — penting untuk mode TV tim.',
      en: 'A screen scannable from a meter away — built for the team TV mode.',
    },
  },
]
