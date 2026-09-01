import Link from "next/link";

// <CourseCard /> — tarjeta de curso para "Explora el universo".
//
// El contenido no son tres cosas equivalentes: hay UN curso abierto y dos en
// preparación. La jerarquía va por CSS a partir de `.is-active` / `.is-soon`
// (destacada a la izquierda, próximas apiladas a la derecha), así que el markup
// es el mismo para ambas y no se duplica la estructura.
type Course = {
  order: string;
  name: string;
  title: string;
  status: "active" | "soon";
  href: string | null;
  tagline: string;
  meta: string;
};

export function CourseCard({ course }: { course: Course }) {
  const isActive = course.status === "active";

  const inner = (
    <>
      <span className="course-card-orb" aria-hidden="true" />
      <span className="course-card-order">{course.order}</span>
      <span className={`course-card-status ${isActive ? "is-active" : "is-soon"}`}>
        {isActive ? "Disponible" : "Próximamente"}
      </span>
      <span className="course-card-copy">
        <strong className="course-card-title">{course.title}</strong>
        <span className="course-card-tagline">{course.tagline}</span>
      </span>
      {/* En las próximas, `meta` repite literalmente el texto del badge. */}
      {isActive && (
        <span className="course-card-meta">
          {course.meta}
          <span className="course-card-go" aria-hidden="true">↗</span>
        </span>
      )}
    </>
  );

  if (isActive && course.href) {
    return (
      <Link className="course-card is-active" href={course.href} aria-label={`${course.title} — ${course.meta}`}>
        {inner}
      </Link>
    );
  }

  return (
    <div className="course-card is-soon" aria-disabled="true" aria-label={`${course.title} — próximamente`}>
      {inner}
    </div>
  );
}
