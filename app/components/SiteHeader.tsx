"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "../data/program";

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
  const mobileItems: Array<{ href: string; label: string; cta?: boolean }> = [
    { href: "/", label: "Inicio" },
    ...navItems,
    { href: "/inscripcion", label: "Solicitar lugar", cta: true },
  ];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const closeWithEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", closeWithEscape);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", closeWithEscape); };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegación principal">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>
          ))}
        </nav>
        <Link className="nav-cta" href="/inscripcion">Solicitar lugar</Link>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Cerrar menú" : "Abrir menú"} onClick={() => setOpen((value) => !value)}>
          <span /><span />
        </button>
      </header>
      <nav id="mobile-nav" className={`mobile-nav ${open ? "is-open" : ""}`} aria-label="Navegación móvil" aria-hidden={!open}>
        <div className="gooey-orbs" aria-hidden="true"><i /><i /><i /></div>
        <div className="mobile-nav-inner">
          <p>Explorar</p>
          {mobileItems.map((item, index) => (
            <Link
              key={item.href}
              className={item.cta ? "mobile-nav-cta" : undefined}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={pathname === item.href ? "page" : undefined}
              tabIndex={open ? 0 : -1}
            >
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.label}</strong>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
