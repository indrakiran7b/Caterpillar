import { apiRequest, getMaterialsEndpoint } from "@/lib/api/client";
import { mockGetMaterials } from "@/lib/api/mock";
import { localMaterials } from "@/lib/data/materials";
import { isMockApiEnabled } from "@/lib/config";

let materialsCache = null;

function asMaterial(item) {
  if (!item || typeof item !== "object") return null;
  const id = String(item.id || "").trim();
  const name = String(item.name || item.label || "").trim();
  if (!id || !name) return null;

  return {
    id,
    name,
    description: typeof item.description === "string" ? item.description : "",
    icon: item.icon || null,
  };
}

function normalizeMaterials(payload) {
  const list = Array.isArray(payload) ? payload : payload?.materials;
  if (!Array.isArray(list)) return [];
  return list.map(asMaterial).filter(Boolean);
}

export async function getMaterials({ refresh = false } = {}) {
  if (refresh) {
    materialsCache = null;
  }

  if (materialsCache) {
    return materialsCache;
  }

  if (isMockApiEnabled()) {
    materialsCache = await mockGetMaterials();
    return materialsCache;
  }

  const endpoint = getMaterialsEndpoint();

  if (endpoint) {
    try {
      const payload = await apiRequest(endpoint);
      const materials = normalizeMaterials(payload);
      materialsCache = {
        ok: true,
        source: "remote",
        materials,
      };
      return materialsCache;
    } catch (error) {
      return {
        ok: false,
        source: "remote",
        materials: [],
        error: error.message || "Couldn't load materials.",
      };
    }
  }

  materialsCache = {
    ok: true,
    source: "local",
    materials: localMaterials,
  };
  return materialsCache;
}

export function clearMaterialsCache() {
  materialsCache = null;
}
