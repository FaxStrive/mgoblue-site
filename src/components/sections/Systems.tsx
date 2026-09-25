// Systems
//
// Shows the client's real product or system lineup. Renders null with no
// systems. Four variants:
//   "grid"             - a grid of cards, each with a photo, name,
//                         description, CTA. (default, was "cards")
//   "alternating-rows"  - alternating image/copy rows, one system per row,
//                         the way a flagship-system page reads. (was "rows")
//   "comparison"        - the systems laid out as parallel columns in a
//                         single comparison table, so a visitor reads them
//                         side by side rather than one after another.
//   "stacked-cards"      - each system is a full-width band stacked on top
//                         of the next, photo behind a scrim with the copy
//                         overlaid, so the page reads as one system at a
//                         time rather than a grid or a table.
//
// The old literal names "cards" and "rows" are accepted too, and resolved
// to "grid" and "alternating-rows" respectively, so a caller written before
// this component had a `variant` union keeps compiling and rendering
// exactly as it did before.
//
// A system with no photo still renders (text card / text row); a system
// with no name is dropped from the list rather than shown blank.

import Reveal from "../motion/Reveal";
import { stagger } from "../motion/stagger";
import Figure from "./Figure";

export interface SystemItem {
  name: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

/** The current, canonical shapes for this section. */
export type SystemsVariant = "grid" | "alternating-rows" | "comparison" | "stacked-cards";

/** Pre-variant names, still accepted so an older caller keeps compiling. */
type SystemsLegacyVariant = "cards" | "rows";

export interface SystemsProps {
  variant?: SystemsVariant | SystemsLegacyVariant;
  eyebrow?: string;
  headline?: string;
  systems?: SystemItem[];
  tone?: "light" | "alt";
  "data-section"?: string;
}

function resolveVariant(variant: SystemsProps["variant"]): SystemsVariant {
  if (variant === "cards") return "grid";
  if (variant === "rows") return "alternating-rows";
  return variant ?? "grid";
}

export default function Systems({ variant, eyebrow, headline, systems = [], tone = "light", "data-section": dataSection }: SystemsProps) {
  const items = systems.filter((system) => Boolean(system.name));

  if (items.length === 0) {
    return null;
  }

  const resolved = resolveVariant(variant);
  const sectionClass = `section${tone === "alt" ? " on-alt" : ""}`;
  const sectionAttrs = dataSection ? { "data-section": dataSection } : {};
  const header = (eyebrow || headline) && (
    <div>
      {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
      {headline ? <h2>{headline}</h2> : null}
    </div>
  );

  if (resolved === "alternating-rows") {
    return (
      <section className={sectionClass} {...sectionAttrs}>
        <div className="shell flex flex-col gap-20">
          {header}
          {items.map((system, index) => {
            const reversed = index % 2 === 1;
            return (
              <div
                key={system.name}
                className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16"
              >
                <div className={`lg:col-span-6 ${reversed ? "lg:order-2" : "lg:order-1"}`}>
                  <h3 className="mb-4">{system.name}</h3>
                  {system.description ? (
                    <p className="mb-8 max-w-md" style={{ color: "var(--color-ink-muted)" }}>
                      {system.description}
                    </p>
                  ) : null}
                  {system.ctaLabel && system.ctaHref ? (
                    <a href={system.ctaHref} className="btn btn-ghost btn-sweep">
                      {system.ctaLabel}
                    </a>
                  ) : null}
                </div>
                <div className={`lg:col-span-6 ${reversed ? "lg:order-1" : "lg:order-2"}`}>
                  {system.imageSrc ? (
                    <Figure
                      src={system.imageSrc}
                      alt={system.imageAlt ?? system.name}
                      fill
                      sizes="(max-width: 1023px) 100vw, 50vw"
                      wrapperClassName="card-media relative w-full"
                      wrapperStyle={{ border: "1px solid var(--color-border)" }}
                      aspect="4/3"
                    />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  if (resolved === "comparison") {
    // Parallel columns: every system reads at the same row (photo, name,
    // description, CTA) so the visitor compares across the row rather than
    // scrolling through one system after another.
    return (
      <section className={sectionClass} {...sectionAttrs}>
        <div className="shell">
          {header ? <div className="mb-16">{header}</div> : null}
          <div
            className="grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4"
            style={{ borderTop: "1px solid var(--color-border)", borderColor: "var(--color-border)" }}
          >
            {items.map((system, index) => (
              <div key={system.name} className="flex flex-col gap-4 px-6 py-8 first:pl-0 last:pr-0">
                {system.imageSrc ? (
                  <Figure
                    src={system.imageSrc}
                    alt={system.imageAlt ?? system.name}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                    wrapperClassName="card-media relative w-full"
                    aspect="1/1"
                  />
                ) : null}
                <span
                  aria-hidden="true"
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-accent-text)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{system.name}</h3>
                {system.description ? (
                  <p style={{ color: "var(--color-ink-muted)" }}>
                    {system.description}
                  </p>
                ) : null}
                {system.ctaLabel && system.ctaHref ? (
                  <a
                    href={system.ctaHref}
                    className="mt-auto text-sm font-semibold"
                    style={{ color: "var(--color-accent-text)" }}
                  >
                    {system.ctaLabel}
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (resolved === "stacked-cards") {
    // Full-width bands, one system per screen-width slab, photo behind a
    // scrim with the copy laid over it. Reads as one system at a time,
    // never a grid of small cards or a side-by-side row.
    return (
      <section className={sectionClass} {...sectionAttrs}>
        <div className="shell mb-16">{header}</div>
        <div className="flex flex-col gap-4">
          {items.map((system, index) => (
            <Reveal key={system.name} delayMs={stagger(index)}>
              <div className="relative w-full overflow-hidden" style={{ minHeight: 420 }}>
                {system.imageSrc ? (
                  <Figure
                    src={system.imageSrc}
                    alt={system.imageAlt ?? system.name}
                    fill
                    sizes="100vw"
                    wrapperClassName="absolute inset-0 h-full w-full"
                    aspect="free"
                  />
                ) : (
                  <div className="absolute inset-0" style={{ backgroundColor: "var(--color-surface-deep)" }} />
                )}
                <div
                  className="relative flex h-full min-h-[420px] items-end"
                  style={{ backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.1))" }}
                >
                  <div className="shell w-full py-10 text-white">
                    <div className="max-w-lg">
                      <h3 className="mb-3" style={{ color: "#ffffff" }}>
                        {system.name}
                      </h3>
                      {system.description ? (
                        <p className="mb-6" style={{ color: "rgba(255,255,255,0.82)" }}>
                          {system.description}
                        </p>
                      ) : null}
                      {system.ctaLabel && system.ctaHref ? (
                        <a href={system.ctaHref} className="btn btn-on-dark btn-sweep">
                          {system.ctaLabel}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    );
  }

  // "grid" (default)
  return (
    <section className={sectionClass}>
      <div className="shell">
        {(eyebrow || headline) && (
          <div className="mb-16">
            {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
            {headline ? <h2>{headline}</h2> : null}
          </div>
        )}
        {/* Columns follow the item count: two products in a three column grid
            left a third of the row empty on USA Water. Four sit two by two. */}
        <div
          className={`grid grid-cols-1 gap-8 md:grid-cols-2 ${
            items.length === 3 || items.length > 4 ? "lg:grid-cols-3" : ""
          }`}
        >
          {items.map((system, index) => (
            <Reveal key={system.name} delayMs={stagger(index)} className="lift">
              <article
                className="card flex flex-col gap-4 p-6"
                style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
              >
                {system.imageSrc ? (
                  <Figure
                    src={system.imageSrc}
                    alt={system.imageAlt ?? system.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    wrapperClassName="card-media relative w-full"
                    aspect="4/3"
                  />
                ) : null}
                <h3>{system.name}</h3>
                {system.description ? (
                  <p style={{ color: "var(--color-ink-muted)" }}>
                    {system.description}
                  </p>
                ) : null}
                {system.ctaLabel && system.ctaHref ? (
                  <a href={system.ctaHref} className="text-sm font-semibold" style={{ color: "var(--color-accent-text)" }}>
                    {system.ctaLabel}
                  </a>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
