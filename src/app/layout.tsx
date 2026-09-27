import type { Metadata } from "next";
import { display, body } from "./fonts";
import "./globals.css";
import "./brand.css";
import { Header } from "@/components/sections";
import { Footer } from "@/components/sections";
import { facts } from "@/lib/facts";
import { StickyCallBar } from "@/components/sections";

export const metadata: Metadata = {
  title: "Pure Home 365 | Asheville Water Treatment - Free Water Test",
  description:
    "Custom water filtration, softeners, and well water treatment for Asheville, NC and 80 miles around. Better Business Bureau A rated. Free water test. $0 down financing available.",
};

const navLinks = [
  { href: "/service-areas", label: "Service Areas" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

const serviceLinks = facts.services.map((s) => ({
  href: `/services/${s.slug}`,
  label: s.name,
}));

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        {/* Announcement bar: free water test offer with urgency */}
        <div
          style={{
            backgroundColor: "var(--color-surface-deep)",
            color: "#ffffff",
            textAlign: "center",
            padding: "10px 20px",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0.01em",
          }}
        >
          Limited slots: Free water test in your home. No obligation.{" "}
          <a
            href="/contact"
            style={{ color: "#ffffff", textDecoration: "underline", textUnderlineOffset: "2px" }}
          >
            Schedule yours today
          </a>
        </div>
        <Header
          companyName={facts.dba}
          logoSrc={facts.logoPath}
          logoAlt={`${facts.dba} logo`}
          phone={facts.phone}
          phoneHref={facts.phoneHref}
          navLinks={navLinks}
          servicesLabel="Services"
          servicesLinks={serviceLinks}
          ctaLabel="Get Free Water Test"
          ctaHref="/contact"
        />
        {children}
        <Footer
          companyName={`${facts.companyName} dba ${facts.dba}`}
          phone={facts.phone}
          phoneHref={facts.phoneHref}
          email={facts.email}
          navLinks={footerLinks}
          legalLine="Better Business Bureau A Rating | Serving Asheville, NC and 80 miles"
          ctaLabel="Get Your Free Water Test"
          ctaHref="/contact"
        />
        <StickyCallBar
          phone={facts.phone}
          quoteHref="/contact"
          quoteLabel="Get Free Test"
        />
      </body>
    </html>
  );
}
