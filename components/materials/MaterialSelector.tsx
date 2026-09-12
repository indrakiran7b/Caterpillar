import type { KeyboardEvent } from "react";
import type { MaterialConfig, MaterialId } from "@/data/materials";

type MaterialSelectorProps = {
  materials: MaterialConfig[];
  selected: MaterialId;
  onSelect: (id: MaterialId) => void;
};

export function MaterialSelector({
  materials,
  selected,
  onSelect,
}: MaterialSelectorProps) {
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;

    event.preventDefault();
    const index = materials.findIndex((item) => item.id === selected);
    const last = materials.length - 1;
    let next = index;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = index === last ? 0 : index + 1;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = index <= 0 ? last : index - 1;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = last;
    }

    const material = materials[next];
    if (!material) return;
    onSelect(material.id);

    const button = event.currentTarget.querySelector<HTMLButtonElement>(
      `[data-material-option="${material.id}"]`,
    );
    button?.focus();
  };

  return (
    <div
      className="relative"
      role="tablist"
      aria-label="Materials that can move through the network"
      onKeyDown={onKeyDown}
    >
      <div
        data-material-selector
        className="relative flex w-full min-w-0 gap-0 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] md:flex-col md:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        <div
          data-material-indicator
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 z-10 h-0.5 w-12 origin-left bg-accent md:bottom-auto md:top-0 md:h-9 md:w-0.5 md:origin-top"
        />
        {materials.map((material) => {
          const active = material.id === selected;

          return (
            <button
              key={material.id}
              type="button"
              role="tab"
              id={`material-tab-${material.id}`}
              data-material-option={material.id}
              aria-selected={active}
              aria-controls="material-panel"
              tabIndex={active ? 0 : -1}
              onClick={() => onSelect(material.id)}
              className={`group relative min-h-11 shrink-0 border-b border-ink/10 px-4 py-3 text-left transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:min-h-12 md:w-full md:border-b md:border-l-0 md:px-5 md:py-3.5 ${
                active ? "text-ink" : "text-muted"
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute bottom-0 left-4 right-4 h-px origin-left bg-ink/20 transition-transform duration-300 md:left-0 md:right-auto md:top-3 md:bottom-3 md:h-auto md:w-px ${
                  active ? "scale-x-100 md:scale-x-100 md:scale-y-100" : "scale-x-0 group-hover:scale-x-100 md:scale-y-0 md:group-hover:scale-y-100"
                }`}
              />
              <span className="flex items-baseline gap-3 transition-transform duration-300 group-hover:translate-x-1 md:group-hover:translate-x-1.5">
                <span className="text-[0.62rem] font-semibold tracking-[0.18em]">
                  {material.number}
                </span>
                <span
                  className={`font-display text-[0.95rem] font-extrabold uppercase tracking-[-0.03em] sm:text-[1.05rem] ${
                    active ? "text-ink" : "text-ink-soft"
                  }`}
                >
                  {material.name}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
