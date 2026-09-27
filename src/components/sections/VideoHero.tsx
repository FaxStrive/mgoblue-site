"use client";

// VideoHero
//
// The single h1 of the page lives here. Only ever mount one VideoHero per
// page. Renders null when there is no headline, because a hero with no
// headline is not a smaller hero, it is a placeholder.
//
// Four variants:
//   "full-bleed" - video fills the section, copy sits left over a scrim.
//   "split"      - video fills one side, a lead form fills the other.
//   "centered"   - video fills the section, copy is centered over a scrim.
//   "statement"  - always a still photograph, never video even if a
//                  videoSrc is passed: one large claim set low over the
//                  frame with a bottom-up scrim, no eyebrow-headline-
//                  subhead stack centered or left like the other three.
//
// Video is muted, autoplay, loop, playsInline, with a poster. If no
// videoSrc is given the section still renders on posterSrc alone (a still
// hero image is a legitimate, common case, not a broken video).

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import Reveal from "../motion/Reveal";
import Figure from "./Figure";

export type VideoHeroVariant = "full-bleed" | "split" | "centered" | "statement";

export interface VideoHeroProps {
  variant: VideoHeroVariant;
  eyebrow?: string;
  headline?: string;
  /** Optional second line of the h1 rendered in the brand accent color for two-tone treatment. */
  accentLine?: string;
  subhead?: string;
  videoSrc?: string;
  posterSrc?: string;
  posterAlt?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  /** Split variant only: the form or widget rendered on the opposite side of the video. */
  formSlot?: ReactNode;
}

function HeroMedia({ videoSrc, posterSrc, posterAlt }: { videoSrc?: string; posterSrc?: string; posterAlt?: string }) {
  if (videoSrc) {
    return (
      <video
        className="absolute inset-0 h-full w-full object-cover"
        muted
        autoPlay
        loop
        playsInline
        poster={posterSrc}
        preload="metadata"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    );
  }
  if (posterSrc) {
    return <Image src={posterSrc} alt={posterAlt ?? ""} fill sizes="100vw" className="object-cover" priority />;
  }
  return null;
}

export default function VideoHero({
  variant,
  eyebrow,
  headline,
  accentLine,
  subhead,
  videoSrc,
  posterSrc,
  posterAlt,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  formSlot,
}: VideoHeroProps) {
  const mediaRef = useRef<HTMLDivElement>(null);

  // Light parallax on the hero media only, and only when the visitor has
  // not asked for reduced motion. rAF-throttled scroll listener, torn down
  // on unmount. The media is scaled up 1.12x so the translate never
  // exposes an edge underneath it.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const node = mediaRef.current;
    if (!node) {
      return;
    }
    let frame: number | null = null;
    function applyOffset() {
      const offset = Math.min(window.scrollY * 0.18, 120);
      if (node) {
        node.style.transform = `translate3d(0, ${offset}px, 0) scale(1.12)`;
      }
      frame = null;
    }
    function onScroll() {
      if (frame !== null) {
        return;
      }
      frame = window.requestAnimationFrame(applyOffset);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  if (!headline) {
    return null;
  }

  const hasMedia = Boolean(videoSrc || posterSrc);

  if (variant === "statement") {
    // Always a still. A videoSrc, if one was passed, is deliberately
    // ignored here rather than silently played: this is the one shape
    // that promises "no video" by construction.
    return (
      <>
        <section className="section on-dark relative overflow-hidden hero-full-bleed">
          {posterSrc ? (
            <div ref={mediaRef} className="absolute inset-0" style={{ transform: "scale(1.12)" }}>
              <Figure
                src={posterSrc}
                alt={posterAlt ?? ""}
                fill
                sizes="100vw"
                priority
                wrapperClassName="relative h-full w-full"
                aspect="free"
              />
            </div>
          ) : null}
          <div
            className="relative flex h-full items-end"
            style={{
              minHeight: "inherit",
              backgroundImage: posterSrc ? "linear-gradient(to top, rgba(0,0,0,0.78), rgba(0,0,0,0) 55%)" : undefined,
            }}
          >
            <div className="shell relative z-10 w-full pb-16 pt-40">
              <Reveal className="flex max-w-3xl flex-col gap-6">
                {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
                <h1>{headline}</h1>
                {subhead ? <p className="lede max-w-xl">{subhead}</p> : null}
                {(primaryCtaLabel && primaryCtaHref) || (secondaryCtaLabel && secondaryCtaHref) ? (
                  <div className="flex flex-wrap items-center gap-4">
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
              </Reveal>
            </div>
          </div>
        </section>
        <div data-hero-end="" aria-hidden="true" style={{ height: 0 }} />
      </>
    );
  }

  if (variant === "split") {
    return (
      <>
        <section className="section on-dark overflow-hidden">
          <div className="shell grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <Reveal className="flex flex-col gap-8">
              {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
              <h1>
                {headline}
                {accentLine ? (
                  <>
                    <br />
                    <span style={{ color: "var(--color-accent-text-on-dark)" }}>{accentLine}</span>
                  </>
                ) : null}
              </h1>
              {subhead ? <p className="lede">{subhead}</p> : null}
              {(primaryCtaLabel && primaryCtaHref) || (secondaryCtaLabel && secondaryCtaHref) ? (
                <div className="flex flex-wrap items-center gap-4">
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
            </Reveal>
            <div className="relative min-h-[320px] overflow-hidden">
              {hasMedia ? (
                <div ref={mediaRef} className="absolute inset-0" data-aspect="free" style={{ transform: "scale(1.12)" }}>
                  <HeroMedia videoSrc={videoSrc} posterSrc={posterSrc} posterAlt={posterAlt} />
                </div>
              ) : formSlot ? (
                <div className="flex h-full items-center p-8" style={{ backgroundColor: "var(--color-surface)" }}>
                  <div className="w-full">{formSlot}</div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
        <div data-hero-end="" aria-hidden="true" style={{ height: 0 }} />
      </>
    );
  }

  const isCentered = variant === "centered";
  const isFullBleed = variant === "full-bleed";
  // The full-bleed variant is exactly one viewport, like the reference
  // site's hero. "centered" keeps its own fixed minimum, since it is used
  // for shorter interior-page heroes, not the home page hero.
  const sectionClassName = `section on-dark relative overflow-hidden${isFullBleed ? " hero-full-bleed" : ""}`;
  const sectionStyle = isFullBleed ? undefined : { minHeight: "640px" };
  const innerStyle = isFullBleed
    ? {
        minHeight: "inherit",
        backgroundImage: hasMedia
          ? "linear-gradient(to right, rgba(0,0,0,0.65), rgba(0,0,0,0.55))"
          : undefined,
      }
    : {
        minHeight: "640px",
        backgroundImage: hasMedia
          ? "linear-gradient(to right, rgba(0,0,0,0.65), rgba(0,0,0,0.55))"
          : undefined,
      };

  return (
    <>
      <section className={sectionClassName} style={sectionStyle}>
        {hasMedia ? (
          <div ref={mediaRef} className="absolute inset-0" data-aspect="free" style={{ transform: "scale(1.12)" }}>
            <HeroMedia videoSrc={videoSrc} posterSrc={posterSrc} posterAlt={posterAlt} />
          </div>
        ) : null}
        <div
          className="relative flex items-center"
          style={innerStyle}
        >
          <div className={`shell relative z-10 ${isCentered ? "text-center" : ""}`}>
            <Reveal className={isCentered ? "mx-auto flex max-w-3xl flex-col items-center gap-8" : "flex max-w-2xl flex-col gap-8"}>
              {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
              <h1>{headline}</h1>
              {subhead ? <p className="lede">{subhead}</p> : null}
              {(primaryCtaLabel && primaryCtaHref) || (secondaryCtaLabel && secondaryCtaHref) ? (
                <div className={`flex flex-wrap items-center gap-4 ${isCentered ? "justify-center" : ""}`}>
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
            </Reveal>
          </div>
        </div>
      </section>
      <div data-hero-end="" aria-hidden="true" style={{ height: 0 }} />
    </>
  );
}
