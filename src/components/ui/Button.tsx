import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  "inline-flex items-center justify-center font-medium rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:     "bg-brand-600 text-white hover:bg-brand-700 shadow-sm hover:shadow-md",
        outline:     "border border-neutral-300 text-neutral-700 hover:border-brand-500 hover:text-brand-600 bg-white",
        ghost:       "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900",
        secondary:   "bg-white text-brand-700 hover:bg-brand-50 shadow-sm",
        "ghost-white":"text-white/80 hover:text-white hover:bg-white/10",
      },
      size: {
        sm:  "text-sm px-4 py-2",
        md:  "text-sm px-5 py-2.5",
        lg:  "text-base px-7 py-3.5",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

type ButtonProps = VariantProps<typeof button> & {
  href?:      string;
  className?: string;
  children:   React.ReactNode;
  onClick?:   () => void;
  type?:      "button" | "submit" | "reset";
};

export function Button({ href, className, children, variant, size, onClick, type = "button" }: ButtonProps) {
  const classes = cn(button({ variant, size }), className);

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>;
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
