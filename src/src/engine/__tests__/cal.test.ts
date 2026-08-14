import { describe, expect, it } from 'vitest'
import { rasterMatch } from '../raster'
import type { Point } from '../geometry'

const square: Point[] = [
  { x: 0.2, y: 0.2 }, { x: 0.8, y: 0.2 }, { x: 0.8, y: 0.8 }, { x: 0.2, y: 0.8 },
]

describe('cal', () => {
  it('scores', () => {
    // perfect perimeter trace
    const perfect: Point[][] = [[
      { x: 0.2, y: 0.2 }, { x: 0.8, y: 0.2 }, { x: 0.8, y: 0.8 }, { x: 0.2, y: 0.8 }, { x: 0.2, y: 0.2 },
    ]]
    console.log('perfect', rasterMatch(perfect, square))
    // big scribble covering whole area
    const blob: Point[][] = [
      [{ x: 0.02, y: 0.02 }, { x: 0.98, y: 0.02 }, { x: 0.98, y: 0.98 }, { x: 0.02, y: 0.98 }, { x: 0.02, y: 0.02 }],
      [{ x: 0.02, y: 0.5 }, { x: 0.98, y: 0.5 }],
      [{ x: 0.5, y: 0.02 }, { x: 0.5, y: 0.98 }],
      [{ x: 0.02, y: 0.02 }, { x: 0.98, y: 0.98 }],
      [{ x: 0.98, y: 0.02 }, { x: 0.02, y: 0.98 }],
    ]
    console.log('blob', rasterMatch(blob, square))
  })
})
