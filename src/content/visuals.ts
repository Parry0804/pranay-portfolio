// Cover art per project. Projects without real images get a typographic cover on a tinted
// mesh tile until Pranay supplies screens or photos.
export type Visual = { image?: string; thumb?: string; alt?: string; hover?: string; tint: [string, string] };

export const visuals: Record<string, Visual> = {
  freshcoo: { image: "/work/freshcoo/hero.jpg", thumb: "/work/freshcoo/cover.jpg", hover: "/work/freshcoo/page-03.jpg", tint: ["#1d2a14", "#0e1a0c"] },
  walmart: { tint: ["#0e1f3a", "#1a1530"] },
  "rara-energy": { tint: ["#2a1a12", "#14100c"] },
  supplementro: { tint: ["#25132a", "#0e1a2a"] },
  "doctor-one": { tint: ["#0e2a2a", "#0e1a2a"] },
  "venus-travel": { tint: ["#2a1520", "#1a1530"] },
  "lilys-travel": { tint: ["#2a2412", "#2a1a12"] },
  "aussie-grand-tours": { tint: ["#2a1a0e", "#122a1a"] },
  "exotic-miles": { tint: ["#122a24", "#1a1530"] },
  "sun-island-tour": { tint: ["#2a2010", "#0e1f3a"] },
  "trade-scratch": { tint: ["#1f1f24", "#2a1a12"] },
  pomelody: { tint: ["#2a1226", "#2a1a12"] },
  "edvantage-india": { tint: ["#13203a", "#25132a"] },
};

export const visualFor = (slug: string): Visual => visuals[slug] ?? { tint: ["#1a1530", "#0b0b0d"] };
