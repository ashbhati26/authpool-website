"use client"

import Link from "next/link"
import { SITE } from "../../lib/constants"

interface DocsHeaderProps {
  activeLabel?: string
  onMenuClick: () => void
}

export function DocsHeader({ activeLabel, onMenuClick }: DocsHeaderProps) {
  return (
    <div style={{
      background: "var(--bg-warm)",
      borderBottom: "1px solid var(--border)",
      paddingTop: "72px",
    }}>
      {/* Title row */}
      <div style={{
        maxWidth: "1100px", margin: "0 auto",
        padding: "28px 36px 0",
        display: "flex", alignItems: "flex-end",
        justifyContent: "space-between", gap: "16px",
      }}>
        <div>
          <p style={{
            fontFamily: "var(--font-sans)", fontSize: "10.5px", fontWeight: 400,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: "var(--fg-faint)", marginBottom: "8px",
          }}>
            Documentation
          </p>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            fontWeight: 400, letterSpacing: "-0.025em",
            color: "var(--fg)", lineHeight: 1.1, margin: 0,
          }}>
            AuthPool{" "}
            <em style={{ fontStyle: "italic", color: "var(--fg-muted)" }}>v{SITE.version}</em>
          </h2>
        </div>

        <div style={{ display: "flex", gap: "14px", alignItems: "center", paddingBottom: "4px" }}>
          {[{ label: "GitHub ↗", href: SITE.github }, { label: "npm ↗", href: SITE.npm }].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              style={{
                fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 300,
                color: "var(--fg-muted)", textDecoration: "none",
                letterSpacing: "0.04em", textTransform: "uppercase",
                borderBottom: "1px solid var(--fg-faint)", paddingBottom: "2px",
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
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile menu toggle */}
      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "12px 36px 0" }}
        className="docs-mobile-toggle"
      >
        <button
          onClick={onMenuClick}
          style={{
            display: "none",
            alignItems: "center", gap: "8px",
            fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300,
            color: "var(--fg-muted)", background: "rgba(17,17,17,0.05)",
            border: "1px solid var(--border)", borderRadius: "4px",
            padding: "8px 14px", cursor: "pointer",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="1" y1="4" x2="13" y2="4" />
            <line x1="1" y1="7" x2="13" y2="7" />
            <line x1="1" y1="10" x2="13" y2="10" />
          </svg>
          {activeLabel ?? "Menu"}
        </button>
      </div>
    </div>
  )
}