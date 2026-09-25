// WaterHook
//
// The "problem" section: names what is wrong with the visitor's water and
// invites them to find out for themselves. Renders null without a
// headline. Image is optional; the section still reads fine as text-only.

import Image from "next/image";

export interface WaterHookProps {
  headline?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function WaterHook({ headline, body, ctaLabel, ctaHref, imageSrc, imageAlt }: WaterHookProps) {
  if (!headline) {
    return null;
  }

  return (
    <section className="section">
      <div className="shell grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="mb-6">{headline}</h2>
          {body ? (
            <p className="lede mb-8 max-w-xl">{body}</p>
          ) : null}
          {ctaLabel && ctaHref ? (
            <a href={ctaHref} className="btn btn-primary btn-sweep" data-cta="quote">
              <span>{ctaLabel}</span>
              <span className="btn-arrow" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
              </span>
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
