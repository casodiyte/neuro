"use client";

import { FormEvent, useState } from "react";
import { CONTACT_EMAIL, submitNetlifyForm } from "../lib/forms";

type Status = "idle" | "submitting" | "success" | "error";

export function RegistrationForm() {
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    const data = new FormData(formEl);

    setStatus("submitting");

    try {
      await submitNetlifyForm("registro", {
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        specialty: String(data.get("specialty") || ""),
        city: String(data.get("city") || ""),
        message: String(data.get("message") || ""),
      });
      setStatus("success");
      formEl.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const statusMessage =
    status === "success"
      ? "Solicitud enviada. El equipo académico te contactará pronto."
      : status === "error"
      ? `No pudimos enviar tu solicitud. Intenta de nuevo o escribe a ${CONTACT_EMAIL}.`
      : "";

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
      <button className="button button-primary" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Enviando…" : "Enviar solicitud"} <span aria-hidden="true">↗</span>
      </button>
      <p className="form-status" role="status">{statusMessage}</p>
    </form>
  );
}
