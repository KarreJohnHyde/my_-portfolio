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
        // Soft snap assist to nearest 25% stage milestone
        snap: {
          snapTo: [0, 0.333, 0.666, 1.0],
          duration: { min: 0.2, max: 0.5 },
          delay: 0.15,
          ease: "power2.out",
        },
        onUpdate: (self) => {
          const p = Math.max(0, Math.min(1, self.progress))
          setProgress(p)

          // 4 distinct stages mapped evenly across the 450vh scroll track
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
  }, [])

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
    const targetY = trackTop + trackScrollable * (stageIdx / (storyStages.length - 1))
    scrollTo(targetY)
  }

  return (
    <section
      aria-label="3D Scrollytelling Story: Neural Knowledge Torus"
      className="threed-story-track"
      id="scrollytelling"
      ref={containerRef}
    >
      <StoryOverlay
        activeStage={activeStage}
        inspectMode={inspectMode}
        mouseX={mousePos.x}
        mouseY={mousePos.y}
        onJumpToStage={jumpToStage}
        onToggleInspect={toggleInspectMode}
        progress={progress}
      />
    </section>
  )
}
