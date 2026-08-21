import type { Metadata } from "next";
import Link from "next/link";
import { onsiteDays, virtualModules } from "../data/program";

export const metadata: Metadata = {
  title: "Programa académico",
  description: "Cinco módulos virtuales y cinco jornadas presenciales de neurosonología, Doppler transcraneal y hemodinamia cerebral.",
  openGraph: { title: "Programa académico · Neurosonología CDMX", description: "Cinco módulos virtuales y cinco jornadas presenciales de entrenamiento clínico." },
  twitter: { title: "Programa académico · Neurosonología CDMX", description: "Cinco módulos virtuales y cinco jornadas presenciales de entrenamiento clínico." },
};

export default function ProgramPage() {
  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow"><span /> ARQUITECTURA ACADÉMICA</p>
        <h1>De la onda<br />al <em>criterio.</em></h1>
        <p>Una secuencia deliberada para comprender, ejecutar e interpretar el Doppler transcraneal en escenarios clínicos reales.</p>
        <div className="page-hero-meta"><span>40 h virtuales</span><span>40 h presenciales</span><span>Evaluación por módulo</span></div>
      </section>

      <section className="section syllabus-section" aria-labelledby="virtual-title">
        <div className="section-heading narrow"><p className="section-index">FASE 01 / PRECURSO</p><h2 id="virtual-title">Base virtual<br /><em>antes de la práctica.</em></h2><p>Cuatro semanas de módulos asincrónicos, lecturas, audioteca, videoteca y evaluaciones obligatorias.</p></div>
        <div className="module-list">
          {virtualModules.map((module) => <article className="module-card" key={module.id}><div className="module-id">{module.id}</div><div className="module-main"><h3>{module.title}</h3><p>{module.objective}</p><ul>{module.lessons.map((lesson) => <li key={lesson}>{lesson}</li>)}</ul></div><div className="module-assessment"><span>Evaluación</span><p>{module.assessment}</p></div></article>)}
        </div>
      </section>

      <section className="section onsite-section" aria-labelledby="onsite-title">
        <div className="section-heading narrow"><p className="section-index">FASE 02 / CDMX</p><h2 id="onsite-title">Cinco días.<br /><em>Cinco cambios de lente.</em></h2><p>Cada jornada combina dos horas de discusión clínica con seis horas de práctica directa.</p></div>
        <div className="day-timeline">
          {onsiteDays.map((day, index) => <article key={day.day}><span className="day-index">{String(index + 1).padStart(2, "0")}</span><div><p>{day.day}</p><h3>{day.title}</h3><span>{day.detail}</span></div></article>)}
        </div>
      </section>

      <section className="inline-cta"><div><p className="section-index">SIGUIENTE SEÑAL</p><h2>Entiende cómo se vive la mentoría.</h2></div><Link className="button button-primary" href="/mentoria">Ver la experiencia <span aria-hidden="true">↗</span></Link></section>
    </main>
  );
}
