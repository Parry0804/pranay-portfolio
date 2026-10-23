export type Role = {
  initial: string;
  company: string;
  title: string;
  period: string;
  location: string;
  summary: string;
  doing: string[];
  results: { value: string; label: string }[];
  tags: string[];
  current?: boolean;
};

// Text in [square brackets] is a placeholder waiting for real details.
export const roles: Role[] = [
  {
    initial: "G",
    company: "GetHire",
    title: "Chief Technology Officer",
    period: "[Start date] – Present",
    location: "[Location]",
    current: true,
    summary:
      "I lead technology, product and engineering at GetHire. I own the platform roadmap, the engineering team and how we deliver.",
    doing: [
      "Set technical strategy and platform architecture",
      "Lead and grow the engineering team",
      "Own the product roadmap with leadership",
      "Run delivery, quality and release process",
    ],
    results: [{ value: "[Result]", label: "add a key metric" }],
    tags: ["Platform architecture", "Engineering leadership", "Product roadmap", "Hiring"],
  },
  {
    initial: "D",
    company: "Databytely",
    title: "Founder",
    period: "Jan 2026 – Present",
    location: "New Delhi, India",
    summary:
      "Founded Databytely to help organisations build their digital infrastructure and data products.",
    doing: [
      "Company strategy and positioning",
      "Client discovery and solution design",
      "Building the founding team",
    ],
    results: [],
    tags: ["Digital infrastructure", "Data products"],
  },
  {
    initial: "T",
    company: "Talent Thread",
    title: "Founder",
    period: "Jan 2025 – Present",
    location: "New Delhi, India",
    summary:
      "Building an AI-enabled freelancing platform with a skill advancement feature, helping creative talent grow and find work.",
    doing: [
      "Product vision and roadmap",
      "AI-powered matching and skill paths",
      "Community and creator growth",
    ],
    results: [],
    tags: ["AI product", "Marketplace", "Community"],
  },
  {
    initial: "D",
    company: "Diznovate",
    title: "Founder & Creative Director",
    period: "Jul 2022 – Present",
    location: "New Delhi, India",
    summary:
      "Founded and lead a design and technology studio that delivers brand, product and digital projects for clients across industries.",
    doing: [
      "Lead creative direction and client delivery",
      "Built the studio design process and team",
      "Own sales, pricing and client relationships",
    ],
    results: [
      { value: "+40%", label: "client satisfaction" },
      { value: "−20%", label: "project timelines" },
      { value: "EBITDA+", label: "profitable studio" },
    ],
    tags: ["Creative direction", "Agency leadership", "Design systems"],
  },
  {
    initial: "I",
    company: "Independent · 20+ companies",
    title: "Project, Product & Design Manager",
    period: "Jul 2019 – Jun 2024",
    location: "Remote",
    summary:
      "Worked as a freelance UX, product and project lead for more than 20 companies, including Walmart, Freshcoo, Rara Energy, Supplementro, Doctor One and five travel brands.",
    doing: [
      "User research and data-driven UX",
      "Product roadmaps and delivery management",
      "Data visualisation and onboarding design",
    ],
    results: [
      { value: "+30%", label: "conversion rates" },
      { value: "+25%", label: "user retention" },
      { value: "−25%", label: "onboarding time" },
    ],
    tags: ["UX research", "Product management", "Project delivery"],
  },
  {
    initial: "E",
    company: "Edvantage India",
    title: "Graphic Designer → Design Team Manager",
    period: "Early career",
    location: "India",
    summary:
      "Started as a graphic designer and was promoted to lead the design team, managing brand and product design projects.",
    doing: [
      "Brand and marketing design",
      "Led and mentored the design team",
      "Introduced user-centred design practice",
    ],
    results: [],
    tags: ["Brand design", "Team leadership"],
  },
];

export const education = [
  { school: "NMIMS Global", years: "2022 – 2024" },
  { school: "Rajiv Gandhi Prodyogiki Vishwavidyalaya", years: "2017 – 2021" },
  { school: "CBSE · Mathematics", years: "2014 – 2016" },
];

export const milestones = [
  { year: "Early career", company: "Edvantage India", note: "Graphic designer → Design Team Manager" },
  { year: "2019", company: "Independent", note: "UX, product & project lead for 20+ companies" },
  { year: "2022", company: "Diznovate", note: "Founded a design & tech studio" },
  { year: "2025", company: "Talent Thread", note: "AI freelancing platform" },
  { year: "2026", company: "Databytely", note: "Founded" },
  { year: "Now", company: "GetHire", note: "Chief Technology Officer" },
];

export const companies = [
  "Walmart", "Freshcoo", "Rara Energy", "Supplementro", "Doctor One", "Trade Scratch",
  "Pomelody", "Edvantage India", "Venus Travel", "Lily's Travel", "Aussie Grand Tours",
  "Exotic Miles", "Sun Island Tour", "Talent Thread", "Databytely", "Diznovate", "GetHire",
];
