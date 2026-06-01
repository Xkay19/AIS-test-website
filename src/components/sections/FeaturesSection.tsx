"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { FileText, ShieldCheck, TrendingUp, Database, Cpu, Building } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { CustomCard } from "@/components/ui/custom-card";

const features = [
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Digital Product Passports",
    description: "QR-linked, always-live passports accessible to anyone you authorize. Bridges static PDFs and dynamic data models.",
    items: ["Specifications", "Manuals", "Warranties", "Installation records"],
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Compliance Management",
    description: "Continuous automated checks against EU ESPR, Battery Regulation, and building standards. Alerts before audit failures.",
    items: ["Certifications", "Regulatory tracking", "Audit trails", "Documentation"],
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Sustainability Intelligence",
    description: "Automated lifecycle carbon calculations at every stage. Export-ready carbon reports without external consultants.",
    items: ["Carbon footprint", "Material composition", "Circularity metrics", "ESG reporting"],
  },
  {
    icon: <Database className="h-5 w-5" />,
    title: "Building Asset Registry",
    description: "A structured registry of all products inside your assets. Track ownership, modifications, and circular potential.",
    items: ["Asset records", "Lifecycle tracking", "Maintenance history", "Ownership data"],
  },
  {
    icon: <Cpu className="h-5 w-5" />,
    title: "Manufacturer Portal",
    description: "Streamlined product uploads, compliance workflows, and automated passport generation for partners at scale.",
    items: ["Product uploads", "Digital twins", "Compliance workflows", "Passport generation"],
  },
  {
    icon: <Building className="h-5 w-5" />,
    title: "Building Owner Dashboard",
    description: "Complete visibility into the compliance, sustainability, and risk profile of your entire real estate portfolio.",
    items: ["Asset visibility", "Risk monitoring", "Compliance oversight", "Portfolio management"],
  },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="features"
      ref={ref}
      className="py-24 md:py-32 bg-zinc-50/60 border-t border-zinc-100 relative"
      aria-labelledby="features-heading"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right,#8080800a 1px,transparent 1px),linear-gradient(to bottom,#8080800a 1px,transparent 1px)",
          backgroundSize: "14px 24px",
        }}
      />

      <div className="container max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <SectionHeader
          id="features-heading"
          eyebrow="Capabilities"
          title="Everything Needed to Manage Building Product Data"
          description="Our platform streamlines the creation, enrichment, and publishing of compliant Digital Product Passports at scale."
          align="center"
          maxWidth="max-w-3xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
            >
              <CustomCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                items={feature.items}
                variant="default"
                className="h-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
