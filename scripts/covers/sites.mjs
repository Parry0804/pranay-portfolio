import { scene, energy, jar, candles, spark, bars, avatar, abstract, wave, product } from "./art.mjs";

const L = (src) => `${new URL("../../public/logos/", import.meta.url).href}${src}`;
const logo = (p, h = 34) => (p.logo ? `<img class="lg" src="${L(p.logo)}" style="height:${h}px">` : `<span class="wm" style="font-size:${h * 0.72}px">${p.wordmark}</span>`);
const nav = (p, links, cta) => `<nav class="nav">${logo(p, p.logoH ?? 34)}<ul>${links.map((l, i) => `<li class="${i === 0 ? "on" : ""}">${l}</li>`).join("")}</ul><a class="btn">${cta}</a></nav>`;
const status = (dark) => `<div class="status ${dark ? "d" : ""}"><b>9:41</b><span class="ic"><i></i><i></i><i></i><em></em></span></div>`;
const mnav = (p) => `<div class="mnav">${logo(p, (p.logoH ?? 34) * 0.78)}<span class="burger"><i></i><i></i></span></div>`;
const stars = (n = 5) => `<span class="stars">${"★".repeat(n)}</span>`;

// ---------- Travel ----------
function travel(p) {
  const t = p.travel;
  const card = (c, i, cls = "") => `<div class="tcard ${cls}"><div class="ti">${scene(c.scene, 600, 420, i + 3)}<span class="tag">${c.days}</span><span class="heart">♡</span></div><div class="tb"><div class="tt">${c.title}</div><div class="tm"><span>${c.place}</span><span class="pr">from <b>${c.price}</b></span></div></div></div>`;
  const desktop = `<div class="site travel">${nav(p, t.links, t.cta)}
  <section class="t-hero"><div class="art">${scene(t.scene, 1400, 620, p.seed)}</div><div class="ov"></div>
    <div class="copy"><span class="eyebrow">${t.eyebrow}</span><h1>${t.headline}</h1><p>${t.sub}</p></div>
    <div class="search"><div><label>Where to</label><b>${t.where}</b></div><div><label>When</label><b>${t.when}</b></div><div><label>Travellers</label><b>2 adults</b></div><a class="btn">Search trips</a></div>
  </section>
  <section class="row"><div class="rowhead"><h3>${t.rowTitle}</h3><a>View all →</a></div><div class="cards">${t.cards.map((c, i) => card(c, i)).join("")}</div></section></div>`;
  const mobile = `<div class="m travel">${status(true)}<div class="mhero">${scene(t.scene, 400, 520, p.seed)}<div class="ov"></div>${mnav(p)}<div class="mcopy"><span class="eyebrow">${t.eyebrow}</span><h2>${t.mHeadline ?? t.headline}</h2><a class="btn">${t.cta}</a></div></div>
    <div class="mrow"><h4>${t.rowTitle}</h4>${t.cards.slice(0, 2).map((c, i) => card(c, i, "h")).join("")}</div></div>`;
  const mobile2 = `<div class="m travel light">${status()}<div class="mtop">${mnav(p)}<h3>${t.rowTitle}</h3><div class="chips"><span class="on">All</span><span>Beach</span><span>Mountains</span><span>Culture</span></div></div>${t.cards.map((c, i) => card(c, i + 2, "v")).join("")}</div>`;
  return { desktop, mobile, mobile2 };
}

// ---------- Energy ----------
function rara(p) {
  const desktop = `<div class="site split">${nav(p, ["Solutions", "Projects", "Insights", "About"], "Get a free audit")}
  <section class="s-hero"><div class="copy"><span class="eyebrow">Energy consulting</span><h1>Cleaner power, <em>lower bills</em>, zero guesswork.</h1><p>We audit, design and deliver solar and efficiency projects for businesses across India.</p><div class="ctas"><a class="btn">Book an energy audit</a><a class="ghost">See projects →</a></div>
  <div class="kpis"><div><b>42 MW</b><span>installed</span></div><div><b>31%</b><span>avg. savings</span></div><div><b>180+</b><span>sites</span></div></div></div>
  <div class="visual"><div class="art r">${energy(760, 620, p.seed)}</div>
    <div class="float f1"><span class="mut">Today's generation</span><b>1,284 kWh</b><div class="sp">${spark(220, 60, 4, "#9be15d")}</div></div>
    <div class="float f2"><span class="dot g"></span><div><b>Carbon offset</b><span class="mut">86.4 t CO₂ this year</span></div></div></div></section></div>`;
  const mobile = `<div class="m dark">${status(true)}${mnav(p)}<div class="mpad"><span class="eyebrow">Energy dashboard</span><h2>Good morning, Arjun</h2>
    <div class="mcard big"><span class="mut">Live output</span><b>342.6 kW</b><div class="sp">${spark(320, 90, 9, "#9be15d")}</div></div>
    <div class="grid2"><div class="mcard"><span class="mut">Savings</span><b>₹1.8L</b><small class="up">▲ 12%</small></div><div class="mcard"><span class="mut">Efficiency</span><b>94%</b><small class="up">▲ 3%</small></div></div>
    <div class="mcard"><span class="mut">Weekly yield</span><div class="bars">${bars(320, 90, 3, "#9be15d", 7)}</div></div><div class="mcard row2"><span class="dot g"></span><div><b class="s">Inverter 3 back online</b><span class="mut">Plant B · 2 min ago</span></div></div></div>${tabbar()}</div>`;
  const mobile2 = `<div class="m dark">${status(true)}<div class="mart">${energy(400, 360, 7)}</div><div class="mpad"><span class="eyebrow">Case study</span><h2>2.4 MW rooftop for a textile mill</h2><p class="mut">Payback in 3.1 years, 38% lower grid draw.</p><div class="grid2"><div class="mcard"><b>2.4 MW</b><span class="mut">capacity</span></div><div class="mcard"><b>38%</b><span class="mut">grid savings</span></div></div><div class="mcard"><span class="mut">Monthly generation</span><div class="bars">${bars(320, 90, 12, "#9be15d", 12)}</div></div><a class="btn wide">Read the case study</a></div></div>`;
  return { desktop, mobile, mobile2 };
}

const tabbar = (labels = ["Home", "Stats", "Alerts", "Profile"]) => `<div class="tabbar">${labels.map((l, i) => `<span class="${i === 0 ? "on" : ""}"><i></i>${l}</span>`).join("")}</div>`;

// ---------- Supplements store ----------
function supp(p) {
  const prods = [
    { name: "WHEY", sub: "Isolate · Chocolate", body: "#16161a", label: "#e8352b", price: "₹3,299", shape: "tub" },
    { name: "MASS", sub: "Gainer · Vanilla", body: "#f3efe8", label: "#16161a", text: "#fff", price: "₹2,499", shape: "tub" },
    { name: "PRE", sub: "Workout · Berry", body: "#1f2a44", label: "#ffb703", text: "#16161a", price: "₹1,799", shape: "tub" },
    { name: "OMEGA", sub: "Fish oil · 60 caps", body: "#e7eef3", label: "#0c7c59", price: "₹899", shape: "bottle" },
  ];
  const jarOf = (x, w, h) => jar({ ...x, w, h });
  const pcard = (x) => `<div class="pcard"><div class="pi">${jarOf(x, 160, 200)}</div><div class="pn">${x.name[0] + x.name.slice(1).toLowerCase()} ${x.sub.split(" · ")[0]}</div><div class="pm">${stars()} <span class="mut">4.8</span></div><div class="pp"><b>${x.price}</b><a class="add">+</a></div></div>`;
  const desktop = `<div class="site split store">${nav(p, ["Protein", "Pre-workout", "Vitamins", "Stacks"], "Cart · 2")}
  <section class="s-hero"><div class="copy"><span class="eyebrow">Lab-tested · 100% authentic</span><h1>Fuel that's <em>actually</em> tested.</h1><p>Every batch third-party verified. Compare nutrition side by side and get it delivered in 48 hours.</p><div class="ctas"><a class="btn">Shop bestsellers</a><a class="ghost">Build a stack →</a></div></div>
  <div class="visual"><div class="blob"></div><div class="jars"><div class="j1">${jarOf(prods[1], 220, 280)}</div><div class="j0">${jarOf(prods[0], 280, 350)}</div><div class="j2">${jarOf(prods[2], 220, 280)}</div></div><div class="float f1"><span class="mut">Verified batch</span><b>#SP-2291 ✓</b></div></div></section>
  <section class="row"><div class="rowhead"><h3>Bestsellers</h3><a>View all →</a></div><div class="pcards">${prods.map(pcard).join("")}</div></section></div>`;
  const mobile = `<div class="m store">${status()}${mnav(p)}<div class="mpad"><div class="search">Search protein, creatine…</div><div class="promo"><div><span class="eyebrow">This week</span><b>20% off whey</b><a class="btn sm">Shop</a></div><div class="pj">${jarOf(prods[0], 120, 150)}</div></div><h4>Bestsellers</h4><div class="grid2">${prods.slice(0, 4).map(pcard).join("")}</div></div>${tabbar(["Shop", "Stacks", "Cart", "Me"])}</div>`;
  const mobile2 = `<div class="m store">${status()}<div class="pdp">${jarOf(prods[0], 280, 350)}</div><div class="mpad"><span class="eyebrow">Whey isolate</span><h2>Chocolate fudge, 1 kg</h2><div class="pm">${stars()} <span class="mut">4.8 · 2,140 reviews</span></div><div class="nut"><div><b>27g</b><span>protein</span></div><div><b>1.2g</b><span>sugar</span></div><div><b>110</b><span>kcal</span></div></div><a class="btn wide">Add to cart · ₹3,299</a></div></div>`;
  return { desktop, mobile, mobile2 };
}

// ---------- Retail ----------
function retail(p) {
  const items = [
    ["sneaker", "#3b82f6", "#1e3a8a", "Running shoes", "$64.00"],
    ["headphones", "#222", "#555", "Wireless headphones", "$89.00"],
    ["lamp", "#f4c430", "#d49a00", "Desk lamp", "$24.97"],
    ["mug", "#e86a4a", "#b34126", "Ceramic mug set", "$12.88"],
    ["bottle", "#22a06b", "#0b6b45", "Cold-press juice", "$4.48"],
  ];
  const tile = ([k, a, b, n, pr], i) => `<div class="rcard"><div class="ri">${product(k, a, b)}${i === 1 ? '<span class="flag">Rollback</span>' : ""}</div><div class="rp"><b>${pr}</b>${i % 2 ? '<s class="mut">$109.00</s>' : ""}</div><div class="rn">${n}</div><div class="pm">${stars(4)}<span class="mut"> (${120 + i * 37})</span></div><a class="add w">+ Add</a></div>`;
  const desktop = `<div class="site retail"><div class="rbar">${logo(p, 30)}<div class="rsearch">Search everything at Walmart online and in store</div><div class="rlinks"><span>Reorder</span><span>Sign in</span><span class="cart">🛒 <b>$0.00</b></span></div></div>
  <div class="rsub"><span>Departments ▾</span><span>Services ▾</span><span>Grocery</span><span>Deals</span><span>Back to school</span><span>Home</span><span>Electronics</span></div>
  <section class="rhero"><div class="rban"><div><span class="eyebrow">Weekly deals</span><h1>Save big on the things you need.</h1><a class="btn">Shop deals</a></div><div class="rprods"><div>${product("headphones", "#222", "#555")}</div><div>${product("sneaker", "#3b82f6", "#1e3a8a")}</div><div>${product("lamp", "#f4c430", "#d49a00")}</div></div></div>
  <div class="rside"><div class="rmini y"><b>Pickup &amp; delivery</b><span>Free with orders over $35</span></div><div class="rmini b"><b>Grocery in 1 hour</b><span>Fresh, fast, near you</span></div></div></section>
  <section class="row"><div class="rowhead"><h3>Picked for you</h3><a>View all →</a></div><div class="rcards">${items.map(tile).join("")}</div></section></div>`;
  const mobile = `<div class="m retail">${status(true)}<div class="rmtop">${logo(p, 24)}<div class="rsearch">Search Walmart</div></div><div class="mpad"><div class="rmban"><div><span class="eyebrow">Today only</span><b>Up to 50% off headphones</b></div><div class="rmimg">${product("headphones", "#222", "#555")}</div></div><div class="chips"><span class="on">Grocery</span><span>Home</span><span>Tech</span><span>Fashion</span></div><div class="grid2">${items.slice(0, 4).map(tile).join("")}</div></div>${tabbar(["Shop", "My items", "Search", "Account"])}</div>`;
  const mobile2 = `<div class="m retail">${status(true)}<div class="rmtop">${logo(p, 24)}<div class="rsearch">Cart · 3 items</div></div><div class="mpad">${items.slice(0, 3).map(([k, a, b, n, pr]) => `<div class="litem"><div class="li">${product(k, a, b)}</div><div><div class="rn">${n}</div><b>${pr}</b><div class="qty">− 1 +</div></div></div>`).join("")}<div class="mcard"><div class="sum"><span>Subtotal</span><b>$165.85</b></div><div class="sum"><span>Pickup</span><b class="g">Free</b></div></div><a class="btn wide">Continue to checkout</a></div></div>`;
  return { desktop, mobile, mobile2 };
}

// ---------- Healthcare ----------
function health(p) {
  const docs = [
    ["Dr. Ananya Rao", "Cardiologist", "#bfe8e1", "#2a9d8f", "#c98b64", "#2a1d17"],
    ["Dr. Vikram Shah", "General physician", "#d4e4ff", "#4c6fd6", "#b77b55", "#1c1c1c"],
    ["Dr. Meera Iyer", "Dermatologist", "#ffe1d6", "#e07a5f", "#d9a07a", "#3a2418"],
  ];
  const dcard = ([n, s, a, b, sk, h], i) => `<div class="dcard"><div class="av">${avatar(a, b, sk, h)}</div><div><b>${n}</b><span class="mut">${s}</span><div class="pm">${stars()}<span class="mut"> 4.${9 - i} · ${12 - i * 3} yrs</span></div></div><a class="btn sm">Book</a></div>`;
  const slots = ["09:30", "10:15", "11:00", "12:30", "14:00", "15:45", "16:30", "17:15"];
  const days = ["Mon 12", "Tue 13", "Wed 14", "Thu 15", "Fri 16"];
  const desktop = `<div class="site split health">${nav(p, ["Find a doctor", "Clinics", "Lab tests", "For business"], "Book appointment")}
  <section class="s-hero"><div class="copy"><span class="eyebrow">Care without the wait</span><h1>See the right doctor, <em>today</em>.</h1><p>Search 2,000+ verified specialists, book a slot in seconds and keep every visit in one place.</p><div class="hsearch"><span>Specialty, doctor or symptom</span><span>Indiranagar, Bengaluru</span><a class="btn">Search</a></div><div class="trust"><span>✓ Verified doctors</span><span>✓ Instant confirmation</span><span>✓ Free rescheduling</span></div></div>
  <div class="visual"><div class="book"><div class="bhead">${dcard(docs[0], 0)}</div><div class="days">${days.map((d, i) => `<span class="${i === 2 ? "on" : ""}">${d.split(" ")[0]}<b>${d.split(" ")[1]}</b></span>`).join("")}</div><div class="slots">${slots.map((s, i) => `<span class="${i === 3 ? "on" : i === 1 || i === 6 ? "off" : ""}">${s}</span>`).join("")}</div><a class="btn wide">Confirm 12:30 · Wed 14</a></div>
  <div class="float f1"><span class="dot g"></span><div><b>Appointment confirmed</b><span class="mut">Reminder set for 11:30</span></div></div></div></section>
  <section class="row"><div class="rowhead"><h3>Top doctors near you</h3><a>View all →</a></div><div class="dcards">${docs.map(dcard).join("")}</div></section></div>`;
  const mobile = `<div class="m health">${status()}${mnav(p)}<div class="mpad"><span class="eyebrow">Hi Rohan</span><h2>How are you feeling today?</h2><div class="search">Search doctors, symptoms…</div><div class="cats">${["❤︎ Heart", "✚ General", "◐ Skin", "⚕ Dental"].map((c) => `<span>${c}</span>`).join("")}</div><div class="next"><span class="mut">Next appointment</span><b>Wed 14 · 12:30</b><span>Dr. Ananya Rao · Cardiology</span></div><h4>Top doctors</h4>${docs.slice(0, 2).map(dcard).join("")}</div>${tabbar(["Home", "Visits", "Records", "Profile"])}</div>`;
  const mobile2 = `<div class="m health">${status()}<div class="mpad"><div class="dhead"><div class="av lg">${avatar(...docs[0].slice(2))}</div><b>Dr. Ananya Rao</b><span class="mut">Cardiologist · Apollo Clinic</span><div class="pm">${stars()} <span class="mut">4.9 (312)</span></div></div><div class="days">${days.map((d, i) => `<span class="${i === 2 ? "on" : ""}">${d.split(" ")[0]}<b>${d.split(" ")[1]}</b></span>`).join("")}</div><div class="slots">${slots.map((s, i) => `<span class="${i === 3 ? "on" : i === 1 ? "off" : ""}">${s}</span>`).join("")}</div><a class="btn wide">Confirm appointment</a></div></div>`;
  return { desktop, mobile, mobile2 };
}

// ---------- Trading ----------
function trading(p) {
  const tick = [["NIFTY 50", "24,318.25", "+0.84%", 1], ["RELIANCE", "2,947.10", "+1.12%", 2], ["HDFCBANK", "1,682.40", "−0.37%", 3], ["INFY", "1,894.55", "+2.06%", 4], ["TATAMOTORS", "1,021.80", "−0.91%", 5]];
  const row = ([n, v, c, s]) => `<div class="tk"><div><b>${n}</b><span class="mut">NSE</span></div><div class="tsp">${spark(90, 30, s * 11, c.startsWith("+") ? "#1fae74" : "#e0533d", false)}</div><div class="tv"><b>${v}</b><span class="${c.startsWith("+") ? "up" : "dn"}">${c}</span></div></div>`;
  const desktop = `<div class="site trade">${nav(p, ["Markets", "Courses", "Signals", "Community"], "Open free account")}
  <section class="tr-hero"><div class="copy"><span class="eyebrow">Learn · Practise · Trade</span><h1>Trade from <em>scratch</em>, with a plan.</h1><p>Live charts, paper trading and bite-size lessons that take you from first candle to confident trader.</p><div class="ctas"><a class="btn">Start paper trading</a><a class="ghost">Browse courses →</a></div></div>
  <div class="chart"><div class="ch"><div><b>NIFTY 50</b><span class="mut"> · 15m</span></div><div class="tf">${["1D", "1W", "1M", "1Y"].map((t, i) => `<span class="${i === 0 ? "on" : ""}">${t}</span>`).join("")}</div></div><div class="cv">${candles(720, 300, p.seed)}</div><div class="cf"><span>O 24,102</span><span>H 24,356</span><span>L 24,088</span><span class="up">C 24,318 ▲ 0.84%</span></div></div>
  <div class="watch"><div class="wh"><b>Watchlist</b><span class="mut">5</span></div>${tick.map(row).join("")}</div></section></div>`;
  const mobile = `<div class="m tradem">${status()}${mnav(p)}<div class="mpad"><span class="mut">Portfolio value</span><h2>₹4,82,316</h2><span class="up">▲ ₹6,240 (1.31%) today</span><div class="mchart">${candles(340, 170, p.seed + 2)}</div><div class="tf">${["1D", "1W", "1M", "1Y", "All"].map((t, i) => `<span class="${i === 0 ? "on" : ""}">${t}</span>`).join("")}</div><h4>Watchlist</h4>${tick.slice(0, 3).map(row).join("")}</div>${tabbar(["Home", "Markets", "Learn", "Account"])}</div>`;
  const mobile2 = `<div class="m tradem">${status()}<div class="mpad"><span class="eyebrow">Course · Module 3</span><h2>Reading candlesticks</h2><div class="mchart">${candles(340, 200, 21)}</div><div class="lessons">${["Anatomy of a candle", "Bullish engulfing", "Doji and indecision", "Practice: spot the pattern"].map((l, i) => `<div class="les ${i < 2 ? "done" : i === 2 ? "now" : ""}"><span>${i < 2 ? "✓" : i + 1}</span><b>${l}</b><em class="mut">${4 + i} min</em></div>`).join("")}</div><a class="btn wide">Continue lesson</a></div></div>`;
  return { desktop, mobile, mobile2 };
}

// ---------- Music ----------
function music(p) {
  const albums = [["Monsoon Sessions", ["#ff5f8f", "#7b2ff7", "#ffd166", "#fff"]], ["Lo-fi Chai", ["#f9a03f", "#c2185b", "#fff", "#ffe0b2"]], ["Midnight Drive", ["#3a86ff", "#1d0b3a", "#ff006e", "#8338ec"]], ["Acoustic Mornings", ["#06d6a0", "#118ab2", "#ffd166", "#fff"]]];
  const acard = ([n, c], i) => `<div class="acard"><div class="ai">${abstract(300, 300, i + 4, c)}<span class="play">▶</span></div><b>${n}</b><span class="mut">${24 + i * 7} songs</span></div>`;
  const desktop = `<div class="site music">${nav(p, ["Discover", "Playlists", "Artists", "Live"], "Try Premium")}
  <section class="mu-hero"><div class="cover">${abstract(520, 520, p.seed, albums[0][1])}</div><div class="copy"><span class="eyebrow">Now playing</span><h1>Music that <em>moves</em> with you.</h1><p>Hand-picked playlists, independent artists and lossless sound. Your day, scored.</p><div class="player"><div class="np"><b>Monsoon Sessions</b><span class="mut">Pomelody Originals</span></div><div class="wv">${wave(560, 60, 3, "#ff5f8f")}</div><div class="ctr"><span>⏮</span><span class="pl">❚❚</span><span>⏭</span><em class="mut">1:42 / 3:58</em></div></div></div></section>
  <section class="row"><div class="rowhead"><h3>Made for you</h3><a>View all →</a></div><div class="acards">${albums.map(acard).join("")}</div></section></div>`;
  const mobile = `<div class="m musicm">${status(true)}<div class="mpad"><div class="mnav">${logo(p, 26)}<span class="burger"><i></i><i></i></span></div><div class="bigcover">${abstract(340, 340, p.seed, albums[0][1])}</div><b class="tl">Monsoon Sessions</b><span class="mut">Pomelody Originals</span><div class="wv">${wave(340, 46, 5, "#ff5f8f")}</div><div class="ctr"><span>⤮</span><span>⏮</span><span class="pl">❚❚</span><span>⏭</span><span>↻</span></div></div></div>`;
  const mobile2 = `<div class="m musicm">${status(true)}<div class="mpad"><div class="mnav">${logo(p, 26)}<span class="burger"><i></i><i></i></span></div><h2>Good evening</h2><div class="grid2">${albums.map(acard).join("")}</div></div>${tabbar(["Home", "Search", "Library", "Live"])}</div>`;
  return { desktop, mobile, mobile2 };
}

// ---------- Education ----------
function edu(p) {
  const courses = [["UX Design Foundations", "Design", 72, ["#2f5bea", "#0b1f6b", "#7aa2ff", "#fff"]], ["Python for Data", "Tech", 38, ["#ffb703", "#fb8500", "#fff", "#023047"]], ["Digital Marketing", "Business", 54, ["#06d6a0", "#0a6e5a", "#fff", "#b7f5e3"]], ["Public Speaking", "Skills", 15, ["#ef476f", "#7a1335", "#ffd6e0", "#fff"]]];
  const ccard = ([n, c, pr, col], i) => `<div class="ccard"><div class="ci">${abstract(400, 220, i + 9, col)}<span class="ctag">${c}</span></div><b>${n}</b><span class="mut">${8 + i * 3} lessons · ${4 + i}h</span><div class="prog"><i style="width:${pr}%"></i></div><span class="mut sm">${pr}% complete</span></div>`;
  const desktop = `<div class="site split edu">${nav(p, ["Courses", "Programs", "Mentors", "For schools"], "Start learning")}
  <section class="s-hero"><div class="copy"><span class="eyebrow">Learning that sticks</span><h1>Skills for what's <em>next</em>.</h1><p>Live classes, real projects and mentors from top companies. Learn at your pace, finish with a portfolio.</p><div class="ctas"><a class="btn">Explore courses</a><a class="ghost">Talk to a counsellor →</a></div><div class="kpis"><div><b>1.2L+</b><span>learners</span></div><div><b>340</b><span>courses</span></div><div><b>4.8★</b><span>rating</span></div></div></div>
  <div class="visual"><div class="dash"><div class="dh"><div class="av">${avatar("#cfe0ff", "#2f5bea", "#c98b64", "#2a1d17")}</div><div><b>Welcome back, Priya</b><span class="mut">You're on a 12-day streak 🔥</span></div></div><div class="streak">${bars(420, 80, 8, "#2f5bea", 14)}</div>${courses.slice(0, 2).map(ccard).join("")}</div></div></section>
  <section class="row"><div class="rowhead"><h3>Popular courses</h3><a>View all →</a></div><div class="ccards">${courses.map(ccard).join("")}</div></section></div>`;
  const mobile = `<div class="m edum">${status()}${mnav(p)}<div class="mpad"><span class="eyebrow">Continue learning</span><h2>UX Design Foundations</h2><div class="ci big">${abstract(360, 200, 9, courses[0][3])}</div><div class="prog"><i style="width:72%"></i></div><span class="mut sm">Lesson 9 of 12 · 72%</span><a class="btn wide">Resume lesson</a><h4>Recommended</h4>${courses.slice(1, 3).map(ccard).join("")}</div>${tabbar(["Home", "Courses", "Live", "Profile"])}</div>`;
  const mobile2 = `<div class="m edum">${status()}<div class="mpad"><span class="eyebrow">Live class · in 12 min</span><h2>Wireframing like a pro</h2><div class="live">${abstract(360, 220, 14, ["#0b1f6b", "#2f5bea", "#7aa2ff", "#fff"])}<span class="badge">● LIVE</span></div><div class="lessons">${["Why wireframes", "Low vs high fidelity", "Hands-on: a booking flow", "Review and Q&A"].map((l, i) => `<div class="les ${i < 1 ? "done" : i === 1 ? "now" : ""}"><span>${i < 1 ? "✓" : i + 1}</span><b>${l}</b><em class="mut">${10 + i * 5} min</em></div>`).join("")}</div></div></div>`;
  return { desktop, mobile, mobile2 };
}

export const builders = { travel, rara, supp, retail, health, trading, music, edu };
