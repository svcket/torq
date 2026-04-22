"use client";

import React from "react";
import { motion } from "framer-motion";

interface StoryCardProps {
  image: string;
  title: string;
  excerpt: string;
  date: string;
  size: "large" | "medium" | "small";
}

const StoryCard = ({ image, title, excerpt, date, size }: StoryCardProps) => {
  const imageHeights = {
    large: "680px",
    medium: "520px",
    small: "440px"
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Image Panel with Graphite/Charcoal Sketch Filter */}
      <div style={{ 
        width: "100%", 
        height: imageHeights[size], 
        backgroundColor: "#1A1818",
        overflow: "hidden"
      }}>
        <img 
          src={image} 
          alt={title} 
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover",
            filter: "grayscale(100%) contrast(1.1) brightness(0.95)",
            display: "block"
          }} 
        />
      </div>

      {/* Story Metadata */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <h3 style={{ 
          fontFamily: "var(--font-anton), Anton, sans-serif",
          fontSize: "24px",
          color: "#FFFFFF",
          textTransform: "uppercase",
          lineHeight: "1.1",
          margin: 0
        }}>
          {title}
        </h3>
        <p style={{ 
          fontFamily: "var(--font-sans), 'Bricolage Grotesque', sans-serif",
          fontSize: "14px",
          color: "rgba(255, 255, 255, 0.7)",
          lineHeight: "1.5",
          margin: 0
        }}>
          {excerpt}
        </p>
        <div style={{ 
          fontFamily: "var(--font-sans), 'Bricolage Grotesque', sans-serif",
          fontSize: "11px",
          color: "rgba(255, 255, 255, 0.5)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          fontWeight: 600
        }}>
          {date}
        </div>
      </div>
    </div>
  );
};

export default function StoriesEditorial() {
  return (
    <section 
      data-chrome-theme="light"
      style={{ 
        backgroundColor: "#131111", 
        padding: "120px 40px",
        width: "100%"
      }}
      aria-label="TORQ Stories High-fidelity Editorial"
    >
      <div style={{ 
        width: "100%", 
        display: "flex",
        gap: "24px",
        alignItems: "flex-start"
      }}>
        
        {/* LEFT COLUMN: READ MORE + FEATURE CARD */}
        <div style={{ flex: 1.3, display: "flex", flexDirection: "column", gap: "60px" }}>
          <a 
            href="#" 
            style={{ 
              fontFamily: "var(--font-anton), Anton, sans-serif",
              fontSize: "16px",
              color: "#FFFFFF",
              textTransform: "uppercase",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              letterSpacing: "0.05em",
              width: "fit-content"
            }}
          >
            READ MORE STORIES
          </a>

          <StoryCard 
            size="large"
            image="/torqassets/blog/lagos auto fest.png"
            title="LAGOS AUTOFEST ‘25 - MARINA LOCKDOWN"
            excerpt="What began as a grassroots auto gathering expanded into drifting, drag racing, and a massive community showdown."
            date="JAN 03, 2026"
          />
        </div>

        {/* MIDDLE COLUMN: STAGGERED MEDIUM CARD */}
        <div style={{ flex: 1, marginTop: "240px" }}>
          <StoryCard 
            size="medium"
            image="/torqassets/blog/torq 2025.png"
            title="TOR’Q 2025 PUSHED DRIFT AND SUPERBIKERS FORWARD"
            excerpt="Framed as more than traditional motorsport, TOR’Q 2025 gave the culture a stage for extreme precision."
            date="DEC 27, 2025"
          />
        </div>

        {/* RIGHT COLUMN: HEADING + SMALL CARD */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "100px" }}>
          
          {/* Section Heading Lockup */}
          <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: "24px" }}>
            <h2 style={{ 
              fontFamily: "var(--font-anton), Anton, sans-serif",
              fontSize: "56px",
              lineHeight: "1.2",
              textTransform: "uppercase",
              margin: 0
            }}>
              <span style={{ color: "#FFFFFF", display: "block" }}>STORIES FROM</span>
              <span style={{ color: "#EF4826", display: "block" }}>THE SCENES</span>
            </h2>
            <p style={{ 
              fontFamily: "var(--font-sans), 'Bricolage Grotesque', sans-serif",
              fontSize: "15px",
              color: "rgba(255, 255, 255, 0.8)",
              lineHeight: "1.6",
              maxWidth: "340px",
              margin: 0,
              marginLeft: "auto"
            }}>
              Stories, event drops, culture notes, and standout moments from the world of TOR’Q.
            </p>
          </div>

          <StoryCard 
            size="small"
            image="/torqassets/blog/torq life.png"
            title="THE “TORQ” LIFE"
            excerpt="Public coverage described luxury and performance, but the reality is built in the garage and on the asphalt."
            date="NOV 30, 2025"
          />
        </div>

      </div>
    </section>
  );
}
