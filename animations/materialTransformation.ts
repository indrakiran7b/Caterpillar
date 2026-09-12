import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  getMaterialPose,
  materialLabels,
  materialObjects,
  type MaterialPose,
} from "@/data/materialObjects";

function registerScrollTrigger() {
  if (typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
}

type InitOptions = {
  reducedMotion: boolean;
};

function poseToPixels(pose: MaterialPose, width: number, height: number) {
  return {
    x: (pose.x / 100) * width,
    y: (pose.y / 100) * height,
    rotate: pose.rotate,
    scale: pose.scale,
  };
}

function bindSecondaryParallax(
  stage: HTMLElement,
  inners: HTMLElement[],
  depths: number[],
) {
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
    current.x += (targetX - current.x) * 0.06;
    current.y += (targetY - current.y) * 0.06;

    inners.forEach((inner, index) => {
      const depth = depths[index] ?? 0.5;
      inner.style.transform = `translate3d(${current.x * depth * 10}px, ${current.y * depth * 7}px, 0)`;
    });
  };

  stage.addEventListener("mousemove", onMove, { passive: true });
  gsap.ticker.add(tick);

  return () => {
    stage.removeEventListener("mousemove", onMove);
    gsap.ticker.remove(tick);
  };
}

export function initMaterialTransformation(
  root: HTMLElement,
  { reducedMotion }: InitOptions,
) {
  registerScrollTrigger();
  ScrollTrigger.normalizeScroll(true);
  const media = gsap.matchMedia();

  media.add(
    {
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)",
    },
    (context) => {
      const isMobile = Boolean(context.conditions?.isMobile);
      const stage = root.querySelector<HTMLElement>("[data-material-stage]");
      const field = root.querySelector<HTMLElement>("[data-material-field]");
      const pinWrap = root.querySelector<HTMLElement>("[data-material-pin]");
      const intro = root.querySelector<HTMLElement>("[data-material-intro]");
      const finale = root.querySelector<HTMLElement>("[data-material-finale]");
      const captions = Array.from(
        root.querySelectorAll<HTMLElement>("[data-material-caption]"),
      );
      const labelNodes = Array.from(
        root.querySelectorAll<HTMLElement>("[data-material-label]"),
      );
      const objectNodes = Array.from(
        root.querySelectorAll<HTMLElement>("[data-material-object]"),
      );
      const parallaxNodes = Array.from(
        root.querySelectorAll<HTMLElement>("[data-material-parallax]"),
      );

      if (!stage || !field || !pinWrap) return;

      const visibleObjects = materialObjects.filter(
        (object) => !isMobile || object.showOnMobile,
      );

      const applyPose = (
        node: HTMLElement,
        pose: MaterialPose,
        extra?: gsap.TweenVars,
      ) => {
        const pixels = poseToPixels(pose, field.clientWidth, field.clientHeight);
        gsap.set(node, {
          xPercent: -50,
          yPercent: -50,
          x: pixels.x,
          y: pixels.y,
          rotate: pixels.rotate,
          scale: pixels.scale,
          ...extra,
        });
      };

      const placeLabels = (visible: boolean) => {
        labelNodes.forEach((node) => {
          const id = node.dataset.group as (typeof materialLabels)[number]["id"];
          const label = materialLabels.find((item) => item.id === id);
          if (!label) return;
          const x = ((isMobile ? label.mobileX : label.x) / 100) * field.clientWidth;
          const y = ((isMobile ? label.mobileY : label.y) / 100) * field.clientHeight;
          gsap.set(node, {
            xPercent: -50,
            yPercent: -50,
            x,
            y,
            opacity: visible ? 1 : 0,
          });
        });
      };

      objectNodes.forEach((node) => {
        const config = visibleObjects.find((item) => item.id === node.dataset.id);
        if (!config) {
          gsap.set(node, { autoAlpha: 0 });
          return;
        }

        applyPose(
          node,
          getMaterialPose(
            config,
            reducedMotion ? "sorted" : "scattered",
            isMobile,
          ),
          { autoAlpha: 1 },
        );
      });

      if (reducedMotion) {
        gsap.set(intro, { clearProps: "all" });
        gsap.set(finale, { autoAlpha: 0 });
        gsap.set(captions, { autoAlpha: 0 });
        gsap.set(captions[captions.length - 1], { autoAlpha: 1 });
        placeLabels(true);
        return;
      }

      gsap.set(finale, { autoAlpha: 0, y: 20, scale: 0.985 });
      gsap.set(captions, { autoAlpha: 0, y: 12 });
      if (captions[0]) gsap.set(captions[0], { autoAlpha: 1, y: 0 });
      placeLabels(false);

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: pinWrap,
          start: "top top",
          end: isMobile ? "+=380%" : "+=560%",
          pin: true,
          pinSpacing: true,
          scrub: isMobile ? 2.4 : 3.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Hold the scattered state, then ease into sorted groups.
      timeline.to(captions[0], { autoAlpha: 0, y: -10, duration: 0.28 }, 0.7);
      timeline.to(captions[1], { autoAlpha: 1, y: 0, duration: 0.28 }, 0.7);

      visibleObjects.forEach((config, index) => {
        const node = objectNodes.find((item) => item.dataset.id === config.id);
        if (!node) return;
        const sorted = getMaterialPose(config, "sorted", isMobile);
        const pixels = () =>
          poseToPixels(sorted, field.clientWidth, field.clientHeight);

        timeline.to(
          node,
          {
            xPercent: -50,
            yPercent: -50,
            x: () => pixels().x,
            y: () => pixels().y,
            rotate: sorted.rotate,
            scale: sorted.scale,
            duration: 1.15,
            ease: "power1.inOut",
          },
          0.55 + index * 0.035,
        );
      });

      labelNodes.forEach((node, index) => {
        const id = node.dataset.group as (typeof materialLabels)[number]["id"];
        const label = materialLabels.find((item) => item.id === id);
        if (!label) return;

        timeline.fromTo(
          node,
          {
            autoAlpha: 0,
            y: () =>
              ((isMobile ? label.mobileY : label.y) / 100) * field.clientHeight + 10,
          },
          {
            autoAlpha: 1,
            xPercent: -50,
            yPercent: -50,
            x: () =>
              ((isMobile ? label.mobileX : label.x) / 100) * field.clientWidth,
            y: () =>
              ((isMobile ? label.mobileY : label.y) / 100) * field.clientHeight,
            duration: 0.35,
            ease: "power2.out",
          },
          1.45 + index * 0.04,
        );
      });

      // Hold the sorted composition, then gather into value.
      timeline.to(captions[1], { autoAlpha: 0, y: -10, duration: 0.28 }, 2.15);
      timeline.to(captions[2], { autoAlpha: 1, y: 0, duration: 0.28 }, 2.15);

      visibleObjects.forEach((config, index) => {
        const node = objectNodes.find((item) => item.dataset.id === config.id);
        if (!node) return;
        const aggregated = getMaterialPose(config, "aggregated", isMobile);
        const pixels = () =>
          poseToPixels(aggregated, field.clientWidth, field.clientHeight);

        timeline.to(
          node,
          {
            xPercent: -50,
            yPercent: -50,
            x: () => pixels().x,
            y: () => pixels().y,
            rotate: aggregated.rotate,
            scale: aggregated.scale,
            duration: 1.05,
            ease: "power1.inOut",
          },
          2.2 + index * 0.03,
        );
      });

      timeline.to(
        labelNodes,
        { autoAlpha: 0, y: "-=8", duration: 0.3, stagger: 0.02, ease: "power1.out" },
        2.85,
      );

      timeline.to(captions[2], { autoAlpha: 0, y: -10, duration: 0.28 }, 3.05);
      timeline.to(captions[3], { autoAlpha: 1, y: 0, duration: 0.28 }, 3.05);

      timeline.to(
        finale,
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: "power2.out" },
        3.15,
      );

      timeline.to({}, { duration: 0.45 }, 3.7);

      const depths = parallaxNodes.map((node) => {
        const object = visibleObjects.find(
          (item) => item.id === node.dataset.parallaxId,
        );
        return object?.depth ?? 0.5;
      });

      const clearParallax = bindSecondaryParallax(stage, parallaxNodes, depths);
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
    ScrollTrigger.normalizeScroll(false);
  };
}
