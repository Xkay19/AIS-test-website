"use client";
import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function Showcase() {
  return (
    <div id="platform" className="flex flex-col overflow-hidden bg-[#FDFDFD]">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center gap-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-[10px] font-bold tracking-[0.2em] uppercase">
              Compliance Dashboard
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              One Dashboard.{" "}
              <span className="text-emerald-600">Full Visibility.</span>
            </h2>
            <p className="text-zinc-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-medium">
              Track every Digital Product Passport, ESPR compliance score, carbon footprint,
              and material passport — in real time, from a single unified interface.
            </p>
          </div>
        }
      >
        <Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&fit=crop"
          alt="Floilan compliance dashboard"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
