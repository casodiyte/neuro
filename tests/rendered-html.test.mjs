import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the completed Spanish home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /lang="es"/);
  assert.match(html, /Formación médica en/);
  assert.match(html, /Doppler transcraneal/);
  assert.match(html, /De la señal a la decisión clínica/);
  assert.match(html, /40 h virtuales \+ 40 h presenciales/);
  assert.match(html, /CDMX · 21—25 OCT 2026/);
  assert.match(html, /hero-doppler-v1\.png/);
  assert.match(html, /Ilustración conceptual de una exploración por Doppler transcraneal/);
  assert.match(html, /Tres formas de aprender/);
  assert.match(html, /clinica-01-tecnica\.webp/);
  assert.match(html, /clinica-02-anatomia\.webp/);
  assert.match(html, /clinica-03-practica\.webp/);
  assert.match(html, /diferencial-cerebro\.webp/);
  assert.match(html, /recorrido-01-virtual\.webp/);
  assert.match(html, /recorrido-02-presencial\.webp/);
  assert.match(html, /recorrido-03-seguimiento\.webp/);
  assert.match(html, /Señal antes que protocolo/);
  assert.match(html, /class="neural-canvas"/);
  assert.match(html, /href="\/programa"/);
  assert.match(html, /href="\/inscripcion"/);
  assert.match(html, /Saltar al contenido principal/);
  assert.doesNotMatch(html, /signal-card|SEÑAL \/ 01|EN VIVO/);
});

test("renders every route as a distinct URL", async () => {
  const routes = ["/programa", "/mentoria", "/certificacion", "/directora", "/inscripcion"];
  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
    assert.match(html, /NEURO/);
  }
});

test("ships a visible WebGL field with motion and accessibility safeguards", async () => {
  const [canvas, motion, textReveal, css, header, packageJson, hosting, netlify] = await Promise.all([
    readFile(new URL("../app/components/NeuralCanvas.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/MotionOrchestrator.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/TextReveal.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../.openai/hosting.json", import.meta.url), "utf8"),
    readFile(new URL("../netlify.toml", import.meta.url), "utf8"),
  ]);

  assert.match(canvas, /from "three"/);
  assert.match(canvas, /InstancedBufferGeometry/);
  assert.match(canvas, /ShaderMaterial/);
  assert.match(canvas, /prefers-reduced-motion: reduce/);
  assert.match(canvas, /pointermove/);
  assert.match(canvas, /THREE\.NormalBlending/);
  assert.match(motion, /IntersectionObserver/);
  assert.match(motion, /MutationObserver/);
  assert.match(motion, /motion-card/);
  assert.match(motion, /pointermove/);
  assert.match(motion, /--pointer-x/);
  assert.match(motion, /getBoundingClientRect/);
  assert.match(motion, /\.title-line/);
  assert.match(motion, /prefers-reduced-motion: reduce/);
  assert.match(motion, /--motion-delay/);
  assert.match(textReveal, /text-reveal-word/);
  assert.doesNotMatch(textReveal, /useState|IntersectionObserver/);
  assert.match(css, /\.neural-canvas[^}]*z-index:\s*0/);
  assert.match(css, /#main-content,main[^}]*z-index:\s*1/);
  assert.match(css, /\.visual-card-media img[^}]*object-fit:\s*cover/);
  assert.match(css, /\.visual-card-media img[^}]*mix-blend-mode:\s*normal/);
  assert.match(packageJson, /"three"/);
  assert.match(packageJson, /"build:netlify": "next build"/);
  assert.match(hosting, /"project_id": "appgprj_/);
  assert.match(netlify, /publish = "\.next"/);
  assert.match(netlify, /@netlify\/plugin-nextjs/);
  assert.match(header, /aria-expanded/);
  assert.match(header, /aria-label="Navegación principal"/);
  assert.match(header, /aria-label="Menú principal"/);
  assert.match(header, /aria-modal="true"/);
  assert.match(header, /tabIndex=\{-1\}/);
  assert.match(css, /\.site-menu\.is-open/);
  assert.match(css, /\.site-menu-panel/);
});
