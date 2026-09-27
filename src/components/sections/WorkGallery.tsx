// WorkGallery
//
// The reference site (the-water-co) does not spread one photo per band down
// the page. It gathers its images into a single cluster of eight and moves
// on. That is the whole reason this component exists: the visual-rhythm gate
// now measures image density per section and expects at least one cluster
// rather than 20+ sections that each carry a lone picture, and a lone-picture
// page cannot pass that gate no matter how the copy around it reads.
//
// Renders null with no items, because a cluster of nothing is not a lighter
// version of the section, it is a missing one.
//
// NAME IT FOR WHAT IT SHOWS, NOT FOR WHO DID IT. This component holds whatever
// pictures it is handed, and most of the time those are licensed stock. With
// the client own photographs in it, the cluster is their work and the headline
// may say so. Without them, it is an equipment and lifestyle cluster and the
// headline belongs to the subject: "The equipment we fit", "What a finished
// system looks like". Never "Systems we have put in", which is what shipped on
// usa-water-v2 over eight stock photographs on 2026-09-23.
//
// Gate 7 of bin/assert-pre-ship reads the rendered page for exactly this, but
// it is a floor. If the words would leave a visitor thinking the photographs
// are this client jobs, they do not ship, whatever the gate says.
//
// Three variants:
//   "grid"      - the even 2/4-column grid, every tile the same 4/3 box.
//                 (default)
//   "masonry"   - a staggered two-column layout, alternating tiles offset
//                 vertically so the cluster reads as one uneven block
//                 rather than a strict grid.
//   "filmstrip" - a single horizontally scrolling row of fixed-width
//                 tiles, the way a strip of contact prints reads.

import Figure from "./Figure";
import Reveal from "../motion/Reveal";
import { stagger } from "../motion/stagger";

export interface WorkGalleryItem {
  src: string;
  alt: string;
}

export type WorkGalleryVariant = "grid" | "masonry" | "filmstrip";

export interface WorkGalleryProps {
  eyebrow?: string;
  headline?: string;
  subhead?: string;
  tone?: "light" | "alt" | "dark";
  items?: WorkGalleryItem[];
  variant?: WorkGalleryVariant;
}

export default function WorkGallery({
  eyebrow,
  headline,
  subhead,
  tone = "light",
  items = [],
  variant = "grid",
}: WorkGalleryProps) {
  const entries = items.filter((item) => Boolean(item.src) && Boolean(item.alt));

  if (entries.length === 0) {
    return null;
  }

  const toneClass = tone === "alt" ? " on-alt" : tone === "dark" ? " on-dark" : "";
  const header = (eyebrow || headline || subhead) && (
    <div className="mb-16 max-w-2xl">
      {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
      {headline ? <h2>{headline}</h2> : null}
      {subhead ? <p className="lede mt-4">{subhead}</p> : null}
    </div>
  );

  if (variant === "masonry") {
    return (
      <section className={`section${toneClass}`} data-section="work-gallery">
        <div className="shell">
          {header}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {entries.map((item, index) => {
              // Every other tile in a column drops down half a tile height,
              // so the cluster reads staggered rather than gridded. Applied
              // to odd-indexed tiles only, on the column-position parity,
              // so it staggers in both a 2-col and a 4-col layout.
              const offset = index % 2 === 1;
              return (
                <Reveal key={item.src} delayMs={stagger(index)} className={`lift${offset ? " lg:mt-10" : ""}`}>
                  <Figure
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 639px) 50vw, (max-width: 1023px) 50vw, 25vw"
                    wrapperClassName="card-media relative w-full overflow-hidden"
                    aspect={offset ? "1/1" : "3/4"}
                  />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "filmstrip") {
    return (
      <section className={`section${toneClass}`} data-section="work-gallery">
        <div className="shell">
          {header}
          <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-2 lg:-mx-10 lg:px-10" style={{ scrollbarWidth: "none" }}>
            {entries.map((item, index) => (
              <Reveal
                key={item.src}
                delayMs={stagger(index)}
                className="lift w-[70vw] flex-none sm:w-[40vw] lg:w-[24vw]"
              >
                <Figure
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 639px) 70vw, (max-width: 1023px) 40vw, 24vw"
                  wrapperClassName="card-media relative w-full overflow-hidden"
                  aspect="4/3"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`section${toneClass}`} data-section="work-gallery">
      <div className="shell">
        {header}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {entries.map((item, index) => (
            <Reveal key={item.src} delayMs={stagger(index)} className="lift">
              <Figure
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 639px) 50vw, (max-width: 1023px) 50vw, 25vw"
                wrapperClassName="card-media relative aspect-[4/3] w-full overflow-hidden"
                aspect="4/3"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
