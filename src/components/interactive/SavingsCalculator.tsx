"use client";

import { useId, useMemo, useState } from "react";
import type { ClientFacts } from "./facts";

type HardnessLevel = "mild" | "moderate" | "severe";

/**
 * Every rate the calculator uses lives here, in one place, and is rendered
 * back to the visitor in the "Assumptions used" block below. Nothing in
 * this component's math depends on a value that is not shown on screen.
 *
 * These are general household-economics assumptions, not this client's
 * numbers, so they are not read from facts. What IS client-specific, the
 * closing offer, is read from facts.primaryOfferLabel below.
 */
export const ASSUMPTIONS = {
  bottledRatePerGallon: 1.2,
  soapRatePerPerson: 28,
  applianceBaseRate: 95,
  hardnessMultiplier: {
    mild: 0.5,
    moderate: 1.0,
    severe: 1.6,
  },
} as const;

const HARDNESS_LEVELS: { value: HardnessLevel; label: string }[] = [
  { value: "mild", label: "Mild" },
  { value: "moderate", label: "Moderate" },
  { value: "severe", label: "Severe" },
];

const rate = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function LiquidCta({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="group relative inline-flex min-h-[44px] items-center justify-center overflow-hidden bg-[var(--color-accent-fill)] px-8 py-3 text-sm font-semibold tracking-wide text-white uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-y-full bg-[var(--color-ink)] transition-transform duration-500 ease-out group-hover:translate-y-0"
      />
      <span className="relative z-10">{children}</span>
    </a>
  );
}

export default function SavingsCalculator({ facts }: { facts?: ClientFacts }) {
  const [householdSize, setHouseholdSize] = useState(4);
  const [gallonsPerWeek, setGallonsPerWeek] = useState(6);
  const [hardness, setHardness] = useState<HardnessLevel>("moderate");

  const householdId = useId();
  const bottledId = useId();

  const formAnchor = facts?.contact?.formAnchor ?? "#lead-form";
  const offerLabel = facts?.primaryOfferLabel;

  const { bottled, soap, appliance, total } = useMemo(() => {
    const multiplier = ASSUMPTIONS.hardnessMultiplier[hardness];
    const bottledCost = gallonsPerWeek * ASSUMPTIONS.bottledRatePerGallon * 52;
    const soapCost = householdSize * ASSUMPTIONS.soapRatePerPerson * multiplier;
    const applianceCost = ASSUMPTIONS.applianceBaseRate * multiplier;
    return {
      bottled: Math.round(bottledCost),
      soap: Math.round(soapCost),
      appliance: Math.round(applianceCost),
      total: Math.round(bottledCost + soapCost + applianceCost),
    };
  }, [householdSize, gallonsPerWeek, hardness]);

  return (
    <section data-tool="savings-calculator" className="border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-6 sm:p-10">
      <h2 className="font-heading text-[var(--color-ink)]">
        What bad water costs you.
      </h2>
      <p className="mt-2 max-w-xl font-body text-[var(--color-ink-muted)]">
        Move the sliders. Pick your water hardness. The figure below updates as you go.
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div>
            <label
              htmlFor={householdId}
              className="flex items-center justify-between font-body text-sm font-semibold text-[var(--color-ink)]"
            >
              <span>Household size</span>
              <span aria-hidden="true">{householdSize} {householdSize === 1 ? "person" : "people"}</span>
            </label>
            <input
              id={householdId}
              type="range"
              min={1}
              max={8}
              step={1}
              value={householdSize}
              onChange={(event) => setHouseholdSize(Number(event.target.value))}
              className="mt-3 h-2 w-full cursor-pointer appearance-none bg-[var(--color-border)] accent-[var(--color-accent-fill)]"
              aria-valuetext={`${householdSize} people`}
            />
          </div>

          <div>
            <label
              htmlFor={bottledId}
              className="flex items-center justify-between font-body text-sm font-semibold text-[var(--color-ink)]"
            >
              <span>Bottled water per week</span>
              <span aria-hidden="true">{gallonsPerWeek} gallons</span>
            </label>
            <input
              id={bottledId}
              type="range"
              min={0}
              max={20}
              step={1}
              value={gallonsPerWeek}
              onChange={(event) => setGallonsPerWeek(Number(event.target.value))}
              className="mt-3 h-2 w-full cursor-pointer appearance-none bg-[var(--color-border)] accent-[var(--color-accent-fill)]"
              aria-valuetext={`${gallonsPerWeek} gallons per week`}
            />
          </div>

          <fieldset>
            <legend className="font-body text-sm font-semibold text-[var(--color-ink)]">
              Water hardness
            </legend>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {HARDNESS_LEVELS.map((level) => {
                const active = hardness === level.value;
                return (
                  <button
                    key={level.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setHardness(level.value)}
                    className={`min-h-[44px] border px-3 py-2 font-body text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)] ${
                      active
                        ? "border-[var(--color-accent-fill)] bg-[var(--color-accent-fill)] text-white"
                        : "border-[var(--color-border)] bg-white text-[var(--color-ink)] hover:border-[var(--color-accent-fill)]"
                    }`}
                  >
                    {level.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        <div className="border border-[var(--color-ink)] bg-white p-6">
          <p className="font-body text-sm font-semibold tracking-wide text-[var(--color-ink-muted)] uppercase">
            Your annual cost of bad water
          </p>
          <p
            aria-live="polite"
            className="mt-2 font-heading text-5xl tracking-[-0.04em] text-[var(--color-ink)]"
          >
            {currency.format(total)}
          </p>

          <dl className="mt-6 flex flex-col gap-3 border-t border-[var(--color-border)] pt-6">
            <div className="flex items-center justify-between font-body text-sm text-[var(--color-ink)]">
              <dt>Bottled water</dt>
              <dd className="font-semibold">{currency.format(bottled)}</dd>
            </div>
            <div className="flex items-center justify-between font-body text-sm text-[var(--color-ink)]">
              <dt>Wasted soap and detergent</dt>
              <dd className="font-semibold">{currency.format(soap)}</dd>
            </div>
            <div className="flex items-center justify-between font-body text-sm text-[var(--color-ink)]">
              <dt>Appliance wear</dt>
              <dd className="font-semibold">{currency.format(appliance)}</dd>
            </div>
          </dl>

          <div className="mt-8">
            {/*
              The offer line is the client's real offer, from facts. If the
              client has none on file yet, the CTA still works, it just does
              not state a price that was never given to us.
            */}
            <LiquidCta href={formAnchor}>
              {offerLabel ? `Get it for ${offerLabel}` : "See your offer"}
            </LiquidCta>
          </div>
        </div>
      </div>

      <div className="mt-8 border border-[var(--color-border)] bg-white p-5">
        <p className="font-body text-xs font-semibold tracking-wide text-[var(--color-ink-muted)] uppercase">
          Assumptions used, not findings
        </p>
        <ul className="mt-3 flex flex-col gap-1 font-body text-sm text-[var(--color-ink-muted)]">
          <li>Bottled water priced at {rate.format(ASSUMPTIONS.bottledRatePerGallon)} per gallon.</li>
          <li>Soap and detergent premium of {currency.format(ASSUMPTIONS.soapRatePerPerson)} per person per year at moderate hardness.</li>
          <li>Appliance wear of {currency.format(ASSUMPTIONS.applianceBaseRate)} per year at moderate hardness.</li>
          <li>Mild hardness multiplies the soap and appliance figures by {ASSUMPTIONS.hardnessMultiplier.mild}.</li>
          <li>Moderate hardness multiplies the soap and appliance figures by {ASSUMPTIONS.hardnessMultiplier.moderate.toFixed(1)}.</li>
          <li>Severe hardness multiplies the soap and appliance figures by {ASSUMPTIONS.hardnessMultiplier.severe}.</li>
        </ul>
        <p className="mt-3 font-body text-xs text-[var(--color-ink-muted)]">
          Change any input above and the arithmetic redoes itself in front of you. Nothing here is pulled from a study.
        </p>
      </div>
    </section>
  );
}
