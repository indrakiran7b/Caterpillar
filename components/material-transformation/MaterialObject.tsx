import { RecyclableIllustration } from "@/components/hero/illustrations";
import type { MaterialObjectConfig } from "@/data/materialObjects";

type MaterialObjectProps = {
  config: MaterialObjectConfig;
};

export function MaterialObject({ config }: MaterialObjectProps) {
  return (
    <div
      data-material-object
      data-id={config.id}
      data-group={config.group}
      className={`absolute top-1/2 left-1/2 will-change-transform ${config.width} ${
        config.showOnMobile ? "" : "hidden md:block"
      }`}
    >
      <div
        data-material-parallax
        data-parallax-id={config.id}
        className="[filter:drop-shadow(6px_10px_0_rgba(20,18,15,0.08))]"
      >
        <RecyclableIllustration type={config.type} className="h-auto w-full" />
      </div>
    </div>
  );
}
