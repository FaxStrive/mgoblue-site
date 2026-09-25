// ContactBody
//
// The /contact page: a lead form plus the client's real contact details.
// Renders null with no formAction, since a form that posts nowhere is not
// a smaller form, it is a broken one. Static and server-rendered: the
// form posts with a plain HTML submit, no client JS required.

export interface ContactDetail {
  label: string;
  value: string;
  href?: string;
}

export interface ContactBodyProps {
  eyebrow?: string;
  headline?: string;
  intro?: string;
  /** Where the form submits. A client's own form endpoint, never a shared or placeholder one. */
  formAction?: string;
  submitLabel?: string;
  details?: ContactDetail[];
}

export default function ContactBody({
  eyebrow,
  headline,
  intro,
  formAction,
  submitLabel,
  details = [],
}: ContactBodyProps) {
  if (!formAction) {
    return null;
  }

  const detailItems = details.filter((detail) => Boolean(detail.label) && Boolean(detail.value));

  return (
    <section className="section">
      <div className="shell grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {eyebrow ? <span className="eyebrow mb-4 block">{eyebrow}</span> : null}
          {headline ? <h2 className="mb-6">{headline}</h2> : null}
          {intro ? <p className="lede mb-10">{intro}</p> : null}

          <form action={formAction} method="POST" className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-name" className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--color-ink-muted)" }}>
                Full name
              </label>
              <input
                id="contact-name"
                name="full_name"
                type="text"
                required
                className="h-12 px-4"
                style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-phone" className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--color-ink-muted)" }}>
                Phone
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                required
                className="h-12 px-4"
                style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-email" className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--color-ink-muted)" }}>
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                className="h-12 px-4"
                style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--color-ink-muted)" }}>
                What do you need help with
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                className="px-4 py-3"
                style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-sweep">
              {submitLabel ?? "Send"}
            </button>
          </form>
        </div>

        {detailItems.length > 0 ? (
          <div className="flex flex-col gap-6 lg:col-span-5">
            {detailItems.map((detail) => (
              <div key={detail.label}>
                <h3 className="mb-1">{detail.label}</h3>
                {detail.href ? (
                  <a href={detail.href} className="text-sm" style={{ color: "var(--color-ink-muted)" }}>
                    {detail.value}
                  </a>
                ) : (
                  <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>
                    {detail.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
