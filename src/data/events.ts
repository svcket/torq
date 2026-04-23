export interface EventRecord {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  highlights: string[];
  lineups: string[];
  mediaUrl: string;
  mediaType: "image" | "video";
}

export const EVENTS: EventRecord[] = [
  {
    id: "drift",
    title: "TOR'Q DRIFT WEEKEND '26 - SEASON 2",
    description: "A live drift showcase where machine control, custom builds, and crowd energy meet in a charged urban setting.",
    date: "SAT. 15 MAY, 2026 | 14:30",
    venue: "TOR'Q ARENA (ZODIAC), OPPOSITE LANDMARK, VI",
    highlights: ["NIGHT DRIFT SESSIONS", "VIP PIT ACCESS", "MUSIC & CROWD ATMOSPHERE"],
    lineups: ["JAY BASH", "CAPTAIN AWAL", "AUTO CRAFT"],
    mediaUrl: "/torqassets/events/event image 1.jpg",
    mediaType: "image",
  },
  {
    id: "mud",
    title: "TOR'Q MUD CIRCUIT '26",
    description: "A high-intensity motocross showcase where speed meets lift, and every jump cuts through mud, noise, and crowd pressure.",
    date: "SAT. 15 MAY, 2026 | 14:30",
    venue: "TOR'Q ARENA (MUTANDA), GWARIMPA, ABUJA",
    highlights: ["MOTOCROSS SHOW RUNS", "ELEVATED JUMP SEQUENCES", "TRACKSIDE VIP ACCESS"],
    lineups: ["JAY BASH", "CAPTAIN AWAL", "AUTO CRAFT"],
    mediaUrl: "/torqassets/events/event image 2.jpg",
    mediaType: "image",
  },
  {
    id: "cars",
    title: "CARS & COFFEE '26",
    description: "A community meet where custom builds face off. Grab a brew, lift the bonnet, and connect with fellow enthusiasts over raw horsepower and exhaust notes.",
    date: "SAT. 15 MAY, 2026 | 14:30",
    venue: "TAFAWA BALEWA SQUARE, CMS, LAGOS ISLAND",
    highlights: ["VIP PIT ACCESS", "COMMUNITY MEET HOURS", "TRACKSIDE PARKING"],
    lineups: ["JAY BASH", "CAPTAIN AWAL", "AUTO CRAFT"],
    mediaUrl: "/torqassets/events/event image 3.jpg",
    mediaType: "image",
  },
  {
    id: "ice",
    title: "AFTER DARK ICE GLIDE",
    description: "A seasonal night experience where movement shifts from speed to glide, bringing people together through skating, sound, and shared atmosphere.",
    date: "SAT. 15 MAY, 2026 | 14:30",
    venue: "TAFAWA BALEWA SQUARE, CMS, LAGOS ISLAND",
    highlights: ["COMMUNITY SKATE HOURS", "ELEVATED JUMP SEQUENCES", "TRACKSIDE VIP ACCESS"],
    lineups: ["JAY BASH", "CAPTAIN AWAL", "AUTO CRAFT"],
    mediaUrl: "/torqassets/events/event image 4.jpg",
    mediaType: "image",
  },
  {
    id: "skate",
    title: "SKATE RHAPSODY '26",
    description: "A concrete bowl takeover featuring underground riders, high-air tricks, and a raw soundscape that amplifies every landing.",
    date: "SAT. 15 MAY, 2026 | 14:30",
    venue: "TAFAWA BALEWA SQUARE, CMS, LAGOS ISLAND",
    highlights: ["COMMUNITY SKATE HOURS", "ELEVATED JUMP SEQUENCES", "TRACKSIDE VIP ACCESS"],
    lineups: ["JAY BASH", "CAPTAIN AWAL", "AUTO CRAFT"],
    mediaUrl: "/torqassets/events/event image 5.jpg",
    mediaType: "image",
  },
];
