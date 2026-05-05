import Link from "next/link";

const links = {
  Solutions: [
    { label: "Digital Product Passports", href: "/solutions/dpp" },
    { label: "EPD Factory",               href: "/solutions/epd" },
    { label: "EPD → DPP Pipeline",        href: "/solutions/epd-to-dpp" },
    { label: "EPD Data Extraction API",   href: "/solutions/epd-api" },
    { label: "BIM Integration",           href: "/solutions/bim" },
    { label: "Carbon Analytics",          href: "/solutions/carbon" },
    { label: "AI Assistant",              href: "/solutions/ai-assistant" },
    { label: "Document Management",       href: "/solutions/docs" },
    { label: "API & Integrations",        href: "/solutions/api" },
  ],
  Industries: [
    { label: "Construction", href: "/industries/construction" },
    { label: "Batteries",    href: "/industries/batteries" },
    { label: "Tyres",        href: "/industries/tyres" },
    { label: "Furniture",    href: "/industries/furniture" },
    { label: "Fashion",      href: "/industries/fashion" },
  ],
  Company: [
    { label: "About",       href: "/about" },
    { label: "Blog",        href: "/blog" },
    { label: "Case Studies",href: "/case-studies" },
    { label: "Careers",     href: "/careers" },
    { label: "Contact",     href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy",  href: "/privacy" },
    { label: "Terms of Service",href: "/terms" },
    { label: "Cookie Policy",   href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400">
      <div className="container-wide py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-white font-semibold text-lg">
              floilan
            </Link>
            <p className="mt-3 text-sm leading-relaxed">
              AI-powered Digital Product Passports for regulated industries across the EU.
            </p>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-white text-sm font-medium mb-4">{group}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} floilan Ltd. All rights reserved.</p>
          <p>Registered in England &amp; Wales</p>
        </div>
      </div>
    </footer>
  );
}
