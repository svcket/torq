"use client";

import React, { useState, useEffect } from "react";
import { getCloudinaryUrl } from "@/lib/cloudinary";

export default function SceneryHero() {
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

  return (
    <section 
      data-chrome-theme="light"
      style={{ 
        height: "100vh", 
        width: "100%", 
        position: "relative", 
        overflow: "hidden",
        backgroundColor: "#131111"
      }}
    >
      {/* 1. CINEMATIC BACKGROUND IMAGE */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}>
        <img 
          src={getCloudinaryUrl("gallery-memories/stories from the scene.jpg")} 
          alt="Atmospheric movement silhouette" 
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.9) contrast(1.1)" }}
        />
      </div>

      {/* 2. TITLE LOCKUP */}
      <div style={{ 
        position: "absolute", 
        bottom: isMobile ? "clamp(40px, 8vh, 80px)" : "80px", 
        left: 0, 
        width: "100%", 
        display: "flex", 
        justifyContent: "center",
        zIndex: 10,
        padding: isMobile ? "0 clamp(16px, 4vw, 40px)" : "0 40px",
        boxSizing: "border-box"
      }}>
        <h2 style={{ 
          fontFamily: "var(--font-anton), Anton, sans-serif",
          fontSize: isMobile ? "clamp(28px, 6vw, 56px)" : "72px",
          lineHeight: "0.9",
          letterSpacing: "-0.01em",
          textTransform: "uppercase",
          textAlign: "center",
          whiteSpace: isMobile ? "normal" : "nowrap",
          maxWidth: "100%",
          wordBreak: "keep-all"
        }}>
          <span style={{ color: "#EF4826" }}>SCENERY </span>
          <span style={{ color: "#FFFFFF" }}>FROM </span>
          <span style={{ color: "#EF4826" }}>THE PAST</span>
        </h2>
      </div>

      {/* 3. LEGIBILITY OVERLAY */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 40%, transparent 60%, rgba(19, 17, 17, 0.7) 100%)", zIndex: 2, pointerEvents: "none" }} />

    </section>
  );
}
