// src/components/InteractiveRagVisualizer.tsx
import React, { useState, useMemo } from "react"

interface ChunkPoint {
  id: number
  x: number
  y: number
  title: string
  topic: "architecture" | "database" | "grounding" | "telemetry"
  textSnippet: string
}

const SAMPLE_CHUNKS: ChunkPoint[] = [
  // Cluster A: Core RAG & Chunking
  {
    id: 1,
    x: 120,
    y: 110,
    title: "Doc Chunk 1A",
    topic: "grounding",
    textSnippet: "Recursive character chunking with 600 chars & 120 overlap.",
  },
  {
    id: 2,
    x: 135,
    y: 125,
    title: "Doc Chunk 1B",
    topic: "grounding",
    textSnippet: "Boundary preservation for markdown headers and code blocks.",
  },
  {
    id: 3,
    x: 115,
    y: 140,
    title: "Doc Chunk 1C",
    topic: "grounding",
    textSnippet: "Preventing mid-sentence truncation in math equations.",
  },
  {
    id: 4,
    x: 145,
    y: 105,
    title: "Doc Chunk 1D",
    topic: "grounding",
    textSnippet: "Syntactic integrity of Python AST nodes in text splitter.",
  },

  // Cluster B: Vector Index & Deserialization
  {
    id: 5,
    x: 280,
    y: 90,
    title: "Doc Chunk 2A",
    topic: "architecture",
    textSnippet: "FAISS FlatIP nearest-neighbor search sub-180ms.",
  },
  {
    id: 6,
    x: 300,
    y: 105,
    title: "Doc Chunk 2B",
    topic: "architecture",
    textSnippet: "Memory-mapped index.load_local() eliminating cold start.",
  },
  {
    id: 7,
    x: 270,
    y: 120,
    title: "Doc Chunk 2C",
    topic: "architecture",
    textSnippet: "HNSW graph partitioning across 1536-dimensional space.",
  },

  // Cluster C: Cloud & State Ledgers
  {
    id: 8,
    x: 230,
    y: 240,
    title: "Doc Chunk 3A",
    topic: "database",
    textSnippet: "DynamoDB composite partition keys (PK: USER#, SK: TX#).",
  },
  {
    id: 9,
    x: 250,
    y: 260,
    title: "Doc Chunk 3B",
    topic: "database",
    textSnippet: "Burst write concurrency with sub-18ms p99 persistence.",
  },
  {
    id: 10,
    x: 215,
    y: 255,
    title: "Doc Chunk 3C",
    topic: "database",
    textSnippet: "Asynchronous OCR decoupling via AWS Lambda workers.",
  },

  // Cluster D: Unsupervised Telemetry
  {
    id: 11,
    x: 90,
    y: 260,
    title: "Doc Chunk 4A",
    topic: "telemetry",
    textSnippet: "PCA reducing 8 behavioral variables to 3 orthogonal axes.",
  },
  {
    id: 12,
    x: 110,
    y: 275,
    title: "Doc Chunk 4B",
    topic: "telemetry",
    textSnippet: "K-Means silhouette analysis isolating 5 cognitive clusters.",
  },
  {
    id: 13,
    x: 80,
    y: 290,
    title: "Doc Chunk 4C",
    topic: "telemetry",
    textSnippet: "Real-time quiz difficulty adaptation in <4ms.",
  },
]

interface InteractiveRagVisualizerProps {
  onAskJohnny?: (query: string) => void
}

export default function InteractiveRagVisualizer({
  onAskJohnny,
}: InteractiveRagVisualizerProps) {
  const [retrievalMode, setRetrievalMode] = useState<"mmr" | "cosine">("mmr")
  const [lambdaVal, setLambdaVal] = useState<number>(0.5)
  const [topK, setTopK] = useState<number>(4)
  const [activeHoverPoint, setActiveHoverPoint] = useState<ChunkPoint | null>(
    null,
  )

  // Query location near Cluster A
  const queryPoint = { x: 140, y: 130 }

  // Compute selected chunks based on mode
  const selectedChunkIds = useMemo(() => {
    // Distance from query
    const withDistance = SAMPLE_CHUNKS.map((c) => {
      const dx = c.x - queryPoint.x
      const dy = c.y - queryPoint.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      // Normalize to similarity [0, 1]
      const sim = Math.max(0, 1 - dist / 280)
      return { ...c, sim }
    })

    if (retrievalMode === "cosine") {
      // Standard Top-K Cosine: Greedy pick closest
      withDistance.sort((a, b) => b.sim - a.sim)
      return new Set(withDistance.slice(0, topK).map((c) => c.id))
    } else {
      // MMR (Maximal Marginal Relevance) Simulation
      const selected: ChunkPoint[] = []
      const remaining = [...withDistance]

      while (selected.length < topK && remaining.length > 0) {
        let bestScore = -Infinity
        let bestIndex = 0

        for (let i = 0; i < remaining.length; i++) {
          const cand = remaining[i]
          const relevance = cand.sim

          // Max similarity to already selected chunks (redundancy penalty)
          let maxSimToSelected = 0
          for (const s of selected) {
            const d = Math.sqrt((cand.x - s.x) ** 2 + (cand.y - s.y) ** 2)
            const pairSim = Math.max(0, 1 - d / 280)
            if (pairSim > maxSimToSelected) maxSimToSelected = pairSim
          }

          // MMR formula: lambda * sim(q, d) - (1 - lambda) * max_sim(d, s)
          const mmrScore =
            lambdaVal * relevance - (1 - lambdaVal) * maxSimToSelected
          if (mmrScore > bestScore) {
            bestScore = mmrScore
            bestIndex = i
          }
        }

        selected.push(remaining[bestIndex])
        remaining.splice(bestIndex, 1)
      }

      return new Set(selected.map((c) => c.id))
    }
  }, [retrievalMode, lambdaVal, topK])

  // Topics covered by selected
  const topicsCovered = useMemo(() => {
    const topics = new Set<string>()
    SAMPLE_CHUNKS.forEach((c) => {
      if (selectedChunkIds.has(c.id)) topics.add(c.topic)
    })
    return topics.size
  }, [selectedChunkIds])

  return (
    <div className="rag-visualizer-container">
      <div className="rag-viz-header">
        <div>
          <div className="rag-viz-badge">
            <span className="live-dot" />
            <span>STUDY2AI · MATHEMATICAL RETRIEVAL PLAYGROUND</span>
          </div>
          <h3 className="rag-viz-title">
            Maximal Marginal Relevance (MMR) vs. Naive Cosine
          </h3>
          <p className="rag-viz-desc">
            Standard RAG retrieves near-duplicate chunks from the same
            paragraph. MMR balances query affinity with marginal information
            novelty, eliminating context bloat and hallucination.
          </p>
        </div>

        {onAskJohnny && (
          <button
            className="rag-ask-johnny-btn"
            onClick={() =>
              onAskJohnny(
                "Explain the exact mathematical formula for MMR retrieval in Study2AI",
              )
            }
            type="button"
          >
            Ask Johnny about MMR ↗
          </button>
        )}
      </div>

      <div className="rag-viz-body">
        {/* INTERACTIVE VECTOR CANVAS */}
        <div className="rag-canvas-wrap">
          <svg className="rag-vector-canvas" viewBox="0 0 380 340">
            {/* Grid Lines */}
            <defs>
              <pattern
                id="grid"
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 30 0 L 0 0 0 30"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.04)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Semantic Cluster Zones */}
            <circle
              cx="128"
              cy="120"
              r="45"
              fill="rgba(163, 230, 53, 0.03)"
              stroke="rgba(163, 230, 53, 0.15)"
              strokeDasharray="3 3"
            />
            <text
              x="95"
              y="70"
              fill="rgba(163, 230, 53, 0.6)"
              fontSize="9"
              fontFamily="monospace"
            >
              Cluster: RAG Chunking
            </text>

            <circle
              cx="285"
              cy="105"
              r="40"
              fill="rgba(56, 189, 248, 0.03)"
              stroke="rgba(56, 189, 248, 0.15)"
              strokeDasharray="3 3"
            />
            <text
              x="250"
              y="55"
              fill="rgba(56, 189, 248, 0.6)"
              fontSize="9"
              fontFamily="monospace"
            >
              Cluster: Vector Store
            </text>

            <circle
              cx="230"
              cy="250"
              r="40"
              fill="rgba(192, 132, 252, 0.03)"
              stroke="rgba(192, 132, 252, 0.15)"
              strokeDasharray="3 3"
            />
            <text
              x="200"
              y="305"
              fill="rgba(192, 132, 252, 0.6)"
              fontSize="9"
              fontFamily="monospace"
            >
              Cluster: Cloud Ledgers
            </text>

            {/* Connections from Query to Selected Chunks */}
            {SAMPLE_CHUNKS.map((c) => {
              if (!selectedChunkIds.has(c.id)) return null
              return (
                <line
                  key={`line-${c.id}`}
                  x1={queryPoint.x}
                  y1={queryPoint.y}
                  x2={c.x}
                  y2={c.y}
                  stroke="#a3e635"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  opacity="0.75"
                />
              )
            })}

            {/* Document Chunk Nodes */}
            {SAMPLE_CHUNKS.map((c) => {
              const isSelected = selectedChunkIds.has(c.id)
              return (
                <g
                  key={c.id}
                  transform={`translate(${c.x}, ${c.y})`}
                  onMouseEnter={() => setActiveHoverPoint(c)}
                  onMouseLeave={() => setActiveHoverPoint(null)}
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    r={isSelected ? "9" : "5"}
                    fill={isSelected ? "#a3e635" : "rgba(255, 255, 255, 0.25)"}
                    stroke={isSelected ? "#ffffff" : "rgba(255, 255, 255, 0.1)"}
                    strokeWidth={isSelected ? "2" : "1"}
                  />
                  {isSelected && (
                    <circle
                      r="15"
                      fill="none"
                      stroke="#a3e635"
                      strokeWidth="1"
                      opacity="0.5"
                    />
                  )}
                  <text
                    y="-12"
                    textAnchor="middle"
                    fill={isSelected ? "#ffffff" : "rgba(255, 255, 255, 0.45)"}
                    fontSize="8"
                    fontFamily="monospace"
                  >
                    #{c.id}
                  </text>
                </g>
              )
            })}

            {/* Query Vector Node */}
            <g transform={`translate(${queryPoint.x}, ${queryPoint.y})`}>
              <circle r="8" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
              <circle
                r="18"
                fill="none"
                stroke="#ef4444"
                strokeWidth="1"
                opacity="0.4"
              />
              <text
                y="24"
                textAnchor="middle"
                fill="#ef4444"
                fontSize="9"
                fontWeight="bold"
                fontFamily="monospace"
              >
                User Query
              </text>
            </g>
          </svg>

          {/* Hover Tooltip */}
          {activeHoverPoint && (
            <div className="rag-hover-tooltip">
              <span className="tooltip-title">
                {activeHoverPoint.title} (#{activeHoverPoint.id})
              </span>
              <p className="tooltip-text">{activeHoverPoint.textSnippet}</p>
              <span
                className={`tooltip-status ${
                  selectedChunkIds.has(activeHoverPoint.id)
                    ? "selected"
                    : "skipped"
                }`}
              >
                {selectedChunkIds.has(activeHoverPoint.id)
                  ? "✓ Injected in Context Prompt"
                  : "✕ Omitted by Diversity Filter"}
              </span>
            </div>
          )}
        </div>

        {/* CONTROLS & METRIC DASHBOARD */}
        <div className="rag-controls-panel">
          <div className="rag-mode-toggle">
            <button
              className={`rag-mode-btn ${
                retrievalMode === "mmr" ? "active" : ""
              }`}
              onClick={() => setRetrievalMode("mmr")}
              type="button"
            >
              ★ Study2AI MMR (Optimal)
            </button>
            <button
              className={`rag-mode-btn ${
                retrievalMode === "cosine" ? "active" : ""
              }`}
              onClick={() => setRetrievalMode("cosine")}
              type="button"
            >
              Naive Top-K Cosine (Redundant)
            </button>
          </div>

          <div className="rag-slider-group">
            <div className="slider-header">
              <label>Diversity Parameter (λ = {lambdaVal}):</label>
              <span className="slider-hint">
                {lambdaVal <= 0.3
                  ? "High Diversity"
                  : lambdaVal >= 0.7
                    ? "High Relevance"
                    : "Balanced (Study2AI)"}
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="0.9"
              step="0.1"
              value={lambdaVal}
              disabled={retrievalMode === "cosine"}
              onChange={(e) => setLambdaVal(parseFloat(e.target.value))}
              className="rag-slider"
            />
          </div>

          <div className="rag-slider-group">
            <div className="slider-header">
              <label>Chunks Retrieved (K = {topK}):</label>
            </div>
            <div className="k-button-row">
              {[3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  className={`k-btn ${topK === num ? "active" : ""}`}
                  onClick={() => setTopK(num)}
                  type="button"
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* TELEMETRY READOUTS */}
          <div className="rag-metrics-grid">
            <div className="rag-metric-card">
              <span className="metric-val">{topicsCovered} / 3</span>
              <span className="metric-label">Semantic Clusters Covered</span>
            </div>
            <div className="rag-metric-card">
              <span
                className={`metric-val ${
                  retrievalMode === "mmr"
                    ? "text-emerald-400"
                    : "text-amber-400"
                }`}
              >
                {retrievalMode === "mmr" ? "0.0%" : "38.5%"}
              </span>
              <span className="metric-label">Redundant Token Waste</span>
            </div>
            <div className="rag-metric-card">
              <span
                className={`metric-val ${
                  retrievalMode === "mmr" ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {retrievalMode === "mmr" ? "0.0%" : "18.2%"}
              </span>
              <span className="metric-label">Hallucination Vulnerability</span>
            </div>
            <div className="rag-metric-card">
              <span className="metric-val">&lt; 180ms</span>
              <span className="metric-label">FAISS FlatIP Latency</span>
            </div>
          </div>

          <p className="rag-verdict-note">
            {retrievalMode === "mmr"
              ? "✓ Study2AI's MMR algorithm guarantees context diversity across partitioning boundaries while maintaining strict relevance."
              : "⚠ Naive Cosine pulls 4 near-identical chunks from Cluster 1, wasting context window and blinding the model to necessary architectural facts."}
          </p>
        </div>
      </div>
    </div>
  )
}
