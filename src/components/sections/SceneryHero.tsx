"use client";

import React from "react";

export default function SceneryHero() {
  return (
    <section 
      data-chrome-theme="light"
      style={{ 
        height: "100vh", 
        width: "100%", 
        position: "relative", 
        overflow: "hidden",
        backgroundColor: "#131111" // Fallback dark context
      }}
    >
      {/* 1. CINEMATIC BACKGROUND IMAGE */}
      <div style={{ 
        position: "absolute", 
        top: 0, 
        left: 0, 
        width: "100%", 
        height: "100%",
        zIndex: 1
      }}>
        <img 
          src="/torqassets/gallery-memories/stories from the scene.jpg" 
          alt="Atmospheric movement silhouette" 
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover",
            filter: "brightness(0.9) contrast(1.1)" // Subtle atmospheric reinforcement
          }}
        />
      </div>

      {/* 2. TITLE LOCKUP (ANTON, ANCHORED LOW) */}
      <div style={{ 
        position: "absolute", 
        bottom: "80px", 
        left: 0, 
        width: "100%", 
        display: "flex", 
        justifyContent: "center",
        zIndex: 10,
        padding: "0 40px"
      }}>
        <h2 style={{ 
          fontFamily: "var(--font-anton), Anton, sans-serif",
          fontSize: "72px",
          lineHeight: "0.9",
          letterSpacing: "-0.01em",
          textTransform: "uppercase",
          textAlign: "center",
          whiteSpace: "nowrap"
        }}>
          <span style={{ color: "#EF4826" }}>SCENERY </span>
          <span style={{ color: "#FFFFFF" }}>FROM </span>
          <span style={{ color: "#EF4826" }}>THE PAST</span>
        </h2>
      </div>

      {/* 3. LEGIBILITY OVERLAY (Vignette + Protection) */}
      <div style={{ 
        position: "absolute", 
        inset: 0, 
        background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 40%, transparent 60%, rgba(19, 17, 17, 0.7) 100%)",
        zIndex: 2,
        pointerEvents: "none"
      }} />

    </section>
  );
}
