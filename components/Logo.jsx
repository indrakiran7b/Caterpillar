export default function Logo({ className = "", onDark = false }) {
  return (
    <span className={`inline-flex items-baseline tracking-tight ${className}`} aria-label="CaterPillar">
      <span className={onDark ? "text-white" : "text-ink"} aria-hidden="true">
        Cater
      </span>
      <span className="text-brand" aria-hidden="true">Pillar</span>
    </span>
  );
}
