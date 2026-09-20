export function requestBrowserLocation() {
  return new Promise((resolve) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      resolve({ ok: false, code: "unsupported" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          ok: true,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        resolve({
          ok: false,
          code: error?.code === 1 ? "denied" : "unavailable",
        });
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 },
    );
  });
}
