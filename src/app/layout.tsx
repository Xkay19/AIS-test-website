import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Floilan — AI-Powered Digital Product Passport Platform",
  description:
    "Automate EU ESPR 2024 compliance. Transform static EPDs into scannable, regulator-ready Digital Product Passports.",
  metadataBase: new URL("https://floilan.com"),
  openGraph: {
    title: "Floilan — AI-Powered Digital Product Passport Platform",
    description:
      "Automate EU ESPR 2024 compliance. Transform static EPDs into scannable, regulator-ready Digital Product Passports.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const analyticsEndpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;
  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_WEBSITE_ID;

  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Explicit preconnects mirror the original Vite index.html */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col">
        {children}

        {/* Umami analytics — only injected when env vars are present */}
        {analyticsEndpoint && analyticsId && (
          <Script
            defer
            src={`${analyticsEndpoint}/umami`}
            data-website-id={analyticsId}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
