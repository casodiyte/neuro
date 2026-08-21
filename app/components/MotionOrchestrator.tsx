"use client";

import { useEffect } from "react";

const CARD_SELECTOR = [
  ".visual-card",
  ".phase-card",
  ".difference-list article",
  ".immersion-grid article",
  ".module-assessment",
  ".module-card",
  ".schedule-list article",
  ".cert-steps article",
  ".event-card",
  ".profile-quote",
  ".credential-grid > div",
  ".investment-card",
  ".admission-steps article",
].join(",");

const REVEAL_SELECTOR = [
  CARD_SELECTOR,
  ".hero-copy > :not(h1)",
  ".proof-strip > *",
  ".section-heading > *",
  ".visual-card",
  ".phase-card",
  ".difference-list article",
  ".mentor-teaser > *",
  ".final-cta > :not(.liquid-cluster)",
  ".page-hero > *",
  ".module-card",
  ".day-timeline article",
  ".inline-cta > *",
  ".immersion-grid article",
  ".schedule-list article",
  ".aftercare > *",
  ".cert-steps article",
  ".event-card > *",
  ".profile-grid > *",
  ".credential-grid > *",
  ".mentor-method > *",
  ".registration-hero > *",
  ".form-section > *",
  ".admission-steps article",
].join(",");

const TEXT_SELECTOR = [
  ".title-line",
  ".page-hero h1",
  ".section-heading h2",
  ".contrast-panel h2",
  ".mentor-teaser h2",
  ".final-cta h2",
  ".inline-cta h2",
  ".profile-copy h2",
  ".mentor-method h2",
  ".form-section h2",
].join(",");

function elementsWithin(scope: ParentNode, selector: string) {
  const matches = scope instanceof HTMLElement && scope.matches(selector) ? [scope] : [];
  return [...matches, ...Array.from(scope.querySelectorAll<HTMLElement>(selector))];
}

export function MotionOrchestrator() {
  useEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const hoverCleanups: Array<() => void> = [];
    root.classList.add("js-motion");

    const observer = prefersReducedMotion || !("IntersectionObserver" in window)
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            });
          },
          { rootMargin: "0px 0px -10%", threshold: 0.1 },
        );

    const preparePointerMotion = (element: HTMLElement) => {
      if (prefersReducedMotion || !hasFinePointer || element.dataset.motionHover === "ready") return;

      element.dataset.motionHover = "ready";
      let frame = 0;

      const handlePointerMove = (event: PointerEvent) => {
        const { clientX, clientY } = event;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const rect = element.getBoundingClientRect();
          const x = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
          const y = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));

          element.style.setProperty("--pointer-x", `${x * 100}%`);
          element.style.setProperty("--pointer-y", `${y * 100}%`);
          element.style.setProperty("--tilt-x", `${(0.5 - y) * 5}deg`);
          element.style.setProperty("--tilt-y", `${(x - 0.5) * 6}deg`);
        });
      };

      const resetPointer = () => {
        cancelAnimationFrame(frame);
        element.style.setProperty("--pointer-x", "50%");
        element.style.setProperty("--pointer-y", "18%");
        element.style.setProperty("--tilt-x", "0deg");
        element.style.setProperty("--tilt-y", "0deg");
      };

      element.addEventListener("pointermove", handlePointerMove);
      element.addEventListener("pointerleave", resetPointer);
      hoverCleanups.push(() => {
        cancelAnimationFrame(frame);
        element.removeEventListener("pointermove", handlePointerMove);
        element.removeEventListener("pointerleave", resetPointer);
      });
    };

    const prepare = (scope: ParentNode) => {
      elementsWithin(scope, REVEAL_SELECTOR).forEach((element, index) => {
        if (element.dataset.motionItem === "ready") return;
        element.dataset.motionItem = "ready";
        element.classList.add("motion-item");
        element.style.setProperty("--motion-delay", `${(index % 4) * 45}ms`);

        if (element.matches(CARD_SELECTOR)) {
          element.classList.add("motion-card");
          element.style.setProperty("--motion-x", index % 2 === 0 ? "-12px" : "12px");
          element.style.setProperty("--motion-rotate", index % 2 === 0 ? "-1deg" : "1deg");
          preparePointerMotion(element);
        }

        if (observer) observer.observe(element);
        else element.classList.add("is-visible");
      });

      elementsWithin(scope, TEXT_SELECTOR).forEach((element, index) => {
        if (element.dataset.motionText === "ready") return;
        element.dataset.motionText = "ready";
        element.classList.add("motion-text");
        element.style.setProperty("--motion-delay", `${55 + (index % 3) * 35}ms`);

        if (observer) observer.observe(element);
        else element.classList.add("is-visible");
      });
    };

    prepare(document);

    const main = document.querySelector("#main-content");
    const mutationObserver = main && "MutationObserver" in window
      ? new MutationObserver((records) => {
          records.forEach((record) => {
            record.addedNodes.forEach((node) => {
              if (node instanceof HTMLElement) prepare(node);
            });
          });
        })
      : null;

    mutationObserver?.observe(main as Node, { childList: true, subtree: true });

    return () => {
      observer?.disconnect();
      mutationObserver?.disconnect();
      hoverCleanups.forEach((cleanup) => cleanup());
      root.classList.remove("js-motion");
    };
  }, []);

  return null;
}
