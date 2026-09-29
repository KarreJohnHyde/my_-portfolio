import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { scrollToTarget } from "../lib/smoothScroll"

gsap.registerPlugin(ScrollTrigger)

const stages = [
  {
    index: "01",
    phase: "RAG & VECTOR EMBEDDINGS",
    title: "Grounded Intelligence in Vector Space",
    kicker: "FAISS · LANGCHAIN · SEMANTIC SEARCH",
    description:
      "Transforming complex educational and clinical documents into dense multidimensional vector embeddings. Powered by FAISS similarity indexing and asynchronous retrieval pipelines for sub-180ms grounded responses.",
    tags: ["FAISS Vector DB", "LangChain", "Study2AI", "Cosine Similarity", "RAG"],
    metric: { value: "94.2%", label: "RETRIEVAL ACCURACY" },
    projectLink: {
      name: "Study2AI Live Demo",
      url: "https://huggingface.co/spaces/Johnny2005/Final_Project",
    },
    color: "#cbff47", // Acid lime
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
    color: "#45e6f0", // Cyan
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
    color: "#25d366", // Emerald / Green
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
  },
]

export default function ScrollytellingSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeStage, setActiveStage] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isInteractive, setIsInteractive] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const track = trackRef.current
    if (!canvas || !track) return

    // ─────────────────────────────────────────────────────────────
    // THREE.JS SETUP
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
      55,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100,
    )
    camera.position.set(0, 0, 8.5)

    // Particle Count & Buffers
    const PARTICLE_COUNT = 1400
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const targetPos1 = new Float32Array(PARTICLE_COUNT * 3) // Neural Torus / Knowledge ring
    const targetPos2 = new Float32Array(PARTICLE_COUNT * 3) // Double Helix / PCA Clusters
    const targetPos3 = new Float32Array(PARTICLE_COUNT * 3) // Globe / Edge sphere with orbit rings
    const targetPos4 = new Float32Array(PARTICLE_COUNT * 3) // Agentic Vortex Convergence
    const aRandom = new Float32Array(PARTICLE_COUNT)
    const aSize = new Float32Array(PARTICLE_COUNT)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3

      // Target 1: Torus Knot / Knowledge Ring (FAISS RAG)
      const u = Math.random() * Math.PI * 2
      const v = Math.random() * Math.PI * 2
      const r1 = 3.2 + Math.sin(v * 3) * 0.5
      targetPos1[i3] = r1 * Math.cos(u) + (Math.random() - 0.5) * 0.4
      targetPos1[i3 + 1] = r1 * Math.sin(u) + (Math.random() - 0.5) * 0.4
      targetPos1[i3 + 2] = Math.sin(u * 2) * 1.4 + (Math.random() - 0.5) * 0.4

      // Target 2: Double Helix / PCA Latent Space (Cognitive ML)
      const tHelix = (i / PARTICLE_COUNT) * Math.PI * 8 - Math.PI * 4
      const strand = i % 2 === 0 ? 1 : -1
      const radiusHelix = 2.2 + (Math.random() - 0.5) * 0.7
      targetPos2[i3] = Math.cos(tHelix) * radiusHelix * strand + (Math.random() - 0.5) * 0.5
      targetPos2[i3 + 1] = (i / PARTICLE_COUNT) * 7.0 - 3.5
      targetPos2[i3 + 2] = Math.sin(tHelix) * radiusHelix * strand + (Math.random() - 0.5) * 0.5

      // Target 3: 3D Globe with Orbital Rings (Cloud Edge)
      if (i < PARTICLE_COUNT * 0.7) {
        // Sphere (Fibonacci spiral)
        const phi = Math.acos(1 - 2 * (i / (PARTICLE_COUNT * 0.7)))
        const theta = Math.PI * (1 + Math.sqrt(5)) * i
        const rSphere = 2.8 + (Math.random() - 0.5) * 0.2
        targetPos3[i3] = rSphere * Math.sin(phi) * Math.cos(theta)
        targetPos3[i3 + 1] = rSphere * Math.sin(phi) * Math.sin(theta)
        targetPos3[i3 + 2] = rSphere * Math.cos(phi)
      } else {
        // Orbit ring
        const angle = (i / (PARTICLE_COUNT * 0.3)) * Math.PI * 2
        const rOrbit = 4.1 + (Math.random() - 0.5) * 0.3
        targetPos3[i3] = Math.cos(angle) * rOrbit
        targetPos3[i3 + 1] = Math.sin(angle * 1.5) * 0.8
        targetPos3[i3 + 2] = Math.sin(angle) * rOrbit
      }

      // Target 4: Agentic Harmonic Vortex (Production Agents)
      const angleVortex = i * 0.12
      const radiusVortex = Math.sqrt(i / PARTICLE_COUNT) * 4.2
      targetPos4[i3] = Math.cos(angleVortex) * radiusVortex + (Math.random() - 0.5) * 0.5
      targetPos4[i3 + 1] = (Math.random() - 0.5) * 2.8
      targetPos4[i3 + 2] = Math.sin(angleVortex) * radiusVortex + (Math.random() - 0.5) * 0.5

      // Initial positions = Target 1
      positions[i3] = targetPos1[i3]
      positions[i3 + 1] = targetPos1[i3 + 1]
      positions[i3 + 2] = targetPos1[i3 + 2]

      aRandom[i] = Math.random()
      aSize[i] = 12.0 + Math.random() * 20.0
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("targetPos1", new THREE.BufferAttribute(targetPos1, 3))
    geometry.setAttribute("targetPos2", new THREE.BufferAttribute(targetPos2, 3))
    geometry.setAttribute("targetPos3", new THREE.BufferAttribute(targetPos3, 3))
    geometry.setAttribute("targetPos4", new THREE.BufferAttribute(targetPos4, 3))
    geometry.setAttribute("aRandom", new THREE.BufferAttribute(aRandom, 1))
    geometry.setAttribute("aSize", new THREE.BufferAttribute(aSize, 1))

    // GLSL Shaders
    const vertexShader = `
      uniform float uTime;
      uniform float uScroll;
      uniform float uMouseX;
      uniform float uMouseY;
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
        if (uScroll < 0.33) {
          float t = smoothstep(0.0, 0.33, uScroll);
          pos = mix(targetPos1, targetPos2, t);
        } else if (uScroll < 0.66) {
          float t = smoothstep(0.33, 0.66, uScroll);
          pos = mix(targetPos2, targetPos3, t);
        } else {
          float t = smoothstep(0.66, 1.0, uScroll);
          pos = mix(targetPos3, targetPos4, t);
        }

        // Ambient breathing motion
        pos.x += sin(uTime * 1.2 + aRandom * 6.28) * 0.12;
        pos.y += cos(uTime * 1.0 + aRandom * 6.28) * 0.12;
        pos.z += sin(uTime * 1.4 + pos.x) * 0.12;

        // Mouse parallax influence
        pos.x += uMouseX * 0.6 * (1.0 - aRandom * 0.5);
        pos.y += uMouseY * 0.6 * (1.0 - aRandom * 0.5);

        // Rotation around Y axis proportional to scroll & time
        float rotAngle = uScroll * 3.14159 * 2.0 + uTime * 0.25;
        float cosR = cos(rotAngle);
        float sinR = sin(rotAngle);
        float xRot = pos.x * cosR - pos.z * sinR;
        float zRot = pos.x * sinR + pos.z * cosR;
        pos.x = xRot;
        pos.z = zRot;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = (aSize * (20.0 / -mvPosition.z)) * (0.85 + sin(uTime * 2.0 + aRandom * 6.0) * 0.2);
        gl_Position = projectionMatrix * mvPosition;

        // Palette blending
        vec3 cAcid = vec3(0.796, 1.0, 0.278);   // #cbff47
        vec3 cCyan = vec3(0.271, 0.902, 0.941);  // #45e6f0
        vec3 cGreen = vec3(0.145, 0.827, 0.4);   // #25d366
        vec3 cViolet = vec3(0.655, 0.545, 0.98); // #a78bfa

        if (uScroll < 0.33) {
          vColor = mix(cAcid, cCyan, uScroll / 0.33);
        } else if (uScroll < 0.66) {
          vColor = mix(cCyan, cGreen, (uScroll - 0.33) / 0.33);
        } else {
          vColor = mix(cGreen, cViolet, (uScroll - 0.66) / 0.34);
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

        float glow = smoothstep(0.5, 0.0, dist);
        float core = smoothstep(0.18, 0.0, dist) * 0.8;
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
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const particleSystem = new THREE.Points(geometry, material)
    scene.add(particleSystem)

    // Wireframe connection ring inside the 3D space
    const ringGeo = new THREE.TorusGeometry(3.0, 0.02, 16, 100)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x45e6f0,
      transparent: true,
      opacity: 0.18,
      wireframe: true,
    })
    const ringMesh = new THREE.Mesh(ringGeo, ringMat)
    ringMesh.rotation.x = Math.PI / 2.5
    scene.add(ringMesh)

    // Mouse Tracking
    let targetMouseX = 0
    let targetMouseY = 0
    let currentMouseX = 0
    let currentMouseY = 0

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      targetMouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2.0
      targetMouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2.0
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true })

    // ─────────────────────────────────────────────────────────────
    // GSAP SCROLLTRIGGER (CANVAS PINNING & TIMELINE SCRUBBING)
    // ─────────────────────────────────────────────────────────────
    let trigger: ScrollTrigger | null = null

    try {
      trigger = ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        onUpdate: (self) => {
          const p = Math.max(0, Math.min(1, self.progress))
          setScrollProgress(p)
          material.uniforms.uScroll.value = p

          // Camera orbit & zoom bound to scroll progress
          camera.position.z = 8.5 - Math.sin(p * Math.PI) * 1.6
          camera.position.y = Math.sin(p * Math.PI * 2) * 0.8
          ringMesh.rotation.z = p * Math.PI * 2

          // Active Stage calculation (4 stages: 0 to 3)
          const newStage = Math.min(3, Math.floor(p * 4))
          setActiveStage(newStage)
        },
      })
    } catch (err) {
      console.warn("ScrollTrigger binding:", err)
    }

    // ─────────────────────────────────────────────────────────────
    // RESIZE & RENDER LOOP
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

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()
      material.uniforms.uTime.value = elapsedTime

      // Smooth mouse interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.05
      currentMouseY += (targetMouseY - currentMouseY) * 0.05
      material.uniforms.uMouseX.value = currentMouseX
      material.uniforms.uMouseY.value = currentMouseY

      ringMesh.rotation.y = elapsedTime * 0.15

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("resize", handleResize)
      if (trigger) trigger.kill()
      geometry.dispose()
      material.dispose()
      ringGeo.dispose()
      ringMat.dispose()
      renderer.dispose()
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
    scrollToTarget(targetY)
  }

  return (
    <section className="scrollytelling-track" id="scrollytelling" ref={trackRef}>
      {/* STICKY PINNED VIEWPORT CONTAINER */}
      <div className="scrollytelling-pinned">
        {/* 3D WebGL Canvas with GLSL Shaders */}
        <canvas className="scrollytelling-canvas" ref={canvasRef} />

        {/* Ambient Vignette & Noise Overlays */}
        <div className="scrollytelling-vignette" aria-hidden="true" />
        <div className="scrollytelling-grid-lines" aria-hidden="true" />

        {/* Top HUD: Technical Metadata & Live FPS / Particles */}
        <div className="scrollytelling-hud-top">
          <div className="hud-badge">
            <span className="live-dot" />
            <span>3D SCROLLYTELLING · WEBGL GLSL SHADER</span>
          </div>

          <div className="hud-metrics-row">
            <span className="hud-chip">1,400 PARTICLES</span>
            <span className="hud-chip">CAMERA SCRUBBED</span>
            <span className="hud-chip">STICKY PINNED CANVAS</span>
          </div>
        </div>

        {/* Dynamic Storytelling Card Layer */}
        <div className="scrollytelling-content-layer">
          <div className="scrollytelling-card" key={current.index}>
            <div className="scrollytelling-card-header">
              <span className="scrollytelling-stage-num">{current.index}</span>
              <span className="scrollytelling-phase-pill" style={{ color: current.color }}>
                {current.phase}
              </span>
              <span className="scrollytelling-kicker">{current.kicker}</span>
            </div>

            <h2 className="scrollytelling-card-title">{current.title}</h2>
            <p className="scrollytelling-card-desc">{current.description}</p>

            <div className="scrollytelling-tag-row">
              {current.tags.map((tag) => (
                <span className="scrollytelling-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>

            <div className="scrollytelling-footer-row">
              <div className="scrollytelling-stat">
                <strong>{current.metric.value}</strong>
                <span>{current.metric.label}</span>
              </div>

              <a
                className="scrollytelling-action-btn"
                href={current.projectLink.url}
                rel="noreferrer"
                target="_blank"
                title={`Open ${current.projectLink.name}`}
              >
                <span>{current.projectLink.name}</span>
                <span className="arrow-glyph">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom HUD: Stage Stepper & Scrubbed Timeline */}
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
                <span className="step-label">{st.phase}</span>
              </button>
            ))}
          </div>

          <div className="scrollytelling-depth-counter">
            <span>SCROLL DEPTH</span>
            <strong>{Math.round(scrollProgress * 100)}%</strong>
          </div>
        </div>
      </div>
    </section>
  )
}
