// AboutBody
//
// The /about page: the origin story, a values grid, and an optional
// milestones list. Renders null with no story. This is a page BODY, not
// the page hero: mount a VideoHero above it for the page's one h1.

export interface AboutValue {
  title: string;
  description?: string;
}

export interface AboutMilestone {
  /** Free text from the client, e.g. a year or a short label. Not generated. */
  marker: string;
  description: string;
}

export interface AboutBodyProps {
  eyebrow?: string;
  headline?: string;
  story?: string;
  values?: AboutValue[];
  milestonesHeadline?: string;
  milestones?: AboutMilestone[];
}

export default function AboutBody({
  eyebrow,
  headline,
  story,
  values = [],
  milestonesHeadline,
  milestones = [],
}: AboutBodyProps) {
  if (!headline || !story) {
    return null;
  }

  const valueItems = values.filter((value) => Boolean(value.title));
  const milestoneItems = milestones.filter((item) => Boolean(item.marker) && Boolean(item.description));

  return (
    <>
      <section className="section">
        <div className="shell max-w-3xl">
          {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
          <h2 className="mb-8">{headline}</h2>
          <p className="lede">{story}</p>
        </div>
      </section>

      {valueItems.length > 0 ? (
        <section className="section on-alt">
          <div className="shell">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              {valueItems.map((value) => (
                <div key={value.title} className="flex flex-col gap-3">
                  <h3>{value.title}</h3>
                  {value.description ? (
                    <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>
                      {value.description}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {milestoneItems.length > 0 ? (
        <section className="section">
          <div className="shell">
            {milestonesHeadline ? <h2 className="mb-16">{milestonesHeadline}</h2> : null}
            <ol className="flex flex-col" style={{ borderTop: "1px solid var(--color-border)" }}>
              {milestoneItems.map((item) => (
                <li
                  key={`${item.marker}-${item.description}`}
                  className="grid grid-cols-1 gap-2 py-8 sm:grid-cols-12 sm:gap-8"
                  style={{ borderBottom: "1px solid var(--color-border)" }}
                >
                  <span className="font-heading text-2xl sm:col-span-3" style={{ color: "var(--color-accent-text)" }}>
                    {item.marker}
                  </span>
                  <p className="sm:col-span-9" style={{ color: "var(--color-ink-muted)" }}>
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}
    </>
  );
}
