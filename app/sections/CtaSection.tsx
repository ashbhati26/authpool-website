"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { SITE } from "../lib/constants"

function RevealDiv({ children, delay = 0, style = {} }: any) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.transitionDelay = `${delay}s`
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect() } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return <div ref={ref} className="reveal" style={style}>{children}</div>
}

export function CtaSection() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install authpool").catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section style={{
      // Warm gradient → pure grey gradient
      background: "linear-gradient(180deg, var(--bg-warm) 0%, #dedede 100%)",
      position: "relative",
      overflow: "hidden",
      borderTop: "1px solid var(--border)",
    }}>
      {/* Background orb — grey instead of red/orange */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "clamp(300px, 50vw, 560px)",
        height: "clamp(300px, 50vw, 560px)",
        borderRadius: "50%",
        background: "radial-gradient(circle at 45% 40%, rgba(17,17,17,0.07), rgba(17,17,17,0.03) 55%, transparent 80%)",
        filter: "blur(60px)",
        pointerEvents: "none",
        animation: "ctaOrbPulse 8s ease-in-out infinite",
      }} />

      {/* Ghost text */}
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        pointerEvents: "none",
      }}>
        <span className="ghost-text">SHIP.</span>
      </div>

      <div style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "120px 36px",
        position: "relative",
        zIndex: 1,
        textAlign: "center",
      }}>
        <RevealDiv>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "10.5px",
            fontWeight: 400,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--fg-faint)",
            marginBottom: "20px",
          }}>Get started</p>

          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            fontWeight: 400,
            letterSpacing: "-0.03em",
            lineHeight: 1.0,
            color: "var(--fg)",
            margin: "0 0 20px",
          }}>
            Stop building auth.
          </h2>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            fontWeight: 400,
            letterSpacing: "-0.03em",
            lineHeight: 1.0,
            fontStyle: "italic",
            color: "var(--fg-muted)",
            margin: "0 0 40px",
          }}>
            Start shipping.
          </h2>

          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            fontWeight: 300,
            color: "var(--fg-muted)",
            lineHeight: 1.7,
            maxWidth: "400px",
            margin: "0 auto 44px",
          }}>
            Everything you need for production authentication —
            in the time it takes to run a single install.
          </p>
        </RevealDiv>

        <RevealDiv delay={0.12} style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center", alignItems: "center" }}>
          <button
            onClick={handleCopy}
            style={{
              fontFamily: "'SF Mono', monospace",
              fontSize: "13px",
              // copied state: dark grey instead of accent-r red
              color: copied ? "var(--fg)" : "var(--fg)",
              background: "rgba(17,17,17,0.06)",
              border: "1px solid rgba(17,17,17,0.16)",
              borderRadius: "4px",
              padding: "12px 22px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              transition: "all 0.2s",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 800 800" fill="currentColor">
              <path d="M0 0h800v800H0V0zm100 700h300V200h100v500h100V100H100v600z"/>
            </svg>
            npm install authpool
            <span style={{
              fontFamily: "var(--font-sans)",
              fontSize: "10.5px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              // copied indicator: fg instead of accent-r
              color: copied ? "var(--fg)" : "var(--fg-faint)",
              fontWeight: 400,
            }}>
              {copied ? "Copied ✓" : "Copy"}
            </span>
          </button>

          <Link href={SITE.github} target="_blank" style={{
            fontFamily: "var(--font-sans)",
            fontSize: "12.5px",
            fontWeight: 300,
            color: "var(--fg-muted)",
            textDecoration: "none",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            borderBottom: "1px solid var(--fg-faint)",
            paddingBottom: "2px",
            transition: "color 0.2s, border-color 0.2s",
          }}
            onMouseOver={e => {
              e.currentTarget.style.color = "var(--fg)"
              e.currentTarget.style.borderBottomColor = "var(--fg)"
            }}
            onMouseOut={e => {
              e.currentTarget.style.color = "var(--fg-muted)"
              e.currentTarget.style.borderBottomColor = "var(--fg-faint)"
            }}
          >
            View on GitHub →
          </Link>
        </RevealDiv>

        <RevealDiv delay={0.22} style={{ marginTop: "36px" }}>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            fontWeight: 300,
            color: "var(--fg-faint)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>
            MIT Licensed · Node 18+ · MongoDB required · Redis optional
          </p>
        </RevealDiv>
      </div>

      <style>{`
        @keyframes ctaOrbPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.08); }
        }
      `}</style>
    </section>
  )
}