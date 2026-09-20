"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqGroups } from "@/lib/content";
import { easeOut } from "@/lib/motion";
import Container from "@/components/Container";
import FadeIn from "@/components/motion/FadeIn";
import Eyebrow from "@/components/ui/Eyebrow";

function FaqItem({ item, number, open, onToggle }) {
  const reduceMotion = useReducedMotion();
  const panelId = `faq-panel-${number}`;
  const buttonId = `faq-button-${number}`;

  return (
    <div className="border-b border-line last:border-b-0">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-start gap-4 py-5 text-left md:gap-5 md:py-6"
        >
          <span className="mt-1 w-7 shrink-0 text-xs font-medium tracking-[0.16em] text-brand uppercase">
            {String(number).padStart(2, "0")}
          </span>
          <span
            className={`min-w-0 flex-1 text-base font-medium tracking-tight md:text-lg ${
              open ? "text-ink" : "text-ink/70"
            }`}
          >
            {item.question}
          </span>
          <motion.span
            aria-hidden="true"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: easeOut }}
            className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
              open
                ? "border-brand/20 bg-brand-soft text-brand"
                : "border-line text-muted"
            }`}
          >
            <Plus size={16} />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: easeOut }}
            className="overflow-hidden"
          >
            <p className="max-w-xl pb-5 pl-11 pr-12 text-base leading-relaxed text-muted md:pl-12">
              {item.answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const numberedFaqGroups = (() => {
  let number = 1;
  return faqGroups.map((group) => ({
    ...group,
    items: group.items.map((item) => {
      const current = number;
      number += 1;
      return { ...item, number: current };
    }),
  }));
})();

export default function FAQ() {
  const firstQuestion = numberedFaqGroups[0]?.items[0]?.question ?? "";
  const [openQuestion, setOpenQuestion] = useState(firstQuestion);

  return (
    <section id="faq" className="scroll-mt-24 bg-canvas-alt py-16 md:py-24 lg:py-28">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-16 xl:gap-20">
          <FadeIn className="max-w-md lg:sticky lg:top-28">
            <Eyebrow>Questions</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-5xl">
              FAQ
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              Answers about booking, pickup, and payment in Bengaluru.
            </p>
          </FadeIn>

          <FadeIn className="min-w-0">
            <div className="divide-y divide-line border-y border-line">
              {numberedFaqGroups.map((group) => (
                <div key={group.label} className="py-2 first:pt-0 last:pb-0 md:py-3">
                  <p className="pt-6 text-xs font-medium tracking-[0.16em] text-brand uppercase">
                    {group.label}
                  </p>
                  <div>
                    {group.items.map((item) => (
                      <FaqItem
                        key={item.question}
                        item={item}
                        number={item.number}
                        open={openQuestion === item.question}
                        onToggle={() =>
                          setOpenQuestion(
                            openQuestion === item.question ? "" : item.question,
                          )
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
