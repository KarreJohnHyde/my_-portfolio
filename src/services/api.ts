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

  const isHttps = typeof window !== "undefined" && window.location.protocol === "https:"
  const isLocalBackend = API_URL.startsWith("http://localhost") || API_URL.startsWith("http://127.0.0.1")

  // Only attempt network fetch if not blocked by browser mixed-content policy
  const canAttemptFetch = !isHttps || !isLocalBackend

  if (canAttemptFetch) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 2000)

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
    } catch {
      // Backend offline or unreachable, fall back to edge grounded RAG
    }
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
  const isHttps = typeof window !== "undefined" && window.location.protocol === "https:"
  const isLocalBackend = API_URL.startsWith("http://localhost") || API_URL.startsWith("http://127.0.0.1")
  if (isHttps && isLocalBackend) {
    return { online: false }
  }

  try {
    const res = await fetch(`${API_URL}/health`, { signal: AbortSignal.timeout(1500) })
    if (res.ok) {
      const data = await res.json()
      return { online: true, details: data }
    }
  } catch {}
  return { online: false }
}
