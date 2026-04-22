"use client";

import { useState, useEffect } from "react";
import MobileMenuOverlay from "../sections/MobileMenuOverlay";
import CartIcon from "./CartIcon";

export default function GlobalChrome() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [cartTheme, setCartTheme] = useState<"light" | "dark" | null>(null);
  const [showLogo, setShowLogo] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateStateFromElement(entry.target as HTMLElement);
        }
      });
    }, {
      rootMargin: "-10% 0px -80% 0px",
      threshold: 0
    });

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.target instanceof HTMLElement) {
          updateStateFromElement(mutation.target);
        }
      });
    });

    const updateStateFromElement = (el: HTMLElement) => {
      const sectionTheme = el.getAttribute("data-chrome-theme") as "light" | "dark";
      const sectionCartTheme = el.getAttribute("data-chrome-cart-theme") as "light" | "dark" | null;
      const logoVisibility = el.getAttribute("data-chrome-logo");
      
      if (sectionTheme) setTheme(sectionTheme);
      setCartTheme(sectionCartTheme);
      setShowLogo(logoVisibility !== "hidden");
    };

    const sections = document.querySelectorAll("[data-chrome-theme]");
    sections.forEach(s => {
      intersectionObserver.observe(s);
      mutationObserver.observe(s, { attributes: true });
    });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const isLight = theme === "light";
  const lineColor = isLight ? "#fff" : "#111";
  const activeCartTheme = cartTheme || theme;
  const cartColor = activeCartTheme === "light" ? "#fff" : "#111";

  return (
    <div
      style={{
        position: "fixed",
        top: "var(--spacing-torq-header)",
        left: 0,
        right: 0,
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      <div
        className="container-safe"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Hamburger */}
        <div
          className="tap-target"
          style={{
            flexDirection: "column",
            gap: "6px",
            width: "32px",
            pointerEvents: "auto",
            cursor: "pointer",
          }}
          onClick={() => setIsMenuOpen(true)}
        >
          <div
            style={{
              height: "2px",
              width: "100%",
              backgroundColor: lineColor,
              transition: "background-color 0.35s ease",
            }}
          />
          <div
            style={{
              height: "2px",
              width: "100%",
              backgroundColor: lineColor,
              transition: "background-color 0.35s ease",
            }}
          />
        </div>

        {/* Logo */}
        {showLogo && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              pointerEvents: "auto",
              opacity: showLogo ? 1 : 0,
              transition: "opacity 0.35s ease"
            }}
          >
            <img 
              src={isLight ? "/torqassets/logo/torq logo - black.png" : "/torqassets/logo/torq logo - black-1.png"} 
              alt="TORQ" 
              style={{
                height: "clamp(18px, 2.5vw, 24px)",
                width: "auto"
              }} 
            />
          </div>
        )}

        {/* Cart Icon */}
        <div className="tap-target" style={{ pointerEvents: "auto" }}>
          <CartIcon color={cartColor} />
        </div>
      </div>

      <MobileMenuOverlay 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </div>
  );
}
