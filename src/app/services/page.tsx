import type { Metadata } from "next";
import { facts } from "@/lib/facts";
import {
  VideoHero,
  WhySystems,
  Systems,
  ProofBand,
  ServiceAreas,
  ClosingCta,
} from "@/components/sections";

export const metadata: Metadata = {
  title: "Water Treatment Services | Pure Home 365 - Asheville NC",
  description:
    "Water filters, water filtration, water softeners, and well water treatment for Asheville, NC and 80 miles. Better Business Bureau A rated. Free water test.",
};

export default function ServicesPage() {
  const phone = facts.phone;
  const phoneHref = facts.phoneHref;

  return (
    <main>
      <VideoHero
        variant="centered"
        eyebrow="OUR SERVICES"
        headline="Water Treatment Systems for Every Asheville Home"
        subhead="Well water, city water, whole-home or point-of-use. We carry solutions for all of it."
        primaryCtaLabel="Get a Free Water Test"
        primaryCtaHref="/contact"
        secondaryCtaLabel={`Call ${phone}`}
        secondaryCtaHref={phoneHref}
        posterSrc="/images/services/services-hero-bg.jpg"
        posterAlt="Water treatment systems"
      />

      <Systems
        variant="grid"
        eyebrow="CHOOSE YOUR SOLUTION"
        headline="Choose Your Solution"
        tone="light"
        systems={facts.services.map((s) => ({
          name: s.name,
          description: s.description,
          imageSrc: `/images/services/idx-${s.slug}.jpg`,
          imageAlt: `${s.name} system overview`,
          ctaLabel: `Learn More →`,
          ctaHref: `/services/${s.slug}`,
        }))}
      />

      <WhySystems
        eyebrow="WHY WATER TREATMENT"
        headline="Why Water Treatment Matters"
        tone="alt"
        variant="cards"
        reasons={[
          {
            title: "Hard Water Damage",
            body: "Hard water causes scale buildup in pipes and appliances, reducing efficiency and lifespan over time.",
          },
          {
            title: "Contaminant Health Impacts",
            body: "Chlorine, PFAS, iron and biological contaminants affect taste, smell, and long-term health.",
          },
          {
            title: "Cost vs. Bottled Water",
            body: "Families spending $50 to $150 per month on bottled water can eliminate that cost with whole-home filtration.",
          },
        ]}
      />

      <ProofBand
        variant="promise"
        items={[
          { value: "Better Business Bureau A Rating", label: "Accredited business in Asheville, NC." },
          { value: "Free Water Test", label: "Every recommendation starts with your own results." },
          { value: "Local Asheville Team", label: "Your neighbors. Not a call center." },
          { value: "No High-Pressure Sales", label: "We test first and recommend based on what we find." },
        ]}
      />

      <ServiceAreas
        eyebrow="WE COME TO YOU"
        headline="We Come to You"
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
        headline="Not Sure Which System You Need?"
        subhead="Our free water test tells you exactly what is in your water and what will fix it."
        primaryCtaLabel="Get My Free Test"
        primaryCtaHref="/contact"
        secondaryCtaLabel={`Call ${phone}`}
        secondaryCtaHref={phoneHref}
        variant="band"
      />
    </main>
  );
}
