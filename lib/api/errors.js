export class ApiError extends Error {
  constructor(code, status = 0) {
    super(userMessageFor(code, status));
    this.name = "ApiError";
    this.code = code;
    this.status = status;
  }

  static fromStatus(status) {
    return new ApiError("http", status);
  }
}

export function userMessageFor(code, status) {
  if (status === 400 || status === 422) {
    return "Some details could not be accepted. Please check the form and try again.";
  }

  if (status === 404) {
    return "We couldn’t find that request.";
  }

  if (status === 409) {
    return "This pickup request could not be completed. Please try again.";
  }

  if (status === 429) {
    return "Too many requests. Please wait a moment and try again.";
  }

  if (code === "timeout") {
    return "The request is taking too long. Please try again.";
  }

  if (code === "network") {
    return "We couldn’t connect. Check your connection and try again.";
  }

  return "We couldn’t submit your pickup request. Please try again.";
}

export function logApiEvent(event, detail = {}) {
  if (process.env.NODE_ENV !== "development") return;

  const safe = { ...detail };
  delete safe.body;
  delete safe.phone;
  delete safe.name;
  delete safe.address;
  delete safe.customer;
  delete safe.pincode;

  console.info("[caterpillar-api]", event, safe);
}
