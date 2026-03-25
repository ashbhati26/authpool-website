"use client"

import { useState } from "react"
import { useReveal } from "./useReveal"
import { SITE } from "../../lib/constants"

// ─── Shared eyebrow label ──────────────────────────────────────────────────
function Eyebrow({ label }: { label: string }) {
  return (
    <p style={{
      fontFamily: "var(--font-sans)", fontSize: "10.5px", fontWeight: 400,
      letterSpacing: "0.14em", textTransform: "uppercase",
      color: "var(--fg-faint)", marginBottom: "14px",
    }}>
      {label}
    </p>
  )
}

function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 style={{
      fontFamily: "var(--font-serif)",
      fontSize: "clamp(2rem, 4vw, 3.2rem)",
      fontWeight: 400, letterSpacing: "-0.025em",
      color: "var(--fg)", lineHeight: 1.05, marginBottom: "40px",
    }}>
      {children}
    </h1>
  )
}

// ─── FAQ ───────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  { q: "Is AuthPool free?", a: "Yes — MIT licensed. Free to use, modify, and distribute forever." },
  { q: "Does it work with TypeScript?", a: "Yes. AuthPool ships with types/index.d.ts for full autocomplete on the config object and exported middleware." },
  { q: "Do I need Redis?", a: "No. Redis is optional. Without it, rate limiters and brute-force counters live in memory — correct for a single process, but they reset on restart." },
  { q: "Can I add my own routes?", a: "Yes. Pass an onReady callback to startAuthServer(). It receives the Express app after all AuthPool routes are registered." },
  { q: "Does it support multiple databases?", a: "Currently MongoDB only, via Mongoose. The refresh token store, session store, and user model all use Mongoose under the hood." },
  { q: "Can one user log in via both Google and email?", a: "Yes. AuthPool upserts on email, so a user who registers via email can also log in via Google with the same address." },
  { q: "How do I run it in production?", a: "Point MONGO_URI at Atlas, set strong secrets (32+ random characters), configure Redis for multi-server deployments, and run behind a reverse proxy (nginx, Caddy) for HTTPS." },
  { q: "What Node.js version is required?", a: "Node 18+. AuthPool uses crypto.randomUUID() and native fetch internally." },
]

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)
  const r = useReveal(0)

  return (
    <div ref={r} className="reveal">
      <Eyebrow label="Support" />
      <PageTitle>
        Frequently Asked<br />
        <em style={{ fontStyle: "italic", color: "var(--fg-muted)" }}>Questions</em>
      </PageTitle>

      {FAQ_ITEMS.map((item, i) => (
        <div key={i} style={{
          borderTop: i === 0 ? "1px solid var(--border)" : "none",
          borderBottom: "1px solid var(--border)",
        }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: "100%", display: "flex", alignItems: "center",
              justifyContent: "space-between",
              padding: "18px 0", cursor: "pointer",
              background: "none", border: "none", textAlign: "left",
            }}
          >
            <span style={{
              fontFamily: "var(--font-serif)", fontSize: "1.05rem",
              fontWeight: 400, color: "var(--fg)", letterSpacing: "-0.01em",
            }}>
              {item.q}
            </span>
            <span style={{
              fontFamily: "var(--font-serif)", fontSize: "1.4rem",
              color: "var(--fg-faint)", lineHeight: 1,
              transition: "transform 0.2s",
              transform: open === i ? "rotate(45deg)" : "none",
              flexShrink: 0, marginLeft: "16px",
            }}>
              +
            </span>
          </button>
          {open === i && (
            <p style={{
              fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300,
              color: "var(--fg-muted)", lineHeight: 1.8,
              paddingBottom: "18px", maxWidth: "520px", margin: 0,
            }}>
              {item.a}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Contact ───────────────────────────────────────────────────────────────
const CONTACT_LINKS = [
  { label: "GitHub Issues",      href: SITE.github + "/issues",      desc: "Bug reports, feature requests, and general discussion." },
  { label: "GitHub Discussions", href: SITE.github + "/discussions",  desc: "Questions, ideas, and community help." },
  { label: "npm Package",        href: SITE.npm,                      desc: "Latest versions, changelogs, and download stats." },
]

export function ContactSection() {
  const r = useReveal(0)

  return (
    <div ref={r} className="reveal">
      <Eyebrow label="Support" />
      <PageTitle>Get in touch.</PageTitle>

      <div style={{ display: "flex", flexDirection: "column", gap: "1px", maxWidth: "540px" }}>
        {CONTACT_LINKS.map((item, i) => (
          <a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
            style={{
              display: "grid", gridTemplateColumns: "140px 1fr 24px",
              gap: "20px", alignItems: "center",
              borderTop: "1px solid var(--border)",
              padding: "18px 0", textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseOver={e => e.currentTarget.style.opacity = "0.65"}
            onMouseOut={e => e.currentTarget.style.opacity = "1"}
          >
            <span style={{ fontFamily: "'SF Mono', monospace", fontSize: "11px", color: "var(--fg)", letterSpacing: "0.01em" }}>
              {item.label}
            </span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300, color: "var(--fg-muted)", lineHeight: 1.65 }}>
              {item.desc}
            </span>
            <span style={{ color: "var(--fg-faint)", fontFamily: "var(--font-sans)", fontSize: "14px" }}>↗</span>
          </a>
        ))}
        <div style={{ borderTop: "1px solid var(--border)" }} />
      </div>
    </div>
  )
}

// ─── Bugs ──────────────────────────────────────────────────────────────────
export function BugsSection() {
  const r = useReveal(0)

  return (
    <div ref={r} className="reveal">
      <Eyebrow label="Support" />
      <PageTitle>Report a bug.</PageTitle>

      <p style={{
        fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300,
        color: "var(--fg-muted)", lineHeight: 1.8, maxWidth: "500px",
        marginBottom: "36px",
      }}>
        Found something broken? Open an issue on GitHub with a minimal
        reproduction — Node version, what you expected, what happened.
        Good bug reports get fast fixes.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <a href={SITE.github + "/issues/new"} target="_blank" rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: "12px",
            fontFamily: "var(--font-sans)", fontSize: "12.5px", fontWeight: 300,
            color: "var(--fg)", textDecoration: "none",
            background: "rgba(17,17,17,0.06)",
            border: "1px solid rgba(17,17,17,0.14)",
            borderRadius: "4px", padding: "13px 22px",
            transition: "background 0.2s", width: "fit-content",
          }}
          onMouseOver={e => e.currentTarget.style.background = "rgba(17,17,17,0.1)"}
          onMouseOut={e => e.currentTarget.style.background = "rgba(17,17,17,0.06)"}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.6 }}>
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          Open an issue on GitHub →
        </a>

        <p style={{
          fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 300,
          color: "var(--fg-faint)", letterSpacing: "0.05em", textTransform: "uppercase",
        }}>
          Include: Node version · AuthPool version · Minimal reproduction
        </p>
      </div>
    </div>
  )
}

// ─── Privacy ───────────────────────────────────────────────────────────────
const PRIVACY_ITEMS = [
  { title: "No data collected",  body: "AuthPool is a Node.js library. It runs entirely on your server and collects no data about you or your users." },
  { title: "npm telemetry",      body: "npm may collect download counts. This is standard npm behaviour and is not controlled by AuthPool." },
  { title: "GitHub",             body: "If you star, fork, or open issues on the repository, GitHub's privacy policy applies." },
  { title: "Your data",          body: "AuthPool stores user records in your MongoDB database, in your infrastructure. You own and control that data." },
]

export function PrivacySection() {
  const r = useReveal(0)

  return (
    <div ref={r} className="reveal">
      <Eyebrow label="Legal" />
      <PageTitle>Privacy Policy</PageTitle>

      <div style={{ display: "flex", flexDirection: "column", gap: "28px", maxWidth: "560px" }}>
        {PRIVACY_ITEMS.map((item, i) => (
          <div key={i}>
            <h3 style={{
              fontFamily: "var(--font-serif)", fontSize: "1.05rem",
              fontWeight: 400, color: "var(--fg)",
              letterSpacing: "-0.01em", marginBottom: "8px",
            }}>
              {item.title}
            </h3>
            <p style={{
              fontFamily: "var(--font-sans)", fontSize: "13px",
              fontWeight: 300, color: "var(--fg-muted)", lineHeight: 1.8, margin: 0,
            }}>
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Terms ─────────────────────────────────────────────────────────────────
const TERMS_ITEMS = [
  { title: "You may",     body: "Use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of AuthPool or software built with it." },
  { title: "You must",    body: "Include the MIT license notice and copyright in all copies or substantial portions of the software." },
  { title: "No warranty", body: `AuthPool is provided "as is", without warranty of any kind. The author is not liable for any claim, damage, or liability arising from its use.` },
]

export function TermsSection() {
  const r = useReveal(0)

  return (
    <div ref={r} className="reveal">
      <Eyebrow label="Legal" />
      <PageTitle>Terms of Service</PageTitle>

      <p style={{
        fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300,
        color: "var(--fg-muted)", lineHeight: 1.8,
        maxWidth: "560px", marginBottom: "32px",
      }}>
        AuthPool is published under the MIT License. The full license text is in
        the repository at{" "}
        <code style={{ fontFamily: "'SF Mono', monospace", fontSize: "11.5px", color: "var(--fg)" }}>LICENSE</code>.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0", maxWidth: "560px" }}>
        {TERMS_ITEMS.map((item, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "80px 1fr",
            gap: "20px", borderTop: "1px solid var(--border)", paddingTop: "20px", paddingBottom: "20px",
          }}>
            <span style={{
              fontFamily: "var(--font-serif)", fontSize: "0.95rem",
              fontWeight: 400, color: "var(--fg-faint)", fontStyle: "italic",
            }}>
              {item.title}
            </span>
            <p style={{
              fontFamily: "var(--font-sans)", fontSize: "13px",
              fontWeight: 300, color: "var(--fg-muted)", lineHeight: 1.8, margin: 0,
            }}>
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}