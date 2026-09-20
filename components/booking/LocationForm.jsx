import { formatIndianPhoneDisplay } from "@/lib/booking";
import { serviceArea } from "@/lib/content";
import Field, { inputClass } from "@/components/booking/Field";

export default function LocationForm({
  form,
  errors,
  onChange,
  serviceability,
  onRetryServiceability,
  onUseLocation,
  locating = false,
  locationHint = "",
}) {
  const described = (id, extra) => extra || undefined;
  const pinMessage =
    errors.pincode ||
    (serviceability?.status === "unavailable"
      ? serviceability.message
      : undefined);

  return (
    <fieldset className="space-y-5">
      <legend className="text-xs font-medium tracking-[0.18em] text-brand uppercase">
        Pickup location
      </legend>
      <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
        Tell us where to collect it. Currently available in {serviceArea}.
      </p>

      <div className="space-y-5 pt-4">
        <Field
          id="address"
          label="Pickup address"
          error={errors.address}
          hint={!errors.address ? "Where should we collect your recyclables?" : undefined}
        >
          <textarea
            id="address"
            name="address"
            autoComplete="street-address"
            rows={3}
            placeholder="House or flat, street, landmark"
            value={form.address}
            onChange={onChange}
            aria-required="true"
            aria-invalid={Boolean(errors.address)}
            aria-describedby={described("address", errors.address ? "address-error" : "address-hint")}
            className={`${inputClass(errors.address)} min-h-24 resize-y`}
          />
        </Field>

        <div>
          <button
            type="button"
            onClick={onUseLocation}
            disabled={locating}
            className="inline-flex min-h-11 items-center text-sm font-medium text-brand underline decoration-line underline-offset-4 hover:text-brand-dark disabled:opacity-60"
          >
            {locating ? "Finding location..." : "Use my location"}
          </button>
          {locationHint ? (
            <p className="mt-2 text-sm text-muted" aria-live="polite">
              {locationHint}
            </p>
          ) : null}
        </div>

        <Field id="locality" label="Area / locality">
          <input
            id="locality"
            name="locality"
            autoComplete="address-level2"
            placeholder="Neighbourhood or area"
            value={form.locality}
            onChange={onChange}
            className={inputClass()}
          />
        </Field>

        <Field
          id="pincode"
          label="Pincode"
          error={pinMessage}
          hint={
            !pinMessage && serviceability?.status === "available"
              ? serviceability.message
              : !pinMessage
                ? "6-digit pincode"
                : undefined
          }
        >
          <input
            id="pincode"
            name="pincode"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={6}
            placeholder="560001"
            value={form.pincode}
            onChange={onChange}
            aria-required="true"
            aria-invalid={Boolean(pinMessage)}
            aria-describedby={
              pinMessage
                ? "pincode-error"
                : "pincode-hint"
            }
            className={inputClass(pinMessage)}
          />
        </Field>

        {serviceability?.status === "checking" ? (
          <p className="text-sm text-muted" aria-live="polite">
            Checking availability...
          </p>
        ) : null}

        {serviceability?.status === "error" ? (
          <div aria-live="polite">
            <p className="text-sm text-red-700">{serviceability.message}</p>
            {onRetryServiceability ? (
              <button
                type="button"
                onClick={onRetryServiceability}
                className="mt-2 text-sm font-medium text-brand underline decoration-line underline-offset-4 hover:text-brand-dark"
              >
                Try again
              </button>
            ) : null}
          </div>
        ) : null}

        <Field id="name" label="Name" error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Your full name"
            value={form.name}
            onChange={onChange}
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={described("name", errors.name ? "name-error" : undefined)}
            className={inputClass(errors.name)}
          />
        </Field>

        <Field id="phone" label="Phone number" error={errors.phone}>
          <div
            className={`flex overflow-hidden rounded-2xl border bg-white transition-colors ${
              errors.phone ? "border-red-400" : "border-line focus-within:border-brand"
            }`}
          >
            <span
              className="flex items-center border-r border-line bg-canvas-alt/70 px-3 text-sm font-medium text-muted"
              aria-hidden="true"
            >
              +91
            </span>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="10-digit mobile number"
              value={formatIndianPhoneDisplay(form.phone)}
              onChange={onChange}
              aria-required="true"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={described("phone", errors.phone ? "phone-error" : undefined)}
              aria-label="Phone number"
              className="min-h-12 w-full border-0 bg-transparent px-4 py-3 text-base text-ink outline-none"
            />
          </div>
        </Field>
      </div>
    </fieldset>
  );
}
