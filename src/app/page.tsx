import type { Metadata } from "next";
import { facts } from "@/lib/facts";
import {
  VideoHero,
  WhySystems,
  Systems,
  Process,
  ProofBand,
  OriginStory,
  ServiceAreas,
  Faq,
  ClosingCta,
  FullBleedBand,
} from "@/components/sections";
import LeadForm from "@/components/forms/LeadForm";
import ConcernRouter from "@/components/interactive/ConcernRouter";

export const metadata: Metadata = {
  title: "Pure Home 365 | Asheville Water Treatment - Free Water Test",
  description:
    "Custom water filtration, softeners, and well water treatment for Asheville, NC and 80 miles around. BBB A rated. Free water test. $0 down financing available.",
};

const toolFacts = {
  contact: { path: "/contact" },
};

export default function Home() {
  const phone = facts.phone;
  const phoneHref = facts.phoneHref;

  return (
    <main>
      {/* H-01: VideoHero:split */}
      <VideoHero
        variant="split"
        eyebrow="ASHEVILLE, NC WATER TREATMENT"
        headline="Clean Water for"
        accentLine="Asheville Homes."
        subhead="Custom filtration for well and municipal water - serving Western North Carolina and 80 miles around."
        videoSrc="/video/hero-loop.mp4"
        posterSrc="/images/hero-poster.jpg"
        posterAlt="Clean water flowing from a kitchen tap"
        primaryCtaLabel="Get Your Free Water Test"
        primaryCtaHref="/contact"
        secondaryCtaLabel="See Our Systems"
        secondaryCtaHref="/services"
        formSlot={
          <div className="bg-white p-6 md:p-8 shadow-xl h-full flex flex-col justify-center">
            <h3 className="text-lg font-semibold mb-4 font-[var(--font-display)]">Get Your Free Water Test</h3>
            <LeadForm />
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs" style={{ color: "var(--color-ink-muted)" }}>
              <span>BBB A Rating</span>
              <span aria-hidden="true">·</span>
              <span>Asheville + 80 Miles</span>
              <span aria-hidden="true">·</span>
              <a href={phoneHref} className="font-semibold" style={{ color: "var(--color-brand)" }}>{phone}</a>
            </div>
          </div>
        }
      />

      {/* H-02: WhySystems:cards */}
      <WhySystems
        eyebrow="WHY CHOOSE US"
        headline="The Pure Home 365 Difference"
        subhead="We test your water before we recommend anything."
        variant="cards"
        reasons={[
          {
            title: "Custom to Your Water",
            body: "We test first, then prescribe. No one-size system because no two water sources are the same.",
          },
          {
            title: "Well and Municipal",
            body: "Whether your water comes from a well or city line, we have a proven solution. Both are our everyday work.",
          },
          {
            title: "Local Asheville Team",
            body: "The same technician who installs your system is a phone call away. We serve the community we live in.",
          },
        ]}
      />

      {/* H-03: Systems:grid - four-column card grid (GAP 3 fix) */}
      <Systems
        data-section="systems-grid"
        variant="grid"
        eyebrow="OUR SERVICES"
        headline="Water Solutions for Every Home"
        tone="alt"
        systems={[
          {
            name: "Water Filters",
            description: "Remove contaminants, chlorine, and sediment. Clean water at every tap.",
            imageSrc: "/images/services/water-filters-hero.jpg",
            imageAlt: "Whole-home water filter installation under kitchen sink",
            ctaLabel: "Get clean water at every tap",
            ctaHref: "/services/water-filters",
          },
          {
            name: "Water Filtration",
            description: "Multi-stage filtration for iron, sulfur, and complex contamination.",
            imageSrc: "/images/services/water-filtration-hero.jpg",
            imageAlt: "Multi-stage water filtration system installed in utility room",
            ctaLabel: "Remove iron, sulfur, and more",
            ctaHref: "/services/water-filtration",
          },
          {
            name: "Water Softeners",
            description: "Eliminate hardness, scale buildup, and appliance damage over time.",
            imageSrc: "/images/services/water-softeners-hero.jpg",
            imageAlt: "Water softener system installation in residential garage",
            ctaLabel: "Stop hard water damage",
            ctaHref: "/services/water-softeners",
          },
          {
            name: "Well Water",
            description: "Complete treatment for private wells - testing, treatment, peace of mind.",
            imageSrc: "/images/services/well-water-hero.jpg",
            imageAlt: "Residential well water system in Western North Carolina",
            ctaLabel: "Treat your well from source to tap",
            ctaHref: "/services/well-water",
          },
        ]}
      />

      {/* GAP 2 + GAP 5: Stat strip with BBB social proof (copy.md Section 4) */}
      <section style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="shell">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5">
            {/* Star rating / BBB badge */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1" aria-label="BBB accredited business">
                {[1,2,3,4,5].map((n) => (
                  <svg key={n} width="16" height="16" viewBox="0 0 20 20" fill="var(--color-accent-fill)" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold" style={{ color: "var(--color-ink)" }}>BBB A-Rated</span>
              <span className="text-sm" style={{ color: "var(--color-ink-muted)" }}>Accredited business serving Asheville</span>
            </div>
            <div className="hidden sm:flex items-center gap-8">
              <div className="text-center">
                <span className="block text-sm font-semibold" style={{ color: "var(--color-ink)" }}>80-Mile Coverage</span>
                <span className="block text-xs" style={{ color: "var(--color-ink-muted)" }}>Western North Carolina</span>
              </div>
              <div className="text-center">
                <span className="block text-sm font-semibold" style={{ color: "var(--color-ink)" }}>Free Test Included</span>
                <span className="block text-xs" style={{ color: "var(--color-ink-muted)" }}>Water quality check before any recommendation</span>
              </div>
              <a href={phoneHref} className="btn btn-primary text-sm" data-cta="quote" style={{ borderRadius: 0 }}>
                Get My Free Test
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Re-ask Band */}
      <section className="section on-alt" style={{ paddingTop: "clamp(1.5rem,3vw,2.5rem)", paddingBottom: "clamp(1.5rem,3vw,2.5rem)" }}>
        <div className="shell flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-base font-medium">Not sure what your water needs?</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href={phoneHref} className="font-semibold" style={{ color: "var(--color-brand)" }}>{phone}</a>
            <a href="/contact" className="btn btn-primary" data-cta="quote" style={{ borderRadius: 0 }}>Get a Free Test</a>
          </div>
        </div>
      </section>

      {/* H-04: WaterHook - GAP 1 fix: changed from on-dark to light pale blue */}
      <section className="section" data-section="water-hook" style={{ backgroundColor: "#EBF4FF" }}>
        <div className="shell">
          <p className="eyebrow mb-4 block">WHAT IS YOUR WATER DOING?</p>
          <h2 className="mt-4 mb-4">Asheville Area Water Problems We Solve</h2>
          <p className="mb-12" style={{ color: "var(--color-ink-muted)", maxWidth: "56ch", margin: "0 auto 3rem" }}>
            Western NC water has its own challenges. Tell us what you are seeing and we will point you to the right solution.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {[
              { title: "Scale on Faucets and Fixtures", body: "White buildup that returns no matter how often you clean." },
              { title: "A Chlorine Smell from the Tap", body: "City water that smells like a pool when it runs." },
              { title: "Yellowish or Rust Stains in the Sink", body: "Iron staining that discolors porcelain and grout permanently." },
              { title: "Water That Tastes Off", body: "Flat, metallic, or chemical flavor even when chilled." },
              { title: "Soap That Won't Lather", body: "Hard water leaves film on skin and dull residue on dishes." },
              { title: "Bottles and Filters That Keep Running Out", body: "Constant restocking costs more than a permanent solution would." },
            ].map((concern) => (
              <div key={concern.title} className="p-6" style={{ border: "1px solid var(--color-border)", background: "var(--color-surface)", color: "var(--color-ink)" }}>
                <h3 className="text-base font-semibold mb-2" style={{ color: "var(--color-ink)" }}>{concern.title}</h3>
                <p className="leading-relaxed" style={{ color: "var(--color-ink-muted)" }}>{concern.body}</p>
              </div>
            ))}
          </div>

          {/* GAP 2: ConcernRouter as a prominent standalone card */}
          <div className="max-w-2xl mx-auto bg-white p-8" style={{ border: "2px solid var(--color-accent-fill)", color: "var(--color-ink)" }}>
            <h3 className="text-lg font-semibold mb-2 text-center" style={{ color: "var(--color-ink)" }}>Which System Is Right for You?</h3>
            <p className="text-sm text-center mb-6" style={{ color: "var(--color-ink-muted)" }}>Tell us your biggest concern and we will point you in the right direction.</p>
            <ConcernRouter facts={toolFacts} />
          </div>
          <p className="mt-6 text-center text-sm" style={{ color: "var(--color-ink-muted)" }}>
            Prefer to talk? Call{" "}
            <a href={phoneHref} style={{ color: "var(--color-accent-text)", fontWeight: 600 }}>{phone}</a>
          </p>
        </div>
      </section>

      {/* H-05: Process:steps */}
      <Process
        eyebrow="HOW IT WORKS"
        headline="Three Steps to Cleaner Water"
        tone="light"
        variant="steps"
        steps={[
          {
            title: "Free Water Test",
            description: "We come to your home, test your water, and show you exactly what is in it. Free, with no obligation.",
          },
          {
            title: "Custom Recommendation",
            description: "Based on your test results, we recommend the right system for your water type and your budget - not the most expensive option.",
          },
          {
            title: "Professional Installation",
            description: "Our local team installs your system, usually in a single day. You start getting clean water the same afternoon.",
          },
        ]}
      />

      {/* Mid-page CTA band - the ONE dark band (GAP 1 rule: hero + one CTA band + footer) */}
      <section className="section on-dark">
        <div className="shell flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-lg font-semibold" style={{ color: "white" }}>Questions about your water? We test for free, no strings.</p>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.72)" }}>BBB A-rated. Local technicians. No pressure to purchase.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href={phoneHref} style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Call {phone}</a>
            <a href="/contact" className="btn btn-primary" data-cta="quote" style={{ borderRadius: 0 }}>Schedule Online</a>
          </div>
        </div>
      </section>

      {/* H-06: ProofBand - promise strip with copy.md Section 4 data */}
      <ProofBand
        variant="promise"
        items={[
          { value: "BBB A Rating", label: "Accredited business serving Asheville" },
          { value: "80-Mile Coverage", label: "Western North Carolina service territory" },
          { value: "Free Test Included", label: "Water quality check before any recommendation" },
          { value: "Well + Municipal", label: "We treat both water sources. Not all companies do." },
        ]}
      />

      {/* H-07: OriginStory:community-anchor */}
      <OriginStory
        eyebrow="OUR COMMITMENT"
        headline="A Local Asheville Business Invested in Our Community"
        body="Pure Home 365 was built around a simple idea: every home deserves water that is safe, clean, and right for the way that home actually uses water. We customize our systems to meet your needs whether you are on a well or a municipal line. We carry a variety of solutions - not to overwhelm you with choices, but to make sure something fits your needs and your budget. We are not a national franchise. We are a local Asheville company, and the communities we serve are the communities we live in. That matters to us in ways it simply cannot matter to a call center in another state."
        imageSrc="/images/local/asheville-install-scene.jpg"
        imageAlt="Professional water treatment installation in an Asheville area home"
        ctaLabel="Get a Free Assessment"
        ctaHref="/contact"
        tone="light"
      />

      {/* H-08: Stat band - facts from copy.md Section 10 */}
      <section className="section on-alt">
        <div className="shell">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "A", label: "BBB Accredited Rating" },
              { value: "80 mi", label: "Service Radius from Asheville" },
              { value: "4", label: "System Types Available" },
              { value: "Free", label: "Water Quality Test Included" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-5xl md:text-6xl font-bold tracking-tight mb-2" style={{ color: "var(--color-accent-fill)", fontFamily: "var(--font-display)" }}>{stat.value}</p>
                <span className="block text-sm font-medium" style={{ color: "var(--color-ink-muted)" }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* H-09: FullBleedBand - GAP 4: use install-featured-2 for brighter image */}
      <FullBleedBand
        tone="light"
        imageSrc="/images/featured/install-featured-2.jpg"
        imageAlt="Professional whole-home water system installation, Asheville NC"
        eyebrow="INSTALLATION QUALITY"
        headline="Professional Installations, Every Time"
        body="Every system we install is set up to last - proper plumbing, correct sizing, clean work. No mess left behind, no shortcuts taken."
        ctaLabel="View Gallery"
        ctaHref="/gallery"
      />

      {/* H-10: FAQ */}
      <Faq
        eyebrow="COMMON QUESTIONS"
        headline="What Asheville Homeowners Ask Us"
        items={[
          { question: "Do you work with well water?", answer: "Yes. Well water is a specialty. We test for iron, sulfur, bacteria, hardness, and other common well contaminants before recommending anything." },
          { question: "How long does installation take?", answer: "Most whole-home systems are installed in a single day. Simpler point-of-use systems are done in a few hours." },
          { question: "Do you require a long-term contract?", answer: "No. We offer financing options that work month to month, and outright purchase if that is what you prefer." },
          { question: "What is a free water test?", answer: "We come to your home with testing equipment, run a panel on your water, and walk you through the results. No charge, no commitment." },
          { question: "Do you serve areas outside Asheville?", answer: "Yes. We serve any community within 80 miles of Asheville, which covers most of Western NC." },
          { question: "What if something goes wrong after install?", answer: "We are a local company. We come back. No call centers, no national warranty runaround." },
        ]}
      />

      {/* H-11: ServiceAreas */}
      <ServiceAreas
        eyebrow="SERVICE AREA"
        headline="Serving Asheville and 80 Miles Around"
        areas={[
          {
            name: "Asheville Metro",
            subtitle: "Buncombe County",
            places: ["Asheville", "Weaverville", "Arden", "Swannanoa", "Black Mountain"],
          },
          {
            name: "Southern WNC",
            subtitle: "Henderson, Transylvania, Haywood",
            places: ["Brevard", "Hendersonville", "Fletcher", "Flat Rock", "Waynesville", "Canton"],
          },
          {
            name: "Extended Coverage",
            subtitle: "80-mile radius",
            places: ["Boone", "Burnsville", "Bryson City", "Morganton", "Marion", "Hickory"],
          },
        ]}
        tone="light"
      />

      {/* H-12: Thin CTA re-ask */}
      <section className="section on-alt" style={{ paddingTop: "clamp(1.5rem,3vw,2.5rem)", paddingBottom: "clamp(1.5rem,3vw,2.5rem)" }}>
        <div className="shell flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-base">Still have questions? We are local and happy to talk.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href={phoneHref} className="font-semibold" style={{ color: "var(--color-brand)" }}>Call {phone}</a>
            <a href="/contact" className="btn btn-primary" data-cta="quote" style={{ borderRadius: 0 }}>Schedule Online</a>
          </div>
        </div>
      </section>

      {/* H-13: ClosingCta */}
      <ClosingCta
        headline="Clean Water Starts with a Free Test"
        subhead="Our team tests your water at no charge and shows you exactly what you are dealing with. Financing available from $96/month."
        primaryCtaLabel="Get My Free Test"
        primaryCtaHref="/contact"
        secondaryCtaLabel="See Financing Options"
        secondaryCtaHref="/contact"
        variant="band"
      />
    </main>
  );
}
