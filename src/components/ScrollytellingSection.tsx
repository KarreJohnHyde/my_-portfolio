import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { scrollToTarget } from "../lib/smoothScroll"

gsap.registerPlugin(ScrollTrigger)

export interface ScrollytellingStage {
  index: string
  phase: string
  title: string
  kicker: string
  description: string
  tags: string[]
  metric: { value: string; label: string }
  projectLink: {
    name: string
    url: string
  }
  color: string
  soundFreq: number
  topologyName: string
}

const stages: ScrollytellingStage[] = [
  {
    index: "01",
    phase: "RAG & VECTOR EMBEDDINGS",
    title: "Grounded Intelligence in Vector Space",
    kicker: "FAISS · LANGCHAIN · SEMANTIC SEARCH",
    description:
      "Transforming complex educational and clinical documents into dense multidimensional vector embeddings. Powered by FAISS similarity indexing and asynchronous retrieval pipelines for sub-180ms grounded responses.",
    tags: ["FAISS Vector DB", "LangChain", "Study2AI", "Cosine Similarity", "RAG Pipeline"],
    metric: { value: "94.2%", label: "RETRIEVAL ACCURACY" },
    projectLink: {
      name: "Study2AI Live Demo",
      url: "https://huggingface.co/spaces/Johnny2005/Final_Project",
    },
    color: "#cbff47", // Acid lime
    soundFreq: 523.25, // C5
    topologyName: "NEURAL KNOWLEDGE TORUS",
  },
  {
    index: "02",
    phase: "COGNITIVE ML & LATENT ARCHETYPES",
    title: "Unsupervised Behavioral Discovery",
    kicker: "K-MEANS · PCA · INNOVERSE'26 WINNER",
    description:
      "Extracting 8+ behavioral dimensions to classify students into 5 cognitive archetypes. Built during a 24-hour sprint at Innoverse'26 with real-time PCA dimensionality projection and dynamic recommendation scoring.",
    tags: ["scikit-learn", "K-Means", "PCA 3D Projection", "Streamlit", "Innoverse'26"],
    metric: { value: "05", label: "COGNITIVE ARCHETYPES" },
    projectLink: {
      name: "Cognitive Learning Live",
      url: "https://cognitivelearning-5zqpetkfjexgbjx5kdappgk.streamlit.app/",
    },
    color: "#45e6f0", // Electric Cyan
    soundFreq: 659.25, // E5
    topologyName: "PCA DOUBLE HELIX MANIFOLD",
  },
  {
    index: "03",
    phase: "DISTRIBUTED CLOUD & EDGE NODES",
    title: "Serverless Speed at Global Edge",
    kicker: "AWS DYNAMODB · LAMBDA · ANYCAST CDN",
    description:
      "Deploying high-throughput serverless applications across AWS Lambda, DynamoDB ledgers, and globally distributed micro-frontends with sub-20ms edge execution.",
    tags: ["AWS DynamoDB", "Lambda OCR", "Expense AI", "Vercel Edge", "Cloud Computing Elite"],
    metric: { value: "< 20ms", label: "GLOBAL EDGE LATENCY" },
    projectLink: {
      name: "Expense AI Production",
      url: "https://expense-tracker-rho-olive-10.vercel.app",
    },
    color: "#25d366", // Emerald
    soundFreq: 783.99, // G5
    topologyName: "GEODESIC EDGE GLOBE",
  },
  {
    index: "04",
    phase: "PRODUCTION REASONING & AGENTS",
    title: "Autonomous Tool Use & Convergence",
    kicker: "AGENTIC ARCHITECTURES · REACT 19 · 2026",
    description:
      "Bridging frontier generative AI and agentic reasoning loops with resilient full-stack architectures. Certified in Agentic Architectures with Sathyabama IST and Elite Distributed Systems from IIT Kanpur.",
    tags: ["Agentic AI", "TypeScript", "React 19", "IIT Kanpur Elite", "Sathyabama IST"],
    metric: { value: "09", label: "VERIFIED CREDENTIALS" },
    projectLink: {
      name: "View GitHub Repositories",
      url: "https://github.com/KarreJohnHyde",
    },
    color: "#a78bfa", // Violet
    soundFreq: 1046.5, // C6
    topologyName: "AGENTIC HARMONIC VORTEX",
  },
]

export default function ScrollytellingSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeStage, setActiveStage] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isPinned, setIsPinned] = useState(false)
  const [fps, setFps] = useState(60)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [orbitDragActive, setOrbitDragActive] = useState(false)

  // Web Audio Context reference
  const audioContextRef = useRef<AudioContext | null>(null)
  const audioEnabledRef = useRef(false)
  const lastSoundStageRef = useRef(-1)

  useEffect(() => {
    audioEnabledRef.current = audioEnabled
  }, [audioEnabled])

  const triggerChime = (freq: number) => {
    if (!audioEnabledRef.current) return
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx()
      }
      const ctx = audioContextRef.current
      if (ctx.state === "suspended") {
        ctx.resume()
      }
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sine"
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.18)
      gain.gain.setValueAtTime(0.045, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.42)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.45)
    } catch {
      // AudioContext not available or blocked
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const track = trackRef.current
    if (!canvas || !track) return

    // ─────────────────────────────────────────────────────────────
    // THREE.JS SCENE SETUP
    // ─────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      54,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      120,
    )
    camera.position.set(0, 0, 8.8)

    // ─────────────────────────────────────────────────────────────
    // 2,000 PARTICLES WITH 4 DISTINCT MATHEMATICAL MORPH TARGETS
    // ─────────────────────────────────────────────────────────────
    const PARTICLE_COUNT = 2000
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const targetPos1 = new Float32Array(PARTICLE_COUNT * 3) // Neural Torus (FAISS RAG)
    const targetPos2 = new Float32Array(PARTICLE_COUNT * 3) // Double Helix + PCA clusters (ML)
    const targetPos3 = new Float32Array(PARTICLE_COUNT * 3) // Geodesic globe + orbit ring (Cloud)
    const targetPos4 = new Float32Array(PARTICLE_COUNT * 3) // Agentic harmonic vortex (Reasoning)
    const aRandom = new Float32Array(PARTICLE_COUNT)
    const aSize = new Float32Array(PARTICLE_COUNT)

    // Stage 2 Centroids for PCA 5 Archetypes
    const centroids = [
      new THREE.Vector3(-1.8, 1.6, 0.4),
      new THREE.Vector3(1.8, 1.4, -0.4),
      new THREE.Vector3(-1.5, -1.5, 0.5),
      new THREE.Vector3(1.5, -1.3, -0.5),
      new THREE.Vector3(0.0, 0.0, 1.2),
    ]

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3

      // Target 1: Torus Knot / Dense Vector Knowledge Manifold (RAG)
      const u = Math.random() * Math.PI * 2
      const v = Math.random() * Math.PI * 2
      const rMajor = 3.3 + Math.sin(v * 3) * 0.45
      targetPos1[i3] = rMajor * Math.cos(u) + (Math.random() - 0.5) * 0.35
      targetPos1[i3 + 1] = rMajor * Math.sin(u) + (Math.random() - 0.5) * 0.35
      targetPos1[i3 + 2] = Math.sin(u * 2) * 1.5 + (Math.random() - 0.5) * 0.35

      // Target 2: Double Helix + 5 Cognitive PCA Cluster Centroids (ML)
      if (i < PARTICLE_COUNT * 0.6) {
        // Double helix strands
        const t = (i / (PARTICLE_COUNT * 0.6)) * Math.PI * 8 - Math.PI * 4
        const strand = i % 2 === 0 ? 1 : -1
        const rH = 2.4 + (Math.random() - 0.5) * 0.5
        targetPos2[i3] = Math.cos(t) * rH * strand + (Math.random() - 0.5) * 0.3
        targetPos2[i3 + 1] = (i / (PARTICLE_COUNT * 0.6)) * 6.8 - 3.4
        targetPos2[i3 + 2] = Math.sin(t) * rH * strand + (Math.random() - 0.5) * 0.3
      } else {
        // Distributed around 5 PCA centroid clusters
        const cluster = centroids[i % 5]
        targetPos2[i3] = cluster.x + (Math.random() - 0.5) * 1.4
        targetPos2[i3 + 1] = cluster.y + (Math.random() - 0.5) * 1.4
        targetPos2[i3 + 2] = cluster.z + (Math.random() - 0.5) * 1.4
      }

      // Target 3: Geodesic Globe + Planetary Anycast Orbit Ring (Cloud Edge)
      if (i < PARTICLE_COUNT * 0.72) {
        // Fibonacci Golden Spiral Sphere
        const phi = Math.acos(1 - 2 * (i / (PARTICLE_COUNT * 0.72)))
        const theta = Math.PI * (1 + Math.sqrt(5)) * i
        const rG = 2.9 + (Math.random() - 0.5) * 0.22
        targetPos3[i3] = rG * Math.sin(phi) * Math.cos(theta)
        targetPos3[i3 + 1] = rG * Math.sin(phi) * Math.sin(theta)
        targetPos3[i3 + 2] = rG * Math.cos(phi)
      } else {
        // High-velocity orbital ring
        const angle = (i / (PARTICLE_COUNT * 0.28)) * Math.PI * 2
        const rOrbit = 4.3 + (Math.random() - 0.5) * 0.35
        targetPos3[i3] = Math.cos(angle) * rOrbit
        targetPos3[i3 + 1] = Math.sin(angle * 1.6) * 0.95
        targetPos3[i3 + 2] = Math.sin(angle) * rOrbit
      }

      // Target 4: Agentic Harmonic Vortex Convergence (Autonomous Reasoning)
      const angleVortex = i * 0.115
      const radiusVortex = Math.sqrt(i / PARTICLE_COUNT) * 4.3
      const heightVortex = (Math.random() - 0.5) * 2.8
      targetPos4[i3] = Math.cos(angleVortex) * radiusVortex + (Math.random() - 0.5) * 0.4
      targetPos4[i3 + 1] = heightVortex * (1.0 - radiusVortex / 4.3)
      targetPos4[i3 + 2] = Math.sin(angleVortex) * radiusVortex + (Math.random() - 0.5) * 0.4

      // Default start = Target 1
      positions[i3] = targetPos1[i3]
      positions[i3 + 1] = targetPos1[i3 + 1]
      positions[i3 + 2] = targetPos1[i3 + 2]

      aRandom[i] = Math.random()
      aSize[i] = 14.0 + Math.random() * 22.0
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("targetPos1", new THREE.BufferAttribute(targetPos1, 3))
    geometry.setAttribute("targetPos2", new THREE.BufferAttribute(targetPos2, 3))
    geometry.setAttribute("targetPos3", new THREE.BufferAttribute(targetPos3, 3))
    geometry.setAttribute("targetPos4", new THREE.BufferAttribute(targetPos4, 3))
    geometry.setAttribute("aRandom", new THREE.BufferAttribute(aRandom, 1))
    geometry.setAttribute("aSize", new THREE.BufferAttribute(aSize, 1))

    // ─────────────────────────────────────────────────────────────
    // GLSL VERTEX & FRAGMENT SHADERS (HIGH-PRECISION WEBGL)
    // ─────────────────────────────────────────────────────────────
    const vertexShader = `
      uniform float uTime;
      uniform float uScroll;
      uniform float uMouseX;
      uniform float uMouseY;
      uniform float uOrbitX;
      uniform float uOrbitY;

      attribute vec3 targetPos1;
      attribute vec3 targetPos2;
      attribute vec3 targetPos3;
      attribute vec3 targetPos4;
      attribute float aRandom;
      attribute float aSize;

      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vec3 pos;
        if (uScroll < 0.333) {
          float t = smoothstep(0.0, 0.333, uScroll);
          pos = mix(targetPos1, targetPos2, t);
        } else if (uScroll < 0.666) {
          float t = smoothstep(0.333, 0.666, uScroll);
          pos = mix(targetPos2, targetPos3, t);
        } else {
          float t = smoothstep(0.666, 1.0, uScroll);
          pos = mix(targetPos3, targetPos4, t);
        }

        // Ambient fluid motion
        pos.x += sin(uTime * 1.3 + aRandom * 6.28) * 0.12;
        pos.y += cos(uTime * 1.1 + aRandom * 6.28) * 0.12;
        pos.z += sin(uTime * 1.5 + pos.x * 0.8) * 0.12;

        // Interactive mouse force field repulsion / parallax
        float mouseDist = length(pos.xy - vec2(uMouseX * 4.0, uMouseY * 4.0));
        float force = smoothstep(2.5, 0.0, mouseDist) * 0.45;
        pos.xy += (pos.xy - vec2(uMouseX * 4.0, uMouseY * 4.0)) * force;

        // Dynamic 3D rotation tied to scroll + continuous time + user orbit drag
        float totalRotY = uScroll * 3.14159 * 2.2 + uTime * 0.22 + uOrbitX;
        float cosY = cos(totalRotY);
        float sinY = sin(totalRotY);
        float xRot = pos.x * cosY - pos.z * sinY;
        float zRot = pos.x * sinY + pos.z * cosY;
        pos.x = xRot;
        pos.z = zRot;

        // Orbit X tilt
        float totalRotX = uOrbitY + sin(uScroll * 3.14159) * 0.2;
        float cosX = cos(totalRotX);
        float sinX = sin(totalRotX);
        float yRot = pos.y * cosX - pos.z * sinX;
        zRot = pos.y * sinX + pos.z * cosX;
        pos.y = yRot;
        pos.z = zRot;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = (aSize * (22.0 / -mvPosition.z)) * (0.85 + sin(uTime * 2.2 + aRandom * 6.28) * 0.22);
        gl_Position = projectionMatrix * mvPosition;

        // Chromatic Color Interpolation
        vec3 cAcid = vec3(0.796, 1.0, 0.278);   // #cbff47 Acid Lime
        vec3 cCyan = vec3(0.271, 0.902, 0.941);  // #45e6f0 Cyan
        vec3 cGreen = vec3(0.145, 0.827, 0.4);   // #25d366 Emerald
        vec3 cViolet = vec3(0.655, 0.545, 0.98); // #a78bfa Violet

        if (uScroll < 0.333) {
          vColor = mix(cAcid, cCyan, uScroll / 0.333);
        } else if (uScroll < 0.666) {
          vColor = mix(cCyan, cGreen, (uScroll - 0.333) / 0.333);
        } else {
          vColor = mix(cGreen, cViolet, (uScroll - 0.666) / 0.334);
        }

        vAlpha = 0.55 + 0.45 * sin(uTime * 2.0 + aRandom * 6.28);
      }
    `

    const fragmentShader = `
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;

        // Luminous radial glow falloff
        float glow = smoothstep(0.5, 0.0, dist);
        // Intense bright core
        float core = smoothstep(0.16, 0.0, dist) * 0.9;

        gl_FragColor = vec4(vColor + vec3(core), vAlpha * glow);
      }
    `

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uMouseX: { value: 0 },
        uMouseY: { value: 0 },
        uOrbitX: { value: 0 },
        uOrbitY: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const particleSystem = new THREE.Points(geometry, material)
    scene.add(particleSystem)

    // ─────────────────────────────────────────────────────────────
    // EMBEDDED 3D WIREFRAME MESH STRUCTURES
    // ─────────────────────────────────────────────────────────────
    const ringGeo = new THREE.TorusGeometry(3.1, 0.02, 16, 100)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x45e6f0,
      transparent: true,
      opacity: 0.16,
      wireframe: true,
    })
    const ringMesh = new THREE.Mesh(ringGeo, ringMat)
    ringMesh.rotation.x = Math.PI / 2.3
    scene.add(ringMesh)

    const icosaGeo = new THREE.IcosahedronGeometry(1.6, 1)
    const icosaMat = new THREE.MeshBasicMaterial({
      color: 0xcbff47,
      transparent: true,
      opacity: 0.08,
      wireframe: true,
    })
    const icosaMesh = new THREE.Mesh(icosaGeo, icosaMat)
    scene.add(icosaMesh)

    // ─────────────────────────────────────────────────────────────
    // POINTER TRACKING & ORBIT DRAG
    // ─────────────────────────────────────────────────────────────
    let targetMouseX = 0
    let targetMouseY = 0
    let currentMouseX = 0
    let currentMouseY = 0

    let isDragging = false
    let startPointerX = 0
    let startPointerY = 0
    let targetOrbitX = 0
    let targetOrbitY = 0
    let currentOrbitX = 0
    let currentOrbitY = 0

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      targetMouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2.0
      targetMouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2.0

      if (isDragging) {
        const deltaX = e.clientX - startPointerX
        const deltaY = e.clientY - startPointerY
        targetOrbitX += deltaX * 0.006
        targetOrbitY += deltaY * 0.006
        startPointerX = e.clientX
        startPointerY = e.clientY
      }
    }

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true
      setOrbitDragActive(true)
      startPointerX = e.clientX
      startPointerY = e.clientY
    }

    const handlePointerUp = () => {
      isDragging = false
      setOrbitDragActive(false)
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    canvas.addEventListener("pointerdown", handlePointerDown)
    window.addEventListener("pointerup", handlePointerUp)

    // ─────────────────────────────────────────────────────────────
    // GSAP SCROLLTRIGGER (CANVAS PINNING & SCRUBBING)
    // ─────────────────────────────────────────────────────────────
    let trigger: ScrollTrigger | null = null

    try {
      trigger = ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.0,
        onUpdate: (self) => {
          const p = Math.max(0, Math.min(1, self.progress))
          setScrollProgress(p)
          material.uniforms.uScroll.value = p

          // Camera orbit path & dynamic zoom tied to scroll depth
          camera.position.z = 8.8 - Math.sin(p * Math.PI) * 1.7
          camera.position.y = Math.sin(p * Math.PI * 2.0) * 0.75
          camera.lookAt(0, 0, 0)

          ringMesh.rotation.z = p * Math.PI * 2
          icosaMesh.rotation.y = p * Math.PI * 3
          icosaMesh.scale.setScalar(0.9 + Math.sin(p * Math.PI) * 0.35)

          // Wireframe color shift
          if (p < 0.333) {
            ringMat.color.setHex(0xcbff47)
            icosaMat.color.setHex(0x45e6f0)
          } else if (p < 0.666) {
            ringMat.color.setHex(0x45e6f0)
            icosaMat.color.setHex(0x25d366)
          } else {
            ringMat.color.setHex(0xa78bfa)
            icosaMat.color.setHex(0xcbff47)
          }

          // Active stage determination (continuous threshold)
          const newStage = Math.min(3, Math.floor(p * 4))
          setActiveStage(newStage)

          // Audio chime on stage transition
          if (newStage !== lastSoundStageRef.current) {
            lastSoundStageRef.current = newStage
            triggerChime(stages[newStage].soundFreq)
          }
        },
        onToggle: (self) => {
          setIsPinned(self.isActive)
        },
      })
    } catch (err) {
      console.warn("ScrollTrigger binding error:", err)
    }

    // ─────────────────────────────────────────────────────────────
    // RESIZE & ANIMATION LOOP (WITH FPS MEASUREMENT)
    // ─────────────────────────────────────────────────────────────
    const handleResize = () => {
      if (!canvas) return
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    let animationFrameId: number
    const clock = new THREE.Clock()
    let frameCount = 0
    let lastFpsTime = performance.now()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()
      material.uniforms.uTime.value = elapsedTime

      // Smooth mouse interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.06
      currentMouseY += (targetMouseY - currentMouseY) * 0.06
      material.uniforms.uMouseX.value = currentMouseX
      material.uniforms.uMouseY.value = currentMouseY

      // Smooth orbit drag interpolation (damped return if not dragging)
      currentOrbitX += (targetOrbitX - currentOrbitX) * 0.08
      currentOrbitY += (targetOrbitY - currentOrbitY) * 0.08
      material.uniforms.uOrbitX.value = currentOrbitX
      material.uniforms.uOrbitY.value = currentOrbitY

      ringMesh.rotation.y = elapsedTime * 0.14

      renderer.render(scene, camera)

      // FPS Calculation
      frameCount += 1
      const now = performance.now()
      if (now - lastFpsTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastFpsTime)))
        frameCount = 0
        lastFpsTime = now
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("pointermove", handlePointerMove)
      canvas.removeEventListener("pointerdown", handlePointerDown)
      window.removeEventListener("pointerup", handlePointerUp)
      window.removeEventListener("resize", handleResize)
      if (trigger) trigger.kill()
      geometry.dispose()
      material.dispose()
      ringGeo.dispose()
      ringMat.dispose()
      icosaGeo.dispose()
      icosaMat.dispose()
      renderer.dispose()
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {})
      }
    }
  }, [])

  const current = stages[activeStage]

  const jumpToStage = (idx: number) => {
    if (!trackRef.current) return
    const trackRect = trackRef.current.getBoundingClientRect()
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const trackTop = trackRect.top + scrollTop
    const trackHeight = trackRef.current.scrollHeight - window.innerHeight
    const targetY = trackTop + trackHeight * (idx / (stages.length - 1))
    triggerChime(stages[idx].soundFreq)
    scrollToTarget(targetY)
  }

  return (
    <section className="scrollytelling-track" id="scrollytelling" ref={trackRef}>
      {/* STICKY PINNED 3D VIEWPORT CONTAINER */}
      <div className={`scrollytelling-pinned ${isPinned ? "is-pinned" : ""}`}>
        {/* Three.js WebGL Particle Canvas with Custom GLSL Shader */}
        <canvas
          className={`scrollytelling-canvas ${orbitDragActive ? "is-orbiting" : ""}`}
          ref={canvasRef}
          title="Click and drag to rotate the 3D topology in real-time"
        />

        {/* Ambient Vignette & Blueprint Matrix Overlays */}
        <div className="scrollytelling-vignette" aria-hidden="true" />
        <div className="scrollytelling-grid-lines" aria-hidden="true" />

        {/* TOP HUD: Technical Metadata & Telemetry */}
        <div className="scrollytelling-hud-top">
          <div className="hud-badge-group">
            <div className="hud-badge">
              <span className="live-dot" />
              <span>3D SCROLLYTELLING · GSAP PINNED CANVAS</span>
            </div>
            <div className="hud-topology-pill" style={{ borderColor: `${current.color}44` }}>
              <span className="topology-dot" style={{ background: current.color }} />
              <span style={{ color: current.color }}>{current.topologyName}</span>
            </div>
          </div>

          <div className="hud-metrics-row">
            <button
              className={`hud-audio-btn ${audioEnabled ? "active" : ""}`}
              onClick={() => {
                const nextState = !audioEnabled
                setAudioEnabled(nextState)
                if (nextState) triggerChime(523.25)
              }}
              title="Toggle Scrollytelling Harmonic Audio Chimes"
              type="button"
            >
              <span>{audioEnabled ? "AUDIO ON" : "AUDIO MUTED"}</span>
              <span className="audio-icon">{audioEnabled ? "✦" : "○"}</span>
            </button>
            <span className="hud-chip">2,000 PARTICLES</span>
            <span className="hud-chip">{fps} FPS</span>
            <span className="hud-chip">DRAG 3D ORBIT</span>
          </div>
        </div>

        {/* DYNAMIC SCROLL-LINKED NARRATIVE CARDS LAYER */}
        <div className="scrollytelling-content-layer">
          <div className="scrollytelling-cards-stack">
            {stages.map((st, i) => {
              // Calculate continuous proximity to this stage center
              const center = i / (stages.length - 1)
              const distance = Math.abs(scrollProgress - center)
              const isVisible = distance < 0.28
              const opacity = Math.max(0, Math.min(1, 1 - distance * 3.8))
              const translateY = (scrollProgress - center) * -50
              const scale = 1 - distance * 0.2

              return (
                <div
                  className={`scrollytelling-card ${activeStage === i ? "is-active-stage" : ""}`}
                  key={st.index}
                  style={{
                    opacity: isVisible ? opacity : 0,
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    pointerEvents: isVisible && opacity > 0.4 ? "auto" : "none",
                    visibility: isVisible ? "visible" : "hidden",
                    borderLeftColor: st.color,
                  }}
                >
                  <div className="scrollytelling-card-header">
                    <span className="scrollytelling-stage-num">{st.index}</span>
                    <span
                      className="scrollytelling-phase-pill"
                      style={{ color: st.color, borderColor: `${st.color}33` }}
                    >
                      {st.phase}
                    </span>
                    <span className="scrollytelling-kicker">{st.kicker}</span>
                  </div>

                  <h2 className="scrollytelling-card-title">{st.title}</h2>
                  <p className="scrollytelling-card-desc">{st.description}</p>

                  <div className="scrollytelling-tag-row">
                    {st.tags.map((tag) => (
                      <span className="scrollytelling-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="scrollytelling-footer-row">
                    <div className="scrollytelling-stat">
                      <strong style={{ color: st.color }}>{st.metric.value}</strong>
                      <span>{st.metric.label}</span>
                    </div>

                    <a
                      className="scrollytelling-action-btn"
                      href={st.projectLink.url}
                      rel="noreferrer"
                      target="_blank"
                      title={`Open ${st.projectLink.name}`}
                    >
                      <span>{st.projectLink.name}</span>
                      <span className="arrow-glyph">↗</span>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* BOTTOM HUD: SCRUBBED TIMELINE & STAGE STEPPER */}
        <div className="scrollytelling-hud-bottom">
          <div className="scrollytelling-progress-container">
            <div
              className="scrollytelling-progress-fill"
              style={{
                width: `${Math.round(scrollProgress * 100)}%`,
                background: current.color,
              }}
            />
          </div>

          <div className="scrollytelling-bottom-bar">
            <div className="scrollytelling-stepper">
              {stages.map((st, i) => (
                <button
                  className={`scrollytelling-step-btn ${activeStage === i ? "active" : ""}`}
                  key={st.index}
                  onClick={() => jumpToStage(i)}
                  style={{ "--stage-accent": st.color } as React.CSSProperties}
                  type="button"
                >
                  <span className="step-num">{st.index}</span>
                  <span className="step-label">{st.phase.split("&")[0]}</span>
                </button>
              ))}
            </div>

            <div className="scrollytelling-status-pills">
              <span className="scrollytelling-depth-counter">
                <span>SCROLL DEPTH</span>
                <strong style={{ color: current.color }}>
                  {Math.round(scrollProgress * 100)}%
                </strong>
              </span>
              <span className="drag-hint">DRAG CANVAS FOR 3D VIEW</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
