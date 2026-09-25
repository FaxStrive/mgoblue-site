// PortraitFeature
//
// One big close up of a person, paired with a short pull quote or a stat.
// The face is large in frame, not a thumbnail: the image column has a
// minimum rendered height of roughly 70vh on desktop, so it reads as a
// deliberate "look at this person" moment, not a card that happens to have
// a photo in it. This is the direct answer to "big close ups of people,
// thumbs up" the operator asked for by name.
//
// Renders null without either an image or a quote/stat, because a portrait
// this large with nothing to say beside it is just a stock photo.
//
// Reduced motion: no animation of its own. If a future build wants a
// reveal on scroll here, wrap it in the existing `Reveal` component rather
// than adding a new one; do not add a parallax or zoom effect to this
// image specifically, since a face is the one thing on the page a visitor
// looks at first, and a slow zoom on it competes with the quote for
// attention rather than supporting it.
//
// The trap: `minHeight` is a floor, not the whole story. On a real
// person's face, `object-cover` crops from the center by default, which
// can cut a chin or a forehead if the source photo is not already
// portrait-oriented. Check the source image's own aspect ratio before
// shipping this on a client site; do not assume `object-cover` will always
// find a flattering crop.
//
// Example image: portfolio_solomon_water_site_e38448f8
// (water-filtration/portfolio-harvest/solomon-water-site/installations/robert-install-1.jpg)
// "A man in a gray polo and shorts stands beside two tall gray water
// treatment tanks in a garage, giving a thumbs up and smiling at the
// camera." bestFor includes "people close-up".

import Figure from "./Figure";

export interface PortraitFeatureProps {
  imageSrc: string;
  imageAlt: string;
  quote?: string;
  attribution?: string;
  stat?: string;
  statLabel?: string;
  tone?: "light" | "dark";
}

export default function PortraitFeature({
  imageSrc,
  imageAlt,
  quote,
  attribution,
  stat,
  statLabel,
  tone = "light",
}: PortraitFeatureProps) {
  if (!imageSrc || (!quote && !stat)) {
    return null;
  }

  const toneClass = tone === "dark" ? " on-dark" : "";

  return (
    <section className={`section${toneClass}`}>
      <div className="shell grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <Figure
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          wrapperClassName="relative aspect-[3/4] w-full lg:aspect-auto lg:min-h-[70vh]"
          aspect="free"
        />
        <div className="flex flex-col gap-6">
          {quote ? <p className="font-heading" style={{ fontSize: "var(--h3)", lineHeight: 1.3 }}>&ldquo;{quote}&rdquo;</p> : null}
          {attribution ? <span className="eyebrow">{attribution}</span> : null}
          {stat ? (
            <div className="flex flex-col gap-1">
              <span className="font-heading text-5xl" style={tone === "dark" ? undefined : { color: "var(--color-accent-text)" }}>
                {stat}
              </span>
              {statLabel ? <span className="text-sm" style={{ color: tone === "dark" ? "rgba(255,255,255,0.72)" : "var(--color-ink-muted)" }}>{statLabel}</span> : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
