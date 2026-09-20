"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export const PRODUCT_FILL_MS = 1800;
export const PRODUCT_GAP_MS = 150;
export const PRODUCT_HOLD_MS = 200;
export const PRODUCT_STEP_MS = PRODUCT_FILL_MS + PRODUCT_GAP_MS;
export const PRODUCT_CYCLE_MS =
  PRODUCT_FILL_MS * 3 + PRODUCT_GAP_MS * 2 + PRODUCT_HOLD_MS;

const materialOptions = [
  { name: "Paper & cardboard", selected: true },
  { name: "Plastic", selected: true },
  { name: "Metal", selected: false },
  { name: "E-waste", selected: false },
];

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-4 text-[10px] font-medium text-neutral-500">
      <span>9:41</span>
      <span className="flex items-center gap-1.5">
        <span className="h-1.5 w-3.5 rounded-sm bg-neutral-400" />
        <span className="h-1.5 w-2.5 rounded-sm bg-neutral-400" />
        <span className="h-2 w-4 rounded-sm border border-neutral-400" />
      </span>
    </div>
  );
}

function Progress({ step = 1, total = 3 }) {
  return (
    <div className="mb-4 flex gap-1" aria-hidden="true">
      {Array.from({ length: total }, (_, index) => (
        <span key={index} className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-black/10">
          <span
            className="absolute inset-y-0 left-0 bg-brand"
            style={{ width: index < step ? "100%" : "0%" }}
          />
        </span>
      ))}
    </div>
  );
}

function StepProgress({ stepIndex = 0, total = 3 }) {
  const reduceMotion = useReducedMotion();
  const [armed, setArmed] = useState(false);

  useLayoutEffect(() => {
    if (reduceMotion) {
      setArmed(true);
      return undefined;
    }

    setArmed(false);
    const frame = window.requestAnimationFrame(() => setArmed(true));
    return () => window.cancelAnimationFrame(frame);
  }, [stepIndex, reduceMotion]);

  return (
    <div className="mb-4 flex gap-1" aria-hidden="true">
      {Array.from({ length: total }, (_, index) => {
        const complete = reduceMotion || index < stepIndex || (index === stepIndex && armed);

        return (
          <span key={index} className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-black/10">
            <span
              className="absolute inset-y-0 left-0 w-full origin-left bg-brand"
              style={{
                transform: `scaleX(${complete ? 1 : 0})`,
                transition:
                  !reduceMotion && index === stepIndex && armed
                    ? `transform ${PRODUCT_FILL_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
                    : "none",
              }}
            />
          </span>
        );
      })}
    </div>
  );
}

function AppHeader({ title, step = 1, total = 3 }) {
  return (
    <div className="px-5 pt-6">
      <Progress step={step} total={total} />
      <p className="text-[11px] font-medium tracking-[0.16em] text-brand uppercase">
        CaterPillar
      </p>
      <h3 className="mt-2 text-[22px] font-semibold tracking-tight text-ink">{title}</h3>
    </div>
  );
}

function DetailCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white px-4 py-3.5">
      <p className="text-[10px] font-medium tracking-[0.14em] text-muted uppercase">
        {label}
      </p>
      <p className="mt-1 text-[13px] font-medium text-ink">{value}</p>
    </div>
  );
}

export function ScreenBook() {
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <AppHeader title="Got scrap at home?" step={1} />
      <div className="px-5 pt-3">
        <p className="text-[13px] leading-relaxed text-muted">
          Choose what you want collected.
        </p>
      </div>
      <div className="mt-4 flex flex-1 flex-col gap-2 px-5">
        {materialOptions.map((item) => (
          <div
            key={item.name}
            className={`flex items-center justify-between rounded-2xl border bg-white px-4 py-3.5 ${
              item.selected ? "border-brand/25" : "border-black/5"
            }`}
          >
            <span className="text-[13px] font-medium text-ink">{item.name}</span>
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                item.selected ? "bg-brand text-white" : "border border-line text-transparent"
              }`}
            >
              ✓
            </span>
          </div>
        ))}
      </div>
      <div className="px-5 pb-7">
        <div className="rounded-full bg-ink py-3 text-center text-[13px] font-medium text-white">
          Book a pickup
        </div>
      </div>
    </div>
  );
}

export function ScreenMaterials() {
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <AppHeader title="Select materials" step={2} />
      <div className="mt-5 flex flex-1 flex-col gap-2 px-5">
        {materialOptions.map((item) => (
          <div
            key={item.name}
            className={`flex items-center justify-between rounded-2xl border bg-white px-4 py-3.5 ${
              item.selected ? "border-brand/25" : "border-black/5"
            }`}
          >
            <span className="text-[13px] font-medium text-ink">{item.name}</span>
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                item.selected ? "bg-brand text-white" : "border border-line text-transparent"
              }`}
            >
              ✓
            </span>
          </div>
        ))}
      </div>
      <div className="px-5 pb-7">
        <div className="rounded-full bg-ink py-3 text-center text-[13px] font-medium text-white">
          Continue
        </div>
      </div>
    </div>
  );
}

export function ScreenConfirm() {
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <AppHeader title="Confirm pickup" step={2} />
      <div className="mt-5 flex flex-1 flex-col gap-2 px-5">
        <DetailCard label="Address" value="Your pickup address" />
        <DetailCard label="Materials" value="Paper, plastic" />
        <DetailCard label="Time" value="Preferred time" />
        <DetailCard label="Status" value="Pickup requested" />
      </div>
      <div className="px-5 pb-7">
        <div className="rounded-full bg-ink py-3 text-center text-[13px] font-medium text-white">
          Confirm pickup
        </div>
      </div>
    </div>
  );
}

export function ScreenComplete() {
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <AppHeader title="Pickup complete" step={3} />
      <div className="mt-5 flex flex-1 flex-col gap-2 px-5">
        <div className="rounded-2xl border border-black/5 bg-white px-4 py-5 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand">
            <span className="text-lg">✓</span>
          </div>
          <p className="mt-3 text-[15px] font-semibold tracking-tight text-ink">
            Pickup complete
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-muted">
            Materials collected and weighed.
          </p>
        </div>
        <DetailCard label="Materials" value="Paper, plastic" />
        <DetailCard label="Weighing" value="Completed during the visit" />
        <DetailCard label="Next" value="Payment after collection" />
      </div>
      <div className="px-5 pb-7">
        <div className="rounded-full bg-ink py-3 text-center text-[13px] font-medium text-white">
          Done
        </div>
      </div>
    </div>
  );
}

function BookBody() {
  return (
    <div className="flex h-full flex-col">
      <h3 className="px-5 text-[22px] font-semibold tracking-tight text-ink">Got scrap at home?</h3>
      <p className="px-5 pt-3 text-[13px] leading-relaxed text-muted">
        Choose what you want collected.
      </p>
      <div className="mt-4 flex flex-1 flex-col gap-2 px-5">
        {materialOptions.map((item) => (
          <div
            key={item.name}
            className={`flex items-center justify-between rounded-2xl border bg-white px-4 py-3.5 ${
              item.selected ? "border-brand/25" : "border-black/5"
            }`}
          >
            <span className="text-[13px] font-medium text-ink">{item.name}</span>
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                item.selected ? "bg-brand text-white" : "border border-line text-transparent"
              }`}
            >
              ✓
            </span>
          </div>
        ))}
      </div>
      <div className="px-5 pb-7">
        <div className="rounded-full bg-ink py-3 text-center text-[13px] font-medium text-white">
          Book a pickup
        </div>
      </div>
    </div>
  );
}

function ConfirmBody() {
  return (
    <div className="flex h-full flex-col">
      <h3 className="px-5 text-[22px] font-semibold tracking-tight text-ink">Confirm pickup</h3>
      <div className="mt-5 flex flex-1 flex-col gap-2 px-5">
        <DetailCard label="Address" value="Your pickup address" />
        <DetailCard label="Materials" value="Paper, plastic" />
        <DetailCard label="Time" value="Preferred time" />
        <DetailCard label="Status" value="Pickup requested" />
      </div>
      <div className="px-5 pb-7">
        <div className="rounded-full bg-ink py-3 text-center text-[13px] font-medium text-white">
          Confirm pickup
        </div>
      </div>
    </div>
  );
}

function CompleteBody() {
  return (
    <div className="flex h-full flex-col">
      <h3 className="px-5 text-[22px] font-semibold tracking-tight text-ink">Pickup complete</h3>
      <div className="mt-5 flex flex-1 flex-col gap-2 px-5">
        <div className="rounded-2xl border border-black/5 bg-white px-4 py-5 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand">
            <span className="text-lg">✓</span>
          </div>
          <p className="mt-3 text-[15px] font-semibold tracking-tight text-ink">
            Pickup complete
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-muted">
            Materials collected and weighed.
          </p>
        </div>
        <DetailCard label="Materials" value="Paper, plastic" />
        <DetailCard label="Weighing" value="Completed during the visit" />
        <DetailCard label="Next" value="Payment after collection" />
      </div>
      <div className="px-5 pb-7">
        <div className="rounded-full bg-ink py-3 text-center text-[13px] font-medium text-white">
          Done
        </div>
      </div>
    </div>
  );
}

const flowBodies = [BookBody, ConfirmBody, CompleteBody];

export function ProductFlow({ stepIndex = 0 }) {
  const reduceMotion = useReducedMotion();
  const prevIndexRef = useRef(stepIndex);
  const [animateSlide, setAnimateSlide] = useState(false);

  useLayoutEffect(() => {
    const previous = prevIndexRef.current;
    prevIndexRef.current = stepIndex;
    const wrapped = previous === flowBodies.length - 1 && stepIndex === 0;
    setAnimateSlide(!reduceMotion && !wrapped && stepIndex !== previous);
  }, [stepIndex, reduceMotion]);

  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <div className="px-5 pt-6">
        <StepProgress stepIndex={stepIndex} total={flowBodies.length} />
        <p className="text-[11px] font-medium tracking-[0.16em] text-brand uppercase">
          CaterPillar
        </p>
      </div>
      <div className="relative mt-2 min-h-0 flex-1 overflow-hidden">
        <div
          className={`flex h-full ${
            animateSlide
              ? "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              : ""
          }`}
          style={{ transform: `translateX(-${stepIndex * 100}%)` }}
        >
          {flowBodies.map((Body, index) => (
            <div key={index} className="h-full w-full shrink-0">
              <Body />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const screens = {
  book: ScreenBook,
  materials: ScreenMaterials,
  confirm: ScreenConfirm,
  complete: ScreenComplete,
};

export default function AppScreen({ id = "book" }) {
  const Screen = screens[id] || ScreenBook;
  return <Screen />;
}
