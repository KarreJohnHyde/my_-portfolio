import React, { useRef } from "react"
import NeuralTorusScene from "./NeuralTorusScene"

export interface StoryStageData {
  index: string
  chapter: string
  title: string
  kicker: string
  description: string
  metrics: { value: string; label: string }[]
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
    tags: ["FAISS FlatIP", "LangChain", "Study2AI", "Cosine Metric", "Dense Vectors"],
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
    tags: ["FAISS HNSW", "K-Means", "scikit-learn", "Cosine Sim", "Innoverse'26"],
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
    tags: ["Gradio Stream", "Context Injection", "AWS DynamoDB", "Lambda OCR", "Agentic Loops"],
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
    tags: ["IIT Kanpur Elite", "Sathyabama IST", "TypeScript", "React 19", "Production Ready"],
    liveUrl: "https://github.com/KarreJohnHyde",
    color: "#A78BFA", // Cyber Violet
  },
]

interface StoryOverlayProps {
  progress: number
  activeStage: number
  inspectMode: boolean
  onToggleInspect: () => void
  onJumpToStage: (index: number) => void
  mouseX: number
  mouseY: number
}

export default function StoryOverlay({
  progress,
  activeStage,
  inspectMode,
  onToggleInspect,
  onJumpToStage,
  mouseX,
  mouseY,
}: StoryOverlayProps) {
  const currentStage = storyStages[activeStage] || storyStages[0]

  return (
    <div className="story-overlay-pinned">
      {/* 3D WebGL / R3F Canvas */}
      <div className="story-canvas-container">
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
            onClick={onToggleInspect}
            title={
              inspectMode
                ? "Exit 3D inspection and resume document scroll"
                : "Lock scroll to inspect and rotate the 3D Neural Torus in 360°"
            }
            type="button"
          >
            <span className="inspect-indicator">{inspectMode ? "✦" : "○"}</span>
            <span>{inspectMode ? "EXIT 3D INSPECT (RESUME SCROLL)" : "INSPECT 3D MODEL"}</span>
          </button>

          <span className="hud-telemetry-chip">2,400 PARTICLES</span>
          <span className="hud-telemetry-chip">GLSL SHADER</span>
        </div>
      </header>

      {/* Center Layer: Continuous Scroll-Linked Story Cards */}
      <main className="story-content-layer">
        <div className="story-cards-stack">
          {storyStages.map((stage, i) => {
            // Precise continuous scroll proximity math
            const center = i / (storyStages.length - 1)
            const distance = Math.abs(progress - center)
            const isVisible = distance < 0.28
            const opacity = Math.max(0, Math.min(1, 1 - distance * 3.8))
            const translateY = (progress - center) * -45
            const scale = 1 - distance * 0.18

            return (
              <article
                className={`story-card ${activeStage === i ? "is-active" : ""}`}
                key={stage.index}
                style={{
                  opacity: isVisible ? opacity : 0,
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  visibility: isVisible ? "visible" : "hidden",
                  pointerEvents: isVisible && opacity > 0.4 ? "auto" : "none",
                  borderLeftColor: stage.color,
                }}
              >
                <div className="story-card-header">
                  <span className="story-stage-index">/{stage.index}</span>
                  <span
                    className="story-kicker-pill"
                    style={{
                      color: stage.color,
                      borderColor: `${stage.color}33`,
                    }}
                  >
                    {stage.kicker}
                  </span>
                </div>

                <h2 className="story-card-title">{stage.title}</h2>
                <p className="story-card-desc">{stage.description}</p>

                <div className="story-metrics-grid">
                  {stage.metrics.map((m) => (
                    <div className="story-metric-item" key={m.label}>
                      <strong style={{ color: stage.color }}>{m.value}</strong>
                      <span>{m.label}</span>
                    </div>
                  ))}
                </div>

                <div className="story-tags-row">
                  {stage.tags.map((t) => (
                    <span className="story-tag-chip" key={t}>
                      {t}
                    </span>
                  ))}
                </div>

                {stage.liveUrl && (
                  <div className="story-card-footer">
                    <a
                      className="story-action-btn"
                      href={stage.liveUrl}
                      rel="noreferrer"
                      style={{
                        background: stage.color,
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
            )
          })}
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
          <nav aria-label="Story chapter stepper" className="story-stage-stepper">
            {storyStages.map((st, idx) => (
              <button
                className={`story-step-pill ${activeStage === idx ? "is-active" : ""}`}
                key={st.index}
                onClick={() => onJumpToStage(idx)}
                style={{
                  "--stage-color": st.color,
                } as React.CSSProperties}
                type="button"
              >
                <span className="step-num">{st.index}</span>
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
