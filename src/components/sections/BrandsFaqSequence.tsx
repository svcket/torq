"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from "framer-motion";
import Footer from "./Footer";
import { getCloudinaryUrl } from "@/lib/cloudinary";

// ── Data ───────────────────────────────────────────────────────────────────

const BRANDS_GRID = [
  // Row 1
  { id: "asta", logo: getCloudinaryUrl("brands/brands - asta.png"), name: "ASTA" },
  { id: "e1", empty: true },
  { id: "autocraft", logo: getCloudinaryUrl("brands/brands - autocraft.png"), name: "AUTOCRAFT" },
  { id: "revstate", logo: getCloudinaryUrl("brands/brands - revstate.png"), name: "REVSTATE" },
  { id: "eko-garage", logo: getCloudinaryUrl("brands/brands - eko garage.png"), name: "Eko.Garage" },
  // Row 2
  { id: "2tone", logo: getCloudinaryUrl("brands/brands - 2tone.png"), name: "2-TONE.NG" },
  { id: "classic", logo: getCloudinaryUrl("brands/brands - the classic car vault.png"), name: "The Classic Car Vault" },
  { id: "e2", empty: true },
  { id: "fearless", logo: getCloudinaryUrl("brands/brands - fearless.png"), name: "FEARLESS" },
  { id: "bigi", logo: getCloudinaryUrl("brands/brands - bigi.png"), name: "Bigi" },
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

const FAQItem = ({ question, answer, isOpen, onClick, isMobile }: { question: string, answer: string, isOpen: boolean, onClick: () => void, isMobile?: boolean }) => {
  return (
    <div 
      style={{ 
        border: isOpen ? "1px solid #EF4826" : "1px solid rgba(0, 0, 0, 0.05)",
        borderRadius: "12px",
        padding: isMobile ? "24px" : "32px",
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
          fontSize: isMobile ? "16px" : "20px",
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
            animate={{ height: "auto", opacity: 1, marginTop: isMobile ? 16 : 24 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ 
              fontFamily: "var(--font-sans), 'Bricolage Grotesque', sans-serif",
              fontSize: isMobile ? "13px" : "14px",
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

function DesktopView({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const unifiedY = useTransform(scrollYProgress, [0, 0.45, 1], ["0vh", "-110vh", "-110vh"]);
  const faqClosureProgress = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const faqLeftX = useTransform(faqClosureProgress, [0, 1], ["-100%", "0%"]);
  const faqRightX = useTransform(scrollYProgress, [0.45, 0.65, 0.65, 0.85], ["100%", "0%", "0%", "100%"]);
  const leftPanelWidth = useTransform(scrollYProgress, [0.65, 0.85], ["50.1%", "100%"]);
  const newsletterY = useTransform(scrollYProgress, [0.75, 0.95], ["100vh", "0vh"]);
  const footerY = useTransform(scrollYProgress, [0.96, 1.0], ["100vh", "0vh"]);
  const footerPointerEvents = useTransform(scrollYProgress, (v) => v > 0.96 ? "auto" : "none");
  const faqPointerEvents = useTransform(scrollYProgress, (v) => v > 0.35 ? "auto" : "none");

  const [openIndex, setOpenIndex] = useState(1);

  return (
    <div style={{ position: "sticky", top: 0, height: "100vh", width: "100%", overflow: "hidden", isolation: "isolate" }}>
      <motion.div style={{ position: "absolute", top: 0, left: 0, width: "100%", y: unifiedY, zIndex: -1, pointerEvents: "none", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "160px", background: "transparent" }}>
        <div style={{ textAlign: "center", marginBottom: "80px", padding: "0 40px" }}>
          <h2 style={{ fontFamily: "var(--font-anton), Anton, sans-serif", fontSize: "56px", color: "#FFFFFF", textTransform: "uppercase", lineHeight: "1.1", margin: 0 }}>BRANDS BEHIND THE MOVEMENT</h2>
          <p style={{ fontFamily: "var(--font-sans), 'Bricolage Grotesque', sans-serif", fontSize: "15px", color: "#FFFFFF", marginTop: "24px", maxWidth: "500px", marginInline: "auto", lineHeight: "1.5" }}>TOR'Q is shaped in collaboration with the brands, builders, and culture-led businesses that understand what this movement means on and off the road.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 259px)", columnGap: "16px", rowGap: "16px", marginInline: "auto", marginBottom: "80px" }}>
          {BRANDS_GRID.map((item) => (
            <div key={item.id} style={{ width: "259px", height: "300px", backgroundColor: item.empty ? "transparent" : "#191616", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
              {!item.empty && item.logo && <img src={item.logo} alt={item.name} style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%", objectFit: "contain", filter: "brightness(0) invert(1)" }} />}
            </div>
          ))}
        </div>
        <button style={{ border: "1px solid #EF4826", backgroundColor: "transparent", color: "#EF4826", padding: "16px 32px", fontFamily: "var(--font-anton), Anton, sans-serif", textTransform: "uppercase", fontSize: "16px", letterSpacing: "0.1em", cursor: "pointer", marginBottom: "80px" }}>PARTNER WITH TOR'Q</button>
        <div style={{ width: "100%", maxWidth: "1400px", position: "relative", height: "700px" }}>
          <div style={{ position: "absolute", top: "0", left: "0", width: "24vw" }}><img src="/torqassets/vehicles/quad.png" alt="" style={{ width: "100%", height: "auto", transform: "scaleX(-1)" }} /></div>
          <div style={{ position: "absolute", top: "10%", right: "0", width: "24vw" }}><img src="/torqassets/vehicles/skate.png" alt="" style={{ width: "100%", height: "auto" }} /></div>
          <div style={{ position: "absolute", top: "25%", left: "50%", transform: "translateX(-50%)", width: "28vw" }}><img src="/torqassets/vehicles/bmx bicycle.png" alt="" style={{ width: "100%", height: "auto" }} /></div>
          <div style={{ position: "absolute", top: "calc(50% + 80px)", left: "0", width: "28vw" }}><img src="/torqassets/vehicles/car.png" alt="" style={{ width: "100%", height: "auto", transform: "scaleX(-1)", filter: "brightness(0) invert(1)" }} /></div>
          <div style={{ position: "absolute", bottom: "calc(5% - 80px)", right: "0", width: "22vw" }}><img src="/torqassets/vehicles/rollers.png" alt="" style={{ width: "100%", height: "auto" }} /></div>
        </div>
      </motion.div>

      <div style={{ position: "absolute", inset: 0, zIndex: 100 }}>
        <motion.div style={{ position: "absolute", top: 0, left: 0, width: leftPanelWidth, height: "100%", backgroundColor: "#000", x: faqLeftX, zIndex: 101, overflow: "hidden", pointerEvents: faqPointerEvents }}>
          <img src={getCloudinaryUrl("faq-newsletter/faq - entry image - main faq image.jpg")} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </motion.div>
        <motion.div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", backgroundColor: "#FCEBE5", x: faqRightX, zIndex: 102, padding: "80px 40px", display: "flex", flexDirection: "column", overflow: "hidden", pointerEvents: faqPointerEvents }}>
          <div style={{ width: "100%" }}>
            <h2 style={{ fontFamily: "var(--font-anton), Anton, sans-serif", fontSize: "64px", color: "#191616", textTransform: "uppercase", lineHeight: "1.0", marginBottom: "16px" }}>FREQUENTLY ASKED QUESTIONS</h2>
            <p style={{ fontFamily: "var(--font-bricolage), sans-serif", fontSize: "16px", color: "rgba(25, 22, 22, 0.7)", marginBottom: "48px", maxWidth: "600px" }}>From upcoming events to partnerships and past editions, here are some of the questions people ask as they step into the TOR'Q world.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {FAQ_ITEMS.map((item, idx) => (<FAQItem key={idx} question={item.question} answer={item.answer} isOpen={openIndex === idx} onClick={() => setOpenIndex(idx === openIndex ? -1 : idx)} />))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", y: newsletterY, zIndex: 10000, overflow: "hidden", backgroundColor: "#000" }}>
        <img src={getCloudinaryUrl("faq-newsletter/faq - exit image - newsletter sin up image.jpg")} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <motion.div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #635E5C 0%, #B6A296 100%)", mixBlendMode: "multiply", opacity: 0.85 }} />
        <motion.div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)", opacity: 1 }} />
        <motion.div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", padding: "0 40px 120px 40px", textAlign: "center", zIndex: 30 }}>
          <h2 style={{ fontFamily: "var(--font-anton), Anton, sans-serif", fontSize: "72px", color: "#FFFFFF", textTransform: "uppercase", lineHeight: "0.95", margin: 0, maxWidth: "900px" }}>GET EVERY <span style={{ color: "#EF4826" }}>MOTION</span> <br /> IN YOUR <span style={{ color: "#EF4826" }}>INBOX</span></h2>
          <p style={{ fontFamily: "var(--font-bricolage), sans-serif", fontSize: "16px", color: "rgba(255, 255, 255, 0.9)", marginTop: "24px", maxWidth: "600px", lineHeight: "1.6", fontWeight: 500 }}>Get first access to event updates, scene highlights, archive drops, and the culture shaping movement on and off the road.</p>
          <div style={{ marginTop: "48px", display: "flex", gap: "16px", width: "100%", maxWidth: "640px", justifyContent: "center" }}>
            <input type="email" placeholder="Enter your email address" style={{ flex: 1, backgroundColor: "transparent", border: "1px solid rgba(255, 255, 255, 0.8)", padding: "18px 24px", color: "#FFFFFF", fontFamily: "var(--font-sans), sans-serif", fontSize: "14px", outline: "none" }} />
            <button style={{ backgroundColor: "#FFFFFF", color: "#EF4826", padding: "18px 48px", fontFamily: "var(--font-anton), sans-serif", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.1em", border: "none", cursor: "pointer", fontWeight: "bold" }}>Subscribe</button>
          </div>
        </motion.div>
      </motion.div>

      <motion.div style={{ position: "absolute", top: 0, left: 0, width: "100%", y: footerY, zIndex: 100000, pointerEvents: footerPointerEvents }}>
        <Footer />
      </motion.div>
    </div>
  );
}

function MobileView() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div style={{ backgroundColor: "#131111" }}>
      {/* Brands Section */}
      <section style={{ paddingTop: "80px", paddingBottom: "60px" }}>
        <div style={{ paddingLeft: "var(--torq-margin)", paddingRight: "var(--torq-margin)", textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontFamily: "var(--font-anton), Anton, sans-serif", fontSize: "clamp(36px, 8vw, 48px)", color: "#FFFFFF", textTransform: "uppercase", lineHeight: "1.1", margin: 0 }}>BRANDS BEHIND THE MOVEMENT</h2>
          <p style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.8)", marginTop: "16px", lineHeight: "1.5" }}>TOR'Q is shaped in collaboration with the brands, builders, and culture-led businesses.</p>
        </div>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(2, 1fr)", 
          gap: "8px", 
          paddingLeft: "var(--torq-margin)", 
          paddingRight: "var(--torq-margin)" 
        }}>
          {BRANDS_GRID.filter(b => !b.empty).map((item) => (
            <div key={item.id} style={{ backgroundColor: "#191616", height: "160px", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
              <img src={item.logo} alt={item.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
            </div>
          ))}
        </div>
        <div style={{ padding: "48px var(--torq-margin) 0", textAlign: "center" }}>
          <button style={{ border: "1px solid #EF4826", backgroundColor: "transparent", color: "#EF4826", padding: "16px 32px", fontFamily: "var(--font-anton), Anton, sans-serif", textTransform: "uppercase", fontSize: "14px", width: "100%" }}>PARTNER WITH TOR'Q</button>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ backgroundColor: "#FCEBE5", padding: "80px 0" }}>
        <div style={{ paddingLeft: "var(--torq-margin)", paddingRight: "var(--torq-margin)", marginBottom: "40px" }}>
          <h2 style={{ fontFamily: "var(--font-anton), Anton, sans-serif", fontSize: "clamp(36px, 8vw, 48px)", color: "#191616", textTransform: "uppercase", lineHeight: "1.1" }}>FREQUENTLY ASKED QUESTIONS</h2>
        </div>
        <div style={{ paddingLeft: "var(--torq-margin)", paddingRight: "var(--torq-margin)" }}>
          {FAQ_ITEMS.map((item, idx) => (
            <FAQItem key={idx} question={item.question} answer={item.answer} isOpen={openIndex === idx} onClick={() => setOpenIndex(idx === openIndex ? -1 : idx)} isMobile={true} />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={{ position: "relative", minHeight: "80vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <img src={getCloudinaryUrl("faq-newsletter/faq - exit image - newsletter sin up image.jpg")} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #635E5C 0%, #B6A296 100%)", mixBlendMode: "multiply", opacity: 0.85 }} />
        <div style={{ position: "relative", zIndex: 10, paddingLeft: "var(--torq-margin)", paddingRight: "var(--torq-margin)", width: "100%", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-anton), Anton, sans-serif", fontSize: "clamp(42px, 10vw, 64px)", color: "#FFFFFF", textTransform: "uppercase", lineHeight: "0.95" }}>GET EVERY <span style={{ color: "#EF4826" }}>MOTION</span> <br /> IN YOUR <span style={{ color: "#EF4826" }}>INBOX</span></h2>
          <p style={{ fontFamily: "var(--font-sans), sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.9)", marginTop: "24px", lineHeight: "1.6" }}>Get first access to event updates, scene highlights, and culture drops.</p>
          <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
            <input type="email" placeholder="Enter your email address" style={{ backgroundColor: "transparent", border: "1px solid rgba(255, 255, 255, 0.8)", padding: "18px 24px", color: "#FFFFFF", fontFamily: "var(--font-sans), sans-serif", fontSize: "14px", outline: "none", width: "100%", boxSizing: "border-box" }} />
            <button style={{ backgroundColor: "#FFFFFF", color: "#EF4826", padding: "18px 48px", fontFamily: "var(--font-anton), sans-serif", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.1em", border: "none", cursor: "pointer", fontWeight: "bold", width: "100%" }}>Subscribe</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function BrandsFaqSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section 
      ref={containerRef} 
      style={{ 
        height: mounted ? (isMobile ? "auto" : "800vh") : "100vh", 
        position: "relative",
        backgroundColor: "#0A0A0A"
      }}
    >
      {mounted ? (
        isMobile ? <MobileView /> : <DesktopView scrollYProgress={scrollYProgress} />
      ) : (
        <div style={{ height: "100vh" }} />
      )}
    </section>
  );
}
