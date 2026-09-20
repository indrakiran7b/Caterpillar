import { localMaterials } from "@/lib/data/materials";

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function mockGetMaterials() {
  await wait(180);
  return {
    ok: true,
    source: "mock",
    materials: localMaterials,
  };
}

export async function mockCreatePickupRequest() {
  await wait(450);
  const stamp = Date.now().toString(36).toUpperCase();
  return {
    ok: true,
    mode: "mock",
    requestId: `MOCK-${stamp}`,
  };
}

export async function mockCheckServiceability(pincode) {
  await wait(220);
  return {
    ok: true,
    available: true,
    mode: "mock",
    message: "Pickup is available in your area.",
    pincode,
  };
}

export async function mockGetPickupRequest() {
  await wait(180);
  return {
    ok: false,
    code: "not_implemented",
    message: "We couldn’t find that request.",
  };
}
