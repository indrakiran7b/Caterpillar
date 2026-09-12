"use client";

import { useRef, type PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

export function HeroCTA() {
  const reducedMotion = useReducedMotion();
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const resetMagnet = () => {
    x.set(0);
    y.set(0);
  };

  const onPointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const node = buttonRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * 0.22);
    y.set(offsetY * 0.22);
  };

  return (
    <div className="hero-actions mt-8 flex flex-col items-start gap-4 sm:mt-10 sm:flex-row sm:items-center sm:gap-7">
      <motion.a
        ref={buttonRef}
        href="#pickup"
        style={{ x: reducedMotion ? 0 : springX, y: reducedMotion ? 0 : springY }}
        onPointerMove={onPointerMove}
        onPointerLeave={resetMagnet}
        onBlur={resetMagnet}
        whileHover={reducedMotion ? undefined : { scale: 1.04 }}
        whileTap={reducedMotion ? undefined : { scale: 0.98 }}
        className="group relative inline-flex items-center gap-3 bg-ink px-6 py-3.5 text-[0.78rem] font-semibold tracking-[0.16em] text-paper transition-colors duration-300 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        <span>BOOK A PICKUP</span>
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5"
        >
          →
        </span>
      </motion.a>

      <a
        href="#how-it-works"
        className="inline-flex items-center gap-2 text-[0.74rem] font-semibold tracking-[0.14em] text-ink-soft transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        SEE HOW IT WORKS
        <span aria-hidden="true">↓</span>
      </a>
    </div>
  );
}
