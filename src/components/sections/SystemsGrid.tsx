// SystemsGrid
//
// The third section of every home page: every system and service the
// client offers, in one grid, not a curated sample. Renders null when no
// item carries both a name and an href, because a card that goes nowhere
// is a dead end, not a lighter version of the section.

import Figure from "./Figure";
import Reveal from "../motion/Reveal";
import { stagger } from "../motion/stagger";

export interface SystemGridItem {
  name: string;
  blurb?: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
}

export interface SystemsGridProps {
  eyebrow?: string;
  headline?: string;
  subhead?: string;
  items?: SystemGridItem[];
  tone?: "light" | "alt";
  footerCtaLabel?: string;
  footerCtaHref?: string;
  /**
   * "photo" is the original: a cropped scene filling a 4:3 frame.
   * "product" is the reference site's treatment: the equipment isolated on a
   * white panel with air around it, so a grid of systems reads as a catalogue
   * of things you can buy rather than a mood board. Prefer "product" when the
   * library holds equipment shots; the picture bar applies either way, because
   * this changes how a picture is presented and not which pictures are
   * allowed.
   */
  cardMedia?: "photo" | "product";
}

/**
 * The grid must never leave an empty half row, so the column count and any
 * "feature" treatment on the first card follow the item count directly:
 *   1        -> a single column, nothing to balance
 *   2, 4      -> two columns, an even number of rows either way
 *   3, 6, 9   -> three columns, again an even multiple
 *   5, 7      -> three columns leaves a short last row (2 or 1 items), so
 *                the first card spans two columns to square the count up:
 *                5 becomes 2 + 3 (row one: a 2-wide feature + 1, row two: 3),
 *                7 becomes 2 + 3 + 3 (row one: a 2-wide feature + 1, then 3, 3)
 *   anything else -> three columns, no feature card; an uneven remainder on
 *                the last row is the honest result of an odd count that the
 *                other rules do not cover, and is preferable to inventing a
 *                filler card.
 */
export function gridPlanFor(count: number): { gridClass: string; featureFirst: boolean } {
  if (count <= 1) {
    return { gridClass: "", featureFirst: false };
  }
  if (count === 2 || count === 4) {
    return { gridClass: "sm:grid-cols-2", featureFirst: false };
  }
  if (count === 3 || count === 6 || count === 9) {
    return { gridClass: "sm:grid-cols-2 lg:grid-cols-3", featureFirst: false };
  }
  if (count === 5 || count === 7) {
    return { gridClass: "sm:grid-cols-2 lg:grid-cols-3", featureFirst: true };
  }
  return { gridClass: "sm:grid-cols-2 lg:grid-cols-3", featureFirst: false };
}

export default function SystemsGrid({
  eyebrow,
  headline,
  subhead,
  items = [],
  tone = "light",
  footerCtaLabel,
  footerCtaHref,
  cardMedia = "photo",
}: SystemsGridProps) {
  const entries = items.filter((item) => Boolean(item.name) && Boolean(item.href));

  if (entries.length === 0) {
    return null;
  }

  const { gridClass, featureFirst } = gridPlanFor(entries.length);
  const toneClass = tone === "alt" ? " on-alt" : "";

  return (
    <section className={`section${toneClass}`} data-section="systems-grid">
      <div className="shell">
        <div className="mb-16 max-w-2xl">
          {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
          {headline ? <h2>{headline}</h2> : null}
          {subhead ? <p className="lede mt-4">{subhead}</p> : null}
        </div>
        <div className={`grid grid-cols-1 gap-8 ${gridClass}`}>
          {entries.map((item, index) => (
            <Reveal
              key={item.name}
              delayMs={stagger(index)}
              className={`lift${featureFirst && index === 0 ? " lg:col-span-2" : ""}`}
            >
              <a
                href={item.href}
                className="card group flex h-full flex-col"
                data-system-card=""
                style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
              >
                {item.imageSrc ? (
                  <Figure
                    src={item.imageSrc}
                    alt={item.imageAlt ?? item.name}
                    fill
                    sizes="(max-width: 1023px) 100vw, 33vw"
                    wrapperClassName="card-media relative aspect-[4/3] w-full"
                    wrapperStyle={cardMedia === "product" ? { backgroundColor: "#FFFFFF", padding: "1.75rem" } : undefined}
                    aspect="4/3"
                    fit={cardMedia === "product" ? "contain" : undefined}
                  />
                ) : null}
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3>{item.name}</h3>
                  {item.blurb ? (
                    <p style={{ color: "var(--color-ink-muted)" }}>
                      {item.blurb}
                    </p>
                  ) : null}
                  <span
                    className="mt-auto inline-flex items-center gap-2 text-sm font-semibold"
                    style={{ color: "var(--color-accent-text)" }}
                  >
                    See this system
                    <span
                      className="btn-arrow inline-block group-hover:translate-x-1"
                      aria-hidden="true"
                      style={{ transition: "transform var(--motion-fast)" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
                    </span>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        {footerCtaLabel && footerCtaHref ? (
          <div className="mt-16">
            <a href={footerCtaHref} className="btn btn-primary btn-sweep" data-cta="quote">
              <span>{footerCtaLabel}</span>
              <span className="btn-arrow" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
              </span>
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
