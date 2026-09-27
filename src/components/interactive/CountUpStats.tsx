"use client";

import { useEffect, useRef, useState } from "react";

export interface StatItem {
  value?: string;
  numericValue?: number;
  suffix?: string;
  label: string;
}

interface CountUpNumberProps {
  target: number;
  suffix?: string;
}

function CountUpNumber({ target, suffix = "" }: CountUpNumberProps) {
  const [current, setCurrent] = useState(0);
  const elRef = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            setCurrent(Math.round(target * ease));
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={elRef}>
      {current}
      {suffix}
    </span>
  );
}

export default function CountUpStats({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {stats.map((stat) => (
        <div key={stat.label}>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.8rem, 4.5vw, 5rem)",
              fontWeight: 400,
              lineHeight: 1,
              color: "var(--color-accent-fill)",
              marginBottom: "0.5rem",
            }}
          >
            {stat.numericValue !== undefined ? (
              <CountUpNumber target={stat.numericValue} suffix={stat.suffix} />
            ) : (
              stat.value ?? ""
            )}
          </p>
          <span
            className="block text-sm font-medium"
            style={{ color: "var(--color-ink-muted)" }}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
