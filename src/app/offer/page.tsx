import type { Metadata } from "next";
import { facts } from "@/lib/facts";
import SavingsCalculator from "@/components/interactive/SavingsCalculator";
import { ClosingCta } from "@/components/sections";

export const metadata: Metadata = {
  title: "Water Filtration Offers & Pricing | Pure Home 365 Asheville",
  description:
    "See your Asheville water filtration options: $0 down financing from $96/month, $500 off whole-home, and $200 off point-of-use. Calculate your annual savings.",
};

export default function OfferPage() {
  const phone = facts.phone;
  const phoneHref = facts.phoneHref;

  return (
    <main>
      {/* Offer Hero */}
      <section className="section" style={{ paddingTop: "clamp(4rem, 8vw, 7rem)", paddingBottom: "clamp(2rem, 4vw, 3.5rem)" }}>
        <div className="shell" style={{ maxWidth: "48rem" }}>
          <p className="eyebrow">YOUR OPTIONS</p>
          <h1>Your Asheville Water Filtration Options</h1>
          <p style={{ fontSize: "1.125rem", color: "var(--color-ink-muted)", marginTop: "1rem", lineHeight: 1.7 }}>
            Compare systems, calculate your potential savings, and choose what fits your home and budget. A free water test comes first: we show you exactly what is in your water before recommending anything.
          </p>
        </div>
      </section>

      {/* Savings Calculator - only valid location for this component */}
      <section className="section on-alt">
        <div className="shell">
          <p className="eyebrow">CALCULATE YOUR SAVINGS</p>
          <h2>How Much Could You Save?</h2>
          <p style={{ color: "var(--color-ink-muted)", marginBottom: "2.5rem", maxWidth: "42rem" }}>
            Enter your current spending on bottled or filtered water and we will estimate your annual savings with a Pure Home 365 system.
          </p>
          <SavingsCalculator />
        </div>
      </section>

      {/* Offer Tiers */}
      <section className="section">
        <div className="shell">
          <p className="eyebrow">CURRENT OFFERS</p>
          <h2>Three Ways to Get Started</h2>
          <p style={{ color: "var(--color-ink-muted)", marginBottom: "2.5rem", maxWidth: "42rem" }}>
            All offers include a free water test and professional installation. Subject to credit check where applicable.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {/* Offer 1: $0 down */}
            <div style={{ border: "2px solid var(--color-accent-fill)", padding: "2rem", background: "var(--color-surface)" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-accent-text)", marginBottom: "0.75rem" }}>MOST POPULAR</p>
              <h3 style={{ fontSize: "clamp(1.25rem,2vw,1.5rem)", marginBottom: "0.5rem" }}>Whole Home System</h3>
              <p style={{ fontSize: "clamp(2rem,4vw,2.75rem)", fontWeight: 800, color: "var(--color-accent-fill)", lineHeight: 1, marginBottom: "0.5rem" }}>$96<span style={{ fontSize: "1.125rem", fontWeight: 600 }}>/month</span></p>
              <p style={{ color: "var(--color-ink-muted)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>$0 down after credit check. Professional installation included. Whole-home filtration system protecting every tap.</p>
              <a
                href="/contact"
                className="btn"
                data-cta="quote"
                style={{ display: "block", textAlign: "center", padding: "0.875rem 1.5rem", background: "var(--color-accent-fill)", color: "var(--color-accent-fill-ink)", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem" }}
              >
                Get My Free Water Test
              </a>
            </div>

            {/* Offer 2: $500 off */}
            <div style={{ border: "1px solid var(--color-border)", padding: "2rem", background: "var(--color-surface)" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-ink-muted)", marginBottom: "0.75rem" }}>CASH PURCHASE</p>
              <h3 style={{ fontSize: "clamp(1.25rem,2vw,1.5rem)", marginBottom: "0.5rem" }}>Whole Home: Buy Now</h3>
              <p style={{ fontSize: "clamp(2rem,4vw,2.75rem)", fontWeight: 800, color: "var(--color-accent-fill)", lineHeight: 1, marginBottom: "0.5rem" }}>$500 <span style={{ fontSize: "1.125rem", fontWeight: 600 }}>off</span></p>
              <p style={{ color: "var(--color-ink-muted)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>Purchase and pay by credit card at the time of installation and receive $500 off a whole-house unit.</p>
              <a
                href="/contact"
                className="btn"
                data-cta="quote"
                style={{ display: "block", textAlign: "center", padding: "0.875rem 1.5rem", border: "2px solid var(--color-accent-fill)", color: "var(--color-accent-text)", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem", background: "transparent" }}
              >
                Book Free Water Test
              </a>
            </div>

            {/* Offer 3: $200 off */}
            <div style={{ border: "1px solid var(--color-border)", padding: "2rem", background: "var(--color-surface)" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-ink-muted)", marginBottom: "0.75rem" }}>POINT OF USE</p>
              <h3 style={{ fontSize: "clamp(1.25rem,2vw,1.5rem)", marginBottom: "0.5rem" }}>Point of Use System</h3>
              <p style={{ fontSize: "clamp(2rem,4vw,2.75rem)", fontWeight: 800, color: "var(--color-accent-fill)", lineHeight: 1, marginBottom: "0.5rem" }}>$200 <span style={{ fontSize: "1.125rem", fontWeight: 600 }}>off</span></p>
              <p style={{ color: "var(--color-ink-muted)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>Buy and pay for a point-of-use system and receive $200 off. Ideal for under-sink drinking water filtration.</p>
              <a
                href="/contact"
                className="btn"
                data-cta="quote"
                style={{ display: "block", textAlign: "center", padding: "0.875rem 1.5rem", border: "2px solid var(--color-accent-fill)", color: "var(--color-accent-text)", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem", background: "transparent" }}
              >
                Book Free Water Test
              </a>
            </div>
          </div>

          <p style={{ fontSize: "0.8rem", color: "var(--color-ink-muted)", marginTop: "1.5rem" }}>
            Financing subject to credit check. Offers subject to change without notice.
            Call <a href={phoneHref} style={{ color: "var(--color-accent-text)" }}>{phone}</a> to confirm current availability.
          </p>
        </div>
      </section>

      {/* Closing CTA */}
      <ClosingCta
        variant="band"
        headline="Book Your Free Water Test"
        subhead="No obligation. We test your water, show you the results, and tell you which options apply to your home."
        primaryCtaLabel="Get My Free Water Test"
        primaryCtaHref="/contact"
        secondaryCtaLabel={`Call ${phone}`}
        secondaryCtaHref={phoneHref}
      />
    </main>
  );
}
