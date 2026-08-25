"use client";

import Link from "next/link";
import { courses } from "../data/program";

type Course = (typeof courses)[number];

// <CourseSelector /> — vive dentro del overlay del menú.
// Curso 1 (activo): navega a su curso. Curso 2 / 3 (bloqueados): abren el modal "Próximamente"
// SIN cambiar el contenido ni el acento del sitio (el sitio permanece en Curso 1).
export function CourseSelector({
  onSoon,
  onNavigate,
}: {
  onSoon: (course: Course) => void;
  onNavigate?: () => void;
}) {
  return (
    <div className="course-picker" role="group" aria-label="Selector de curso">
      {courses.map((course) => {
        if (course.status === "active" && course.href) {
          return (
            <Link
              key={course.id}
              href={course.href}
              className="course-pick is-active"
              data-id={course.id}
              onClick={onNavigate}
            >
              <span className="course-pick-dot" aria-hidden="true" />
              <span className="course-pick-name">{course.name}</span>
              <span className="course-pick-tag">{course.tagline}</span>
            </Link>
          );
        }
        return (
          <button
            key={course.id}
            type="button"
            className="course-pick is-soon"
            data-id={course.id}
            onClick={() => onSoon(course)}
            aria-haspopup="dialog"
          >
            <span className="course-pick-dot" aria-hidden="true" />
            <span className="course-pick-name">{course.name}</span>
            <span className="course-pick-badge">Próximamente</span>
          </button>
        );
      })}
    </div>
  );
}
