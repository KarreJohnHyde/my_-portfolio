import { useEffect, useRef } from "react"

export default function PixelGridTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Skip on touch-only devices (no fine pointer)
    const hasPointer = window.matchMedia("(pointer: fine)").matches
    if (!hasPointer) return

    // Skip when user prefers reduced motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (prefersReduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const gridSize = 40 // Size of each pixel block
    const trail: { x: number; y: number; alpha: number }[] = []

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()

    const handleMouseMove = (e: MouseEvent) => {
      // Snap mouse coordinates to the nearest grid block
      const gridX = Math.floor(e.clientX / gridSize) * gridSize
      const gridY = Math.floor(e.clientY / gridSize) * gridSize

      // Add to trail if it's a new block or trail is empty
      if (trail.length === 0 || trail[0].x !== gridX || trail[0].y !== gridY) {
        trail.unshift({ x: gridX, y: gridY, alpha: 1 })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", resize)

    let rafId: number
    const animate = () => {
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)
      ctx.clearRect(0, 0, w, h)

      // Draw and fade trail
      for (let i = 0; i < trail.length; i++) {
        const p = trail[i]

        // Bright techy green/cyan (Tailwind lime-400 equivalent)
        ctx.fillStyle = `rgba(163, 230, 53, ${p.alpha})`
        ctx.fillRect(p.x, p.y, gridSize, gridSize)

        // Fade out
        p.alpha -= 0.02
      }

      // Remove invisible blocks
      while (trail.length > 0 && trail[trail.length - 1].alpha <= 0) {
        trail.pop()
      }

      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 mix-blend-screen"
    />
  )
}
