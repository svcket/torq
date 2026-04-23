"use client";

import React, { useState, useEffect } from "react";
import { getCloudinaryUrl } from "@/lib/cloudinary";

const PRODUCTS = [
  {
    id: 1,
    name: "TORQSIDE JACKET",
    price: "$67",
    img: getCloudinaryUrl("merch/merch - TOR’QSIDE JACKET.png"),
  },
  {
    id: 2,
    name: "TORQ - MONACO CAP",
    price: "$28",
    img: getCloudinaryUrl("merch/merch - TOR’Q - MONACO CAP.png"),
  },
  {
    id: 3, // Empty slot 1 (Row 1, Col 3)
    empty: true,
  },
  {
    id: 4,
    name: "TORQSIDE PANTS",
    price: "$39",
    img: getCloudinaryUrl("merch/merch - TOR’QSIDE PANTS.png"),
  },
  {
    id: 5,
    name: "NIGHT RUN BANDANA",
    price: "$22",
    img: getCloudinaryUrl("merch/merch - NIGHT RUN BANDANA.png"),
  },
  {
    id: 6,
    name: "TORQ MOTION SOCKS",
    price: "$15",
    img: getCloudinaryUrl("merch/merch - TOR’Q MOTION SOCKS.png"),
  },
  {
    id: 7, // Empty slot 2 (Row 2, Col 2)
    empty: true,
  },
  {
    id: 8,
    name: "NIGHT DRIFT LONG SLEEVE",
    price: "$30",
    img: getCloudinaryUrl("merch/merch - NIGHT DRIFT LONG SLEEVE.png"),
  },
  {
    id: 9,
    name: "ASTA-LAVISTA BALACLAVA",
    price: "$85",
    img: getCloudinaryUrl("merch/merch - ASTA-LAVISTA BALACLAVA.png"),
  },
  {
    id: 10,
    name: "TORQ SUNGLASSES",
    price: "$19",
    img: getCloudinaryUrl("merch/merch - TOR’Q SUNGLASSES.png"),
  },
];

// -- Sub-components ---------------------------------------------------------

function ProductCard({ product, isMobile }: { product: typeof PRODUCTS[0], isMobile: boolean }) {
  if (product.empty) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <div style={{ 
        width: "100%", 
        aspectRatio: "3/4", 
        backgroundColor: "#E8E8E8",
        overflow: "hidden",
        marginBottom: isMobile ? "12px" : "20px"
      }}>
        <img 
          src={product.img} 
          alt={product.name} 
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <h3 style={{ 
        fontFamily: "var(--font-anton), Anton, sans-serif",
        fontSize: isMobile ? "12px" : "13px",
        color: "#4A4A48",
        textTransform: "uppercase",
        marginBottom: isMobile ? "4px" : "8px",
        letterSpacing: "0.05em",
        fontWeight: 400,
        lineHeight: 1.2
      }}>
        {product.name}
      </h3>
      <p style={{ 
        fontFamily: "var(--font-anton), Anton, sans-serif",
        fontSize: isMobile ? "16px" : "18px",
        color: "#000000",
        fontWeight: 400
      }}>
        {product.price}
      </p>
    </div>
  );
}

// -- Main View Components ---------------------------------------------------

function DesktopView() {
  return (
    <section 
      data-chrome-theme="dark"
      style={{ 
        backgroundColor: "#F4F4F4", 
        paddingLeft: "40px", 
        paddingRight: "40px",
        paddingTop: "120px",
        paddingBottom: "80px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative"
      }}
    >
      <div style={{ marginBottom: "100px", maxWidth: "1200px" }}>
        <h2 style={{ 
          fontFamily: "var(--font-anton), Anton, sans-serif",
          fontSize: "56px",
          color: "#000000",
          textTransform: "uppercase",
          lineHeight: "0.9",
          marginBottom: "32px",
          letterSpacing: "-0.02em"
        }}>
          MERCHANDISE
        </h2>
        <p style={{ 
          fontFamily: "var(--font-sans), sans-serif",
          fontSize: "18px",
          color: "#4A4A48",
          lineHeight: "1.4",
          maxWidth: "480px"
        }}>
          Curated essentials for the scene. Precision-cut outerwear and heavy-weight essentials built for the long haul.
        </p>
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(5, 1fr)", 
        columnGap: "32px", 
        rowGap: "80px",
        flex: 1
      }}>
        {PRODUCTS.map((product) => {
          if (product.empty) {
            return <div key={product.id} aria-hidden="true" />;
          }
          return <ProductCard key={product.id} product={product} isMobile={false} />;
        })}
      </div>

      <div style={{ marginTop: "100px", alignSelf: "flex-end" }}>
        <a href="#" style={{ 
          fontFamily: "var(--font-anton), Anton, sans-serif",
          fontSize: "16px",
          color: "#EF4826",
          textTransform: "uppercase",
          textDecoration: "underline",
          textUnderlineOffset: "4px",
          letterSpacing: "0.05em"
        }}>
          EXPLORE WARDROBE
        </a>
      </div>
    </section>
  );
}

function MobileView() {
  // Filter out empty slots for a clean 2-column grid on mobile
  const activeProducts = PRODUCTS.filter(p => !p.empty);

  return (
    <section 
      data-chrome-theme="dark"
      style={{ 
        backgroundColor: "#F4F4F4", 
        paddingLeft: "16px", 
        paddingRight: "16px",
        paddingTop: "120px",
        paddingBottom: "80px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative"
      }}
    >
      <div style={{ marginBottom: "48px" }}>
        <h2 style={{ 
          fontFamily: "var(--font-anton), Anton, sans-serif",
          fontSize: "42px",
          color: "#000000",
          textTransform: "uppercase",
          lineHeight: "1",
          marginBottom: "16px",
          letterSpacing: "-0.01em"
        }}>
          MERCHANDISE
        </h2>
        <p style={{ 
          fontFamily: "var(--font-sans), sans-serif",
          fontSize: "16px",
          color: "#4A4A48",
          lineHeight: "1.5",
          maxWidth: "100%"
        }}>
          Curated essentials for the scene. Precision-cut outerwear and heavy-weight essentials built for the long haul.
        </p>
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(2, 1fr)", 
        columnGap: "16px", 
        rowGap: "32px",
        flex: 1
      }}>
        {activeProducts.map((product) => (
          <ProductCard key={product.id} product={product} isMobile={true} />
        ))}
      </div>

      <div style={{ marginTop: "64px", alignSelf: "center" }}>
        <a href="#" style={{ 
          fontFamily: "var(--font-anton), Anton, sans-serif",
          fontSize: "16px",
          color: "#EF4826",
          textTransform: "uppercase",
          textDecoration: "underline",
          textUnderlineOffset: "4px",
          letterSpacing: "0.05em"
        }}>
          EXPLORE WARDROBE
        </a>
      </div>
    </section>
  );
}

// -- Main Component ---------------------------------------------------------

export default function Merchandise() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!mounted) return null;

  return isMobile ? <MobileView /> : <DesktopView />;
}
