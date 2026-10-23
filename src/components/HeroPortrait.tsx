"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

const VERT = `#version 300 es
in vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

// Pranay's portrait redrawn as a halftone of dots, sitting in a field of
// topographic contour lines. The cursor parts the dots and ripples the lines;
// a click sends a ring through both.
const FRAG = `#version 300 es
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_energy;
uniform vec4 u_rect;   // portrait rect in canvas pixels, origin bottom-left
uniform vec3 u_pulse;  // xy position, z start time
uniform float u_cell;  // halftone cell size in canvas pixels
uniform float u_dpr;
uniform sampler2D u_halo;
uniform sampler2D u_photo;
out vec4 o;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p){ float v = 0.0; float a = 0.5; for(int i=0;i<4;i++){ v += a*noise(p); p *= 2.03; a *= 0.5; } return v; }

vec2 toPortrait(vec2 px){ vec2 q = (px - u_rect.xy) / u_rect.zw; return vec2(q.x, 1.0 - q.y); }
float inside(vec2 q){ return step(0.0, q.x) * step(q.x, 1.0) * step(0.0, q.y) * step(q.y, 1.0); }

void main(){
  vec2 px = gl_FragCoord.xy;
  float s = u_res.y;
  vec2 uv = px / s;

  // Cursor ripple and click ring
  float d = length(uv - u_mouse / s);
  float ripple = sin(d * 42.0 - u_time * 3.2) * exp(-d * 5.5) * u_energy;
  float pd = length(uv - u_pulse.xy / s);
  float age = u_time - u_pulse.z;
  float ring = exp(-pow((pd - age * 0.55) * 12.0, 2.0)) * exp(-age * 1.4) * step(0.0, age);

  // Contour field
  vec2 hq = toPortrait(px);
  float halo = texture(u_halo, clamp(hq, 0.0, 1.0)).a * inside(hq);
  float t = u_time * 0.04;
  float f = fbm(uv * 2.0 + vec2(t, -t * 0.6)) + halo * 0.32 + ripple * 0.05 + ring * 0.08;
  float bands = f * 16.0;
  float dist = min(fract(bands), 1.0 - fract(bands));
  float line = 1.0 - smoothstep(0.0, fwidth(bands) * 1.4, dist);

  vec3 violet = vec3(0.49, 0.55, 1.0);
  vec3 ember = vec3(1.0, 0.48, 0.27);
  vec3 paper = vec3(0.95, 0.94, 0.92);
  float warmL = clamp(halo * 1.1 + ring * 1.5 + ripple * 0.6, 0.0, 1.0);
  vec3 lineCol = mix(violet, ember, smoothstep(0.15, 0.9, warmL));
  float strength = 0.07 + 0.2 * smoothstep(0.0, 0.8, halo) + 0.35 * ring + 0.25 * abs(ripple);

  // Halftone: warp the grid away from the cursor and the ring, then draw one dot per cell.
  vec2 dm = px - u_mouse;
  float dd = length(dm);
  float sig = 90.0 * u_dpr;
  vec2 push = dm / max(dd, 1.0) * (18.0 + 34.0 * u_energy) * u_dpr * exp(-dd * dd / (sig * sig));
  vec2 dp = px - u_pulse.xy;
  push += dp / max(length(dp), 1.0) * ring * 26.0 * u_dpr;
  vec2 q = px - push;
  vec2 cell = floor(q / u_cell);
  vec2 cc = (cell + 0.5) * u_cell;
  vec2 cq = toPortrait(cc);
  vec4 ph = texture(u_photo, clamp(cq, 0.0, 1.0)) * inside(cq);
  float lum = dot(ph.rgb, vec3(0.299, 0.587, 0.114));
  lum = smoothstep(0.04, 0.85, lum);
  float h = hash(cell);
  float shimmer = 0.9 + 0.1 * sin(u_time * 1.6 + h * 6.283);
  float appear = smoothstep(0.0, 0.25, u_time * 0.8 - 0.35 - (1.0 - cq.y) * 0.9 - h * 0.15);
  float fade = smoothstep(1.02, 0.88, cq.y);
  float r = u_cell * 0.5 * (0.26 + 0.74 * sqrt(lum)) * smoothstep(0.35, 0.8, ph.a) * shimmer * appear * fade;
  float disc = 1.0 - smoothstep(r - 0.8, r + 0.8, length(q - cc));
  float near = exp(-dd * dd / (sig * sig * 2.2));
  float warmD = clamp(near * u_energy * 1.4 + ring * 1.2, 0.0, 1.0);
  vec3 dotCol = mix(mix(violet * 0.85, paper, smoothstep(0.1, 0.7, lum)), ember, warmD * 0.85);

  vec2 c = px / u_res;
  float edge = smoothstep(0.0, 0.18, c.x) * smoothstep(1.0, 0.82, c.x) * smoothstep(0.0, 0.12, c.y) * smoothstep(1.0, 0.85, c.y);
  float body = smoothstep(0.2, 0.6, texture(u_photo, clamp(hq, 0.0, 1.0)).a * inside(hq));
  float la = clamp(line * strength, 0.0, 1.0) * edge * (1.0 - body);
  float da = disc * (0.55 + 0.45 * lum);
  vec3 rgb = lineCol * la * (1.0 - da) + dotCol * da;
  o = vec4(rgb, clamp(la * (1.0 - da) + da, 0.0, 1.0));
}`;

const SRC = "/about/pranay-cutout.webp";
// Same cutout, greyscale with local contrast boosted so features survive as dots.
const DOTS = "/about/pranay-halftone.webp";

export function HeroPortrait({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const figure = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = host.current;
    const canvas = canvasRef.current;
    const fig = figure.current;
    if (!wrap || !canvas || !fig) return;
    const gl = canvas.getContext("webgl2", { premultipliedAlpha: true, alpha: true, antialias: false });
    if (!gl) {
      wrap.dataset.gl = "off";
      return;
    }

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn(gl.getShaderInfoLog?.(gl.getAttachedShaders(prog)![1]));
      wrap.dataset.gl = "off";
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u("u_res"), uTime = u("u_time"), uMouse = u("u_mouse"), uEnergy = u("u_energy");
    const uRect = u("u_rect"), uPulse = u("u_pulse"), uCell = u("u_cell"), uDpr = u("u_dpr");
    gl.uniform1i(u("u_halo"), 0);
    gl.uniform1i(u("u_photo"), 1);
    gl.uniform3f(uPulse, -9999, -9999, -99);

    // Blurred silhouette: shrink the cutout to a few pixels and scale it back up.
    let ready = false;
    const img = new window.Image();
    img.src = SRC;
    img.onload = () => {
      const tiny = document.createElement("canvas");
      tiny.width = 22;
      tiny.height = Math.round((22 * img.height) / img.width);
      const tctx = tiny.getContext("2d")!;
      tctx.drawImage(img, 0, 0, tiny.width, tiny.height);
      const big = document.createElement("canvas");
      big.width = 176;
      big.height = tiny.height * 8;
      const bctx = big.getContext("2d")!;
      bctx.imageSmoothingQuality = "high";
      bctx.drawImage(tiny, 0, 0, big.width, big.height);
      const upload = (unit: number, src: TexImageSource) => {
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      };
      upload(0, big);
      const dots = new window.Image();
      dots.src = DOTS;
      dots.onload = () => {
        upload(1, dots);
        ready = true;
        wrap.dataset.gl = "on";
      };
    };

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let H = 1;
    const rect = { x: 0, y: 0, w: 1, h: 1 };
    const layout = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
      H = canvas.height;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      const f = fig.getBoundingClientRect();
      Object.assign(rect, { x: (f.left - r.left) * dpr, y: (r.bottom - f.bottom) * dpr, w: f.width * dpr, h: f.height * dpr });
      gl.uniform4f(uRect, rect.x, rect.y, rect.w, rect.h);
      // About 170 rows of dots whatever the size, never finer than 4 device pixels.
      gl.uniform1f(uCell, Math.max(4 * dpr, rect.h / 170));
      gl.uniform1f(uDpr, dpr);
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(wrap);

    const start = performance.now();
    const now = () => (performance.now() - start) / 1000;
    const mouse = { x: canvas.width * 0.5, y: canvas.height * 0.6 };
    const target = { ...mouse };
    let energy = 0;
    let lastMove = -10;
    const par = { x: 0, y: 0, tx: 0, ty: 0 };
    const toCanvas = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: (e.clientX - r.left) * dpr, y: (r.bottom - e.clientY) * dpr };
    };
    const onMove = (e: PointerEvent) => {
      const p = toCanvas(e);
      energy = Math.min(1, energy + Math.hypot(p.x - target.x, p.y - target.y) / (H * 0.6));
      target.x = p.x;
      target.y = p.y;
      lastMove = now();
      // Small parallax on the figure itself
      par.tx = (e.clientX / window.innerWidth - 0.5) * -14 * dpr;
      par.ty = (e.clientY / window.innerHeight - 0.5) * 8 * dpr;
    };
    const onDown = (e: PointerEvent) => {
      const p = toCanvas(e);
      gl.uniform3f(uPulse, p.x, p.y, now());
    };
    window.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerdown", onDown);

    const still =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.classList.contains("motion-off");
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(wrap);

    let raf = 0;
    const frame = () => {
      if (!still) raf = requestAnimationFrame(frame);
      if (!visible || !ready) return;
      const t = still ? 20 : now();
      // With no pointer around (touch, idle), let a ripple source drift on its own.
      if (t - lastMove > 3) {
        target.x = canvas.width * (0.5 + Math.sin(t * 0.23) * 0.3);
        target.y = canvas.height * (0.55 + Math.cos(t * 0.31) * 0.25);
        energy = Math.max(energy, 0.18);
      }
      mouse.x += (target.x - mouse.x) * 0.06;
      mouse.y += (target.y - mouse.y) * 0.06;
      energy *= 0.985;
      par.x += (par.tx - par.x) * 0.05;
      par.y += (par.ty - par.y) * 0.05;
      gl.uniform4f(uRect, rect.x + par.x, rect.y + par.y, rect.w, rect.h);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uEnergy, still ? 0 : energy);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    if (still) {
      const wait = () => (ready ? frame() : requestAnimationFrame(wait));
      wait();
    } else frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <div ref={host} className={`group ${className}`} role="img" aria-label="Portrait of Pranay Pawar drawn in dots">
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
      <div
        ref={figure}
        className="absolute bottom-0 right-[6%] aspect-[866/1400] h-[80%] opacity-0 group-data-[gl=off]:opacity-100 [mask-image:linear-gradient(to_bottom,#000_70%,transparent)] md:right-[14%] md:h-[86%] md:[mask-image:linear-gradient(to_bottom,#000_88%,transparent)]"
      >
        <motion.div
          className="relative h-full w-full"
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={SRC}
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 40vw, 60vw"
            className="object-contain object-bottom"
          />
        </motion.div>
      </div>
    </div>
  );
}
