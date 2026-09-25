// StatOverImage
//
// A number and its label sitting ON TOP of the image it describes, not
// underneath it in a separate box. The stat is positioned over the photo
// with its own scrim behind just the text, so the number is legible
// without a full-image tint muddying the photo it is proving a point
// about.
//
// Renders null without a stat, because an image with no number over it is
// just an image; use `FullBleedBand` or `MacroDetail` for that case
// instead.
//
// Reduced motion: no animation of its own. If a future build wants the
// number to count up, that is a client component elsewhere in the
// motion layer's spirit (checked against `prefers-reduced-motion` the same
// way `Reveal` does); do not add an uncontrolled count-up animation here.
//
// The trap: the scrim sits behind the stat block only (a small rectangle),
// not the whole image, on purpose, so most of the photo stays visible. Do
// not "fix" low contrast by widening the scrim to the full image: that
// turns this into a `FullBleedBand` with extra steps and defeats the point
// of the numbers overlapping the photo rather than sitting over a tinted
// wash of it. If the photo itself is too busy for AA contrast in that
// corner, pick a calmer corner of a different photo instead.
//
// Example image: portfolio_pure_agua_344839a1
// (water-filtration/portfolio-harvest/pure-agua/lifestyle/enjoy-pure-water.jpg)
// "Two cupped hands catch a stream of splashing water outdoors over
// gravel, backlit by soft sunlight." bestFor includes "background band"
// and "people close-up"; the lower-left corner here is plain gravel, calm
// enough for the scrim.

import Figure from "./Figure";

export interface StatOverImageProps {
  imageSrc: string;
  imageAlt: string;
  stat: string;
  statLabel?: string;
  corner?: "bottom-left" | "bottom-right";
  aspect?: string;
}

export default function StatOverImage({
  imageSrc,
  imageAlt,
  stat,
  statLabel,
  corner = "bottom-left",
  aspect = "4/3",
}: StatOverImageProps) {
  if (!stat) {
    return null;
  }

  const isLeft = corner === "bottom-left";

  return (
    <div className="relative overflow-hidden" style={{ aspectRatio: aspect }}>
      <Figure src={imageSrc} alt={imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" wrapperClassName="absolute inset-0" aspect={aspect} />
      <div
        className="absolute flex flex-col gap-1 px-6 py-4"
        style={{
          bottom: 0,
          [isLeft ? "left" : "right"]: 0,
          backgroundColor: "rgba(17,17,17,0.72)",
        }}
      >
        <span className="font-heading text-4xl" style={{ color: "#ffffff" }}>
          {stat}
        </span>
        {statLabel ? (
          <span className="text-sm" style={{ color: "rgba(255,255,255,0.86)" }}>
            {statLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
}
