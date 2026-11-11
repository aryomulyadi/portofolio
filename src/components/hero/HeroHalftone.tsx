import { useEffect, useRef } from 'react'

const SP = 24
const FINE = '(hover: hover) and (pointer: fine)'
const REDUCED = '(prefers-reduced-motion: reduce)'

/**
 * v3 halftone field: grey dot grid with a pointer-following red bloom.
 * Static single paint for touch / reduced motion; rAF-smoothed otherwise.
 */
export function HeroHalftone() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const hero = canvas.parentElement
    if (!hero) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const fine = window.matchMedia(FINE).matches
    const reduced = window.matchMedia(REDUCED).matches
    const animate = fine && !reduced

    const styles = getComputedStyle(document.documentElement)
    const grey = styles.getPropertyValue('--color-grey').trim() || '#A5A5A0'
    const red = styles.getPropertyValue('--color-signal').trim() || '#D52B1E'

    let width = 0
    let height = 0
    let targetX = -999
    let targetY = -999
    let smoothX = -999
    let smoothY = -999
    let dirty = true
    let visible = true
    let frame = 0

    const paint = () => {
      ctx.clearRect(0, 0, width, height)
      for (let y = SP / 2; y < height; y += SP) {
        for (let x = SP / 2; x < width; x += SP) {
          const k = Math.max(0, 1 - Math.hypot(x - smoothX, y - smoothY) / 190)
          ctx.fillStyle = k > 0.35 ? red : grey
          ctx.beginPath()
          ctx.arc(x, y, 1.1 + k * k * 6, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const resize = () => {
      const rect = hero.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dirty = true
    }

    const loop = () => {
      frame = requestAnimationFrame(loop)
      if (!visible) return
      const moved =
        Math.abs(targetX - smoothX) > 0.5 || Math.abs(targetY - smoothY) > 0.5
      if (dirty || moved) {
        smoothX += (targetX - smoothX) * 0.18
        smoothY += (targetY - smoothY) * 0.18
        if (targetX < 0) smoothX = targetX
        paint()
        dirty = false
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect()
      targetX = event.clientX - rect.left
      targetY = event.clientY - rect.top
    }

    const onPointerLeave = () => {
      targetX = -999
      targetY = -999
      dirty = true
    }

    resize()
    const io = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting)
      if (visible) dirty = true
    })
    io.observe(hero)

    window.addEventListener('resize', resize)

    if (animate) {
      hero.addEventListener('pointermove', onPointerMove, { passive: true })
      hero.addEventListener('pointerleave', onPointerLeave)
      frame = requestAnimationFrame(loop)
    } else {
      paint()
    }

    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      window.removeEventListener('resize', resize)
      hero.removeEventListener('pointermove', onPointerMove)
      hero.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{
        maskImage: 'linear-gradient(90deg, transparent 38%, #000 72%)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 38%, #000 72%)',
      }}
    />
  )
}
