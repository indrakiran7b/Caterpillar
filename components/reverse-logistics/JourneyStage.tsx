import type { JourneyStage as JourneyStageData } from "@/data/journeyStages";

type JourneyStageProps = {
  stage: JourneyStageData;
  active?: boolean;
};

export function JourneyStage({ stage, active = false }: JourneyStageProps) {
  return (
    <article
      data-journey-stage
      data-stage={stage.id}
      className="absolute inset-x-0 top-0"
      aria-hidden={!active}
    >
      <p className="mb-3 text-[0.68rem] font-semibold tracking-[0.22em] text-muted">
        {stage.number} — {stage.label}
      </p>
      <h3 className="font-display text-[clamp(1.55rem,3.1vw,2.35rem)] font-extrabold uppercase leading-[0.96] tracking-[-0.03em] text-ink">
        {stage.title}
      </h3>
      <p className="mt-4 max-w-[22rem] text-[0.95rem] leading-relaxed text-ink-soft sm:text-[1.02rem]">
        {stage.description}
      </p>
    </article>
  );
}
