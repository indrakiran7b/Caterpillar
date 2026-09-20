import { getApiBaseUrl, getMaterialsPath, getPickupsPath, getServiceabilityPath } from "@/lib/config";
import { ApiError, logApiEvent } from "@/lib/api/errors";

const DEFAULT_TIMEOUT_MS = 15000;

function trimEnv(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function joinUrl(base, path) {
  const trimmedBase = trimEnv(base).replace(/\/+$/, "");
  const trimmedPath = trimEnv(path).replace(/^\/+/, "");

  if (!trimmedBase) return "";
  if (!trimmedPath) return trimmedBase;
  return `${trimmedBase}/${trimmedPath}`;
}

export function getPickupsEndpoint() {
  return joinUrl(getApiBaseUrl(), getPickupsPath());
}

export function getMaterialsEndpoint() {
  const path = getMaterialsPath();
  if (!path) return "";
  return joinUrl(getApiBaseUrl(), path);
}

export function getServiceabilityEndpoint() {
  const path = getServiceabilityPath();
  if (!path) return "";
  return joinUrl(getApiBaseUrl(), path);
}

export async function apiRequest(url, { method = "GET", body, timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  if (!url) {
    throw new ApiError("not_configured");
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });

    logApiEvent("response", { method, status: response.status });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw ApiError.fromStatus(response.status);
    }

    return payload;
  } catch (error) {
    if (error instanceof ApiError) {
      logApiEvent("error", { method, code: error.code, status: error.status });
      throw error;
    }

    if (error?.name === "AbortError") {
      logApiEvent("error", { method, code: "timeout" });
      throw new ApiError("timeout");
    }

    logApiEvent("error", { method, code: "network" });
    throw new ApiError("network");
  } finally {
    clearTimeout(timer);
  }
}
