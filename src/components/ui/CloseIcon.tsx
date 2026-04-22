"use client";

export default function CloseIcon({ onClick }: { onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      style={{ 
        width: "32px", 
        height: "32px", 
        position: "relative", 
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div style={{ 
        position: "absolute", 
        width: "100%", 
        height: "2px", 
        backgroundColor: "#ffffff", 
        transform: "rotate(45deg)" 
      }} />
      <div style={{ 
        position: "absolute", 
        width: "100%", 
        height: "2px", 
        backgroundColor: "#ffffff", 
        transform: "rotate(-45deg)" 
      }} />
    </div>
  );
}
