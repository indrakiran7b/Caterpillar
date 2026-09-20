const env = (value) => {
  if (typeof value !== "string") return "";
  return value.trim();
};

function withHttps(value) {
  const trimmed = env(value).replace(/\/$/, "");
  if (!trimmed) return "";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return `https://${trimmed}`;
}

export function getSiteUrl() {
  const configured = withHttps(process.env.NEXT_PUBLIC_SITE_URL);
  if (configured) return configured;

  const vercelProduction = withHttps(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  if (vercelProduction) return vercelProduction;

  const vercel = withHttps(process.env.VERCEL_URL);
  if (vercel) return vercel;

  return "http://localhost:3000";
}

export const siteConfig = {
  name: "CaterPillar",
  title: "CaterPillar — Turn Your Scrap Into Cash",
  description: "Book a doorstep pickup for your recyclable materials with CaterPillar.",
  url: getSiteUrl(),
  bookingUrl: env(process.env.NEXT_PUBLIC_BOOKING_URL),
  androidAppUrl: env(process.env.NEXT_PUBLIC_ANDROID_APP_URL),
  iosAppUrl: env(process.env.NEXT_PUBLIC_IOS_APP_URL),
};

export function getApiBaseUrl() {
  return (
    env(process.env.NEXT_PUBLIC_API_URL) ||
    env(process.env.NEXT_PUBLIC_PICKUP_API_URL)
  );
}

export function getPickupsPath() {
  return env(process.env.NEXT_PUBLIC_PICKUPS_PATH);
}

export function getMaterialsPath() {
  return env(process.env.NEXT_PUBLIC_MATERIALS_PATH);
}

export function getServiceabilityPath() {
  return env(process.env.NEXT_PUBLIC_SERVICEABILITY_PATH);
}

export function isMockApiEnabled() {
  if (process.env.NODE_ENV === "production") return false;
  return env(process.env.NEXT_PUBLIC_USE_MOCK_API).toLowerCase() === "true";
}

export function isApiConfigured() {
  return Boolean(getApiBaseUrl());
}

export function getBookingHref() {
  return siteConfig.bookingUrl || "/book";
}

export function getAppLinks() {
  const links = [];

  if (siteConfig.androidAppUrl) {
    links.push({ label: "Google Play", href: siteConfig.androidAppUrl });
  }

  if (siteConfig.iosAppUrl) {
    links.push({ label: "App Store", href: siteConfig.iosAppUrl });
  }

  return links;
}
