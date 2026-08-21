import Link from "next/link";
import { phases, programFacts } from "./data/program";

export default function Home() {
  return (
    <main>
      <section className="hero home-hero" aria-labelledby="hero-title">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> CDMX · 21—25 OCT 2026</p>
          <h1 id="hero-title">Escucha el flujo.<br /><em>Interpreta el cerebro.</em></h1>
          <p className="hero-lede">Mentoría internacional en neurosonología y hemodinamia cerebral por Doppler transcraneal. Un recorrido intensivo de la señal a la decisión clínica.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/programa">Explorar el programa <span aria-hidden="true">↗</span></Link>
            <Link className="button button-ghost" href="/mentoria">Conocer la experiencia</Link>
          </div>
        </div>
        <aside className="signal-card" aria-label="Resumen del programa">
          <div className="signal-card-top"><span>SEÑAL / 01</span><span className="live-dot">EN VIVO</span></div>
          <div className="waveform" aria-hidden="true">{Array.from({ length: 36 }).map((_, index) => <i key={index} style={{ "--bar": `${18 + ((index * 17) % 72)}%` } as React.CSSProperties} />)}</div>
          <div className="signal-readout"><div><strong>80 h</strong><span>formación lectiva y práctica</span></div><div><strong>12 m</strong><span>seguimiento continuo</span></div></div>
          <div className="signal-meta"><span>Cupo máximo</span><strong>08 médicos</strong></div>
        </aside>
      </section>

      <section className="proof-strip" aria-label="Datos clave">
        <p>De la física Doppler al criterio clínico, con práctica real y acompañamiento longitudinal.</p>
        {programFacts.slice(0, 3).map((fact) => <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}
      </section>

      <section className="section section-story" aria-labelledby="journey-title">
        <div className="section-heading"><p className="section-index">01 / RECORRIDO</p><h2 id="journey-title">Una curva de aprendizaje<br />diseñada para <em>conectar.</em></h2><p>Teoría antes del encuentro. Práctica intensiva cuando cada ajuste importa. Casos reales durante un año para consolidar criterio.</p></div>
        <div className="phase-grid">
          {phases.map((phase) => <article className={`phase-card accent-${phase.accent}`} key={phase.number}><div className="phase-orb" aria-hidden="true" /><span className="phase-number">{phase.number}</span><p>{phase.kicker}</p><h3>{phase.title}</h3><p className="phase-copy">{phase.copy}</p><span className="phase-meta">{phase.meta}</span></article>)}
        </div>
      </section>

      <section className="section contrast-panel" aria-labelledby="difference-title">
        <div><p className="section-index">02 / DIFERENCIAL</p><h2 id="difference-title">No es otro curso.<br /><em>Es práctica acompañada.</em></h2></div>
        <div className="difference-list">
          <article><span>01</span><div><h3>Señal antes que protocolo</h3><p>Aprende a leer morfología, velocidad y resistencia como una conversación hemodinámica en tiempo real.</p></div></article>
          <article><span>02</span><div><h3>Manos sobre el equipo</h3><p>Seis horas diarias de práctica directa para construir memoria motora, orientación espacial y confianza técnica.</p></div></article>
          <article><span>03</span><div><h3>Decisiones con contexto</h3><p>Integra DTC, situación clínica y evolución para reducir el empirismo a pie de cama.</p></div></article>
        </div>
      </section>

      <section className="section mentor-teaser" aria-labelledby="mentor-title">
        <div className="mentor-monogram" aria-hidden="true"><span>SC</span><i /><i /><i /></div>
        <div><p className="section-index">03 / DIRECCIÓN ACADÉMICA</p><h2 id="mentor-title">Dra. Silvia Viviana<br />Cocorullo</h2><p>Neuróloga y neurosonóloga, formadora internacional y evaluadora vinculada al capítulo latinoamericano de neurosonología.</p><Link className="text-link" href="/directora">Conocer su trayectoria <span aria-hidden="true">↗</span></Link></div>
      </section>

      <section className="section final-cta" aria-labelledby="cta-title">
        <div className="liquid-cluster" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="section-index">COHORTE EXCLUSIVA · 8 LUGARES</p><h2 id="cta-title">Tu próxima decisión clínica<br />puede comenzar con una señal.</h2><p>Solicita información sobre requisitos, agenda y proceso de admisión.</p><Link className="button button-primary" href="/inscripcion">Quiero solicitar un lugar <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
