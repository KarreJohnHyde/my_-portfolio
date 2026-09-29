// src/components/JohnnyTalksModal.tsx
import React, { useState, useEffect, useRef } from "react"
import plushieAvatar from "../assets/johnny-plushie.jpg"
import { askJohnny, checkBackendHealth, type Source } from "../services/api"
import { JOHNNY_KNOWLEDGE_BASE } from "../lib/johnnyKnowledgeEngine"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  sources?: Source[]
  latencyMs?: number
  isLiveBackend?: boolean
  timestamp: string
}

interface JohnnyTalksModalProps {
  isOpen: boolean
  onClose: () => void
  initialQuestion?: string
}

const STARTER_PROMPTS = [
  "How did you design Study2AI's RAG pipeline without hallucinations?",
  "Compare DynamoDB vs PostgreSQL for Expense AI under high write loads",
  "How does Cognitive Learning classify student archetypes using PCA & K-Means?",
  "What are your 4 core architectural execution principles?",
  "Tell me about your academic degree and elite certifications at IIT Kanpur & IIT Kharagpur",
]

export default function JohnnyTalksModal({
  isOpen,
  onClose,
  initialQuestion,
}: JohnnyTalksModalProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"chat" | "knowledge">("chat")
  const [scenarioMode, setScenarioMode] = useState<"all" | "greenfield" | "high_constraint">("all")
  const [selectedCitation, setSelectedCitation] = useState<Source | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null)

  const chatBottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Check backend health on mount
  useEffect(() => {
    if (isOpen) {
      checkBackendHealth().then((res) => setBackendOnline(res.online))
    }
  }, [isOpen])

  // Initialize welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMsg: Message = {
        id: "msg-welcome",
        role: "assistant",
        content: `### 1. Executive Diagnosis & Direct Answer
I am **Johnny-Talks**, the personal cognitive digital twin and strategic technical advisor of **Karre John Hyde (Johnny)**.

I reason directly through the verified lens of Johnny's real-world projects (**Study2AI**, **Expense AI**, **Cognitive Learning**, **MedTwin**), his elite certifications from **IIT Kanpur** and **IIT Kharagpur**, and his core architectural playbook.

#### What would you like to examine today?
- **RAG & Agentic Systems**: Chunking strategies, MMR retrieval, and cold-start latency reduction.
- **Cloud & Databases**: Serverless DynamoDB vs PostgreSQL single-table design and concurrency.
- **Applied Machine Learning**: Unsupervised clustering, PCA dimensionality reduction, and student profiling.
- **Advisory & Consulting**: Architectural blueprints, Greenfield vs High-Constraint trade-offs, and technical evaluations.`,
        sources: [
          {
            source: "johnny_technical_playbook_and_creds.md",
            page: 1,
            chunkIndex: 0,
            category: "philosophy",
            excerpt: "Johnny's 4 Core Execution Principles: Strict Grounding Over Hallucination, Production-Grade Simplicity, First-Person Accountability...",
            score: 0.98,
          },
          {
            source: "study2ai_rag_architecture.md",
            page: 1,
            chunkIndex: 0,
            category: "projects",
            excerpt: "Study2AI RAG Pipeline with MMR retrieval and zero-hallucination guardrails...",
            score: 0.95,
          },
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([welcomeMsg])
    }
  }, [isOpen, messages.length])

  // Handle initial question if provided
  useEffect(() => {
    if (isOpen && initialQuestion && messages.length <= 1) {
      handleSend(initialQuestion)
    }
  }, [isOpen, initialQuestion])

  // Auto-scroll
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  // Focus input and handle ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
      setTimeout(() => inputRef.current?.focus(), 150)
    }
    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim()
    if (!query || loading) return

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }))
      const res = await askJohnny(query, history, scenarioMode)

      const assistantMsg: Message = {
        id: `asst-${Date.now()}`,
        role: "assistant",
        content: res.answer,
        sources: res.sources,
        latencyMs: res.latencyMs,
        isLiveBackend: res.isLiveBackend,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, assistantMsg])
      if (res.isLiveBackend) setBackendOnline(true)
    } catch {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: `### 1. Executive Diagnosis & Direct Answer
I encountered a temporary connection interruption. However, my grounded offline playbook remains active. Please try phrasing your inquiry around Study2AI, Expense AI, or Cognitive Learning.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  const handleClearHistory = () => {
    setMessages([])
    setTimeout(() => {
      const fresh: Message = {
        id: "msg-fresh",
        role: "assistant",
        content: `Memory buffer reset. What technical system, project, or architecture would you like to review?`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([fresh])
    }, 100)
  }

  if (!isOpen) return null

  return (
    <div
      aria-labelledby="johnny-talks-title"
      aria-modal="true"
      className="johnny-modal-backdrop"
      onClick={onClose}
      role="dialog"
    >
      <div
        className="johnny-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <header className="johnny-modal-header">
          <div className="johnny-header-left">
            <div className="johnny-avatar-wrap">
              <img
                alt="Johnny Plushie Avatar Logo"
                className="johnny-plushie-img"
                src={plushieAvatar}
              />
              <span className="johnny-live-pulse" title="Digital Twin Active" />
            </div>
            <div>
              <div className="johnny-title-row">
                <h2 id="johnny-talks-title" className="johnny-title">
                  Johnny-Talks
                </h2>
                <span className="johnny-twin-badge">DIGITAL TWIN · RAG</span>
                {backendOnline !== null && (
                  <span
                    className={`backend-status-badge ${
                      backendOnline ? "is-backend" : "is-edge"
                    }`}
                    title={
                      backendOnline
                        ? "Connected to FastAPI Python Backend"
                        : "Operating in Edge Grounded RAG Mode"
                    }
                  >
                    {backendOnline ? "FastAPI Online" : "Client Grounded RAG"}
                  </span>
                )}
              </div>
              <p className="johnny-subtitle">
                Knowledge-Grounded Cognitive Clone &amp; Client Advisory Engine
              </p>
            </div>
          </div>

          <div className="johnny-header-actions">
            <div className="johnny-tab-switch">
              <button
                className={`johnny-tab-btn ${activeTab === "chat" ? "active" : ""}`}
                onClick={() => setActiveTab("chat")}
                type="button"
              >
                Advisory Chat
              </button>
              <button
                className={`johnny-tab-btn ${activeTab === "knowledge" ? "active" : ""}`}
                onClick={() => setActiveTab("knowledge")}
                type="button"
              >
                Knowledge Store ({JOHNNY_KNOWLEDGE_BASE.length})
              </button>
            </div>

            <button
              aria-label="Clear chat session"
              className="johnny-tool-btn"
              onClick={handleClearHistory}
              title="Reset conversation memory"
              type="button"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              </svg>
            </button>

            <button
              aria-label="Close Johnny-Talks modal"
              className="johnny-close-btn"
              onClick={onClose}
              type="button"
            >
              ✕
            </button>
          </div>
        </header>

        {/* SCENARIO TOGGLE STRIP */}
        {activeTab === "chat" && (
          <div className="johnny-scenario-bar">
            <span className="scenario-label">REASONING FILTER:</span>
            <div className="scenario-chips">
              <button
                className={`scenario-chip ${scenarioMode === "all" ? "active" : ""}`}
                onClick={() => setScenarioMode("all")}
                type="button"
              >
                ★ Full 5-Part Blueprint
              </button>
              <button
                className={`scenario-chip ${scenarioMode === "greenfield" ? "active" : ""}`}
                onClick={() => setScenarioMode("greenfield")}
                type="button"
              >
                Scenario A (Greenfield Baseline)
              </button>
              <button
                className={`scenario-chip ${scenarioMode === "high_constraint" ? "active" : ""}`}
                onClick={() => setScenarioMode("high_constraint")}
                type="button"
              >
                Scenario B (High-Constraint)
              </button>
            </div>
          </div>
        )}

        {/* MODAL BODY */}
        <div className="johnny-modal-body">
          {activeTab === "knowledge" ? (
            /* KNOWLEDGE BASE EXPLORER */
            <div className="johnny-knowledge-view">
              <div className="knowledge-view-header">
                <h3>Johnny&apos;s Verified Ingested Memory Store</h3>
                <p>
                  Documents split with semantic overlap (600 chars, 120 overlap) and indexed into ChromaDB/FAISS vector embeddings.
                </p>
              </div>

              <div className="knowledge-grid">
                {JOHNNY_KNOWLEDGE_BASE.map((doc) => (
                  <div key={doc.id} className="knowledge-card">
                    <div className="knowledge-card-top">
                      <span className={`k-cat-badge ${doc.category}`}>
                        {doc.category.toUpperCase()}
                      </span>
                      <span className="k-source-badge">
                        {doc.source} · Chunk {doc.chunkIndex}
                      </span>
                    </div>
                    <h4>{doc.title}</h4>
                    <p>{doc.content}</p>
                    <div className="k-keywords">
                      {doc.keywords.map((kw, i) => (
                        <span key={i} className="kw-tag">#{kw}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* CHAT FEED */
            <div className="johnny-chat-feed">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`johnny-msg-row ${
                    msg.role === "user" ? "is-user" : "is-assistant"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="msg-avatar">
                      <img alt="Johnny" src={plushieAvatar} />
                    </div>
                  )}

                  <div className="msg-bubble-container">
                    <div className="msg-meta-header">
                      <span className="msg-sender">
                        {msg.role === "user" ? "You (Client)" : "Johnny-Talks"}
                      </span>
                      <span className="msg-time">{msg.timestamp}</span>
                      {msg.latencyMs && (
                        <span className="msg-latency">
                          {msg.latencyMs}ms {msg.isLiveBackend ? "· API" : "· Edge"}
                        </span>
                      )}
                    </div>

                    <div className="msg-content-body">
                      {/* Format text cleanly */}
                      <RenderFormattedMessage text={msg.content} />
                    </div>

                    {/* SOURCE CITATIONS */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="msg-citations-wrap">
                        <span className="citation-title">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                          VERIFIED CITATIONS ({msg.sources.length}):
                        </span>
                        <div className="citations-list">
                          {msg.sources.map((src, i) => (
                            <button
                              key={i}
                              className="citation-pill"
                              onClick={() => setSelectedCitation(src)}
                              type="button"
                              title={src.excerpt || src.source}
                            >
                              <span className="cit-name">{src.source}</span>
                              {src.chunkIndex !== undefined && (
                                <span className="cit-chunk">c{src.chunkIndex}</span>
                              )}
                              {src.score && (
                                <span className="cit-score">
                                  {Math.round(src.score * 100)}%
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* MSG FOOTER ACTIONS */}
                    <div className="msg-action-bar">
                      <button
                        className="msg-copy-btn"
                        onClick={() => handleCopy(msg.id, msg.content)}
                        type="button"
                      >
                        {copiedId === msg.id ? "✓ Copied" : "Copy Blueprint"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="johnny-msg-row is-assistant is-thinking">
                  <div className="msg-avatar">
                    <img alt="Johnny" src={plushieAvatar} />
                  </div>
                  <div className="msg-bubble-container">
                    <div className="thinking-bubble">
                      <span className="thinking-dot" />
                      <span className="thinking-dot" />
                      <span className="thinking-dot" />
                      <span className="thinking-text">
                        Johnny-Talks running 4-step diagnostic &amp; MMR memory retrieval...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>
          )}
        </div>

        {/* CITATION DETAIL POPOVER */}
        {selectedCitation && (
          <div className="citation-popover-backdrop" onClick={() => setSelectedCitation(null)}>
            <div className="citation-popover-content" onClick={(e) => e.stopPropagation()}>
              <div className="popover-header">
                <div>
                  <span className="popover-kicker">VERIFIED SOURCE DOCUMENT</span>
                  <h4>{selectedCitation.source}</h4>
                </div>
                <button
                  className="popover-close"
                  onClick={() => setSelectedCitation(null)}
                  type="button"
                >
                  ✕
                </button>
              </div>
              <div className="popover-meta">
                <span>Chunk: #{selectedCitation.chunkIndex ?? 0}</span>
                {selectedCitation.page && <span>Page: {selectedCitation.page}</span>}
                {selectedCitation.score && (
                  <span>Relevance: {Math.round(selectedCitation.score * 100)}%</span>
                )}
              </div>
              <div className="popover-body">
                <p>{selectedCitation.excerpt}</p>
              </div>
            </div>
          </div>
        )}

        {/* MODAL FOOTER */}
        {activeTab === "chat" && (
          <footer className="johnny-modal-footer">
            {/* QUICK STARTER PROMPTS */}
            {messages.length <= 2 && (
              <div className="starter-prompts-row">
                <span className="starters-label">Ask Johnny:</span>
                <div className="starters-scroll">
                  {STARTER_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      className="starter-prompt-btn"
                      onClick={() => handleSend(prompt)}
                      type="button"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form
              className="johnny-input-form"
              onSubmit={(e) => {
                e.preventDefault()
                handleSend()
              }}
            >
              <textarea
                ref={inputRef}
                className="johnny-textarea"
                disabled={loading}
                maxLength={4000}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="Ask Johnny about projects, system architecture, RAG grounding, or client technical doubts..."
                rows={2}
                value={input}
              />

              <button
                className="johnny-send-btn"
                disabled={loading || !input.trim()}
                type="submit"
              >
                <span>Advise</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>

            <div className="johnny-footer-telemetry">
              <span>Grounding: 10 Projects Ingested</span>
              <span className="telemetry-sep">•</span>
              <span>Memory: MMR Retrievable</span>
              <span className="telemetry-sep">•</span>
              <span>Mode: 5-Part Architectural Blueprint</span>
            </div>
          </footer>
        )}
      </div>
    </div>
  )
}

// Custom Markdown-like renderer for code blocks and bold headers
function RenderFormattedMessage({ text }: { text: string }) {
  const parts = text.split(/(```[\s\S]*?```)/g)

  return (
    <div className="formatted-answer">
      {parts.map((part, idx) => {
        if (part.startsWith("```")) {
          const lines = part.slice(3, -3).trim().split("\n")
          const lang = lines[0].trim()
          const code = lines.slice(1).join("\n")
          return (
            <div key={idx} className="answer-code-block">
              <div className="code-block-header">
                <span>{lang || "code"}</span>
                <button
                  className="code-copy-btn"
                  onClick={() => navigator.clipboard.writeText(code)}
                  type="button"
                >
                  Copy
                </button>
              </div>
              <pre>
                <code>{code}</code>
              </pre>
            </div>
          )
        }

        // Parse section headings like "#### 1. Executive Diagnosis" or "### 1."
        const paragraphs = part.split("\n\n")
        return (
          <React.Fragment key={idx}>
            {paragraphs.map((p, pIdx) => {
              if (p.startsWith("#### ") || p.startsWith("### ")) {
                const headingText = p.replace(/^#{3,4}\s+/, "")
                return (
                  <h4 key={pIdx} className="answer-section-heading">
                    {headingText}
                  </h4>
                )
              }
              if (p.startsWith("- ") || p.startsWith("* ")) {
                const items = p.split("\n")
                return (
                  <ul key={pIdx} className="answer-bullet-list">
                    {items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <FormatBoldText text={item.replace(/^[-*]\s+/, "")} />
                      </li>
                    ))}
                  </ul>
                )
              }
              if (/^\d+\.\s/.test(p)) {
                const items = p.split("\n")
                return (
                  <ol key={pIdx} className="answer-numbered-list">
                    {items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <FormatBoldText text={item.replace(/^\d+\.\s+/, "")} />
                      </li>
                    ))}
                  </ol>
                )
              }
              return (
                <p key={pIdx} className="answer-paragraph">
                  <FormatBoldText text={p} />
                </p>
              )
            })}
          </React.Fragment>
        )
      })}
    </div>
  )
}

function FormatBoldText({ text }: { text: string }) {
  const segments = text.split(/(\*\*.*?\*\*|`.*?`)/g)
  return (
    <>
      {segments.map((seg, i) => {
        if (seg.startsWith("**") && seg.endsWith("**")) {
          return <strong key={i}>{seg.slice(2, -2)}</strong>
        }
        if (seg.startsWith("`") && seg.endsWith("`")) {
          return <code key={i} className="inline-code">{seg.slice(1, -1)}</code>
        }
        return seg
      })}
    </>
  )
}
