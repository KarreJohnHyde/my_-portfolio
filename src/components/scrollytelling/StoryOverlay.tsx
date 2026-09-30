import React, { useEffect, useRef } from "react"
import NeuralTorusScene from "./NeuralTorusScene"

export interface StoryStageData {
  index: string
  chapter: string
  title: string
  kicker: string
  description: string
  metrics: { value: string label: string }[]
  tags: string[]
  liveUrl?: string
  color: string
}

export const storyStages: StoryStageData[] = [
  {
    index: "01",
    chapter: "CHAPTER 01 · VECTOR EMBEDDINGS",
    title: "Grounded Intelligence in Vector Space",
    kicker: "FAISS · DENSE EMBEDDINGS · RAG PIPELINE",
    description:
      "Transforming high-dimensional educational and clinical documents into dense semantic vector embeddings. Unifying chunk partitioning with sub-180ms grounded similarity search.",
    metrics: [
      { value: "94.2%", label: "RETRIEVAL ACCURACY" },
      { value: "< 180ms", label: "RETRIEVAL LATENCY" },
    ],
    tags: [
      "FAISS FlatIP",
      "LangChain",
      "Study2AI",
      "Cosine Metric",
      "Dense Vectors",
    ],
    liveUrl: "https://huggingface.co/spaces/Johnny2005/Final_Project",
    color: "#00FF66", // Electric Lime
  },
  {
    index: "02",
    chapter: "CHAPTER 02 · TOPOLOGICAL RETRIEVAL",
    title: "Cosine Similarity & Index Clustering",
    kicker: "HNSW PARTITIONING · HIGH-SPEED RETRIEVAL",
    description:
      "Particles collapse along the manifold of the Neural Knowledge Torus. Nearest-neighbor clusters isolate high-affinity document chunks with geometric cosine similarity projection.",
    metrics: [
      { value: "5 Centroids", label: "FAISS PARTITIONS" },
      { value: "1,536-D", label: "EMBEDDING SPACE" },
    ],
    tags: [
      "FAISS HNSW",
      "K-Means",
      "scikit-learn",
      "Cosine Sim",
      "Innoverse'26",
    ],
    liveUrl: "https://cognitivelearning-5zqpetkfjexgbjx5kdappgk.streamlit.app/",
    color: "#D4FF00", // Cyber Yellow / Gold
  },
  {
    index: "03",
    chapter: "CHAPTER 03 · GROUNDED SYNTHESIS",
    title: "Zero-Hallucination Agentic Pipeline",
    kicker: "STREAMING SYNTHESIS · CONTEXT INJECTION",
    description:
      "An axial query energy beam excites verified semantic nodes. Contextual citations are injected directly into LLM reasoning loops, eliminating hallucinations before generation.",
    metrics: [
      { value: "0.0%", label: "HALLUCINATION RATE" },
      { value: "Real-Time", label: "STREAMING TOKENS" },
    ],
    tags: [
      "Gradio Stream",
      "Context Injection",
      "AWS DynamoDB",
      "Lambda OCR",
      "Agentic Loops",
    ],
    liveUrl: "https://expense-tracker-rho-olive-10.vercel.app",
    color: "#00F0FF", // Electric Cyan
  },
  {
    index: "04",
    chapter: "CHAPTER 04 · PRODUCTION BENCHMARK",
    title: "Real-Time Evaluation & Deployment",
    kicker: "REACT 19 · DISTRIBUTED EDGE · ELITE VERIFIED",
    description:
      "The Neural Torus stabilizes into a crystalline production lattice. Deployed across global serverless edge nodes, validated with IIT Kanpur Elite and Sathyabama IST credentials.",
    metrics: [
      { value: "9 Credentials", label: "VERIFIED CREDENTIALS" },
      { value: "< 20ms", label: "GLOBAL EDGE LATENCY" },
    ],
    tags: [
      "IIT Kanpur Elite",
      "Sathyabama IST",
      "TypeScript",
      "React 19",
      "Production Ready",
    ],
    liveUrl: "https://github.com/KarreJohnHyde",
    color: "#A78BFA", // Cyber Violet
  },
]

interface StoryOverlayProps {
  progress: number
  activeStage: number
  inspectMode: boolean
  snapEnabled: boolean
  onToggleInspect: () => void
  onToggleSnap: () => void
  onJumpToStage: (index: number) => void
  mouseX: number
  mouseY: number
}

export default function StoryOverlay({
  progress,
  activeStage,
  inspectMode,
  snapEnabled,
  onToggleInspect,
  onToggleSnap,
  onJumpToStage,
  mouseX,
  mouseY,
}: StoryOverlayProps) {
  const currentStage = storyStages[activeStage] || storyStages[0]
  const canvasContainerRef = useRef<HTMLDivElement>(null)

  // OrbitControls receives the event on the canvas first. Stopping propagation
  // at the parent then keeps Lenis/the document from treating it as page scroll.
  useEffect(() => {
    const container = canvasContainerRef.current
    if (!container || !inspectMode) return

    const preventDocumentScroll = (event: Event) => {
      event.preventDefault()
      event.stopPropagation()
    }

    container.addEventListener("wheel", preventDocumentScroll, {
      passive: false,
    })
    container.addEventListener("touchmove", preventDocumentScroll, {
      passive: false,
    })

    return () => {
      container.removeEventListener("wheel", preventDocumentScroll)
      container.removeEventListener("touchmove", preventDocumentScroll)
    }
  }, [inspectMode])

  return (
    <div
      className={`story-overlay-pinned ${inspectMode ? "is-inspecting" : ""}`}
    >
      {/* 3D WebGL / R3F Canvas */}
      <div className="story-canvas-container" ref={canvasContainerRef}>
        <NeuralTorusScene
          inspectMode={inspectMode}
          mouseX={mouseX}
          mouseY={mouseY}
          progress={progress}
        />
      </div>

      {/* Cyber Vignette & Precision Grid Lines */}
      <div className="story-vignette" aria-hidden="true" />
      <div className="story-grid-lines" aria-hidden="true" />

      {/* Top HUD: Title, Chapter Badge, Inspect Toggle */}
      <header className="story-hud-top">
        <div className="hud-badge-group">
          <div className="hud-status-badge">
            <span className="hud-pulse-dot" />
            <span>NEURAL KNOWLEDGE TORUS · RAG &amp; VECTOR SPACE</span>
          </div>

          <div
            className="hud-chapter-pill"
            style={{
              borderColor: `${currentStage.color}44`,
              color: currentStage.color,
            }}
          >
            <span
              className="chapter-dot"
              style={{ background: currentStage.color }}
            />
            <span>{currentStage.chapter}</span>
          </div>
        </div>

        <div className="hud-controls-group">
          <button
            className={`hud-inspect-btn ${inspectMode ? "is-active" : ""}`}
            aria-pressed={inspectMode}
            onClick={onToggleInspect}
            title={
              inspectMode
                ? "Exit 3D inspection and resume document scroll"
                : "Lock scroll to inspect and rotate the 3D Neural Torus in 360°"
            }
            type="button"
          >
            <span className="inspect-indicator">{inspectMode ? "✦" : "○"}</span>
            <span>
              {inspectMode
                ? "EXIT 3D INSPECT (RESUME SCROLL)"
                : "INSPECT 3D MODEL"}
            </span>
          </button>

          <button
            aria-pressed={snapEnabled}
            className={`hud-snap-btn ${snapEnabled ? "is-active" : ""}`}
            onClick={onToggleSnap}
            title="Toggle gentle snapping to 25% story milestones after scrolling stops"
            type="button"
          >
            <span aria-hidden="true">⌁</span>
            <span>SOFT SNAP {snapEnabled ? "ON" : "OFF"}</span>
          </button>

          <span className="hud-telemetry-chip">2,400 PARTICLES</span>
          <span className="hud-telemetry-chip">GLSL SHADER</span>
        </div>
      </header>

      {/* Center Layer: one focused chapter card at a time. Rendering inactive
          cards beneath it created an unreadable ghosting effect on bright WebGL scenes. */}
      <main className="story-content-layer">
        <div className="story-cards-stack">
          <article
            aria-live="polite"
            className="story-card is-active"
            key={currentStage.index}
            style={{ borderLeftColor: currentStage.color }}
          >
            <div className="story-card-header">
              <span className="story-stage-index">/{currentStage.index}</span>
              <span
                className="story-kicker-pill"
                style={{
                  color: currentStage.color,
                  borderColor: `${currentStage.color}44`,
                  backgroundColor: `${currentStage.color}14`,
                }}
              >
                {currentStage.kicker}
              </span>
            </div>

            <h2 className="story-card-title">{currentStage.title}</h2>
            <p className="story-card-desc">{currentStage.description}</p>

            <div className="story-metrics-grid">
              {currentStage.metrics.map((metric) => (
                <div className="story-metric-item" key={metric.label}>
                  <div className="metric-val-wrapper">
                    <strong
                      className="story-metric-val"
                      style={{ color: currentStage.color }}
                    >
                      {metric.value}
                    </strong>
                  </div>
                  <span className="story-metric-lbl">{metric.label}</span>
                </div>
              ))}
            </div>

            <div className="story-tags-row">
              {currentStage.tags.map((tag) => (
                <span className="story-tag-chip" key={tag}>
                  {tag}
                </span>
              ))}
            </div>

            {currentStage.liveUrl && (
              <div className="story-card-footer">
                <a
                  className="story-action-btn"
                  href={currentStage.liveUrl}
                  rel="noreferrer"
                  style={{
                    background: currentStage.color,
                    color: "#0a0a0c",
                  }}
                  target="_blank"
                >
                  <span>Explore Production Demo</span>
                  <span className="action-arrow">↗</span>
                </a>
              </div>
            )}
          </article>
        </div>
      </main>

      {/* Bottom HUD: Progress Scrub Bar, Stage Steppers, and Depth Indicator */}
      <footer className="story-hud-bottom">
        <div className="story-scrub-track">
          <div
            className="story-scrub-fill"
            style={{
              width: `${Math.round(progress * 100)}%`,
              backgroundColor: currentStage.color,
              boxShadow: `0 0 16px ${currentStage.color}`,
            }}
          />
        </div>

        <div className="story-bottom-controls">
          <nav
            aria-label="Story chapter stepper"
            className="story-stage-stepper"
          >
            {storyStages.map((st, idx) => (
              <button
                className={`story-step-pill ${
                  activeStage === idx ? "is-active" : ""
                }`}
                key={st.index}
                onClick={() => onJumpToStage(idx)}
                style={
                  {
                    "--stage-color": st.color,
                  } as React.CSSProperties
                }
                type="button"
              >
                <span className="step-num">{st.index}</span>
                <span className="step-sep">·</span>
                <span className="step-title">{st.title.split(" ")[0]}</span>
              </button>
            ))}
          </nav>

          <div className="story-depth-readout">
            <span>SCROLL PROGRESS</span>
            <strong style={{ color: currentStage.color }}>
              {Math.round(progress * 100)}%
            </strong>
          </div>
        </div>
      </footer>
    </div>
  )
}
