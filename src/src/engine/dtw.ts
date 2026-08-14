import type { Point } from './geometry'

function dist(p: Point, q: Point): number {
  return Math.hypot(p.x - q.x, p.y - q.y)
}

/** O(n*m) in-place-row DTW. Returns mean per-point distance. */
export function dtwDistance(a: Point[], b: Point[]): number {
  const n = a.length
  const m = b.length
  let prev = new Array<number>(m + 1).fill(Infinity)
  prev[0] = 0
  for (let i = 1; i <= n; i++) {
    const cur = new Array<number>(m + 1).fill(Infinity)
    cur[0] = Infinity
    const ai = a[i - 1]
    for (let j = 1; j <= m; j++) {
      cur[j] = dist(ai, b[j - 1]) + Math.min(prev[j], cur[j - 1], prev[j - 1])
    }
    prev = cur
  }
  return prev[m] / n
}

function accumulate(pts: Point[]): number[] {
  const lens = [0]
  for (let i = 1; i < pts.length; i++) lens.push(lens[i - 1] + dist(pts[i - 1], pts[i]))
  return lens
}

function sampleLoop(closed: Point[], target: number): Point[] {
  const n = closed.length
  const inner = accumulate(closed)
  const total = inner[n - 1]
  if (total <= 0) return Array.from({ length: target }, () => closed[0])
  const step = total / target
  const out: Point[] = []
  for (let k = 0; k < target; k++) {
    const d = k * step
    let idx = 0
    while (idx < n - 2 && d > inner[idx + 1]) idx++
    const lo = inner[idx]
    const hi = inner[idx + 1]
    const t = (d - lo) / ((hi - lo) || 1)
    out.push({
      x: closed[idx].x + (closed[(idx + 1) % n].x - closed[idx].x) * t,
      y: closed[idx].y + (closed[(idx + 1) % n].y - closed[idx].y) * t,
    })
  }
  return out
}

/** Two identical arc-length samples of the closed contour (for window search). */
function doubleLoop(closed: Point[], target: number): Point[] {
  const loop = sampleLoop(closed, target)
  return [...loop, ...loop]
}

/**
 * Rotation-invariant DTW for closed contours: slides a window along a
 * doubled contour to find the best start-point alignment.
 */
export function dtwClosed(a: Point[], closed: Point[]): number {
  const n = a.length
  const doubled = doubleLoop(closed, n)
  let best = Infinity
  for (let start = 0; start < n; start += 2) {
    const window = doubled.slice(start, start + n)
    if (window.length === n) {
      best = Math.min(best, dtwDistance(a, window))
    }
  }
  return best
}