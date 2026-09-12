"use client";

import { recyclableObjects } from "@/data/recyclableObjects";
import { FloatingObject } from "@/components/hero/FloatingObject";
import type { RecyclableObjectConfig } from "@/data/recyclableObjects";

type HeroObjectsProps = {
  register: (
    element: HTMLElement | null,
    config: RecyclableObjectConfig,
  ) => (() => void) | undefined;
  reducedMotion: boolean;
};

export function HeroObjects({ register, reducedMotion }: HeroObjectsProps) {
  return (
    <div
      data-hero-objects
      className="pointer-events-none absolute inset-0 z-10"
      aria-hidden="true"
    >
      {recyclableObjects.map((object) => (
        <FloatingObject
          key={object.id}
          config={object}
          register={register}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  );
}
