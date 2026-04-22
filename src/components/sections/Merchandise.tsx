"use client";

import React from "react";

const PRODUCTS = [
  {
    id: 1,
    name: "TORQSIDE JACKET",
    price: "$67",
    img: "/torqassets/merch/merch - TOR’QSIDE JACKET.png",
  },
  {
    id: 2,
    name: "TORQ - MONACO CAP",
    price: "$28",
    img: "/torqassets/merch/merch - TOR’Q - MONACO CAP.png",
  },
  {
    id: 3, // Empty slot 1 (Row 1, Col 3)
    empty: true,
  },
  {
    id: 4,
    name: "TORQSIDE PANTS",
    price: "$39",
    img: "/torqassets/merch/merch - TOR’QSIDE PANTS.png",
  },
  {
    id: 5,
    name: "NIGHT RUN BANDANA",
    price: "$22",
    img: "/torqassets/merch/merch - NIGHT RUN BANDANA.png",
  },
  {
    id: 6,
    name: "TORQ MOTION SOCKS",
    price: "$15",
    img: "/torqassets/merch/merch - TOR’Q MOTION SOCKS.png",
  },
  {
    id: 7, // Empty slot 2 (Row 2, Col 2)
    empty: true,
  },
  {
    id: 8,
    name: "NIGHT DRIFT LONG SLEEVE",
    price: "$30",
    img: "/torqassets/merch/merch - NIGHT DRIFT LONG SLEEVE.png",
  },
  {
    id: 9,
    name: "ASTA-LAVISTA BALACLAVA",
    price: "$85",
    img: "/torqassets/merch/merch - ASTA-LAVISTA BALACLAVA.png",
  },
  {
    id: 10,
    name: "TORQ SUNGLASSES",
    price: "$19",
    img: "/torqassets/merch/merch - TOR’Q SUNGLASSES.png",
  },
];

export default function Merchandise() {
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
      {/* Intro Header area */}
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

      {/* Editorial Grid (5 Columns) */}
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

          return (
            <div key={product.id} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <div style={{ 
                width: "100%", 
                aspectRatio: "3/4", 
                backgroundColor: "#E8E8E8",
                overflow: "hidden",
                marginBottom: "20px"
              }}>
                <img 
                  src={product.img} 
                  alt={product.name} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <h3 style={{ 
                fontFamily: "var(--font-anton), Anton, sans-serif",
                fontSize: "13px",
                color: "#4A4A48",
                textTransform: "uppercase",
                marginBottom: "8px",
                letterSpacing: "0.05em",
                fontWeight: 400
              }}>
                {product.name}
              </h3>
              <p style={{ 
                fontFamily: "var(--font-anton), Anton, sans-serif",
                fontSize: "18px",
                color: "#000000",
                fontWeight: 400
              }}>
                {product.price}
              </p>
            </div>
          );
        })}
      </div>

      {/* Bottom-Right CTA */}
      <div style={{ 
        marginTop: "100px", 
        alignSelf: "flex-end"
      }}>
        <a 
          href="#" 
          style={{ 
            fontFamily: "var(--font-anton), Anton, sans-serif",
            fontSize: "16px",
            color: "#EF4826",
            textTransform: "uppercase",
            textDecoration: "underline",
            textUnderlineOffset: "4px",
            letterSpacing: "0.05em"
          }}
        >
          EXPLORE WARDROBE
        </a>
      </div>
    </section>
  );
}
