import { timeSlots, todayISO, upcomingDates } from "@/lib/booking";
import Field, { inputClass } from "@/components/booking/Field";

export default function PickupDetails({ form, errors, onChange, onSlot, onDate }) {
  const noteId = "pickup-preference-note";
  const dates = upcomingDates(7);

  return (
    <fieldset>
      <legend className="text-xs font-medium tracking-[0.18em] text-brand uppercase">
        Choose when
      </legend>
      <p id={noteId} className="mt-3 max-w-md text-base leading-relaxed text-muted">
        These are requested preferences, not a confirmed slot.
      </p>
      <div className="mt-8 space-y-8">
        <div>
          <p className="mb-3 block text-sm font-medium text-ink" id="date-label">
            Preferred pickup date
          </p>
          <div
            className="flex max-w-full gap-2 overflow-x-auto pb-1"
            role="listbox"
            aria-labelledby="date-label"
            aria-describedby={errors.date ? "date-error" : noteId}
          >
            {dates.map((item) => {
              const active = form.date === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => onDate(item.value)}
                  className={`min-h-16 min-w-[4.5rem] rounded-2xl border px-3 py-2 text-center transition-colors ${
                    active
                      ? "border-brand bg-brand-soft text-ink"
                      : "border-line bg-white text-ink hover:border-ink/20"
                  }`}
                >
                  <span className="block text-[11px] uppercase tracking-wide text-muted">
                    {item.weekday}
                  </span>
                  <span className="mt-1 block text-base font-medium">{item.day}</span>
                  <span className="block text-[11px] text-muted">{item.month}</span>
                </button>
              );
            })}
          </div>
          <Field
            id="date"
            label="Or choose another date"
            error={errors.date}
            hint={!errors.date ? "We’ll treat this as a preferred date." : undefined}
          >
            <input
              id="date"
              name="date"
              type="date"
              min={todayISO()}
              value={form.date}
              onChange={onChange}
              aria-required="true"
              aria-invalid={Boolean(errors.date)}
              aria-describedby={errors.date ? "date-error" : `${noteId} date-hint`}
              className={inputClass(errors.date)}
            />
          </Field>
        </div>
        <fieldset aria-describedby={errors.slot ? "slot-error" : noteId}>
          <legend className="mb-3 block text-sm font-medium text-ink">
            Preferred time
          </legend>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {timeSlots.map((slot) => {
              const active = form.slot === slot.id;
              return (
                <button
                  key={slot.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onSlot(slot.id)}
                  className={`min-h-12 rounded-2xl border px-4 py-4 text-center text-sm font-medium transition-colors ${
                    active
                      ? "border-brand bg-brand-soft text-ink"
                      : "border-line bg-white text-ink hover:border-ink/20"
                  }`}
                >
                  {slot.label}
                </button>
              );
            })}
          </div>
          {errors.slot ? (
            <p id="slot-error" className="mt-3 text-sm text-red-700" role="alert">
              {errors.slot}
            </p>
          ) : null}
        </fieldset>
      </div>
    </fieldset>
  );
}
