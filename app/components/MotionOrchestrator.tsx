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
  ".visual-card-copy > *",
  ".phase-card h3",
  ".phase-card .phase-copy",
  ".difference-list h3",
  ".difference-list p",
  ".immersion-grid h2",
  ".immersion-grid h3",
  ".immersion-grid p",
  ".module-main h3",
  ".module-main > p",
  ".schedule-list h3",
  ".schedule-list p",
  ".cert-steps h3",
  ".event-card h2",
  ".profile-quote p",
  ".credential-grid strong",
  ".credential-grid span",
  ".admission-steps h3",
  ".admission-steps p",
].join(",");

function elementsWithin(scope: ParentNode, selector: string) {
  const matches = scope instanceof HTMLElement && scope.matches(selector) ? [scope] : [];
  return [...matches, ...Array.from(scope.querySelectorAll<HTMLElement>(selector))];
}

export function MotionOrchestrator() {
  useEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

    const prepare = (scope: ParentNode) => {
      elementsWithin(scope, REVEAL_SELECTOR).forEach((element, index) => {
        if (element.dataset.motionItem === "ready") return;
        element.dataset.motionItem = "ready";
        element.classList.add("motion-item");
        element.style.setProperty("--motion-delay", `${(index % 4) * 45}ms`);

        if (element.matches(CARD_SELECTOR)) {
          element.classList.add("motion-card");
          element.style.setProperty("--motion-x", index % 2 === 0 ? "-12px" : "12px");
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
      root.classList.remove("js-motion");
    };
  }, []);

  return null;
}
