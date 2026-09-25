import type { ClientFacts, PricingOffer } from "./facts";

function CtaButton({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="group relative inline-flex min-h-[44px] items-center justify-center overflow-hidden bg-[var(--color-accent-fill)] px-8 py-3 text-sm font-semibold tracking-wide text-white uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-y-full bg-[var(--color-ink)] transition-transform duration-500 ease-out group-hover:translate-y-0"
      />
      <span className="relative z-10">{children}</span>
    </a>
  );
}

export default function PricingTable({ facts }: { facts?: ClientFacts }) {
  const offers: PricingOffer[] = facts?.offers ?? [];
  const formAnchor = facts?.contact?.formAnchor ?? "#lead-form";

  return (
    <section data-tool="pricing-comparison" className="border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-6 sm:p-10">
      <h2 className="font-heading text-[var(--color-ink)]">
        {offers.length > 0 ? "Ways to pay." : "Get your offer."}
      </h2>
      <p className="mt-2 max-w-xl font-body text-[var(--color-ink-muted)]">
        {offers.length > 0
          ? "Pick the offer that fits how you want to pay. Nothing hidden underneath it."
          : "Book a free water test and we will walk you through the offer that fits your home. Nothing here is a placeholder number."}
      </p>

      {offers.length > 0 && (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <caption className="sr-only">Comparison of payment offers</caption>
            <thead>
              <tr className="border-b border-[var(--color-ink)]">
                <th scope="col" className="py-3 pr-4 font-body text-sm font-semibold tracking-wide text-[var(--color-ink)] uppercase">
                  Offer
                </th>
                <th scope="col" className="py-3 pr-4 font-body text-sm font-semibold tracking-wide text-[var(--color-ink)] uppercase">
                  Upfront cost
                </th>
                <th scope="col" className="py-3 pr-4 font-body text-sm font-semibold tracking-wide text-[var(--color-ink)] uppercase">
                  Monthly cost
                </th>
                <th scope="col" className="py-3 font-body text-sm font-semibold tracking-wide text-[var(--color-ink)] uppercase">
                  Best for
                </th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer.name} className="border-b border-[var(--color-border)] align-top">
                  <th scope="row" className="py-4 pr-4 font-body text-sm font-semibold text-[var(--color-ink)]">
                    {offer.name}
                  </th>
                  <td className="py-4 pr-4 font-body text-sm text-[var(--color-ink)]">{offer.upfront ?? "Ask when you book"}</td>
                  <td className="py-4 pr-4 font-body text-sm text-[var(--color-ink)]">{offer.monthly ?? "Ask when you book"}</td>
                  <td className="py-4 font-body text-sm text-[var(--color-ink-muted)]">{offer.bestFor ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8">
        <CtaButton href={formAnchor}>
          {offers.length > 0 ? "Choose my offer" : "Get my free water test"}
        </CtaButton>
      </div>
    </section>
  );
}
