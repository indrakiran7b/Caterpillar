import { RecyclableIllustration } from "@/components/hero/illustrations";
import {
  FacilityMark,
  HouseMark,
  TruckMark,
} from "@/components/reverse-logistics/LogisticsMarks";
import { journeyStages } from "@/data/journeyStages";

const stageVisuals = {
  collect: <HouseMark className="h-auto w-[88px]" />,
  sort: (
    <div className="flex items-end gap-2">
      <RecyclableIllustration type="bottle" className="h-auto w-8" />
      <RecyclableIllustration type="cardboard" className="h-auto w-12" />
      <RecyclableIllustration type="paper" className="h-auto w-10" />
      <RecyclableIllustration type="can" className="h-auto w-6" />
    </div>
  ),
  aggregate: (
    <div className="grid grid-cols-3 gap-1">
      {Array.from({ length: 6 }).map((_, index) => (
        <RecyclableIllustration
          key={index}
          type="cardboard"
          className="h-auto w-10"
        />
      ))}
    </div>
  ),
  move: <TruckMark className="h-auto w-[110px]" />,
  return: <FacilityMark className="h-auto w-[96px]" />,
} as const;

export function ReducedMotionJourney() {
  return (
    <ol className="mx-auto max-w-[720px] space-y-0 px-5 pb-16 sm:px-8">
      {journeyStages.map((stage, index) => (
        <li key={stage.id} className="relative pb-12 last:pb-0">
          {index < journeyStages.length - 1 ? (
            <span
              aria-hidden="true"
              className="absolute left-[0.7rem] top-8 h-[calc(100%-1rem)] w-px bg-ink/15"
            />
          ) : null}
          <div className="flex gap-5">
            <span className="relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink/20 bg-paper text-[0.62rem] font-semibold text-ink">
              {stage.number}
            </span>
            <div>
              <p className="text-[0.68rem] font-semibold tracking-[0.22em] text-muted">
                {stage.label}
              </p>
              <h3 className="mt-2 font-display text-[1.45rem] font-extrabold uppercase leading-[0.96] tracking-[-0.03em] text-ink">
                {stage.title}
              </h3>
              <p className="mt-3 max-w-[28rem] text-[0.95rem] leading-relaxed text-ink-soft">
                {stage.description}
              </p>
              <div
                className="mt-5 [filter:drop-shadow(6px_10px_0_rgba(20,18,15,0.08))]"
                aria-hidden="true"
              >
                {stageVisuals[stage.id]}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
