"use client";

// Faq
//
// Accordion of question/answer pairs. Renders null with no items. Each
// panel animates its height with a CSS grid-template-rows transition
// (0fr -> 1fr), same technique as the Header dropdown, so there is no
// layout shift and no instant show/hide.

import { useId, useState } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqProps {
  eyebrow?: string;
  headline?: string;
  items?: FaqItem[];
}

function FaqRow({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div style={{ borderBottom: "1px solid var(--color-border)" }}>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-6 py-8 text-left"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <h3>{item.question}</h3>
        <span
          aria-hidden="true"
          className="shrink-0 text-2xl"
          style={{
            color: "var(--color-ink-muted)",
            transform: open ? "rotate(45deg)" : "none",
            transition: "transform var(--motion-base) ease",
          }}
        >
          +
        </span>
      </button>
      <div
        id={panelId}
        className="menu-anim grid"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows var(--motion-base) ease", overflow: "hidden" }}
      >
        <div className="min-h-0">
          <p className="pb-8" style={{ color: "var(--color-ink-muted)" }}>
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq({ eyebrow, headline, items = [] }: FaqProps) {
  const rows = items.filter((item) => Boolean(item.question) && Boolean(item.answer));

  if (rows.length === 0) {
    return null;
  }

  return (
    <section className="section">
      <div className="shell">
        {(eyebrow || headline) && (
          <div className="mb-16">
            {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
            {headline ? <h2>{headline}</h2> : null}
          </div>
        )}
        <div className="max-w-3xl" style={{ borderTop: "1px solid var(--color-border)" }}>
          {rows.map((item) => (
            <FaqRow key={item.question} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
