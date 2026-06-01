"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";

gsap.registerPlugin(ScrollTrigger);

/* ── Three.js particle mesh canvas ──────────────────────────────────── */
function ParticleMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    let THREE: typeof import("three");

    import("three").then((mod) => {
      THREE = mod;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
      camera.position.z = 4;

      // Floating particles
      const count = 800;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 12;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        size: 0.022,
        color: 0x10b981,
        transparent: true,
        opacity: 0.55,
      });
      const points = new THREE.Points(geo, mat);
      scene.add(points);

      // Wireframe icosahedron
      const icoGeo = new THREE.IcosahedronGeometry(1.4, 1);
      const icoMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        wireframe: true,
        transparent: true,
        opacity: 0.06,
      });
      const ico = new THREE.Mesh(icoGeo, icoMat);
      scene.add(ico);

      // Grid helper
      const grid = new THREE.GridHelper(14, 20, 0x10b981, 0x10b981);
      (grid.material as import("three").Material).transparent = true;
      (grid.material as import("three").Material).opacity = 0.04;
      grid.position.y = -2.5;
      scene.add(grid);

      let mx = 0;
      let my = 0;
      const onMouseMove = (e: MouseEvent) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 0.4;
        my = (e.clientY / window.innerHeight - 0.5) * 0.4;
      };
      window.addEventListener("mousemove", onMouseMove);

      const onResize = () => {
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
        camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);

      let t = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        t += 0.004;

        points.rotation.y = t * 0.06;
        points.rotation.x = t * 0.03;

        ico.rotation.y = t * 0.12;
        ico.rotation.x = t * 0.07;

        camera.position.x += (mx - camera.position.x) * 0.04;
        camera.position.y += (-my - camera.position.y) * 0.04;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
      };
    });

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
}

/* ── DPP annotation cards ────────────────────────────────────────────── */
const annotations = [
  { title: "Structural Steel", id: "DPP-SS-001247", stat: "68% Recycled · EPD ✓", x: "62%", y: "8%", delay: 1.2 },
  { title: "Aluminum Facade", id: "DPP-AF-000581", stat: "75% Recycled · EPD ✓", x: "75%", y: "30%", delay: 1.4 },
  { title: "HVAC System", id: "DPP-HV-000772", stat: "Optimised Energy · EPD ✓", x: "68%", y: "52%", delay: 1.6 },
  { title: "Timber Flooring", id: "DPP-TF-001009", stat: "100% FSC · EPD ✓", x: "72%", y: "70%", delay: 1.8 },
  { title: "Total Carbon", id: "6,712 t CO₂e", stat: "↓ 28% vs Industry Avg", x: "5%", y: "65%", delay: 1.7, accent: true },
];

const trustBadges = [
  { icon: <ShieldCheck className="h-3.5 w-3.5" />, label: "EU ESPR 2024" },
  { icon: <Zap className="h-3.5 w-3.5" />, label: "AI-Powered OCR" },
  { icon: <CheckCircle2 className="h-3.5 w-3.5" />, label: "ISO 14025" },
];

/* ── Main component ─────────────────────────────────────────────────── */
export function ImmersiveHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for 3D parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);
  const bgX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const bgY = useTransform(springY, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = (currentTarget as HTMLElement).getBoundingClientRect();
    mouseX.set((clientX - left) / width - 0.5);
    mouseY.set((clientY - top) / height - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // GSAP entrance + scroll-out
  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const words = contentRef.current.querySelectorAll(".word");
    const tl = gsap.timeline({ delay: 0.3 });

    tl.from(bgRef.current, { opacity: 0, scale: 1.08, duration: 1.6, ease: "power2.out" });
    tl.from(words, {
      opacity: 0, y: 60, skewY: 3, stagger: 0.06, duration: 0.9, ease: "expo.out",
    }, 0.4);
    tl.from(".hero-sub", { opacity: 0, y: 20, duration: 0.7, ease: "power3.out" }, 0.9);
    tl.from(".hero-ctas", { opacity: 0, y: 16, duration: 0.6 }, 1.05);
    tl.from(".trust-badge", { opacity: 0, x: -12, stagger: 0.08, duration: 0.5 }, 1.1);

    // Scroll-driven parallax on the entire section content
    gsap.to(contentRef.current, {
      y: -80,
      opacity: 0.2,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Slight scale up on background image as you scroll
    gsap.to(bgRef.current, {
      scale: 1.12,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  // Word split helper
  const headline = ["Every", "Building", "Product.", "One", "Digital", "Passport."];
  const accentStart = 4; // "Digital Passport." in emerald

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-zinc-950 flex flex-col"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Hero — Floilan Digital Product Passport Platform"
    >
      {/* ── Video / image background with 3D parallax ── */}
      <motion.div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{ x: bgX, y: bgY }}
      >
        {/* Video background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          aria-hidden
          poster="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80&fit=crop"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-buildings-4922-large.mp4"
            type="video/mp4"
          />
          {/* Fallback: show poster */}
        </video>

        {/* Fallback / base image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          aria-hidden
        />

        {/* Gradient overlays for depth and text contrast */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/30 to-zinc-950/90" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-zinc-950/60 via-transparent to-zinc-950/40" />

        {/* Vignette */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(9,9,11,0.7) 100%)" }}
        />
      </motion.div>

      {/* ── Three.js particle canvas ── */}
      <ParticleMesh />

      {/* ── DPP annotation cards (desktop only) ── */}
      <div className="absolute inset-0 z-10 pointer-events-none hidden lg:block" aria-hidden>
        {annotations.map((a) => (
          <motion.div
            key={a.id}
            className={`absolute rounded-xl border shadow-2xl p-3 w-44 backdrop-blur-md ${
              a.accent
                ? "bg-zinc-900/90 border-emerald-500/30"
                : "bg-white/8 border-white/10"
            }`}
            style={{ left: a.x, top: a.y }}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: a.delay, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className={`text-[11px] font-extrabold leading-tight ${a.accent ? "text-white" : "text-white/90"}`}>
              {a.title}
            </div>
            <div className="text-[9px] font-mono text-white/40 mt-0.5">{a.id}</div>
            <div className={`text-[10px] font-bold mt-1.5 ${a.accent ? "text-emerald-400" : "text-emerald-400"}`}>
              {a.stat}
            </div>
            {/* Connector dot */}
            <div className="absolute -right-1.5 top-1/2 h-3 w-3 rounded-full bg-emerald-500 border-2 border-zinc-900 shadow" />
          </motion.div>
        ))}
      </div>

      {/* ── Main content ── */}
      <motion.div
        className="relative z-20 flex flex-col items-start justify-center min-h-screen px-6 md:px-16 lg:px-24 max-w-5xl"
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
      >
        <div ref={contentRef} className="flex flex-col gap-6 md:gap-8">
          {/* Eyebrow */}
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-wide backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              AI-Powered Digital Product Passports
            </span>
          </div>

          {/* Headline — split into words for GSAP */}
          <h1 className="text-[clamp(3rem,6.5vw,6rem)] font-extrabold tracking-tight leading-[0.95] text-white" aria-label="Every Building Product. One Digital Passport.">
            <span className="overflow-hidden inline-block">
              {headline.map((word, i) => (
                <span key={word + i} className="word inline-block mr-[0.25em]">
                  <span className={i >= accentStart ? "text-emerald-400" : "text-white"}>
                    {word}
                  </span>
                </span>
              ))}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="hero-sub text-lg md:text-xl text-white/60 max-w-xl leading-relaxed">
            Centralize product data, automate compliance, and unlock sustainability
            insights across the building lifecycle.
          </p>

          {/* CTAs */}
          <div className="hero-ctas flex flex-col sm:flex-row gap-3">
            <CustomButton
              variant="primary"
              size="lg"
              href="#cta"
              iconRight={<ArrowRight className="h-4 w-4" />}
              className="bg-emerald-500 hover:bg-emerald-400 text-zinc-900 shadow-lg shadow-emerald-500/25 border-transparent"
            >
              Book a Demo
            </CustomButton>
            <CustomButton
              variant="secondary"
              size="lg"
              href="#features"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Explore Platform
            </CustomButton>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2.5">
            {trustBadges.map((b) => (
              <span
                key={b.label}
                className="trust-badge inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-xs font-medium text-white/70"
              >
                <span className="text-emerald-400">{b.icon}</span>
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        aria-hidden
      >
        <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/30">Scroll</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-emerald-400/60 to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
