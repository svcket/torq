"use client";

import { useRef, useEffect } from "react";
import type { HeroSlide } from "@/config/hero";

interface HeroMediaProps {
  slide: HeroSlide;
  slideKey: string;
}

export default function HeroMedia({ slide, slideKey }: HeroMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Use a stable effect to handle source changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (slide.type === "video") {
      // Direct source assignment is often more stable in Next.js dev mode
      video.src = slide.url;
      video.load();
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Autoplay was prevented:", error);
        });
      }
    }
  }, [slide.url, slide.type]);

  return (
    <div 
      style={{ 
        position: "absolute", 
        inset: 0, 
        width: "100%", 
        height: "100%",
        zIndex: 0,
        backgroundColor: "#000"
      }}
    >
      {/* No AnimatePresence for now to ensure a persistent video element */}
      <div
        style={{ 
          position: "absolute", 
          inset: 0, 
          width: "100%", 
          height: "100%",
        }}
      >
        {slide.type === "video" ? (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover", 
              display: "block",
            }}
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={slide.url}
            alt={slide.alt}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        )}

        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.65) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
