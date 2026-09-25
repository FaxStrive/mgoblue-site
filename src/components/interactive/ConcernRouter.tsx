"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { ClientFacts } from "./facts";

type Concern =
  | "hard-water-scale"
  | "chlorine-taste-smell"
  | "iron-rust-sulfur"
  | "well-water"
  | "drinking-water-quality"
  | "not-sure";

type Supply = "city" | "well";

export interface ConcernSystem {
  concern: string;
  name: string;
  href: string;
  why: string;
}

const CONCERNS: { value: Concern; label: string }[] = [
  { value: "hard-water-scale", label: "Hard water and scale" },
  { value: "chlorine-taste-smell", label: "Chlorine taste or smell" },
  { value: "iron-rust-sulfur", label: "Iron, rust or sulfur" },
  { value: "well-water", label: "Well water of any kind" },
  { value: "drinking-water-quality", label: "Drinking water quality" },
  { value: "not-sure", label: "Not sure, diagnose it" },
];

export default function ConcernRouter({ facts, systems = [] }: { facts?: ClientFacts; systems?: ConcernSystem[] }) {
  const router = useRouter();
  const [concern, setConcern] = useState<Concern>("hard-water-scale");
  const [supply, setSupply] = useState<Supply>("city");
  const [recommended, setRecommended] = useState<ConcernSystem | null>(null);

  const selectId = useId();
  const citySupplyId = useId();
  const wellSupplyId = useId();

  const contactPath = facts?.contact?.path ?? "/contact";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (systems.length === 0) {
      const params = new URLSearchParams({ concern, supply });
      router.push(`${contactPath}?${params.toString()}`);
      return;
    }

    const match = systems.find((system) => system.concern === concern) ?? systems[0];
    setRecommended(match);
  }

  if (recommended) {
    const params = new URLSearchParams({ concern, supply });
    const quoteHref = `${contactPath}?${params.toString()}`;

    return (
      <div className="border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-6 sm:p-10">
        <span className="eyebrow mb-4 block">Recommended for you</span>
        <h3>{recommended.name}</h3>
        <p className="mt-3 max-w-xl font-body text-[var(--color-ink-muted)]">{recommended.why}</p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a href={recommended.href} className="btn btn-ghost">
            <span>See this system</span>
            <span className="btn-arrow" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
            </span>
          </a>
          <a href={quoteHref} className="btn btn-primary" data-cta="quote">
            <span>Get my quote</span>
            <span className="btn-arrow" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M2 8h11" /><path d="M9 4l4 4-4 4" /></svg>
            </span>
          </a>
        </div>

        <button
          type="button"
          onClick={() => setRecommended(null)}
          className="mt-6 font-body text-sm font-semibold text-[var(--color-ink-muted)] underline underline-offset-4"
        >
          Start again
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-6 sm:p-10"
      aria-labelledby={`${selectId}-heading`}
    >
      <h2 id={`${selectId}-heading`} className="font-heading text-[var(--color-ink)]">
        What is wrong with your water.
      </h2>
      <p className="mt-2 max-w-xl font-body text-[var(--color-ink-muted)]">
        Tell us the problem. We route you to a free water test built around it.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          <label htmlFor={selectId} className="font-body text-sm font-semibold text-[var(--color-ink)]">
            The main concern
          </label>
          <select
            id={selectId}
            value={concern}
            onChange={(event) => setConcern(event.target.value as Concern)}
            className="mt-3 min-h-[44px] w-full border border-[var(--color-border)] bg-white px-4 font-body text-sm text-[var(--color-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
          >
            {CONCERNS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <fieldset>
          <legend className="font-body text-sm font-semibold text-[var(--color-ink)]">Water supply</legend>
          <div className="mt-3 flex gap-3">
            <div className="flex-1">
              <input
                id={citySupplyId}
                type="radio"
                name="supply"
                value="city"
                checked={supply === "city"}
                onChange={() => setSupply("city")}
                className="peer sr-only"
              />
              <label
                htmlFor={citySupplyId}
                className="flex min-h-[44px] w-full cursor-pointer items-center justify-center border border-[var(--color-border)] bg-white px-3 font-body text-sm font-semibold text-[var(--color-ink)] peer-checked:border-[var(--color-accent-fill)] peer-checked:bg-[var(--color-accent-fill)] peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--color-ink)]"
              >
                City water
              </label>
            </div>
            <div className="flex-1">
              <input
                id={wellSupplyId}
                type="radio"
                name="supply"
                value="well"
                checked={supply === "well"}
                onChange={() => setSupply("well")}
                className="peer sr-only"
              />
              <label
                htmlFor={wellSupplyId}
                className="flex min-h-[44px] w-full cursor-pointer items-center justify-center border border-[var(--color-border)] bg-white px-3 font-body text-sm font-semibold text-[var(--color-ink)] peer-checked:border-[var(--color-accent-fill)] peer-checked:bg-[var(--color-accent-fill)] peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--color-ink)]"
              >
                Well water
              </label>
            </div>
          </div>
        </fieldset>
      </div>

      <button
        type="submit"
        className="group relative mt-8 inline-flex min-h-[44px] items-center justify-center overflow-hidden bg-[var(--color-accent-fill)] px-8 py-3 text-sm font-semibold tracking-wide text-white uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full bg-[var(--color-ink)] transition-transform duration-500 ease-out group-hover:translate-x-0"
        />
        <span className="relative z-10">Get my free water test</span>
      </button>
    </form>
  );
}
