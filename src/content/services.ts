export const services = [
  {
    no: "01",
    name: "Fractional CTO",
    short: ["Architecture", "Tech hiring", "Roadmaps"],
    description:
      "Senior technology leadership without a full-time hire. I set the technical direction, build the team and make sure what gets built can scale.",
    bestFor: "Startups and scale-ups without a full-time CTO",
    includes: [
      "Tech strategy & architecture",
      "Build vs. buy decisions",
      "Hiring and leading engineers",
      "Agency & vendor management",
      "Security and scalability reviews",
    ],
  },
  {
    no: "02",
    name: "Product management",
    short: ["Discovery", "Roadmaps", "Launch"],
    description:
      "I turn a fuzzy idea into a clear, prioritised product, then stay with the team until it ships and grows.",
    bestFor: "Founders and teams with an idea that needs shape",
    includes: [
      "Discovery & user research",
      "Roadmaps & prioritisation",
      "Specs and user stories",
      "Launch plans and growth metrics",
    ],
  },
  {
    no: "03",
    name: "Design & branding",
    short: ["UX / UI", "Design systems", "Identity"],
    description:
      "Years of design craft, from research and UX to UI, design systems and identity. Including print work like the Freshcoo menu.",
    bestFor: "Brands that want to look and feel world-class",
    includes: [
      "UX research & wireframes",
      "Interactive prototypes",
      "UI and design systems",
      "Brand identity",
      "Print, menu & packaging",
    ],
  },
  {
    no: "04",
    name: "Project & delivery management",
    short: ["Scoping", "Agile delivery", "Reporting"],
    description:
      "Clear scope, realistic timelines and weekly reporting, so projects land on time and on budget.",
    bestFor: "Agencies, enterprises and multi-team projects",
    includes: [
      "Scoping and estimates",
      "Agile sprints",
      "Multi-vendor coordination",
      "Weekly status reports",
      "Risk management",
    ],
  },
];

export const process = [
  { no: "01", name: "Discover", text: "Goals, users, constraints. We agree what success looks like." },
  { no: "02", name: "Define", text: "Scope, roadmap and a plan everyone signs off." },
  { no: "03", name: "Design", text: "Flows, prototypes and UI, tested with real users." },
  { no: "04", name: "Build", text: "Engineering in short sprints, with weekly demos." },
  { no: "05", name: "Launch & grow", text: "Go live, measure and keep improving." },
];

export const engagements = [
  { name: "Project", text: "Fixed scope, fixed timeline. Ideal for a launch, a redesign or a brand." },
  { name: "Retainer", text: "A monthly block of product, design or delivery time for ongoing work.", popular: true },
  { name: "Fractional leadership", text: "CTO or Head of Product, a set number of days each week." },
];

// TODO: answers for the last three questions need Pranay's input.
export const faqs = [
  {
    q: "Do you work with early-stage startups?",
    a: "Yes. Many of my clients are founders with an idea and no tech team yet. I help shape the product and set up the team to build it.",
  },
  {
    q: "Can you work alongside my existing team?",
    a: "Yes. I can lead, advise or fill a gap in product, design or engineering leadership, and fit into the tools and rituals your team already uses.",
  },
  {
    q: "How quickly can we start?",
    a: "Usually within one to two weeks of a first call, once we agree on scope.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes. I work remotely with teams worldwide and overlap with most time zones.",
  },
];

export const skills = [
  { group: "Product & strategy", items: ["Product strategy", "Roadmapping", "Business process", "Operations management", "Sales operations"] },
  { group: "Design", items: ["UX research", "Wireframing", "Prototyping", "UI design", "Usability testing", "Brand identity", "Design systems"] },
  { group: "Technology & leadership", items: ["Engineering leadership", "Platform architecture", "Team building", "Agile delivery"] },
];

export const principles = [
  { name: "People first", text: "Every decision starts with the user and the team who will build it." },
  { name: "Design is how it works", text: "Good design is clear thinking made visible, not decoration." },
  { name: "Ship, then sharpen", text: "Launch early, learn fast and improve with real data." },
  { name: "Own the outcome", text: "I measure success by results for the business, not by deliverables." },
];
