import Image from "next/image";
import Link from "next/link";
import { courses, programFacts } from "./data/program";

import { TextReveal } from "./components/TextReveal";
import { PathJourney } from "./components/PathJourney";
import { CourseCard } from "./components/CourseCard";
import { HomeDifferential } from "./components/HomeDifferential";
import { MentorTeaser } from "./components/MentorTeaser";
import { Icon } from "./components/Icon";

export default function Home() {
  return (
    <main>
      <section className="hero home-hero" aria-labelledby="hero-title">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> PROGRAMA MÉDICO HÍBRIDO · NEUROSONO DTC</p>
          <h1 id="hero-title">
            <span className="title-line"><TextReveal text="Formación médica en" /></span>
            <span className="title-line"><em><TextReveal text="Doppler transcraneal." delay={0.12} /></em></span>
          </h1>
          <p className="hero-lede"><strong>De la señal a la decisión clínica.</strong> Mentoría y certificación en neurosonología y hemodinamia cerebral, con formación virtual, práctica presencial intensiva y acompañamiento durante un año.</p>
          <ul className="hero-facts" aria-label="Datos principales del programa">
            <li><span>Sede y fecha</span><strong>CDMX · 21—25 OCT 2026</strong></li>
            <li><span>Formación</span><strong>40 h virtuales + 40 h presenciales</strong></li>
            <li><span>Seguimiento</span><strong>12 meses + examen</strong></li>
          </ul>
          <div className="hero-actions">
            <Link className="button button-primary" href="/programa">Ver programa completo <Icon name="arrowUpRight" size={18} className="icon-cta" /></Link>
            <Link className="button button-ghost" href="/mentoria">Cómo funciona la mentoría</Link>
          </div>
        </div>
        <figure className="hero-visual">
          <Image
            className="hero-visual-image"
            src="/images/neurosono/hero-doppler-v1.webp"
            alt="Ilustración conceptual de una exploración por Doppler transcraneal con flujo cerebral"
            width={1024}
            height={1536}
            sizes="(max-width: 760px) 78vw, (max-width: 1100px) 34vw, 420px"
            priority
          />
        </figure>
      </section>

      <section className="proof-strip" aria-label="Datos clave">
        <p>De la física Doppler al criterio clínico, con práctica real y acompañamiento longitudinal.</p>
        {programFacts.slice(0, 3).map((fact) => <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}
      </section>

      <section className="section path-section" aria-labelledby="path-title">
        <div className="section-heading">
          <p className="section-index">01 / EL RECORRIDO</p>
          <h2 id="path-title"><TextReveal text="Un camino, tres estaciones" /><br />hacia la <em><TextReveal text="certificación." delay={0.14} /></em></h2>
          <p>Primero el curso virtual, luego la mentoría presencial en CDMX y, después, la certificación con seguimiento de un año.</p>
        </div>
        <PathJourney />
      </section>

      <section className="section visual-atlas" aria-labelledby="atlas-title">
        <div className="section-heading atlas-heading">
          <p className="section-index">02 / MIRADA CLÍNICA</p>
          <h2 id="atlas-title"><TextReveal text="Tres formas de aprender" /><br />a <em><TextReveal text="ver el flujo." delay={0.14} /></em></h2>
          <p>La señal cobra sentido cuando se conecta con anatomía, técnica y práctica deliberada. Cada capa del programa está diseñada para hacer visible esa relación.</p>
        </div>

        <div className="visual-grid">
          <article className="visual-card visual-card-featured">
            <figure className="visual-card-media visual-card-media-doppler">
              <Image
                src="/images/neurosono/clinica-01-tecnica.webp"
                alt="Perfil conceptual con transductor Doppler, red vascular y señal espectral"
                fill
                sizes="(max-width: 760px) 100vw, (max-width: 980px) 62vw, 58vw"
                quality={88}
                loading="lazy"
              />
            </figure>
            <div className="visual-card-copy">
              <span className="visual-label">Técnica · tiempo real</span>
              <h3>Ventana, ángulo y señal</h3>
              <p>La exploración se aprende con la mano, el oído y una lectura consciente del espectro.</p>
            </div>
          </article>

          <article className="visual-card visual-card-anatomy">
            <figure className="visual-card-media visual-card-media-anatomy">
              <Image
                src="/images/neurosono/clinica-02-anatomia.webp"
                alt="Anatomía vascular cerebral estilizada en rojo arterial y plata"
                fill
                sizes="(max-width: 760px) 100vw, 38vw"
                quality={88}
                loading="lazy"
              />
            </figure>
            <div className="visual-card-copy">
              <span className="visual-label">Anatomía vascular</span>
              <h3>Anatomía en volumen</h3>
              <p>Reconoce territorios, profundidades y direcciones antes de interpretar velocidades.</p>
            </div>
          </article>

          <article className="visual-card visual-card-practice">
            <figure className="visual-card-media visual-card-media-practice">
              <Image
                src="/images/neurosono/clinica-03-practica.webp"
                alt="Escena clínica de práctica supervisada con equipo de ultrasonido"
                fill
                sizes="(max-width: 760px) 100vw, 38vw"
                quality={86}
                loading="lazy"
              />
            </figure>
            <div className="visual-card-copy">
              <span className="visual-label">Práctica supervisada</span>
              <h3>Aprender haciendo</h3>
              <p>Feedback inmediato para convertir cada ajuste técnico en criterio reproducible.</p>
            </div>
          </article>
        </div>
      </section>

      <HomeDifferential />

      <MentorTeaser />

      <section className="section" aria-labelledby="universe-title">
        <div className="section-heading">
          <p className="section-index">05 / EL UNIVERSO</p>
          <h2 id="universe-title"><TextReveal text="Explora el universo" /><br />de <em><TextReveal text="cursos." delay={0.14} /></em></h2>
          <p>Neurosonología DTC abre la primera cohorte. Nuevos cursos del universo se suman próximamente.</p>
        </div>
        <div className="course-grid">
          {courses.map((course) => <CourseCard key={course.id} course={course} />)}
        </div>
      </section>

      <section className="section final-cta" aria-labelledby="cta-title">
        <div className="liquid-cluster" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="section-index">COHORTE EXCLUSIVA · 8 LUGARES</p><h2 id="cta-title"><TextReveal text="Tu próxima decisión clínica" /><br />puede comenzar con una señal.</h2><p>Solicita información sobre requisitos, agenda y proceso de admisión.</p><Link className="button button-primary" href="/inscripcion">Quiero solicitar un lugar <Icon name="arrowUpRight" size={18} className="icon-cta" /></Link>
      </section>
    </main>
  );
}
