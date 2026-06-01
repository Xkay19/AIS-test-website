import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  maxWidth?: string;
  className?: string;
  id?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  maxWidth = "max-w-3xl",
  className,
  id,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 md:gap-4 mb-12 md:mb-16",
        align === "center" ? "items-center text-center mx-auto" : "items-start text-left",
        maxWidth,
        className
      )}
    >
      {eyebrow && (
        <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 px-3 py-1 rounded-full w-fit">
          {eyebrow}
        </span>
      )}
      <h2 id={id} className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-base md:text-lg lg:text-xl text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
