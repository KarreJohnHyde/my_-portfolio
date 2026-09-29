// src/services/api.ts
// Johnny-Talks API Service with Live Backend & Client RAG Engine Fallback

import { generateJohnnyAnswer, type Citation } from "../lib/johnnyKnowledgeEngine"

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

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

export async function askJohnny(
  question: string,
  chatHistory: { role: string; content: string }[] = [],
  scenarioMode: "all" | "greenfield" | "high_constraint" = "all"
): Promise<ChatResponse> {
  const startTime = performance.now()

  // Attempt FastAPI Backend call first
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3500) // fast 3.5s timeout for local backend

    const response = await fetch(`${API_URL}/chat/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        question,
        chat_history: chatHistory.slice(-6),
        scenario_mode: scenarioMode,
      }),
    })

    clearTimeout(timeoutId)

    if (response.ok) {
      const data = await response.json()
      const latencyMs = Math.round(performance.now() - startTime)
      return {
        answer: data.answer,
        sources: data.sources || [],
        isLiveBackend: true,
        latencyMs,
        conversationId: data.conversation_id,
      }
    }
  } catch (err) {
    // Backend offline or running in Vercel client-only mode
    // Gracefully fall back to client-side grounded RAG engine
  }

  // Grounded client-side cognitive twin response
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
  try {
    const res = await fetch(`${API_URL}/health`, { signal: AbortSignal.timeout(2000) })
    if (res.ok) {
      const data = await res.json()
      return { online: true, details: data }
    }
  } catch {}
  return { online: false }
}
