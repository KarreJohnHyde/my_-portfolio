import React, { useEffect, useRef } from "react"

export default function PixelGridTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const gridSize = 40 // Size of each pixel block
    const trail: { x: number; y: number; alpha: number }[] = []

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

    let animationFrameId: number
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

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

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 mix-blend-screen"
    />
  )
}
