import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { builders } from "./sites.mjs";
import { covers } from "./projects.mjs";

const OUT = process.argv[2];
const only = process.argv[3]?.split(",");
const L = (src) => `${new URL("../../public/logos/", import.meta.url).href}${src}`;

const FONTS = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Archivo+Black&family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Sora:wght@500;600;700&family=Space+Grotesk:wght@500;600;700&family=Outfit:wght@500;600;700&display=block";

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
body{background:#0b0b0d;font-family:Inter,sans-serif;-webkit-font-smoothing:antialiased;overflow:hidden}
.stage{position:relative;overflow:hidden;background:radial-gradient(120% 90% at 20% 10%,var(--s1) 0%,var(--s2) 55%,#08080a 100%)}
.stage:before{content:"";position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.07) 1px,transparent 1px);background-size:28px 28px;mask-image:radial-gradient(80% 70% at 50% 50%,#000,transparent)}
.glow{position:absolute;border-radius:50%;filter:blur(90px);opacity:.45;background:var(--ac)}
.grain{position:absolute;inset:0;opacity:.07;mix-blend-mode:overlay;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");z-index:20;pointer-events:none}
/* devices */
.browser{position:absolute;border-radius:14px;overflow:hidden;background:#1b1b1f;box-shadow:0 60px 120px -30px rgba(0,0,0,.75),0 0 0 1px rgba(255,255,255,.08)}
.chrome{height:40px;display:flex;align-items:center;gap:14px;padding:0 16px;background:#1d1d22;border-bottom:1px solid rgba(255,255,255,.06)}
.chrome .dots{display:flex;gap:7px}.chrome .dots i{width:11px;height:11px;border-radius:50%;background:#3a3a42}
.chrome .dots i:nth-child(1){background:#ff5f57}.chrome .dots i:nth-child(2){background:#febc2e}.chrome .dots i:nth-child(3){background:#28c840}
.chrome .url{flex:1;max-width:420px;margin:0 auto;height:24px;border-radius:7px;background:#2a2a31;color:#a8a8b3;font-size:12px;display:flex;align-items:center;justify-content:center;gap:6px}
.chrome .url:before{content:"🔒";font-size:9px;opacity:.7}
.viewport{position:relative;overflow:hidden}
.viewport>.site{position:absolute;left:0;top:0;width:1280px;transform-origin:0 0}
.phone{position:absolute;border-radius:58px;background:#0d0d10;padding:11px;box-shadow:0 70px 120px -30px rgba(0,0,0,.8),0 0 0 1.5px #2b2b31,inset 0 0 0 2px #1a1a1f}
.phone .scr{position:relative;width:100%;height:100%;border-radius:47px;overflow:hidden;background:var(--bg)}
.phone .scr>.m{position:absolute;left:0;top:0;width:390px;transform-origin:0 0}
.phone .island{position:absolute;top:22px;left:50%;transform:translateX(-50%);width:31%;height:30px;border-radius:20px;background:#000;z-index:5}
/* site base */
.site,.m{background:var(--bg);color:var(--fg);font-family:var(--ff),Inter,sans-serif;min-height:100%}
.site h1,.site h2,.site h3,.m h2,.m h3,.m h4{font-family:var(--hf),sans-serif;font-weight:700;letter-spacing:-.02em;line-height:1.05}
.site h1 em,.m h2 em{font-style:normal;color:var(--ac)}
.mut{color:var(--mut)}
.eyebrow{display:inline-block;font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--ac)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:46px;padding:0 22px;border-radius:999px;background:var(--ac);color:#fff;font-weight:600;font-size:15px;white-space:nowrap}
.dark .btn,.site.dark-ac .btn{color:#0b0b0d}
.btn.sm{height:34px;padding:0 14px;font-size:13px}.btn.wide{width:100%;height:52px;margin-top:16px}
.ghost{font-weight:600;font-size:15px;color:var(--fg)}
.nav{height:76px;display:flex;align-items:center;gap:40px;padding:0 48px;border-bottom:1px solid var(--line);background:var(--bg)}
.nav ul{display:flex;gap:30px;list-style:none;margin-left:auto;font-size:15px;font-weight:500;color:var(--mut)}.nav li.on{color:var(--fg)}
.lg{display:block;object-fit:contain}.wm{font-family:var(--hf);font-weight:700;letter-spacing:-.02em;white-space:nowrap}
.row{padding:34px 48px}.rowhead{display:flex;justify-content:space-between;align-items:end;margin-bottom:20px}.rowhead h3{font-size:28px}.rowhead a{font-size:14px;font-weight:600;color:var(--ac)}
.stars{color:#f5b301;letter-spacing:1px;font-size:12px}.pm{display:flex;align-items:center;gap:6px;font-size:12px;margin-top:4px}
.up{color:#1fae74}.dn{color:#e0533d}.g{color:#1fae74}
.float{position:absolute;display:flex;align-items:center;gap:12px;flex-direction:column;align-items:flex-start;padding:16px 18px;border-radius:18px;background:var(--card);border:1px solid var(--line);box-shadow:0 24px 50px -20px rgba(0,0,0,.35);font-size:13px}
.float b{font-size:20px;font-family:var(--hf)}.float .sp{width:200px;height:50px}
.dot{width:12px;height:12px;border-radius:50%;background:var(--ac);box-shadow:0 0 0 6px color-mix(in srgb,var(--ac) 25%,transparent)}
.float.f2{flex-direction:row}.float.f2 b{font-size:15px;display:block}
/* split hero */
.s-hero{display:grid;grid-template-columns:1.05fr 1fr;gap:40px;padding:56px 48px 30px;align-items:center;min-height:560px}
.s-hero h1{font-size:68px;margin:18px 0 20px}.s-hero p{font-size:18px;line-height:1.55;color:var(--mut);max-width:520px}
.ctas{display:flex;gap:22px;align-items:center;margin-top:30px}
.kpis{display:flex;gap:44px;margin-top:44px;padding-top:26px;border-top:1px solid var(--line)}.kpis b{display:block;font-family:var(--hf);font-size:30px}.kpis span{font-size:13px;color:var(--mut)}
.visual{position:relative;height:500px}
.art{position:absolute;inset:0;overflow:hidden}.art.r{border-radius:28px}
.visual .f1{left:-30px;bottom:40px}.visual .f2{left:24px;top:24px}
/* travel */
.travel .t-hero{position:relative;margin:18px 24px 0;height:520px;border-radius:26px;overflow:hidden}
.travel .ov{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.55),rgba(0,0,0,.05) 65%),linear-gradient(0deg,rgba(0,0,0,.35),transparent 40%)}
.travel .copy{position:absolute;left:56px;top:70px;max-width:620px;color:#fff}.travel .copy .eyebrow{color:#fff;opacity:.85}
.travel .copy h1{font-size:68px;margin:16px 0 18px;color:#fff}.travel .copy p{font-size:18px;line-height:1.5;opacity:.85;max-width:500px}
.search{position:absolute;left:56px;right:56px;bottom:34px;display:grid;grid-template-columns:1.3fr 1fr 1fr auto;align-items:center;gap:0;padding:12px 12px 12px 26px;border-radius:20px;background:var(--bg);color:var(--fg);box-shadow:0 20px 40px -10px rgba(0,0,0,.35)}
.search>div{padding:4px 20px 4px 0;border-right:1px solid var(--line);margin-right:20px}.search>div:nth-child(3){border:0}
.search label{display:block;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--mut)}.search b{font-size:16px}
.cards{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.tcard{border-radius:20px;overflow:hidden;background:var(--card);border:1px solid var(--line)}
.ti{position:relative;height:170px}.tcard .tag{position:absolute;left:12px;top:12px;padding:5px 10px;border-radius:99px;background:rgba(255,255,255,.9);color:#111;font-size:12px;font-weight:600}
.heart{position:absolute;right:12px;top:10px;width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.9);color:#111;display:grid;place-items:center;font-size:15px}
.tb{padding:14px 16px 16px}.tt{font-family:var(--hf);font-weight:600;font-size:17px}.tm{display:flex;justify-content:space-between;margin-top:6px;font-size:13px;color:var(--mut)}.tm .pr b{color:var(--fg)}
/* mobile base */
.m{position:relative;min-height:844px;padding-bottom:90px}
.status{height:54px;display:flex;align-items:center;justify-content:space-between;padding:0 30px 0 36px;font-size:16px;position:relative;z-index:3}
.status .ic{display:flex;gap:3px;align-items:end}.status .ic i{width:4px;background:currentColor;border-radius:1px}.status .ic i:nth-child(1){height:6px}.status .ic i:nth-child(2){height:9px}.status .ic i:nth-child(3){height:12px}.status .ic em{width:24px;height:12px;border:1.5px solid currentColor;border-radius:4px;margin-left:6px;opacity:.9}
.status.d{color:#fff}
.mnav{display:flex;align-items:center;justify-content:space-between;padding:8px 22px 14px;position:relative;z-index:3}
.burger{display:flex;flex-direction:column;gap:6px}.burger i{width:24px;height:2px;border-radius:2px;background:currentColor}
.mpad{padding:6px 22px}.m h2{font-size:30px;margin:8px 0 14px}.m h4{font-size:20px;margin:22px 0 12px}
.mcard{padding:16px;border-radius:20px;background:var(--card);border:1px solid var(--line);margin-bottom:12px}.mcard b{display:block;font-family:var(--hf);font-size:24px;margin-top:4px}.mcard .sp,.mcard .bars{height:80px;margin-top:10px}.mcard.big b{font-size:34px}
.mcard small{font-size:12px;font-weight:600}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.tabbar{position:absolute;left:0;right:0;bottom:0;height:84px;display:flex;justify-content:space-around;padding-top:12px;background:var(--bg);border-top:1px solid var(--line);font-size:11px;color:var(--mut)}
.tabbar span{display:flex;flex-direction:column;align-items:center;gap:6px}.tabbar i{width:22px;height:22px;border-radius:7px;border:2px solid currentColor;opacity:.8}.tabbar .on{color:var(--ac)}.tabbar .on i{background:currentColor}
.search.m-s,.m .search{position:static;display:block;padding:14px 18px;border-radius:16px;background:var(--card);border:1px solid var(--line);color:var(--mut);font-size:15px;box-shadow:none;margin:6px 0 16px}
.chips{display:flex;gap:8px;margin:14px 0}.chips span{padding:8px 14px;border-radius:99px;border:1px solid var(--line);font-size:13px;font-weight:500;white-space:nowrap}.chips .on{background:var(--fg);color:var(--bg);border-color:var(--fg)}
/* travel mobile */
.m.travel .mhero{position:relative;height:520px;margin-top:-54px;padding-top:54px;color:#fff}.m.travel .mhero>svg{position:absolute;inset:0}.m.travel .mhero .ov{position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.6),rgba(0,0,0,.1) 60%,rgba(0,0,0,.35))}
.m.travel .mhero .mnav{background:rgba(255,255,255,.92);margin:0 16px;border-radius:18px;padding:12px 16px;color:var(--fg)}
.m.travel .mcopy{position:absolute;left:22px;right:22px;bottom:28px}.m.travel .mcopy .eyebrow{color:#fff;opacity:.85}.m.travel .mcopy h2{color:#fff;font-size:34px}
.mrow{padding:6px 22px}.tcard.h{display:grid;grid-template-columns:120px 1fr;margin-bottom:12px}.tcard.h .ti{height:110px}.tcard.h .tag,.tcard.h .heart{display:none}
.m.travel.light .mtop{padding:0 22px}.m.travel.light .mtop .mnav{padding:8px 0 10px}.m.travel.light h3{font-size:30px}
.tcard.v{margin:0 22px 14px}.tcard.v .ti{height:200px}
.site.travel.dk .search,.m.travel .mnav{}
/* rara */
.m.dark{color:var(--fg)}.mart{height:300px;margin-top:-54px;position:relative}.mart:after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,var(--bg),transparent 50%)}
/* store */
.blob{position:absolute;inset:30px 10px;border-radius:40% 60% 55% 45%/50% 45% 55% 50%;background:radial-gradient(circle at 40% 40%,color-mix(in srgb,var(--ac) 90%,#fff),var(--ac))}
.jars{position:absolute;inset:0;display:flex;align-items:flex-end;justify-content:center;padding-bottom:30px}.jars>div{margin:0 -8px}.jars .j0{z-index:2}
.store .visual .f1{left:-10px;top:60px;bottom:auto}
.pcards{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}.pcard{padding:16px;border-radius:20px;background:var(--card);border:1px solid var(--line)}
.pi{height:170px;display:grid;place-items:center;border-radius:14px;background:linear-gradient(180deg,#efe9df,#f8f5ef)}.pi svg{height:150px;width:auto}
.pn{font-weight:600;font-size:15px;margin-top:12px}.pp{display:flex;justify-content:space-between;align-items:center;margin-top:10px}.pp b{font-size:18px}
.add{width:34px;height:34px;border-radius:50%;background:var(--fg);color:var(--bg);display:grid;place-items:center;font-size:18px;font-weight:600}
.m.store .pcard{padding:10px}.m.store .pi{height:120px}.m.store .pi svg{height:105px}.m.store .pn{font-size:13px}
.promo{display:flex;justify-content:space-between;align-items:center;padding:18px;border-radius:22px;background:var(--fg);color:var(--bg)}.promo b{display:block;font-family:var(--hf);font-size:24px;margin:6px 0 12px;line-height:1.05}.promo .pj svg{height:140px;width:auto}
.pdp{height:400px;margin-top:-54px;padding-top:70px;display:grid;place-items:center;background:radial-gradient(circle at 50% 55%,color-mix(in srgb,var(--ac) 85%,#fff),var(--ac) 70%)}
.nut{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:18px}.nut div{padding:12px;border-radius:14px;background:var(--card);border:1px solid var(--line);text-align:center}.nut b{display:block;font-size:20px;font-family:var(--hf)}.nut span{font-size:12px;color:var(--mut)}
/* retail */
.retail .rbar{height:76px;display:flex;align-items:center;gap:28px;padding:0 36px;background:var(--ac);color:#fff}.retail .wm{color:#fff}
.rsearch{flex:1;height:44px;border-radius:99px;background:#fff;color:#74777c;display:flex;align-items:center;padding:0 22px;font-size:15px}
.rlinks{display:flex;gap:26px;font-size:14px;font-weight:600}.rsub{display:flex;gap:28px;padding:12px 36px;font-size:14px;font-weight:500;border-bottom:1px solid var(--line);background:#f1f6fd}
.rhero{display:grid;grid-template-columns:2.2fr 1fr;gap:20px;padding:24px 36px 0}
.rban{display:flex;justify-content:space-between;align-items:center;padding:40px 44px;border-radius:20px;background:linear-gradient(120deg,#dbe9fb,#fff6d6);height:330px}.rban>div:first-child{flex:1;min-width:400px}.rban h1{font-size:46px;margin:12px 0 24px;max-width:430px}.rprods div{flex:none}.rprods div:nth-child(1),.rprods div:nth-child(3){width:120px;height:120px}.rprods div:nth-child(2){width:170px!important;height:170px!important}
.rprods{display:flex;gap:8px;align-items:flex-end}.rprods div{width:150px;height:150px;background:#fff;border-radius:50%;padding:20px;box-shadow:0 20px 40px -20px rgba(0,0,0,.25)}.rprods div:nth-child(2){width:200px;height:200px}
.rside{display:grid;gap:20px}.rmini{border-radius:20px;padding:26px;display:flex;flex-direction:column;justify-content:end;gap:6px;font-size:14px}.rmini b{font-size:22px;font-family:var(--hf)}.rmini.y{background:var(--ac2)}.rmini.b{background:#0b3f8f;color:#fff}
.rcards{display:grid;grid-template-columns:repeat(5,1fr);gap:16px}.rcard{position:relative}.ri{position:relative;height:150px;border-radius:14px;background:#f4f6f9;padding:16px}
.flag{position:absolute;left:10px;top:10px;font-size:11px;font-weight:700;padding:3px 8px;border-radius:5px;background:#e6f1fc;color:var(--ac)}
.rp{margin-top:10px;display:flex;gap:8px;align-items:baseline}.rp b{font-size:18px}.rn{font-size:14px;margin-top:2px}
.add.w{position:absolute;right:8px;top:110px;width:auto;height:30px;padding:0 12px;border-radius:99px;background:var(--ac);color:#fff;font-size:13px}
.m.retail .rmtop{margin-top:-54px;padding:60px 18px 16px;background:var(--ac);color:#fff;display:flex;align-items:center;gap:14px}.m.retail .rmtop .rsearch{height:40px;font-size:14px}
.rmban{display:flex;justify-content:space-between;align-items:center;margin-top:14px;padding:18px;border-radius:20px;background:linear-gradient(120deg,#dbe9fb,#fff6d6)}.rmban b{display:block;font-family:var(--hf);font-size:22px;line-height:1.1;margin-top:6px;max-width:180px}.rmimg{width:110px;height:110px}
.m.retail .ri{height:130px}.m.retail .add.w{top:92px}
.litem{display:flex;gap:14px;align-items:center;padding:12px 0;border-bottom:1px solid var(--line)}.li{width:86px;height:86px;border-radius:14px;background:#f4f6f9;padding:10px}.qty{margin-top:8px;display:inline-block;padding:4px 12px;border:1px solid var(--line);border-radius:99px;font-size:13px}
.sum{display:flex;justify-content:space-between;font-size:15px;padding:4px 0}.sum b{font-size:15px;font-family:inherit;margin:0}
/* health */
.hsearch{display:grid;grid-template-columns:1.4fr 1fr auto;align-items:center;margin-top:30px;padding:8px 8px 8px 22px;border-radius:18px;background:var(--card);border:1px solid var(--line);font-size:15px;color:var(--mut);box-shadow:0 20px 40px -24px rgba(0,0,0,.25)}.hsearch span+span{border-left:1px solid var(--line);padding-left:18px}
.trust{display:flex;gap:22px;margin-top:22px;font-size:14px;font-weight:500;color:var(--ac)}
.book{position:absolute;left:40px;right:0;top:10px;padding:22px;border-radius:26px;background:var(--card);border:1px solid var(--line);box-shadow:0 40px 80px -40px rgba(0,0,0,.35)}
.dcard{display:flex;align-items:center;gap:14px;padding:16px;border-radius:18px;background:var(--card);border:1px solid var(--line);font-size:14px}.dcard b{display:block;font-size:16px}.dcard .btn{margin-left:auto}
.av{width:58px;height:58px;flex:none}.av.lg{width:110px;height:110px;margin:0 auto 12px}
.book .dcard{border:0;padding:0 0 16px;border-bottom:1px solid var(--line);border-radius:0}.book .dcard .btn{display:none}
.days{display:flex;gap:10px;margin:18px 0}.days span{flex:1;padding:10px 0;border-radius:14px;border:1px solid var(--line);text-align:center;font-size:12px;color:var(--mut)}.days b{display:block;font-size:18px;color:var(--fg)}.days .on{background:var(--ac);border-color:var(--ac);color:#fff}.days .on b{color:#fff}
.slots{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.slots span{padding:11px 0;text-align:center;border-radius:12px;background:color-mix(in srgb,var(--ac) 8%,var(--bg));font-size:14px;font-weight:500}.slots .on{background:var(--fg);color:var(--bg)}.slots .off{opacity:.35;text-decoration:line-through}
.health .visual .f1{left:-10px;bottom:-10px;flex-direction:row}.health .visual .f1 b{font-size:15px;display:block}
.dcards{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.cats{display:flex;gap:10px;margin-bottom:16px}.cats span{flex:1;padding:14px 0;text-align:center;border-radius:16px;background:color-mix(in srgb,var(--ac) 10%,var(--bg));font-size:12px;font-weight:600;color:var(--ac)}
.next{padding:18px;border-radius:20px;background:var(--ac);color:#fff;display:flex;flex-direction:column;gap:4px;font-size:13px}.next .mut{color:#fff;opacity:.8}.next b{font-size:24px;font-family:var(--hf)}
.m.health .dcard{margin-bottom:10px}.dhead{text-align:center;padding:10px 0}.dhead b{display:block;font-size:22px;font-family:var(--hf)}.dhead .pm{justify-content:center}
/* trading */
.tr-hero{display:grid;grid-template-columns:1fr 1.25fr .8fr;gap:22px;padding:46px 40px;align-items:start}
.trade .copy h1{font-size:54px;margin:16px 0 18px}.trade .copy p{font-size:17px;line-height:1.55;color:var(--mut)}.trade .ctas{flex-direction:column;align-items:flex-start;gap:16px}
.chart{border-radius:22px;background:#0f1b3d;color:#e8edf7;padding:20px;height:470px;display:flex;flex-direction:column}.ch{display:flex;justify-content:space-between;align-items:center}.ch b{font-size:18px}.chart .mut{color:#8b97b5}
.tf{display:flex;gap:6px}.tf span{padding:5px 10px;border-radius:8px;font-size:12px;font-weight:600;color:var(--mut)}.chart .tf span{color:#8b97b5}.tf .on{background:var(--ac2);color:#fff!important}
.cv{flex:1;margin:16px 0}.cf{display:flex;gap:18px;font-size:12px;color:#8b97b5}
.watch{border-radius:22px;background:var(--card);border:1px solid var(--line);padding:18px}.wh{display:flex;justify-content:space-between;margin-bottom:8px}
.tk{display:grid;grid-template-columns:1fr 70px auto;align-items:center;gap:10px;padding:12px 0;border-top:1px solid var(--line);font-size:13px}.tk b{display:block;font-size:13px}.tk .mut{font-size:11px}.tsp{height:28px}.tv{text-align:right}.tv span{font-size:12px;font-weight:600}
.m.tradem h2{font-size:38px;margin:4px 0}.mchart{height:190px;margin:16px -6px 10px;border-radius:18px;background:#0f1b3d;padding:10px}
.lessons{margin:16px 0}.les{display:grid;grid-template-columns:34px 1fr auto;align-items:center;gap:12px;padding:14px 0;border-bottom:1px solid var(--line);font-size:15px}.les span{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;border:1.5px solid var(--line);font-size:13px;font-weight:600}.les.done span{background:var(--ac);border-color:var(--ac);color:#fff}.les.now span{border-color:var(--ac);color:var(--ac)}.les em{font-style:normal;font-size:13px}
/* music */
.mu-hero{display:grid;grid-template-columns:auto 1fr;gap:56px;align-items:center;padding:50px 56px 20px}.mu-hero .cover{width:440px;height:440px;border-radius:26px;overflow:hidden;box-shadow:0 40px 80px -30px rgba(255,95,143,.45)}
.music h1{font-size:58px;margin:16px 0 18px}.music .copy p{font-size:18px;line-height:1.55;color:var(--mut);max-width:520px}
.player{margin-top:30px;padding:20px 22px;border-radius:22px;background:var(--card);border:1px solid var(--line)}.np b{font-size:17px;display:block}.wv{height:56px;margin:14px 0}.ctr{display:flex;align-items:center;gap:22px;font-size:20px}.ctr .pl{width:50px;height:50px;border-radius:50%;background:var(--ac);color:#0b0b0d;display:grid;place-items:center;font-size:16px}.ctr em{margin-left:auto;font-size:13px;font-style:normal}
.acards{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}.acard b{display:block;margin-top:12px;font-size:16px}.acard .mut{font-size:13px}.ai{position:relative;aspect-ratio:1;border-radius:18px;overflow:hidden}.play{position:absolute;right:12px;bottom:12px;width:42px;height:42px;border-radius:50%;background:var(--ac);color:#0b0b0d;display:grid;place-items:center;font-size:14px}
.m.musicm .bigcover{height:340px;border-radius:26px;overflow:hidden;margin:10px 0 22px;box-shadow:0 30px 60px -20px rgba(255,95,143,.4)}.m.musicm .tl{display:block;font-family:var(--hf);font-size:26px}.m.musicm .wv{height:46px;margin:22px 0}.m.musicm .ctr{justify-content:space-between;font-size:22px}.m.musicm .ctr .pl{width:66px;height:66px;font-size:20px}
.m.musicm .acard b{font-size:14px}
/* edu */
.dash{position:absolute;left:30px;right:0;top:0;padding:22px;border-radius:26px;background:var(--card);border:1px solid var(--line);box-shadow:0 40px 80px -40px rgba(11,26,74,.35)}.dh{display:flex;gap:14px;align-items:center}.dh .av{width:52px;height:52px}.dh b{display:block;font-size:17px}.dh .mut{font-size:13px}
.streak{height:70px;margin:16px 0}.dash .ccard{display:grid;grid-template-columns:120px 1fr;column-gap:16px;padding:12px 0;border-top:1px solid var(--line)}.dash .ci{grid-row:span 4;height:86px}
.ccards{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}.ccard b{display:block;font-size:16px;margin-top:10px}.ccard .mut{font-size:13px}.ci{position:relative;height:150px;border-radius:16px;overflow:hidden}.ctag{position:absolute;left:10px;top:10px;padding:4px 10px;border-radius:99px;background:rgba(255,255,255,.92);color:#111;font-size:11px;font-weight:600}
.prog{height:6px;border-radius:9px;background:var(--line);margin:10px 0 6px;overflow:hidden}.prog i{display:block;height:100%;background:var(--ac);border-radius:9px}.sm{font-size:12px}
.ci.big{height:190px;margin:10px 0 6px}.m.edum .ccard{display:grid;grid-template-columns:110px 1fr;column-gap:14px;margin-bottom:12px}.m.edum .ccard .ci{grid-row:span 4;height:96px}.m.edum .ccard b{margin-top:2px}
.live{position:relative;height:200px;border-radius:20px;overflow:hidden;margin:10px 0}.live .badge{position:absolute;left:12px;top:12px;padding:5px 10px;border-radius:8px;background:#e5484d;color:#fff;font-size:12px;font-weight:700}
/* misc */
.mcard.row2{display:flex;gap:14px;align-items:center}.mcard b.s{font-size:16px;margin:0}
/* brand board */
.board{position:absolute;border-radius:30px;background:var(--bg);color:var(--fg);padding:44px;box-shadow:0 60px 120px -30px rgba(0,0,0,.7);display:flex;flex-direction:column;gap:30px;font-family:var(--ff)}
.board .blogo{height:150px;display:grid;place-items:center;border-radius:20px;background:color-mix(in srgb,var(--fg) 4%,var(--bg));border:1px solid var(--line)}
.board .sw{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.board .sw div{height:92px;border-radius:14px;padding:10px;font-size:11px;font-weight:600;display:flex;align-items:flex-end;border:1px solid var(--line)}
.board .type{display:flex;align-items:flex-end;gap:22px}.board .type b{font-family:var(--hf);font-size:110px;line-height:.8;font-weight:700}.board .type span{font-size:14px;color:var(--mut);line-height:1.5}
.board .ui{display:flex;gap:12px;align-items:center}
`;

const viewport = (inner, w, h, scale, siteH) => `<div class="viewport" style="width:${w}px;height:${h}px"><div style="position:absolute;left:0;top:0;width:${1280}px;height:${siteH}px;transform:scale(${scale});transform-origin:0 0">${inner}</div></div>`;
const browser = (c, html, { x, y, w, h }) => {
  const s = w / 1280;
  return `<div class="browser" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px"><div class="chrome"><span class="dots"><i></i><i></i><i></i></span><span class="url">${c.domain}</span></div>${viewport(html, w, h - 40, s, (h - 40) / s)}</div>`;
};
const phone = (html, { x, y, w, rot = 0 }) => {
  const h = w * 2.165, sw = w - 22, s = sw / 390;
  return `<div class="phone" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;transform:rotate(${rot}deg)"><div class="scr"><div class="island"></div><div style="position:absolute;left:0;top:0;width:390px;height:${(h - 22) / s}px;transform:scale(${s});transform-origin:0 0;overflow:hidden">${html}</div></div></div>`;
};
const board = (c, { x, y, w, h }) => {
  const t = c.theme;
  const lg = c.logo ? `<img src="${L(c.logo)}" style="max-height:${Math.min(110, (c.logoH ?? 34) * 2.4)}px;max-width:75%">` : `<span class="wm" style="font-size:64px">${c.wordmark}</span>`;
  const sw = [[t.ac, "Primary"], [t.ac2, "Accent"], [t.fg, "Ink"], [t.card, "Surface"]];
  return `<div class="board" style="left:${x}px;top:50%;transform:translateY(-50%);width:${w}px"><div class="blogo">${lg}</div>
  <div class="sw">${sw.map(([col, n]) => `<div style="background:${col};color:${isDark(col) ? "#fff" : "#111"}">${n}<br>${col.toUpperCase()}</div>`).join("")}</div>
  <div class="type"><b>Aa</b><span>${t.hf}<br>Headlines · 700<br>${t.ff} for interface text</span></div>
  <div class="ui"><a class="btn">Primary action</a><span class="chips" style="margin:0"><span class="on">Selected</span><span>Option</span></span></div></div>`;
};
function isDark(hex) { const n = parseInt(hex.slice(1), 16); const r = n >> 16, g = (n >> 8) & 255, b = n & 255; return 0.299 * r + 0.587 * g + 0.114 * b < 150; }

function compose(c, variant) {
  const parts = builders[c.kind](c);
  const t = c.theme;
  const vars = `--bg:${t.bg};--fg:${t.fg};--mut:${t.mut};--ac:${t.ac};--ac2:${t.ac2};--card:${t.card};--line:${t.line};--hf:'${t.hf}';--ff:'${t.ff}';--s1:${c.stage[0]};--s2:${c.stage[1]}`;
  let W, H, inner;
  if (variant === "cover") {
    W = 1600; H = 1000;
    inner = `<div class="glow" style="left:380px;top:300px;width:900px;height:500px"></div>` + browser(c, parts.desktop, { x: 90, y: 110, w: 1160, h: 780 }) + phone(parts.mobile, { x: 1160, y: 200, w: 340 });
  } else if (variant === "thumb") {
    W = 960; H = 1200;
    inner = `<div class="glow" style="left:200px;top:400px;width:600px;height:600px"></div>` + browser(c, parts.desktop, { x: 50, y: 80, w: 940, h: 640 }) + phone(parts.mobile, { x: 470, y: 330, w: 400 });
  } else {
    W = 1600; H = 1000;
    inner = `<div class="glow" style="left:250px;top:250px;width:1100px;height:500px;opacity:.3"></div>` + phone(parts.mobile2, { x: 110, y: 150, w: 330 }) + phone(parts.mobile, { x: 490, y: 90, w: 360 }) + board(c, { x: 920, y: 190, w: 590 });
  }
  return `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${FONTS}"><style>${CSS}</style></head><body><div class="stage" style="${vars};width:${W}px;height:${H}px">${inner}<div class="grain"></div></div></body></html>`;
}

const b = await chromium.launch();
fs.mkdirSync(OUT, { recursive: true });
for (const c of covers) {
  if (only && !only.includes(c.slug)) continue;
  for (const [variant, w, h, dpr] of [["cover", 1600, 1000, 1.5], ["thumb", 960, 1200, 1.25], ["detail", 1600, 1000, 1.5]]) {
    const page = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: dpr });
    const file = path.join(OUT, `${c.slug}-${variant}.html`);
    fs.writeFileSync(file, compose(c, variant));
    await page.goto("file://" + file, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150);
    await page.screenshot({ path: path.join(OUT, `${c.slug}-${variant}.jpg`), type: "jpeg", quality: 90 });
    await page.close();
  }
  console.log("done", c.slug);
}
await b.close();
