import type { Metadata } from "next";
import { facts } from "@/lib/facts";
import { ClosingCta } from "@/components/sections";

export const metadata: Metadata = {
  title: "Thank You | Pure Home 365",
  description: "Your request has been received. We will be in touch shortly.",
};

export default function ThankYouPage() {
  const phone = facts.phone;
  const phoneHref = facts.phoneHref;

  return (
    <main>
      <section className="section on-dark" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
        <div className="shell text-center">
          <p className="eyebrow mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>REQUEST RECEIVED</p>
          <h1 style={{ color: "white", maxWidth: "20ch", marginInline: "auto" }}>
            Thank you. We will be in touch shortly.
          </h1>
          <p className="mt-6 text-base" style={{ color: "rgba(255,255,255,0.8)", maxWidth: "44ch", marginInline: "auto" }}>
            A member of our local Asheville team will confirm your free water test within one business day.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/services" className="btn" style={{ borderRadius: 0, color: "white", border: "1px solid rgba(255,255,255,0.35)" }}>
              Learn About Our Services
            </a>
            <a href={phoneHref} className="font-semibold" style={{ color: "white" }}>
              {phone}
            </a>
          </div>
        </div>
      </section>

      <ClosingCta
        headline="Questions Before Your Test?"
        subhead="We are a local company and happy to talk through any concerns before your appointment."
        primaryCtaLabel="Return Home"
        primaryCtaHref="/"
        secondaryCtaLabel={`Call ${phone}`}
        secondaryCtaHref={phoneHref}
        variant="quiet"
      />
    </main>
  );
}
