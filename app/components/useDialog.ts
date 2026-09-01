"use client";

import { RefObject, useEffect } from "react";

// Accesibilidad compartida para overlay de menú y modal:
// focus trap, cerrar con ESC, bloqueo de scroll y restauración de foco.
export function useDialog(
  ref: RefObject<HTMLElement | null>,
  open: boolean,
  onClose: () => void,
) {
  useEffect(() => {
    if (!open) return;
    const node = ref.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const selector =
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const focusables = () =>
      node ? Array.from(node.querySelectorAll<HTMLElement>(selector)).filter((el) => el.offsetParent !== null) : [];

    // Foco inicial dentro del diálogo.
    const initial = focusables()[0] ?? node;
    window.requestAnimationFrame(() => initial?.focus());

    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopImmediatePropagation();
        onClose();
        return;
      }
      if (event.key === "Tab") {
        const items = focusables();
        if (items.length === 0) {
          event.preventDefault();
          return;
        }
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement;
        if (event.shiftKey && (active === first || active === node)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.body.style.overflow = "";

      // Restaurar el foco sólo si el origen sigue siendo visible. Al abrir el
      // modal "Próximamente" desde el menú, el menú se cierra y su botón queda
      // en `visibility: hidden`: enfocarlo sería un no-op y el foco caería al
      // <body>, dejando al usuario de teclado sin punto de referencia.
      const stillVisible =
        previouslyFocused?.isConnected &&
        (typeof previouslyFocused.checkVisibility === "function"
          ? previouslyFocused.checkVisibility({ visibilityProperty: true })
          : true);

      const fallback = document.getElementById("main-content");
      (stillVisible ? previouslyFocused : fallback)?.focus?.();
    };
  }, [open, onClose, ref]);
}
