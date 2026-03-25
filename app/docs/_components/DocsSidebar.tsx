"use client"

import { DOCS, DOC_GROUPS } from "../../lib/authpool-docs"

interface SidebarProps {
  activeId: string
  onSelect: (id: string) => void
  isMobileOpen: boolean
  onClose: () => void
}

export function DocsSidebar({ activeId, onSelect, isMobileOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(17,17,17,0.4)",
            backdropFilter: "blur(4px)",
            zIndex: 30,
          }}
        />
      )}

      <nav
        className="docs-sidebar"
        style={{
          width: "220px",
          flexShrink: 0,
          position: "sticky",
          top: "80px",
          alignSelf: "flex-start",
          maxHeight: "calc(100vh - 100px)",
          overflowY: "auto",
          paddingRight: "4px",
        }}
      >
        {DOC_GROUPS.map(group => (
          <div key={group.label} style={{ marginBottom: "28px" }}>
            <p style={{
              fontFamily: "var(--font-sans)", fontSize: "9.5px", fontWeight: 400,
              letterSpacing: "0.13em", textTransform: "uppercase",
              color: "var(--fg-faint)", marginBottom: "10px", paddingLeft: "12px",
            }}>
              {group.label}
            </p>

            {group.ids.map(id => {
              const section = DOCS.find(d => d.id === id)
              if (!section) return null
              const isActive = activeId === id
              return (
                <button
                  key={id}
                  onClick={() => { onSelect(id); onClose() }}
                  style={{
                    width: "100%", display: "flex", alignItems: "center",
                    gap: "10px", padding: "7px 12px", cursor: "pointer",
                    background: isActive ? "rgba(17,17,17,0.07)" : "transparent",
                    border: "none",
                    borderLeft: `2px solid ${isActive ? "rgba(17,17,17,1)" : "transparent"}`,
                    borderRadius: "0 4px 4px 0",
                    textAlign: "left", transition: "all 0.15s",
                  }}
                  onMouseOver={e => { if (!isActive) e.currentTarget.style.background = "rgba(17,17,17,0.04)" }}
                  onMouseOut={e => { if (!isActive) e.currentTarget.style.background = "transparent" }}
                >
                  <span style={{
                    fontFamily: "var(--font-sans)", fontSize: "12.5px", fontWeight: 300,
                    color: isActive ? "var(--fg)" : "var(--fg-muted)",
                    transition: "color 0.15s",
                  }}>
                    {section.label}
                  </span>
                </button>
              )
            })}
          </div>
        ))}
      </nav>
    </>
  )
}