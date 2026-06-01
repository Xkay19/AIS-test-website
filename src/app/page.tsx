"use client";

import React from "react";
import { Navbar1 } from "@/components/ui/navbar1";
import { HeroWithLiftOverlay } from "@/components/sections/HeroWithLiftOverlay";
import { MaterialPassportSection } from "@/components/sections/MaterialPassportSection";
import { DashboardSection } from "@/components/sections/DashboardSection";
import { BuildingDPPSection } from "@/components/sections/BuildingDPPSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans overflow-x-hidden selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar1 />

      <main>
        {/* ── Scene 1: HeroScrub unchanged + lift compliance overlays fill empty green space ── */}
        <HeroWithLiftOverlay />

        {/* ── Scene 2: Digital Material Passport — construction scene + full DMP card ── */}
        <MaterialPassportSection />

        {/* ── Scene 3: Dashboard Showcase — ContainerScroll 3D tilt ── */}
        <DashboardSection />

        {/* ── Scene 4: One Central Park — building with DPP annotation overlays ── */}
        <BuildingDPPSection />

        {/* ── Supporting sections ── */}
        <FeaturesSection />
        <StatsSection />
        <CTASection />
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-zinc-100 bg-zinc-50 py-12 md:py-16" role="contentinfo">
        <div className="container max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 mb-12">
            <div className="col-span-2 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-lg font-black tracking-tight text-zinc-900">Floilan</span>
              </div>
              <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
                The leading enterprise Digital Product Passport platform for building owners, developers, and manufacturers.
              </p>
            </div>
            {[
              { title: "Product", links: ["EPD Factory", "Compliance Engine", "Carbon Analytics", "API & Integrations"] },
              { title: "Industries", links: ["Construction", "Batteries & EV", "Furniture", "Textiles"] },
              { title: "Company", links: ["About Us", "Careers", "Press Kit", "Contact"] },
            ].map((col) => (
              <nav key={col.title} aria-label={`${col.title} links`}>
                <h3 className="font-semibold text-zinc-900 text-sm mb-4">{col.title}</h3>
                <ul className="flex flex-col gap-2.5 text-sm">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-zinc-500 hover:text-zinc-900 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
          <div className="border-t border-zinc-200/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-zinc-400">&copy; {new Date().getFullYear()} Floilan Technologies Ltd. All rights reserved.</p>
            <nav aria-label="Legal links" className="flex gap-6 text-xs text-zinc-400">
              {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((item) => (
                <a key={item} href="#" className="hover:text-zinc-900 transition-colors">{item}</a>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
