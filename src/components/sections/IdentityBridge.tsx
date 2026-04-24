"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BRIDGE_VIDEO } from "@/config/hero";

export default function IdentityBridge() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Center slit expands from 0vw to 100vw
  const slitWidth = useTransform(scrollYProgress, [0.2, 0.8], ["0vw", "100vw"]);

  return (
    <section ref={sectionRef} style={{ height: "300vh", position: "relative", backgroundColor: "#FCEBE5" }} aria-label="Identity Bridge">
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        
        {/* Foundation - Brand typography */}
        <div style={{ 
          position: "absolute", 
          zIndex: 1, 
          textAlign: "center", 
          paddingLeft: "var(--torq-margin)",
          paddingRight: "var(--torq-margin)",
          width: "100%",
          boxSizing: "border-box"
        }}>
          <h2 style={{ 
            fontFamily: "var(--font-anton), Anton, sans-serif", 
            fontSize: "clamp(48px, 11vw, 120px)", 
            textTransform: "uppercase", 
            color: "#111", 
            lineHeight: 0.9, 
            margin: 0, 
            letterSpacing: "0.02em" 
          }}>
            CULTURE<br />IN MOTION
          </h2>
          <p style={{ 
            fontFamily: "var(--font-sans), 'Bricolage Grotesque', sans-serif", 
            fontSize: "clamp(14px, 1.5vw, 1.1rem)", 
            color: "#7A6C60", 
            marginTop: "32px", 
            maxWidth: "600px", 
            marginInline: "auto", 
            lineHeight: 1.6 
          }}>
            The definitive ecosystem for movement subcultures. Spanning drift circuits to underground skate, we document the raw geometry of speed and style.
          </p>
        </div>

        {/* Narrative Slit Reveal to next section's theme */}
        <motion.div style={{ position: "absolute", zIndex: 2, height: "100vh", width: slitWidth, overflow: "hidden", display: "flex", justifyContent: "center", backgroundColor: "#000" }}>
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            style={{ minWidth: "100vw", height: "100vh", objectFit: "cover", opacity: 0.8 }}
          >
            <source src={BRIDGE_VIDEO} type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </section>
  );
}
