"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { SECURITY_LAYERS } from "../lib/constants"

function RevealDiv({ children, delay = 0, style = {}, className = "" }: any) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.transitionDelay = `${delay}s`
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect() } },
      { threshold: 0.01, rootMargin: "0px 0px -60px 0px" }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return <div ref={ref} className={`reveal ${className}`} style={style}>{children}</div>
}

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1400
    const step = 16
    const increment = target / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, step)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

function useParallaxY(
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"],
  inputRange: [number, number],
  outputRange: [number, number],
  springConfig = { stiffness: 60, damping: 18 }
) {
  const raw = useTransform(scrollYProgress, inputRange, outputRange)
  return useSpring(raw, springConfig)
}

export function SecuritySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })

  const ghostY  = useParallaxY(scrollYProgress, [0, 1], [80, -80])
  const orbY    = useParallaxY(scrollYProgress, [0, 1], [-40, 40])
  const orbY2   = useParallaxY(scrollYProgress, [0, 1], [30, -50])
  const gridY   = useParallaxY(scrollYProgress, [0, 1], [20, -20], { stiffness: 40, damping: 14 })

  const labelY   = useParallaxY(scrollYProgress, [0.1, 0.9], [18, -18], { stiffness: 50, damping: 16 })
  const counterY = useParallaxY(scrollYProgress, [0.1, 0.9], [30, -30], { stiffness: 45, damping: 16 })
  const bodyY    = useParallaxY(scrollYProgress, [0.1, 0.9], [22, -22], { stiffness: 55, damping: 18 })
  const pillsY   = useParallaxY(scrollYProgress, [0.1, 0.9], [14, -14], { stiffness: 60, damping: 20 })
  const listX    = useParallaxY(scrollYProgress, [0.1, 0.6], [24, 0],   { stiffness: 50, damping: 18 })

  const leftRef    = useRef<HTMLDivElement>(null)
  const leftInView = useInView(leftRef, { once: true, margin: "0px 0px -60px 0px" })

  return (
    <section
      id="security"
      ref={sectionRef}
      // Pure black instead of warm #111009
      style={{ background: "#0a0a0a", position: "relative", overflow: "hidden" }}
    >
      {/* Noise texture */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "120px",
      }} />

      {/* Dot-grid */}
      <motion.div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        y: gridY,
      }} />

      {/* Ghost "14" */}
      <motion.div
        style={{
          position: "absolute", bottom: "-10%", left: "-4%", y: ghostY,
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(18rem, 40vw, 44rem)",
          fontWeight: 400, lineHeight: 1,
          color: "transparent",
          // Slightly brighter on pure black
          WebkitTextStroke: "1px rgba(255,255,255,0.05)",
          userSelect: "none", pointerEvents: "none",
          letterSpacing: "-0.08em",
        }}
      >
        14
      </motion.div>

      {/* Orb top-right — white/grey instead of red/orange */}
      <motion.div style={{
        position: "absolute", top: "-80px", right: "-80px",
        width: "360px", height: "360px", borderRadius: "50%",
        background: "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.07), rgba(200,200,200,0.03) 60%, transparent 80%)",
        filter: "blur(40px)", pointerEvents: "none",
        y: orbY,
      }} />

      {/* Orb bottom-left — grey instead of blue */}
      <motion.div style={{
        position: "absolute", bottom: "-60px", left: "10%",
        width: "280px", height: "280px", borderRadius: "50%",
        background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05), rgba(180,180,180,0.02) 60%, transparent 80%)",
        filter: "blur(50px)", pointerEvents: "none",
        y: orbY2,
      }} />

      <div style={{
        maxWidth: "960px", margin: "0 auto",
        padding: "100px 36px",
        position: "relative", zIndex: 1,
      }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}
          className="sec-grid"
        >
          {/* ── Left panel ── */}
          <div ref={leftRef} style={{ position: "sticky", top: "100px" }}>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-sans)", fontSize: "10.5px", fontWeight: 400,
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)", marginBottom: "20px",
                translateY: labelY,
                display: "block",
              }}
            >
              Security
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: "20px", translateY: counterY }}
            >
              <span style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(5rem, 12vw, 9rem)",
                fontWeight: 400,
                // Pure white instead of warm #f5f2ec
                color: "#ffffff",
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                display: "block",
              }}>
                <CountUp target={14} />
              </span>
              <span style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                fontWeight: 400,
                fontStyle: "italic",
                // Pure white at low opacity instead of warm rgba(245,242,236,0.4)
                color: "rgba(255,255,255,0.35)",
                display: "block",
                letterSpacing: "-0.02em",
                marginTop: "4px",
              }}>
                layers, all on by default.
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-sans)", fontSize: "13px",
                fontWeight: 300, color: "rgba(255,255,255,0.32)",
                lineHeight: 1.75, maxWidth: "280px", marginBottom: "36px",
                translateY: bodyY,
                display: "block",
              }}
            >
              Security is not a configuration option. Every layer activates
              the moment you call{" "}
              <code style={{
                fontFamily: "'SF Mono', monospace", fontSize: "11.5px",
                color: "rgba(255,255,255,0.55)",
                background: "rgba(255,255,255,0.06)",
                padding: "1px 6px", borderRadius: "3px",
              }}>startAuthServer()</code>.
            </motion.p>

            {/* Stat pills */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", gap: "10px", flexWrap: "wrap", translateY: pillsY }}
            >
              {[
                { n: 30, label: "tests" },
                { n: 1, label: "function" },
                { n: 0, label: "config files" },
              ].map((s) => (
                <div key={s.label} style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "4px",
                  padding: "10px 16px",
                  textAlign: "center",
                }}>
                  <div style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.6rem", fontWeight: 400,
                    // Pure white instead of warm #f5f2ec
                    color: "#ffffff", lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}>
                    <CountUp target={s.n} />
                  </div>
                  <div style={{
                    fontFamily: "var(--font-sans)", fontSize: "10px",
                    fontWeight: 300, color: "rgba(255,255,255,0.3)",
                    marginTop: "4px", letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: layer list ── */}
          <motion.div
            style={{ display: "flex", flexDirection: "column", gap: "4px", translateX: listX }}
          >
            {SECURITY_LAYERS.map((layer, i) => (
              <RevealDiv key={layer.label} delay={0.03 + i * 0.03}>
                <SecurityLayer layer={layer} index={i} scrollYProgress={scrollYProgress} total={SECURITY_LAYERS.length} />
              </RevealDiv>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .sec-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .sec-grid > div:first-child { position: relative !important; top: 0 !important; }
        }
      `}</style>
    </section>
  )
}

function SecurityLayer({
  layer, index, scrollYProgress, total
}: {
  layer: { label: string; desc: string }
  index: number
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"]
  total: number
}) {
  const [hovered, setHovered] = useState(false)

  const depthFactor = 1 - (index / total) * 0.6
  const magnitude   = 20 * depthFactor
  const rawY = useTransform(scrollYProgress, [0.15, 0.85], [magnitude, -magnitude])
  const y    = useSpring(rawY, { stiffness: 55 + index * 2, damping: 18 })

  return (
    <motion.div
      style={{ y }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.012, x: 4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      <div
        style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
          padding: "13px 16px", borderRadius: "4px",
          border: `1px solid ${hovered ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)"}`,
          background: hovered ? "rgba(255,255,255,0.03)" : "transparent",
          cursor: "default",
          transition: "border-color 0.2s, background 0.2s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Dot — white/grey instead of green */}
          <div style={{
            width: "14px", height: "14px", borderRadius: "50%",
            border: `1px solid ${hovered ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.2)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, transition: "border-color 0.2s",
          }}>
            <div style={{
              width: "5px", height: "5px", borderRadius: "50%",
              background: hovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.4)",
              transition: "background 0.2s, transform 0.2s",
              transform: hovered ? "scale(1.2)" : "scale(1)",
            }} />
          </div>
          <span style={{
            fontFamily: "'SF Mono', monospace", fontSize: "11.5px",
            color: hovered ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)",
            letterSpacing: "0.01em",
            transition: "color 0.2s",
          }}>{layer.label}</span>
        </div>
        <span style={{
          fontFamily: "var(--font-sans)", fontSize: "11px",
          fontWeight: 300,
          color: hovered ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.2)",
          letterSpacing: "0.02em",
          transition: "color 0.2s",
        }}>{layer.desc}</span>
      </div>
    </motion.div>
  )
}