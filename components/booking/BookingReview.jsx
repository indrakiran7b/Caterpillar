import { formatDateLabel, formatIndianPhoneLabel, materialLabels, slotLabel } from "@/lib/booking";

function Section({ title, onEdit, children }) {
  return (
    <section className="border-t border-line py-5 first:border-t-0">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xs font-medium tracking-[0.18em] text-brand uppercase">
          {title}
        </h3>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex min-h-11 items-center text-sm font-medium text-brand underline decoration-line underline-offset-4 hover:text-brand-dark"
        >
          Edit
        </button>
      </div>
      <dl className="mt-3 space-y-2 text-sm">
        {children}
      </dl>
    </section>
  );
}

function Row({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-6">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium text-ink sm:text-right">{value}</dd>
    </div>
  );
}

export default function BookingReview({ form, materials, onEdit }) {
  return (
    <div>
      <p className="text-xs font-medium tracking-[0.18em] text-brand uppercase">
        Review
      </p>
      <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
        Check the details before sending your pickup request.
      </p>
      <div className="mt-6">
        <Section title="Pickup" onEdit={() => onEdit("location")}>
          <Row label="Address" value={form.address} />
          <Row label="Area" value={form.locality} />
          <Row label="Pincode" value={form.pincode} />
        </Section>
        <Section title="Materials" onEdit={() => onEdit("materials")}>
          <Row label="Selected" value={materialLabels(form.materials, materials).join(", ")} />
        </Section>
        <Section title="Date" onEdit={() => onEdit("pickup")}>
          <Row label="Preferred date" value={formatDateLabel(form.date)} />
        </Section>
        <Section title="Time" onEdit={() => onEdit("pickup")}>
          <Row label="Preferred time" value={slotLabel(form.slot)} />
        </Section>
        <Section title="Customer" onEdit={() => onEdit("location")}>
          <Row label="Name" value={form.name} />
          <Row label="Phone" value={formatIndianPhoneLabel(form.phone)} />
        </Section>
      </div>
    </div>
  );
}
