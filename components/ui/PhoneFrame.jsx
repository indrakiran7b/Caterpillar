const sizes = {
  hero: "w-[232px] sm:w-[248px] lg:w-[268px]",
  default: "w-[250px] sm:w-[270px] lg:w-[300px]",
  showcase: "w-[250px] sm:w-[290px] lg:w-[330px] xl:w-[348px]",
};

export default function PhoneFrame({
  children,
  className = "",
  label = "CaterPillar app preview",
  size = "default",
}) {
  return (
    <div
      className={`relative mx-auto aspect-[9/19.2] ${sizes[size] || sizes.default} ${className}`}
      role="img"
      aria-label={label}
    >
      <div className="absolute -right-[3px] top-[18%] h-10 w-[3px] rounded-r-sm bg-neutral-700" />
      <div className="absolute -left-[3px] top-[16%] h-8 w-[3px] rounded-l-sm bg-neutral-700" />
      <div className="absolute -left-[3px] top-[24%] h-12 w-[3px] rounded-l-sm bg-neutral-700" />
      <div className="absolute inset-0 rounded-[2.4rem] bg-neutral-950 p-[10px] shadow-[0_18px_40px_-24px_rgba(17,17,17,0.45)]">
        <div className="absolute left-1/2 top-[12px] z-20 h-[22px] w-[96px] -translate-x-1/2 rounded-full bg-black" />
        <div className="relative h-full overflow-hidden rounded-[1.95rem] bg-[#ecece8]">
          {children}
          <div className="pointer-events-none absolute inset-x-0 bottom-2 z-20 flex justify-center">
            <span className="h-1 w-24 rounded-full bg-black/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
