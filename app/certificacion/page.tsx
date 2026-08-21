import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Seguimiento y certificación",
  description: "Doce meses de seguimiento y proceso de evaluación teórico-práctica en neurosonología.",
  openGraph: { title: "Certificación · Neurosonología CDMX", description: "Seguimiento anual y evaluación teórico-práctica." },
  twitter: { title: "Certificación · Neurosonología CDMX", description: "Seguimiento anual y evaluación teórico-práctica." },
};

export default function CertificationPage() {
  return (
    <main>
      <section className="page-hero certification-hero"><p className="eyebrow"><span /> FASE 03 / 12 MESES</p><h1>La práctica continúa.<br /><em>El criterio madura.</em></h1><p>El seguimiento convierte hallazgos aislados en experiencia acumulada y prepara al participante para la evaluación final.</p><div className="cert-badge"><span>Umbral teórico</span><strong>70%</strong><small>para avanzar a la prueba práctica</small></div></section>

      <section className="section certification-path" aria-labelledby="path-title">
        <div className="section-heading narrow"><p className="section-index">RUTA DE EVALUACIÓN</p><h2 id="path-title">Dos pruebas.<br /><em>Una competencia demostrable.</em></h2><p>La certificación depende de aprobar las instancias teórica y práctica conforme a los criterios del comité evaluador.</p></div>
        <div className="cert-steps">
          <article><span>01</span><div><p>Durante 12 meses</p><h3>Seguimiento de casos</h3><ul><li>Webinar mensual en vivo</li><li>Casos aportados por los participantes</li><li>Videoteca y bibliografía</li><li>Comunidad privada de consulta</li></ul></div></article>
          <article><span>02</span><div><p>Prueba presencial</p><h3>Evaluación teórica</h3><ul><li>Anatomía intra y extracraneal</li><li>Física Doppler y hemodinámica</li><li>Criterios diagnósticos</li><li>Mínimo de 70% de aciertos</li></ul></div></article>
          <article><span>03</span><div><p>Prueba presencial</p><h3>Evaluación práctica</h3><ul><li>Insonación intracraneal completa</li><li>Identificación correcta de vasos</li><li>Ajuste de parámetros</li><li>Interpretación de hallazgos</li></ul></div></article>
        </div>
      </section>

      <section className="section event-card">
        <div><p className="section-index">EXAMEN OFICIAL 2026</p><h2>Lima, Perú</h2><p>En el marco del XXVIII Congreso Iberoamericano de Enfermedad Cerebrovascular y la Global Stroke Alliance Regional Conference.</p></div>
        <dl><div><dt>Fecha</dt><dd>12—14 noviembre 2026</dd></div><div><dt>Sede</dt><dd>Sheraton Lima Historic Center</dd></div><div><dt>Inscripción previa</dt><dd>Hasta el 31 de octubre de 2026</dd></div><div><dt>Contacto</dt><dd><a href="mailto:neurosonologialatam@gmail.com">neurosonologialatam@gmail.com</a></dd></div></dl>
      </section>

      <section className="inline-cta"><div><p className="section-index">IMPORTANTE</p><h2>La acreditación se obtiene al aprobar ambas fases.</h2><p>La participación en el programa no equivale por sí sola a la certificación.</p></div><Link className="button button-primary" href="/inscripcion">Solicitar requisitos <span aria-hidden="true">↗</span></Link></section>
    </main>
  );
}
