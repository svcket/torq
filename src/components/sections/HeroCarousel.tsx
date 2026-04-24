"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import HeroMedia from "./HeroMedia";
import { HERO_SLIDES } from "@/config/hero";

const EASE_CINEMATIC = [0.16, 1, 0.3, 1] as const;

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const currentSlide = HERO_SLIDES[activeIndex];
    const duration = currentSlide.duration || 5000;
    
    const timer = setTimeout(nextSlide, duration);
    return () => clearTimeout(timer);
  }, [activeIndex, nextSlide]);

  const activeSlide = HERO_SLIDES[activeIndex];

  return (
    <section
      data-chrome-theme="light"
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
        backgroundColor: "#0A0A0A",
        zIndex: 1,
      }}
      aria-label="TORQ Cinematic Hero"
    >
      {/* Layer 1 — Background Media */}
      {mounted && <HeroMedia slide={activeSlide} slideKey={activeSlide.id} />}

      {/* Layer 3 — Bottom Headline Lockup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.95, ease: EASE_CINEMATIC, delay: 0.25 }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "clamp(48px, 10vh, 72px)",
          zIndex: 20,
          textAlign: "center",
          // Global margin enforcement
          paddingLeft: "var(--torq-margin)",
          paddingRight: "var(--torq-margin)",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-anton), Anton, sans-serif",
            fontSize: "clamp(3.5rem, 12vw, 6.75rem)",
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
            margin: 0,
            display: "inline",
          }}
        >
          <span style={{ color: "#ffffff" }}>CULTURE IN </span>
          <span style={{ color: "#EF4826" }}>MOTION</span>
        </h1>
      </motion.div>
    </section>
  );
}
