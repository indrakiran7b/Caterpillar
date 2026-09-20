import { bookingSteps } from "@/lib/booking";

export default function BookingProgress({ current, onSelect }) {
  return (
    <nav aria-label="Booking progress">
      <p className="text-sm text-muted lg:hidden" aria-live="polite">
        Step {current + 1} of {bookingSteps.length}
      </p>
      <ol className="mt-3 flex gap-2 lg:mt-8 lg:block lg:space-y-0">
        {bookingSteps.map((step, index) => {
          const done = index < current;
          const active = index === current;
          const canJump = done && typeof onSelect === "function";

          const marker = (
            <span
              aria-hidden="true"
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${
                done
                  ? "bg-brand text-white"
                  : active
                    ? "bg-brand-soft text-brand"
                    : "bg-line text-muted"
              }`}
            >
              {done ? (
                <>
                  <span aria-hidden="true">✓</span>
                  <span className="sr-only">Completed</span>
                </>
              ) : (
                String(index + 1)
              )}
            </span>
          );

          return (
            <li key={step.id} className="flex-1 lg:flex lg:gap-4">
              <div className="hidden flex-col items-center lg:flex">
                {marker}
                {index < bookingSteps.length - 1 ? (
                  <span
                    className={`mt-1 h-8 w-px ${done ? "bg-brand" : "bg-line"}`}
                    aria-hidden="true"
                  />
                ) : null}
              </div>
              <div className="lg:pt-1">
                <span
                  className={`block h-1 rounded-full lg:hidden ${
                    done || active ? "bg-brand" : "bg-line"
                  }`}
                  aria-hidden="true"
                />
                {canJump ? (
                  <button
                    type="button"
                    onClick={() => onSelect(index)}
                    className="mt-2 hidden text-left text-sm text-ink lg:block"
                  >
                    {step.label}
                  </button>
                ) : (
                  <p
                    className={`mt-2 hidden text-sm lg:block ${
                      active ? "font-medium text-ink" : "text-muted"
                    }`}
                    aria-current={active ? "step" : undefined}
                  >
                    {step.label}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
