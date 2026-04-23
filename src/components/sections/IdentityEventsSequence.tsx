"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";

// [ignoring loop detection]

// ── Event data (5 states) ────────────────────────────────────────────────────
const EVENTS = [
  {
    id: "drift",
    title: "TOR’Q DRIFT WEEKEND ’26 — SEASON 2",
    description: "A live drift showcase where machine control, custom builds, and crowd energy meet in a charged urban setting.",
    date: "SAT. 15 MAY, 2026  |  14:30",
    venue: "TOR’Q ARENA (ZODIAC), OPPOSITE LANDMARK, VI",
    highlights: ["NIGHT DRIFT SESSIONS", "VIP PIT ACCESS", "MUSIC & CROWD ATMOSPHERE"],
    lineups: ["JAY BASH", "CAPTAIN AWAL", "AUTO CRAFT"],
    mediaUrl: "/torqassets/events/event image 1.jpg",
    mediaType: "image",
  },
  {
    id: "mud",
    title: "TOR’Q MUD CIRCUIT ’26",
    description: "A high-intensity motocross showcase where speed meets lift, and every jump cuts through mud, noise, and crowd pressure.",
    date: "SAT. 15 MAY, 2026  |  14:30",
    venue: "TOR’Q ARENA (MUTANDA), GWARIMPA, ABUJA",
    highlights: ["MOTOCROSS SHOW RUNS", "ELEVATED JUMP SEQUENCES", "TRACKSIDE VIP ACCESS"],
    lineups: ["JAY BASH", "CAPTAIN AWAL", "AUTO CRAFT"],
    mediaUrl: "/torqassets/events/event image 2.jpg",
    mediaType: "image",
  },
  {
    id: "cars",
    title: "CARS & COFFEE ’26",
    description: "A community meet where custom builds face off. Grab a brew, lift the bonnet, and connect with fellow enthusiasts over raw horsepower and exhaust notes.",
    date: "SAT. 15 MAY, 2026  |  14:30",
    venue: "TAFAWA BALEWA SQUARE, CMS, LAGOS ISLAND",
    highlights: ["VIP PIT ACCESS", "COMMUNITY MEET HOURS", "TRACKSIDE PARKING"],
    lineups: ["JAY BASH", "CAPTAIN AWAL", "AUTO CRAFT"],
    mediaUrl: "/torqassets/events/event image 3.jpg",
    mediaType: "image",
  },
  {
    id: "ice",
    title: "AFTER DARK ICE GLIDE",
    description: "A seasonal night experience where movement shifts from speed to glide, bringing people together through skating, sound, and shared atmosphere.",
    date: "SAT. 15 MAY, 2026  |  14:30",
    venue: "TAFAWA BALEWA SQUARE, CMS, LAGOS ISLAND",
    highlights: ["COMMUNITY SKATE HOURS", "ELEVATED JUMP SEQUENCES", "TRACKSIDE VIP ACCESS"],
    lineups: ["JAY BASH", "CAPTAIN AWAL", "AUTO CRAFT"],
    mediaUrl: "/torqassets/events/event image 4.jpg",
    mediaType: "image",
  },
  {
    id: "skate",
    title: "SKATE RHAPSODY ’26",
    description: "A concrete bowl takeover featuring underground riders, high-air tricks, and a raw soundscape that amplifies every landing.",
    date: "SAT. 15 MAY, 2026  |  14:30",
    venue: "TAFAWA BALEWA SQUARE, CMS, LAGOS ISLAND",
    highlights: ["COMMUNITY SKATE HOURS", "ELEVATED JUMP SEQUENCES", "TRACKSIDE VIP ACCESS"],
    lineups: ["JAY BASH", "CAPTAIN AWAL", "AUTO CRAFT"],
    mediaUrl: "/torqassets/events/event image 5.jpg",
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

// ── Master Component ────────────────────────────────────────────────────────
export default function IdentityEventsSequence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Track active index and chrome theme based on scroll position
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isMobile) {
      if (latest < 0.52) setActiveIndex(0);
      else if (latest < 0.64) setActiveIndex(1);
      else if (latest < 0.76) setActiveIndex(2);
      else if (latest < 0.88) setActiveIndex(3);
      else setActiveIndex(4);

      if (latest < 0.15) {
        sectionRef.current?.setAttribute("data-chrome-theme", "dark");
        sectionRef.current?.setAttribute("data-chrome-logo", "visible");
      } else if (latest < 0.40) {
        sectionRef.current?.setAttribute("data-chrome-theme", "dark");
        sectionRef.current?.setAttribute("data-chrome-logo", "hidden");
      } else {
        sectionRef.current?.setAttribute("data-chrome-theme", "light");
        sectionRef.current?.setAttribute("data-chrome-cart-theme", "dark");
        sectionRef.current?.setAttribute("data-chrome-logo", "visible");
      }
    }
  });

  const splitEnd = 0.15;
  const collapseStart = 0.30;
  const collapseEnd = 0.40;

  const doorOffset = useTransform(scrollYProgress, (p) => {
    const t = clamp(p / splitEnd, 0, 1);
    return `${easeInOut(t) * 50}vw`;
  });

  const mediaWidth = useTransform(scrollYProgress, (p) => {
    const t = norm(p, collapseStart, collapseEnd);
    return `${100 + (72 - 100) * t}vw`;
  });

  const rightPanelX = useTransform(scrollYProgress, (p) => {
    const t = norm(p, collapseStart, collapseEnd);
    return `${(1 - t) * 100}%`;
  });

  const labelTop = useTransform(scrollYProgress, (p) => {
    const t = norm(p, collapseStart, collapseEnd);
    return `calc(85vh + (89px - 85vh) * ${t})`;
  });

  const labelLeft = useTransform(scrollYProgress, (p) => {
    const t = norm(p, collapseStart, collapseEnd);
    return `calc(50% + ((72vw + 40px) - 50%) * ${t})`;
  });

  const labelTransX = useTransform(scrollYProgress, (p) => {
    const t = norm(p, collapseStart, collapseEnd);
    return `${(1 - t) * -50}%`;
  });

  const labelFontSize = useTransform(scrollYProgress, (p) => {
    const t = norm(p, collapseStart, collapseEnd);
    return `${Math.round(82 + (16 - 82) * t)}px`;
  });

  const labelColor = useTransform(scrollYProgress, (p) => {
    const t = norm(p, collapseStart + 0.05, collapseEnd);
    const r = Math.round(255 + (156 - 255) * t);
    const g = Math.round(255 + (137 - 255) * t);
    const b = Math.round(255 + (129 - 255) * t);
    return `rgb(${r},${g},${b})`;
  });

  const labelLetterSpacing = useTransform(scrollYProgress, (p) => {
    const t = norm(p, collapseStart, collapseEnd);
    return `${0.03 + (0.02 - 0.03) * t}em`;
  });

  const indicatorOpacity = useTransform(scrollYProgress, [collapseEnd, collapseEnd + 0.05], [0, 1]);

  const renderIdentityContent = () => (
    <>
      {!isMobile && <div style={{ position: "absolute", inset: 0, backgroundColor: "#FFE7E3" }} />}
      <div style={{
        position: isMobile ? "relative" : "absolute",
        top: isMobile ? "0" : "128px",
        left: isMobile ? "0" : "40px",
        width: isMobile ? "100%" : "320px",
        fontFamily: "var(--font-anton), Anton, sans-serif",
        fontSize: "14px",
        lineHeight: 1.4,
        color: "#111",
        textTransform: "uppercase",
        zIndex: 10,
        letterSpacing: "0.01em",
        marginBottom: "14px"
      }}>
        BUILT FOR THE CULTURE IN MOTION, TOR'Q BRINGS TOGETHER EVENTS, COMMUNITY
        VOICES, AND STORIES FROM THE PEOPLE SHAPING THE SCENE IN REAL TIME.
      </div>
      <div style={{
        position: isMobile ? "relative" : "absolute",
        top: isMobile ? "0" : "128px",
        right: isMobile ? "0" : "40px",
        width: isMobile ? "100%" : "320px",
        fontFamily: "var(--font-anton), Anton, sans-serif",
        fontSize: "14px",
        lineHeight: 1.4,
        color: "#111",
        textTransform: "uppercase",
        zIndex: 10,
        letterSpacing: "0.01em",
        textAlign: isMobile ? "left" : "left",
        marginBottom: isMobile ? "48px" : "0"
      }}>
        FROM ASPHALT TO WATER, FROM ENGINES TO ATMOSPHERE, WE FOLLOW THE ENERGY,
        RITUALS, AND PEOPLE THAT GIVE EVERY COMMUNITY ITS IDENTITY.
      </div>
      
      {/* Centered TORQ Logo Placement */}
      <div style={{
        position: isMobile ? "relative" : "absolute",
        top: isMobile ? "0" : "50%",
        left: isMobile ? "0" : "50%",
        transform: isMobile ? "none" : "translate(-50%, -50%)",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: isMobile ? 1 : "none",
        padding: isMobile ? "40px 0" : "0"
      }}>
        <img src="/images/torq_24_logo.png" alt="Torq 24 Logo" style={{ height: isMobile ? "auto" : "13vh", width: isMobile ? "180px" : "auto" }} />
      </div>

      <div style={{
        position: isMobile ? "relative" : "absolute",
        bottom: isMobile ? "0" : "-2vh",
        left: 0,
        width: isMobile ? "calc(100% + 32px)" : "100%",
        height: isMobile ? "120px" : "35vh",
        margin: isMobile ? "0 -16px" : "0",
        overflow: "hidden",
        zIndex: 5,
        pointerEvents: "none",
        display: "flex",
        alignItems: "flex-end"
      }}>
        <img 
          src="/torqassets/vehicles/vehicles for split section.png" 
          alt="Vehicles overlay" 
          style={{ 
            position: isMobile ? "static" : "absolute", 
            bottom: 0, 
            left: 0, 
            width: isMobile ? "auto" : "100vw", 
            height: isMobile ? "100%" : "auto", 
            objectFit: isMobile ? "contain" : "cover",
            objectPosition: "left bottom",
            minWidth: isMobile ? "600px" : "none"
          }} 
        />
        {!isMobile && <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "20vh", background: "linear-gradient(to bottom, #FFE7E3 0%, transparent 100%)" }} />}\n      </div>\n    </>\n  );\n\n  // Mobile-specific Events Gallery Rendering\n  const renderMobileEvents = () => (\n    <div style={{ backgroundColor: \"#000\", padding: \"48px 0\" }}>\n      <div style={{ padding: \"0 24px\", marginBottom: \"40px\" }}>\n        <h2 style={{ \n          fontFamily: \"var(--font-anton), Anton, sans-serif\", \n          fontSize: \"42px\", \n          color: \"#FFFFFF\", \n          textTransform: \"uppercase\",\n          letterSpacing: \"0.03em\",\n          lineHeight: 1\n        }}>UPCOMING EVENTS</h2>\n      </div>\n      \n      {EVENTS.map((event, idx) => (\n        <div key={event.id} style={{ marginBottom: \"64px\", borderBottom: \"1px solid rgba(255,255,255,0.1)\", paddingBottom: \"48px\" }}>\n          <div style={{ width: \"100%\", height: \"240px\", marginBottom: \"24px\", overflow: \"hidden\" }}>\n            <img src={event.mediaUrl} style={{ width: \"100%\", height: \"100%\", objectFit: \"cover\" }} alt=\"\" />\n          </div>\n          <div style={{ padding: \"0 24px\" }}>\n            <h3 style={{ \n              fontFamily: \"var(--font-anton), Anton, sans-serif\", \n              fontSize: \"28px\", \n              color: \"#FFFFFF\", \n              textTransform: \"uppercase\",\n              marginBottom: \"16px\",\n              lineHeight: 1.1\n            }}>{event.title}</h3>\n            \n            <p style={{ \n              fontFamily: \"var(--font-bricolage), sans-serif\", \n              fontSize: \"15px\", \n              color: \"rgba(255,255,255,0.6)\", \n              lineHeight: 1.6,\n              marginBottom: \"24px\"\n            }}>{event.description}</p>\n            \n            <div style={{ display: \"grid\", gridTemplateColumns: \"1fr 1fr\", gap: \"24px\", marginBottom: \"32px\" }}>\n              <div>\n                <div style={{ fontFamily: \"var(--font-bricolage)\", fontSize: \"12px\", color: \"#9C8981\", textTransform: \"uppercase\", marginBottom: \"4px\" }}>Date</div>\n                <div style={{ fontFamily: \"var(--font-anton)\", fontSize: \"14px\", color: \"#FFFFFF\" }}>{event.date}</div>\n              </div>\n              <div>\n                <div style={{ fontFamily: \"var(--font-bricolage)\", fontSize: \"12px\", color: \"#9C8981\", textTransform: \"uppercase\", marginBottom: \"4px\" }}>Venue</div>\n                <div style={{ fontFamily: \"var(--font-anton)\", fontSize: \"14px\", color: \"#FFFFFF\", lineHeight: 1.2 }}>{event.venue}</div>\n              </div>\n            </div>\n\n            <button style={{ \n              width: \"100%\", \n              height: \"48px\", \n              backgroundColor: \"#EF4826\", \n              color: \"#FFFFFF\", \n              border: \"none\",\n              fontFamily: \"var(--font-anton)\",\n              textTransform: \"uppercase\",\n              letterSpacing: \"0.05em\"\n            }}>ATTEND EVENT</button>\n          </div>\n        </div>\n      ))}\n\n      <div style={{ padding: \"0 24px\", textAlign: \"center\" }}>\n         <a href=\"#\" style={{ fontFamily: \"var(--font-anton)\", color: \"#EF4826\", textDecoration: \"underline\", fontSize: \"18px\" }}>SEE ALL EVENTS</a>\n      </div>\n    </div>\n  );\n\n  if (isMobile) {\n    return (\n      <section aria-label=\"TORQ Identity & Upcoming Events Sequence\">\n        {/* Mobile Identity Block - Static, normal flow */}\n        <div style={{ \n          minHeight: \"100vh\", \n          backgroundColor: \"#FFE7E3\", \n          display: \"flex\", \n          flexDirection: \"column\", \n          padding: \"24px 16px\",\n          position: \"relative\",\n          overflow: \"hidden\"\n        }}>\n          <div style={{ height: \"15vh\", minHeight: \"100px\" }} />\n          {renderIdentityContent()}\n        </div>\n\n        {/* Mobile Events Block - Revealed properly via normal scroll */}\n        {renderMobileEvents()}\n      </section>\n    );\n  }\n\n  return (\n    <section ref={sectionRef} style={{ height: \"800vh\", position: \"relative\" }} aria-label=\"TORQ Identity & Upcoming Events Sequence\">\n      <div style={{ position: \"sticky\", top: 0, height: \"100vh\", overflow: \"hidden\", backgroundColor: \"#000\" }}>\n        \n        {/* LAYER 50: The Identity Split Doors      */}\n        <motion.div\n          style={{\n            position: \"absolute\",\n            top: 0, left: 0, width: \"50vw\", height: \"100%\",\n            overflow: \"hidden\", zIndex: 50,\n            x: useTransform(doorOffset, v => `-${v}`), // Moves left\n          }}\n        >\n          <div style={{ position: \"absolute\", top: 0, left: 0, width: \"100vw\", height: \"100%\" }}>\n            {renderIdentityContent()}\n          </div>\n        </motion.div>\n\n        <motion.div\n          style={{\n            position: \"absolute\",\n            top: 0, right: 0, width: \"50vw\", height: \"100%\",\n            overflow: \"hidden\", zIndex: 50,\n            x: doorOffset, // Moves right\n          }}\n        >\n          <div style={{ position: \"absolute\", top: 0, right: 0, width: \"100vw\", height: \"100%\" }}>\n            {renderIdentityContent()}\n          </div>\n        </motion.div>\n\n        {/* LAYER 10: The Upcoming Events Content   */}\n        <motion.div style={{ position: \"absolute\", top: 0, left: 0, bottom: 0, width: mediaWidth, overflow: \"hidden\", zIndex: 10 }}>\n          <AnimatePresence>\n            <motion.div\n              key={EVENTS[activeIndex].id}\n              initial={{ opacity: 0 }}\n              animate={{ opacity: 1 }}\n              exit={{ opacity: 0 }}\n              transition={{ duration: 0.4, ease: \"easeOut\" }}\n              style={{ position: \"absolute\", inset: 0 }}\n            >\n              <img src={EVENTS[activeIndex].mediaUrl} style={{ width: \"100%\", height: \"100%\", objectFit: \"cover\" }} alt=\"\" />\n            </motion.div>\n          </AnimatePresence>\n          <div style={{ position: \"absolute\", inset: 0, background: \"linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 100%)\", pointerEvents: \"none\" }} />\n          <motion.div style={{ position: \"absolute\", bottom: \"7%\", right: \"40px\", display: \"flex\", flexDirection: \"column\", gap: \"10px\", alignItems: \"center\", zIndex: 25, opacity: indicatorOpacity }}>\n            {EVENTS.map((_, idx) => (\n              <div key={idx} style={{ width: \"2px\", height: activeIndex === idx ? \"26px\" : \"18px\", backgroundColor: activeIndex === idx ? \"rgba(255,255,255,1)\" : \"rgba(255,255,255,0.25)\", borderRadius: \"1px\", transition: \"all 0.4s ease\" }} />\n            ))}\n          </motion.div>\n        </motion.div>\n\n        <motion.div style={{ position: \"absolute\", top: labelTop, left: labelLeft, x: labelTransX, zIndex: 30, pointerEvents: \"none\" }}>\n          <motion.span style={{ fontFamily: \"var(--font-anton), Anton, sans-serif\", fontSize: labelFontSize, color: labelColor, textTransform: \"uppercase\", letterSpacing: labelLetterSpacing, lineHeight: 1, display: \"block\", whiteSpace: \"nowrap\" }}>\n            UPCOMING EVENTS\n          </motion.span>\n        </motion.div>\n\n        <motion.div style={{ position: \"absolute\", top: 0, right: 0, width: \"28vw\", height: \"100%\", backgroundColor: \"#FFFFFF\", zIndex: 20, x: rightPanelX, overflowY: \"auto\", overflowX: \"hidden\", boxSizing: \"border-box\", padding: \"88px 40px 40px 40px\", display: \"flex\", flexDirection: \"column\" }}>\n          <motion.div style={{ display: \"flex\", justifyContent: \"flex-end\", alignItems: \"center\", marginBottom: \"40px\", minHeight: \"18px\" }}>\n            <a href=\"#\" style={{ fontFamily: \"var(--font-anton)\", fontSize: \"16px\", color: \"#EF4826\", textTransform: \"uppercase\", letterSpacing: \"0.05em\", textDecoration: \"underline\", textUnderlineOffset: \"4px\", whiteSpace: \"nowrap\", lineHeight: 1 }}>SEE ALL EVENTS</a>\n          </motion.div>\n          <AnimatePresence mode=\"wait\">\n            <motion.div key={EVENTS[activeIndex].id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} style={{ display: \"flex\", flexDirection: \"column\", flexGrow: 1 }}>\n              <h2 style={{ fontFamily: \"var(--font-anton)\", fontSize: \"32px\", color: \"#111\", textTransform: \"uppercase\", lineHeight: 1.05, letterSpacing: \"0.01em\", margin: \"0 0 20px 0\" }}>{EVENTS[activeIndex].title}</h2>\n              <p style={{ fontFamily: \"var(--font-bricolage)\", fontSize: \"16px\", color: \"#555\", lineHeight: 1.6, margin: \"0 0 32px 0\" }}>{EVENTS[activeIndex].description}</p>\n              <Divider mb={24} />\n              <div style={{ marginBottom: 24 }}>\n                <div style={{ fontFamily: \"var(--font-bricolage)\", fontSize: \"16px\", color: \"#9C8981\", marginBottom: 5 }}>Date and Time</div>\n                <div style={{ fontFamily: \"var(--font-anton)\", fontSize: \"17px\", color: \"#111\", textTransform: \"uppercase\", letterSpacing: \"0.04em\" }}>{EVENTS[activeIndex].date}</div>\n              </div>\n              <div style={{ marginBottom: 24 }}>\n                <div style={{ fontFamily: \"var(--font-bricolage)\", fontSize: \"16px\", color: \"#9C8981\", marginBottom: 5 }}>Venue</div>\n                <div style={{ fontFamily: \"var(--font-anton)\", fontSize: \"17px\", color: \"#111\", textTransform: \"uppercase\", letterSpacing: \"0.03em\", lineHeight: 1.35 }}>{EVENTS[activeIndex].venue}</div>\n              </div>\n              <Divider mb={24} />\n              <div style={{ marginBottom: 24 }}>\n                <div style={{ fontFamily: \"var(--font-bricolage)\", fontSize: \"16px\", color: \"#9C8981\", marginBottom: 10 }}>Highlights</div>\n                {EVENTS[activeIndex].highlights.map((item) => (<div key={item} style={{ display: \"flex\", alignItems: \"flex-start\", gap: 8, marginBottom: 8 }}><Dot /><span style={{ fontFamily: \"var(--font-anton)\", fontSize: \"17px\", color: \"#111\", textTransform: \"uppercase\", letterSpacing: \"0.04em\", lineHeight: 1.3 }}>{item}</span></div>))}\n              </div>\n              <Divider mb={24} />\n              <div style={{ marginBottom: \"auto\", paddingBottom: 20 }}>\n                <div style={{ fontFamily: \"var(--font-bricolage)\", fontSize: \"16px\", color: \"#9C8981\", marginBottom: 10 }}>Expected Line-ups</div>\n                {EVENTS[activeIndex].lineups.map((item) => (<div key={item} style={{ display: \"flex\", alignItems: \"flex-start\", gap: 8, marginBottom: 8 }}><Dot /><span style={{ fontFamily: \"var(--font-anton)\", fontSize: \"17px\", color: \"#111\", textTransform: \"uppercase\", letterSpacing: \"0.04em\", lineHeight: 1.3 }}>{item}</span></div>))}\n              </div>\n              <div style={{ display: \"flex\", gap: 12, marginTop: \"auto\" }}>\n                <button style={{ flex: 1, height: 48, border: \"2px solid #111\", backgroundColor: \"transparent\", fontFamily: \"var(--font-anton)\", fontSize: \"16px\", color: \"#111\", textTransform: \"uppercase\", letterSpacing: \"0.1em\", cursor: \"pointer\", transition: \"background 0.2s, color 0.2s\" }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = \"#111\"; e.currentTarget.style.color = \"#fff\"; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = \"transparent\"; e.currentTarget.style.color = \"#111\"; }}>MORE DETAILS</button>\n                <button style={{ flex: 1, height: 52, border: \"none\", backgroundColor: \"#EF4826\", fontFamily: \"var(--font-anton)\", fontSize: \"16px\", color: \"#fff\", textTransform: \"uppercase\", letterSpacing: \"0.05em\", cursor: \"pointer\", transition: \"background 0.2s\" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = \"#d03a1a\")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = \"#EF4826\")}>ATTEND EVENT</button>\n              </div>\n            </motion.div>\n          </AnimatePresence>\n        </motion.div>\n      </div>\n    </section>\n  );\n}\n
