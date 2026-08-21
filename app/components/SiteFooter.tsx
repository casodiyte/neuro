import Link from "next/link";
import { Brand } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div><Brand /><p>Formación clínica avanzada en neurosonología y hemodinamia cerebral.</p></div>
        <div><span className="footer-label">Programa</span><Link href="/programa">Contenido académico</Link><Link href="/mentoria">Experiencia</Link><Link href="/certificacion">Certificación</Link></div>
        <div><span className="footer-label">Contacto</span><a href="mailto:neurosonologialatam@gmail.com">neurosonologialatam@gmail.com</a><Link href="/inscripcion">Solicitar información</Link></div>
      </div>
      <div className="footer-bottom"><span>CDMX · Cohorte 2026</span><span>Información académica sujeta a confirmación por el comité organizador.</span></div>
    </footer>
  );
}
