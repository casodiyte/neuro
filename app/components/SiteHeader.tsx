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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const closeWithEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", closeWithEscape);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", closeWithEscape); };
  }, [open]);

  return (
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
      <div id="mobile-nav" className={`mobile-nav ${open ? "is-open" : ""}`}>
        <div className="gooey-orbs" aria-hidden="true"><i /><i /><i /></div>
        {[{ href: "/", label: "Inicio" }, ...navItems, { href: "/inscripcion", label: "Inscripción" }].map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>
        ))}
      </div>
    </header>
  );
}
