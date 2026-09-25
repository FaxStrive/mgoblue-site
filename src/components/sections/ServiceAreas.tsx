// ServiceAreas
//
// Coverage areas, grouped by metro or region. Renders null with no areas.

export interface ServiceAreaGroup {
  name: string;
  subtitle?: string;
  /** Cities or neighborhoods within this group, free text from the client. */
  places?: string[];
}

export interface ServiceAreasProps {
  eyebrow?: string;
  headline?: string;
  areas?: ServiceAreaGroup[];
  tone?: "light" | "alt";
}

export default function ServiceAreas({ eyebrow, headline, areas = [], tone = "alt" }: ServiceAreasProps) {
  const items = areas.filter((area) => Boolean(area.name));

  if (items.length === 0) {
    return null;
  }

  return (
    <section className={`section${tone === "alt" ? " on-alt" : ""}`}>
      <div className="shell">
        {(eyebrow || headline) && (
          <div className="mb-16">
            {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
            {headline ? <h2>{headline}</h2> : null}
          </div>
        )}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {items.map((area) => (
            <div
              key={area.name}
              className="lift p-8"
              style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
            >
              <h3 className="mb-1">{area.name}</h3>
              {area.subtitle ? (
                <div className="mb-6 text-xs font-medium uppercase tracking-wide" style={{ color: "var(--color-ink-muted)" }}>
                  {area.subtitle}
                </div>
              ) : null}
              {area.places && area.places.length > 0 ? (
                <ul className="text-sm" style={{ color: "var(--color-ink-muted)", listStyle: "none", padding: 0, margin: 0 }}>
                  {area.places.map((place) => (
                    <li key={place} style={{ display: "inline" }}>{place}{area.places && area.places.indexOf(place) < area.places.length - 1 ? ", " : ""}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
