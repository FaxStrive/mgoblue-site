import type { Metadata } from "next";
import { facts } from "@/lib/facts";
import { VideoHero, ServiceAreas, Process, ClosingCta } from "@/components/sections";

export const metadata: Metadata = {
  title: "Service Areas | Pure Home 365 - Water Treatment Across Western NC",
  description:
    "Pure Home 365 serves Asheville and 80 miles around, covering all of Western North Carolina. Free water test for every area.",
};

export default function ServiceAreasPage() {
  const phone = facts.phone;
  const phoneHref = facts.phoneHref;

  return (
    <main>
      <VideoHero
        variant="centered"
        eyebrow="SERVICE COVERAGE"
        headline="Serving Western North Carolina Within 80 Miles of Asheville"
        subhead="From Boone to Bryson City, from Hendersonville to Hickory - if you are in WNC, we come to you."
        primaryCtaLabel="Check My Coverage"
        primaryCtaHref="/contact"
        secondaryCtaLabel={`Call ${phone}`}
        secondaryCtaHref={phoneHref}
      />

      <ServiceAreas
        eyebrow="OUR COVERAGE AREA"
        headline="Serving Asheville and 80 Miles Around"
        areas={[
          {
            name: "Asheville Metro",
            subtitle: "Buncombe County",
            places: ["Asheville", "Weaverville", "Arden", "Swannanoa", "Black Mountain"],
          },
          {
            name: "Southern WNC",
            subtitle: "Henderson, Transylvania",
            places: ["Brevard", "Hendersonville", "Fletcher", "Flat Rock"],
          },
          {
            name: "Haywood County",
            subtitle: "Western Buncombe",
            places: ["Waynesville", "Canton", "Clyde"],
          },
          {
            name: "Far Western NC",
            subtitle: "Jackson, Swain, Macon",
            places: ["Sylva", "Bryson City", "Franklin"],
          },
          {
            name: "Northern Mountains",
            subtitle: "Watauga, Avery, Yancey",
            places: ["Boone", "Blowing Rock", "Burnsville", "Spruce Pine"],
          },
          {
            name: "Eastern Foothills",
            subtitle: "McDowell, Burke, Catawba",
            places: ["Marion", "Morganton", "Lenoir", "Hickory"],
          },
        ]}
        tone="light"
      />

      {/* Water problems note */}
      <section className="section on-alt">
        <div className="shell">
          <p className="eyebrow mb-4">WE KNOW WNC WATER</p>
          <h2 className="mb-8">We Know WNC Water</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Well Water Iron", body: "Mountain aquifer water in WNC commonly carries iron that causes staining and metallic taste. Oxidation filtration removes it." },
              { title: "Municipal Chlorine", body: "Asheville and other WNC municipal systems use chlorine. Carbon filtration removes taste and odor at the point of entry." },
              { title: "Mountain Sediment", body: "WNC watershed sources carry fine sediment, especially after heavy rain. Pre-filtration keeps it out of your plumbing." },
            ].map((item) => (
              <div key={item.title} className="p-6" style={{ border: "1px solid var(--color-border)", background: "var(--color-surface)" }}>
                <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                <p style={{ color: "var(--color-ink-muted)", lineHeight: "1.65" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Process
        eyebrow="GETTING STARTED"
        headline="Getting Started in Your Area"
        tone="light"
        variant="steps"
        steps={[
          { title: "Free Water Test", description: "Wherever you are in WNC, we come to you. We test your water and show you the results at no charge." },
          { title: "Custom Recommendation", description: "We recommend the right system for your water profile and your budget, based on what we actually find." },
          { title: "Local Installation", description: "Our Asheville-based team installs your system, typically in a single day." },
        ]}
      />

      <ClosingCta
        headline="Is Your Town in Our Coverage Area?"
        subhead="Call or schedule online - we confirm your coverage in seconds and can have a technician at your home within the week."
        primaryCtaLabel="Check My Coverage"
        primaryCtaHref="/contact"
        secondaryCtaLabel={`Call ${phone}`}
        secondaryCtaHref={phoneHref}
        variant="band"
      />
    </main>
  );
}
