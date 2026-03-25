"use client";

import Link from "next/link";
import { FOOTER_LINKS, SITE } from "../lib/constants";
import Image from "next/image";

export function Footer() {
  return (
    <footer
      style={{
        background: "#0e0d0b",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "60px 36px 40px",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
        }}
      >
        {/* Top */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "200px repeat(3, 1fr)",
            gap: "40px",
            paddingBottom: "44px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "99px",
                padding: "7px 16px",
                marginBottom: "18px",
              }}
            >
              <Image
                src="/logo-light.png"
                alt="AuthPool Logo"
                width={80}
                height={24}
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "12.5px",
                fontWeight: 300,
                color: "rgba(255,255,255,0.28)",
                lineHeight: 1.65,
                maxWidth: "160px",
                marginBottom: "16px",
              }}
            >
              Plug-and-play authentication for Node.js.
            </p>
            <p
              style={{
                fontFamily: "'SF Mono', monospace",
                fontSize: "10px",
                color: "rgba(255,255,255,0.18)",
                letterSpacing: "0.06em",
              }}
            >
              v{SITE.version} · MIT
            </p>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.group}>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "9.5px",
                  fontWeight: 400,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.22)",
                  marginBottom: "18px",
                }}
              >
                {group.group}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "11px",
                }}
              >
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "13px",
                        fontWeight: 300,
                        color: "rgba(255,255,255,0.38)",
                        textDecoration: "none",
                        transition: "color 0.15s",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.color = "rgba(255,255,255,0.7)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.color = "rgba(255,255,255,0.38)")
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          style={{
            paddingTop: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11.5px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.18)",
            }}
          >
            © {new Date().getFullYear()} AuthPool · Built by{" "}
            <Link
              href="https://github.com/ashbhati26"
              target="_blank"
              style={{
                color: "rgba(255,255,255,0.32)",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.55)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.32)")
              }
            >
              Ashish Bhati
            </Link>
          </p>
          <div style={{ display: "flex", gap: "18px" }}>
            <Link
              href={SITE.github}
              target="_blank"
              aria-label="GitHub"
              style={{
                color: "rgba(255,255,255,0.22)",
                transition: "color 0.15s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.22)")
              }
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </Link>
            <Link
              href={SITE.npm}
              target="_blank"
              aria-label="npm"
              style={{
                color: "rgba(255,255,255,0.22)",
                transition: "color 0.15s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.22)")
              }
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 800 800"
                fill="currentColor"
              >
                <path d="M0 0h800v800H0V0zm100 700h300V200h100v500h100V100H100v600z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid > div:first-child { grid-column: 1 / -1; }
        }
      `}</style>
    </footer>
  );
}
