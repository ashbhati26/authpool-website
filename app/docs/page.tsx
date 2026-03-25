"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { DOCS, DOC_GROUPS } from "../lib/authpool-docs"
import { DocsSidebar } from "./_components/DocsSidebar"
import { DocsHeader } from "./_components/DocsHeader"
import { SectionContent } from "./_components/SectionContent"
import {
  FaqSection,
  ContactSection,
  BugsSection,
  PrivacySection,
  TermsSection,
} from "./_components/CustomSections"

// ─── Route custom section ids to their components ─────────────────────────
const CUSTOM_SECTIONS: Record<string, React.FC> = {
  faq:     FaqSection,
  contact: ContactSection,
  bugs:    BugsSection,
  privacy: PrivacySection,
  terms:   TermsSection,
}

// ─── Breadcrumb ────────────────────────────────────────────────────────────
function Breadcrumb({ activeId, activeLabel }: { activeId: string; activeLabel?: string }) {
  const group = DOC_GROUPS.find(g => g.ids.includes(activeId))
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px" }}>
      {[
        { text: "Docs",           muted: true },
        { text: "/",              faint: true },
        { text: group?.label,     muted: true },
        { text: "/",              faint: true },
        { text: activeLabel,      bold: true  },
      ].map((crumb, i) => (
        <span key={i} style={{
          fontFamily: "var(--font-sans)", fontSize: "11px",
          color: crumb.faint ? "var(--fg-faint)" : crumb.bold ? "var(--fg)" : "var(--fg-muted)",
          fontWeight: crumb.bold ? 400 : 300,
        }}>
          {crumb.text}
        </span>
      ))}
    </div>
  )
}

// ─── Prev / Next navigation ───────────────────────────────────────────────
function PrevNext({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  const allIds = DOC_GROUPS.flatMap(g => g.ids)
  const idx = allIds.indexOf(activeId)
  const prevSection = idx > 0 ? DOCS.find(d => d.id === allIds[idx - 1]) : null
  const nextSection = idx < allIds.length - 1 ? DOCS.find(d => d.id === allIds[idx + 1]) : null

  return (
    <div style={{
      display: "flex", justifyContent: "space-between", gap: "16px",
      marginTop: "48px", paddingTop: "24px",
      borderTop: "1px solid var(--border)",
    }}>
      {prevSection ? (
        <button
          onClick={() => onSelect(prevSection.id)}
          style={{
            fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300,
            color: "var(--fg-muted)", background: "none", border: "none",
            cursor: "pointer", textAlign: "left", padding: 0, transition: "color 0.2s",
          }}
          onMouseOver={e => e.currentTarget.style.color = "var(--fg)"}
          onMouseOut={e => e.currentTarget.style.color = "var(--fg-muted)"}
        >
          <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-faint)", marginBottom: "5px" }}>
            ← Previous
          </div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: "1rem" }}>{prevSection.label}</div>
        </button>
      ) : <div />}

      {nextSection ? (
        <button
          onClick={() => onSelect(nextSection.id)}
          style={{
            fontFamily: "var(--font-sans)", fontSize: "12px", fontWeight: 300,
            color: "var(--fg-muted)", background: "none", border: "none",
            cursor: "pointer", textAlign: "right", padding: 0, transition: "color 0.2s",
          }}
          onMouseOver={e => e.currentTarget.style.color = "var(--fg)"}
          onMouseOut={e => e.currentTarget.style.color = "var(--fg-muted)"}
        >
          <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-faint)", marginBottom: "5px" }}>
            Next →
          </div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: "1rem" }}>{nextSection.label}</div>
        </button>
      ) : <div />}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function DocsPage() {
  const [activeId, setActiveId] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const activeSection = DOCS.find(d => d.id === activeId)

  const handleSelect = useCallback((id: string) => {
    setActiveId(id)
    // Lenis-compatible scroll: use lenis if available, fallback to native
    const lenis = (window as any).__lenis
    if (lenis) {
      lenis.scrollTo(0, { immediate: false, duration: 0.6 })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [])

  // Close sidebar on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setSidebarOpen(false) }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  const CustomSection = activeSection ? CUSTOM_SECTIONS[activeSection.id] : null

  return (
    <>
      <Navbar />

      <DocsHeader
        activeLabel={activeSection?.label}
        onMenuClick={() => setSidebarOpen(o => !o)}
      />

      <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          padding: "0 36px",
          display: "flex", gap: "60px",
          alignItems: "flex-start",
        }}>

          {/*
            ── Sidebar wrapper ────────────────────────────────────────────
            Lenis hijacks window scroll, so `position: sticky` doesn't
            re-trigger layout. We give the sidebar its own fixed-height
            scrollable column that is pinned to the viewport via
            `position: sticky; top: 80px; height: calc(100vh - 96px)`.
            The inner <nav> then overflows-y:auto inside that fixed box.
            Because this wrapper is an independent scroll container, Lenis
            leaves it alone and normal browser overflow scroll works fine.
          */}
          <div style={{
            width: "220px",
            flexShrink: 0,
            position: "sticky",
            top: "80px",
            height: "calc(100vh - 96px)",
            overflowY: "auto",
            // Hide scrollbar on desktop but keep it functional
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(17,17,17,0.12) transparent",
          }}
            className="docs-sidebar-wrapper"
          >
            <DocsSidebar
              activeId={activeId}
              onSelect={handleSelect}
              isMobileOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </div>

          <div ref={contentRef} style={{ flex: 1, minWidth: 0, padding: "48px 0 80px" }}>
            <Breadcrumb activeId={activeId} activeLabel={activeSection?.label} />

            {CustomSection
              ? <CustomSection />
              : activeSection && <SectionContent section={activeSection} />
            }

            <PrevNext activeId={activeId} onSelect={handleSelect} />
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        /* ── Sidebar scrollbar ── */
        .docs-sidebar-wrapper::-webkit-scrollbar { width: 3px; }
        .docs-sidebar-wrapper::-webkit-scrollbar-track { background: transparent; }
        .docs-sidebar-wrapper::-webkit-scrollbar-thumb { background: rgba(17,17,17,0.12); border-radius: 99px; }

        /* ── DocsSidebar inner nav resets (no longer needs its own sticky/height) ── */
        .docs-sidebar {
          width: 100% !important;
          position: static !important;
          top: unset !important;
          max-height: unset !important;
          overflow-y: visible !important;
          padding-right: 0 !important;
          padding-top: 16px;
          padding-bottom: 40px;
        }

        /* ── Mobile: sidebar becomes fixed drawer, wrapper is irrelevant ── */
        @media (max-width: 768px) {
          .docs-sidebar-wrapper {
            display: none !important;
          }
          .docs-sidebar {
            position: fixed !important;
            top: 0 !important; left: 0 !important; bottom: 0 !important;
            width: 260px !important;
            height: 100dvh !important;
            background: var(--bg-warm) !important;
            z-index: 40 !important;
            padding: 80px 24px 40px !important;
            border-right: 1px solid var(--border) !important;
            overflow-y: auto !important;
          }
          .docs-mobile-toggle button { display: flex !important; }
        }

        .docs-sidebar::-webkit-scrollbar { width: 3px; }
        .docs-sidebar::-webkit-scrollbar-thumb { background: var(--border-md); border-radius: 99px; }
      `}</style>
    </>
  )
}