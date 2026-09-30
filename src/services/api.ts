// src/services/api.ts
// Johnny-Talks API Service with Universal Multi-Tier Fallback:
// Tier 1: Client-Side Direct Google Gemini API (if configured by user/env)
// Tier 2: Vite Proxy / Vercel Serverless (/chat/)
// Tier 3: Direct Local FastAPI Backend (http://127.0.0.1:8000/chat/)
// Tier 4: High-Fidelity Client-Side Grounded Cognitive Engine (15+ domains, 0 latency, 0 failure mode)

import {
  generateJohnnyAnswer,
  retrieveKnowledge,
  type Citation,
  type PersonaMode,
} from "../lib/johnnyKnowledgeEngine"

export interface Source {
  source: string
  page: number | null
  chunkIndex?: number
  category?: string
  excerpt?: string
  score?: number
}

export interface ChatResponse {
  answer: string
  sources: Source[]
  isLiveBackend: boolean
  isGeminiLive?: boolean
  latencyMs?: number
  conversationId?: number
}

export function getSavedGeminiKey(): string {
  if (typeof window === "undefined") return ""
  return (
    localStorage.getItem("johnny_gemini_api_key") ||
    (import.meta as any).env?.VITE_GEMINI_API_KEY ||
    ""
  )
}

export function saveGeminiKey(key: string): void {
  if (typeof window === "undefined") return
  if (!key.trim()) {
    localStorage.removeItem("johnny_gemini_api_key")
  } else {
    localStorage.setItem("johnny_gemini_api_key", key.trim())
  }
}

async function tryFetchEndpoint(
  url: string,
  payload: any,
  timeoutMs = 2500,
): Promise<any> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify(payload),
    })
    clearTimeout(timer)
    if (res.ok) {
      return await res.json()
    }
  } catch (e) {
    clearTimeout(timer)
  }
  return null
}

async function tryCallGemini(
  apiKey: string,
  question: string,
  chatHistory: { role: string; content: string }[],
  personaMode: PersonaMode,
  citations: Citation[],
): Promise<string | null> {
  try {
    const contextText = citations
      .map((c) => `[Source: ${c.source} | Cat: ${c.category}]\n${c.excerpt}`)
      .join("\n\n")

    let personaInstruction =
      "Speak warmly, conversationally, and authentically in the first person as Johnny. Never use robotic numbered headings (like '1. Executive Diagnosis'). Share real engineering stories with natural paragraphs and markdown code snippets."
    if (personaMode === "architect") {
      personaInstruction =
        "Speak as Johnny in Technical System Architect mode. Dive deep into mathematical formulations, system diagrams, latency targets, and code trade-offs. Avoid generic advice; use concrete specs from your projects."
    } else if (personaMode === "quick_pitch") {
      personaInstruction =
        "Speak as Johnny in Quick Pitch mode for recruiters. Provide a concise, punchy 3-4 bullet point summary with key metrics, accomplishments, and contact info in under 150 words."
    }

    const systemPrompt = `You are Johnny-Talks, the personal AI digital twin and cognitive brain of Karre John Hyde (Johnny) — an AI/ML Engineer holding an 8.45 CGPA in his 6th Semester (out of 8 total semesters) for the 2023–2027 batch at Sathyabama IST, Elite certified by IIT Kanpur in Distributed Systems, certified by IIT Kharagpur in ML, DBMS & Java, and participant in the Innoverse'26 and Brite Spark 2026 Hackathons.
You built Study2AI (RAG), Expense AI (AWS DynamoDB), Cognitive Learning (PCA/K-Means submitted for Innoverse'26), Brite Systems (Streamlit submitted for Brite Spark 2026), MedTwin, and Xen-01.

${personaInstruction}

Ground your answers strictly on Johnny's verified experience:
${contextText}`

    const contents: any[] = []

    // Add past history (last 4 turns)
    for (const h of chatHistory.slice(-4)) {
      contents.push({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.content }],
      })
    }

    contents.push({
      role: "user",
      parts: [{ text: question }],
    })

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }],
        },
        contents,
        generationConfig: {
          temperature: 0.35,
          maxOutputTokens: 900,
        },
      }),
    })

    if (res.ok) {
      const data = await res.json()
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
      if (text) return text.trim()
    }
  } catch (err) {
    console.warn("Direct Gemini invocation fallback:", err)
  }
  return null
}

export async function askJohnny(
  question: string,
  chatHistory: { role: string; content: string }[] = [],
  personaMode: PersonaMode = "conversational",
  scenarioMode: "all" | "greenfield" | "high_constraint" = "all",
): Promise<ChatResponse> {
  const startTime = performance.now()
  const payload = {
    question,
    chat_history: chatHistory.slice(-6),
    persona_mode: personaMode,
    scenario_mode: scenarioMode,
  }

  // Tier 1: Check for Gemini API Key (Client direct call to Gemini 2.0 Flash)
  const geminiKey = getSavedGeminiKey()
  if (geminiKey) {
    const citations = retrieveKnowledge(question, 4)
    const geminiAnswer = await tryCallGemini(
      geminiKey,
      question,
      chatHistory,
      personaMode,
      citations,
    )
    if (geminiAnswer) {
      const latencyMs = Math.round(performance.now() - startTime)
      return {
        answer: geminiAnswer,
        sources: citations,
        isLiveBackend: true,
        isGeminiLive: true,
        latencyMs,
      }
    }
  }

  // Tier 2: Try relative path /chat/ (Works via Vite proxy on :8443 or serverless)
  const tier2 = await tryFetchEndpoint("/chat/", payload, 2200)
  if (
    tier2 &&
    tier2.answer &&
    !tier2.answer.includes("Client-side grounded synthesis active")
  ) {
    const latencyMs = Math.round(performance.now() - startTime)
    return {
      answer: tier2.answer,
      sources: tier2.sources || [],
      isLiveBackend: true,
      latencyMs,
      conversationId: tier2.conversation_id,
    }
  }

  // Tier 3: If on HTTP/localhost, try direct local backend at http://127.0.0.1:8000/chat/
  const isHttps =
    typeof window !== "undefined" && window.location.protocol === "https:"
  if (!isHttps) {
    const tier3 = await tryFetchEndpoint(
      "http://127.0.0.1:8000/chat/",
      payload,
      1800,
    )
    if (tier3 && tier3.answer) {
      const latencyMs = Math.round(performance.now() - startTime)
      return {
        answer: tier3.answer,
        sources: tier3.sources || [],
        isLiveBackend: true,
        latencyMs,
        conversationId: tier3.conversation_id,
      }
    }
  }

  // Tier 4: Edge Grounded Cognitive Engine (Authentic, warm, zero latency, 0 failure mode)
  const sim = generateJohnnyAnswer(question, personaMode, scenarioMode)
  const latencyMs = Math.round(performance.now() - startTime) + sim.latencyMs

  return {
    answer: sim.answer,
    sources: sim.sources,
    isLiveBackend: false,
    latencyMs,
  }
}

export async function checkBackendHealth(): Promise<{
  online: boolean
  details?: any
}> {
  const isHttps =
    typeof window !== "undefined" && window.location.protocol === "https:"

  try {
    const res = await fetch("/health", { signal: AbortSignal.timeout(1200) })
    if (res.ok) {
      const data = await res.json()
      return { online: true, details: data }
    }
  } catch {}

  if (!isHttps) {
    try {
      const res = await fetch("http://127.0.0.1:8000/health", {
        signal: AbortSignal.timeout(1200),
      })
      if (res.ok) {
        const data = await res.json()
        return { online: true, details: data }
      }
    } catch {}
  }

  return { online: false }
}
