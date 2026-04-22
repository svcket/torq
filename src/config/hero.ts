export interface HeroSlide {
  id: string;
  type: "video" | "image";
  url: string;
  alt: string;
  duration?: number;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "drift-night",
    type: "video",
    url: "/torq-assets/hero-videos/drift-night.mp4",
    alt: "Night drifting session at TOR'Q Arena",
    duration: 5000,
  },
  {
    id: "drift-road",
    type: "video",
    url: "/torq-assets/hero-videos/drift-road.mp4",
    alt: "High-speed drift on an open road",
    duration: 5000,
  },
  {
    id: "motocross-sunset",
    type: "video",
    url: "/torq-assets/hero-videos/motocross-sunset.mp4",
    alt: "Motocross stunt during sunset",
    duration: 5000,
  },
  {
    id: "skatepark",
    type: "video",
    url: "/torq-assets/hero-videos/skatepark.mp4",
    alt: "Skateboarders catching air in a concrete bowl",
    duration: 4000,
  },
  {
    id: "bmx-ramp",
    type: "video",
    url: "/torq-assets/hero-videos/bmx-ramp.mp4",
    alt: "BMX rider performing a flip on a ramp",
    duration: 4000,
  },
];

// Next section bridge reveal media
export const BRIDGE_VIDEO =
  "/torq-assets/hero-videos/drift-night.mp4";
