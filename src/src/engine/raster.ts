import type { Point } from './geometry'

type StrokeStatus = 'pass' | 'warn' | 'retry' | 'incomplete'

export interface RasterMatch {
  status: StrokeStatus
  score: number
  coverage: number
}

const COVERAGE_PASS = 0.50
const COVERAGE_WARN = 0.35

function resample(points: Point[], step: number, closed: boolean): Point[] {
  if (points.length === 0) return []
  const res: Point[] = [points[0]]
  const limit = closed ? points.length : points.length - 1
  for (let i = 0; i < limit; i++) {
    const p1 = points[i]
    const p2 = points[(i + 1) % points.length]
    const d = Math.hypot(p2.x - p1.x, p2.y - p1.y)
    const steps = Math.max(1, Math.ceil(d / step))
    for (let k = 1; k <= steps; k++) {
      res.push({
        x: p1.x + (p2.x - p1.x) * (k / steps),
        y: p1.y + (p2.y - p1.y) * (k / steps)
      })
    }
  }
  return res
}

function getDistStats(A: Point[], B: Point[], maxTol: number): { mean: number, outlierRatio: number } {
  if (A.length === 0 || B.length === 0) return { mean: 1.0, outlierRatio: 1.0 }
  let total = 0
  let outliers = 0
  for (const a of A) {
    let minD = Infinity
    for (const b of B) {
      const dSq = (a.x - b.x)**2 + (a.y - b.y)**2
      if (dSq < minD) minD = dSq
    }
    const d = Math.sqrt(minD)
    total += d
    if (d > maxTol) outliers++
  }
  return { mean: total / A.length, outlierRatio: outliers / A.length }
}

function getArea(poly: Point[]): number {
  let area = 0
  for (let i = 0; i < poly.length; i++) {
    const j = (i + 1) % poly.length
    area += poly[i].x * poly[j].y - poly[j].x * poly[i].y
  }
  return Math.abs(area / 2)
}

export function rasterMatch(strokes: Point[][], outline: Point[][]): RasterMatch {
  if (strokes.length === 0) return { status: 'retry', score: 0, coverage: 0 }

  let denseOutline: Point[] = []
  let targetPerimeter = 0
  let area = 0

  for (const op of outline) {
    const resampled = resample(op, 0.02, true)
    denseOutline = denseOutline.concat(resampled)
    
    // Perimeter of this subpath
    for (let i = 0; i < resampled.length; i++) {
      const p1 = resampled[i]
      const p2 = resampled[(i + 1) % resampled.length]
      targetPerimeter += Math.hypot(p2.x - p1.x, p2.y - p1.y)
    }
    
    // Area of this subpath
    area += getArea(resampled)
  }
  
  const expectedLength = targetPerimeter / 2
  
  // Dynamically compute the baseline thickness of the font to adapt to tiny sandangans
  // that are scaled up to a massive [0, 1] blob.
  // We clamp the thickness to a maximum of 0.15 to prevent corrupt "blob" contours
  // (like the broken pasangan) from creating massive tolerances that allow scribbling.
  let thickness = expectedLength > 0 ? (area / expectedLength) : 0.1
  thickness = Math.min(0.15, thickness)
  
  const targetDist = Math.max(0.04, thickness / 2)
  const maxTolerance = Math.max(0.07, targetDist * 1.5)

  let bestScore = 0
  let bestPrecision = 0
  let bestOutlierPenalty = 0
  const scales = [0.95, 1, 1.05]
  const shifts = [-0.03, 0, 0.03]
  
  for (const s of scales) {
    for (const ox of shifts) {
      for (const oy of shifts) {
        
        let userLength = 0
        const transformedStrokes: Point[][] = []
        
        for (const st of strokes) {
          const t = st.map(p => ({ x: p.x * s + ox, y: p.y * s + oy }))
          transformedStrokes.push(t)
          for (let i = 1; i < t.length; i++) {
            userLength += Math.hypot(t[i].x - t[i-1].x, t[i].y - t[i-1].y)
          }
        }
        
        let denseUser: Point[] = []
        for (const st of transformedStrokes) {
          denseUser = denseUser.concat(resample(st, 0.02, false))
        }

        const strictTol = targetDist * 2.5
        const precisionStats = getDistStats(denseUser, denseOutline, strictTol)
        const recallStats = getDistStats(denseOutline, denseUser, strictTol)

        const precisionScore = Math.max(0, 1.0 - (Math.max(0, precisionStats.mean - targetDist) / maxTolerance))
        const recallScore = Math.max(0, 1.0 - (Math.max(0, recallStats.mean - targetDist) / maxTolerance))

        // Strict Outlier Penalty: if more than 15% of the user stroke is way outside the character bounds, kill the score
        const outlierPenalty = Math.max(0, 1.0 - (precisionStats.outlierRatio / 0.15))

        const lengthRatio = expectedLength > 0 ? (userLength / expectedLength) : 1
        let lengthPenalty = 1.0
        if (lengthRatio > 1.5) { 
          lengthPenalty = Math.max(0, 1.0 - (lengthRatio - 1.5) * 2)
        }
        
        const score = recallScore * precisionScore * lengthPenalty * outlierPenalty
        
        if (score >= bestScore) {
          bestScore = score
          bestPrecision = precisionScore
          bestOutlierPenalty = outlierPenalty
        }
      }
    }
  }

  const status: StrokeStatus =
    bestScore >= COVERAGE_PASS ? 'pass' : 
    bestScore >= COVERAGE_WARN ? 'warn' : 
    (bestPrecision > 0.7 && bestOutlierPenalty > 0.8) ? 'incomplete' : 'retry'
  return { status, score: bestScore, coverage: bestScore }
}