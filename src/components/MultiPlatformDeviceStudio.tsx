// src/components/MultiPlatformDeviceStudio.tsx
// Interactive Multi-Platform Responsive Design & Device Frame Engine
// Showcases:
// 1. Preset Device Frames (iPhone, Android, iPad, MacBook, Desktop)
// 2. Auto Layout & Constraints (Flexbox reflow, pinning)
// 3. Platform-Specific UI Kits (Apple HIG, Google Material Design 3, Microsoft Fluent UI)
// 4. Component Variants & Variables/Modes (Navigation variants, Light/Dark modes, spacing tokens)
// 5. Prototyping & Real-Time Device Testing (Interactive gestures, bezels, realistic hardware mockups)
// 6. Dev Mode Multi-Platform Handoff (Instant CSS/React, SwiftUI, and Jetpack Compose code generation)

import React, { useState, useMemo } from "react"

export type DeviceType = "iphone" | "android" | "ipad" | "macbook" | "desktop"
export type UIKitType = "apple_hig" | "material_3" | "fluent_ui"
export type NavVariant = "mobile_tabs" | "desktop_navbar" | "sidebar"
export type ColorMode = "dark" | "light"
export type DevCodeLang = "css" | "swiftui" | "compose"

interface DeviceSpec {
  id: DeviceType
  name: string
  category: string
  platform: string
  widthPx: number
  heightPx: number
  aspectRatio: string
  bezelRadius: number
  hasDynamicIsland?: boolean
  hasCameraHole?: boolean
  hasNotch?: boolean
}

const DEVICE_SPECS: Record<DeviceType, DeviceSpec> = {
  iphone: {
    id: "iphone",
    name: "iPhone 16 Pro",
    category: "Mobile",
    platform: "iOS",
    widthPx: 393,
    heightPx: 852,
    aspectRatio: "19.5:9",
    bezelRadius: 52,
    hasDynamicIsland: true,
  },
  android: {
    id: "android",
    name: "Pixel 9 / Galaxy S24",
    category: "Mobile",
    platform: "Android",
    widthPx: 412,
    heightPx: 915,
    aspectRatio: "20:9",
    bezelRadius: 44,
    hasCameraHole: true,
  },
  ipad: {
    id: "ipad",
    name: "iPad Pro 11-inch",
    category: "Tablet",
    platform: "iPadOS",
    widthPx: 834,
    heightPx: 1194,
    aspectRatio: "4:3",
    bezelRadius: 28,
  },
  macbook: {
    id: "macbook",
    name: "MacBook Pro 16-inch",
    category: "Laptop",
    platform: "macOS",
    widthPx: 1728,
    heightPx: 1117,
    aspectRatio: "16:10",
    bezelRadius: 18,
    hasNotch: true,
  },
  desktop: {
    id: "desktop",
    name: "Studio Display 4K",
    category: "Desktop",
    platform: "Web / Windows",
    widthPx: 1920,
    heightPx: 1080,
    aspectRatio: "16:9",
    bezelRadius: 12,
  },
}

interface MultiPlatformDeviceStudioProps {
  onAskJohnny?: (query: string) => void
}

export default function MultiPlatformDeviceStudio({
  onAskJohnny,
}: MultiPlatformDeviceStudioProps) {
  // 1. Preset Device Frame State
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>("iphone")

  // 2. Auto Layout & Constraints
  const [autoLayoutDir, setAutoLayoutDir] = useState<"row" | "column">("column")
  const [autoLayoutGap, setAutoLayoutGap] = useState<number>(16)
  const [autoLayoutPadding, setAutoLayoutPadding] = useState<number>(16)
  const [constraintAlign, setConstraintAlign] =
    useState<"start" | "center" | "between">("between")
  const [sizingMode, setSizingMode] = useState<"fill" | "hug" | "fixed">("fill")

  // 3. Platform UI Kit
  const [uiKit, setUiKit] = useState<UIKitType>("apple_hig")

  // 4. Component Variants & Variables (Modes)
  const [navVariant, setNavVariant] = useState<NavVariant>("mobile_tabs")
  const [colorMode, setColorMode] = useState<ColorMode>("dark")
  const [activeTab, setActiveTab] = useState<number>(0)

  // 5. Prototyping
  const [showBezel, setShowBezel] = useState<boolean>(true)
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0)
  const [switchToggled, setSwitchToggled] = useState<boolean>(true)

  // 6. Dev Mode Multi-Platform Handoff
  const [devLang, setDevLang] = useState<DevCodeLang>("css")
  const [copiedCode, setCopiedCode] = useState<boolean>(false)
  const [showDevInspector, setShowDevInspector] = useState<boolean>(false)

  const currentDevice = DEVICE_SPECS[selectedDevice]

  // Automatically adapt default navigation variant to selected device
  const effectiveNavVariant = useMemo(() => {
    if (selectedDevice === "macbook" || selectedDevice === "desktop") {
      return navVariant === "mobile_tabs" ? "desktop_navbar" : navVariant
    }
    return navVariant
  }, [selectedDevice, navVariant])

  // Generate Dev Mode Code
  const generatedDevCode = useMemo(() => {
    if (devLang === "swiftui") {
      return `// SwiftUI (Apple iOS / macOS) — Dev Mode Export
import SwiftUI

struct JohnnyDashboardView: View {
    @State private var selectedIndex = 0
    @State private var isGrounded = true

    var body: some View {
        VStack(alignment: .leading, spacing: ${autoLayoutGap}) {
            // Header with Constraints Pin: Top-Leading
            HStack {
                Text("AI Telemetry")
                    .font(.system(size: 22, weight: .bold, design: .rounded))
                Spacer()
                Circle()
                    .fill(Color(hex: "#A3E635"))
                    .frame(width: 10, height: 10)
            }
            .padding(.horizontal, ${autoLayoutPadding})

            // Metric Cards Grid: Auto Layout Flex
            ${
              autoLayoutDir === "row" ? "HStack" : "VStack"
            }(spacing: ${autoLayoutGap}) {
                MetricCardView(title: "Study2AI RAG", value: "94.2% Acc", latency: "<180ms")
                MetricCardView(title: "DynamoDB Ledger", value: "18ms p99", latency: "Stateless")
            }
            .frame(maxWidth: .infinity)
            
            Toggle("Zero-Hallucination MMR", isOn: $isGrounded)
                .toggleStyle(SwitchToggleStyle(tint: Color(hex: "#A3E635")))
                .padding()
        }
        .padding(${autoLayoutPadding})
        .background(Color(hex: "${
          colorMode === "dark" ? "#0D0F14" : "#F8FAFC"
        }"))
    }
}`
    }

    if (devLang === "compose") {
      return `// Jetpack Compose (Android Material 3) — Dev Mode Export
package com.karre.johnny.ui

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun JohnnyDashboardScreen() {
    var isGrounded by remember { mutableStateOf(true) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(${autoLayoutPadding}.dp),
        verticalArrangement = Arrangement.spacedBy(${autoLayoutGap}.dp)
    ) {
        // Platform M3 Header
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(
                text = "AI Telemetry",
                style = MaterialTheme.typography.headlineSmall
            )
            FilledTonalIconButton(onClick = { /* Action */ }) {
                Icon(Icons.Default.Bolt, contentDescription = "Active")
            }
        }

        // Auto Layout Flex Children
        ${autoLayoutDir === "row" ? "Row" : "Column"}(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(${autoLayoutGap}.dp)
        ) {
            ElevatedCard(modifier = Modifier.weight(1f)) {
                Text("Study2AI MMR", modifier = Modifier.padding(12.dp))
            }
            ElevatedCard(modifier = Modifier.weight(1f)) {
                Text("DynamoDB Ledger", modifier = Modifier.padding(12.dp))
            }
        }
    }
}`
    }

    // Default Web / CSS Flexbox
    return `/* Web CSS / React Auto Layout & Constraints Export */
.device-container {
  display: flex;
  flex-direction: ${autoLayoutDir};
  gap: ${autoLayoutGap}px;
  padding: ${autoLayoutPadding}px;
  width: ${
    sizingMode === "fill"
      ? "100%"
      : sizingMode === "hug"
        ? "max-content"
        : `${currentDevice.widthPx}px`
  };
  justify-content: ${
    constraintAlign === "between"
      ? "space-between"
      : constraintAlign === "center"
        ? "center"
        : "flex-start"
  };
  background-color: var(--token-surface-${colorMode});
  color: var(--token-text-${colorMode});
  border-radius: var(--token-radius-${selectedDevice});
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Platform Tokens: ${uiKit.toUpperCase().replace("_", " ")} */
.interactive-card {
  flex: 1 1 0%;
  border: 1px solid var(--token-border-accent);
  backdrop-filter: blur(16px);
  padding: ${autoLayoutPadding}px;
}`
  }, [
    devLang,
    autoLayoutDir,
    autoLayoutGap,
    autoLayoutPadding,
    constraintAlign,
    sizingMode,
    currentDevice,
    colorMode,
    selectedDevice,
    uiKit,
  ])

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedDevCode)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  return (
    <div className="multiplatform-studio-container" id="device-studio">
      {/* STUDIO HEADER */}
      <div className="studio-header">
        <div className="studio-header-left">
          <div className="studio-pill-badge">
            <span className="live-dot" />
            <span>FIGMA MAKE APP · RESPONSIVE DEVICE ENGINE</span>
          </div>
          <h2 className="studio-main-title">
            Multi-Platform Design &amp; Device Studio
          </h2>
          <p className="studio-subtitle">
            Engineered with Figma's 6 foundational pillars:{" "}
            <strong>Preset Device Frames</strong>,{" "}
            <strong>Auto Layout &amp; Constraints</strong>,{" "}
            <strong>Platform UI Kits</strong>,{" "}
            <strong>Variants &amp; Variable Modes</strong>,{" "}
            <strong>Prototyping Bezels</strong>, and{" "}
            <strong>Dev Mode Multi-Platform Handoff</strong>.
          </p>
        </div>

        {onAskJohnny && (
          <button
            className="studio-ask-johnny-btn"
            onClick={() =>
              onAskJohnny(
                "Explain how you use Figma's 6 responsive design pillars (Device Frames, Auto Layout, UI Kits, Variants, Prototyping, and Dev Mode) to build production apps",
              )
            }
            type="button"
          >
            <span className="sparkle">✦</span>
            <span>Ask Johnny about Multi-Platform Handoff</span>
          </button>
        )}
      </div>

      {/* 6 PILLARS CONTROL TOOLBAR */}
      <div className="studio-toolbar">
        {/* PILLAR 1: PRESET DEVICE FRAMES */}
        <div className="toolbar-section">
          <span className="toolbar-section-label">
            1. PRESET DEVICE FRAMES:
          </span>
          <div className="device-chips-row">
            {(Object.keys(DEVICE_SPECS) as DeviceType[]).map((devId) => {
              const spec = DEVICE_SPECS[devId]
              const isSelected = selectedDevice === devId
              return (
                <button
                  key={devId}
                  className={`device-frame-chip ${isSelected ? "active" : ""}`}
                  onClick={() => setSelectedDevice(devId)}
                  type="button"
                  title={`${spec.name} (${spec.widthPx} × ${spec.heightPx} px)`}
                >
                  <span className="chip-icon">
                    {devId === "iphone"
                      ? "📱"
                      : devId === "android"
                        ? "🤖"
                        : devId === "ipad"
                          ? "📟"
                          : devId === "macbook"
                            ? "💻"
                            : "🖥️"}
                  </span>
                  <span className="chip-name">{spec.name}</span>
                  <span className="chip-res">
                    {spec.widthPx}×{spec.heightPx}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* SUB TOOLBAR: AUTO LAYOUT, UI KIT & MODES */}
        <div className="toolbar-sub-row">
          {/* PILLAR 2: AUTO LAYOUT & CONSTRAINTS */}
          <div className="toolbar-group">
            <span className="group-label">
              2. AUTO LAYOUT &amp; CONSTRAINTS:
            </span>
            <div className="btn-segmented">
              <button
                className={`seg-btn ${
                  autoLayoutDir === "column" ? "active" : ""
                }`}
                onClick={() => setAutoLayoutDir("column")}
                type="button"
                title="Vertical Direction (Column)"
              >
                ↕ Column
              </button>
              <button
                className={`seg-btn ${autoLayoutDir === "row" ? "active" : ""}`}
                onClick={() => setAutoLayoutDir("row")}
                type="button"
                title="Horizontal Direction (Row / Wrap)"
              >
                ↔ Row
              </button>
            </div>

            <div className="btn-segmented">
              <button
                className={`seg-btn ${
                  constraintAlign === "between" ? "active" : ""
                }`}
                onClick={() => setConstraintAlign("between")}
                type="button"
                title="Space Between / Pin Outers"
              >
                ⇥ Space ⇤
              </button>
              <button
                className={`seg-btn ${
                  constraintAlign === "center" ? "active" : ""
                }`}
                onClick={() => setConstraintAlign("center")}
                type="button"
                title="Center Alignment"
              >
                ⫿ Center
              </button>
            </div>

            <div className="slider-pill">
              <span>Gap: {autoLayoutGap}px</span>
              <input
                type="range"
                min="8"
                max="32"
                step="8"
                value={autoLayoutGap}
                onChange={(e) => setAutoLayoutGap(Number(e.target.value))}
                className="studio-mini-slider"
              />
            </div>
          </div>

          {/* PILLAR 3: PLATFORM UI KITS */}
          <div className="toolbar-group">
            <span className="group-label">3. PLATFORM UI KITS:</span>
            <div className="btn-segmented">
              <button
                className={`seg-btn ${uiKit === "apple_hig" ? "active" : ""}`}
                onClick={() => setUiKit("apple_hig")}
                type="button"
              >
                🍎 Apple HIG
              </button>
              <button
                className={`seg-btn ${uiKit === "material_3" ? "active" : ""}`}
                onClick={() => setUiKit("material_3")}
                type="button"
              >
                🤖 Material 3
              </button>
              <button
                className={`seg-btn ${uiKit === "fluent_ui" ? "active" : ""}`}
                onClick={() => setUiKit("fluent_ui")}
                type="button"
              >
                🪟 Fluent UI
              </button>
            </div>
          </div>

          {/* PILLAR 4: COMPONENT VARIANTS & MODES */}
          <div className="toolbar-group">
            <span className="group-label">4. VARIANTS &amp; MODES:</span>
            <div className="btn-segmented">
              <button
                className={`seg-btn ${colorMode === "dark" ? "active" : ""}`}
                onClick={() => setColorMode("dark")}
                type="button"
              >
                🌙 Dark
              </button>
              <button
                className={`seg-btn ${colorMode === "light" ? "active" : ""}`}
                onClick={() => setColorMode("light")}
                type="button"
              >
                ☀️ Light
              </button>
            </div>

            <div className="btn-segmented">
              <button
                className={`seg-btn ${
                  navVariant === "mobile_tabs" ? "active" : ""
                }`}
                onClick={() => setNavVariant("mobile_tabs")}
                type="button"
              >
                Bottom Tabs
              </button>
              <button
                className={`seg-btn ${
                  navVariant === "desktop_navbar" ? "active" : ""
                }`}
                onClick={() => setNavVariant("desktop_navbar")}
                type="button"
              >
                Top Navbar
              </button>
              <button
                className={`seg-btn ${
                  navVariant === "sidebar" ? "active" : ""
                }`}
                onClick={() => setNavVariant("sidebar")}
                type="button"
              >
                Sidebar
              </button>
            </div>
          </div>

          {/* PILLAR 5 & 6 TOGGLES */}
          <div className="toolbar-group">
            <span className="group-label">
              5 &amp; 6. PROTOTYPE &amp; DEV MODE:
            </span>
            <button
              className={`dev-mode-toggle-btn ${showBezel ? "active" : ""}`}
              onClick={() => setShowBezel(!showBezel)}
              type="button"
            >
              {showBezel ? "📱 Hardware Bezel: ON" : "⬜ Frameless: 100%"}
            </button>
            <button
              className={`dev-mode-toggle-btn ${
                showDevInspector ? "active" : ""
              }`}
              onClick={() => setShowDevInspector(!showDevInspector)}
              type="button"
            >
              💻 Dev Mode Code ↗
            </button>
          </div>
        </div>
      </div>

      {/* STUDIO MAIN CANVAS STAGE */}
      <div className="studio-stage-wrapper">
        {/* DEVICE FRAME MOCKUP (PILLAR 5: PROTOTYPING & REAL-TIME TESTING) */}
        <div
          className={`device-chassis-stage device-${selectedDevice} ${
            showBezel ? "has-bezel" : "no-bezel"
          }`}
          style={
            {
              "--canvas-bg": colorMode === "dark" ? "#090B0E" : "#F8FAFC",
              "--canvas-card-bg": colorMode === "dark" ? "#12151B" : "#FFFFFF",
              "--canvas-text": colorMode === "dark" ? "#FFFFFF" : "#0F172A",
              "--canvas-muted": colorMode === "dark" ? "#94A3B8" : "#64748B",
              "--canvas-border":
                colorMode === "dark"
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.08)",
              "--canvas-accent":
                uiKit === "apple_hig"
                  ? "#007AFF"
                  : uiKit === "material_3"
                    ? "#A3E635"
                    : "#00F0FF",
            } as React.CSSProperties
          }
        >
          <div className="device-hardware-frame">
            {/* Dynamic Island / Notch / Camera Cutout */}
            {showBezel && currentDevice.hasDynamicIsland && (
              <div className="device-dynamic-island">
                <span className="sensor-camera" />
                <span className="sensor-dot" />
              </div>
            )}
            {showBezel && currentDevice.hasCameraHole && (
              <div className="device-camera-hole" />
            )}
            {showBezel && currentDevice.hasNotch && (
              <div className="device-macbook-notch" />
            )}

            {/* SCREEN CANVAS AREA */}
            <div
              className={`screen-viewport ui-kit-${uiKit} mode-${colorMode}`}
            >
              {/* TOP STATUS BAR (Platform Specific) */}
              <div className="screen-status-bar">
                <span className="status-time">9:41</span>
                {uiKit === "apple_hig" && (
                  <div className="status-icons">
                    <span>5G</span>
                    <span className="battery-icon">100%</span>
                  </div>
                )}
                {uiKit === "material_3" && (
                  <div className="status-icons">
                    <span>LTE</span>
                    <span>●●●</span>
                  </div>
                )}
                {uiKit === "fluent_ui" && (
                  <div className="status-icons">
                    <span>Win11</span>
                    <span>📶</span>
                  </div>
                )}
              </div>

              {/* NAVIGATION BAR (Variant: Top Navbar or Standard) */}
              {effectiveNavVariant === "desktop_navbar" && (
                <div className="screen-top-navbar">
                  <div className="nav-logo">
                    <span className="nav-logo-mark">KJ</span>
                    <span className="nav-logo-text">Karre John Hyde</span>
                  </div>
                  <div className="nav-links-row">
                    <span className="nav-link active">Projects</span>
                    <span className="nav-link">RAG Brain</span>
                    <span className="nav-link">IIT Kanpur</span>
                    <span className="nav-link">Contact</span>
                  </div>
                  <button className="nav-cta-btn" type="button">
                    Let&apos;s talk
                  </button>
                </div>
              )}

              {/* SCREEN CONTENT BODY (Auto Layout & Constraints demonstration) */}
              <div
                className="screen-content-scroll"
                style={{
                  padding: `${autoLayoutPadding}px`,
                  display: "flex",
                  flexDirection: autoLayoutDir,
                  gap: `${autoLayoutGap}px`,
                }}
              >
                {/* Header Banner */}
                <div className="content-header-card">
                  <div className="header-meta-row">
                    <span className="platform-tag">
                      {uiKit === "apple_hig"
                        ? "iOS 18 · SF Pro"
                        : uiKit === "material_3"
                          ? "Android 15 · Material 3"
                          : "Fluent 2 · Mica"}
                    </span>
                    <span className="device-res-badge">
                      {currentDevice.widthPx} × {currentDevice.heightPx} px
                    </span>
                  </div>
                  <h3 className="content-title">Johnny AI Telemetry Hub</h3>
                  <p className="content-desc">
                    Adaptive layout reflowing seamlessly across{" "}
                    <strong>{currentDevice.name}</strong> with zero viewport
                    clipping.
                  </p>
                </div>

                {/* Interactive Cards (Auto Layout Responsive Reflow) */}
                <div
                  className="responsive-cards-container"
                  style={{
                    display: "flex",
                    flexDirection:
                      autoLayoutDir === "row" &&
                      (selectedDevice === "macbook" ||
                        selectedDevice === "desktop" ||
                        selectedDevice === "ipad")
                        ? "row"
                        : "column",
                    gap: `${autoLayoutGap}px`,
                  }}
                >
                  {/* Card 1: Study2AI */}
                  <div
                    className={`interactive-mock-card ${
                      activeCardIndex === 0 ? "active" : ""
                    }`}
                    onClick={() => setActiveCardIndex(0)}
                  >
                    <div className="card-top-row">
                      <span className="card-icon">🧠</span>
                      <span className="card-chip">RAG PIPELINE</span>
                    </div>
                    <h4>Study2AI Vector Store</h4>
                    <p>
                      Sub-180ms MMR retrieval with zero hallucinated document
                      references.
                    </p>
                    <div className="card-stat-row">
                      <strong>94.2%</strong>
                      <span>Retrieval Accuracy</span>
                    </div>
                  </div>

                  {/* Card 2: Expense AI */}
                  <div
                    className={`interactive-mock-card ${
                      activeCardIndex === 1 ? "active" : ""
                    }`}
                    onClick={() => setActiveCardIndex(1)}
                  >
                    <div className="card-top-row">
                      <span className="card-icon">⚡</span>
                      <span className="card-chip">AWS CLOUD</span>
                    </div>
                    <h4>Expense AI DynamoDB</h4>
                    <p>
                      Single-table composite keys handling burst write
                      concurrency.
                    </p>
                    <div className="card-stat-row">
                      <strong>18ms</strong>
                      <span>p99 Persist Latency</span>
                    </div>
                  </div>

                  {/* Card 3: Cognitive Learning */}
                  <div
                    className={`interactive-mock-card ${
                      activeCardIndex === 2 ? "active" : ""
                    }`}
                    onClick={() => setActiveCardIndex(2)}
                  >
                    <div className="card-top-row">
                      <span className="card-icon">🥇</span>
                      <span className="card-chip">INNOVERSE&apos;26</span>
                    </div>
                    <h4>Cognitive Learning</h4>
                    <p>
                      PCA dimensionality reduction &amp; K-Means student
                      profiling.
                    </p>
                    <div className="card-stat-row">
                      <strong>&gt;89%</strong>
                      <span>Explained Variance</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Toggle Switch (Platform-Specific styling) */}
                <div className="platform-toggle-row">
                  <div>
                    <strong>Strict Grounding Mode</strong>
                    <small>Enforce MMR diversifier ($\lambda = 0.5$)</small>
                  </div>
                  <button
                    className={`platform-switch ${
                      switchToggled ? "is-on" : "is-off"
                    }`}
                    onClick={() => setSwitchToggled(!switchToggled)}
                    type="button"
                    aria-label="Toggle strict grounding"
                  >
                    <span className="switch-knob" />
                  </button>
                </div>
              </div>

              {/* BOTTOM NAVIGATION TABS (Variant: Mobile Bottom Tab Bar) */}
              {effectiveNavVariant === "mobile_tabs" && (
                <div className="screen-bottom-tabbar">
                  {[
                    { label: "Home", icon: "⌂" },
                    { label: "Projects", icon: "❖" },
                    { label: "AI Twin", icon: "✦" },
                    { label: "Creds", icon: "★" },
                  ].map((tab, idx) => (
                    <button
                      key={tab.label}
                      className={`tabbar-item ${
                        activeTab === idx ? "active" : ""
                      }`}
                      onClick={() => setActiveTab(idx)}
                      type="button"
                    >
                      <span className="tab-icon">{tab.icon}</span>
                      <span className="tab-label">{tab.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PILLAR 6: DEV MODE MULTI-PLATFORM CODE INSPECTOR */}
        {showDevInspector && (
          <div className="dev-mode-inspector-panel">
            <div className="inspector-header">
              <div className="inspector-title">
                <span className="dev-mode-badge">DEV MODE</span>
                <h4>Multi-Platform Code Generation</h4>
              </div>
              <button
                className="inspector-close-btn"
                onClick={() => setShowDevInspector(false)}
                type="button"
              >
                ✕
              </button>
            </div>

            <div className="inspector-lang-tabs">
              <button
                className={`lang-tab ${devLang === "css" ? "active" : ""}`}
                onClick={() => setDevLang("css")}
                type="button"
              >
                🌐 Web (CSS / React)
              </button>
              <button
                className={`lang-tab ${devLang === "swiftui" ? "active" : ""}`}
                onClick={() => setDevLang("swiftui")}
                type="button"
              >
                🍏 iOS (SwiftUI)
              </button>
              <button
                className={`lang-tab ${devLang === "compose" ? "active" : ""}`}
                onClick={() => setDevLang("compose")}
                type="button"
              >
                🤖 Android (Jetpack Compose)
              </button>
            </div>

            <div className="inspector-code-block">
              <div className="code-block-actions">
                <span className="code-lang-label">{devLang.toUpperCase()}</span>
                <button
                  className="code-copy-btn"
                  onClick={handleCopyCode}
                  type="button"
                >
                  {copiedCode ? "✓ Copied!" : "Copy Code"}
                </button>
              </div>
              <pre>
                <code>{generatedDevCode}</code>
              </pre>
            </div>

            <div className="inspector-tokens-summary">
              <span className="token-item">
                <strong>Frame:</strong> {currentDevice.name}
              </span>
              <span className="token-item">
                <strong>Auto Layout:</strong> {autoLayoutDir} (gap:{" "}
                {autoLayoutGap}px)
              </span>
              <span className="token-item">
                <strong>Tokens:</strong> {uiKit} · {colorMode}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 6 PILLARS EXPLANATORY FOOTER MATRIX */}
      <div className="studio-pillars-matrix">
        <div className="pillar-card">
          <span className="pillar-num">01</span>
          <h4>Preset Device Frames</h4>
          <p>
            Instant standard resolutions for iPhone, Galaxy, iPad, and MacBook
            so canvases match exact physical screen pixels without manual
            calculation.
          </p>
        </div>
        <div className="pillar-card">
          <span className="pillar-num">02</span>
          <h4>Auto Layout &amp; Constraints</h4>
          <p>
            Flexbox-like automatic reflow (hug, fill, spacing) paired with
            anchor constraints (pin top-right, stretch) ensuring UI elements
            scale fluidly.
          </p>
        </div>
        <div className="pillar-card">
          <span className="pillar-num">03</span>
          <h4>Platform UI Kits</h4>
          <p>
            Official Human Interface Guidelines (Apple), Material Design 3
            (Google), and Fluent UI (Microsoft) native components for true
            platform fidelity.
          </p>
        </div>
        <div className="pillar-card">
          <span className="pillar-num">04</span>
          <h4>Variants &amp; Variables (Modes)</h4>
          <p>
            Component variants (Bottom tabs vs Top navbar) and Design Variable
            modes (Light vs Dark mode, spacing density) switchable in one click.
          </p>
        </div>
        <div className="pillar-card">
          <span className="pillar-num">05</span>
          <h4>Prototyping &amp; Bezels</h4>
          <p>
            Realistic physical device bezels, touch gestures, and Figma Mirror
            real-time screen testing to preview final interaction ergonomics.
          </p>
        </div>
        <div className="pillar-card">
          <span className="pillar-num">06</span>
          <h4>Dev Mode Handoff</h4>
          <p>
            One-click translation from visual canvas to production code: CSS for
            Web, SwiftUI for iOS/macOS, and Jetpack Compose for Android.
          </p>
        </div>
      </div>
    </div>
  )
}
