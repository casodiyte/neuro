import type { Metadata } from "next";
import { RegistrationForm } from "../components/RegistrationForm";

export const metadata: Metadata = {
  title: "Inscripción",
  description: "Solicita información para la cohorte CDMX 2026 de mentoría en neurosonología.",
  openGraph: { title: "Solicita un lugar · Neurosonología CDMX", description: "Cohorte exclusiva de ocho médicos." },
  twitter: { title: "Solicita un lugar · Neurosonología CDMX", description: "Cohorte exclusiva de ocho médicos." },
};

export default function RegistrationPage() {
  return (
    <main>
      <section className="page-hero registration-hero"><div><p className="eyebrow"><span /> COHORTE 2026</p><h1>Ocho lugares.<br /><em>Una señal clara.</em></h1><p>Cuéntanos brevemente sobre tu práctica. El equipo académico te contactará con requisitos, disponibilidad y próximos pasos.</p></div><aside className="investment-card"><p>Inversión por participante</p><strong><span>$</span>2,500<small> USD</small></strong><ul><li>40 h de precurso virtual</li><li>40 h de mentoría presencial</li><li>12 meses de seguimiento</li><li>Acceso a materiales digitales</li></ul></aside></section>
      <section className="section form-section"><div><p className="section-index">SOLICITUD DE INFORMACIÓN</p><h2>Tu práctica,<br />tu punto de partida.</h2><p>Envía tus datos y el equipo académico te contactará. No se realizará ningún cobro desde este sitio.</p><div className="contact-note"><span>Contacto directo</span><a href="mailto:neurosonologialatam@gmail.com">neurosonologialatam@gmail.com</a></div></div><RegistrationForm /></section>
      <section className="section admission-steps"><article><span>01</span><h3>Solicitud</h3><p>Envía tu perfil y área de práctica.</p></article><article><span>02</span><h3>Revisión</h3><p>El equipo confirma adecuación y cupo.</p></article><article><span>03</span><h3>Confirmación</h3><p>Recibes agenda, condiciones y forma de pago.</p></article></section>
    </main>
  );
}
