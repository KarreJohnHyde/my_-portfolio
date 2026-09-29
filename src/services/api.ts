// src/services/api.ts
// Johnny-Talks API Service with Universal Multi-Tier Fallback:
// Tier 1: Vite Proxy / Vercel Serverless (/chat/)
// Tier 2: Direct Local FastAPI Backend (http://127.0.0.1:8000/chat/)
// Tier 3: High-Fidelity Client-Side Grounded RAG Engine

import { generateJohnnyAnswer, type Citation } from "../lib/johnnyKnowledgeEngine"

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
  latencyMs?: number
  conversationId?: number
}

async function tryFetchEndpoint(url: string, payload: any, timeoutMs = 2500): Promise<any> {
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

export async function askJohnny(
  question: string,
  chatHistory: { role: string; content: string }[] = [],
  scenarioMode: "all" | "greenfield" | "high_constraint" = "all"
): Promise<ChatResponse> {
  const startTime = performance.now()
  const payload = {
    question,
    chat_history: chatHistory.slice(-6),
    scenario_mode: scenarioMode,
  }

  const isHttps = typeof window !== "undefined" && window.location.protocol === "https:"

  // Tier 1: Try relative path /chat/ (Works via Vite proxy on :8443 and Vercel serverless)
  const tier1 = await tryFetchEndpoint("/chat/", payload, 2500)
  if (tier1 && tier1.answer) {
    const latencyMs = Math.round(performance.now() - startTime)
    return {
      answer: tier1.answer,
      sources: tier1.sources || [],
      isLiveBackend: true,
      latencyMs,
      conversationId: tier1.conversation_id,
    }
  }

  // Tier 2: If on HTTP/localhost, try direct local backend at http://127.0.0.1:8000/chat/
  if (!isHttps) {
    const tier2 = await tryFetchEndpoint("http://127.0.0.1:8000/chat/", payload, 2000)
    if (tier2 && tier2.answer) {
      const latencyMs = Math.round(performance.now() - startTime)
      return {
        answer: tier2.answer,
        sources: tier2.sources || [],
        isLiveBackend: true,
        latencyMs,
        conversationId: tier2.conversation_id,
      }
    }
  }

  // Tier 3: Edge Grounded RAG Synthesizer (Instant, 0 failure mode)
  const sim = generateJohnnyAnswer(question, scenarioMode)
  const latencyMs = Math.round(performance.now() - startTime) + sim.latencyMs

  return {
    answer: sim.answer,
    sources: sim.sources,
    isLiveBackend: false,
    latencyMs,
  }
}

export async function checkBackendHealth(): Promise<{ online: boolean; details?: any }> {
  const isHttps = typeof window !== "undefined" && window.location.protocol === "https:"

  // Check via proxy or relative path first
  try {
    const res = await fetch("/health", { signal: AbortSignal.timeout(1200) })
    if (res.ok) {
      const data = await res.json()
      return { online: true, details: data }
    }
  } catch {}

  // If on HTTP localhost, check direct
  if (!isHttps) {
    try {
      const res = await fetch("http://127.0.0.1:8000/health", { signal: AbortSignal.timeout(1200) })
      if (res.ok) {
        const data = await res.json()
        return { online: true, details: data }
      }
    } catch {}
  }

  return { online: false }
}
