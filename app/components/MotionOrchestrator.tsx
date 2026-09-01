"use client";

import { useEffect } from "react";

// Ojo: estos selectores deben seguir el markup real. Al renombrar clases hay que
// actualizarlos o la sección pierde el reveal en silencio.
const CARD_SELECTOR = [
  ".visual-card",
  ".diff-point",
  ".immersion-grid article",
  ".schedule-list article",
  ".cert-steps article",
  ".follow-card",
  ".event-card",
  ".profile-quote",
  ".credential-grid > div",
  ".investment-card",
  ".admission-steps article",
  ".course-card",
].join(",");

const REVEAL_SELECTOR = [
  CARD_SELECTOR,
  ".hero-copy > :not(h1)",
  ".proof-strip > *",
  ".section-heading > *",
  ".mentor-teaser > *",
  ".final-cta > :not(.liquid-cluster):not(h2)",
  ".page-hero > *",
  // Acordeones nativos <details> de programa y mentoría.
  ".accordion-item",
  // Tarjetas 3D del recorrido: sólo reveal, nunca .motion-card — el hover
  // de .motion-card escribiría sobre el transform que sostiene la perspectiva.
  ".path-node-card",
  ".inline-cta > *",
  ".aftercare > *",
  ".event-card > *",
  ".profile-grid > *",
  ".credential-grid > *",
  ".mentor-method > *",
  ".registration-hero > *",
  ".form-section > *",
].join(",");

const TEXT_SELECTOR = [
  ".title-line",
  ".page-hero h1",
  ".section-heading h2",
  ".diff-lead h2",
  ".mentor-teaser h2",
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

    // El CSS oculta estos elementos (opacity/clip-path) y sólo los muestra al
    // recibir `.is-visible`. Si el callback que la añade no llega, el contenido
    // queda invisible PARA SIEMPRE. Pasa de verdad: en una pestaña en segundo
    // plano Chrome no dispara IntersectionObserver ni requestAnimationFrame, así
    // que la página se pintaría con los titulares en blanco.
    // Por eso llevamos un registro y barremos como red de seguridad: el sistema
    // debe fallar mostrando el contenido, nunca escondiéndolo.
    const pending = new Set<HTMLElement>();

    const reveal = (element: HTMLElement) => {
      element.classList.add("is-visible");
      pending.delete(element);
      observer?.unobserve(element);
    };

    const observer = prefersReducedMotion || !("IntersectionObserver" in window)
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) reveal(entry.target as HTMLElement);
            });
          },
          { rootMargin: "0px 0px -10%", threshold: 0.1 },
        );

    // Muestra lo que ya está dentro del viewport (o por encima, si se saltó).
    let sweepFrame = 0;
    const sweep = () => {
      sweepFrame = 0;
      pending.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) reveal(element);
        else if (rect.bottom <= 0) reveal(element);
      });
      if (pending.size === 0) detachSafetyNet();
    };
    const scheduleSweep = () => {
      if (sweepFrame || pending.size === 0) return;
      sweepFrame = requestAnimationFrame(sweep);
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") sweep();
    };
    const detachSafetyNet = () => {
      window.removeEventListener("scroll", scheduleSweep);
      window.removeEventListener("resize", scheduleSweep);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
    window.addEventListener("scroll", scheduleSweep, { passive: true });
    window.addEventListener("resize", scheduleSweep, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

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

        if (observer) {
          pending.add(element);
          observer.observe(element);
        } else {
          element.classList.add("is-visible");
        }
      });

      elementsWithin(scope, TEXT_SELECTOR).forEach((element, index) => {
        if (element.dataset.motionText === "ready") return;
        element.dataset.motionText = "ready";
        element.classList.add("motion-text");
        element.style.setProperty("--motion-delay", `${55 + (index % 3) * 35}ms`);

        const isAlreadyOnScreen =
          element.matches(".title-line") ||
          element.getBoundingClientRect().top < window.innerHeight * 0.92;

        if (isAlreadyOnScreen) {
          // rAF tampoco corre en pestaña oculta: registrar además como pendiente
          // para que el barrido lo rescate si el frame nunca llega.
          pending.add(element);
          requestAnimationFrame(() => reveal(element));
        } else if (observer) {
          pending.add(element);
          observer.observe(element);
        } else {
          element.classList.add("is-visible");
        }
      });
    };

    prepare(document);
    // Barrido inicial: cubre el caso de montar con la pestaña ya oculta.
    sweep();
    const safetyTimer = window.setTimeout(sweep, 1200);

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
      window.clearTimeout(safetyTimer);
      cancelAnimationFrame(sweepFrame);
      detachSafetyNet();
      observer?.disconnect();
      mutationObserver?.disconnect();
      hoverCleanups.forEach((cleanup) => cleanup());
      root.classList.remove("js-motion");
    };
  }, []);

  return null;
}
