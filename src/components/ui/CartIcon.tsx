"use client";

export default function CartIcon({ color = "white" }: { color?: string }) {
  return (
    <div style={{ width: "32px", height: "32px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Reconstructed from Image 2: A minimalist shopping cart with rounded corners */}
      <svg 
        width="28" 
        height="28" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <circle cx="9" cy="21" r="1" fill={color} />
        <circle cx="20" cy="21" r="1" fill={color} />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    </div>
  );
}
