"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

const nav = [
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "Digital Product Passports", href: "/solutions/dpp" },
      { label: "EPD Factory",               href: "/solutions/epd" },
      { label: "EPD → DPP Pipeline",        href: "/solutions/epd-to-dpp" },
      { label: "EPD Data Extraction API",   href: "/solutions/epd-api" },
      { label: "BIM Integration",           href: "/solutions/bim" },
      { label: "Carbon Analytics",          href: "/solutions/carbon" },
      { label: "AI Compliance Assistant",   href: "/solutions/ai-assistant" },
      { label: "Document Management",       href: "/solutions/docs" },
      { label: "API & Integrations",        href: "/solutions/api" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      { label: "Construction",  href: "/industries/construction" },
      { label: "Batteries",     href: "/industries/batteries" },
      { label: "Tyres",         href: "/industries/tyres" },
      { label: "Furniture",     href: "/industries/furniture" },
      { label: "Fashion",       href: "/industries/fashion" },
    ],
  },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Pricing",      href: "/pricing" },
  { label: "Company",      href: "/about" },
];

export function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur shadow-sm border-b border-neutral-100" : "bg-transparent"
      }`}
    >
      <nav className="container-wide flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="font-semibold text-xl text-neutral-900">
          floilan
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {nav.map((item) => (
            <li key={item.label} className="relative">
              <button
                onMouseEnter={() => item.children && setActive(item.label)}
                onMouseLeave={() => setActive(null)}
                className="flex items-center gap-1 px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 rounded-md hover:bg-neutral-50 transition-colors"
              >
                <Link href={item.href}>{item.label}</Link>
                {item.children && <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {item.children && active === item.label && (
                <div
                  onMouseEnter={() => setActive(item.label)}
                  onMouseLeave={() => setActive(null)}
                  className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-neutral-100 py-2 animate-fade-in"
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/login" className="text-sm text-neutral-600 hover:text-neutral-900 px-3 py-2">
            Sign in
          </Link>
          <Button href="/contact" size="sm">Speak to an Expert</Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-md text-neutral-600"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-neutral-100 px-4 pb-6 space-y-1 animate-slide-up">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block py-3 text-sm text-neutral-700 border-b border-neutral-50"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4">
            <Button href="/contact" className="w-full justify-center">Speak to an Expert</Button>
          </div>
        </div>
      )}
    </header>
  );
}
