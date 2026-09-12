import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  companionLabels,
  getCompanionPose,
  getHeroPose,
  getMarkPose,
  getStackPose,
  getTruckPose,
  journeyCompanions,
  journeyMarks,
  journeyNodes,
  journeyStack,
  type JourneyPose,
} from "@/data/journeyStages";

function registerScrollTrigger() {
  if (typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
}

type InitOptions = {
  reducedMotion: boolean;
};

function poseToPixels(pose: JourneyPose, width: number, height: number) {
  return {
    x: (pose.x / 100) * width,
    y: (pose.y / 100) * height,
    rotate: pose.rotate,
    scale: pose.scale,
    autoAlpha: pose.autoAlpha ?? 1,
  };
}

function applyPose(
  node: HTMLElement | SVGElement,
  pose: JourneyPose,
  width: number,
  height: number,
) {
  const pixels = poseToPixels(pose, width, height);
  gsap.set(node, {
    xPercent: -50,
    yPercent: -50,
    x: pixels.x,
    y: pixels.y,
    rotate: pixels.rotate,
    scale: pixels.scale,
    autoAlpha: pixels.autoAlpha,
  });
}

function tweenPose(
  timeline: gsap.core.Timeline,
  node: Element,
  pose: JourneyPose,
  field: HTMLElement,
  duration: number,
  position: number,
  ease = "power1.inOut",
) {
  timeline.to(
    node,
    {
      xPercent: -50,
      yPercent: -50,
      x: () => (pose.x / 100) * field.clientWidth,
      y: () => (pose.y / 100) * field.clientHeight,
      rotate: pose.rotate,
      scale: pose.scale,
      autoAlpha: pose.autoAlpha ?? 1,
      duration,
      ease,
    },
    position,
  );
}

function bindSecondaryParallax(stage: HTMLElement, inners: HTMLElement[]) {
  const pointerQuery = window.matchMedia("(pointer: fine)");
  const mouse = { x: 0, y: 0 };
  const current = { x: 0, y: 0 };

  const onMove = (event: MouseEvent) => {
    if (!pointerQuery.matches) return;
    const bounds = stage.getBoundingClientRect();
    mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    mouse.y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
  };

  const tick = () => {
    const targetX = pointerQuery.matches ? mouse.x : 0;
    const targetY = pointerQuery.matches ? mouse.y : 0;
    current.x += (targetX - current.x) * 0.05;
    current.y += (targetY - current.y) * 0.05;

    inners.forEach((inner, index) => {
      const depth = 0.35 + (index % 4) * 0.12;
      inner.style.transform = `translate3d(${current.x * depth * 6}px, ${current.y * depth * 4}px, 0)`;
    });
  };

  stage.addEventListener("mousemove", onMove, { passive: true });
  gsap.ticker.add(tick);

  return () => {
    stage.removeEventListener("mousemove", onMove);
    gsap.ticker.remove(tick);
  };
}

function preparePaths(root: HTMLElement) {
  const paths = Array.from(
    root.querySelectorAll<SVGPathElement>("[data-journey-path], [data-journey-path-accent]"),
  );

  paths.forEach((path) => {
    const length = path.getTotalLength();
    path.dataset.length = String(length);
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });
  });

  return paths;
}

export function initReverseLogistics(
  root: HTMLElement,
  { reducedMotion }: InitOptions,
) {
  registerScrollTrigger();

  if (
    reducedMotion ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return () => {};
  }

  const media = gsap.matchMedia();

  media.add(
    {
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)",
    },
    (context) => {
      const isMobile = Boolean(context.conditions?.isMobile);
      const pinWrap = root.querySelector<HTMLElement>("[data-journey-pin]");
      const field = root.querySelector<HTMLElement>("[data-journey-field]");
      const visual = root.querySelector<HTMLElement>("[data-journey-visual]");
      const hero = root.querySelector<HTMLElement>('[data-role="hero"]');
      const truck = root.querySelector<HTMLElement>("[data-journey-truck]");
      const finale = root.querySelector<HTMLElement>("[data-journey-finale]");
      const nextLife = root.querySelector<HTMLElement>("[data-journey-next-life]");
      const stages = Array.from(
        root.querySelectorAll<HTMLElement>("[data-journey-stage]"),
      );
      const marks = Array.from(
        root.querySelectorAll<HTMLElement>("[data-journey-mark]"),
      );
      const nodes = Array.from(
        root.querySelectorAll<HTMLElement>("[data-journey-node]"),
      );
      const sortLabels = Array.from(
        root.querySelectorAll<HTMLElement>("[data-journey-sort-label]"),
      );
      const companions = Array.from(
        root.querySelectorAll<HTMLElement>('[data-role="companion"]'),
      );
      const stacks = Array.from(
        root.querySelectorAll<HTMLElement>('[data-role="stack"]'),
      );
      const parallaxNodes = Array.from(
        root.querySelectorAll<HTMLElement>("[data-journey-parallax]"),
      );

      if (!pinWrap || !field || !visual || !hero || !truck || !finale) return;

      const width = () => field.clientWidth;
      const height = () => field.clientHeight;

      applyPose(hero, getHeroPose("enter", isMobile), width(), height());
      applyPose(truck, getTruckPose("hidden", isMobile), width(), height());

      marks.forEach((node) => {
        const config = journeyMarks.find((item) => item.id === node.dataset.id);
        if (!config) return;
        applyPose(node, getMarkPose(config, isMobile), width(), height());
      });

      companions.forEach((node) => {
        const config = journeyCompanions.find((item) => item.id === node.dataset.id);
        if (!config || (isMobile && !config.showOnMobile)) {
          gsap.set(node, { autoAlpha: 0 });
          return;
        }
        applyPose(node, getCompanionPose(config, "mixed", isMobile), width(), height());
      });

      stacks.forEach((node) => {
        const config = journeyStack.find((item) => item.id === node.dataset.id);
        if (!config || (isMobile && !config.showOnMobile)) {
          gsap.set(node, { autoAlpha: 0 });
          return;
        }
        applyPose(node, getStackPose(config, "hidden", isMobile), width(), height());
      });

      nodes.forEach((node) => {
        const config = journeyNodes.find((item) => item.id === node.dataset.node);
        if (!config) return;
        const x = isMobile ? config.mobileX : config.x;
        const y = isMobile ? config.mobileY : config.y;
        gsap.set(node, {
          xPercent: -50,
          yPercent: -50,
          x: (x / 100) * width(),
          y: (y / 100) * height(),
          autoAlpha: config.id === "home" ? 1 : 0,
        });
      });

      sortLabels.forEach((node) => {
        const config = companionLabels.find((item) => item.id === node.dataset.group);
        if (!config) return;
        const hideOnMobile = config.id === "ewaste" && isMobile;
        gsap.set(node, {
          xPercent: -50,
          yPercent: -50,
          x: ((isMobile ? config.mobileX : config.x) / 100) * width(),
          y: ((isMobile ? config.mobileY : config.y) / 100) * height(),
          autoAlpha: 0,
          display: hideOnMobile ? "none" : "block",
        });
      });

      gsap.set(stages, { autoAlpha: 0, y: 18 });
      if (stages[0]) gsap.set(stages[0], { autoAlpha: 1, y: 0 });
      gsap.set(finale, { autoAlpha: 0, y: 16 });
      if (nextLife) {
        applyPose(
          nextLife,
          isMobile
            ? { x: 20, y: 38, rotate: 0, scale: 1, autoAlpha: 0 }
            : { x: 32, y: 40, rotate: 0, scale: 1, autoAlpha: 0 },
          width(),
          height(),
        );
      }

      const paths = preparePaths(root);

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: pinWrap,
          start: "top top",
          end: isMobile ? "+=400%" : "+=520%",
          pin: true,
          pinSpacing: true,
          scrub: isMobile ? 2.4 : 3.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const showStage = (index: number, at: number) => {
        stages.forEach((stage, stageIndex) => {
          if (stageIndex === index) {
            timeline.to(
              stage,
              { autoAlpha: 1, y: 0, duration: 0.28, ease: "power2.out" },
              at,
            );
          } else if (stageIndex === index - 1) {
            timeline.to(
              stage,
              { autoAlpha: 0, y: -14, duration: 0.24, ease: "power1.out" },
              at,
            );
          }
        });
      };

      // 0% — COLLECT. Material arrives from the previous section.
      tweenPose(timeline, hero, getHeroPose("collect", isMobile), field, 0.55, 0, "power2.out");
      tweenPose(timeline, truck, getTruckPose("collect", isMobile), field, 0.55, 0.22, "power2.out");
      tweenPose(timeline, hero, getHeroPose("pickup", isMobile), field, 0.55, 0.45, "power1.inOut");

      timeline.to(
        nodes.find((node) => node.dataset.node === "collect") ?? [],
        { autoAlpha: 1, duration: 0.2, ease: "power1.out" },
        0.5,
      );

      // 20% — SORT
      showStage(1, 0.95);
      tweenPose(timeline, hero, getHeroPose("sortMixed", isMobile), field, 0.55, 1.0, "power1.inOut");

      const sortBay = marks.find((node) => node.dataset.id === "sort-bay");
      if (sortBay) {
        const pose = getMarkPose(
          journeyMarks.find((item) => item.id === "sort-bay")!,
          isMobile,
        );
        tweenPose(
          timeline,
          sortBay,
          { ...pose, autoAlpha: 1 },
          field,
          0.4,
          1.0,
          "power2.out",
        );
      }

      journeyCompanions.forEach((config, index) => {
        if (isMobile && !config.showOnMobile) return;
        const node = companions.find((item) => item.dataset.id === config.id);
        if (!node) return;
        const mixed = getCompanionPose(config, "mixed", isMobile);
        tweenPose(
          timeline,
          node,
          { ...mixed, autoAlpha: 1 },
          field,
          0.35,
          1.05 + index * 0.04,
          "power2.out",
        );
      });

      tweenPose(timeline, hero, getHeroPose("sortGrouped", isMobile), field, 0.55, 1.45, "power1.inOut");

      journeyCompanions.forEach((config, index) => {
        if (isMobile && !config.showOnMobile) return;
        const node = companions.find((item) => item.dataset.id === config.id);
        if (!node) return;
        tweenPose(
          timeline,
          node,
          getCompanionPose(config, "sorted", isMobile),
          field,
          0.6,
          1.5 + index * 0.04,
          "power1.inOut",
        );
      });

      sortLabels.forEach((node, index) => {
        if (isMobile && node.dataset.group === "ewaste") return;
        const config = companionLabels.find((item) => item.id === node.dataset.group);
        if (!config) return;
        timeline.fromTo(
          node,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            xPercent: -50,
            yPercent: -50,
            x: () => ((isMobile ? config.mobileX : config.x) / 100) * field.clientWidth,
            y: () => ((isMobile ? config.mobileY : config.y) / 100) * field.clientHeight,
            duration: 0.28,
            ease: "power2.out",
          },
          1.85 + index * 0.04,
        );
      });

      timeline.to(
        nodes.find((node) => node.dataset.node === "sort") ?? [],
        { autoAlpha: 1, duration: 0.2, ease: "power1.out" },
        1.4,
      );

      // 45% — AGGREGATE
      showStage(2, 2.2);

      sortLabels.forEach((node) => {
        timeline.to(node, { autoAlpha: 0, duration: 0.22, ease: "power1.out" }, 2.25);
      });

      journeyCompanions.forEach((config, index) => {
        if (isMobile && !config.showOnMobile) return;
        const node = companions.find((item) => item.dataset.id === config.id);
        if (!node) return;
        tweenPose(
          timeline,
          node,
          getCompanionPose(config, "later", isMobile),
          field,
          0.4,
          2.28 + index * 0.03,
          "power1.inOut",
        );
      });

      if (sortBay) {
        const pose = getMarkPose(
          journeyMarks.find((item) => item.id === "sort-bay")!,
          isMobile,
        );
        tweenPose(
          timeline,
          sortBay,
          { ...pose, autoAlpha: 0.18, scale: pose.scale * 0.96 },
          field,
          0.35,
          2.3,
          "power1.out",
        );
      }

      const aggregatePad = marks.find((node) => node.dataset.id === "aggregate-pad");
      if (aggregatePad) {
        const pose = getMarkPose(
          journeyMarks.find((item) => item.id === "aggregate-pad")!,
          isMobile,
        );
        tweenPose(
          timeline,
          aggregatePad,
          { ...pose, autoAlpha: 1, scale: pose.scale * 1.08 },
          field,
          0.45,
          2.28,
          "power2.out",
        );
      }

      tweenPose(timeline, hero, getHeroPose("aggregate", isMobile), field, 0.6, 2.35, "power1.inOut");
      tweenPose(timeline, truck, getTruckPose("wait", isMobile), field, 0.5, 2.4, "power1.inOut");

      journeyStack.forEach((config, index) => {
        if (isMobile && !config.showOnMobile) return;
        const node = stacks.find((item) => item.dataset.id === config.id);
        if (!node) return;
        tweenPose(
          timeline,
          node,
          getStackPose(config, "scattered", isMobile),
          field,
          0.4,
          2.35 + index * 0.05,
          "power2.out",
        );
        tweenPose(
          timeline,
          node,
          getStackPose(config, "stacked", isMobile),
          field,
          0.55,
          2.85 + index * 0.03,
          "power1.inOut",
        );
      });

      timeline.to(
        nodes.find((node) => node.dataset.node === "hub") ?? [],
        { autoAlpha: 1, duration: 0.2, ease: "power1.out" },
        2.7,
      );

      // 70% — MOVE
      showStage(3, 3.45);
      tweenPose(timeline, hero, getHeroPose("loaded", isMobile), field, 0.7, 3.5, "power1.inOut");
      tweenPose(timeline, truck, getTruckPose("travel", isMobile), field, 0.85, 3.55, "power1.inOut");

      journeyStack.forEach((config, index) => {
        if (isMobile && !config.showOnMobile) return;
        const node = stacks.find((item) => item.dataset.id === config.id);
        if (!node) return;
        tweenPose(
          timeline,
          node,
          getStackPose(config, "loaded", isMobile),
          field,
          0.65,
          3.52 + index * 0.02,
          "power1.inOut",
        );
      });

      const facility = marks.find((node) => node.dataset.id === "facility");
      if (facility) {
        const pose = getMarkPose(
          journeyMarks.find((item) => item.id === "facility")!,
          isMobile,
        );
        tweenPose(
          timeline,
          facility,
          { ...pose, autoAlpha: 0.85 },
          field,
          0.45,
          3.9,
          "power1.out",
        );
      }

      // 90% — RETURN
      showStage(4, 4.4);
      tweenPose(timeline, truck, getTruckPose("arrive", isMobile), field, 0.55, 4.45, "sine.inOut");
      tweenPose(timeline, hero, getHeroPose("arrive", isMobile), field, 0.65, 4.5, "power1.inOut");

      journeyStack.forEach((config, index) => {
        if (isMobile && !config.showOnMobile) return;
        const node = stacks.find((item) => item.dataset.id === config.id);
        if (!node) return;
        const loaded = getStackPose(config, "loaded", isMobile);
        tweenPose(
          timeline,
          node,
          { ...loaded, autoAlpha: 0, scale: loaded.scale * 0.86 },
          field,
          0.4,
          4.55 + index * 0.02,
          "power1.out",
        );
      });

      if (facility) {
        const pose = getMarkPose(
          journeyMarks.find((item) => item.id === "facility")!,
          isMobile,
        );
        tweenPose(
          timeline,
          facility,
          { ...pose, autoAlpha: 1, scale: pose.scale * 1.04 },
          field,
          0.4,
          4.55,
          "power2.out",
        );
      }

      timeline.to(
        nodes.find((node) => node.dataset.node === "recycler") ?? [],
        { autoAlpha: 1, duration: 0.22, ease: "power1.out" },
        4.5,
      );

      if (nextLife) {
        timeline.to(
          nextLife,
          { autoAlpha: 1, duration: 0.35, ease: "power2.out" },
          4.85,
        );
      }

      if (stages[4]) {
        timeline.to(
          stages[4],
          { autoAlpha: 0, y: -12, duration: 0.28, ease: "power1.out" },
          4.92,
        );
      }

      timeline.to(
        finale,
        { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
        4.95,
      );

      timeline.to(
        paths,
        {
          strokeDashoffset: 0,
          duration: 5.05,
          ease: "none",
        },
        0.08,
      );

      timeline.to({}, { duration: 0.35 }, 5.35);

      const clearParallax = bindSecondaryParallax(visual, parallaxNodes);
      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        clearParallax();
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
  );

  return () => {
    media.revert();
  };
}
