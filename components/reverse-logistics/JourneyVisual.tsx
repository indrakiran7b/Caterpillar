import { CardboardIllustration } from "@/components/hero/illustrations";
import { LogisticsMark, TruckMark } from "@/components/reverse-logistics/LogisticsMarks";
import { LogisticsObject } from "@/components/reverse-logistics/LogisticsObject";
import { RoutePath } from "@/components/reverse-logistics/RoutePath";
import {
  companionLabels,
  journeyCompanions,
  journeyMarks,
  journeyNodes,
  journeyStack,
} from "@/data/journeyStages";

export function JourneyVisual() {
  return (
    <div
      data-journey-visual
      className="relative h-full min-h-[20rem] w-full overflow-hidden bg-paper"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-[8%] top-[10%] h-40 w-40 rounded-full border border-ink/6" />
        <div className="absolute right-[-10%] bottom-[6%] h-[46%] w-[42%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,59,31,0.06),transparent_66%)]" />
      </div>

      <div data-journey-field className="absolute inset-0">
        <RoutePath />

        {journeyNodes.map((node) => (
          <div
            key={node.id}
            data-journey-node
            data-node={node.id}
            className="absolute top-1/2 left-1/2 hidden flex-col items-center md:flex"
          >
            <span className="block h-1.5 w-1.5 rounded-full bg-ink/70" />
            <span className="mt-2 text-[0.55rem] font-semibold tracking-[0.16em] text-muted">
              {node.label}
            </span>
          </div>
        ))}

        {journeyMarks.map((mark) => (
          <div
            key={mark.id}
            data-journey-mark
            data-id={mark.id}
            className={`absolute top-1/2 left-1/2 will-change-transform ${mark.width} ${
              mark.showOnMobile ? "" : "hidden md:block"
            }`}
          >
            <LogisticsMark id={mark.id} className="h-auto w-full" />
          </div>
        ))}

        <div
          data-journey-truck
          className="absolute top-1/2 left-1/2 w-[92px] will-change-transform sm:w-[110px] lg:w-[132px]"
        >
          <div className="[filter:drop-shadow(6px_10px_0_rgba(20,18,15,0.08))]">
            <TruckMark className="h-auto w-full" />
          </div>
        </div>

        {journeyCompanions.map((object) => (
          <LogisticsObject
            key={object.id}
            id={object.id}
            type={object.type}
            role="companion"
            width={object.width}
            showOnMobile={object.showOnMobile}
          />
        ))}

        {companionLabels.map((label) => (
          <p
            key={label.id}
            data-journey-sort-label
            data-group={label.id}
            className="absolute top-1/2 left-1/2 text-[0.55rem] font-semibold tracking-[0.18em] text-muted md:text-[0.58rem]"
          >
            {label.label}
          </p>
        ))}

        {journeyStack.map((object) => (
          <LogisticsObject
            key={object.id}
            id={object.id}
            type="cardboard"
            role="stack"
            width={object.width}
            showOnMobile={object.showOnMobile}
          />
        ))}

        <div
          data-journey-object
          data-role="hero"
          data-id="hero-cardboard"
          className="absolute top-1/2 left-1/2 z-10 w-[68px] will-change-transform sm:w-[82px] lg:w-[96px]"
        >
          <div className="[filter:drop-shadow(6px_10px_0_rgba(20,18,15,0.08))]">
            <CardboardIllustration className="h-auto w-full" />
          </div>
        </div>

        <div
          data-journey-next-life
          className="absolute top-1/2 left-1/2 text-center"
        >
          <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-ink-soft">
            READY FOR ITS NEXT LIFE
          </p>
        </div>
      </div>
    </div>
  );
}
