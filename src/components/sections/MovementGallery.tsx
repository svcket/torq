"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const FACES = [
  {
    id: "jay",
    name: "JAY BASH",
    family: "top",
    desc: "He treats the street like rhythm, turning pressure, smoke, and silence into something the crowd can feel.",
    img: "/torqassets/community/community - jay bash.jpg",
    width: "440px",
    height: "600px",
  },
  {
    id: "auto",
    name: "AUTO-CRAFT",
    family: "bottom",
    desc: "For him, control is not restraint. It is how chaos becomes style in full public view.",
    img: "/torqassets/community/community - autocraft.jpg",
    width: "440px",
    height: "600px",
  },
  {
    id: "awal",
    name: "CAPTAIN AWAL",
    family: "top",
    desc: "Measured in entry, sharp in exit, he moves with the kind of control that never needs to shout.",
    img: "/torqassets/community/community - captain awal.jpg",
    width: "440px",
    height: "600px",
  },
  {
    id: "lin",
    name: "LIN - SK8R",
    family: "bottom",
    desc: "She carries balance like attitude, making movement feel playful, sharp, and completely her own.",
    img: "/torqassets/community/community - lin sk8r.jpg",
    width: "440px",
    height: "600px",
  },
  {
    id: "skvng",
    name: "SKVNG_MVN",
    family: "top",
    desc: "He rides like the ground is temporary, chasing lift, dust, and the moment just before gravity returns.",
    img: "/torqassets/community/community - skvng-mvn.jpg",
    width: "440px",
    height: "600px",
  },
  {
    id: "mayrose",
    name: "MAYROSE KLOSE",
    family: "bottom",
    desc: "Where others look for comfort, she follows the pull of distance, lift, and open risk.",
    img: "/torqassets/community/community - mayrose klose.jpg",
    width: "440px",
    height: "600px",
  },
  {
    id: "her-swimp",
    name: "HERR SWIMP",
    family: "top",
    desc: "He moves toward the parts where motion becomes travel and less like effort.",
    img: "/torqassets/community/community - herr swimpro.jpg",
    width: "440px",
    height: "600px",
  },
  {
    id: "nsikan",
    name: "NSIKAN JOHN",
    family: "bottom",
    desc: "For some, movement stays grounded. For him, it begins where the land falls away beneath him.",
    img: "/torqassets/community/community - nsikan john.jpg",
    width: "440px",
    height: "600px",
  },
];

// -- Mobile Sub-components --------------------------------------------------

function MobileIntroFrame() {
  return (
    <div style={{ 
      width: "100vw", 
      height: "100%", 
      flexShrink: 0, 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center",
      alignItems: "center",
      padding: "0 clamp(16px, 4vw, 40px)", // Responsive padding
      backgroundColor: "#131111",
      position: "relative"
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "clamp(16px, 3vh, 40px)", // Responsive gap
        width: "100%",
        maxWidth: "clamp(280px, 85vw, 680px)", // Bounded width for tablet
        margin: "0 auto"
      }}>
        <div style={{
          alignSelf: "flex-end",
          fontFamily: "var(--font-anton), Anton, sans-serif",
          fontSize: "clamp(28px, 7vw, 64px)", // Fluid scaling for intro text
          lineHeight: "1",
          color: "white",
          textTransform: "uppercase",
          textAlign: "right",
          maxWidth: "90%",
          letterSpacing: "-0.01em"
        }}>
          WE MOVE <span style={{ color: "#EF4826" }}>SIDEWAYS,</span>
        </div>
        <div style={{
          alignSelf: "flex-start",
          fontFamily: "var(--font-anton), Anton, sans-serif",
          fontSize: "clamp(28px, 7vw, 64px)", // Fluid scaling for intro text
          lineHeight: "1",
          color: "white",
          textTransform: "uppercase",
          textAlign: "left",
          maxWidth: "90%",
          letterSpacing: "-0.01em"
        }}>
          BUT NEVER <span style={{ color: "#EF4826" }}>WITHOUT CONTROL.</span>
        </div>
      </div>
    </div>
  );
}

function MobileCard({ face, index }: { face: typeof FACES[0], index: number }) {
  const isTop = index % 2 === 0;
  
  return (
    <div style={{
      width: "clamp(300px, 88vw, 500px)", // Stable width across phone/tablet
      height: "100%",
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      padding: "0 clamp(16px, 4vw, 40px)",
      justifyContent: isTop ? "flex-start" : "flex-end",
      paddingTop: isTop ? "clamp(100px, 15vh, 180px)" : "0", // Responsive stagger
      paddingBottom: isTop ? "0" : "clamp(80px, 12vh, 140px)" // Responsive stagger
    }}>
      {isTop ? (
        <>
          <div style={{ marginBottom: "clamp(24px, 4vh, 48px)" }}>
            <h3 style={{ 
              fontFamily: "var(--font-anton), Anton, sans-serif",
              fontSize: "clamp(28px, 5vw, 42px)", // Scaling card name
              color: "white",
              textTransform: "uppercase",
              marginBottom: "12px",
              lineHeight: "1"
            }}>
              {face.name}
            </h3>
            <p style={{ 
              fontFamily: "var(--font-bricolage), sans-serif",
              fontSize: "clamp(14px, 2vw, 16px)", // Scaling description
              color: "rgba(255,255,255,0.8)",
              lineHeight: "1.5",
              maxWidth: "320px"
            }}>
              {face.desc}
            </p>
          </div>
          <div style={{ 
            width: "100%", 
            height: "clamp(320px, 55vh, 650px)", 
            overflow: "hidden"
          }}>
            <img src={face.img} alt={face.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </>
      ) : (
        <>
          <div style={{ 
            width: "100%", 
            height: "clamp(320px, 55vh, 650px)", 
            overflow: "hidden",
            marginBottom: "clamp(24px, 4vh, 48px)"
          }}>
            <img src={face.img} alt={face.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <h3 style={{ 
              fontFamily: "var(--font-anton), Anton, sans-serif",
              fontSize: "clamp(28px, 5vw, 42px)",
              color: "white",
              textTransform: "uppercase",
              marginBottom: "12px",
              lineHeight: "1"
            }}>
              {face.name}
            </h3>
            <p style={{ 
              fontFamily: "var(--font-bricolage), sans-serif",
              fontSize: "clamp(14px, 2vw, 16px)",
              color: "rgba(255,255,255,0.8)",
              lineHeight: "1.5",
              maxWidth: "320px"
            }}>
              {face.desc}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

// -- Desktop View Component -------------------------------------------------
function DesktopView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const calculateRange = () => {
      if (scrollRef.current) {
        setScrollRange(scrollRef.current.scrollWidth - window.innerWidth);
      }
    };
    calculateRange();
    window.addEventListener("resize", calculateRange);
    return () => window.removeEventListener("resize", calculateRange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section 
      ref={containerRef} 
      data-chrome-theme="light"
      style={{ height: "600vh", backgroundColor: "#131111", position: "relative" }}
    >
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex" }}>
        <motion.div ref={scrollRef} style={{ display: "flex", x, height: "100%", alignItems: "stretch" }}>
          <div style={{ width: "100vw", height: "100%", flexShrink: 0, position: "relative" }}>
            <div style={{ position: "absolute", top: "42vh", left: "420px", whiteSpace: "nowrap", fontFamily: "var(--font-anton), Anton, sans-serif", fontSize: "56px", lineHeight: "0.9", letterSpacing: "-0.02em", textTransform: "uppercase", zIndex: 10 }}>
              <span style={{ color: "white" }}>WE MOVE </span>
              <span style={{ color: "#EF4826" }}>SIDEWAYS,</span>
            </div>
            <div style={{ position: "absolute", top: "52vh", left: "40px", whiteSpace: "nowrap", fontFamily: "var(--font-anton), Anton, sans-serif", fontSize: "56px", lineHeight: "0.9", letterSpacing: "-0.02em", textTransform: "uppercase", zIndex: 10 }}>
              <span style={{ color: "white" }}>BUT NEVER </span>
              <span style={{ color: "#EF4826" }}>WITHOUT CONTROL.</span>
            </div>
            <div style={{ position: "absolute", top: "150px", right: "40px", width: "440px", zIndex: 5 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <h3 style={{ fontFamily: "var(--font-anton), Anton, sans-serif", fontSize: "42px", color: "white", textTransform: "uppercase", marginBottom: "16px", lineHeight: "1" }}>{FACES[0].name}</h3>
                  <p style={{ fontFamily: "var(--font-bricolage), sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.9)", lineHeight: "1.5", maxWidth: "320px" }}>{FACES[0].desc}</p>
                </div>
                <div style={{ marginTop: "42px", marginLeft: "42px", width: "calc(100% - 42px)", height: "600px", overflow: "hidden" }}>
                  <img src={FACES[0].img} alt={FACES[0].name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "stretch", gap: "12vw", paddingLeft: "8vw", paddingRight: "40px" }}>
            {FACES.slice(1).map((face) => {
              const isTop = face.family === "top";
              return (
                <div key={face.id} style={{ width: face.width, flexShrink: 0, display: "flex", flexDirection: "column", height: "100%", alignItems: "flex-start" }}>
                  {isTop ? (
                    <div style={{ paddingTop: "150px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <h3 style={{ fontFamily: "var(--font-anton), Anton, sans-serif", fontSize: "42px", color: "white", textTransform: "uppercase", marginBottom: "16px", lineHeight: "1" }}>{face.name}</h3>
                        <p style={{ fontFamily: "var(--font-bricolage), sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5", maxWidth: "320px" }}>{face.desc}</p>
                      </div>
                      <div style={{ marginTop: "42px", marginLeft: "42px", width: "calc(100% - 42px)", height: face.height, overflow: "hidden" }}>
                        <img src={face.img} alt={face.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    </div>
                  ) : (
                    <div style={{ marginTop: "auto", paddingBottom: "80px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                      <div style={{ marginLeft: "42px", width: "calc(100% - 42px)", height: face.height, overflow: "hidden", marginBottom: "42px" }}>
                        <img src={face.img} alt={face.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <h3 style={{ fontFamily: "var(--font-anton), Anton, sans-serif", fontSize: "42px", color: "white", textTransform: "uppercase", marginBottom: "16px", lineHeight: "1" }}>{face.name}</h3>
                        <p style={{ fontFamily: "var(--font-bricolage), sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.8)", lineHeight: "1.5", maxWidth: "300px" }}>{face.desc}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// -- Mobile View Component --------------------------------------------------
function MobileView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const calculateRange = () => {
      if (scrollRef.current) {
        setScrollRange(scrollRef.current.scrollWidth - window.innerWidth);
      }
    };
    calculateRange();
    window.addEventListener("resize", calculateRange);
    return () => window.removeEventListener("resize", calculateRange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section 
      ref={containerRef} 
      data-chrome-theme="light"
      style={{ height: "600vh", backgroundColor: "#131111", position: "relative" }}
    >
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex" }}>
        <motion.div 
          ref={scrollRef} 
          style={{ 
            display: "flex", 
            x, 
            height: "100%", 
            alignItems: "stretch",
            gap: "clamp(24px, 5vw, 64px)" // Fluid gap between cards
          }}
        >
          <MobileIntroFrame />
          {FACES.map((face, index) => (
            <MobileCard key={face.id} face={face} index={index} />
          ))}
          <div style={{ width: "clamp(24px, 5vw, 64px)", flexShrink: 0 }} />
        </motion.div>
      </div>
    </section>
  );
}

// -- Main Component ---------------------------------------------------------
export default function MovementGallery() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) return null;

  return isMobile ? <MobileView /> : <DesktopView />;
}
