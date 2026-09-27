import type { Metadata } from "next";
import { facts } from "@/lib/facts";
import {
  VideoHero,
  WhySystems,
  Systems,
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
      {/* H-01: VideoHero:full-bleed - atmospheric water photo behind headline */}
      <VideoHero
        variant="full-bleed"
        eyebrow="ASHEVILLE, NC WATER TREATMENT"
        headline="Pure Water, Nothing Less."
        subhead="Custom filtration for well and municipal water. BBB A-rated. Serving Western North Carolina and 80 miles around."
        posterSrc="/images/hero/family-dinner.jpg"
        posterAlt="Family enjoying clean water at the dinner table in their Asheville area home"
        primaryCtaLabel="Get Your Free Water Test"
        primaryCtaHref="/contact"
        secondaryCtaLabel="See Our Systems"
        secondaryCtaHref="/services"
      />

      {/* Hero form band - lead capture below full-bleed hero */}
      <section style={{ backgroundColor: "var(--color-surface-teal)", borderBottom: "1px solid var(--color-border)" }}>
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-10 items-center">
            <div>
              <p className="eyebrow mb-3 block">FREE IN-HOME WATER TEST</p>
              <h2 style={{ fontSize: "clamp(26px,2.8vw,40px)", textAlign: "left" }}>Find out exactly what is in your water.</h2>
              <p className="mt-3" style={{ color: "var(--color-ink-muted)" }}>Our technician comes to your home, tests your water on the spot, and walks you through the results. No charge. No commitment.</p>
              <ul className="mt-5 flex flex-col gap-2">
                {["BBB A-rated Asheville company", "Same-day results, explained in plain language", "$0 down financing available from $96/month"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm" style={{ color: "var(--color-ink)" }}>
                    <span style={{ color: "var(--color-accent-fill)", fontWeight: 700 }}>&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 md:p-8" style={{ border: "1px solid var(--color-border)" }}>
              <h3 className="text-lg font-semibold mb-4">Schedule Your Free Test</h3>
              <LeadForm />
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs" style={{ color: "var(--color-ink-muted)" }}>
                <span>BBB A Rating</span>
                <span aria-hidden="true">|</span>
                <span>Asheville + 80 Miles</span>
                <span aria-hidden="true">|</span>
                <a href={phoneHref} className="font-semibold" style={{ color: "var(--color-accent-text)" }}>{phone}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            imageSrc: "/images/people/glass-faucet.jpg",
            imageAlt: "Asheville homeowner filling a glass at a clean kitchen faucet",
            ctaLabel: "Get clean water at every tap",
            ctaHref: "/services/water-filters",
          },
          {
            name: "Water Filtration",
            description: "Multi-stage filtration for iron, sulfur, and complex contamination.",
            imageSrc: "/images/people/dad-son.jpg",
            imageAlt: "Father and son washing hands at a clean sink in their home",
            ctaLabel: "Remove iron, sulfur, and more",
            ctaHref: "/services/water-filtration",
          },
          {
            name: "Water Softeners",
            description: "Eliminate hardness, scale buildup, and appliance damage over time.",
            imageSrc: "/images/people/mom-son.jpg",
            imageAlt: "Mother and son enjoying clean water in their home",
            ctaLabel: "Stop hard water damage",
            ctaHref: "/services/water-softeners",
          },
          {
            name: "Well Water",
            description: "Complete treatment for private wells - testing, treatment, peace of mind.",
            imageSrc: "/images/hero/family-dinner.jpg",
            imageAlt: "Family at the dinner table with a pitcher of clean well water",
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

      {/* H-04: WaterHook - teal section tint */}
      <section className="section" data-section="water-hook" style={{ backgroundColor: "var(--color-surface-teal, #ecfeff)" }}>
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

      {/* H-05: Process - image-backed step cards for visual density */}
      <section className="section" style={{ backgroundColor: "var(--color-surface-teal)" }}>
        <div className="shell">
          <div className="mb-16 text-center">
            <span className="eyebrow mb-4 block">HOW IT WORKS</span>
            <h2>Three Steps to Cleaner Water</h2>
          </div>
          <ol className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                num: "01",
                title: "Free Water Test",
                description: "We come to your home, test your water, and show you exactly what is in it. Free, with no obligation.",
                imageSrc: "/images/process/step-1-water-test.jpg",
                imageAlt: "Technician testing water quality in an Asheville home",
              },
              {
                num: "02",
                title: "Custom Recommendation",
                description: "Based on your test results, we recommend the right system for your water type and your budget.",
                imageSrc: "/images/process/step-2-consultation.jpg",
                imageAlt: "Water treatment consultation with Asheville homeowner",
              },
              {
                num: "03",
                title: "Professional Installation",
                description: "Our local team installs your system, usually in a single day. You get clean water the same afternoon.",
                imageSrc: "/images/process/step-3-installation.jpg",
                imageAlt: "Water system professionally installed in a Western NC home",
              },
            ].map((step) => (
              <li key={step.num} className="card flex flex-col" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                <div className="card-media relative w-full" style={{ paddingBottom: "60%" }}>
                  <img
                    src={step.imageSrc}
                    alt={step.imageAlt}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-2 p-6">
                  <span className="font-heading text-4xl" style={{ color: "var(--color-accent-text)" }} aria-hidden="true">{step.num}</span>
                  <h3>{step.title}</h3>
                  <p style={{ color: "var(--color-ink-muted)" }}>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

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

      {/* H-08b: Testimonials - Google review grid with star ratings and 4.9 badge */}
      <section className="section">
        <div className="shell">
          <div className="mb-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="eyebrow mb-4 block">WHAT ASHEVILLE HOMEOWNERS SAY</span>
              <h2 style={{ textAlign: "left" }}>Real Reviews from Real Customers</h2>
            </div>
            {/* 4.9 rating badge */}
            <div className="flex-none flex flex-col items-center gap-1 p-4" style={{ border: "2px solid var(--color-accent-fill)", minWidth: 120 }}>
              <p className="text-4xl font-bold" style={{ color: "var(--color-accent-fill)", fontFamily: "var(--font-display)" }}>4.9</p>
              <div className="flex items-center gap-0.5" aria-label="4.9 out of 5 stars">
                {[1,2,3,4,5].map((n) => (
                  <svg key={n} width="16" height="16" viewBox="0 0 20 20" fill="var(--color-accent-fill)" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs font-semibold" style={{ color: "var(--color-ink-muted)" }}>Google Rating</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                name: "Jessica M.",
                location: "Asheville, NC",
                rating: 5,
                review: "Rob and his team were incredibly professional. They tested our well water, explained everything clearly, and installed a full filtration system in one day. Our water tastes completely different now. Worth every penny.",
              },
              {
                name: "David H.",
                location: "Hendersonville, NC",
                rating: 5,
                review: "We had terrible iron staining in every sink and shower. Pure Home 365 came out, did a full water test, and had us fixed within a week. The staining is gone. I wish we had called sooner.",
              },
              {
                name: "Angela R.",
                location: "Weaverville, NC",
                rating: 5,
                review: "Very honest company. They told us we didn't need the most expensive system for our situation and recommended a simpler filter that solved the problem. Rare to find a contractor that works that way.",
              },
              {
                name: "Tom S.",
                location: "Black Mountain, NC",
                rating: 5,
                review: "Had a chlorine smell issue with city water. The whole-home carbon filter fixed it immediately. Installation was clean and quick. Rob answered every question I had before and after.",
              },
              {
                name: "Karen L.",
                location: "Brevard, NC",
                rating: 5,
                review: "The free water test was a real test, not a sales pitch. They found issues I didn't even know I had and explained exactly what each one meant. Very thorough and no pressure at all.",
              },
              {
                name: "Mike P.",
                location: "Waynesville, NC",
                rating: 5,
                review: "Our well water had a sulfur smell. Pure Home 365 installed a system that took care of it completely. Local company, fast response, and they actually know Western NC water.",
              },
            ].map((testimonial) => (
              <article
                key={testimonial.name}
                className="card flex flex-col gap-4 p-6"
                style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
              >
                <div className="flex items-center gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="var(--color-accent-fill)" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed" style={{ color: "var(--color-ink)" }}>
                  &quot;{testimonial.review}&quot;
                </p>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--color-ink)" }}>{testimonial.name}</p>
                  <p className="text-xs" style={{ color: "var(--color-ink-muted)" }}>{testimonial.location}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Savings calculator CTA - text bridge to /contact calculator */}
      <section className="section on-alt">
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="eyebrow mb-4 block">HOW MUCH COULD YOU SAVE?</span>
              <h2 style={{ textAlign: "left" }}>Up to $2,750 a Year in Water Costs</h2>
              <p className="mt-4" style={{ color: "var(--color-ink-muted)" }}>
                Between bottled water, filter replacements, appliance repairs from hard water, and energy loss from scale buildup, most Asheville households spend more on water than they realize. A whole-home system typically pays for itself within a few years.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href="/contact" className="btn btn-primary btn-sweep" data-cta="quote">
                  <span>Get a Free Savings Estimate</span>
                  <span className="btn-arrow" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
                  </span>
                </a>
                <a href={phoneHref} className="font-semibold text-sm" style={{ color: "var(--color-accent-text)" }}>or call {phone}</a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Bottled water per year", value: "~$900" },
                { label: "Filter replacements", value: "~$600" },
                { label: "Appliance damage (hard water)", value: "~$800" },
                { label: "Energy loss from scale", value: "~$450" },
              ].map((row) => (
                <div key={row.label} className="p-5" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
                  <p className="text-2xl font-bold mb-1" style={{ color: "var(--color-accent-fill)", fontFamily: "var(--font-display)" }}>{row.value}</p>
                  <p className="text-xs" style={{ color: "var(--color-ink-muted)" }}>{row.label}</p>
                </div>
              ))}
            </div>
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
