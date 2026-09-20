import { apiRequest, getServiceabilityEndpoint } from "@/lib/api/client";
import { ApiError } from "@/lib/api/errors";
import { mockCheckServiceability } from "@/lib/api/mock";
import { isValidPincode } from "@/lib/booking";
import { isMockApiEnabled } from "@/lib/config";

export function isServiceabilityEnabled() {
  return isMockApiEnabled() || Boolean(getServiceabilityEndpoint());
}

function readAvailable(payload) {
  if (!payload || typeof payload !== "object") return null;
  if (typeof payload.available === "boolean") return payload.available;
  if (typeof payload.serviceable === "boolean") return payload.serviceable;
  return null;
}

export async function checkServiceability(pincode) {
  const value = String(pincode || "").trim();

  if (!isValidPincode(value)) {
    return {
      ok: false,
      available: null,
      code: "invalid",
      message: "Enter a valid 6-digit pincode.",
    };
  }

  if (isMockApiEnabled()) {
    return mockCheckServiceability(value);
  }

  const endpoint = getServiceabilityEndpoint();
  if (!endpoint) {
    return {
      ok: true,
      available: null,
      mode: "unconfigured",
    };
  }

  try {
    const payload = await apiRequest(`${endpoint}?pincode=${encodeURIComponent(value)}`);
    const available = readAvailable(payload);

    if (available === false) {
      return {
        ok: true,
        available: false,
        mode: "remote",
        message: "We don’t currently offer pickups in this area.",
      };
    }

    if (available === true) {
      return {
        ok: true,
        available: true,
        mode: "remote",
        message: "Pickup is available in your area.",
      };
    }

    return {
      ok: true,
      available: null,
      mode: "remote",
    };
  } catch (error) {
    return {
      ok: false,
      available: null,
      mode: "remote",
      message:
        error instanceof ApiError && error.code === "timeout"
          ? error.message
          : "We couldn’t check availability right now. Please try again.",
    };
  }
}
