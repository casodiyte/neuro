"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function RegistrationForm() {
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    const data = new FormData(formEl);

    const payload = new URLSearchParams();
    payload.set("form-name", "registro");
    payload.set("name", String(data.get("name") || ""));
    payload.set("email", String(data.get("email") || ""));
    payload.set("specialty", String(data.get("specialty") || ""));
    payload.set("city", String(data.get("city") || ""));
    payload.set("message", String(data.get("message") || ""));
    payload.set("bot-field", "");

    setStatus("submitting");

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });
      if (!response.ok) throw new Error("Netlify Forms respondió con error");
      setStatus("success");
      formEl.reset();
    } catch {
      setStatus("error");
    }
  };

  const statusMessage =
    status === "success"
      ? "Solicitud enviada. El equipo académico te contactará pronto."
      : status === "error"
      ? "No pudimos enviar tu solicitud. Intenta de nuevo o escribe a neurosonologialatam@gmail.com."
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
