"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

const VERT = `#version 300 es
in vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

// Topographic contour lines that flow around the portrait's silhouette.
// The cursor sends ripples through the field; a click sends out one ring.
const FRAG = `#version 300 es
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_energy;
uniform vec4 u_rect;   // portrait rect in canvas pixels, origin bottom-left
uniform vec3 u_pulse;  // xy position, z start time
uniform sampler2D u_halo;
out vec4 o;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p){ float v = 0.0; float a = 0.5; for(int i=0;i<4;i++){ v += a*noise(p); p *= 2.03; a *= 0.5; } return v; }

void main(){
  vec2 px = gl_FragCoord.xy;
  vec2 puv = (px - u_rect.xy) / u_rect.zw;
  puv.y = 1.0 - puv.y;
  float halo = texture(u_halo, clamp(puv, 0.0, 1.0)).a;
  halo *= step(0.0, puv.x) * step(puv.x, 1.0) * step(0.0, puv.y) * step(puv.y, 1.0);

  float s = u_res.y;
  vec2 uv = px / s;
  float d = length(uv - u_mouse / s);
  float ripple = sin(d * 42.0 - u_time * 3.2) * exp(-d * 5.5) * u_energy;
  float pd = length(uv - u_pulse.xy / s);
  float age = u_time - u_pulse.z;
  float ring = exp(-pow((pd - age * 0.55) * 12.0, 2.0)) * exp(-age * 1.4) * step(0.0, age);

  float t = u_time * 0.04;
  float f = fbm(uv * 2.0 + vec2(t, -t * 0.6)) + halo * 0.32 + ripple * 0.05 + ring * 0.08;
  float bands = f * 16.0;
  float dist = min(fract(bands), 1.0 - fract(bands));
  float line = 1.0 - smoothstep(0.0, fwidth(bands) * 1.4, dist);

  vec3 violet = vec3(0.49, 0.55, 1.0);
  vec3 ember = vec3(1.0, 0.48, 0.27);
  float warm = clamp(halo * 1.1 + ring * 1.5 + ripple * 0.6, 0.0, 1.0);
  vec3 col = mix(violet, ember, smoothstep(0.15, 0.9, warm));
  float strength = 0.07 + 0.26 * smoothstep(0.0, 0.8, halo) + 0.35 * ring + 0.25 * abs(ripple);

  vec2 c = px / u_res;
  float edge = smoothstep(0.0, 0.18, c.x) * smoothstep(1.0, 0.82, c.x) * smoothstep(0.0, 0.12, c.y) * smoothstep(1.0, 0.85, c.y);
  float glow = halo * 0.1;
  float a = clamp(line * strength + glow, 0.0, 1.0) * edge;
  vec3 rgb = mix(col, ember, glow / max(a, 0.001) * 0.5);
  o = vec4(rgb * a, a);
}`;

const SRC = "/about/pranay-cutout.webp";

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
    if (!gl) return;

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
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u("u_res"), uTime = u("u_time"), uMouse = u("u_mouse"), uEnergy = u("u_energy");
    const uRect = u("u_rect"), uPulse = u("u_pulse");
    gl.uniform3f(uPulse, -9999, -9999, -99);

    // Blurred silhouette: shrink the cutout to a few pixels and scale it back up.
    const tex = gl.createTexture();
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
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, big);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      ready = true;
    };

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let H = 1;
    const layout = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
      H = canvas.height;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      const f = fig.getBoundingClientRect();
      gl.uniform4f(uRect, (f.left - r.left) * dpr, (r.bottom - f.bottom) * dpr, f.width * dpr, f.height * dpr);
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
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      fig.style.transform = `translate3d(${nx * -14}px, ${ny * -8}px, 0)`;
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
        energy = Math.max(energy, 0.35);
      }
      mouse.x += (target.x - mouse.x) * 0.06;
      mouse.y += (target.y - mouse.y) * 0.06;
      energy *= 0.985;
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
    <div ref={host} className={className}>
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
      <div
        ref={figure}
        className="absolute bottom-0 right-[6%] aspect-[866/1400] h-[80%] transition-transform duration-700 ease-[var(--ease-expressive)] [mask-image:linear-gradient(to_bottom,#000_70%,transparent)] md:right-[14%] md:h-[86%] md:[mask-image:linear-gradient(to_bottom,#000_88%,transparent)]"
      >
        <motion.div
          className="relative h-full w-full"
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={SRC}
            alt="Pranay Pawar sitting on a stone wall in Udaipur"
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
