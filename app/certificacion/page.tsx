import type { Metadata } from "next";
import Link from "next/link";
import { certFollowUp, certExam, certFollowImage } from "../data/program";
import { Icon } from "../components/Icon";
import { ImageSlot } from "../components/ImageSlot";

export const metadata: Metadata = {
  title: "Seguimiento y certificación",
  description: "Doce meses de seguimiento y proceso de evaluación teórico-práctica en neurosonología.",
  openGraph: { title: "Certificación · Neurosonología CDMX", description: "Seguimiento anual y evaluación teórico-práctica." },
  twitter: { title: "Certificación · Neurosonología CDMX", description: "Seguimiento anual y evaluación teórico-práctica." },
};

export default function CertificationPage() {
  const [examVenue, examCity] = certExam.venue.split(" · ");

  return (
    <main>
      <section className="page-hero certification-hero"><p className="eyebrow"><span /> FASE 03 / 12 MESES</p><h1>La práctica continúa.<br /><em>El criterio madura.</em></h1><p>El seguimiento convierte hallazgos aislados en experiencia acumulada y prepara al participante para la evaluación final.</p><div className="cert-badge"><span>Umbral teórico</span><strong>70%</strong><small>para avanzar a la prueba práctica</small></div></section>

      <section className="section" aria-labelledby="follow-title">
        <div className="section-heading narrow">
          <p className="section-index">SEGUIMIENTO · 12 MESES</p>
          <h2 id="follow-title">Un año de<br /><em>acompañamiento.</em></h2>
          <p>El seguimiento convierte hallazgos aislados en experiencia acumulada.</p>
        </div>
        <div className="follow-layout">
          <div className="follow-grid">
            {certFollowUp.map((item) => (
              <article className="follow-card" key={item.tag}>
                <span className="follow-icon"><Icon name={item.icon} size={22} /></span>
                <div>
                  <span className="follow-tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
          <ImageSlot src={certFollowImage.src} theme={certFollowImage.theme} aspect={certFollowImage.aspect} size={certFollowImage.size} alt="Seguimiento longitudinal del programa" sizes="(max-width: 900px) 100vw, 34vw" />
        </div>
      </section>

      <section className="section certification-path" aria-labelledby="exam-path-title">
        <div className="section-heading narrow"><p className="section-index">RUTA DE EVALUACIÓN</p><h2 id="exam-path-title">Dos pruebas.<br /><em>Una competencia demostrable.</em></h2><p>La certificación depende de aprobar las instancias teórica y práctica conforme a los criterios del comité evaluador.</p></div>
        <div className="cert-steps">
          {certExam.process.map((step) => (
            <article key={step.step}><span>{step.step}</span><div><p>{step.tag}</p><h3>{step.title}</h3><ul><li>{step.detail}</li></ul></div></article>
          ))}
        </div>
      </section>

      <section className="section event-card">
        <div><p className="section-index">{certExam.title}</p><h2>{examCity}</h2><p>{certExam.frame}</p></div>
        <dl><div><dt>Fecha</dt><dd>{certExam.dates}</dd></div><div><dt>Sede</dt><dd>{examVenue}</dd></div><div><dt>Costo</dt><dd>{certExam.cost}</dd></div><div><dt>Requisito</dt><dd>{certExam.requirement}</dd></div><div><dt>Asistencia</dt><dd>{certExam.attendance}</dd></div></dl>
      </section>

      <section className="inline-cta"><div><p className="section-index">IMPORTANTE</p><h2>La acreditación se obtiene al aprobar ambas fases.</h2><p>La participación en el programa no equivale por sí sola a la certificación.</p></div><Link className="button button-primary" href="/inscripcion">Solicitar requisitos <span aria-hidden="true">↗</span></Link></section>
    </main>
  );
}
