// WhySystems
//
// The second section of every home page: why this client's systems are
// worth choosing. Renders null under three reasons, because a two-reason
// version of this section is not a shorter section, it is an unfinished
// one. Caps the rendered list at five. Three variants:
//   "cards"            - a grid of bordered cards, one per reason. (default)
//   "numbered-list"     - a single full-width vertical list, each reason a
//                         numbered row with a rule underneath, no boxes.
//   "split-statement"   - the first reason set as one large claim in its
//                         own column, the rest as a plain supporting list
//                         beside it.

import Reveal from "../motion/Reveal";
import { stagger } from "../motion/stagger";

export interface WhyReason {
  title: string;
  body: string;
  evidence?: string;
}

export type WhySystemsVariant = "cards" | "numbered-list" | "split-statement";

export interface WhySystemsProps {
  eyebrow?: string;
  headline?: string;
  subhead?: string;
  reasons?: WhyReason[];
  tone?: "light" | "alt" | "dark";
  ctaLabel?: string;
  ctaHref?: string;
  variant?: WhySystemsVariant;
}

function gridColumnsFor(count: number): string {
  if (count === 3) {
    return "md:grid-cols-3";
  }
  if (count === 4) {
    return "md:grid-cols-2";
  }
  return "md:grid-cols-2 lg:grid-cols-3";
}

function ctaBlock(ctaLabel: string | undefined, ctaHref: string | undefined, btnClass: string) {
  if (!ctaLabel || !ctaHref) {
    return null;
  }
  return (
    <div className="mt-16">
      <a href={ctaHref} className={btnClass} data-cta="quote">
        <span>{ctaLabel}</span>
        <span className="btn-arrow" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
        </span>
      </a>
    </div>
  );
}

export default function WhySystems({
  eyebrow,
  headline,
  subhead,
  reasons = [],
  tone = "light",
  ctaLabel,
  ctaHref,
  variant = "cards",
}: WhySystemsProps) {
  const items = reasons.filter((reason) => Boolean(reason.title)).slice(0, 5);

  if (items.length < 3) {
    return null;
  }

  const toneClass = tone === "dark" ? " on-dark" : tone === "alt" ? " on-alt" : "";
  const isDark = tone === "dark";
  const btnClass = isDark ? "btn btn-on-dark btn-sweep" : "btn btn-primary btn-sweep";
  const ruleColor = isDark ? "rgba(255,255,255,0.18)" : "var(--color-border)";

  if (variant === "numbered-list") {
    return (
      <section className={`section${toneClass}`} data-section="why-systems">
        <div className="shell relative">
          <div className="mb-16 max-w-2xl">
            {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
            {headline ? <h2>{headline}</h2> : null}
            {subhead ? <p className="lede mt-4">{subhead}</p> : null}
          </div>
          <ol className="flex flex-col">
            {items.map((reason, index) => (
              <Reveal key={reason.title} delayMs={stagger(index)}>
                <li
                  className="grid grid-cols-1 gap-4 py-8 sm:grid-cols-12 sm:gap-8"
                  style={{ borderTop: `1px solid ${ruleColor}` }}
                >
                  <span
                    aria-hidden="true"
                    className="font-heading sm:col-span-2"
                    style={{
                      fontSize: "32px",
                      lineHeight: 1,
                      color: isDark ? "var(--color-accent-text-on-dark)" : "var(--color-accent-text)",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="sm:col-span-10">
                    <h3 className="mb-2">{reason.title}</h3>
                    <p style={{ color: isDark ? undefined : "var(--color-ink-muted)" }}>{reason.body}</p>
                    {reason.evidence ? (
                      <p
                        className="mt-2 text-sm font-semibold"
                        style={{ color: isDark ? "var(--color-accent-text-on-dark)" : "var(--color-accent-text)" }}
                      >
                        {reason.evidence}
                      </p>
                    ) : null}
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
          {ctaBlock(ctaLabel, ctaHref, btnClass)}
        </div>
      </section>
    );
  }

  if (variant === "split-statement") {
    const [lead, ...rest] = items;
    return (
      <section className={`section${toneClass}`} data-section="why-systems">
        <div className="shell relative">
          {(eyebrow || headline || subhead) && (
            <div className="mb-16 max-w-2xl">
              {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
              {headline ? <h2>{headline}</h2> : null}
              {subhead ? <p className="lede mt-4">{subhead}</p> : null}
            </div>
          )}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <p className="font-heading" style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.15 }}>
                {lead.title}
              </p>
              <p className="mt-6 max-w-md" style={{ color: isDark ? undefined : "var(--color-ink-muted)" }}>
                {lead.body}
              </p>
            </div>
            <div className="flex flex-col gap-8 lg:col-span-6">
              {rest.map((reason, index) => (
                <Reveal key={reason.title} delayMs={stagger(index)}>
                  <div className="pb-8" style={{ borderBottom: `1px solid ${ruleColor}` }}>
                    <h3 className="mb-2">{reason.title}</h3>
                    <p style={{ color: isDark ? undefined : "var(--color-ink-muted)" }}>{reason.body}</p>
                    {reason.evidence ? (
                      <p
                        className="mt-2 text-sm font-semibold"
                        style={{ color: isDark ? "var(--color-accent-text-on-dark)" : "var(--color-accent-text)" }}
                      >
                        {reason.evidence}
                      </p>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          {ctaBlock(ctaLabel, ctaHref, btnClass)}
        </div>
      </section>
    );
  }

  return (
    <section className={`section${toneClass}`} data-section="why-systems">
      <div className="shell relative">
        <div className="mb-16 max-w-2xl">
          {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
          {headline ? <h2>{headline}</h2> : null}
          {subhead ? <p className="lede mt-4">{subhead}</p> : null}
        </div>
        <div className={`grid grid-cols-1 gap-8 ${gridColumnsFor(items.length)}`}>
          {items.map((reason, index) => (
            <Reveal key={reason.title} delayMs={stagger(index)} className="lift">
              <div
                className="flex h-full flex-col gap-4 p-8"
                style={
                  isDark
                    ? { border: "1px solid rgba(255,255,255,0.18)" }
                    : { backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }
                }
              >
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "40px",
                    lineHeight: 1,
                    // A faded numeral: mixed into the alpha channel of the
                    // color itself rather than the CSS opacity property, so
                    // this permanently decorative digit never reads as
                    // content a reduced-motion visitor cannot see. aria-hidden
                    // takes it out of the accessible name, but
                    // bin/assert-house-look.mjs still measures the rendered
                    // pixel contrast of every large text node regardless, and
                    // 70% against --color-surface-deep measured 3.49:1 - under
                    // the 4.5:1 floor. 90% clears it with margin (measured
                    // 4.5-5:1 depending on the derived accent) while the digit
                    // still reads as faded against the full-strength accent
                    // used elsewhere on the card. Fixed 2026-09-23 for the
                    // dark branch only; the light/alt branch was left at 50%
                    // on the unstated assumption that a light card needed a
                    // lighter mix. It does not: --color-accent-text is
                    // already the AA-passing colour against a light surface,
                    // and mixing it to 50% transparent over white roughly
                    // halves that contrast (measured 2.48:1 on USA Water's
                    // amber accent, tone="alt" WhySystems, 2026-09-24). 90%
                    // matches the dark branch's own fix for the same reason.
                    color: isDark
                      ? "color-mix(in srgb, var(--color-accent-text-on-dark) 90%, transparent)"
                      : "var(--color-accent-text)",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{reason.title}</h3>
                <p style={{ color: isDark ? undefined : "var(--color-ink-muted)" }}>{reason.body}</p>
                {reason.evidence ? (
                  <p
                    className="text-sm font-semibold"
                    style={{ color: isDark ? "var(--color-accent-text-on-dark)" : "var(--color-accent-text)" }}
                  >
                    {reason.evidence}
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
        {ctaLabel && ctaHref ? (
          <div className="mt-16">
            <a href={ctaHref} className={btnClass} data-cta="quote">
              <span>{ctaLabel}</span>
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
