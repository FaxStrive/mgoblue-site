// Process
//
// The numbered how-it-works steps. Renders null with no steps. Step order
// follows array order; numerals are generated from the index so the
// client never has to keep a number in sync with the copy. Three variants:
//   "steps"    - four columns of numbered steps, side by side. (default)
//   "timeline" - a single vertical spine down the left with each step as a
//                dated node off it, read top to bottom.
//   "diagram"  - steps as a horizontal chain of connected nodes with a
//                joining line between them, read left to right.

export interface ProcessStep {
  title: string;
  description?: string;
}

export type ProcessVariant = "steps" | "timeline" | "diagram";

export interface ProcessProps {
  eyebrow?: string;
  headline?: string;
  steps?: ProcessStep[];
  tone?: "light" | "dark";
  variant?: ProcessVariant;
}

export default function Process({ eyebrow, headline, steps = [], tone = "light", variant = "steps" }: ProcessProps) {
  const items = steps.filter((step) => Boolean(step.title));

  if (items.length === 0) {
    return null;
  }

  const isDark = tone === "dark";
  const lineColor = isDark ? "rgba(255,255,255,0.28)" : "var(--color-border)";
  const header = (eyebrow || headline) && (
    <div className="mb-20">
      {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
      {headline ? <h2>{headline}</h2> : null}
    </div>
  );

  if (variant === "timeline") {
    return (
      <section className={`section${isDark ? " on-dark" : ""}`}>
        <div className="shell relative">
          {header}
          <ol className="relative flex flex-col gap-16 pl-10 sm:pl-14" style={{ borderLeft: `1px solid ${lineColor}` }}>
            {items.map((step, index) => (
              <li key={step.title} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute flex items-center justify-center font-heading text-sm"
                  style={{
                    left: "-2.9rem",
                    top: 0,
                    width: 40,
                    height: 40,
                    color: isDark ? "var(--color-accent-text-on-dark)" : "var(--color-accent-text)",
                    border: `1px solid ${lineColor}`,
                    backgroundColor: isDark ? "var(--color-surface-deep)" : "var(--color-surface)",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                {step.description ? (
                  <p className="mt-2 max-w-xl" style={{ color: isDark ? "rgba(255,255,255,0.72)" : "var(--color-ink-muted)" }}>
                    {step.description}
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  if (variant === "diagram") {
    return (
      <section className={`section${isDark ? " on-dark" : ""}`}>
        <div className="shell relative">
          {header}
          <ol className="flex flex-col gap-10 overflow-x-auto sm:flex-row sm:items-start sm:gap-0">
            {items.map((step, index) => (
              <li key={step.title} className="flex flex-1 items-start sm:flex-col">
                <div className="flex items-center sm:w-full">
                  <span
                    aria-hidden="true"
                    className="flex flex-none items-center justify-center font-heading"
                    style={{
                      width: 56,
                      height: 56,
                      color: isDark ? "var(--color-accent-text-on-dark)" : "var(--color-accent-text)",
                      border: `1px solid ${lineColor}`,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {index < items.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="mx-4 hidden h-px flex-1 sm:block"
                      style={{ backgroundColor: lineColor }}
                    />
                  ) : null}
                </div>
                <div className="mt-4 pr-6 sm:pr-8">
                  <h3>{step.title}</h3>
                  {step.description ? (
                    <p className="mt-2" style={{ color: isDark ? "rgba(255,255,255,0.72)" : "var(--color-ink-muted)" }}>
                      {step.description}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section className={`section${isDark ? " on-dark" : ""}`}>
      <div className="shell relative">
        {header}
        <ol className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {items.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-3">
              <span
                className="font-heading text-5xl"
                style={isDark ? undefined : { color: "var(--color-accent-text)" }}
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              {step.description ? (
                <p style={{ color: isDark ? "rgba(255,255,255,0.72)" : "var(--color-ink-muted)" }}>
                  {step.description}
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
