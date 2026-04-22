"use client";

import React from "react";
import { motion } from "framer-motion";

// --- Constants & Static Data ---
const FEATURED_IMAGES = [
  "/torqassets/gallery : memories/first gallery carousel - image 1.jpg", 
  "/torqassets/gallery : memories/first gallery carousel - image 2.jpg", 
  "/torqassets/gallery : memories/first gallery carousel - image 3.jpg", 
  "/torqassets/gallery : memories/first gallery carousel - image 4.jpg",
  "/torqassets/gallery : memories/first gallery carousel - image 5.jpg",
  "/torqassets/gallery : memories/first gallery carousel - image 6.jpg"
];

const MOSAIC_IMAGES = [
  "/torqassets/gallery : memories/second gallery carousel - image 1.jpg", 
  "/torqassets/gallery : memories/second gallery carousel - image 2.jpg.jpg", 
  "/torqassets/gallery : memories/second gallery carousel - image 3.jpg", 
  "/torqassets/gallery : memories/second gallery carousel - image 4.jpg",
  "/torqassets/gallery : memories/second gallery carousel - image 5.jpg", 
  "/torqassets/gallery : memories/second gallery carousel - image 6.jpg", 
  "/torqassets/gallery : memories/second gallery carousel - image 7.jpg", 
  "/torqassets/gallery : memories/second gallery carousel - image 8.jpg"
];

const DOCUMENTARY_IMAGES = [
  "/torqassets/gallery : memories/third image carousel - iage 1.jpg", 
  "/torqassets/gallery : memories/third image carousel - iage 2.jpg"
];

// --- Specialized Sub-components ---

const GalleryCaption = React.memo(({ title, date }: { title: string; date: string }) => (
  <div style={{ textAlign: "center" }}>
    <h3 style={{ 
      fontFamily: "var(--font-anton), Anton, sans-serif",
      fontSize: "18px",
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
      fontSize: "14px",
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
    <div style={{ paddingTop: "40px" }}>
      <GalleryCaption title={title} date={date} />
    </div>
  </div>
);

/**
 * ROW 1: FEATURED ARCHIVE BAND
 * Cinematic height, looping motion.
 */
const FeaturedArchiveBand = React.memo(({ images }: { images: string[] }) => {
  // Duplicate for seamless loop
  const duplicatedImages = [...images, ...images, ...images];
  
  return (
    <div style={{ 
      overflow: "hidden", 
      width: "100%", 
      backgroundColor: "transparent",
      position: "relative"
    }}>
      <motion.div 
        style={{ 
          display: "flex", 
          gap: "8px",
          marginLeft: "-34vw" 
        }}
        animate={{ x: ["0vw", "-42.6vw"] }} 
        transition={{ 
          duration: 35, 
          ease: "linear", 
          repeat: Infinity 
        }}
      >
        {duplicatedImages.map((src, i) => (
          <div 
            key={`${src}-${i}`} 
            style={{ 
              width: "42vw", 
              height: "75vh", 
              flexShrink: 0,
              backgroundColor: "#E8E8E8"
            }}
          >
            <img 
              src={src} 
              alt="" 
              loading="eager"
              style={{ width: "100%", height: "100%", objectFit: "cover" }} 
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
});
FeaturedArchiveBand.displayName = "FeaturedArchiveBand";

/**
 * ROW 2: MOSAIC ARCHIVE BAND
 * Dense archive slice, static collage. Full-bleed edge-to-edge.
 */
const MosaicArchiveBand = React.memo(({ images }: { images: string[] }) => (
  <div style={{ 
    display: "grid", 
    gridTemplateColumns: "repeat(8, 1fr)", 
    gap: "8px",
    width: "100%",
    height: "280px",
    padding: "0", // Removed 40px inset for full-bleed edge-to-edge
    boxSizing: "border-box",
    overflow: "hidden"
  }}>
    {images.map((src, i) => (
      <div key={`${src}-${i}`} style={{ height: "100%", backgroundColor: "#E8E8E8" }}>
        <img 
          src={src} 
          alt="" 
          loading="eager"
          style={{ width: "100%", height: "100%", objectFit: "cover" }} 
        />
      </div>
    ))}
  </div>
));
MosaicArchiveBand.displayName = "MosaicArchiveBand";

/**
 * ROW 3: DOCUMENTARY ARCHIVE BAND
 * Weighty, tall, 2-panel B&W.
 */
const DocumentaryArchiveBand = React.memo(({ images }: { images: string[] }) => (
  <div style={{ 
    display: "grid", 
    gridTemplateColumns: "1fr 1fr", 
    columnGap: "8px", 
    width: "100%",
    height: "75vh",
    overflow: "hidden"
  }}>
    {images.map((src, i) => (
      <div key={`${src}-${i}`} style={{ 
        width: "100%", 
        height: "100%", 
        backgroundColor: "#E8E8E8",
        overflow: "hidden" 
      }}>
        <img 
          src={src} 
          alt="" 
          loading="eager"
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover", 
            display: "block",
            filter: "grayscale(100%) brightness(0.9)" 
          }} 
        />
      </div>
    ))}
  </div>
));
DocumentaryArchiveBand.displayName = "DocumentaryArchiveBand";

// --- Main ArchiveGallery Component ---

export default function ArchiveGallery() {
  return (
    <section 
      data-chrome-theme="dark"
      style={{ 
        backgroundColor: "#F4F4F4", 
        paddingTop: "80px", 
        paddingBottom: "120px",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
        <GalleryCarouselUnit title="AUTO FEST '25 - LAGOS" date="22 DEC, 2025">
          <FeaturedArchiveBand images={FEATURED_IMAGES} />
        </GalleryCarouselUnit>

        <GalleryCarouselUnit title="TORQ CAR MEET '25 - ABUJA & LAGOS" date="7 DEC, 2025">
          <MosaicArchiveBand images={MOSAIC_IMAGES} />
        </GalleryCarouselUnit>

        <GalleryCarouselUnit title="BIKERS SUMMER FESTIVAL - MUMBIA" date="6 AUG, 2025">
          <DocumentaryArchiveBand images={DOCUMENTARY_IMAGES} />
        </GalleryCarouselUnit>
      </div>

      <div style={{ height: "1px", backgroundColor: "#D1D1D1", width: "100%", margin: "64px 0 40px 0" }} />

      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        gap: "24px", 
        marginTop: "16px" 
      }}>
        <a 
          href="#" 
          style={{ 
            fontFamily: "var(--font-anton), Anton, sans-serif",
            fontSize: "16px",
            color: "#000000",
            textTransform: "uppercase",
            textDecoration: "none",
            border: "2px solid #000000",
            padding: "16px 40px",
            letterSpacing: "0.05em",
            fontWeight: 400
          }}
        >
          VIEW THE ARCHIVE
        </a>
        <a 
          href="#" 
          style={{ 
            fontFamily: "var(--font-anton), Anton, sans-serif",
            fontSize: "16px",
            color: "#FFFFFF",
            backgroundColor: "#EF4826",
            textTransform: "uppercase",
            textDecoration: "none",
            padding: "16px 40px",
            letterSpacing: "0.05em",
            fontWeight: 400
          }}
        >
          EXPLORE EVENTS
        </a>
      </div>
    </section>
  );
}
