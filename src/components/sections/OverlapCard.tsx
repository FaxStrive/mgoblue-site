// OverlapCard
//
// A card or figure that deliberately overlaps the boundary between its
// section and the one below it, using a negative top margin plus a raised
// z-index. This is the layout device that replaces the tone-change job the
// old WaveDivider and Caustics used to do: instead of drawing a shape at
// the seam, the seam itself is broken by a real piece of content sitting
// across it.
//
// Renders as the LAST child of the section it belongs to, pulled up over
// whatever comes after: mount it at the end of one section's JSX, not at
// the start of the next one, or the stacking order is backwards and the
// card renders behind the section it should sit on top of.
//
// Reduced motion: the card itself carries no animation. Its hover lift, if
// the caller wants one, is the existing `.card` class, which the global
// reduced-motion block already disables by killing all transitions. Do not
// give this component its own motion.
//
// The trap: the negative margin is sized in a fixed pixel amount that
// assumes the section below has enough top padding to absorb it (every
// `.section` does, via `--section-pad`, which is at minimum 72px). Pull a
// card up by more than the following section's padding and it overlaps
// that section's own content instead of just its background, which reads
// as broken layout, not intentional overlap.
//
// Example image: wa_water-softener-system_6d8dca86
// (water-filtration/images/adobe-1806873495.jpeg) "A wall-mounted
// residential water softener and filtration system: a black digital
// control head, a large brine tank, and blue and clear plumbing pipes with
// red shutoff valves." bestFor includes "equipment close-up" and "detail
// hero".

import Image from "next/image";

export interface OverlapCardProps {
  imageSrc: string;
  imageAlt: string;
  eyebrow?: string;
  headline?: string;
  body?: string;
  overlap?: number;
}

export default function OverlapCard({
  imageSrc,
  imageAlt,
  eyebrow,
  headline,
  body,
  overlap = 96,
}: OverlapCardProps) {
  if (!headline) {
    return null;
  }

  return (
    <div className="shell relative z-10" style={{ marginBottom: -overlap }}>
      <div
        className="card grid grid-cols-1 gap-0 overflow-hidden sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"
        style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      >
        <div className="card-media relative aspect-[4/3] sm:aspect-auto sm:min-h-[280px]" data-aspect="free">
          <Image src={imageSrc} alt={imageAlt} fill sizes="(max-width: 640px) 100vw, 45vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center gap-3 p-8">
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <h3>{headline}</h3>
          {body ? <p style={{ color: "var(--color-ink-muted)" }}>{body}</p> : null}
        </div>
      </div>
    </div>
  );
}
