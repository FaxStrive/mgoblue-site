// OriginStory
//
// The "how we work" / "why we started" narrative section. Renders null
// without a headline and body. No years-in-business or founding-date
// claim is invented here; if the client gave one, it arrives as part of
// `body`, written in their own words.

import Image from "next/image";

export interface OriginStoryProps {
  eyebrow?: string;
  headline?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  tone?: "light" | "alt";
}

export default function OriginStory({
  eyebrow,
  headline,
  body,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
  tone = "light",
}: OriginStoryProps) {
  if (!headline || !body) {
    return null;
  }

  return (
    <section className={`section${tone === "alt" ? " on-alt" : ""}`}>
      <div className="shell grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
          <h2 className="mb-8">{headline}</h2>
          <p className="lede max-w-xl">{body}</p>
          {ctaLabel && ctaHref ? (
            <a href={ctaHref} className="mt-8 inline-block text-sm font-semibold" style={{ color: "var(--color-accent-text)" }}>
              {ctaLabel}
            </a>
          ) : null}
        </div>
        {imageSrc ? (
          <div className="relative aspect-[4/5] w-full lg:col-span-5" data-aspect="4/5" style={{ border: "1px solid var(--color-border)" }}>
            <Image src={imageSrc} alt={imageAlt ?? ""} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
