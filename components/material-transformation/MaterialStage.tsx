"use client";

import { MaterialObject } from "@/components/material-transformation/MaterialObject";
import {
  materialCaptions,
  materialLabels,
  materialObjects,
} from "@/data/materialObjects";

export function MaterialStage() {
  return (
    <div
      data-material-stage
      className="relative isolate h-svh w-full overflow-hidden bg-paper"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-[18%] top-[12%] h-56 w-56 rounded-full border border-ink/6" />
        <div className="absolute right-[-8%] bottom-[8%] h-[48%] w-[40%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,59,31,0.06),transparent_66%)]" />
      </div>

      <div
        data-material-field
        className="pointer-events-none absolute inset-0 z-10"
      >
        {materialObjects.map((object) => (
          <MaterialObject key={object.id} config={object} />
        ))}

        {materialLabels.map((label) => (
          <p
            key={label.id}
            data-material-label
            data-group={label.id}
            className="absolute top-1/2 left-1/2 text-[0.6rem] font-semibold tracking-[0.2em] text-muted md:text-[0.62rem]"
          >
            {label.label}
          </p>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-5 bottom-20 z-30 flex h-8 items-center justify-center sm:bottom-16">
        {materialCaptions.map((caption) => (
          <p
            key={caption}
            data-material-caption
            className="absolute text-center text-[0.68rem] font-semibold tracking-[0.18em] text-ink-soft sm:text-[0.72rem]"
          >
            {caption}
          </p>
        ))}
      </div>

      <div
        data-material-finale
        className="pointer-events-none absolute inset-x-5 top-[16%] z-30 text-center md:top-[14%]"
      >
        <p className="font-display text-[clamp(2.8rem,8vw,7rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em] text-ink">
          <span className="block">Material</span>
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
    </div>
  );
}
