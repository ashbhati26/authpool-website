"use client"

import { type DocSection } from "../../lib/authpool-docs"
import { CodeBlock, Inline } from "./CodeBlock"
import { useReveal } from "./useReveal"

// ─── Extract a runnable command fragment from a prose step ────────────────
const CMD_RE = /(?:npm\s+\S+(?:\s+\S+)*?(?=\s*[—,.]|$)|node\s+\S+|docker\s+\S+(?:\s+\S+)*?(?=\s*[—,.]|$)|curl\s+\S+|(?:const|import|require)\s+[^—.]+?;|startAuthServer\([^)]*\)|[A-Z_]{3,}=\S+)/

function extractCommand(text: string): string | null {
  const m = text.match(CMD_RE)
  return m ? m[0].trim() : null
}

function inferLanguage(code: string) {
  if (code.includes("require(") || code.includes("const ") || code.includes("import ")) return "javascript"
  if (/^[A-Z_]+=/.test(code)) return ".env"
  return "bash"
}

function parseInline(text: string) {
  return text.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith("`") && part.endsWith("`")
      ? <Inline key={i}>{part.slice(1, -1)}</Inline>
      : <span key={i}>{part}</span>
  )
}

const HEADING_CMD_RE = /^(npm |node |docker |curl |POST |GET |const |import )/
function isCommandHeading(heading: string) {
  return HEADING_CMD_RE.test(heading)
}

export function SectionContent({ section }: { section: DocSection }) {
  const { content } = section

  // Each block gets its own dedicated ref.
  // Hooks always run (Rules of Hooks), but each ref is only attached to a node
  // when that block actually renders — so a skipped block never "consumes" a ref
  // that the next visible block depends on, which was the cause of the invisible gap.
  const rTitle      = useReveal(0)
  const rIntro      = useReveal(0.06)
  const rHow        = useReveal(0.10)
  const rCode       = useReveal(0.12)
  const rSteps      = useReveal(0.14)
  const rHighlights = useReveal(0.18)
  const rWhy        = useReveal(0.20)
  const rReference  = useReveal(0.22)

  const pureCommandSteps = content.steps.filter(s => {
    const t = s.text.trim()
    return HEADING_CMD_RE.test(t) || /^[A-Z_]{3,}=/.test(t)
  })
  const codeBlock = pureCommandSteps.map(s => s.text.trim()).join("\n")

  return (
    <div>
      {/* ── Title — always present ── */}
      <div ref={rTitle} className="reveal" style={{ marginBottom: "28px" }}>
        <p style={{
          fontFamily: "var(--font-sans)", fontSize: "10.5px", fontWeight: 400,
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: "var(--fg-faint)", marginBottom: "10px",
        }}>
          {content.eyebrow}
        </p>
        <h1 style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
          fontWeight: 400, letterSpacing: "-0.025em",
          color: "var(--fg)", lineHeight: 1.05, margin: 0,
        }}>
          {content.title}
        </h1>
      </div>

      {/* ── Intro ── */}
      {!!content.intro && (
        <div ref={rIntro} className="reveal" style={{ marginBottom: "32px" }}>
          <p style={{
            fontFamily: "var(--font-sans)", fontSize: "13.5px", fontWeight: 300,
            color: "var(--fg-muted)", lineHeight: 1.8,
            borderLeft: "2px solid rgba(17,17,17,0.3)",
            paddingLeft: "18px", maxWidth: "640px",
          }}>
            {content.intro}
          </p>
        </div>
      )}

      {/* ── How it works ── */}
      {!!content.whatItDoes && (
        <div ref={rHow} className="reveal" style={{ marginBottom: "32px" }}>
          <h3 style={{
            fontFamily: "var(--font-serif)", fontSize: "1.1rem",
            fontWeight: 400, color: "var(--fg)",
            letterSpacing: "-0.01em", marginBottom: "10px",
          }}>
            How it works
          </h3>
          <p style={{
            fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300,
            color: "var(--fg-muted)", lineHeight: 1.8, maxWidth: "620px",
          }}>
            {content.whatItDoes}
          </p>
        </div>
      )}

      {/* ── Top-level code block ── */}
      {!!codeBlock && (
        <div ref={rCode} className="reveal" style={{ marginBottom: "32px" }}>
          <CodeBlock code={codeBlock} language={inferLanguage(codeBlock)} />
        </div>
      )}

      {/* ── Steps ── */}
      {content.steps.length > 0 && (
        <div ref={rSteps} className="reveal" style={{ marginBottom: "32px" }}>
          <h3 style={{
            fontFamily: "var(--font-serif)", fontSize: "1.1rem",
            fontWeight: 400, color: "var(--fg)",
            letterSpacing: "-0.01em", marginBottom: "16px",
          }}>
            Steps
          </h3>
          <ol style={{ listStyle: "none", display: "flex", flexDirection: "column" }}>
            {content.steps.map((step, i) => {
              const cmd = extractCommand(step.text)
              const prose = step.text
                .replace(cmd ?? "", "")
                .replace(/^[:\s—–-]+/, "")
                .replace(/[:\s—–-]+$/, "")
                .trim()

              return (
                <li key={i} style={{
                  borderTop: i === 0 ? "1px solid var(--border)" : "none",
                  borderBottom: "1px solid var(--border)",
                  padding: "12px 0",
                  display: "grid", gridTemplateColumns: "32px 1fr",
                  alignItems: "start",
                }}>
                  <span style={{
                    fontFamily: "var(--font-serif)", fontSize: "1rem",
                    fontWeight: 400, color: "rgba(17,17,17,0.18)",
                    lineHeight: 1.6, paddingTop: "2px",
                  }}>
                    {i + 1}
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {prose && (
                      <span style={{
                        fontFamily: "var(--font-sans)", fontSize: "13px",
                        fontWeight: 300, color: "var(--fg-muted)", lineHeight: 1.75,
                      }}>
                        {prose}
                      </span>
                    )}
                    {cmd && (
                      <code style={{
                        display: "inline-block",
                        fontFamily: "'SF Mono', 'Fira Code', monospace",
                        fontSize: "11.5px",
                        color: "rgba(255,255,255,0.82)",
                        background: "#111111",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "4px",
                        padding: "4px 10px",
                        letterSpacing: "0.01em",
                        lineHeight: 1.5,
                        width: "fit-content",
                      }}>
                        {cmd}
                      </code>
                    )}
                    {!cmd && !prose && (
                      <span style={{
                        fontFamily: "var(--font-sans)", fontSize: "13px",
                        fontWeight: 300, color: "var(--fg-muted)", lineHeight: 1.75,
                      }}>
                        {step.text}
                      </span>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      )}

      {/* ── Key features ── */}
      {content.highlights.length > 0 && (
        <div ref={rHighlights} className="reveal" style={{ marginBottom: "32px" }}>
          <h3 style={{
            fontFamily: "var(--font-serif)", fontSize: "1.1rem",
            fontWeight: 400, color: "var(--fg)",
            letterSpacing: "-0.01em", marginBottom: "14px",
          }}>
            Key features
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {content.highlights.map((h, i) => (
              <div key={i} style={{ display: "flex", alignItems: "start", gap: "12px" }}>
                <div style={{
                  width: "14px", height: "14px", borderRadius: "50%",
                  border: "1px solid rgba(17,17,17,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, marginTop: "3px",
                }}>
                  <div style={{
                    width: "5px", height: "5px", borderRadius: "50%",
                    background: "rgba(17,17,17,0.7)",
                  }} />
                </div>
                <span style={{
                  fontFamily: "var(--font-sans)", fontSize: "13px",
                  fontWeight: 300, color: "var(--fg-muted)", lineHeight: 1.65,
                }}>
                  {h}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Why it matters ── */}
      {!!content.whyItMatters && (
        <div ref={rWhy} className="reveal" style={{
          marginBottom: "32px",
          background: "rgba(17,17,17,0.03)",
          border: "1px solid rgba(17,17,17,0.1)",
          borderRadius: "6px", padding: "16px 20px",
        }}>
          <p style={{
            fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 400,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: "rgba(17,17,17,0.5)", marginBottom: "8px",
          }}>
            Why it matters
          </p>
          <p style={{
            fontFamily: "var(--font-sans)", fontSize: "13px",
            fontWeight: 300, color: "var(--fg-muted)", lineHeight: 1.8, margin: 0,
          }}>
            {content.whyItMatters}
          </p>
        </div>
      )}

      {/* ── Reference ── */}
      {content.items.length > 0 && (
        <div ref={rReference} className="reveal">
          <h3 style={{
            fontFamily: "var(--font-serif)", fontSize: "1.1rem",
            fontWeight: 400, color: "var(--fg)",
            letterSpacing: "-0.01em", marginBottom: "14px",
          }}>
            Reference
          </h3>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {content.items.map((item, i) => (
              <div key={i} style={{
                borderTop: "1px solid var(--border)",
                padding: "14px 0",
                display: "grid", gridTemplateColumns: "160px 1fr",
                gap: "20px", alignItems: "start",
              }}>
                {isCommandHeading(item.heading) ? (
                  <code style={{
                    fontFamily: "'SF Mono', monospace", fontSize: "10.5px",
                    color: "rgba(255,255,255,0.82)",
                    background: "#111111",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "4px", padding: "3px 8px",
                    letterSpacing: "0.01em", lineHeight: 1.5,
                    display: "inline-block", alignSelf: "start",
                  }}>
                    {item.heading}
                  </code>
                ) : (
                  <span style={{
                    fontFamily: "'SF Mono', monospace", fontSize: "11px",
                    color: "var(--fg)", letterSpacing: "0.01em",
                    lineHeight: 1.6, paddingTop: "2px",
                  }}>
                    {item.heading}
                  </span>
                )}
                <span style={{
                  fontFamily: "var(--font-sans)", fontSize: "13px",
                  fontWeight: 300, color: "var(--fg-muted)", lineHeight: 1.75,
                }}>
                  {parseInline(item.body)}
                </span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--border)" }} />
          </div>
        </div>
      )}
    </div>
  )
}