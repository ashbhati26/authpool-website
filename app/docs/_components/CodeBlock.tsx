"use client"

import { useState } from "react"

// ─── Syntax highlighter ─────────────────────────────────────────────────────
// Rules are intentionally narrow — only highlight things that are
// unambiguously code tokens, never prose words that happen to match.
function highlight(raw: string): string {
  const esc = raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

  return esc
    // Comments — must come first so they swallow everything on the line
    .replace(/(#[^\n]+)/g,
      `<span style="color:rgba(255,255,255,0.38)">$1</span>`)
    // String literals — double-quoted only (avoids false positives on apostrophes)
    .replace(/("(?:[^"\\]|\\.)*")/g,
      `<span style="color:#30d158">$1</span>`)
    // JS keywords — only at word boundaries, lowercase only
    .replace(/\b(const|let|require|import|from|export|async|await|return)\b/g,
      `<span style="color:#bf5af2">$1</span>`)
    // ENV var names — ALL_CAPS_WITH_UNDERSCORES at start of word
    .replace(/\b(MONGO_URI|JWT_SECRET|SESSION_SECRET|GOOGLE_CLIENT_ID|GOOGLE_CLIENT_SECRET|GOOGLE_CALLBACK_URL|REDIS_URL|REDIS_HOST|REDIS_PORT|CSRF_SECRET|PORT)\b/g,
      `<span style="color:#ff9f0a">$1</span>`)
    // AuthPool-specific API identifiers — exact names only
    .replace(/\b(startAuthServer|verifyJWT|authorizeRoles|mongoURI|jwtSecret|sessionSecret|transformUser|onReady)\b/g,
      `<span style="color:#5ac8f5">$1</span>`)
    // HTTP routes — exact /auth/… paths only
    .replace(/(\/auth\/[a-z][a-z\-/]*)/g,
      `<span style="color:#ff9f0a">$1</span>`)
    // Shell commands — npm/node/docker/curl only at line start or after whitespace
    .replace(/((?:^|\n)([ \t]*)(npm |node |docker |curl ))/g,
      `$2<span style="color:#ff9f0a">$3</span>`)
}

// ─── CodeBlock ──────────────────────────────────────────────────────────────
export function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{
      background: "#0d0d0d",
      borderRadius: "6px",
      border: "1px solid rgba(255,255,255,0.09)",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Traffic lights + language label */}
      <div style={{
        display: "flex", alignItems: "center",
        gap: "6px", padding: "9px 14px",
        background: "#0d0d0d",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        {["#ff5f57", "#ffbd2e", "#28c840"].map(c => (
          <div key={c} style={{ width: "8px", height: "8px", borderRadius: "50%", background: c }} />
        ))}
        <span style={{
          marginLeft: "auto",
          fontFamily: "'SF Mono', monospace",
          fontSize: "9px",
          color: "rgba(255,255,255,0.28)",
          letterSpacing: "0.08em",
        }}>
          {language}
        </span>
      </div>

      {/* Code body */}
      <pre style={{
        margin: 0,
        padding: "16px 20px",
        overflowX: "auto",
        background: "#0d0d0d",
        fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', monospace",
        fontSize: "12px",
        lineHeight: 1.9,
        color: "rgba(255,255,255,0.72)",
        tabSize: 2,
      }}>
        <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
      </pre>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        style={{
          position: "absolute", top: "7px", right: "10px",
          fontFamily: "var(--font-sans)",
          fontSize: "9.5px", fontWeight: 400,
          letterSpacing: "0.07em", textTransform: "uppercase",
          color: copied ? "rgba(48,209,88,0.9)" : "rgba(255,255,255,0.28)",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: "3px", padding: "4px 9px",
          cursor: "pointer", transition: "color 0.2s, background 0.2s",
        }}
        onMouseOver={e => { if (!copied) e.currentTarget.style.color = "rgba(255,255,255,0.65)" }}
        onMouseOut={e => { if (!copied) e.currentTarget.style.color = "rgba(255,255,255,0.28)" }}
      >
        {copied ? "Copied ✓" : "Copy"}
      </button>
    </div>
  )
}

// ─── Inline code ────────────────────────────────────────────────────────────
export function Inline({ children }: { children: string }) {
  return (
    <code style={{
      fontFamily: "'SF Mono', monospace",
      fontSize: "11.5px",
      color: "var(--fg)",
      background: "rgba(17,17,17,0.07)",
      border: "1px solid rgba(17,17,17,0.09)",
      padding: "1px 6px",
      borderRadius: "3px",
    }}>
      {children}
    </code>
  )
}