import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface SmoothScrollContextValue {
  lenis: Lenis | null
  stopScroll: () => void
  startScroll: () => void
  scrollTo: (target: string | number | HTMLElement, offset?: number) => void
  isLocked: boolean
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  stopScroll: () => {},
  startScroll: () => {},
  scrollTo: () => {},
  isLocked: false,
})

export function useSmoothScroll() {
  return useContext(SmoothScrollContext)
}

interface SmoothScrollProviderProps {
  children: ReactNode
}

let globalLenisInstance: Lenis | null = null

export function getGlobalLenis(): Lenis | null {
  return globalLenisInstance
}

export function scrollToTarget(
  target: string | number | HTMLElement,
  offset = 0,
) {
  if (globalLenisInstance) {
    globalLenisInstance.scrollTo(target, { offset, duration: 1.4 })
  } else {
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" })
    } else if (typeof target === "string") {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" })
    } else {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }
}

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const [isLocked, setIsLocked] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // 1. Initialize Lenis with normalized inertia and wheel smoothing
    const instance = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      infinite: false,
    })

    lenisRef.current = instance
    globalLenisInstance = instance
    setLenis(instance)

    // 2. Synchronize virtual scroll with GSAP ScrollTrigger
    instance.on("scroll", () => {
      ScrollTrigger.update()
    })

    // 3. Drive Lenis updates through GSAP's high-precision internal ticker
    const tickerUpdate = (time: number) => {
      instance.raf(time * 1000)
    }

    gsap.ticker.add(tickerUpdate)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerUpdate)
      instance.destroy()
      lenisRef.current = null
      globalLenisInstance = null
    }
  }, [])

  const stopScroll = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.stop()
      setIsLocked(true)
    }
  }, [])

  const startScroll = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.start()
      setIsLocked(false)
    }
  }, [])

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, offset = 0) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset, duration: 1.4 })
      } else {
        if (typeof target === "number") {
          window.scrollTo({ top: target, behavior: "smooth" })
        } else if (typeof target === "string") {
          document.querySelector(target)?.scrollIntoView({ behavior: "smooth" })
        } else {
          target.scrollIntoView({ behavior: "smooth" })
        }
      }
    },
    [],
  )

  const value = useMemo(
    () => ({ lenis, stopScroll, startScroll, scrollTo, isLocked }),
    [isLocked, lenis, scrollTo, startScroll, stopScroll],
  )

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  )
}
