import { describe, expect, it } from 'vitest'
import { rasterMatch } from '../raster'
import { NGGLEGENA, SANDANGAN, PASANGAN } from '../../data/aksara'
import type { Point } from '../geometry'

// a square glyph silhouette to test coverage semantics
const square: Point[] = [
  { x: 0.2, y: 0.2 },
  { x: 0.8, y: 0.2 },
  { x: 0.8, y: 0.8 },
  { x: 0.2, y: 0.8 },
]

describe('raster coverage matcher', () => {
  it('passes a drawing that fills the glyph silhouette', () => {
    const strokes: Point[][] = [
      [
        { x: 0.2, y: 0.2 },
        { x: 0.3, y: 0.2 },
        { x: 0.8, y: 0.2 },
        { x: 0.8, y: 0.8 },
        { x: 0.2, y: 0.8 },
        { x: 0.2, y: 0.2 },
      ],
    ]
    const res = rasterMatch(strokes, square)
    expect(['pass', 'warn']).toContain(res.status)
    expect(res.coverage).toBeGreaterThan(0.5)
  })

  it('retries a drawing that misses the glyph', () => {
    const miss: Point[][] = [
      [
        { x: 0.85, y: 0.85 },
        { x: 0.9, y: 0.9 },
        { x: 0.98, y: 0.98 },
      ],
    ]
    const res = rasterMatch(miss, square)
    expect(res.status).toBe('retry')
  })

  it('accepts small offsets via alignment search', () => {
    const strokes: Point[][] = [
      [
        { x: 0.2, y: 0.18 },
        { x: 0.82, y: 0.18 },
        { x: 0.82, y: 0.82 },
        { x: 0.2, y: 0.82 },
        { x: 0.2, y: 0.18 },
      ],
    ]
    const res = rasterMatch(strokes, square)
    expect(res.coverage).toBeGreaterThan(0.3)
  })
})

describe('aksara library', () => {
  it('has 20 ngglegena, 8 sandangan, 20 pasangan', () => {
    expect(NGGLEGENA).toHaveLength(20)
    expect(SANDANGAN).toHaveLength(8)
    expect(PASANGAN).toHaveLength(20)
  })

  it('every glyph has a dense upright contour', () => {
    for (const g of [...NGGLEGENA, ...SANDANGAN, ...PASANGAN]) {
      expect(g.contour.length).toBeGreaterThan(30)
      const xs = g.contour.map((p) => p.x)
      const ys = g.contour.map((p) => p.y)
      expect(Math.max(...ys)).toBeGreaterThan(Math.min(...ys) + 0.2)
      expect(Math.max(...xs)).toBeGreaterThan(Math.min(...xs) + 0.2)
      expect(g.unicode).toBeTruthy()
    }
  })

  it('pasangan has a ka entry with real glyph', () => {
    const ka = PASANGAN.find((g) => g.id === 'ka')
    expect(ka).toBeDefined()
    expect(ka!.label).toContain('pasangan')
  })
})