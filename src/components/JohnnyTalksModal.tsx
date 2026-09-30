// src/components/JohnnyTalksModal.tsx
import React, { useState, useEffect, useRef } from "react"
import plushieAvatar from "../assets/johnny-plushie.jpg"
import {
  askJohnny,
  checkBackendHealth,
  getSavedGeminiKey,
  saveGeminiKey,
  type Source,
} from "../services/api"
import {
  JOHNNY_KNOWLEDGE_BASE,
  type PersonaMode,
} from "../lib/johnnyKnowledgeEngine"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  sources?: Source[]
  latencyMs?: number
  isLiveBackend?: boolean
  isGeminiLive?: boolean
  personaMode?: PersonaMode
  timestamp: string
}

interface JohnnyTalksModalProps {
  isOpen: boolean
  onClose: () => void
  initialQuestion?: string
}

const STARTER_PROMPTS = [
  {
    label: "👋 About Johnny",
    text: "Tell me about yourself, your background, and what drives you",
  },
  {
    label: "🤖 Study2AI RAG",
    text: "How did you design Study2AI's RAG pipeline without hallucinations?",
  },
  {
    label: "⚡ DynamoDB vs Postgres",
    text: "Compare DynamoDB vs PostgreSQL for Expense AI under high write loads",
  },
  {
    label: "🏆 IIT Kanpur Credential",
    text: "Tell me about your elite certification in Distributed Systems from IIT Kanpur",
  },
  {
    label: "💼 2026 Internships",
    text: "Are you open for AI/ML and Full-Stack Engineering internships in 2026?",
  },
  {
    label: "🥇 Innoverse'26 Winner",
    text: "How does Cognitive Learning classify student archetypes using PCA & K-Means?",
  },
]

const INITIAL_WELCOME: Message = {
  id: "msg-welcome",
  role: "assistant",
  content: `Hey! I'm **Johnny-Talks**, the personal AI digital twin and cognitive brain of **Karre John Hyde (Johnny)**.

I think, evaluate engineering trade-offs, and speak with the exact voice, principles, and real-world project experience that Johnny brings to AI/ML and distributed systems. 

#### What would you like to explore today?
- **AI & RAG Systems**: How I eliminated hallucinations in **Study2AI** using MMR retrieval and custom chunk boundaries.
- **Cloud & Scalability**: Serverless **DynamoDB single-table design** vs PostgreSQL in **Expense AI**.
- **Applied ML**: How I won **Innoverse'26** with **Cognitive Learning** using PCA + K-Means clustering.
- **Elite Credentials**: Coursework at **Sathyabama IST (8.45 CGPA)** and **IIT Kanpur Elite** in Distributed Systems.
- **Hiring & Collaboration**: Actively open for **2026 AI/ML & Full-Stack Internships**!`,
  sources: [
    {
      source: "johnny_technical_playbook_and_creds.md",
      page: 1,
      chunkIndex: 0,
      category: "philosophy",
      excerpt:
        "Johnny's 4 Core Execution Principles: Strict Grounding Over Hallucination, Production-Grade Simplicity, First-Person Accountability...",
      score: 0.98,
    },
    {
      source: "study2ai_rag_architecture.md",
      page: 1,
      chunkIndex: 0,
      category: "projects",
      excerpt:
        "Study2AI RAG Pipeline with MMR retrieval and zero-hallucination guardrails...",
      score: 0.95,
    },
  ],
  timestamp: "Ready",
}

export default function JohnnyTalksModal({
  isOpen,
  onClose,
  initialQuestion,
}: JohnnyTalksModalProps) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_WELCOME])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"chat" | "knowledge">("chat")
  const [personaMode, setPersonaMode] = useState<PersonaMode>("conversational")
  const [scenarioMode, setScenarioMode] =
    useState<"all" | "greenfield" | "high_constraint">("all")
  const [selectedCitation, setSelectedCitation] = useState<Source | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null)

  // Voice & Speech States
  const [isListening, setIsListening] = useState(false)
  const [speakingId, setSpeakingId] = useState<string | null>(null)
  const speechRecognitionRef = useRef<any>(null)

  // AI Settings Modal
  const [showSettings, setShowSettings] = useState(false)
  const [geminiKeyInput, setGeminiKeyInput] = useState("")
  const [geminiKeySaved, setGeminiKeySaved] = useState(false)

  const chatBottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const initialHandledRef = useRef<string | null>(null)

  // Load saved Gemini Key on mount
  useEffect(() => {
    const saved = getSavedGeminiKey()
    if (saved) {
      setGeminiKeyInput(saved)
      setGeminiKeySaved(true)
    }
  }, [])

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = false
        recognition.lang = "en-US"

        recognition.onstart = () => setIsListening(true)
        recognition.onend = () => setIsListening(false)
        recognition.onerror = () => setIsListening(false)

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          if (transcript) {
            setInput((prev) => (prev ? `${prev} ${transcript}` : transcript))
          }
          setIsListening(false)
        }

        speechRecognitionRef.current = recognition
      }
    }
  }, [])

  const toggleSpeechRecognition = () => {
    if (!speechRecognitionRef.current) {
      alert("Speech recognition is not supported in this browser.")
      return
    }
    if (isListening) {
      speechRecognitionRef.current.stop()
    } else {
      speechRecognitionRef.current.start()
    }
  }

  const toggleSpeakMessage = (msgId: string, text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported in this browser.")
      return
    }

    if (speakingId === msgId) {
      window.speechSynthesis.cancel()
      setSpeakingId(null)
      return
    }

    window.speechSynthesis.cancel()
    // Clean text of markdown characters before reading
    const cleanText = text
      .replace(/```[\s\S]*?```/g, "Code snippet omitted.")
      .replace(/[#*`_~]/g, "")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .trim()

    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.rate = 1.05
    utterance.pitch = 1.0

    // Try finding an English natural voice
    const voices = window.speechSynthesis.getVoices()
    const preferredVoice = voices.find(
      (v) =>
        v.name.includes("Natural") ||
        v.name.includes("Google") ||
        v.lang.startsWith("en"),
    )
    if (preferredVoice) utterance.voice = preferredVoice

    utterance.onend = () => setSpeakingId(null)
    utterance.onerror = () => setSpeakingId(null)

    setSpeakingId(msgId)
    window.speechSynthesis.speak(utterance)
  }

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim()
    if (!query || loading) return

    // Stop speaking if new message sent
    if (speakingId) {
      window.speechSynthesis.cancel()
      setSpeakingId(null)
    }

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }))
      const res = await askJohnny(query, history, personaMode, scenarioMode)

      const assistantMsg: Message = {
        id: `asst-${Date.now()}`,
        role: "assistant",
        content: res.answer,
        sources: res.sources,
        latencyMs: res.latencyMs,
        isLiveBackend: res.isLiveBackend,
        isGeminiLive: res.isGeminiLive,
        personaMode,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }

      setMessages((prev) => [...prev, assistantMsg])
      if (res.isLiveBackend) setBackendOnline(true)
    } catch {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: `I hit a temporary connection glitch, but my grounded local brain is still ready! Feel free to ask me anything about Study2AI, Expense AI, or Cognitive Learning.`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setLoading(false)
    }
  }

  // Check backend health on mount
  useEffect(() => {
    if (isOpen) {
      checkBackendHealth().then((res) => setBackendOnline(res.online))
    }
  }, [isOpen])

  // Handle initial question if provided
  useEffect(() => {
    if (
      isOpen &&
      initialQuestion &&
      initialHandledRef.current !== initialQuestion
    ) {
      initialHandledRef.current = initialQuestion
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
      if (e.key === "Escape") {
        if (showSettings) {
          setShowSettings(false)
        } else {
          onClose()
        }
      }
    }
    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
      setTimeout(() => inputRef.current?.focus(), 150)
    }
    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
      if (speakingId) {
        window.speechSynthesis.cancel()
      }
    }
  }, [isOpen, onClose, showSettings, speakingId])

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  const handleClearHistory = () => {
    if (speakingId) {
      window.speechSynthesis.cancel()
      setSpeakingId(null)
    }
    setMessages([])
    setTimeout(() => {
      const fresh: Message = {
        id: "msg-fresh",
        role: "assistant",
        content: `Memory cleared! What would you like to discuss next?`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }
      setMessages([fresh])
    }, 100)
  }

  const handleSaveGeminiKey = (e: React.FormEvent) => {
    e.preventDefault()
    saveGeminiKey(geminiKeyInput)
    setGeminiKeySaved(Boolean(geminiKeyInput.trim()))
    setShowSettings(false)
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
                <span className="johnny-twin-badge">HUMANIZED AI TWIN</span>

                {geminiKeySaved && (
                  <span
                    className="backend-status-badge is-backend"
                    title="Google Gemini 2.0 Live Cloud AI"
                  >
                    ⚡ Gemini 2.0 Active
                  </span>
                )}

                {backendOnline && !geminiKeySaved && (
                  <span
                    className="backend-status-badge is-backend"
                    title="Connected to Local Python FastAPI Backend"
                  >
                    ● FastAPI Live
                  </span>
                )}

                {!geminiKeySaved && !backendOnline && (
                  <span
                    className="backend-status-badge is-edge"
                    title="High-Speed Grounded Edge Brain"
                  >
                    ● Edge Cognitive Brain
                  </span>
                )}
              </div>
              <p className="johnny-subtitle">
                Authentic Cognitive Digital Twin of Karre John Hyde (Johnny)
              </p>
            </div>
          </div>

          <div className="johnny-header-actions">
            {/* AI SETTINGS TOGGLE */}
            <button
              className={`johnny-tab-btn ${showSettings ? "active" : ""}`}
              onClick={() => setShowSettings(!showSettings)}
              type="button"
              title="Configure AI Engine (Gemini / Edge)"
            >
              ⚙️ AI Settings
            </button>

            <div className="johnny-tab-switch">
              <button
                className={`johnny-tab-btn ${
                  activeTab === "chat" ? "active" : ""
                }`}
                onClick={() => setActiveTab("chat")}
                type="button"
              >
                Chat
              </button>
              <button
                className={`johnny-tab-btn ${
                  activeTab === "knowledge" ? "active" : ""
                }`}
                onClick={() => setActiveTab("knowledge")}
                type="button"
              >
                Memory ({JOHNNY_KNOWLEDGE_BASE.length})
              </button>
            </div>

            <button
              aria-label="Clear chat session"
              className="johnny-tool-btn"
              onClick={handleClearHistory}
              title="Reset conversation memory"
              type="button"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
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

        {/* AI SETTINGS DRAWER / POPOVER */}
        {showSettings && (
          <div className="johnny-settings-panel">
            <div className="settings-panel-header">
              <span className="settings-panel-title">
                🧠 Cognitive Engine Settings
              </span>
              <button
                className="popover-close"
                onClick={() => setShowSettings(false)}
                type="button"
              >
                ✕
              </button>
            </div>
            <p className="settings-panel-desc">
              Johnny-Talks runs out-of-the-box with a high-speed{" "}
              <strong>Edge Cognitive Engine</strong> (15+ verified knowledge
              domains). For unbounded live generative reasoning, you can
              optionally connect your own free{" "}
              <strong>Google Gemini API Key</strong>.
            </p>
            <form onSubmit={handleSaveGeminiKey} className="settings-form">
              <div className="settings-input-group">
                <label htmlFor="gemini-key-input">
                  Google Gemini API Key (Optional):
                </label>
                <input
                  id="gemini-key-input"
                  type="password"
                  placeholder="AIzaSy..."
                  value={geminiKeyInput}
                  onChange={(e) => setGeminiKeyInput(e.target.value)}
                  className="settings-text-input"
                />
              </div>
              <div className="settings-btn-row">
                <button type="submit" className="settings-save-btn">
                  Save Engine Settings
                </button>
                {geminiKeySaved && (
                  <button
                    type="button"
                    onClick={() => {
                      saveGeminiKey("")
                      setGeminiKeyInput("")
                      setGeminiKeySaved(false)
                    }}
                    className="settings-clear-btn"
                  >
                    Disconnect &amp; Use Edge Brain
                  </button>
                )}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="settings-get-key-link"
                >
                  Get a free Gemini key ↗
                </a>
              </div>
            </form>
          </div>
        )}

        {/* PERSONA MODE SELECTOR BAR */}
        {activeTab === "chat" && (
          <div className="johnny-scenario-bar">
            <span className="scenario-label">VOICE MODE:</span>
            <div className="scenario-chips">
              <button
                className={`scenario-chip ${
                  personaMode === "conversational" ? "active" : ""
                }`}
                onClick={() => setPersonaMode("conversational")}
                type="button"
                title="Warm, friendly, humanized conversational tone"
              >
                💬 Conversational
              </button>
              <button
                className={`scenario-chip ${
                  personaMode === "architect" ? "active" : ""
                }`}
                onClick={() => setPersonaMode("architect")}
                type="button"
                title="Deep technical system blueprints, code patterns, and latency specs"
              >
                📐 Tech Architect
              </button>
              <button
                className={`scenario-chip ${
                  personaMode === "quick_pitch" ? "active" : ""
                }`}
                onClick={() => setPersonaMode("quick_pitch")}
                type="button"
                title="Fast 60-second summary tailored for recruiters and founders"
              >
                ⚡ Quick Pitch
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
                <h3>Johnny&apos;s Verified Memory Store</h3>
                <p>
                  15+ verified knowledge domains covering projects, IIT
                  certifications, architecture patterns, and engineering
                  philosophies.
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
                        <span key={i} className="kw-tag">
                          #{kw}
                        </span>
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
                        {msg.role === "user" ? "You" : "Johnny-Talks"}
                      </span>
                      <span className="msg-time">{msg.timestamp}</span>
                      {msg.latencyMs && (
                        <span className="msg-latency">
                          {msg.latencyMs}ms{" "}
                          {msg.isGeminiLive
                            ? "· Gemini 2.0"
                            : msg.isLiveBackend
                              ? "· API"
                              : "· Edge Brain"}
                        </span>
                      )}
                    </div>

                    <div className="msg-content-body">
                      <RenderFormattedMessage text={msg.content} />
                    </div>

                    {/* SOURCE CITATIONS */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="msg-citations-wrap">
                        <span className="citation-title">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
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
                                <span className="cit-chunk">
                                  c{src.chunkIndex}
                                </span>
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
                      {msg.role === "assistant" && (
                        <button
                          className={`msg-audio-btn ${
                            speakingId === msg.id ? "is-speaking" : ""
                          }`}
                          onClick={() =>
                            toggleSpeakMessage(msg.id, msg.content)
                          }
                          type="button"
                          title="Listen to Johnny speak"
                        >
                          {speakingId === msg.id ? "⏹ Stop Audio" : "🔊 Listen"}
                        </button>
                      )}

                      <button
                        className="msg-copy-btn"
                        onClick={() => handleCopy(msg.id, msg.content)}
                        type="button"
                      >
                        {copiedId === msg.id ? "✓ Copied" : "Copy"}
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
                        Johnny-Talks reasoning through memory &amp; formulating
                        response...
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
          <div
            className="citation-popover-backdrop"
            onClick={() => setSelectedCitation(null)}
          >
            <div
              className="citation-popover-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="popover-header">
                <div>
                  <span className="popover-kicker">
                    VERIFIED SOURCE DOCUMENT
                  </span>
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
                {selectedCitation.page && (
                  <span>Page: {selectedCitation.page}</span>
                )}
                {selectedCitation.score && (
                  <span>
                    Relevance: {Math.round(selectedCitation.score * 100)}%
                  </span>
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
                      onClick={() => handleSend(prompt.text)}
                      type="button"
                    >
                      {prompt.label}
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
                placeholder="Ask Johnny about projects, system architecture, IIT credentials, or internships..."
                rows={2}
                value={input}
              />

              <div className="johnny-form-buttons">
                {/* VOICE MIC INPUT BUTTON */}
                <button
                  className={`johnny-mic-btn ${
                    isListening ? "is-listening" : ""
                  }`}
                  onClick={toggleSpeechRecognition}
                  type="button"
                  title={
                    isListening
                      ? "Listening... click to stop"
                      : "Speak to Johnny (Voice Input)"
                  }
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                  {isListening && <span className="mic-pulse-ring" />}
                </button>

                <button
                  className="johnny-send-btn"
                  disabled={loading || !input.trim()}
                  type="submit"
                >
                  <span>Ask Johnny</span>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </form>

            <div className="johnny-footer-telemetry">
              <span>
                Persona:{" "}
                {personaMode === "conversational"
                  ? "💬 Conversational"
                  : personaMode === "architect"
                    ? "📐 Tech Architect"
                    : "⚡ Quick Pitch"}
              </span>
              <span className="telemetry-sep">•</span>
              <span>Memory: 15+ Verified Domains</span>
              <span className="telemetry-sep">•</span>
              <span>Voice: STT &amp; TTS Ready</span>
              <span className="telemetry-sep">•</span>
              <span>
                Engine:{" "}
                {geminiKeySaved
                  ? "Google Gemini 2.0 Cloud"
                  : "Grounded Edge Brain"}
              </span>
            </div>
          </footer>
        )}
      </div>
    </div>
  )
}

// Custom Markdown-like renderer for code blocks, bold headers, and clickable markdown links
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
                        <FormatRichText text={item.replace(/^[-*]\s+/, "")} />
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
                        <FormatRichText text={item.replace(/^\d+\.\s+/, "")} />
                      </li>
                    ))}
                  </ol>
                )
              }
              return (
                <p key={pIdx} className="answer-paragraph">
                  <FormatRichText text={p} />
                </p>
              )
            })}
          </React.Fragment>
        )
      })}
    </div>
  )
}

function FormatRichText({ text }: { text: string }) {
  // Parse links, bold text, and inline code
  const segments = text.split(/(\[.*?\]\(.*?\)|\*\*.*?\*\*|`.*?`)/g)
  return (
    <>
      {segments.map((seg, i) => {
        // Markdown Link: [text](url)
        const linkMatch = seg.match(/^\[(.*?)\]\((.*?)\)$/)
        if (linkMatch) {
          return (
            <a
              key={i}
              href={linkMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
              style={{
                color: "#a3e635",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              {linkMatch[1]}
            </a>
          )
        }
        if (seg.startsWith("**") && seg.endsWith("**")) {
          return <strong key={i}>{seg.slice(2, -2)}</strong>
        }
        if (seg.startsWith("`") && seg.endsWith("`")) {
          return (
            <code key={i} className="inline-code">
              {seg.slice(1, -1)}
            </code>
          )
        }
        return seg
      })}
    </>
  )
}
