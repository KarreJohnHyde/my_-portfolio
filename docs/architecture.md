# Johnny-Talks Architecture Documentation

## Overview
Johnny-Talks is an enterprise-grade cognitive clone, personal digital twin, and client advisory engine for Karre John Hyde. It grounds all responses directly in verified source documents (projects, system architecture, benchmarks, academic milestones, and engineering philosophies).

```
                      +----------------------------+
                      | React 19 Frontend (Vite)   |
                      | - Plushie Avatar Branding  |
                      | - Client-side RAG Fallback |
                      | - Streaming Chat & HUD     |
                      +--------------+-------------+
                                     |
                                     v HTTP / REST
                      +----------------------------+
                      | FastAPI Backend            |
                      | - CORS & Basic Auth        |
                      | - /chat & /documents APIs  |
                      | - Ingestion & Job Status   |
                      +--------------+-------------+
                                     |
            +------------------------+------------------------+
            |                                                 |
            v                                                 v
+-----------------------+                         +-----------------------+
| SQLite Relational DB  |                         | ChromaDB Vector Store |
| - Users & Convos      |                         | - MMR Retrieval       |
| - Messages & Feedback |                         | - 600/120 Chunks      |
+-----------------------+                         +-----------------------+
```

## Grounding & Reasoning Protocol
Johnny-Talks enforces the **4-Step Cognitive Diagnostic** and **5-Part Response Blueprint**:
1. Executive Diagnosis & Direct Answer
2. Root-Cause Analysis & Technical Breakdown
3. Scenario-Based Application (Scenario A: Greenfield vs Scenario B: High-Constraint)
4. Grounded Real-World Example (Code / Architecture / Metric)
5. Actionable Next Steps & Decision Checkpoints
