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
  assert.match(html, /Escucha el flujo/);
  assert.match(html, /Interpreta el cerebro/);
  assert.match(html, /CDMX · 21—25 OCT 2026/);
  assert.match(html, /class="neural-canvas"/);
  assert.match(html, /href="\/programa"/);
  assert.match(html, /href="\/inscripcion"/);
  assert.match(html, /Saltar al contenido principal/);
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

test("ships the WebGL field with motion and accessibility safeguards", async () => {
  const [canvas, header, packageJson, hosting] = await Promise.all([
    readFile(new URL("../app/components/NeuralCanvas.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../.openai/hosting.json", import.meta.url), "utf8"),
  ]);

  assert.match(canvas, /from "three"/);
  assert.match(canvas, /InstancedBufferGeometry/);
  assert.match(canvas, /ShaderMaterial/);
  assert.match(canvas, /prefers-reduced-motion: reduce/);
  assert.match(canvas, /pointermove/);
  assert.match(packageJson, /"three"/);
  assert.match(hosting, /"project_id": "appgprj_/);
  assert.match(header, /aria-expanded/);
  assert.match(header, /aria-label="Navegación principal"/);
});
