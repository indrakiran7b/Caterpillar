"use client";

import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import type { RecyclableObjectConfig } from "@/data/recyclableObjects";

export type ParallaxRegistration = {
  element: HTMLElement;
  config: RecyclableObjectConfig;
};

type MouseParallaxOptions = {
  enabled: boolean;
  scrollProgress: React.RefObject<number>;
};

export function useMouseParallax({
  enabled,
  scrollProgress,
}: MouseParallaxOptions) {
  const itemsRef = useRef<ParallaxRegistration[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const enabledRef = useRef(enabled);
  const finePointerRef = useRef(false);
  const mobileRef = useRef(false);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  const register = useCallback(
    (element: HTMLElement | null, config: RecyclableObjectConfig) => {
      if (!element) return () => {};

      const item = { element, config };
      itemsRef.current.push(item);

      return () => {
        itemsRef.current = itemsRef.current.filter(
          (entry) => entry.element !== element,
        );
      };
    },
    [],
  );

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    const syncMedia = () => {
      finePointerRef.current = pointerQuery.matches;
      mobileRef.current = mobileQuery.matches;
    };

    syncMedia();
    pointerQuery.addEventListener("change", syncMedia);
    mobileQuery.addEventListener("change", syncMedia);

    const onMouseMove = (event: MouseEvent) => {
      if (!enabledRef.current || !finePointerRef.current) return;
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current.x = x;
      mouseRef.current.y = y;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const tick = () => {
      const targetX =
        enabledRef.current && finePointerRef.current ? mouseRef.current.x : 0;
      const targetY =
        enabledRef.current && finePointerRef.current ? mouseRef.current.y : 0;

      currentRef.current.x += (targetX - currentRef.current.x) * 0.075;
      currentRef.current.y += (targetY - currentRef.current.y) * 0.075;

      const progress = scrollProgress.current ?? 0;
      const floatScale = mobileRef.current ? 0.42 : 1;
      const mouseScale = mobileRef.current ? 0 : 1;
      const time = gsap.ticker.time;

      for (const { element, config } of itemsRef.current) {
        const { animation, depth, invert, mouseRotate, scroll } = config;
        const speed = (Math.PI * 2) / animation.duration;
        const phase = time + animation.delay;
        const direction = invert ? -1 : 1;

        const floatX = Math.sin(phase * speed) * animation.floatX * floatScale;
        const floatY =
          Math.cos(phase * speed * 0.82) * animation.floatY * floatScale;
        const floatRotate =
          Math.sin(phase * speed * 0.55) * animation.rotate * floatScale;

        const parallaxX =
          currentRef.current.x * depth * 26 * direction * mouseScale;
        const parallaxY =
          currentRef.current.y * depth * 18 * direction * mouseScale;
        const parallaxRotate =
          currentRef.current.x * mouseRotate * direction * mouseScale;

        const driftX = scroll.x * progress;
        const driftY = scroll.y * progress;
        const driftRotate = scroll.rotate * progress;

        const x = floatX + parallaxX + driftX;
        const y = floatY + parallaxY + driftY;
        const rotate = floatRotate + parallaxRotate + driftRotate;
        const opacity = 1 - progress;

        element.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg)`;
        element.style.opacity = `${opacity}`;
      }
    };

    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      pointerQuery.removeEventListener("change", syncMedia);
      mobileQuery.removeEventListener("change", syncMedia);
      gsap.ticker.remove(tick);
    };
  }, [scrollProgress]);

  return { register, mouseRef };
}
