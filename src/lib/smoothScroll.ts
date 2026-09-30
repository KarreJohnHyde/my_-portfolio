import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger)

let lenisInstance: Lenis | null = null

export function initSmoothScroll(): Lenis {
  if (lenisInstance) return lenisInstance

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.6,
  })

  lenisInstance = lenis

  // Synchronize Lenis with GSAP ScrollTrigger
  lenis.on("scroll", () => {
    ScrollTrigger.update()
  })

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  return lenis
}

import { getGlobalLenis } from "../components/scrollytelling/SmoothScrollProvider"

export function getSmoothScroll(): Lenis | null {
  return getGlobalLenis() || lenisInstance
}

export function scrollToTarget(
  target: string | number | HTMLElement,
  offset = 0,
) {
  const activeLenis = getGlobalLenis() || lenisInstance
  if (activeLenis) {
    activeLenis.scrollTo(target, { offset, duration: 1.3 })
  } else {
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" })
    } else if (typeof target === "string") {
      const el = document.querySelector(target)
      el?.scrollIntoView({ behavior: "smooth" })
    } else {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }
}

export function destroySmoothScroll() {
  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }
}
