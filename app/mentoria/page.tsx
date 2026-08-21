import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentoría presencial",
  description: "Una experiencia clínica inmersiva con grupos pequeños, práctica directa y seguimiento anual.",
  openGraph: { title: "Mentoría presencial · Neurosonología CDMX", description: "Práctica directa, grupos pequeños y seguimiento anual." },
  twitter: { title: "Mentoría presencial · Neurosonología CDMX", description: "Práctica directa, grupos pequeños y seguimiento anual." },
};

const practiceSignals = [
  ["08:00", "Discusión clínica", "Análisis de videos, hipótesis y decisiones antes de iniciar la práctica."],
  ["10:00", "Práctica guiada", "Ventanas, equipo, insonación y hallazgos con retroalimentación inmediata."],
  ["13:00", "Integración", "Rotación por casos, resolución de errores y consolidación del protocolo."],
  ["16:00", "Cierre hemodinámico", "Lectura conjunta de señales y plan de mejora para la siguiente jornada."],
];

export default function MentoriaPage() {
  return (
    <main>
      <section className="page-hero page-hero-split">
        <div><p className="eyebrow"><span /> EXPERIENCIA PRESENCIAL</p><h1>Aprender con<br /><em>las manos.</em></h1><p>La técnica se construye en el cuerpo: postura, presión, ángulo, profundidad y lectura simultánea de la señal.</p></div>
        <div className="cohort-orbit" aria-label="Cohorte máxima de ocho médicos"><span className="orbit-core">08<small>médicos</small></span>{Array.from({ length: 8 }).map((_, index) => <i key={index} style={{ "--orbit": `${index * 45}deg` } as React.CSSProperties} />)}</div>
      </section>

      <section className="section immersion-grid">
        <article className="immersion-lead"><p className="section-index">RATIO DE MENTORÍA</p><strong>1:8</strong><h2>Una cohorte lo bastante pequeña para observar cada ajuste.</h2><p>El cupo limitado permite rotación activa, corrección individual y exposición real al razonamiento del mentor.</p></article>
        <article><span className="metric">6 h</span><h3>Práctica diaria</h3><p>Voluntarios sanos y pacientes hospitalizados o ambulatorios, según disponibilidad clínica y criterios de seguridad.</p></article>
        <article><span className="metric">2 h</span><h3>Discusión y video</h3><p>Casos complejos, sonidos, espectros y correlación clínica antes y después de cada sesión.</p></article>
        <article className="wide-card"><span className="metric">12 m</span><div><h3>Seguimiento que evita que la curva se detenga</h3><p>Webinars mensuales en vivo, discusión de casos aportados por los mentoreados y comunidad privada de consulta.</p></div></article>
      </section>

      <section className="section daily-flow" aria-labelledby="daily-title">
        <div className="section-heading narrow"><p className="section-index">UN DÍA EN CDMX</p><h2 id="daily-title">Ritmo clínico,<br /><em>no conferencia.</em></h2><p>La agenda alterna reflexión, ejecución y lectura para que cada concepto encuentre una señal concreta.</p></div>
        <div className="schedule-list">{practiceSignals.map(([time, title, copy]) => <article key={time}><time>{time}</time><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div>
      </section>

      <section className="section aftercare"><div className="aftercare-signal" aria-hidden="true"><i /><i /><i /><i /><i /></div><div><p className="section-index">DESPUÉS DEL TALLER</p><h2>No vuelves solo<br />a tu práctica.</h2><p>Durante un año tendrás encuentros mensuales, videoteca, bibliografía y una red de consulta para revisar casos complejos.</p><Link className="button button-primary" href="/certificacion">Ver seguimiento y examen <span aria-hidden="true">↗</span></Link></div></section>
    </main>
  );
}
