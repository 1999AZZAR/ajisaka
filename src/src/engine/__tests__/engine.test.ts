import { describe, expect, it } from 'vitest'
import { normalize, resample, type Point } from '../geometry'

const line: Point[] = [
  { x: 0.1, y: 0.1 },
  { x: 0.2, y: 0.2 },
  { x: 0.3, y: 0.3 },
  { x: 0.4, y: 0.4 },
  { x: 0.5, y: 0.5 },
  { x: 0.6, y: 0.6 },
  { x: 0.7, y: 0.7 },
  { x: 0.8, y: 0.8 },
  { x: 0.9, y: 0.9 },
]

describe('geometry', () => {
  it('resamples to fixed count', () => {
    expect(resample(line, 8)).toHaveLength(8)
    expect(resample([line[0]], 8)).toEqual([line[0]])
  })

  it('normalizes into 0..1 while preserving orientation', () => {
    const out = normalize(line)
    const xs = out.map((p) => p.x)
    expect(Math.min(...xs)).toBeCloseTo(0, 5)
    expect(Math.max(...xs)).toBeCloseTo(1, 5)
    // diagonal preserved: each point still on y=x
    out.forEach((p) => expect(p.x).toBeCloseTo(p.y, 5))
  })
})