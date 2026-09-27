// BleedFigure
//
// An asymmetric two column layout: an image that bleeds off ONE side of
// the viewport, a text column on the other. This is the opposite of the
// centred column every other section uses, on purpose. `side="left"`
// bleeds the image past the left edge with the text on the right;
// `side="right"` mirrors it.
//
// Reduced motion: no animation here to begin with, so nothing to disable.
// The bleed is a layout fact, not motion.
//
// How the bleed works, and the trap: this component's own outer element is
// NOT a `.shell`. The image column carries zero horizontal padding on
// purpose, so it touches the true viewport edge on its outer side simply
// because nothing is holding it back; the text column carries the same
// `var(--gutter)` inset `.shell` uses, so it never touches an edge.
// Wrapping the image column in a `.shell` ("just to be consistent") puts
// the gutter back on the one side this component exists to remove, and the
// bleed silently stops bleeding. On mobile the grid collapses to one
// column: the image, alone in its row with zero padding, is full width on
// both sides, which is correct (there is no second column left to protect
// a gutter against) rather than a bug to fix by adding padding back.
//
// Example image: portfolio_aqua_otter_805ebbb7
// (water-filtration/portfolio-harvest/aqua-otter/interior/service-glass-fill.jpg)
// "A man in a light shirt pours water from a chrome kitchen faucet into a
// glass at a sink, cutting board and produce visible beside him." bestFor
// includes "people close-up".

import Figure from "./Figure";

export interface BleedFigureProps {
  imageSrc: string;
  imageAlt: string;
  side: "left" | "right";
  eyebrow?: string;
  headline?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  tone?: "light" | "alt";
}

export default function BleedFigure({
  imageSrc,
  imageAlt,
  side,
  eyebrow,
  headline,
  body,
  ctaLabel,
  ctaHref,
  tone = "light",
}: BleedFigureProps) {
  if (!headline) {
    return null;
  }

  const toneClass = tone === "alt" ? " on-alt" : "";
  const imageIsRight = side === "right";

  return (
    <section className={`section${toneClass} overflow-hidden`} style={{ paddingLeft: 0, paddingRight: 0 }}>
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-0">
        <Figure
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          wrapperClassName={`relative aspect-[4/5] w-full lg:aspect-auto lg:min-h-[460px] lg:self-stretch ${
            imageIsRight ? "order-1 lg:order-2" : "order-1 lg:order-1"
          }`}
          aspect="free"
        />
        <div
          className={imageIsRight ? "order-2 lg:order-1" : "order-2 lg:order-2"}
          style={{ paddingInline: "var(--gutter)" }}
        >
          <div
            className="max-w-lg py-4"
            style={imageIsRight ? { marginInlineStart: "auto" } : { marginInlineEnd: "auto" }}
          >
            {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
            <h2>{headline}</h2>
            {body ? <p className="lede mt-4">{body}</p> : null}
            {ctaLabel && ctaHref ? (
              <div className="mt-8">
                <a href={ctaHref} className="btn btn-primary btn-sweep" data-cta="quote">
                  <span>{ctaLabel}</span>
                  <span className="btn-arrow" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
                  </span>
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
