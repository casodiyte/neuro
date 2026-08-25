import { Icon } from "./Icon";
import { ImageSlot } from "./ImageSlot";

export function HomeDifferential() {
  return (
    <section className="section differential" aria-labelledby="difference-title">
      <div className="diff-bento">
        <div className="diff-lead">
          <p className="section-index">03 / DIFERENCIAL</p>
          <h2 id="difference-title">
            No es otro curso.
            <br />
            <em>Es práctica acompañada.</em>
          </h2>
          <ImageSlot
            src="/images/neurosono/diferencial-cerebro.webp"
            theme="Cerebro vascular, transductor y señal Doppler"
            aspect="4 / 3"
            size="1000×750 px"
            alt="Cerebro vascular con transductor y señal Doppler transcraneal"
            sizes="(max-width: 900px) 100vw, 48vw"
          />
        </div>
        <ul className="diff-points">
          <li className="diff-point">
            <span className="diff-point-icon">
              <Icon name="waves" size={22} />
            </span>
            <div>
              <h3>Señal antes que protocolo</h3>
              <p>
                Aprende a leer morfología, velocidad y resistencia como una conversación
                hemodinámica en tiempo real.
              </p>
            </div>
          </li>
          <li className="diff-point">
            <span className="diff-point-icon">
              <Icon name="scanLine" size={22} />
            </span>
            <div>
              <h3>Manos sobre el equipo</h3>
              <p>
                Seis horas diarias de práctica directa para construir memoria motora,
                orientación espacial y confianza técnica.
              </p>
            </div>
          </li>
          <li className="diff-point">
            <span className="diff-point-icon">
              <Icon name="target" size={22} />
            </span>
            <div>
              <h3>Decisiones con contexto</h3>
              <p>
                Integra DTC, situación clínica y evolución para reducir el empirismo a pie de
                cama.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
