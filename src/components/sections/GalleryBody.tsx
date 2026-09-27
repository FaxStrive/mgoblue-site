// GalleryBody
//
// The /gallery page: an intro and the filterable Gallery widget from
// components/interactive. Renders null with no headline. This is a page
// BODY, not the page hero: mount a VideoHero above it for the page's one
// h1.
//
// Every visitor word here is a prop, including the gallery widget's own
// heading and subhead. With no photos to show, Gallery renders null and the
// intro carries the page on its own. The words that say whose photos these
// are belong to copy.md, which knows, and not to a component, which does
// not.

import Gallery, { type GalleryItem } from "../interactive/Gallery";
import type { ClientFacts } from "../interactive/facts";

export interface GalleryBodyProps {
  eyebrow?: string;
  headline?: string;
  intro?: string;
  /** The gallery widget's own heading and subhead. Must match the photos. */
  galleryHeading?: string;
  gallerySubhead?: string;
  items?: GalleryItem[];
  categories?: string[];
}

export default function GalleryBody({
  eyebrow,
  headline,
  intro,
  galleryHeading,
  gallerySubhead,
  items = [],
  categories = [],
}: GalleryBodyProps) {
  if (!headline) {
    return null;
  }

  const facts: ClientFacts = categories.length > 0 ? { gallery: { categories } } : {};

  return (
    <section className="section">
      <div className="shell">
        <div className="mb-16 max-w-2xl">
          {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
          <h2 className="mb-6">{headline}</h2>
          {intro ? <p className="lede">{intro}</p> : null}
        </div>
        <Gallery heading={galleryHeading} subhead={gallerySubhead} items={items} facts={facts} />
      </div>
    </section>
  );
}
