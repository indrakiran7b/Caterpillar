"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { productScreens } from "@/lib/content";
import { fadeUp, reducedFade, stagger } from "@/lib/motion";
import Container from "@/components/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import PhoneFrame from "@/components/ui/PhoneFrame";
import {
  ProductFlow,
  PRODUCT_CYCLE_MS,
  PRODUCT_STEP_MS,
} from "@/components/ui/AppScreens";

function ProductStage({ activeIndex }) {
  const screen = productScreens[activeIndex];

  return (
    <div className="flex justify-center overflow-x-clip lg:justify-end">
      <PhoneFrame size="showcase" label={`CaterPillar app: ${screen.label}`}>
        <ProductFlow stepIndex={activeIndex} />
      </PhoneFrame>
    </div>
  );
}

function ScreenList({ activeIndex, onSelect, className }) {
  return (
    <div className={className}>
      {productScreens.map((screen, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={screen.id}
            type="button"
            onClick={() => onSelect(index)}
            aria-current={isActive ? "true" : undefined}
            className="w-full border-b border-line py-5 text-left"
          >
            <p
              className={`text-xs font-medium tracking-[0.18em] uppercase ${
                isActive ? "text-brand" : "text-muted"
              }`}
            >
              0{index + 1}
            </p>
            <h3
              className={`mt-2 text-xl font-semibold tracking-tight ${
                isActive ? "text-ink" : "text-ink/45"
              }`}
            >
              {screen.title}
            </h3>
            <p
              className={`mt-2 max-w-sm text-base leading-relaxed ${
                isActive ? "text-muted" : "text-muted/70"
              }`}
            >
              {screen.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}

export default function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const startOffsetRef = useRef(0);
  const activeIndexRef = useRef(0);
  const directionRef = useRef(1);
  const reduceMotion = useReducedMotion();
  const textVariants = reduceMotion ? reducedFade : fadeUp;
  activeIndexRef.current = activeIndex;

  const selectScreen = (index) => {
    startOffsetRef.current = index * PRODUCT_STEP_MS;
    setActiveIndex(index);
    setCycleKey((current) => current + 1);
  };

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || !inView || productScreens.length < 2) return undefined;

    directionRef.current = 1;
    const startedAt = performance.now() - startOffsetRef.current;
    let frame;

    const tick = (now) => {
      const elapsed =
        ((now - startedAt) % PRODUCT_CYCLE_MS + PRODUCT_CYCLE_MS) % PRODUCT_CYCLE_MS;
      const next = elapsed >= PRODUCT_STEP_MS * 2 ? 2 : elapsed >= PRODUCT_STEP_MS ? 1 : 0;
      setActiveIndex((current) => (current === next ? current : next));
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frame);
      startOffsetRef.current = activeIndexRef.current * PRODUCT_STEP_MS;
    };
  }, [reduceMotion, cycleKey, inView]);

  return (
    <section
      id="product"
      ref={sectionRef}
      className="scroll-mt-24 overflow-x-clip bg-paper py-16 md:py-20 lg:py-24"
    >
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,auto)] lg:gap-16 xl:gap-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={reduceMotion ? reducedFade : stagger}
            className="max-w-xl"
          >
            <motion.div variants={textVariants}>
              <Eyebrow>The CaterPillar app</Eyebrow>
            </motion.div>
            <motion.h2
              variants={textVariants}
              className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-5xl"
            >
              Your pickup,
              <br />
              in one place.
            </motion.h2>
            <motion.p
              variants={textVariants}
              className="mt-4 max-w-md text-base leading-relaxed text-muted md:text-lg"
            >
              The digital product for booking and following a pickup.
            </motion.p>

            <ScreenList
              activeIndex={activeIndex}
              onSelect={selectScreen}
              className="mt-10 hidden border-t border-line lg:block"
            />
          </motion.div>

          <ProductStage activeIndex={activeIndex} />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reduceMotion ? reducedFade : stagger}
        >
          <ScreenList
            activeIndex={activeIndex}
            onSelect={selectScreen}
            className="mt-10 border-t border-line lg:hidden"
          />
        </motion.div>
      </Container>
    </section>
  );
}
