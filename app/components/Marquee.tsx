'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const ITEMS = [
  "Google OAuth", "JWT Rotation", "bcrypt ×12", "CSRF Protection",
  "Rate Limiting", "Redis-Backed", "RBAC", "helmet.js",
  "Refresh Tokens", "Brute-Force Lock", "MongoDB Sessions", "TypeScript Types",
];

export function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!track.current) return;
    const el = track.current;
    const totalW = el.scrollWidth / 2;
    gsap.to(el, {
      x: -totalW,
      duration: 28,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalW),
      },
    });
  }, []);

  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div style={{
      overflow: "hidden",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
      padding: "18px 0",
      background: "var(--bg-warm)",
      position: "relative",
    }}>
      {/* Left fade */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "80px",
        background: "linear-gradient(to right, var(--bg-warm), transparent)",
        zIndex: 2, pointerEvents: "none",
      }} />
      {/* Right fade */}
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "80px",
        background: "linear-gradient(to left, var(--bg-warm), transparent)",
        zIndex: 2, pointerEvents: "none",
      }} />

      <div ref={track} style={{ display: "flex", alignItems: "center", gap: "0", whiteSpace: "nowrap", willChange: "transform" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "28px", paddingRight: "28px" }}>
            <span style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 300,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--fg-muted)",
              whiteSpace: "nowrap",
            }}>
              {item}
            </span>
            <span style={{
              width: "3px", height: "3px", borderRadius: "50%",
              background: "var(--accent-r)", opacity: 0.5, flexShrink: 0,
            }} />
          </span>
        ))}
      </div>
    </div>
  );
}