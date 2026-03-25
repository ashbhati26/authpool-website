"use client"

import { useEffect, useRef } from "react"
import { HOW_IT_WORKS } from "../lib/constants"

function RevealDiv({ children, delay = 0, style = {}, className = "" }: any) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.transitionDelay = `${delay}s`
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect() } },
      { threshold: 0.01, rootMargin: "0px 0px -80px 0px" }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return <div ref={ref} className={`reveal ${className}`} style={style}>{children}</div>
}

export function HowItWorksSection() {
  return (
    <section id="how-it-works" style={{
      background: "var(--bg)",
      position: "relative",
      overflow: "hidden",
      borderTop: "1px solid var(--border)",
    }}>
      {/* Ghost "3" */}
      <div style={{
        position: "absolute", right: "-6%", top: "50%", transform: "translateY(-50%)",
        fontFamily: "var(--font-serif)",
        fontSize: "clamp(16rem, 35vw, 36rem)",
        fontWeight: 400, lineHeight: 1,
        color: "transparent",
        WebkitTextStroke: "1px rgba(26,24,22,0.05)",
        userSelect: "none", pointerEvents: "none",
        letterSpacing: "-0.06em",
      }}>3</div>

      <div style={{
        maxWidth: "960px", margin: "0 auto",
        padding: "100px 36px",
        position: "relative", zIndex: 1,
      }}>
        <RevealDiv style={{ marginBottom: "72px" }}>
          <p style={{
            fontFamily: "var(--font-sans)", fontSize: "10.5px", fontWeight: 400,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: "var(--fg-faint)", marginBottom: "16px",
          }}>How it works</p>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
            fontWeight: 400, letterSpacing: "-0.025em",
            color: "var(--fg)", lineHeight: 1.1,
          }}>
            From zero to<br />
            production auth<br />
            <em style={{ fontStyle: "italic", color: "var(--fg-muted)" }}>in three steps.</em>
          </h2>
        </RevealDiv>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {HOW_IT_WORKS.map((step, i) => (
            <RevealDiv key={step.step} delay={i * 0.12}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr 1fr",
                  gap: "0",
                  borderTop: "1px solid var(--border)",
                  padding: "44px 0",
                  alignItems: "start",
                }}
                className="step-row"
              >
                {/* Number */}
                <div style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.4rem, 5vw, 4rem)",
                  fontWeight: 400,
                  color: "rgba(26,24,22,0.1)",
                  lineHeight: 1, letterSpacing: "-0.04em",
                  paddingTop: "4px",
                }}>
                  {i + 1}
                </div>

                {/* Title + desc */}
                <div style={{ paddingRight: "40px" }}>
                  <h3 style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                    fontWeight: 400, color: "var(--fg)",
                    letterSpacing: "-0.02em", lineHeight: 1.15,
                    marginBottom: "14px",
                  }}>{step.title}</h3>
                  <p style={{
                    fontFamily: "var(--font-sans)", fontSize: "12.5px",
                    fontWeight: 300, color: "var(--fg-muted)",
                    lineHeight: 1.75, maxWidth: "260px",
                  }}>{step.description}</p>
                </div>

                {/* Code block */}
                <div style={{
                  background: "rgba(14,13,11,0.96)",
                  borderRadius: "6px", overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}>
                  <div style={{
                    display: "flex", gap: "6px",
                    padding: "10px 14px",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}>
                    {["#ff5f57","#ffbd2e","#28c840"].map(c => (
                      <div key={c} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c }} />
                    ))}
                  </div>
                  <pre style={{
                    padding: "18px 20px",
                    fontFamily: "'SF Mono', 'Fira Code', monospace",
                    fontSize: "12px", lineHeight: 1.85,
                    color: "rgba(255,255,255,0.55)",
                    overflowX: "auto", margin: 0,
                  }}>
                    <code dangerouslySetInnerHTML={{ __html: colorize(step.code) }} />
                  </pre>
                </div>
              </div>
            </RevealDiv>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .step-row { grid-template-columns: 50px 1fr !important; }
          .step-row > div:last-child { grid-column: 1 / -1; margin-top: 16px; }
        }
      `}</style>
    </section>
  )
}

function colorize(code: string): string {
  return code
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/(const|require|import|from)/g, `<span style="color:#bf5af2">$1</span>`)
    .replace(/("(?:[^"\\]|\\.)*")/g, `<span style="color:#30d158">$1</span>`)
    .replace(/(MONGO_URI|JWT_SECRET|SESSION_SECRET)/g, `<span style="color:#ff9f0a">$1</span>`)
    .replace(/(startAuthServer|mongoURI|jwtSecret|sessionSecret)/g, `<span style="color:#5ac8f5">$1</span>`)
}