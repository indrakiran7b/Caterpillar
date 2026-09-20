import { localMaterials } from "@/lib/data/materials";

export const bookingSteps = [
  { id: "materials", num: "01", label: "Materials" },
  { id: "location", num: "02", label: "Location" },
  { id: "pickup", num: "03", label: "Pickup" },
  { id: "review", num: "04", label: "Review" },
];

export const materialOptions = localMaterials.map((item) => ({
  id: item.id,
  label: item.name,
}));

export const timeSlots = [
  { id: "morning", label: "Morning" },
  { id: "afternoon", label: "Afternoon" },
  { id: "evening", label: "Evening" },
];

export const initialBooking = {
  materials: [],
  name: "",
  phone: "",
  address: "",
  locality: "",
  pincode: "",
  date: "",
  slot: "",
  serviceable: null,
};

export function normalizePhone(value) {
  let digits = String(value || "").replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length >= 12) digits = digits.slice(2);
  else if (digits.startsWith("0") && digits.length === 11) digits = digits.slice(1);
  return digits.slice(0, 10);
}

export function formatIndianPhoneDisplay(value) {
  const digits = normalizePhone(value);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)} ${digits.slice(5)}`;
}

export function formatIndianPhoneLabel(value) {
  const digits = normalizePhone(value);
  if (!digits) return "";
  return `+91 ${formatIndianPhoneDisplay(digits)}`;
}

export function isValidIndianPhone(value) {
  return /^[6-9]\d{9}$/.test(normalizePhone(value));
}

export function isValidPincode(value) {
  return /^\d{6}$/.test(String(value || "").trim());
}

export function todayISO() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60000);
  return local.toISOString().slice(0, 10);
}

export function upcomingDates(count = 7) {
  const start = todayISO();
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(`${start}T00:00:00`);
    date.setDate(date.getDate() + index);
    const value = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");
    return {
      value,
      weekday: date.toLocaleDateString("en-IN", { weekday: "short" }),
      day: date.getDate(),
      month: date.toLocaleDateString("en-IN", { month: "short" }),
    };
  });
}

export function formatDateLabel(value) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function materialLabels(ids, catalog = localMaterials) {
  return catalog
    .filter((item) => ids.includes(item.id))
    .map((item) => item.name || item.label);
}

export function slotLabel(id) {
  return timeSlots.find((item) => item.id === id)?.label || "";
}

export function validateStep(stepId, form) {
  const errors = {};

  if (stepId === "materials") {
    if (!form.materials.length) {
      errors.materials = "Select at least one material.";
    }
  }

  if (stepId === "location") {
    if (!form.name.trim()) errors.name = "Enter your name.";
    if (!form.phone.trim()) errors.phone = "Enter your phone number.";
    else if (!isValidIndianPhone(form.phone)) {
      errors.phone = "Enter a valid 10-digit mobile number.";
    }
    if (!form.address.trim()) errors.address = "Enter your pickup address.";
    if (!form.pincode.trim()) errors.pincode = "Enter your pincode.";
    else if (!isValidPincode(form.pincode)) {
      errors.pincode = "Enter a valid 6-digit pincode.";
    } else if (form.serviceable === false) {
      errors.pincode = "We don’t currently offer pickups in this area.";
    }
  }

  if (stepId === "pickup") {
    if (!form.date) errors.date = "Choose a preferred date.";
    else if (form.date < todayISO()) errors.date = "Choose today or a later date.";
    if (!form.slot) errors.slot = "Choose a preferred time.";
  }

  return errors;
}
