"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { RecyclableObjectConfig } from "@/data/recyclableObjects";
import { RecyclableIllustration } from "@/components/hero/illustrations";

type FloatingObjectProps = {
  config: RecyclableObjectConfig;
  register: (
    element: HTMLElement | null,
    config: RecyclableObjectConfig,
  ) => (() => void) | undefined;
  reducedMotion: boolean;
};

export function FloatingObject({
  config,
  register,
  reducedMotion,
}: FloatingObjectProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    return register(ref.current, config);
  }, [config, reducedMotion, register]);

  return (
    <motion.div
      className={`absolute ${config.className}`}
      data-object={config.id}
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reducedMotion ? 0.35 : 0.75,
        delay: reducedMotion ? 0 : 0.55 + config.animation.delay * 0.25,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div ref={ref} className="will-change-transform [filter:drop-shadow(6px_10px_0_rgba(20,18,15,0.08))]">
        <RecyclableIllustration type={config.type} className="h-auto w-full" />
      </div>
    </motion.div>
  );
}
