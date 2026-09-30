import React from "react"

export interface ProjectData {
  id: string
  title: string
  category: string
  badge: string
  tech: string[]
  githubUrl: string
  liveUrl?: string
  star: {
    situation: string
    task: string
    action: string
    result: string
  }
  metrics: {
    value: string
    label: string
  }[]
  thumbnailSvgType: "vector-graph" | "serverless-ledger" | "pca-clusters" | "biomarker-curves"
}

const FEATURED_PROJECTS: ProjectData[] = [
  {
    id: "study2ai",
    title: "Study2AI",
    category: "Full-Stack RAG System",
    badge: "RAG · EDUCATION",
    tech: ["Python", "LangChain", "FAISS", "Gradio", "Hugging Face"],
    githubUrl: "https://github.com/KarreJohnHyde/STUDY2AI",
    liveUrl: "https://huggingface.co/spaces/Johnny2005/Final_Project",
    star: {
      situation:
        "Students faced severe factual hallucinations and arbitrary formula truncation when asking baseline LLMs to explain complex technical textbooks and syllabi.",
      task: "Architect an end-to-end grounded RAG pipeline that answers strictly from verified educational materials with zero unsupported assertions.",
      action:
        "Implemented recursive character splitting with syntax fence protection, FAISS vector indexing with MMR retrieval, and exact page-level citation tracing.",
      result:
        "Delivered 94.2% retrieval accuracy, sub-180ms vector query latency, and 0% hallucinated references across production benchmarks.",
    },
    metrics: [
      { value: "94.2%", label: "Retrieval Accuracy" },
      { value: "sub-180ms", label: "Vector Latency" },
      { value: "0%", label: "Hallucinations" },
    ],
    thumbnailSvgType: "vector-graph",
  },
  {
    id: "expense-ai",
    title: "Expense AI",
    category: "FinTech Serverless Ledger",
    badge: "AWS · SERVERLESS",
    tech: ["AWS Lambda", "DynamoDB", "Next.js", "OCR", "TypeScript"],
    githubUrl: "https://github.com/KarreJohnHyde/Expense_Tracker",
    liveUrl: "https://expense-tracker-rho-olive-10.vercel.app",
    star: {
      situation:
        "Manual receipt transcription required 45+ seconds per entry, driving high user abandonment, while relational databases suffered lock contention during billing spikes.",
      task: "Engineer an automated receipt OCR extraction, instant QR payment verification, and serverless ledger pipeline.",
      action:
        "Built AWS Lambda microservices with optical character recognition, Next.js optimistic client state, and a single-table DynamoDB composite key structure.",
      result:
        "Reduced receipt logging time from 45s to <3 seconds, maintaining 18ms p99 write latency under burst concurrency.",
    },
    metrics: [
      { value: "<3 sec", label: "Receipt Log Time" },
      { value: "18ms", label: "p99 Write Latency" },
      { value: "100%", label: "Serverless Scale" },
    ],
    thumbnailSvgType: "serverless-ledger",
  },
  {
    id: "cognitive-learning",
    title: "Cognitive Learning",
    category: "Unsupervised ML Profiler",
    badge: "INNOVERSE'26 WINNER",
    tech: ["Python", "scikit-learn", "PCA", "K-Means", "Streamlit"],
    githubUrl: "https://github.com/KarreJohnHyde/cognitive_learning",
    liveUrl: "https://cognitivelearning-5zqpetkfjexgbjx5kdappgk.streamlit.app/",
    star: {
      situation:
        "Educational software evaluates learners purely on binary pass/fail scores, blind to cognitive friction patterns like hesitation pauses and hint dependence.",
      task: "Build an unsupervised ML engine categorizing learners into real-time behavioral archetypes without requiring pre-labeled training datasets.",
      action:
        "Captured 8 passive telemetry streams, performed PCA dimensionality reduction to isolate orthogonal variance, and applied K-Means clustering.",
      result:
        "Captured >89% explained variance across 3 orthogonal dimensions with <4ms inference latency, winning 1st Place at Innoverse'26.",
    },
    metrics: [
      { value: ">89%", label: "Explained Variance" },
      { value: "<4ms", label: "Inference Latency" },
      { value: "1st Place", label: "Innoverse'26 Winner" },
    ],
    thumbnailSvgType: "pca-clusters",
  },
  {
    id: "medtwin",
    title: "MedTwin",
    category: "Clinical Digital Twin",
    badge: "HEALTHCARE · DIGITAL TWIN",
    tech: [
      "React 19",
      "TypeScript",
      "Python",
      "Differential Solvers",
      "Telemetry",
    ],
    githubUrl: "https://github.com/KarreJohnHyde",
    star: {
      situation:
        "Clinicians lack interactive simulation sandboxes to evaluate compound drug effects, biomarker fluctuations, and treatment trajectories before intervention.",
      task: "Develop an interactive digital twin simulating multi-organ biomarker trajectories under varying medication dosage vectors.",
      action:
        "Constructed bounded differential physiological solvers in Python & React with interactive 60fps graph scrubbing and dynamic 95% confidence intervals.",
      result:
        "Maintained 99.1% mathematical stability across multi-variable pharmacology simulations with sub-12ms render loop responsiveness.",
    },
    metrics: [
      { value: "99.1%", label: "Math Stability" },
      { value: "sub-12ms", label: "Render Cycle" },
      { value: "60 FPS", label: "Interactive Scrubbing" },
    ],
    thumbnailSvgType: "biomarker-curves",
  },
]

function ProjectThumbnail({ type }: { type: ProjectData["thumbnailSvgType"] }) {
  if (type === "vector-graph") {
    return (
      <div className="bento-thumbnail vector-bg">
        <svg viewBox="0 0 400 200" fill="none" className="thumbnail-svg">
          <circle
            cx="80"
            cy="100"
            r="30"
            fill="rgba(163, 230, 53, 0.15)"
            stroke="#a3e635"
            strokeWidth="2"
          />
          <text
            x="80"
            y="105"
            textAnchor="middle"
            fill="#a3e635"
            fontSize="11"
            fontFamily="var(--font-mono)"
          >
            DOCUMENT
          </text>

          <path
            d="M110 100 H160"
            stroke="#a3e635"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          <rect
            x="160"
            y="70"
            width="80"
            height="60"
            rx="8"
            fill="rgba(163, 230, 53, 0.2)"
            stroke="#a3e635"
            strokeWidth="2"
          />
          <text
            x="200"
            y="98"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="10"
            fontFamily="var(--font-mono)"
          >
            FAISS
          </text>
          <text
            x="200"
            y="114"
            textAnchor="middle"
            fill="#a3e635"
            fontSize="9"
            fontFamily="var(--font-mono)"
          >
            MMR k=5
          </text>

          <path d="M240 100 H290" stroke="#a3e635" strokeWidth="2" />

          <circle
            cx="320"
            cy="70"
            r="18"
            fill="rgba(255, 255, 255, 0.08)"
            stroke="#cbd5e1"
            strokeWidth="1.5"
          />
          <text
            x="320"
            y="74"
            textAnchor="middle"
            fill="#cbd5e1"
            fontSize="9"
            fontFamily="var(--font-mono)"
          >
            P.42
          </text>

          <circle
            cx="340"
            cy="120"
            r="18"
            fill="rgba(163, 230, 53, 0.15)"
            stroke="#a3e635"
            strokeWidth="2"
          />
          <text
            x="340"
            y="124"
            textAnchor="middle"
            fill="#a3e635"
            fontSize="9"
            fontFamily="var(--font-mono)"
          >
            94.2%
          </text>

          <line
            x1="200"
            y1="30"
            x2="200"
            y2="70"
            stroke="rgba(163, 230, 53, 0.4)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <text
            x="200"
            y="22"
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="9"
            fontFamily="var(--font-mono)"
          >
            VECTOR EMBEDDINGS (384-D)
          </text>
        </svg>
      </div>
    )
  }

  if (type === "serverless-ledger") {
    return (
      <div className="bento-thumbnail ledger-bg">
        <svg viewBox="0 0 400 200" fill="none" className="thumbnail-svg">
          <rect
            x="50"
            y="50"
            width="70"
            height="100"
            rx="6"
            fill="rgba(255, 255, 255, 0.04)"
            stroke="#64748b"
            strokeWidth="1.5"
          />
          <text
            x="85"
            y="75"
            textAnchor="middle"
            fill="#cbd5e1"
            fontSize="9"
            fontFamily="var(--font-mono)"
          >
            RECEIPT
          </text>
          <line
            x1="62"
            y1="90"
            x2="108"
            y2="90"
            stroke="#475569"
            strokeWidth="2"
          />
          <line
            x1="62"
            y1="102"
            x2="98"
            y2="102"
            stroke="#475569"
            strokeWidth="2"
          />
          <line
            x1="62"
            y1="114"
            x2="104"
            y2="114"
            stroke="#a3e635"
            strokeWidth="2"
          />

          <path d="M120 100 H180" stroke="#a3e635" strokeWidth="2" />
          <text
            x="150"
            y="92"
            textAnchor="middle"
            fill="#a3e635"
            fontSize="8"
            fontFamily="var(--font-mono)"
          >
            OCR &lt;3s
          </text>

          <rect
            x="180"
            y="65"
            width="90"
            height="70"
            rx="8"
            fill="rgba(163, 230, 53, 0.15)"
            stroke="#a3e635"
            strokeWidth="2"
          />
          <text
            x="225"
            y="95"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="10"
            fontFamily="var(--font-mono)"
          >
            DynamoDB
          </text>
          <text
            x="225"
            y="112"
            textAnchor="middle"
            fill="#a3e635"
            fontSize="9"
            fontFamily="var(--font-mono)"
          >
            PK/SK 18ms
          </text>

          <path d="M270 100 H320" stroke="#a3e635" strokeWidth="2" />

          <rect
            x="320"
            y="60"
            width="50"
            height="80"
            rx="6"
            fill="rgba(255, 255, 255, 0.05)"
            stroke="#38bdf8"
            strokeWidth="1.5"
          />
          <text
            x="345"
            y="95"
            textAnchor="middle"
            fill="#38bdf8"
            fontSize="9"
            fontFamily="var(--font-mono)"
          >
            NEXT.JS
          </text>
          <text
            x="345"
            y="110"
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="8"
            fontFamily="var(--font-mono)"
          >
            EDGE
          </text>
        </svg>
      </div>
    )
  }

  if (type === "pca-clusters") {
    return (
      <div className="bento-thumbnail pca-bg">
        <svg viewBox="0 0 400 200" fill="none" className="thumbnail-svg">
          <line
            x1="60"
            y1="160"
            x2="340"
            y2="160"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1"
          />
          <line
            x1="60"
            y1="160"
            x2="60"
            y2="40"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1"
          />
          <line
            x1="60"
            y1="160"
            x2="160"
            y2="90"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />

          {/* Cluster 1: Analytical */}
          <circle
            cx="120"
            cy="80"
            r="22"
            fill="rgba(163, 230, 53, 0.1)"
            stroke="#a3e635"
            strokeWidth="1.5"
          />
          <circle cx="115" cy="76" r="3" fill="#a3e635" />
          <circle cx="125" cy="84" r="3" fill="#a3e635" />
          <circle cx="128" cy="74" r="3" fill="#a3e635" />
          <text
            x="120"
            y="115"
            textAnchor="middle"
            fill="#a3e635"
            fontSize="8"
            fontFamily="var(--font-mono)"
          >
            ANALYTICAL
          </text>

          {/* Cluster 2: Rapid */}
          <circle
            cx="240"
            cy="70"
            r="24"
            fill="rgba(56, 189, 248, 0.1)"
            stroke="#38bdf8"
            strokeWidth="1.5"
          />
          <circle cx="235" cy="65" r="3" fill="#38bdf8" />
          <circle cx="245" cy="75" r="3" fill="#38bdf8" />
          <circle cx="248" cy="62" r="3" fill="#38bdf8" />
          <text
            x="240"
            y="106"
            textAnchor="middle"
            fill="#38bdf8"
            fontSize="8"
            fontFamily="var(--font-mono)"
          >
            RAPID
          </text>

          {/* Cluster 3: Methodical */}
          <circle
            cx="290"
            cy="130"
            r="20"
            fill="rgba(192, 132, 252, 0.1)"
            stroke="#c084fc"
            strokeWidth="1.5"
          />
          <circle cx="288" cy="128" r="3" fill="#c084fc" />
          <circle cx="295" cy="134" r="3" fill="#c084fc" />
          <text
            x="290"
            y="162"
            textAnchor="middle"
            fill="#c084fc"
            fontSize="8"
            fontFamily="var(--font-mono)"
          >
            METHODICAL
          </text>

          <text
            x="340"
            y="155"
            textAnchor="end"
            fill="#64748b"
            fontSize="8"
            fontFamily="var(--font-mono)"
          >
            PC 1 (&gt;89% VAR)
          </text>
        </svg>
      </div>
    )
  }

  // biomarker-curves
  return (
    <div className="bento-thumbnail bio-bg">
      <svg viewBox="0 0 400 200" fill="none" className="thumbnail-svg">
        <path
          d="M50 140 Q 120 40, 200 90 T 350 70"
          stroke="#a3e635"
          strokeWidth="2.5"
        />
        <path
          d="M50 140 Q 120 40, 200 90 T 350 70 L 350 150 L 50 150 Z"
          fill="rgba(163, 230, 53, 0.08)"
        />

        {/* Dynamic Safety Threshold */}
        <line
          x1="50"
          y1="50"
          x2="350"
          y2="50"
          stroke="#ef4444"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <text
          x="350"
          y="44"
          textAnchor="end"
          fill="#ef4444"
          fontSize="8"
          fontFamily="var(--font-mono)"
        >
          SAFETY THRESHOLD
        </text>

        {/* Confidence Interval Upper and Lower */}
        <path
          d="M50 130 Q 120 30, 200 80 T 350 60"
          stroke="rgba(163, 230, 53, 0.3)"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <path
          d="M50 150 Q 120 50, 200 100 T 350 80"
          stroke="rgba(163, 230, 53, 0.3)"
          strokeWidth="1"
          strokeDasharray="2 2"
        />

        <circle cx="200" cy="90" r="5" fill="#a3e635" />
        <text
          x="200"
          y="112"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="9"
          fontFamily="var(--font-mono)"
        >
          99.1% STABLE
        </text>
      </svg>
    </div>
  )
}

export default function ProjectsSection() {
  return (
    <section className="bento-section" id="projects">
      <div className="section-header-row">
        <div>
          <div className="bento-badge">
            <span className="code-dot" />
            <span>FEATURED PROJECTS</span>
          </div>
          <h2 className="bento-section-title">
            Production Systems &amp; Machine Learning
          </h2>
          <p className="bento-section-subtitle">
            Every project documented with the <strong>STAR methodology</strong>{" "}
            (Situation, Task, Action, Result) and verified impact metrics.
          </p>
        </div>
      </div>

      <div className="bento-projects-grid">
        {FEATURED_PROJECTS.map((proj) => (
          <article className="bento-project-card" key={proj.id}>
            {/* Visual Thumbnail */}
            <ProjectThumbnail type={proj.thumbnailSvgType} />

            {/* Card Header */}
            <div className="project-card-body">
              <div className="project-top-meta">
                <span className="project-badge">{proj.badge}</span>
                <div className="project-links">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="project-icon-link"
                      title="View GitHub Repository"
                      aria-label={`${proj.title} GitHub repository`}
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <span>Code</span>
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="project-icon-link live-link"
                      title="View Live Application"
                      aria-label={`${proj.title} live demo`}
                    >
                      <span>Live ↗</span>
                    </a>
                  )}
                </div>
              </div>

              <h3 className="project-title">{proj.title}</h3>
              <p className="project-category-sub">{proj.category}</p>

              {/* STAR Methodology Block */}
              <div className="star-block">
                <div className="star-row">
                  <span className="star-pill">S</span>
                  <p>
                    <strong>Situation:</strong> {proj.star.situation}
                  </p>
                </div>
                <div className="star-row">
                  <span className="star-pill">T</span>
                  <p>
                    <strong>Task:</strong> {proj.star.task}
                  </p>
                </div>
                <div className="star-row">
                  <span className="star-pill">A</span>
                  <p>
                    <strong>Action:</strong> {proj.star.action}
                  </p>
                </div>
                <div className="star-row result-row">
                  <span className="star-pill star-result">R</span>
                  <p>
                    <strong>Result:</strong> {proj.star.result}
                  </p>
                </div>
              </div>

              {/* Impact Metrics in Bold Typography */}
              <div className="project-metrics-row">
                {proj.metrics.map((m, idx) => (
                  <div className="metric-chip" key={idx}>
                    <strong className="bold-number">{m.value}</strong>
                    <span className="metric-tag">{m.label}</span>
                  </div>
                ))}
              </div>

              {/* Tech Badges */}
              <div className="project-tech-badges">
                {proj.tech.map((t) => (
                  <span className="tech-badge" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
