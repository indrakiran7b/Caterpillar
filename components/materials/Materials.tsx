"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  initMaterialExplorer,
  moveSelectorIndicator,
  playMaterialTransition,
} from "@/animations/materialExplorer";
import { MaterialDisplay } from "@/components/materials/MaterialDisplay";
import { MaterialSelector } from "@/components/materials/MaterialSelector";
import {
  defaultMaterialId,
  getMaterial,
  materials,
  type MaterialId,
} from "@/data/materials";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Materials() {
  const sectionRef = useRef<HTMLElement>(null);
  const previousId = useRef<MaterialId>(defaultMaterialId);
  const [selected, setSelected] = useState<MaterialId>(defaultMaterialId);
  const prefersReducedMotion = usePrefersReducedMotion();
  const framerReducedMotion = useReducedMotion();
  const reducedMotion = prefersReducedMotion || Boolean(framerReducedMotion);
  const material = getMaterial(selected);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    return initMaterialExplorer(section, { reducedMotion });
  }, [reducedMotion]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const list = section.querySelector<HTMLElement>("[data-material-selector]");
    const active = section.querySelector<HTMLElement>(
      `[data-material-option="${selected}"]`,
    );
    if (list) {
      requestAnimationFrame(() => {
        moveSelectorIndicator(list, active, reducedMotion);
      });
    }

    if (previousId.current === selected) return;
    playMaterialTransition(section, selected, reducedMotion);
    previousId.current = selected;
  }, [selected, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="materials"
      aria-labelledby="materials-heading"
      className="relative z-10 min-h-[100svh] overflow-x-clip bg-paper lg:min-h-[110svh]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-multiply"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n4'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n4)'/%3E%3C/svg%3E")`,
        }}
      />

      <p className="sr-only">
        Material explorer. Select plastic, cardboard, paper, metal or e-waste
        to see how each material can move through the reverse logistics
        network.
      </p>
      <p className="sr-only" aria-live="polite">
        Showing {material.name.toLowerCase()}.
      </p>

      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col px-5 pb-16 pt-24 sm:px-8 md:pb-20 md:pt-28 lg:min-h-[110svh] lg:px-16">
        <div className="flex flex-1 flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10">
          <header
            data-explorer-intro
            className="order-1 max-w-[36rem] lg:col-start-1 lg:row-start-1"
          >
            <p className="mb-4 text-[0.68rem] font-semibold tracking-[0.22em] text-muted sm:mb-5 sm:text-[0.72rem]">
              03 — THE MATERIALS
            </p>
            <h2
              id="materials-heading"
              className="font-display text-[clamp(2.35rem,8.4vw,3.75rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.03em] text-ink md:text-[clamp(3rem,5.2vw,5.25rem)]"
            >
              <span className="block">What can</span>
              <span className="block">
                move back
                <span
                  aria-hidden="true"
                  className="ml-[0.06em] inline-block h-[0.16em] w-[0.16em] -translate-y-[0.12em] rounded-full bg-accent align-middle"
                />
                <span className="sr-only">?</span>
              </span>
            </h2>
            <p className="mt-5 max-w-[24rem] text-[0.95rem] leading-relaxed text-ink-soft sm:mt-7 sm:text-[1.05rem]">
              Different materials follow different paths. Explore what can
              re-enter the value chain.
            </p>
          </header>

          <div className="order-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:flex lg:items-center">
            <MaterialDisplay material={material} />
          </div>

          <div className="order-3 min-w-0 border-t border-ink/10 lg:col-start-1 lg:row-start-2 lg:self-end">
            <MaterialSelector
              materials={materials}
              selected={selected}
              onSelect={setSelected}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
