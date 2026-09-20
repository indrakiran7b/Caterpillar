const ALLOWED_EVENTS = new Set([
  "page_view",
  "book_pickup_click",
  "booking_started",
  "booking_completed",
  "view_booking",
  "select_material",
  "enter_location",
  "complete_booking",
]);

export function track(event) {
  if (!ALLOWED_EVENTS.has(event)) return;
  if (typeof window === "undefined") return;

  const sink = window.__caterpillarTrack;
  if (typeof sink !== "function") return;

  sink({ event });
}
