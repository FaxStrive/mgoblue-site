// ProofBand
//
// A thin strip that sits right under the hero. Three variants:
//   "numbers"  - a row of real client numbers (years, jobs, whatever the
//                client actually gave us). Renders null with no items.
//   "promise"  - a row of short promise lines for a client with no real
//                numbers to show. Renders null with no items. This is the
//                honest fallback, not a numbers strip with invented figures.
//   "none"     - no strip at all. Renders null unconditionally. For a page
//                where the hero should run straight into the next section
//                with no proof band between them.
//
// Never pick which variant to use inside this component from a hardcoded
// default: the caller decides, based on whether the client has real
// numbers, and passes the matching variant plus its items.

export interface ProofItem {
  /** "numbers" variant: a stat like "12 yrs" or "400+". "promise" variant: a short claim line, from the client. */
  value: string;
  /** One line describing the value. */
  label: string;
}

export type ProofBandVariant = "numbers" | "promise" | "none";

export interface ProofBandProps {
  variant: ProofBandVariant;
  items?: ProofItem[];
}

export default function ProofBand({ variant, items = [] }: ProofBandProps) {
  if (variant === "none") {
    return null;
  }

  if (items.length === 0) {
    return null;
  }

  if (variant === "promise") {
    return (
      <section className="section on-dark">
        <div className="shell">
          <ul className="grid grid-cols-1 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0" style={{ borderColor: "rgba(255,255,255,0.16)" }}>
            {items.map((item, index) => (
              <li
                key={`${item.label}-${index}`}
                className="flex items-center justify-center px-6 py-4 text-center text-sm tracking-wide"
                style={{ borderColor: "rgba(255,255,255,0.16)" }}
              >
                {item.value ? `${item.value}: ${item.label}` : item.label}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section className="section on-alt">
      <div className="shell">
        <ul className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {items.map((item, index) => (
            <li key={`${item.value}-${index}`} className="flex flex-col gap-1">
              <span className="font-heading text-4xl" style={{ color: "var(--color-ink)" }}>
                {item.value}
              </span>
              <span className="text-sm" style={{ color: "var(--color-ink-muted)" }}>
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
