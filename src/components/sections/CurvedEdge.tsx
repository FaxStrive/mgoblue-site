"use client";

// Divider
//
// The one divider component. A section asks for a divider because its tone
// changed underneath it; it never picks the shape itself. The shape comes
// from --divider-shape (straight | curved | angled | none), set per style in
// brand.css, and this component reads that variable rather than hardcoding
// a curve the way the old CurvedEdge did.
//
// Reading --divider-shape has to happen after mount: a CSS custom property
// set on :root is not something a server component (or a browser before
// paint) can see, so this follows the exact pattern `Reveal` already uses
// for the same reason (see ../motion/Reveal.tsx) - render a safe default on
// the server, correct it once in a `useEffect` after hydration, never
// during the render React diffs against the server markup. The default
// mirrors the divider's old, always-curved behaviour, so a visitor who
// never gets the follow-up paint (JS disabled, a slow connection) still
// sees a static edge rather than nothing.
//
// "none" hides the divider entirely once the real value is known: a style
// with no divider renders NOTHING here, not an empty gap held open by a
// leftover element.
//
// Static in every style. An edge is never animated, so unlike Reveal there
// is no transition to gate behind prefers-reduced-motion; there is nothing
// moving to begin with.

import { useEffect, useState } from "react";

export type DividerShape = "straight" | "curved" | "angled" | "wave" | "none";

// THE WAVE SHAPE (2026-09-24). "curved" was a single quadratic bump across
// the full 1440 width, about 28 units deep in a 100-unit viewBox rendered
// into a box as short as 44px: one crest, tiny amplitude, "technically a
// curve, visually nothing" per the operator. Wave replaces it for the wavy
// style: two cubic segments per direction, a taller 120-unit viewBox, and a
// height of its own so the amplitude is real at 1440px instead of clamped
// down with every other divider shape.
//
// The wave gets a dedicated custom property, --divider-height-wave, instead
// of reusing --divider-height: the generic height token is tuned for a
// single quadratic bump and stays small (as low as 44px) for the other three
// shapes, which is exactly the amplitude problem this shape exists to fix.
// A style that sets --divider-shape: wave without also setting
// --divider-height-wave still gets the fallback below, which is tall enough
// on its own.
const WAVE_VIEWBOX_HEIGHT = 120;
const WAVE_HEIGHT_PX_DEFAULT = 150;

// Front path control points were sampled (80 points per cubic segment,
// matching bin/assert-style-renders.mjs) to confirm the shape before it
// shipped, not guessed:
//   viewBox y range across the curve: 29.88 to 100.12, so 70.23 units of 120
//   amplitude in CSS px at the default 150px rendered height:
//     70.23 / 120 * 150 = 87.8px
//   floor is 48px at a 1440 viewport, so this clears it with 1.8x margin.
// The same sampling counts 3 local extrema (a sign change in the y gradient
// each time the curve turns), which reads as two crests either side of one
// trough - the wave family this file uses is symmetric, so "up" and "down"
// measure identically.
const WAVE_CRESTS = 3;
const WAVE_AMPLITUDE_PX = 87;

const WAVE_PATHS: Record<"up" | "down", { front: string; back: string }> = {
  up: {
    front: "M0 120 L0 90 C180 40 300 40 480 75 C660 110 780 110 960 65 C1140 20 1260 20 1440 55 L1440 120 Z",
    // Back wave: distinct control points, not a shifted copy of the front
    // path, so its two crests sit at different x positions (phase-shifted)
    // and read as a second wave line behind the first, not a shadow under it.
    back: "M0 120 L0 78 C260 35 420 35 620 68 C820 100 980 100 1180 60 C1300 38 1380 30 1440 45 L1440 120 Z",
  },
  down: {
    // Vertical mirror of "up" (y -> 120 - y): same amplitude and crest count,
    // filled from the top of the box down instead of the bottom up.
    front: "M0 0 L0 30 C180 80 300 80 480 45 C660 10 780 10 960 55 C1140 100 1260 100 1440 65 L1440 0 Z",
    back: "M0 0 L0 42 C260 85 420 85 620 52 C820 20 980 20 1180 60 C1300 82 1380 90 1440 75 L1440 0 Z",
  },
};

export interface DividerProps {
  /** The colour of the section BELOW the edge, which is what the shape fills. */
  into?: "light" | "alt" | "dark";
  /** Which way the shape bulges. "up" reaches into the section above. */
  direction?: "up" | "down";
}

const FILL: Record<string, string> = {
  light: "var(--color-surface)",
  alt: "var(--color-surface-alt)",
  dark: "var(--color-surface-deep)",
};

function pathFor(shape: DividerShape, direction: "up" | "down"): string | null {
  if (shape === "none") {
    return null;
  }
  if (shape === "wave") {
    // Wave is drawn as two paths (see WAVE_PATHS and the wave branch of
    // Divider below), never as the single string this function returns for
    // every other shape.
    return null;
  }
  if (shape === "straight") {
    return direction === "up" ? "M0 100 L0 52 L1440 52 L1440 100 Z" : "M0 0 L0 48 L1440 48 L1440 0 Z";
  }
  if (shape === "angled") {
    return direction === "up"
      ? "M0 100 L0 70 L1440 20 L1440 100 Z"
      : "M0 0 L0 30 L1440 80 L1440 0 Z";
  }
  // curved, and the fallback for any unrecognised value: a single quadratic
  // curve across the full width, matching the shape the old CurvedEdge drew.
  return direction === "up"
    ? "M0 100 L0 46 Q720 -24 1440 46 L1440 100 Z"
    : "M0 0 L0 54 Q720 124 1440 54 L1440 0 Z";
}

export default function Divider({ into = "dark", direction = "up" }: DividerProps) {
  // Server default: curved, so a no-JS or pre-hydration visitor always sees
  // a static edge, never a missing one. Corrected below once the style's
  // real --divider-shape is readable.
  const [shape, setShape] = useState<DividerShape>("curved");

  useEffect(() => {
    const value = getComputedStyle(document.documentElement).getPropertyValue("--divider-shape").trim();
    if (value === "straight" || value === "curved" || value === "angled" || value === "wave" || value === "none") {
      setShape(value);
    }
  }, []);

  const fill = FILL[into] ?? FILL.dark;

  if (shape === "none") {
    return null;
  }

  if (shape === "wave") {
    const paths = WAVE_PATHS[direction];
    // Pale means the same fill colour at reduced alpha, not a different
    // colour: color-mix keeps the back wave visibly the same water tone as
    // the front one, just quieter, so a viewer reads it as "the same wave,
    // further back" rather than an unrelated shape.
    const backFill = `color-mix(in srgb, ${fill} 55%, transparent)`;
    return (
      <div
        className="divider"
        data-divider="wave"
        data-wave-crests={WAVE_CRESTS}
        data-wave-amplitude={WAVE_AMPLITUDE_PX}
        aria-hidden="true"
        style={{ display: "block", lineHeight: 0, backgroundColor: "transparent" }}
      >
        <svg
          viewBox={"0 0 1440 " + WAVE_VIEWBOX_HEIGHT}
          preserveAspectRatio="none"
          focusable="false"
          style={{
            display: "block",
            width: "100%",
            height: "var(--divider-height-wave, " + WAVE_HEIGHT_PX_DEFAULT + "px)",
          }}
        >
          <path d={paths.back} fill={backFill} />
          <path d={paths.front} fill={fill} />
        </svg>
      </div>
    );
  }

  const d = pathFor(shape, direction);

  if (!d) {
    return null;
  }

  return (
    <div
      className="divider"
      data-divider={shape}
      aria-hidden="true"
      style={{ display: "block", lineHeight: 0, backgroundColor: "transparent" }}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        focusable="false"
        style={{ display: "block", width: "100%", height: "var(--divider-height, clamp(44px, 6vw, 96px))" }}
      >
        <path d={d} fill={fill} />
      </svg>
    </div>
  );
}

// Deprecated alias. `CurvedEdge` used to be the whole component, always
// curved. It now just forwards to `Divider`, which reads the style's real
// shape instead of hardcoding one - kept so an existing import site does not
// break, not because a caller should reach for this name in new code.
export type CurvedEdgeProps = DividerProps;

export function CurvedEdge(props: CurvedEdgeProps) {
  return <Divider {...props} />;
}
