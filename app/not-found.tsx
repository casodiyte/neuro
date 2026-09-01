import Link from "next/link";
import { Icon } from "./components/Icon";

export default function NotFound() {
  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow"><span /> ERROR 404</p>
        <h1>Esa señal<br /><em>no existe.</em></h1>
        <p>La página que buscas no está disponible. Vuelve al inicio para recorrer el programa completo.</p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/">Ir al inicio <Icon name="arrowUpRight" size={18} className="icon-cta" /></Link>
          <Link className="button button-ghost" href="/programa">Ver el programa</Link>
        </div>
      </section>
    </main>
  );
}
