"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { MaterialStage } from "@/components/material-transformation/MaterialStage";
import { initMaterialTransformation } from "@/animations/materialTransformation";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function MaterialTransformation() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const framerReducedMotion = useReducedMotion();
  const reducedMotion = prefersReducedMotion || Boolean(framerReducedMotion);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    return initMaterialTransformation(section, { reducedMotion });
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="material-transformation"
      aria-labelledby="material-heading"
      className="relative z-10 bg-paper"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-multiply"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n2)'/%3E%3C/svg%3E")`,
        }}
      />

      <p className="sr-only">
        Recyclable materials begin mixed together, then are sorted by type,
        aggregated, and moved back into the economy. Material has value.
      </p>

      <header
        data-material-intro
        className="relative z-20 mx-auto max-w-[1600px] px-5 pb-8 pt-24 sm:px-8 md:pb-10 md:pt-28 lg:px-16"
      >
        <p className="mb-4 text-[0.68rem] font-semibold tracking-[0.22em] text-muted sm:mb-5 sm:text-[0.72rem]">
          01 — THE MATERIAL
        </p>
        <h2
          id="material-heading"
          className="font-display text-[clamp(2.35rem,8.4vw,3.75rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.03em] text-ink md:text-[clamp(3rem,5.2vw,5.25rem)]"
        >
          <span className="block">Not everything</span>
          <span className="block">we throw away</span>
          <span className="block">
            is waste
            <span
              aria-hidden="true"
              className="ml-[0.06em] inline-block h-[0.16em] w-[0.16em] -translate-y-[0.12em] rounded-full bg-accent align-middle"
            />
            <span className="sr-only">.</span>
          </span>
        </h2>
        <p className="mt-5 max-w-[24rem] text-[0.95rem] leading-relaxed text-ink-soft sm:mt-7 sm:text-[1.05rem]">
          Plastic. Cardboard. Paper. Metal. Electronics.
          <br />
          Materials that can move back into the economy.
        </p>
      </header>

      <div data-material-pin className="relative z-20 bg-paper">
        <MaterialStage />
      </div>

      <div className="hidden px-5 pb-20 pt-4 text-center motion-reduce:block sm:px-8">
        <p className="font-display text-[clamp(2.6rem,8vw,5.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em] text-ink">
          Material
          <span className="block">has</span>
          <span className="block">
            value
            <span
              aria-hidden="true"
              className="ml-[0.06em] inline-block h-[0.16em] w-[0.16em] -translate-y-[0.12em] rounded-full bg-accent align-middle"
            />
            <span className="sr-only">.</span>
          </span>
        </p>
      </div>
    </section>
  );
}
