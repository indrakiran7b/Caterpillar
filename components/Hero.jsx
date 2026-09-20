"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOut, fadeUp, reducedFade, scaleIn, stagger } from "@/lib/motion";
import BookPickupButton from "@/components/BookPickupButton";
import Container from "@/components/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import PhoneFrame from "@/components/ui/PhoneFrame";
import { ScreenBook } from "@/components/ui/AppScreens";
import { serviceArea } from "@/lib/content";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion ? reducedFade : fadeUp;
  const visual = reduceMotion ? reducedFade : scaleIn;

  return (
    <section id="top" className="relative overflow-hidden bg-canvas pt-28 pb-16 md:pt-36 md:pb-20 lg:pt-40 lg:pb-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={reduceMotion ? reducedFade : stagger}
            className="max-w-xl"
          >
            <motion.div variants={variants}>
              <Eyebrow>Doorstep recycling</Eyebrow>
            </motion.div>
            <motion.h1
              variants={variants}
              className="mt-5 text-5xl font-semibold leading-[1.02] tracking-tight text-ink md:text-7xl lg:text-[clamp(4.25rem,5.6vw,5.25rem)]"
            >
              Turn your scrap
              <br />
              into <span className="text-brand">cash.</span>
            </motion.h1>
            <motion.p
              variants={variants}
              className="mt-5 max-w-md text-base leading-relaxed text-muted md:text-lg"
            >
              Book a doorstep pickup. We collect, weigh, and pay you.
            </motion.p>
            <motion.div variants={variants} className="mt-8">
              <div className="flex flex-wrap items-center gap-5">
                <BookPickupButton>Book a pickup</BookPickupButton>
                <Button href="/#how-it-works" variant="secondary">
                  See how it works
                </Button>
              </div>
              <p className="mt-4 text-sm text-muted">
                Available in {serviceArea}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={visual}
            transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.12, ease: easeOut }}
            className="relative flex justify-center lg:justify-end lg:pr-4"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-soft/50 blur-3xl lg:left-auto lg:right-16"
            />
            <div className="relative">
              <PhoneFrame size="hero" label="CaterPillar app: book a pickup">
                <ScreenBook />
              </PhoneFrame>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
