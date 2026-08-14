import { useEffect, useRef } from 'react'
import type { Point } from '../engine/geometry'

interface CaptureResult {
  points: Point[]
  start: number
  end: number
}

export type LiveStrokeRef = { current: Point[] }

/**
 * Captures freehand strokes from pointer input into a normalized 0..1 box.
 * Streams the in-progress stroke into `live.current` for realtime rendering,
 * then reports the finished stroke back to `onStroke`.
 */
export function useCanvasCapture(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  onStroke: (result: CaptureResult) => void,
  liveRef?: LiveStrokeRef,
) {
  const drawing = useRef<Point[]>([])
  const dirty = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const toBox = (e: PointerEvent): Point => {
      const rect = canvas.getBoundingClientRect()
      const x = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
      const y = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height))
      return { x, y }
    }

    const down = (e: PointerEvent) => {
      e.preventDefault()
      canvas.setPointerCapture(e.pointerId)
      drawing.current = [toBox(e)]
      dirty.current = true
      if (liveRef) liveRef.current = drawing.current
    }

    const move = (e: PointerEvent) => {
      if (!dirty.current) return
      e.preventDefault()
      drawing.current.push(toBox(e))
    }

    const up = (e: PointerEvent) => {
      if (!dirty.current) return
      e.preventDefault()
      const pts = drawing.current.slice()
      drawing.current = []
      dirty.current = false
      if (liveRef) liveRef.current = []
      if (pts.length >= 4) {
        onStroke({ points: pts, start: performance.now(), end: performance.now() })
      }
    }

    canvas.addEventListener('pointerdown', down)
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerup', up)
    canvas.addEventListener('pointercancel', up)

    return () => {
      canvas.removeEventListener('pointerdown', down)
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerup', up)
      canvas.removeEventListener('pointercancel', up)
    }
  }, [canvasRef, onStroke, liveRef])

  return () => {
    drawing.current = []
    dirty.current = false
  }
}