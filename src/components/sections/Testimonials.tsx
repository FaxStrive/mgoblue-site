// Testimonials
//
// Google-review-style testimonials section with star ratings, reviewer names,
// neighborhood/city, a testimonial quote, and an aggregate rating badge.
// Introduced in critique round 4 to add social proof matching the reference.

import Image from "next/image";
import Reveal from "../motion/Reveal";

export interface TestimonialItem {
  name: string;
  location: string;
  quote: string;
  imageSrc?: string;
  imageAlt?: string;
  stars?: number;
}

export interface TestimonialsProps {
  eyebrow?: string;
  headline?: string;
  aggregate?: string;
  aggregateCount?: string;
  items: TestimonialItem[];
  tone?: "light" | "alt";
}

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" style={{ color: "#f59e0b" }}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

export default function Testimonials({
  eyebrow = "CUSTOMER REVIEWS",
  headline = "What Asheville Homeowners Say",
  aggregate = "4.9",
  aggregateCount = "Based on Google Reviews",
  items = [],
  tone = "alt",
}: TestimonialsProps) {
  if (items.length === 0) return null;

  const bgStyle = tone === "alt"
    ? { backgroundColor: "var(--color-surface-teal, #ecfeff)" }
    : { backgroundColor: "var(--color-surface)" };

  return (
    <section className="section" style={bgStyle} data-section="testimonials">
      <div className="shell">
        <Reveal className="mb-16 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
            {headline ? <h2 className="max-w-lg">{headline}</h2> : null}
          </div>
          {/* Aggregate badge */}
          <div
            className="flex items-center gap-4 self-start lg:self-auto"
            style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)", padding: "1rem 1.5rem" }}
          >
            <span
              className="text-4xl font-bold tracking-tight"
              style={{ color: "var(--color-accent-text)", fontFamily: "var(--font-heading)" }}
            >
              {aggregate}
            </span>
            <div className="flex flex-col gap-1">
              <StarRow count={5} />
              <span className="text-xs" style={{ color: "var(--color-ink-muted)" }}>{aggregateCount}</span>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.name} delayMs={i * 80}>
              <article
                className="card flex flex-col gap-4 p-6"
                style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
              >
                <StarRow count={item.stars ?? 5} />
                <blockquote className="flex-1">
                  <p className="leading-relaxed" style={{ color: "var(--color-ink)" }}>
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </blockquote>
                <div className="flex items-center gap-3 pt-2" style={{ borderTop: "1px solid var(--color-border)" }}>
                  {item.imageSrc ? (
                    <span className="relative block h-10 w-10 shrink-0 overflow-hidden" style={{ borderRadius: "50%" }}>
                      <Image src={item.imageSrc} alt={item.imageAlt ?? item.name} fill sizes="40px" className="object-cover" />
                    </span>
                  ) : (
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center text-sm font-semibold"
                      style={{ backgroundColor: "var(--color-surface-teal, #ecfeff)", color: "var(--color-accent-text)", border: "1px solid var(--color-border)" }}
                    >
                      {item.name.charAt(0)}
                    </span>
                  )}
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--color-ink)" }}>{item.name}</p>
                    <p className="text-xs" style={{ color: "var(--color-ink-muted)" }}>{item.location}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
