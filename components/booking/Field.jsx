export default function Field({
  id,
  label,
  error,
  hint,
  children,
}) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {hint && !error ? (
        <p id={hintId} className="mt-2 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const inputClass = (error) =>
  `min-h-12 w-full rounded-2xl border bg-white px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-muted/70 ${
    error ? "border-red-400" : "border-line focus:border-brand"
  }`;
