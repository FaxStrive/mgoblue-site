// FollowTheWater
//
// The single most distinctive device on the reference site the operator named
// as the standard: a numbered flow diagram that walks the water from where it
// comes in to where you drink it, on a dark section, drawn entirely in CSS and
// SVG. No photograph, because a photograph of a pipe explains nothing; a
// diagram of the route explains the whole product in one glance.
//
// The stages are not decoration and are not written here. They come from the
// client's facts file, so the diagram can only ever describe systems the
// client actually sells. A client whose facts name fewer than MIN_STAGES
// stages does not get a flow diagram with invented links in it: the section
// renders null and the page is one section shorter.
//
// Static by design. There is no animated flow along the line, because motion
// on a diagram reads as a loading state, and because gate 9 requires a
// reduced-motion visitor to see zero animation. A drawn line that does not
// move is also what the reference site does.

const MIN_STAGES = 3;

export interface WaterStage {
  /** What this stage is, in the client's own words. */
  label: string;
  /** One line on what happens here. Taken from the client's own description. */
  note?: string;
}

export interface FollowTheWaterProps {
  eyebrow?: string;
  headline?: string;
  subhead?: string;
  stages?: WaterStage[];
  ctaLabel?: string;
  ctaHref?: string;
}

/**
 * The glyph for a stage, chosen by position rather than by guessing at the
 * copy: the first stage is where the water arrives, the last is the tap you
 * drink from, and everything between is a vessel the water passes through.
 * Drawn at 48x48 on a 24-unit grid so every glyph shares one stroke weight.
 */
function StageGlyph({ position, count }: { position: number; count: number }) {
  const common = {
    width: 48,
    height: 48,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (position === 0) {
    // the supply arriving: a main coming in through the wall
    return (
      <svg {...common}>
        <path d="M2 4v16" />
        <path d="M2 12h13" />
        <path d="M15 9h5v6h-5z" />
        <path d="M17.5 15v4" />
      </svg>
    );
  }

  if (position === count - 1) {
    // the tap you drink from, and the glass under it
    return (
      <svg {...common}>
        <path d="M6 4h6a4 4 0 0 1 4 4v2" />
        <path d="M4 4h4" />
        <path d="M16 12v1" />
        <path d="M13 17h6l-.7 4h-4.6z" />
      </svg>
    );
  }

  // a vessel the water passes through: a tank with a control head on top
  return (
    <svg {...common}>
      <path d="M8 7h8v12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z" />
      <path d="M9.5 7V5.5h5V7" />
      <path d="M11 4h2" />
      <path d="M8 13h8" />
    </svg>
  );
}

export default function FollowTheWater({
  eyebrow,
  headline,
  subhead,
  stages = [],
  ctaLabel,
  ctaHref,
}: FollowTheWaterProps) {
  const items = stages.filter((stage) => Boolean(stage.label));

  // Fewer than three stages is not a journey, it is a pair of boxes with a
  // line between them. The section is left out rather than padded.
  if (items.length < MIN_STAGES) {
    return null;
  }

  return (
    <section className="section on-dark" data-section="follow-the-water" data-flow-diagram="water">
      <div className="shell">
        {(eyebrow || headline || subhead) && (
          <div className="mb-16 max-w-2xl">
            {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
            {headline ? <h2>{headline}</h2> : null}
            {subhead ? <p className="lede mt-4">{subhead}</p> : null}
          </div>
        )}

        <ol className="ftw-track">
          {items.map((stage, index) => (
            <li key={stage.label} className="ftw-stage" data-flow-stage={index + 1}>
              <div className="ftw-rail" aria-hidden="true">
                <span className={`ftw-line ftw-line-in${index === 0 ? " is-hidden" : ""}`} />
                <span className="ftw-node">
                  <StageGlyph position={index} count={items.length} />
                </span>
                <span className={`ftw-line ftw-line-out${index === items.length - 1 ? " is-hidden" : ""}`} />
              </div>
              <span className="ftw-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="ftw-label">{stage.label}</h3>
              {stage.note ? <p className="ftw-note">{stage.note}</p> : null}
            </li>
          ))}
        </ol>

        {ctaLabel && ctaHref ? (
          <div className="mt-16">
            <a href={ctaHref} className="btn btn-primary btn-sweep" data-cta="quote">
              <span>{ctaLabel}</span>
              <span className="btn-arrow" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
              </span>
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
