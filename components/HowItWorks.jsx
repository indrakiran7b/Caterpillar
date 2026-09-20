"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { howItWorks } from "@/lib/content";
import Container from "@/components/Container";
import FadeIn from "@/components/motion/FadeIn";
import Eyebrow from "@/components/ui/Eyebrow";

export default function HowItWorks() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.78", "start 0.28"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (reduceMotion) return;
    if (typeof window !== "undefined" && !window.matchMedia("(min-width: 1024px)").matches) {
      return;
    }
    const next = Math.min(
      howItWorks.length - 1,
      Math.max(0, Math.floor(value * howItWorks.length)),
    );
    setActive(next);
  });

  useEffect(() => {
    if (reduceMotion) {
      setActive(howItWorks.length - 1);
      return undefined;
    }

    const media = window.matchMedia("(min-width: 1024px)");
    if (media.matches) return undefined;

    const nodes = itemRefs.current.filter(Boolean);
    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.dataset.index);
          if (Number.isNaN(index)) return;
          setActive((current) => Math.max(current, index));
        });
      },
      { threshold: 0.45, rootMargin: "0px 0px -15% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [reduceMotion]);

  const progress = howItWorks.length > 1 ? active / (howItWorks.length - 1) : 0;

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="scroll-mt-24 bg-canvas py-16 md:py-24 lg:py-28"
    >
      <Container>
        <FadeIn className="max-w-2xl">
          <Eyebrow>The process</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-5xl">
            How it works
          </h2>
        </FadeIn>

        <ol
          aria-label="Customer journey"
          className="relative mt-12 border-l border-line pl-8 lg:mt-16 lg:grid lg:grid-cols-4 lg:gap-0 lg:border-l-0 lg:pl-0"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[18px] right-[12.5%] left-[12.5%] hidden h-px bg-line lg:block"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[18px] left-[12.5%] hidden h-px origin-left bg-brand transition-[width] duration-500 ease-out lg:block"
            style={{ width: `${progress * 75}%` }}
          />

          {howItWorks.map((step, index) => {
            const isActive = index <= active;

            return (
              <li
                key={step.num}
                data-index={index}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                aria-current={index === active ? "step" : undefined}
                className={`relative pb-10 last:pb-0 lg:flex lg:flex-col lg:items-center lg:px-4 lg:pb-0 lg:text-center ${
                  isActive ? "opacity-100 lg:scale-100" : "opacity-50 lg:scale-[0.98]"
                } transition-all duration-500`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute -left-[41px] top-0 z-10 flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-medium transition-colors duration-500 lg:static ${
                    isActive ? "bg-brand text-white" : "bg-line text-muted"
                  }`}
                >
                  {step.num}
                </span>
                <h3
                  className={`mt-1 text-2xl font-semibold tracking-tight uppercase transition-colors duration-500 lg:mt-5 md:text-3xl ${
                    isActive ? "text-ink" : "text-ink/45"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`mt-3 max-w-xs text-base leading-relaxed transition-colors duration-500 ${
                    isActive ? "text-muted" : "text-muted/70"
                  }`}
                >
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
