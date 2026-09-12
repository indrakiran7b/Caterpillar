import { RecyclableIllustration } from "@/components/hero/illustrations";
import type { RecyclableType } from "@/data/recyclableObjects";

type LogisticsObjectProps = {
  id: string;
  type: RecyclableType;
  role: "hero" | "companion" | "stack";
  width: string;
  showOnMobile?: boolean;
};

export function LogisticsObject({
  id,
  type,
  role,
  width,
  showOnMobile = true,
}: LogisticsObjectProps) {
  return (
    <div
      data-journey-object
      data-role={role}
      data-id={id}
      className={`absolute top-1/2 left-1/2 will-change-transform ${width} ${
        showOnMobile ? "" : "hidden md:block"
      }`}
    >
      <div
        data-journey-parallax={role !== "hero" ? "" : undefined}
        className="[filter:drop-shadow(6px_10px_0_rgba(20,18,15,0.08))]"
      >
        <RecyclableIllustration type={type} className="h-auto w-full" />
      </div>
    </div>
  );
}
