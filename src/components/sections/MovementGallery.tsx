"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const FACES = [
  {
    id: "jay",
    name: "JAY BASH",
    family: "top",
    desc: "He treats the street like rhythm, turning pressure, smoke, and silence into something the crowd can feel.",
    img: "/torqassets/community/community - jay bash.jpg",
    width: "440px",
    height: "600px",
  },
  {
    id: "auto",
    name: "AUTO-CRAFT",
    family: "bottom",
    desc: "For him, control is not restraint. It is how chaos becomes style in full public view.",
    img: "/torqassets/community/community - autocraft.jpg",
    width: "440px",
    height: "600px",
  },
  {
    id: "awal",
    name: "CAPTAIN AWAL",
    family: "top",
    desc: "Measured in entry, sharp in exit, he moves with the kind of control that never needs to shout.",
    img: "/torqassets/community/community - captain awal.jpg",
    width: "440px",
    height: "600px",
  },
  {
    id: "lin",
    name: "LIN - SK8R",
    family: "bottom",
    desc: "She carries balance like attitude, making movement feel playful, sharp, and completely her own.",
    img: "/torqassets/community/community - lin sk8r.jpg",
    width: "440px",
    height: "600px",
  },
  {
    id: "skvng",
    name: "SKVNG_MVN",
    family: "top",
    desc: "He rides like the ground is temporary, chasing lift, dust, and the moment just before gravity returns.",
    img: "/torqassets/community/community - skvng-mvn.jpg",
    width: "440px",
    height: "600px",
  },
  {
    id: "mayrose",
    name: "MAYROSE KLOSE",
    family: "bottom",
    desc: "Where others look for comfort, she follows the pull of distance, lift, and open risk.",
    img: "/torqassets/community/community - mayrose klose.jpg",
    width: "440px",
    height: "600px",
  },
  {
    id: "her-swimp",
    name: "HERR SWIMP",
    family: "top",
    desc: "He moves toward the parts where motion becomes travel and less like effort.",
    img: "/torqassets/community/community - herr swimpro.jpg",
    width: "440px",
    height: "600px",
  },
  {
    id: "nsikan",
    name: "NSIKAN JOHN",
    family: "bottom",
    desc: "For some, movement stays grounded. For him, it begins where the land falls away beneath him.",
    img: "/torqassets/community/community - nsikan john.jpg",
    width: "440px",
    height: "600px",
  },
];

export default function MovementGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const calculateRange = () => {
      if (scrollRef.current) {
        setScrollRange(scrollRef.current.scrollWidth - window.innerWidth);
      }
    };

    calculateRange();
    window.addEventListener("resize", calculateRange);
    return () => window.removeEventListener("resize", calculateRange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Precise lateral movement: Revealing the strip until exactly 40px padding remains
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section 
      ref={containerRef} 
      data-chrome-theme="light"
      style={{ 
        height: "600vh", 
        backgroundColor: "#131111", 
        position: "relative" 
      }}
    >
      <div style={{ 
        position: "sticky", 
        top: 0, 
        height: "100vh", 
        overflow: "hidden", 
        display: "flex", 
      }}>
        
        <motion.div 
          ref={scrollRef}
          style={{ display: "flex", x, height: "100%", alignItems: "stretch" }}
        >
          
          {/* 1. THE INTRO FRAME (Poster Stage) */}
          <div style={{ 
            width: "100vw", 
            height: "100%", 
            flexShrink: 0, 
            position: "relative",
          }}>
            {/* STAGGERED HEADLINE */}
            <div style={{ 
              position: "absolute", 
              top: "42vh", 
              left: "420px",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-anton), Anton, sans-serif",
              fontSize: "56px",
              lineHeight: "0.9",
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              zIndex: 10,
            }}>
              <span style={{ color: "white" }}>WE MOVE </span>
              <span style={{ color: "#EF4826" }}>SIDEWAYS,</span>
            </div>

            <div style={{ 
              position: "absolute", 
              top: "52vh", 
              left: "40px",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-anton), Anton, sans-serif",
              fontSize: "56px",
              lineHeight: "0.9",
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              zIndex: 10,
            }}>
              <span style={{ color: "white" }}>BUT NEVER </span>
              <span style={{ color: "#EF4826" }}>WITHOUT CONTROL.</span>
            </div>

            {/* JAY BASH - NESTED TOP CARD (150px Offset, 42px Indent) */}
            <div style={{ 
              position: "absolute", 
              top: "150px", 
              right: "40px", 
              width: "440px",
              zIndex: 5,
            }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                {/* Text Group: Flush Left */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <h3 style={{ 
                    fontFamily: "var(--font-anton), Anton, sans-serif",
                    fontSize: "42px",
                    color: "white",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                    lineHeight: "1"
                  }}>
                    {FACES[0].name}
                  </h3>
                  <p style={{ 
                    fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif",
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.9)",
                    lineHeight: "1.5",
                    maxWidth: "320px",
                  }}>
                    {FACES[0].desc}
                  </p>
                </div>

                {/* Image Group: Indented 42px */}
                <div style={{ 
                  marginTop: "42px", 
                  marginLeft: "42px", 
                  width: "calc(100% - 42px)", 
                  height: "600px", 
                  overflow: "hidden" 
                }}>
                  <img 
                    src={FACES[0].img} 
                    alt={FACES[0].name} 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. THE EDITORIAL GALLERY RAIL */}
          <div style={{ 
            display: "flex", 
            alignItems: "stretch", 
            gap: "12vw", 
            paddingLeft: "8vw", 
            paddingRight: "40px" // Tight ending padding
          }}>
            {FACES.slice(1).map((face) => {
              const isTop = face.family === "top";
              
              return (
                <div 
                  key={face.id}
                  style={{ 
                    width: face.width,
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    alignItems: "flex-start",
                  }}
                >
                  {isTop ? (
                    /* TOP CARD TEMPLATE: 150px Offset, Indented Image */
                    <div style={{ paddingTop: "150px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                      {/* Text Group: Flush Left */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <h3 style={{ 
                          fontFamily: "var(--font-anton), Anton, sans-serif", 
                          fontSize: "42px", 
                          color: "white", 
                          textTransform: "uppercase",
                          marginBottom: "16px",
                          lineHeight: "1"
                        }}>
                          {face.name}
                        </h3>
                        <p style={{ 
                          fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif", 
                          fontSize: "15px", 
                          color: "rgba(255,255,255,0.8)", 
                          lineHeight: "1.5",
                          maxWidth: "320px"
                        }}>
                          {face.desc}
                        </p>
                      </div>
                      {/* Image Group: Indented 42px */}
                      <div style={{ 
                        marginTop: "42px", 
                        marginLeft: "42px", 
                        width: "calc(100% - 42px)", 
                        height: face.height, 
                        overflow: "hidden" 
                      }}>
                        <img src={face.img} alt={face.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    </div>
                  ) : (
                    /* BOTTOM CARD TEMPLATE: 80px Offset, Indented Image first */
                    <div style={{ 
                      marginTop: "auto", 
                      paddingBottom: "80px", 
                      display: "flex", 
                      flexDirection: "column", 
                      alignItems: "flex-start" 
                    }}>
                      {/* Image Group: Indented 42px */}
                      <div style={{ 
                        marginLeft: "42px", 
                        width: "calc(100% - 42px)", 
                        height: face.height, 
                        overflow: "hidden", 
                        marginBottom: "42px" 
                      }}>
                        <img src={face.img} alt={face.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      {/* Text Group: Flush Left */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <h3 style={{ 
                          fontFamily: "var(--font-anton), Anton, sans-serif", 
                          fontSize: "42px", 
                          color: "white", 
                          textTransform: "uppercase",
                          marginBottom: "16px",
                          lineHeight: "1"
                        }}>
                          {face.name}
                        </h3>
                        <p style={{ 
                          fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif", 
                          fontSize: "15px", 
                          color: "rgba(255,255,255,0.8)", 
                          lineHeight: "1.5",
                          maxWidth: "300px"
                        }}>
                          {face.desc}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
