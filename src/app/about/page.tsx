import type { Metadata } from "next";
import { facts } from "@/lib/facts";
import {
  VideoHero,
  WhySystems,
  ProofBand,
  OriginStory,
  ServiceAreas,
  ClosingCta,
} from "@/components/sections";

export const metadata: Metadata = {
  title: "About | Pure Home 365 - Local Asheville Water Treatment",
  description:
    "Pure Home 365 is a local Asheville, NC water treatment company. Custom systems for well and municipal water. Better Business Bureau A rated.",
};

export default function AboutPage() {
  const phone = facts.phone;
  const phoneHref = facts.phoneHref;

  return (
    <main>
      <VideoHero
        variant="centered"
        eyebrow="WHO WE ARE"
        headline="Pure Home 365 - Local Water Treatment for Western NC"
        subhead="We are an Asheville company. We know the water here because we live here."
        primaryCtaLabel="Get a Free Water Test"
        primaryCtaHref="/contact"
        secondaryCtaLabel={`Call ${phone}`}
        secondaryCtaHref={phoneHref}
        posterSrc="/images/about/about-hero.jpg"
        posterAlt="Professional water treatment in Western North Carolina"
      />

      <OriginStory
        eyebrow="OUR STORY"
        headline="Built on a Simple Idea"
        body="Pure Home 365 was built around a simple idea: every home deserves water that is safe, clean, and right for the way that home actually uses water. We customize our systems to meet your needs whether you are on a well or a municipal line. We carry a variety of solutions - not to overwhelm you with choices, but to make sure something fits your needs and your budget. We are Better Business Bureau A rated and committed to honest assessments. We are not a national franchise. We are a local Asheville company, and the communities we serve are the communities we live in. That matters to us in ways it simply cannot matter to a call center in another state. We serve Asheville and an 80-mile radius across Western North Carolina."
        imageSrc="/images/local/asheville-install-scene.jpg"
        imageAlt="Water treatment installation in an Asheville area home"
        ctaLabel="Get a Free Assessment"
        ctaHref="/contact"
        tone="light"
      />

      <WhySystems
        eyebrow="WHY HOMEOWNERS TRUST US"
        headline="Why Homeowners in WNC Trust Pure Home 365"
        tone="alt"
        variant="cards"
        reasons={[
          {
            title: "Community First",
            body: "We are your neighbors. The technician who installs your system is part of the Asheville community.",
          },
          {
            title: "Honest Assessment",
            body: "We test first, recommend second. Nothing gets specified until we know what is in your water.",
          },
          {
            title: "Lasting Relationships",
            body: "We stand behind every installation. If something needs attention, we come back.",
          },
        ]}
      />

      <ProofBand
        variant="promise"
        items={[
          { value: "Better Business Bureau A Rating", label: "Accredited business in Asheville, NC." },
          { value: "Free Water Test", label: "Every recommendation starts with your own test results." },
          { value: "Local Team", label: "Our team lives and works in Western NC." },
          { value: "No Pressure", label: "Honest assessment. No high-pressure sales tactics." },
        ]}
      />

      <ServiceAreas
        eyebrow="WHERE WE WORK"
        headline="Serving Western North Carolina"
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

      <ClosingCta
        headline="Ready to Learn What Is in Your Water?"
        subhead="Your free water test is the first step. No commitment, no pressure."
        primaryCtaLabel="Schedule My Free Test"
        primaryCtaHref="/contact"
        secondaryCtaLabel={`Call ${phone}`}
        secondaryCtaHref={phoneHref}
        variant="band"
      />
    </main>
  );
}
