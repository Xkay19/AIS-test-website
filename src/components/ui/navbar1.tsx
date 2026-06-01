"use client";

import React from "react";
import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

export interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  mobileExtraLinks?: {
    name: string;
    url: string;
  }[];
  auth?: {
    login: {
      text: string;
      url: string;
    };
    signup: {
      text: string;
      url: string;
    };
  };
}

export const Navbar1 = ({
  logo = {
    url: "#",
    src: "https://www.shadcnblocks.com/images/block/block-1.svg",
    alt: "logo",
    title: "Floilan",
  },
  menu = [
    { title: "Home", url: "#" },
    {
      title: "Products",
      url: "#",
      items: [
        {
          title: "EPD Factory",
          description: "Upload any ISO 14025 EPD PDF and get a live DPP in under 5 minutes.",
          icon: <Book className="size-5 shrink-0" />,
          url: "#epd-factory",
        },
        {
          title: "EPD Extraction API",
          description: "REST API that parses EPD PDFs into structured JSON.",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#api",
        },
        {
          title: "QR & NFC Passports",
          description: "Generate scannable product passports instantly.",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#passports",
        },
        {
          title: "Carbon Analytics",
          description: "Automated lifecycle carbon calculations at every production stage.",
          icon: <Zap className="size-5 shrink-0" />,
          url: "#carbon",
        },
      ],
    },
    {
      title: "Industries",
      url: "#",
      items: [
        {
          title: "Construction",
          description: "Embodied carbon, material declarations, and end-of-life data.",
          icon: <Zap className="size-5 shrink-0" />,
          url: "#construction",
        },
        {
          title: "Batteries",
          description: "State of health, carbon footprint, and supply chain due diligence.",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#batteries",
        },
        {
          title: "Furniture & Textiles",
          description: "Material composition, repairability scores, and disassembly.",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#furniture",
        },
      ],
    },
    {
      title: "Pricing",
      url: "#pricing",
    },
  ],
  mobileExtraLinks = [
    { name: "Press", url: "#" },
    { name: "Contact", url: "#" },
    { name: "Imprint", url: "#" },
    { name: "Sitemap", url: "#" },
  ],
  auth = {
    login: { text: "Log in", url: "#" },
    signup: { text: "Book a Demo", url: "#cta" },
  },
}: Navbar1Props) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <a href={logo.url} className="flex items-center gap-2">
            <svg className="h-6 w-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
              {logo.title}
            </span>
          </a>
          <nav className="hidden justify-between lg:flex">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-1">
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="font-medium">
            <a href={auth.login.url}>{auth.login.text}</a>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 font-medium rounded-full px-5"
          >
            <a href={auth.signup.url}>{auth.signup.text}</a>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <div className="block lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-md border-zinc-200">
                <Menu className="size-4 text-zinc-600" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-[300px] sm:max-w-[400px] overflow-y-auto">
              <SheetHeader className="text-left pb-4 border-b">
                <SheetTitle>
                  <a href={logo.url} className="flex items-center gap-2">
                    <svg className="h-6 w-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <span className="text-lg font-bold tracking-tight">{logo.title}</span>
                  </a>
                </SheetTitle>
              </SheetHeader>
              <div className="my-6 flex flex-col gap-6">
                <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
                  {menu.map((item) => renderMobileMenuItem(item))}
                </Accordion>
                <div className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-2">
                    {mobileExtraLinks.map((link, idx) => (
                      <a
                        key={idx}
                        className="inline-flex h-9 items-center rounded-md px-3 text-sm font-medium text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
                        href={link.url}
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Button asChild variant="outline" className="w-full rounded-full">
                    <a href={auth.login.url}>{auth.login.text}</a>
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 rounded-full"
                  >
                    <a href={auth.signup.url}>{auth.signup.text}</a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title} className="text-zinc-600 dark:text-zinc-300">
        <NavigationMenuTrigger className="bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/50 font-medium text-sm transition-colors rounded-full px-4 py-2">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <NavigationMenuLink asChild>
                  <a
                    className="flex select-none gap-3 rounded-xl p-3 leading-none no-underline outline-none transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    href={subItem.url}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
                      {subItem.icon}
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-semibold text-zinc-900 dark:text-white leading-none">
                        {subItem.title}
                      </div>
                      {subItem.description && (
                        <p className="line-clamp-2 text-xs leading-snug text-zinc-500 dark:text-zinc-400">
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  </a>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title} className="list-none">
      <NavigationMenuLink asChild>
        <a
          className="group inline-flex h-9 w-max items-center justify-center rounded-full bg-transparent px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white"
          href={item.url}
        >
          {item.title}
        </a>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="py-2 font-semibold text-zinc-800 hover:no-underline text-sm">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2 pl-2 border-l border-zinc-100 flex flex-col gap-1">
          {item.items.map((subItem) => (
            <a
              key={subItem.title}
              className="flex select-none gap-3 rounded-lg p-2 leading-none outline-none transition-colors hover:bg-zinc-50"
              href={subItem.url}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                {subItem.icon}
              </div>
              <div>
                <div className="text-xs font-semibold text-zinc-900">{subItem.title}</div>
                {subItem.description && (
                  <p className="line-clamp-1 text-[10px] text-zinc-500 mt-0.5">
                    {subItem.description}
                  </p>
                )}
              </div>
            </a>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="font-semibold text-zinc-800 text-sm py-2 block">
      {item.title}
    </a>
  );
};
