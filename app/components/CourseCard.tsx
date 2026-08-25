import Link from "next/link";

// <CourseCard /> — tarjeta de curso para "Explora el universo".
// Prop: course = uno de los objetos de `courses` (data/program.ts).
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
      <strong className="course-card-title">{course.title}</strong>
      <span className="course-card-tagline">{course.tagline}</span>
      <span className="course-card-meta">
        {course.meta}
        {isActive && <span className="course-card-go" aria-hidden="true">↗</span>}
      </span>
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
