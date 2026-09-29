import React, { useEffect, useRef, useState } from "react"

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isCoarse, setIsCoarse] = useState(false)

  useEffect(() => {
    // Check if the user is on a touch device / coarse pointer
    const checkCoarse = () => {
      const coarse = window.matchMedia("(pointer: coarse)").matches
      setIsCoarse(coarse)
      return coarse
    }

    if (checkCoarse()) return

    const mousePos = { x: -100, y: -100 }
    const ringPos = { x: -100, y: -100 }
    let animFrame = 0

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX
      mousePos.y = e.clientY
      if (!isVisible) setIsVisible(true)

      // Direct instant positioning for the inner glowing lime dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) translate(-50%, -50%)`
      }

      // Check if hovering an interactive target
      const target = e.target as HTMLElement | null
      if (target) {
        const interactive = target.closest(
          'a, button, [role="button"], input, textarea, select, .project-card, .skill-card, .cert-card, .filter-btn, .main-nav button, .hud-inspect-btn, .hud-snap-btn, .resume-trigger-btn, .contact-pill, .interactive-hover'
        )
        setIsHovering(!!interactive)
      }
    }

    const onMouseDown = () => setIsClicking(true)
    const onMouseUp = () => setIsClicking(false)
    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    // Smooth physics lerp loop for the floating halo outer ring
    const render = () => {
      const ease = 0.18
      ringPos.x += (mousePos.x - ringPos.x) * ease
      ringPos.y += (mousePos.y - ringPos.y) * ease

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`
      }

      animFrame = requestAnimationFrame(render)
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    window.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mouseenter", onMouseEnter)

    animFrame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mouseenter", onMouseEnter)
    }
  }, [isVisible])

  if (isCoarse) return null

  return (
    <div
      aria-hidden="true"
      className={`cyber-custom-cursor-container ${isVisible ? "is-visible" : ""} ${
        isHovering ? "is-hovering" : ""
      } ${isClicking ? "is-clicking" : ""}`}
    >
      {/* Outer Halo Gray Circle Ring with Lerp Trailing */}
      <div className="cursor-halo-ring" ref={ringRef} />

      {/* Inner Glowing Lime Green Dot following exact mouse pointer */}
      <div className="cursor-lime-dot" ref={dotRef} />
    </div>
  )
}
