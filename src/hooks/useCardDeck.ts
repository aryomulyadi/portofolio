import { useCallback, useEffect, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from 'react'
import type { Project } from '../types'

export type ExitDir = 'next' | 'prev' | null

interface DragState {
  x: number
  y: number
  rotate: number
  active: boolean
}

const EXIT_MS = 400
const DRAG_START_PX = 4

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

/**
 * Infinite-ish project deck: swipe / buttons / keyboard cycle front card.
 * Right → next, left → previous. Drag maps to natural rotation.
 * Guards coarse pointers are handled by CSS touch-action; reduced motion skips exit anim.
 */
export function useCardDeck(projects: Project[]) {
  const ids = projects.map((p) => p.id)
  const idsKey = ids.join('|')

  const [order, setOrder] = useState<string[]>(ids)
  const [drag, setDrag] = useState<DragState>({ x: 0, y: 0, rotate: 0, active: false })
  const [exitDir, setExitDir] = useState<ExitDir>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [hintDismissed, setHintDismissed] = useState(false)

  const dragRef = useRef({ startX: 0, startY: 0, width: 1, moved: false, pointerId: -1 })
  const frameRef = useRef(0)
  const animatingRef = useRef(false)
  const suppressClickRef = useRef(false)
  const reducedMotionRef = useRef(false)
  const commitTokenRef = useRef(0)

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Reset deck when the project set changes (filter)
  useEffect(() => {
    commitTokenRef.current += 1
    setOrder(ids)
    setDrag({ x: 0, y: 0, rotate: 0, active: false })
    setExitDir(null)
    setIsAnimating(false)
    animatingRef.current = false
    // idsKey captures list identity
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey])

  const activeId = order[0] ?? ids[0] ?? ''
  const activeIndex = Math.max(0, ids.indexOf(activeId))
  const rankOf = useCallback(
    (id: string) => {
      const rank = order.indexOf(id)
      return rank === -1 ? 99 : rank
    },
    [order],
  )

  const commit = useCallback(
    (dir: 'next' | 'prev') => {
      if (animatingRef.current || order.length < 2) return
      setHintDismissed(true)

      const token = ++commitTokenRef.current

      const finish = () => {
        if (token !== commitTokenRef.current) return
        setOrder((prev) => {
          if (prev.length < 2) return prev
          if (dir === 'next') return [...prev.slice(1), prev[0]]
          // prev (post pre-reorder): [front, prevCard, ...rest] → [prevCard, front, ...rest]
          return [prev[1], prev[0], ...prev.slice(2)]
        })
        setExitDir(null)
        setDrag({ x: 0, y: 0, rotate: 0, active: false })
        setIsAnimating(false)
        animatingRef.current = false
      }

      if (reducedMotionRef.current) {
        // Instant reorder, no pre-reorder or exit anim
        setOrder((prev) => {
          if (prev.length < 2) return prev
          if (dir === 'next') return [...prev.slice(1), prev[0]]
          return [prev[prev.length - 1], ...prev.slice(0, -1)]
        })
        setExitDir(null)
        setDrag({ x: 0, y: 0, rotate: 0, active: false })
        setIsAnimating(false)
        animatingRef.current = false
        return
      }

      animatingRef.current = true
      setIsAnimating(true)

      // Prev: promote last card to rank 1 (just behind front) first,
      // so finish only does a short front↔rank1 swap — no rank3→0 jump glitch
      if (dir === 'prev') {
        setOrder((prev) => {
          if (prev.length < 2) return prev
          return [prev[0], prev[prev.length - 1], ...prev.slice(1, -1)]
        })
      }

      setExitDir(dir)
      window.setTimeout(finish, EXIT_MS)
    },
    [order.length],
  )

  const goNext = useCallback(() => commit('next'), [commit])
  const goPrev = useCallback(() => commit('prev'), [commit])

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (animatingRef.current || order.length < 2) return
      if (event.button !== 0 && event.pointerType === 'mouse') return
      const el = event.currentTarget
      dragRef.current = {
        startX: event.clientX,
        startY: event.clientY,
        width: el.getBoundingClientRect().width || 1,
        moved: false,
        pointerId: event.pointerId,
      }
      el.setPointerCapture(event.pointerId)
      setDrag({ x: 0, y: 0, rotate: 0, active: true })
    },
    [order.length],
  )

  const onPointerMove = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (dragRef.current.pointerId === -1 || event.pointerId !== dragRef.current.pointerId) return
    const { startX, startY, width } = dragRef.current
    const dx = event.clientX - startX
    const dy = event.clientY - startY
    if (Math.abs(dx) > DRAG_START_PX || Math.abs(dy) > DRAG_START_PX) {
      dragRef.current.moved = true
      setHintDismissed(true)
    }
    cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      const rotate = clamp((dx / width) * 12, -14, 14)
      setDrag({ x: dx, y: dy * 0.15, rotate, active: true })
    })
  }, [])

  const endDrag = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (event.pointerId !== dragRef.current.pointerId) return
      const { moved, width, startX } = dragRef.current
      const dx = event.clientX - startX
      cancelAnimationFrame(frameRef.current)
      try {
        event.currentTarget.releasePointerCapture(event.pointerId)
      } catch {
        /* already released */
      }
      dragRef.current.pointerId = -1

      if (moved) {
        suppressClickRef.current = true
        window.setTimeout(() => {
          suppressClickRef.current = false
        }, 300)
      }

      const threshold = Math.max(36, width * 0.14)
      if (moved && Math.abs(dx) >= threshold) {
        commit(dx > 0 ? 'next' : 'prev')
      } else {
        setDrag({ x: 0, y: 0, rotate: 0, active: false })
      }
    },
    [commit],
  )

  const onPointerCancel = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerId !== dragRef.current.pointerId) return
    cancelAnimationFrame(frameRef.current)
    dragRef.current.pointerId = -1
    setDrag({ x: 0, y: 0, rotate: 0, active: false })
  }, [])

  const onCardClick = useCallback((event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (suppressClickRef.current) {
      event.preventDefault()
      event.stopPropagation()
    }
  }, [])

  // Keyboard: arrows when deck region focused
  const onKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLElement>) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        goNext()
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goPrev()
      }
    },
    [goNext, goPrev],
  )

  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])

  const activeProject = projects.find((p) => p.id === activeId) ?? projects[0]

  return {
    order,
    activeProject,
    activeIndex,
    rankOf,
    drag,
    exitDir,
    isAnimating,
    hintDismissed,
    dismissHint: () => setHintDismissed(true),
    goNext,
    goPrev,
    dragHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel,
      onClickCapture: onCardClick,
    },
    onKeyDown,
    total: projects.length,
  }
}

export type DeckState = ReturnType<typeof useCardDeck>
