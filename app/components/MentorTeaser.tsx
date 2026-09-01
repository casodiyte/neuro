import Link from "next/link";

import { directora } from "../data/program";
import { Icon } from "./Icon";

// Las tres etiquetas del círculo salen tal cual de `directora.credentials`
// (app/data/program.ts). Se toman los índices 0, 2 y 3 porque el 1
// ("Ex-Directora de la Carrera…") es demasiado largo para una etiqueta corta.
// Nunca se reescribe el texto aquí: si cambia el dato, cambia la etiqueta.
const CALLOUTS = [
  { place: "tr", text: directora.credentials[0] },
  { place: "br", text: directora.credentials[2] },
  { place: "bl", text: directora.credentials[3] },
] as const;

export function MentorTeaser() {
  return (
    <section className="section mentor-teaser" aria-labelledby="mentor-title">
      <div className="mentor-intro">
        <p className="section-index">04 / <span>DIRECCIÓN ACADÉMICA</span></p>
        <h2 id="mentor-title">Dra. Silvia Viviana<br />Cocorullo</h2>
        <p className="mentor-bio">Neuróloga y neurosonóloga, formadora internacional y evaluadora vinculada al capítulo latinoamericano de neurosonología.</p>
        <Link className="mentor-pill" href="/directora">Conocer su trayectoria <Icon name="arrowUpRight" size={16} className="icon-cta" /></Link>
      </div>
      <div className="mentor-portrait">
        <div className="mentor-monogram" aria-hidden="true"><span>SC</span><i /><i /><i /></div>
        <ul className="mentor-callouts">
          {CALLOUTS.map((callout) => (
            <li key={callout.place} className={`mentor-callout mentor-callout-${callout.place}`}>
              <i className="mentor-callout-line" aria-hidden="true" />
              <span className="mentor-callout-label">{callout.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
