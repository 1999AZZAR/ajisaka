import { dtwClosed, dtwDistance } from './dtw'
import { normalize, resample, type Point } from './geometry'

export type StrokeStatus = 'pass' | 'warn' | 'retry'

export interface StrokeMatch {
  status: StrokeStatus
  distance: number
  reverseDistance: number
  directionOk: boolean
}

export const PASS_TOLERANCE = 0.2
export const WARN_TOLERANCE = 0.34

export interface MatchOptions {
  /** Reference is a closed glyph contour — match rotation-invariantly. */
  closed?: boolean
}

/**
 * Compares a captured stroke against a reference with optional
 * rotation-invariant matching for closed glyph contours.
 */
export function matchStroke(input: Point[], reference: Point[], options: MatchOptions = {}): StrokeMatch {
  const a = normalize(resample(input))
  const b = options.closed ? normalize(reference) : resample(normalize(reference), 64)

  const forward = options.closed ? dtwClosed(a, b) : dtwDistance(a, b)
  const reverse = options.closed
    ? dtwDistance(a, normalize([...b].reverse()))
    : dtwDistance(a, resample(normalize([...reference].reverse()), 64))

  const directionOk = forward <= 1.5 * reverse

  let status: StrokeStatus
  if (forward <= PASS_TOLERANCE) {
    status = 'pass'
  } else if (forward <= WARN_TOLERANCE) {
    status = directionOk ? 'warn' : 'retry'
  } else {
    status = 'retry'
  }

  return { status, distance: forward, reverseDistance: reverse, directionOk }
}