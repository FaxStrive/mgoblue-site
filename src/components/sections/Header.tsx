"use client";

// Header
//
// Sticky site header with an animated mobile menu and an animated Services
// dropdown. Renders null when there is no company name to show: a header
// with nothing to say for itself is not a smaller header, it is a bug.
//
// Every string and every link is a prop. No client name, phone number or
// service name is written here. The mobile menu and the Services dropdown
// both animate open and closed with a CSS grid-template-rows transition
// (0fr -> 1fr), which never causes layout shift because the collapsed
// track measures 0 and the browser interpolates the row size on its own,
// no JS height measurement needed. The track only measures 0 if its direct
// child has min-h-0 and no padding or border of its own; padding on that
// child kept the closed mobile menu 48px tall with "Home" showing through.
// Closed menus are also visibility hidden so their links cannot take focus.
//
// The full desktop nav needs about 1200px; at 1024 it wrapped the logo, the
// phone and the call to action onto two lines, so it switches at xl (1280).

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface NavLink {
  href: string;
  label: string;
}

export interface HeaderProps {
  /** Company name shown as text if no logoSrc is given. Required to render anything. */
  companyName?: string;
  logoSrc?: string;
  logoAlt?: string;
  /** Plain nav links, rendered in order. Does not include Services. */
  navLinks?: NavLink[];
  /** Services dropdown entries. Omit or leave empty to skip the dropdown entirely. */
  servicesLabel?: string;
  servicesLinks?: NavLink[];
  phone?: string;
  phoneHref?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function Header({
  companyName,
  logoSrc,
  logoAlt,
  navLinks = [],
  servicesLabel,
  servicesLinks = [],
  phone,
  phoneHref,
  ctaLabel,
  ctaHref,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuId = useId();
  const servicesId = useId();

  if (!companyName && !logoSrc) {
    return null;
  }

  const hasServices = servicesLinks.length > 0;

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="shell flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" style={{ color: "var(--color-ink)" }}>
          {logoSrc ? (
            <span className="relative block h-10 w-40" data-aspect="4/1" data-cutout="true">
              <Image src={logoSrc} alt={logoAlt ?? companyName ?? ""} fill sizes="160px" className="object-contain object-left" />
            </span>
          ) : (
            <span className="font-heading text-lg font-semibold uppercase tracking-tight">{companyName}</span>
          )}
        </Link>

        <nav className="hidden items-center gap-8 whitespace-nowrap xl:flex" aria-label="Primary">
          {navLinks.slice(0, 1).map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium">
              {link.label}
            </Link>
          ))}

          {hasServices ? (
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-medium"
                aria-expanded={servicesOpen}
                aria-controls={servicesId}
                onClick={() => setServicesOpen((value) => !value)}
              >
                {servicesLabel ?? "Services"}
                <span aria-hidden="true" style={{ fontSize: "10px" }}>
                  {servicesOpen ? "▴" : "▾"}
                </span>
              </button>
              <div
                id={servicesId}
                className="menu-anim absolute left-0 top-full grid w-64"
                style={{
                  gridTemplateRows: servicesOpen ? "1fr" : "0fr",
                  transition: "grid-template-rows var(--motion-base) ease, visibility var(--motion-base)",
                  overflow: "hidden",
                  visibility: servicesOpen ? "visible" : "hidden",
                }}
              >
                <div
                  className="min-h-0"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <ul className="flex flex-col p-2">
                    {servicesLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block px-4 py-3 text-sm"
                          onClick={() => setServicesOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}

          {navLinks.slice(1).map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 whitespace-nowrap xl:flex">
          {phone ? (
            <a href={phoneHref ?? `tel:${phone}`} className="text-sm font-medium">
              {phone}
            </a>
          ) : null}
          {ctaLabel && ctaHref ? (
            <Link href={ctaHref} className="btn btn-primary btn-sweep" data-cta="quote">
              <span>{ctaLabel}</span>
              <span className="btn-arrow" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
              </span>
            </Link>
          ) : null}
        </div>

        <button
          type="button"
          className="flex h-11 w-11 flex-col items-end justify-center gap-[6px] xl:hidden"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span
            aria-hidden="true"
            className="block h-[2px] w-6"
            style={{
              backgroundColor: "var(--color-ink)",
              transform: menuOpen ? "translateY(8px) rotate(45deg)" : "none",
              transition: "transform var(--motion-base) ease",
            }}
          />
          <span
            aria-hidden="true"
            className="block h-[2px] w-4"
            style={{ backgroundColor: "var(--color-ink)", opacity: menuOpen ? 0 : 1, transition: "opacity var(--motion-base) ease" }}
          />
          <span
            aria-hidden="true"
            className="block h-[2px] w-6"
            style={{
              backgroundColor: "var(--color-ink)",
              transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none",
              transition: "transform var(--motion-base) ease",
            }}
          />
        </button>
      </div>

      <nav
        id={menuId}
        aria-label="Primary, mobile"
        className="menu-anim grid xl:hidden"
        style={{
          gridTemplateRows: menuOpen ? "1fr" : "0fr",
          transition: "grid-template-rows var(--motion-base) ease, visibility var(--motion-base)",
          overflow: "hidden",
          visibility: menuOpen ? "visible" : "hidden",
          borderTop: menuOpen ? "1px solid var(--color-border)" : "none",
        }}
      >
        <div className="min-h-0 overflow-hidden">
        <ul className="shell flex flex-col gap-5 py-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-base font-medium" onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
          {hasServices ? (
            <li className="flex flex-col gap-4">
              <span className="text-base font-medium">{servicesLabel ?? "Services"}</span>
              <ul className="flex flex-col gap-4 pl-4">
                {servicesLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm"
                      style={{ color: "var(--color-ink-muted)" }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ) : null}
          {phone ? (
            <li>
              <a href={phoneHref ?? `tel:${phone}`} className="text-base font-medium">
                {phone}
              </a>
            </li>
          ) : null}
          {ctaLabel && ctaHref ? (
            <li>
              <Link href={ctaHref} className="btn btn-primary btn-sweep" data-cta="quote" onClick={() => setMenuOpen(false)}>
                <span>{ctaLabel}</span>
                <span className="btn-arrow" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
                </span>
              </Link>
            </li>
          ) : null}
        </ul>
        </div>
      </nav>
    </header>
  );
}
