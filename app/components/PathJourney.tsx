import Link from "next/link";
import { pathStations } from "../data/program";
import { Icon } from "./Icon";
import { ImageSlot } from "./ImageSlot";

// <PathJourney /> — recorrido secuencial de 3 estaciones como timeline horizontal.
// Cada estación: riel con nodo (icono) + tarjeta con slot de imagen. Estética actual del sitio.
export function PathJourney() {
  return (
    <ol className="path-track" aria-label="Recorrido del programa en tres estaciones">
      {pathStations.map((station) => (
        <li className={`path-node accent-${station.accent}`} key={station.number}>
          <div className="path-node-rail">
            <span className="path-node-dot"><Icon name={station.icon} size={20} /></span>
            <span className="path-node-line" aria-hidden="true" />
          </div>
          <Link className="path-node-card" href={station.href}>
            <ImageSlot
              src={station.image.src}
              theme={station.image.theme}
              aspect={station.image.aspect}
              size={station.image.size}
              alt={`${station.tag} — ${station.title}`}
              sizes="(max-width: 900px) 100vw, 33vw"
            />
            <div className="path-node-body">
              <span className="path-node-index">Fase {station.number} · {station.tag}</span>
              <strong className="path-node-title">{station.title}</strong>
              <span className="path-node-meta"><Icon name="clock" size={15} /> {station.meta}</span>
              <span className="path-node-copy">{station.copy}</span>
              <span className="path-node-go">Ver fase <Icon name="arrowUpRight" size={15} className="icon-cta" /></span>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
}
