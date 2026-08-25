"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { courses, navItems } from "../data/program";
import { CourseSelector } from "./CourseSelector";
import { ComingSoonModal } from "./ComingSoonModal";
import { useDialog } from "./useDialog";

type Course = (typeof courses)[number];

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Neurosonología — Inicio">
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
      <span>NEURO<span>SONO</span></span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [soonCourse, setSoonCourse] = useState<Course | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => setOpen(false), []);
  useDialog(menuRef, open, closeMenu);

  const openSoon = (course: Course) => {
    setOpen(false); // un solo diálogo a la vez; al cerrar el modal el sitio sigue en Curso 1
    setSoonCourse(course);
  };

  const menuItems = [{ href: "/", label: "Inicio" }, ...navItems];

  return (
    <>
      {/* Barra superior mínima: solo logo + botón de menú */}
      <header className="site-header site-header-min">
        <Brand />
        <button
          className="menu-open"
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen(true)}
        >
          <span className="menu-open-bars" aria-hidden="true"><span /><span /></span>
          <span className="menu-open-label">Menú</span>
        </button>
      </header>

      {/* Overlay a pantalla completa (mismo patrón en desktop y móvil) */}
      <div
        id="site-menu"
        ref={menuRef}
        className={`site-menu ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú principal"
        aria-hidden={!open}
        tabIndex={-1}
        onMouseDown={closeMenu}
      >
        <div className="gooey-orbs" aria-hidden="true"><i /><i /><i /></div>
        <div className="site-menu-panel" onMouseDown={(event) => event.stopPropagation()}>
          <div className="site-menu-top">
            <Brand />
            <button className="menu-close" type="button" onClick={closeMenu} aria-label="Cerrar menú">
              <span aria-hidden="true">✕</span>
            </button>
          </div>

          <nav className="menu-nav" aria-label="Navegación principal">
            {menuItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.label}</strong>
              </Link>
            ))}
          </nav>

          <aside className="menu-aside">
            <p className="menu-label">Universo de cursos</p>
            <CourseSelector onSoon={openSoon} onNavigate={closeMenu} />
            <Link className="button button-primary menu-cta" href="/inscripcion" onClick={closeMenu}>
              Solicitar lugar <span aria-hidden="true">↗</span>
            </Link>
          </aside>
        </div>
      </div>

      <ComingSoonModal course={soonCourse} onClose={() => setSoonCourse(null)} />
    </>
  );
}
