import React, { useState, type FormEvent } from "react"
import resume from "./imports/Karre_John_Hyde_Resume__3_.pdf"
import ProjectsSection from "./components/ProjectsSection"
import CaseStudiesSection from "./components/CaseStudiesSection"
import JohnnyTalksModal from "./components/JohnnyTalksModal"

export default function App() {
  const [johnnyModalOpen, setJohnnyModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">(
    "idle",
  )

  const handleSubmitInquiry = (e: FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    setFormStatus("sending")
    setTimeout(() => {
      setFormStatus("sent")
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setFormStatus("idle"), 5000)
    }, 600)
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="bento-app-wrapper">
      {/* ═══════════════════════════════════════════════════════
          STICKY TOP NAVBAR
          ═══════════════════════════════════════════════════════ */}
      <header className="bento-nav">
        <a href="#hero" className="bento-brand">
          <span className="bento-logo-mark">KJ</span>
          <div>
            <span className="bento-brand-name">Karre John Hyde</span>
            <span className="bento-brand-title">Full-Stack Engineer</span>
          </div>
        </a>

        <nav className="bento-nav-links" aria-label="Primary navigation">
          <a href="#projects" className="bento-nav-link">
            Projects
          </a>
          <a href="#case-studies" className="bento-nav-link">
            Case Studies
          </a>
          <a href="#about" className="bento-nav-link">
            About &amp; Skills
          </a>
          <a href="#contact" className="bento-nav-link">
            Contact
          </a>
          <a
            href={resume}
            download="Karre_John_Hyde_Resume.pdf"
            className="bento-nav-btn"
            target="_blank"
            rel="noreferrer"
          >
            Résumé ↗
          </a>
        </nav>
      </header>

      <main>
        {/* ═══════════════════════════════════════════════════════
            HERO SECTION (Bento Grid Header)
            - One-line value proposition
            - Role: Full-Stack Engineer
            - Location & Timezone
            - Two CTA Buttons: 'View Projects' and 'Contact'
            ═══════════════════════════════════════════════════════ */}
        <section className="hero-bento-grid" id="hero">
          {/* Main Hero Card */}
          <div className="hero-main-card">
            <div>
              <div className="hero-meta-strip">
                <span className="hero-role-badge">
                  <span className="code-dot" />
                  Full-Stack Engineer
                </span>
                <span className="hero-location-text">
                  <span>📍</span> Chennai, India · IST (UTC+5:30)
                </span>
              </div>

              <h1 className="hero-heading">
                Building scalable web systems &amp; <em>grounded AI</em>{" "}
                architectures.
              </h1>

              {/* One-Line Value Proposition */}
              <p className="hero-value-prop">
                Engineering high-performance full-stack web applications and
                context-grounded AI systems with ruthless architectural
                simplicity and measurable impact.
              </p>
            </div>

            {/* Exactly Two CTA Buttons */}
            <div className="hero-cta-group">
              <button
                type="button"
                className="hero-cta-btn primary"
                onClick={() => scrollToSection("projects")}
              >
                <span>View Projects</span>
                <span>↓</span>
              </button>
              <button
                type="button"
                className="hero-cta-btn secondary"
                onClick={() => scrollToSection("contact")}
              >
                <span>Contact</span>
                <span>↗</span>
              </button>
            </div>
          </div>

          {/* Hero Side Column (Key Accreditations & Metrics) */}
          <div className="hero-side-column">
            <div className="hero-stat-card">
              <span className="stat-metric-val green">8.45 CGPA</span>
              <span className="stat-metric-label">
                B.E. Computer Science (AI &amp; ML)
              </span>
              <span className="stat-metric-sub">Sathyabama IST · Sem 6</span>
            </div>

            <div className="hero-stat-card">
              <span className="stat-metric-val">IIT Kanpur</span>
              <span className="stat-metric-label">
                Cloud &amp; Distributed Systems
              </span>
              <span className="stat-metric-sub">
                Elite NPTEL Certification (2026)
              </span>
            </div>

            <div className="hero-stat-card">
              <span className="stat-metric-val green">Innoverse'26</span>
              <span className="stat-metric-label">
                1st Place Hackathon Winner
              </span>
              <span className="stat-metric-sub">
                Cognitive Learning PCA/K-Means Engine
              </span>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            PROJECTS SECTION (4 Featured Cards · STAR Methodology)
            ═══════════════════════════════════════════════════════ */}
        <ProjectsSection />

        {/* ═══════════════════════════════════════════════════════
            CASE STUDIES SECTION (Interactive Deep-Dive Cards)
            - Problem Statements
            - Design Process
            - User Testing Insights
            - Final Product Results
            ═══════════════════════════════════════════════════════ */}
        <CaseStudiesSection />

        {/* ═══════════════════════════════════════════════════════
            ABOUT & SKILLS SECTION (Bento Grid)
            - Concise 4-Line Human Bio
            - Grouped Tool/Skill Badges
            ═══════════════════════════════════════════════════════ */}
        <section className="bento-section" id="about">
          <div className="section-header-row">
            <div>
              <div className="bento-badge">
                <span className="code-dot" />
                <span>ABOUT &amp; TECHNICAL CAPABILITIES</span>
              </div>
              <h2 className="bento-section-title">
                Background &amp; Engineering Toolkit
              </h2>
            </div>
          </div>

          <div className="about-skills-bento">
            {/* Concise 4-Line Human Bio */}
            <div className="about-card">
              <div>
                <h3 className="panel-heading">Engineering Background</h3>
                <div className="bio-lines-box">
                  <div className="bio-line-item">
                    <span className="bio-line-num">01</span>
                    <p>
                      Final-year B.E. Computer Science &amp; Engineering (AI
                      &amp; ML) student at Sathyabama IST, Chennai (8.45 CGPA)
                      with an Elite certification from IIT Kanpur in Cloud
                      Computing and Distributed Systems.
                    </p>
                  </div>
                  <div className="bio-line-item">
                    <span className="bio-line-num">02</span>
                    <p>
                      I architect end-to-end full-stack applications with React,
                      TypeScript, and Next.js, backed by robust serverless
                      databases, REST/GraphQL APIs, and low-latency cloud
                      infrastructure.
                    </p>
                  </div>
                  <div className="bio-line-item">
                    <span className="bio-line-num">03</span>
                    <p>
                      Winner of Innoverse'26; I bridge deep learning models
                      (RAG, vector embeddings, clustering) into production web
                      products that solve real human challenges without
                      unnecessary architectural bloat.
                    </p>
                  </div>
                  <div className="bio-line-item">
                    <span className="bio-line-num">04</span>
                    <p>
                      Based in Chennai, India, actively available for Full-Stack
                      and AI/ML engineering internships, high-velocity teams,
                      and mission-critical software roles.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Grouped Tool / Skill Badges */}
            <div className="skills-groups-card">
              <div className="skill-group-block">
                <span className="group-title">Languages</span>
                <div className="badge-row">
                  {[
                    "TypeScript",
                    "JavaScript",
                    "Python",
                    "SQL",
                    "C++",
                    "Java",
                    "HTML5 / CSS3",
                  ].map((skill) => (
                    <span className="bento-skill-badge" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="skill-group-block">
                <span className="group-title">Frontend</span>
                <div className="badge-row">
                  {[
                    "React 19",
                    "Next.js",
                    "Tailwind CSS",
                    "HTML5 Canvas",
                    "WebGL / Three.js",
                    "Responsive Systems",
                  ].map((skill) => (
                    <span className="bento-skill-badge" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="skill-group-block">
                <span className="group-title">Backend &amp; Cloud</span>
                <div className="badge-row">
                  {[
                    "Node.js",
                    "FastAPI",
                    "AWS (Lambda, DynamoDB, S3)",
                    "PostgreSQL",
                    "REST APIs",
                    "Docker",
                  ].map((skill) => (
                    <span className="bento-skill-badge" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="skill-group-block">
                <span className="group-title">AI / ML &amp; Tooling</span>
                <div className="badge-row">
                  {[
                    "LangChain",
                    "FAISS",
                    "scikit-learn",
                    "Git / GitHub",
                    "Linux",
                    "Vite",
                    "Vercel",
                    "Postman",
                  ].map((skill) => (
                    <span className="bento-skill-badge" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            CONTACT & FOOTER CTA SECTION
            - Clean email link & LinkedIn anchor
            - Direct project inquiry CTA form
            ═══════════════════════════════════════════════════════ */}
        <section className="bento-section" id="contact">
          <div className="section-header-row">
            <div>
              <div className="bento-badge">
                <span className="code-dot" />
                <span>DIRECT COLLABORATION</span>
              </div>
              <h2 className="bento-section-title">Let&apos;s Build Together</h2>
              <p className="bento-section-subtitle">
                Open for Full-Stack, AI/ML, and Cloud engineering opportunities.
                Direct response within 24 hours.
              </p>
            </div>
          </div>

          <div className="contact-footer-bento">
            {/* Direct Contact Anchors */}
            <div className="contact-direct-card">
              <div>
                <h3 className="panel-heading">Direct Contact</h3>
                <p className="panel-text">
                  Reach out directly for engineering roles, technical inquiries,
                  or consulting.
                </p>

                <div className="contact-anchors-list">
                  {/* Clean Email Link */}
                  <a
                    href="mailto:johnnykarre@gmail.com"
                    className="contact-anchor-item"
                    title="Send Email to Johnny"
                  >
                    <div className="anchor-icon-box">✉</div>
                    <div className="anchor-copy">
                      <span className="anchor-label">EMAIL ADDRESS</span>
                      <span className="anchor-val">johnnykarre@gmail.com</span>
                    </div>
                  </a>

                  {/* Clean LinkedIn Anchor */}
                  <a
                    href="https://www.linkedin.com/in/karre-john-hyde-594b67416/"
                    target="_blank"
                    rel="noreferrer"
                    className="contact-anchor-item"
                    title="Connect on LinkedIn"
                  >
                    <div className="anchor-icon-box">in</div>
                    <div className="anchor-copy">
                      <span className="anchor-label">LINKEDIN PROFILE</span>
                      <span className="anchor-val">
                        linkedin.com/in/karre-john-hyde
                      </span>
                    </div>
                  </a>

                  {/* GitHub Anchor */}
                  <a
                    href="https://github.com/KarreJohnHyde"
                    target="_blank"
                    rel="noreferrer"
                    className="contact-anchor-item"
                    title="View GitHub Profile"
                  >
                    <div className="anchor-icon-box">⌥</div>
                    <div className="anchor-copy">
                      <span className="anchor-label">GITHUB REPOSITORIES</span>
                      <span className="anchor-val">
                        github.com/KarreJohnHyde
                      </span>
                    </div>
                  </a>
                </div>
              </div>

              <p className="contact-meta-note">
                Based in Chennai, India · IST (UTC+5:30) · Available for global
                remote and on-site engineering roles.
              </p>
            </div>

            {/* Direct Project Inquiry Form */}
            <div className="inquiry-form-card">
              <h3 className="panel-heading">Direct Project Inquiry</h3>
              <p className="panel-text">
                Have a project or role in mind? Drop a message below and I will
                get back to you promptly.
              </p>

              <form className="inquiry-form" onSubmit={handleSubmitInquiry}>
                <div className="form-group">
                  <label htmlFor="inquiry-name">YOUR NAME</label>
                  <input
                    id="inquiry-name"
                    type="text"
                    required
                    placeholder="e.g. Alex Mercer"
                    className="bento-input"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inquiry-email">YOUR EMAIL</label>
                  <input
                    id="inquiry-email"
                    type="email"
                    required
                    placeholder="e.g. alex@company.com"
                    className="bento-input"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inquiry-message">
                    PROJECT DETAILS / ROLE
                  </label>
                  <textarea
                    id="inquiry-message"
                    required
                    placeholder="Tell me about the engineering challenge, stack, or role..."
                    className="bento-textarea"
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="inquiry-submit-btn"
                  disabled={formStatus === "sending"}
                >
                  {formStatus === "sending"
                    ? "Submitting..."
                    : formStatus === "sent"
                      ? "✓ Inquiry Delivered!"
                      : "Send Project Inquiry →"}
                </button>

                {formStatus === "sent" && (
                  <div className="form-status-banner">
                    Thank you! Your message has been sent. I will review it and
                    reply shortly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════════════ */}
      <footer className="bento-footer">
        <span>© 2026 KARRE JOHN HYDE · ALL RIGHTS RESERVED</span>
        <span>CHENNAI, INDIA · FULL-STACK &amp; AI/ML ENGINEER</span>
      </footer>

      {/* Subtle Floating AI Brain Launcher */}
      <button
        type="button"
        className="johnny-floating-pill"
        onClick={() => setJohnnyModalOpen(true)}
        aria-label="Consult Johnny-Talks AI Twin"
      >
        <span>✦</span>
        <span>Ask AI Twin</span>
      </button>

      {/* Johnny-Talks Digital Twin Modal */}
      <JohnnyTalksModal
        isOpen={johnnyModalOpen}
        onClose={() => setJohnnyModalOpen(false)}
      />
    </div>
  )
}
