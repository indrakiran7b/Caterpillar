export type RecyclableType =
  | "bottle"
  | "cardboard"
  | "can"
  | "paper"
  | "device"
  | "container"
  | "jar";

export type RecyclableObjectConfig = {
  id: string;
  type: RecyclableType;
  label: string;
  depth: number;
  invert: boolean;
  mouseRotate: number;
  className: string;
  animation: {
    duration: number;
    delay: number;
    floatX: number;
    floatY: number;
    rotate: number;
  };
  scroll: {
    x: number;
    y: number;
    rotate: number;
  };
};

export const recyclableObjects: RecyclableObjectConfig[] = [
  {
    id: "bottle",
    type: "bottle",
    label: "Plastic bottle",
    depth: 0.85,
    invert: false,
    mouseRotate: 5,
    className:
      "top-[4%] right-[2%] w-[54px] md:top-[8%] md:right-[9%] md:w-[76px] lg:top-[7%] lg:right-[15%] lg:w-[94px] xl:w-[104px]",
    animation: {
      duration: 5.4,
      delay: 0.15,
      floatX: 7,
      floatY: 14,
      rotate: 3.2,
    },
    scroll: { x: 90, y: 160, rotate: 12 },
  },
  {
    id: "cardboard",
    type: "cardboard",
    label: "Cardboard box",
    depth: 1.25,
    invert: false,
    mouseRotate: 3,
    className:
      "bottom-[2%] right-[6%] w-[72px] md:top-[38%] md:right-[4%] md:bottom-auto md:w-[104px] lg:top-[34%] lg:right-[5%] lg:w-[124px] xl:right-[7%] xl:w-[136px]",
    animation: {
      duration: 7.2,
      delay: 0.45,
      floatX: 10,
      floatY: 18,
      rotate: 2,
    },
    scroll: { x: 140, y: 200, rotate: 8 },
  },
  {
    id: "can",
    type: "can",
    label: "Aluminium can",
    depth: 1.05,
    invert: true,
    mouseRotate: 8,
    className:
      "top-[28%] left-[3%] w-[40px] md:top-[20%] md:left-auto md:right-[28%] md:w-[54px] lg:top-[21%] lg:right-[32%] lg:w-[62px] xl:right-[34%]",
    animation: {
      duration: 4.2,
      delay: 0.05,
      floatX: 8,
      floatY: 12,
      rotate: 5.5,
    },
    scroll: { x: -70, y: 180, rotate: -16 },
  },
  {
    id: "paper",
    type: "paper",
    label: "Paper sheet",
    depth: 0.55,
    invert: false,
    mouseRotate: 7,
    className:
      "hidden md:block md:bottom-[10%] md:left-[34%] md:w-[92px] lg:bottom-[11%] lg:left-[38%] lg:w-[108px]",
    animation: {
      duration: 6.1,
      delay: 0.8,
      floatX: 12,
      floatY: 10,
      rotate: 4,
    },
    scroll: { x: -120, y: 140, rotate: -10 },
  },
  {
    id: "device",
    type: "device",
    label: "Small electronic device",
    depth: 1.45,
    invert: false,
    mouseRotate: 2.5,
    className:
      "bottom-[8%] left-[22%] w-[66px] md:bottom-[13%] md:left-auto md:right-[18%] md:w-[90px] lg:bottom-[12%] lg:right-[18%] lg:w-[102px]",
    animation: {
      duration: 8.4,
      delay: 0.35,
      floatX: 5,
      floatY: 9,
      rotate: 1.6,
    },
    scroll: { x: 60, y: 220, rotate: 6 },
  },
  {
    id: "container",
    type: "container",
    label: "Plastic container",
    depth: 0.7,
    invert: true,
    mouseRotate: 4,
    className:
      "hidden md:block md:top-[12%] md:left-[46%] md:w-[78px] lg:top-[11%] lg:left-[48%] lg:w-[88px]",
    animation: {
      duration: 6.6,
      delay: 0.55,
      floatX: 6,
      floatY: 13,
      rotate: 2.8,
    },
    scroll: { x: -100, y: 120, rotate: -8 },
  },
  {
    id: "jar",
    type: "jar",
    label: "Glass jar",
    depth: 0.35,
    invert: true,
    mouseRotate: 4.5,
    className:
      "hidden lg:block lg:bottom-[30%] lg:right-[41%] lg:w-[66px] xl:right-[43%] xl:w-[72px]",
    animation: {
      duration: 5.8,
      delay: 1.05,
      floatX: 5,
      floatY: 11,
      rotate: 3.4,
    },
    scroll: { x: 40, y: 170, rotate: 10 },
  },
];
