"use client";

import { FormEvent, useState } from "react";

export function RegistrationForm() {
  const [status, setStatus] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const specialty = String(form.get("specialty") || "");
    const city = String(form.get("city") || "");
    const email = String(form.get("email") || "");
    const message = String(form.get("message") || "");
    const subject = encodeURIComponent(`Interés en Neurosonología CDMX 2026 — ${name}`);
    const body = encodeURIComponent(`Nombre: ${name}\nEspecialidad: ${specialty}\nCiudad/País: ${city}\nCorreo: ${email}\n\nMensaje:\n${message}`);
    setStatus("Abriremos tu correo con la solicitud preparada.");
    window.location.href = `mailto:neurosonologialatam@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <form className="registration-form" onSubmit={submit}>
      <div className="field-pair">
        <label>Nombre completo<input name="name" autoComplete="name" required /></label>
        <label>Correo profesional<input name="email" type="email" autoComplete="email" required /></label>
      </div>
      <div className="field-pair">
        <label>Especialidad<input name="specialty" required /></label>
        <label>Ciudad y país<input name="city" autoComplete="country-name" required /></label>
      </div>
      <label>¿Qué esperas resolver con el programa?<textarea name="message" rows={5} required /></label>
      <label className="consent"><input type="checkbox" required /> <span>Acepto que el equipo académico me contacte sobre esta cohorte.</span></label>
      <button className="button button-primary" type="submit">Preparar mi solicitud <span aria-hidden="true">↗</span></button>
      <p className="form-status" role="status">{status}</p>
    </form>
  );
}
