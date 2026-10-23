// SVG illustration helpers for project cover mockups.
export const rng = (seed) => () => {
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
let uid = 0;
const id = (p) => `${p}${++uid}`;

// Ridge path via midpoint displacement
function ridge(w, h, base, rough, seed, steps = 7) {
  const r = rng(seed);
  let pts = [[0, base + (r() - 0.5) * rough], [w, base + (r() - 0.5) * rough]];
  let amp = rough;
  for (let s = 0; s < steps; s++) {
    const n = [pts[0]];
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
      n.push([(x0 + x1) / 2, (y0 + y1) / 2 + (r() - 0.5) * amp], pts[i]);
    }
    pts = n; amp *= 0.55;
  }
  return `M0 ${h} L` + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L") + ` L${w} ${h} Z`;
}

const PAL = {
  himalaya: { sky: ["#2b1b4d", "#c0567a", "#f4a65c"], sun: "#ffd6a0", layers: ["#7a4a7e", "#5a3466", "#3c2350", "#24163a"], snow: true },
  coast: { sky: ["#3a1426", "#b8413f", "#f2a36b"], sun: "#ffe0b8", layers: ["#7c2f3a", "#4f1f2c"], water: ["#c3615a", "#5a2232"] },
  outback: { sky: ["#3b1d3f", "#d4614a", "#f7b267"], sun: "#ffe3b0", layers: ["#a8452c", "#7a2f1f", "#4b1d16"], rock: true },
  tropic: { sky: ["#0d5c73", "#3fb1b8", "#c9f0e2"], sun: "#fff6d8", layers: ["#1f7a6a", "#145a52"], water: ["#37c1c1", "#0b6f80"], palms: true },
  aegean: { sky: ["#3a77b5", "#8cc3e6", "#e8f3f7"], sun: "#ffffff", layers: ["#c9b79c", "#a8957a"], water: ["#2f7fc0", "#174f8a"], houses: true },
  alps: { sky: ["#1b3557", "#4b7fa8", "#bcd9e8"], sun: "#f5fbff", layers: ["#5d7f9a", "#3e5f7c", "#284660", "#182f45"], snow: true },
  desert: { sky: ["#432349", "#e0794e", "#f9cb7e"], sun: "#fff1c9", layers: ["#d99257", "#b46c3c", "#8a4b2a"] },
  lagoon: { sky: ["#244d7a", "#6fb0d4", "#f6dfc0"], sun: "#fff3d6", layers: ["#2d6e63", "#1d4c48"], water: ["#4fb8c8", "#16607a"], palms: true },
};

export function scene(type, w, h, seed = 1) {
  const p = PAL[type];
  const g = id("sky"), sg = id("sun"), wg = id("wat"), hz = id("hz");
  const r = rng(seed * 7 + 3);
  const sunX = w * (0.25 + r() * 0.5), sunY = h * (p.water ? 0.42 : 0.38);
  const horizon = h * (p.water ? 0.6 : 0.72);
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
  <defs>
    <linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.sky[0]}"/><stop offset="0.6" stop-color="${p.sky[1]}"/><stop offset="1" stop-color="${p.sky[2]}"/></linearGradient>
    <radialGradient id="${sg}"><stop offset="0" stop-color="${p.sun}" stop-opacity="1"/><stop offset="0.25" stop-color="${p.sun}" stop-opacity="0.55"/><stop offset="1" stop-color="${p.sun}" stop-opacity="0"/></radialGradient>
    <linearGradient id="${hz}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.sky[2]}" stop-opacity="0"/><stop offset="1" stop-color="${p.sky[2]}" stop-opacity="0.55"/></linearGradient>
    ${p.water ? `<linearGradient id="${wg}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.water[0]}"/><stop offset="1" stop-color="${p.water[1]}"/></linearGradient>` : ""}
  </defs>
  <rect width="${w}" height="${h}" fill="url(#${g})"/>
  <circle cx="${sunX}" cy="${sunY}" r="${h * 0.42}" fill="url(#${sg})"/>
  <circle cx="${sunX}" cy="${sunY}" r="${h * 0.06}" fill="${p.sun}"/>`;
  // soft clouds
  for (let i = 0; i < 5; i++) {
    const cx = r() * w, cy = h * (0.12 + r() * 0.25), cw = w * (0.12 + r() * 0.2);
    s += `<ellipse cx="${cx}" cy="${cy}" rx="${cw}" ry="${h * 0.012 + r() * h * 0.012}" fill="#fff" opacity="${0.08 + r() * 0.12}"/>`;
  }
  const n = p.layers.length;
  p.layers.forEach((c, i) => {
    const t = i / Math.max(1, n - 1);
    const base = p.water ? horizon - h * 0.08 + t * h * 0.06 : h * (0.5 + t * 0.2);
    const rough = h * (p.snow ? 0.5 - t * 0.25 : 0.22 - t * 0.1);
    const d = ridge(w, h, base, rough, seed * 13 + i * 31);
    s += `<path d="${d}" fill="${c}"/>`;
    if (p.snow && i < 2) s += `<path d="${d}" fill="#fff" opacity="${0.18 - i * 0.07}" transform="translate(0 -2)" style="mix-blend-mode:screen"/>`;
    s += `<rect y="${base - h * 0.2}" width="${w}" height="${h * 0.3}" fill="url(#${hz})" opacity="${0.5 - t * 0.4}"/>`;
  });
  if (p.rock) {
    const rx = w * 0.55, ry = h * 0.74, rw = w * 0.36, rh = h * 0.16;
    s += `<path d="M${rx - rw / 2} ${ry} C ${rx - rw * 0.46} ${ry - rh * 0.9}, ${rx - rw * 0.3} ${ry - rh}, ${rx} ${ry - rh} S ${rx + rw * 0.45} ${ry - rh * 0.85}, ${rx + rw / 2} ${ry} Z" fill="#b8492c"/>
      <path d="M${rx - rw / 2} ${ry} C ${rx - rw * 0.46} ${ry - rh * 0.9}, ${rx - rw * 0.3} ${ry - rh}, ${rx} ${ry - rh} L ${rx} ${ry} Z" fill="#e0764a" opacity="0.5"/>
      <rect y="${ry}" width="${w}" height="${h - ry}" fill="#5e2418"/>`;
    for (let i = 0; i < 40; i++) s += `<circle cx="${r() * w}" cy="${ry + 6 + r() * (h - ry)}" r="${2 + r() * 6}" fill="#3e170f" opacity="0.7"/>`;
  }
  if (p.water) {
    s += `<rect y="${horizon}" width="${w}" height="${h - horizon}" fill="url(#${wg})"/>`;
    for (let i = 0; i < 26; i++) {
      const y = horizon + (h - horizon) * (i / 26) ** 1.4;
      const lw = w * (0.04 + r() * 0.12);
      s += `<rect x="${sunX - lw / 2 + (r() - 0.5) * w * 0.08}" y="${y}" width="${lw}" height="${1.5 + i * 0.15}" rx="1" fill="${p.sun}" opacity="${0.5 - i * 0.015}"/>`;
    }
  }
  if (p.houses) {
    const y0 = h * 0.86;
    s += `<path d="M0 ${h} L0 ${y0 - h * 0.05} Q ${w * 0.25} ${y0 - h * 0.12} ${w * 0.5} ${y0 - h * 0.02} L ${w * 0.5} ${h} Z" fill="#d8c8ad"/>`;
    for (let i = 0; i < 14; i++) {
      const x = i * w * 0.035 + r() * 8, bw = w * (0.03 + r() * 0.02), bh = h * (0.05 + r() * 0.06), y = y0 - h * 0.1 + Math.sin(i / 2) * h * 0.02 + r() * h * 0.05;
      s += `<rect x="${x}" y="${y}" width="${bw}" height="${bh + h * 0.2}" fill="#fbfaf5"/><rect x="${x + bw * 0.3}" y="${y + bh * 0.35}" width="${bw * 0.25}" height="${bh * 0.3}" fill="#2e6aa6" opacity="0.8"/>`;
      if (i % 4 === 1) s += `<path d="M${x} ${y} A ${bw / 2} ${bw / 2} 0 0 1 ${x + bw} ${y} Z" fill="#2f6bb3"/>`;
    }
  }
  if (p.palms) {
    const palm = (x, y, sc, flip) => {
      let q = `<g transform="translate(${x} ${y}) scale(${flip ? -sc : sc} ${sc})"><path d="M0 0 C 10 -80 30 -160 60 -230" stroke="#123c38" stroke-width="9" fill="none" stroke-linecap="round"/>`;
      for (let k = 0; k < 7; k++) {
        const a = -150 + k * 42;
        q += `<path d="M60 -230 q ${Math.cos((a * Math.PI) / 180) * 60} ${Math.sin((a * Math.PI) / 180) * 60 - 20} ${Math.cos((a * Math.PI) / 180) * 120} ${Math.sin((a * Math.PI) / 180) * 120 + 30}" stroke="#0f3a35" stroke-width="10" fill="none" stroke-linecap="round"/>`;
      }
      return q + "</g>";
    };
    s += palm(w * 0.08, h * 1.02, h / 520, false) + palm(w * 0.9, h * 1.04, h / 600, true) + palm(w * 0.82, h * 1.06, h / 760, true);
  }
  return s + "</svg>";
}

// Renewable energy landscape: hills, solar rows, turbines
export function energy(w, h, seed = 2) {
  const r = rng(seed);
  const g = id("eg"), sg = id("es");
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" width="100%" height="100%"><defs>
  <linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d1f1a"/><stop offset="0.65" stop-color="#1f4a35"/><stop offset="1" stop-color="#a8d08d"/></linearGradient>
  <radialGradient id="${sg}"><stop offset="0" stop-color="#e9ffb8" stop-opacity="0.9"/><stop offset="1" stop-color="#e9ffb8" stop-opacity="0"/></radialGradient></defs>
  <rect width="${w}" height="${h}" fill="url(#${g})"/><circle cx="${w * 0.7}" cy="${h * 0.45}" r="${h * 0.5}" fill="url(#${sg})" opacity="0.5"/>`;
  ["#2e6b47", "#245a3b", "#1a432c"].forEach((c, i) => (s += `<path d="${ridge(w, h, h * (0.58 + i * 0.08), h * 0.12, seed * 5 + i, 6)}" fill="${c}"/>`));
  const turb = (x, y, sc, a) => `<g transform="translate(${x} ${y}) scale(${sc})"><path d="M-3 0 L-1.2 -180 L1.2 -180 L3 0 Z" fill="#e8f1ea"/>${[0, 120, 240].map((d) => `<path d="M0 -180 L -4 -250 Q 0 -262 4 -250 Z" fill="#f4faf5" transform="rotate(${a + d} 0 -180)"/>`).join("")}<circle cy="-180" r="5" fill="#fff"/></g>`;
  s += turb(w * 0.62, h * 0.66, h / 900, 10) + turb(w * 0.78, h * 0.62, h / 760, 50) + turb(w * 0.9, h * 0.68, h / 1100, 80);
  // solar rows
  for (let row = 0; row < 4; row++) {
    const y = h * (0.78 + row * 0.055), ph = h * 0.04 + row * 3, pw = w * 0.07 + row * 6;
    for (let i = -1; i < 14; i++) {
      const x = i * (pw + 6) + row * 18 - 10;
      s += `<path d="M${x} ${y + ph} L${x + pw * 0.18} ${y} L${x + pw * 1.18} ${y} L${x + pw} ${y + ph} Z" fill="#183a5c" stroke="#9fc4e8" stroke-opacity="0.35" stroke-width="1"/>
        <path d="M${x + pw * 0.59} ${y} L${x + pw * 0.5} ${y + ph}" stroke="#9fc4e8" stroke-opacity="0.25"/>`;
    }
  }
  for (let i = 0; i < 60; i++) s += `<circle cx="${r() * w}" cy="${r() * h * 0.5}" r="${r() * 1.4}" fill="#fff" opacity="${r() * 0.6}"/>`;
  return s + "</svg>";
}

// Supplement tub / bottle
export function jar({ body = "#1b1b1f", label = "#ff3b30", text = "#fff", cap = "#0e0e10", name = "WHEY", sub = "Protein", shape = "tub", w = 220, h = 280, brand = "SUPPLEMENTRO" }) {
  const g = id("jg"), hl = id("jh");
  const tub = shape === "tub";
  const bx = w * (tub ? 0.1 : 0.22), bw = w * (tub ? 0.8 : 0.56), by = h * (tub ? 0.2 : 0.28), bh = h * (tub ? 0.78 : 0.7);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><defs>
  <linearGradient id="${g}" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity="0.45"/><stop offset="0.3" stop-color="#000" stop-opacity="0"/><stop offset="0.7" stop-color="#000" stop-opacity="0.05"/><stop offset="1" stop-color="#000" stop-opacity="0.55"/></linearGradient>
  <linearGradient id="${hl}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
  <ellipse cx="${w / 2}" cy="${h * 0.985}" rx="${bw * 0.55}" ry="${h * 0.02}" fill="#000" opacity="0.35"/>
  ${tub ? `<rect x="${bx + 4}" y="${h * 0.06}" width="${bw - 8}" height="${h * 0.16}" rx="10" fill="${cap}"/>` : `<rect x="${w * 0.36}" y="${h * 0.04}" width="${w * 0.28}" height="${h * 0.12}" rx="6" fill="${cap}"/><path d="M${w * 0.34} ${h * 0.15} L${w * 0.66} ${h * 0.15} L${bx + bw} ${by} L${bx} ${by} Z" fill="${body}"/>`}
  <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="${tub ? 16 : 22}" fill="${body}"/>
  <rect x="${bx}" y="${by + bh * 0.22}" width="${bw}" height="${bh * 0.5}" fill="${label}"/>
  <text x="${w / 2}" y="${by + bh * 0.16}" text-anchor="middle" font-family="Archivo Black, sans-serif" font-size="${bw * 0.09}" fill="${text}" opacity="0.85" letter-spacing="1">${brand}</text>
  <text x="${w / 2}" y="${by + bh * 0.47}" text-anchor="middle" font-family="Archivo Black, sans-serif" font-size="${bw * 0.22}" fill="${text}">${name}</text>
  <text x="${w / 2}" y="${by + bh * 0.62}" text-anchor="middle" font-family="Inter, sans-serif" font-weight="600" font-size="${bw * 0.08}" fill="${text}" opacity="0.85" letter-spacing="2">${sub.toUpperCase()}</text>
  <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="${tub ? 16 : 22}" fill="url(#${g})"/>
  <rect x="${bx + bw * 0.18}" y="${by + 6}" width="${bw * 0.12}" height="${bh - 12}" rx="6" fill="url(#${hl})"/>
  </svg>`;
}

// Candlestick chart
export function candles(w, h, seed = 5, { up = "#2fbf8c", down = "#e5604d", grid = "rgba(255,255,255,0.07)", line = "#f28c38" } = {}) {
  const r = rng(seed);
  const n = 46, cw = w / n;
  let p = h * 0.6, s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="none">`;
  for (let i = 1; i < 5; i++) s += `<line x1="0" x2="${w}" y1="${(h * i) / 5}" y2="${(h * i) / 5}" stroke="${grid}"/>`;
  const closes = [];
  for (let i = 0; i < n; i++) {
    const o = p, c = Math.min(h * 0.92, Math.max(h * 0.1, o + (r() - 0.56) * h * 0.09));
    const hi = Math.min(o, c) - r() * h * 0.04, lo = Math.max(o, c) + r() * h * 0.04;
    const col = c < o ? up : down, x = i * cw + cw / 2;
    s += `<line x1="${x}" x2="${x}" y1="${hi}" y2="${lo}" stroke="${col}" stroke-width="1.2"/><rect x="${x - cw * 0.32}" y="${Math.min(o, c)}" width="${cw * 0.64}" height="${Math.max(1.5, Math.abs(c - o))}" rx="1" fill="${col}"/>`;
    closes.push([x, c]); p = c;
  }
  const ma = closes.map((_, i) => { const sl = closes.slice(Math.max(0, i - 6), i + 1); return [closes[i][0], sl.reduce((a, b) => a + b[1], 0) / sl.length]; });
  s += `<path d="M${ma.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L")}" fill="none" stroke="${line}" stroke-width="2"/>`;
  return s + "</svg>";
}

export function spark(w, h, seed, color, fill = true) {
  const r = rng(seed); let y = h * 0.6; const pts = [];
  for (let i = 0; i <= 24; i++) { y = Math.min(h * 0.9, Math.max(h * 0.1, y + (r() - 0.55) * h * 0.25)); pts.push([(i / 24) * w, y]); }
  const d = pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L");
  const g = id("sp");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="none"><defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity="0.35"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>${fill ? `<path d="M0 ${h} L${d} L${w} ${h} Z" fill="url(#${g})"/>` : ""}<path d="M${d}" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round"/></svg>`;
}

export function bars(w, h, seed, color, n = 12) {
  const r = rng(seed); let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="none">`;
  const bw = w / n;
  for (let i = 0; i < n; i++) { const bh = h * (0.25 + r() * 0.7); s += `<rect x="${i * bw + bw * 0.2}" y="${h - bh}" width="${bw * 0.6}" height="${bh}" rx="${bw * 0.15}" fill="${color}" opacity="${0.45 + (i / n) * 0.55}"/>`; }
  return s + "</svg>";
}

// Person avatar silhouette in a soft gradient disc
export function avatar(c1, c2, skin = "#c98b64", hair = "#2a1d17") {
  const g = id("av");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%"><defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient><clipPath id="${g}c"><circle cx="50" cy="50" r="50"/></clipPath></defs>
  <circle cx="50" cy="50" r="50" fill="url(#${g})"/><g clip-path="url(#${g}c)"><path d="M14 104 Q16 70 50 68 Q84 70 86 104 Z" fill="#fff" opacity="0.95"/><path d="M40 66 L50 80 L60 66" fill="${c2}" opacity="0.6"/><rect x="43" y="52" width="14" height="16" rx="6" fill="${skin}"/><ellipse cx="50" cy="40" rx="16" ry="19" fill="${skin}"/><path d="M33 38 Q34 18 52 19 Q68 20 67 38 Q62 28 50 29 Q40 29 33 38 Z" fill="${hair}"/></g></svg>`;
}

// Abstract course/album cover
export function abstract(w, h, seed, cols) {
  const r = rng(seed); const g = id("ab");
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${cols[0]}"/><stop offset="1" stop-color="${cols[1]}"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#${g})"/>`;
  for (let i = 0; i < 4; i++) s += `<circle cx="${r() * w}" cy="${r() * h}" r="${(0.15 + r() * 0.35) * Math.max(w, h)}" fill="${cols[2 + (i % 2)] ?? "#fff"}" opacity="${0.18 + r() * 0.2}"/>`;
  s += `<path d="M0 ${h * (0.6 + r() * 0.2)} Q ${w * 0.5} ${h * (0.3 + r() * 0.3)} ${w} ${h * (0.55 + r() * 0.3)} L ${w} ${h} L 0 ${h} Z" fill="#000" opacity="0.18"/>`;
  return s + "</svg>";
}

export function wave(w, h, seed, color) {
  const r = rng(seed); let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="none">`;
  const n = 90, bw = w / n;
  for (let i = 0; i < n; i++) { const a = (Math.sin(i / 7) * 0.5 + 0.5) * 0.6 + r() * 0.4; const bh = h * a; s += `<rect x="${i * bw + bw * 0.25}" y="${(h - bh) / 2}" width="${bw * 0.5}" height="${bh}" rx="${bw * 0.25}" fill="${color}" opacity="${i < n * 0.42 ? 1 : 0.35}"/>`; }
  return s + "</svg>";
}

// Simple product shapes for retail tiles
export function product(kind, c1, c2) {
  const g = id("pr");
  const defs = `<defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>`;
  const shapes = {
    bottle: `<rect x="42" y="8" width="16" height="14" rx="3" fill="#333"/><path d="M38 22 H62 L68 36 V88 Q68 94 62 94 H38 Q32 94 32 88 V36 Z" fill="url(#${g})"/><rect x="32" y="48" width="36" height="22" fill="#fff" opacity="0.85"/><rect x="38" y="26" width="4" height="64" rx="2" fill="#fff" opacity="0.3"/>`,
    box: `<path d="M20 34 L50 20 L80 34 L80 78 L50 92 L20 78 Z" fill="url(#${g})"/><path d="M20 34 L50 48 L80 34 L50 20 Z" fill="#fff" opacity="0.35"/><path d="M50 48 L50 92" stroke="#000" stroke-opacity="0.15"/><rect x="28" y="54" width="16" height="10" fill="#fff" opacity="0.7" transform="skewY(25) translate(0 -14)"/>`,
    headphones: `<path d="M24 60 Q24 22 50 22 Q76 22 76 60" fill="none" stroke="url(#${g})" stroke-width="8" stroke-linecap="round"/><rect x="16" y="54" width="18" height="30" rx="8" fill="url(#${g})"/><rect x="66" y="54" width="18" height="30" rx="8" fill="url(#${g})"/>`,
    sneaker: `<path d="M12 70 Q14 52 28 50 L44 40 Q52 52 66 54 Q86 56 90 70 L90 78 L12 78 Z" fill="url(#${g})"/><rect x="12" y="76" width="78" height="8" rx="3" fill="#f4f4f4"/><path d="M34 52 L40 60 M42 48 L48 57 M50 50 L55 58" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>`,
    lamp: `<path d="M34 20 H66 L76 50 H24 Z" fill="url(#${g})"/><rect x="48" y="50" width="4" height="34" fill="#555"/><ellipse cx="50" cy="88" rx="18" ry="5" fill="#444"/>`,
    mug: `<rect x="26" y="34" width="40" height="50" rx="6" fill="url(#${g})"/><path d="M66 44 Q82 44 82 58 Q82 72 66 72" fill="none" stroke="${c2}" stroke-width="6"/><path d="M36 22 Q40 28 36 30 M46 20 Q50 26 46 30" stroke="#999" stroke-width="2" fill="none"/>`,
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">${defs}<ellipse cx="50" cy="95" rx="30" ry="3" fill="#000" opacity="0.12"/>${shapes[kind]}</svg>`;
}
