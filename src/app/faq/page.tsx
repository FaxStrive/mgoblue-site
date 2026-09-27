import type { Metadata } from "next";
import { facts } from "@/lib/facts";
import { VideoHero, Faq, ProofBand, ClosingCta } from "@/components/sections";

export const metadata: Metadata = {
  title: "FAQ | Pure Home 365 - Asheville Water Treatment Questions Answered",
  description:
    "Answers to common questions about water treatment, installation, financing, and service areas for Asheville, NC homeowners.",
};

export default function FaqPage() {
  const phone = facts.phone;
  const phoneHref = facts.phoneHref;

  return (
    <main>
      <VideoHero
        variant="centered"
        eyebrow="FREQUENTLY ASKED QUESTIONS"
        headline="Answers to Common Questions About Water Treatment"
        subhead="Straight answers about systems, installation, and what to expect."
        primaryCtaLabel="Schedule a Free Test"
        primaryCtaHref="/contact"
        secondaryCtaLabel={`Call ${phone}`}
        secondaryCtaHref={phoneHref}
      />

      <Faq
        eyebrow="ALL QUESTIONS"
        headline="What Asheville Homeowners Ask Us"

        items={[
          { question: "Do you work with well water?", answer: "Yes, it is a core specialty. We test for iron, sulfur, hardness, bacteria, and other well-specific issues before recommending anything." },
          { question: "How long does installation take?", answer: "Most whole-home systems take one day. Point-of-use systems are done in a few hours." },
          { question: "Do you require a contract?", answer: "No. We offer flexible financing with no long-term contract, and outright purchase for those who prefer it." },
          { question: "What does a free water test involve?", answer: "We bring testing equipment to your home, run a panel on your tap and well water, and walk you through the results in plain language." },
          { question: "Can you work with my existing plumbing?", answer: "In most cases, yes. During the free assessment we identify any plumbing considerations before any commitment." },
          { question: "What is water hardness and why does it matter?", answer: "Hardness refers to calcium and magnesium in the water. Over time it causes scale buildup in pipes, shorter appliance lifespan, and reduced soap lathering." },
          { question: "Do you serve areas outside Asheville?", answer: "Yes, 80 miles in all directions from Asheville covers most of WNC." },
          { question: "What if something breaks after install?", answer: "We are a local company and we come back. No call centers or warranty runaround." },
          { question: "Is filtered water better for cooking?", answer: "Many homeowners notice a difference in taste when cooking with filtered water. Chlorine removal alone makes a measurable difference." },
          { question: "How do I know what contaminants are in my water?", answer: "Our free water test gives you a baseline. For a full panel including PFAS, we can coordinate a lab test." },
          { question: "What is the difference between a filter and a softener?", answer: "A filter removes contaminants and particles. A softener specifically targets water hardness (calcium and magnesium). Many homes benefit from both." },
          { question: "Can I get a point-of-use filter instead of a whole-home system?", answer: "Yes. We carry both options and will recommend what makes sense for your water and your budget." },
        ]}
      />

      <ProofBand
        variant="promise"
        items={[
          { value: "Better Business Bureau A Rating", label: "Accredited business in Asheville." },
          { value: "Free Water Test", label: "Your test answers more than any FAQ." },
          { value: "Local Team", label: "We are a phone call away." },
          { value: "No Contract", label: "Flexible options, no lock-in." },
        ]}
      />

      <ClosingCta
        headline="Ready to Get Started?"
        subhead="A free water test answers more questions than any FAQ. We come to you."
        primaryCtaLabel="Book My Free Water Test"
        primaryCtaHref="/contact"
        secondaryCtaLabel={`Call ${phone}`}
        secondaryCtaHref={phoneHref}
        variant="band"
      />
    </main>
  );
}
