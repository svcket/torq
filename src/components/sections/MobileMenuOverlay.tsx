"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CartIcon from "../ui/CartIcon";
import CloseIcon from "../ui/CloseIcon";

const MENU_ITEMS = [
  { label: "EVENTS", href: "#" },
  { label: "COMMUNITY", href: "#" },
  { label: "MERCHANDISE", href: "#" },
  { label: "ABOUT TOR’Q", href: "#" },
  { label: "GALLERY", href: "#" },
  { label: "BLOG", href: "#" },
];

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenuOverlay({ isOpen, onClose }: MobileMenuOverlayProps) {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle Esc key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ 
            position: "fixed", 
            inset: 0, 
            width: "100vw", 
            height: "100vh", 
            backgroundColor: "#EF4726", 
            zIndex: 10000,
            display: "flex",
            flexDirection: "column",
            pointerEvents: "auto"
          }}
        >
          {/* Top Bar */}
          <div 
            className="container-safe"
            style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              width: "100%",
              paddingTop: "var(--spacing-torq-header)",
              marginBottom: "clamp(2rem, 10vh, 5rem)"
            }}
          >
            <div className="tap-target" style={{ marginLeft: "-12px" }}>
              <CloseIcon onClick={onClose} />
            </div>
            
            <div style={{ transform: "scale(clamp(0.8, 2vw, 1.1))" }}>
              <img 
                src="/torqassets/logo/torq logo - black.png" 
                alt="TORQ" 
                style={{ height: "24px", width: "auto" }} 
              />
            </div>
            
            <div className="tap-target" style={{ marginRight: "-12px" }}>
              <CartIcon />
            </div>
          </div>

          {/* Menu Items */}
          <nav style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "clamp(1.5rem, 4vh, 3rem)",
            paddingBottom: "clamp(2rem, 10vh, 5rem)",
            overflowY: "auto"
          }}>
            {MENU_ITEMS.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
                style={{
                  fontFamily: "var(--font-anton), Anton, sans-serif",
                  fontSize: "clamp(3rem, 12vw, 5.25rem)",
                  color: "#FFBEB3",
                  textTransform: "uppercase",
                  textAlign: "center",
                  lineHeight: "0.9",
                  letterSpacing: "-0.01em",
                  textDecoration: "none",
                  display: "block",
                  padding: "8px 20px",
                  cursor: "pointer"
                }}
                whileHover={{ opacity: 0.8 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
