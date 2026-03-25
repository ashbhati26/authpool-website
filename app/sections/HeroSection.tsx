"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useInView, motion, useScroll, useTransform } from "framer-motion"
import { SITE } from "../lib/constants"
import AnimatedHeading from "../components/AnimatedHeading"
import { Marquee } from "../components/Marquee"
import {
  TerminalAnimationRoot,
  TerminalAnimationContainer,
  TerminalAnimationWindow,
  TerminalAnimationContent,
  TerminalAnimationCommandBar,
  TerminalAnimationBlinkingCursor,
  TerminalAnimationOutput,
  TerminalAnimationTrailingPrompt,
  TerminalAnimationTabList,
  TerminalAnimationTabTrigger,
  type TabContent,
  type TerminalLine,
} from "@/components/ui/terminal-animation"

const tabs: TabContent[] = [
  {
    label: "install",
    command: "npm install authpool",
    lines: [
      { text: "", delay: 50 },
      { text: "  added 24 packages in 3.1s", color: "text-emerald-400", delay: 500 },
      { text: "", delay: 40 },
      { text: "  ✓ MongoDB connected", color: "text-emerald-400", delay: 250 },
      { text: "  ✓ Passport strategies loaded", color: "text-emerald-400", delay: 180 },
      { text: "  ✓ CSRF protection active", color: "text-emerald-400", delay: 180 },
      { text: "  ✓ Rate limiters configured", color: "text-emerald-400", delay: 180 },
      { text: "", delay: 40 },
      { text: "  🚀 AuthPool running at http://localhost:5000", color: "text-sky-300", delay: 350 },
    ],
  },
  {
    label: "register",
    command: "POST /auth/register",
    lines: [
      { text: "", delay: 50 },
      { text: "  { email, password, name }", color: "text-slate-400", delay: 250 },
      { text: "", delay: 40 },
      { text: "  200 OK", color: "text-emerald-400", delay: 350 },
      { text: `  { "accessToken": "eyJhbGci...", "roles": ["user"] }`, color: "text-sky-300", delay: 150 },
      { text: "", delay: 40 },
      { text: "  Set-Cookie: refreshToken=...; HttpOnly", color: "text-slate-500", delay: 150 },
    ],
  },
  {
    label: "refresh",
    command: "POST /auth/refresh",
    lines: [
      { text: "", delay: 50 },
      { text: "  Cookie: refreshToken=eyJ... (auto)", color: "text-slate-500", delay: 280 },
      { text: "", delay: 40 },
      { text: "  ✓ Old token revoked", color: "text-emerald-400", delay: 320 },
      { text: "  ✓ New pair issued", color: "text-emerald-400", delay: 180 },
      { text: "", delay: 40 },
      { text: `  { "accessToken": "eyJhbGci..." }`, color: "text-sky-300", delay: 220 },
    ],
  },
]

export function HeroSection() {
  const [copied, setCopied] = useState(false)

  // ── Refs for parallax layers ──────────────────────────────────────────
  const sectionRef  = useRef<HTMLElement>(null)
  const orbRef      = useRef<HTMLDivElement>(null)
  const ghostRef    = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const contentRef  = useRef<HTMLDivElement>(null)

  // Heading inView
  const headingRef = useRef<HTMLDivElement>(null)
  const isInView   = useInView(headingRef, { once: true, margin: "0px 0px 0px 0px" })

  // ── Scroll-based parallax via framer-motion ───────────────────────────
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] })

  const orbScrollY      = useTransform(scrollYProgress, [0, 1], [0, -120])
  const ghostScrollY    = useTransform(scrollYProgress, [0, 1], [0, -60])
  const terminalScrollY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const contentScrollY  = useTransform(scrollYProgress, [0, 1], [0, -20])

  // ── Mouse parallax ────────────────────────────────────────────────────
  useEffect(() => {
    let raf: number
    let mx = 0, my = 0
    let cx = 0, cy = 0

    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth  - 0.5)
      my = (e.clientY / window.innerHeight - 0.5)
    }

    const tick = () => {
      cx += (mx - cx) * 0.06
      cy += (my - cy) * 0.06

      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${cx * 48}px, ${cy * 36}px)`
      }
      if (ghostRef.current) {
        ghostRef.current.style.transform = `translate(${cx * -18}px, ${cy * -12}px)`
      }
      if (terminalRef.current) {
        terminalRef.current.style.transform = `translate(${cx * 22}px, ${cy * 16}px)`
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translate(${cx * 8}px, ${cy * 6}px)`
      }

      raf = requestAnimationFrame(tick)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install authpool").catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <motion.section
        ref={sectionRef}
        style={{
          position: "relative",
          minHeight: "100vh",
          // Warm gradient → pure grey gradient
          background: "linear-gradient(180deg, #d8d8d8 0%, #e8e8e8 55%, #ebebeb 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
          paddingTop: "90px",
          paddingBottom: "0",
        }}
      >
        {/* ── Ghost watermark ── */}
        <motion.div
          ref={ghostRef}
          style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            pointerEvents: "none", userSelect: "none", overflow: "hidden",
            y: ghostScrollY,
            willChange: "transform",
          }}
        >
          <span className="ghost-text" style={{ marginBottom: "-0.1em" }}>AUTH</span>
          <span className="ghost-text">POOL</span>
        </motion.div>

        {/* ── Orb ── */}
        <motion.div
          style={{
            position: "absolute",
            top: "50%",
            left: "8%",
            marginTop: `calc(-1 * clamp(170px, 25vw, 300px))`,
            y: orbScrollY,
            willChange: "transform",
          }}
        >
          <div
            ref={orbRef}
            className="orb orb-hero"
            style={{ transition: "none" }}
          />
        </motion.div>

        {/* ── Main text content ── */}
        <motion.div
          style={{
            position: "relative", zIndex: 2,
            maxWidth: "960px", margin: "0 auto",
            padding: "0 36px", width: "100%",
            display: "flex", flexDirection: "column",
            alignItems: "flex-end",
            y: contentScrollY,
            willChange: "transform",
          }}
        >
          <div ref={contentRef} style={{ maxWidth: "660px", width: "100%" }}>

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: "28px" }}
            >
              <span style={{
                fontFamily: "var(--font-sans)",
                fontSize: "10.5px", fontWeight: 400,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "var(--fg-faint)",
                display: "flex", alignItems: "center", gap: "10px",
              }}>
                <span style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  // keep green pulse — it's a status indicator, not a brand color
                  background: "#30d158", display: "inline-block",
                  animation: "pulse 2s ease-in-out infinite",
                }} />
                v{SITE.version} — Now on npm
              </span>
            </motion.div>

            {/* Animated heading */}
            <div ref={headingRef} style={{ marginBottom: "44px" }}>
              <AnimatedHeading
                text={"Not all auth\nstacks are\ncreated equal;\nthey compete."}
                isInView={isInView}
                style={{
                  fontSize: "clamp(3.2rem, 8vw, 7rem)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.03em",
                }}
                italicLine={3}
                italicStyle={{ fontStyle: "italic", color: "var(--fg-muted)" }}
              />
            </div>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}
            >
              <button
                onClick={handleCopy}
                style={{
                  fontFamily: "'SF Mono', 'Fira Code', monospace",
                  fontSize: "13px", fontWeight: 400,
                  // copied state: dark grey instead of red accent
                  color: copied ? "var(--fg)" : "var(--fg)",
                  background: "rgba(17,17,17,0.06)",
                  border: "1px solid rgba(17,17,17,0.14)",
                  borderRadius: "4px", padding: "11px 20px",
                  cursor: "pointer", letterSpacing: "0.02em",
                  transition: "all 0.2s ease",
                  display: "flex", alignItems: "center", gap: "12px",
                }}
              >
                <span>$ npm install authpool</span>
                <span style={{
                  fontSize: "11px", fontFamily: "var(--font-sans)",
                  // copied indicator: black instead of accent-r
                  color: copied ? "var(--fg)" : "var(--fg-faint)",
                  letterSpacing: "0.05em", textTransform: "uppercase", fontWeight: 400,
                }}>
                  {copied ? "Copied ✓" : "Copy"}
                </span>
              </button>

              <Link href={SITE.docs} style={{
                fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300,
                color: "var(--fg-muted)", textDecoration: "none",
                letterSpacing: "0.04em", textTransform: "uppercase",
                borderBottom: "1px solid var(--fg-faint)", paddingBottom: "2px",
                transition: "color 0.2s, border-color 0.2s",
              }}
                onMouseOver={e => { e.currentTarget.style.color = "var(--fg)"; e.currentTarget.style.borderBottomColor = "var(--fg)" }}
                onMouseOut={e => { e.currentTarget.style.color = "var(--fg-muted)"; e.currentTarget.style.borderBottomColor = "var(--fg-faint)" }}
              >
                Read the docs →
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              style={{
                fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 300,
                color: "var(--fg-faint)", letterSpacing: "0.05em",
                textTransform: "uppercase", marginTop: "20px",
              }}
            >
              MIT Licensed · Node 18+
            </motion.p>
          </div>
        </motion.div>

        {/* ── Terminal ── */}
        <motion.div
          style={{
            position: "absolute",
            right: "36px",
            bottom: "60px",
            width: "clamp(300px, 36vw, 460px)",
            zIndex: 3,
            y: terminalScrollY,
            willChange: "transform",
          }}
          className="terminal-hero"
        >
          <motion.div
            ref={terminalRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: "transform" }}
          >
            <TerminalAnimationRoot
              alwaysDark={true}
              tabs={tabs}
              defaultActiveTab={0}
              hideCursorOnComplete={false}
              className="w-full"
            >
              <TerminalAnimationContainer className="w-full">
                <TerminalAnimationWindow
                  className="rounded-xl overflow-hidden"
                  style={{
                    // terminal stays dark — pure black instead of warm #0c0b09
                    background: "rgba(0,0,0,0.96)",
                    backdropFilter: "blur(24px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 24px 80px rgba(0,0,0,0.28), 0 4px 16px rgba(0,0,0,0.16)",
                  } as React.CSSProperties}
                >
                  <TerminalAnimationContent className="p-4 min-h-[200px]">
                    <div style={{ display: "flex", gap: "6px", marginBottom: "14px" }}>
                      {/* Traffic lights kept — they're OS chrome, not brand colors */}
                      {["#ff5f57","#ffbd2e","#28c840"].map(c => (
                        <div key={c} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c }} />
                      ))}
                      <span style={{
                        marginLeft: "auto",
                        fontFamily: "'SF Mono', monospace",
                        fontSize: "9px", color: "rgba(255,255,255,0.18)",
                      }}>authpool</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontFamily: "'SF Mono', monospace", fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>❯</span>
                      <TerminalAnimationCommandBar
                        className="font-mono text-xs"
                        style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'SF Mono', monospace", fontSize: "11px" } as React.CSSProperties}
                        cursor={<TerminalAnimationBlinkingCursor className="bg-white/60 w-[5px] h-[12px] inline-block" />}
                      />
                    </div>
                    <TerminalAnimationOutput
                      className="mt-1"
                      renderLine={(line: TerminalLine, _i: number, visible: boolean) => {
                        if (!visible) return null
                        return (
                          <div>
                            <span className={`font-mono text-[11px] ${line.color ?? "text-white/40"}`}>
                              {line.text || "\u00A0"}
                            </span>
                          </div>
                        )
                      }}
                    />
                    <TerminalAnimationTrailingPrompt style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                      <span style={{ fontFamily: "'SF Mono', monospace", fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>❯</span>
                      <TerminalAnimationBlinkingCursor className="bg-white/60 w-[5px] h-[12px] inline-block" />
                    </TerminalAnimationTrailingPrompt>
                  </TerminalAnimationContent>

                  <div style={{ display: "flex", justifyContent: "center", padding: "10px 16px 14px" }}>
                    <TerminalAnimationTabList style={{
                      display: "inline-flex", gap: "2px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: "8px", padding: "3px",
                    }}>
                      {tabs.map((tab, i) => (
                        <TerminalAnimationTabTrigger
                          key={tab.label}
                          index={i}
                          style={{ cursor: "pointer" }}
                          className="px-3 py-1 rounded-md font-mono text-[10px] transition-all duration-150 data-[state=active]:bg-white data-[state=active]:text-neutral-900 data-[state=active]:font-semibold data-[state=inactive]:text-white/35 data-[state=inactive]:hover:text-white/60"
                        >
                          {tab.label}
                        </TerminalAnimationTabTrigger>
                      ))}
                    </TerminalAnimationTabList>
                  </div>
                </TerminalAnimationWindow>
              </TerminalAnimationContainer>
            </TerminalAnimationRoot>
          </motion.div>
        </motion.div>

        {/* Bottom gradient */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "100px",
          background: "linear-gradient(to bottom, transparent, var(--bg-warm))",
          pointerEvents: "none",
        }} />
      </motion.section>

      <Marquee />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
        @media (max-width: 900px) {
          .terminal-hero {
            position: relative !important;
            right: auto !important;
            bottom: auto !important;
            width: 100% !important;
            padding: 0 36px 40px !important;
          }
        }
      `}</style>
    </>
  )
}