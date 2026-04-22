"use client";

import { useState } from "react";
import Logo from "../ui/Logo";
import MenuIcon from "../ui/MenuIcon";
import MobileMenuOverlay from "./MobileMenuOverlay";

export default function HeroNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="absolute top-[28px] left-0 right-0 z-50 flex items-center justify-between px-torq-40 pointer-events-none">
        {/* Left Menu Section */}
        <div 
          className="flex-1 pointer-events-auto"
          onClick={() => setIsMenuOpen(true)}
        >
          <MenuIcon />
        </div>

        {/* Center Logo Section (Viewport Centered) */}
        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
          <Logo />
        </div>

        {/* Right Spacer (Ensures symetry or future items) */}
        <div className="flex-1" />
      </nav>

      <MobileMenuOverlay 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </>
  );
}
