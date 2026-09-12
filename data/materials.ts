import type { RecyclableType } from "@/data/recyclableObjects";

export type MaterialId =
  | "plastic"
  | "cardboard"
  | "paper"
  | "metal"
  | "ewaste";

export type MaterialPiece = {
  type: RecyclableType;
  width: string;
  x: number;
  y: number;
  rotate: number;
  depth: number;
};

export type MaterialMotion = {
  x: number;
  y: number;
  rotate: number;
};

export type MaterialConfig = {
  id: MaterialId;
  number: string;
  name: string;
  description: string;
  hoverLabel: string;
  path: readonly string[];
  personality: "float" | "grounded" | "drift" | "heavy" | "precise";
  enterFrom: MaterialMotion;
  exitTo: MaterialMotion;
  pieces: MaterialPiece[];
  piecesMobile?: MaterialPiece[];
};

export const defaultMaterialId: MaterialId = "cardboard";

export const explorerPath = [
  "COLLECT",
  "SORT",
  "AGGREGATE",
  "MOVE",
] as const;

export const materials: MaterialConfig[] = [
  {
    id: "plastic",
    number: "01",
    name: "PLASTIC",
    description:
      "Plastic materials can be collected, sorted and aggregated for their next stage.",
    hoverLabel: "MATERIAL STREAM",
    path: explorerPath,
    personality: "float",
    enterFrom: { x: -72, y: -28, rotate: -8 },
    exitTo: { x: 56, y: 24, rotate: 6 },
    pieces: [
      { type: "bottle", width: "w-[92px] sm:w-[110px] lg:w-[128px]", x: -18, y: -8, rotate: -8, depth: 1.1 },
      { type: "container", width: "w-[88px] sm:w-[104px] lg:w-[118px]", x: 22, y: 16, rotate: 10, depth: 0.7 },
      { type: "jar", width: "w-[54px] sm:w-[62px] lg:w-[70px]", x: 28, y: -22, rotate: 6, depth: 0.45 },
    ],
    piecesMobile: [
      { type: "bottle", width: "w-[86px]", x: -16, y: -6, rotate: -6, depth: 1 },
      { type: "container", width: "w-[78px]", x: 20, y: 14, rotate: 8, depth: 0.7 },
    ],
  },
  {
    id: "cardboard",
    number: "02",
    name: "CARDBOARD",
    description: "Collected from homes, warehouses and businesses.",
    hoverLabel: "READY TO MOVE",
    path: explorerPath,
    personality: "grounded",
    enterFrom: { x: 48, y: 36, rotate: 5 },
    exitTo: { x: -40, y: -18, rotate: -6 },
    pieces: [
      { type: "cardboard", width: "w-[168px] sm:w-[210px] lg:w-[268px]", x: 0, y: 2, rotate: 3, depth: 1.2 },
      { type: "cardboard", width: "w-[92px] sm:w-[110px] lg:w-[128px]", x: -28, y: 18, rotate: -10, depth: 0.55 },
      { type: "cardboard", width: "w-[78px] sm:w-[92px] lg:w-[104px]", x: 30, y: 22, rotate: 8, depth: 0.4 },
    ],
    piecesMobile: [
      { type: "cardboard", width: "w-[168px]", x: 0, y: 0, rotate: 3, depth: 1.2 },
      { type: "cardboard", width: "w-[78px]", x: -26, y: 18, rotate: -8, depth: 0.5 },
    ],
  },
  {
    id: "paper",
    number: "03",
    name: "PAPER",
    description: "Paper moves through the network as a sorted material stream.",
    hoverLabel: "MATERIAL STREAM",
    path: explorerPath,
    personality: "drift",
    enterFrom: { x: 36, y: -48, rotate: 12 },
    exitTo: { x: -28, y: 36, rotate: -10 },
    pieces: [
      { type: "paper", width: "w-[150px] sm:w-[180px] lg:w-[210px]", x: -10, y: 6, rotate: -14, depth: 0.7 },
      { type: "paper", width: "w-[140px] sm:w-[168px] lg:w-[196px]", x: 12, y: -8, rotate: 10, depth: 1.1 },
      { type: "paper", width: "w-[110px] sm:w-[128px] lg:w-[146px]", x: 8, y: 22, rotate: 4, depth: 0.45 },
    ],
    piecesMobile: [
      { type: "paper", width: "w-[150px]", x: -8, y: 4, rotate: -12, depth: 0.8 },
      { type: "paper", width: "w-[132px]", x: 12, y: -8, rotate: 8, depth: 1 },
    ],
  },
  {
    id: "metal",
    number: "04",
    name: "METAL",
    description: "Sorted metal can be aggregated into larger material volumes.",
    hoverLabel: "READY TO MOVE",
    path: explorerPath,
    personality: "heavy",
    enterFrom: { x: 0, y: 56, rotate: 3 },
    exitTo: { x: 0, y: -40, rotate: -2 },
    pieces: [
      { type: "can", width: "w-[78px] sm:w-[92px] lg:w-[108px]", x: -8, y: 0, rotate: -4, depth: 1.15 },
      { type: "can", width: "w-[54px] sm:w-[62px] lg:w-[72px]", x: 22, y: 14, rotate: 8, depth: 0.55 },
    ],
    piecesMobile: [
      { type: "can", width: "w-[74px]", x: -6, y: 0, rotate: -3, depth: 1.1 },
      { type: "can", width: "w-[50px]", x: 20, y: 12, rotate: 6, depth: 0.55 },
    ],
  },
  {
    id: "ewaste",
    number: "05",
    name: "E-WASTE",
    description:
      "Electronic materials require a different sorting and recovery path.",
    hoverLabel: "A DIFFERENT PATH",
    path: explorerPath,
    personality: "precise",
    enterFrom: { x: 60, y: -16, rotate: 2 },
    exitTo: { x: -48, y: 12, rotate: -2 },
    pieces: [
      { type: "device", width: "w-[168px] sm:w-[200px] lg:w-[236px]", x: 0, y: 0, rotate: 0, depth: 1.1 },
      { type: "device", width: "w-[92px] sm:w-[108px] lg:w-[120px]", x: 26, y: 22, rotate: 6, depth: 0.45 },
    ],
    piecesMobile: [
      { type: "device", width: "w-[168px]", x: 0, y: 0, rotate: 0, depth: 1.1 },
    ],
  },
];

export function getMaterial(id: MaterialId) {
  return materials.find((item) => item.id === id) ?? materials[1];
}

export function getMaterialPieces(material: MaterialConfig, isMobile: boolean) {
  if (isMobile) return material.piecesMobile ?? material.pieces;
  return material.pieces;
}
