import type { Metadata } from "next";
import Link from "next/link";
import { onsiteDays, virtualModules } from "../data/program";
import { ModuleAccordion } from "../components/ModuleAccordion";
import { DayAccordion } from "../components/DayAccordion";

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
        <ModuleAccordion modules={virtualModules} />
      </section>

      <section className="section onsite-section" aria-labelledby="onsite-title">
        <div className="section-heading narrow"><p className="section-index">FASE 02 / CDMX</p><h2 id="onsite-title">Cinco días.<br /><em>Cinco cambios de lente.</em></h2><p>Cada jornada combina dos horas de discusión clínica con seis horas de práctica directa.</p></div>
        <DayAccordion days={onsiteDays} />
      </section>

      <section className="inline-cta"><div><p className="section-index">SIGUIENTE SEÑAL</p><h2>Entiende cómo se vive la mentoría.</h2></div><Link className="button button-primary" href="/mentoria">Ver la experiencia <span aria-hidden="true">↗</span></Link></section>
    </main>
  );
}
