import React from "react";
import { cn } from "@/lib/utils";

interface CustomCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon?: React.ReactNode;
  variant?: "default" | "premium" | "glass";
  items?: string[];
}

export function CustomCard({
  title,
  description,
  icon,
  variant = "default",
  items,
  className,
  ...props
}: CustomCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-3xl border p-6 md:p-8 transition-all duration-300 will-change-transform",
        "motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-xl",
        variant === "default" &&
          "bg-white dark:bg-zinc-900 border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700",
        variant === "premium" &&
          "bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/20 shadow-md",
        variant === "glass" &&
          "bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border-white/20 dark:border-zinc-800 shadow-lg",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-4">
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/30">
            {icon}
          </div>
        )}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {title}
          </h3>
          <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {items && items.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2 border-t border-zinc-100 dark:border-zinc-800/60 pt-6">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="text-xs font-medium text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/40 px-3 py-1.5 rounded-full border border-zinc-200/50 dark:border-zinc-800/30"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
