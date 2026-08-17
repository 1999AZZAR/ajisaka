import { useEffect, useRef, useState } from 'react'
import type { Point } from '../../engine/geometry'
import type { AksaraGlyph } from '../../data/aksara'
import { useCanvasCapture, type LiveStrokeRef } from '../../hooks/useCanvasCapture'
import { rasterMatch } from '../../engine/raster'
import { useTranslation } from 'react-i18next'

export type StrokeFeedback = ReturnType<typeof rasterMatch> & { points: Point[] }

export interface PracticeCanvasProps {
  glyph: AksaraGlyph
  strokeIdx: number
  feedback: StrokeFeedback | null
  showArrows?: boolean
  onStroke: (points: Point[]) => void
  onClear: () => void
}

const INK = 'rgba(43, 39, 48, 0.85)'
const PASS = '#6a9c6f'
const WARN = '#c9a227'
const ERROR = '#c0392b'

function drawPolyline(ctx: CanvasRenderingContext2D, pts: Point[], color: string, width: number) {
  if (pts.length < 2) return
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.beginPath()
  ctx.moveTo(pts[0].x, pts[0].y)
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y)
  ctx.stroke()
}

export default function PracticeCanvas({ glyph, feedback, showArrows, onStroke, onClear }: PracticeCanvasProps) {
  const { t } = useTranslation()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const liveRef = useRef<Point[]>([])
  const rafRef = useRef(0)
  const [showGuide, setShowGuide] = useState(true)

  useCanvasCapture(canvasRef, (r) => onStroke(r.points), liveRef as LiveStrokeRef)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let lastLen = -1
    let lastFeedback: any = undefined
    let lastGuide: boolean | undefined = undefined

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw)
      
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      const currentLen = liveRef.current.length
      
      // Only redraw if something actually changed to save battery/CPU
      if (
        canvas.width !== rect.width * dpr || 
        canvas.height !== rect.height * dpr || 
        lastLen !== currentLen || 
        lastFeedback !== feedback || 
        lastGuide !== showGuide
      ) {
        if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
          canvas.width = rect.width * dpr
          canvas.height = rect.height * dpr
        }
        
        lastLen = currentLen
        lastFeedback = feedback
        lastGuide = showGuide
        
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.clearRect(0, 0, rect.width, rect.height)

        const s = Math.min(rect.width, rect.height)
        const pad = 0.05
        const box = { x: (rect.width - s) / 2, y: (rect.height - s) / 2, size: s }
        const map = (p: Point): Point => ({
          x: p.x * (s * (1 - 2 * pad)) + box.x + s * pad,
          y: p.y * (s * (1 - 2 * pad)) + box.y + s * pad,
        })

        // Optional solid glyph reference (toggled by the user) — the letter shape
        // itself to trace over, no exposed boundary.
        if (showGuide) {
          const path = new Path2D()
          glyph.contour.forEach(subpath => {
            subpath.forEach((p, i) => {
              const q = map(p)
              if (i === 0) path.moveTo(q.x, q.y)
              else path.lineTo(q.x, q.y)
            })
            path.closePath()
          })
          ctx.fillStyle = 'rgba(179, 64, 42, 0.22)'
          ctx.fill(path)

          if (showArrows && glyph.contour.length > 0 && glyph.contour[0].length > 5) {
            const p1 = map(glyph.contour[0][0])
            const p2 = map(glyph.contour[0][Math.floor(glyph.contour[0].length / 10)]) // Look ahead a bit
            const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x)
            
            ctx.save()
            ctx.translate(p1.x, p1.y)
            ctx.rotate(angle)
            ctx.beginPath()
            ctx.moveTo(0, 0)
            ctx.lineTo(-15, -10)
            ctx.lineTo(-10, 0)
            ctx.lineTo(-15, 10)
            ctx.closePath()
            ctx.fillStyle = '#b3402a'
            ctx.fill()
            ctx.restore()
          }
        }

        // Live ink while drawing.
        if (liveRef.current.length >= 2) {
          drawPolyline(ctx, liveRef.current.map(map), INK, 4)
        }

        // Last completed trace colored by status.
        if (feedback) {
          const color = feedback.status === 'pass' ? PASS : feedback.status === 'warn' ? WARN : ERROR
          drawPolyline(ctx, feedback.points.map(map), color, 4)
        }
      }
    }

    draw()
    return () => cancelAnimationFrame(rafRef.current)
  }, [feedback, showGuide, glyph])

  return (
    <div className="flex flex-col h-full gap-3">
      <div className="flex-1 min-h-0 w-full flex items-center justify-center">
        <div 
          className="relative shadow-inner rounded-3xl bg-white overflow-hidden border border-border"
          style={{ width: '100%', maxHeight: '100%', maxWidth: '100%', aspectRatio: '1 / 1' }}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full touch-none cursor-crosshair"
            data-testid="practice-canvas"
            role="img"
            aria-label={t('practice.canvas_aria', { glyph: glyph.label })}
          />
          <span className="pointer-events-none absolute left-3 top-2 text-xs font-semibold text-text-2" aria-hidden>
            {t('practice.write_here')}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 gap-3">
        <button
          type="button"
          onClick={() => {
            onClear()
          }}
          className="min-h-12 flex-1 rounded-xl border border-border bg-paper-2 px-4 text-sm font-bold text-text shadow-sm transition-colors hover:bg-paper-3 active:scale-[0.98]"
        >
          🧹 {t('practice.clear')}
        </button>
        <button
          type="button"
          aria-pressed={showGuide}
          onClick={() => {
            setShowGuide((v) => !v)
          }}
          className={`min-h-12 flex-1 rounded-xl border px-4 text-sm font-bold transition-colors active:scale-[0.98] ${
            showGuide
              ? 'border-accent/40 bg-accent/10 text-accent-deep shadow-sm'
              : 'border-border bg-paper-2 text-text-2 hover:bg-paper-3'
          }`}
        >
          {showGuide ? `👁 ${t('practice.show_guide')}` : `👁 ${t('practice.hide_guide')}`}
        </button>
      </div>
    </div>
  )
}