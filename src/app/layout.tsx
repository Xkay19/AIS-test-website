import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "floilan — Digital Product Passports for Regulated Industries",
    template: "%s | floilan",
  },
  description:
    "AI-powered Digital Product Passports. Centralise compliance, audits, and lifecycle records across construction, batteries, tyres, furniture, and fashion.",
  keywords: ["digital product passport", "DPP", "EU compliance", "supply chain", "sustainability"],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://floilan.com",
    siteName: "floilan",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-white text-neutral-900`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
