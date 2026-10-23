// Per-project art direction for the generated covers.
const card = (title, place, days, price, scene) => ({ title, place, days, price, scene });

export const covers = [
  {
    slug: "walmart", kind: "retail", wordmark: "Walmart <span style='color:#ffc220'>✳</span>", domain: "walmart.com", seed: 11,
    theme: { bg: "#ffffff", fg: "#1a1a1a", mut: "#6b6f76", ac: "#0071dc", ac2: "#ffc220", card: "#f4f6f9", line: "#e3e6ea", hf: "Plus Jakarta Sans", ff: "Inter" },
    stage: ["#0b2a55", "#0a1430"],
  },
  {
    slug: "rara-energy", kind: "rara", logo: "rara-energy.png", logoH: 40, domain: "raraenergy.in", seed: 4,
    theme: { bg: "#0b1612", fg: "#eef6ee", mut: "#93a89a", ac: "#9be15d", ac2: "#2f7d4f", card: "#12231c", line: "#21362c", hf: "Sora", ff: "Inter", dark: true },
    stage: ["#123524", "#0a1410"],
  },
  {
    slug: "supplementro", kind: "supp", logo: "supplementro.png", logoH: 22, domain: "supplementro.com", seed: 7,
    theme: { bg: "#f5f2ec", fg: "#141416", mut: "#6c6a66", ac: "#e8352b", ac2: "#141416", card: "#ffffff", line: "#e6e1d8", hf: "Archivo Black", ff: "Inter" },
    stage: ["#3a1210", "#120a0a"],
  },
  {
    slug: "doctor-one", kind: "health", wordmark: "<span style='color:#1f9d8b'>✚</span> Doctor<b>One</b>", domain: "doctorone.in", seed: 9,
    theme: { bg: "#f4faf9", fg: "#0f2a2a", mut: "#5d7472", ac: "#1f9d8b", ac2: "#e07a5f", card: "#ffffff", line: "#dcebe8", hf: "Plus Jakarta Sans", ff: "Inter" },
    stage: ["#0d3b38", "#08161a"],
  },
  {
    slug: "venus-travel", kind: "travel", logo: "venus-travel.png", logoH: 46, domain: "venustravel.in", seed: 3,
    theme: { bg: "#fbf7f0", fg: "#2a1a10", mut: "#7a6a5c", ac: "#c8901a", ac2: "#6b3e26", card: "#ffffff", line: "#ece3d4", hf: "Fraunces", ff: "Inter" },
    stage: ["#3d2410", "#140c08"],
    travel: {
      scene: "himalaya", links: ["Destinations", "Packages", "Pilgrimages", "Contact"], cta: "Plan my trip",
      eyebrow: "Your journey · our commitment", headline: "Journeys across India, crafted around you.", mHeadline: "Journeys across India, crafted for you.",
      sub: "Handpicked stays, private drivers and local guides. One call, every detail taken care of.", where: "Kashmir, India", when: "12 – 18 Dec", rowTitle: "Popular packages",
      cards: [card("Kashmir Valley Escape", "Srinagar · Gulmarg", "6 days", "₹38,500", "alps"), card("Royal Rajasthan", "Jaipur · Udaipur", "8 days", "₹52,900", "desert"), card("Kerala Backwaters", "Alleppey · Munnar", "5 days", "₹29,800", "lagoon"), card("Ladakh Road Trip", "Leh · Nubra", "7 days", "₹44,200", "himalaya")],
    },
  },
  {
    slug: "lilys-travel", kind: "travel", logo: "lilys-travel.png", logoH: 40, domain: "lilystravel.com", seed: 5,
    theme: { bg: "#ffffff", fg: "#1c1416", mut: "#74686a", ac: "#c8202f", ac2: "#1c1416", card: "#fff", line: "#efe6e7", hf: "Outfit", ff: "Inter" },
    stage: ["#3a0f16", "#14080a"],
    travel: {
      scene: "coast", links: ["Trips", "Deals", "Honeymoons", "Visa help"], cta: "Get a quote",
      eyebrow: "Holidays made simple", headline: "Your next escape, booked in minutes.", sub: "Flights, stays and experiences in one itinerary, with a real person on call the whole way.",
      where: "Bali, Indonesia", when: "3 – 10 Feb", rowTitle: "Trending this month",
      cards: [card("Bali Island Hopper", "Ubud · Nusa Penida", "7 days", "₹64,900", "tropic"), card("Swiss Alps Classic", "Lucerne · Interlaken", "8 days", "₹1,48,000", "alps"), card("Santorini Sunsets", "Oia · Fira", "6 days", "₹1,12,500", "aegean"), card("Dubai Desert & City", "Dubai · Abu Dhabi", "5 days", "₹58,300", "desert")],
    },
  },
  {
    slug: "aussie-grand-tours", kind: "travel", logo: "aussie-grand-tours.png", logoH: 52, domain: "aussiegrandtours.com.au", seed: 8,
    theme: { bg: "#120d0a", fg: "#f7efe6", mut: "#b3a393", ac: "#f28c28", ac2: "#ffd27a", card: "#1c1511", line: "#2e231c", hf: "Fraunces", ff: "Inter", dark: true },
    stage: ["#4a1d0e", "#140a06"],
    travel: {
      scene: "outback", links: ["Tours", "Outback", "Reef", "Small groups"], cta: "Book a tour",
      eyebrow: "Small-group tours since 2009", headline: "See Australia the grand way.", sub: "Red centre sunrises, reef dives and coastal drives, led by guides who grew up here.",
      where: "Uluru, NT", when: "Apr 2027", rowTitle: "Signature tours",
      cards: [card("Red Centre Explorer", "Uluru · Kings Canyon", "4 days", "A$1,890", "outback"), card("Great Barrier Reef", "Cairns · Whitsundays", "5 days", "A$2,340", "lagoon"), card("Blue Mountains Walk", "Katoomba", "2 days", "A$640", "alps"), card("Great Ocean Road", "Melbourne · Apollo Bay", "3 days", "A$980", "coast")],
    },
  },
  {
    slug: "exotic-miles", kind: "travel", logo: "exotic-miles.png", logoH: 50, domain: "exoticmiles.com", seed: 6,
    theme: { bg: "#ffffff", fg: "#0f1f33", mut: "#66717f", ac: "#c62d3a", ac2: "#1f4e8c", card: "#fff", line: "#e5e9ef", hf: "Sora", ff: "Inter" },
    stage: ["#0b3a42", "#08141a"],
    travel: {
      scene: "tropic", links: ["Islands", "Safaris", "Luxury", "Honeymoon"], cta: "Enquire now",
      eyebrow: "Go further", headline: "Travel exotic. Travel easy.", sub: "Private villas, island transfers and once-in-a-lifetime experiences, planned end to end.",
      where: "Maldives", when: "14 – 20 Mar", rowTitle: "Exotic escapes",
      cards: [card("Maldives Overwater", "Malé · Baa Atoll", "5 days", "₹1,24,000", "lagoon"), card("Seychelles Hideaway", "Mahé · Praslin", "6 days", "₹1,36,500", "tropic"), card("Bhutan Monasteries", "Paro · Thimphu", "6 days", "₹72,400", "himalaya"), card("Morocco Dunes", "Marrakech · Merzouga", "7 days", "₹96,800", "desert")],
    },
  },
  {
    slug: "sun-island-tour", kind: "travel", logo: "sun-island-tour.png", logoH: 40, domain: "sunislandtours.com", seed: 12,
    theme: { bg: "#ffffff", fg: "#0c2340", mut: "#5f6f83", ac: "#1f78c8", ac2: "#f5a623", card: "#fff", line: "#e2e9f1", hf: "Plus Jakarta Sans", ff: "Inter" },
    stage: ["#0b2f55", "#081424"],
    travel: {
      scene: "aegean", links: ["Islands", "Cruises", "Day tours", "Packages"], cta: "Book now",
      eyebrow: "Mediterranean tours & cruises", headline: "Island holidays under the Mediterranean sun.", mHeadline: "Island holidays under the Mediterranean sun.",
      sub: "Greek islands, Amalfi coast cruises and day tours, with local hosts and flexible dates.", where: "Santorini, Greece", when: "Jun 2027", rowTitle: "Island favourites",
      cards: [card("Santorini & Mykonos", "Cyclades", "7 days", "€1,290", "aegean"), card("Amalfi Coast Cruise", "Positano · Capri", "5 days", "€1,480", "coast"), card("Crete Lagoons", "Balos · Elafonisi", "4 days", "€690", "lagoon"), card("Sicily Explorer", "Palermo · Etna", "6 days", "€1,120", "desert")],
    },
  },
  {
    slug: "trade-scratch", kind: "trading", logo: "trade-scratch.png", logoH: 40, domain: "tradescratch.com", seed: 14,
    theme: { bg: "#f6f8fc", fg: "#0f1b3d", mut: "#64708a", ac: "#2a62d6", ac2: "#f28c38", card: "#ffffff", line: "#e1e6f0", hf: "Space Grotesk", ff: "Inter" },
    stage: ["#0e2250", "#080e1e"],
  },
  {
    slug: "pomelody", kind: "music", wordmark: "pomelody<span style='color:#ff5f8f'>.</span>", domain: "pomelody.com", seed: 17,
    theme: { bg: "#120b16", fg: "#f6eef8", mut: "#a495aa", ac: "#ff5f8f", ac2: "#7b2ff7", card: "#1c1222", line: "#2a1f30", hf: "Outfit", ff: "Inter", dark: true },
    stage: ["#3a0f2e", "#0e0812"],
  },
  {
    slug: "edvantage-india", kind: "edu", logo: "edvantage.png", logoH: 34, domain: "edvantage.in", seed: 19,
    theme: { bg: "#f6f8ff", fg: "#0b1a4a", mut: "#5f6a8a", ac: "#2f5bea", ac2: "#ffb703", card: "#ffffff", line: "#e0e6f7", hf: "Sora", ff: "Inter" },
    stage: ["#10215a", "#080c1e"],
  },
];
