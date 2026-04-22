"use client";

export default function Logo({ color = "#EF4826", textColor = "white" }: { color?: string, textColor?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {/* Reconstructed Brick Arc Logo — Segmented C shape */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g transform="rotate(-15 14 14)">
          {/* Brick 1 - Top */}
          <path d="M14 2C16.8 2 19.5 2.8 21.8 4.2L18.5 7.5C17.2 6.6 15.6 6.1 14 6.1V2Z" fill={color} />
          {/* Brick 2 */}
          <path d="M22.5 5.5C24.5 7.5 25.8 10.1 26 13H22C21.8 11.2 21 9.6 19.8 8.4L22.5 5.5Z" fill={color} />
          {/* Brick 3 */}
          <path d="M26 15C25.8 17.9 24.5 20.5 22.5 22.5L19.8 19.6C21 18.4 21.8 16.8 22 15H26Z" fill={color} />
          {/* Brick 4 */}
          <path d="M21.8 23.8C19.5 25.2 16.8 26 14 26V22C15.6 22 17.2 21.4 18.5 20.5L21.8 23.8Z" fill={color} />
          {/* Brick 5 */}
          <path d="M12 26C9.2 26 6.5 25.2 4.2 23.8L7.5 20.5C8.8 21.4 10.4 22 12 22V26Z" fill={color} />
          {/* Brick 6 */}
          <path d="M3.5 22.5C1.5 20.5 0.2 17.9 0 15H4C4.2 16.8 5 18.4 6.2 19.6L3.5 22.5Z" fill={color} />
          {/* Brick 7 */}
          <path d="M0 13C0.2 10.1 1.5 7.5 3.5 5.5L6.2 8.4C5 9.6 4.2 11.2 4 13H0Z" fill={color} />
          {/* Brick 8 */}
          <path d="M4.2 4.2C6.5 2.8 9.2 2 12 2V6C10.4 6 8.8 6.6 7.5 7.5L4.2 4.2Z" fill={color} />
        </g>
      </svg>

      {/* TORQ Wordmark */}
      <svg
        width="72"
        height="18"
        viewBox="0 0 72 18"
        fill={textColor}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="TORQ"
      >
        <path d="M0 2H12V4.5H7.25V16H4.75V4.5H0V2Z" />
        <path d="M18 9C18 5.1 20.9 2 24.5 2C28.1 2 31 5.1 31 9C31 12.9 28.1 16 24.5 16C20.9 16 18 12.9 18 9ZM20.5 9C20.5 11.5 22.3 13.5 24.5 13.5C26.7 13.5 28.5 11.5 28.5 9C28.5 6.5 26.7 4.5 24.5 4.5C22.3 4.5 20.5 6.5 20.5 9Z" />
        <path d="M36 2H43C45.2 2 47 3.8 47 6C47 7.5 46.2 8.8 45 9.5L47.5 16H44.8L42.6 10H38.5V16H36V2ZM38.5 7.5H43C43.8 7.5 44.5 6.8 44.5 6C44.5 5.2 43.8 4.5 43 4.5H38.5V7.5Z" />
        <path d="M52 9C52 5.1 54.9 2 58.5 2C62.1 2 65 5.1 65 9C65 11.2 64.1 13.2 62.6 14.5L65 16.8L63.3 18.5L60.7 16.1C60 16.3 59.3 16.4 58.6 16.4C54.9 16 52 12.9 52 9ZM54.5 9C54.5 11.5 56.3 13.5 58.5 13.5C60.7 13.5 62.5 11.5 62.5 9C62.5 6.5 60.7 4.5 58.5 4.5C56.3 4.5 54.5 6.5 54.5 9Z" />
      </svg>
    </div>
  );
}
