// facts.ts - MGoBlue LLC / Pure Home 365 (Asheville)
// Generated: 2026-09-25

export type ServiceArea = {
  city: string;
  state: string;
};

export type Service = {
  name: string;
  slug: string;
  description: string;
};

export type Offer = {
  headline: string;
  price: string;
  detail: string;
};

export type Hours = {
  day: string;
  open: string | null;
  close: string | null;
};

export type ClientFacts = {
  companyName: string;
  dba: string;
  phone: string;
  phoneHref: string;
  email: string;
  city: string;
  state: string;
  serviceRadius: string;
  certifications: Array<string>;
  serviceAreas: Array<ServiceArea>;
  services: Array<Service>;
  offers: Array<Offer>;
  hours: Array<Hours>;
  logoPath: string;
};

export const facts: ClientFacts = {
  companyName: "MGoBlue LLC",
  dba: "Pure Home 365",
  phone: "828-532-2015",
  phoneHref: "tel:8285322015",
  email: "robs@purehome365.com",
  city: "Asheville",
  state: "NC",
  serviceRadius: "80 miles",
  services: [
    {
      name: "Water Filters",
      slug: "water-filters",
      description: "Whole-home and point-of-use filters remove contaminants, chlorine, and sediment. Clean water at every tap.",
    },
    {
      name: "Water Filtration",
      slug: "water-filtration",
      description: "Multi-stage filtration systems address complex contamination including iron, sulfur, and biological concerns.",
    },
    {
      name: "Water Softeners",
      slug: "water-softeners",
      description: "Eliminate hardness, scale buildup, and the damage it does to your appliances and plumbing over time.",
    },
    {
      name: "Well Water",
      slug: "well-water",
      description: "Complete well water treatment from source to tap - testing, treatment, and peace of mind for rural homes.",
    },
  ],
  certifications: ["Better Business Bureau A Rating"],
  logoPath: "/logo.svg",
  serviceAreas: [
    { city: "Asheville", state: "NC" },
    { city: "Weaverville", state: "NC" },
    { city: "Arden", state: "NC" },
    { city: "Swannanoa", state: "NC" },
    { city: "Black Mountain", state: "NC" },
    { city: "Brevard", state: "NC" },
    { city: "Hendersonville", state: "NC" },
    { city: "Fletcher", state: "NC" },
    { city: "Flat Rock", state: "NC" },
    { city: "Waynesville", state: "NC" },
    { city: "Canton", state: "NC" },
    { city: "Sylva", state: "NC" },
    { city: "Bryson City", state: "NC" },
    { city: "Morganton", state: "NC" },
    { city: "Marion", state: "NC" },
    { city: "Burnsville", state: "NC" },
    { city: "Spruce Pine", state: "NC" },
    { city: "Boone", state: "NC" },
    { city: "Blowing Rock", state: "NC" },
    { city: "West Jefferson", state: "NC" },
    { city: "Wilkesboro", state: "NC" },
    { city: "Lenoir", state: "NC" },
    { city: "Hickory", state: "NC" },
    { city: "Rutherfordton", state: "NC" },
    { city: "Forest City", state: "NC" },
  ],
  offers: [
    {
      headline: "Whole Home System with $0 Down",
      price: "$96/month",
      detail: "$0 down, after credit check",
    },
    {
      headline: "Buy Now / Pay Now: Wholehouse Units Only",
      price: "$500 off",
      detail: "Purchase and pay by credit card and receive $500 off",
    },
    {
      headline: "Point of Use",
      price: "$200 off",
      detail: "Buy and pay for a point of use for $200 discount",
    },
  ],
  hours: [
    { day: "Monday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Tuesday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Wednesday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Thursday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Friday", open: "8:00 AM", close: "6:00 PM" },
    { day: "Saturday", open: "8:00 AM", close: "4:00 PM" },
    { day: "Sunday", open: null, close: null },
  ],
};

// Service content for detail pages
export type ServiceContent = {
  slug: string;
  name: string;
  subhead: string;
  heroImage: string;
  heroImageAlt: string;
  bodyImage: string;
  bodyImageAlt: string;
  body: string;
  processHeading: string;
  concerns: { title: string; body: string }[];
  whyCards: { title: string; body: string }[];
};

export const serviceContent: Record<string, ServiceContent> = {
  "water-filters": {
    slug: "water-filters",
    name: "Water Filters",
    subhead: "Whole-home and point-of-use filter systems that remove contaminants, chlorine, and sediment from every tap.",
    heroImage: "/images/services/detail/water-filters-detail.jpg",
    heroImageAlt: "Whole-home water filter detail, Asheville NC installation",
    bodyImage: "/images/services/detail/water-filters-body.jpg",
    bodyImageAlt: "Under-sink water filter installed professionally",
    body: `Water filters are the foundation of clean water for Asheville-area homes. Whether your concern is chlorine taste from the municipal supply, sediment in your lines, or trace contaminants you want removed before they reach your family, we carry whole-home and point-of-use solutions that address it.

A whole-home filter installs at your main supply line and treats every tap in the house. Point-of-use systems mount under a kitchen sink and deliver filtered water at that single outlet. Many homeowners start with point-of-use and upgrade to whole-home once they experience the difference.

In Western NC, common filtration needs include chlorine and chloramine from municipal treatment, sediment from older pipes, and tannins from mountain watershed sources. We test your water first, so the system we recommend is sized to what is actually present.

Installation typically takes half a day. We leave your plumbing clean, your filter labeled, and you knowing exactly when to change the cartridge.`,
    processHeading: "How We Install Your Water Filter",
    concerns: [
      { title: "Chlorine Taste and Odor", body: "Municipal water is treated with chlorine. Carbon filters remove it reliably at the point of entry." },
      { title: "Sediment Buildup", body: "Older homes and mountain water sources often carry fine sediment. A sediment pre-filter protects downstream fixtures." },
      { title: "Tannins and Discoloration", body: "Watershed sources in WNC can carry tannins that discolor water. Specialty media addresses this without a softener." },
    ],
    whyCards: [
      { title: "Test Before You Buy", body: "We test your water to confirm what is in it before recommending a filter type. No guessing." },
      { title: "Whole-Home or Point-of-Use", body: "We carry both options and recommend what actually fits your water and your budget." },
      { title: "Local Service After Install", body: "When a cartridge needs changing or a question comes up, we are a local phone call away." },
    ],
  },
  "water-filtration": {
    slug: "water-filtration",
    name: "Water Filtration",
    subhead: "Multi-stage filtration that addresses iron, sulfur, PFAS, and biological contaminants common in WNC water.",
    heroImage: "/images/services/detail/water-filtration-detail.jpg",
    heroImageAlt: "Multi-stage water filtration system",
    bodyImage: "/images/services/detail/water-filtration-body.jpg",
    bodyImageAlt: "Water filtration system mounted on utility room wall",
    body: `Multi-stage water filtration goes beyond basic carbon filters to address the more complex contamination issues common in Western North Carolina. Iron and manganese from well water, sulfur that causes rotten-egg odor, PFAS from industrial sources, and biological concerns all require specific treatment stages that a single-filter system cannot handle.

A multi-stage system typically combines a sediment pre-filter, an iron oxidation or catalytic carbon stage, and a final polishing filter. For biological concerns, UV sterilization is added as a final stage. Each stage targets a specific class of contaminant, so the water leaving your tap has been through a complete treatment sequence.

We use this system type most often for well water customers in WNC, where the combination of iron, hardness, and organic compounds from mountain aquifers requires the full treatment sequence. Municipal customers with PFAS concerns also benefit from the added stages.

We test your water before recommending the stage configuration, so you are not paying for stages you do not need.`,
    processHeading: "How We Install Your Filtration System",
    concerns: [
      { title: "Iron and Manganese", body: "Orange staining and metallic taste are iron and manganese. Oxidation filtration removes them reliably." },
      { title: "Sulfur Odor", body: "The rotten-egg smell in well water is hydrogen sulfide. Catalytic carbon media eliminates it without chemicals." },
      { title: "PFAS and Trace Contaminants", body: "Activated carbon and specific media address PFAS and other trace chemicals municipal treatment does not remove." },
    ],
    whyCards: [
      { title: "Stage Configuration Matched to Your Water", body: "We build the stage count around your test results. No one-size configuration." },
      { title: "Well and Municipal Ready", body: "Multi-stage systems work for both water sources. The stages differ; the result is the same." },
      { title: "Single-Day Installation", body: "Most multi-stage systems are installed and commissioned in one day, with minimal disruption." },
    ],
  },
  "water-softeners": {
    slug: "water-softeners",
    name: "Water Softeners",
    subhead: "Eliminate hard water scale, protect your appliances, and feel the difference in your shower.",
    heroImage: "/images/services/detail/water-softeners-detail.jpg",
    heroImageAlt: "Water softener system installed in residential home",
    bodyImage: "/images/services/detail/water-softeners-body.jpg",
    bodyImageAlt: "Water softener brine tank, professional installation",
    body: `Hard water is the most common water problem in American homes, and Western NC is no exception. Calcium and magnesium in the water supply leave scale deposits in pipes, water heaters, dishwashers, and washing machines. Over time, hard water shortens appliance lifespan, reduces water heater efficiency, and leaves visible buildup on faucets and shower glass.

A water softener works through ion exchange: calcium and magnesium ions are swapped for sodium ions as water passes through the resin tank. The result is soft water that rinses clean, extends appliance life, and eliminates the white crusty scale you see on fixtures today.

Softeners require periodic salt replenishment and a regeneration cycle that flushes the captured minerals. We size the unit to your household water use so regeneration frequency is efficient, and we explain the maintenance schedule at install.

We install both salt-based softeners and salt-free conditioners for households with sodium concerns. We will tell you which one actually makes sense for your water hardness level.`,
    processHeading: "How We Install Your Water Softener",
    concerns: [
      { title: "Scale on Fixtures", body: "White mineral deposits on faucets, showerheads, and shower glass are hard water scale. A softener eliminates it." },
      { title: "Appliance Damage Over Time", body: "Scale buildup inside water heaters and dishwashers reduces efficiency and lifespan. Soft water prevents it." },
      { title: "Dry Skin and Hair", body: "Hard water strips natural oils. Softened water rinses completely clean without the film." },
    ],
    whyCards: [
      { title: "Salt or Salt-Free Options", body: "We carry both types and recommend based on your hardness level and household needs." },
      { title: "Right-Sized for Your Home", body: "Softener capacity is matched to your household water use so efficiency is maintained long-term." },
      { title: "Protects Your Appliance Investment", body: "A softener pays for itself in extended appliance lifespan and reduced energy costs." },
    ],
  },
  "well-water": {
    slug: "well-water",
    name: "Well Water",
    subhead: "Complete well water treatment - testing, treatment, and peace of mind for Western NC rural homes.",
    heroImage: "/images/services/detail/well-water-detail.jpg",
    heroImageAlt: "Residential well water system, Western NC",
    bodyImage: "/images/services/detail/well-water-body.jpg",
    bodyImageAlt: "Well water treatment equipment installation",
    body: `Well water in Western North Carolina comes with its own set of treatment challenges. Iron and manganese from mountain aquifers cause staining and taste issues. Hardness is common in limestone-bearing geology. Bacterial contamination is a concern in shallow wells or wells with aged casings. Sediment enters during heavy rain events. And hydrogen sulfide from decomposing organic matter underground creates the characteristic rotten-egg smell.

The right well water treatment system is built around what is actually in your water, which is why we test first. A lab test or an on-site test panel identifies the specific contaminants present, and we design the treatment sequence around those results. There is no point in installing a softener if your primary issue is iron, or a basic carbon filter if your well has bacteria.

Typical well water treatment sequences in WNC include a sediment pre-filter, iron oxidation, softening or conditioning, and UV sterilization. Point-of-use reverse osmosis is added for households with nitrate concerns or where drinking water quality is the priority.

We serve Buncombe, Henderson, Haywood, and surrounding counties throughout WNC. Well water treatment is our specialty.`,
    processHeading: "How We Treat Your Well Water",
    concerns: [
      { title: "Iron and Staining", body: "WNC well water commonly carries iron that causes orange staining. Oxidation filtration removes it." },
      { title: "Bacterial Contamination", body: "UV sterilization eliminates bacteria and viruses without chemicals or ongoing consumables." },
      { title: "Hardness and Sediment", body: "Mountain aquifer water is often hard and carries sediment. We address both in the same installation." },
    ],
    whyCards: [
      { title: "Well Water is Our Specialty", body: "Well water systems make up the majority of what we install across WNC. We know the aquifer conditions here." },
      { title: "Full Panel Testing First", body: "We test for iron, hardness, bacteria, pH, sulfur, and other well-specific parameters before recommending anything." },
      { title: "Complete Treatment Sequences", body: "We design and install the full treatment chain, not a single component that leaves other problems untouched." },
    ],
  },
};
