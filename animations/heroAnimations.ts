import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function registerScrollTrigger() {
  if (typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
}

type HeroAnimationOptions = {
  reducedMotion: boolean;
  scrollProgress: RefObject<number>;
};

export function initHeroAnimations(
  root: HTMLElement,
  { reducedMotion, scrollProgress }: HeroAnimationOptions,
) {
  registerScrollTrigger();
  const context = gsap.context(() => {
    const content = root.querySelectorAll<HTMLElement>("[data-hero-content]");
    const objects = root.querySelector<HTMLElement>("[data-hero-objects]");
    const indicator = root.querySelector<HTMLElement>(".hero-scroll-indicator");

    if (reducedMotion) {
      gsap.set([content, objects, indicator], { clearProps: "all" });
      scrollProgress.current = 0;
      return;
    }

    gsap
      .timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 0.55,
          onUpdate: (self) => {
            scrollProgress.current = self.progress;
          },
        },
      })
      .to(
        content,
        {
          y: -56,
          opacity: 0,
          ease: "none",
        },
        0,
      )
      .to(
        objects,
        {
          y: 120,
          opacity: 0,
          ease: "none",
        },
        0,
      )
      .to(
        indicator,
        {
          opacity: 0,
          y: 16,
          ease: "none",
        },
        0,
      );
  }, root);

  return () => {
    scrollProgress.current = 0;
    context.revert();
  };
}
