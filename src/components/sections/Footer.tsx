// Font usage refactored to use global CSS variables

const NAV_LINKS_ROW_1 = [
  "ABOUT", "EVENTS", "MERCH", "GALLERY", "STORIES", "PARTNERSHIP"
];

const NAV_LINKS_ROW_2 = [
  "COMMUNITY", "FAQs", "TERMS OF USE", "PRIVACY POLICY", "COOKIE POLICY", "LEGAL"
];

const SocialIcon = ({ type }: { type: "instagram" | "threads" | "x" }) => {
  const icons = {
    instagram: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
    threads: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12a4 4 0 1 1-4-4h8a4 4 0 1 1-4 4z"></path>
        <path d="M12 2a10 10 0 1 1-6.14 17.86"></path>
      </svg>
    ),
    x: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
      </svg>
    )
  };
  return icons[type];
};

export default function Footer() {
  return (
    <footer 
      style={{ 
        height: "100vh", 
        backgroundColor: "#131111", 
        position: "relative", 
        overflow: "hidden",
        width: "100%"
      }}
    >
      {/* 1. Main Heading */}
      <div 
        style={{ 
          paddingTop: "128px", 
          textAlign: "center", 
          position: "relative", 
          zIndex: 10 
        }}
      >
        <h2 style={{ 
          fontFamily: "var(--font-anton), Anton, sans-serif",
          fontSize: "48px",
          fontWeight: 400,
          lineHeight: "1.1",
          textTransform: "uppercase",
          margin: 0
        }}>
          <span style={{ color: "#FFE7E3" }}>CULTURE IN </span>
          <span style={{ color: "#EF4826" }}>MOTION</span>
        </h2>

        {/* 2. Navigation Links */}
        <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Row 1 */}
          <div style={{ display: "flex", justifyContent: "center", gap: "48px" }}>
            {NAV_LINKS_ROW_1.map((link) => (
              <a 
                key={link} 
                href="#" 
                style={{ 
                  fontFamily: "var(--font-anton), Anton, sans-serif",
                  fontSize: "18px",
                  color: "rgba(255, 255, 255, 0.9)",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                  fontWeight: 400
                }}
              >
                {link}
              </a>
            ))}
          </div>
          {/* Row 2 */}
          <div style={{ display: "flex", justifyContent: "center", gap: "48px" }}>
            {NAV_LINKS_ROW_2.map((link) => (
              <a 
                key={link} 
                href="#" 
                style={{ 
                  fontFamily: "var(--font-anton), Anton, sans-serif",
                  fontSize: "18px",
                  color: "rgba(255, 255, 255, 0.9)",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                  fontWeight: 400
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* 3. Social Icons */}
        <div style={{ marginTop: "48px", display: "flex", justifyContent: "center", gap: "24px", color: "rgba(255, 255, 255, 0.7)" }}>
          <a href="#" style={{ color: "inherit" }} aria-label="Instagram"><SocialIcon type="instagram" /></a>
          <a href="#" style={{ color: "inherit" }} aria-label="Threads"><SocialIcon type="threads" /></a>
          <a href="#" style={{ color: "inherit" }} aria-label="X"><SocialIcon type="x" /></a>
        </div>

        {/* 4. Copyright */}
        <div 
          style={{ 
            marginTop: "32px", 
            fontFamily: "var(--font-anton), Anton, sans-serif",
            fontSize: "16px",
            color: "rgba(255, 255, 255, 0.6)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontWeight: 400
          }}
        >
          © 2026 TOR’Q... ALL RIGHTS RESERVED.
        </div>
      </div>

      {/* 5. Illustrations / Drawings (Unified Sketch Block) */}
      <div 
        style={{ 
          position: "absolute", 
          inset: 0, 
          pointerEvents: "none", 
          zIndex: 1,
          display: "flex",
          alignItems: "flex-end"
        }}
      >
        <img 
          src="/torqassets/vehicles/vehicles for footer -  .png" 
          alt="" 
          style={{ 
            width: "100%", 
            height: "auto",
            maxHeight: "85vh",
            objectFit: "contain",
            opacity: 1,
            marginBottom: "-20px" // Slight bleed off frame
          }} 
        />
      </div>
    </footer>
  );
}
