import { useEffect, useRef } from 'react'
import anime from 'animejs'

export default function SuccessParticles({ show }: { show: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (show && containerRef.current) {
      const el = containerRef.current
      el.innerHTML = '' // Clear existing

      const numParticles = 20
      const fragment = document.createDocumentFragment()

      for (let i = 0; i < numParticles; i++) {
        const p = document.createElement('div')
        // Random star or sparkle icon
        p.innerText = ['✨', '⭐', '🌟', '🎊'][Math.floor(Math.random() * 4)]
        p.className = 'absolute text-2xl drop-shadow-md'
        p.style.left = '50%'
        p.style.top = '50%'
        p.style.transform = 'translate(-50%, -50%)'
        
        fragment.appendChild(p)
      }

      el.appendChild(fragment)

      anime({
        targets: el.children,
        translateX: () => anime.random(-150, 150),
        translateY: () => anime.random(-150, 150),
        rotate: () => anime.random(-360, 360),
        scale: [0, () => anime.random(0.5, 1.5), 0],
        opacity: [1, 0],
        duration: () => anime.random(800, 1200),
        easing: 'easeOutExpo',
      })
    }
  }, [show])

  if (!show) return null

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center overflow-hidden"
    />
  )
}
