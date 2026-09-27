// MacroDetail
//
// One macro detail shot at scale: water being filtered, a stream into a
// glass, a valve, a filter cartridge, equipment up close. Image-led, the
// same treatment as `PortraitFeature` but for the product and process side
// of "stuff that makes it cool" rather than the people side.
//
// Renders null without an image, because the whole point is the photo; a
// text-only fallback for this component is a different section, not a
// smaller version of this one.
//
// Reduced motion: no animation of its own, same reasoning as
// `PortraitFeature`. A macro shot with a slow zoom reads as a stock-photo
// tell, not craftsmanship; leave it static.
//
// The trap: "macro" implies the interesting part of the photo is small and
// specific (a valve, a droplet, a cartridge), so `object-cover` on a wide
// aspect ratio can crop exactly the detail the shot was chosen for. Prefer
// a taller aspect ratio here than you would for a landscape hero, and
// check the crop at 390px before shipping, not just at desktop width.
//
// Example image: wa_installation-technician_8f13e6a8
// (water-filtration/images/adobe-1526102765.jpeg) "A technician's hands
// and forearms work underneath a sink, installing a compact under-sink
// water filtration system with visible tubing and fittings." bestFor
// includes "equipment close-up" and "detail hero".

import Figure from "./Figure";

export interface MacroDetailProps {
  imageSrc: string;
  imageAlt: string;
  eyebrow?: string;
  headline?: string;
  body?: string;
  tone?: "light" | "alt";
}

export default function MacroDetail({
  imageSrc,
  imageAlt,
  eyebrow,
  headline,
  body,
  tone = "light",
}: MacroDetailProps) {
  if (!imageSrc) {
    return null;
  }

  const toneClass = tone === "alt" ? " on-alt" : "";

  return (
    <section className={`section${toneClass}`}>
      <div className="shell grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        <Figure
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          wrapperClassName="relative aspect-[4/5] w-full lg:min-h-[520px]"
          aspect="4/5"
        />
        <div className="max-w-md">
          {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
          {headline ? <h2>{headline}</h2> : null}
          {body ? <p className="lede mt-4">{body}</p> : null}
        </div>
      </div>
    </section>
  );
}
