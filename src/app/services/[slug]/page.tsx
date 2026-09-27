import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { facts, serviceContent } from "@/lib/facts";
import {
  VideoHero,
  WhySystems,
  Process,
  ProofBand,
  ClosingCta,
  ServiceAreas,
  FullBleedBand,
  Faq,
} from "@/components/sections";

interface ServicePageParams {
  slug: string;
}

export function generateStaticParams(): ServicePageParams[] {
  return facts.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ServicePageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = serviceContent[slug];
  if (!content) return { title: "Service not found" };
  return {
    title: `${content.name} | Pure Home 365 - Asheville NC`,
    description: content.subhead,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<ServicePageParams>;
}) {
  const { slug } = await params;
  const content = serviceContent[slug];
  const service = facts.services.find((s) => s.slug === slug);

  if (!content || !service) {
    notFound();
  }

  const phone = facts.phone;
  const phoneHref = facts.phoneHref;

  return (
    <main>
      <VideoHero
        variant="split"
        eyebrow="ASHEVILLE WATER TREATMENT"
        headline={`${content.name} for Asheville Homes`}
        subhead={content.subhead}
        primaryCtaLabel={`Get My Free ${content.name} Quote`}
        primaryCtaHref="/contact"
        secondaryCtaLabel={`Call ${phone}`}
        secondaryCtaHref={phoneHref}
        posterSrc={content.heroImage}
        posterAlt={content.heroImageAlt}
      />

      {/* Service body */}
      <section className="section">
        <div className="shell grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="mb-6">{content.name} in Asheville, NC</h2>
            {content.body.split("\n\n").map((para, i) => (
              <p key={i} className="mb-5" style={{ color: "var(--color-ink-muted)", lineHeight: "1.75" }}>
                {para}
              </p>
            ))}
          </div>
          <aside className="lg:col-span-4 flex flex-col gap-6">
            <div className="p-6" style={{ border: "1px solid var(--color-border)", background: "var(--color-surface)" }}>
              <p className="eyebrow mb-3">Get Started</p>
              <a href="/contact" className="btn btn-primary w-full mb-3 block text-center" data-cta="quote" style={{ borderRadius: 0 }}>
                Get My Free {content.name} Quote
              </a>
              <a href={phoneHref} className="block text-center font-semibold" style={{ color: "var(--color-brand)" }}>
                {phone}
              </a>
            </div>
            <div className="p-5" style={{ border: "1px solid var(--color-border)" }}>
              <p className="text-sm font-semibold mb-2">BBB A Rating</p>
              <div className="text-xs" style={{ color: "var(--color-ink-muted)" }}>Accredited business. Serving Asheville + 80 miles.</div>
            </div>
          </aside>
        </div>
      </section>

      <Process
        eyebrow="HOW IT WORKS"
        headline={content.processHeading}
        tone="light"
        variant="steps"
        steps={[
          { title: "Free Water Test", description: "We come to your home, test your water, and show you exactly what is in it. Free, with no obligation." },
          { title: "Custom Recommendation", description: `Based on your test results, we recommend the right ${content.name.toLowerCase()} system for your needs and budget.` },
          { title: "Professional Installation", description: "Our local team installs your system, usually in a single day. You start getting clean water the same afternoon." },
        ]}
      />

      <WhySystems
        eyebrow={`WHY ${content.name.toUpperCase()}`}
        headline={`Why ${content.name} Is Right for You`}
        tone="alt"
        variant="cards"
        reasons={content.whyCards.map((c) => ({ title: c.title, body: c.body }))}
      />

      {/* Concerns this service solves */}
      <section className="section on-alt">
        <div className="shell">
          <p className="eyebrow mb-4">PROBLEMS WE SOLVE</p>
          <h2 className="mb-8">Water Problems This System Addresses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.concerns.map((c) => (
              <div key={c.title} className="p-6" style={{ border: "1px solid var(--color-border)", background: "var(--color-surface)" }}>
                <h3 className="text-base font-semibold mb-2">{c.title}</h3>
                <p style={{ color: "var(--color-ink-muted)", lineHeight: "1.65" }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stat band */}
      <section className="section on-alt">
        <div className="shell">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "A", label: "BBB Accredited Rating" },
              { value: "80 mi", label: "Service Radius from Asheville" },
              { value: "Free", label: "Water Quality Test Included" },
              { value: "1 Day", label: "Typical Installation Time" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-5xl md:text-6xl font-bold tracking-tight mb-2" style={{ color: "var(--color-accent-fill)", fontFamily: "var(--font-display)" }}>{stat.value}</p>
                <span className="block text-sm font-medium" style={{ color: "var(--color-ink-muted)" }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature image band */}
      <FullBleedBand
        imageSrc={content.bodyImage}
        imageAlt={content.bodyImageAlt}
        eyebrow="LOCAL EXPERTISE"
        headline={`Professional ${content.name} in Western NC`}
        body="Every system is installed by our Asheville-based team. Clean work, labeled components, and a walkthrough so you know how your system runs."
        ctaLabel="Schedule Your Free Water Test"
        ctaHref="/contact"
        tone="dark"
      />

      {/* FAQs */}
      <Faq
        eyebrow="COMMON QUESTIONS"
        headline={`${content.name} FAQ`}
        items={[
          {
            question: `How long does a ${content.name.toLowerCase()} installation take?`,
            answer: "Most installations are completed in a single day. Our technicians arrive on time, work cleanly, and leave you with a system that is fully set up and labeled before they go.",
          },
          {
            question: "Do I need to be home during the installation?",
            answer: "Yes. An adult needs to be present so we can walk you through the system, answer any questions, and make sure you are comfortable with how it works before we leave.",
          },
          {
            question: "Will this work with my well water?",
            answer: "Yes. We treat both municipal and private well water. We test your water first so the system we recommend is right for what is actually in your supply.",
          },
          {
            question: "What does the free water test cover?",
            answer: "We test for the contaminants most common in Western NC: hardness, iron, chlorine, sulfur, pH, and sediment. If you have a specific concern, tell us and we will include it in the panel.",
          },
        ]}
      />

      <ProofBand
        variant="promise"
        items={[
          { value: "BBB A Rating", label: "Accredited business in Asheville, NC." },
          { value: "Free Water Test", label: "Every recommendation starts with your own test results." },
          { value: "Local Team", label: "Asheville-based technicians." },
          { value: "No Contract", label: "Month-to-month financing or outright purchase." },
        ]}
      />

      <ServiceAreas
        eyebrow="SERVICE AREA"
        headline={`${content.name} Throughout Western NC`}
        areas={[
          {
            name: "All of Western NC",
            subtitle: "80-mile radius from Asheville",
            places: ["Asheville", "Hendersonville", "Waynesville", "Boone", "Bryson City", "Morganton"],
          },
        ]}
        tone="light"
      />

      <ClosingCta
        headline={`Ready for ${content.name} in Your Home?`}
        subhead="Schedule your free water test and we will show you what your water needs."
        primaryCtaLabel="Get My Free Quote"
        primaryCtaHref="/contact"
        secondaryCtaLabel={`Call ${phone}`}
        secondaryCtaHref={phoneHref}
        variant="band"
      />
    </main>
  );
}
