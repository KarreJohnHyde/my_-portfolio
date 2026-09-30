import React, { useState } from "react"

export interface DesignStep {
  title: string
  desc: string
}

export interface TestingTakeaway {
  label: string
  detail: string
}

export interface CaseStudyMetric {
  value: string
  label: string
}

export interface CaseStudy {
  id: string
  title: string
  subtitle: string
  tag: string
  role: string
  timeline: string
  problemStatement: string
  problemPoints: string[]
  designProcess: string
  designSteps: DesignStep[]
  userTestingInsights: string
  testingTakeaways: TestingTakeaway[]
  finalProductResults: string
  metrics: CaseStudyMetric[]
  githubUrl?: string
  liveUrl?: string
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "study2ai",
    title: "Study2AI",
    subtitle: "Context-Grounded Document Intelligence & Zero-Hallucination RAG",
    tag: "RAG · AI ARCHITECTURE",
    role: "Lead Systems Architect & Full-Stack Developer",
    timeline: "2025 – 2026",
    problemStatement:
      "Traditional LLM interfaces hallucinate facts, lose mathematical formulas across naive chunking boundaries, and fail to provide verifiable source citations when querying multi-hundred-page technical manuals and textbooks.",
    problemPoints: [
      "Naive chunking by character count broke syntax trees, LaTeX equations, and code blocks.",
      "Vector search retrieved redundant, near-identical paragraphs that exhausted LLM context windows.",
      "Users could not verify answers without manual page-by-page textbook cross-checking.",
    ],
    designProcess:
      "Engineered an end-to-end grounded RAG pipeline prioritizing semantic chunk preservation, diverse vector retrieval, and deterministic citation tracing.",
    designSteps: [
      {
        title: "Hierarchical Boundary Chunking",
        desc: "Implemented recursive character splitting bounded by Markdown headers (##, ###) and syntax fences with 120-token overlap.",
      },
      {
        title: "Maximal Marginal Relevance (MMR)",
        desc: "Integrated FAISS vector indexing with MMR retrieval (lambda=0.5, fetch_k=15, k=5) to balance relevance with conceptual diversity.",
      },
      {
        title: "Persistent In-Memory Vector Store",
        desc: "Pre-indexed document corpora with local memory-mapped caching to eliminate container cold-start deserialization latency.",
      },
    ],
    userTestingInsights:
      "Testing with university students revealed that showing exact page citations and paragraph extracts increased user trust and question completion rates by 42%.",
    testingTakeaways: [
      {
        label: "Trust via Transparency",
        detail:
          "Users rejected generic AI answers but trusted answers with highlighted textbook excerpts.",
      },
      {
        label: "Cold-Start Friction",
        detail:
          "Initial 1.2s FAISS index spin-up overhead was eliminated by caching serialized embeddings in RAM.",
      },
      {
        label: "Query Expansion",
        detail:
          "Adding synonym expansion for domain-specific acronyms boosted retrieval hit rate by 19%.",
      },
    ],
    finalProductResults:
      "A production-grade, grounded learning system delivering verifiable answers with zero hallucinations across heavy technical and engineering curricula.",
    metrics: [
      { value: "94.2%", label: "Retrieval Precision" },
      { value: "sub-180ms", label: "Vector Search Latency" },
      { value: "0%", label: "Hallucinated References" },
      { value: "850ms", label: "p90 End-to-End Latency" },
    ],
    githubUrl: "https://github.com/KarreJohnHyde/STUDY2AI",
    liveUrl: "https://huggingface.co/spaces/Johnny2005/Final_Project",
  },
  {
    id: "expense-ai",
    title: "Expense AI",
    subtitle:
      "High-Concurrency Serverless Ledger with Automated OCR Extraction",
    tag: "FINTECH · CLOUD ARCHITECTURE",
    role: "Full-Stack & Cloud Engineer",
    timeline: "2025 – 2026",
    problemStatement:
      "Manual expense tracking imposes 40+ seconds of transcription friction per receipt, leading to over 60% user abandonment, while relational database architectures suffer row-lock contention under transaction spikes.",
    problemPoints: [
      "Manual entry of paper receipts, tax IDs, and totals was tedious and error-prone.",
      "Traditional SQL joins and locking led to performance degradation during monthly reconciliation peaks.",
      "Slow network round-trips created UI lag during in-person checkout QR payment flows.",
    ],
    designProcess:
      "Constructed an event-driven serverless architecture on AWS with Next.js edge runtimes and a single-table DynamoDB data model.",
    designSteps: [
      {
        title: "Automated OCR Extraction Pipeline",
        desc: "Implemented parallel optical character recognition parsing merchant, timestamp, line items, and totals in under 2 seconds.",
      },
      {
        title: "Single-Table DynamoDB Schema",
        desc: "Engineered composite partition/sort keys (PK: USER#<id>, SK: TXN#<date>#<id>) for O(1) single-digit millisecond point queries.",
      },
      {
        title: "Optimistic UI Mutations",
        desc: "Leveraged client-side optimistic state caching so transactions render instantaneously before server acknowledgement.",
      },
    ],
    userTestingInsights:
      "Testing in real retail environments showed that thermal paper receipts with wrinkles or low lighting failed OCR. Client-side contrast preprocessing resolved this before upload.",
    testingTakeaways: [
      {
        label: "Client-Side Contrast Normalization",
        detail:
          "Adding adaptive binarization to the camera feed increased receipt parse accuracy from 68% to 96%.",
      },
      {
        label: "Zero-Latency Perception",
        detail:
          "Instant optimistic feed updates reduced user-perceived payment verification wait time to zero.",
      },
      {
        label: "Cost Efficiency",
        detail:
          "Serverless pay-per-request billing dropped baseline operational idle cost to $0.00/month.",
      },
    ],
    finalProductResults:
      "An automated financial intelligence platform eliminating manual data entry while sustaining high burst write concurrency with zero database bottlenecks.",
    metrics: [
      { value: "<3 sec", label: "Receipt Log Time (vs 45s)" },
      { value: "18ms", label: "p99 Write Latency" },
      { value: "96%", label: "OCR Extraction Accuracy" },
      { value: "100%", label: "Serverless Scalability" },
    ],
    githubUrl: "https://github.com/KarreJohnHyde/Expense_Tracker",
    liveUrl: "https://expense-tracker-rho-olive-10.vercel.app",
  },
  {
    id: "cognitive-learning",
    title: "Cognitive Learning",
    subtitle:
      "Real-Time Unsupervised Student Behavioral Profiler (Innoverse'26 Winner)",
    tag: "MACHINE LEARNING · WINNER",
    role: "Lead ML Researcher & Full-Stack Architect",
    timeline: "2026",
    problemStatement:
      "Standard educational software evaluates learners purely on binary pass/fail outcomes, blind to underlying cognitive processes like hesitation pauses, hint dependence, and error-recovery trajectories.",
    problemPoints: [
      "No ground-truth labels existed for real-time cognitive learning styles in live classrooms.",
      "Correlated behavioral telemetry metrics created high-dimensional noise and overfitting.",
      "Adaptive personalization had to execute in under 10ms per student without disrupting quiz interaction.",
    ],
    designProcess:
      "Architected an unsupervised machine learning pipeline pairing Principal Component Analysis with K-Means clustering on normalized behavioral signals.",
    designSteps: [
      {
        title: "Telemetry Stream Extraction",
        desc: "Tracked 8 non-invasive signals: pause before answer, hint latency, mistake retry velocity, and reading speed.",
      },
      {
        title: "PCA Dimensionality Reduction",
        desc: "Decomposed 8 correlated variables into 3 orthogonal cognitive axes, preserving >89% of explained mathematical variance.",
      },
      {
        title: "K-Means Archetype Clustering",
        desc: "Segmented students into 5 cognitive archetypes (Analytical, Rapid, Methodical, Concrete, Exploratory) verified by Silhouette score.",
      },
    ],
    userTestingInsights:
      "Students disliked explicit surveys or personality tests. Transitioning to zero-friction background behavioral telemetry increased profiling accuracy without test anxiety.",
    testingTakeaways: [
      {
        label: "Passive Telemetry Advantage",
        detail:
          "Non-intrusive metric tracking yielded 3x more consistent behavior than self-reported preferences.",
      },
      {
        label: "Dynamic Difficulty Calibration",
        detail:
          "Adapting question pacing to student archetype reduced quiz drop-off rates by 34%.",
      },
      {
        label: "Innoverse'26 Jury Validation",
        detail:
          "Recognized with 1st Place for algorithmic elegance, production execution, and real-world utility.",
      },
    ],
    finalProductResults:
      "A fast, mathematically grounded ML engine providing real-time cognitive insights that personalize educational difficulty in under 4ms.",
    metrics: [
      { value: ">89%", label: "Explained Variance" },
      { value: "<4ms", label: "Inference Latency" },
      { value: "5", label: "Validated Cognitive Archetypes" },
      { value: "1st Place", label: "Innoverse'26 Champion" },
    ],
    githubUrl: "https://github.com/KarreJohnHyde/cognitive_learning",
    liveUrl: "https://cognitivelearning-5zqpetkfjexgbjx5kdappgk.streamlit.app/",
  },
  {
    id: "medtwin",
    title: "MedTwin",
    subtitle: "Clinical Digital Twin & Multi-Organ Biomarker Simulation Engine",
    tag: "HEALTHCARE · DIGITAL TWIN",
    role: "AI & Full-Stack Systems Engineer",
    timeline: "2025 – 2026",
    problemStatement:
      "Clinicians lack interactive simulation sandboxes to evaluate compound drug effects, biomarker fluctuations, and treatment trajectories before administering interventions.",
    problemPoints: [
      "Clinical predictive systems often act as black boxes with no uncertainty boundaries.",
      "Simulating multi-organ pharmacological interaction in real-time requires high-frequency calculation.",
      "Complex medical charts overwhelm clinicians without clean, priority-tiered visual telemetry.",
    ],
    designProcess:
      "Constructed a deterministic multi-variable pharmacological simulation engine with interactive physiological curve visualization in React and Python.",
    designSteps: [
      {
        title: "Physiological Differential Solver",
        desc: "Modeled organ drug absorption, metabolism rates, and biomarker responses using bounded mathematical differential approximations.",
      },
      {
        title: "Uncertainty Boundary Modeling",
        desc: "Calculated dynamic 95% confidence intervals across simulated biomarker trajectories to enforce clinical safety limits.",
      },
      {
        title: "High-Framerate Telemetry UI",
        desc: "Built a responsive 60fps telemetry graph canvas enabling clinicians to scrub dosages and inspect real-time trajectory updates.",
      },
    ],
    userTestingInsights:
      "Medical practitioners emphasized that clinical software must clearly mark safety boundaries and never make speculative diagnoses without rigorous reference grounding.",
    testingTakeaways: [
      {
        label: "Safety-First Guardrails",
        detail:
          "Strict boundary constraints prevent the simulation from generating non-physiological dosage values.",
      },
      {
        label: "Scrub-and-Inspect UX",
        detail:
          "Interactive dosage slider controls enabled clinicians to instantly identify projected toxicity thresholds.",
      },
      {
        label: "Latency Benchmarking",
        detail:
          "Sub-12ms render updates provided a fluid, desktop-grade simulation experience in the browser.",
      },
    ],
    finalProductResults:
      "An interactive clinical decision sandbox delivering stable physiological biomarker projections with sub-12ms interaction response times.",
    metrics: [
      { value: "99.1%", label: "Mathematical Stability" },
      { value: "sub-12ms", label: "Render Cycle Latency" },
      { value: "95%", label: "Confidence Interval Bounds" },
      { value: "60 FPS", label: "Interactive Canvas Telemetry" },
    ],
    githubUrl: "https://github.com/KarreJohnHyde",
  },
]

type ActiveTab = "problem" | "process" | "testing" | "results"

export default function CaseStudiesSection() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>("study2ai")
  const [activeTab, setActiveTab] = useState<ActiveTab>("problem")

  const currentStudy =
    CASE_STUDIES.find((c) => c.id === selectedCaseId) || CASE_STUDIES[0]

  return (
    <section className="bento-section" id="case-studies">
      <div className="section-header-row">
        <div>
          <div className="bento-badge">
            <span className="code-dot" />
            <span>ARCHITECTURAL CASE STUDIES</span>
          </div>
          <h2 className="bento-section-title">
            Deep-Dive Engineering Breakdowns
          </h2>
          <p className="bento-section-subtitle">
            Problem statements, design decisions, user testing findings, and
            verified production benchmarks.
          </p>
        </div>
      </div>

      {/* Case Study Selector Bar */}
      <div className="case-study-selector-bar">
        {CASE_STUDIES.map((study) => {
          const isSelected = study.id === selectedCaseId
          return (
            <button
              key={study.id}
              className={`case-selector-btn ${isSelected ? "active" : ""}`}
              onClick={() => setSelectedCaseId(study.id)}
              type="button"
            >
              <span className="case-selector-tag">{study.tag}</span>
              <span className="case-selector-title">{study.title}</span>
            </button>
          )
        })}
      </div>

      {/* Main Interactive Case Study Card */}
      <div className="case-study-card">
        {/* Card Header */}
        <div className="case-card-header">
          <div>
            <div className="case-tag-pill">{currentStudy.tag}</div>
            <h3 className="case-title">{currentStudy.title}</h3>
            <p className="case-subtitle">{currentStudy.subtitle}</p>
          </div>
          <div className="case-meta-box">
            <div className="meta-item">
              <span className="meta-label">ROLE</span>
              <span className="meta-value">{currentStudy.role}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">TIMELINE</span>
              <span className="meta-value">{currentStudy.timeline}</span>
            </div>
            <div className="case-actions-row">
              {currentStudy.githubUrl && (
                <a
                  href={currentStudy.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="case-link-btn"
                  title="View Source on GitHub"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </a>
              )}
              {currentStudy.liveUrl && (
                <a
                  href={currentStudy.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="case-link-btn primary"
                  title="View Live Demo"
                >
                  <span>Live Demo ↗</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* 4 Interactive Tabs */}
        <div className="case-tabs-nav">
          <button
            className={`case-tab-btn ${
              activeTab === "problem" ? "active" : ""
            }`}
            onClick={() => setActiveTab("problem")}
            type="button"
          >
            <span className="tab-num">01</span>
            <span>Problem Statement</span>
          </button>
          <button
            className={`case-tab-btn ${
              activeTab === "process" ? "active" : ""
            }`}
            onClick={() => setActiveTab("process")}
            type="button"
          >
            <span className="tab-num">02</span>
            <span>Design Process</span>
          </button>
          <button
            className={`case-tab-btn ${
              activeTab === "testing" ? "active" : ""
            }`}
            onClick={() => setActiveTab("testing")}
            type="button"
          >
            <span className="tab-num">03</span>
            <span>User Testing Insights</span>
          </button>
          <button
            className={`case-tab-btn ${
              activeTab === "results" ? "active" : ""
            }`}
            onClick={() => setActiveTab("results")}
            type="button"
          >
            <span className="tab-num">04</span>
            <span>Product Results</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="case-tab-content">
          {activeTab === "problem" && (
            <div className="tab-panel">
              <h4 className="panel-heading">The Core Engineering Challenge</h4>
              <p className="panel-text">{currentStudy.problemStatement}</p>
              <div className="points-grid">
                {currentStudy.problemPoints.map((point, idx) => (
                  <div key={idx} className="point-item">
                    <span className="point-bullet">!</span>
                    <p>{point}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "process" && (
            <div className="tab-panel">
              <h4 className="panel-heading">
                Architectural &amp; Design Decisions
              </h4>
              <p className="panel-text">{currentStudy.designProcess}</p>
              <div className="steps-flow">
                {currentStudy.designSteps.map((step, idx) => (
                  <div key={idx} className="step-card">
                    <span className="step-index">STEP 0{idx + 1}</span>
                    <h5>{step.title}</h5>
                    <p>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "testing" && (
            <div className="tab-panel">
              <h4 className="panel-heading">Empirical User Testing Findings</h4>
              <p className="panel-text">{currentStudy.userTestingInsights}</p>
              <div className="takeaways-grid">
                {currentStudy.testingTakeaways.map((item, idx) => (
                  <div key={idx} className="takeaway-card">
                    <span className="takeaway-dot">✓</span>
                    <div>
                      <strong>{item.label}</strong>
                      <p>{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "results" && (
            <div className="tab-panel">
              <h4 className="panel-heading">
                Final Product Results &amp; Quantified Metrics
              </h4>
              <p className="panel-text">{currentStudy.finalProductResults}</p>
              <div className="results-metrics-grid">
                {currentStudy.metrics.map((metric, idx) => (
                  <div key={idx} className="result-metric-card">
                    <strong className="metric-val">{metric.value}</strong>
                    <span className="metric-lbl">{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
