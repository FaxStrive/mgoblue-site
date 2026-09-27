// Shared shape for the client facts these four components read from.
//
// In a generated site this is what `@/lib/facts` exports (or a subset of
// it). Nothing in this file is client-specific; it only describes the
// shape. A real build's `@/lib/facts` module should satisfy this type, or
// a build script maps the onboarding record (see
// fixtures/onboarding/*.json in this repo) onto it.
//
// Every field is optional on purpose. A missing field means the component
// renders without that piece, never a placeholder number or an invented
// claim standing in for it.

export type PricingOffer = {
  /** Short name for the offer, e.g. "Monthly plan", "Cash offer". */
  name: string;
  /** Upfront cost, as the client states it. Free text, not always a number. */
  upfront?: string;
  /** Monthly cost, as the client states it. Free text, not always a number. */
  monthly?: string;
  /** Who the offer suits. One sentence. */
  bestFor?: string;
};

export type ClientFacts = {
  company?: {
    name?: string;
    phone?: string;
    phoneHref?: string;
  };
  /**
   * The real offers this client sells. PricingTable renders exactly these
   * and nothing else. An empty or missing array means PricingTable shows
   * the free-test call to action only, never a fabricated price.
   */
  offers?: PricingOffer[];
  /**
   * The single offer line used to close the savings calculator, e.g.
   * "$NN a month, no money down" (the client's own figure). Free text because financing offers
   * do not reduce to one number. Missing means the calculator closes on a
   * plain "See your offer" call to action instead of a price line.
   */
  primaryOfferLabel?: string;
  contact?: {
    /** Path the concern router and CTAs send visitors to. Default "/contact". */
    path?: string;
    /** Anchor used by on-page CTAs that scroll to a form instead of navigating. Default "#lead-form". */
    formAnchor?: string;
  };
  gallery?: {
    /**
     * Category labels for gallery filtering, e.g. ["Whole home", "Under
     * sink", "Well systems"]. Falls back to a generic three-category set
     * when the client has not specified their own service lines.
     */
    categories?: string[];
  };
};
