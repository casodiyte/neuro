import Image from "next/image";
import Link from "next/link";
import { phases, programFacts } from "./data/program";

import { TextReveal } from "./components/TextReveal";

export default function Home() {
  return (
    <main>
      <section className="hero home-hero" aria-labelledby="hero-title">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> CDMX · 21—25 OCT 2026</p>
          <h1 id="hero-title">
            <span className="title-line"><TextReveal text="Escucha el flujo." /></span>
            <span className="title-line"><em><TextReveal text="Interpreta el cerebro." delay={0.12} /></em></span>
          </h1>
          <p className="hero-lede">Mentoría internacional en neurosonología y hemodinamia cerebral por Doppler transcraneal. Un recorrido intensivo de la señal a la decisión clínica.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/programa">Explorar el programa <span aria-hidden="true">↗</span></Link>
            <Link className="button button-ghost" href="/mentoria">Conocer la experiencia</Link>
          </div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Datos clave">
        <p>De la física Doppler al criterio clínico, con práctica real y acompañamiento longitudinal.</p>
        {programFacts.slice(0, 3).map((fact) => <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}
      </section>

      <section className="section visual-atlas" aria-labelledby="atlas-title">
        <div className="section-heading">
          <p className="section-index">01 / MIRADA CLÍNICA</p>
          <h2 id="atlas-title"><TextReveal text="Tres formas de aprender" /><br />a <em><TextReveal text="ver el flujo." delay={0.14} /></em></h2>
          <p>La señal cobra sentido cuando se conecta con anatomía, técnica y práctica deliberada. Cada capa del programa está diseñada para hacer visible esa relación.</p>
        </div>

        <div className="visual-grid">
          <article className="visual-card visual-card-featured">
            <figure className="visual-card-media visual-card-media-doppler">
              <Image
                src="/images/clay-doppler-v1.png"
                alt="Ilustración 3D tipo clay de un estudio Doppler transcraneal y su onda espectral"
                fill
                sizes="(max-width: 760px) 100vw, (max-width: 980px) 62vw, 58vw"
                quality={88}
              />
              <span className="visual-chip">Técnica · tiempo real</span>
            </figure>
            <div className="visual-card-copy">
              <span className="visual-number">01</span>
              <div><h3>Ventana, ángulo y señal</h3><p>La exploración se aprende con la mano, el oído y una lectura consciente del espectro.</p></div>
            </div>
          </article>

          <article className="visual-card visual-card-anatomy">
            <figure className="visual-card-media visual-card-media-anatomy">
              <Image
                src="/images/clay-willis-v1.png"
                alt="Ilustración 3D tipo clay del cerebro y el circuito arterial del polígono de Willis"
                fill
                sizes="(max-width: 760px) 100vw, 38vw"
                quality={88}
              />
              <span className="visual-chip">Anatomía vascular</span>
            </figure>
            <div className="visual-card-copy">
              <span className="visual-number">02</span>
              <div><h3>Anatomía en volumen</h3><p>Reconoce territorios, profundidades y direcciones antes de interpretar velocidades.</p></div>
            </div>
          </article>

          <article className="visual-card visual-card-practice">
            <figure className="visual-card-media visual-card-media-practice">
              <Image
                src="/images/clay-training-v1.png"
                alt="Ilustración 3D tipo clay de una práctica de ultrasonido supervisada por un mentor"
                fill
                sizes="(max-width: 760px) 100vw, 38vw"
                quality={86}
              />
              <span className="visual-chip">Práctica supervisada</span>
            </figure>
            <div className="visual-card-copy">
              <span className="visual-number">03</span>
              <div><h3>Aprender haciendo</h3><p>Feedback inmediato para convertir cada ajuste técnico en criterio reproducible.</p></div>
            </div>
          </article>
        </div>

      </section>

      <section className="section section-story" aria-labelledby="journey-title">
        <div className="section-heading"><p className="section-index">02 / RECORRIDO</p><h2 id="journey-title"><TextReveal text="Una curva de aprendizaje" /><br />diseñada para <em><TextReveal text="conectar." delay={0.16} /></em></h2><p>Teoría antes del encuentro. Práctica intensiva cuando cada ajuste importa. Casos reales durante un año para consolidar criterio.</p></div>
        <div className="phase-grid">
          {phases.map((phase) => <article className={`phase-card accent-${phase.accent}`} key={phase.number}><div className="phase-orb" aria-hidden="true" /><span className="phase-number">{phase.number}</span><p>{phase.kicker}</p><h3>{phase.title}</h3><p className="phase-copy">{phase.copy}</p><span className="phase-meta">{phase.meta}</span></article>)}
        </div>
      </section>

      <section className="section contrast-panel" aria-labelledby="difference-title">
        <div className="difference-intro">
          <p className="section-index">03 / DIFERENCIAL</p>
          <h2 id="difference-title"><TextReveal text="No es otro curso." /><br /><em><TextReveal text="Es práctica acompañada." delay={0.14} /></em></h2>
          <figure className="difference-visual">
            <Image
              src="/images/clay-neurosonology-v2.png"
              alt="Ilustración 3D de una exploración neurosonológica con Doppler transcraneal"
              fill
              sizes="(max-width: 980px) 100vw, 42vw"
              quality={86}
            />
            <figcaption><span>Neurosonología en tiempo real</span><strong>Ver la señal antes de decidir.</strong></figcaption>
          </figure>
        </div>
        <div className="difference-list">
          <article><span>01</span><div><h3>Señal antes que protocolo</h3><p>Aprende a leer morfología, velocidad y resistencia como una conversación hemodinámica en tiempo real.</p></div></article>
          <article><span>02</span><div><h3>Manos sobre el equipo</h3><p>Seis horas diarias de práctica directa para construir memoria motora, orientación espacial y confianza técnica.</p></div></article>
          <article><span>03</span><div><h3>Decisiones con contexto</h3><p>Integra DTC, situación clínica y evolución para reducir el empirismo a pie de cama.</p></div></article>
        </div>
      </section>

      <section className="section mentor-teaser" aria-labelledby="mentor-title">
        <div className="mentor-monogram" aria-hidden="true"><span>SC</span><i /><i /><i /></div>
        <div><p className="section-index">04 / DIRECCIÓN ACADÉMICA</p><h2 id="mentor-title">Dra. Silvia Viviana<br />Cocorullo</h2><p>Neuróloga y neurosonóloga, formadora internacional y evaluadora vinculada al capítulo latinoamericano de neurosonología.</p><Link className="text-link" href="/directora">Conocer su trayectoria <span aria-hidden="true">↗</span></Link></div>
      </section>

      <section className="section final-cta" aria-labelledby="cta-title">
        <div className="liquid-cluster" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="section-index">COHORTE EXCLUSIVA · 8 LUGARES</p><h2 id="cta-title"><TextReveal text="Tu próxima decisión clínica" /><br />puede comenzar con una señal.</h2><p>Solicita información sobre requisitos, agenda y proceso de admisión.</p><Link className="button button-primary" href="/inscripcion">Quiero solicitar un lugar <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
