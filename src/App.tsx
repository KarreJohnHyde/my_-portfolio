import React, {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react"
import portrait from "./imports/ce60ae59-92f9-4d33-8d8a-3c43c3f866ea.png"
import resume from "./imports/Karre_John_Hyde_Resume__3_.pdf"

type IconName = "arrow" | "brain" | "cloud" | "code" | "download" | "github" | "grid" | "linkedin" | "mail" | "spark" | "terminal"

const links = {
  github: "https://github.com/KarreJohnHyde",
  linkedin: "https://www.linkedin.com/in/karre-john-hyde-594b67416/",
  email: "mailto:johnnykarre@gmail.com",
}

const projects = [
  {
    number: "01",
    title: "Study2AI",
    description:
      "A full-stack RAG system that turns documents into grounded, context-aware learning conversations.",
    tags: ["Python", "LangChain", "FAISS", "Gradio"],
    link: "https://huggingface.co/spaces/Johnny2005/Final_Project",
    icon: "brain" as IconName,
    tone: "violet",
    label: "RAG · EDUCATION",
  },
  {
    number: "02",
    title: "Expense AI",
    description:
      "Serverless expense intelligence with receipt OCR, QR payments, and interactive spending insights.",
    tags: ["AWS", "Next.js", "DynamoDB", "OCR"],
    link: "https://bigdatas.vercel.app/",
    icon: "cloud" as IconName,
    tone: "cyan",
    label: "FINTECH · CLOUD",
  },
  {
    number: "03",
    title: "Cognitive Learning",
    description:
      "An adaptive ML dashboard that classifies learners into cognitive profiles from behavioral signals.",
    tags: ["Streamlit", "scikit-learn", "K-Means", "PCA"],
    link: "https://cognitivelearning-5zqpetkfjexgbjx5kdappgk.streamlit.app/",
    icon: "spark" as IconName,
    tone: "lime",
    label: "ML · HACKATHON",
  },
  {
    number: "04",
    title: "MedTwin",
    description:
      "A healthcare-focused AI exploration for turning complex information into approachable digital experiences.",
    tags: ["AI", "Healthcare", "Jupyter"],
    link: "https://github.com/KarreJohnHyde/MedTwin",
    icon: "brain" as IconName,
    tone: "violet",
    label: "HEALTH · AI",
  },
  {
    number: "05",
    title: "Noel Foundation",
    description:
      "A purpose-led web project that brings a community-focused organization onto the web.",
    tags: ["Web", "UI/UX", "Community"],
    link: "https://noel-foundation.vercel.app/",
    icon: "spark" as IconName,
    tone: "cyan",
    label: "WEB · IMPACT",
  },
  {
    number: "06",
    title: "AgriMandi",
    description:
      "An agritech product concept exploring better digital access to agricultural workflows and information.",
    tags: ["Agritech", "Product", "Web"],
    link: "https://agrimandi.vercel.app/",
    icon: "cloud" as IconName,
    tone: "lime",
    label: "AGRITECH · PRODUCT",
  },
]

const journey = [
  {
    year: "2026",
    title: "Independent AI & full-stack builder",
    detail:
      "Shipping applied learning tools, serverless products, and interactive experiments while seeking an AI/ML or full-stack internship.",
  },
  {
    year: "2026",
    title: "Cognitive Learning · Innoverse'26",
    detail:
      "Built a live adaptive-learning dashboard during a 24-hour hackathon using K-Means, PCA, behavioral signals, and recommendation logic.",
  },
  {
    year: "2025 — now",
    title: "B.E. Computer Science (AI & ML)",
    detail:
      "Growing a broad engineering foundation at Sathyabama Institute of Science and Technology, Chennai. Current CGPA: 8.45.",
  },
]

const certifications = [
  { label: "AI / ML", name: "Introduction to Machine Learning", issuer: "NPTEL · IIT Kharagpur", year: "2025" },
  { label: "AI / ML", name: "Generative AI & Agentic Architectures", issuer: "HERE AND NOW AI · Sathyabama IST", year: "2025" },
  { label: "Cloud", name: "Cloud Computing & Distributed Systems · Elite", issuer: "NPTEL · IIT Kanpur", year: "2026" },
  { label: "Data", name: "Database Management System", issuer: "NPTEL · IIT Kharagpur", year: "2025" },
  { label: "Programming", name: "Python for Data Science", issuer: "IBM · CognitiveClass.ai", year: "2024" },
  { label: "Programming", name: "Programming in Java", issuer: "NPTEL · IIT Kharagpur", year: "2024" },
]

const skills = [
  { name: "AI systems", value: "LLMs · RAG · NLP", icon: "brain" as IconName },
  {
    name: "Engineering",
    value: "Python · Java · SQL",
    icon: "terminal" as IconName,
  },
  {
    name: "Products",
    value: "Next.js · Streamlit · Gradio",
    icon: "grid" as IconName,
  },
  {
    name: "Cloud",
    value: "AWS · Vercel · Hugging Face",
    icon: "cloud" as IconName,
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
    cloud: (
      <>
        <path d="M6.5 18.5h11a4 4 0 0 0 .7-7.9A6.4 6.4 0 0 0 6 8.5a5 5 0 0 0 .5 10Z" />
        <path d="m9 14 3-3 3 3M12 11v6" />
      </>
    ),
    code: (
      <>
        <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 20h14" />
      </>
    ),
    github: (
      <path d="M12 2.7a9.5 9.5 0 0 0-3 18.5c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1 1.6 1 .9 1.6 2.4 1.1 2.9.9.1-.7.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-4.7 0-1 .4-1.9 1-2.6-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.6 0 3.6-2.4 4.4-4.6 4.7.4.3.7.9.7 1.7v2.6c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.7Z" />
    ),
    grid: (
      <>
        <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
        <path d="M17 14v7M13.5 17.5h7" />
      </>
    ),
    linkedin: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 10v7M8 7v.1M12 17v-4a3 3 0 0 1 6 0v4M12 10v7" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
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
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="m7 9 3 3-3 3M13 16h4" />
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
  download?: boolean
  label?: string
}) {
  return React.createElement(
    "a",
    {
      className,
      href,
      download,
      "aria-label": label,
      ...(href.startsWith("http")
        ? { target: "_blank", rel: "noreferrer" }
        : {}),
    },
    children,
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
  return React.createElement(
    "button",
    { className, onClick, "aria-label": label, type: "button" },
    children,
  )
}

const particleSymbols = ["(", ")", "*", "-", "/", "+", "&", "="]
const particleColors = ["#cbff47", "#5ee7f0", "#a98cff", "#ff8fb3", "#ffcf70"]

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

      const amount = Math.min(4, Math.max(1, Math.ceil(distance / 20)))
      for (let index = 0; index < amount; index += 1) {
        const size = 12 + Math.random() * 13
        const maxLife = 680 + Math.random() * 500
        particles.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 1.7 + (x - pointer.lastX) * 0.015,
          vy: -0.9 - Math.random() * 1.9,
          size,
          rotation: (Math.random() - 0.5) * 0.8,
          spin: (Math.random() - 0.5) * 0.006,
          life: maxLife,
          maxLife,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          symbol: particleSymbols[Math.floor(Math.random() * particleSymbols.length)],
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
      spawn(event.clientX, event.clientY, 2)
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
        particle.vy += 0.105 * step
        particle.x += particle.vx * step
        particle.y += particle.vy * step
        particle.rotation += particle.spin * delta

        const progress = 1 - particle.life / particle.maxLife
        const opacity = Math.sin(Math.min(progress, 1) * Math.PI) * 0.84
        const half = particle.size / 2

        context.save()
        context.translate(particle.x, particle.y)
        context.rotate(particle.rotation)
        context.globalAlpha = opacity
        context.shadowColor = particle.color
        context.shadowBlur = 14
        context.fillStyle = particle.color
        context.fillRect(-half, -half, particle.size, particle.size)
        context.shadowBlur = 0
        context.globalAlpha = opacity * 0.8
        context.fillStyle = "#090a0a"
        context.font = `600 ${Math.max(10, particle.size * 0.6)}px 'DM Mono', monospace`
        context.textAlign = "center"
        context.textBaseline = "middle"
        context.fillText(particle.symbol, 0, 1)
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

  return <canvas ref={canvasRef} className="particle-trail" aria-hidden="true" />
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

function ProjectCard({ project }: { project: typeof projects[number] }) {
  const [x, setX] = useState(50)
  const [y, setY] = useState(50)
  const move = (event: ReactMouseEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect()
    setX(((event.clientX - box.left) / box.width) * 100)
    setY(((event.clientY - box.top) / box.height) * 100)
  }

  return (
    <div
      className={`project-card ${project.tone}`}
      onMouseMove={move}
      style={
        { "--card-x": `${x}%`, "--card-y": `${y}%` } as React.CSSProperties
      }
    >
      <div className="project-top">
        <span className="project-number">/{project.number}</span>
        <span className="project-icon">
          <Icon name={project.icon} size={26} />
        </span>
      </div>
      <div className="project-visual" aria-hidden="true">
        <div className="visual-grid" />
        <div className="visual-orbit orbit-one" />
        <div className="visual-orbit orbit-two" />
        <div className="visual-core">
          <Icon name={project.icon} size={34} />
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
      <Link
        className="project-link"
        href={project.link}
        label={`Open ${project.title}`}
      >
        <span>View project</span>
        <Icon name="arrow" />
      </Link>
    </div>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [active, setActive] = useState("home")
  const appRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const sections = ["home", "work", "about", "journey", "credentials", "contact"]
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

  const navigate = (id: string) => {
    setTransitioning(true)
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      setActive(id)
      window.setTimeout(() => setTransitioning(false), 480)
    }, 260)
  }

  return (
    <div className={`app-shell ${loaded ? "is-loaded" : ""}`} ref={appRef}>
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
            { id: "work", label: "work", index: "02" },
            { id: "about", label: "about", index: "03" },
            { id: "journey", label: "path", index: "04" },
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
        <section className="hero section-frame" id="home">
          <div className="hero-copy">
            <div className="eyebrow reveal-item">
              <span className="signal">
                <i />
              </span>
              Available for internships · 2026
            </div>
            <div
              className="hero-title reveal-item"
              role="heading"
              aria-level={1}
            >
              <span>Building intelligence</span>
              <span>
                into <em className="wave-word">useful</em> things.
              </span>
            </div>
            <div className="hero-intro reveal-item">
              <span className="intro-index">[ ABOUT ]</span>
              <div>
                I&apos;m John — a computer science engineer blending AI,
                thoughtful code, and human centered product thinking.
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
              <Link className="text-action" download href={resume}>
                <Icon name="download" size={18} />
                Download résumé
              </Link>
            </div>
          </div>

          <div className="portrait-stage reveal-item">
            <div className="portrait-halo" />
            <div className="portrait-grid" />
            <div className="portrait-frame">
              <img alt="Karre John Hyde" src={portrait} />
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
              <span>BUILD / LEARN / ITERATE</span>
            </div>
          </div>

          <div className="hero-side-note">
            <span>SCROLL TO DISCOVER</span>
            <i />
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[0, 1].map((group) => (
              <div className="ticker-group" key={group}>
                <span>PYTHON</span>
                <i>✦</i>
                <span>ARTIFICIAL INTELLIGENCE</span>
                <i>✦</i>
                <span>FULL-STACK</span>
                <i>✦</i>
                <span>RAG SYSTEMS</span>
                <i>✦</i>
              </div>
            ))}
          </div>
        </div>

        <section className="work section-frame" id="work">
          <SectionLabel index="02">SELECTED WORK</SectionLabel>
          <div className="section-heading">
            <div role="heading" aria-level={2}>
              Ideas, engineered
              <br />
              into <em className="wave-word">impact.</em>
            </div>
            <div className="section-aside">
              <span>03 / PROJECTS</span>
              Selected experiments across intelligence, cloud, and learning.
            </div>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        <section className="about section-frame" id="about">
          <SectionLabel index="03">MY OPERATING SYSTEM</SectionLabel>
          <div className="about-grid">
            <div className="about-statement">
              <div role="heading" aria-level={2}>
                Curious by default.
                <br />
                <em className="wave-word">Precise</em> by design.
              </div>
              <p>
                Final-year CSE student specializing in AI &amp; ML. I enjoy
                moving between model logic, databases, interfaces, and
                deployment — wherever the problem needs me.
              </p>
              <Link className="inline-link" href={links.linkedin}>
                More on LinkedIn <Icon name="arrow" size={18} />
              </Link>
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
              <span>NOW — 2027</span>
              <strong>B.E. Computer Science · AI &amp; ML</strong>
              <small>Sathyabama Institute of Science and Technology</small>
            </div>
            <div className="metric">
              <strong>8.45</strong>
              <span>CGPA</span>
            </div>
            <div className="metric">
              <strong>03</strong>
              <span>LIVE PROJECTS</span>
            </div>
            <div className="metric">
              <strong>∞</strong>
              <span>CURIOSITY</span>
            </div>
          </div>
        </section>

        <section className="journey section-frame" id="journey">
          <SectionLabel index="04">EXPERIENCE TIMELINE</SectionLabel>
          <div className="journey-heading">
            <div role="heading" aria-level={2}>
              Learning in public.
              <br />
              Building <em className="wave-word">with intent.</em>
            </div>
            <p>
              A trajectory shaped by hands-on delivery, rigorous learning, and
              a bias for useful things.
            </p>
          </div>
          <div className="timeline">
            {journey.map((item) => (
              <article className="timeline-item" key={item.title}>
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

        <section className="credentials section-frame" id="credentials">
          <SectionLabel index="05">CERTIFICATIONS &amp; TRAINING</SectionLabel>
          <div className="credentials-heading">
            <div role="heading" aria-level={2}>
              Curiosity,
              <br />
              <em className="wave-word">credentialed.</em>
            </div>
            <Link className="inline-link" download href={resume}>
              Download full résumé <Icon name="download" size={18} />
            </Link>
          </div>
          <div className="cert-grid">
            {certifications.map((cert) => (
              <article className="cert-card" key={cert.name}>
                <div className="cert-meta">
                  <span>{cert.label}</span>
                  <span>{cert.year}</span>
                </div>
                <h3>{cert.name}</h3>
                <p>{cert.issuer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact section-frame" id="contact">
          <div className="contact-noise" aria-hidden="true" />
          <div className="contact-kicker">
            <span className="live-dot" />
            OPEN TO INTERNSHIPS &amp; COLLABORATIONS
          </div>
          <div className="contact-title" role="heading" aria-level={2}>
            Have a problem worth
            <br />
            <em className="wave-word">solving together?</em>
          </div>
          <Link className="contact-email" href={links.email}>
            johnnykarre@gmail.com
            <span>
              <Icon name="arrow" size={28} />
            </span>
          </Link>
          <div className="contact-footer">
            <div>
              <span>BASED IN</span>
              Chennai, India · IST
            </div>
            <div className="socials">
              <Link href={links.github} label="GitHub">
                <Icon name="github" />
              </Link>
              <Link href={links.linkedin} label="LinkedIn">
                <Icon name="linkedin" />
              </Link>
              <Link href={links.email} label="Email">
                <Icon name="mail" />
              </Link>
            </div>
            <span>© 2026 KARRE JOHN HYDE</span>
          </div>
        </section>
      </main>
    </div>
  )
}
