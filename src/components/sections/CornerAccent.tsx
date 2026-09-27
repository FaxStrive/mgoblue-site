// CornerAccent
//
// A small decorative element pinned to one corner of a section: a number,
// a short label, a rotated caption, an SVG rule. This is literally the
// "stuff in the corners" the operator asked for; it is deliberately tiny
// and out of the way, not a competing headline.
//
// `aria-hidden="true"` always, because it is decoration layered over a
// section that already carries its own real heading and copy in normal
// flow. A screen reader visitor loses nothing by never hearing this.
//
// Absolutely positioned, so it does NOT affect the layout of anything
// around it, and it never widens the page: `overflow: hidden` on the
// nearest positioned ancestor (every `.section` already has
// `position: relative`) means it clips at the section edge rather than
// spilling past it.
//
// Reduced motion: this component renders no animation. If a future build
// wants the label to fade or slide in, wrap the mount site in `Reveal`
// rather than animating inside this component, so the same
// reduced-motion-safe reveal logic applies here as everywhere else.
//
// The trap: `corner` positions the element near an edge, and a caption
// with real text at a small font size close to a section's edge is an easy
// way to trip the tap-target and overflow checks if it is ever made
// interactive. Keep this non-interactive (no link, no button) or its whole
// premise as an ignorable decoration breaks.

import type { CSSProperties } from "react";

export interface CornerAccentProps {
  label: string;
  corner?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  rotate?: number;
}

export default function CornerAccent({ label, corner = "top-right", rotate = 0 }: CornerAccentProps) {
  const [vertical, horizontal] = corner.split("-") as ["top" | "bottom", "left" | "right"];

  const style: CSSProperties = {
    position: "absolute",
    [vertical]: 24,
    [horizontal]: 24,
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
    pointerEvents: "none",
    whiteSpace: "nowrap",
  };

  return (
    <span aria-hidden="true" className="eyebrow" style={style}>
      {label}
    </span>
  );
}
