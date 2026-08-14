import anime from 'animejs'

export function fireConfetti(x?: number, y?: number) {
  const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#0ea5e9']
  // max 60 particles as requested
  const particleCount = 40

  const originX = x ?? window.innerWidth / 2
  const originY = y ?? window.innerHeight / 2

  const container = document.createElement('div')
  container.style.position = 'fixed'
  container.style.top = '0'
  container.style.left = '0'
  container.style.width = '100%'
  container.style.height = '100%'
  container.style.pointerEvents = 'none'
  container.style.zIndex = '9999'
  document.body.appendChild(container)

  const particles: HTMLElement[] = []
  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div')
    const size = Math.random() * 8 + 6
    p.style.position = 'absolute'
    p.style.width = `${size}px`
    p.style.height = `${size}px`
    p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px'
    p.style.left = `${originX}px`
    p.style.top = `${originY}px`
    p.style.transform = 'translate(-50%, -50%)'
    container.appendChild(p)
    particles.push(p)
  }

  anime({
    targets: particles,
    translateX: () => (Math.random() - 0.5) * 400,
    translateY: () => (Math.random() - 0.5) * 400 - 100,
    scale: [1, 0],
    opacity: [1, 0],
    rotate: () => (Math.random() - 0.5) * 360,
    duration: () => Math.random() * 800 + 800,
    easing: 'easeOutExpo',
    complete: () => {
      if (document.body.contains(container)) {
        document.body.removeChild(container)
      }
    },
  })
}
