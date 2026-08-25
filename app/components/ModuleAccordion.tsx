// <ModuleAccordion /> — bloque desglosable para los módulos virtuales.
// Prop: modules = array como `virtualModules` (data/program.ts). Usa <details> nativo
// (accesible, sin JS de cliente; la transición respeta prefers-reduced-motion vía CSS).
type ModuleItem = {
  id: string;
  title: string;
  objective: string;
  lessons: string[];
  assessment: string;
};

export function ModuleAccordion({
  modules,
  defaultOpen = 0,
}: {
  modules: ModuleItem[];
  defaultOpen?: number;
}) {
  return (
    <div className="accordion module-accordion">
      {modules.map((module, index) => (
        <details className="accordion-item" key={module.id} open={index === defaultOpen}>
          <summary className="accordion-summary">
            <span className="accordion-id">{module.id}</span>
            <span className="accordion-heading">{module.title}</span>
            <span className="accordion-icon" aria-hidden="true" />
          </summary>
          <div className="accordion-body">
            <p className="accordion-objective">{module.objective}</p>
            <ul className="accordion-lessons">
              {module.lessons.map((lesson) => (
                <li key={lesson}>{lesson}</li>
              ))}
            </ul>
            <p className="accordion-assessment">
              <span>Evaluación</span>
              {module.assessment}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
