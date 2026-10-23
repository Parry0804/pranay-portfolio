export type Project = {
  slug: string;
  client: string;
  clientFull: string;
  industry: string;
  services: string;
  role: string;
  title: string;
  cardTitle: string;
  cardServices: string;
  categories: string[];
  brief: string;
  myRole: string;
  challenge: string;
  approach: string;
  outcome: string;
  results: { value: string; label: string }[];
  logo?: string;
  cover?: string;
  gallery?: string[];
  highlights?: { title: string; items: string[] };
};

// Text in [square brackets] is a placeholder waiting for real project details.
export const projects: Project[] = [
  {
    "slug": "freshcoo",
    "client": "Freshcoo",
    "clientFull": "Freshcoo The Cafe",
    "industry": "Food & beverage",
    "services": "Brand identity, menu design, print",
    "role": "Brand & design lead",
    "title": "A fresh brand and a 10-page menu for a healthy-meals cafe.",
    "cardTitle": "Brand identity and a 10-page menu for a healthy cafe",
    "cardServices": "Brand · Menu · Print",
    "categories": [
      "Brand",
      "Print"
    ],
    "brief": "Freshcoo The Cafe delivers healthy, pocket-friendly meals, with customised meal plans, fitness consultancy and weekly or monthly subscriptions. They needed a brand and menu that made healthy food feel fresh, affordable and easy to order.",
    "myRole": "I led brand and design for the project end to end, from identity direction and layout system to the final print-ready menu and flyer.",
    "challenge": "Presenting 15 menu categories, from veg meals and egg platters to pizzas and cold drinks, without overwhelming customers.",
    "approach": "A fresh green identity with leaf motifs, a bold typographic hierarchy and consistent price columns, so every page is easy to scan.",
    "outcome": "A 10-page, print-ready menu and a cover that doubles as a delivery flyer, with phone numbers and meal plans front and centre.",
    "results": [
      {
        "value": "10",
        "label": "menu pages designed"
      },
      {
        "value": "15",
        "label": "menu categories organised"
      },
      {
        "value": "1",
        "label": "brand system across menu & flyer"
      }
    ],
    "logo": "/logos/freshcoo.png",
    "cover": "/work/freshcoo/hero.jpg",
    "gallery": [
      "/work/freshcoo/page-03.jpg",
      "/work/freshcoo/page-04.jpg",
      "/work/freshcoo/page-05.jpg",
      "/work/freshcoo/page-06.jpg",
      "/work/freshcoo/page-07.jpg",
      "/work/freshcoo/page-08.jpg"
    ],
    "highlights": {
      "title": "Inside the menu",
      "items": [
        "Healthy veg meals",
        "Healthy non-veg meals",
        "Healthy egg platter",
        "Mini budget meals",
        "Appetizers",
        "Salads",
        "Wheat wraps",
        "Sandwiches",
        "Wheat pizza",
        "Non-veg pizza",
        "Italian pasta",
        "Fried rice & noodles",
        "Snacks",
        "Hot drinks",
        "Cold drinks"
      ]
    }
  },
  {
    "slug": "walmart",
    "client": "Walmart",
    "clientFull": "Walmart",
    "industry": "Retail",
    "services": "Product design, UX research",
    "role": "Product & UX lead",
    "title": "Redesigning a Fortune 1 retail experience for higher engagement.",
    "cardTitle": "Redesigning a Fortune 1 retail experience",
    "cardServices": "Product · UX",
    "categories": [
      "Product"
    ],
    "brief": "Walmart needed parts of its digital retail journey to feel simpler and more engaging for everyday shoppers, across a very large and varied audience.",
    "myRole": "I led the product and UX work on the engagement: research, flows, interface design and hand-off to engineering, while coordinating with stakeholders on scope and timelines.",
    "challenge": "Shoppers arrive with very different goals, so the experience had to stay familiar for loyal users while removing the friction that made new users drop off.",
    "approach": "We mapped the key journeys, tested where people hesitated, and rebuilt those moments with clearer hierarchy, fewer steps and consistent components.",
    "outcome": "A cleaner, faster journey that lifted engagement and gave the team a reusable set of patterns for future releases.",
    "results": [
      {
        "value": "+12.5%",
        "label": "user engagement"
      },
      {
        "value": "[X]",
        "label": "journeys redesigned"
      },
      {
        "value": "[X]",
        "label": "weeks to launch"
      }
    ]
  },
  {
    "slug": "rara-energy",
    "client": "Rara Energy",
    "clientFull": "Rara Energy",
    "industry": "Energy",
    "services": "Product, website",
    "role": "Product & project manager",
    "title": "A clear digital platform for an energy company.",
    "cardTitle": "A digital platform for an energy company",
    "cardServices": "Product · Web",
    "categories": [
      "Product",
      "Web"
    ],
    "brief": "Rara Energy wanted a digital presence that explains its energy offering clearly and turns visitors into qualified enquiries.",
    "myRole": "I managed the project end to end through Diznovate: scoping, information architecture, design direction and delivery with the development team.",
    "challenge": "Energy products are technical. The site had to make them easy to understand without losing the credibility that business buyers expect.",
    "approach": "We structured content around customer questions, used simple visuals for the technical parts, and built clear paths to contact and enquiry.",
    "outcome": "A modern, responsive platform that presents the company with confidence. [Add results, e.g. enquiries or traffic growth.]",
    "results": [
      {
        "value": "[X]",
        "label": "pages designed"
      },
      {
        "value": "[X%]",
        "label": "more enquiries"
      },
      {
        "value": "[X]",
        "label": "weeks to launch"
      }
    ],
    "logo": "/logos/rara-energy.png"
  },
  {
    "slug": "supplementro",
    "client": "Supplementro",
    "clientFull": "Supplementro",
    "industry": "E-commerce",
    "services": "Brand, e-commerce",
    "role": "Brand & product manager",
    "title": "An online store that makes supplements easy to choose.",
    "cardTitle": "An online store for a supplements brand",
    "cardServices": "Brand · E-commerce",
    "categories": [
      "Brand",
      "Web"
    ],
    "brief": "Supplementro sells health supplements online and needed a store and brand that build trust and make products easy to compare.",
    "myRole": "I led the engagement through Diznovate, owning brand direction, store UX and the delivery plan with design and development.",
    "challenge": "Supplement buyers are cautious. The store had to answer questions on ingredients, benefits and authenticity before they become doubts.",
    "approach": "A clean brand system, product pages built around benefits and proof, and a short, mobile-first checkout.",
    "outcome": "A trustworthy store ready to scale its catalogue. [Add results, e.g. conversion rate or orders.]",
    "results": [
      {
        "value": "[X%]",
        "label": "conversion rate"
      },
      {
        "value": "[X]",
        "label": "products launched"
      },
      {
        "value": "[X]",
        "label": "weeks to launch"
      }
    ],
    "logo": "/logos/supplementro.png"
  },
  {
    "slug": "doctor-one",
    "client": "Doctor One",
    "clientFull": "Doctor One",
    "industry": "Healthcare",
    "services": "Product design, UX",
    "role": "Product & UX manager",
    "title": "A patient-friendly healthcare experience.",
    "cardTitle": "A patient-friendly healthcare experience",
    "cardServices": "Product · UX",
    "categories": [
      "Product"
    ],
    "brief": "Doctor One wanted patients to find care, book appointments and manage visits without confusion or long waits.",
    "myRole": "I managed the product and UX work: user flows, interface design and coordination between the client and the build team.",
    "challenge": "Healthcare users are often anxious and in a hurry, so every screen had to be calm, readable and quick to act on.",
    "approach": "We reduced booking to a few clear steps, used plain language, and designed accessible layouts that work for every age group.",
    "outcome": "A simpler booking and care journey for patients. [Add results, e.g. bookings or time saved.]",
    "results": [
      {
        "value": "[X]",
        "label": "steps to book"
      },
      {
        "value": "[X%]",
        "label": "faster booking"
      },
      {
        "value": "[X]",
        "label": "screens designed"
      }
    ]
  },
  {
    "slug": "venus-travel",
    "client": "Venus Travel",
    "clientFull": "Venus Travel",
    "industry": "Travel",
    "services": "Website, brand",
    "role": "Project & design manager",
    "title": "A website and brand for a growing travel agency.",
    "cardTitle": "Website and brand for a travel agency",
    "cardServices": "Web · Brand",
    "categories": [
      "Web",
      "Brand",
      "Travel"
    ],
    "brief": "Venus Travel needed a website that shows its packages attractively and makes it easy for travellers to enquire.",
    "myRole": "I managed the project through Diznovate, from brand refresh and site structure to design reviews and launch.",
    "challenge": "Travel buyers compare many agencies. The site had to inspire quickly and still give the details people need to decide.",
    "approach": "Large destination imagery, clear package cards with prices and highlights, and enquiry buttons on every package.",
    "outcome": "A polished site that presents the agency professionally. [Add results, e.g. enquiries per month.]",
    "results": [
      {
        "value": "[X]",
        "label": "packages listed"
      },
      {
        "value": "[X%]",
        "label": "more enquiries"
      },
      {
        "value": "[X]",
        "label": "weeks to launch"
      }
    ],
    "logo": "/logos/venus-travel.png"
  },
  {
    "slug": "lilys-travel",
    "client": "Lily's Travel",
    "clientFull": "Lily's Travel",
    "industry": "Travel",
    "services": "Website, project management",
    "role": "Project manager",
    "title": "A booking-ready website for a travel company.",
    "cardTitle": "A booking-ready site for a travel company",
    "cardServices": "Web · PM",
    "categories": [
      "Web",
      "Travel"
    ],
    "brief": "Lily's Travel wanted to move enquiries online with a site that lets travellers explore trips and get in touch fast.",
    "myRole": "I ran the project through Diznovate: timelines, client communication, design direction and quality checks before launch.",
    "challenge": "The team needed a site they could update themselves as trips and prices change through the season.",
    "approach": "A modular page system with reusable trip templates, so new packages can go live in minutes.",
    "outcome": "An easy-to-manage site the team keeps current. [Add results.]",
    "results": [
      {
        "value": "[X]",
        "label": "trip templates"
      },
      {
        "value": "[X%]",
        "label": "more enquiries"
      },
      {
        "value": "[X]",
        "label": "weeks to launch"
      }
    ],
    "logo": "/logos/lilys-travel.png"
  },
  {
    "slug": "aussie-grand-tours",
    "client": "Aussie Grand Tours",
    "clientFull": "Aussie Grand Tours",
    "industry": "Travel",
    "services": "Website, brand",
    "role": "Project & design manager",
    "title": "Australian tour packages, presented beautifully.",
    "cardTitle": "Tour packages presented beautifully",
    "cardServices": "Web · Brand",
    "categories": [
      "Web",
      "Brand",
      "Travel"
    ],
    "brief": "Aussie Grand Tours offers tour packages across Australia and needed a site that matches the scale of the experience.",
    "myRole": "I managed the engagement through Diznovate, leading design direction, content structure and delivery.",
    "challenge": "Many itineraries with different durations and regions had to be easy to browse and compare.",
    "approach": "Itineraries organised by region and length, with day-by-day details and a clear call to enquire.",
    "outcome": "A rich, easy-to-browse catalogue of tours. [Add results.]",
    "results": [
      {
        "value": "[X]",
        "label": "itineraries"
      },
      {
        "value": "[X%]",
        "label": "more enquiries"
      },
      {
        "value": "[X]",
        "label": "weeks to launch"
      }
    ],
    "logo": "/logos/aussie-grand-tours.png"
  },
  {
    "slug": "exotic-miles",
    "client": "Exotic Miles",
    "clientFull": "Exotic Miles",
    "industry": "Travel",
    "services": "Brand, website",
    "role": "Brand & project manager",
    "title": "A modern brand for an exotic-travel company.",
    "cardTitle": "A modern brand for an exotic-travel company",
    "cardServices": "Brand · Web",
    "categories": [
      "Brand",
      "Web",
      "Travel"
    ],
    "brief": "Exotic Miles wanted a brand and website that feel as adventurous as the destinations it sells.",
    "myRole": "I led brand direction and managed the website project through Diznovate, from concept to launch.",
    "challenge": "Standing out in a crowded travel market while still looking trustworthy enough for high-value bookings.",
    "approach": "A bold visual identity, immersive imagery and simple package pages with clear pricing and enquiry.",
    "outcome": "A distinctive brand and site ready for marketing campaigns. [Add results.]",
    "results": [
      {
        "value": "1",
        "label": "brand system"
      },
      {
        "value": "[X]",
        "label": "pages designed"
      },
      {
        "value": "[X%]",
        "label": "more enquiries"
      }
    ],
    "logo": "/logos/exotic-miles.png"
  },
  {
    "slug": "sun-island-tour",
    "client": "Sun Island Tour",
    "clientFull": "Sun Island Tour",
    "industry": "Travel",
    "services": "Website, brand",
    "role": "Project & design manager",
    "title": "Island tours, from brand to bookings.",
    "cardTitle": "Island tours, from brand to bookings",
    "cardServices": "Web · Brand",
    "categories": [
      "Web",
      "Brand",
      "Travel"
    ],
    "brief": "Sun Island Tour needed a fresh brand and website to sell island holidays and day tours.",
    "myRole": "I managed the project through Diznovate, covering brand, site design and the launch plan.",
    "challenge": "Holidays and short tours needed to sit side by side without confusing visitors.",
    "approach": "Two clear paths, holidays and day tours, each with simple cards, highlights and quick enquiry.",
    "outcome": "A bright, holiday-ready site. [Add results.]",
    "results": [
      {
        "value": "[X]",
        "label": "tours listed"
      },
      {
        "value": "[X%]",
        "label": "more enquiries"
      },
      {
        "value": "[X]",
        "label": "weeks to launch"
      }
    ],
    "logo": "/logos/sun-island-tour.png"
  },
  {
    "slug": "trade-scratch",
    "client": "Trade Scratch",
    "clientFull": "Trade Scratch",
    "industry": "[Industry]",
    "services": "[Services]",
    "role": "[Your role]",
    "title": "[Project headline for Trade Scratch.]",
    "cardTitle": "[Project headline]",
    "cardServices": "[Services]",
    "categories": [],
    "brief": "[Describe what Trade Scratch does and what they needed.]",
    "myRole": "[Describe your role on this project.]",
    "challenge": "[The main challenge.]",
    "approach": "[How you approached it.]",
    "outcome": "[The outcome and results.]",
    "results": [
      {
        "value": "[X]",
        "label": "[result]"
      },
      {
        "value": "[X]",
        "label": "[result]"
      },
      {
        "value": "[X]",
        "label": "[result]"
      }
    ],
    "logo": "/logos/trade-scratch.png"
  },
  {
    "slug": "pomelody",
    "client": "Pomelody",
    "clientFull": "Pomelody",
    "industry": "[Industry]",
    "services": "[Services]",
    "role": "[Your role]",
    "title": "[Project headline for Pomelody.]",
    "cardTitle": "[Project headline]",
    "cardServices": "[Services]",
    "categories": [],
    "brief": "[Describe what Pomelody does and what they needed.]",
    "myRole": "[Describe your role on this project.]",
    "challenge": "[The main challenge.]",
    "approach": "[How you approached it.]",
    "outcome": "[The outcome and results.]",
    "results": [
      {
        "value": "[X]",
        "label": "[result]"
      },
      {
        "value": "[X]",
        "label": "[result]"
      },
      {
        "value": "[X]",
        "label": "[result]"
      }
    ]
  },
  {
    "slug": "edvantage-india",
    "client": "Edvantage India",
    "clientFull": "Edvantage India",
    "industry": "Education",
    "services": "Brand, graphic design, team leadership",
    "role": "Graphic Designer → Design Team Manager",
    "title": "Brand and design for an education company, and the team behind it.",
    "cardTitle": "Brand and product design for an education company",
    "cardServices": "Brand · Design team",
    "categories": [
      "Brand"
    ],
    "brief": "Edvantage India needed consistent, high-volume design across courses, marketing and brand touchpoints.",
    "myRole": "I joined as a graphic designer and grew into Design Team Manager, leading the team, reviews and delivery.",
    "challenge": "Keeping quality and brand consistency high while design requests grew across many teams.",
    "approach": "Shared templates and brand guidelines, a clear review process, and mentoring for the design team.",
    "outcome": "A faster, more consistent design output and a team that could scale with demand. [Add results.]",
    "results": [
      {
        "value": "[X]",
        "label": "designers led"
      },
      {
        "value": "[X]",
        "label": "assets delivered"
      },
      {
        "value": "[X]",
        "label": "years at Edvantage"
      }
    ],
    "logo": "/logos/edvantage.png"
  }
];

export const featured = ["freshcoo", "walmart", "rara-energy", "venus-travel"];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function nextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
