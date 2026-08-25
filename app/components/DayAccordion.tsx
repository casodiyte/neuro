// <DayAccordion /> — bloque desglosable para las jornadas presenciales.
// Prop: days = array como `onsiteDays` (data/program.ts). Usa <details> nativo.
type DayItem = {
  day: string;
  title: string;
  detail: string;
  practices: string[];
};

export function DayAccordion({
  days,
  defaultOpen = 0,
}: {
  days: DayItem[];
  defaultOpen?: number;
}) {
  return (
    <div className="accordion day-accordion">
      {days.map((day, index) => (
        <details className="accordion-item" key={day.day} open={index === defaultOpen}>
          <summary className="accordion-summary">
            <span className="accordion-id">{String(index + 1).padStart(2, "0")}</span>
            <span className="accordion-heading">
              <em>{day.day}</em>
              {day.title}
            </span>
            <span className="accordion-icon" aria-hidden="true" />
          </summary>
          <div className="accordion-body">
            <p className="accordion-objective">{day.detail}</p>
            <ul className="accordion-lessons accordion-practices">
              {day.practices.map((practice) => (
                <li key={practice}>{practice}</li>
              ))}
            </ul>
          </div>
        </details>
      ))}
    </div>
  );
}
