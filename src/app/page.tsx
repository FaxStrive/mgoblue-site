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
  FollowTheWater,
} from "@/components/sections";
import LeadForm from "@/components/forms/LeadForm";
import ConcernRouter from "@/components/interactive/ConcernRouter";
import CountUpStats from "@/components/interactive/CountUpStats";

export const metadata: Metadata = {
  title: "Pure Home 365 | Asheville Water Treatment - Free Water Test",
  description:
    "Custom water filtration, softeners, and well water treatment for Asheville, NC and 80 miles around. Better Business Bureau A rated. Free water test. $0 down financing available.",
};

const toolFacts = {
  contact: { path: "/contact" },
};

const MARQUEE_ITEMS = [
  "Every faucet",
  "For life",
  "Same-day install",
  "Free water test",
  "Better Business Bureau A-Rated",
  "Asheville + 80 miles",
  "Well and municipal",
  "No obligation",
];

export default function Home() {
  const phone = facts.phone;
  const phoneHref = facts.phoneHref;

  return (
    <main>
      {/* H-01: VideoHero:full-bleed - atmospheric water photo behind headline */}
      <VideoHero
        variant="full-bleed"
        eyebrow="ASHEVILLE WATER FILTRATION"
        headline="Pure water. Every faucet."
        subhead="Custom filtration for well and municipal water. Better Business Bureau A-rated. Serving Western North Carolina and 80 miles around."
        posterSrc="/images/hero/tap-fill.jpg"
        posterAlt="Water pouring cleanly from a faucet in an Asheville area home"
        primaryCtaLabel="Get Your Free Water Test"
        primaryCtaHref="/contact"
        secondaryCtaLabel="See Our Systems"
        secondaryCtaHref="/services"
      />

      {/* Marquee ticker - CSS animation only, no JS dependency */}
      <div className="marquee-outer" aria-hidden="true">
        <div className="marquee-track">
          {/* Two identical copies for seamless loop */}
          {[0, 1].map((copy) => (
            <span key={copy} className="marquee-item">
              {MARQUEE_ITEMS.map((text, idx) => (
                <span key={idx} style={{ display: "inline-flex", alignItems: "center", gap: "1.5rem" }}>
                  {text}
                  <span className="marquee-dot" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Hero form band - lead capture below full-bleed hero */}
      <section style={{ backgroundColor: "var(--color-surface-alt)", borderBottom: "1px solid var(--color-border)" }}>
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-12 items-center">
            <div>
              <p className="eyebrow mb-3 block">FREE IN-HOME WATER TEST</p>
              <h2>Find out exactly what is in <em>your</em> water.</h2>
              <p className="mt-4" style={{ color: "var(--color-ink-muted)" }}>
                Our technician comes to your home, tests your water on the spot, and walks you through the results. No charge. No commitment.
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {[
                  "Better Business Bureau A-rated Asheville company",
                  "Same-day results, explained in plain language",
                  "$0 down financing available from $96/month",
                ].map((item) => (
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
                <span>Better Business Bureau A Rating</span>
                <span aria-hidden="true">|</span>
                <span>Asheville + 80 Miles</span>
                <span aria-hidden="true">|</span>
                <a href={phoneHref} className="font-semibold" style={{ color: "var(--color-accent-text)" }}>{phone}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* H-02: WhySystems - asymmetric editorial split (headline left, reasons right) */}
      <section className="section">
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: editorial headline column */}
            <div className="lg:col-span-4">
              <span className="eyebrow mb-4 block">WHY IT MATTERS</span>
              <h2>
                Your water passes safety tests. It still might not be{" "}
                <em>clean enough.</em>
              </h2>
              <p className="mt-6" style={{ color: "var(--color-ink-muted)" }}>
                Municipal water meets EPA minimums. That is not the same as water you actually want to drink, cook with, or bathe in.
              </p>
              <a
                href="/contact"
                className="btn btn-primary btn-sweep mt-8 inline-flex"
                data-cta="quote"
                style={{ borderRadius: 0 }}
              >
                <span>Get Your Free Test</span>
                <span className="btn-arrow" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
                </span>
              </a>
            </div>
            {/* Right: reasons list */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {[
                {
                  title: "Chlorine Is Added on Purpose",
                  body: "Chlorine kills bacteria in the treatment plant and stays in your pipes. By the time it reaches your tap, it affects taste, odor, and skin.",
                },
                {
                  title: "Hard Water Damages More Than Fixtures",
                  body: "Calcium and magnesium in hard water build scale inside water heaters, dishwashers, and pipes - shortening their life and raising utility bills.",
                },
                {
                  title: "Private Wells Have No Municipal Oversight",
                  body: "Well water bypasses city treatment entirely. Iron, bacteria, sediment, and hardness vary by property and require site-specific testing to identify.",
                },
              ].map((reason, idx) => (
                <div
                  key={reason.title}
                  className="flex gap-6 items-start"
                  style={{ paddingBottom: idx < 2 ? "2rem" : 0, borderBottom: idx < 2 ? "1px solid var(--color-border)" : "none" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)",
                      fontWeight: 400,
                      color: "var(--color-accent-text)",
                      lineHeight: 1,
                      flexShrink: 0,
                      width: "2.5rem",
                    }}
                    aria-hidden="true"
                  >
                    {["I.", "II.", "III."][idx]}
                  </span>
                  <div>
                    <h3 style={{ marginBottom: "0.5rem" }}>{reason.title}</h3>
                    <p style={{ color: "var(--color-ink-muted)" }}>{reason.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* H-03: Systems:grid - four-column card grid */}
      <Systems
        data-section="systems-grid"
        variant="grid"
        eyebrow="OUR SYSTEMS"
        headline="Four solutions. One matches your water."
        tone="alt"
        systems={[
          {
            name: "Water Filters",
            description:
              "Point-of-use filters remove chlorine, sediment, and taste issues at a single tap without changing your whole plumbing setup.",
            imageSrc: "/images/people/glass-faucet.jpg",
            imageAlt: "Asheville homeowner filling a glass at a clean kitchen faucet",
            ctaLabel: "Remove chlorine and sediment at your tap",
            ctaHref: "/services/water-filters",
          },
          {
            name: "Water Filtration",
            description:
              "Whole-home filtration treats every outlet in the house before water reaches any tap, shower, or appliance.",
            imageSrc: "/images/people/dad-son.jpg",
            imageAlt: "Father and son washing hands at a clean sink in their home",
            ctaLabel: "Cleaner water from every tap in your house",
            ctaHref: "/services/water-filtration",
          },
          {
            name: "Water Softeners",
            description:
              "Softeners exchange calcium and magnesium for sodium ions, stopping scale buildup and protecting appliances throughout the home.",
            imageSrc: "/images/people/mom-son.jpg",
            imageAlt: "Mother and son enjoying clean water in their home",
            ctaLabel: "Stop hard water buildup on fixtures and appliances",
            ctaHref: "/services/water-softeners",
          },
          {
            name: "Well Water",
            description:
              "Dedicated well water treatment handles iron, sulfur, bacteria, and sediment common in WNC private wells.",
            imageSrc: "/images/hero/family-dinner.jpg",
            imageAlt: "Family at the dinner table with a pitcher of clean well water",
            ctaLabel: "Tested and treated for what your well actually contains",
            ctaHref: "/services/well-water",
          },
        ]}
      />

      {/* H-04: WaterHook - pain point grid */}
      <section className="section on-alt" data-section="water-hook">
        <div className="shell">
          <p className="eyebrow mb-4 block">SOUND FAMILIAR?</p>
          <h2>
            You notice it every day. You just do not know what to do{" "}
            <em>about it.</em>
          </h2>
          <p className="mt-4 mb-12" style={{ color: "var(--color-ink-muted)", maxWidth: "56ch" }}>
            Most water problems give you daily reminders. Here are the ones Asheville homeowners call us about most.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {[
              {
                title: "Scale on Faucets and Fixtures",
                body: "White buildup that returns no matter how often you clean.",
              },
              {
                title: "A Chlorine Smell from the Tap",
                body: "City water that smells like a pool when it runs.",
              },
              {
                title: "Yellowish or Rust Stains in the Sink",
                body: "Iron staining that discolors porcelain and grout permanently.",
              },
              {
                title: "Water That Tastes Off",
                body: "Flat, metallic, or chemical flavor even when chilled.",
              },
              {
                title: "Soap That Won't Lather",
                body: "Hard water leaves film on skin and dull residue on dishes.",
              },
              {
                title: "Bottles and Filters That Keep Running Out",
                body: "Constant restocking costs more than a permanent solution would.",
              },
            ].map((concern) => (
              <div
                key={concern.title}
                className="p-6"
                style={{
                  border: "1px solid var(--color-border)",
                  background: "var(--color-surface)",
                  color: "var(--color-ink)",
                }}
              >
                <h3
                  className="text-base font-semibold mb-2"
                  style={{ color: "var(--color-ink)" }}
                >
                  {concern.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{ color: "var(--color-ink-muted)" }}
                >
                  {concern.body}
                </p>
              </div>
            ))}
          </div>

          {/* ConcernRouter - interactive solution finder */}
          <div
            className="max-w-2xl mx-auto bg-white p-8"
            style={{ border: "2px solid var(--color-accent-fill)", color: "var(--color-ink)" }}
          >
            <h3
              className="text-lg font-semibold mb-2 text-center"
              style={{ color: "var(--color-ink)" }}
            >
              Which System Is Right for You?
            </h3>
            <p
              className="text-sm text-center mb-6"
              style={{ color: "var(--color-ink-muted)" }}
            >
              Tell us your biggest concern and we will point you in the right direction.
            </p>
            <ConcernRouter facts={toolFacts} />
          </div>
          <p className="mt-6 text-center text-sm" style={{ color: "var(--color-ink-muted)" }}>
            Prefer to talk? Call{" "}
            <a
              href={phoneHref}
              style={{ color: "var(--color-accent-text)", fontWeight: 600 }}
            >
              {phone}
            </a>
          </p>
        </div>
      </section>

      {/* H-05: Process - roman numeral I-IV steps (no JS, CSS layout only) */}
      <section className="section">
        <div className="shell">
          <div className="mb-16">
            <span className="eyebrow mb-4 block">HOW IT WORKS</span>
            <h2>Three steps from test to <em>clean water.</em></h2>
          </div>
          <div className="roman-process">
            {[
              {
                numeral: "I.",
                title: "Free Water Test",
                description:
                  "A certified technician visits your home, tests your water supply on-site, and documents specific contaminant levels before recommending any system.",
              },
              {
                numeral: "II.",
                title: "System Recommendation",
                description:
                  "Based on your test results, we recommend the right system for your water type and your budget - not what earns the highest margin.",
              },
              {
                numeral: "III.",
                title: "Same-Day Installation",
                description:
                  "Our local team installs your system, usually in a single day. You get clean water the same afternoon we arrive.",
              },
            ].map((step) => (
              <div key={step.numeral} className="flex flex-col gap-4">
                <span className="roman-step-num" aria-hidden="true">
                  {step.numeral}
                </span>
                <h3>{step.title}</h3>
                <p style={{ color: "var(--color-ink-muted)" }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FollowTheWater - water path diagram on dark background */}
      <FollowTheWater
        eyebrow="FROM SOURCE TO TAP"
        headline="Where each treatment stage fits."
        subhead="Every system follows water through the same path. Here is what happens at each stop."
        stages={[
          {
            label: "Water Source",
            note: "Well or municipal line enters the home.",
          },
          {
            label: "Pre-Filter Stage",
            note: "Sediment and large particles removed first.",
          },
          {
            label: "Treatment System",
            note: "Iron, hardness, chlorine, or bacteria addressed by the matched system.",
          },
          {
            label: "Clean Tap",
            note: "Filtered water at every faucet, shower, and appliance.",
          },
        ]}
        ctaLabel="Get Your Free Water Test"
        ctaHref="/contact"
      />

      {/* H-06: ProofBand - promise strip */}
      <ProofBand
        variant="promise"
        items={[
          { value: "Better Business Bureau A Rating", label: "Accredited business serving Asheville" },
          {
            value: "80-Mile Coverage",
            label: "Western North Carolina service territory",
          },
          {
            value: "Free Test Included",
            label: "Water quality check before any recommendation",
          },
          {
            value: "Well + Municipal",
            label: "We treat both water sources. Not all companies do.",
          },
        ]}
      />

      {/* H-07: OriginStory:community-anchor */}
      <OriginStory
        eyebrow="OUR COMMITMENT"
        headline="A local Asheville business invested in this community."
        body="Pure Home 365 was built around a simple idea: every home deserves water that is safe, clean, and right for the way that home actually uses water. We customize our systems to meet your needs whether you are on a well or a municipal line. We carry a variety of solutions - not to overwhelm you with choices, but to make sure something fits your needs and your budget. We are not a national franchise. We are a local Asheville company, and the communities we serve are the communities we live in."
        imageSrc="/images/local/asheville-install-scene.jpg"
        imageAlt="Professional water treatment installation in an Asheville area home"
        ctaLabel="Get a Free Assessment"
        ctaHref="/contact"
        tone="light"
      />

      {/* H-08: Stat band with count-up animation via IntersectionObserver */}
      <section className="section on-alt">
        <div className="shell">
          <CountUpStats
            stats={[
              { value: "A", label: "Better Business Bureau Accredited Rating" },
              {
                numericValue: 80,
                suffix: " mi",
                label: "Service Radius from Asheville",
              },
              { numericValue: 4, label: "System Types Available" },
              { value: "Free", label: "Water Quality Test Included" },
            ]}
          />
        </div>
      </section>

      {/* H-08b: Testimonials - Google review grid with portrait placeholder */}
      <section className="section">
        <div className="shell">
          <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: editorial headline */}
            <div className="lg:col-span-5">
              <span className="eyebrow mb-4 block">WHAT ASHEVILLE HOMEOWNERS SAY</span>
              <h2>Real reviews. <em>Real results.</em></h2>
              <p className="mt-4" style={{ color: "var(--color-ink-muted)" }}>
                Every review below is from a homeowner in Western NC who had us test and treat their water.
              </p>
              {/* 4.9 rating badge */}
              <div
                className="mt-8 inline-flex flex-col items-center gap-1 p-5"
                style={{ border: "2px solid var(--color-accent-fill)" }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "3.5rem",
                    fontWeight: 400,
                    lineHeight: 1,
                    color: "var(--color-accent-fill)",
                  }}
                >
                  4.9
                </p>
                <div className="flex items-center gap-0.5" aria-label="4.9 out of 5 stars">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <svg
                      key={n}
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="var(--color-accent-fill)"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs font-semibold" style={{ color: "var(--color-ink-muted)" }}>
                  Google Rating
                </span>
              </div>
            </div>
            {/* Right: featured testimonial with portrait placeholder */}
            <div className="lg:col-span-7">
              <div
                className="p-8"
                style={{ backgroundColor: "var(--color-surface-alt)", border: "1px solid var(--color-border)" }}
              >
                <div className="flex items-start gap-5 mb-6">
                  {/* Portrait placeholder - client photo pending */}
                  <div
                    data-slot="portrait-pending"
                    style={{
                      width: 64,
                      height: 64,
                      backgroundColor: "var(--color-border)",
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold" style={{ color: "var(--color-ink)" }}>
                      Angela R.
                    </p>
                    <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>
                      Weaverville, NC
                    </p>
                    <div className="flex items-center gap-0.5 mt-1" aria-label="5 out of 5 stars">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <svg
                          key={n}
                          width="13"
                          height="13"
                          viewBox="0 0 20 20"
                          fill="var(--color-accent-fill)"
                          aria-hidden="true"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)",
                    fontStyle: "italic",
                    lineHeight: 1.5,
                    color: "var(--color-ink)",
                  }}
                >
                  &quot;Very honest company. They told us we didn&apos;t need the most expensive system for our situation and recommended a simpler filter that solved the problem. Rare to find a contractor that works that way.&quot;
                </p>
              </div>
            </div>
          </div>

          {/* Review grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                name: "Jessica M.",
                location: "Asheville, NC",
                rating: 5,
                review:
                  "Rob and his team were incredibly professional. They tested our well water, explained everything clearly, and installed a full filtration system in one day. Our water tastes completely different now. Worth every penny.",
              },
              {
                name: "David H.",
                location: "Hendersonville, NC",
                rating: 5,
                review:
                  "We had terrible iron staining in every sink and shower. Pure Home 365 came out, did a full water test, and had us fixed within a week. The staining is gone. I wish we had called sooner.",
              },
              {
                name: "Tom S.",
                location: "Black Mountain, NC",
                rating: 5,
                review:
                  "Had a chlorine smell issue with city water. The whole-home carbon filter fixed it immediately. Installation was clean and quick. Rob answered every question I had before and after.",
              },
              {
                name: "Karen L.",
                location: "Brevard, NC",
                rating: 5,
                review:
                  "The free water test was a real test, not a sales pitch. They found issues I didn't even know I had and explained exactly what each one meant. Very thorough and no pressure at all.",
              },
              {
                name: "Mike P.",
                location: "Waynesville, NC",
                rating: 5,
                review:
                  "Our well water had a sulfur smell. Pure Home 365 installed a system that took care of it completely. Local company, fast response, and they actually know Western NC water.",
              },
              {
                name: "Linda T.",
                location: "Arden, NC",
                rating: 5,
                review:
                  "From the first call to the installation, everything was handled professionally. The water quality in our home is noticeably better. We have already recommended them to two neighbors.",
              },
            ].map((testimonial) => (
              <article
                key={testimonial.name}
                className="card flex flex-col gap-4 p-6"
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div
                  className="flex items-center gap-1"
                  aria-label={`${testimonial.rating} out of 5 stars`}
                >
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg
                      key={i}
                      width="14"
                      height="14"
                      viewBox="0 0 20 20"
                      fill="var(--color-accent-fill)"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p
                  className="flex-1 text-sm leading-relaxed"
                  style={{ color: "var(--color-ink)" }}
                >
                  &quot;{testimonial.review}&quot;
                </p>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--color-ink)" }}>
                    {testimonial.name}
                  </p>
                  <p className="text-xs" style={{ color: "var(--color-ink-muted)" }}>
                    {testimonial.location}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* H-09: Savings editorial split - asymmetric left headline / right data */}
      <section className="section on-alt">
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="eyebrow mb-4 block">HOW MUCH COULD YOU SAVE?</span>
              <h2>
                Up to $2,750 a year in{" "}
                <em>water costs.</em>
              </h2>
              <p className="mt-4" style={{ color: "var(--color-ink-muted)" }}>
                Between bottled water, filter replacements, appliance repairs from hard water, and energy loss from scale buildup, most Asheville households spend more on water than they realize.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="/contact"
                  className="btn btn-primary btn-sweep"
                  data-cta="quote"
                  style={{ borderRadius: 0 }}
                >
                  <span>Get a Free Savings Estimate</span>
                  <span className="btn-arrow" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
                  </span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              {[
                { label: "Bottled water per year", value: "~$900" },
                { label: "Filter replacements", value: "~$600" },
                { label: "Appliance damage (hard water)", value: "~$800" },
                { label: "Energy loss from scale", value: "~$450" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="p-6"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.6rem, 2.5vw, 2.25rem)",
                      fontWeight: 400,
                      color: "var(--color-accent-fill)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {row.value}
                  </p>
                  <p className="text-xs" style={{ color: "var(--color-ink-muted)" }}>
                    {row.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* H-10: FullBleedBand */}
      <FullBleedBand
        tone="light"
        imageSrc="/images/featured/install-featured-2.jpg"
        imageAlt="Professional whole-home water system installation, Asheville NC"
        eyebrow="INSTALLATION QUALITY"
        headline="Professional installations. Every time."
        body="Every system we install is set up to last - proper plumbing, correct sizing, clean work. No mess left behind, no shortcuts taken."
        ctaLabel="View Gallery"
        ctaHref="/gallery"
      />

      {/* H-11: FAQ */}
      <Faq
        eyebrow="COMMON QUESTIONS"
        headline="What Asheville homeowners ask us."
        items={[
          {
            question: "Do you work with well water?",
            answer:
              "Yes. Well water is a specialty. We test for iron, sulfur, bacteria, hardness, and other common well contaminants before recommending anything.",
          },
          {
            question: "How long does installation take?",
            answer:
              "Most whole-home systems are installed in a single day. Simpler point-of-use systems are done in a few hours.",
          },
          {
            question: "Do you require a long-term contract?",
            answer:
              "No. We offer financing options that work month to month, and outright purchase if that is what you prefer.",
          },
          {
            question: "What is a free water test?",
            answer:
              "We come to your home with testing equipment, run a panel on your water, and walk you through the results. No charge, no commitment.",
          },
          {
            question: "Do you serve areas outside Asheville?",
            answer:
              "Yes. We serve any community within 80 miles of Asheville, which covers most of Western NC.",
          },
          {
            question: "What if something goes wrong after install?",
            answer:
              "We are a local company. We come back. No call centers, no national warranty runaround.",
          },
        ]}
      />

      {/* H-12: ServiceAreas */}
      <ServiceAreas
        eyebrow="SERVICE AREA"
        headline="Serving Asheville and 80 miles around."
        areas={[
          {
            name: "Asheville Metro",
            subtitle: "Buncombe County",
            places: [
              "Asheville",
              "Weaverville",
              "Arden",
              "Swannanoa",
              "Black Mountain",
            ],
          },
          {
            name: "Southern WNC",
            subtitle: "Henderson, Transylvania, Haywood",
            places: [
              "Brevard",
              "Hendersonville",
              "Fletcher",
              "Flat Rock",
              "Waynesville",
              "Canton",
            ],
          },
          {
            name: "Extended Coverage",
            subtitle: "80-mile radius",
            places: [
              "Boone",
              "Burnsville",
              "Bryson City",
              "Morganton",
              "Marion",
              "Hickory",
            ],
          },
        ]}
        tone="light"
      />

      {/* H-13: ClosingCta */}
      <ClosingCta
        headline="Clean water starts with a free test."
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
