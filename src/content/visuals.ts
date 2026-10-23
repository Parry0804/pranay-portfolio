// Cover art per project. Freshcoo uses real project files; the others use designed
// concept mockups (browser + phone + brand board) built with each client's logo and colours.
export type Visual = { image?: string; thumb?: string; alt?: string; hover?: string; detail?: string; tint: [string, string] };

export const visuals: Record<string, Visual> = {
  freshcoo: { image: "/work/freshcoo/hero.jpg", thumb: "/work/freshcoo/cover.jpg", hover: "/work/freshcoo/page-03.jpg", tint: ["#1d2a14", "#0e1a0c"] },
  walmart: { image: "/work/walmart/cover.jpg", thumb: "/work/walmart/thumb.jpg", hover: "/work/walmart/detail.jpg", detail: "/work/walmart/detail.jpg", tint: ["#0e1f3a", "#1a1530"] },
  "rara-energy": { image: "/work/rara-energy/cover.jpg", thumb: "/work/rara-energy/thumb.jpg", hover: "/work/rara-energy/detail.jpg", detail: "/work/rara-energy/detail.jpg", tint: ["#2a1a12", "#14100c"] },
  supplementro: { image: "/work/supplementro/cover.jpg", thumb: "/work/supplementro/thumb.jpg", hover: "/work/supplementro/detail.jpg", detail: "/work/supplementro/detail.jpg", tint: ["#25132a", "#0e1a2a"] },
  "doctor-one": { image: "/work/doctor-one/cover.jpg", thumb: "/work/doctor-one/thumb.jpg", hover: "/work/doctor-one/detail.jpg", detail: "/work/doctor-one/detail.jpg", tint: ["#0e2a2a", "#0e1a2a"] },
  "venus-travel": { image: "/work/venus-travel/cover.jpg", thumb: "/work/venus-travel/thumb.jpg", hover: "/work/venus-travel/detail.jpg", detail: "/work/venus-travel/detail.jpg", tint: ["#2a1520", "#1a1530"] },
  "lilys-travel": { image: "/work/lilys-travel/cover.jpg", thumb: "/work/lilys-travel/thumb.jpg", hover: "/work/lilys-travel/detail.jpg", detail: "/work/lilys-travel/detail.jpg", tint: ["#2a2412", "#2a1a12"] },
  "aussie-grand-tours": { image: "/work/aussie-grand-tours/cover.jpg", thumb: "/work/aussie-grand-tours/thumb.jpg", hover: "/work/aussie-grand-tours/detail.jpg", detail: "/work/aussie-grand-tours/detail.jpg", tint: ["#2a1a0e", "#122a1a"] },
  "exotic-miles": { image: "/work/exotic-miles/cover.jpg", thumb: "/work/exotic-miles/thumb.jpg", hover: "/work/exotic-miles/detail.jpg", detail: "/work/exotic-miles/detail.jpg", tint: ["#122a24", "#1a1530"] },
  "sun-island-tour": { image: "/work/sun-island-tour/cover.jpg", thumb: "/work/sun-island-tour/thumb.jpg", hover: "/work/sun-island-tour/detail.jpg", detail: "/work/sun-island-tour/detail.jpg", tint: ["#2a2010", "#0e1f3a"] },
  "trade-scratch": { image: "/work/trade-scratch/cover.jpg", thumb: "/work/trade-scratch/thumb.jpg", hover: "/work/trade-scratch/detail.jpg", detail: "/work/trade-scratch/detail.jpg", tint: ["#1f1f24", "#2a1a12"] },
  pomelody: { image: "/work/pomelody/cover.jpg", thumb: "/work/pomelody/thumb.jpg", hover: "/work/pomelody/detail.jpg", detail: "/work/pomelody/detail.jpg", tint: ["#2a1226", "#2a1a12"] },
  "edvantage-india": { image: "/work/edvantage-india/cover.jpg", thumb: "/work/edvantage-india/thumb.jpg", hover: "/work/edvantage-india/detail.jpg", detail: "/work/edvantage-india/detail.jpg", tint: ["#13203a", "#25132a"] },
};

export const visualFor = (slug: string): Visual => visuals[slug] ?? { tint: ["#1a1530", "#0b0b0d"] };
