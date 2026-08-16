import confetti from 'canvas-confetti'

export function fireConfetti(x?: number, y?: number) {
  const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#0ea5e9']
  
  // Convert pixel coordinates to relative (0 to 1) for canvas-confetti
  const originX = x !== undefined ? x / window.innerWidth : 0.5
  const originY = y !== undefined ? y / window.innerHeight : 0.6 // Slightly lower than center by default

  confetti({
    particleCount: 80,
    spread: 70,
    origin: { x: originX, y: originY },
    colors: colors,
    disableForReducedMotion: true,
    gravity: 1.2,
    scalar: 1.2,
    ticks: 250,
  })
}
