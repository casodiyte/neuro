import Image from "next/image";
import { Icon } from "./Icon";

// Split editorial: foto a sangre por el borde izquierdo + panel oscuro con el
// titular y los tres diferenciales en columnas. Las clases `.diff-lead` (panel,
// contiene el h2) y `.diff-point` deben conservar su nombre: MotionOrchestrator
// las usa en TEXT_SELECTOR / CARD_SELECTOR.
export function HomeDifferential() {
  return (
    <section className="section differential" aria-labelledby="difference-title">
      <div className="diff-bento">
        <div className="diff-photo">
          <Image
            src="/images/neurosono/diferencial-cerebro.webp"
            alt="Cerebro vascular con transductor y señal Doppler transcraneal"
            fill
            sizes="(max-width: 760px) 100vw, 44vw"
            quality={82}
          />
        </div>
        <div className="diff-lead">
          <p className="section-index">03 / DIFERENCIAL</p>
          <h2 id="difference-title">
            No es otro curso.
            <br />
            <em>Es práctica acompañada.</em>
          </h2>
          <ul className="diff-points">
            <li className="diff-point">
              <span className="diff-point-number" aria-hidden="true">01</span>
              <span className="diff-point-icon">
                <Icon name="waves" size={22} />
              </span>
              <h3>Señal antes que protocolo</h3>
              <p>
                Aprende a leer morfología, velocidad y resistencia como una conversación
                hemodinámica en tiempo real.
              </p>
            </li>
            <li className="diff-point">
              <span className="diff-point-number" aria-hidden="true">02</span>
              <span className="diff-point-icon">
                <Icon name="scanLine" size={22} />
              </span>
              <h3>Manos sobre el equipo</h3>
              <p>
                Seis horas diarias de práctica directa para construir memoria motora,
                orientación espacial y confianza técnica.
              </p>
            </li>
            <li className="diff-point">
              <span className="diff-point-number" aria-hidden="true">03</span>
              <span className="diff-point-icon">
                <Icon name="target" size={22} />
              </span>
              <h3>Decisiones con contexto</h3>
              <p>
                Integra DTC, situación clínica y evolución para reducir el empirismo a pie de
                cama.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
