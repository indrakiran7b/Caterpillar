import type { MaterialConfig } from "@/data/materials";

type MaterialInfoProps = {
  material: MaterialConfig;
};

export function MaterialInfo({ material }: MaterialInfoProps) {
  return (
    <div className="max-w-[26rem]">
      <div data-material-info>
        <p className="font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.03em] text-ink">
          {material.name}
        </p>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft sm:text-[1.02rem]">
          {material.description}
        </p>
      </div>

      <p
        data-material-path
        className="mt-6 text-[0.62rem] font-semibold tracking-[0.16em] text-muted"
      >
        {material.path.map((step, index) => (
          <span key={step}>
            {index > 0 ? (
              <span aria-hidden="true" className="mx-2 text-accent">
                →
              </span>
            ) : null}
            <span>{step}</span>
          </span>
        ))}
      </p>
    </div>
  );
}
