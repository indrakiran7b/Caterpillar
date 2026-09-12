export function RoutePath() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <path
        data-journey-path
        d="M16 18 L16 40 Q16 50 28 50 L40 50 Q50 50 56 40 L58 32 Q60 28 58 40 L54 58 Q52 68 64 72 L80 78"
        fill="none"
        stroke="#14120F"
        strokeWidth="0.55"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.42"
      />
      <path
        data-journey-path-accent
        d="M16 18 L16 40 Q16 50 28 50 L40 50 Q50 50 56 40 L58 32 Q60 28 58 40 L54 58 Q52 68 64 72 L80 78"
        fill="none"
        stroke="#FF3B1F"
        strokeWidth="0.22"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
    </svg>
  );
}
