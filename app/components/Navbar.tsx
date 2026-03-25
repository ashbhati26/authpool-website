"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { NAV_LINKS, SITE } from "../lib/constants";
import Image from "next/image";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handler = () => {
      const currentY = window.scrollY;
      if (currentY < lastScrollY.current || currentY < 40) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      setScrolled(currentY > 20);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className="rounded-md"
      style={{
        position: "fixed",
        top: visible ? "16px" : "-100px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        padding: isMobile ? "8px 14px" : "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: isMobile ? "16px" : "32px",
        transition:
          "top 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.5s ease, box-shadow 0.4s ease",
        // Warm rgba(232,228,220,…) → neutral grey rgba(235,235,235,…)
        background: scrolled
          ? "rgba(235,235,235,0.92)"
          : "rgba(235,235,235,0.70)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: "1px solid rgba(17,17,17,0.10)",
        boxShadow: scrolled
          ? "0 8px 32px rgba(17,17,17,0.12)"
          : "0 2px 12px rgba(17,17,17,0.06)",
        width: "calc(100vw - 32px)",
        maxWidth: "calc(100vw - 32px)",
        boxSizing: "border-box",
      }}
    >
      {/* Logo pill */}
      <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid var(--fg)",
            borderRadius: "6px",
            padding: isMobile ? "5px 12px" : "6px 16px",
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          <Image
            src="/logo-dark.png"
            alt="AuthPool Logo"
            width={isMobile ? 60 : 80}
            height={isMobile ? 20 : 28}
            style={{
              objectFit: "contain",
            }}
          />
        </div>
      </Link>

      {/* Center status — hidden on mobile */}
      {!isMobile && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "4px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 300,
              color: "var(--fg-muted)",
              letterSpacing: "0.01em",
              lineHeight: 1.3,
              whiteSpace: "nowrap",
            }}
          >
            AuthPool is currently{" "}
            <span style={{ color: "var(--fg)" }}>open source.</span>
          </span>
          {/* Accent underline bar — grey instead of red */}
          <span
            style={{
              display: "block",
              width: "28px",
              height: "1.5px",
              background: "var(--fg-muted)",
              borderRadius: "2px",
            }}
          />
        </div>
      )}

      {/* Right side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? "12px" : "0px",
          flexDirection: isMobile ? "row" : "column",
          justifyContent: isMobile ? "flex-end" : undefined,
          flexShrink: 0,
          marginLeft: "auto",
        }}
      >
        {isMobile && (
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "10px",
              fontWeight: 300,
              color: "var(--fg-muted)",
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
            }}
          >
            Open source
          </span>
        )}

        <Link
          href={SITE.github}
          target="_blank"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: isMobile ? "10px" : "11px",
            fontWeight: 300,
            color: "var(--fg-muted)",
            textDecoration: "none",
            letterSpacing: "0.01em",
            transition: "color 0.2s",
            whiteSpace: "nowrap",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "var(--fg)")}
          onMouseOut={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}
        >
          GitHub ↗
        </Link>

        {!isMobile && (
          <span
            style={{
              display: "block",
              width: "16px",
              height: "1.5px",
              background: "var(--fg-faint)",
              borderRadius: "2px",
              alignSelf: "flex-end",
            }}
          />
        )}
      </div>
    </header>
  );
}
