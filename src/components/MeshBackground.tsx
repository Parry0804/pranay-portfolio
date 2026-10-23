"use client";

import { useEffect, useRef } from "react";

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

// Slow domain-warped noise that blends four palette colours, drifting toward the cursor.
const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_scroll;

vec3 hash3(vec2 p){ vec3 q = vec3(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)), dot(p,vec2(419.2,371.9))); return fract(sin(q)*43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  float a = hash3(i).x, b = hash3(i+vec2(1.0,0.0)).x, c = hash3(i+vec2(0.0,1.0)).x, d = hash3(i+vec2(1.0,1.0)).x;
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}
float fbm(vec2 p){ float v = 0.0; float a = 0.5; for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.02; a *= 0.5; } return v; }

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv * vec2(u_res.x/u_res.y, 1.0) * 1.6;
  float t = u_time * 0.025;
  vec2 m = (u_mouse - 0.5) * 0.35;
  vec2 q = vec2(fbm(p + t + m), fbm(p + vec2(5.2,1.3) - t));
  vec2 r = vec2(fbm(p + 3.0*q + vec2(1.7,9.2) + 0.15*t + u_scroll*0.4), fbm(p + 3.0*q + vec2(8.3,2.8) - 0.12*t));
  float f = fbm(p + 2.5*r);

  vec3 base = vec3(0.043, 0.043, 0.051);   // #0B0B0D
  vec3 violet = vec3(0.102, 0.082, 0.188); // #1A1530
  vec3 ember = vec3(0.165, 0.102, 0.071);  // #2A1A12
  vec3 deep = vec3(0.055, 0.102, 0.165);   // #0E1A2A

  vec3 col = mix(base, violet, smoothstep(0.2, 0.9, f));
  col = mix(col, deep, smoothstep(0.3, 1.0, length(q)) * 0.8);
  col = mix(col, ember, smoothstep(0.55, 1.0, r.x) * (0.6 + 0.4*sin(u_scroll*2.0)));
  // Vignette keeps edges dark so text stays readable.
  float v = smoothstep(1.25, 0.25, length(uv - vec2(0.5 + m.x*0.3, 0.55 - m.y*0.3)));
  col = mix(base, col, 0.35 + 0.65*v);
  gl_FragColor = vec4(col, 1.0);
}`;

export function MeshBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
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

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uScroll = gl.getUniformLocation(prog, "u_scroll");

    // Render at reduced resolution: the image is soft anyway and it keeps the GPU cool.
    const scale = 0.35;
    const resize = () => {
      canvas.width = Math.max(1, Math.floor(window.innerWidth * scale));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const target = { x: 0.5, y: 0.5 };
    const mouse = { x: 0.5, y: 0.5 };
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX / window.innerWidth;
      target.y = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove);

    const still =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.classList.contains("motion-off");
    let raf = 0;
    const start = performance.now();
    const frame = () => {
      mouse.x += (target.x - mouse.x) * 0.03;
      mouse.y += (target.y - mouse.y) * 0.03;
      const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
      gl.uniform1f(uTime, still ? 12 : (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uScroll, window.scrollY / max);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!still) raf = requestAnimationFrame(frame);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_at_60%_40%,#1a1530_0%,#0b0b0d_60%)]"
    />
  );
}
