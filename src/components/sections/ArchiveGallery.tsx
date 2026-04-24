"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getCloudinaryUrl } from "@/lib/cloudinary";

// --- Constants & Static Data ---
const FEATURED_IMAGES = [
  getCloudinaryUrl("gallery-memories/first gallery carousel - image 1.jpg"), 
  getCloudinaryUrl("gallery-memories/first gallery carousel - image 2.jpg"), 
  getCloudinaryUrl("gallery-memories/first gallery carousel - image 3.jpg"), 
  getCloudinaryUrl("gallery-memories/first gallery carousel - image 4.jpg"),
  getCloudinaryUrl("gallery-memories/first gallery carousel - image 5.jpg"),
  getCloudinaryUrl("gallery-memories/first gallery carousel - image 6.jpg")
];

const MOSAIC_IMAGES = [
  getCloudinaryUrl("gallery-memories/second gallery carousel - image 1.jpg"), 
  getCloudinaryUrl("gallery-memories/second gallery carousel - image 2.jpg.jpg"), 
  getCloudinaryUrl("gallery-memories/second gallery carousel - image 3.jpg"), 
  getCloudinaryUrl("gallery-memories/second gallery carousel - image 4.jpg"),
  getCloudinaryUrl("gallery-memories/second gallery carousel - image 5.jpg"), 
  getCloudinaryUrl("gallery-memories/second gallery carousel - image 6.jpg"), 
  getCloudinaryUrl("gallery-memories/second gallery carousel - image 7.jpg"), 
  getCloudinaryUrl("gallery-memories/second gallery carousel - image 8.jpg")
];

const DOCUMENTARY_IMAGES = [
  getCloudinaryUrl("gallery-memories/third image carousel - iage 1.jpg"), 
  getCloudinaryUrl("gallery-memories/third image carousel - iage 2.jpg")
];

// --- Specialized Sub-components ---

const GalleryCaption = React.memo(({ title, date }: { title: string; date: string }) => (
  <div style={{ textAlign: "center", padding: "0 20px" }}>
    <h3 style={{ 
      fontFamily: "var(--font-anton), Anton, sans-serif",
      fontSize: "clamp(16px, 2vw, 18px)",
      color: "#000000",
      textTransform: "uppercase",
      marginBottom: "8px",
      letterSpacing: "0.02em",
      lineHeight: "1.2"
    }}>
      {title}
    </h3>
    <p style={{ 
      fontFamily: "var(--font-bricolage), sans-serif",
      fontSize: "clamp(12px, 1.5vw, 14px)",
      color: "#666666",
      textTransform: "uppercase",
      letterSpacing: "0.15em",
      fontWeight: 500,
      margin: 0
    }}>
      {date}
    </p>
  </div>
));
GalleryCaption.displayName = "GalleryCaption";

const GalleryCarouselUnit = ({ children, title, date }: { children: React.ReactNode; title: string; date: string }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    {children}
    <div style={{ paddingTop: "clamp(24px, 4vh, 40px)" }}>
      <GalleryCaption title={title} date={date} />
    </div>
  </div>
);

/**
 * ROW 1: FEATURED ARCHIVE BAND
 */
const FeaturedArchiveBand = React.memo(({ images, isMobile }: { images: string[], isMobile: boolean }) => {
  const duplicatedImages = [...images, ...images, ...images];
  
  return (
    <div style={{ overflow: "hidden", width: "100%", backgroundColor: "transparent", position: "relative" }}>
      <motion.div 
        style={{ display: "flex", gap: "8px", marginLeft: isMobile ? "-70vw" : "-34vw" }}
        animate={{ x: ["0vw", isMobile ? "-85.2vw" : "-42.6vw"] }} 
        transition={{ duration: 35, ease: "linear", repeat: Infinity }}
      >
        {duplicatedImages.map((src, i) => (
          <div 
            key={`${src}-${i}`} 
            style={{ 
              width: isMobile ? "85vw" : "42vw", 
              height: isMobile ? "clamp(280px, 45vh, 480px)" : "75vh", // Refined for mobile/tablet
              flexShrink: 0,
              backgroundColor: "#E8E8E8"
            }}
          >
            <img src={src} alt="" loading="eager" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </motion.div>
    </div>
  );
});
FeaturedArchiveBand.displayName = "FeaturedArchiveBand";

/**
 * ROW 2: MOSAIC ARCHIVE BAND
 */
const MosaicArchiveBand = React.memo(({ images, isMobile }: { images: string[], isMobile: boolean }) => (
  <div style={{ 
    display: "grid", 
    gridTemplateColumns: isMobile ? "repeat(4, 1fr)" : "repeat(8, 1fr)", 
    gap: "8px",
    width: "100%",
    height: isMobile ? "clamp(120px, 15vh, 200px)" : "280px",
    padding: "0",
    boxSizing: "border-box",
    overflow: "hidden"
  }}>
    {/* Limit to 4 on mobile to avoid extreme compression */}
    {(isMobile ? images.slice(0, 4) : images).map((src, i) => (
      <div key={`${src}-${i}`} style={{ height: "100%", backgroundColor: "#E8E8E8" }}>
        <img src={src} alt="" loading="eager" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    ))}
  </div>
));
MosaicArchiveBand.displayName = "MosaicArchiveBand";

/**
 * ROW 3: DOCUMENTARY ARCHIVE BAND
 */
const DocumentaryArchiveBand = React.memo(({ images, isMobile }: { images: string[], isMobile: boolean }) => (
  <div style={{ 
    display: "grid", 
    gridTemplateColumns: "1fr 1fr", 
    columnGap: "8px", 
    width: "100%",
    height: isMobile ? "clamp(280px, 45vh, 480px)" : "75vh",
    overflow: "hidden"
  }}>
    {images.map((src, i) => (
      <div key={`${src}-${i}`} style={{ width: "100%", height: "100%", backgroundColor: "#E8E8E8", overflow: "hidden" }}>
        <img src={src} alt="" loading="eager" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(100%) brightness(0.9)" }} />
      </div>
    ))}
  </div>
));
DocumentaryArchiveBand.displayName = "DocumentaryArchiveBand";

// --- Main ArchiveGallery Component ---

export default function ArchiveGallery() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section 
      data-chrome-theme="dark"
      style={{ 
        backgroundColor: "#F4F4F4", 
        paddingTop: "clamp(40px, 8vh, 80px)", 
        paddingBottom: "clamp(60px, 12vh, 120px)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "clamp(40px, 6vh, 64px)" }}>
        <GalleryCarouselUnit title="AUTO FEST '25 - LAGOS" date="22 DEC, 2025">
          <FeaturedArchiveBand images={FEATURED_IMAGES} isMobile={isMobile} />
        </GalleryCarouselUnit>

        <GalleryCarouselUnit title="TORQ CAR MEET '25 - ABUJA & LAGOS" date="7 DEC, 2025">
          <MosaicArchiveBand images={MOSAIC_IMAGES} isMobile={isMobile} />
        </GalleryCarouselUnit>

        <GalleryCarouselUnit title="BIKERS SUMMER FESTIVAL - MUMBIA" date="6 AUG, 2025">
          <DocumentaryArchiveBand images={DOCUMENTARY_IMAGES} isMobile={isMobile} />
        </GalleryCarouselUnit>
      </div>

      <div style={{ height: "1px", backgroundColor: "#D1D1D1", width: "100%", margin: "clamp(32px, 5vh, 64px) 0 clamp(20px, 3vh, 40px) 0" }} />

      <div style={{ 
        display: "flex", 
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "center", 
        alignItems: "center",
        gap: "clamp(16px, 2vw, 24px)", 
        marginTop: "16px",
        padding: "0 20px"
      }}>
        <a href="#" style={{ width: isMobile ? "100%" : "auto", textAlign: "center", fontFamily: "var(--font-anton), Anton, sans-serif", fontSize: "16px", color: "#000000", textTransform: "uppercase", textDecoration: "none", border: "2px solid #000000", padding: "16px 40px", letterSpacing: "0.05em", fontWeight: 400 }}>VIEW THE ARCHIVE</a>
        <a href="#" style={{ width: isMobile ? "100%" : "auto", textAlign: "center", fontFamily: "var(--font-anton), Anton, sans-serif", fontSize: "16px", color: "#FFFFFF", backgroundColor: "#EF4826", textTransform: "uppercase", textDecoration: "none", padding: "16px 40px", letterSpacing: "0.05em", fontWeight: 400 }}>EXPLORE EVENTS</a>
      </div>
    </section>
  );
}
