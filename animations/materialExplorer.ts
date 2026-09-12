import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getMaterial, type MaterialId } from "@/data/materials";

function registerScrollTrigger() {
  if (typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
}

type InitOptions = {
  reducedMotion: boolean;
};

let personalityTween: gsap.core.Tween | gsap.core.Timeline | null = null;

function killPersonality() {
  personalityTween?.kill();
  personalityTween = null;
}

export function startMaterialPersonality(
  scene: HTMLElement,
  personality: ReturnType<typeof getMaterial>["personality"],
  reducedMotion: boolean,
) {
  killPersonality();
  if (reducedMotion) return;

  const pieces = Array.from(
    scene.querySelectorAll<HTMLElement>("[data-material-piece]"),
  ).filter((piece) => piece.offsetParent !== null);
  if (!pieces.length) return;

  const motion: Record<
    ReturnType<typeof getMaterial>["personality"],
    { y: number; rotate: number; duration: number }
  > = {
    float: { y: -11, rotate: 2.4, duration: 2.5 },
    grounded: { y: -4, rotate: 0.6, duration: 3.4 },
    drift: { y: -7, rotate: 3.2, duration: 3.1 },
    heavy: { y: -3, rotate: 0.4, duration: 3.8 },
    precise: { y: -3, rotate: 0.3, duration: 2.8 },
  };

  const preset = motion[personality];

  personalityTween = gsap.to(pieces, {
    y: preset.y,
    rotate: `+=${preset.rotate}`,
    duration: preset.duration,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    stagger: { each: 0.18, from: "center" },
  });
}

export function playMaterialTransition(
  root: HTMLElement,
  nextId: MaterialId,
  reducedMotion: boolean,
) {
  const scenes = Array.from(
    root.querySelectorAll<HTMLElement>("[data-material-scene]"),
  );
  const current = scenes.find(
    (scene) => scene.dataset.active === "true" && scene.dataset.materialScene !== nextId,
  );
  const next = scenes.find((scene) => scene.dataset.materialScene === nextId);
  const info = root.querySelector<HTMLElement>("[data-material-info]");
  const path = root.querySelector<HTMLElement>("[data-material-path]");

  if (!next) return;

  scenes.forEach((scene) => {
    if (scene !== current && scene !== next) {
      gsap.set(scene, { autoAlpha: 0, x: 0, y: 0, rotate: 0, scale: 1 });
    }
  });

  if (info) gsap.set(info, { autoAlpha: 0, y: 12 });
  if (path) gsap.set(path, { autoAlpha: 0, y: 8 });

  const nextMaterial = getMaterial(nextId);
  const prefersReduce =
    reducedMotion ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  killPersonality();

  if (prefersReduce) {
    scenes.forEach((scene) => {
      const active = scene === next;
      scene.dataset.active = active ? "true" : "false";
      gsap.set(scene, { autoAlpha: active ? 1 : 0, x: 0, y: 0, rotate: 0, scale: 1 });
    });
    gsap.set([info, path], { autoAlpha: 1, y: 0 });
    return;
  }

  const timeline = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    onComplete: () => {
      startMaterialPersonality(next, nextMaterial.personality, false);
    },
  });

  if (current) {
    const outgoing = getMaterial(current.dataset.materialScene as MaterialId);
    current.dataset.active = "false";
    timeline.to(
      current,
      {
        x: outgoing.exitTo.x,
        y: outgoing.exitTo.y,
        rotate: outgoing.exitTo.rotate,
        scale: 0.86,
        autoAlpha: 0,
        duration: 0.46,
        ease: "power2.in",
      },
      0,
    );
  }

  next.dataset.active = "true";
  timeline.fromTo(
    next,
    {
      x: nextMaterial.enterFrom.x,
      y: nextMaterial.enterFrom.y,
      rotate: nextMaterial.enterFrom.rotate,
      scale: 0.88,
      autoAlpha: 0,
    },
    {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      autoAlpha: 1,
      duration: 0.62,
      ease: "power2.out",
    },
    current ? 0.12 : 0,
  );

  if (info) {
    timeline.fromTo(
      info,
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
      0.22,
    );
  }

  if (path) {
    timeline.fromTo(
      path,
      { autoAlpha: 0, y: 8 },
      { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" },
      0.28,
    );
  }

  return timeline;
}

export function moveSelectorIndicator(
  list: HTMLElement,
  activeButton: HTMLElement | null,
  reducedMotion: boolean,
) {
  const indicator = list.querySelector<HTMLElement>("[data-material-indicator]");
  if (!indicator || !activeButton) return;

  const horizontal = window.matchMedia("(max-width: 767px)").matches;
  const base = horizontal ? 48 : 36;

  const vars = horizontal
    ? {
        x: activeButton.offsetLeft,
        y: 0,
        scaleX: activeButton.offsetWidth / base,
        scaleY: 1,
      }
    : {
        x: 0,
        y: activeButton.offsetTop,
        scaleX: 1,
        scaleY: activeButton.offsetHeight / base,
      };

  if (
    reducedMotion ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    gsap.set(indicator, vars);
    return;
  }

  gsap.to(indicator, {
    ...vars,
    duration: 0.42,
    ease: "power2.out",
  });
}

export function initMaterialExplorer(
  root: HTMLElement,
  { reducedMotion }: InitOptions,
) {
  registerScrollTrigger();

  const intro = root.querySelectorAll<HTMLElement>(
    "[data-explorer-intro] > *",
  );
  const selector = root.querySelector<HTMLElement>("[data-material-selector]");
  const display = root.querySelector<HTMLElement>("[data-material-display]");
  const info = root.querySelector<HTMLElement>("[data-material-info]");
  const defaultScene = root.querySelector<HTMLElement>(
    '[data-material-scene="cardboard"]',
  );
  const scenes = root.querySelectorAll<HTMLElement>("[data-material-scene]");

  scenes.forEach((scene) => {
    const isDefault = scene.dataset.materialScene === "cardboard";
    scene.dataset.active = isDefault ? "true" : "false";
    gsap.set(scene, { autoAlpha: isDefault ? 1 : 0, x: 0, y: 0, rotate: 0, scale: 1 });
  });

  if (
    reducedMotion ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    gsap.set([intro, selector, display, info], { clearProps: "all" });
    if (defaultScene) {
      defaultScene.dataset.active = "true";
    }
    return () => {
      killPersonality();
    };
  }

  gsap.set(intro, { autoAlpha: 0, y: 22 });
  gsap.set(selector, { autoAlpha: 0, y: 18 });
  gsap.set(display, { autoAlpha: 0, y: 28, scale: 0.96 });
  gsap.set(info, { autoAlpha: 0, y: 16 });

  if (defaultScene) {
    gsap.set(defaultScene, {
      autoAlpha: 1,
      x: 40,
      y: 28,
      scale: 0.92,
    });
    defaultScene.dataset.active = "true";
  }

  const context = gsap.context(() => {
    const timeline = gsap.timeline({
      defaults: { ease: "power2.out" },
      scrollTrigger: {
        trigger: root,
        start: "top 74%",
        once: true,
      },
    });

    timeline.to(
      intro,
      { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 },
      0,
    );
    timeline.to(
      selector,
      { autoAlpha: 1, y: 0, duration: 0.55 },
      0.18,
    );
    timeline.to(
      display,
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.75 },
      0.12,
    );

    if (defaultScene) {
      timeline.to(
        defaultScene,
        { x: 0, y: 0, scale: 1, duration: 0.8, ease: "power2.out" },
        0.16,
      );
    }

    timeline.to(info, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.32);

    timeline.add(() => {
      if (defaultScene) {
        startMaterialPersonality(defaultScene, "grounded", false);
      }
    });
  }, root);

  return () => {
    killPersonality();
    context.revert();
  };
}
