"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { initReverseLogistics } from "@/animations/reverseLogistics";
import { JourneyStage } from "@/components/reverse-logistics/JourneyStage";
import { JourneyVisual } from "@/components/reverse-logistics/JourneyVisual";
import { ReducedMotionJourney } from "@/components/reverse-logistics/ReducedMotionJourney";
import { journeyStages } from "@/data/journeyStages";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function ReverseLogistics() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const framerReducedMotion = useReducedMotion();
  const reducedMotion = prefersReducedMotion || Boolean(framerReducedMotion);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    return initReverseLogistics(section, { reducedMotion });
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="reverse-logistics"
      aria-labelledby="journey-heading"
      className="relative z-10 bg-paper"
    >
      <div id="how-it-works" className="absolute top-0 h-px w-px scroll-mt-24" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-multiply"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n3'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n3)'/%3E%3C/svg%3E")`,
        }}
      />

      <p className="sr-only">
        Reverse logistics journey. Recyclables are collected from homes and
        businesses, sorted by material, aggregated into meaningful volumes,
        moved in bulk, and returned to recyclers and wholesalers.
      </p>

      <header
        data-journey-intro
        className="relative z-20 mx-auto max-w-[1600px] px-5 pb-8 pt-24 sm:px-8 md:pb-10 md:pt-28 lg:px-16"
      >
        <p className="mb-4 text-[0.68rem] font-semibold tracking-[0.22em] text-muted sm:mb-5 sm:text-[0.72rem]">
          02 — THE JOURNEY
        </p>
        <h2
          id="journey-heading"
          className="font-display text-[clamp(2.35rem,8.4vw,3.75rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.03em] text-ink md:text-[clamp(3rem,5.2vw,5.25rem)]"
        >
          <span className="block">We move</span>
          <span className="block">
            it back
            <span
              aria-hidden="true"
              className="ml-[0.06em] inline-block h-[0.16em] w-[0.16em] -translate-y-[0.12em] rounded-full bg-accent align-middle"
            />
            <span className="sr-only">.</span>
          </span>
        </h2>
        <p className="mt-5 max-w-[22rem] text-[0.95rem] leading-relaxed text-ink-soft sm:mt-7 sm:text-[1.05rem]">
          From your doorstep to the next point in the value chain.
        </p>
      </header>

      <div data-journey-pin className="relative z-20 bg-paper motion-reduce:hidden">
        <div className="flex h-svh flex-col overflow-hidden md:flex-row">
          <div className="relative shrink-0 overflow-hidden px-5 pb-3 pt-16 sm:px-8 md:flex md:w-[40%] md:flex-none md:flex-col md:justify-center md:px-12 md:py-8 md:pt-8 lg:px-16">
            <div className="relative min-h-[8.75rem] md:min-h-[14rem]">
              {journeyStages.map((stage, index) => (
                <JourneyStage
                  key={stage.id}
                  stage={stage}
                  active={index === 0}
                />
              ))}
            </div>
            <p
              data-journey-finale
              className="pointer-events-none absolute inset-x-5 bottom-3 font-display text-[clamp(1.25rem,5.4vw,2.7rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.03em] text-ink md:static md:mt-8 md:px-0"
            >
              <span className="block">We move materials</span>
              <span className="block">to where they</span>
              <span className="block">
                create value
                <span
                  aria-hidden="true"
                  className="ml-[0.06em] inline-block h-[0.16em] w-[0.16em] -translate-y-[0.12em] rounded-full bg-accent align-middle"
                />
                <span className="sr-only">.</span>
              </span>
            </p>
          </div>

          <div className="relative min-h-0 flex-1 border-ink/8 md:border-l">
            <JourneyVisual />
          </div>
        </div>
      </div>

      <div className="hidden motion-reduce:block">
        <ReducedMotionJourney />
        <div className="px-5 pb-20 pt-4 text-center sm:px-8">
          <p className="font-display text-[clamp(2rem,7vw,4.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em] text-ink">
            We move materials
            <span className="block">to where they</span>
            <span className="block">
              create value
              <span
                aria-hidden="true"
                className="ml-[0.06em] inline-block h-[0.16em] w-[0.16em] -translate-y-[0.12em] rounded-full bg-accent align-middle"
              />
              <span className="sr-only">.</span>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
