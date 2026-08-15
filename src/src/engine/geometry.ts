export interface Point {
  x: number
  y: number
}



function cumulativeLengths(pts: Point[]): number[] {
  const out = [0]
  for (let i = 1; i < pts.length; i++) {
    out.push(out[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y))
  }
  return out
}

function pointAtLength(pts: Point[], lens: number[], target: number): Point {
  for (let i = 1; i < lens.length; i++) {
    if (lens[i] >= target) {
      const t = (target - lens[i - 1]) / (lens[i] - lens[i - 1] || 1)
      return {
        x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * t,
        y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * t,
      }
    }
  }
  return pts[pts.length - 1]
}

/** Equal-arc resampling to a fixed point count (order preserving). */
export function resample(pts: Point[], n = 32): Point[] {
  if (pts.length < 2) return pts.slice()
  const lens = cumulativeLengths(pts)
  const total = lens[lens.length - 1]
  if (total <= 0) return Array.from({ length: n }, () => pts[0])
  const step = total / (n - 1)
  const out: Point[] = [pts[0]]
  for (let i = 1; i < n - 1; i++) out.push(pointAtLength(pts, lens, i * step))
  out.push(pts[pts.length - 1])
  return out
}

/** Translate + scale a stroke into the 0..1 box, preserving aspect ratio. */
export function normalize(pts: Point[]): Point[] {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const p of pts) {
    minX = Math.min(minX, p.x); minY = Math.min(minY, p.y)
    maxX = Math.max(maxX, p.x); maxY = Math.max(maxY, p.y)
  }
  const s = Math.max(maxX - minX, maxY - minY, 1e-6)
  return pts.map((p) => ({ x: (p.x - minX) / s, y: (p.y - minY) / s }))
}