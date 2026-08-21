import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dirección académica",
  description: "Trayectoria de la Dra. Silvia Viviana Cocorullo, directora del programa de neurosonología.",
  openGraph: { title: "Dra. Silvia Viviana Cocorullo", description: "Dirección académica del programa de Neurosonología CDMX." },
  twitter: { title: "Dra. Silvia Viviana Cocorullo", description: "Dirección académica del programa de Neurosonología CDMX." },
};

export default function DirectorPage() {
  return (
    <main>
      <section className="page-hero director-hero">
        <div><p className="eyebrow"><span /> DIRECCIÓN ACADÉMICA</p><h1>Dra. Silvia<br /><em>Viviana Cocorullo</em></h1><p>Una trayectoria dedicada a convertir la neurosonología en una herramienta clínica enseñable, reproducible y útil a pie de cama.</p></div>
        <div className="portrait-abstract" aria-label="Monograma de Silvia Cocorullo"><span>SC</span><i /><i /><i /><i /></div>
      </section>

      <section className="section profile-grid">
        <article className="profile-quote"><p>“La señal no reemplaza el examen clínico: lo vuelve dinámico.”</p><span>Principio de mentoría</span></article>
        <div className="profile-copy"><p className="section-index">PERFIL</p><h2>Formación, criterio<br />y transmisión.</h2><p>Neuróloga y neurosonóloga con experiencia en educación médica especializada y evaluación internacional. Fue directora de la Carrera de Médico Especialista en Neurología de UBA–IDIM.</p><p>Su trabajo en el capítulo latinoamericano del grupo de neurosonología de la World Federation of Neurology ha incluido docencia, mentoría y participación en procesos de evaluación.</p><div className="credential-grid"><div><strong>Neurología</strong><span>Práctica clínica especializada</span></div><div><strong>Neurosonología</strong><span>Hemodinamia cerebral por ultrasonido</span></div><div><strong>Docencia</strong><span>Formación médica de posgrado</span></div><div><strong>Evaluación</strong><span>Estándares internacionales</span></div></div></div>
      </section>

      <section className="section mentor-method"><div><p className="section-index">MÉTODO</p><h2>Ver. Corregir.<br />Volver a intentar.</h2></div><div><p>La mentoría prioriza observación directa, práctica deliberada y razonamiento verbalizado. Cada ajuste del equipo se conecta con la pregunta clínica y cada hallazgo se discute en contexto.</p><Link className="button button-primary" href="/mentoria">Conocer la mentoría <span aria-hidden="true">↗</span></Link></div></section>
    </main>
  );
}
