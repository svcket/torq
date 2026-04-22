"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";

// ── Event data (5 states) ────────────────────────────────────────────────────
const EVENTS = [
  {
    id: "drift",
    title: "TOR\u2019Q DRIFT WEEKEND \u201926 \u2014 SEASON 2",
    description: "A live drift showcase where machine control, custom builds, and crowd energy meet in a charged urban setting.",
    date: "SAT. 15 MAY, 2026 \u00a0|\u00a0 14:30",
    venue: "TOR\u2019Q ARENA (ZODIAC), OPPOSITE LANDMARK, VI",
    highlights: ["NIGHT DRIFT SESSIONS", "VIP PIT ACCESS", "MUSIC \u0026 CROWD ATMOSPHERE"],
    lineups: ["JAY BASH", "CAPTAIN AWAL", "AUTO CRAFT"],
    mediaUrl: "https://images.unsplash.com/photo-1547395058-0056158dc1aa?q=80&w=2000&auto=format&fit=crop",
    mediaType: "image",
  },
  {
    id: "mud",
    title: "TOR\u2019Q MUD CIRCUIT \u201926",
    description: "A high-intensity motocross showcase where speed meets lift, and every jump cuts through mud, noise, and crowd pressure.",
    date: "SAT. 15 MAY, 2026 \u00a0|\u00a0 14:30",
    venue: "TOR\u2019Q ARENA (MUTANDA), GWARIMPA, ABUJA",
    highlights: ["MOTOCROSS SHOW RUNS", "ELEVATED JUMP SEQUENCES", "TRACKSIDE VIP ACCESS"],
    lineups: ["JAY BASH", "CAPTAIN AWAL", "AUTO CRAFT"],
    mediaUrl: "https://images.unsplash.com/photo-1571415124119-3543165b4c10?q=80&w=2000&auto=format&fit=crop",
    mediaType: "image",
  },
  {
    id: "cars",
    title: "CARS \u0026 COFFEE \u201926",
    description: "A community meet where custom builds face off. Grab a brew, lift the bonnet, and connect with fellow enthusiasts over raw horsepower and exhaust notes.",
    date: "SAT. 15 MAY, 2026 \u00a0|\u00a0 14:30",
    venue: "TAFAWA BALEWA SQUARE, CMS, LAGOS ISLAND",
    highlights: ["VIP PIT ACCESS", "COMMUNITY MEET HOURS", "TRACKSIDE PARKING"],
    lineups: ["JAY BASH", "CAPTAIN AWAL", "AUTO CRAFT"],
    mediaUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2000&auto=format&fit=crop",
    mediaType: "image",
  },
  {
    id: "ice",
    title: "AFTER DARK ICE GLIDE",
    description: "A seasonal night experience where movement shifts from speed to glide, bringing people together through skating, sound, and shared atmosphere.",
    date: "SAT. 15 MAY, 2026 \u00a0|\u00a0 14:30",
    venue: "TAFAWA BALEWA SQUARE, CMS, LAGOS ISLAND",
    highlights: ["COMMUNITY SKATE HOURS", "ELEVATED JUMP SEQUENCES", "TRACKSIDE VIP ACCESS"],
    lineups: ["JAY BASH", "CAPTAIN AWAL", "AUTO CRAFT"],
    mediaUrl: "https://images.unsplash.com/photo-1548679099-2b73b5aeaf0c?q=80&w=2000&auto=format&fit=crop",
    mediaType: "image",
  },
  {
    id: "skate",
    title: "SKATE RHAPSODY \u201926",
    description: "A concrete bowl takeover featuring underground riders, high-air tricks, and a raw soundscape that amplifies every landing.",
    date: "SAT. 15 MAY, 2026 \u00a0|\u00a0 14:30",
    venue: "TAFAWA BALEWA SQUARE, CMS, LAGOS ISLAND",
    highlights: ["COMMUNITY SKATE HOURS", "ELEVATED JUMP SEQUENCES", "TRACKSIDE VIP ACCESS"],
    lineups: ["JAY BASH", "CAPTAIN AWAL", "AUTO CRAFT"],
    mediaUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2000&auto=format&fit=crop",
    mediaType: "image",
  },
];

// ── Utils ────────────────────────────────────────────────────────────────────
function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function norm(p: number, start: number, end: number) {
  return easeInOut(clamp((p - start) / (end - start), 0, 1));
}

function Dot() {
  return (
    <div
      style={{
        width: 4,
        height: 4,
        borderRadius: "50%",
        backgroundColor: "#111",
        flexShrink: 0,
        marginTop: 6,
      }}
    />
  );
}

function Divider({ mb = 28 }: { mb?: number }) {
  return <div style={{ height: 1, backgroundColor: "#EBEBEB", marginBottom: mb }} />;
}

// ── Section ──────────────────────────────────────────────────────────────────
export default function EventsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // We map overall scroll 0..1 to Phase 1 (split) and then 5 events scrub
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Track active index based on scroll position safely
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.25) setActiveIndex(0);
    else if (latest < 0.42) setActiveIndex(1);
    else if (latest < 0.59) setActiveIndex(2);
    else if (latest < 0.76) setActiveIndex(3);
    else setActiveIndex(4);
  });

  // ── Layout Phase 1 (Screen splits into 72/28) ─────────────────────────
  const splitEnd = 0.15;

  const mediaWidth = useTransform(scrollYProgress, (p) => {
    const t = norm(p, 0.0, splitEnd);
    return `${100 + (72 - 100) * t}vw`;
  });

  const rightPanelX = useTransform(scrollYProgress, (p) => {
    const t = norm(p, 0.08, splitEnd);
    return `${(1 - t) * 100}%`;
  });

  // Travels diagonally to top left of the white panel
  const labelTop = useTransform(scrollYProgress, (p) => {
    const t = norm(p, 0.0, splitEnd);
    return `calc(85vh + (41px - 85vh) * ${t})`;
  });

  const labelLeft = useTransform(scrollYProgress, (p) => {
    const tFull = clamp(p / splitEnd, 0, 1);
    const tRight = easeInOut(clamp((tFull - 0.4) / 0.6, 0, 1));
    return `calc(50vw + ((72vw + 40px) - 50vw) * ${tRight})`;
  });

  const labelTransX = useTransform(scrollYProgress, (p) => {
    const tFull = clamp(p / splitEnd, 0, 1);
    const tRight = easeInOut(clamp((tFull - 0.4) / 0.6, 0, 1));
    return `${(1 - tFull) * -50}%`; // Initial -50% for center, migrates to 0 for side
  });

  const labelFontSize = useTransform(scrollYProgress, (p) => {
    const t = norm(p, 0.0, splitEnd);
    return `${Math.round(76 + (16 - 76) * t)}px`;
  });

  // Fade from white #FFFFFF -> warm gray #9C8981 (rgb 156,137,129)
  const labelColor = useTransform(scrollYProgress, (p) => {
    const t = norm(p, 0.08, splitEnd);
    const r = Math.round(255 + (156 - 255) * t);
    const g = Math.round(255 + (137 - 255) * t);
    const b = Math.round(255 + (129 - 255) * t);
    return `rgb(${r},${g},${b})`;
  });

  const labelLetterSpacing = useTransform(scrollYProgress, (p) => {
    const t = norm(p, 0.0, splitEnd);
    return `${0.08 + (0.02 - 0.08) * t}em`;
  });

  return (
    <section ref={sectionRef} style={{ height: "600vh", position: "relative" }} aria-label="TORQ Upcoming Events">
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", backgroundColor: "#000" }}>
        
        {/* ── MEDIA PANEL (LEFT, 72vw) ───────────────────────── */}
        <motion.div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: mediaWidth, overflow: "hidden" }}>
          
          <AnimatePresence>
            <motion.div
              key={EVENTS[activeIndex].id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ position: "absolute", inset: 0 }}
            >
              <img src={EVENTS[activeIndex].mediaUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
            </motion.div>
          </AnimatePresence>

          {/* Core darkening gradient for text visibility, applied strict to image container */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: "7%",
              right: "22px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
              zIndex: 10,
            }}
          >
            {EVENTS.map((_, idx) => (
              <div
                key={idx}
                style={{
                  width: "2px",
                  height: activeIndex === idx ? "26px" : "18px",
                  backgroundColor: activeIndex === idx ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.25)",
                  borderRadius: "1px",
                  transition: "all 0.4s ease",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* ── MIGRATING LABEL ("UPCOMING EVENTS") ─────────────────────────────── */}
        <motion.div
          style={{
            position: "absolute",
            top: labelTop,
            left: labelLeft,
            x: labelTransX,
            zIndex: 30, 
            pointerEvents: "none",
          }}
        >
          <motion.span
            style={{
              fontFamily: "var(--font-anton), Anton, sans-serif",
              fontSize: labelFontSize,
              color: labelColor,
              textTransform: "uppercase",
              letterSpacing: labelLetterSpacing,
              lineHeight: 1,
              display: "block",
              whiteSpace: "nowrap",
            }}
          >
            UPCOMING EVENTS
          </motion.span>
        </motion.div>

        {/* ── INFO PANEL (RIGHT, 28vw) ────────────────────────────── */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "28vw",
            height: "100%",
            backgroundColor: "#FFFFFF",
            zIndex: 20,
            x: rightPanelX,
            overflowY: "auto",
            overflowX: "hidden",
            boxSizing: "border-box",
            padding: "40px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <motion.div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginBottom: "38px",
              minHeight: "18px",
            }}
          >
            <a
              href="#"
              style={{
                fontFamily: "var(--font-anton), Anton, sans-serif",
                fontSize: "16px",
                color: "#EF4826",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                textDecoration: "underline",
                textUnderlineOffset: "6px",
                whiteSpace: "nowrap",
              }}
            >
              SEE ALL EVENTS
            </a>
          </motion.div>

          {/* Changing Data (Scroll sequence controlled) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={EVENTS[activeIndex].id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-anton), Anton, sans-serif",
                  fontSize: "32px",
                  color: "#111",
                  textTransform: "uppercase",
                  lineHeight: 1.05,
                  letterSpacing: "0.01em",
                  margin: "0 0 20px 0",
                }}
              >
                {EVENTS[activeIndex].title}
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif",
                  fontSize: "16px",
                  color: "#555",
                  lineHeight: 1.6,
                  margin: "0 0 32px 0",
                }}
              >
                {EVENTS[activeIndex].description}
              </p>

              <Divider mb={24} />

              <div style={{ marginBottom: 24 }}>
                <div
                  style={{
                    fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif",
                    fontSize: "16px",
                    color: "#9C8981", 
                    marginBottom: 5,
                  }}
                >
                  Date and Time
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-anton), Anton, sans-serif",
                    fontSize: "17px",
                    color: "#111",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  {EVENTS[activeIndex].date}
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <div
                  style={{
                    fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif",
                    fontSize: "16px",
                    color: "#9C8981",
                    marginBottom: 5,
                  }}
                >
                  Venue
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-anton), Anton, sans-serif",
                    fontSize: "17px",
                    color: "#111",
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                    lineHeight: 1.35,
                  }}
                >
                  {EVENTS[activeIndex].venue}
                </div>
              </div>

              <Divider mb={24} />

              <div style={{ marginBottom: 24 }}>
                <div
                  style={{
                    fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif",
                    fontSize: "16px",
                    color: "#9C8981",
                    marginBottom: 10,
                  }}
                >
                  Highlights
                </div>
                {EVENTS[activeIndex].highlights.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                    <Dot />
                    <span
                      style={{
                        fontFamily: "var(--font-anton), Anton, sans-serif",
                        fontSize: "17px",
                        color: "#111",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        lineHeight: 1.3,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <Divider mb={24} />

              <div style={{ marginBottom: "auto", paddingBottom: 20 }}>
                <div
                  style={{
                    fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif",
                    fontSize: "16px",
                    color: "#9C8981",
                    marginBottom: 10,
                  }}
                >
                  Expected Line-ups
                </div>
                {EVENTS[activeIndex].lineups.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                    <Dot />
                    <span
                      style={{
                        fontFamily: "var(--font-anton), Anton, sans-serif",
                        fontSize: "17px",
                        color: "#111",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        lineHeight: 1.3,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: "auto" }}>
                <button
                  style={{
                    flex: 1,
                    height: 48,
                    border: "2px solid #111",
                    backgroundColor: "transparent",
                    fontFamily: "var(--font-anton), Anton, sans-serif",
                    fontSize: "16px",
                    color: "#111",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    cursor: "pointer",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#111";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#111";
                  }}
                >
                  MORE DETAILS
                </button>
                <button
                  style={{
                    flex: 1,
                    height: 48,
                    border: "none",
                    backgroundColor: "#EF4826",
                    fontFamily: "var(--font-anton), Anton, sans-serif",
                    fontSize: "16px",
                    color: "#fff",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d03a1a")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#EF4826")}
                >
                  ATTEND EVENT
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
