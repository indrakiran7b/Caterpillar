"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroCTA } from "@/components/hero/HeroCTA";
import { HeroObjects } from "@/components/hero/HeroObjects";
import { initHeroAnimations } from "@/animations/heroAnimations";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const revealEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
};

const lateContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.48,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: revealEase },
  },
};

const reducedItemVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.35 } },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useRef(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const framerReducedMotion = useReducedMotion();
  const reducedMotion = prefersReducedMotion || Boolean(framerReducedMotion);
  const variants = reducedMotion ? reducedItemVariants : itemVariants;
  const { register } = useMouseParallax({
    enabled: !reducedMotion,
    scrollProgress,
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    return initHeroAnimations(section, {
      reducedMotion,
      scrollProgress,
    });
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative z-0 isolate min-h-svh overflow-hidden bg-paper"
    >
      <div className="hero-background pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-[12%] top-[-18%] h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,59,31,0.08),transparent_64%)]" />
        <div className="absolute right-[-16%] bottom-[-22%] h-[62%] w-[58%] rounded-full bg-[radial-gradient(circle_at_center,rgba(20,18,15,0.045),transparent_66%)]" />
        <div className="absolute left-[38%] top-[18%] h-64 w-64 rounded-full border border-ink/6" />
        <div
          className="absolute inset-0 opacity-[0.045] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-20 flex min-h-svh flex-col justify-center px-5 pb-24 pt-28 sm:px-8 lg:px-16 xl:px-20">
        <motion.div
          data-hero-content
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-max max-w-full"
        >
          <motion.p
            variants={variants}
            className="hero-eyebrow mb-5 max-w-[17rem] text-[0.68rem] font-semibold leading-relaxed tracking-[0.22em] text-muted sm:mb-6 sm:max-w-none sm:whitespace-nowrap sm:text-[0.72rem]"
          >
            REVERSE LOGISTICS FOR A CIRCULAR WORLD
          </motion.p>

          <h1
            id="hero-heading"
            className="font-display text-[clamp(3.9rem,15vw,5.4rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.025em] text-ink md:text-[clamp(4.35rem,7.4vw,8.25rem)]"
          >
            <motion.span variants={variants} className="block">
              Waste
            </motion.span>
            <motion.span variants={variants} className="block">
              has a
            </motion.span>
            <motion.span variants={variants} className="block lg:whitespace-nowrap">
              second{" "}
              <span className="whitespace-nowrap">
                life
                <span
                  aria-hidden="true"
                  className="ml-[0.06em] inline-block h-[0.16em] w-[0.16em] -translate-y-[0.12em] rounded-full bg-accent align-middle"
                />
              </span>
              <span className="sr-only">.</span>
            </motion.span>
          </h1>
        </motion.div>

        <div className="relative my-2 h-40 w-full max-w-md md:my-0 md:h-auto md:max-w-none md:contents">
          <HeroObjects register={register} reducedMotion={reducedMotion} />
        </div>

        <motion.div
          data-hero-content
          variants={lateContainerVariants}
          initial="hidden"
          animate="show"
          className="max-w-[28rem]"
        >
          <motion.p
            variants={variants}
            className="hero-description mt-6 text-[0.98rem] leading-relaxed text-ink-soft sm:mt-8 sm:text-[1.05rem] md:mt-8"
          >
            We collect, sort, aggregate and move recyclable materials back into
            the economy.
          </motion.p>

          <motion.div variants={variants}>
            <HeroCTA />
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#material-transformation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reducedMotion ? 0 : 1.15, duration: 0.5 }}
        className="hero-scroll-indicator absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.62rem] font-semibold tracking-[0.2em] text-muted transition-colors duration-200 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        <span
          aria-hidden="true"
          className={reducedMotion ? undefined : "hero-scroll-arrow"}
        >
          ↓
        </span>
        SCROLL TO EXPLORE
      </motion.a>
    </section>
  );
}
