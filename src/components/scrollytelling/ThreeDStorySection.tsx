import React, { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import StoryOverlay, { storyStages } from "./StoryOverlay"
import { useSmoothScroll } from "./SmoothScrollProvider"

gsap.registerPlugin(ScrollTrigger)

export default function ThreeDStorySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [activeStage, setActiveStage] = useState(0)
  const [inspectMode, setInspectMode] = useState(false)
  const [snapEnabled, setSnapEnabled] = useState(true)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const { stopScroll, startScroll, scrollTo } = useSmoothScroll()

  // Track mouse coordinates for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2.0
      const y = -(e.clientY / window.innerHeight - 0.5) * 2.0
      setMousePos({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // GSAP ScrollTrigger setup with pinned container and scrub
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let trigger: ScrollTrigger | null = null

    try {
      trigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.0,
        // Gently settle at the narrative boundaries only after scrolling stops.
        // Four chapters occupy 0–25%, 25–50%, 50–75%, and 75–100%.
        snap: snapEnabled
          ? {
              snapTo: 0.25,
              duration: { min: 0.18, max: 0.42 },
              delay: 0.18,
              ease: "power2.out",
            }
          : undefined,
        onUpdate: (self) => {
          const p = Math.max(0, Math.min(1, self.progress))
          setProgress(p)

          // Stage transitions happen exactly on quarter milestones.
          const stageIndex = Math.min(
            storyStages.length - 1,
            Math.floor(p * storyStages.length),
          )
          setActiveStage(stageIndex)
        },
      })
    } catch (err) {
      console.warn("ThreeDStorySection ScrollTrigger error:", err)
    }

    return () => {
      if (trigger) trigger.kill()
    }
  }, [snapEnabled])

  // Never leave Lenis paused if this component is removed while inspect mode is open.
  useEffect(() => () => startScroll(), [startScroll])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && inspectMode) {
        startScroll()
        setInspectMode(false)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [inspectMode, startScroll])

  // Toggle Inspect Mode: Locks virtual scroll so user can spin the 3D Torus
  const toggleInspectMode = () => {
    if (!inspectMode) {
      stopScroll()
      setInspectMode(true)
    } else {
      startScroll()
      setInspectMode(false)
    }
  }

  // Programmatic jump to a specific narrative stage
  const jumpToStage = (stageIdx: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const currentScroll = window.scrollY || document.documentElement.scrollTop
    const trackTop = rect.top + currentScroll
    const trackScrollable = containerRef.current.scrollHeight - window.innerHeight
    const targetY = trackTop + trackScrollable * (stageIdx / storyStages.length)
    scrollTo(targetY)
  }

  return (
    <section
      aria-label="3D Scrollytelling Story: Neural Knowledge Torus"
      className="threed-story-track"
      ref={containerRef}
    >
      <StoryOverlay
        activeStage={activeStage}
        inspectMode={inspectMode}
        mouseX={mousePos.x}
        mouseY={mousePos.y}
        onJumpToStage={jumpToStage}
        onToggleSnap={() => setSnapEnabled((enabled) => !enabled)}
        onToggleInspect={toggleInspectMode}
        progress={progress}
        snapEnabled={snapEnabled}
      />
    </section>
  )
}
