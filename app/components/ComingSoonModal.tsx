"use client";

import { FormEvent, useRef, useState } from "react";
import { useDialog } from "./useDialog";
import { ImageSlot } from "./ImageSlot";
import { submitNetlifyForm } from "../lib/forms";

type Course = { id: string; name: string; title: string; tagline: string };
type Status = "idle" | "submitting" | "success" | "error";

// Modal "Próximamente" para cursos bloqueados (Curso 2 / Curso 3).
// No cambia el contenido ni el acento del sitio: el sitio permanece en Curso 1.
export function ComingSoonModal({ course, onClose }: { course: Course | null; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const open = course !== null;
  const [status, setStatus] = useState<Status>("idle");
  useDialog(ref, open, onClose);

  if (!course) return null;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus("submitting");
    try {
      await submitNetlifyForm("aviso-curso", {
        email: String(data.get("email") || ""),
        curso: course.title,
      });
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="modal-backdrop">
      {/* Scrim como <button> real: clic para cerrar sin handlers sobre nodos no interactivos. */}
      <button className="modal-scrim" type="button" tabIndex={-1} aria-hidden="true" onMouseDown={onClose} />
      <div
        ref={ref}
        className={`modal-card course-${course.id}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="Cerrar">
          <span aria-hidden="true">✕</span>
        </button>
        <ImageSlot
          src={`/images/neurosono/${course.id.replace("-", "")}-proximamente.webp`}
          theme={course.title}
          aspect="16 / 9"
          alt={`${course.title} — próximamente`}
          sizes="(max-width: 520px) 88vw, 440px"
          className="modal-media"
        />
        <span className="modal-badge">Próximamente</span>
        <h2 id="modal-title" className="modal-title">{course.name}</h2>
        <p className="modal-copy">
          Este curso está en preparación dentro del universo NEUROSONO. Neurosonología DTC (Curso 1) es la cohorte
          activa por ahora.
        </p>

        {status === "success" ? (
          <p className="modal-status is-success" role="status">Listo. Te avisaremos cuando {course.name} abra.</p>
        ) : (
          <form className="modal-form" onSubmit={submit}>
            <label className="sr-only" htmlFor="modal-email">Correo electrónico</label>
            <input
              id="modal-email"
              name="email"
              type="email"
              required
              placeholder="Déjanos tu correo y te avisamos"
              autoComplete="email"
            />
            <button className="button button-primary modal-submit" type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Enviando…" : "Avísame"} <span aria-hidden="true">↗</span>
            </button>
            {status === "error" && (
              <p className="modal-status is-error" role="status">No se pudo enviar. Intenta de nuevo.</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
