import type { Metadata } from "next";
import { facts } from "@/lib/facts";
import { VideoHero, ClosingCta } from "@/components/sections";
import LeadForm from "@/components/forms/LeadForm";
import SavingsCalculator from "@/components/interactive/SavingsCalculator";
import PricingTable from "@/components/interactive/PricingTable";
import type { ClientFacts } from "@/components/interactive/facts";

export const metadata: Metadata = {
  title: "Contact | Pure Home 365 - Schedule Your Free Water Test",
  description:
    "Schedule your free water test with Pure Home 365, Asheville NC. Financing from $96/month with $0 down. Better Business Bureau A rated.",
};

const toolFacts: ClientFacts = {
  company: {
    name: facts.dba,
    phone: facts.phone,
    phoneHref: facts.phoneHref,
  },
  offers: facts.offers.map((o) => ({
    name: o.headline,
    monthly: o.price,
    bestFor: o.detail,
  })),
  primaryOfferLabel: facts.offers[0]?.headline,
  contact: { path: "/contact", formAnchor: "#lead-form" },
};

export default function ContactPage() {
  const phone = facts.phone;
  const phoneHref = facts.phoneHref;

  return (
    <main>
      <VideoHero
        variant="centered"
        eyebrow="GET IN TOUCH"
        headline="Schedule Your Free Water Test"
        subhead="We come to you, test your water, show you the results, and recommend the right system for your budget."
        primaryCtaLabel="Skip to Form"
        primaryCtaHref="#lead-form"
        secondaryCtaLabel={`Call ${phone}`}
        secondaryCtaHref={phoneHref}
      />

      <section className="section" id="contact-body">
        <div className="shell grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Left: SavingsCalculator + Offers */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <div>
              <h2 className="mb-4">How Much Could You Save?</h2>
              <p className="mb-6" style={{ color: "var(--color-ink-muted)" }}>
                Enter what you currently spend on bottled water per month to see your savings.
              </p>
              <SavingsCalculator facts={toolFacts} />
            </div>

            <div>
              <h3 className="mb-2">Current Financing and Purchase Offers</h3>
              <p className="mb-6" style={{ color: "var(--color-ink-muted)" }}>
                Ask us about which option works for your home.
              </p>
              <PricingTable facts={toolFacts} />
            </div>
          </div>

          {/* Right: Contact form */}
          <div className="lg:col-span-5" id="lead-form">
            <h2 className="mb-2">Request Your Free Water Test</h2>
            <p className="mb-6" style={{ color: "var(--color-ink-muted)" }}>
              We will confirm within one business day and schedule at your convenience.
            </p>
            <LeadForm />
            <p className="mt-4" style={{ color: "var(--color-ink-muted)" }}>
              Prefer to call?{" "}
              <a href={phoneHref} className="font-semibold" style={{ color: "var(--color-brand)" }}>
                {phone}
              </a>
            </p>
          </div>
        </div>
      </section>

      <ClosingCta
        headline="We Are Local. We Pick Up the Phone."
        subhead="Our team is available Monday through Saturday. No call centers. No hold music."
        primaryCtaLabel={`Call ${phone}`}
        primaryCtaHref={phoneHref}
        secondaryCtaLabel={facts.email}
        secondaryCtaHref={`mailto:${facts.email}`}
        variant="quiet"
      />
    </main>
  );
}
