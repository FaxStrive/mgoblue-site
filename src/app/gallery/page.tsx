import type { Metadata } from "next";
import { facts } from "@/lib/facts";
import { VideoHero, ProofBand, ClosingCta } from "@/components/sections";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Installation Gallery | Pure Home 365 - Asheville Water Treatment",
  description:
    "Real water treatment system installations by Pure Home 365 across Asheville and Western North Carolina.",
};

const galleryImages = [
  { src: "/images/gallery/install-01.jpg", caption: "Recent installation - Asheville area", alt: "Water treatment system installation, Asheville NC" },
  { src: "/images/gallery/install-02.jpg", caption: "Whole-home filtration install - WNC residential", alt: "Whole-home water filtration installation, Western NC" },
  { src: "/images/gallery/install-03.jpg", caption: "Water softener system - Buncombe County", alt: "Water softener installed in Buncombe County home" },
  { src: "/images/gallery/install-04.jpg", caption: "Well water treatment - rural Western NC", alt: "Well water treatment system installation" },
  { src: "/images/gallery/install-05.jpg", caption: "Under-sink filtration - Asheville residence", alt: "Under-sink water filter installation" },
  { src: "/images/gallery/install-06.jpg", caption: "Whole-home system - Henderson County", alt: "Whole-home water system installation, Henderson County NC" },
  { src: "/images/gallery/install-07.jpg", caption: "Plumbing connections - professional finish", alt: "Professional water system plumbing connections" },
  { src: "/images/gallery/install-08.jpg", caption: "Water softener installation - Haywood County", alt: "Water softener installed in Haywood County home" },
  { src: "/images/gallery/install-09.jpg", caption: "Multi-stage filtration - Mountain home", alt: "Multi-stage water filtration system in mountain home" },
  { src: "/images/gallery/install-10.jpg", caption: "System inspection - post-installation", alt: "Post-installation water system inspection" },
];

export default function GalleryPage() {
  const phone = facts.phone;
  const phoneHref = facts.phoneHref;

  return (
    <main>
      <VideoHero
        variant="centered"
        eyebrow="INSTALLATION GALLERY"
        headline="A Look at Professional Installations"
        subhead="Water treatment systems installed by our Asheville team across Western North Carolina."
        primaryCtaLabel="Get Your Free Water Test"
        primaryCtaHref="/contact"
        secondaryCtaLabel={`Call ${phone}`}
        secondaryCtaHref={phoneHref}
      />

      <section className="section">
        <div className="shell">
          <p className="eyebrow mb-6">REAL ASHEVILLE INSTALLATIONS</p>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((img) => (
              <figure key={img.src} className="break-inside-avoid mb-0">
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }} data-aspect="4/3">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="text-xs mt-2 pb-4" style={{ color: "var(--color-ink-muted)" }}>
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <ProofBand
        variant="promise"
        items={[
          { value: "Every install", label: "looks like this. Professional finish guaranteed." },
          { value: "Better Business Bureau A Rating", label: "Accredited business in Asheville." },
          { value: "Local Team", label: "Same technicians every time." },
          { value: "Free Test First", label: "We design around your water." },
        ]}
      />

      <ClosingCta
        headline="Ready for a Clean Water Installation in Your Home?"
        subhead="Start with a free water test. We design the right system and install it to last."
        primaryCtaLabel="Get My Free Water Test"
        primaryCtaHref="/contact"
        secondaryCtaLabel={`Call ${phone}`}
        secondaryCtaHref={phoneHref}
        variant="band"
      />
    </main>
  );
}
