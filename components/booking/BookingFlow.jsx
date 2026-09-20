"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { track } from "@/lib/analytics";
import { createPickupRequest, getMaterials } from "@/lib/api";
import { getMaterialsEndpoint } from "@/lib/api/client";
import { checkServiceability, isServiceabilityEnabled } from "@/lib/api/serviceability";
import {
  bookingSteps,
  formatDateLabel,
  initialBooking,
  isValidPincode,
  materialLabels,
  normalizePhone,
  slotLabel,
  todayISO,
  validateStep,
} from "@/lib/booking";
import { isMockApiEnabled } from "@/lib/config";
import { serviceArea } from "@/lib/content";
import { localMaterials } from "@/lib/data/materials";
import { requestBrowserLocation } from "@/lib/location";
import { easeOut } from "@/lib/motion";
import Button from "@/components/ui/Button";
import BookingProgress from "@/components/booking/BookingProgress";
import BookingReview from "@/components/booking/BookingReview";
import BookingSuccess from "@/components/booking/BookingSuccess";
import LocationForm from "@/components/booking/LocationForm";
import MaterialSelector from "@/components/booking/MaterialSelector";
import PickupDetails from "@/components/booking/PickupDetails";

const stepTransition = {
  duration: 0.28,
  ease: easeOut,
};

const idleServiceability = {
  status: "idle",
  available: null,
  message: "",
};

function clearError(errors, key) {
  if (!errors[key]) return errors;
  const next = { ...errors };
  delete next[key];
  return next;
}

function RequestSummary({ form, catalog }) {
  const materials = materialLabels(form.materials, catalog);
  const location = [form.address, form.locality, form.pincode].filter(Boolean).join(", ");
  const slot = [formatDateLabel(form.date), slotLabel(form.slot)].filter(Boolean).join(", ");

  if (!materials.length && !location && !slot) return null;

  return (
    <div className="mt-8 hidden max-w-sm border-t border-line pt-6 lg:block">
      <p className="text-xs font-medium tracking-[0.18em] text-brand uppercase">
        Your request
      </p>
      <dl className="mt-3 space-y-3 text-sm">
        {materials.length ? (
          <div>
            <dt className="text-muted">Materials</dt>
            <dd className="mt-0.5 font-medium text-ink">{materials.join(", ")}</dd>
          </div>
        ) : null}
        {location ? (
          <div>
            <dt className="text-muted">Location</dt>
            <dd className="mt-0.5 font-medium text-ink">{location}</dd>
          </div>
        ) : null}
        {slot ? (
          <div>
            <dt className="text-muted">Preferred slot</dt>
            <dd className="mt-0.5 font-medium text-ink">{slot}</dd>
          </div>
        ) : null}
      </dl>
    </div>
  );
}

export default function BookingFlow() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState(initialBooking);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSlow, setSubmitSlow] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [result, setResult] = useState(null);
  const [catalog, setCatalog] = useState(localMaterials);
  const [materialsStatus, setMaterialsStatus] = useState(
    isMockApiEnabled() || getMaterialsEndpoint() ? "loading" : "ready",
  );
  const [serviceability, setServiceability] = useState(idleServiceability);
  const [locating, setLocating] = useState(false);
  const [locationHint, setLocationHint] = useState("");
  const reduceMotion = useReducedMotion();
  const panelRef = useRef(null);
  const hasMoved = useRef(false);
  const submitLock = useRef(false);
  const stepRef = useRef(0);
  const current = bookingSteps[step];
  const mockMode = isMockApiEnabled();

  const loadMaterials = async (refresh = false) => {
    setMaterialsStatus("loading");
    try {
      const response = await getMaterials({ refresh });
      if (!response.ok) {
        setCatalog([]);
        setMaterialsStatus("error");
        return;
      }
      if (!response.materials.length) {
        setCatalog([]);
        setMaterialsStatus("empty");
        return;
      }
      setCatalog(response.materials);
      setMaterialsStatus("ready");
    } catch {
      setCatalog([]);
      setMaterialsStatus("error");
    }
  };

  const verifyPincode = async (pincode) => {
    if (!isServiceabilityEnabled()) return;
    if (!isValidPincode(pincode)) {
      setServiceability(idleServiceability);
      setForm((currentForm) => ({ ...currentForm, serviceable: null }));
      return;
    }

    setServiceability({ status: "checking", available: null, message: "" });
    const response = await checkServiceability(pincode);

    if (response.available === false) {
      setServiceability({
        status: "unavailable",
        available: false,
        message: response.message,
      });
      setForm((currentForm) => ({ ...currentForm, serviceable: false }));
      return;
    }

    if (response.available === true) {
      setServiceability({
        status: "available",
        available: true,
        message: response.message,
      });
      setForm((currentForm) => ({ ...currentForm, serviceable: true }));
      return;
    }

    if (!response.ok) {
      setServiceability({
        status: "error",
        available: null,
        message: response.message,
      });
      setForm((currentForm) => ({ ...currentForm, serviceable: null }));
      return;
    }

    setServiceability(idleServiceability);
    setForm((currentForm) => ({ ...currentForm, serviceable: null }));
  };

  const goTo = (next, { history = true } = {}) => {
    hasMoved.current = true;
    setDirection(next > step ? 1 : -1);
    setErrors({});
    setSubmitError("");
    setStep(next);
    stepRef.current = next;
    if (history && typeof window !== "undefined") {
      window.history.pushState({ bookingStep: next }, "", window.location.pathname);
    }
  };

  useEffect(() => {
    track("view_booking");
    track("booking_started");
    if (!isMockApiEnabled() && !getMaterialsEndpoint()) return;
    loadMaterials();
  }, []);

  useEffect(() => {
    if (!hasMoved.current) return;
    panelRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (current.id === "location") track("enter_location");
  }, [current.id]);

  useEffect(() => {
    const onPop = (event) => {
      const next = event.state?.bookingStep;
      if (typeof next !== "number") return;
      if (next < 0 || next >= bookingSteps.length) return;
      hasMoved.current = true;
      setDirection(next > stepRef.current ? 1 : -1);
      setErrors({});
      setSubmitError("");
      setStep(next);
      stepRef.current = next;
    };

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (!submitting) {
      setSubmitSlow(false);
      return undefined;
    }

    const timer = setTimeout(() => setSubmitSlow(true), 2500);
    return () => clearTimeout(timer);
  }, [submitting]);

  useEffect(() => {
    if (!isServiceabilityEnabled()) return undefined;
    if (!isValidPincode(form.pincode)) {
      setServiceability(idleServiceability);
      return undefined;
    }

    const timer = setTimeout(() => {
      verifyPincode(form.pincode);
    }, 450);

    return () => clearTimeout(timer);
  }, [form.pincode]);

  const updateField = (event) => {
    const { name, value } = event.target;
    let nextValue = value;

    if (name === "pincode") {
      nextValue = value.replace(/\D/g, "").slice(0, 6);
    }

    if (name === "phone") {
      nextValue = normalizePhone(value);
    }

    if (name === "date" && value && value < todayISO()) {
      nextValue = todayISO();
    }

    setForm((currentForm) => ({
      ...currentForm,
      [name]: nextValue,
      ...(name === "pincode" ? { serviceable: null } : {}),
    }));
    setErrors((currentErrors) => clearError(currentErrors, name));
  };

  const toggleMaterial = (id) => {
    setForm((currentForm) => {
      const selected = currentForm.materials.includes(id)
        ? currentForm.materials.filter((item) => item !== id)
        : [...currentForm.materials, id];
      return { ...currentForm, materials: selected };
    });
    setErrors((currentErrors) => clearError(currentErrors, "materials"));
    track("select_material");
  };

  const selectSlot = (slot) => {
    setForm((currentForm) => ({ ...currentForm, slot }));
    setErrors((currentErrors) => clearError(currentErrors, "slot"));
  };

  const selectDate = (date) => {
    const nextValue = date < todayISO() ? todayISO() : date;
    setForm((currentForm) => ({ ...currentForm, date: nextValue }));
    setErrors((currentErrors) => clearError(currentErrors, "date"));
  };

  const useLocation = async () => {
    setLocating(true);
    setLocationHint("");
    const position = await requestBrowserLocation();
    setLocating(false);

    if (!position.ok) {
      setLocationHint("Enter your address using the fields below.");
      return;
    }

    setLocationHint("Location permission granted. Please enter your address and pincode.");
  };

  const editStep = (stepId) => {
    const index = bookingSteps.findIndex((item) => item.id === stepId);
    if (index >= 0) goTo(index);
  };

  const continueStep = () => {
    if (current.id === "location" && serviceability.status === "checking") return;
    if (current.id === "location" && serviceability.status === "unavailable") {
      setErrors({
        pincode: "We don’t currently offer pickups in this area.",
      });
      return;
    }

    const nextErrors = validateStep(current.id, form);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    if (step < bookingSteps.length - 1) {
      goTo(step + 1);
    }
  };

  const submit = async () => {
    if (submitLock.current || submitting) return;

    const all = {
      ...validateStep("materials", form),
      ...validateStep("location", form),
      ...validateStep("pickup", form),
    };

    if (Object.keys(all).length) {
      setErrors(all);
      setSubmitError("Please complete the required details before confirming.");
      return;
    }

    submitLock.current = true;
    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await createPickupRequest(form);
      if (!response.ok) {
        submitLock.current = false;
        setSubmitError(
          response.message || "We couldn’t submit your pickup request.",
        );
        return;
      }
      track("complete_booking");
      track("booking_completed");
      setResult(response);
    } catch {
      submitLock.current = false;
      setSubmitError("We couldn’t submit your pickup request.");
    } finally {
      setSubmitting(false);
    }
  };

  const variants = reduceMotion
    ? {
        enter: { opacity: 1, x: 0 },
        center: { opacity: 1, x: 0 },
        exit: { opacity: 1, x: 0 },
      }
    : {
        enter: (dir) => ({ opacity: 0, x: dir > 0 ? 10 : -10 }),
        center: { opacity: 1, x: 0 },
        exit: (dir) => ({ opacity: 0, x: dir > 0 ? -10 : 10 }),
      };

  if (result?.ok) {
    return (
      <BookingSuccess
        form={form}
        requestId={result.requestId}
        mode={result.mode}
        materials={catalog}
      />
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-[220px_minmax(0,28rem)] lg:justify-between lg:gap-16">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          Book a pickup.
        </h1>
        <p className="mt-4 max-w-sm text-base leading-relaxed text-muted">
          Choose what you’re selling, tell us where to collect it, then pick a preferred time.
        </p>
        <p className="mt-2 text-sm text-muted">Currently available in {serviceArea}.</p>
        {mockMode ? (
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Development mock mode. Requests are not sent to a live backend.
          </p>
        ) : null}
        <BookingProgress current={step} onSelect={goTo} />
        <RequestSummary form={form} catalog={catalog} />
      </div>

      <div>
        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            if (submitting || submitLock.current) return;
            if (current.id === "review") {
              submit();
            } else {
              continueStep();
            }
          }}
        >
          <div className="min-h-[18rem]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                ref={panelRef}
                tabIndex={-1}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={stepTransition}
                className="outline-none"
              >
                {current.id === "materials" ? (
                  <MaterialSelector
                    materials={catalog}
                    selected={form.materials}
                    onToggle={toggleMaterial}
                    error={errors.materials}
                    status={materialsStatus}
                    onRetry={() => loadMaterials(true)}
                  />
                ) : null}
                {current.id === "location" ? (
                  <LocationForm
                    form={form}
                    errors={errors}
                    onChange={updateField}
                    serviceability={serviceability}
                    onRetryServiceability={() => verifyPincode(form.pincode)}
                    onUseLocation={useLocation}
                    locating={locating}
                    locationHint={locationHint}
                  />
                ) : null}
                {current.id === "pickup" ? (
                  <PickupDetails
                    form={form}
                    errors={errors}
                    onChange={updateField}
                    onSlot={selectSlot}
                    onDate={selectDate}
                  />
                ) : null}
                {current.id === "review" ? (
                  <BookingReview
                    form={form}
                    materials={catalog}
                    onEdit={editStep}
                  />
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>

          <div aria-live="polite" className="min-h-6 pt-4">
            {submitError ? (
              <div>
                <p className="text-sm text-red-700" role="alert">
                  {submitError}
                </p>
                {current.id === "review" ? (
                  <button
                    type="button"
                    onClick={submit}
                    disabled={submitting}
                    className="mt-2 inline-flex min-h-11 items-center text-sm font-medium text-brand underline decoration-line underline-offset-4 hover:text-brand-dark disabled:opacity-60"
                  >
                    Try again
                  </button>
                ) : null}
              </div>
            ) : null}
            {submitting && submitSlow && !submitError ? (
              <p className="text-sm text-muted">Still working on your request...</p>
            ) : null}
          </div>

          {current.id === "review" ? (
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              After you book, we’ll use your pickup details to arrange the collection.
            </p>
          ) : null}

          <div className="sticky bottom-0 z-10 -mx-5 mt-6 border-t border-line bg-canvas/95 px-5 py-3 backdrop-blur-sm sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
            <div className="flex flex-col-reverse gap-3 sm:mt-4 sm:flex-row sm:items-center">
              {step > 0 ? (
                <Button
                  type="button"
                  variant="ghost"
                  className="min-h-12 w-full sm:w-auto"
                  onClick={() => goTo(step - 1)}
                  disabled={submitting}
                >
                  Back
                </Button>
              ) : null}
              {current.id === "review" ? (
                <Button
                  type="submit"
                  disabled={submitting}
                  arrow={false}
                  aria-busy={submitting}
                  className="min-h-12 w-full sm:w-auto"
                >
                  {submitting ? "Submitting..." : "Confirm pickup"}
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="min-h-12 w-full sm:w-auto"
                  disabled={
                    (current.id === "materials" && materialsStatus !== "ready") ||
                    (current.id === "location" && serviceability.status === "checking") ||
                    (current.id === "location" && serviceability.status === "unavailable")
                  }
                >
                  Continue
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
