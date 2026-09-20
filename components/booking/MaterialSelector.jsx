export default function MaterialSelector({
  materials = [],
  selected,
  onToggle,
  error,
  status = "ready",
  onRetry,
}) {
  return (
    <fieldset aria-describedby={error ? "materials-error" : undefined}>
      <legend className="text-xs font-medium tracking-[0.18em] text-brand uppercase">
        Choose what you’re selling
      </legend>
      <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
        Select every category you want collected.
      </p>

      {status === "loading" ? (
        <div className="mt-6" aria-live="polite" aria-busy="true">
          <p className="sr-only">Loading materials...</p>
          <div className="grid grid-cols-2 gap-2">
            {["a", "b", "c", "d"].map((item) => (
              <div
                key={item}
                className="min-h-12 rounded-2xl bg-line/80 motion-safe:animate-pulse"
              />
            ))}
          </div>
        </div>
      ) : null}

      {status === "error" ? (
        <div className="mt-6" aria-live="polite">
          <p className="text-sm text-red-700">Materials are currently unavailable.</p>
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className="mt-3 text-sm font-medium text-brand underline decoration-line underline-offset-4 hover:text-brand-dark"
            >
              Try again
            </button>
          ) : null}
        </div>
      ) : null}

      {status === "empty" ? (
        <p className="mt-6 text-sm text-muted" aria-live="polite">
          Materials are currently unavailable.
        </p>
      ) : null}

      {status === "ready" ? (
        <div className="mt-6 grid grid-cols-2 gap-2">
          {materials.map((item) => {
            const active = selected.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => onToggle(item.id)}
                className={`flex min-h-12 items-center justify-between rounded-2xl border px-3 py-3 text-left text-sm font-medium transition-colors ${
                  active
                    ? "border-brand bg-brand-soft text-ink"
                    : "border-line bg-white text-ink hover:border-ink/20"
                }`}
              >
                <span>{item.name}</span>
                <span
                  aria-hidden="true"
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                    active ? "bg-brand text-white" : "border border-line text-transparent"
                  }`}
                >
                  ✓
                </span>
              </button>
            );
          })}
        </div>
      ) : null}

      {error ? (
        <p id="materials-error" className="mt-4 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
