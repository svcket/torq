"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";
import Footer from "./Footer";

// ── Data ───────────────────────────────────────────────────────────────────

const BRANDS_GRID = [
  // Row 1
  { id: "asta", logo: "/torqassets/brands/brands - asta.png", name: "ASTA" },
  { id: "e1", empty: true },
  { id: "autocraft", logo: "/torqassets/brands/brands - autocraft.png", name: "AUTOCRAFT" },
  { id: "revstate", logo: "/torqassets/brands/brands - revstate.png", name: "REVSTATE" },
  { id: "eko-garage", logo: "/torqassets/brands/brands - eko garage.png", name: "Eko.Garage" },
  // Row 2
  { id: "2tone", logo: "/torqassets/brands/brands - 2tone.png", name: "2-TONE.NG" },
  { id: "classic", logo: "/torqassets/brands/brands - the classic car vault.png", name: "The Classic Car Vault" },
  { id: "e2", empty: true },
  { id: "fearless", logo: "/torqassets/brands/brands - fearless.png", name: "FEARLESS" },
  { id: "bigi", logo: "/torqassets/brands/brands - bigi.png", name: "Bigi" },
];

const FAQ_ITEMS = [
  {
    question: "WHAT IS TORQ?",
    answer: "TOR'Q is a collective of sub-cultures centered on movement. We bring together drifting, car meets, biking, skating, and urban stories into a single definitive ecosystem."
  },
  {
    question: "DOES TORQ ORGANIZE EVENTS DIRECTLY?",
    answer: "TOR'Q can feature, support, collaborate on, and help amplify events across the scene. Some experiences may be produced in-house, while others are presented in partnership with organizers, communities, or brands already active in the space."
  },
  {
    question: "CAN I ATTEND EVENTS THROUGH TORQ?",
    answer: "Yes. All major TOR'Q-led events and supported ecosystem meets are listed in our upcoming event sequence with ticketing and registration details."
  },
  {
    question: "CAN BRANDS OR COMMUNITIES PARTNER WITH TORQ?",
    answer: "We are always looking to collaborate with stakeholders who understand the culture. Reach out via the Partner with TOR'Q channel below."
  },
  {
    question: "WILL TORQ ONLY FOCUS ON CARS?",
    answer: "No. While performance cars are a core pillar, TOR'Q documents all forms of movement subculture—BMX, superbike stunts, skate culture, and high-octane water sports."
  }
];

// ── Components ─────────────────────────────────────────────────────────────

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => {
  return (
    <div 
      style={{ 
        border: isOpen ? "1px solid #EF4826" : "1px solid rgba(0, 0, 0, 0.05)",
        borderRadius: "12px",
        padding: "32px",
        marginBottom: "16px",
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
      onClick={onClick}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ 
          fontFamily: "var(--font-anton), Anton, sans-serif",
          fontSize: "20px",
          color: "#111",
          margin: 0,
          textTransform: "uppercase"
        }}>
          {question}
        </h3>
        <span style={{ fontSize: "24px", color: isOpen ? "#EF4826" : "#111" }}>
          {isOpen ? "\u2212" : "+"}
        </span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 24 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ 
              fontFamily: "var(--font-sans), 'Bricolage Grotesque', sans-serif",
              fontSize: "14px",
              color: "#555",
              lineHeight: "1.6",
              margin: 0
            }}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function BrandsFaqSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState(1);
  const [showNewsletterAsset, setShowNewsletterAsset] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Monitor scroll progress to trigger image swap state
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const shouldShow = latest >= 0.65;
    if (shouldShow !== showNewsletterAsset) {
      setShowNewsletterAsset(shouldShow);
    }
  });

  // ── Scroll Ranges ──
  // 0.00 - 0.25: Brands Flow
  // 0.25 - 0.35: Brands Hold
  // 0.35 - 0.50: FAQ Closure
  // 0.50 - 0.65: FAQ Stable
  // 0.65 - 0.90: Newsletter Takeover (FAQ exits, Visual expands)
  // 0.90 - 0.96: Newsletter Full State (Stationary)
  // 0.96 - 1.00: Footer Reveal (Slides over Newsletter)

  // 1. Brands Layer Movement
  // Pin EXACTLY at 0.45 to match FAQ start trigger - ZERO DEAD ZONE
  const unifiedY = useTransform(scrollYProgress, [0, 0.45, 1], ["0vh", "-110vh", "-110vh"]);
  const brandsOpacity = 1; // Constant 100% visibility as requested

  // 2. FAQ Panel Animation (Starts IMMEDIATELY after pinning)
  const faqClosureProgress = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const faqLeftX = useTransform(faqClosureProgress, [0, 1], ["-100%", "0%"]);
  
  const faqRightX = useTransform(
    scrollYProgress, 
    [0.45, 0.65, 0.65, 0.85], // No dwell time: begins exit immediately at 0.65
    ["100%", "0%", "0%", "100%"]
  );
  
  // 3. Cinematic Panel Expansion (Starts immediately at 0.65)
  const leftPanelWidth = useTransform(scrollYProgress, [0.65, 0.85], ["50.1%", "100%"]);
  
  // 4. Newsletter Content Orchestration (Synced with split exit)
  const newsletterContentOpacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
  const newsletterContentY = useTransform(scrollYProgress, [0.65, 0.8], [48, 0]);

  // 5. Footer Reveal (Slides OVER stationary newsletter)
  const footerY = useTransform(scrollYProgress, [0.96, 1.0], ["100vh", "0vh"]);
  const footerPointerEvents = useTransform(scrollYProgress, (v) => v > 0.96 ? "auto" : "none");

  // 6. Interaction State
  // Simplified to prevent hydration/render hangs
  const faqPointerEvents = useTransform(scrollYProgress, (v) => v > 0.35 ? "auto" : "none");

  // 8. Background Image Transitions (Manual Scroll Linked)
  // These are now isolated to their respective layers to prevent blending
  const newsletterY = useTransform(scrollYProgress, [0.75, 0.95], ["100vh", "0vh"]);
  const newsletterOverlayOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 0.4]);

  // 7. Vehicle Drawings Visibility (RELATIVE in flow)
  // Hard cut at 0.45 - ZERO visibility the moment FAQ split begins
  const drawingsOpacity = useTransform(scrollYProgress, [0, 0.449, 0.45], [1, 1, 0]);

  return (
    <div 
      ref={containerRef} 
      data-chrome-theme="light"
      style={{ height: "1300vh", position: "relative", backgroundColor: "#131111" }}
    >
      
      {/* Sticky Frame */}
      <div style={{ 
        position: "sticky", 
        top: 0, 
        height: "100vh", 
        width: "100%", 
        overflow: "hidden",
        isolation: "isolate" // Forces a new stacking context to respect z-index
      }}>
        
        {/* SECTION 1: BRANDS FLOW (zIndex: -1) */}
        <motion.div 
          style={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: "100%", 
            y: unifiedY,
            opacity: brandsOpacity,
            zIndex: -1, // Force to the absolute bottom
            pointerEvents: "none",
            display: "flex", 
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "160px",
            background: "transparent"
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "80px", padding: "0 40px" }}>
            <h2 style={{ 
              fontFamily: "var(--font-anton), Anton, sans-serif",
              fontSize: "56px",
              color: "#FFFFFF",
              textTransform: "uppercase",
              lineHeight: "1.1",
              margin: 0,
              opacity: 1
            }}>
              BRANDS BEHIND THE MOVEMENT
            </h2>
            <p style={{ 
              fontFamily: "var(--font-sans), 'Bricolage Grotesque', sans-serif",
              fontSize: "15px",
              color: "#FFFFFF",
              marginTop: "24px",
              maxWidth: "500px",
              marginInline: "auto",
              lineHeight: "1.5",
              opacity: 1 // Restored to 100% for maximum clarity
            }}>
              TOR'Q is shaped in collaboration with the brands, builders, and culture-led 
              businesses that understand what this movement means on and off the&nbsp;road.
            </p>
          </div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(5, 259px)", 
            columnGap: "16px", 
            rowGap: "16px",
            marginInline: "auto",
            marginBottom: "80px"
          }}>
            {BRANDS_GRID.map((item) => (
              <div 
                key={item.id} 
                style={{ 
                  width: "259px", 
                  height: "300px", 
                  backgroundColor: item.empty ? "transparent" : "#191616",
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  padding: "40px"
                }}
              >
                {!item.empty && item.logo && (
                  <img 
                    src={item.logo} 
                    alt={item.name} 
                    style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%", objectFit: "contain", filter: "brightness(0) invert(1)" }} 
                  />
                )}
              </div>
            ))}
          </div>

          <button style={{ 
            border: "1px solid #EF4826", 
            backgroundColor: "transparent", 
            color: "#EF4826", 
            padding: "16px 32px", 
            fontFamily: "var(--font-anton), Anton, sans-serif", 
            textTransform: "uppercase",
            fontSize: "16px",
            letterSpacing: "0.1em",
            cursor: "pointer",
            marginBottom: "80px" // Reduced to pull drawings up
          }}>
            PARTNER WITH TOR'Q
          </button>

          {/* RELATIVE VEHICLE DRAWINGS (Shifted Up and Re-aligned) */}
          <div style={{ 
            width: "100%", 
            maxWidth: "1400px", 
            position: "relative", 
            height: "700px", // Condensed height
            marginTop: "0px" // Pulling up to the "green line"
          }}>
            {/* Quad: Top Left */}
            <div style={{ position: "absolute", top: "0", left: "0", width: "24vw" }}>
              <img src="/torqassets/vehicles/quad.png" alt="" style={{ width: "100%", height: "auto", transform: "scaleX(-1)" }} />
            </div>
            {/* Skate: Top Right (Slightly Offset) */}
            <div style={{ position: "absolute", top: "10%", right: "0", width: "24vw" }}>
              <img src="/torqassets/vehicles/skate.png" alt="" style={{ width: "100%", height: "auto" }} />
            </div>
            {/* BMX: Circled Area Focus */}
            <div style={{ position: "absolute", top: "25%", left: "50%", transform: "translateX(-50%)", width: "28vw" }}>
              <img src="/torqassets/vehicles/bmx bicycle.png" alt="" style={{ width: "100%", height: "auto" }} />
            </div>
            {/* Car: Mid-Bottom Left (Shifted 80px Down) */}
            <div style={{ position: "absolute", top: "calc(50% + 80px)", left: "0", width: "28vw" }}>
              <img src="/torqassets/vehicles/car.png" alt="" style={{ width: "100%", height: "auto", transform: "scaleX(-1)", filter: "brightness(0) invert(1)" }} />
            </div>
            {/* Rollers: Bottom Right (Shifted 80px Down) */}
            <div style={{ position: "absolute", bottom: "calc(5% - 80px)", right: "0", width: "22vw" }}>
              <img src="/torqassets/vehicles/rollers.png" alt="" style={{ width: "100%", height: "auto" }} />
            </div>
          </div>
        </motion.div>

        {/* SECTION 2: FAQ SECTION (Left + Right Panels) */}
        {/* SECTION 2: FAQ SECTION (Left + Right Panels) */}
        <div style={{ position: "absolute", inset: 0, zIndex: 100 }}>
          {/* FAQ Left Background Panel */}
          <motion.div 
            style={{ 
              position: "absolute", 
              top: 0, 
              left: 0, 
              width: leftPanelWidth, // Restored expansion from 50% to 100%
              height: "100%", 
              backgroundColor: "#000", 
              x: faqLeftX, 
              zIndex: 101, 
              overflow: "hidden",
              pointerEvents: faqPointerEvents
            }}
          >
            <img 
              src="/torqassets/faq-newsletter/faq - entry image - main faq image.jpg" 
              alt="" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }} 
            />
          </motion.div>

          {/* FAQ Right Content Panel (Salmon) */}
          <motion.div 
            style={{ 
              position: "absolute", 
              top: 0, 
              right: 0, 
              width: "50%", 
              height: "100%", 
              backgroundColor: "#FCEBE5", 
              x: faqRightX, 
              zIndex: 102, 
              padding: "80px 40px", // Strict 40px left/right rule
              display: "flex", 
              flexDirection: "column",
              overflow: "hidden",
              pointerEvents: faqPointerEvents
            }}
          >
            <div style={{ width: "100%" }}>
              <h2 style={{ 
                fontFamily: "var(--font-anton), Anton, sans-serif",
                fontSize: "64px",
                color: "#191616",
                textTransform: "uppercase",
                lineHeight: "1.0",
                marginBottom: "16px"
              }}>
                FREQUENTLY ASKED QUESTIONS
              </h2>
              <p style={{ 
                fontFamily: "var(--font-bricolage), sans-serif",
                fontSize: "16px",
                color: "rgba(25, 22, 22, 0.7)",
                marginBottom: "48px",
                maxWidth: "600px"
              }}>
                From upcoming events to partnerships and past editions, here are 
                some of the questions people ask as they step into the TOR'Q&nbsp;world.
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {FAQ_ITEMS.map((item, idx) => (
                  <FAQItem 
                    key={idx} 
                    question={item.question} 
                    answer={item.answer} 
                    isOpen={openIndex === idx}
                    onClick={() => setOpenIndex(idx === openIndex ? -1 : idx)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 2.5: NEWSLETTER SECTION (Rises from underneath to cover FAQ) */}
        <motion.div 
          style={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: "100%", 
            height: "100%", 
            y: newsletterY,
            zIndex: 10000, // Above FAQ
            overflow: "hidden",
            backgroundColor: "#000"
          }}
        >
          {/* Background Image (Isolated to this layer) */}
          <img 
            src="/torqassets/faq-newsletter/faq - exit image - newsletter sin up image.jpg" 
            alt="" 
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} 
          />
          {/* Cinematic Overlay for text legibility (Matched to design reference) */}
          <motion.div 
            style={{ 
              position: "absolute", 
              inset: 0, 
              background: "linear-gradient(180deg, #635E5C 0%, #B6A296 100%)", 
              mixBlendMode: "multiply", // Blend with the image for depth
              opacity: 0.85 // High opacity for design fidelity
            }} 
          />
          <motion.div 
            style={{ 
              position: "absolute", 
              inset: 0, 
              background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)", 
              opacity: 1
            }} 
          />

          {/* NEWSLETTER CONTENT (Bottom-Aligned) */}
          <motion.div 
            style={{ 
              position: "absolute", 
              inset: 0, 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              justifyContent: "flex-end", // Aligned to bottom
              padding: "0 40px 120px 40px", // Bottom padding for design rhythm
              textAlign: "center",
              zIndex: 30
            }}
          >
            <h2 
              style={{ 
                fontFamily: "var(--font-anton), Anton, sans-serif",
                fontSize: "72px", // Increased for impact
                color: "#FFFFFF",
                textTransform: "uppercase",
                lineHeight: "0.95",
                margin: 0,
                maxWidth: "900px"
              }}
            >
              GET EVERY <span style={{ color: "#EF4826" }}>MOTION</span> <br />
              IN YOUR <span style={{ color: "#EF4826" }}>INBOX</span>
            </h2>
            
            <p 
              style={{ 
                fontFamily: "var(--font-bricolage), sans-serif",
                fontSize: "16px",
                color: "rgba(255, 255, 255, 0.9)",
                marginTop: "24px",
                maxWidth: "600px",
                lineHeight: "1.6",
                fontWeight: 500
              }}
            >
              Get first access to event updates, scene highlights, archive drops, <br />
              and the culture shaping movement on and off the road.
            </p>

            <style>{`
              #newsletter-email::placeholder {
                color: rgba(255, 255, 255, 0.75);
                opacity: 1;
              }
              /* Prevent browser autofill from breaking transparency */
              #newsletter-email:-webkit-autofill,
              #newsletter-email:-webkit-autofill:hover, 
              #newsletter-email:-webkit-autofill:focus {
                -webkit-text-fill-color: #ffffff;
                -webkit-box-shadow: 0 0 0px 1000px transparent inset;
                transition: background-color 5000s ease-in-out 0s;
                background-color: transparent !important;
              }
            `}</style>
            <div 
              style={{ 
                marginTop: "48px", 
                display: "flex", 
                gap: "16px", 
                width: "100%", 
                maxWidth: "640px",
                justifyContent: "center"
              }}
            >
              <input 
                id="newsletter-email"
                type="email" 
                placeholder="Enter your email address"
                style={{ 
                  flex: 1,
                  backgroundColor: "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.8)",
                  padding: "18px 24px",
                  color: "#FFFFFF", // 100% Opacity for typed text
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "14px",
                  outline: "none"
                }}
              />
              <button 
                style={{ 
                  backgroundColor: "#FFFFFF", // White CTA
                  color: "#EF4826", // Red/Orange text
                  padding: "18px 48px",
                  fontFamily: "var(--font-anton), sans-serif",
                  fontSize: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Subscribe
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* SECTION 3: FOOTER REVEAL */}
        <motion.div 
          style={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: "100%", 
            y: footerY, 
            zIndex: 100000, 
            pointerEvents: footerPointerEvents
          }}
        >
          <Footer />
        </motion.div>

      </div>
    </div>
  );
}
