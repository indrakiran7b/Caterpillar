import { apiRequest, getPickupsEndpoint } from "@/lib/api/client";
import { ApiError } from "@/lib/api/errors";
import { mockCreatePickupRequest, mockGetPickupRequest } from "@/lib/api/mock";
import { normalizePhone } from "@/lib/booking";
import { isMockApiEnabled } from "@/lib/config";

export function toPickupPayload(form) {
  return {
    customer: {
      name: form.name.trim(),
      phone: normalizePhone(form.phone),
    },
    pickup: {
      address: form.address.trim(),
      locality: form.locality.trim(),
      pincode: form.pincode.trim(),
      date: form.date,
      timePreference: form.slot,
    },
    materials: [...form.materials],
  };
}

function readRequestId(payload) {
  if (!payload || typeof payload !== "object") return "";
  const value = payload.requestId || payload.id || payload.reference;
  return typeof value === "string" ? value.trim() : "";
}

export async function createPickupRequest(form) {
  const data = toPickupPayload(form);

  if (isMockApiEnabled()) {
    return mockCreatePickupRequest(data);
  }

  const endpoint = getPickupsEndpoint();
  if (!endpoint) {
    return {
      ok: false,
      mode: "unconfigured",
      message: new ApiError("not_configured").message,
    };
  }

  try {
    const payload = await apiRequest(endpoint, {
      method: "POST",
      body: data,
    });

    return {
      ok: true,
      mode: "remote",
      requestId: readRequestId(payload),
    };
  } catch (error) {
    return {
      ok: false,
      mode: "remote",
      message: error instanceof ApiError
        ? error.message
        : new ApiError("network").message,
    };
  }
}

export async function getPickupRequest(id) {
  if (isMockApiEnabled()) {
    return mockGetPickupRequest();
  }

  const endpoint = getPickupsEndpoint();
  if (!endpoint || !id) {
    return {
      ok: false,
      code: "not_configured",
      message: new ApiError("not_configured").message,
    };
  }

  return {
    ok: false,
    code: "not_implemented",
    message: "We couldn’t find that request.",
  };
}
