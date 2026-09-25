// ServicesBody
//
// The /services page: an intro, a grid of every service the client
// offers, and an optional closing CTA. Renders null with no services.
// This is a page BODY, not the page hero: mount a VideoHero above it for
// the page's one h1. Every headline in here is an h2 or h3.

import Image from "next/image";

export interface ServiceEntry {
  name: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
  /** Anchor id for this card, so a nav dropdown can link straight to it. */
  id?: string;
}

export interface ServicesBodyProps {
  eyebrow?: string;
  headline?: string;
  intro?: string;
  services?: ServiceEntry[];
  closingHeadline?: string;
  closingCtaLabel?: string;
  closingCtaHref?: string;
}

export default function ServicesBody({
  eyebrow,
  headline,
  intro,
  services = [],
  closingHeadline,
  closingCtaLabel,
  closingCtaHref,
}: ServicesBodyProps) {
  const items = services.filter((service) => Boolean(service.name));

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <section className="section">
        <div className="shell">
          {(eyebrow || headline || intro) && (
            <div className="mb-16 max-w-2xl">
              {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
              {headline ? <h2 className="mb-6">{headline}</h2> : null}
              {intro ? <p className="lede">{intro}</p> : null}
            </div>
          )}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((service) => (
              <article
                key={service.name}
                id={service.id}
                className="card lift flex flex-col gap-4 p-6"
                style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", scrollMarginTop: "96px" }}
              >
                {service.imageSrc ? (
                  <div className="card-media relative aspect-[4/3] w-full" data-aspect="4/3">
                    <Image
                      src={service.imageSrc}
                      alt={service.imageAlt ?? service.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <h3>{service.name}</h3>
                {service.description ? (
                  <p style={{ color: "var(--color-ink-muted)" }}>
                    {service.description}
                  </p>
                ) : null}
                {service.href ? (
                  <a href={service.href} className="text-sm font-semibold" style={{ color: "var(--color-accent-text)" }}>
                    Learn more
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      {closingHeadline ? (
        <section className="section on-dark">
          <div className="shell text-center">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
              <h2>{closingHeadline}</h2>
              {closingCtaLabel && closingCtaHref ? (
                <a href={closingCtaHref} className="btn btn-primary btn-sweep" data-cta="quote">
                  <span>{closingCtaLabel}</span>
                  <span className="btn-arrow" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
                  </span>
                </a>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
