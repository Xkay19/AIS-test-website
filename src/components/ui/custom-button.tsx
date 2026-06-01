import React from "react";
import { cn } from "@/lib/utils";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export function CustomButton({
  children,
  variant = "primary",
  size = "md",
  href,
  iconLeft,
  iconRight,
  className,
  ...props
}: CustomButtonProps) {
  const baseClasses = cn(
    "inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
    "w-full sm:w-auto"
  );

  const variantClasses = {
    primary:
      "bg-zinc-900 text-white hover:bg-zinc-800 shadow-md hover:shadow-lg dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 border border-transparent",
    secondary:
      "bg-transparent text-zinc-900 border border-zinc-200 hover:bg-zinc-50 dark:text-white dark:border-zinc-800 dark:hover:bg-zinc-900/50",
    ghost:
      "bg-transparent text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900/30",
  };

  const sizeClasses = {
    sm: "h-9 rounded-full px-4 text-xs gap-1.5",
    md: "h-11 rounded-full px-6 text-sm gap-2",
    lg: "h-13 rounded-full px-8 text-base gap-2.5",
  };

  const content = (
    <>
      {iconLeft && <span className="shrink-0">{iconLeft}</span>}
      {children}
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {content}
    </button>
  );
}
