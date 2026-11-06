import { useCallback, useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'

interface PreviewState {
  visible: boolean
  x: number
  y: number
  src: string | null
  alt: string
}

/**
 * Image preview that follows the pointer over project rows.
 * Disabled for coarse pointers / reduced motion — not a custom cursor.
 */
export function usePointerPreview() {
  const [preview, setPreview] = useState<PreviewState>({
    visible: false,
    x: 0,
    y: 0,
    src: null,
    alt: '',
  })
  const frameRef = useRef(0)
  const enabledRef = useRef(false)

  useEffect(() => {
    enabledRef.current =
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const onPointerMove = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (!enabledRef.current) return
    const clientX = event.clientX
    const clientY = event.clientY
    cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      setPreview((prev) => ({
        ...prev,
        visible: prev.src !== null,
        x: clientX,
        y: clientY,
      }))
    })
  }, [])

  const show = useCallback((src: string, alt: string) => {
    if (!enabledRef.current) return
    // visible stays false until the first pointermove provides real coords
    setPreview((prev) => ({ ...prev, src, alt, visible: false }))
  }, [])

  const hide = useCallback(() => {
    cancelAnimationFrame(frameRef.current)
    setPreview((prev) => ({ ...prev, visible: false }))
  }, [])

  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])

  return { preview, onPointerMove, show, hide }
}
