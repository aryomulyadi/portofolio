import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * NFR-02: preload the two critical fonts (Archivo variable latin, Inter 400)
 * with their real hashed asset names; mono/secondary weights stay lazy.
 */
function preloadKeyFonts(): Plugin {
  return {
    name: 'preload-key-fonts',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html
        const names = Object.keys(ctx.bundle)
        const archivo = names.find((n) => /archivo-latin-wdth-normal.*\.woff2$/.test(n))
        const inter400 = names.find((n) => /inter-latin-400-normal.*\.woff2$/.test(n))
        const links = [archivo, inter400]
          .filter((n): n is string => Boolean(n))
          .map(
            (n) =>
              `<link rel="preload" as="font" type="font/woff2" crossorigin href="./${ctx.bundle![n].fileName}">`,
          )
        if (links.length === 0) return html
        return html.replace('</head>', `  ${links.join('\n  ')}\n  </head>`)
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), preloadKeyFonts()],
  base: './',
})
