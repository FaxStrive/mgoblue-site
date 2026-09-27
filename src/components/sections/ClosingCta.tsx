// ClosingCta
//
// The last push before the footer: a short headline, an optional video or
// image background, and one or two calls to action. Renders null without
// a headline. Three variants:
//   "band"  - the full-bleed dark band, video or image behind a scrim,
//             copy centered over it. (default)
//   "split" - headline and CTAs on one side, the video or image confined
//             to the other side, never behind the type.
//   "quiet" - no band, no background media at all: a single line of type
//             and one link, left-aligned, on the page's own background.

import Image from "next/image";
import Figure from "./Figure";

export type ClosingCtaVariant = "band" | "split" | "quiet";

export interface ClosingCtaProps {
  headline?: string;
  subhead?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  videoSrc?: string;
  posterSrc?: string;
  posterAlt?: string;
  variant?: ClosingCtaVariant;
}

export default function ClosingCta({
  headline,
  subhead,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  videoSrc,
  posterSrc,
  posterAlt,
  variant = "band",
}: ClosingCtaProps) {
  if (!headline) {
    return null;
  }

  const hasMedia = Boolean(videoSrc || posterSrc);

  if (variant === "quiet") {
    return (
      <section className="section">
        <div className="shell">
          <div className="flex flex-col gap-4" style={{ borderTop: "1px solid var(--color-border)", paddingTop: "40px" }}>
            <h2>{headline}</h2>
            {subhead ? <p className="lede max-w-2xl" style={{ color: "var(--color-ink-muted)" }}>{subhead}</p> : null}
            {primaryCtaLabel && primaryCtaHref ? (
              <a href={primaryCtaHref} className="text-sm font-semibold" style={{ color: "var(--color-accent-text)" }} data-cta="quote">
                {primaryCtaLabel}
              </a>
            ) : null}
            {secondaryCtaLabel && secondaryCtaHref ? (
              <a href={secondaryCtaHref} className="text-sm font-semibold" style={{ color: "var(--color-ink-muted)" }}>
                {secondaryCtaLabel}
              </a>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "split") {
    return (
      <section className="section on-dark relative overflow-hidden">
        <div className="shell grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2>{headline}</h2>
            {subhead ? <p className="lede mt-4">{subhead}</p> : null}
            {(primaryCtaLabel && primaryCtaHref) || (secondaryCtaLabel && secondaryCtaHref) ? (
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {primaryCtaLabel && primaryCtaHref ? (
                  <a href={primaryCtaHref} className="btn btn-primary btn-sweep" data-cta="quote">
                    <span>{primaryCtaLabel}</span>
                    <span className="btn-arrow" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
                    </span>
                  </a>
                ) : null}
                {secondaryCtaLabel && secondaryCtaHref ? (
                  <a href={secondaryCtaHref} className="btn btn-on-dark btn-sweep">
                    {secondaryCtaLabel}
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
          <div className="relative min-h-[280px] overflow-hidden lg:col-span-5">
            {videoSrc ? (
              <video className="absolute inset-0 h-full w-full object-cover" muted autoPlay loop playsInline poster={posterSrc} preload="metadata">
                <source src={videoSrc} type="video/mp4" />
              </video>
            ) : posterSrc ? (
              <Figure
                src={posterSrc}
                alt={posterAlt ?? ""}
                fill
                sizes="(max-width: 1023px) 100vw, 40vw"
                wrapperClassName="absolute inset-0 h-full w-full"
                aspect="free"
              />
            ) : (
              <div className="absolute inset-0" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
            )}
          </div>
        </div>
      </section>
    );
  }

  const content = (
    <div className="shell relative z-10 text-center">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
        <h2>{headline}</h2>
        {subhead ? <p className="lede">{subhead}</p> : null}
        {(primaryCtaLabel && primaryCtaHref) || (secondaryCtaLabel && secondaryCtaHref) ? (
          <div className="flex flex-wrap items-center justify-center gap-4">
            {primaryCtaLabel && primaryCtaHref ? (
              <a href={primaryCtaHref} className="btn btn-primary btn-sweep" data-cta="quote">
                <span>{primaryCtaLabel}</span>
                <span className="btn-arrow" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
                </span>
              </a>
            ) : null}
            {secondaryCtaLabel && secondaryCtaHref ? (
              <a href={secondaryCtaHref} className="btn btn-on-dark btn-sweep">
                {secondaryCtaLabel}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <section className="section on-dark relative overflow-hidden" style={hasMedia ? { padding: 0 } : undefined}>
      {hasMedia ? (
        <div className="relative" data-aspect="free" style={{ minHeight: 480 }}>
          {videoSrc ? (
            <video className="absolute inset-0 h-full w-full object-cover" muted autoPlay loop playsInline poster={posterSrc} preload="metadata">
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : posterSrc ? (
            <Image src={posterSrc} alt={posterAlt ?? ""} fill sizes="100vw" className="object-cover" />
          ) : null}
          <div
            className="relative flex items-center"
            style={{ minHeight: 480, backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.68), rgba(0,0,0,0.68))" }}
          >
            <div className="w-full py-16">{content}</div>
          </div>
        </div>
      ) : (
        content
      )}
    </section>
  );
}
