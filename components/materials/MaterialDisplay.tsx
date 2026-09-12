import { MaterialIllustration } from "@/components/materials/MaterialIllustration";
import { MaterialInfo } from "@/components/materials/MaterialInfo";
import { materials, type MaterialConfig } from "@/data/materials";

type MaterialDisplayProps = {
  material: MaterialConfig;
};

export function MaterialDisplay({ material }: MaterialDisplayProps) {
  return (
    <div
      id="material-panel"
      role="tabpanel"
      aria-labelledby={`material-tab-${material.id}`}
      className="relative flex h-full min-h-0 flex-col"
    >
      <div
        data-material-display
        className="group relative h-[46svh] min-h-[18rem] w-full sm:h-[48svh] sm:min-h-[22rem] lg:h-[52svh] lg:min-h-[26rem]"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-[12%] top-[14%] h-40 w-40 rounded-full border border-ink/6" />
          <div className="absolute right-[-8%] bottom-[8%] h-[48%] w-[46%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,59,31,0.06),transparent_66%)]" />
        </div>

        {materials.map((item) => (
          <MaterialIllustration key={item.id} material={item} />
        ))}

        <p
          data-material-hover-label
          className="pointer-events-none absolute bottom-[12%] left-1/2 z-20 -translate-x-1/2 text-[0.62rem] font-semibold tracking-[0.18em] text-ink-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:hidden"
        >
          {material.hoverLabel}
        </p>
      </div>

      <div className="relative z-10 shrink-0 px-1 pb-2 pt-4 md:px-0 md:pb-0 md:pt-2">
        <MaterialInfo material={material} />
      </div>
    </div>
  );
}
