"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOut, fadeUp, reducedFade } from "@/lib/motion";

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  as = "div",
}) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as] || motion.div;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={reduceMotion ? reducedFade : fadeUp}
      transition={{ duration: 0.65, delay, ease: easeOut }}
    >
      {children}
    </Component>
  );
}
