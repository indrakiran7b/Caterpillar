import Button from "@/components/ui/Button";
import { formatDateLabel, materialLabels, slotLabel } from "@/lib/booking";

export default function BookingSuccess({ form, requestId, mode, materials }) {
  return (
    <div className="max-w-lg" role="status" aria-live="polite">
      <p className="text-xs font-medium tracking-[0.18em] text-brand uppercase">
        Request sent
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-5xl">
        Pickup request received.
      </h2>
      <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
        We’ve received your pickup details.
      </p>
      {mode === "mock" ? (
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Development mock mode. This request was not sent to a live booking
          system.
        </p>
      ) : null}
      <dl className="mt-8 border-t border-line text-sm">
        {requestId ? (
          <div className="flex justify-between gap-6 border-b border-line py-4">
            <dt className="text-muted">{mode === "mock" ? "Mock reference" : "Pickup reference"}</dt>
            <dd className="font-medium text-ink">{requestId}</dd>
          </div>
        ) : null}
        <div className="flex justify-between gap-6 border-b border-line py-4">
          <dt className="text-muted">Materials</dt>
          <dd className="text-right font-medium text-ink">
            {materialLabels(form.materials, materials).join(", ")}
          </dd>
        </div>
        <div className="flex justify-between gap-6 border-b border-line py-4">
          <dt className="text-muted">Location</dt>
          <dd className="text-right font-medium text-ink">
            {[form.address, form.locality, form.pincode].filter(Boolean).join(", ")}
          </dd>
        </div>
        <div className="flex justify-between gap-6 py-4">
          <dt className="text-muted">Preferred slot</dt>
          <dd className="text-right font-medium text-ink">
            {formatDateLabel(form.date)}, {slotLabel(form.slot)}
          </dd>
        </div>
      </dl>
      <div className="mt-8">
        <h3 className="text-sm font-medium text-ink">What happens next?</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          We’ll review your request and follow up with the pickup details.
        </p>
      </div>
      <Button href="/" className="mt-8 w-full sm:w-auto">
        Back to CaterPillar
      </Button>
    </div>
  );
}
