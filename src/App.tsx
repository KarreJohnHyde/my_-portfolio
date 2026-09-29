import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react"
import portrait from "./imports/ce60ae59-92f9-4d33-8d8a-3c43c3f866ea.png"
import resume from "./imports/Karre_John_Hyde_Resume__3_.pdf"
import ScrollytellingSection from "./components/ScrollytellingSection"
import {
  initSmoothScroll,
  scrollToTarget,
  destroySmoothScroll,
} from "./lib/smoothScroll"

type IconName =
  | "arrow"
  | "brain"
  | "check"
  | "cloud"
  | "code"
  | "copy"
  | "cpu"
  | "download"
  | "external"
  | "github"
  | "globe"
  | "grid"
  | "linkedin"
  | "mail"
  | "mapPin"
  | "phone"
  | "server"
  | "spark"
  | "terminal"
  | "whatsapp"

const links = {
  github: "https://github.com/KarreJohnHyde",
  linkedin: "https://www.linkedin.com/in/karre-john-hyde-594b67416/",
  email: "mailto:johnnykarre@gmail.com",
  vercel: "https://vercel.com/johnnyvercel",
  whatsapp: "https://wa.me/919100243535",
}

type ProjectCategory = "all" | "ai" | "cloud" | "web"

type ProjectItem = {
  number: string
  title: string
  description: string
  tags: string[]
  category: ProjectCategory
  liveUrl?: string
  githubUrl: string
  status: string
  tone: "violet" | "cyan" | "lime"
  icon: IconName
  label: string
}

const projects: ProjectItem[] = [
  {
    number: "01",
    title: "Study2AI",
    description:
      "A full-stack RAG (Retrieval-Augmented Generation) system that turns documents into grounded, context-aware interactive learning conversations.",
    tags: ["Python", "LangChain", "FAISS", "Gradio", "RAG"],
    category: "ai",
    liveUrl: "https://huggingface.co/spaces/Johnny2005/Final_Project",
    githubUrl: "https://github.com/KarreJohnHyde/STUDY2AI",
    status: "Hugging Face Live",
    icon: "brain",
    tone: "violet",
    label: "RAG · EDUCATION",
  },
  {
    number: "02",
    title: "Expense AI",
    description:
      "Serverless financial intelligence application featuring automated receipt OCR, QR payments, DynamoDB ledgering, and interactive spending analytics.",
    tags: ["AWS", "Next.js", "DynamoDB", "OCR", "FinTech"],
    category: "cloud",
    liveUrl: "https://expense-tracker-rho-olive-10.vercel.app",
    githubUrl: "https://github.com/KarreJohnHyde/Expense_Tracker",
    status: "Vercel Live",
    icon: "cloud",
    tone: "cyan",
    label: "FINTECH · CLOUD",
  },
  {
    number: "03",
    title: "Cognitive Learning",
    description:
      "Adaptive ML dashboard that classifies learners into cognitive archetypes using K-Means clustering and PCA dimensionality reduction (Innoverse'26).",
    tags: ["Streamlit", "scikit-learn", "K-Means", "PCA", "Innoverse'26"],
    category: "ai",
    liveUrl: "https://cognitivelearning-5zqpetkfjexgbjx5kdappgk.streamlit.app/",
    githubUrl: "https://github.com/KarreJohnHyde/cognitive_learning",
    status: "Streamlit Live",
    icon: "spark",
    tone: "lime",
    label: "ML · HACKATHON",
  },
  {
    number: "04",
    title: "MedTwin",
    description:
      "Healthcare-focused AI digital twin exploration for clinical decision support, biomarker analysis, and patient disease simulation.",
    tags: ["AI", "Healthcare", "Jupyter", "Diagnostics"],
    category: "ai",
    liveUrl: "https://github.com/KarreJohnHyde/MedTwin",
    githubUrl: "https://github.com/KarreJohnHyde/MedTwin",
    status: "GitHub Active",
    icon: "brain",
    tone: "violet",
    label: "HEALTH · AI",
  },
  {
    number: "05",
    title: "Project Jarvis AI",
    description:
      "Voice-activated personal assistant with task automation, audio recognition, desktop controls, and real-time query execution.",
    tags: ["Python", "Voice AI", "Automation", "NLP"],
    category: "ai",
    liveUrl: "https://github.com/KarreJohnHyde/project-Jarvis-AI",
    githubUrl: "https://github.com/KarreJohnHyde/project-Jarvis-AI",
    status: "GitHub Active",
    icon: "terminal",
    tone: "cyan",
    label: "VOICE · AUTOMATION",
  },
  {
    number: "06",
    title: "Noel Foundation",
    description:
      "Purpose-led web platform engineered for a community welfare organization, featuring responsive presentation, event highlights, and outreach.",
    tags: ["React", "UI/UX", "Vercel", "Community"],
    category: "web",
    liveUrl: "https://noel-foundation.vercel.app",
    githubUrl: "https://github.com/KarreJohnHyde/Noel-Foundation",
    status: "Vercel Live",
    icon: "grid",
    tone: "cyan",
    label: "WEB · IMPACT",
  },
  {
    number: "07",
    title: "AgriMandi",
    description:
      "Digital agricultural marketplace connecting farmers with buyers, transparent crop valuation workflows, and direct supply connectivity.",
    tags: ["Agritech", "Next.js", "Supply Chain", "Product"],
    category: "cloud",
    liveUrl: "https://agrimandi.vercel.app",
    githubUrl: "https://github.com/KarreJohnHyde/agrimndi",
    status: "Vercel Preview",
    icon: "cloud",
    tone: "lime",
    label: "AGRITECH · MARKETPLACE",
  },
  {
    number: "08",
    title: "Xen-01",
    description:
      "Cyberpunk-inspired digital interface pushing modern CSS micro-animations, glassmorphic layout, fluid navigation, and responsive typography.",
    tags: ["Next.js", "TypeScript", "Vercel", "Creative"],
    category: "web",
    liveUrl: "https://xen-01.vercel.app",
    githubUrl: "https://github.com/KarreJohnHyde/Xen-01",
    status: "Vercel Live",
    icon: "spark",
    tone: "violet",
    label: "CREATIVE · WEB",
  },
  {
    number: "09",
    title: "Brite Systems",
    description:
      "Enterprise software architecture and web application suite structured for business process operations, modular data handling, and administrative control.",
    tags: ["React", "TypeScript", "Enterprise", "Cloud"],
    category: "cloud",
    liveUrl: "https://github.com/KarreJohnHyde/Brite-Systems",
    githubUrl: "https://github.com/KarreJohnHyde/Brite-Systems",
    status: "GitHub Active",
    icon: "terminal",
    tone: "cyan",
    label: "ENTERPRISE · SUITE",
  },
  {
    number: "10",
    title: "Gravity Glow",
    description:
      "Experimental interactive physics canvas featuring gravity simulation, particle trajectories, and dynamic glowing shader effects.",
    tags: ["HTML5 Canvas", "Physics", "Interactive", "Vite"],
    category: "web",
    liveUrl: "https://github.com/KarreJohnHyde/gravity-glow-portfolio",
    githubUrl: "https://github.com/KarreJohnHyde/gravity-glow-portfolio",
    status: "GitHub Active",
    icon: "spark",
    tone: "lime",
    label: "PHYSICS · EXPERIMENTAL",
  },
]

type CertificationItem = {
  label: string
  name: string
  issuer: string
  year: string
  credentialUrl: string
}

const certifications: CertificationItem[] = [
  {
    label: "AI / ML",
    name: "Introduction to Machine Learning",
    issuer: "NPTEL · IIT Kharagpur",
    year: "2025",
    credentialUrl: "https://civil-orange-hyw3u80v.edgeone.dev/",
  },
  {
    label: "AI / ML",
    name: "Generative AI & Agentic Architectures",
    issuer: "HERE AND NOW AI · with Sathyabama IST",
    year: "2025",
    credentialUrl: "https://eventual-chocolate-6jxt4lqw.edgeone.dev/",
  },
  {
    label: "Cloud & Systems",
    name: "Cloud Computing and Distributed Systems (Elite)",
    issuer: "NPTEL · IIT Kanpur",
    year: "2026",
    credentialUrl: "https://thorough-harlequin-v56d50g3.edgeone.dev/",
  },
  {
    label: "DevOps",
    name: "DevOps Training",
    issuer: "Zero2Infynite Security & Research",
    year: "2026",
    credentialUrl: "https://compulsory-moccasin-tvscvhwn.edgeone.dev/",
  },
  {
    label: "Programming",
    name: "Programming in Java",
    issuer: "NPTEL · IIT Kharagpur",
    year: "2024",
    credentialUrl: "https://colonial-lavender-ryxeasj8.edgeone.dev/",
  },
  {
    label: "Data & Systems",
    name: "Database Management System",
    issuer: "NPTEL · IIT Kharagpur",
    year: "2025",
    credentialUrl: "https://professional-teal-fbj1bwy3.edgeone.dev/",
  },
  {
    label: "Data Science",
    name: "Python for Data Science",
    issuer: "IBM · CognitiveClass.ai",
    year: "2024",
    credentialUrl: "https://pregnant-indigo-9tamhpek.edgeone.dev/",
  },
  {
    label: "Programming",
    name: "Programming for Everybody",
    issuer: "University of Michigan · Coursera",
    year: "2026",
    credentialUrl: "https://frequent-amaranth-azxtib3b.edgeone.dev/",
  },
  {
    label: "Math & Computing",
    name: "Linear Algebra & Matrix Computations with MATLAB",
    issuer: "MathWorks (Certificate 1 & 2)",
    year: "2024",
    credentialUrl: "https://faithful-rose-vspdozlo.edgeone.dev/",
  },
]

const educationHistory = [
  {
    degree: "B.E., Computer Science and Engineering (AI & ML)",
    period: "2023 – 2027 (Present, Sem 6)",
    institution: "Sathyabama Institute of Science and Technology, Chennai, Tamil Nadu",
    score: "CGPA: 8.45",
    type: "Undergraduate Degree · Full-time",
  },
  {
    degree: "Intermediate (12th)",
    period: "2021 – 2023",
    institution: "Sri Vishwa Junior College, Visakhapatnam, AP (Board of Intermediate Education, AP)",
    score: "Score: 88%",
    type: "Higher Secondary · Full-time",
  },
  {
    degree: "10th Standard (Secondary)",
    period: "2020 – 2021",
    institution: "Dr. KKR's Gowtham Concept School, Gudivada, AP (Board of Secondary Education, AP)",
    score: "Score: 99.83%",
    type: "Secondary School · Full-time",
  },
]

const journey = [
  {
    year: "2026",
    title: "Elite Cloud & Distributed Systems (IIT Kanpur) & DevOps",
    detail:
      "Earned NPTEL Elite Certification in Cloud Computing and Distributed Systems from IIT Kanpur, DevOps Training with Zero2Infynite Security & Research, and Programming for Everybody from University of Michigan.",
  },
  {
    year: "2026",
    title: "Cognitive Learning · Innoverse'26 Hackathon",
    detail:
      "Built a 4-tier pipeline extracting 8+ behavioral metrics to classify students into 5 cognitive profiles using rule-based ML (K-Means, PCA) with adaptive recommendations on a live Streamlit dashboard.",
  },
  {
    year: "2025",
    title: "Generative AI, Agentic Architectures & Machine Learning",
    detail:
      "Certified in Introduction to Machine Learning (NPTEL, IIT Kharagpur), Generative AI & Agentic Architectures (HERE AND NOW AI / Sathyabama IST), and DBMS (NPTEL, IIT Kharagpur). Built Study2AI and Expense AI.",
  },
  {
    year: "2024",
    title: "Core Java, Python Data Science & Matrix Computations",
    detail:
      "Certified in Programming in Java (NPTEL, IIT Kharagpur), Python for Data Science (IBM / CognitiveClass.ai), and Linear Algebra & Matrix Computations with MATLAB (MathWorks).",
  },
  {
    year: "2023 — 2027",
    title: "B.E., Computer Science and Engineering (AI & ML Specialization)",
    detail:
      "Sathyabama Institute of Science and Technology, Chennai (Present, Sem 6). Maintaining 8.45 CGPA across algorithmic problem solving, machine learning systems, and software engineering.",
  },
  {
    year: "2020 — 2023",
    title: "Secondary & Higher Secondary Academic Excellence",
    detail:
      "Intermediate 12th: 88% from Sri Vishwa Junior College, Visakhapatnam. 10th Standard: 99.83% from Dr. KKR's Gowtham Concept School, Gudivada.",
  },
]

const skills = [
  {
    name: "AI / ML & LLMs",
    value: "LLMs · RAG · NLP · Deep Learning · LangChain · FAISS · scikit-learn",
    icon: "brain" as IconName,
  },
  {
    name: "Frameworks & Web",
    value: "Streamlit · Gradio · Next.js · React 19 · HTML & CSS · TypeScript",
    icon: "grid" as IconName,
  },
  {
    name: "Tools & Cloud Platforms",
    value: "Git/GitHub · Jupyter · MATLAB · Vercel · Hugging Face · AWS",
    icon: "cloud" as IconName,
  },
  {
    name: "Core Subjects & Languages",
    value: "Python · Java · SQL · DSA · OOP · DBMS · Machine Learning",
    icon: "terminal" as IconName,
  },
]

/* ═══════════════════════════════════════════════════════
   SLACK-STYLE CARDS DATA
   ═══════════════════════════════════════════════════════ */
const slackCards = [
  {
    channel: "#ai-engineering",
    user: "John Hyde",
    avatar: "JH",
    time: "today at 2:14 PM",
    message: "Just shipped a new RAG pipeline with 94% retrieval accuracy using LangChain + FAISS. The vector embeddings are giving us incredible context-aware responses 🧠",
    reactions: [
      { emoji: "🔥", count: 12 },
      { emoji: "🧠", count: 8 },
      { emoji: "🚀", count: 5 },
    ],
    thread: 4,
  },
  {
    channel: "#deployments",
    user: "John Hyde",
    avatar: "JH",
    time: "yesterday at 11:30 AM",
    message: "Pushed Expense AI to production on Vercel. DynamoDB integration is clean, OCR pipeline handles receipts in < 200ms. Zero downtime deployment ✅",
    reactions: [
      { emoji: "✅", count: 9 },
      { emoji: "⚡", count: 6 },
    ],
    thread: 7,
  },
  {
    channel: "#hackathons",
    user: "John Hyde",
    avatar: "JH",
    time: "2 days ago",
    message: "Won the Cognitive Learning track at Innoverse'26! Built an adaptive ML dashboard with K-Means clustering in 24 hours. The PCA visualization really sealed the demo 🏆",
    reactions: [
      { emoji: "🏆", count: 24 },
      { emoji: "🎉", count: 18 },
      { emoji: "💪", count: 11 },
    ],
    thread: 15,
  },
]

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    brain: (
      <>
        <path d="M9.5 4.5A3 3 0 0 0 4.7 7a3.1 3.1 0 0 0-1.2 5.8 3 3 0 0 0 3.4 4.7 3 3 0 0 0 5.1 2.1V5.5a3 3 0 0 0-2.5-1Z" />
        <path d="M14.5 4.5A3 3 0 0 1 19.3 7a3.1 3.1 0 0 1 1.2 5.8 3 3 0 0 1-3.4 4.7 3 3 0 0 1-5.1 2.1" />
        <path d="M8 9.5c1.6 0 2.7-1 2.7-2.4M16 9.5c-1.6 0-2.7-1-2.7-2.4M8 14.5c1.6 0 2.7 1 2.7 2.4M16 14.5c-1.6 0-2.7 1-2.7 2.4" />
      </>
    ),
    check: <polyline points="20 6 9 17 4 12" />,
    cloud: (
      <>
        <path d="M6.5 18.5h11a4 4 0 0 0 .7-7.9A6.4 6.4 0 0 0 6 8.5a5 5 0 0 0 .5 10Z" />
        <path d="m9 14 3-3 3 3M12 11v6" />
      </>
    ),
    code: <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />,
    copy: (
      <>
        <rect height="13" rx="2" ry="2" width="13" x="9" y="9" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </>
    ),
    cpu: (
      <>
        <rect height="16" rx="2" width="16" x="4" y="4" />
        <rect height="6" width="6" x="9" y="9" />
        <line x1="9" x2="9" y1="1" y2="4" />
        <line x1="15" x2="15" y1="1" y2="4" />
        <line x1="9" x2="9" y1="20" y2="23" />
        <line x1="15" x2="15" y1="20" y2="23" />
        <line x1="20" x2="23" y1="9" y2="9" />
        <line x1="20" x2="23" y1="14" y2="14" />
        <line x1="1" x2="4" y1="9" y2="9" />
        <line x1="1" x2="4" y1="14" y2="14" />
      </>
    ),
    download: <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 20h14" />,
    external: (
      <>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" x2="21" y1="14" y2="3" />
      </>
    ),
    github: (
      <path d="M12 2.7a9.5 9.5 0 0 0-3 18.5c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1 1.6 1 .9 1.6 2.4 1.1 2.9.9.1-.7.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-4.7 0-1 .4-1.9 1-2.6-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.6 0 3.6-2.4 4.4-4.6 4.7.4.3.7.9.7 1.7v2.6c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.7Z" />
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" x2="22" y1="12" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </>
    ),
    grid: (
      <>
        <rect height="7" rx="1" width="7" x="3.5" y="3.5" />
        <rect height="7" rx="1" width="7" x="13.5" y="3.5" />
        <rect height="7" rx="1" width="7" x="3.5" y="13.5" />
        <path d="M17 14v7M13.5 17.5h7" />
      </>
    ),
    linkedin: (
      <>
        <rect height="18" rx="3" width="18" x="3" y="3" />
        <path d="M8 10v7M8 7v.1M12 17v-4a3 3 0 0 1 6 0v4M12 10v7" />
      </>
    ),
    mail: (
      <>
        <rect height="14" rx="2" width="18" x="3" y="5" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    mapPin: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
    server: (
      <>
        <rect height="8" rx="2" ry="2" width="20" x="2" y="2" />
        <rect height="8" rx="2" ry="2" width="20" x="2" y="14" />
        <line x1="6" x2="6.01" y1="6" y2="6" />
        <line x1="6" x2="6.01" y1="18" y2="18" />
      </>
    ),
    spark: (
      <>
        <path d="m12 2 1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2Z" />
        <path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />
      </>
    ),
    terminal: (
      <>
        <rect height="16" rx="2" width="18" x="3" y="4" />
        <path d="m7 9 3 3-3 3M13 16h4" />
      </>
    ),
    whatsapp: (
      <>
        <path d="M3 21l1.65-3.8A9 9 0 1 1 21 12a9 9 0 0 1-9 9c-1.6 0-3.1-.4-4.5-1.1L3 21" />
        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        {paths[name]}
      </g>
    </svg>
  )
}

function Link({
  children,
  className,
  href,
  download,
  label,
}: {
  children: ReactNode
  className?: string
  href: string
  download?: boolean | string
  label?: string
}) {
  return (
    <a
      aria-label={label}
      className={className}
      download={download}
      href={href}
      {...(href.startsWith("http")
        ? { target: "_blank", rel: "noreferrer" }
        : {})}
    >
      {children}
    </a>
  )
}

function Action({
  children,
  className,
  onClick,
  label,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
  label?: string
}) {
  return (
    <button
      aria-label={label}
      className={className}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}

/* ═══════════════════════════════════════════════════════
   MULTILINGUAL CODING CURSOR TRAIL
   Coding icons + alphabets from 12+ world languages
   ═══════════════════════════════════════════════════════ */

// Coding symbols and operators
const codeSymbols = [
  "</>", "{ }", "=>", "&&", "||", "!=", "==", "++", "--",
  "/**", "*/", "//", "[]", "()", "::", "->", "<<", ">>",
  "fn", "λ", "∑", "∫", "π", "Δ",
  "#!", "#!/", "@", "$", "%", "^",
]

// Alphabets from multiple languages
const multilingualChars = [
  // Hindi / Devanagari
  "अ", "आ", "इ", "क", "ख", "ग", "म", "न", "प", "र",
  // Tamil
  "அ", "ஆ", "இ", "உ", "எ", "ஒ", "க", "ச", "ட", "ப",
  // Telugu
  "అ", "ఆ", "ఇ", "ఈ", "క", "గ", "చ", "జ", "ట", "డ",
  // Japanese (Katakana + Hiragana)
  "ア", "カ", "サ", "タ", "ナ", "ハ", "マ", "ヤ", "ラ", "ワ",
  "あ", "い", "う", "え", "お",
  // Korean (Hangul)
  "가", "나", "다", "라", "마", "바", "사", "아", "자", "하",
  // Chinese (Mandarin)
  "人", "大", "中", "天", "地", "水", "火", "木", "金", "土",
  // Arabic
  "ا", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر",
  // Russian (Cyrillic)
  "А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "К", "Л",
  // Greek
  "α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "κ", "μ",
  // Thai
  "ก", "ข", "ค", "ง", "จ", "ฉ", "ช", "ซ", "ด", "ต",
  // Hebrew
  "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י",
  // Georgian
  "ა", "ბ", "გ", "დ", "ე", "ვ", "ზ", "თ", "ი", "კ",
]

// Combined pool: ~40% code symbols, ~60% multilingual characters
const allTrailSymbols = [...codeSymbols, ...multilingualChars]
const particleColors = ["#cbff47", "#5ee7f0", "#a98cff", "#ff8fb3", "#ffcf70", "#7dd3fc", "#fbbf24"]

type TrailParticle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  rotation: number
  spin: number
  life: number
  maxLife: number
  color: string
  symbol: string
  isCode: boolean
}

function ParticleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    const particles: TrailParticle[] = []
    const pointer = { x: 0, y: 0, lastX: 0, lastY: 0 }
    let animationFrame = 0
    let lastTime = performance.now()
    let width = 0
    let height = 0
    let pixelRatio = 1

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const canAnimate = !reducedMotion.matches

    const resize = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * pixelRatio
      canvas.height = height * pixelRatio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

    const spawn = (x: number, y: number, intensity = 1) => {
      if (!canAnimate) return
      const distance = Math.hypot(x - pointer.lastX, y - pointer.lastY)
      if (distance < 7 && intensity < 2) return

      const amount = Math.min(5, Math.max(1, Math.ceil(distance / 16)))
      for (let index = 0; index < amount; index += 1) {
        const isCode = Math.random() < 0.4
        const symbolPool = isCode ? codeSymbols : multilingualChars
        const symbol = symbolPool[Math.floor(Math.random() * symbolPool.length)]
        const size = isCode ? 11 + Math.random() * 10 : 14 + Math.random() * 16
        const maxLife = 800 + Math.random() * 600

        particles.push({
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 2.0 + (x - pointer.lastX) * 0.018,
          vy: -1.0 - Math.random() * 2.2,
          size,
          rotation: (Math.random() - 0.5) * 0.9,
          spin: (Math.random() - 0.5) * 0.007,
          life: maxLife,
          maxLife,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          symbol,
          isCode,
        })
      }
      pointer.lastX = x
      pointer.lastY = y
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      spawn(event.clientX, event.clientY)
    }

    const handlePointerDown = (event: PointerEvent) => {
      pointer.lastX = event.clientX - 20
      pointer.lastY = event.clientY - 20
      // Burst on click: spawn many particles
      for (let i = 0; i < 8; i++) {
        spawn(
          event.clientX + (Math.random() - 0.5) * 40,
          event.clientY + (Math.random() - 0.5) * 40,
          3,
        )
      }
    }

    const draw = (time: number) => {
      const delta = Math.min(time - lastTime, 34)
      lastTime = time
      context.clearRect(0, 0, width, height)

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index]
        particle.life -= delta
        if (particle.life <= 0) {
          particles.splice(index, 1)
          continue
        }

        const step = delta / 16.67
        particle.vy += 0.09 * step
        particle.x += particle.vx * step
        particle.y += particle.vy * step
        particle.rotation += particle.spin * delta

        const progress = 1 - particle.life / particle.maxLife
        const opacity = Math.sin(Math.min(progress, 1) * Math.PI) * 0.88

        context.save()
        context.translate(particle.x, particle.y)
        context.rotate(particle.rotation)
        context.globalAlpha = opacity

        if (particle.isCode) {
          // Code symbols: glowing square background
          const half = particle.size / 2
          context.shadowColor = particle.color
          context.shadowBlur = 16
          context.fillStyle = particle.color
          context.fillRect(-half, -half, particle.size, particle.size)
          context.shadowBlur = 0
          context.globalAlpha = opacity * 0.85
          context.fillStyle = "#090a0a"
          context.font = `700 ${Math.max(8, particle.size * 0.55)}px 'DM Mono', monospace`
          context.textAlign = "center"
          context.textBaseline = "middle"
          context.fillText(particle.symbol, 0, 1)
        } else {
          // Multilingual chars: floating text with glow
          context.shadowColor = particle.color
          context.shadowBlur = 20
          context.fillStyle = particle.color
          context.font = `600 ${particle.size}px 'Noto Sans', 'Manrope', sans-serif`
          context.textAlign = "center"
          context.textBaseline = "middle"
          context.fillText(particle.symbol, 0, 0)
        }

        context.restore()
      }

      animationFrame = window.requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerdown", handlePointerDown, { passive: true })
    if (canAnimate) animationFrame = window.requestAnimationFrame(draw)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerdown", handlePointerDown)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="particle-trail" aria-hidden="true" />
  )
}

/* ═══════════════════════════════════════════════════════
   SECTION REVEAL ON SCROLL (IntersectionObserver)
   ═══════════════════════════════════════════════════════ */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { rootMargin: "-60px 0px", threshold: 0.08 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

function SectionLabel({
  index,
  children,
}: {
  index: string
  children: ReactNode
}) {
  return (
    <div className="section-label">
      <span>{index}</span>
      <span className="section-rule" />
      <span>{children}</span>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   SLACK-STYLE MESSAGE CARD
   ═══════════════════════════════════════════════════════ */
function SlackCard({ card, delay }: { card: typeof slackCards[0]; delay: number }) {
  const { ref, isVisible } = useScrollReveal()
  return (
    <div
      className={`slack-card ${isVisible ? "is-revealed" : ""}`}
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="slack-channel">
        <span className="slack-hash">#</span>
        {card.channel.slice(1)}
      </div>
      <div className="slack-body">
        <div className="slack-avatar">{card.avatar}</div>
        <div className="slack-content">
          <div className="slack-meta">
            <strong>{card.user}</strong>
            <time>{card.time}</time>
          </div>
          <p>{card.message}</p>
          <div className="slack-reactions">
            {card.reactions.map((r) => (
              <span className="slack-reaction" key={r.emoji}>
                <span>{r.emoji}</span>
                <span>{r.count}</span>
              </span>
            ))}
            {card.thread > 0 && (
              <span className="slack-thread">
                💬 {card.thread} replies
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   PROJECT CARD (with tilt parallax)
   ═══════════════════════════════════════════════════════ */
function ProjectCard({ project, delay }: { project: ProjectItem; delay: number }) {
  const [x, setX] = useState(50)
  const [y, setY] = useState(50)
  const { ref, isVisible } = useScrollReveal()
  const move = (event: ReactMouseEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect()
    setX(((event.clientX - box.left) / box.width) * 100)
    setY(((event.clientY - box.top) / box.height) * 100)
  }

  return (
    <div
      className={`project-card ${project.tone} ${isVisible ? "is-revealed" : ""}`}
      onMouseMove={move}
      ref={ref}
      style={
        {
          "--card-x": `${x}%`,
          "--card-y": `${y}%`,
          transitionDelay: `${delay}ms`,
        } as React.CSSProperties
      }
    >
      <div>
        <div className="project-top">
          <div className="project-top-meta">
            <span className="project-number">/{project.number}</span>
            <span className="status-badge">
              <span className="dot" />
              {project.status}
            </span>
          </div>
          <span className="project-icon">
            <Icon name={project.icon} size={22} />
          </span>
        </div>

        <div className="project-visual" aria-hidden="true">
          <div className="visual-grid" />
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="visual-core">
            <Icon name={project.icon} size={30} />
          </div>
          <span>{project.label}</span>
        </div>

        <div className="project-copy">
          <div className="project-title" role="heading" aria-level={3}>
            {project.title}
          </div>
          <div className="project-description">{project.description}</div>
          <div className="tag-row">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="project-actions">
        {project.liveUrl && project.liveUrl !== project.githubUrl ? (
          <Link
            className="project-btn-primary"
            href={project.liveUrl}
            label={`Live demo for ${project.title}`}
          >
            <span>Live Demo</span>
            <Icon name="external" size={14} />
          </Link>
        ) : (
          <Link
            className="project-btn-primary"
            href={project.githubUrl}
            label={`View source code for ${project.title}`}
          >
            <span>Source Code</span>
            <Icon name="github" size={14} />
          </Link>
        )}
        <Link
          className="project-btn-secondary"
          href={project.githubUrl}
          label={`GitHub repository for ${project.title}`}
        >
          <Icon name="github" size={14} />
          <span>Repository</span>
        </Link>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   RESUME VIEWER MODAL
   ═══════════════════════════════════════════════════════ */
function ResumeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [tab, setTab] = useState<"doc" | "pdf">("doc")

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      aria-labelledby="resume-modal-title"
      aria-modal="true"
      className="resume-modal-backdrop"
      onClick={onClose}
      role="dialog"
    >
      <div
        className="resume-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="resume-modal-header">
          <div>
            <span className="resume-modal-kicker">CURRICULUM VITAE</span>
            <h3 id="resume-modal-title">Karre John Hyde · Resume</h3>
          </div>

          <div className="resume-modal-controls">
            <div className="resume-tab-switch">
              <button
                className={`resume-tab-btn ${tab === "doc" ? "active" : ""}`}
                onClick={() => setTab("doc")}
                type="button"
              >
                Executive View
              </button>
              <button
                className={`resume-tab-btn ${tab === "pdf" ? "active" : ""}`}
                onClick={() => setTab("pdf")}
                type="button"
              >
                Original PDF
              </button>
            </div>

            <a
              className="resume-download-btn"
              download="Karre_John_Hyde_Resume.pdf"
              href={resume}
              title="Download official PDF resume"
            >
              <Icon name="download" size={15} />
              <span>Download PDF</span>
            </a>

            <button
              aria-label="Close resume preview"
              className="resume-close-btn"
              onClick={onClose}
              type="button"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="resume-modal-body">
          {tab === "pdf" ? (
            <div className="resume-pdf-frame">
              <iframe
                src={`${resume}#toolbar=0`}
                title="Karre John Hyde Resume PDF"
              />
            </div>
          ) : (
            <article className="resume-document">
              {/* Document Header */}
              <header className="resume-doc-header">
                <h1>KARRE JOHN HYDE</h1>
                <p className="resume-contact-line">
                  <span>Chennai, Tamil Nadu, India</span>
                  <span className="dot-sep">•</span>
                  <a href="tel:+919100243535">+91 9100243535</a>
                  <span className="dot-sep">•</span>
                  <a href="mailto:johnnykarre@gmail.com">johnnykarre@gmail.com</a>
                </p>
                <div className="resume-links-line">
                  <a href={links.linkedin} rel="noreferrer" target="_blank">
                    LinkedIn
                  </a>
                  <span className="dot-sep">•</span>
                  <a href={links.github} rel="noreferrer" target="_blank">
                    GitHub
                  </a>
                  <span className="dot-sep">•</span>
                  <a href={links.whatsapp} rel="noreferrer" target="_blank">
                    WhatsApp (+91 9100243535)
                  </a>
                </div>
              </header>

              {/* Summary */}
              <section className="resume-doc-section">
                <h2>SUMMARY</h2>
                <p>
                  Final-year CSE student specializing in AI &amp; ML, with hands-on experience building and deploying full-stack AI projects in Python. Comfortable across the stack, from OOP and databases to RAG systems and cloud deployment. Adaptable and eager to bring strong problem-solving skills to a team.
                </p>
              </section>

              {/* Education */}
              <section className="resume-doc-section">
                <h2>EDUCATION</h2>
                <div className="resume-entry">
                  <div className="entry-header">
                    <strong>B.E., Computer Science and Engineering (AI &amp; ML) — Full-time</strong>
                    <span>2023 – 2027 (Present, Sem 6)</span>
                  </div>
                  <div className="entry-sub">
                    <span>Sathyabama Institute of Science and Technology, Chennai, Tamil Nadu</span>
                    <strong>CGPA: 8.45</strong>
                  </div>
                </div>

                <div className="resume-entry">
                  <div className="entry-header">
                    <strong>Intermediate (12th) — Full-time</strong>
                    <span>2021 – 2023</span>
                  </div>
                  <div className="entry-sub">
                    <span>Sri Vishwa Junior College, Visakhapatnam, AP (Board of Intermediate Education, AP)</span>
                    <strong>Score: 88%</strong>
                  </div>
                </div>

                <div className="resume-entry">
                  <div className="entry-header">
                    <strong>10th Standard — Full-time</strong>
                    <span>2020 – 2021</span>
                  </div>
                  <div className="entry-sub">
                    <span>Dr. KKR&apos;s Gowtham Concept School, Gudivada, AP (Board of Secondary Education, AP)</span>
                    <strong>Score: 99.83%</strong>
                  </div>
                </div>
              </section>

              {/* Technical Skills */}
              <section className="resume-doc-section">
                <h2>TECHNICAL SKILLS</h2>
                <ul className="resume-skills-list">
                  <li><strong>Languages:</strong> Python, Java, SQL, HTML &amp; CSS</li>
                  <li><strong>Frameworks:</strong> Streamlit, Gradio, Next.js, React</li>
                  <li><strong>AI / ML:</strong> LLMs, RAG, NLP, Deep Learning</li>
                  <li><strong>Tools &amp; Platforms:</strong> Git/GitHub, Jupyter, MATLAB, Vercel, Hugging Face, AWS</li>
                  <li><strong>Strong Subjects:</strong> DSA, OOP, DBMS, Machine Learning</li>
                </ul>
              </section>

              {/* Projects */}
              <section className="resume-doc-section">
                <h2>PROJECTS</h2>
                <div className="resume-project-item">
                  <div className="entry-header">
                    <strong>Study2AI — RAG Chatbot for Education</strong>
                    <span>Python, LangChain, FAISS, Gradio</span>
                  </div>
                  <ul className="resume-bullet-list">
                    <li>Built a full-stack RAG system with a FAISS vector database to answer complex educational queries with grounded, context-aware responses.</li>
                    <li>Used asynchronous Python pipelines to keep document retrieval and answer generation fast.</li>
                  </ul>
                  <div className="resume-entry-links">
                    <a href="https://github.com/KarreJohnHyde/STUDY2AI" rel="noreferrer" target="_blank">Code: GitHub</a>
                    <span>|</span>
                    <a href="https://huggingface.co/spaces/Johnny2005/Final_Project" rel="noreferrer" target="_blank">Live Demo: Hugging Face Space</a>
                  </div>
                </div>

                <div className="resume-project-item">
                  <div className="entry-header">
                    <strong>Expense AI — Smart Expense Tracker</strong>
                    <span>Full-Stack, AWS, Vercel</span>
                  </div>
                  <ul className="resume-bullet-list">
                    <li>Built a serverless expense platform on AWS (API Gateway, Lambda, DynamoDB) with full CRUD, OCR receipt scanning, and QR-based payments.</li>
                    <li>Added interactive spending visualizations with Chart.js/Recharts.</li>
                  </ul>
                  <div className="resume-entry-links">
                    <a href="https://github.com/KarreJohnHyde/Expense_Tracker" rel="noreferrer" target="_blank">Code: GitHub</a>
                    <span>|</span>
                    <a href="https://expense-tracker-rho-olive-10.vercel.app" rel="noreferrer" target="_blank">Live: Vercel</a>
                  </div>
                </div>

                <div className="resume-project-item">
                  <div className="entry-header">
                    <strong>Cognitive Learning</strong>
                    <span>Streamlit, scikit-learn, Hackathon Project</span>
                  </div>
                  <ul className="resume-bullet-list">
                    <li>Built a 4-tier pipeline that extracts 8+ behavioral metrics and classifies students into 5 cognitive profiles using rule-based ML (K-Means, PCA).</li>
                    <li>Generated adaptive recommendations and score predictions on a live dashboard during a 24-hour hackathon (Innoverse&apos;26).</li>
                  </ul>
                  <div className="resume-entry-links">
                    <a href="https://github.com/KarreJohnHyde/cognitive_learning" rel="noreferrer" target="_blank">Code: GitHub</a>
                    <span>|</span>
                    <a href="https://cognitivelearning-5zqpetkfjexgbjx5kdappgk.streamlit.app/" rel="noreferrer" target="_blank">Live Demo: Streamlit App</a>
                  </div>
                </div>
              </section>

              {/* Certifications & Training */}
              <section className="resume-doc-section">
                <h2>CERTIFICATIONS &amp; TRAINING</h2>
                <div className="resume-cert-category">
                  <p><strong>AI/ML:</strong> Introduction to Machine Learning – NPTEL, IIT Kharagpur (2025); Generative AI &amp; Agentic Architectures – HERE AND NOW AI, with Sathyabama IST (2025)</p>
                  <p><strong>Cloud &amp; DevOps:</strong> Cloud Computing and Distributed Systems (Elite) – NPTEL, IIT Kanpur (2026); DevOps Training – Zero2Infynite Security &amp; Research (2026)</p>
                  <p><strong>Programming &amp; Data Science:</strong> Programming in Java – NPTEL, IIT Kharagpur (2024); Database Management System – NPTEL, IIT Kharagpur (2025); Python for Data Science – IBM/CognitiveClass.ai (2024); Programming for Everybody – University of Michigan, Coursera (2026); Linear Algebra &amp; Matrix Computations with MATLAB – MathWorks (2024, Certificate 1 &amp; 2)</p>
                </div>
              </section>

              {/* Additional Information */}
              <section className="resume-doc-section">
                <h2>ADDITIONAL INFORMATION</h2>
                <ul className="resume-skills-list">
                  <li><strong>Languages:</strong> English, Telugu, Hindi</li>
                  <li><strong>Soft Skills:</strong> Problem-Solving, Team Collaboration, Communication, Time Management</li>
                  <li><strong>Internship:</strong> None yet — actively seeking AI/ML or full-stack internship opportunities.</li>
                </ul>
              </section>
            </article>
          )}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════ */
export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [active, setActive] = useState("home")
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all")
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [resumeModalOpen, setResumeModalOpen] = useState(false)
  const [contactStatus, setContactStatus] = useState<
    "idle" | "sending" | "sent"
  >("idle")
  const [statusMessage, setStatusMessage] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  // Typing effect for hero subtitle
  const [typedText, setTypedText] = useState("")
  const fullText = "Building intelligence into useful things."

  const appRef = useRef<HTMLDivElement>(null)

  // Scroll reveal hooks for each major section
  const heroReveal = useScrollReveal()
  const workReveal = useScrollReveal()
  const aboutReveal = useScrollReveal()
  const journeyReveal = useScrollReveal()
  const credsReveal = useScrollReveal()
  const contactReveal = useScrollReveal()

  const [scrollVelocity, setScrollVelocity] = useState(0)

  // Initialize Lenis Smooth Scrolling hooked to GSAP ScrollTrigger
  useEffect(() => {
    const lenis = initSmoothScroll()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleScroll = (e: any) => {
      if (e && typeof e.velocity === "number") {
        setScrollVelocity(Math.round(e.velocity))
      }
    }
    lenis.on("scroll", handleScroll)
    return () => {
      lenis.off("scroll", handleScroll)
      destroySmoothScroll()
    }
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 250)
    const updatePointer = (event: MouseEvent) => {
      appRef.current?.style.setProperty("--mouse-x", `${event.clientX}px`)
      appRef.current?.style.setProperty("--mouse-y", `${event.clientY}px`)
    }
    window.addEventListener("pointermove", updatePointer)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener("pointermove", updatePointer)
    }
  }, [])

  // Typing effect
  useEffect(() => {
    if (!loaded) return
    let i = 0
    const interval = window.setInterval(() => {
      i += 1
      setTypedText(fullText.slice(0, i))
      if (i >= fullText.length) window.clearInterval(interval)
    }, 45)
    return () => window.clearInterval(interval)
  }, [loaded])

  useEffect(() => {
    const sections = [
      "home",
      "scrollytelling",
      "work",
      "about",
      "journey",
      "credentials",
      "contact",
    ]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: "-25% 0px -55%", threshold: [0.1, 0.3, 0.6] },
    )
    sections.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  const navigate = useCallback((id: string) => {
    setTransitioning(true)
    window.setTimeout(() => {
      scrollToTarget(`#${id}`)
      setActive(id)
      window.setTimeout(() => setTransitioning(false), 480)
    }, 260)
  }, [])

  const handleCopyEmail = (e?: ReactMouseEvent) => {
    if (e) e.stopPropagation()
    const emailToCopy = "johnnykarre@gmail.com"
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(emailToCopy)
        .then(() => {
          setCopiedEmail(true)
          window.setTimeout(() => setCopiedEmail(false), 2600)
        })
        .catch(() => fallbackCopy(emailToCopy))
    } else {
      fallbackCopy(emailToCopy)
    }

    function fallbackCopy(text: string) {
      const textArea = document.createElement("textarea")
      textArea.value = text
      textArea.style.position = "fixed"
      textArea.style.opacity = "0"
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand("copy")
        setCopiedEmail(true)
        window.setTimeout(() => setCopiedEmail(false), 2600)
      } catch (err) {
        console.error("Clipboard copy failed", err)
      }
      document.body.removeChild(textArea)
    }
  }

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setContactStatus("sending")
    setStatusMessage("")

    const mailtoUrl = `mailto:johnnykarre@gmail.com?subject=${encodeURIComponent(
      formData.subject || "Portfolio Contact Inquiry",
    )}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`,
    )}`

    try {
      const res = await fetch("https://formsubmit.co/ajax/johnnykarre@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _replyto: formData.email,
          _subject: `[Portfolio Message] ${formData.subject || "New Inquiry"} - from ${formData.name}`,
          _template: "table",
          _captcha: "false",
          message: formData.message,
        }),
      })

      const data = await res.json().catch(() => null)

      if (
        res.ok ||
        (data &&
          (data.success === "true" ||
            data.success === true ||
            data.message?.includes("Activation") ||
            data.message?.includes("actived")))
      ) {
        setContactStatus("sent")
        setStatusMessage(
          data?.message?.includes("Activation")
            ? "Message submitted! Please check your email inbox to click 'Activate Form' once."
            : "Message delivered directly to johnnykarre@gmail.com! I'll get back to you soon."
        )
        setFormData({ name: "", email: "", subject: "", message: "" })
        window.setTimeout(() => setContactStatus("idle"), 8000)
      } else {
        window.open(mailtoUrl, "_blank")
        setContactStatus("sent")
        setStatusMessage("Direct email draft opened with your message ready to send!")
        window.setTimeout(() => setContactStatus("idle"), 8000)
      }
    } catch {
      window.open(mailtoUrl, "_blank")
      setContactStatus("sent")
      setStatusMessage("Direct email draft opened with your message ready to send!")
      window.setTimeout(() => setContactStatus("idle"), 8000)
    }
  }

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <div className={`app-shell ${loaded ? "is-loaded" : ""}`} ref={appRef}>
      {/* GLOBAL NATIVE CSS SCROLL-DRIVEN PROGRESS BAR */}
      <div className="global-scroll-progress" aria-hidden="true" />
      {/* REAL-TIME LENIS SCROLL VELOCITY TELEMETRY */}
      <div className="lenis-hud-pill" aria-hidden="true">
        <span className="lenis-dot" />
        <span>LENIS NORMALIZED INERTIA</span>
        <span className="lenis-vel">{Math.abs(scrollVelocity)} PX/S</span>
      </div>
      <ParticleTrail />
      <div className={`page-transition ${transitioning ? "is-active" : ""}`}>
        <span>KJH</span>
      </div>
      <div className="pointer-light" aria-hidden="true" />

      <header className="site-header">
        <Action
          className="brand"
          onClick={() => navigate("home")}
          label="Go to home"
        >
          <span className="brand-mark">KJ</span>
          <span className="brand-copy">
            <strong>Karre John Hyde</strong>
            <small>AI / ML Engineer</small>
          </span>
        </Action>
        <nav className="main-nav" aria-label="Primary navigation">
          {[
            { id: "home", label: "home", index: "01" },
            { id: "scrollytelling", label: "3d story", index: "02" },
            { id: "work", label: "work", index: "03" },
            { id: "about", label: "about", index: "04" },
            { id: "journey", label: "path", index: "05" },
            { id: "credentials", label: "creds", index: "06" },
          ].map((item) => (
            <Action
              className={active === item.id ? "active" : ""}
              key={item.id}
              onClick={() => navigate(item.id)}
            >
              <span>{item.index}</span>
              {item.label}
            </Action>
          ))}
        </nav>
        <Action className="contact-pill" onClick={() => navigate("contact")}>
          Let&apos;s talk
          <span className="live-dot" />
        </Action>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="hero section-frame" id="home" ref={heroReveal.ref}>
          <div className="hero-copy">
            <div className="eyebrow reveal-item">
              <span className="signal">
                <i />
              </span>
              Available for AI / ML &amp; Full-Stack Internships · 2026
            </div>
            <div
              className="hero-title reveal-item"
              role="heading"
              aria-level={1}
            >
              <span className="typing-line">
                {typedText}
                <span className="cursor-blink">|</span>
              </span>
            </div>
            <div className="hero-intro reveal-item">
              <span className="intro-index">[ ABOUT ]</span>
              <div>
                I&apos;m John — an AI and machine learning engineer bridging
                deep learning models, scalable full-stack web applications, and
                human-centered digital products.
              </div>
            </div>
            <div className="hero-actions reveal-item">
              <Action
                className="primary-action"
                onClick={() => navigate("work")}
              >
                Explore my work
                <span>
                  <Icon name="arrow" />
                </span>
              </Action>
              <button
                aria-label="View and download Karre John Hyde's official resume"
                className="text-action resume-trigger-btn"
                onClick={() => setResumeModalOpen(true)}
                type="button"
              >
                <Icon name="download" size={18} />
                View &amp; download résumé
              </button>
            </div>
          </div>

          <div className="portrait-stage reveal-item">
            <div className="portrait-halo" />
            <div className="portrait-grid" />
            <div className="portrait-frame">
              <img alt="Karre John Hyde portrait" src={portrait} />
              <div className="portrait-scan" />
            </div>
            <div className="orbit-label orbit-label-one">
              <span>01</span>
              AI SYSTEMS
            </div>
            <div className="orbit-label orbit-label-two">
              <span>02</span>
              FULL STACK
            </div>
            <div className="floating-code">
              <Icon name="code" />
              <span>BUILD / DEPLOY / LEARN</span>
            </div>
          </div>

          <div className="hero-side-note">
            <span>SCROLL TO DISCOVER</span>
            <i />
          </div>
        </section>

        {/* TICKER */}
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[0, 1].map((group) => (
              <div className="ticker-group" key={group}>
                <span>PYTHON</span>
                <i>✦</i>
                <span>ARTIFICIAL INTELLIGENCE</span>
                <i>✦</i>
                <span>RAG SYSTEMS</span>
                <i>✦</i>
                <span>NEXT.JS &amp; REACT 19</span>
                <i>✦</i>
                <span>AWS &amp; VERCEL</span>
                <i>✦</i>
                <span>LANGCHAIN &amp; FAISS</span>
                <i>✦</i>
                <span>MACHINE LEARNING</span>
                <i>✦</i>
              </div>
            ))}
          </div>
        </div>

        {/* 3D SCROLLYTELLING SECTION (CANVAS PINNING, THREE.JS, GLSL SHADERS, GSAP SCRUB) */}
        <ScrollytellingSection />

        {/* WORK SECTION */}
        <section className={`work section-frame ${workReveal.isVisible ? "section-revealed" : ""}`} id="work" ref={workReveal.ref}>
          <SectionLabel index="03">SELECTED WORK</SectionLabel>
          <div className="section-heading">
            <div role="heading" aria-level={2}>
              Ideas, engineered
              <br />
              into <em className="wave-word">impact.</em>
            </div>
            <div className="section-aside">
              <span>10 / PROJECTS</span>
              Selected experiments across artificial intelligence, full stack,
              and cloud deployment.
            </div>
          </div>

          {/* PROJECT CATEGORY FILTERS */}
          <div className="project-filter-bar">
            {[
              { id: "all", label: "All Projects", count: projects.length },
              {
                id: "ai",
                label: "AI & Machine Learning",
                count: projects.filter((p) => p.category === "ai").length,
              },
              {
                id: "cloud",
                label: "Full Stack & Cloud",
                count: projects.filter((p) => p.category === "cloud").length,
              },
              {
                id: "web",
                label: "Web & Creative",
                count: projects.filter((p) => p.category === "web").length,
              },
            ].map((cat) => (
              <button
                className={`filter-btn ${activeCategory === cat.id ? "active" : ""}`}
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as ProjectCategory)}
                type="button"
              >
                <span>{cat.label}</span>
                <span className="filter-count">{cat.count}</span>
              </button>
            ))}
          </div>

          {/* PROJECT GRID */}
          <div className="project-grid">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} delay={i * 80} />
            ))}
          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section className={`about section-frame ${aboutReveal.isVisible ? "section-revealed" : ""}`} id="about" ref={aboutReveal.ref}>
          <SectionLabel index="03">MY OPERATING SYSTEM</SectionLabel>
          <div className="about-grid">
            <div className="about-statement">
              <div role="heading" aria-level={2}>
                Curious by default.
                <br />
                <em className="wave-word">Precise</em> by design.
              </div>
              <p>
                Final-year Computer Science Engineering student specializing in
                Artificial Intelligence &amp; Machine Learning at Sathyabama
                Institute of Science and Technology, Chennai.
              </p>
              <p>
                My passion lies at the intersection of applied machine learning
                and real-world software engineering: moving seamlessly from RAG
                pipelines and predictive modeling to serverless databases,
                reactive frontend design, and production deployment.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "18px",
                  flexWrap: "wrap",
                  marginTop: "20px",
                }}
              >
                <Link className="inline-link" href={links.linkedin}>
                  LinkedIn Profile <Icon name="arrow" size={16} />
                </Link>
                <Link className="inline-link" href={links.github}>
                  GitHub Repositories <Icon name="arrow" size={16} />
                </Link>
                <Link className="inline-link" href={links.vercel}>
                  Vercel Deployments <Icon name="arrow" size={16} />
                </Link>
              </div>
            </div>

            <div className="skill-grid">
              {skills.map((skill, index) => (
                <div className="skill-card" key={skill.name}>
                  <span className="skill-index">0{index + 1}</span>
                  <Icon name={skill.icon} size={28} />
                  <div role="heading" aria-level={3}>
                    {skill.name}
                  </div>
                  <p>{skill.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="education-strip">
            <div>
              <span>EDUCATION · 2023 — 2027 (SEM 6)</span>
              <strong>B.E. Computer Science &amp; Engineering (AI &amp; ML)</strong>
              <small>Sathyabama Institute of Science and Technology, Chennai</small>
            </div>
            <div className="metric">
              <strong>8.45</strong>
              <span>CURRENT CGPA</span>
            </div>
            <div className="metric">
              <strong>88%</strong>
              <span>12TH INTERMEDIATE</span>
            </div>
            <div className="metric">
              <strong>99.83%</strong>
              <span>10TH SECONDARY</span>
            </div>
          </div>

          <div className="academic-grid">
            {educationHistory.map((edu) => (
              <div className="academic-card" key={edu.degree}>
                <div className="academic-meta">
                  <span>{edu.type}</span>
                  <span>{edu.period}</span>
                </div>
                <h4>{edu.degree}</h4>
                <p className="academic-institution">{edu.institution}</p>
                <div className="academic-badge">{edu.score}</div>
              </div>
            ))}
          </div>

          <div className="resume-highlights-strip">
            <div className="highlight-pill">
              <span className="pill-label">LANGUAGES</span>
              <span className="pill-val">English · Telugu · Hindi</span>
            </div>
            <div className="highlight-pill">
              <span className="pill-label">SOFT SKILLS</span>
              <span className="pill-val">Problem-Solving · Team Collaboration · Communication · Time Management</span>
            </div>
            <div className="highlight-pill highlight-active">
              <span className="pill-label">STATUS</span>
              <span className="pill-val">Actively seeking AI/ML &amp; Full-Stack Internships · 2026</span>
            </div>
          </div>

          {/* SLACK-STYLE CARDS */}
          <div className="slack-section">
            <div className="slack-heading">
              <div className="slack-heading-icon">
                <Icon name="terminal" size={20} />
              </div>
              <div>
                <span className="slack-heading-label">LIVE FEED</span>
                <strong>What I&apos;ve been shipping</strong>
              </div>
            </div>
            <div className="slack-grid">
              {slackCards.map((card, i) => (
                <SlackCard card={card} delay={i * 120} key={card.channel} />
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE TIMELINE SECTION */}
        <section className={`journey section-frame ${journeyReveal.isVisible ? "section-revealed" : ""}`} id="journey" ref={journeyReveal.ref}>
          <SectionLabel index="04">EXPERIENCE TIMELINE</SectionLabel>
          <div className="journey-heading">
            <div role="heading" aria-level={2}>
              Learning in public.
              <br />
              Building <em className="wave-word">with intent.</em>
            </div>
            <p>
              A trajectory shaped by hands-on engineering, hackathon delivery,
              and a constant bias for useful, intelligent tools.
            </p>
          </div>
          <div className="timeline">
            {journey.map((item, i) => (
              <article className="timeline-item" key={item.title} style={{ animationDelay: `${i * 100}ms` }}>
                <span className="timeline-year">{item.year}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
                <span className="timeline-mark" aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS & CREDENTIALS SECTION */}
        <section className={`credentials section-frame ${credsReveal.isVisible ? "section-revealed" : ""}`} id="credentials" ref={credsReveal.ref}>
          <SectionLabel index="05">CERTIFICATIONS &amp; CREDENTIALS</SectionLabel>
          <div className="credentials-heading">
            <div role="heading" aria-level={2}>
              Curiosity,
              <br />
              <em className="wave-word">credentialed.</em>
            </div>
            <div className="credentials-resume-actions">
              <button
                aria-label="Preview official resume"
                className="inline-link resume-trigger-btn"
                onClick={() => setResumeModalOpen(true)}
                type="button"
              >
                Preview full résumé <Icon name="external" size={16} />
              </button>
              <Link
                className="inline-link"
                download="Karre_John_Hyde_Resume.pdf"
                href={resume}
              >
                Download PDF <Icon name="download" size={18} />
              </Link>
            </div>
          </div>
          <div className="cert-grid">
            {certifications.map((cert, i) => (
              <article className="cert-card" key={cert.name} style={{ animationDelay: `${i * 60}ms` }}>
                <div>
                  <div className="cert-meta">
                    <span>{cert.label}</span>
                    <span>{cert.year}</span>
                  </div>
                  <h3>{cert.name}</h3>
                  <p>{cert.issuer}</p>
                </div>
                <a
                  aria-label={`View verified certificate for ${cert.name}`}
                  className="cert-link"
                  href={cert.credentialUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span>View Verified Certificate</span>
                  <Icon name="external" size={13} />
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className={`contact section-frame ${contactReveal.isVisible ? "section-revealed" : ""}`} id="contact" ref={contactReveal.ref}>
          <div className="contact-noise" aria-hidden="true" />
          <div className="contact-kicker">
            <span className="live-dot" />
            OPEN TO INTERNSHIPS &amp; COLLABORATIONS · 2026
          </div>
          <div className="contact-title" role="heading" aria-level={2}>
            Have a problem worth
            <br />
            <em className="wave-word">solving together?</em>
          </div>

          <div className="contact-container">
            {/* Contact info channels */}
            <div className="contact-info-panel">
              <div
                aria-label="Send direct email to johnnykarre@gmail.com"
                className="contact-info-card contact-email-card"
                onClick={() => {
                  window.location.href = links.email
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    window.location.href = links.email
                  }
                }}
                role="button"
                tabIndex={0}
                title="Click to write email directly, or click Copy to copy address"
              >
                <div className="contact-icon-box">
                  <Icon name="mail" size={20} />
                </div>
                <div className="contact-info-text">
                  <span>PRIMARY EMAIL</span>
                  <strong>johnnykarre@gmail.com</strong>
                </div>
                <button
                  aria-label="Copy email address to clipboard"
                  className={`copy-btn ${copiedEmail ? "copied" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCopyEmail(e)
                  }}
                  title="Copy email to clipboard"
                  type="button"
                >
                  <Icon name={copiedEmail ? "check" : "copy"} size={13} />
                  <span>{copiedEmail ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <a
                aria-label="Direct WhatsApp chat with Karre John Hyde at +91 9100243535"
                className="contact-info-card contact-whatsapp-card"
                href={links.whatsapp}
                rel="noreferrer"
                target="_blank"
                title="Chat with John directly on WhatsApp (+91 9100243535)"
              >
                <div className="contact-icon-box whatsapp-icon-box">
                  <Icon name="whatsapp" size={20} />
                </div>
                <div className="contact-info-text">
                  <span>WHATSAPP DIRECT</span>
                  <strong>+91 9100243535</strong>
                </div>
                <span className="whatsapp-quick-chip">
                  <span>Chat</span>
                  <Icon name="external" size={13} />
                </span>
              </a>

              <a
                aria-label="Karre John Hyde on LinkedIn"
                className="contact-info-card"
                href={links.linkedin}
                rel="noreferrer"
                target="_blank"
                title="Open LinkedIn profile"
              >
                <div className="contact-icon-box">
                  <Icon name="linkedin" size={20} />
                </div>
                <div className="contact-info-text">
                  <span>LINKEDIN PROFILE</span>
                  <strong>karre-john-hyde-594b67416</strong>
                </div>
                <Icon name="external" size={14} />
              </a>

              <a
                aria-label="Karre John Hyde on GitHub"
                className="contact-info-card"
                href={links.github}
                rel="noreferrer"
                target="_blank"
                title="Open GitHub profile"
              >
                <div className="contact-icon-box">
                  <Icon name="github" size={20} />
                </div>
                <div className="contact-info-text">
                  <span>GITHUB REPOSITORIES</span>
                  <strong>github.com/KarreJohnHyde</strong>
                </div>
                <Icon name="external" size={14} />
              </a>

              <a
                aria-label="Karre John Hyde on Vercel"
                className="contact-info-card"
                href={links.vercel}
                rel="noreferrer"
                target="_blank"
                title="Open Vercel dashboard"
              >
                <div className="contact-icon-box">
                  <Icon name="cloud" size={20} />
                </div>
                <div className="contact-info-text">
                  <span>VERCEL DASHBOARD</span>
                  <strong>vercel.com/johnnyvercel</strong>
                </div>
                <Icon name="external" size={14} />
              </a>

              <a
                aria-label="Chennai, India on Google Maps"
                className="contact-info-card"
                href="https://www.google.com/maps/place/Chennai,+Tamil+Nadu/"
                rel="noreferrer"
                target="_blank"
                title="View Chennai on Google Maps"
              >
                <div className="contact-icon-box">
                  <Icon name="mapPin" size={20} />
                </div>
                <div className="contact-info-text">
                  <span>LOCATION &amp; TIMEZONE</span>
                  <strong>Chennai, India · IST (UTC+5:30)</strong>
                </div>
                <Icon name="external" size={14} />
              </a>
            </div>

            {/* Interactive message form */}
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label htmlFor="contact-name">Your Name</label>
                <input
                  className="form-input"
                  id="contact-name"
                  name="name"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Sarah Jenkins"
                  required
                  type="text"
                  value={formData.name}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Email Address</label>
                <input
                  className="form-input"
                  id="contact-email"
                  name="email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="name@company.com"
                  required
                  type="email"
                  value={formData.email}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject">Topic / Subject</label>
                <input
                  className="form-input"
                  id="contact-subject"
                  name="subject"
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="Internship / Collaboration / Project"
                  type="text"
                  value={formData.subject}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  className="form-textarea"
                  id="contact-message"
                  name="message"
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell me about your team, challenge, or project..."
                  required
                  rows={4}
                  value={formData.message}
                />
              </div>

              <div className="form-actions-row">
                <button
                  className="form-submit"
                  disabled={contactStatus === "sending"}
                  type="submit"
                >
                  {contactStatus === "sending" ? (
                    <>
                      <span className="live-dot" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Icon name="arrow" size={16} />
                    </>
                  )}
                </button>

                <a
                  aria-label="Send direct message via WhatsApp to +91 9100243535"
                  className="whatsapp-send-btn"
                  href={`https://wa.me/919100243535?text=${encodeURIComponent(
                    formData.name || formData.message
                      ? `Hi John, I am ${formData.name || "reaching out"}.${formData.subject ? ` Regarding: ${formData.subject}.` : ""} ${formData.message}`
                      : "Hi John, I saw your portfolio and would like to connect regarding an opportunity!"
                  )}`}
                  rel="noreferrer"
                  target="_blank"
                  title="Send message via WhatsApp (+91 9100243535)"
                >
                  <Icon name="whatsapp" size={16} />
                  <span>WhatsApp Direct</span>
                </a>
              </div>

              {contactStatus === "sent" && (
                <div className="form-toast">
                  <Icon name="check" size={16} />
                  <span>{statusMessage || "Message delivered! I will reply to you shortly."}</span>
                </div>
              )}
            </form>
          </div>

          <div className="contact-footer">
            <div>
              <span>BASED IN</span>
              <a
                href="https://www.google.com/maps/place/Chennai,+Tamil+Nadu/"
                rel="noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
                target="_blank"
                title="View Chennai on Google Maps"
              >
                Chennai, India · IST ↗
              </a>
            </div>
            <div className="socials">
              <Link href={links.github} label="GitHub">
                <Icon name="github" />
              </Link>
              <Link href={links.linkedin} label="LinkedIn">
                <Icon name="linkedin" />
              </Link>
              <Link href={links.whatsapp} label="WhatsApp (+91 9100243535)">
                <Icon name="whatsapp" />
              </Link>
              <Link href={links.email} label="Email">
                <Icon name="mail" />
              </Link>
            </div>
            <span>© 2026 KARRE JOHN HYDE · ALL RIGHTS RESERVED</span>
          </div>
        </section>
      </main>
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  )
}
