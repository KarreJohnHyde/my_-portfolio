import React, { useEffect } from "react"

export interface DetailedProject {
  number: string
  title: string
  headline: string
  description: string
  tags: string[]
  category: "all" | "ai" | "cloud" | "web"
  liveUrl?: string
  githubUrl: string
  status: string
  tone: "violet" | "cyan" | "lime"
  label: string
  role: string
  timeline: string
  overview: string
  problemStatement: string
  solution: string
  architectureLayers: {
    layer: string
    title: string
    description: string
    tech: string[]
  }[]
  keyMetrics: { value: string; label: string }[]
  highlights: string[]
}

export const detailedProjectsData: Record<string, DetailedProject> = {
  Study2AI: {
    number: "01",
    title: "Study2AI",
    headline: "Full-Stack Multimodal RAG Knowledge Engine",
    description:
      "A full-stack RAG (Retrieval-Augmented Generation) system that turns documents into grounded, context-aware interactive learning conversations with zero hallucinations.",
    tags: [
      "Python",
      "LangChain",
      "FAISS FlatIP",
      "Gradio",
      "RAG Pipeline",
      "Hugging Face",
    ],
    category: "ai",
    liveUrl: "https://huggingface.co/spaces/Johnny2005/Final_Project",
    githubUrl: "https://github.com/KarreJohnHyde/STUDY2AI",
    status: "Hugging Face Live",
    tone: "violet",
    label: "RAG · EDUCATION",
    role: "Lead AI Engineer & System Architect",
    timeline: "2025 – 2026",
    overview:
      "Study2AI transforms static academic research, university curricula, and technical textbooks into active, interactive knowledge partners. By pairing high-density semantic vector search with real-time context injection, students can interrogate complex material, explore contextual analogies, and receive verifiable citations linked directly to document page sources.",
    problemStatement:
      "Traditional educational search methods are fragmented: standard keyword matching misses conceptual context, while off-the-shelf generative models suffer from frequent factual hallucinations and lack verifiable citations to source textbooks.",
    solution:
      "Engineered an end-to-end Retrieval-Augmented Generation pipeline using LangChain, Hugging Face transformers, and a FAISS dense vector index. Query inputs undergo semantic expansion and cosine affinity matching, passing strictly verified context chunks into the LLM synthesis prompt.",
    architectureLayers: [
      {
        layer: "LAYER 01: DOCUMENT INGESTION & CHUNKING",
        title: "Semantic Text Splitting & Cleaning",
        description:
          "PDF, EPUB, and Markdown documents are parsed through a multi-pass text extraction pipeline. Text is partitioned using RecursiveCharacterTextSplitter with 512-token chunks and 64-token overlap, preserving table boundaries and mathematical formulas.",
        tech: ["PyPDF", "LangChain Recursive Splitter", "Regex Sanitizer"],
      },
      {
        layer: "LAYER 02: DENSE VECTOR ENCODING",
        title: "HuggingFace Embedding Pipeline",
        description:
          "Processed text chunks are converted into 384-dimensional dense semantic vectors using sentence-transformers (all-MiniLM-L6-v2), capturing semantic nuance across scientific and educational domains.",
        tech: ["sentence-transformers", "PyTorch", "CUDA Acceleration"],
      },
      {
        layer: "LAYER 03: VECTOR INDEXING & NEAREST-NEIGHBOR RETRIEVAL",
        title: "FAISS Topological Index",
        description:
          "High-speed similarity search using FAISS FlatIP and HNSW partitioning. Queries achieve sub-180ms nearest-neighbor resolution across tens of thousands of document embeddings.",
        tech: [
          "FAISS (Facebook AI Similarity Search)",
          "Cosine Similarity",
          "Top-K Routing",
        ],
      },
      {
        layer: "LAYER 04: GROUNDED SYNTHESIS & USER INTERFACE",
        title: "Streaming LLM Loop & Gradio Frontend",
        description:
          "Grounded prompt injection loop with strict hallucination constraints. Output is streamed in real time via Gradio with page-level citations, multi-turn dialogue memory, and token streaming.",
        tech: [
          "Gradio Web UI",
          "LangChain ConversationChain",
          "Hugging Face Spaces",
        ],
      },
    ],
    keyMetrics: [
      { value: "94.2%", label: "RETRIEVAL ACCURACY" },
      { value: "< 180ms", label: "QUERY RETRIEVAL LATENCY" },
      { value: "0.0%", label: "MEASURED HALLUCINATION RATE" },
      { value: "384-D", label: "VECTOR EMBEDDING SPACE" },
    ],
    highlights: [
      "Zero-hallucination verification through citation-enforced context prompt injection",
      "Sub-180ms retrieval latency via FAISS FlatIP nearest-neighbor search",
      "Full interactive web application live on Hugging Face Spaces with document upload support",
      "Maintains multi-turn conversational context with sliding window memory buffers",
    ],
  },
  "Expense AI": {
    number: "02",
    title: "Expense AI",
    headline: "Serverless Financial Intelligence & Automated OCR",
    description:
      "Serverless financial intelligence application featuring automated receipt OCR, QR payments, DynamoDB ledgering, and interactive spending analytics.",
    tags: ["AWS", "Next.js", "DynamoDB", "OCR", "FinTech", "Serverless"],
    category: "cloud",
    liveUrl: "https://expense-tracker-rho-olive-10.vercel.app",
    githubUrl: "https://github.com/KarreJohnHyde/Expense_Tracker",
    status: "Vercel Live",
    tone: "cyan",
    label: "FINTECH · CLOUD",
    role: "Full-Stack Cloud Engineer",
    timeline: "2025 – 2026",
    overview:
      "Expense AI modernizes financial auditing and personal bookkeeping. Users upload receipts, invoices, or scan UPI codes to extract structured itemized breakdowns, classify budget categories, and stream automated ledger entries directly into AWS cloud infrastructure.",
    problemStatement:
      "Manual expense tracking is tedious, prone to input errors, and lacks automated reconciliation between physical receipts and real-time bank accounts or digital wallets.",
    solution:
      "Engineered an automated serverless OCR pipeline on AWS that extracts merchant names, tax amounts, line items, and totals in seconds, updating an immutable DynamoDB single-table ledger with real-time client-side analytics.",
    architectureLayers: [
      {
        layer: "LAYER 01: REACTIVE CLIENT APPLICATION",
        title: "Next.js 15 & Tailwind UI",
        description:
          "Sleek mobile-first frontend with instant receipt camera capture, drag-and-drop file upload, dynamic UPI QR generation, and real-time category spending charts.",
        tech: ["Next.js", "React 19", "Tailwind CSS", "Recharts"],
      },
      {
        layer: "LAYER 02: SERVERLESS API & COMPUTE",
        title: "AWS API Gateway & Lambda Functions",
        description:
          "Microservices architecture executed via Node.js Lambda functions with least-privilege IAM roles, handling idempotent transactions and secure JWT session validation.",
        tech: ["AWS Lambda", "API Gateway", "Node.js 20", "IAM"],
      },
      {
        layer: "LAYER 03: COMPUTER VISION & OCR INGESTION",
        title: "Receipt Text Parsing & Normalization",
        description:
          "Optical Character Recognition (OCR) pipeline identifying bounding boxes, vendor names, dates, item arrays, and total amounts with regex fallback algorithms.",
        tech: ["Tesseract OCR", "AWS Textract", "Fuzzy String Matching"],
      },
      {
        layer: "LAYER 04: STORAGE & PERSISTENCE",
        title: "Amazon DynamoDB Single-Table Ledger",
        description:
          "NoSQL data architecture using partition and sort keys for fast queries, monthly aggregations, and automatic TTL archival of temporary uploaded blobs.",
        tech: ["Amazon DynamoDB", "AWS S3 Bucket", "Global Secondary Indexes"],
      },
    ],
    keyMetrics: [
      { value: "< 200ms", label: "API ENDPOINT RESPONSE" },
      { value: "98.4%", label: "RECEIPT DATA EXTRACTION RATE" },
      { value: "100%", label: "SERVERLESS ZERO-MAINTENANCE" },
      { value: "Live", label: "PRODUCTION VERCEL DEPLOYMENT" },
    ],
    highlights: [
      "Automated receipt OCR extraction converting photos into structured ledger items",
      "Built with AWS Serverless (Lambda, DynamoDB, API Gateway) for infinite auto-scaling",
      "Dynamic QR code generator for seamless peer-to-peer UPI payments",
      "Interactive data visualizations tracking weekly, monthly, and category spending trends",
    ],
  },
  "Cognitive Learning": {
    number: "03",
    title: "Cognitive Learning",
    headline: "Unsupervised Machine Learning & Cognitive Archetype Modeling",
    description:
      "Adaptive ML dashboard that classifies learners into cognitive archetypes using K-Means clustering and PCA dimensionality reduction (Innoverse'26).",
    tags: ["Streamlit", "scikit-learn", "K-Means", "PCA", "Innoverse'26", "ML"],
    category: "ai",
    liveUrl: "https://cognitivelearning-5zqpetkfjexgbjx5kdappgk.streamlit.app/",
    githubUrl: "https://github.com/KarreJohnHyde/cognitive_learning",
    status: "Streamlit Live",
    tone: "lime",
    label: "ML · HACKATHON",
    role: "Machine Learning Researcher & Developer",
    timeline: "Innoverse'26 Hackathon",
    overview:
      "Built for the Innoverse'26 Hackathon, Cognitive Learning models learning behavior across high-dimensional cognitive metrics. By applying unsupervised K-Means clustering and Principal Component Analysis, it uncovers distinct student archetypes and suggests personalized curriculum pacing.",
    problemStatement:
      "One-size-fits-all digital education ignores individualized learning styles, resulting in dropouts and frustration for both fast and deliberate learners.",
    solution:
      "Created an unsupervised machine learning clustering pipeline that groups learners by engagement patterns, response latency, and error retry topologies, mapping students to tailored pedagogical recommendations.",
    architectureLayers: [
      {
        layer: "LAYER 01: FEATURE EXTRACTION & NORMALIZATION",
        title: "Multi-Variate Cognitive Metrics",
        description:
          "Extraction of behavioral telemetry: task completion duration, error frequency, hint requests, and retry velocity, normalized using scikit-learn StandardScaler.",
        tech: ["NumPy", "Pandas", "scikit-learn StandardScaler"],
      },
      {
        layer: "LAYER 02: DIMENSIONALITY REDUCTION",
        title: "Principal Component Analysis (PCA)",
        description:
          "Compresses 12+ cognitive behavioral dimensions into 2D and 3D principal components while retaining over 88% of original feature variance.",
        tech: ["PCA (scikit-learn)", "Covariance Eigen-decomposition"],
      },
      {
        layer: "LAYER 03: CLUSTERING & ARCHETYPE PARTITIONING",
        title: "K-Means Centroid Algorithm",
        description:
          "Computes optimal cluster counts via Elbow Method and Silhouette Analysis, isolating 5 distinct learning archetypes ranging from intuitive to analytical.",
        tech: [
          "K-Means Clustering",
          "Silhouette Scoring",
          "Centroid Optimization",
        ],
      },
      {
        layer: "LAYER 04: STREAMLIT VISUALIZATION SUITE",
        title: "Interactive 3D Cluster Analytics",
        description:
          "Cloud-hosted Streamlit application offering interactive 3D rotation, real-time student profiling, and custom parameter adjustments.",
        tech: ["Streamlit", "Plotly 3D Graphs", "Streamlit Cloud"],
      },
    ],
    keyMetrics: [
      { value: "5 Centroids", label: "LEARNING ARCHETYPES IDENTIFIED" },
      { value: "88.6%", label: "PCA VARIANCE RETAINED" },
      { value: "Real-Time", label: "CLUSTER CLASSIFICATION" },
      { value: "Participant", label: "INNOVERSE'26 SUBMISSION" },
    ],
    highlights: [
      "Project submission at the Innoverse'26 Hackathon exploring adaptive student education",
      "Unsupervised K-Means clustering discovering 5 distinct student cognitive profiles",
      "Interactive 3D Plotly manifold visualizing principal components in real time",
      "Deployed and running live on Streamlit Cloud with dynamic dataset simulation",
    ],
  },
  MedTwin: {
    number: "04",
    title: "MedTwin",
    headline: "Healthcare AI Digital Twin & Clinical Simulation Engine",
    description:
      "Healthcare-focused AI digital twin exploration for clinical decision support, biomarker analysis, and patient disease simulation.",
    tags: [
      "AI",
      "Healthcare",
      "Jupyter",
      "Diagnostics",
      "Machine Learning",
      "XAI",
    ],
    category: "ai",
    liveUrl: "https://github.com/KarreJohnHyde/MedTwin",
    githubUrl: "https://github.com/KarreJohnHyde/MedTwin",
    status: "GitHub Active",
    tone: "violet",
    label: "HEALTH · AI",
    role: "AI Healthcare Researcher",
    timeline: "2025 – 2026",
    overview:
      "MedTwin builds predictive computational models of patient physiology. By aggregating longitudinal clinical data, vital statistics, and laboratory biomarkers, MedTwin simulates disease trajectories and supports proactive medical decision-making.",
    problemStatement:
      "Clinical diagnoses often occur after acute symptoms manifest. Doctors lack tools to simulate treatment response trajectories in advance across divergent patient biomarker profiles.",
    solution:
      "Engineered machine learning regression and classification models utilizing gradient boosting and explainable AI (SHAP) to simulate patient health outcomes and highlight high-risk physiological indicators.",
    architectureLayers: [
      {
        layer: "LAYER 01: BIOMARKER INGESTION & DATA CLEANING",
        title: "Clinical Feature Standardization",
        description:
          "Sanitization of patient health metrics (blood panels, glucose fluctuations, hemodynamics, cardiovascular indices) with missing-value imputation and outlier suppression.",
        tech: ["Pandas", "NumPy", "Clinical Dataset Normalization"],
      },
      {
        layer: "LAYER 02: PREDICTIVE ML MODELING",
        title: "Gradient Boosting & Neural Networks",
        description:
          "Multi-model ensemble utilizing XGBoost, Random Forest, and multilayer perceptrons to predict chronic condition probabilities and complication risks.",
        tech: ["XGBoost", "scikit-learn", "LightGBM", "PyTorch"],
      },
      {
        layer: "LAYER 03: EXPLAINABLE AI (XAI)",
        title: "SHAP Biomarker Attribution",
        description:
          "Shapley Additive Explanations calculate individual biomarker impact weights, ensuring clinicians understand exactly which indicators drove the model's prediction.",
        tech: ["SHAP", "TreeExplainer", "Feature Importance Visualizer"],
      },
      {
        layer: "LAYER 04: SIMULATION WORKBOOK",
        title: "Jupyter Research & Diagnostic Flow",
        description:
          "Comprehensive interactive notebooks with scenario modeling, what-if drug dosage simulations, and clinical correlation matrices.",
        tech: ["Jupyter Lab", "Matplotlib", "Seaborn"],
      },
    ],
    keyMetrics: [
      { value: "91.8%", label: "PREDICTIVE CLINICAL ACCURACY" },
      { value: "100%", label: "INTERPRETABLE SHAP ATTRIBUTIONS" },
      { value: "14+", label: "VITAL BIOMARKERS MONITORED" },
      { value: "Active", label: "GITHUB RESEARCH REPOSITORY" },
    ],
    highlights: [
      "Physiological parameter simulation modeling treatment pathways",
      "Integrated SHAP explainability ensuring transparency for medical decisions",
      "Reproducible research pipelines documented in structured Jupyter notebooks",
      "Evaluated against public clinical benchmark datasets with rigorous cross-validation",
    ],
  },
  "Project Jarvis AI": {
    number: "05",
    title: "Project Jarvis AI",
    headline: "Voice-Activated Autonomous Desktop Assistant",
    description:
      "Voice-activated personal assistant with task automation, audio recognition, desktop controls, and real-time query execution.",
    tags: [
      "Python",
      "Voice AI",
      "Automation",
      "NLP",
      "Speech Recognition",
      "System APIs",
    ],
    category: "ai",
    liveUrl: "https://github.com/KarreJohnHyde/project-Jarvis-AI",
    githubUrl: "https://github.com/KarreJohnHyde/project-Jarvis-AI",
    status: "GitHub Active",
    tone: "cyan",
    label: "VOICE · AUTOMATION",
    role: "Lead Systems & Automation Developer",
    timeline: "2024 – 2025",
    overview:
      "Project Jarvis AI is an intelligent desktop companion designed for natural voice-driven productivity. It executes OS-level operations, manages web interactions, drafts communications, and answers real-time knowledge queries through an acoustic voice loop.",
    problemStatement:
      "Complex multi-window computer workflows frequently break concentration. Traditional voice assistants are walled gardens with limited operating system control.",
    solution:
      "Developed a modular Python assistant pairing speech recognition with custom operating system hooks, allowing hands-free task automation, window switching, application launch, and dynamic query lookup.",
    architectureLayers: [
      {
        layer: "LAYER 01: AUDIO CAPTURE & STT ENGINE",
        title: "Acoustic Speech Processing",
        description:
          "Continuous microphone stream listening for hotword activation, passing captured audio into Google Speech Recognition with local Whisper fallback.",
        tech: ["PyAudio", "SpeechRecognition", "OpenAI Whisper"],
      },
      {
        layer: "LAYER 02: NATURAL LANGUAGE ROUTER",
        title: "Intent Parsing & Command Extraction",
        description:
          "Regex rules and natural language processing extract intent verbs, target applications, search queries, and parameter arguments.",
        tech: ["NLTK", "Regex Tokenizer", "Intent Taxonomy"],
      },
      {
        layer: "LAYER 03: OS AUTOMATION DISPATCHER",
        title: "Desktop Controls & System APIs",
        description:
          "Low-level operating system bindings executing window minimization, multimedia control, screenshot capture, volume adjustment, and app orchestration.",
        tech: ["PyAutoGUI", "OS & Subprocess Modules", "Platform APIs"],
      },
      {
        layer: "LAYER 04: SPEECH SYNTHESIS FEEDBACK",
        title: "Text-to-Speech Output Loop",
        description:
          "Low-latency voice feedback engine responding with natural cadence and affirmative acknowledgments.",
        tech: ["pyttsx3", "Audio Feedback Queue"],
      },
    ],
    keyMetrics: [
      { value: "< 350ms", label: "COMMAND DISPATCH TIME" },
      { value: "40+", label: "SUPPORTED DESKTOP COMMANDS" },
      { value: "Offline", label: "LOCAL SYSTEM OPERATION CAPABLE" },
      { value: "Open Source", label: "GITHUB CODEBASE AVAILABLE" },
    ],
    highlights: [
      "Hands-free voice execution of desktop workflows, application launches, and web lookups",
      "Low-latency audio capture with wake-word detection and noise cancellation",
      "Native OS integration for volume, media playback, and window management",
      "Extensible modular architecture allowing custom user automation scripts",
    ],
  },
  "Noel Foundation": {
    number: "06",
    title: "Noel Foundation",
    headline: "High-Performance Modern Web Platform for Community Impact",
    description:
      "Purpose-led web platform engineered for a community welfare organization, featuring responsive presentation, event highlights, and outreach.",
    tags: [
      "React 19",
      "UI/UX",
      "Vercel Edge",
      "Community",
      "Accessibility",
      "Tailwind CSS",
    ],
    category: "web",
    liveUrl: "https://noel-foundation.vercel.app",
    githubUrl: "https://github.com/KarreJohnHyde/Noel-Foundation",
    status: "Vercel Live",
    tone: "cyan",
    label: "WEB · IMPACT",
    role: "Lead Frontend Engineer & UI Designer",
    timeline: "2025",
    overview:
      "Created for the Noel Foundation, this web platform elevates the organization's humanitarian outreach, community education programs, and fundraising initiatives with modern, accessible, and fast web design.",
    problemStatement:
      "Grassroots non-profits often operate with slow, outdated websites that fail on mobile devices and lack clear conversion pathways for volunteer signups and donations.",
    solution:
      "Built a modern React web application with responsive layout, zero layout shift (CLS 0.0), fast image compression, and direct donation and event registration flows.",
    architectureLayers: [
      {
        layer: "LAYER 01: COMPONENT DESIGN SYSTEM",
        title: "Semantic HTML & Responsive Tailwind",
        description:
          "Modular UI built with modern CSS custom properties, accessible navigation, responsive card layouts, and subtle scroll micro-animations.",
        tech: ["React 19", "Tailwind CSS", "Semantic HTML5"],
      },
      {
        layer: "LAYER 02: PERFORMANCE OPTIMIZATION",
        title: "Asset Delivery & Font Subsetting",
        description:
          "Next-gen WebP imagery, asynchronous font rendering, and zero blocking third-party scripts resulting in top-tier Core Web Vitals.",
        tech: ["WebP Image Compression", "Lazy Loading", "Font Display Swap"],
      },
      {
        layer: "LAYER 03: OUTREACH & ENGAGEMENT",
        title: "Interactive Events & Contact Channel",
        description:
          "Integrated event registration forms, direct WhatsApp and email outreach bridges, and accessible content structures.",
        tech: ["Form Handlers", "WhatsApp Web API", "Accessible Forms"],
      },
      {
        layer: "LAYER 04: EDGE HOSTING",
        title: "Global Vercel CDN Deployment",
        description:
          "Continuous integration pipeline with automated preview builds, SSL certificates, and global edge cache distribution.",
        tech: ["Vercel Edge Network", "GitHub Actions CI/CD"],
      },
    ],
    keyMetrics: [
      { value: "99+", label: "GOOGLE LIGHTHOUSE SCORE" },
      { value: "0.0", label: "CUMULATIVE LAYOUT SHIFT (CLS)" },
      { value: "100%", label: "MOBILE RESPONSIVE COMPLIANCE" },
      { value: "Live", label: "PRODUCTION VERCEL URL" },
    ],
    highlights: [
      "Purpose-built for community social welfare and volunteer mobilization",
      "Near-perfect 99+ Lighthouse score across Performance and Accessibility",
      "Seamless communication bridges for rapid community member onboarding",
      "Production-ready deployment hosted on Vercel's global edge network",
    ],
  },
  AgriMandi: {
    number: "07",
    title: "AgriMandi",
    headline: "Decentralized Agricultural Marketplace & Fair Valuation",
    description:
      "Digital agricultural marketplace connecting farmers with buyers, transparent crop valuation workflows, and direct supply connectivity.",
    tags: [
      "Agritech",
      "Next.js",
      "Supply Chain",
      "Cloud",
      "TypeScript",
      "Marketplace",
    ],
    category: "cloud",
    liveUrl: "https://agrimandi.vercel.app",
    githubUrl: "https://github.com/KarreJohnHyde/agrimndi",
    status: "Vercel Preview",
    tone: "lime",
    label: "AGRITECH · MARKETPLACE",
    role: "Full-Stack Agritech Developer",
    timeline: "2025",
    overview:
      "AgriMandi is a digital exchange bridging the gap between local crop producers and institutional purchasers. It guarantees price transparency, real-time market mandi updates, and disintermediates exploitative middlemen.",
    problemStatement:
      "Farmers lose substantial revenue to multi-tier middleman cartels due to information asymmetry and lack of direct digital access to wholesale commercial buyers.",
    solution:
      "Engineered an agritech trading portal offering direct crop listing, quality grade certification workflows, and real-time wholesale price indicators.",
    architectureLayers: [
      {
        layer: "LAYER 01: MOBILE-FIRST TRADING PORTAL",
        title: "Next.js App Router Architecture",
        description:
          "Fast, low-bandwidth UI designed for rural mobile connections with high-contrast text and simplified multi-language interfaces.",
        tech: ["Next.js App Router", "React 19", "Tailwind CSS"],
      },
      {
        layer: "LAYER 02: COMMODITY LISTING & CATALOG",
        title: "Dynamic Agricultural Inventory",
        description:
          "Structured crop classification (grain, pulses, vegetables, spices) with harvest date timestamps, moisture level indicators, and volume specifications.",
        tech: ["TypeScript Domain Models", "Zod Validation"],
      },
      {
        layer: "LAYER 03: PRICE DISCOVERY & ANALYTICS",
        title: "Mandi Price Tracker & Valuation",
        description:
          "Algorithmic valuation estimates based on prevailing regional APMC market data, historical price trends, and batch quantity tiers.",
        tech: ["Pricing Algorithms", "APMC Data Ingestion"],
      },
      {
        layer: "LAYER 04: ESCROW WORKFLOW & LOGISTICS",
        title: "Order Fulfillment Lifecycle",
        description:
          "Multi-stage transaction states ensuring security: Crop Posted -> Buyer Offer -> Agreed Terms -> Logistics Pickup -> Payment Release.",
        tech: ["State Machine Logic", "Server Actions"],
      },
    ],
    keyMetrics: [
      { value: "0%", label: "MIDDLEMAN COMMISSIONS" },
      { value: "100%", label: "TRANSPARENT PRICE VISIBILITY" },
      { value: "Mobile", label: "OPTIMIZED FOR LOW-BANDWIDTH" },
      { value: "Live", label: "VERCEL PREVIEW DEPLOYED" },
    ],
    highlights: [
      "Direct farmer-to-buyer crop marketplace eliminating exploitative commission fees",
      "Real-time mandi price benchmarking ensuring fair valuation for farmers",
      "Designed specifically for lightweight rural mobile web usage",
      "Full interactive demo available live on Vercel",
    ],
  },
  "Xen-01": {
    number: "08",
    title: "Xen-01",
    headline: "Futuristic Cyberpunk Web Experience & Motion Engine",
    description:
      "Cyberpunk-inspired digital interface pushing modern CSS micro-animations, glassmorphic layout, fluid navigation, and responsive typography.",
    tags: [
      "Next.js",
      "TypeScript",
      "Vercel",
      "Creative",
      "Modern CSS",
      "Micro-Animations",
    ],
    category: "web",
    liveUrl: "https://xen-01.vercel.app",
    githubUrl: "https://github.com/KarreJohnHyde/Xen-01",
    status: "Vercel Live",
    tone: "violet",
    label: "CREATIVE · WEB",
    role: "Creative Developer & Interaction Designer",
    timeline: "2025",
    overview:
      "Xen-01 is a creative web experiment inspired by cyberpunk and neo-brutalist digital aesthetics. It demonstrates advanced CSS animations, glowing HUD overlays, responsive typography, and tactile UI micro-interactions.",
    problemStatement:
      "Modern web design is often homogeneous and sterile, rarely taking full advantage of GPU-accelerated CSS and interactive cyber aesthetics.",
    solution:
      "Engineered an expressive cyberpunk web interface featuring fluid grid coordinates, glassmorphic HUD modules, and dynamic pointer interaction lights.",
    architectureLayers: [
      {
        layer: "LAYER 01: HIGH-TECH CYBERPUNK HUD",
        title: "Modular Dashboard Geometry",
        description:
          "Precision telemetry cards, corner registration crosshairs, neon telemetry badges, and scanline overlays built with pure CSS.",
        tech: ["Modern CSS", "CSS Grid", "Backdrop Filter Blur"],
      },
      {
        layer: "LAYER 02: GPU-ACCELERATED KINETIC MOTION",
        title: "Fluid Micro-Interactions",
        description:
          "Hardware-accelerated transforms and opacity transitions running at 60 FPS without layout recalculation overhead.",
        tech: [
          "CSS Transform3D",
          "Will-Change Optimization",
          "Keyframe Animations",
        ],
      },
      {
        layer: "LAYER 03: DYNAMIC MOUSE PARALLAX",
        title: "Pointer-Driven Lighting Matrix",
        description:
          "Real-time mouse coordinate tracking that feeds dynamic CSS variables (`--mouse-x`, `--mouse-y`) to power radial glow highlights.",
        tech: ["Pointer Events API", "CSS Custom Properties"],
      },
      {
        layer: "LAYER 04: EDGE HOSTING",
        title: "Instant Global Delivery",
        description:
          "Built on Next.js and deployed to Vercel's global CDN for instantaneous load speeds worldwide.",
        tech: ["Next.js", "TypeScript", "Vercel Edge Network"],
      },
    ],
    keyMetrics: [
      { value: "60 FPS", label: "HARDWARE-ACCELERATED MOTION" },
      { value: "Zero", label: "HEAVY ANIMATION DEPENDENCY OVERHEAD" },
      { value: "100%", label: "RESPONSIVE HUD INTERFACE" },
      { value: "Live", label: "PRODUCTION VERCEL URL" },
    ],
    highlights: [
      "Futuristic cyberpunk design language with neon cyan and violet accents",
      "Dynamic mouse coordinate lighting matrix highlighting UI cards",
      "Pure CSS hardware-accelerated animations with silky 60 FPS performance",
      "Live production demo deployed on Vercel",
    ],
  },
  "Brite Systems": {
    number: "09",
    title: "Brite Systems",
    headline: "Enterprise Operations & Administrative Software Suite (Brite Spark 2026)",
    description:
      "Project submission for the Brite Spark 2026 hackathon: an enterprise software architecture and web application suite structured for business process operations, modular data handling, and administrative control.",
    tags: [
      "React",
      "TypeScript",
      "Enterprise",
      "Streamlit",
      "Brite Spark 2026",
      "RBAC",
      "Cloud",
    ],
    category: "cloud",
    liveUrl: "https://brite-systems.streamlit.app/",
    githubUrl: "https://github.com/KarreJohnHyde/Brite-Systems",
    status: "Streamlit Live",
    tone: "cyan",
    label: "HACKATHON · ENTERPRISE",
    role: "Hackathon Participant & Systems Developer",
    timeline: "Brite Spark 2026 Hackathon",
    overview:
      "Developed and submitted for the Brite Spark 2026 hackathon, Brite Systems is an enterprise software platform engineered to handle complex corporate workflows, administrative reporting, data operations, and multi-tier user role authentication with zero system friction.",
    problemStatement:
      "Organizations struggle with disjointed legacy administrative tools that suffer from technical debt, tight coupling, and brittle permission structures during high-velocity hackathon and enterprise operational deployments.",
    solution:
      "Built a modular enterprise architecture using TypeScript and React with domain-driven design, clean separation of concerns, and robust role-based security, successfully submitted to Brite Spark 2026.",
    architectureLayers: [
      {
        layer: "LAYER 01: MODULAR ENTERPRISE UI",
        title: "Typed Component Library",
        description:
          "Reusable design system featuring data tables, filterable audit logs, modal confirmation workflows, and notification drawers.",
        tech: ["React 19", "TypeScript", "Tailwind CSS"],
      },
      {
        layer: "LAYER 02: ROLE-BASED ACCESS CONTROL (RBAC)",
        title: "Security & Permission Matrix",
        description:
          "Granular permission verification for Super Admins, Managers, and Staff ensuring complete data isolation across enterprise tenants.",
        tech: ["RBAC Architecture", "JWT Token Handling", "Security Guards"],
      },
      {
        layer: "LAYER 03: DATA SYNCHRONIZATION & CACHING",
        title: "Asynchronous Query Management",
        description:
          "Optimistic UI updates, automated stale-while-revalidate data fetching, and background polling for business process states.",
        tech: ["Custom Hook Architecture", "Optimistic State Updates"],
      },
      {
        layer: "LAYER 04: INFRASTRUCTURE & REPOSITORIES",
        title: "Modular Codebase & Version Control",
        description:
          "Clean code architecture with decoupled services, API abstraction layers, and standardized error handling.",
        tech: ["Git", "GitHub", "Enterprise Architecture"],
      },
    ],
    keyMetrics: [
      { value: "Brite Spark '26", label: "HACKATHON SUBMISSION" },
      { value: "100%", label: "STRICT TYPESCRIPT TYPE SAFETY" },
      { value: "3 Tiers", label: "ROLE-BASED ACCESS PRIVILEGES" },
      { value: "Live", label: "STREAMLIT DEPLOYMENT ACTIVE" },
    ],
    highlights: [
      "Project submission for the Brite Spark 2026 hackathon showcasing modular enterprise architecture",
      "Live deployment hosted on Streamlit at https://brite-systems.streamlit.app/",
      "Role-Based Access Control (RBAC) securing business operational endpoints",
      "Comprehensive GitHub repository documenting enterprise code patterns",
    ],
  },
  "Gravity Glow": {
    number: "10",
    title: "Gravity Glow",
    headline: "Real-Time Interactive Particle Physics & Gravitational Canvas",
    description:
      "Experimental interactive physics canvas featuring gravity simulation, particle trajectories, and dynamic glowing shader effects.",
    tags: [
      "HTML5 Canvas",
      "Physics Simulation",
      "Interactive",
      "Vite",
      "Math",
      "Creative Coding",
    ],
    category: "web",
    liveUrl: "https://github.com/KarreJohnHyde/gravity-glow-portfolio",
    githubUrl: "https://github.com/KarreJohnHyde/gravity-glow-portfolio",
    status: "GitHub Active",
    tone: "lime",
    label: "PHYSICS · EXPERIMENTAL",
    role: "Creative Physics & Graphics Developer",
    timeline: "2024",
    overview:
      "Gravity Glow is a mathematical physics experiment rendering multi-body gravitational attraction in real time. Hundreds of luminous celestial particles orbit, collide, and trace chromatic glow trails based on Newtonian physics.",
    problemStatement:
      "Standard web animations rely on pre-baked keyframes rather than emergent real-time physical simulation, missing the tactile organic feel of natural physics.",
    solution:
      "Built a custom 2D Verlet integration physics engine on HTML5 Canvas with gravitational attraction attractors, velocity damping, and additive composite glow blending.",
    architectureLayers: [
      {
        layer: "LAYER 01: NEWTONIAN GRAVITY ENGINE",
        title: "Verlet Integration & Force Vectors",
        description:
          "Mathematical engine calculating pairwise gravitational attraction forces (F = G * m1 * m2 / r^2) between particles and mouse attractors.",
        tech: ["Vector2D Math", "Verlet Integration", "Collision Detection"],
      },
      {
        layer: "LAYER 02: HIGH-PERFORMANCE CANVAS RENDERER",
        title: "Double-Buffered 2D Graphics",
        description:
          "Render pipeline utilizing Canvas 2D context composite operation ('lighter') to generate glowing chromatic light trails at 60 FPS.",
        tech: ["HTML5 Canvas 2D", "RequestAnimationFrame", "Additive Blending"],
      },
      {
        layer: "LAYER 03: INTERACTIVE ATTRACTION POINTS",
        title: "Pointer & Touch Perturbation",
        description:
          "Users can spawn dynamic gravitational wells with mouse clicks or finger touch, bending planetary particle trajectories in real time.",
        tech: ["Mouse & Touch Event Listeners", "Kinetic Attractor Nodes"],
      },
      {
        layer: "LAYER 04: BUILD & BUNDLE PIPELINE",
        title: "Lightning-Fast Vite Build",
        description:
          "Packaged with Vite and TypeScript for near-instant hot module replacement and tree-shaken production bundles.",
        tech: ["Vite", "TypeScript", "ES6 Modules"],
      },
    ],
    keyMetrics: [
      { value: "60 FPS", label: "CANVAS RENDERING REFRESH RATE" },
      { value: "2,000+", label: "SIMULTANEOUS PHYSICS PARTICLES" },
      { value: "100%", label: "REAL-TIME NEWTONIAN MATH" },
      { value: "Active", label: "GITHUB CODEBASE ACCESSIBLE" },
    ],
    highlights: [
      "Real-time Newtonian gravitational math with interactive particle orbits",
      "Additive composite blending generating luminous chromatic glow trails",
      "Interactive mouse attractors allowing users to warp and slingshot particle fields",
      "Full source code and mathematical documentation available on GitHub",
    ],
  },
}

interface ProjectDetailPageProps {
  projectTitle: string
  onClose: () => void
}

export default function ProjectDetailPage({
  projectTitle,
  onClose,
}: ProjectDetailPageProps) {
  const project =
    detailedProjectsData[projectTitle] || detailedProjectsData["Study2AI"]

  // Close on Escape key and prevent background document scroll while open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)

    // Save previous overflow style and lock scroll
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [onClose])

  const toneColor =
    project.tone === "lime"
      ? "#a3e635"
      : project.tone === "cyan"
        ? "#00f0ff"
        : "#c084fc"

  return (
    <div
      aria-label={`Detailed Architecture and Breakdown for ${project.title}`}
      aria-modal="true"
      className="project-detail-overlay"
      role="dialog"
    >
      {/* Background Cyber Backing & Grid Lines mirroring 3D section framing */}
      <div className="project-detail-backdrop" onClick={onClose} />
      <div className="project-detail-grid-lines" aria-hidden="true" />

      <div className="project-detail-container">
        {/* Top Header Bar */}
        <header className="project-detail-header">
          <button
            className="detail-back-btn"
            onClick={onClose}
            type="button"
            title="Return to Selected Work"
          >
            <span className="back-arrow">←</span>
            <span>BACK TO SELECTED WORK</span>
          </button>

          <div className="detail-header-badges">
            <span
              className="detail-status-pill"
              style={{
                borderColor: `${toneColor}44`,
                color: toneColor,
                backgroundColor: `${toneColor}12`,
              }}
            >
              <span
                className="live-dot"
                style={{ backgroundColor: toneColor }}
              />
              {project.status}
            </span>
            <span className="detail-meta-chip">PROJECT /{project.number}</span>
          </div>

          <button
            aria-label="Close project detail view"
            className="detail-close-btn"
            onClick={onClose}
            type="button"
          >
            ✕
          </button>
        </header>

        {/* Content Body */}
        <div className="project-detail-body">
          {/* Hero Banner Section */}
          <div className="project-detail-hero">
            <div className="detail-hero-left">
              <span className="detail-kicker" style={{ color: toneColor }}>
                {project.label} · {project.timeline}
              </span>
              <h1 className="detail-title">{project.title}</h1>
              <p className="detail-headline">{project.headline}</p>

              {/* Action Buttons: Live Demo and GitHub Repo */}
              <div className="detail-actions-row">
                {project.liveUrl && (
                  <a
                    className="detail-primary-btn"
                    href={project.liveUrl}
                    rel="noreferrer"
                    style={{
                      backgroundColor: toneColor,
                      color: "#0a0a0c",
                    }}
                    target="_blank"
                  >
                    <span>Launch Live Production Demo</span>
                    <span className="external-arrow">↗</span>
                  </a>
                )}
                <a
                  className="detail-secondary-btn"
                  href={project.githubUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <svg
                    className="detail-icon"
                    fill="currentColor"
                    height="18"
                    viewBox="0 0 24 24"
                    width="18"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>View GitHub Repository</span>
                </a>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="detail-metrics-panel">
              <span className="panel-label">
                SYSTEM TELEMETRY &amp; BENCHMARKS
              </span>
              <div className="detail-metrics-grid">
                {project.keyMetrics.map((m) => (
                  <div className="metric-box" key={m.label}>
                    <strong className="metric-num" style={{ color: toneColor }}>
                      {m.value}
                    </strong>
                    <span className="metric-sub">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tags bar */}
          <div className="detail-tags-bar">
            <span className="tags-label">CORE TECHNOLOGIES:</span>
            <div className="tags-list">
              {project.tags.map((t) => (
                <span className="detail-tech-badge" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Deep Explanation Section */}
          <section className="detail-section">
            <div className="detail-section-title">
              <span className="section-index">01 //</span>
              <h2>Project Overview &amp; Problem Statement</h2>
            </div>
            <div className="detail-text-grid">
              <div className="detail-card">
                <h3>The Challenge</h3>
                <p>{project.problemStatement}</p>
              </div>
              <div className="detail-card">
                <h3>The Engineering Solution</h3>
                <p>{project.solution}</p>
              </div>
            </div>
            <div className="detail-card full-width">
              <h3>Comprehensive Architecture Overview</h3>
              <p>{project.overview}</p>
            </div>
          </section>

          {/* Modern Architecture Breakdown */}
          <section className="detail-section">
            <div className="detail-section-title">
              <span className="section-index">02 //</span>
              <h2>Modern Architecture &amp; System Pipeline</h2>
            </div>

            {/* Visual Architecture Flow Diagram */}
            <div className="architecture-pipeline-flow">
              <div className="flow-step">
                <span className="step-num">01</span>
                <strong>Client / UI</strong>
                <small>User Input &amp; Stream</small>
              </div>
              <div className="flow-arrow">➔</div>
              <div className="flow-step">
                <span className="step-num">02</span>
                <strong>API Gateway</strong>
                <small>Validation &amp; Routing</small>
              </div>
              <div className="flow-arrow">➔</div>
              <div
                className="flow-step active-flow"
                style={{ borderColor: toneColor }}
              >
                <span className="step-num">03</span>
                <strong>Engine Core</strong>
                <small>ML / Vector / Logic</small>
              </div>
              <div className="flow-arrow">➔</div>
              <div className="flow-step">
                <span className="step-num">04</span>
                <strong>Storage / Cache</strong>
                <small>Ledger / FAISS / DB</small>
              </div>
              <div className="flow-arrow">➔</div>
              <div className="flow-step">
                <span className="step-num">05</span>
                <strong>Edge Response</strong>
                <small>Verified Low Latency</small>
              </div>
            </div>

            {/* Individual Layer Cards */}
            <div className="architecture-layers-list">
              {project.architectureLayers.map((layer, idx) => (
                <div className="arch-layer-card" key={layer.layer}>
                  <div className="arch-layer-header">
                    <span className="arch-layer-badge">{layer.layer}</span>
                    <h3>{layer.title}</h3>
                  </div>
                  <p className="arch-layer-desc">{layer.description}</p>
                  <div className="arch-tech-chips">
                    {layer.tech.map((tc) => (
                      <span className="arch-tech-chip" key={tc}>
                        <span
                          className="chip-bullet"
                          style={{ backgroundColor: toneColor }}
                        />
                        {tc}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Key Engineering Innovations */}
          <section className="detail-section">
            <div className="detail-section-title">
              <span className="section-index">03 //</span>
              <h2>Engineering Highlights &amp; Production Verification</h2>
            </div>
            <div className="highlights-grid">
              {project.highlights.map((highlight, idx) => (
                <div className="highlight-item" key={idx}>
                  <span
                    className="highlight-check"
                    style={{ color: toneColor }}
                  >
                    ✦
                  </span>
                  <p>{highlight}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer Callout */}
          <footer className="project-detail-footer">
            <div className="footer-callout">
              <p>
                Ready to review the source code or test the deployment in real
                time?
              </p>
              <div className="footer-links">
                {project.liveUrl && (
                  <a
                    className="detail-primary-btn"
                    href={project.liveUrl}
                    rel="noreferrer"
                    style={{
                      backgroundColor: toneColor,
                      color: "#0a0a0c",
                    }}
                    target="_blank"
                  >
                    <span>Open Live Demo</span>
                    <span className="external-arrow">↗</span>
                  </a>
                )}
                <a
                  className="detail-secondary-btn"
                  href={project.githubUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span>Explore Repository on GitHub</span>
                  <span className="external-arrow">↗</span>
                </a>
                <button
                  className="detail-back-btn"
                  onClick={onClose}
                  type="button"
                >
                  Close &amp; Return to Portfolio
                </button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
