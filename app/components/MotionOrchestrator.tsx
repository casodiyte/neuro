"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = [
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

export function MotionOrchestrator() {
  useEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    const textItems = Array.from(document.querySelectorAll<HTMLElement>(TEXT_SELECTOR));
    const items = Array.from(new Set([...revealItems, ...textItems]));

    revealItems.forEach((element, index) => {
      element.classList.add("motion-item");
      element.style.setProperty("--motion-delay", `${(index % 4) * 45}ms`);
    });
    textItems.forEach((element, index) => {
      element.classList.add("motion-text");
      element.style.setProperty("--motion-delay", `${(index % 2) * 70}ms`);
    });

    root.classList.add("js-motion");

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((element) => element.classList.add("is-visible"));
      return () => root.classList.remove("js-motion");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 },
    );

    items.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      root.classList.remove("js-motion");
    };
  }, []);

  return null;
}
