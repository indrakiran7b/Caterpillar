import type { RecyclableType } from "@/data/recyclableObjects";

export type JourneyStageId =
  | "collect"
  | "sort"
  | "aggregate"
  | "move"
  | "return";

export type JourneyPose = {
  x: number;
  y: number;
  rotate: number;
  scale: number;
  autoAlpha?: number;
};

export type JourneyStage = {
  id: JourneyStageId;
  number: string;
  label: string;
  title: string;
  description: string;
};

export type JourneyMarkConfig = {
  id: "house" | "warehouse" | "sort-bay" | "aggregate-pad" | "facility";
  label: string;
  showOnMobile: boolean;
  width: string;
  desktop: JourneyPose;
  mobile: JourneyPose;
};

export type JourneyCompanionConfig = {
  id: string;
  type: RecyclableType;
  group: "plastic" | "paper" | "metal" | "ewaste";
  showOnMobile: boolean;
  width: string;
  mixed: JourneyPose;
  sorted: JourneyPose;
  later: JourneyPose;
  mixedMobile?: JourneyPose;
  sortedMobile?: JourneyPose;
  laterMobile?: JourneyPose;
};

export type JourneyStackConfig = {
  id: string;
  showOnMobile: boolean;
  width: string;
  hidden: JourneyPose;
  scattered: JourneyPose;
  stacked: JourneyPose;
  loaded: JourneyPose;
  hiddenMobile?: JourneyPose;
  scatteredMobile?: JourneyPose;
  stackedMobile?: JourneyPose;
  loadedMobile?: JourneyPose;
};

export const journeyStages: JourneyStage[] = [
  {
    id: "collect",
    number: "01",
    label: "COLLECT",
    title: "FROM WHERE IT STARTS.",
    description: "Recyclables begin at homes, warehouses and businesses.",
  },
  {
    id: "sort",
    number: "02",
    label: "SORT",
    title: "SEPARATE THE MATERIAL.",
    description: "Different materials need different paths.",
  },
  {
    id: "aggregate",
    number: "03",
    label: "AGGREGATE",
    title: "SMALL BECOMES SIGNIFICANT.",
    description: "We bring recyclable materials together into meaningful volumes.",
  },
  {
    id: "move",
    number: "04",
    label: "MOVE",
    title: "NOW WE MOVE IT.",
    description:
      "Aggregated materials move in bulk to the next point in the value chain.",
  },
  {
    id: "return",
    number: "05",
    label: "RETURN",
    title: "BACK INTO THE ECONOMY.",
    description: "Materials move on to the people who can give them another life.",
  },
];

export const journeyMarks: JourneyMarkConfig[] = [
  {
    id: "house",
    label: "HOME",
    showOnMobile: true,
    width: "w-[88px] sm:w-[108px] lg:w-[128px]",
    desktop: { x: -34, y: -32, rotate: 0, scale: 1, autoAlpha: 1 },
    mobile: { x: -18, y: -20, rotate: 0, scale: 1, autoAlpha: 1 },
  },
  {
    id: "warehouse",
    label: "WAREHOUSE",
    showOnMobile: false,
    width: "w-[120px] lg:w-[148px]",
    desktop: { x: -36, y: -4, rotate: 0, scale: 1, autoAlpha: 1 },
    mobile: { x: -28, y: -8, rotate: 0, scale: 0.8, autoAlpha: 0 },
  },
  {
    id: "sort-bay",
    label: "SORTING",
    showOnMobile: true,
    width: "w-[150px] sm:w-[190px] lg:w-[230px]",
    desktop: { x: 8, y: -18, rotate: 0, scale: 1, autoAlpha: 0 },
    mobile: { x: 8, y: -8, rotate: 0, scale: 0.88, autoAlpha: 0 },
  },
  {
    id: "aggregate-pad",
    label: "HUB",
    showOnMobile: true,
    width: "w-[168px] sm:w-[210px] lg:w-[250px]",
    desktop: { x: 4, y: 12, rotate: 0, scale: 0.86, autoAlpha: 0 },
    mobile: { x: 2, y: 8, rotate: 0, scale: 0.84, autoAlpha: 0 },
  },
  {
    id: "facility",
    label: "RECYCLER",
    showOnMobile: true,
    width: "w-[100px] sm:w-[120px] lg:w-[142px]",
    desktop: { x: 32, y: 30, rotate: 0, scale: 1, autoAlpha: 0.35 },
    mobile: { x: 20, y: 22, rotate: 0, scale: 0.9, autoAlpha: 0.28 },
  },
];

export const heroBoxPoses = {
  enter: { x: -30, y: -38, rotate: 10, scale: 0.88, autoAlpha: 0.45 },
  collect: { x: -28, y: -24, rotate: 6, scale: 1, autoAlpha: 1 },
  pickup: { x: -14, y: 2, rotate: 2, scale: 0.94, autoAlpha: 1 },
  sortMixed: { x: 2, y: -14, rotate: 10, scale: 0.9, autoAlpha: 1 },
  sortGrouped: { x: -6, y: -18, rotate: 4, scale: 0.96, autoAlpha: 1 },
  aggregate: { x: 0, y: 6, rotate: 3, scale: 1.08, autoAlpha: 1 },
  loaded: { x: 10, y: 14, rotate: 0, scale: 0.82, autoAlpha: 1 },
  arrive: { x: 28, y: 24, rotate: 2, scale: 0.9, autoAlpha: 1 },
} satisfies Record<string, JourneyPose>;

export const heroBoxPosesMobile = {
  enter: { x: -14, y: -28, rotate: 8, scale: 0.78, autoAlpha: 0.4 },
  collect: { x: -12, y: -14, rotate: 5, scale: 0.92, autoAlpha: 1 },
  pickup: { x: -4, y: -2, rotate: 2, scale: 0.86, autoAlpha: 1 },
  sortMixed: { x: 4, y: -8, rotate: 8, scale: 0.84, autoAlpha: 1 },
  sortGrouped: { x: -4, y: -12, rotate: 3, scale: 0.88, autoAlpha: 1 },
  aggregate: { x: 0, y: 6, rotate: 2, scale: 0.96, autoAlpha: 1 },
  loaded: { x: 8, y: 12, rotate: 0, scale: 0.76, autoAlpha: 1 },
  arrive: { x: 18, y: 18, rotate: 2, scale: 0.82, autoAlpha: 1 },
} satisfies Record<string, JourneyPose>;

export const truckPoses = {
  hidden: { x: -22, y: 8, rotate: 0, scale: 0.92, autoAlpha: 0 },
  collect: { x: -16, y: 4, rotate: 0, scale: 1, autoAlpha: 1 },
  wait: { x: -12, y: 10, rotate: 0, scale: 1, autoAlpha: 1 },
  travel: { x: 12, y: 18, rotate: 0, scale: 1, autoAlpha: 1 },
  arrive: { x: 22, y: 24, rotate: 0, scale: 1, autoAlpha: 1 },
} satisfies Record<string, JourneyPose>;

export const truckPosesMobile = {
  hidden: { x: -8, y: 4, rotate: 0, scale: 0.76, autoAlpha: 0 },
  collect: { x: -2, y: 2, rotate: 0, scale: 0.84, autoAlpha: 1 },
  wait: { x: 0, y: 6, rotate: 0, scale: 0.84, autoAlpha: 1 },
  travel: { x: 10, y: 12, rotate: 0, scale: 0.84, autoAlpha: 1 },
  arrive: { x: 16, y: 18, rotate: 0, scale: 0.84, autoAlpha: 1 },
} satisfies Record<string, JourneyPose>;

export const journeyCompanions: JourneyCompanionConfig[] = [
  {
    id: "plastic",
    type: "bottle",
    group: "plastic",
    showOnMobile: true,
    width: "w-[36px] sm:w-[44px] lg:w-[52px]",
    mixed: { x: 10, y: -10, rotate: -14, scale: 1, autoAlpha: 0 },
    sorted: { x: 22, y: -26, rotate: -4, scale: 1, autoAlpha: 1 },
    later: { x: 26, y: -28, rotate: -4, scale: 0.72, autoAlpha: 0 },
    mixedMobile: { x: 16, y: -12, rotate: -10, scale: 0.86, autoAlpha: 0 },
    sortedMobile: { x: 22, y: -26, rotate: -2, scale: 0.86, autoAlpha: 1 },
    laterMobile: { x: 24, y: -28, rotate: -2, scale: 0.6, autoAlpha: 0 },
  },
  {
    id: "paper",
    type: "paper",
    group: "paper",
    showOnMobile: true,
    width: "w-[52px] sm:w-[62px] lg:w-[72px]",
    mixed: { x: -4, y: -8, rotate: 18, scale: 0.96, autoAlpha: 0 },
    sorted: { x: 18, y: -8, rotate: -8, scale: 0.96, autoAlpha: 1 },
    later: { x: 22, y: -6, rotate: -8, scale: 0.7, autoAlpha: 0 },
    mixedMobile: { x: -12, y: -10, rotate: 14, scale: 0.8, autoAlpha: 0 },
    sortedMobile: { x: 20, y: -8, rotate: -6, scale: 0.8, autoAlpha: 1 },
    laterMobile: { x: 24, y: -6, rotate: -6, scale: 0.56, autoAlpha: 0 },
  },
  {
    id: "metal",
    type: "can",
    group: "metal",
    showOnMobile: true,
    width: "w-[28px] sm:w-[34px] lg:w-[40px]",
    mixed: { x: 8, y: -20, rotate: 22, scale: 0.94, autoAlpha: 0 },
    sorted: { x: 20, y: 4, rotate: 6, scale: 0.94, autoAlpha: 1 },
    later: { x: 24, y: 6, rotate: 6, scale: 0.68, autoAlpha: 0 },
    mixedMobile: { x: 12, y: -22, rotate: 16, scale: 0.82, autoAlpha: 0 },
    sortedMobile: { x: 22, y: 2, rotate: 4, scale: 0.82, autoAlpha: 1 },
    laterMobile: { x: 26, y: 4, rotate: 4, scale: 0.54, autoAlpha: 0 },
  },
  {
    id: "ewaste",
    type: "device",
    group: "ewaste",
    showOnMobile: false,
    width: "w-[48px] lg:w-[58px]",
    mixed: { x: -2, y: -22, rotate: -8, scale: 0.9, autoAlpha: 0 },
    sorted: { x: 26, y: -16, rotate: 2, scale: 0.9, autoAlpha: 1 },
    later: { x: 30, y: -16, rotate: 2, scale: 0.64, autoAlpha: 0 },
  },
];

export const journeyStack: JourneyStackConfig[] = [
  {
    id: "stack-1",
    showOnMobile: true,
    width: "w-[58px] sm:w-[70px] lg:w-[82px]",
    hidden: { x: -18, y: 2, rotate: -12, scale: 0.7, autoAlpha: 0 },
    scattered: { x: -18, y: 2, rotate: -12, scale: 0.86, autoAlpha: 1 },
    stacked: { x: -8, y: 2, rotate: -4, scale: 0.96, autoAlpha: 1 },
    loaded: { x: 4, y: 10, rotate: -2, scale: 0.72, autoAlpha: 0.9 },
    hiddenMobile: { x: -16, y: 2, rotate: -8, scale: 0.6, autoAlpha: 0 },
    scatteredMobile: { x: -16, y: 2, rotate: -8, scale: 0.76, autoAlpha: 1 },
    stackedMobile: { x: -7, y: 2, rotate: -3, scale: 0.86, autoAlpha: 1 },
    loadedMobile: { x: 2, y: 12, rotate: -1, scale: 0.62, autoAlpha: 0.85 },
  },
  {
    id: "stack-2",
    showOnMobile: true,
    width: "w-[56px] sm:w-[66px] lg:w-[78px]",
    hidden: { x: 16, y: 0, rotate: 14, scale: 0.66, autoAlpha: 0 },
    scattered: { x: 16, y: 0, rotate: 14, scale: 0.84, autoAlpha: 1 },
    stacked: { x: 8, y: 3, rotate: 4, scale: 0.94, autoAlpha: 1 },
    loaded: { x: 14, y: 11, rotate: 2, scale: 0.7, autoAlpha: 0.9 },
    hiddenMobile: { x: 14, y: 0, rotate: 10, scale: 0.58, autoAlpha: 0 },
    scatteredMobile: { x: 14, y: 0, rotate: 10, scale: 0.74, autoAlpha: 1 },
    stackedMobile: { x: 7, y: 3, rotate: 3, scale: 0.84, autoAlpha: 1 },
    loadedMobile: { x: 12, y: 13, rotate: 2, scale: 0.6, autoAlpha: 0.85 },
  },
  {
    id: "stack-3",
    showOnMobile: true,
    width: "w-[54px] sm:w-[64px] lg:w-[74px]",
    hidden: { x: -8, y: 18, rotate: 8, scale: 0.62, autoAlpha: 0 },
    scattered: { x: -8, y: 18, rotate: 8, scale: 0.82, autoAlpha: 1 },
    stacked: { x: 0, y: 12, rotate: 2, scale: 0.98, autoAlpha: 1 },
    loaded: { x: 10, y: 18, rotate: 1, scale: 0.68, autoAlpha: 0.85 },
    hiddenMobile: { x: -6, y: 16, rotate: 6, scale: 0.54, autoAlpha: 0 },
    scatteredMobile: { x: -6, y: 16, rotate: 6, scale: 0.72, autoAlpha: 1 },
    stackedMobile: { x: 0, y: 11, rotate: 2, scale: 0.86, autoAlpha: 1 },
    loadedMobile: { x: 8, y: 20, rotate: 1, scale: 0.58, autoAlpha: 0.8 },
  },
  {
    id: "stack-4",
    showOnMobile: false,
    width: "w-[64px] lg:w-[80px]",
    hidden: { x: 20, y: 16, rotate: -14, scale: 0.58, autoAlpha: 0 },
    scattered: { x: 20, y: 16, rotate: -14, scale: 0.78, autoAlpha: 1 },
    stacked: { x: -8, y: 11, rotate: -3, scale: 0.92, autoAlpha: 1 },
    loaded: { x: 4, y: 17, rotate: -2, scale: 0.66, autoAlpha: 0.8 },
  },
  {
    id: "stack-5",
    showOnMobile: false,
    width: "w-[50px] lg:w-[64px]",
    hidden: { x: -22, y: 14, rotate: 16, scale: 0.54, autoAlpha: 0 },
    scattered: { x: -22, y: 14, rotate: 16, scale: 0.74, autoAlpha: 1 },
    stacked: { x: 8, y: 12, rotate: 5, scale: 0.88, autoAlpha: 1 },
    loaded: { x: 16, y: 18, rotate: 3, scale: 0.62, autoAlpha: 0.75 },
  },
  {
    id: "stack-6",
    showOnMobile: false,
    width: "w-[58px] lg:w-[70px]",
    hidden: { x: 4, y: -6, rotate: -8, scale: 0.5, autoAlpha: 0 },
    scattered: { x: 4, y: -6, rotate: -8, scale: 0.72, autoAlpha: 1 },
    stacked: { x: 0, y: 0, rotate: 0, scale: 0.9, autoAlpha: 1 },
    loaded: { x: 10, y: 8, rotate: 0, scale: 0.64, autoAlpha: 0.7 },
  },
];

export const journeyNodes = [
  { id: "home", label: "HOME", x: -34, y: -38, mobileX: -22, mobileY: -40 },
  { id: "collect", label: "COLLECTION", x: -16, y: 12, mobileX: -2, mobileY: 6 },
  { id: "sort", label: "SORTING", x: 8, y: -28, mobileX: 10, mobileY: -26 },
  { id: "hub", label: "HUB", x: 4, y: 24, mobileX: 4, mobileY: 22 },
  { id: "recycler", label: "RECYCLER", x: 32, y: 38, mobileX: 24, mobileY: 40 },
] as const;

export const companionLabels = [
  { id: "plastic", label: "PLASTIC", x: 22, y: -34, mobileX: 22, mobileY: -34 },
  { id: "paper", label: "PAPER", x: 18, y: 4, mobileX: 20, mobileY: 2 },
  { id: "metal", label: "METAL", x: 20, y: 12, mobileX: 22, mobileY: 10 },
  { id: "ewaste", label: "E-WASTE", x: 26, y: -8, mobileX: 26, mobileY: -10 },
] as const;

export function getCompanionPose(
  object: JourneyCompanionConfig,
  phase: "mixed" | "sorted" | "later",
  isMobile: boolean,
): JourneyPose {
  if (isMobile) {
    if (phase === "mixed") return object.mixedMobile ?? object.mixed;
    if (phase === "sorted") return object.sortedMobile ?? object.sorted;
    return object.laterMobile ?? object.later;
  }
  if (phase === "mixed") return object.mixed;
  if (phase === "sorted") return object.sorted;
  return object.later;
}

export function getStackPose(
  object: JourneyStackConfig,
  phase: "hidden" | "scattered" | "stacked" | "loaded",
  isMobile: boolean,
): JourneyPose {
  if (isMobile) {
    if (phase === "hidden") return object.hiddenMobile ?? object.hidden;
    if (phase === "scattered") return object.scatteredMobile ?? object.scattered;
    if (phase === "stacked") return object.stackedMobile ?? object.stacked;
    return object.loadedMobile ?? object.loaded;
  }
  if (phase === "hidden") return object.hidden;
  if (phase === "scattered") return object.scattered;
  if (phase === "stacked") return object.stacked;
  return object.loaded;
}

export function getHeroPose(
  phase: keyof typeof heroBoxPoses,
  isMobile: boolean,
): JourneyPose {
  return isMobile ? heroBoxPosesMobile[phase] : heroBoxPoses[phase];
}

export function getTruckPose(
  phase: keyof typeof truckPoses,
  isMobile: boolean,
): JourneyPose {
  return isMobile ? truckPosesMobile[phase] : truckPoses[phase];
}

export function getMarkPose(
  mark: JourneyMarkConfig,
  isMobile: boolean,
): JourneyPose {
  return isMobile ? mark.mobile : mark.desktop;
}
