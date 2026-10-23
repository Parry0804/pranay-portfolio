"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Wireframe sphere with an orbiting particle ring. Rotates slowly, tilts toward the pointer,
// and the particles scatter and settle back when clicked.
export function HeroOrb({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const group = new THREE.Group();
    scene.add(group);

    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.6, 3)),
      new THREE.LineBasicMaterial({ color: 0x9a9aa3, transparent: true, opacity: 0.22 }),
    );
    group.add(wire);

    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.15, 1),
      new THREE.MeshBasicMaterial({ color: 0xff7a45, wireframe: true, transparent: true, opacity: 0.18 }),
    );
    group.add(inner);

    // Vertex points on the shell
    const shell = new THREE.Points(
      new THREE.IcosahedronGeometry(1.6, 3),
      new THREE.PointsMaterial({ color: 0xf2f0eb, size: 0.025, transparent: true, opacity: 0.7 }),
    );
    group.add(shell);

    // Orbit ring of particles
    const COUNT = 900;
    const home = new Float32Array(COUNT * 3);
    const pos = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 2.25 + (Math.random() - 0.5) * 0.5;
      home[i * 3] = Math.cos(a) * r;
      home[i * 3 + 1] = (Math.random() - 0.5) * 0.12;
      home[i * 3 + 2] = Math.sin(a) * r;
    }
    pos.set(home);
    const ringGeo = new THREE.BufferGeometry();
    ringGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const ring = new THREE.Points(
      ringGeo,
      new THREE.PointsMaterial({ color: 0x7c8cff, size: 0.018, transparent: true, opacity: 0.8 }),
    );
    ring.rotation.x = 1.2;
    ring.rotation.z = 0.25;
    group.add(ring);

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      renderer.setSize(width, height, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = width / Math.max(1, height);
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const tilt = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      target.y = (e.clientX / window.innerWidth - 0.5) * 0.42; // ~12 degrees
      target.x = (e.clientY / window.innerHeight - 0.5) * 0.42;
    };
    const onClick = () => {
      for (let i = 0; i < COUNT * 3; i++) vel[i] += (Math.random() - 0.5) * 0.12;
    };
    window.addEventListener("pointermove", onMove);
    host.addEventListener("click", onClick);

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(host);

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      tilt.x += (target.x - tilt.x) * 0.05;
      tilt.y += (target.y - tilt.y) * 0.05;
      if (!still) {
        group.rotation.y += 0.0012;
        inner.rotation.x -= 0.002;
        ring.rotation.y += 0.0016;
      }
      group.rotation.x = tilt.x;
      group.position.x = tilt.y * 0.4;
      wire.rotation.y = tilt.y * 0.6;
      for (let i = 0; i < COUNT * 3; i++) {
        vel[i] += (home[i] - pos[i]) * 0.02;
        vel[i] *= 0.9;
        pos[i] += vel[i];
      }
      ringGeo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      host.removeEventListener("click", onClick);
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} aria-hidden data-cursor="Click" className={className} />;
}
