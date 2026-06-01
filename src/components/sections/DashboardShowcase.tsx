"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { CheckCircle, Zap, RefreshCw } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { MiniPassport } from "@/components/ui/mini-passport";
import { PdfConverterSimulator } from "@/components/ui/pdf-converter-simulator";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&fit=crop",
    alt: "Modern glass skyscrapers with DPP data overlays",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80&fit=crop",
    alt: "Urban cityscape with smart building infrastructure",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80&fit=crop",
    alt: "Architectural detail of a sustainable building facade",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&fit=crop",
    alt: "Open-plan smart office environment with connected systems",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&fit=crop",
    alt: "Construction site with digital product passport scanning",
    span: "",
  },
];

const modules = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "EPD Factory: From PDF to DPP in 5 Minutes",
    description:
      "ESPR 2024 requires a Digital Product Passport — not a static PDF. Floilan bridges the gap by automatically extracting your existing EPD data and publishing it as a regulator-ready, scannable passport.",
    bullets: [
      "Supports ISO 14025 / EN 15804 standards",
      "Auto-classification of A1–A5 carbon stages",
      "Structured JSON output via EPD REST API",
    ],
    component: <PdfConverterSimulator />,
    orientation: "right" as const,
  },
  {
    icon: <RefreshCw className="h-5 w-5" />,
    title: "Explore a Live Digital Product Passport",
    description:
      "Click through the tabs to experience what regulators, auditors, and consumers see when they scan a Floilan QR code — real data, real compliance, in real time.",
    bullets: [
      "General metadata and blockchain verification",
      "Embodied carbon breakdown by lifecycle stage",
      "ESPR 2024 live compliance checklist",
    ],
    component: <MiniPassport />,
    orientation: "left" as const,
  },
];

function DashboardModule({
  module,
  index,
}: {
  module: (typeof modules)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isRight = module.orientation === "right";

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
    >
      {/* Content */}
      <motion.div
        className={`flex flex-col gap-5 ${isRight ? "lg:order-1" : "lg:order-2"}`}
        initial={{ opacity: 0, x: isRight ? -24 : 24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
          {module.icon}
        </div>
        <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 leading-tight">
          {module.title}
        </h3>
        <p className="text-zinc-500 leading-relaxed">{module.description}</p>
        <ul className="flex flex-col gap-2.5">
          {module.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm font-medium text-zinc-600">
              <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              {b}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Component */}
      <motion.div
        className={isRight ? "lg:order-2" : "lg:order-1"}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.15, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        {module.component}
      </motion.div>
    </div>
  );
}

function ArchitectureGallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="mt-24">
      <SectionHeader
        eyebrow="Built Environment"
        title="From Skyscrapers to Smart Cities"
        description="Floilan connects every building product to its digital twin — spanning commercial towers, infrastructure, and construction sites worldwide."
        align="center"
        maxWidth="max-w-2xl"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {galleryImages.map((img, i) => (
          <motion.div
            key={img.src}
            className={`relative overflow-hidden rounded-2xl ${img.span} ${i === 0 ? "aspect-square" : "aspect-[4/3]"}`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.08, duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function DashboardShowcase() {
  return (
    <section
      id="platform"
      className="py-24 md:py-32 bg-white border-t border-zinc-100"
      aria-labelledby="showcase-heading"
    >
      <div className="container max-w-7xl mx-auto px-6 lg:px-12">
        {/* Container scroll showcase */}
        <SectionHeader
          id="showcase-heading"
          eyebrow="Platform Showcase"
          title="Compliance, Sustainability, and Asset Intelligence in One Platform"
          description="Scroll down to see the Floilan dashboard in action — turning complex environmental product declarations into beautiful, interactive, and compliant passports."
          align="center"
          maxWidth="max-w-3xl"
        />

        <ContainerScroll
          titleComponent={
            <div className="mb-6 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2">
                The Floilan Dashboard Experience
              </h3>
              <p className="text-zinc-500 max-w-xl mx-auto text-sm md:text-base">
                Real-time analytics, compliance checklists, and carbon tracking for
                developers, construction teams, and manufacturers.
              </p>
            </div>
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=85&fit=crop"
            alt="Floilan compliance and carbon analytics dashboard showing DPP metrics, ESPR scores, and lifecycle data"
            className="mx-auto rounded-2xl object-cover h-full w-full"
            draggable={false}
          />
        </ContainerScroll>

        {/* Alternating modules */}
        <div className="flex flex-col gap-24 md:gap-32 mt-8">
          {modules.map((mod, i) => (
            <DashboardModule key={mod.title} module={mod} index={i} />
          ))}
        </div>

        {/* Architecture gallery */}
        <ArchitectureGallery />
      </div>
    </section>
  );
}
