import type { RecyclableType } from "@/data/recyclableObjects";

export type MaterialGroup = "plastic" | "cardboard" | "paper" | "metal" | "ewaste";

export type MaterialPose = {
  x: number;
  y: number;
  rotate: number;
  scale: number;
};

export type MaterialObjectConfig = {
  id: string;
  type: RecyclableType;
  group: MaterialGroup;
  depth: number;
  showOnMobile: boolean;
  width: string;
  scattered: MaterialPose;
  sorted: MaterialPose;
  aggregated: MaterialPose;
  scatteredMobile?: MaterialPose;
  sortedMobile?: MaterialPose;
  aggregatedMobile?: MaterialPose;
};

export type MaterialLabelConfig = {
  id: MaterialGroup;
  label: string;
  x: number;
  y: number;
  mobileX: number;
  mobileY: number;
};

export const materialCaptions = [
  "WE THROW IT AWAY.",
  "WE SORT IT.",
  "WE AGGREGATE IT.",
  "WE MOVE IT BACK.",
] as const;

export const materialLabels: MaterialLabelConfig[] = [
  { id: "plastic", label: "PLASTIC", x: 0, y: -26, mobileX: 0, mobileY: -38 },
  { id: "cardboard", label: "CARDBOARD", x: -28, y: -16, mobileX: 0, mobileY: -16 },
  { id: "paper", label: "PAPER", x: 28, y: -18, mobileX: 0, mobileY: 2 },
  { id: "metal", label: "METAL", x: -8, y: 12, mobileX: -16, mobileY: 16 },
  { id: "ewaste", label: "E-WASTE", x: 22, y: 12, mobileX: 16, mobileY: 16 },
];

export const materialObjects: MaterialObjectConfig[] = [
  {
    id: "plastic-bottle",
    type: "bottle",
    group: "plastic",
    depth: 0.7,
    showOnMobile: true,
    width: "w-[52px] sm:w-[60px] lg:w-[72px]",
    scattered: { x: 22, y: -22, rotate: -16, scale: 1 },
    sorted: { x: 0, y: -16, rotate: -4, scale: 1 },
    aggregated: { x: -7, y: 18, rotate: -10, scale: 0.72 },
    scatteredMobile: { x: 20, y: -20, rotate: -14, scale: 0.92 },
    sortedMobile: { x: 0, y: -28, rotate: -2, scale: 0.92 },
    aggregatedMobile: { x: -10, y: 18, rotate: -8, scale: 0.7 },
  },
  {
    id: "plastic-container",
    type: "container",
    group: "plastic",
    depth: 0.45,
    showOnMobile: false,
    width: "w-[56px] sm:w-[64px] lg:w-[76px]",
    scattered: { x: 34, y: -18, rotate: 14, scale: 0.9 },
    sorted: { x: 10, y: -14, rotate: 8, scale: 0.9 },
    aggregated: { x: 8, y: 14, rotate: 8, scale: 0.66 },
  },
  {
    id: "plastic-bottle-b",
    type: "bottle",
    group: "plastic",
    depth: 0.95,
    showOnMobile: false,
    width: "w-[48px] lg:w-[58px]",
    scattered: { x: 34, y: 18, rotate: 20, scale: 0.78 },
    sorted: { x: -10, y: -14, rotate: -8, scale: 0.8 },
    aggregated: { x: 14, y: 22, rotate: 14, scale: 0.58 },
  },
  {
    id: "cardboard-box",
    type: "cardboard",
    group: "cardboard",
    depth: 1.15,
    showOnMobile: true,
    width: "w-[70px] sm:w-[82px] lg:w-[96px]",
    scattered: { x: 20, y: 6, rotate: 10, scale: 1 },
    sorted: { x: -28, y: 0, rotate: 4, scale: 1 },
    aggregated: { x: -16, y: 24, rotate: 6, scale: 0.7 },
    scatteredMobile: { x: -20, y: -10, rotate: 12, scale: 0.9 },
    sortedMobile: { x: 0, y: -8, rotate: 3, scale: 0.9 },
    aggregatedMobile: { x: -2, y: 24, rotate: 4, scale: 0.68 },
  },
  {
    id: "cardboard-box-b",
    type: "cardboard",
    group: "cardboard",
    depth: 0.6,
    showOnMobile: false,
    width: "w-[62px] lg:w-[78px]",
    scattered: { x: 36, y: 8, rotate: -14, scale: 0.88 },
    sorted: { x: -28, y: 14, rotate: -6, scale: 0.88 },
    aggregated: { x: 2, y: 28, rotate: -6, scale: 0.62 },
  },
  {
    id: "paper-sheet",
    type: "paper",
    group: "paper",
    depth: 0.5,
    showOnMobile: true,
    width: "w-[68px] sm:w-[78px] lg:w-[90px]",
    scattered: { x: 18, y: 30, rotate: -28, scale: 0.96 },
    sorted: { x: 28, y: -4, rotate: -8, scale: 0.96 },
    aggregated: { x: -20, y: 12, rotate: -18, scale: 0.6 },
    scatteredMobile: { x: 22, y: 10, rotate: -22, scale: 0.86 },
    sortedMobile: { x: 0, y: 8, rotate: -8, scale: 0.86 },
    aggregatedMobile: { x: 14, y: 20, rotate: -12, scale: 0.58 },
  },
  {
    id: "paper-sheet-b",
    type: "paper",
    group: "paper",
    depth: 0.85,
    showOnMobile: false,
    width: "w-[60px] lg:w-[74px]",
    scattered: { x: 24, y: 34, rotate: 18, scale: 0.84 },
    sorted: { x: 28, y: 12, rotate: 10, scale: 0.84 },
    aggregated: { x: 18, y: 12, rotate: 16, scale: 0.56 },
  },
  {
    id: "metal-can",
    type: "can",
    group: "metal",
    depth: 1.05,
    showOnMobile: true,
    width: "w-[40px] sm:w-[46px] lg:w-[52px]",
    scattered: { x: 26, y: 16, rotate: 24, scale: 0.94 },
    sorted: { x: -10, y: 24, rotate: 6, scale: 0.94 },
    aggregated: { x: -4, y: 30, rotate: 12, scale: 0.58 },
    scatteredMobile: { x: -10, y: 20, rotate: 18, scale: 0.88 },
    sortedMobile: { x: -16, y: 24, rotate: 4, scale: 0.88 },
    aggregatedMobile: { x: -16, y: 28, rotate: 8, scale: 0.56 },
  },
  {
    id: "metal-can-b",
    type: "can",
    group: "metal",
    depth: 0.55,
    showOnMobile: false,
    width: "w-[36px] lg:w-[44px]",
    scattered: { x: -18, y: 28, rotate: -20, scale: 0.8 },
    sorted: { x: 4, y: 28, rotate: -8, scale: 0.82 },
    aggregated: { x: 10, y: 32, rotate: -10, scale: 0.52 },
  },
  {
    id: "ewaste-device",
    type: "device",
    group: "ewaste",
    depth: 1.25,
    showOnMobile: true,
    width: "w-[64px] sm:w-[74px] lg:w-[86px]",
    scattered: { x: -24, y: 30, rotate: 8, scale: 0.95 },
    sorted: { x: 20, y: 24, rotate: 2, scale: 0.95 },
    aggregated: { x: -12, y: 32, rotate: 4, scale: 0.6 },
    scatteredMobile: { x: 12, y: 28, rotate: 8, scale: 0.86 },
    sortedMobile: { x: 16, y: 26, rotate: 2, scale: 0.86 },
    aggregatedMobile: { x: 12, y: 30, rotate: 4, scale: 0.58 },
  },
  {
    id: "ewaste-device-b",
    type: "device",
    group: "ewaste",
    depth: 0.4,
    showOnMobile: false,
    width: "w-[56px] lg:w-[68px]",
    scattered: { x: 30, y: -8, rotate: -8, scale: 0.8 },
    sorted: { x: 30, y: 26, rotate: 8, scale: 0.8 },
    aggregated: { x: 20, y: 28, rotate: -6, scale: 0.54 },
  },
];

export function getMaterialPose(
  object: MaterialObjectConfig,
  phase: "scattered" | "sorted" | "aggregated",
  isMobile: boolean,
): MaterialPose {
  if (isMobile) {
    if (phase === "scattered") return object.scatteredMobile ?? object.scattered;
    if (phase === "sorted") return object.sortedMobile ?? object.sorted;
    return object.aggregatedMobile ?? object.aggregated;
  }

  if (phase === "scattered") return object.scattered;
  if (phase === "sorted") return object.sorted;
  return object.aggregated;
}
