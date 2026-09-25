// Footer
//
// Static, server-rendered. Renders null when there is no company name,
// since a footer with nothing to say is not a smaller footer, it is a
// broken one. Every string is a prop; nothing here is a client fact.

import Link from "next/link";

export interface FooterNavLink {
  href: string;
  label: string;
}

export interface FooterProps {
  companyName?: string;
  address?: string;
  phone?: string;
  phoneHref?: string;
  email?: string;
  navLinks?: FooterNavLink[];
  /** A short legal line, e.g. the registered business name. Free text, from the client. */
  legalLine?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function Footer({
  companyName,
  address,
  phone,
  phoneHref,
  email,
  navLinks = [],
  legalLine,
  ctaLabel,
  ctaHref,
}: FooterProps) {
  if (!companyName) {
    return null;
  }

  return (
    <footer className="on-dark">
      <div className="shell flex flex-col gap-12 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="flex flex-col gap-3 md:col-span-6">
            <span className="font-heading text-lg font-semibold uppercase tracking-tight">
              {companyName}
            </span>
            {address ? <p style={{ color: "rgba(255,255,255,0.72)" }}>{address}</p> : null}
            <div className="flex flex-col gap-1" style={{ color: "rgba(255,255,255,0.72)" }}>
              {phone ? (
                <span>
                  Phone: <a href={phoneHref ?? `tel:${phone}`}>{phone}</a>
                </span>
              ) : null}
              {email ? (
                <span>
                  Email: <a href={`mailto:${email}`}>{email}</a>
                </span>
              ) : null}
            </div>
            {ctaLabel && ctaHref ? (
              <div className="mt-4" data-footer-cta="">
                <a href={ctaHref} className="btn btn-on-dark btn-sweep" data-cta="quote">
                  <span>{ctaLabel}</span>
                  <span className="btn-arrow" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
                  </span>
                </a>
              </div>
            ) : null}
          </div>

          {navLinks.length > 0 ? (
            <div className="flex md:col-span-6 md:justify-end">
              <ul className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm" style={{ color: "rgba(255,255,255,0.72)" }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {legalLine ? (
          <div className="pt-8 text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.16)", color: "rgba(255,255,255,0.5)" }}>
            {legalLine}
          </div>
        ) : null}
      </div>
    </footer>
  );
}
